import{a as v,S,i as n}from"./assets/vendor-DvbQR39D.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const E="https://pixabay.com/api/",q="51935119-94cca84236608ef27f9ff626b";async function p(s,e=1,r=15){const i={key:q,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:r};return(await v.get(E,{params:i})).data}const h=document.querySelector(".gallery"),g=document.querySelector(".loader"),m=document.querySelector(".load-more"),R=new S(".gallery a",{captionsData:"alt",captionDelay:250});function y(s){const e=s.map(r=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${r.largeImageURL}">
        <img 
          class="gallery-image"
          src="${r.webformatURL}" 
          alt="${r.tags}" 
          loading="lazy"
        />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${r.likes}</p>
        <p><b>Views:</b> ${r.views}</p>
        <p><b>Comments:</b> ${r.comments}</p>
        <p><b>Downloads:</b> ${r.downloads}</p>
      </div>
    </li>
  `).join("");h.insertAdjacentHTML("beforeend",e),R.refresh()}function P(){h.innerHTML=""}function L(){g.classList.remove("hidden")}function b(){g.classList.add("hidden")}function B(){m.classList.remove("hidden")}function u(){m.classList.add("hidden")}const w=document.querySelector(".form"),$=w.querySelector('input[name="search-text"]');let l="",a=1;const c=15;let f=0;w.addEventListener("submit",async s=>{if(s.preventDefault(),l=$.value.trim(),a=1,!l){n.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}P(),u(),L();try{const e=await p(l,a,c);if(f=e.totalHits,!e.hits.length){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}y(e.hits),a*c>=f?(u(),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):B()}catch(e){n.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(e)}finally{b()}});document.addEventListener("click",async s=>{if(s.target.classList.contains("load-more")){a+=1,L();try{const e=await p(l,a,c);y(e.hits),a*c>=f&&(u(),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}));const r=document.querySelector(".gallery");if(r.firstElementChild){const{height:i}=r.firstElementChild.getBoundingClientRect();window.scrollBy({top:i*2,behavior:"smooth"})}}catch(e){n.error({title:"Error",message:"Something went wrong while loading more images.",position:"topRight"}),console.error(e)}finally{b()}}});
//# sourceMappingURL=index.js.map
