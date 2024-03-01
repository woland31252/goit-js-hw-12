import{i as c,S as d}from"./assets/vendor-5b791d57.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(e){if(e.ep)return;e.ep=!0;const i=o(e);fetch(e.href,i)}})();const u="https://pixabay.com/api/",f="33796051-1e422d07d8c9fc912bc2a7eb4",m="per_page=18&image_type=photo&orientation=horyzontal&safesearch=true";function p(r){const t=`${u}?key=${f}&q=${r}&${m}`;return fetch(t).then(o=>{if(!o.ok)throw new Error(o.status);return o.json()})}function h({webformatURL:r,largeImageURL:t,tags:o,likes:s,views:e,comments:i,downloads:n}){return`<div class="photo-card">
  <a class = "gallery__link" href="${t}">
  <img src="${r}" alt="${o}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${s}
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
</div>`}const g=document.getElementById("search-form"),l=document.querySelector(".gallery"),a=document.querySelector(".loader");g.addEventListener("submit",y);function y(r){r.preventDefault(),a.classList.remove("is-hidden");let t="";const o=r.target;if(console.log(o),t=o.elements.searchQuery.value.trim(),t===""){a.classList.add("is-hidden"),c.info({messageSize:"16px",messageLineHeight:"24px",messageColor:"#FFFFFF",maxWidth:"432px",backgroundColor:"red",position:"topRight",titleSize:"24px",message:"Please formulate a request"});return}p(t).then(s=>b(s)).catch(s=>F(s)).finally(()=>{o.reset(),a.classList.add("is-hidden")}),x()}function b(r){const t=r.hits;if(t.length===0){a.classList.add("is-hidden"),c.info({messageSize:"16px",messageLineHeight:"24px",messageColor:"#FFFFFF",maxWidth:"432px",backgroundColor:"red",position:"topRight",titleSize:"24px",message:"Sorry, there are no images matching your search query. Please try again!"});return}else{const o=t.reduce((s,e)=>h(e)+s,"");L(o)}}function L(r){l.insertAdjacentHTML("beforeend",r),S.refresh()}function x(){l.innerHTML=""}function F(r){a.classList.add("is-hidden"),console.error(r)}const S=new d(".gallery a");
//# sourceMappingURL=commonHelpers.js.map
