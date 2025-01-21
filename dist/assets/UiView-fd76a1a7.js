import{r as g,x as _,aA as L,c as P,w as e,_ as R,o as W,a as l,aB as T,H as m,af as v,b as a,ab as o,u,j as h,ar as b,aC as O,O as j,ad as k,aD as H,aE as J,aF as q,aG as A,aH as F,ak as M,aq as y,aI as f,av as $,aJ as G,a9 as K,aK as z}from"./index-a961658a.js";import{_ as w}from"./SectionTitle-0b0e26ac.js";import{_ as I}from"./FormCheckRadioGroup-6d4ba8fe.js";import{C as Q}from"./CardBoxComponentEmpty-2e85b2c4.js";import"./FormCheckRadio-7b3c3258.js";const X=a("p",null,"This is sample modal",-1),Y=a("p",null,"Lorem ipsum dolor",-1),Z=a("p",null,"This is sample modal",-1),ll=a("p",null,"Lorem ipsum dolor",-1),el=a("p",null,"This is sample modal",-1),ol=a("p",null,"Lorem ipsum dolor",-1),al={class:"text-center py-24 lg:py-12 text-gray-500 dark:text-slate-400"},ul={class:"space-y-12"},nl=a("div",{class:"space-y-3"},[a("p",null,"Click to see in action")],-1),tl=a("div",{class:"space-y-3"},[a("p",null,"Click to see in action")],-1),il=a("div",{class:"space-y-3"},[a("p",null,"Click to see in action")],-1),sl=a("h1",{class:"text-2xl text-gray-500 dark:text-slate-400"},"Notifications",-1),dl={class:"flex items-center justify-center mt-6"},cl=a("b",null,"Info state",-1),rl=a("b",null,"Success state",-1),fl=a("b",null,"Warning state",-1),ml=a("b",null,"Danger state",-1),vl=a("b",null,"Contrast",-1),_l={class:"grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2"},bl=a("div",{class:"space-y-3"},[a("p",null,"Card with title, icon & footer")],-1),Vl={__name:"UiView",setup(pl){const S=g(!1),D=g(!1),N=g(!1),U=g([]),r=_(()=>U.value.indexOf("outline")>-1),p=g([]),t=_(()=>p.value.indexOf("outline")>-1),i=_(()=>p.value.indexOf("small")>-1),s=_(()=>p.value.indexOf("disabled")>-1),d=_(()=>p.value.indexOf("rounded")>-1),x=g(["icon"]),C=_(()=>x.value.indexOf("outline")>-1),B=_(()=>x.value.indexOf("small")>-1),V=_(()=>x.value.indexOf("icon")>-1?z:null),E=L();return(gl,n)=>(W(),P(R,null,{default:e(()=>[l(T,{modelValue:S.value,"onUpdate:modelValue":n[0]||(n[0]=c=>S.value=c),title:"Please confirm action","button-label":"Confirm","has-cancel":""},{default:e(()=>[X,Y]),_:1},8,["modelValue"]),l(T,{modelValue:D.value,"onUpdate:modelValue":n[1]||(n[1]=c=>D.value=c),title:"Unhandled exception",button:"danger"},{default:e(()=>[Z,ll]),_:1},8,["modelValue"]),l(T,{modelValue:N.value,"onUpdate:modelValue":n[2]||(n[2]=c=>N.value=c),title:"Success",button:"success"},{default:e(()=>[el,ol]),_:1},8,["modelValue"]),l(w,{first:""},{default:e(()=>[m("Dark mode")]),_:1}),l(h,null,{default:e(()=>[l(v,{class:"md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-2xl md:mx-auto"},{default:e(()=>[a("div",al,[l(o,{label:"Toggle",color:"contrast",onClick:n[3]||(n[3]=c=>u(E).set())})])]),_:1})]),_:1}),l(w,null,{default:e(()=>[m("Modal examples")]),_:1}),l(h,null,{default:e(()=>[a("div",ul,[l(v,{class:"cursor-pointer md:w-7/12 lg:w-5/12 shadow-2xl md:mx-auto","is-hoverable":"",onClick:n[4]||(n[4]=c=>S.value=!0)},{footer:e(()=>[l(b,null,{default:e(()=>[l(o,{label:"Confirm",color:"info"}),l(o,{label:"Cancel",color:"info",outline:""})]),_:1})]),default:e(()=>[l(O,{title:"Please confirm action"},{default:e(()=>[l(o,{icon:u(j),color:"whiteDark",small:"","rounded-full":""},null,8,["icon"])]),_:1}),nl]),_:1}),l(v,{class:"cursor-pointer md:w-7/12 lg:w-5/12 shadow-2xl md:mx-auto","is-hoverable":"",onClick:n[5]||(n[5]=c=>D.value=!0)},{footer:e(()=>[l(b,null,{default:e(()=>[l(o,{label:"Done",color:"danger"})]),_:1})]),default:e(()=>[l(O,{title:"Unhandled exception"}),tl]),_:1}),l(v,{class:"cursor-pointer md:w-7/12 lg:w-5/12 shadow-2xl md:mx-auto","is-hoverable":"",onClick:n[6]||(n[6]=c=>N.value=!0)},{footer:e(()=>[l(o,{label:"Done",color:"success"})]),default:e(()=>[l(O,{title:"Success"}),il]),_:1})])]),_:1}),l(w,{custom:""},{default:e(()=>[sl,a("div",dl,[l(I,{modelValue:U.value,"onUpdate:modelValue":n[7]||(n[7]=c=>U.value=c),type:"switch",name:"notifications-switch",options:{outline:"Outline"}},null,8,["modelValue"])])]),_:1}),l(h,null,{default:e(()=>[l(k,{color:"info",icon:u(H),outline:r.value},{right:e(()=>[l(o,{label:"Button",color:r.value?"info":"white",outline:r.value,"rounded-full":"",small:""},null,8,["color","outline"])]),default:e(()=>[cl,m(". NotificationBar ")]),_:1},8,["icon","outline"]),l(k,{color:"success",icon:u(J),outline:r.value},{right:e(()=>[l(o,{label:"Button",color:r.value?"success":"white",outline:r.value,"rounded-full":"",small:""},null,8,["color","outline"])]),default:e(()=>[rl,m(". NotificationBar ")]),_:1},8,["icon","outline"]),l(k,{color:"warning",icon:u(q),outline:r.value},{right:e(()=>[l(o,{label:"Button",color:r.value?"warning":"white",outline:r.value,"rounded-full":"",small:""},null,8,["color","outline"])]),default:e(()=>[fl,m(". NotificationBar ")]),_:1},8,["icon","outline"]),l(k,{color:"danger",icon:u(A),outline:r.value},{right:e(()=>[l(o,{label:"Button",color:r.value?"danger":"white",outline:r.value,"rounded-full":"",small:""},null,8,["color","outline"])]),default:e(()=>[ml,m(". NotificationBar ")]),_:1},8,["icon","outline"]),l(k,{color:"contrast",icon:u(F),outline:r.value},{default:e(()=>[vl,m(". NotificationBar ")]),_:1},8,["icon","outline"])]),_:1}),l(w,null,{default:e(()=>[m("Buttons")]),_:1}),l(h,null,{default:e(()=>[l(v,null,{default:e(()=>[l(M,{label:"Settings"},{default:e(()=>[l(I,{modelValue:p.value,"onUpdate:modelValue":n[8]||(n[8]=c=>p.value=c),name:"buttons-switch",type:"switch",options:{outline:"Outline",small:"Small",rounded:"Rounded",disabled:"Disabled"}},null,8,["modelValue"])]),_:1}),l(y),l(b,null,{default:e(()=>[l(o,{color:"lightDark",label:"Button",small:i.value,outline:t.value,disabled:s.value,"rounded-full":d.value},null,8,["small","outline","disabled","rounded-full"]),l(o,{color:"contrast",label:"Button",small:i.value,outline:t.value,disabled:s.value,"rounded-full":d.value},null,8,["small","outline","disabled","rounded-full"]),l(o,{color:"info",label:"Button",small:i.value,outline:t.value,disabled:s.value,"rounded-full":d.value},null,8,["small","outline","disabled","rounded-full"]),l(o,{color:"success",label:"Button",small:i.value,outline:t.value,disabled:s.value,"rounded-full":d.value},null,8,["small","outline","disabled","rounded-full"]),l(o,{color:"warning",label:"Button",small:i.value,outline:t.value,disabled:s.value,"rounded-full":d.value},null,8,["small","outline","disabled","rounded-full"]),l(o,{color:"danger",label:"Button",small:i.value,outline:t.value,disabled:s.value,"rounded-full":d.value},null,8,["small","outline","disabled","rounded-full"])]),_:1}),l(y),l(b,null,{default:e(()=>[l(o,{color:"lightDark",label:"Button",icon:u(f),small:i.value,outline:t.value,disabled:s.value,"rounded-full":d.value},null,8,["icon","small","outline","disabled","rounded-full"]),l(o,{color:"contrast",label:"Button",icon:u(f),small:i.value,outline:t.value,disabled:s.value,"rounded-full":d.value},null,8,["icon","small","outline","disabled","rounded-full"]),l(o,{color:"info",label:"Button",icon:u(f),small:i.value,outline:t.value,disabled:s.value,"rounded-full":d.value},null,8,["icon","small","outline","disabled","rounded-full"]),l(o,{color:"success",label:"Button",icon:u(f),small:i.value,outline:t.value,disabled:s.value,"rounded-full":d.value},null,8,["icon","small","outline","disabled","rounded-full"]),l(o,{color:"warning",label:"Button",icon:u(f),small:i.value,outline:t.value,disabled:s.value,"rounded-full":d.value},null,8,["icon","small","outline","disabled","rounded-full"]),l(o,{color:"danger",label:"Button",icon:u(f),small:i.value,outline:t.value,disabled:s.value,"rounded-full":d.value},null,8,["icon","small","outline","disabled","rounded-full"])]),_:1}),l(y),l(b,null,{default:e(()=>[l(o,{color:"lightDark",icon:u(f),small:i.value,outline:t.value,disabled:s.value,"rounded-full":d.value},null,8,["icon","small","outline","disabled","rounded-full"]),l(o,{color:"contrast",icon:u(f),small:i.value,outline:t.value,disabled:s.value,"rounded-full":d.value},null,8,["icon","small","outline","disabled","rounded-full"]),l(o,{color:"info",icon:u(f),small:i.value,outline:t.value,disabled:s.value,"rounded-full":d.value},null,8,["icon","small","outline","disabled","rounded-full"]),l(o,{color:"success",icon:u(f),small:i.value,outline:t.value,disabled:s.value,"rounded-full":d.value},null,8,["icon","small","outline","disabled","rounded-full"]),l(o,{color:"warning",icon:u(f),small:i.value,outline:t.value,disabled:s.value,"rounded-full":d.value},null,8,["icon","small","outline","disabled","rounded-full"]),l(o,{color:"danger",icon:u(f),small:i.value,outline:t.value,disabled:s.value,"rounded-full":d.value},null,8,["icon","small","outline","disabled","rounded-full"])]),_:1})]),_:1})]),_:1}),l(w,null,{default:e(()=>[m("Pills")]),_:1}),l(h,null,{default:e(()=>[l(v,null,{default:e(()=>[l(M,{label:"Settings"},{default:e(()=>[l(I,{modelValue:x.value,"onUpdate:modelValue":n[9]||(n[9]=c=>x.value=c),name:"buttons-switch",type:"switch",options:{outline:"Outline",small:"Small",icon:"Icon"}},null,8,["modelValue"])]),_:1}),l(y),l(b,null,{default:e(()=>[l($,{color:"contrast",label:"Contrast",small:B.value,outline:C.value,icon:V.value},null,8,["small","outline","icon"]),l($,{color:"info",label:"Info",small:B.value,outline:C.value,icon:V.value},null,8,["small","outline","icon"]),l($,{color:"success",label:"Success",small:B.value,outline:C.value,icon:V.value},null,8,["small","outline","icon"]),l($,{color:"warning",label:"Warning",small:B.value,outline:C.value,icon:V.value},null,8,["small","outline","icon"]),l($,{color:"danger",label:"Danger",small:B.value,outline:C.value,icon:V.value},null,8,["small","outline","icon"])]),_:1})]),_:1})]),_:1}),l(w,null,{default:e(()=>[m("Cards")]),_:1}),l(h,null,{default:e(()=>[a("div",_l,[l(v,null,{footer:e(()=>[l(b,null,{default:e(()=>[l(o,{label:"Confirm",color:"info"}),l(o,{label:"Cancel",color:"info",outline:""})]),_:1})]),default:e(()=>[l(O,{title:"With title & icon"},{default:e(()=>[l(o,{icon:u(G),color:"whiteDark","rounded-full":""},null,8,["icon"])]),_:1}),bl]),_:1}),l(v,null,{footer:e(()=>[l(b,null,{default:e(()=>[l(o,{label:"Confirm",color:"info"}),l(o,{label:"Cancel",color:"info",outline:""})]),_:1})]),default:e(()=>[m(" Just body & footer ")]),_:1})]),l(K,{icon:u(A),title:"Empty variation"},null,8,["icon"]),l(v,null,{default:e(()=>[l(Q)]),_:1})]),_:1})]),_:1}))}};export{Vl as default};
