import{a as g,i as d,S as p}from"./assets/vendor-5401a4b0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(e){if(e.ep)return;e.ep=!0;const i=o(e);fetch(e.href,i)}})();const m="https://pixabay.com/api/",f="33796051-1e422d07d8c9fc912bc2a7eb4",b="per_page=80&image_type=photo&orientation=horyzontal&safesearch=true";class y{constructor(){this.page=1,this.search=""}async getImage(){const t=`${m}?key=${f}&q=${this.search}&page=${this.page}&${b}`,o=await g.get(t);return this.nextPage(),o.data}nextPage(){this.page+=1}resetPage(){this.page=1}}function L({webformatURL:s,largeImageURL:t,tags:o,likes:n,views:e,comments:i,downloads:a}){return`<div class="photo-card">
  <a class = "gallery__link" href="${t}">
  <img src="${s}" alt="${o}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${n}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${e}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${i}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${a}
    </p>
  </div>
  </a>
</div>`}class x{constructor({selector:t,isHidden:o}){this.button=this.getButton(t),o?this.hide():this.show()}getButton(t){return document.querySelector(t)}hide(){this.button.classList.add("hidden")}show(){this.button.classList.remove("hidden")}disable(){this.button.disabled=!0,this.button.textContent="Loading..."}enable(){this.button.disabled=!1,this.button.textContent="Load more"}}const F=document.getElementById("search-form"),u=document.querySelector(".gallery"),c=document.querySelector(".loader"),l=new y,r=new x({selector:".load-more",isHidden:!0});F.addEventListener("submit",S);r.button.addEventListener("click",h);function S(s){s.preventDefault();const t=s.target,o=t.elements.searchQuery.value.trim();if(l.search=o,o===""){d.info({messageSize:"16px",messageLineHeight:"24px",messageColor:"#FFFFFF",maxWidth:"432px",backgroundColor:"red",position:"topRight",titleSize:"24px",message:"Please formulate a request"});return}l.resetPage(),w(),r.show(),h().finally(()=>t.reset())}async function h(){$();try{const t=(await l.getImage()).hits;if(t.length===0){c.classList.add("is-hidden"),d.info({messageSize:"16px",messageLineHeight:"24px",messageColor:"#FFFFFF",maxWidth:"432px",backgroundColor:"red",position:"topRight",titleSize:"24px",message:"Sorry, there are no images matching your search query. Please try again!"});return}else if(t.length<3){c.classList.add("is-hidden"),d.info({messageSize:"16px",messageLineHeight:"24px",messageColor:"#FFFFFF",maxWidth:"432px",backgroundColor:"red",position:"topRight",titleSize:"24px",message:"We're sorry, but you've reached the end of search results."});return}else{const o=t.reduce((n,e)=>L(e)+n,"");v(o),P()}}catch(s){z(s)}}function v(s){u.insertAdjacentHTML("beforeend",s),C.refresh()}function w(){u.innerHTML=""}function $(){c.classList.remove("is-hidden"),r.disable(),r.hide()}function P(){c.classList.add("is-hidden"),r.show(),r.enable()}function z(s){c.classList.add("is-hidden"),r.hide(),console.error(s)}const C=new p(".gallery a");
//# sourceMappingURL=commonHelpers.js.map
