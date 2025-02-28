import{r as c,c as y,w as x,L as h,o,a as m,b as s,H as v,I as b,ab as f,d as l,F as u,n as p,t as d,_ as w,s as _}from"./index-5fc67d8a.js";const C={class:"max-w-7xl mx-auto p-6 space-y-8"},L={class:"bg-white rounded-xl shadow-sm p-6"},k={class:"max-w-2xl"},V={class:"flex space-x-2"},B={key:0,class:"bg-white rounded-xl shadow-sm p-12 text-center"},H={key:1,class:"space-y-6"},A={class:"bg-white rounded-xl shadow-sm overflow-hidden"},M={class:"overflow-x-auto"},D={class:"w-full"},N={class:"divide-y divide-gray-200"},F={class:"px-6 py-4 text-sm text-gray-900"},Z={class:"px-6 py-4"},q=["href"],I={class:"px-6 py-4 text-sm text-gray-500"},S={class:"bg-white rounded-xl shadow-sm overflow-hidden"},E={class:"p-6"},K={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"},P={class:"text-gray-700"},O={__name:"BlogRank",setup(X){const a=c(""),r=c([]),g=["제목 키워드 최적화","대표 이미지 활용","포스팅 주기 준수","내부 링크 활용","해시태그 활용"],i=async()=>{const n={query:a.value,display:10,start:1,sort:"date"},t={"X-Naver-Client-Id":"D09FBOxISDaoDhEVqfPj","X-Naver-Client-Secret":"C3FN8ediq6"};try{const e=await _.get("/v1/search/blog",{params:n,headers:t});r.value=e.data.items}catch(e){console.error(e)}};return(n,t)=>(o(),y(h,null,{default:x(()=>[m(w,null,{default:x(()=>[s("div",C,[t[9]||(t[9]=s("div",{class:"bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-sm"},[s("div",{class:"flex items-center space-x-3"},[s("svg",{class:"w-8 h-8 text-blue-600",viewBox:"0 0 24 24"},[s("path",{fill:"currentColor",d:"M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"})]),s("h1",{class:"text-2xl font-bold text-gray-800"},"네이버 블로그 검색 - 상세 분석")])],-1)),s("div",L,[s("div",k,[t[2]||(t[2]=s("label",{class:"block text-sm font-medium text-gray-700 mb-2"},"검색 키워드",-1)),s("div",V,[v(s("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>a.value=e),onKeyup:f(i,["enter"]),class:"flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors",placeholder:"검색어를 입력하세요"},null,544),[[b,a.value]]),s("button",{onClick:i,class:"px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm inline-flex items-center space-x-2"},t[1]||(t[1]=[s("svg",{class:"w-5 h-5",viewBox:"0 0 24 24"},[s("path",{fill:"currentColor",d:"M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"})],-1),s("span",null,"검색",-1)]))])])]),r.value.length?(o(),l("div",H,[s("div",A,[t[6]||(t[6]=s("div",{class:"p-6 border-b border-gray-100"},[s("h2",{class:"text-lg font-semibold text-gray-800"},"상위 10개 포스팅 분석")],-1)),s("div",M,[s("table",D,[t[5]||(t[5]=s("thead",null,[s("tr",{class:"bg-gray-50 text-left"},[s("th",{class:"px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"},"제목"),s("th",{class:"px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"},"링크"),s("th",{class:"px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"},"작성일")])],-1)),s("tbody",N,[(o(!0),l(u,null,p(r.value,e=>(o(),l("tr",{key:e.link,class:"hover:bg-gray-50 transition-colors"},[s("td",F,d(e.title),1),s("td",Z,[s("a",{href:e.link,target:"_blank",class:"text-blue-600 hover:text-blue-800 text-sm inline-flex items-center space-x-1"},t[4]||(t[4]=[s("span",null,"링크",-1),s("svg",{class:"w-4 h-4",viewBox:"0 0 24 24"},[s("path",{fill:"currentColor",d:"M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"})],-1)]),8,q)]),s("td",I,d(e.postdate),1)]))),128))])])])]),s("div",S,[t[8]||(t[8]=s("div",{class:"p-6 border-b border-gray-100"},[s("h2",{class:"text-lg font-semibold text-gray-800"},"개선 포인트")],-1)),s("div",E,[s("ul",K,[(o(),l(u,null,p(g,e=>s("li",{key:e,class:"flex items-start space-x-2 bg-gray-50 p-4 rounded-lg"},[t[7]||(t[7]=s("svg",{class:"w-5 h-5 text-blue-600 mt-0.5",viewBox:"0 0 24 24"},[s("path",{fill:"currentColor",d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"})],-1)),s("span",P,d(e),1)])),64))])])])])):(o(),l("div",B,t[3]||(t[3]=[s("div",{class:"text-gray-500"},"검색어를 입력하여 블로그를 분석해보세요.",-1)])))])]),_:1})]),_:1}))}};export{O as default};
