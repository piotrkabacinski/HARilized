(()=>{var o="har_report_settings";var s=async()=>{let t=await fetch("./defaultTemplate.mustache");if(!t.body)throw"No template response";let r=t.body.getReader(),{value:e}=await r.read();return new TextDecoder().decode(e)};var i=async()=>{let t=await chrome.storage.local.get(o);return t[o]&&t[o].template?t[o].template:s()};var p=async t=>{if(t.preventDefault(),!t.target.checkValidity()){t.target.reportValidity();return}let e=new FormData(t.target),n=Object.fromEntries(e);await chrome.storage.local.set({[o]:n});let a=document.querySelector("form button[type='submit']");a&&(a.innerText="Saved!",a.setAttribute("disabled","true"),setTimeout(()=>{a.innerText="Save",a.removeAttribute("disabled")},750))};var u=(t,r)=>{let e=document.querySelector(t);if(!e)throw`Element (${t}) not found.`;e.addEventListener("click",r),document.addEventListener("beforeunload",()=>{e.removeEventListener("click",r)})};var l=async()=>{if(!confirm("Are you sure to override current template?"))return;let r=await s(),e=document.querySelector("#report-template");if(!e)throw"Textarea element not found";e.value=r};{let t=document.querySelector("form");if(!t)throw"Form not found";t.addEventListener("submit",p),u("#restore-template",l);let r=document.querySelector("#report-template");if(!r)throw"Textarea not found";(async()=>{let e=await chrome.storage.local.get(o),n=e[o]?e[o].template:await i();r.value=n,r.removeAttribute("disabled"),r.setAttribute("placeholder","Report template")})()}})();
