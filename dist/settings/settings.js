(()=>{var r="har_parser_settings";var s=async()=>{let t=await fetch("./defaultTemplate.mustache");if(!t.body)throw"No template response";let o=t.body.getReader(),{value:e}=await o.read();return new TextDecoder().decode(e)};var m=async()=>{let t=await chrome.storage.local.get(r);return t[r]&&t[r].template?t[r].template:s()};var p=async t=>{if(t.preventDefault(),!t.target.checkValidity()){t.target.reportValidity();return}let e=new FormData(t.target),n=Object.fromEntries(e);await chrome.storage.local.set({[r]:n});let a=document.querySelector("form button[type='submit']");a&&(a.innerText="Saved!",a.setAttribute("disabled","true"),setTimeout(()=>{a.innerText="Save",a.removeAttribute("disabled")},750))};var u=(t,o)=>{let e=document.querySelector(t);if(!e)throw`Element (${t}) not found.`;e.addEventListener("click",o),document.addEventListener("beforeunload",()=>{e.removeEventListener("click",o)})};var c=async()=>{if(!confirm("Are you sure to override current template?"))return;let o=await s(),e=document.querySelector("#report-template");if(!e)throw"Textarea element not found";e.value=o};{let t=document.querySelector("form");if(!t)throw"Form not found";t.addEventListener("submit",p),u("#restore-template",c);let o=document.querySelector("#report-template");if(!o)throw"Textarea not found";(async()=>{let e=await chrome.storage.local.get(r),n=e[r]?e[r].template:await m(),a=document.querySelector("#MIME-support");if(a){let l=e[r]?e[r].areAllMIMEtypesRendered==="on":!1;a.checked=l}o.value=n,o.removeAttribute("disabled"),o.setAttribute("placeholder","Report template")})()}})();
