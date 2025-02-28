import{s as N,r as y,v as S,k as A,c as U,w as b,L as E,o as d,a as O,b as e,H as B,I as F,ab as K,t as u,K as f,d as p,F as v,n as w,C as q,_ as R}from"./index-5fc67d8a.js";const M="9af9e3432d304de6b3274ac8e8a9a160",_=N.create({baseURL:"https://newsapi.org/v2",params:{apiKey:M}});class V{async getKoreanTechNews(){try{return(await _.get("/everything",{params:{q:"(IT OR 테크 OR 기술 OR AI OR 인공지능 OR 개발)",language:"ko",sortBy:"publishedAt",pageSize:30,domains:"zdnet.co.kr,etnews.com,bloter.net,aitimes.com,venture.co.kr"}})).data.articles.map(s=>({id:s.url,title:s.title,description:s.description||"내용이 없습니다.",category:{name:this.getCategoryFromTitle(s.title),type:"tech"},timestamp:s.publishedAt,externalUrl:s.url,source:s.source.name,imageUrl:s.urlToImage}))}catch(a){return console.error("Error fetching Korean tech news:",a),[]}}async getNaverNews(){try{const a=new Date,r=new Date(a.getTime()-7*24*60*60*1e3).toISOString().split("T")[0],i=a.toISOString().split("T")[0];return(await N.get("/v1/search/news.json",{headers:{"X-Naver-Client-Id":"D09FBOxISDaoDhEVqfPj","X-Naver-Client-Secret":"C3FN8ediq6"},params:{query:"IT/과학",sort:"date",display:100,start:1,pd:1,ds:r,de:i}})).data.items.map(l=>({id:l.link,title:l.title.replace(/(<([^>]+)>)/gi,""),description:l.description.replace(/(<([^>]+)>)/gi,""),category:{name:this.getCategoryFromTitle(l.title),type:"tech"},timestamp:new Date(l.pubDate),externalUrl:l.link,source:l.source}))}catch(a){return console.error("Error fetching Naver news:",a),[]}}getCategoryFromTitle(a){const s={AI:["AI","인공지능","머신러닝","딥러닝"],블록체인:["블록체인","암호화폐","비트코인","이더리움"],모바일:["모바일","스마트폰","애플","안드로이드"],개발:["개발","프로그래밍","코딩","소프트웨어"],IT비즈니스:["스타트업","투자","실적","매출"],보안:["보안","해킹","사이버","악성코드"]};for(const[r,i]of Object.entries(s))if(i.some(c=>a.includes(c)))return r;return"IT/기술"}async getAllNews(){try{const[a,s]=await Promise.all([[],this.getNaverNews()]),r=[...a,...s];return Array.from(new Map(r.map(c=>[c.id,c])).values()).sort((c,l)=>new Date(l.timestamp)-new Date(c.timestamp))}catch(a){throw console.error("Error fetching all news:",a),a}}async searchNews(a){try{return(await _.get("/everything",{params:{q:a,language:"ko",sortBy:"publishedAt",pageSize:20,domains:"zdnet.co.kr,etnews.com,bloter.net,aitimes.com,venture.co.kr"}})).data.articles.map(r=>({id:r.url,title:r.title,description:r.description||"내용이 없습니다.",category:{name:this.getCategoryFromTitle(r.title),type:"tech"},timestamp:r.publishedAt,externalUrl:r.url,source:r.source.name,imageUrl:r.urlToImage}))}catch(s){throw console.error("Error searching news:",s),s}}}const k=new V,j={class:"min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"},z={class:"max-w-6xl mx-auto"},L={class:"bg-white rounded-2xl shadow-sm overflow-hidden"},$={class:"border-b border-gray-100"},P={class:"px-6 py-5 bg-gradient-to-r from-blue-50 to-indigo-50"},W={class:"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"},H={class:"flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto"},X={class:"relative w-full sm:w-64"},Y={class:"flex items-center gap-3"},G={class:"text-sm text-gray-500"},J=["disabled"],Q={class:"px-6 py-6"},Z={key:0,class:"flex justify-center items-center py-20"},ee={key:1,class:"text-center py-20"},te={class:"text-red-500 mb-4"},se={key:2,class:"space-y-8"},re={class:"flex flex-wrap items-center gap-2 mb-3"},ae={class:"text-sm text-gray-500"},oe={class:"text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors"},ne=["href"],le={class:"text-gray-600 leading-relaxed mb-4"},ie={class:"flex items-center gap-4"},ce=["onClick"],de=["onClick"],ge={__name:"TrendNewsView",setup(T){const a=y([]),s=y(!1),r=y(null),i=y(""),c=S(()=>new Date().toLocaleString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"})),l=o=>{const t=new Date,n=new Date(o),g=Math.abs(t-n),m=Math.floor(g/(1e3*60*60));return m<1?"방금 전":m<24?`${m}시간 전`:`${Math.floor(m/24)}일 전`},h=async()=>{s.value=!0,r.value=null;try{const o=await k.getAllNews();a.value=o.map(t=>({...t,time:l(t.timestamp),tags:[t.source],bookmarked:!1}))}catch(o){r.value="뉴스를 불러오는데 실패했습니다",console.error(o)}finally{s.value=!1}},D=async()=>{if(!i.value.trim())return h();s.value=!0,r.value=null;try{const o=await k.searchNews(i.value);a.value=o.map(t=>({...t,time:l(t.timestamp),tags:[t.source],bookmarked:!1}))}catch(o){r.value="검색에 실패했습니다",console.error(o)}finally{s.value=!1}},C=o=>{o.bookmarked=!o.bookmarked},I=async o=>{try{navigator.share?await navigator.share({title:o.title,text:o.description,url:o.externalUrl}):(await navigator.clipboard.writeText(o.externalUrl),alert("링크가 클립보드에 복사되었습니다."))}catch(t){console.error("Error sharing news:",t)}},x=()=>{h()};return A(()=>{h()}),(o,t)=>(d(),U(E,null,{default:b(()=>[O(R,null,{default:b(()=>[e("div",j,[e("div",z,[e("div",L,[e("div",$,[e("div",P,[e("div",W,[t[2]||(t[2]=e("h2",{class:"text-2xl font-bold text-gray-800"},"트렌드/뉴스",-1)),e("div",H,[e("div",X,[B(e("input",{"onUpdate:modelValue":t[0]||(t[0]=n=>i.value=n),type:"text",placeholder:"뉴스 검색...",class:"w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors",onKeyup:K(D,["enter"])},null,544),[[F,i.value]]),t[1]||(t[1]=e("i",{class:"fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"},null,-1))]),e("div",Y,[e("span",G,u(c.value)+" 업데이트",1),e("button",{class:"p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50",onClick:x,disabled:s.value},[e("i",{class:f(["fas fa-sync",{"animate-spin":s.value}])},null,2)],8,J)])])])])]),e("div",Q,[s.value?(d(),p("div",Z,t[3]||(t[3]=[e("div",{class:"animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"},null,-1)]))):r.value?(d(),p("div",ee,[e("p",te,u(r.value),1),e("button",{onClick:x,class:"px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"}," 다시 시도 ")])):(d(),p("div",se,[(d(!0),p(v,null,w(a.value,n=>(d(),p("div",{key:n.id,class:"group p-6 bg-white rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-200"},[e("div",re,[e("span",{class:f(["px-3 py-1.5 rounded-full text-sm font-medium",n.category.type==="tech"?"bg-blue-100 text-blue-700":"",n.category.type==="science"?"bg-green-100 text-green-700":"",n.category.type==="education"?"bg-purple-100 text-purple-700":""])},u(n.category.name),3),(d(!0),p(v,null,w(n.tags,g=>(d(),p("span",{key:g,class:"px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm"},u(g),1))),128)),e("span",ae,u(n.time),1)]),e("h3",oe,[e("a",{href:n.externalUrl,target:"_blank",class:"flex items-center gap-2"},[q(u(n.title)+" ",1),t[4]||(t[4]=e("i",{class:"fas fa-external-link-alt text-gray-400 text-sm transition-colors group-hover:text-blue-500"},null,-1))],8,ne)]),e("p",le,u(n.description),1),e("div",ie,[e("button",{onClick:g=>C(n),class:f(["flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors",n.bookmarked?"text-yellow-500":"text-gray-500"])},t[5]||(t[5]=[e("i",{class:"fas fa-bookmark"},null,-1),e("span",{class:"text-sm"},"북마크",-1)]),10,ce),e("button",{onClick:g=>I(n),class:"flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"},t[6]||(t[6]=[e("i",{class:"fas fa-share-alt"},null,-1),e("span",{class:"text-sm"},"공유",-1)]),8,de)])]))),128))]))])])])])]),_:1})]),_:1}))}};export{ge as default};
