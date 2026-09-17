
let state={project:"",sqft:"",condition:"",finish:"",details:""}, step=1;
const steps=[...document.querySelectorAll(".calc-step")], bar=document.getElementById("progressBar");
function show(n){step=n;steps.forEach(s=>s.classList.toggle("active",+s.dataset.step===n));bar.style.width=Math.min(n,4)*25+"%";window.location.hash="estimate"}
document.querySelectorAll("[data-project]").forEach(b=>b.onclick=()=>{state.project=b.dataset.project;document.querySelectorAll("[data-project]").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");show(2)});
document.querySelectorAll("[data-finish]").forEach(b=>b.onclick=()=>{state.finish=b.dataset.finish;document.querySelectorAll("[data-finish]").forEach(x=>x.classList.remove("selected"));b.classList.add("selected")});
document.querySelectorAll(".next").forEach(b=>b.onclick=()=>{if(step===2){state.sqft=document.getElementById("sqft").value;state.condition=document.getElementById("condition").value}if(step===3){state.details=document.getElementById("details").value}show(step+1);if(step===4)render("summary")});
document.querySelectorAll(".back").forEach(b=>b.onclick=()=>show(step-1));
function summaryHTML(){return `<strong>${state.project||"Project"}</strong>${state.sqft?`Approx. size: ${state.sqft} sq. ft.<br>`:""}${state.condition?`Condition: ${state.condition}<br>`:""}${state.finish?`Finish level: ${state.finish}<br>`:""}${state.details?`Notes: ${state.details}`:""}`}
function render(id){document.getElementById(id).innerHTML=summaryHTML()}
document.getElementById("prepareRequest").onclick=()=>{
 const name=document.getElementById("name").value.trim(), phone=document.getElementById("phone").value.trim(), email=document.getElementById("email").value.trim(), loc=document.getElementById("location").value.trim();
 if(!name||!phone||!email){alert("Please enter your name, phone and email.");return}
 render("finalSummary"); show(5);
 const body=`New project request for Monolith Builders Inc.%0D%0A%0D%0AName: ${encodeURIComponent(name)}%0D%0APhone: ${encodeURIComponent(phone)}%0D%0AEmail: ${encodeURIComponent(email)}%0D%0ALocation: ${encodeURIComponent(loc)}%0D%0AProject: ${encodeURIComponent(state.project)}%0D%0ASize: ${encodeURIComponent(state.sqft)} sq. ft.%0D%0ACondition: ${encodeURIComponent(state.condition)}%0D%0AFinish: ${encodeURIComponent(state.finish)}%0D%0ANotes: ${encodeURIComponent(state.details)}`;
 document.getElementById("emailRequest").href=`mailto:info@monolithbuildersinc.com?subject=${encodeURIComponent("Website Project Request - "+state.project)}&body=${body}`;
};
document.getElementById("restart").onclick=()=>location.reload();
