import{r as w,v as b,aF as R,c as W,w as o,L as E,o as J,a as l,b as a,aG as A,C as v,ak as c,ag as u,u as n,_ as x,aw as p,aH as $,R as j,ai as y,aI as F,aJ as G,aK as H,aL as M,aM as K,ap as L,av as S,aN as f,aA as O,aO as q,ae as z,aP as Q}from"./index-5fc67d8a.js";import{_ as C}from"./SectionTitle-e7650a52.js";import{_ as I}from"./FormCheckRadioGroup-d849791e.js";import{C as X}from"./CardBoxComponentEmpty-d2cb67ba.js";import"./FormCheckRadio-e979ec04.js";const Y={class:"text-center py-24 lg:py-12 text-gray-500 dark:text-slate-400"},Z={class:"space-y-12"},h={class:"flex items-center justify-center mt-6"},ll={class:"grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2"},dl={__name:"UiView",setup(el){const D=w(!1),N=w(!1),U=w(!1),T=w([]),m=b(()=>T.value.indexOf("outline")>-1),g=w([]),t=b(()=>g.value.indexOf("outline")>-1),i=b(()=>g.value.indexOf("small")>-1),d=b(()=>g.value.indexOf("disabled")>-1),s=b(()=>g.value.indexOf("rounded")>-1),B=w(["icon"]),V=b(()=>B.value.indexOf("outline")>-1),k=b(()=>B.value.indexOf("small")>-1),_=b(()=>B.value.indexOf("icon")>-1?Q:null),P=R();return(ol,e)=>(J(),W(E,null,{default:o(()=>[l(A,{modelValue:D.value,"onUpdate:modelValue":e[0]||(e[0]=r=>D.value=r),title:"Please confirm action","button-label":"Confirm","has-cancel":""},{default:o(()=>e[10]||(e[10]=[a("p",null,"This is sample modal",-1),a("p",null,"Lorem ipsum dolor",-1)])),_:1},8,["modelValue"]),l(A,{modelValue:N.value,"onUpdate:modelValue":e[1]||(e[1]=r=>N.value=r),title:"Unhandled exception",button:"danger"},{default:o(()=>e[11]||(e[11]=[a("p",null,"This is sample modal",-1),a("p",null,"Lorem ipsum dolor",-1)])),_:1},8,["modelValue"]),l(A,{modelValue:U.value,"onUpdate:modelValue":e[2]||(e[2]=r=>U.value=r),title:"Success",button:"success"},{default:o(()=>e[12]||(e[12]=[a("p",null,"This is sample modal",-1),a("p",null,"Lorem ipsum dolor",-1)])),_:1},8,["modelValue"]),l(C,{first:""},{default:o(()=>e[13]||(e[13]=[v("Dark mode")])),_:1}),l(x,null,{default:o(()=>[l(c,{class:"md:w-7/12 lg:w-5/12 xl:w-4/12 shadow-2xl md:mx-auto"},{default:o(()=>[a("div",Y,[l(u,{label:"Toggle",color:"contrast",onClick:e[3]||(e[3]=r=>n(P).set())})])]),_:1})]),_:1}),l(C,null,{default:o(()=>e[14]||(e[14]=[v("Modal examples")])),_:1}),l(x,null,{default:o(()=>[a("div",Z,[l(c,{class:"cursor-pointer md:w-7/12 lg:w-5/12 shadow-2xl md:mx-auto","is-hoverable":"",onClick:e[4]||(e[4]=r=>D.value=!0)},{footer:o(()=>[l(p,null,{default:o(()=>[l(u,{label:"Confirm",color:"info"}),l(u,{label:"Cancel",color:"info",outline:""})]),_:1})]),default:o(()=>[l($,{title:"Please confirm action"},{default:o(()=>[l(u,{icon:n(j),color:"whiteDark",small:"","rounded-full":""},null,8,["icon"])]),_:1}),e[15]||(e[15]=a("div",{class:"space-y-3"},[a("p",null,"Click to see in action")],-1))]),_:1}),l(c,{class:"cursor-pointer md:w-7/12 lg:w-5/12 shadow-2xl md:mx-auto","is-hoverable":"",onClick:e[5]||(e[5]=r=>N.value=!0)},{footer:o(()=>[l(p,null,{default:o(()=>[l(u,{label:"Done",color:"danger"})]),_:1})]),default:o(()=>[l($,{title:"Unhandled exception"}),e[16]||(e[16]=a("div",{class:"space-y-3"},[a("p",null,"Click to see in action")],-1))]),_:1}),l(c,{class:"cursor-pointer md:w-7/12 lg:w-5/12 shadow-2xl md:mx-auto","is-hoverable":"",onClick:e[6]||(e[6]=r=>U.value=!0)},{footer:o(()=>[l(u,{label:"Done",color:"success"})]),default:o(()=>[l($,{title:"Success"}),e[17]||(e[17]=a("div",{class:"space-y-3"},[a("p",null,"Click to see in action")],-1))]),_:1})])]),_:1}),l(C,{custom:""},{default:o(()=>[e[18]||(e[18]=a("h1",{class:"text-2xl text-gray-500 dark:text-slate-400"},"Notifications",-1)),a("div",h,[l(I,{modelValue:T.value,"onUpdate:modelValue":e[7]||(e[7]=r=>T.value=r),type:"switch",name:"notifications-switch",options:{outline:"Outline"}},null,8,["modelValue"])])]),_:1}),l(x,null,{default:o(()=>[l(y,{color:"info",icon:n(F),outline:m.value},{right:o(()=>[l(u,{label:"Button",color:m.value?"info":"white",outline:m.value,"rounded-full":"",small:""},null,8,["color","outline"])]),default:o(()=>[e[19]||(e[19]=a("b",null,"Info state",-1)),e[20]||(e[20]=v(". NotificationBar "))]),_:1},8,["icon","outline"]),l(y,{color:"success",icon:n(G),outline:m.value},{right:o(()=>[l(u,{label:"Button",color:m.value?"success":"white",outline:m.value,"rounded-full":"",small:""},null,8,["color","outline"])]),default:o(()=>[e[21]||(e[21]=a("b",null,"Success state",-1)),e[22]||(e[22]=v(". NotificationBar "))]),_:1},8,["icon","outline"]),l(y,{color:"warning",icon:n(H),outline:m.value},{right:o(()=>[l(u,{label:"Button",color:m.value?"warning":"white",outline:m.value,"rounded-full":"",small:""},null,8,["color","outline"])]),default:o(()=>[e[23]||(e[23]=a("b",null,"Warning state",-1)),e[24]||(e[24]=v(". NotificationBar "))]),_:1},8,["icon","outline"]),l(y,{color:"danger",icon:n(M),outline:m.value},{right:o(()=>[l(u,{label:"Button",color:m.value?"danger":"white",outline:m.value,"rounded-full":"",small:""},null,8,["color","outline"])]),default:o(()=>[e[25]||(e[25]=a("b",null,"Danger state",-1)),e[26]||(e[26]=v(". NotificationBar "))]),_:1},8,["icon","outline"]),l(y,{color:"contrast",icon:n(K),outline:m.value},{default:o(()=>e[27]||(e[27]=[a("b",null,"Contrast",-1),v(". NotificationBar ")])),_:1},8,["icon","outline"])]),_:1}),l(C,null,{default:o(()=>e[28]||(e[28]=[v("Buttons")])),_:1}),l(x,null,{default:o(()=>[l(c,null,{default:o(()=>[l(L,{label:"Settings"},{default:o(()=>[l(I,{modelValue:g.value,"onUpdate:modelValue":e[8]||(e[8]=r=>g.value=r),name:"buttons-switch",type:"switch",options:{outline:"Outline",small:"Small",rounded:"Rounded",disabled:"Disabled"}},null,8,["modelValue"])]),_:1}),l(S),l(p,null,{default:o(()=>[l(u,{color:"lightDark",label:"Button",small:i.value,outline:t.value,disabled:d.value,"rounded-full":s.value},null,8,["small","outline","disabled","rounded-full"]),l(u,{color:"contrast",label:"Button",small:i.value,outline:t.value,disabled:d.value,"rounded-full":s.value},null,8,["small","outline","disabled","rounded-full"]),l(u,{color:"info",label:"Button",small:i.value,outline:t.value,disabled:d.value,"rounded-full":s.value},null,8,["small","outline","disabled","rounded-full"]),l(u,{color:"success",label:"Button",small:i.value,outline:t.value,disabled:d.value,"rounded-full":s.value},null,8,["small","outline","disabled","rounded-full"]),l(u,{color:"warning",label:"Button",small:i.value,outline:t.value,disabled:d.value,"rounded-full":s.value},null,8,["small","outline","disabled","rounded-full"]),l(u,{color:"danger",label:"Button",small:i.value,outline:t.value,disabled:d.value,"rounded-full":s.value},null,8,["small","outline","disabled","rounded-full"])]),_:1}),l(S),l(p,null,{default:o(()=>[l(u,{color:"lightDark",label:"Button",icon:n(f),small:i.value,outline:t.value,disabled:d.value,"rounded-full":s.value},null,8,["icon","small","outline","disabled","rounded-full"]),l(u,{color:"contrast",label:"Button",icon:n(f),small:i.value,outline:t.value,disabled:d.value,"rounded-full":s.value},null,8,["icon","small","outline","disabled","rounded-full"]),l(u,{color:"info",label:"Button",icon:n(f),small:i.value,outline:t.value,disabled:d.value,"rounded-full":s.value},null,8,["icon","small","outline","disabled","rounded-full"]),l(u,{color:"success",label:"Button",icon:n(f),small:i.value,outline:t.value,disabled:d.value,"rounded-full":s.value},null,8,["icon","small","outline","disabled","rounded-full"]),l(u,{color:"warning",label:"Button",icon:n(f),small:i.value,outline:t.value,disabled:d.value,"rounded-full":s.value},null,8,["icon","small","outline","disabled","rounded-full"]),l(u,{color:"danger",label:"Button",icon:n(f),small:i.value,outline:t.value,disabled:d.value,"rounded-full":s.value},null,8,["icon","small","outline","disabled","rounded-full"])]),_:1}),l(S),l(p,null,{default:o(()=>[l(u,{color:"lightDark",icon:n(f),small:i.value,outline:t.value,disabled:d.value,"rounded-full":s.value},null,8,["icon","small","outline","disabled","rounded-full"]),l(u,{color:"contrast",icon:n(f),small:i.value,outline:t.value,disabled:d.value,"rounded-full":s.value},null,8,["icon","small","outline","disabled","rounded-full"]),l(u,{color:"info",icon:n(f),small:i.value,outline:t.value,disabled:d.value,"rounded-full":s.value},null,8,["icon","small","outline","disabled","rounded-full"]),l(u,{color:"success",icon:n(f),small:i.value,outline:t.value,disabled:d.value,"rounded-full":s.value},null,8,["icon","small","outline","disabled","rounded-full"]),l(u,{color:"warning",icon:n(f),small:i.value,outline:t.value,disabled:d.value,"rounded-full":s.value},null,8,["icon","small","outline","disabled","rounded-full"]),l(u,{color:"danger",icon:n(f),small:i.value,outline:t.value,disabled:d.value,"rounded-full":s.value},null,8,["icon","small","outline","disabled","rounded-full"])]),_:1})]),_:1})]),_:1}),l(C,null,{default:o(()=>e[29]||(e[29]=[v("Pills")])),_:1}),l(x,null,{default:o(()=>[l(c,null,{default:o(()=>[l(L,{label:"Settings"},{default:o(()=>[l(I,{modelValue:B.value,"onUpdate:modelValue":e[9]||(e[9]=r=>B.value=r),name:"buttons-switch",type:"switch",options:{outline:"Outline",small:"Small",icon:"Icon"}},null,8,["modelValue"])]),_:1}),l(S),l(p,null,{default:o(()=>[l(O,{color:"contrast",label:"Contrast",small:k.value,outline:V.value,icon:_.value},null,8,["small","outline","icon"]),l(O,{color:"info",label:"Info",small:k.value,outline:V.value,icon:_.value},null,8,["small","outline","icon"]),l(O,{color:"success",label:"Success",small:k.value,outline:V.value,icon:_.value},null,8,["small","outline","icon"]),l(O,{color:"warning",label:"Warning",small:k.value,outline:V.value,icon:_.value},null,8,["small","outline","icon"]),l(O,{color:"danger",label:"Danger",small:k.value,outline:V.value,icon:_.value},null,8,["small","outline","icon"])]),_:1})]),_:1})]),_:1}),l(C,null,{default:o(()=>e[30]||(e[30]=[v("Cards")])),_:1}),l(x,null,{default:o(()=>[a("div",ll,[l(c,null,{footer:o(()=>[l(p,null,{default:o(()=>[l(u,{label:"Confirm",color:"info"}),l(u,{label:"Cancel",color:"info",outline:""})]),_:1})]),default:o(()=>[l($,{title:"With title & icon"},{default:o(()=>[l(u,{icon:n(q),color:"whiteDark","rounded-full":""},null,8,["icon"])]),_:1}),e[31]||(e[31]=a("div",{class:"space-y-3"},[a("p",null,"Card with title, icon & footer")],-1))]),_:1}),l(c,null,{footer:o(()=>[l(p,null,{default:o(()=>[l(u,{label:"Confirm",color:"info"}),l(u,{label:"Cancel",color:"info",outline:""})]),_:1})]),default:o(()=>[e[32]||(e[32]=v(" Just body & footer "))]),_:1})]),l(z,{icon:n(M),title:"Empty variation"},null,8,["icon"]),l(c,null,{default:o(()=>[l(X)]),_:1})]),_:1})]),_:1}))}};export{dl as default};
