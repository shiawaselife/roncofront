import{r as i,z as N,n as k,c as F,w as d,_ as L,o,a as r,b as t,d as a,u as l,a3 as M,a4 as c,a5 as R,a6 as w,a7 as O,a8 as T,D as x,p as m,t as n,K as C,F as p,U as G,a9 as I,j as $}from"./index-e0e2da98.js";const z={class:"max-w-7xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen"},A={class:"bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-sm"},V={class:"flex items-center"},K={class:"w-8 h-8 text-blue-600",viewBox:"0 0 24 24"},U=["d"],q=t("h1",{class:"text-2xl font-bold text-gray-800 ml-3"},"리포트 센터",-1),H={class:"grid grid-cols-1 md:grid-cols-3 gap-6"},J={class:"flex items-start"},Q={class:"bg-green-100 p-3 rounded-lg"},W={class:"w-6 h-6 text-green-600",viewBox:"0 0 24 24"},X=["d"],Y=t("div",{class:"ml-4"},[t("h2",{class:"text-lg font-semibold text-gray-800"},"학습 보고서"),t("p",{class:"text-sm text-gray-600 mt-1"},"학생별 학습 현황 리포트")],-1),Z={class:"flex items-start"},tt={class:"bg-purple-100 p-3 rounded-lg"},st={class:"w-6 h-6 text-purple-600",viewBox:"0 0 24 24"},et=["d"],ot=t("div",{class:"ml-4"},[t("h2",{class:"text-lg font-semibold text-gray-800"},"포트폴리오 관리"),t("p",{class:"text-sm text-gray-600 mt-1"},"학생 결과물 및 기록")],-1),at={class:"flex items-start"},lt={class:"bg-orange-100 p-3 rounded-lg"},nt={class:"w-6 h-6 text-orange-600",viewBox:"0 0 24 24"},dt=["d"],it=t("div",{class:"ml-4"},[t("h2",{class:"text-lg font-semibold text-gray-800"},"상담 기록"),t("p",{class:"text-sm text-gray-600 mt-1"},"문의 및 상담 관리")],-1),rt={class:"grid grid-cols-1 md:grid-cols-2 gap-6"},ct={class:"bg-white rounded-xl shadow-sm overflow-hidden"},_t={class:"border-b border-gray-100 p-6"},ut={class:"flex items-center justify-between"},ht={class:"flex items-center space-x-3"},gt={class:"bg-blue-100 p-2 rounded-lg"},xt={class:"w-5 h-5 text-blue-600",viewBox:"0 0 24 24"},mt=["d"],pt=t("h3",{class:"text-lg font-semibold text-gray-800"},"최근 상담 기록",-1),vt={class:"p-6"},ft={class:"space-y-4"},bt={class:"flex justify-between items-start"},yt={class:"flex items-center space-x-2"},wt={class:"font-semibold text-gray-800"},Ct={class:"px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"},Pt={class:"text-sm text-gray-600 mt-1"},Dt={class:"text-right"},Et={class:"text-sm text-gray-500"},jt={class:"bg-white rounded-xl shadow-sm overflow-hidden"},St={class:"border-b border-gray-100 p-6"},Bt={class:"flex items-center justify-between"},Nt={class:"flex items-center space-x-3"},kt={class:"bg-purple-100 p-2 rounded-lg"},Ft={class:"w-5 h-5 text-purple-600",viewBox:"0 0 24 24"},Lt=["d"],Mt=t("h3",{class:"text-lg font-semibold text-gray-800"},"포트폴리오",-1),Rt={class:"p-6"},Ot={class:"space-y-4"},Tt={class:"flex justify-between items-start"},Gt={class:"font-semibold text-gray-800"},It={class:"text-sm text-gray-600 mt-1"},$t={class:"text-sm text-gray-500"},zt={class:"bg-white rounded-xl shadow-sm overflow-hidden"},At={class:"border-b border-gray-100 p-6"},Vt={class:"flex items-center space-x-3"},Kt={class:"bg-green-100 p-2 rounded-lg"},Ut={class:"w-5 h-5 text-green-600",viewBox:"0 0 24 24"},qt=["d"],Ht=t("div",null,[t("h3",{class:"text-lg font-semibold text-gray-800"},"학생별 진도 현황"),t("p",{class:"text-sm text-gray-500 mt-1"},"선택된 학생의 프로그래밍 진도율")],-1),Jt={class:"p-6"},Qt={class:"space-y-6"},Wt={class:"flex justify-between mb-2"},Xt={class:"font-medium text-gray-800"},Yt={class:"text-sm text-gray-600"},Zt={class:"text-gray-400"},ts={class:"w-full h-2 bg-gray-200 rounded-full overflow-hidden"},os={__name:"ReportCenter",setup(ss){const u=i([]),_=i("");i("monthly");const v=i([]),f=i([]),b=i([]),h=s=>new Date(s).toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),P=s=>({PENDING:"text-yellow-500 font-semibold",IN_PROGRESS:"text-blue-500 font-semibold",COMPLETED:"text-green-600 font-semibold",CANCELLED:"text-red-500 font-semibold"})[s]||"text-gray-500 font-semibold",D=s=>({PENDING:"상담예정",IN_PROGRESS:"상담중",COMPLETED:"처리완료",CANCELLED:"취소됨"})[s]||s,E=s=>({"Python 기초":"bg-blue-500","Arduino 기초":"bg-purple-500","C언어/Python 혼합과정":"bg-green-500"})[s]||"bg-gray-500",j=async()=>{try{const s=await fetch("/api/students");u.value=await s.json(),u.value.length>0&&(_.value=u.value[0].id)}catch(s){console.error("Failed to load students:",s)}},S=async()=>{try{const s=await fetch("/api/consultations/recent");v.value=await s.json()}catch(s){console.error("Failed to load recent consultations:",s)}},B=async()=>{try{const s=await fetch("/api/portfolios/recent");f.value=await s.json()}catch(s){console.error("Failed to load recent portfolios:",s)}},y=async()=>{if(_.value)try{const s=await fetch(`/api/learning-reports/student/${_.value}`);b.value=await s.json()}catch(s){console.error("Failed to load student progress:",s)}};return N(_,()=>{y()}),k(async()=>{await j(),await Promise.all([S(),B(),y()])}),(s,g)=>(o(),F(L,null,{default:d(()=>[r($,null,{default:d(()=>[t("div",z,[t("div",A,[t("div",V,[(o(),a("svg",K,[t("path",{fill:"currentColor",d:l(M)},null,8,U)])),q])]),t("div",H,[r(l(c),{to:"/learning-reports",class:"bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 transform hover:-translate-y-1"},{default:d(()=>[t("div",J,[t("div",Q,[(o(),a("svg",W,[t("path",{fill:"currentColor",d:l(R)},null,8,X)]))]),Y])]),_:1}),r(l(c),{to:"/portfolios",class:"bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 transform hover:-translate-y-1"},{default:d(()=>[t("div",Z,[t("div",tt,[(o(),a("svg",st,[t("path",{fill:"currentColor",d:l(w)},null,8,et)]))]),ot])]),_:1}),r(l(c),{to:"/consultations",class:"bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 transform hover:-translate-y-1"},{default:d(()=>[t("div",at,[t("div",lt,[(o(),a("svg",nt,[t("path",{fill:"currentColor",d:l(O)},null,8,dt)]))]),it])]),_:1})]),t("div",rt,[t("div",ct,[t("div",_t,[t("div",ut,[t("div",ht,[t("div",gt,[(o(),a("svg",xt,[t("path",{fill:"currentColor",d:l(T)},null,8,mt)]))]),pt]),r(l(c),{to:"/consultations",class:"text-sm text-blue-600 hover:text-blue-700 font-medium"},{default:d(()=>[x(" 전체보기 ")]),_:1})])]),t("div",vt,[t("ul",ft,[(o(!0),a(p,null,m(v.value,e=>(o(),a("li",{key:e.id,class:"bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"},[t("div",bt,[t("div",null,[t("div",yt,[t("span",wt,n(e.student.name),1),t("span",Ct,n(e.type),1)]),t("p",Pt,n(e.content),1)]),t("div",Dt,[t("div",Et,n(h(e.consultationDate)),1),t("span",{class:C(["text-xs font-medium px-2 py-1 rounded-full mt-1 inline-block",P(e.status)])},n(D(e.status)),3)])])]))),128))])])]),t("div",jt,[t("div",St,[t("div",Bt,[t("div",Nt,[t("div",kt,[(o(),a("svg",Ft,[t("path",{fill:"currentColor",d:l(w)},null,8,Lt)]))]),Mt]),r(l(c),{to:"/portfolios",class:"text-sm text-blue-600 hover:text-blue-700 font-medium"},{default:d(()=>[x(" 전체보기 ")]),_:1})])]),t("div",Rt,[t("ul",Ot,[(o(!0),a(p,null,m(f.value,e=>(o(),a("li",{key:e.id,class:"bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"},[t("div",Tt,[t("div",null,[t("div",Gt,n(e.title),1),t("p",It,n(e.student.name),1)]),t("div",$t,n(h(e.createdDate)),1)])]))),128))])])])]),t("div",zt,[t("div",At,[t("div",Vt,[t("div",Kt,[(o(),a("svg",Ut,[t("path",{fill:"currentColor",d:l(G)},null,8,qt)]))]),Ht])]),t("div",Jt,[t("div",Qt,[(o(!0),a(p,null,m(b.value,e=>(o(),a("div",{key:e.id,class:"bg-gray-50 rounded-lg p-4"},[t("div",Wt,[t("span",Xt,n(e.subject),1),t("span",Yt,[x(n(e.progress)+"% ",1),t("span",Zt," (최근 업데이트: "+n(h(e.lastUpdate))+") ",1)])]),t("div",ts,[t("div",{class:C(["h-full rounded-full transition-all duration-300",E(e.subject)]),style:I({width:`${e.progress}%`})},null,6)])]))),128))])])])])]),_:1})]),_:1}))}};export{os as default};
