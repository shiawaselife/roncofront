import{k as y,l as f,r as g,n as m,c as x,w as i,_ as w,A as I,o as d,a as v,b as s,t as u,u as h,d as _,F as b,p as k,j as A,q as M,s as S}from"./index-a961658a.js";function D(n,p="yyyy-MM-dd HH:mm:ss"){const t=new Date(n),e=(o,c=2)=>{let l=String(o);for(;l.length<c;)l="0"+l;return l},r={yyyy:t.getFullYear(),MM:e(t.getMonth()+1),dd:e(t.getDate()),HH:e(t.getHours()),mm:e(t.getMinutes()),ss:e(t.getSeconds())};let a=p;for(const o in r)a=a.replace(o,r[o]);return a}const B=n=>(M("data-v-928d0a81"),n=n(),S(),n),H={class:"text-2xl font-bold mb-4"},F={key:0,class:"overflow-x-auto"},N={class:"min-w-full bg-white rounded-lg shadow overflow-hidden"},R=B(()=>s("thead",{class:"bg-green-500 text-white"},[s("tr",null,[s("th",{class:"py-3 px-6 text-left"},"등원 날짜"),s("th",{class:"py-3 px-6 text-left"},"등원 시간")])],-1)),V={class:"py-4 px-6"},$={class:"py-4 px-6"},j={key:1,class:"text-gray-600"},q={__name:"AttendanceInfo",setup(n){const t=f().params.studentId,e=g([]),r=async()=>{try{const a=await I.getAttendanceById(t);e.value=a.data}catch(a){console.error("등원 기록 조회 중 오류:",a)}};return m(()=>{r()}),(a,o)=>(d(),x(w,null,{default:i(()=>[v(A,null,{default:i(()=>[s("h2",H,"학생 ID: "+u(h(t))+" - 등원 기록",1),e.value.length?(d(),_("div",F,[s("table",N,[R,s("tbody",null,[(d(!0),_(b,null,k(e.value,c=>(d(),_("tr",{key:c.id,class:"border-b hover:bg-gray-100"},[s("td",V,u(c.attendanceDate),1),s("td",$,u(h(D)(c.createdAt)),1)]))),128))])])])):(d(),_("p",j,"등원 기록이 없습니다."))]),_:1})]),_:1}))}},E=y(q,[["__scopeId","data-v-928d0a81"]]);export{E as default};
