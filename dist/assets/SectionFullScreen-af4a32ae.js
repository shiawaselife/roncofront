import{c as n,a5 as t,am as i,an as l,ao as c,b as o,i as u,ai as d,ah as p}from"./index-4925a545.js";const k={__name:"SectionFullScreen",props:{bg:{type:String,required:!0,validator:e=>["purplePink","pinkRed"].includes(e)}},setup(e){const r=e,a=n(()=>{if(t().isEnabled)return i;switch(r.bg){case"purplePink":return c;case"pinkRed":return l}return""});return(s,m)=>(o(),u("div",{class:p(["flex min-h-screen items-center justify-center",a.value])},[d(s.$slots,"default",{cardClass:"w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl"})],2))}};export{k as _};
