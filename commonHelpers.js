import{a as m,i as l,S as p}from"./assets/vendor-5401a4b0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(e){if(e.ep)return;e.ep=!0;const i=o(e);fetch(e.href,i)}})();const g="https://pixabay.com/api/",f="33796051-1e422d07d8c9fc912bc2a7eb4",b="per_page=15&image_type=photo&orientation=horyzontal&safesearch=true";class y{constructor(){this.page=1,this.search=""}async getImage(){const t=`${g}?key=${f}&q=${this.search}&page=${this.page}&${b}`,o=await m.get(t);return this.nextPage(),o.data}nextPage(){this.page+=1}resetPage(){this.page=1}}function L({webformatURL:s,largeImageURL:t,tags:o,likes:r,views:e,comments:i,downloads:n}){return`<div class="photo-card">
  <a class = "gallery__link" href="${t}">
  <img src="${s}" alt="${o}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${r}
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
      ${n}
    </p>
  </div>
  </a>
</div>`}class x{constructor({selector:t,isHidden:o}){this.button=this.getButton(t),o?this.hide():this.show()}getButton(t){return document.querySelector(t)}hide(){this.button.classList.add("hidden")}show(){this.button.classList.remove("hidden")}disable(){this.button.disabled=!0,this.button.textContent="Loading..."}enable(){this.button.disabled=!1,this.button.textContent="Load more"}}const v=document.getElementById("search-form"),u=document.querySelector(".gallery"),a=document.querySelector(".loader"),d=new y,c=new x({selector:".load-more",isHidden:!0});v.addEventListener("submit",S);c.button.addEventListener("click",h);function S(s){s.preventDefault(),a.classList.remove("is-hidden");const t=s.target,o=t.elements.searchQuery.value.trim();if(d.search=o,o===""){a.classList.add("is-hidden"),l.info({messageSize:"16px",messageLineHeight:"24px",messageColor:"#FFFFFF",maxWidth:"432px",backgroundColor:"red",position:"topRight",titleSize:"24px",message:"Please formulate a request"});return}d.resetPage(),$(),c.show(),h().finally(()=>t.reset()),a.classList.add("is-hidden")}async function h(){c.disable();try{const t=(await d.getImage()).hits;if(t.length===0){a.classList.add("is-hidden"),l.info({messageSize:"16px",messageLineHeight:"24px",messageColor:"#FFFFFF",maxWidth:"432px",backgroundColor:"red",position:"topRight",titleSize:"24px",message:"Sorry, there are no images matching your search query. Please try again!"});return}else{const o=t.reduce((r,e)=>L(e)+r,"");F(o),c.enable()}}catch(s){w(s)}}function F(s){u.insertAdjacentHTML("beforeend",s),P.refresh()}function $(){u.innerHTML=""}function w(s){a.classList.add("is-hidden"),console.error(s),c.hide()}const P=new p(".gallery a");
//# sourceMappingURL=commonHelpers.js.map
