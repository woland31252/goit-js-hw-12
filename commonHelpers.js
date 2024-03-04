import{a as g,i as l,S as m}from"./assets/vendor-5401a4b0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function o(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(t){if(t.ep)return;t.ep=!0;const i=o(t);fetch(t.href,i)}})();const f="https://pixabay.com/api/",y="33796051-1e422d07d8c9fc912bc2a7eb4",b="per_page=15&image_type=photo&orientation=horyzontal&safesearch=true";class L{constructor(){this.page=1,this.search=""}async getImage(){const e=`${f}?key=${y}&q=${this.search}&page=${this.page}&${b}`,o=await g.get(e);return this.nextPage(),o.data}nextPage(){this.page+=1}resetPage(){this.page=1}}function x({webformatURL:s,largeImageURL:e,tags:o,likes:r,views:t,comments:i,downloads:n}){return`<div class="photo-card">
  <a class = "gallery__link" href="${e}">
  <img src="${s}" alt="${o}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${r}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${t}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${i}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${n}
    </p>
  </div>
  </a>
</div>`}class F{constructor({selector:e,isHidden:o}){this.button=this.getButton(e),o?this.hide():this.show()}getButton(e){return document.querySelector(e)}hide(){this.button.classList.add("hidden")}show(){this.button.classList.remove("hidden")}}const v=document.getElementById("search-form"),u=document.querySelector(".gallery"),a=document.querySelector(".loader"),d=new L,c=new F({selector:".load-more",isHidden:!0});v.addEventListener("submit",S);c.button.addEventListener("click",p);function S(s){s.preventDefault();const e=s.target,o=e.elements.searchQuery.value.trim();if(d.search=o,o===""){l.info({messageSize:"16px",messageLineHeight:"24px",messageColor:"#FFFFFF",maxWidth:"432px",backgroundColor:"#ca3535",position:"topRight",titleSize:"24px",message:"Please formulate a request"});return}d.resetPage(),w(),c.show(),p().finally(()=>e.reset())}async function p(){$();try{const e=(await d.getImage()).hits,o=e.reduce((r,t)=>x(t)+r,"");if(e.length===0){a.classList.add("is-hidden"),l.error({messageSize:"16px",messageLineHeight:"24px",messageColor:"#FFFFFF",maxWidth:"432px",backgroundColor:"#ea1515",position:"topRight",titleSize:"24px",message:"Nothing was found for your request. try again"});return}if(e.length<15){a.classList.add("is-hidden"),l.info({messageSize:"16px",messageLineHeight:"24px",messageColor:"#FFFFFF",maxWidth:"432px",backgroundColor:"#ff1515",position:"topRight",titleSize:"24px",message:"We're sorry, but you've reached the end of search results."}),h(o);return}h(o),P(),C()}catch(s){z(s)}}function h(s){u.insertAdjacentHTML("beforeend",s),B.refresh()}function w(){u.innerHTML=""}function $(){a.classList.remove("is-hidden"),c.hide()}function P(){a.classList.add("is-hidden"),c.show()}function z(s){a.classList.add("is-hidden"),c.hide(),console.error(s)}function C(){const o=u.firstChild.getBoundingClientRect().height*2;window.scrollBy({top:o,behavior:"smooth"})}const B=new m(".gallery a");
//# sourceMappingURL=commonHelpers.js.map
