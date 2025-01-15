<template>
  <div class="main-container">
    <!-- (1) 상단: 휴대폰 번호 + 코드 불러오기 버튼 영역 -->
    <div class="phone-container">
      <label for="phoneInput" class="phone-label">핸드폰 번호</label>
      <input
        id="phoneInput"
        v-model="phone"
        type="text"
        placeholder="핸드폰 번호"
        class="user-name-input"
      />
      <button class="load-code-button" @click="loadUserCode">코드 불러오기</button>
      <button class="hint-button" @click="showHint">힌트 보기</button>
    </div>

    <!-- (2) 문제 & 에디터 영역 -->
    <div class="content-area">
      <!-- 문제 표시 (왼쪽) -->
      <div class="problem-container">
        <div class="problem-header">
          <h2>문제</h2>
          <select class="category-dropdown" v-model="selectedCategory">
            <option disabled value="">분류</option>
            <option
              v-for="(category) in categoryList"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <select
            class="problem-dropdown"
            v-if="selectedCategory"
            v-model="selectedProblemIndex"
            @change="onProblemChange"
          >
            <option disabled value="">문제 선택</option>
            <option
              v-for="(problem, idx) in problemsInSelectedCategory"
              :key="problem.id"
              :value="idx"
            >
              문제 {{ idx + 1 }}
            </option>
          </select>
        </div>

        <div class="problem-content">
          <p v-if="!currentProblem.title">
            카테고리를 선택하고, 문제를 골라보세요.
          </p>

          <div v-else>
            <h3>{{ currentProblem.title }}</h3>
            <p>{{ currentProblem.description }}</p>
            <ul>
              <li
                v-for="(instruction, index) in currentProblem.instructions"
                :key="index"
              >
                {{ instruction }}
              </li>
            </ul>

            <!-- 힌트 표시 -->
            <div v-if="hint" class="hint-section">
              <h4>힌트:</h4>
              <p>{{ hint }}</p>
            </div>

            <!-- 좌우 화살표 버튼 -->
            <div class="arrow-buttons" v-if="problemsInSelectedCategory.length > 1">
              <button class="arrow-button" @click="prevProblem" :disabled="!canGoPrev">
                ← 이전 문제
              </button>
              <button class="arrow-button" @click="nextProblem" :disabled="!canGoNext">
                다음 문제 →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 에디터 (오른쪽) -->
      <div class="editor-section">
        <!-- CodeMirror 6 루트 DOM -->
        <div ref="editorRoot" class="editor-root"></div>

        <!-- 코드 스니펫 -->
        <div class="snippet-buttons">
          <button class="snippet-button" @click="insertSnippet('for')">for 문</button>
          <button class="snippet-button" @click="insertSnippet('if')">if 문</button>
          <button class="snippet-button" @click="insertSnippet('while')">while 문</button>
        </div>

        <!-- 실행 & 저장 + scanf 입력 -->
        <div class="actions">
          <div class="scanf-input-container">
            <label for="programInput" class="scanf-label">프로그램 입력값</label>
            <input
              id="programInput"
              v-model="programInput"
              type="text"
              placeholder="scanf가 받을 값"
              class="scanf-input"
            />
          </div>
          <button class="run-button" @click="runCode">코드 실행</button>
          <button class="save-button" @click="saveCode">코드 저장</button>
        </div>

        <!-- 실행 결과 -->
        <div v-if="output" class="output-container">
          <h3>실행 결과:</h3>
          <pre>{{ output }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// CodeMirror 6
import { EditorView, basicSetup } from 'codemirror'
import { EditorState, StateField, StateEffect } from '@codemirror/state'
import { linter, lintGutter } from '@codemirror/lint'
import { keymap } from '@codemirror/view'
import { indentWithTab } from '@codemirror/commands'
import { cpp } from '@codemirror/lang-cpp'

// 진단 상태를 업데이트하는 StateEffect 정의
const setDiagnosticsEffect = StateEffect.define()

// ★★★ 진단 상태를 저장하는 StateField 정의 ★★★
const diagnosticsField = StateField.define({
  create() {
    return []
  },
  update(diagnostics, tr) {
    // 1) 만약 문서가 변경되면 lint 비우기
    if (tr.docChanged) {
      diagnostics = []
    }

    // 2) setDiagnosticsEffect로 들어온 Diagnostics를 세팅
    for (let effect of tr.effects) {
      if (effect.is(setDiagnosticsEffect)) {
        diagnostics = effect.value
      }
    }

    return diagnostics
  },
  // linter에 diagnostics 배열을 제공
  provide: field =>
    linter((view) => {
      // view.state.field(field) => 현재 Diagnostics
      return view.state.field(field)
    }),
})

// gcc 오류 메시지를 파싱하여 Diagnostic 객체로 변환
function parseGccErrors(stderr) {
  const diagnostics = []
  const errorRegex = /^(.*?):(\d+):(\d+):\s+(error|warning):\s+(.*)$/gm
  let match

  while ((match = errorRegex.exec(stderr)) !== null) {
    const [, file, line, col, severity, message] = match
    const lineNum = Number(line)
    const colNum = Number(col)

    // 에디터에서 라인 시작 Offset 구하기
    const lineInfo = editorView.state.doc.line(lineNum)
    if (lineInfo) {
      const from = lineInfo.from + colNum - 1
      const to = from + 1
      diagnostics.push({
        from,
        to,
        severity: severity === 'error' ? 'error' : 'warning',
        message: message.trim(),
      })
    }
  }

  return diagnostics
}

// API
import {
  fetchProblems,
  fetchUserCode,
  executeCode,
  saveCodeToServer
} from '@/api/CodeExecutionApi.js'

// ---------------------------------
// State
// ---------------------------------
const phone = ref('')
const programInput = ref('')
const problems = ref([])
const categoryList = ref([])
const selectedCategory = ref('')
const selectedProblemIndex = ref(null)

const output = ref('')
const hint = ref('')
let editorView = null
const editorRoot = ref(null)

// ---------------------------------
// computed
// ---------------------------------
const problemsInSelectedCategory = computed(() => {
  if (!selectedCategory.value) return []
  return problems.value.filter(
    (item) => item.categoryId === selectedCategory.value
  )
})
const currentProblem = computed(() => {
  if (!selectedCategory.value || selectedProblemIndex.value === null) {
    return {}
  }
  return problemsInSelectedCategory.value[selectedProblemIndex.value] || {}
})
const canGoPrev = computed(() => selectedProblemIndex.value > 0)
const canGoNext = computed(() => selectedProblemIndex.value < problemsInSelectedCategory.value.length - 1)

// ---------------------------------
// Methods
// ---------------------------------
const onProblemChange = () => {
  output.value = ''
  hint.value = ''
}

const loadUserCode = async () => {
  if (!phone.value) {
    setEditorCode('// 핸드폰 번호를 입력 후 불러오기!')
    return
  }
  if (!currentProblem.value.id) {
    setEditorCode('// 문제를 먼저 선택하세요.')
    return
  }
  try {
    const { code } = await fetchUserCode(phone.value, currentProblem.value.id)
    setEditorCode(
      code || '// 저장된 코드가 없습니다.\n// 여기서부터 코드를 작성하세요.'
    )
  } catch (e) {
    console.error(e)
    setEditorCode('// 코드 불러오기 실패.\n// 새로 코드를 작성하세요.')
  }
}

const prevProblem = () => {
  if (!canGoPrev.value) return
  selectedProblemIndex.value--
  onProblemChange()
}

const nextProblem = () => {
  if (!canGoNext.value) return
  selectedProblemIndex.value++
  onProblemChange()
}

const showHint = () => {
  if (!currentProblem.value.hint) {
    alert('이 문제에 대한 힌트가 없습니다.')
    return
  }
  hint.value = currentProblem.value.hint
}

function setEditorCode(code) {
  if (!editorView) return
  editorView.dispatch({
    changes: { from: 0, to: editorView.state.doc.length, insert: code }
  })
}
function getEditorCode() {
  return editorView ? editorView.state.doc.toString() : ''
}

const insertSnippet = (type) => {
  let snippet = ''
  switch (type) {
    case 'for':
      snippet = `for (int i = 0; i < n; i++) {\n\t// 코드 작성\n}`
      break
    case 'if':
      snippet = `if (condition) {\n\t// 참일 때 실행\n} else {\n\t// 거짓일 때 실행\n}`
      break
    case 'while':
      snippet = `while (condition) {\n\t// 반복 실행할 코드\n}`
      break
    default:
      return
  }
  if (!editorView) return
  const pos = editorView.state.selection.main.head
  editorView.dispatch({
    changes: { from: pos, insert: snippet }
  })
}

// ★★★ 코드 실행 -> 곧바로 lint 표시 (문서 수정 시 lint 사라짐) ★★★
const runCode = async () => {
  output.value = '실행중...'
  // lint 초기화
  editorView.dispatch({ effects: setDiagnosticsEffect.of([]) })

  try {
    const code = getEditorCode()
    const result = await executeCode(code, programInput.value)

    if (result.stderr) {
      output.value = `오류:\n${result.stderr}`
      // parse하여 Diagnostics 세팅
      const diagnostics = parseGccErrors(result.stderr)
      editorView.dispatch({
        effects: setDiagnosticsEffect.of(diagnostics)
      })
      // 가짜 변경은 제거(문서 바뀌면 lint 사라짐)

    } else {
      output.value = result.stdout || '출력 결과가 없습니다.'
      editorView.dispatch({ effects: setDiagnosticsEffect.of([]) })
    }
  } catch (error) {
    console.error(error)
    output.value = '실행중 문제가 발생했습니다.'
  }
}

const saveCode = async () => {
  if (!currentProblem.value.id) {
    alert('문제를 먼저 선택하세요!')
    return
  }
  if (!phone.value) {
    alert('핸드폰 번호를 입력하세요!')
    return
  }
  const code = getEditorCode()
  try {
    const response = await saveCodeToServer(
      phone.value,
      currentProblem.value.id,
      code
    )
    alert(response.message || '코드가 저장되었습니다!')
  } catch (error) {
    alert('코드 저장 중 문제가 발생했습니다.')
  }
}

// ---------------------------------
// Lifecycle
// ---------------------------------
onMounted(async () => {
  const startState = EditorState.create({
    doc: '// 이곳에 C언어 코드를 작성하세요.\n',
    extensions: [
      basicSetup,
      cpp(),
      keymap.of([indentWithTab]),
      diagnosticsField, // lint용 StateField
      lintGutter()      // 가터
    ]
  })

  editorView = new EditorView({
    state: startState,
    parent: editorRoot.value
  })

  await loadProblemsFromServer()
})

onBeforeUnmount(() => {
  if (editorView) {
    editorView.destroy()
    editorView = null
  }
})

async function loadProblemsFromServer() {
  try {
    const fetchedProblems = await fetchProblems()
    problems.value = fetchedProblems
    const categories = fetchedProblems.map(p => ({
      id: p.categoryId,
      name: p.categoryName
    }))
    categoryList.value = Array.from(
      new Map(categories.map(item => [item.id, item])).values()
    )
  } catch (error) {
    console.error('문제 목록 로드 실패:', error)
  }
}
</script>

<style scoped>
/* 기존 스타일 동일 */
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.phone-container {
  display: flex;
  gap: 10px;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 2px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.phone-label {
  font-weight: bold;
  color: #333;
}
.user-name-input {
  width: 180px;
  padding: 6px 8px;
  font-size: 14px;
  border-radius: 4px;
  color: #000;
  border: 1px solid #ccc;
}
.load-code-button {
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 14px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.load-code-button:hover {
  background-color: #218838;
}
.hint-button {
  background-color: #ffc107;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 14px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.hint-button:hover {
  background-color: #e0a800;
}
.content-area {
  display: flex;
  flex: 1;
  padding: 20px;
}

/* 문제 영역 */
.problem-container {
  width: 40%;
  padding: 20px;
  background-color: #fefefe;
  border-right: 2px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}
.problem-header {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #007bff;
  padding: 10px 20px;
  border-radius: 8px;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.category-dropdown,
.problem-dropdown {
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 14px;
}
.problem-content {
  flex: 1;
  margin-top: 16px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  overflow-y: auto;
  position: relative;
}
.hint-section {
  margin-top: 20px;
  padding: 10px;
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: 4px;
  color: #856404;
}
.arrow-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
}
.arrow-button {
  background-color: #555;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.arrow-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.arrow-button:hover:not(:disabled) {
  background-color: #333;
}

/* 에디터 영역 */
.editor-section {
  width: 60%;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.editor-root {
  height: 550px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
/* 스니펫 */
.snippet-buttons {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
.snippet-button {
  background-color: #17a2b8;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.snippet-button:hover {
  background-color: #138496;
}

/* actions */
.actions {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.scanf-input-container {
  display: flex;
  align-items: center;
  gap: 8px;
}
.scanf-label {
  font-weight: bold;
  color: #333;
}
.scanf-input {
  padding: 6px 8px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 160px;
  flex-shrink: 0;
}
.run-button,
.save-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 14px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.run-button:hover,
.save-button:hover {
  background-color: #0056b3;
}

/* 실행 결과 */
.output-container {
  margin-top: 16px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.output-container h3 {
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
}
.output-container pre {
  background-color: #282c34;
  color: #61dafb;
  padding: 10px;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  overflow-x: auto;
  max-height: 300px;
}
</style>
