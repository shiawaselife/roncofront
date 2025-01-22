import{r as d,V as me,y as f,n as pe,x as _,c as V,w as P,_ as xe,o,a as B,b as e,d as l,u as x,W as _e,E as H,D as L,X as ge,t as r,Y as ve,Z as be,$ as fe,T as he,p as v,F as b,a0 as ye,I as u,O as g,M as E,K as U,a1 as X,a2 as K,L as W,j as we}from"./index-e0e2da98.js";import{d as ke}from"./dayjs.min-ebd611c2.js";const Ce={class:"max-w-7xl mx-auto p-6 space-y-8"},De={class:"flex items-center justify-between bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl shadow-sm"},Te={class:"flex items-center space-x-3"},Oe={class:"w-8 h-8 text-orange-500",viewBox:"0 0 24 24"},Se=["d"],Pe=e("h1",{class:"text-2xl font-bold text-gray-800"},"자격증 관리",-1),Ee={class:"w-5 h-5 mr-2",viewBox:"0 0 24 24"},Re=["d"],Ae={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"},Me={class:"bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm"},Ie={class:"flex items-center space-x-2 mb-2"},Ve={class:"w-6 h-6 text-blue-600",viewBox:"0 0 24 24"},Be=["d"],Le=e("span",{class:"text-sm font-medium text-gray-600"},"이번 달 시험",-1),Ue={class:"text-3xl font-bold text-gray-800"},Ne={class:"bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm"},je={class:"flex items-center space-x-2 mb-2"},Fe={class:"w-6 h-6 text-green-600",viewBox:"0 0 24 24"},Ye=["d"],$e=e("span",{class:"text-sm font-medium text-gray-600"},"응시 예정",-1),Qe={class:"text-3xl font-bold text-gray-800"},ze={class:"bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-sm"},Ge={class:"flex items-center space-x-2 mb-2"},He={class:"w-6 h-6 text-purple-600",viewBox:"0 0 24 24"},Xe=["d"],Ke=e("span",{class:"text-sm font-medium text-gray-600"},"이번 달 합격",-1),We={class:"text-3xl font-bold text-gray-800"},Ze={class:"bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl shadow-sm"},qe={class:"flex items-center space-x-2 mb-2"},Je={class:"w-6 h-6 text-pink-600",viewBox:"0 0 24 24"},et=["d"],tt=e("span",{class:"text-sm font-medium text-gray-600"},"평균 합격률",-1),st={class:"text-3xl font-bold text-gray-800"},at={class:"bg-white rounded-xl shadow-sm overflow-hidden"},ot={class:"border-b border-gray-100 p-6"},lt={class:"flex items-center space-x-3"},rt={class:"w-6 h-6 text-gray-600",viewBox:"0 0 24 24"},nt=["d"],it=e("h2",{class:"text-lg font-semibold text-gray-800"},"예정된 시험",-1),dt={class:"px-2 py-1"},ct={class:"divide-y divide-gray-100"},ut={class:"flex items-center space-x-3"},mt={class:"font-medium text-gray-900"},pt={class:"text-gray-500"},xt={class:"flex items-center space-x-2"},_t={class:"px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"},gt={class:"bg-white rounded-xl shadow-sm overflow-hidden"},vt={class:"border-b border-gray-100 p-6"},bt={class:"flex items-center justify-between"},ft={class:"flex items-center space-x-3"},ht={class:"w-6 h-6 text-gray-600",viewBox:"0 0 24 24"},yt=["d"],wt=e("h2",{class:"text-lg font-semibold text-gray-800"},"최근 시험 결과",-1),kt={class:"w-5 h-5 mr-2",viewBox:"0 0 24 24"},Ct=["d"],Dt={class:"p-6 border-b border-gray-100 bg-gray-50"},Tt={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},Ot=e("option",{value:""},"모든 시험 유형",-1),St=["value"],Pt={class:"p-6"},Et={class:"text-lg font-semibold text-gray-800 mb-4"},Rt={class:"text-sm text-gray-500"},At={class:"overflow-x-auto"},Mt={class:"w-full"},It=e("thead",null,[e("tr",{class:"bg-gray-50"},[e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},"이름"),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},"점수"),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},"등급"),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},"결과"),e("th",{class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},"관리")])],-1),Vt={class:"bg-white divide-y divide-gray-200"},Bt={class:"px-6 py-4 whitespace-nowrap"},Lt={class:"px-6 py-4 whitespace-nowrap font-medium"},Ut={class:"px-6 py-4 whitespace-nowrap"},Nt={class:"px-6 py-4 whitespace-nowrap"},jt={class:"px-6 py-4 whitespace-nowrap"},Ft=["onClick"],Yt={key:0,class:"fixed inset-0 z-[100]"},$t=e("div",{class:"absolute inset-0 bg-gray-900/75 backdrop-blur-sm"},null,-1),Qt={class:"relative flex items-center justify-center min-h-screen p-4"},zt={class:"bg-white rounded-xl shadow-xl w-full max-w-md relative p-6"},Gt=e("h2",{class:"text-xl font-bold mb-4"},"시험 추가",-1),Ht={class:"space-y-4"},Xt=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"시험 종류",-1),Kt=["value"],Wt=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"시험 일자",-1),Zt=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"시험 시간",-1),qt=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"최대 인원",-1),Jt={key:0,class:"fixed inset-0 z-[100]"},es=e("div",{class:"absolute inset-0 bg-gray-900/75 backdrop-blur-sm"},null,-1),ts={class:"relative flex items-center justify-center min-h-screen p-4"},ss={class:"bg-white rounded-xl shadow-xl w-full max-w-2xl relative p-6"},as=e("h2",{class:"text-xl font-bold mb-4"},"시험 결과 관리",-1),os={class:"grid grid-cols-2 gap-4 mb-4"},ls=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"시험 선택",-1),rs=["value"],ns=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"학생 선택",-1),is={class:"relative"},ds=["value"],cs={class:"space-y-4 mb-6"},us=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"점수",-1),ms=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"시험 응시 일시",-1),ps=e("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"피드백",-1),xs={class:"bg-gray-50 p-4 rounded-lg"},_s={class:"grid grid-cols-2 gap-4"},gs=e("span",{class:"text-sm text-gray-500"},"등급:",-1),vs={class:"ml-2 font-bold"},bs=e("span",{class:"text-sm text-gray-500"},"결과:",-1),ws={__name:"CertificatateManagement",setup(fs){const R=d(!1),c=d({type:"COS_PRO_2",examDate:"",examTime:"",maxParticipants:30}),m=me(),w=d([]),N=d([]),h=d({monthlyExams:0,upcomingParticipants:0,monthlyPassed:0,passRate:0}),k={COS_PRO_1:"COS Pro 1급",COS_PRO_2:"COS Pro 2급",COS_1:"COS 1급",COS_2:"COS 2급",SQLD:"SQLD",ADsP:"ADsP",FINAL:"기말고사",MID_TERM:"중간고사"},j=["COS_PRO_1","COS_PRO_2","COS_1","COS_2","SQLD","ADsP","FINAL","MID_TERM"],Z=()=>{R.value=!0},F=()=>{R.value=!1,c.value={type:"COS_PRO_2",examDate:"",examTime:"",maxParticipants:30}},A=s=>ke(s).format("YYYY-MM-DD HH:mm"),q=f(()=>{const s={};return de.value.forEach(a=>{var i;const t=a.examId;if(!s[t]){const S=I.value.find(ue=>ue.id===t);S&&(s[t]={examId:t,type:S.type,examDateTime:S.examDateTime,results:[]})}(i=s[t])==null||i.results.push(a)}),Object.values(s).filter(a=>a).sort((a,t)=>new Date(t.examDateTime)-new Date(a.examDateTime))}),Y=async()=>{try{const s=await _.get("/api/exams");w.value=s.data}catch(s){console.error("예정된 시험 조회 실패:",s),m.error("예정된 시험 목록을 불러오는데 실패했습니다.")}},$=async()=>{try{const s=await _.get("/api/exams/recent-results");N.value=s.data}catch(s){console.error("시험 결과 조회 실패:",s),m.error("시험 결과를 불러오는데 실패했습니다.")}},J=async()=>{try{const s=await _.get("/api/exams/statistics");h.value=s.data}catch(s){console.error("통계 조회 실패:",s),m.error("통계 정보를 불러오는데 실패했습니다.")}},ee=async()=>{try{const s=await _.post("/api/exams",{type:c.value.type,examDateTime:`${c.value.examDate}T${c.value.examTime}:00`,maxParticipants:c.value.maxParticipants});F(),m.success("시험이 성공적으로 생성되었습니다."),await Y()}catch(s){console.error("시험 생성 실패:",s),m.error("시험 생성에 실패했습니다.")}};pe(async()=>{await Promise.all([Y(),$(),J(),ae(),ce()])});const Q=f(()=>s=>({COS_PRO_1:"COS Pro 1급",COS_PRO_2:"COS Pro 2급",COS_1:"COS 1급",COS_2:"COS 2급",SQLD:"SQLD",ADsP:"ADsP",FINAL:"기말고사",MID_TERM:"중간고사"})[s]||s),C=d(!1),p=d(null),y=d(null),M=d([]),n=d({id:null,score:null,examTakenAt:"",feedback:""}),te=f(()=>{if(!p.value||!n.value.score)return"-";const s=w.value.find(a=>a.id===p.value);return s?re(s.type,n.value.score):"-"}),z=f(()=>{if(!p.value||!n.value.score)return!1;const s=w.value.find(a=>a.id===p.value);return s?ne(s.type,n.value.score):!1}),se=()=>{C.value=!0},ae=async()=>{try{const s=await _.get("/api/students");M.value=s.data}catch(s){console.error("학생 목록 조회 실패:",s),m.error("학생 목록을 불러오는데 실패했습니다.")}},oe=async()=>{try{const s={examId:p.value,studentId:y.value,score:n.value.score,examTakenAt:n.value.examTakenAt,feedback:n.value.feedback};n.value.id?(await _.put(`/api/exam-results/${n.value.id}`,s),m.success("시험 결과가 수정되었습니다.")):(await _.post("/api/exam-results",s),m.success("시험 결과가 저장되었습니다.")),G(),await $()}catch(s){console.error("시험 결과 저장 실패:",s),m.error("시험 결과 저장에 실패했습니다.")}},le=s=>{p.value=s.examId,y.value=s.studentId,n.value={id:s.id,score:s.score,examTakenAt:s.examTakenAt,feedback:s.feedback},C.value=!0},G=()=>{C.value=!1,p.value=null,y.value=null,n.value={id:null,score:null,examTakenAt:"",feedback:""}},re=(s,a)=>{const t=a/100*100;return t>=90?"A":t>=80?"B":t>=70?"C":t>=60?"D":"F"},ne=(s,a)=>a/100*100>=60,D=d(""),T=d(""),O=d(""),ie=f(()=>{if(!D.value)return M.value;const s=D.value.toLowerCase();return M.value.filter(a=>a.name.toLowerCase().includes(s))}),de=f(()=>{let s=[...N.value];if(T.value){const a=T.value.toLowerCase();s=s.filter(t=>t.studentName.toLowerCase().includes(a))}return O.value&&(s=s.filter(a=>a.examType===k[O.value])),s}),I=d([]),ce=async()=>{try{const s=await _.get("/api/exams/all");I.value=s.data}catch(s){console.error("시험 목록 조회 실패:",s),m.error("시험 목록을 불러오는데 실패했습니다.")}};return(s,a)=>(o(),V(xe,null,{default:P(()=>[B(we,null,{default:P(()=>[e("div",Ce,[e("div",De,[e("div",Te,[(o(),l("svg",Oe,[e("path",{fill:"currentColor",d:x(_e)},null,8,Se)])),Pe]),e("button",{onClick:Z,class:"flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition duration-150 ease-in-out"},[(o(),l("svg",Ee,[e("path",{fill:"currentColor",d:x(H)},null,8,Re)])),L(" 시험 추가 ")])]),e("div",Ae,[e("div",Me,[e("div",Ie,[(o(),l("svg",Ve,[e("path",{fill:"currentColor",d:x(ge)},null,8,Be)])),Le]),e("div",Ue,r(h.value.monthlyExams)+"건",1)]),e("div",Ne,[e("div",je,[(o(),l("svg",Fe,[e("path",{fill:"currentColor",d:x(ve)},null,8,Ye)])),$e]),e("div",Qe,r(h.value.upcomingParticipants)+"명",1)]),e("div",ze,[e("div",Ge,[(o(),l("svg",He,[e("path",{fill:"currentColor",d:x(be)},null,8,Xe)])),Ke]),e("div",We,r(h.value.monthlyPassed)+"명",1)]),e("div",Ze,[e("div",qe,[(o(),l("svg",Je,[e("path",{fill:"currentColor",d:x(fe)},null,8,et)])),tt]),e("div",st,r(h.value.passRate)+"%",1)])]),e("div",at,[e("div",ot,[e("div",lt,[(o(),l("svg",rt,[e("path",{fill:"indigo",d:x(he)},null,8,nt)])),it])]),e("div",dt,[e("ul",ct,[(o(!0),l(b,null,v(w.value,t=>(o(),l("li",{key:t.id,class:"py-4 flex items-center justify-between hover:bg-gray-50 rounded-lg px-4 transition duration-150 ease-in-out"},[e("div",ut,[e("span",mt,r(Q.value(t.type)),1),e("span",pt,r(A(t.examDateTime)),1)]),e("div",xt,[e("span",_t,r(t.currentParticipants)+"/"+r(t.maxParticipants)+"명 ",1)])]))),128))])])]),e("div",gt,[e("div",vt,[e("div",bt,[e("div",ft,[(o(),l("svg",ht,[e("path",{fill:"orange",d:x(ye)},null,8,yt)])),wt]),e("button",{onClick:se,class:"flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm transition duration-150 ease-in-out"},[(o(),l("svg",kt,[e("path",{fill:"currentColor",d:x(H)},null,8,Ct)])),L(" 결과 입력 ")])])]),e("div",Dt,[e("div",Tt,[u(e("input",{type:"text","onUpdate:modelValue":a[0]||(a[0]=t=>T.value=t),placeholder:"학생 이름으로 검색...",class:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"},null,512),[[g,T.value]]),u(e("select",{"onUpdate:modelValue":a[1]||(a[1]=t=>O.value=t),class:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"},[Ot,(o(),l(b,null,v(j,t=>e("option",{key:t,value:t},r(k[t]),9,St)),64))],512),[[E,O.value]])])]),e("div",Pt,[(o(!0),l(b,null,v(q.value,t=>(o(),l("div",{key:t.examId,class:"mb-8"},[e("div",Et,[L(r(k[t.type])+" ",1),e("span",Rt,r(A(t.examDateTime)),1)]),e("div",At,[e("table",Mt,[It,e("tbody",Vt,[(o(!0),l(b,null,v(t.results,i=>(o(),l("tr",{key:i.id,class:"hover:bg-gray-50 transition duration-150 ease-in-out"},[e("td",Bt,r(i.studentName),1),e("td",Lt,r(i.score),1),e("td",Ut,[e("span",{class:U(["px-2 py-1 text-sm rounded-full",{"bg-green-100 text-green-800":i.grade==="A","bg-blue-100 text-blue-800":i.grade==="B","bg-yellow-100 text-yellow-800":i.grade==="C","bg-orange-100 text-orange-800":i.grade==="D","bg-red-100 text-red-800":i.grade==="F"}])},r(i.grade),3)]),e("td",Nt,[e("span",{class:U(["px-2 py-1 text-sm rounded-full",i.passed?"bg-green-100 text-green-800":"bg-red-100 text-red-800"])},r(i.passed?"합격":"불합격"),3)]),e("td",jt,[e("button",{onClick:S=>le(i),class:"text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"}," 수정 ",8,Ft)])]))),128))])])])]))),128))])])]),(o(),V(X,{to:"body"},[B(K,{"enter-active-class":"transition duration-200 ease-out","enter-from-class":"opacity-0","enter-to-class":"opacity-100","leave-active-class":"transition duration-200 ease-in","leave-from-class":"opacity-100","leave-to-class":"opacity-0"},{default:P(()=>[R.value?(o(),l("div",Yt,[$t,e("div",Qt,[e("div",zt,[Gt,e("div",Ht,[e("div",null,[Xt,u(e("select",{"onUpdate:modelValue":a[2]||(a[2]=t=>c.value.type=t),class:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},[(o(),l(b,null,v(j,t=>e("option",{key:t,value:t},r(Q.value(t)),9,Kt)),64))],512),[[E,c.value.type]])]),e("div",null,[Wt,u(e("input",{type:"date","onUpdate:modelValue":a[3]||(a[3]=t=>c.value.examDate=t),class:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,512),[[g,c.value.examDate]])]),e("div",null,[Zt,u(e("input",{type:"time","onUpdate:modelValue":a[4]||(a[4]=t=>c.value.examTime=t),class:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,512),[[g,c.value.examTime]])]),e("div",null,[qt,u(e("input",{type:"number","onUpdate:modelValue":a[5]||(a[5]=t=>c.value.maxParticipants=t),class:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,512),[[g,c.value.maxParticipants]])])]),e("div",{class:"flex justify-end space-x-2 mt-6"},[e("button",{onClick:F,class:"px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out"}," 취소 "),e("button",{onClick:ee,class:"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out"}," 추가 ")])])])])):W("",!0)]),_:1})])),(o(),V(X,{to:"body"},[B(K,{"enter-active-class":"transition duration-200 ease-out","enter-from-class":"opacity-0","enter-to-class":"opacity-100","leave-active-class":"transition duration-200 ease-in","leave-from-class":"opacity-100","leave-to-class":"opacity-0"},{default:P(()=>[C.value?(o(),l("div",Jt,[es,e("div",ts,[e("div",ss,[as,e("div",os,[e("div",null,[ls,u(e("select",{"onUpdate:modelValue":a[6]||(a[6]=t=>p.value=t),class:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},[(o(!0),l(b,null,v(I.value,t=>(o(),l("option",{key:t.id,value:t.id},r(k[t.type])+" ("+r(A(t.examDateTime))+") ",9,rs))),128))],512),[[E,p.value]])]),e("div",null,[ns,e("div",is,[u(e("input",{type:"text","onUpdate:modelValue":a[7]||(a[7]=t=>D.value=t),placeholder:"학생 이름 검색...",class:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"},null,512),[[g,D.value]]),u(e("select",{"onUpdate:modelValue":a[8]||(a[8]=t=>y.value=t),class:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",size:"5"},[(o(!0),l(b,null,v(ie.value,t=>(o(),l("option",{key:t.id,value:t.id},r(t.name),9,ds))),128))],512),[[E,y.value]])])])]),e("div",cs,[e("div",null,[us,u(e("input",{type:"number","onUpdate:modelValue":a[9]||(a[9]=t=>n.value.score=t),class:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",min:"0",max:"100"},null,512),[[g,n.value.score]])]),e("div",null,[ms,u(e("input",{type:"datetime-local","onUpdate:modelValue":a[10]||(a[10]=t=>n.value.examTakenAt=t),class:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,512),[[g,n.value.examTakenAt]])]),e("div",null,[ps,u(e("textarea",{"onUpdate:modelValue":a[11]||(a[11]=t=>n.value.feedback=t),rows:"3",class:"w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,512),[[g,n.value.feedback]])]),e("div",xs,[e("div",_s,[e("div",null,[gs,e("span",vs,r(te.value),1)]),e("div",null,[bs,e("span",{class:U(["ml-2 font-bold",z.value?"text-green-600":"text-red-600"])},r(z.value?"합격":"불합격"),3)])])])]),e("div",{class:"flex justify-end space-x-2"},[e("button",{onClick:G,class:"px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out"}," 취소 "),e("button",{onClick:oe,class:"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out"}," 저장 ")])])])])):W("",!0)]),_:1})]))]),_:1})]),_:1}))}};export{ws as default};
