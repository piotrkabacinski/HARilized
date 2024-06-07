(()=>{var k=(e,t)=>{let n=document.querySelector(e);if(!n)throw`Element (${e}) not found.`;n.addEventListener("click",t),document.addEventListener("beforeunload",()=>{n.removeEventListener("click",t)})};var q=e=>{let t=document.querySelector(`#button-${e.id}`);if(!t)throw`Cell for button not found: "#button-${e.id}"`;let n=document.createElement("button"),r=new URL(e.url);n.classList.add("href-button"),n.innerText=r.pathname,t.appendChild(n);let s=document.querySelector(`#report-${e.id}`);if(!s)throw`Report tr not found: "#report-${e.id}"`;let o=()=>{s.classList.toggle("hidden")};k(`#button-${e.id} button.href-button`,o)};var I=e=>{document.querySelector("#table tbody").insertAdjacentHTML("beforeend",`<tr>
      <td>
        <time datetime="${e.dateTime}" class="time">
          ${new Date(e.dateTime).toLocaleTimeString()}
        </time>
      </td>
      <td>${e.method}</td>
      <td>
        <response-status status="${e.status}"></response-status>
      </td>
      <td class="endpoint" id="button-${e.id}"></td>
    </tr>
    <tr class="hidden report" id="report-${e.id}">
      <td colspan="4">
        <copy-button target-selector="#report-${e.id} pre"></copy-button>
        <pre>${e.report}</pre>
      </td>
    </tr>
    `),q(e)};var _=[],L,h={entries:new Proxy(_,{set:function(e,t,n){return e[t]=n,!L&&(L=document.querySelector("#reset"),!L)||(_.length===0?L.classList.add("hidden"):L.classList.remove("hidden")),!0}}),isRecording:!0,allowedResponseMimeTypesRegExps:[/text\/\w/,/application\/(json|csv)/],allowedResourceTypes:["xhr","fetch"]};var z=()=>{if(!confirm("Are you sure to clean up the entire list?"))return;h.entries.length=0;let t=document.querySelector("#table tbody");if(!t)throw"#table element not found";t.innerHTML=""};var j=e=>typeof e=="string";var te=()=>{let e=document.querySelector("status-dot");if(!e)throw"status-dot not found";e.setAttribute("is-recording",h.isRecording.toString())},N=e=>{h.isRecording=!h.isRecording,e.target.innerText=h.isRecording?"Pause":"Restore",te()};var re=Object.prototype.toString,S=Array.isArray||function(t){return re.call(t)==="[object Array]"};function B(e){return typeof e=="function"}function ne(e){return S(e)?"array":typeof e}function P(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function O(e,t){return e!=null&&typeof e=="object"&&t in e}function se(e,t){return e!=null&&typeof e!="object"&&e.hasOwnProperty&&e.hasOwnProperty(t)}var oe=RegExp.prototype.test;function ie(e,t){return oe.call(e,t)}var ae=/\S/;function ce(e){return!ie(ae,e)}var ue={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function pe(e){return String(e).replace(/[&<>"'`=\/]/g,function(n){return ue[n]})}var le=/\s*/,de=/\s+/,K=/\s*=/,fe=/\s*\}/,he=/#|\^|\/|>|\{|&|=|!/;function me(e,t){if(!e)return[];var n=!1,r=[],s=[],o=[],i=!1,a=!1,c="",u=0;function d(){if(i&&!a)for(;o.length;)delete s[o.pop()];else o=[];i=!1,a=!1}var v,E,U;function D(b){if(typeof b=="string"&&(b=b.split(de,2)),!S(b)||b.length!==2)throw new Error("Invalid tags: "+b);v=new RegExp(P(b[0])+"\\s*"),E=new RegExp("\\s*"+P(b[1])),U=new RegExp("\\s*"+P("}"+b[1]))}D(t||g.tags);for(var p=new $(e),w,f,m,C,A,T;!p.eos();){if(w=p.pos,m=p.scanUntil(v),m)for(var H=0,Z=m.length;H<Z;++H)C=m.charAt(H),ce(C)?(o.push(s.length),c+=C):(a=!0,n=!0,c+=" "),s.push(["text",C,w,w+1]),w+=1,C===`
`&&(d(),c="",u=0,n=!1);if(!p.scan(v))break;if(i=!0,f=p.scan(he)||"name",p.scan(le),f==="="?(m=p.scanUntil(K),p.scan(K),p.scanUntil(E)):f==="{"?(m=p.scanUntil(U),p.scan(fe),p.scanUntil(E),f="&"):m=p.scanUntil(E),!p.scan(E))throw new Error("Unclosed tag at "+p.pos);if(f==">"?A=[f,m,w,p.pos,c,u,n]:A=[f,m,w,p.pos],u++,s.push(A),f==="#"||f==="^")r.push(A);else if(f==="/"){if(T=r.pop(),!T)throw new Error('Unopened section "'+m+'" at '+w);if(T[1]!==m)throw new Error('Unclosed section "'+T[1]+'" at '+w)}else f==="name"||f==="{"||f==="&"?a=!0:f==="="&&D(m)}if(d(),T=r.pop(),T)throw new Error('Unclosed section "'+T[1]+'" at '+p.pos);return ye(ge(s))}function ge(e){for(var t=[],n,r,s=0,o=e.length;s<o;++s)n=e[s],n&&(n[0]==="text"&&r&&r[0]==="text"?(r[1]+=n[1],r[3]=n[3]):(t.push(n),r=n));return t}function ye(e){for(var t=[],n=t,r=[],s,o,i=0,a=e.length;i<a;++i)switch(s=e[i],s[0]){case"#":case"^":n.push(s),r.push(s),n=s[4]=[];break;case"/":o=r.pop(),o[5]=s[2],n=r.length>0?r[r.length-1][4]:t;break;default:n.push(s)}return t}function $(e){this.string=e,this.tail=e,this.pos=0}$.prototype.eos=function(){return this.tail===""};$.prototype.scan=function(t){var n=this.tail.match(t);if(!n||n.index!==0)return"";var r=n[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r};$.prototype.scanUntil=function(t){var n=this.tail.search(t),r;switch(n){case-1:r=this.tail,this.tail="";break;case 0:r="";break;default:r=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=r.length,r};function R(e,t){this.view=e,this.cache={".":this.view},this.parent=t}R.prototype.push=function(t){return new R(t,this)};R.prototype.lookup=function(t){var n=this.cache,r;if(n.hasOwnProperty(t))r=n[t];else{for(var s=this,o,i,a,c=!1;s;){if(t.indexOf(".")>0)for(o=s.view,i=t.split("."),a=0;o!=null&&a<i.length;)a===i.length-1&&(c=O(o,i[a])||se(o,i[a])),o=o[i[a++]];else o=s.view[t],c=O(s.view,t);if(c){r=o;break}s=s.parent}n[t]=r}return B(r)&&(r=r.call(this.view)),r};function l(){this.templateCache={_cache:{},set:function(t,n){this._cache[t]=n},get:function(t){return this._cache[t]},clear:function(){this._cache={}}}}l.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};l.prototype.parse=function(t,n){var r=this.templateCache,s=t+":"+(n||g.tags).join(":"),o=typeof r<"u",i=o?r.get(s):void 0;return i==null&&(i=me(t,n),o&&r.set(s,i)),i};l.prototype.render=function(t,n,r,s){var o=this.getConfigTags(s),i=this.parse(t,o),a=n instanceof R?n:new R(n,void 0);return this.renderTokens(i,a,r,t,s)};l.prototype.renderTokens=function(t,n,r,s,o){for(var i="",a,c,u,d=0,v=t.length;d<v;++d)u=void 0,a=t[d],c=a[0],c==="#"?u=this.renderSection(a,n,r,s,o):c==="^"?u=this.renderInverted(a,n,r,s,o):c===">"?u=this.renderPartial(a,n,r,o):c==="&"?u=this.unescapedValue(a,n):c==="name"?u=this.escapedValue(a,n,o):c==="text"&&(u=this.rawValue(a)),u!==void 0&&(i+=u);return i};l.prototype.renderSection=function(t,n,r,s,o){var i=this,a="",c=n.lookup(t[1]);function u(E){return i.render(E,n,r,o)}if(c){if(S(c))for(var d=0,v=c.length;d<v;++d)a+=this.renderTokens(t[4],n.push(c[d]),r,s,o);else if(typeof c=="object"||typeof c=="string"||typeof c=="number")a+=this.renderTokens(t[4],n.push(c),r,s,o);else if(B(c)){if(typeof s!="string")throw new Error("Cannot use higher-order sections without the original template");c=c.call(n.view,s.slice(t[3],t[5]),u),c!=null&&(a+=c)}else a+=this.renderTokens(t[4],n,r,s,o);return a}};l.prototype.renderInverted=function(t,n,r,s,o){var i=n.lookup(t[1]);if(!i||S(i)&&i.length===0)return this.renderTokens(t[4],n,r,s,o)};l.prototype.indentPartial=function(t,n,r){for(var s=n.replace(/[^ \t]/g,""),o=t.split(`
`),i=0;i<o.length;i++)o[i].length&&(i>0||!r)&&(o[i]=s+o[i]);return o.join(`
`)};l.prototype.renderPartial=function(t,n,r,s){if(r){var o=this.getConfigTags(s),i=B(r)?r(t[1]):r[t[1]];if(i!=null){var a=t[6],c=t[5],u=t[4],d=i;c==0&&u&&(d=this.indentPartial(i,u,a));var v=this.parse(d,o);return this.renderTokens(v,n,r,d,s)}}};l.prototype.unescapedValue=function(t,n){var r=n.lookup(t[1]);if(r!=null)return r};l.prototype.escapedValue=function(t,n,r){var s=this.getConfigEscape(r)||g.escape,o=n.lookup(t[1]);if(o!=null)return typeof o=="number"&&s===g.escape?String(o):s(o)};l.prototype.rawValue=function(t){return t[1]};l.prototype.getConfigTags=function(t){return S(t)?t:t&&typeof t=="object"?t.tags:void 0};l.prototype.getConfigEscape=function(t){if(t&&typeof t=="object"&&!S(t))return t.escape};var g={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(e){M.templateCache=e},get templateCache(){return M.templateCache}},M=new l;g.clearCache=function(){return M.clearCache()};g.parse=function(t,n){return M.parse(t,n)};g.render=function(t,n,r,s){if(typeof t!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+ne(t)+'" was given as the first argument for mustache#render(template, view, partials)');return M.render(t,n,r,s)};g.escape=pe;g.Scanner=$;g.Context=R;g.Writer=l;var W=g;var F=async(e,t)=>{let n=await new Promise(r=>{e.getContent(s=>{r(s)})});return e.response.content={...e.response.content,text:n},W.render(`${t.trim()}`,e)};var y="har_report_settings";var G=async()=>{let e=await fetch("./defaultTemplate.mustache");if(!e.body)throw"No template response";let t=e.body.getReader(),{value:n}=await t.read();return new TextDecoder().decode(n)};var J=async()=>{let e=await chrome.storage.local.get(y);return e[y]&&e[y].template?e[y].template:G()};var Q=async()=>{let e=await chrome.storage.local.get(y);return e[y]&&e[y].areAllMIMEtypesRendered?e[y].areAllMIMEtypesRendered==="on":!1};var V=async e=>{let{status:t}=e.response,{method:n,url:r}=e.request,s=await J(),i=await Q()||h.allowedResponseMimeTypesRegExps.find(a=>a.test(e.response.content.mimeType))!==void 0?await F(e,s):`<span style="opacity:0.5">HAR Report: Unsupported response content MIME type: "${e.response.content.mimeType}"</span>`;return{id:crypto.randomUUID().split("-").join(""),dateTime:e.startedDateTime,status:t,method:n,url:r,report:i}};{class e extends HTMLElement{isRecording=!1;constructor(){super()}connectedCallback(){this.isRecording=this.getAttribute("is-recording")=="true",this.createTemplate()}static get observedAttributes(){return["is-recording"]}attributeChangedCallback(n,r,s){switch(n){case"is-recording":this.isRecording=s==="true",this.createTemplate();break}}createTemplate(){this.innerHTML=`
        <div
          class="status-dot ${this.isRecording?"status-dot--recording":""}"
        ></div>
      `}}customElements.define("status-dot",e)}{class e extends HTMLElement{href=`chrome-extension://${chrome.runtime.id}/settings.html`;constructor(){super()}connectedCallback(){this.innerHTML=`
        \u2699\uFE0F
        <a href="${this.href}" target="_blank" class="link">
          Settings
        </a>
      `}}customElements.define("settings-link",e)}var X=e=>new Promise((t,n)=>{let r=document.createElement("textarea");r.value=e,document.body.append(r),r.select();let s=document.execCommand("copy");r.remove(),s||n(new Error("Unable to write to clipboard")),t()});{let e;(r=>r.targetSelector="target-selector")(e||={});class t extends HTMLElement{constructor(){super()}createTemplate(){this.innerHTML=`
        <button type="button" class="copy">
          Copy
        </button>
      `}async copyAction(r){let s=this.getAttribute("target-selector");if(!s)throw"No target selector provided";let o=document.querySelector(s);if(!o)throw`No target element for ${s} selector`;let i=o.innerText,a=r.target;try{if(await X(i),!r.target)return;a.innerText="Copied!",a.setAttribute("disabled","true"),setTimeout(()=>{a.innerText="Copy",a.removeAttribute("disabled")},750)}catch(c){console.error(c)}}appendEvents(){let r=this.querySelector("button");if(!r)throw"No button element found";r.addEventListener("click",this.copyAction.bind(this))}removeEvents(){this.querySelector("button")&&this.querySelector("button").removeEventListener("click",this.copyAction)}connectedCallback(){this.createTemplate(),this.appendEvents()}disconnectedCallback(){this.removeEvents()}}customElements.define("copy-button",t)}var Y=e=>e<200?"":e<300?"success":e<400?"redirect":"fail";{let e;(r=>r.status="status")(e||={});class t extends HTMLElement{constructor(){super()}connectedCallback(){let r=this.getAttribute("status");this.innerHTML=`
        <span class="status ${r!==null?Y(Number(r)):""}">
          ${r}
        </span>
      `}}customElements.define("response-status",t)}chrome.devtools.network.onRequestFinished.addListener(async e=>{if(!h.isRecording)return;if(!j(e._resourceType))throw"request._resourceType value is not a string";if(!h.allowedResourceTypes.includes(e._resourceType))throw`Resource type "${e._resourceType}" is not supported`;let t=await V(e);h.entries.push(t),I(t)}),document.addEventListener("beforeunload",()=>{h.entries.length=0}),document.addEventListener("DOMContentLoaded",()=>{k("#reset",z),k("#pause",N)});})();
/*! Bundled license information:

mustache/mustache.mjs:
  (*!
   * mustache.js - Logic-less {{mustache}} templates with JavaScript
   * http://github.com/janl/mustache.js
   *)
*/
