import{j as pe,r as d,v,O as m,x as V,k as xe,s as h,c as ve,w as I,L as me,y as ye,o as n,a as fe,b as e,d as o,u as y,P as be,E as w,G as U,Q as _e,J as g,n as P,t as l,R as z,C as T,F as B,S as he,T as we,I as Q,U as ke,N as Ce,M as W,_ as Se}from"./index-ca36a574.js";const De={class:"flex gap-6"},Me={class:"w-1/3 space-y-4"},Pe={class:"bg-white rounded-xl shadow-sm p-4"},Te={class:"flex items-center justify-between mb-6"},Be={class:"flex items-center gap-2"},je={class:"w-6 h-6 text-indigo-600",viewBox:"0 0 24 24"},Oe=["d"],Re={class:"relative flex-1 mx-4"},$e={class:"w-4 h-4",viewBox:"0 0 24 24"},Ve=["d"],Ue={class:"space-y-3"},Le=["onClick"],Ne={class:"flex justify-between items-start mb-2"},Ye={class:"font-semibold text-gray-900"},Ae={class:"flex items-center gap-1"},Ee=["onClick"],Fe=["onClick"],Ie={class:"text-sm text-gray-600"},ze={key:0,class:"flex justify-between items-center pt-4 border-t border-gray-200"},Qe=["disabled"],We={class:"text-sm text-gray-600"},qe=["disabled"],Ge={class:"flex-1 space-y-6"},He={class:"bg-white rounded-xl shadow-sm p-6"},Je={class:"flex items-center gap-2 mb-6"},Ke={class:"w-6 h-6 text-gray-900",viewBox:"0 0 24 24"},Xe=["d"],Ze={key:0,class:"grid grid-cols-2 gap-6"},et={class:"mt-1 font-semibold text-gray-900"},tt={class:"mt-1 text-gray-900"},st={class:"mt-1 text-gray-900"},at={class:"mt-1 text-gray-900"},nt={class:"bg-white rounded-xl shadow-sm p-6"},ot={class:"flex items-center gap-2 mb-6"},lt={class:"w-6 h-6 text-blue-600",viewBox:"0 0 24 24"},rt=["d"],dt={key:0},it={class:"flex items-center gap-4 mb-6"},ut={class:"flex items-center gap-2"},ct={class:"flex items-center gap-2"},gt={class:"grid grid-cols-3 gap-4 mb-6"},pt={class:"p-4 rounded-lg bg-green-50 border border-green-100"},xt={class:"text-2xl font-semibold text-green-600"},vt={class:"p-4 rounded-lg bg-red-50 border border-red-100"},mt={class:"text-2xl font-semibold text-red-600"},yt={class:"p-4 rounded-lg bg-purple-50 border border-purple-100"},ft={class:"text-2xl font-semibold text-purple-600"},bt={class:"overflow-hidden rounded-lg border border-gray-200"},_t={class:"min-w-full divide-y divide-gray-200"},ht={class:"bg-white divide-y divide-gray-200"},wt={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-900"},kt={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-900"},Ct={class:"px-6 py-4 whitespace-nowrap text-sm"},St={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-900"},Dt={key:0},Mt={class:"bg-white rounded-xl shadow-sm p-6"},Pt={class:"flex items-center gap-2 mb-6"},Tt={class:"w-6 h-6 text-green-600",viewBox:"0 0 24 24"},Bt=["d"],jt={key:0,class:"space-y-6"},Ot={class:"flex justify-between mb-2"},Rt={class:"text-sm font-medium text-gray-700"},$t={class:"w-full bg-gray-200 rounded-full h-2.5"},Vt={class:"bg-white rounded-xl shadow-sm p-6"},Ut={class:"flex items-center gap-2 mb-6"},Lt={class:"w-6 h-6 text-purple-600",viewBox:"0 0 24 24"},Nt=["d"],Yt={class:"flex gap-4 mb-6"},At={class:"space-y-3"},Et={class:"flex justify-between items-center"},Ft={class:"text-sm text-gray-900"},It={class:"text-sm text-gray-600"},zt={key:0,class:"text-xs text-gray-500 mt-1"},Qt={key:0,class:"text-center py-6 text-gray-500"},Wt={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"},qt={class:"bg-white rounded-lg p-6 max-w-md w-full shadow-xl"},Gt={class:"text-gray-700 mb-6"},Ht={class:"font-semibold"},L=5,Jt={__name:"StudentsManagement",setup(Kt){const q={mon:"월요일",tue:"화요일",wed:"수요일",thu:"목요일",fri:"금요일",sat:"토요일",sun:"일요일"},f=d([]),r=d(null),x=d(""),j=d(null),N=ye(),Y=v(()=>{if(!x.value)return f.value;const s=x.value.toLowerCase();return f.value.filter(t=>t.name.toLowerCase().includes(s))});function G(s){r.value=s,R(s.id),F(s.id)}function H(s){N.push({name:"studentInfo",params:{id:s}})}function J(){N.push("/forms")}function K(){j.value&&clearTimeout(j.value),j.value=setTimeout(()=>{},300)}function X(){x.value=""}const b=d(m().year()),_=d(m().month()+1),k=d([]),O=d([]);function A(s){return s?m(s).format("YYYY-MM-DD"):"-"}function Z(s){if(!s)return"-";const t=["일","월","화","수","목","금","토"],i=m(s).day();return t[i]+"요일"}function ee(s){return s.type==="absence"?"결석":s.makeup?"보강":"출석"}function te(s){return s.type==="absence"?"bg-red-100 text-red-800":s.makeup?"bg-purple-100 text-purple-800":"bg-green-100 text-green-800"}function se(s){return{Python:"bg-blue-500","COS Pro":"bg-green-500",타자연습:"bg-purple-500"}[s]||"bg-gray-500"}const E=v(()=>[...k.value.map(t=>({...t,type:"attendance"})),...O.value.map(t=>({...t,type:"absence"}))].sort((t,i)=>{const a=m(t.type==="absence"?t.absenceDate:t.attendanceDate);return m(i.type==="absence"?i.absenceDate:i.attendanceDate).valueOf()-a.valueOf()})),ae=v(()=>k.value.filter(s=>!s.makeup).length),ne=v(()=>O.value.length),oe=v(()=>k.value.filter(s=>s.makeup).length);async function R(s){if(s)try{const t=await h.get(`/api/attendance/student/${s}`,{params:{year:b.value,month:_.value}});k.value=t.data;const i=await h.get(`/api/absence/${s}`,{params:{year:b.value,month:_.value}});O.value=i.data}catch(t){console.error("학생 출결 데이터 조회 실패:",t),alert("학생 출결 데이터 조회 실패")}}const C=d("month"),S=d("desc"),$=d([]);V([C,S],()=>{r.value&&F(r.value.id)}),V([b,_],()=>{r.value&&R(r.value.id)});async function F(s){if(s)try{const t=await h.get(`/api/attendance/makeup/student/${s}`,{params:{range:C.value,order:S.value}});$.value=t.data}catch(t){console.error("보강 목록 조회 실패:",t),alert("보강 목록 조회 실패")}}xe(()=>{le()});async function le(){try{const s=await h.get("/api/students");f.value=s.data}catch(s){console.error("학생 목록 불러오기 실패:",s),alert("학생 목록 불러오기 실패")}}const u=d(1),re=v(()=>{const s=(u.value-1)*L,t=s+L;return Y.value.slice(s,t)}),D=v(()=>Math.ceil(Y.value.length/L));function de(){u.value>1&&u.value--}function ie(){u.value<D.value&&u.value++}const M=d(!1),p=d(null);function ue(s){p.value=s,M.value=!0}async function ce(){if(p.value)try{await h.delete(`/api/students/${p.value.id}`),f.value=f.value.filter(s=>s.id!==p.value.id),r.value&&r.value.id===p.value.id&&(r.value=null),M.value=!1,p.value=null,alert("학생이 삭제되었습니다.")}catch(s){console.error("학생 삭제 실패:",s),alert("학생 삭제에 실패했습니다.")}}function ge(){M.value=!1,p.value=null}return V(x,()=>{u.value=1}),(s,t)=>(n(),ve(me,null,{default:I(()=>[fe(Se,null,{default:I(()=>{var i;return[e("div",De,[e("div",Me,[e("div",Pe,[e("div",Te,[e("div",Be,[(n(),o("svg",je,[e("path",{fill:"currentColor",d:y(be)},null,8,Oe)])),t[6]||(t[6]=e("h1",{class:"text-xl font-semibold text-gray-900"},"학생 관리",-1))]),e("div",Re,[w(e("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=a=>x.value=a),placeholder:"학생 이름 검색...",class:"w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent",onInput:K},null,544),[[U,x.value]]),x.value?(n(),o("button",{key:0,onClick:X,class:"absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"},[(n(),o("svg",$e,[e("path",{fill:"currentColor",d:y(_e)},null,8,Ve)]))])):g("",!0)]),e("button",{class:"inline-flex items-center justify-center px-3 py-1 border border-indigo-600 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors",onClick:J}," + ")]),e("div",Ue,[(n(!0),o(B,null,P(re.value,a=>(n(),o("div",{key:a.id,class:"p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors shadow-sm cursor-pointer",onClick:c=>G(a)},[e("div",Ne,[e("div",Ye,l(a.name),1),e("div",Ae,[e("button",{class:"px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200",onClick:z(c=>H(a.id),["stop"])}," 수정 ",8,Ee),e("button",{class:"px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200",onClick:z(c=>ue(a),["stop"])}," 삭제 ",8,Fe)])]),e("div",Ie,[T(" ID : "+l(a.id)+" ",1),t[7]||(t[7]=e("br",null,null,-1)),T(" "+l(a.daysOfWeek.map(c=>q[c]).join(", ")),1)])],8,Le))),128)),D.value>1?(n(),o("div",ze,[e("button",{class:"px-3 py-1 rounded text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed",disabled:u.value===1,onClick:de}," 이전 ",8,Qe),e("span",We,l(u.value)+" / "+l(D.value),1),e("button",{class:"px-3 py-1 rounded text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed",disabled:u.value===D.value,onClick:ie}," 다음 ",8,qe)])):g("",!0)])])]),e("div",Ge,[e("div",He,[e("div",Je,[(n(),o("svg",Ke,[e("path",{fill:"currentColor",d:y(he)},null,8,Xe)])),t[8]||(t[8]=e("h2",{class:"text-xl font-semibold text-gray-900"},"기본 정보",-1))]),r.value?(n(),o("div",Ze,[e("div",null,[t[9]||(t[9]=e("label",{class:"text-sm font-medium text-gray-600"},"이름",-1)),e("p",et,l(r.value.name),1)]),e("div",null,[t[10]||(t[10]=e("label",{class:"text-sm font-medium text-gray-600"},"연락처",-1)),e("p",tt,l(r.value.phone),1)]),e("div",null,[t[11]||(t[11]=e("label",{class:"text-sm font-medium text-gray-600"},"보호자 연락처",-1)),e("p",st,l(r.value.parent),1)]),e("div",null,[t[12]||(t[12]=e("label",{class:"text-sm font-medium text-gray-600"},"생년월일",-1)),e("p",at,l(r.value.birthday),1)])])):g("",!0)]),e("div",nt,[e("div",ot,[(n(),o("svg",lt,[e("path",{fill:"currentColor",d:y(we)},null,8,rt)])),t[13]||(t[13]=e("h2",{class:"text-xl font-semibold text-gray-900"},"출결 현황",-1))]),r.value?(n(),o("div",dt,[e("div",it,[e("label",ut,[t[14]||(t[14]=e("span",{class:"text-sm font-medium text-gray-600"},"연도:",-1)),w(e("input",{type:"number","onUpdate:modelValue":t[1]||(t[1]=a=>b.value=a),class:"px-3 py-1 border border-gray-200 rounded-lg text-sm w-24 focus:ring-2 focus:ring-indigo-500"},null,512),[[U,b.value]])]),e("label",ct,[t[15]||(t[15]=e("span",{class:"text-sm font-medium text-gray-600"},"월:",-1)),w(e("input",{type:"number","onUpdate:modelValue":t[2]||(t[2]=a=>_.value=a),class:"px-3 py-1 border border-gray-200 rounded-lg text-sm w-20 focus:ring-2 focus:ring-indigo-500",min:"1",max:"12"},null,512),[[U,_.value]])]),e("button",{class:"px-4 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors",onClick:t[3]||(t[3]=a=>R(r.value.id))}," 조회 ")]),e("div",gt,[e("div",pt,[t[16]||(t[16]=e("div",{class:"text-sm text-gray-600"},"출석",-1)),e("div",xt,l(ae.value),1)]),e("div",vt,[t[17]||(t[17]=e("div",{class:"text-sm text-gray-600"},"결석",-1)),e("div",mt,l(ne.value),1)]),e("div",yt,[t[18]||(t[18]=e("div",{class:"text-sm text-gray-600"},"보강",-1)),e("div",ft,l(oe.value),1)])]),e("div",bt,[e("table",_t,[t[20]||(t[20]=e("thead",{class:"bg-gray-50"},[e("tr",null,[e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"},"날짜"),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"},"요일"),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"},"상태"),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"},"시간")])],-1)),e("tbody",ht,[(n(!0),o(B,null,P(E.value,a=>(n(),o("tr",{key:a.id,class:"hover:bg-gray-50"},[e("td",wt,l(A(a.type==="absence"?a.absenceDate:a.attendanceDate)),1),e("td",kt,l(Z(a.type==="absence"?a.absenceDate:a.attendanceDate)),1),e("td",Ct,[e("span",{class:Q(["px-2 py-1 rounded-full text-xs font-medium",te(a)])},l(ee(a)),3)]),e("td",St,l(a.type==="absence"?"-":`${a.startTime||"-"} ~ ${a.endTime||"-"}`),1)]))),128)),E.value.length===0?(n(),o("tr",Dt,t[19]||(t[19]=[e("td",{colspan:"4",class:"px-6 py-4 text-center text-sm text-gray-500"}," 해당 기간에 출결 기록이 없습니다. ",-1)]))):g("",!0)])])])])):g("",!0)]),e("div",Mt,[e("div",Pt,[(n(),o("svg",Tt,[e("path",{fill:"currentColor",d:y(ke)},null,8,Bt)])),t[21]||(t[21]=e("h2",{class:"text-xl font-semibold text-gray-900"},"학습 현황",-1))]),r.value?(n(),o("div",jt,[(n(),o(B,null,P(["Python","COS Pro","타자연습"],(a,c)=>e("div",{key:c},[e("div",Ot,[e("span",Rt,l(c),1),t[22]||(t[22]=e("span",{class:"text-sm font-medium text-gray-700"},"50%",-1))]),e("div",$t,[e("div",{class:Q(["h-2.5 rounded-full transition-all duration-300",se(c)]),style:{width:"50%"}},null,2)])])),64))])):g("",!0)]),e("div",Vt,[e("div",Ut,[(n(),o("svg",Lt,[e("path",{fill:"currentColor",d:y(Ce)},null,8,Nt)])),t[23]||(t[23]=e("h2",{class:"text-xl font-semibold text-gray-900"},"보강 목록",-1))]),e("div",Yt,[w(e("select",{"onUpdate:modelValue":t[4]||(t[4]=a=>C.value=a),class:"px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"},t[24]||(t[24]=[e("option",{value:"week"},"주간",-1),e("option",{value:"month"},"월간",-1),e("option",{value:"all"},"전체",-1)]),512),[[W,C.value]]),w(e("select",{"onUpdate:modelValue":t[5]||(t[5]=a=>S.value=a),class:"px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"},t[25]||(t[25]=[e("option",{value:"asc"},"오름차순",-1),e("option",{value:"desc"},"내림차순",-1)]),512),[[W,S.value]])]),e("div",At,[(n(!0),o(B,null,P($.value,a=>(n(),o("div",{key:a.id,class:"p-4 bg-gray-50 rounded-lg border border-gray-200"},[e("div",Et,[e("div",null,[e("div",Ft,l(A(a.attendanceDate)),1),e("div",It,l(a.startTime||"-")+" ~ "+l(a.endTime||"-"),1),a.makeupType?(n(),o("div",zt,l(a.makeupType),1)):g("",!0)]),t[26]||(t[26]=e("span",{class:"px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"}," 보강 ",-1))])]))),128)),$.value.length===0?(n(),o("div",Qt," 보강 기록이 없습니다. ")):g("",!0)]),M.value?(n(),o("div",Wt,[e("div",qt,[t[31]||(t[31]=e("h3",{class:"text-lg font-semibold text-gray-900 mb-4"},"학생 삭제 확인",-1)),e("p",Gt,[t[27]||(t[27]=T(" 정말 ")),e("span",Ht,l((i=p.value)==null?void 0:i.name),1),t[28]||(t[28]=T(" 학생을 삭제하시겠습니까? ")),t[29]||(t[29]=e("br",null,null,-1)),t[30]||(t[30]=e("span",{class:"text-red-600 text-sm"},"이 작업은 되돌릴 수 없습니다.",-1))]),e("div",{class:"flex justify-end gap-3"},[e("button",{class:"px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors",onClick:ge}," 취소 "),e("button",{class:"px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors",onClick:ce}," 삭제 ")])])])):g("",!0)])])])]}),_:1})]),_:1}))}},Zt=pe(Jt,[["__scopeId","data-v-05ab1c06"]]);export{Zt as default};
