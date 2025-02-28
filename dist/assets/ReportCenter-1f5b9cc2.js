import{r as i,x as B,k as L,c as N,w as r,L as F,o as l,a as c,b as t,d as a,u as n,a4 as M,a5 as u,a6 as R,a7 as w,a8 as O,a9 as T,C as x,n as m,t as d,K as C,F as p,V as A,aa as G,_ as I}from"./index-5fc67d8a.js";const V={class:"max-w-7xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen"},$={class:"bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-sm"},z={class:"flex items-center"},K={class:"w-8 h-8 text-blue-600",viewBox:"0 0 24 24"},U=["d"],q={class:"grid grid-cols-1 md:grid-cols-3 gap-6"},H={class:"flex items-start"},J={class:"bg-green-100 p-3 rounded-lg"},Q={class:"w-6 h-6 text-green-600",viewBox:"0 0 24 24"},W=["d"],X={class:"flex items-start"},Y={class:"bg-purple-100 p-3 rounded-lg"},Z={class:"w-6 h-6 text-purple-600",viewBox:"0 0 24 24"},tt=["d"],st={class:"flex items-start"},et={class:"bg-orange-100 p-3 rounded-lg"},ot={class:"w-6 h-6 text-orange-600",viewBox:"0 0 24 24"},lt=["d"],at={class:"grid grid-cols-1 md:grid-cols-2 gap-6"},nt={class:"bg-white rounded-xl shadow-sm overflow-hidden"},dt={class:"border-b border-gray-100 p-6"},rt={class:"flex items-center justify-between"},it={class:"flex items-center space-x-3"},ct={class:"bg-blue-100 p-2 rounded-lg"},ut={class:"w-5 h-5 text-blue-600",viewBox:"0 0 24 24"},_t=["d"],ht={class:"p-6"},gt={class:"space-y-4"},xt={class:"flex justify-between items-start"},mt={class:"flex items-center space-x-2"},pt={class:"font-semibold text-gray-800"},vt={class:"px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"},ft={class:"text-sm text-gray-600 mt-1"},bt={class:"text-right"},yt={class:"text-sm text-gray-500"},wt={class:"bg-white rounded-xl shadow-sm overflow-hidden"},Ct={class:"border-b border-gray-100 p-6"},Pt={class:"flex items-center justify-between"},Dt={class:"flex items-center space-x-3"},Et={class:"bg-purple-100 p-2 rounded-lg"},St={class:"w-5 h-5 text-purple-600",viewBox:"0 0 24 24"},jt=["d"],kt={class:"p-6"},Bt={class:"space-y-4"},Lt={class:"flex justify-between items-start"},Nt={class:"font-semibold text-gray-800"},Ft={class:"text-sm text-gray-600 mt-1"},Mt={class:"text-sm text-gray-500"},Rt={class:"bg-white rounded-xl shadow-sm overflow-hidden"},Ot={class:"border-b border-gray-100 p-6"},Tt={class:"flex items-center space-x-3"},At={class:"bg-green-100 p-2 rounded-lg"},Gt={class:"w-5 h-5 text-green-600",viewBox:"0 0 24 24"},It=["d"],Vt={class:"p-6"},$t={class:"space-y-6"},zt={class:"flex justify-between mb-2"},Kt={class:"font-medium text-gray-800"},Ut={class:"text-sm text-gray-600"},qt={class:"text-gray-400"},Ht={class:"w-full h-2 bg-gray-200 rounded-full overflow-hidden"},Wt={__name:"ReportCenter",setup(Jt){const h=i([]),_=i("");i("monthly");const v=i([]),f=i([]),b=i([]),g=s=>new Date(s).toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),P=s=>({PENDING:"text-yellow-500 font-semibold",IN_PROGRESS:"text-blue-500 font-semibold",COMPLETED:"text-green-600 font-semibold",CANCELLED:"text-red-500 font-semibold"})[s]||"text-gray-500 font-semibold",D=s=>({PENDING:"상담예정",IN_PROGRESS:"상담중",COMPLETED:"처리완료",CANCELLED:"취소됨"})[s]||s,E=s=>({"Python 기초":"bg-blue-500","Arduino 기초":"bg-purple-500","C언어/Python 혼합과정":"bg-green-500"})[s]||"bg-gray-500",S=async()=>{try{const s=await fetch("/api/students");h.value=await s.json(),h.value.length>0&&(_.value=h.value[0].id)}catch(s){console.error("Failed to load students:",s)}},j=async()=>{try{const s=await fetch("/api/consultations/recent");v.value=await s.json()}catch(s){console.error("Failed to load recent consultations:",s)}},k=async()=>{try{const s=await fetch("/api/portfolios/recent");f.value=await s.json()}catch(s){console.error("Failed to load recent portfolios:",s)}},y=async()=>{if(_.value)try{const s=await fetch(`/api/learning-reports/student/${_.value}`);b.value=await s.json()}catch(s){console.error("Failed to load student progress:",s)}};return B(_,()=>{y()}),L(async()=>{await S(),await Promise.all([j(),k(),y()])}),(s,e)=>(l(),N(F,null,{default:r(()=>[c(I,null,{default:r(()=>[t("div",V,[t("div",$,[t("div",z,[(l(),a("svg",K,[t("path",{fill:"currentColor",d:n(M)},null,8,U)])),e[0]||(e[0]=t("h1",{class:"text-2xl font-bold text-gray-800 ml-3"},"리포트 센터",-1))])]),t("div",q,[c(n(u),{to:"/learning-reports",class:"bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 transform hover:-translate-y-1"},{default:r(()=>[t("div",H,[t("div",J,[(l(),a("svg",Q,[t("path",{fill:"currentColor",d:n(R)},null,8,W)]))]),e[1]||(e[1]=t("div",{class:"ml-4"},[t("h2",{class:"text-lg font-semibold text-gray-800"},"학습 보고서"),t("p",{class:"text-sm text-gray-600 mt-1"},"학생별 학습 현황 리포트")],-1))])]),_:1}),c(n(u),{to:"/portfolios",class:"bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 transform hover:-translate-y-1"},{default:r(()=>[t("div",X,[t("div",Y,[(l(),a("svg",Z,[t("path",{fill:"currentColor",d:n(w)},null,8,tt)]))]),e[2]||(e[2]=t("div",{class:"ml-4"},[t("h2",{class:"text-lg font-semibold text-gray-800"},"포트폴리오 관리"),t("p",{class:"text-sm text-gray-600 mt-1"},"학생 결과물 및 기록")],-1))])]),_:1}),c(n(u),{to:"/consultations",class:"bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 transform hover:-translate-y-1"},{default:r(()=>[t("div",st,[t("div",et,[(l(),a("svg",ot,[t("path",{fill:"currentColor",d:n(O)},null,8,lt)]))]),e[3]||(e[3]=t("div",{class:"ml-4"},[t("h2",{class:"text-lg font-semibold text-gray-800"},"상담 기록"),t("p",{class:"text-sm text-gray-600 mt-1"},"문의 및 상담 관리")],-1))])]),_:1})]),t("div",at,[t("div",nt,[t("div",dt,[t("div",rt,[t("div",it,[t("div",ct,[(l(),a("svg",ut,[t("path",{fill:"currentColor",d:n(T)},null,8,_t)]))]),e[4]||(e[4]=t("h3",{class:"text-lg font-semibold text-gray-800"},"최근 상담 기록",-1))]),c(n(u),{to:"/consultations",class:"text-sm text-blue-600 hover:text-blue-700 font-medium"},{default:r(()=>e[5]||(e[5]=[x(" 전체보기 ")])),_:1})])]),t("div",ht,[t("ul",gt,[(l(!0),a(p,null,m(v.value,o=>(l(),a("li",{key:o.id,class:"bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"},[t("div",xt,[t("div",null,[t("div",mt,[t("span",pt,d(o.student.name),1),t("span",vt,d(o.type),1)]),t("p",ft,d(o.content),1)]),t("div",bt,[t("div",yt,d(g(o.consultationDate)),1),t("span",{class:C(["text-xs font-medium px-2 py-1 rounded-full mt-1 inline-block",P(o.status)])},d(D(o.status)),3)])])]))),128))])])]),t("div",wt,[t("div",Ct,[t("div",Pt,[t("div",Dt,[t("div",Et,[(l(),a("svg",St,[t("path",{fill:"currentColor",d:n(w)},null,8,jt)]))]),e[6]||(e[6]=t("h3",{class:"text-lg font-semibold text-gray-800"},"포트폴리오",-1))]),c(n(u),{to:"/portfolios",class:"text-sm text-blue-600 hover:text-blue-700 font-medium"},{default:r(()=>e[7]||(e[7]=[x(" 전체보기 ")])),_:1})])]),t("div",kt,[t("ul",Bt,[(l(!0),a(p,null,m(f.value,o=>(l(),a("li",{key:o.id,class:"bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"},[t("div",Lt,[t("div",null,[t("div",Nt,d(o.title),1),t("p",Ft,d(o.student.name),1)]),t("div",Mt,d(g(o.createdDate)),1)])]))),128))])])])]),t("div",Rt,[t("div",Ot,[t("div",Tt,[t("div",At,[(l(),a("svg",Gt,[t("path",{fill:"currentColor",d:n(A)},null,8,It)]))]),e[8]||(e[8]=t("div",null,[t("h3",{class:"text-lg font-semibold text-gray-800"},"학생별 진도 현황"),t("p",{class:"text-sm text-gray-500 mt-1"},"선택된 학생의 프로그래밍 진도율")],-1))])]),t("div",Vt,[t("div",$t,[(l(!0),a(p,null,m(b.value,o=>(l(),a("div",{key:o.id,class:"bg-gray-50 rounded-lg p-4"},[t("div",zt,[t("span",Kt,d(o.subject),1),t("span",Ut,[x(d(o.progress)+"% ",1),t("span",qt," (최근 업데이트: "+d(g(o.lastUpdate))+") ",1)])]),t("div",Ht,[t("div",{class:C(["h-full rounded-full transition-all duration-300",E(o.subject)]),style:G({width:`${o.progress}%`})},null,6)])]))),128))])])])])]),_:1})]),_:1}))}};export{Wt as default};
