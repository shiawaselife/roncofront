import{c as u,b as r,i as d,h as p,al as m,g as a,t as y,ah as h}from"./index-4925a545.js";const b=["type","name","value"],V=a("span",{class:"check"},null,-1),g={class:"pl-2"},k={__name:"FormCheckRadio",props:{name:{type:String,required:!0},type:{type:String,default:"checkbox",validator:e=>["checkbox","radio","switch"].includes(e)},label:{type:String,default:null},modelValue:{type:[Array,String,Number,Boolean],default:null},inputValue:{type:[String,Number,Boolean],required:!0}},emits:["update:modelValue"],setup(e,{emit:s}){const t=e,l=u({get:()=>t.modelValue,set:n=>{s("update:modelValue",n)}}),i=u(()=>t.type==="radio"?"radio":"checkbox");return(n,o)=>(r(),d("label",{class:h(e.type)},[p(a("input",{"onUpdate:modelValue":o[0]||(o[0]=c=>l.value=c),type:i.value,name:e.name,value:e.inputValue},null,8,b),[[m,l.value]]),V,a("span",g,y(e.label),1)],2))}};export{k as _};
