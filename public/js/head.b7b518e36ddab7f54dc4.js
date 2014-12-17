!function(e){function t(n){if(o[n])return o[n].exports;var i=o[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n=window.webpackJsonp;window.webpackJsonp=function(r,s){for(var c,a,l=0,u=[];l<r.length;l++)a=r[l],i[a]&&u.push.apply(u,i[a]),i[a]=0;for(c in s)e[c]=s[c];for(n&&n(r,s);u.length;)u.shift().call(null,t);s[0]&&(o[0]=0,t(0))};var o={},i={0:0};return t.e=function(e,n){if(0===i[e])return n.call(null,t);if(void 0!==i[e])i[e].push(n);else{i[e]=[n];var o=document.getElementsByTagName("head")[0],r=document.createElement("script");r.type="text/javascript",r.charset="utf-8",r.async=!0,r.src=t.p+""+e+".b7b518e36ddab7f54dc4.js",o.appendChild(r)}},t.m=e,t.c=o,t.p="/js/",t(0)}([function(e,t,n){"use strict";n(34),n(29),t.init=n(9),t.login=n(24),n(25),t.Modal=n(5),t.fontTest=n(21),t.resizeOnload=n(10),n(23),n(28),n(26),n(22),n(3).init(),window.head=e.exports},,,function(e,t){"use strict";function n(e){r=new s(e)}var o=function(e,t){e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),e.__proto__=t},i=function(e,t,n){t&&Object.defineProperties(e,t),n&&Object.defineProperties(e.prototype,n)};t.init=n;var r,s=function(){var e=function(e){void 0===e&&(e={}),this.notifications=[],this.verticalSpace=e.verticalSpace||8};return e.prototype.register=function(e){var t=this;this.notifications.unshift(e),requestAnimationFrame(function(){return t.recalculate()})},e.prototype.unregister=function(e){var t=this.notifications.indexOf(e);this.notifications.splice(t,1),this.recalculate()},e.prototype.recalculate=function(){var e=this,t=this.verticalSpace;this.notifications.forEach(function(n){n.top=t,t+=n.height+e.verticalSpace})},e}(),c=function(){var e=function(e,t){var n=this.elem=document.createElement("div");n.className="notify notify_"+t,n.innerHTML=e,document.body.append(n),r.register(this),this.setupClose()};return e.prototype.close=function(){this.elem.parentNode&&(this.elem.remove(),r.unregister(this))},e.prototype.setupClose=function(){var e=this;setTimeout(function(){return e.close()},2500)},i(e,null,{height:{get:function(){return this.elem.offsetHeight}},top:{set:function(e){this.elem.style.transform="translateY("+e+"px)"}}}),e}(),a=function(e){var t=function(t){e.call(this,t,"info")};return o(t,e),t}(c);t.Info=a;var l=function(e){var t=function(t){e.call(this,t,"warn")};return o(t,e),t}(c);t.Warn=l;var u=function(e){var t=function(t){e.call(this,t,"success")};return o(t,e),t}(c);t.Success=u;var d=function(e){var t=function(t){e.call(this,t,"error")};return o(t,e),t.prototype.setupClose=function(){var e=this;setTimeout(function(){return e.close()},5e3)},t}(c);t.Error=d;var f=function(e){var t=function(t){e.call(this,t,"error")};return o(t,e),t.prototype.setupClose=function(){},t}(c);t.Test=f,window.Test=f},,function(e){"use strict";function t(){this.render(),this.onClick=this.onClick.bind(this),this.onDocumentKeyDown=this.onDocumentKeyDown.bind(this),this.elem.addEventListener("click",this.onClick),document.addEventListener("keydown",this.onDocumentKeyDown)}t.prototype.render=function(){document.body.insertAdjacentHTML("beforeEnd",'<div class="modal"><div class="modal-dialog"></div></div>'),this.elem=document.body.lastChild,this.contentElem=this.elem.lastChild},t.prototype.onClick=function(e){e.target.classList.contains("close-button")&&this.remove()},t.prototype.onDocumentKeyDown=function(e){27==e.keyCode&&(e.preventDefault(),this.remove())},t.prototype.showOverlay=function(){this.contentElem.classList.add("modal-overlay")},t.prototype.hideOverlay=function(){this.contentElem.classList.remove("modal-overlay")},t.prototype.setContent=function(e){"string"==typeof e?this.contentElem.innerHTML=e:(this.contentElem.innerHTML="",this.contentElem.appendChild(e));var t=this.contentElem.querySelector("[autofocus]");t&&t.focus()},t.prototype.remove=function(){document.body.removeChild(this.elem),document.removeEventListener("keydown",this.onDocumentKeyDown)},e.exports=t},function(e){"use strict";function t(e){if(e=e||{},this.elem=e.elem,this.size=e.size||"medium",this["class"]=e["class"]?" "+e["class"]:"",this.elemClass=e.elemClass,"medium"!=this.size&&"small"!=this.size)throw new Error("Unsupported size: "+this.size);this.elem||(this.elem=document.createElement("div"))}t.prototype.start=function(){this.elemClass&&this.elem.classList.toggle(this.elemClass),this.elem.insertAdjacentHTML("beforeend",'<span class="spinner spinner_active spinner_'+this.size+this["class"]+'"><span class="spinner__dot spinner__dot_1"></span><span class="spinner__dot spinner__dot_2"></span><span class="spinner__dot spinner__dot_3"></span></span>')},t.prototype.stop=function(){this.elem.removeChild(this.elem.querySelector(".spinner")),this.elemClass&&this.elem.classList.toggle(this.elemClass)},e.exports=t},,,function(e){"use strict";function t(e){o[e]?o[e]():i[e]=!0}function n(e,t){i[e]?t():o[e]=t}var o={},i={};e.exports={whenReady:t,addHandler:n}},function(e,t,n){"use strict";var o=n(27),i=n(12),r=[];t.iframe=function(e){function t(){o.async(e,function(t,n){t&&console.error(t),n&&(e.style.height=n+"px")})}t()},t.codeTabs=function(e){function t(){var t=e.closest(".code-tabs"),n=(e.closest("[data-code-tabs-content]"),t.querySelector("[data-code-tabs-switches]")),o=n.firstElementChild;o.offsetWidth>n.offsetWidth?t.classList.add("code-tabs_scroll"):t.classList.remove("code-tabs_scroll")}t(),r.push(t)},window.addEventListener("resize",i(function(){r.forEach(function(e){e()})},200))},,function(e){"use strict";function t(e,t){function n(){return r?(o=arguments,void(i=this)):(e.apply(this,arguments),r=!0,void setTimeout(function(){r=!1,o&&(n.apply(i,o),o=i=null)},t))}var o,i,r=!1;return n}e.exports=t},,,,,,function(e,t,n){"use strict";function o(e){e=e||document;var t=Math.max(e.body.scrollHeight,e.documentElement.scrollHeight,e.body.offsetHeight,e.documentElement.offsetHeight,e.body.clientHeight,e.documentElement.clientHeight);return e.documentElement.scrollWidth>e.documentElement.clientWidth&&(i||(i=r()),t+=i),t}var i,r=n(19);e.exports=o},function(e){"use strict";function t(){var e=document.createElement("div");if(e.style.cssText="visibility:hidden;height:100px",!document.body)throw new Error("getScrollbarHeight called to early: no document.body");document.body.appendChild(e);var t=e.offsetWidth;e.style.overflow="scroll";var n=document.createElement("div");n.style.width="100%",e.appendChild(n);var o=n.offsetWidth;return e.parentNode.removeChild(e),t-o}e.exports=t},,function(e){"use strict";e.exports=function(){function e(){n!=t.offsetWidth?document.body.classList.remove("no-icons"):setTimeout(e,100)}var t=document.createElement("span");document.body.appendChild(t),t.className="font-test",t.style.fontFamily="serif";var n=t.offsetWidth;t.style.fontFamily="",e()}},function(){"use strict";var e;document.addEventListener("mouseover",function(t){var n=t.target.closest("[data-add-class-on-hover]");n&&(e=n,n.classList.add("hover"))}),document.addEventListener("touchend",function(){setTimeout(function(){e&&(e.classList.remove("hover"),e=null)},500)}),document.addEventListener("mouseout",function(t){var n=t.target.closest("[data-add-class-on-hover]");n!=e&&(e.classList.remove("hover"),e=null)})},function(){"use strict";function e(){r&&console.log.apply(console,arguments)}function t(){e("compactifySidebar");var t=document.querySelector(".sidebar"),n=t.querySelector(".sidebar__content"),o=t.querySelector(".sidebar__inner"),i=t.classList.contains("sidebar_sticky-footer"),r=t.classList.contains("sidebar_compact");if(r){var s;s=i?n.lastElementChild.getBoundingClientRect().top-n.lastElementChild.previousElementSibling.getBoundingClientRect().bottom:n.getBoundingClientRect().bottom-n.lastElementChild.getBoundingClientRect().bottom,e("decompact?",s),s>150&&t.classList.remove("sidebar_compact")}else e(o.scrollHeight,o.clientHeight),o.scrollHeight>o.clientHeight&&(e("compact!"),t.classList.add("sidebar_compact"))}function n(){var n=document.querySelector(".sitetoolbar");if(!n)return void e("no sitetoolbar");var i=(n.offsetHeight,document.querySelector(".sidebar"));i&&(i.style.top=Math.max(n.getBoundingClientRect().bottom,0)+"px",t()),o()}function o(){var e=document.documentElement.clientWidth<=s,t=document.querySelector('meta[name="viewport"]').content;t=t.replace(/user-scalable=\w+/,"user-scalable="+(e?"yes":"no")),document.querySelector('meta[name="viewport"]').content=t}var i,r=!1,s=840;!function(){function t(){e("onWindowScrollAndResizeThrottled",i),i||(i=window.requestAnimationFrame(function(){n(),i=null}))}window.addEventListener("scroll",t),window.addEventListener("resize",t),document.addEventListener("DOMContentLoaded",t)}()},function(e,t,n){"use strict";function o(){var e=new r,t=new s;e.setContent(t.elem),t.start(),n.e(1,function(){e.remove();var t=n(8).AuthModal;new t},0)}var i=n(9),r=n(5),s=n(6);i.addHandler("login",function(){var e=document.querySelector(".sitetoolbar__login");e.onclick=function(e){e.preventDefault(),o()}}),e.exports=o},function(e){"use strict";function t(){var e=document.createElement("form");e.innerHTML='<input type="hidden" name="_csrf" value="'+window.csrf+'">',e.method="POST",e.action="/auth/logout",document.body.appendChild(e),e.submit()}document.addEventListener("click",function(e){e.target.hasAttribute("data-action-user-logout")&&(e.preventDefault(),t())}),e.exports=t},function(e,t,n){"use strict";function o(e){if(!~["INPUT","TEXTAREA","SELECT"].indexOf(document.activeElement.tagName)&&e[s+"Key"]){var t=null;switch(e.keyCode){case 37:t="prev";break;case 39:t="next";break;default:return}var n=document.querySelector('link[rel="'+t+'"]');n&&(document.location=n.href,e.preventDefault())}}function i(){var e,t=s[0].toUpperCase()+s.slice(1),n=document.querySelector('link[rel="next"]');n&&(e=document.querySelector('a[href="'+n.getAttribute("href")+'"] .page__nav-text-shortcut'),e.innerHTML=t+' + <span class="page__nav-text-arr">→</span>');var o=document.querySelector('link[rel="prev"]');o&&(e=document.querySelector('a[href="'+o.getAttribute("href")+'"] .page__nav-text-shortcut'),e.innerHTML=t+' + <span class="page__nav-text-arr">←</span>')}var r=n(32),s=~navigator.userAgent.toLowerCase().indexOf("mac os x")?"ctrl":"alt";r(document,{onRight:function(){var e=document.querySelector('link[rel="prev"]');e&&(document.location=e.href)},onLeft:function(){var e=document.querySelector('link[rel="next"]');e&&(document.location=e.href)}}),document.addEventListener("keydown",o),document.addEventListener("DOMContentLoaded",i)},function(e,t,n){"use strict";function o(e,t){function n(e,n){clearTimeout(o),t(e,n)}var o=setTimeout(function(){t(new Error("timeout"))},500);try{(e.contentDocument||e.contentWindow.document).body}catch(s){i(e,n)}if(!e.offsetWidth){var c=e.cloneNode(!0);return c.name="",c.style.height="50px",c.style.position="absolute",c.style.display="block",c.style.top="10000px",c.onload=function(){var t=r(this.contentDocument);e.style.display="block",c.remove(),n(null,t)},void document.body.appendChild(c)}e.style.display="block",e.style.height="1px";var a=r(e.contentDocument);e.style.height="",n(null,a)}function i(){throw new Error("Not implemented yet")}var r=n(18);o.async=function(e,t){setTimeout(function(){o(e,t)},0)},e.exports=o},function(){"use strict";function e(){document.querySelector(".page").classList.toggle("page_sidebar_on"),document.querySelector(".page").classList.contains("page_sidebar_on")?delete localStorage.noSidebar:localStorage.noSidebar=1}function t(t){void 0!==t.target.dataset.sidebarToggle&&e()}function n(t){if(!~["INPUT","TEXTAREA","SELECT"].indexOf(document.activeElement.tagName)&&t.keyCode=="S".charCodeAt(0)){if(~navigator.userAgent.toLowerCase().indexOf("mac os x")){if(!t.metaKey||!t.altKey)return}else if(!t.altKey)return;e(),t.preventDefault()}}document.addEventListener("click",t),document.addEventListener("keydown",n)},function(){"use strict";document.addEventListener("click",function(e){for(var t=e.target;t;){if(t.className.match(/_unready\b/))return void e.preventDefault();t=t.parentElement}}),document.addEventListener("submit",function(e){e.target.className.match(/_unready\b/)&&event.preventDefault()})},,,function(e){"use strict";function t(e,t){t=t||{};var n,o,i,r,s,c=t.onRight||function(){},a=t.onLeft||function(){},l=t.tolerance||100,u=t.threshold||150,d=t.allowedTime||500;e.addEventListener("touchstart",function(e){var t=e.changedTouches[0];i=0,n=t.pageX,o=t.pageY,s=Date.now()},!1),e.addEventListener("touchend",function(e){var t=e.changedTouches[0];i=t.pageX-n,r=Date.now()-s,Math.abs(t.pageY-o)>l||r>d||(i>u&&c(e),-u>i&&a(e))},!1)}e.exports=t},function(){"use strict";function e(e){if(e.length){if(1===e.length)return"string"==typeof e[0]?document.createTextNode(e[0]):e[0];for(var t,n=document.createDocumentFragment(),o=e.length,i=-1;++i<o;)t=e[i],n.appendChild("string"==typeof t?document.createTextNode(t):t);return n}throw new Error("DOM Exception 8")}var t={matches:Element.prototype.matchesSelector||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector,replace:function(){this.parentNode&&this.parentNode.replaceChild(e(arguments),this)},prepend:function(){this.insertBefore(e(arguments),this.firstChild)},append:function(){this.appendChild(e(arguments))},remove:function(){var e=this.parentNode;return e?e.removeChild(this):void 0},before:function(){this.parentNode&&this.parentNode.insertBefore(e(arguments),this)},after:function(){this.parentNode&&this.parentNode.insertBefore(e(arguments),this.nextSibling)},closest:function(e){for(var t=this;t;){if(t.matches(e))return t;t=t.parentElement}return null}};for(var n in t)Element.prototype[n]||(Element.prototype[n]=t[n]);try{new CustomEvent("IE has CustomEvent, but doesn't support constructor")}catch(o){window.CustomEvent=function(e,t){var n;return t=t||{bubbles:!1,cancelable:!1,detail:void 0},n=document.createEvent("CustomEvent"),n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n},CustomEvent.prototype=Object.create(window.Event.prototype)}},function(e,t,n){"use strict";n(33)}]);