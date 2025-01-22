<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- 상단 영역 -->
    <div class="bg-white shadow-lg border-b border-gray-200">
      <div class="container mx-auto px-4 py-4 flex items-center gap-4">
        <label class="text-gray-700 font-medium">핸드폰 번호</label>
        <input
          v-model="phone"
          type="text"
          placeholder="핸드폰 번호"
          class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
        />
        <button
          @click="loadUserCode"
          class="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg shadow hover:shadow-lg transition duration-200"
        >
          코드 불러오기
        </button>
        <button
          @click="showHint"
          class="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg shadow hover:shadow-lg transition duration-200"
        >
          힌트 보기
        </button>
      </div>
    </div>

    <!-- 메인 콘텐츠 영역 -->
    <div class="container mx-auto px-4 py-6 flex gap-6">
      <!-- 문제 영역 -->
      <div class="w-2/5 bg-white rounded-xl shadow-lg p-6">
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 shadow-md">
          <div class="flex items-center gap-4">
            <h2 class="text-white font-semibold text-lg">문제</h2>
            <select 
              v-model="selectedCategory"
              class="bg-white/90 text-gray-800 rounded-md py-1 px-3 text-sm border-0 focus:ring-2 focus:ring-white"
            >
              <option disabled value="">분류</option>
              <option v-for="category in categoryList" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
            <select
              v-if="selectedCategory"
              v-model="selectedProblemIndex"
              @change="onProblemChange"
              class="bg-white/90 text-gray-800 rounded-md py-1 px-3 text-sm border-0 focus:ring-2 focus:ring-white"
            >
              <option disabled value="">문제 선택</option>
              <option v-for="(problem, idx) in problemsInSelectedCategory" :key="problem.id" :value="idx">
                문제 {{ idx + 1 }}
              </option>
            </select>
          </div>
        </div>

        <div class="mt-6 space-y-4">
          <div v-if="!currentProblem.title" class="text-gray-500 text-center py-8">
            카테고리를 선택하고, 문제를 골라보세요.
          </div>

          <div v-else class="space-y-4">
            <h3 class="text-xl font-bold text-gray-800">{{ currentProblem.title }}</h3>
            <p class="text-gray-600">{{ currentProblem.description }}</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
              <li v-for="(instruction, index) in currentProblem.instructions" :key="index">
                {{ instruction }}
              </li>
            </ul>

            <!-- 힌트 섹션 -->
            <div v-if="hint" class="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
              <h4 class="font-semibold text-amber-800">힌트:</h4>
              <p class="text-amber-700 mt-2">{{ hint }}</p>
            </div>

            <!-- 이전/다음 버튼 -->
            <div v-if="problemsInSelectedCategory.length > 1" class="flex justify-center gap-4 mt-6">
              <button
                @click="prevProblem"
                :disabled="!canGoPrev"
                class="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition duration-200"
              >
                ← 이전 문제
              </button>
              <button
                @click="nextProblem"
                :disabled="!canGoNext"
                class="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition duration-200"
              >
                다음 문제 →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 에디터 영역 -->
      <div class="w-3/5 space-y-4">
        <!-- CodeMirror 에디터 -->
        <div ref="editorRoot" class="border border-gray-200 rounded-xl shadow-lg overflow-hidden"></div>

        <!-- 스니펫 버튼 -->
        <div class="flex gap-2">
          <button
            v-for="type in ['for', 'if', 'while']"
            :key="type"
            @click="insertSnippet(type)"
            class="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md shadow transition duration-200"
          >
            {{ type }} 문
          </button>
        </div>

        <!-- 실행 & 저장 영역 -->
        <div class="bg-gray-50 rounded-lg p-4 space-y-4">
          <div class="flex items-center gap-4">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">프로그램 입력값</label>
              <input
                v-model="programInput"
                type="text"
                placeholder="scanf가 받을 값"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              @click="runCode"
              class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition duration-200"
            >
              코드 실행
            </button>
            <button
              @click="saveCode"
              class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md hover:shadow-lg transition duration-200"
            >
              코드 저장
            </button>
          </div>

          <!-- 실행 결과 -->
          <div v-if="output" class="bg-gray-900 rounded-lg p-4 shadow-inner">
            <h3 class="text-lg font-semibold text-white mb-2">실행 결과:</h3>
            <pre class="text-emerald-400 font-mono text-sm overflow-x-auto">{{ output }}</pre>
          </div>
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

</style>
