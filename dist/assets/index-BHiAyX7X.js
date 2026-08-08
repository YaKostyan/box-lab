(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const He={},Qt="toffipacks-api-session-v1",Fe=He,ve=String(Fe?.VITE_API_BASE_URL??"").trim().replace(/\/$/,""),A=!!ve;class Ht extends Error{status;code;constructor(e,a,n="request_error"){super(a),this.status=e,this.code=n}}function ut(){localStorage.removeItem(Qt)}function Lt(){return!!localStorage.getItem(Qt)}async function C(t,e={}){if(!A)throw new Ht(0,"Backend API is not configured.","api_disabled");const a=localStorage.getItem(Qt),n=await fetch(`${ve}${t}`,{...e,headers:{Accept:"application/json",...e.body?{"Content-Type":"application/json"}:{},...a?{Authorization:`Bearer ${a}`}:{},...e.headers}}),s=await n.json().catch(()=>({}));if(!n.ok)throw n.status===401&&ut(),new Ht(n.status,s.error?.message??"Сервер не зміг виконати запит.",s.error?.code);return s}async function ce(t,e){const a=await C(t,{method:"POST",body:JSON.stringify(e)});return localStorage.setItem(Qt,a.token),a.account}const q={products:async()=>(await C("/api/products")).products,login:(t,e)=>ce("/api/auth/login",{phone:t,password:e}),register:t=>ce("/api/auth/register",t),me:async()=>(await C("/api/auth/me")).account,updateMe:async t=>(await C("/api/auth/me",{method:"PATCH",body:JSON.stringify(t)})).account,logout:async()=>{try{await C("/api/auth/logout",{method:"POST"})}finally{ut()}},createOrder:async t=>(await C("/api/orders",{method:"POST",body:JSON.stringify(t)})).order,myOrders:async()=>(await C("/api/me/orders")).orders,adminProducts:async()=>(await C("/api/admin/products")).products,createProduct:async t=>(await C("/api/admin/products",{method:"POST",body:JSON.stringify(t)})).product,updateProduct:async(t,e)=>(await C(`/api/admin/products/${encodeURIComponent(t)}`,{method:"PATCH",body:JSON.stringify(e)})).product,deleteProduct:t=>C(`/api/admin/products/${encodeURIComponent(t)}`,{method:"DELETE"}),resetProducts:async()=>(await C("/api/admin/products/reset",{method:"POST"})).products,adminOrders:async()=>(await C("/api/admin/orders")).orders,updateOrder:async(t,e)=>(await C(`/api/admin/orders/${encodeURIComponent(t)}`,{method:"PATCH",body:JSON.stringify(e)})).order,deleteOrder:t=>C(`/api/admin/orders/${encodeURIComponent(t)}`,{method:"DELETE"}),adminClients:async()=>(await C("/api/admin/clients")).clients,updateClient:async(t,e)=>(await C(`/api/admin/clients/${encodeURIComponent(t)}`,{method:"PATCH",body:JSON.stringify(e)})).client,backup:()=>C("/api/admin/backup")},Pt=5e4,Q=1e3,je=2,Be=1,te=.5,ne=[{id:"box-301",number:"301",name:"Самозбірна коробка №301",dimensions:{length:165,width:100,height:30},basePrice:5,sourceQuantity:1e3},{id:"box-302",number:"302",name:"Самозбірна коробка №302",dimensions:{length:130,width:130,height:50},basePrice:7,sourceQuantity:800},{id:"box-303",number:"303",name:"Самозбірна коробка №303",dimensions:{length:190,width:150,height:100},basePrice:17,sourceQuantity:800},{id:"box-304",number:"304",name:"Самозбірна коробка №304",dimensions:{length:230,width:150,height:35},basePrice:11,sourceQuantity:800},{id:"box-305",number:"305",name:"Самозбірна коробка №305",dimensions:{length:160,width:85,height:110},basePrice:6.5},{id:"box-306",number:"306",name:"Самозбірна коробка №306",dimensions:{length:145,width:145,height:40},basePrice:6.5,sourceQuantity:1e3},{id:"box-307",number:"307",name:"Самозбірна коробка №307",dimensions:{length:280,width:180,height:100},basePrice:18,sourceQuantity:500},{id:"box-308",number:"308",name:"Самозбірна коробка №308",dimensions:{length:250,width:180,height:40},basePrice:12,sourceQuantity:800},{id:"box-309",number:"309",name:"Самозбірна коробка №309",dimensions:{length:210,width:150,height:50},basePrice:11,sourceQuantity:900},{id:"box-310",number:"310",name:"Самозбірна коробка №310",dimensions:{length:260,width:260,height:50},basePrice:15,sourceQuantity:600},{id:"box-311",number:"311",name:"Самозбірна коробка №311",dimensions:{length:370,width:170,height:100},basePrice:17},{id:"box-101",number:"101",name:"Самозбірна коробка №101",dimensions:{length:178,width:115,height:48},basePrice:4,sourceQuantity:800}],Re=[{question:"Як відбувається доставка?",answer:"Доставляємо по Києву та Київській області. Формат, точну адресу й вартість потрібно уточнити з менеджером під час підтвердження заявки."},{question:"Які строки виготовлення?",answer:"Строк залежить від розміру коробки, тиражу та завантаження виробництва. Менеджер називає точну дату до запуску замовлення."},{question:"Що отримує постійний клієнт?",answer:"Після підтвердження менеджером у кабінеті активується персональна ціна. Вона автоматично відображається в каталозі, калькуляторі та кошику."},{question:"Як проходить оплата?",answer:"Форму оплати, рахунок і підсумкову суму менеджер погоджує з вами до початку виготовлення."},{question:"Чи працюєте ви з малим і великим бізнесом?",answer:"Так. Можна почати з невеликої партії або замовити регулярний великий тираж. Калькулятор рахує до 50 000 коробок, більший обсяг прораховує менеджер."},{question:"Чи робите коробки під індивідуальний запит?",answer:"Так. Якщо серед готових розмірів немає потрібного, вкажіть габарити й особливості замовлення в коментарі. Менеджер уточнить деталі та підготує розрахунок."}];function $(t){return new Intl.NumberFormat("uk-UA",{style:"currency",currency:"UAH",minimumFractionDigits:Number.isInteger(t)?0:2,maximumFractionDigits:2}).format(t)}function D(t,e){return t.basePrice+(e>=Q?Be:je)}function st(t,e,a){return a?.partner?t.basePrice+Math.min(Math.max(a.fixedMarkup,0),.99):D(t,e)}function Ft(t){const{length:e,width:a,height:n}=t.dimensions;return e*a*n}function zt(t,e,a=0){const n=[t.length,t.width,t.height].sort((o,l)=>l-o),s=[e.length,e.width,e.height].sort((o,l)=>l-o),i=n.map((o,l)=>(s[l]-o)/2),r=i.map(o=>Math.max(0,a-o));return{fits:r.every(o=>o===0),clearancesPerSide:i,deficitsPerSide:r}}const p={accounts:"toffipacks-accounts-v3",orders:"toffipacks-orders-v3",session:"toffipacks-session-v3",cart:"toffipacks-cart-v1",products:"toffipacks-products-v1",fit:"toffipacks-fit-v1",measurements:"toffipacks-measurements-v1"},ye=/^[\p{L}\p{N}._-]+$/u,Tt=new Date().toISOString(),$e=[{id:"account-admin",name:"Адміністратор ToffiPacks",phone:"+380000000001",company:"ToffiPacks",password:"admin123",role:"admin",partner:!1,fixedMarkup:te,createdAt:Tt},{id:"account-partner",name:"Постійний клієнт",phone:"+380671112233",company:"",password:"client123",role:"client",partner:!0,fixedMarkup:te,createdAt:Tt}],we=[];function gt(t,e){try{const a=localStorage.getItem(t);return a?JSON.parse(a):e}catch{return e}}function v(t,e){localStorage.setItem(t,JSON.stringify(e))}function Ve(){localStorage.getItem(p.accounts)||v(p.accounts,$e),localStorage.getItem(p.orders)||v(p.orders,we),localStorage.getItem(p.cart)||v(p.cart,[]),localStorage.getItem(p.products)||v(p.products,ne.map(t=>({...t,active:!0,updatedAt:Tt})))}Ve();A&&(v(p.accounts,[]),v(p.orders,[]),Lt()||localStorage.removeItem(p.session));const Se=gt(p.fit,null),St=Se?.dimensions,Qe=St&&[St.length,St.width,St.height].every(t=>Number.isFinite(t)&&t>0),Xt=Se?.margin;let at="box-101",w=500,It="",ee="size",X=!1,k=Qe?St:null,T=Xt===5||Xt===10?Xt:0,de,pt=null,se="",ot="all",ie="",jt="Усі",x="",L="",_t="",S="";const _e=document.querySelector("#app");if(!_e)throw new Error("Root element #app was not found.");function R(){return gt(p.accounts,$e)}function K(){const t=ne.map(e=>({...e,active:!0,updatedAt:Tt}));return gt(p.products,t).filter(e=>e&&typeof e.id=="string"&&typeof e.number=="string"&&Number.isFinite(e.basePrice)&&Number.isFinite(e.dimensions?.length)&&Number.isFinite(e.dimensions?.width)&&Number.isFinite(e.dimensions?.height)).map(e=>({...e,active:e.active!==!1,updatedAt:e.updatedAt||Tt}))}function M(){return K().filter(t=>t.active)}function H(t){v(p.products,t)}function B(){return gt(p.orders,we).map(e=>{if("items"in e&&Array.isArray(e.items))return{...e,statusHistory:Array.isArray(e.statusHistory)&&e.statusHistory.length?e.statusHistory:[{status:e.status,at:e.createdAt}]};const a=e;return{id:a.id,createdAt:a.createdAt,customerName:a.customerName,phone:a.phone,company:a.company,comment:a.comment,items:[{productId:a.productId,productNumber:a.productNumber,dimensions:a.dimensions,quantity:a.quantity,unitPrice:a.unitPrice,total:a.total,priceType:a.priceType}],total:a.total,accountId:a.accountId,status:a.status,statusHistory:[{status:a.status,at:a.createdAt}]}})}function z(){const t=M();return gt(p.cart,[]).filter(e=>t.some(a=>a.id===e.productId)&&e.quantity>0)}function Z(){const t=localStorage.getItem(p.session);return R().find(e=>e.id===t)??null}function Kt(t){const e={...t},a=R().filter(n=>n.id!==t.id&&n.role!==t.role);return v(p.accounts,[e,...a]),localStorage.setItem(p.session,e.id),e}function ze(t,e,a,n){v(p.accounts,[t,...e]),v(p.orders,a),H(n),localStorage.setItem(p.session,t.id)}async function Bt(){if(!A||!Lt())return null;try{const t=await q.me();if(t.role==="admin"){const[e,a,n]=await Promise.all([q.adminClients(),q.adminOrders(),q.adminProducts()]);ze(t,e,a,n)}else{const[e,a]=await Promise.all([q.myOrders(),q.products()]);Kt(t),v(p.orders,e),H(a)}return t}catch(t){if(t instanceof Ht&&t.status===401)return ut(),localStorage.removeItem(p.session),null;throw t}}function ht(){const t=M();return t.find(e=>e.id===at)??t[0]}function Mt(t){return Number.isFinite(t)?Math.min(Pt,Math.max(1,Math.round(t))):1}function et(){return gt(p.measurements,[]).filter(t=>t&&typeof t.id=="string"&&[t.dimensions?.length,t.dimensions?.width,t.dimensions?.height].every(e=>Number.isFinite(e)&&Number(e)>0)&&[0,5,10].includes(t.margin))}function nt(t){return t===0?"без додаткового запасу":`+${t} мм з кожного боку`}function qe(){const t=et();return t.length?`
    <div class="saved-measurements__head"><span>Збережені розміри</span><button type="button" data-clear-measurements>Очистити</button></div>
    <div class="saved-measurements__list">
      ${t.map(e=>`
            <button type="button" data-saved-measurement="${d(e.id)}">
              <strong>${I(e.dimensions)}</strong>
              <span>${nt(e.margin)}</span>
            </button>
          `).join("")}
    </div>
  `:""}function ke(){const t=document.querySelector("#saved-measurements");t&&(t.innerHTML=qe(),t.hidden=!t.innerHTML)}function xe(t,e){const a=`${t.length}-${t.width}-${t.height}-${e}`,n=et().filter(i=>`${i.dimensions.length}-${i.dimensions.width}-${i.dimensions.height}-${i.margin}`!==a),s={id:`size-${a}`,dimensions:t,margin:e,createdAt:new Date().toISOString()};v(p.measurements,[s,...n].slice(0,5)),v(p.fit,{dimensions:t,margin:e}),ke()}function Ke(t,e=!0){k={...t.dimensions},T=t.margin,v(p.fit,{dimensions:k,margin:T});const a=document.querySelector("#fit-form");if(a){a.elements.namedItem("length")?.setAttribute("value",String(k.length)),a.elements.namedItem("width")?.setAttribute("value",String(k.width)),a.elements.namedItem("height")?.setAttribute("value",String(k.height));const s=r=>{const o=a.elements.namedItem(r);o instanceof HTMLInputElement&&(o.value=String(k?.[r]??""))};s("length"),s("width"),s("height");const i=a.querySelector(`input[name="fitMargin"][value="${T}"]`);i&&(i.checked=!0)}const n=document.querySelector("#fit-message");n&&(n.textContent=`Розміри застосовано · ${nt(T)}.`,n.className="form-message is-success"),X=!1,vt(),e&&window.setTimeout(()=>document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth"}),180)}function Ct(t){let e=t.replace(/\D/g,"");return e.length===10&&e.startsWith("0")&&(e=`38${e}`),e.length===12&&e.startsWith("380")?`+${e}`:t.trim()}function mt(t){return Ct(t).replace(/\D/g,"")}function d(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function I(t){return`${t.length} × ${t.width} × ${t.height} мм`}function Rt(t){const e=t%100,a=t%10;return e>=11&&e<=14?`${t} позицій`:a===1?`${t} позиція`:a>=2&&a<=4?`${t} позиції`:`${t} позицій`}function Jt(t,e){return e?.partner?"Фіксована ціна клієнта":t>=Q?"Оптова ціна":"Роздрібна ціна"}function bt(t,e=!1){const{length:a,width:n,height:s}=t.dimensions,i=170+Math.min(100,a/3),r=58+Math.min(54,s/2.5),o=50+Math.min(44,n/4),l=72,c=e?70:82,f=c-o*.55,g=l+i,m=g+o,b=c+r;return`
    <svg class="box-visual${e?" box-visual--compact":""}" viewBox="0 0 470 270" role="img"
      aria-label="Схема коробки ${d(t.number)}, ${I(t.dimensions)}">
      <g class="box-visual__shape">
        <polygon class="box-visual__top" points="${l},${c} ${l+o},${f} ${m},${f} ${g},${c}" />
        <polygon class="box-visual__side" points="${g},${c} ${m},${f} ${m},${f+r} ${g},${b}" />
        <rect class="box-visual__front" x="${l}" y="${c}" width="${i}" height="${r}" />
        <rect class="box-visual__mark" x="${l+i*.35}" y="${c+r*.32}"
          width="${i*.3}" height="${Math.max(24,r*.34)}" rx="5" />
        <text class="box-visual__number" x="${l+i/2}" y="${c+r*.56}">№${d(t.number)}</text>
      </g>
      <g class="dimension-line dimension-line--length">
        <line x1="${l}" y1="${b+28}" x2="${g}" y2="${b+28}" />
        <line x1="${l}" y1="${b+20}" x2="${l}" y2="${b+36}" />
        <line x1="${g}" y1="${b+20}" x2="${g}" y2="${b+36}" />
        <rect x="${l+i/2-38}" y="${b+12}" width="76" height="32" rx="16" />
        <text x="${l+i/2}" y="${b+33}">${a} мм</text>
      </g>
      <g class="dimension-line dimension-line--height">
        <line x1="${l-26}" y1="${c}" x2="${l-26}" y2="${b}" />
        <line x1="${l-34}" y1="${c}" x2="${l-18}" y2="${c}" />
        <line x1="${l-34}" y1="${b}" x2="${l-18}" y2="${b}" />
        <rect x="2" y="${c+r/2-16}" width="66" height="32" rx="16" />
        <text x="35" y="${c+r/2+5}">${s} мм</text>
      </g>
      <g class="dimension-line dimension-line--width">
        <line x1="${g+8}" y1="${c-8}" x2="${m+8}" y2="${f-8}" />
        <rect x="${m-54}" y="${Math.max(4,f-48)}" width="76" height="32" rx="16" />
        <text x="${m-16}" y="${Math.max(25,f-27)}">${n} мм</text>
      </g>
    </svg>
  `}function Ae(){return M().map(t=>`<button class="product-picker__option" type="button" role="option" data-product-picker-value="${d(t.id)}" aria-selected="${t.id===at}">
          <span class="product-picker__number">№${d(t.number)}</span>
          <span class="product-picker__dimensions">${I(t.dimensions)}</span>
          <i aria-hidden="true"></i>
        </button>`).join("")}function le(t,e=!1){const a=ht();return`
    <div class="product-picker${e?" product-picker--large":""}" id="${t}" data-product-picker data-value="${d(a.id)}">
      <button
        class="product-picker__trigger"
        type="button"
        data-product-picker-trigger
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-controls="${t}-menu"
        aria-labelledby="${t}-label ${t}-value"
      >
        <span class="product-picker__value" id="${t}-value"><b>№${d(a.number)}</b><span>${I(a.dimensions)}</span></span>
        <i class="product-picker__chevron" aria-hidden="true"></i>
      </button>
      <div class="product-picker__menu" id="${t}-menu" role="listbox" aria-labelledby="${t}-label" hidden>
        ${Ae()}
      </div>
    </div>
  `}function Je(){const t=ht();return`
    <div class="page-top-sentinel" id="top" aria-hidden="true"></div>
    <header class="site-header">
      <a class="brand" href="#top" aria-label="ToffiPacks — на головну">
        <span class="brand__mark"><img src="./toffipacks-logo.webp" alt="" /></span>
        <span class="brand__copy"><strong>TOFFIPACKS</strong><small>самозбірні коробки</small></span>
      </a>
      <nav class="site-nav" id="site-nav" aria-label="Основна навігація">
        <a href="#catalog">Розміри</a>
        <a href="#calculator">Калькулятор</a>
        <a href="#about">Про нас</a>
        <a href="#business">Бізнесу</a>
        <a href="#delivery">Доставка</a>
        <a href="#faq">FAQ</a>
      </nav>
      <div class="header-actions">
        <a class="button button--ghost button--small" id="account-button" href="#account">Кабінет</a>
        <a class="button button--primary button--small cart-button" id="cart-button" href="#request">Кошик <span id="cart-count">0</span></a>
        <button class="menu-button" id="menu-button" type="button" aria-expanded="false" aria-controls="site-nav">
          <span></span><span></span><span></span><span class="sr-only">Меню</span>
        </button>
      </div>
    </header>

    <main id="main">
      <section class="hero section">
        <div class="hero__content reveal">
          <p class="eyebrow"><span></span> Розмір → тираж → ціна</p>
          <h1>Коробки за розміром.<br /><em>Ціна — одразу.</em></h1>
          <p class="hero__lead">
            Без категорій «для взуття» чи «для техніки». Оберіть внутрішній розмір,
            вкажіть кількість — калькулятор порахує весь тираж до 50&nbsp;000 штук.
          </p>
          <div class="hero__actions">
            <a class="button button--primary" href="#calculator">Розрахувати вартість</a>
            <a class="text-link" href="#catalog">Дивитися всі розміри <span aria-hidden="true">→</span></a>
          </div>
          <dl class="hero__facts">
            <div><dt id="hero-product-count">${M().length}</dt><dd>готових розмірів</dd></div>
            <div><dt>1–50 000</dt><dd>діапазон калькулятора</dd></div>
            <div><dt>Одразу</dt><dd>кінцева вартість</dd></div>
          </dl>
        </div>

        <div class="hero__visual reveal">
          <div class="logo-stage">
            <div class="logo-stage__orbit" aria-hidden="true"></div>
            <div class="logo-stage__image">
              <img src="./toffipacks-logo.webp" alt="Логотип ToffiPacks із деревом у відбитку лапи" />
            </div>
            <div class="logo-stage__note">
              <span class="technical-label">Коробки за розміром</span>
              <strong>Просто обрати.<br />Легко порахувати.</strong>
            </div>
          </div>
        </div>

        <div class="hero-calculator reveal" aria-label="Швидкий розрахунок">
          <div class="hero-calculator__head">
            <span class="technical-label">Швидкий розрахунок</span>
            <span class="price-rule">Кінцева ціна за весь тираж</span>
          </div>
          <div class="field">
            <span id="hero-product-picker-label">Коробка</span>
            ${le("hero-product-picker")}
          </div>
          <label class="field">
            <span>Кількість</span>
            <input class="input" id="hero-quantity-input" type="number" min="1" max="${Pt}" value="${w}" />
          </label>
          <div class="hero-calculator__result">
            <span id="hero-price-label">Роздрібна ціна</span>
            <strong id="hero-total">${$(D(t,w)*w)}</strong>
            <small id="hero-unit">${$(D(t,w))} / шт.</small>
          </div>
          <a class="button button--secondary" href="#calculator">Детальний розрахунок</a>
        </div>
      </section>

      <section class="section fit-section" id="fit">
        <div class="section-heading reveal">
          <div>
            <p class="eyebrow"><span></span> Підбір за габаритами</p>
            <h2>Введіть розмір предмета.</h2>
          </div>
          <p>Можна повертати предмет усередині коробки. Ми покажемо найкомпактніші варіанти, у які він входить.</p>
        </div>
        <div class="fit-panel reveal">
          <form class="fit-form" id="fit-form" novalidate>
            <div class="dimension-inputs">
              <label class="field">
                <span>Довжина, мм</span>
                <input class="input" name="length" type="number" min="1" max="2000" value="${k?.length??170}" required />
              </label>
              <span class="dimension-sign" aria-hidden="true">×</span>
              <label class="field">
                <span>Ширина, мм</span>
                <input class="input" name="width" type="number" min="1" max="2000" value="${k?.width??110}" required />
              </label>
              <span class="dimension-sign" aria-hidden="true">×</span>
              <label class="field">
                <span>Висота, мм</span>
                <input class="input" name="height" type="number" min="1" max="2000" value="${k?.height??45}" required />
              </label>
            </div>
            <fieldset class="fit-margin">
              <legend>Запас навколо предмета</legend>
              <div class="fit-margin__options">
                ${[0,5,10].map(e=>`
                      <label>
                        <input type="radio" name="fitMargin" value="${e}"${T===e?" checked":""} />
                        <span>${e===0?"Точно":`+${e} мм / бік`}</span>
                      </label>
                    `).join("")}
              </div>
              <p>Запас додається з обох боків кожної сторони предмета.</p>
            </fieldset>
            <button class="button button--primary" type="submit">Знайти коробку</button>
            <p class="form-message" id="fit-message" aria-live="polite"></p>
            <div class="saved-measurements" id="saved-measurements"${et().length?"":" hidden"}>${qe()}</div>
          </form>
          <div class="fit-panel__drawing">
            <div class="fit-object">
              <span>ваш предмет</span>
              <i class="fit-object__length">Д</i>
              <i class="fit-object__width">Ш</i>
              <i class="fit-object__height">В</i>
            </div>
            <p>Порівнюємо всі три сторони, а не назву товару.</p>
          </div>
        </div>
      </section>

      <section class="section catalog-section" id="catalog">
        <div class="section-heading reveal">
          <div>
            <p class="eyebrow" id="catalog-ready-label"><span></span> ${M().length} готових розмірів</p>
            <h2>Оберіть розмір,<br />не призначення.</h2>
          </div>
          <p>Порівняйте внутрішні габарити та одразу порахуйте потрібну кількість.</p>
        </div>
        <div class="catalog-toolbar reveal">
          <label class="search-field">
            <span class="sr-only">Пошук</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"></circle><path d="m16 16 4 4"></path></svg>
            <input id="catalog-search" type="search" placeholder="Номер або розмір" autocomplete="off" />
          </label>
          <div class="sort-field">
            <span id="catalog-sort-label">Сортувати</span>
            <div class="catalog-sort" id="catalog-sort" data-value="size">
              <button
                class="catalog-sort__trigger"
                type="button"
                aria-haspopup="listbox"
                aria-expanded="false"
                aria-labelledby="catalog-sort-label catalog-sort-value"
              >
                <span id="catalog-sort-value">Від компактних</span>
                <i aria-hidden="true"></i>
              </button>
              <div class="catalog-sort__menu" role="listbox" aria-labelledby="catalog-sort-label" hidden>
                <button type="button" role="option" data-sort-value="size" aria-selected="true"><span>Від компактних</span><i aria-hidden="true"></i></button>
                <button type="button" role="option" data-sort-value="price" aria-selected="false"><span>За ціною</span><i aria-hidden="true"></i></button>
                <button type="button" role="option" data-sort-value="number" aria-selected="false"><span>За номером</span><i aria-hidden="true"></i></button>
              </div>
            </div>
          </div>
          <button class="button button--ghost button--small" id="reset-catalog" type="button">Скинути підбір</button>
        </div>
        <div class="catalog-meta">
          <p id="catalog-count" aria-live="polite"></p>
        </div>
        <div class="product-grid" id="product-grid" aria-live="polite"></div>
        <div class="catalog-more" id="catalog-more" hidden>
          <button class="button button--ghost" id="catalog-more-button" type="button" aria-expanded="false"></button>
        </div>
      </section>

      <section class="section calculator-section" id="calculator">
        <div class="calculator-shell reveal">
          <div class="calculator-copy">
            <p class="eyebrow eyebrow--light"><span></span> Калькулятор тиражу</p>
            <h2>Від однієї коробки<br />до 50 тисяч.</h2>
            <p>
              Вкажіть кількість і відразу побачите кінцеву ціну за одну коробку
              та загальну вартість тиражу.
            </p>
            <div class="price-logic">
              <div><span>1–999 шт.</span><strong>роздрібна ціна</strong></div>
              <div><span>1 000–50 000 шт.</span><strong>оптова ціна</strong></div>
              <div><span>Постійним клієнтам</span><strong>персональна ціна</strong></div>
            </div>
          </div>

          <div class="calculator-card">
            <div class="calculator-card__top">
              <span class="technical-label">Розрахунок</span>
              <span class="account-price-badge" id="account-price-badge">Публічна ціна</span>
            </div>
            <div class="field">
              <span id="calculator-product-picker-label">Розмір коробки</span>
              ${le("calculator-product-picker",!0)}
            </div>
            <div class="calculator-preview" id="calculator-preview">${bt(t,!0)}</div>
            <div class="quantity-block">
              <div class="quantity-block__label">
                <label for="quantity-input">Кількість</label>
                <output id="quantity-output">${w.toLocaleString("uk-UA")} шт.</output>
              </div>
              <div class="quantity-control">
                <button type="button" data-quantity-step="-100" aria-label="Зменшити кількість на 100">−</button>
                <input id="quantity-input" type="number" min="1" max="${Pt}" value="${w}" />
                <button type="button" data-quantity-step="100" aria-label="Збільшити кількість на 100">+</button>
              </div>
              <div class="quantity-guide" aria-label="Правила ціни">
                <span><b>1–999</b><small>роздрібна ціна</small></span>
                <i aria-hidden="true"></i>
                <span><b>від 1 000</b><small>оптова ціна</small></span>
              </div>
              <div class="quantity-presets" aria-label="Швидкий вибір кількості">
                ${[100,500,1e3,5e3,1e4,5e4].map(e=>`<button type="button" data-quantity="${e}">${e.toLocaleString("uk-UA")}</button>`).join("")}
              </div>
            </div>
            <div class="calculation-result" aria-live="polite">
              <div>
                <span id="calculator-tier">Роздрібна ціна</span>
                <strong id="calculator-unit-price">${$(D(t,w))}<small>/ шт.</small></strong>
              </div>
              <div class="calculation-result__total">
                <span>Весь тираж</span>
                <strong id="calculator-total">${$(D(t,w)*w)}</strong>
              </div>
            </div>
            <div class="threshold-note" id="threshold-note"></div>
            <button class="button button--gold button--wide" type="button" data-add-selected-to-cart>Додати до кошика</button>
          </div>
        </div>
      </section>

      <section class="section about-section" id="about">
        <div class="about-layout">
          <div class="about-copy reveal">
            <p class="eyebrow"><span></span> Про ToffiPacks</p>
            <h2>Коробки, які легко<br />підібрати й замовити.</h2>
            <p class="about-copy__lead">
              ToffiPacks виготовляє самозбірні коробки для малого бізнесу, виробництв
              і регулярних великих замовлень. В основі сервісу — точний внутрішній розмір,
              зрозуміла ціна та прямий зв’язок із менеджером.
            </p>
            <div class="about-facts">
              <article>
                <span>01</span>
                <strong>Точний підбір</strong>
                <p>Обираєте коробку за трьома габаритами, а не за умовною категорією товару.</p>
              </article>
              <article>
                <span>02</span>
                <strong>Зрозуміле замовлення</strong>
                <p>Розмір, кількість і кінцева вартість зібрані в одному сценарії.</p>
              </article>
            </div>
          </div>

          <article class="eco-card reveal">
            <div class="eco-card__topline">
              <span class="technical-label">Екологічний підхід</span>
              <span class="eco-card__seal" aria-hidden="true"></span>
            </div>
            <h3>Сертифікована<br />вторинна сировина.</h3>
            <p>
              Використовуємо високоякісний перероблений картон із підтверджувальними
              сертифікатами. Повторне використання сировини зменшує потребу в новому картоні
              та дає матеріалу ще один цикл життя.
            </p>
            <p class="eco-card__note">
              Повторне використання матеріалу допомагає зменшувати кількість відходів без
              зайвих слів і декоративних обіцянок.
            </p>
          </article>
        </div>
      </section>

      <section class="section business-section" id="business">
        <div class="section-heading reveal">
          <div>
            <p class="eyebrow"><span></span> Для бізнесу</p>
            <h2>Від першої партії<br />до великих тиражів.</h2>
          </div>
          <p>Працюємо і з невеликими замовленнями, і з регулярними потребами виробництва. Коробка підлаштовується під задачу, а не навпаки.</p>
        </div>
        <div class="business-grid">
          <article class="business-card reveal">
            <span class="business-card__number">01</span>
            <h3>Малий бізнес</h3>
            <p>Можна почати з невеликої партії, перевірити розмір і поступово збільшувати обсяг замовлення.</p>
          </article>
          <article class="business-card reveal">
            <span class="business-card__number">02</span>
            <h3>Великі тиражі</h3>
            <p>Калькулятор одразу рахує замовлення до 50 000 штук. Більший тираж менеджер прорахує окремо.</p>
          </article>
          <article class="business-card business-card--accent reveal">
            <span class="business-card__number">03</span>
            <h3>Під ваш запит</h3>
            <p>Якщо готовий розмір не підходить, залиште потрібні габарити та вимоги — підготуємо коробку під вашу задачу.</p>
            <a class="text-link text-link--light" href="#request">Описати задачу <span>→</span></a>
          </article>
        </div>
      </section>

      <section class="section why-section" id="why">
        <div class="why-heading reveal">
          <p class="eyebrow"><span></span> Чому ToffiPacks</p>
          <h2>Прості умови.<br /><em>Відчутна користь.</em></h2>
          <p>Рішення оцінюємо не гучними словами, а тим, скільки часу, матеріалу й коштів воно заощаджує клієнту.</p>
        </div>
        <div class="why-grid">
          <article class="why-card reveal">
            <span>01</span>
            <h3>Ціна</h3>
            <p>Кінцева вартість за штуку і весь тираж видна ще до заявки.</p>
          </article>
          <article class="why-card reveal">
            <span>02</span>
            <h3>Якість</h3>
            <p>Сертифікована сировина та контроль точності кожного розміру.</p>
          </article>
          <article class="why-card reveal">
            <span>03</span>
            <h3>Доступність</h3>
            <p>Замовлення для малого й великого бізнесу без зайвих кроків.</p>
          </article>
          <article class="why-card why-card--accent reveal">
            <span>04</span>
            <h3>Економія</h3>
            <p>Точний розмір скорочує зайве пакування, а тираж знижує витрати на одиницю.</p>
          </article>
        </div>
      </section>

      <section class="section delivery-section" id="delivery">
        <div class="delivery-layout">
          <div class="delivery-copy reveal">
            <p class="eyebrow eyebrow--light"><span></span> Доставка й оплата</p>
            <h2>Умови відомі<br />до запуску.</h2>
            <p>Менеджер погоджує спосіб доставки, строк і оплату разом із фінальним складом замовлення.</p>
            <a class="button button--gold" href="#request">Залишити заявку</a>
          </div>
          <div class="delivery-list reveal">
            <article>
              <span>01</span>
              <div><h3>Доставка</h3><p>Доставляємо по Києву та Київській області. Формат, адресу й вартість уточнюйте з менеджером.</p></div>
            </article>
            <article>
              <span>02</span>
              <div><h3>Строки</h3><p>Залежать від тиражу та індивідуального розміру. Точну дату називаємо до початку виготовлення.</p></div>
            </article>
            <article>
              <span>03</span>
              <div><h3>Оплата</h3><p>Форму оплати й рахунок погоджуємо разом із підсумковою вартістю до запуску замовлення.</p></div>
            </article>
          </div>
        </div>
      </section>

      <section class="section request-section" id="request">
        <div class="request-copy reveal">
          <p class="eyebrow"><span></span> Кошик</p>
          <h2>Усі потрібні коробки<br />в одному замовленні.</h2>
          <p>
            Додавайте різні розміри, задавайте кількість для кожної позиції
            та одразу бачте загальну вартість.
          </p>
          <div class="cart-summary" id="request-summary" aria-live="polite"></div>
        </div>
        <form class="request-form reveal" id="request-form" novalidate>
          <div class="request-form__head">
            <span class="technical-label">Контактні дані</span>
            <span id="request-account-hint">Гість</span>
          </div>
          <div class="form-grid">
            <label class="field">
              <span>Ім’я *</span>
              <input class="input" name="name" autocomplete="name" required />
            </label>
            <label class="field">
              <span>Телефон *</span>
              <input class="input" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+380..." pattern="[+]?380[0-9]{9}" required />
            </label>
            <label class="field">
              <span>Компанія</span>
              <input class="input" name="company" autocomplete="organization" />
            </label>
          </div>
          <label class="field">
            <span>Коментар</span>
            <textarea class="input textarea" name="comment" rows="4" placeholder="Строк, доставка, особливості замовлення"></textarea>
          </label>
          <label class="checkbox">
            <input name="consent" type="checkbox" required />
            <span>Погоджуюся на обробку введених даних *</span>
          </label>
          <div class="form-status" id="request-status" aria-live="polite"></div>
          <button class="button button--primary button--wide" type="submit">
            Створити заявку
          </button>
        </form>
      </section>

      <section class="section faq-section" id="faq">
        <div class="faq-intro reveal">
          <p class="eyebrow"><span></span> FAQ</p>
          <h2>Коротко про<br />умови замовлення.</h2>
          <p>Доставка, строки, оплата й індивідуальне виготовлення — без прихованих припущень.</p>
        </div>
        <div class="faq-list reveal">
          ${Re.map((e,a)=>`
                <details${a===0?" open":""}>
                  <summary><span>${d(e.question)}</span><i aria-hidden="true"></i></summary>
                  <p>${d(e.answer)}</p>
                </details>
              `).join("")}
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-brand">
        <span class="brand__mark brand__mark--large"><img src="./toffipacks-logo.webp" alt="" /></span>
        <div><strong>TOFFIPACKS</strong><p>Самозбірні коробки за точним розміром.</p></div>
      </div>
      <div class="footer-links">
        <a href="#catalog">Розміри</a>
        <a href="#calculator">Ціни</a>
        <a href="#about">Про нас</a>
        <a href="#delivery">Доставка</a>
        <a href="#request">Кошик</a>
        <a href="#account">Кабінет</a>
      </div>
      <div class="footer-meta">
        <p>Самозбірні коробки за точним внутрішнім розміром.</p>
        <span>© 2026 ToffiPacks</span>
      </div>
    </footer>

    <section class="admin-page" id="admin-page" hidden aria-labelledby="admin-title">
      <header class="admin-header">
        <a class="brand" href="#top">
          <span class="brand__mark"><img src="./toffipacks-logo.webp" alt="" /></span>
          <span class="brand__copy"><strong>TOFFIPACKS</strong><small>кабінет менеджера</small></span>
        </a>
        <a class="button button--ghost button--small" href="#top">Повернутися на сайт</a>
      </header>
      <div id="admin-content"></div>
      <dialog class="admin-product-dialog" id="admin-product-dialog" aria-labelledby="admin-product-dialog-title">
        <button class="dialog-close" type="button" data-close-admin-product aria-label="Закрити">×</button>
        <div id="admin-product-editor"></div>
      </dialog>
    </section>

    <section class="account-page" id="account-page" hidden aria-labelledby="account-page-title">
      <header class="admin-header account-header">
        <a class="brand" href="#top">
          <span class="brand__mark"><img src="./toffipacks-logo.webp" alt="" /></span>
          <span class="brand__copy"><strong>TOFFIPACKS</strong><small>особистий кабінет</small></span>
        </a>
        <a class="button button--ghost button--small" href="#top">Повернутися до коробок</a>
      </header>
      <div class="account-page__content" id="account-page-content"></div>
    </section>

    <dialog class="product-dialog" id="product-dialog" aria-labelledby="product-dialog-title">
      <button class="dialog-close" type="button" data-close-dialog aria-label="Закрити">×</button>
      <div id="product-dialog-content"></div>
    </dialog>

    <dialog class="profile-dialog" id="profile-dialog" aria-labelledby="profile-dialog-title">
      <button class="dialog-close" type="button" data-close-profile aria-label="Закрити">×</button>
      <div id="profile-dialog-content"></div>
    </dialog>
  `}_e.innerHTML=Je();const Ot=document.querySelector("#product-grid"),Gt=document.querySelector("#catalog-count");function ae(t){return new Intl.NumberFormat("uk-UA",{maximumFractionDigits:1}).format(Math.max(0,t))}function We(t){if(!k)return"";const e=zt(k,t.dimensions,T);if(e.fits){const n=Math.min(...e.clearancesPerSide);return`<div class="product-card__fit"><strong>Підходить</strong><span>мін. ${ae(n)} мм на бік</span></div>`}const a=Math.max(...e.deficitsPerSide)*2;return`<div class="product-card__fit is-near"><strong>Найближчий розмір</strong><span>бракує до ${ae(a)} мм</span></div>`}function Ze(t){if(!k)return"";const e=zt(k,t.dimensions,T);if(e.fits)return`<div class="product-modal__fit is-fit"><strong>Коробка підходить</strong><span>${nt(T)} враховано у підборі.</span></div>`;const a=Math.max(...e.deficitsPerSide)*2;return`<div class="product-modal__fit is-warning" role="status"><strong>Цей розмір замалий</strong><span>Бракує до ${ae(a)} мм для обраного запасу. Додайте лише після ручної перевірки.</span></div>`}function ue(t){const e=Z(),a=D(t,1),n=D(t,Q),s=e?.partner?st(t,1,e):null;return`
    <article
      class="product-card${t.id===at?" is-selected":""}"
      data-product-card="${d(t.id)}"
    >
      <div class="product-card__head">
        <span class="product-card__number">№${d(t.number)}</span>
        <span class="product-card__size-label">внутрішній розмір</span>
      </div>
      <div class="product-card__visual">${bt(t,!0)}</div>
      <h3>${I(t.dimensions)}</h3>
      ${We(t)}
      <div class="product-card__prices">
        ${s!==null?`<div class="partner-price"><span>Ваша фіксована</span><strong>${$(s)}<small>/шт.</small></strong></div>`:`
              <div><span>1–999 шт.</span><strong>${$(a)}</strong></div>
              <div><span>від 1000 шт.</span><strong>${$(n)}</strong></div>
            `}
      </div>
      <span class="button button--card product-card__cta" aria-hidden="true">Детальніше</span>
      <button
        class="product-card__open"
        type="button"
        data-open-product="${d(t.id)}"
        aria-label="Відкрити коробку №${d(t.number)}, ${I(t.dimensions)}"
      ></button>
    </article>
  `}function Ye(t){const e=Z(),a=st(t,w,e),n=a*w;return`
    <div class="product-modal">
      <div class="product-modal__visual">
        <div class="product-modal__labels">
          <span>№${d(t.number)}</span>
        </div>
        <div class="product-modal__drawing">${bt(t,!0)}</div>
        <p>Внутрішній розмір · Д × Ш × В</p>
      </div>
      <div class="product-modal__content">
        <p class="eyebrow"><span></span> Внутрішній розмір</p>
        <h2 id="product-dialog-title">${I(t.dimensions)}</h2>
        ${Ze(t)}

        <div class="product-modal__rules">
          <div><span>1–999 шт.</span><strong>${$(D(t,1))} / шт.</strong></div>
          <div><span>від 1 000 шт.</span><strong>${$(D(t,Q))} / шт.</strong></div>
        </div>

        <div class="quantity-block quantity-block--modal">
          <div class="quantity-block__label">
            <label for="modal-quantity-input">Кількість</label>
            <output id="modal-quantity-output">${w.toLocaleString("uk-UA")} шт.</output>
          </div>
          <div class="quantity-control">
            <button type="button" data-quantity-step="-100" aria-label="Зменшити кількість на 100">−</button>
            <input id="modal-quantity-input" type="number" min="1" max="${Pt}" value="${w}" />
            <button type="button" data-quantity-step="100" aria-label="Збільшити кількість на 100">+</button>
          </div>
          <div class="quantity-presets quantity-presets--modal" aria-label="Швидкий вибір кількості">
            ${[100,500,1e3,5e3,1e4,5e4].map(s=>`<button type="button" data-quantity="${s}">${s.toLocaleString("uk-UA")}</button>`).join("")}
          </div>
        </div>

        <div class="product-modal__total" aria-live="polite">
          <div><span id="modal-price-tier">${Jt(w,e)}</span><strong id="modal-unit-price">${$(a)} / шт.</strong></div>
          <div><span>Весь тираж</span><strong id="modal-total">${$(n)}</strong></div>
        </div>

        <div class="product-modal__actions">
          <button class="button button--primary" type="button" data-product-to-cart>Додати до кошика</button>
          <button class="button button--ghost" type="button" data-product-to-calculator>Відкрити калькулятор</button>
        </div>
      </div>
    </div>
  `}function Le(){const t=document.querySelector("#product-dialog");if(!t?.open||!pt)return;const e=M().find(c=>c.id===pt);if(!e)return;const a=Z(),n=st(e,w,a),s=t.querySelector("#modal-quantity-input");s&&(s.value=String(w));const i=t.querySelector("#modal-quantity-output");i&&(i.value=`${w.toLocaleString("uk-UA")} шт.`);const r=t.querySelector("#modal-price-tier");r&&(r.textContent=Jt(w,a));const o=t.querySelector("#modal-unit-price");o&&(o.textContent=`${$(n)} / шт.`);const l=t.querySelector("#modal-total");l&&(l.textContent=$(n*w)),t.querySelectorAll("[data-quantity]").forEach(c=>{c.classList.toggle("is-active",Number(c.dataset.quantity)===w)})}function pe(t){const e=M().find(s=>s.id===t),a=document.querySelector("#product-dialog"),n=document.querySelector("#product-dialog-content");!e||!a||!n||(pt=e.id,Ce(e.id),n.innerHTML=Ye(e),a.classList.remove("is-closing"),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),Le())}function qt(t){const e=document.querySelector("#product-dialog");if(!e){pt=null,t?.();return}const a=()=>{e.classList.remove("is-closing"),e.open&&typeof e.close=="function"?e.close():e.removeAttribute("open"),pt=null,t?.()};if(!e.open||window.matchMedia("(prefers-reduced-motion: reduce)").matches){a();return}e.classList.contains("is-closing")||(e.classList.add("is-closing"),window.setTimeout(a,230))}function Xe(){const t=M(),e=It.trim().toLocaleLowerCase("uk-UA");return t.filter(n=>{const s=`${n.number} ${n.name} ${I(n.dimensions)}`.toLocaleLowerCase("uk-UA"),i=!e||s.includes(e),r=!k||zt(k,n.dimensions,T).fits;return i&&r}).sort((n,s)=>ee==="price"?n.basePrice-s.basePrice:ee==="number"?n.number.localeCompare(s.number,"uk-UA",{numeric:!0}):Ft(n)-Ft(s))}function Ge(){if(!k)return[];const t=It.trim().toLocaleLowerCase("uk-UA");return M().filter(e=>{const a=`${e.number} ${e.name} ${I(e.dimensions)}`.toLocaleLowerCase("uk-UA");return!t||a.includes(t)}).map(e=>{const n=zt(k,e.dimensions,T).deficitsPerSide.reduce((s,i)=>s+i,0);return{product:e,deficit:n}}).sort((e,a)=>e.deficit-a.deficit||Ft(e.product)-Ft(a.product)).slice(0,3).map(({product:e})=>e)}function N(t=!1){if(!Ot||!Gt)return;const e=document.querySelector("#catalog-more"),a=document.querySelector("#catalog-more-button");if(t){Gt.textContent="Оновлюємо список…",e&&(e.hidden=!0),Ot.innerHTML=Array.from({length:6},()=>'<div class="product-skeleton" aria-hidden="true"><i></i><i></i><i></i></div>').join("");return}const n=Xe(),s=k?` · предмет ${I(k)} · ${nt(T)}`:"";if(Gt.textContent=`${n.length} із ${M().length} розмірів${s}`,!n.length){const l=Ge();Ot.innerHTML=`
      <div class="empty-state${l.length?" empty-state--nearest":""}">
        <div class="empty-state__box" aria-hidden="true"></div>
        <h3>Готового розміру немає.</h3>
        <p>${T?`Із запасом ${nt(T)} точного варіанта немає. Найближчі коробки нижче замалі — це позначено окремо.`:"Змініть габарити предмета або залиште заявку з потрібним розміром."}</p>
        <div class="empty-state__actions">
          ${T?'<button class="button button--ghost" type="button" data-use-tight-fit>Показати без запасу</button>':""}
          <a class="button button--primary" href="#request">Описати свій розмір</a>
        </div>
        ${l.length?`<div class="nearest-results"><div class="nearest-results__head"><strong>Найближчі готові розміри</strong><span>Вони не відповідають обраному запасу</span></div><div class="nearest-results__grid">${l.map(ue).join("")}</div></div>`:""}
      </div>
    `,e&&(e.hidden=!0);return}const r=window.matchMedia("(max-width: 680px)").matches&&!It.trim()&&!k&&n.length>4,o=r&&!X?n.slice(0,4):n;Ot.innerHTML=o.map(ue).join(""),e&&a&&(e.hidden=!r,a.textContent=X?"Згорнути каталог":`Показати всі ${n.length} розмірів`,a.setAttribute("aria-expanded",String(X)))}function vt(){window.clearTimeout(de),N(!0),de=window.setTimeout(()=>N(!1),320)}function Pe(t=!1){const e=ht();document.querySelectorAll("[data-product-picker]").forEach(a=>{a.dataset.value=e.id;const n=a.querySelector(".product-picker__value b"),s=a.querySelector(".product-picker__value span");n&&(n.textContent=`№${e.number}`),s&&(s.textContent=I(e.dimensions));const i=a.querySelector(".product-picker__menu");i&&t&&(i.innerHTML=Ae()),a.querySelectorAll("[data-product-picker-value]").forEach(r=>{r.setAttribute("aria-selected",String(r.dataset.productPickerValue===e.id))})})}function ct(t,e=!1){const a=t.querySelector("[data-product-picker-trigger]"),n=t.querySelector(".product-picker__menu");t.classList.remove("is-open"),a?.setAttribute("aria-expanded","false"),window.setTimeout(()=>{n&&!t.classList.contains("is-open")&&(n.hidden=!0)},190),e&&a?.focus()}function Te(t){document.querySelectorAll("[data-product-picker].is-open").forEach(e=>{e!==t&&ct(e)})}function Me(t,e=!1){Te(t);const a=t.querySelector("[data-product-picker-trigger]"),n=t.querySelector(".product-picker__menu");!a||!n||(n.hidden=!1,a.setAttribute("aria-expanded","true"),window.requestAnimationFrame(()=>{t.classList.add("is-open");const s=t.querySelector('[data-product-picker-value][aria-selected="true"]');s?.scrollIntoView({block:"nearest"}),e&&s?.focus()}))}function ta(t){t.classList.contains("is-open")?ct(t):Me(t)}function J(){const t=ht(),e=Z(),a=st(t,w,e),n=a*w,s=Jt(w,e);Pe(),document.querySelectorAll("#quantity-input, #hero-quantity-input, #modal-quantity-input").forEach(E=>{E.value=String(w)});const i=document.querySelector("#quantity-output");i&&(i.value=`${w.toLocaleString("uk-UA")} шт.`);const r=document.querySelector("#calculator-preview");r&&(r.classList.remove("is-changing"),r.offsetWidth,r.classList.add("is-changing"),r.innerHTML=bt(t,!0));const o=document.querySelector("#calculator-tier");o&&(o.textContent=s);const l=document.querySelector("#calculator-unit-price");l&&(l.innerHTML=`${$(a)}<small>/ шт.</small>`);const c=document.querySelector("#calculator-total");c&&(c.textContent=$(n));const f=document.querySelector("#hero-price-label");f&&(f.textContent=s);const g=document.querySelector("#hero-total");g&&(g.textContent=$(n));const m=document.querySelector("#hero-unit");m&&(m.textContent=`${$(a)} / шт.`);const b=document.querySelector("#account-price-badge");b&&(b.textContent=e?.partner?"Персональна ціна активна":"Публічна ціна",b.classList.toggle("is-partner",!!e?.partner));const P=document.querySelector("#threshold-note");if(P)if(e?.partner)P.innerHTML=`<strong>Фіксована ціна:</strong> ${$(a)} за одиницю незалежно від тиражу.`;else if(w<Q){const E=Q-w,F=D(t,Q)*Q;P.innerHTML=`Ще <strong>${E.toLocaleString("uk-UA")} шт.</strong> до оптового тарифу. 1000 шт. коштуватимуть ${$(F)}.`}else P.innerHTML=`<strong>Оптовий тариф активний.</strong> Економія проти роздрібної ціни — ${$(w)} на всьому тиражі.`;document.querySelectorAll("[data-quantity]").forEach(E=>{E.classList.toggle("is-active",Number(E.dataset.quantity)===w)}),G(),Le()}function Ce(t,e=!1){M().some(a=>a.id===t)&&(at=t,N(!1),J(),e&&document.querySelector("#calculator")?.scrollIntoView({behavior:"smooth",block:"start"}))}function dt(t){w=Mt(t),J()}function me(t,e){if(!M().some(i=>i.id===t))return;const a=z(),n=a.find(i=>i.productId===t);n?n.quantity=Mt(e):a.push({productId:t,quantity:Mt(e)}),v(p.cart,a),G();const s=document.querySelector("#cart-button");s?.classList.remove("is-updated"),s?.offsetWidth,s?.classList.add("is-updated")}function Ie(t,e){const a=z(),n=a.find(s=>s.productId===t);n&&(n.quantity=Mt(e),v(p.cart,a),G())}function ea(t){v(p.cart,z().filter(e=>e.productId!==t)),G()}function G(){const t=document.querySelector("#request-summary"),e=document.querySelector("#cart-count"),a=document.querySelector('#request-form button[type="submit"]'),n=z(),s=Z();if(e&&(e.textContent=String(n.length)),a&&(a.disabled=n.length===0),!t)return;if(!n.length){t.innerHTML=`
      <div class="cart-empty">
        <div class="cart-empty__visual" aria-hidden="true">
          <svg viewBox="0 0 132 92" fill="none">
            <path class="cart-empty__lid" d="M20 34 53 14h58L78 34H20Z" />
            <path class="cart-empty__front" d="M20 34h58v40H20V34Z" />
            <path class="cart-empty__side" d="m78 34 33-20v40L78 74V34Z" />
            <path d="M20 34h58m0 0 33-20M78 34v40M20 74h58l33-20V14H53L20 34v40Z" />
            <path class="cart-empty__fold" d="m20 34 30 12 28-12" />
            <circle cx="110" cy="71" r="15" />
            <path class="cart-empty__plus" d="M110 64v14m-7-7h14" />
          </svg>
        </div>
        <strong>Кошик порожній</strong>
        <p>Оберіть розмір і додайте потрібну кількість коробок.</p>
        <a class="button button--ghost button--small" href="#catalog">Обрати коробки</a>
      </div>
    `;return}let i=0;const r=n.map(o=>{const l=M().find(g=>g.id===o.productId);if(!l)return"";const c=st(l,o.quantity,s),f=c*o.quantity;return i+=f,`
        <article class="cart-item">
          <div class="cart-item__index">№${d(l.number)}</div>
          <div class="cart-item__info">
            <strong>${I(l.dimensions)}</strong>
            <span>${$(c)} / шт.</span>
          </div>
          <label class="cart-item__quantity">
            <span>Кількість</span>
            <div class="cart-item__quantity-control">
              <button type="button" data-cart-step="-100" data-cart-product="${d(l.id)}" aria-label="Зменшити кількість коробки №${d(l.number)} на 100">−</button>
              <input class="input" type="number" min="1" max="${Pt}" value="${o.quantity}" data-cart-quantity="${d(l.id)}" />
              <button type="button" data-cart-step="100" data-cart-product="${d(l.id)}" aria-label="Збільшити кількість коробки №${d(l.number)} на 100">+</button>
            </div>
          </label>
          <div class="cart-item__total">
            <span>Сума</span>
            <strong>${$(f)}</strong>
          </div>
          <div class="cart-item__actions">
            <button type="button" data-edit-cart="${d(l.id)}">Змінити</button>
            <button class="cart-item__remove" type="button" data-remove-cart="${d(l.id)}" aria-label="Прибрати коробку №${d(l.number)} з кошика">×</button>
          </div>
        </article>
      `}).join("");t.innerHTML=`
    <div class="cart-list">${r}</div>
    <div class="cart-summary__total">
      <span>${Rt(n.length)}</span>
      <div><small>Загальна вартість</small><strong>${$(i)}</strong></div>
    </div>
    <div class="cart-summary__actions">
      <a class="cart-continue" href="#catalog">+ Додати ще один розмір</a>
      <button type="button" data-clear-cart>Очистити кошик</button>
    </div>
  `}function aa(t){const e=B().find(i=>i.id===t);if(!e)return;const a=new Set(M().map(i=>i.id)),n=e.items.filter(i=>a.has(i.productId)).map(i=>({productId:i.productId,quantity:Mt(i.quantity)}));if(!n.length)return;const s=z().filter(i=>!n.some(r=>r.productId===i.productId));v(p.cart,[...s,...n]),G(),window.location.hash="request",window.setTimeout(()=>document.querySelector("#request")?.scrollIntoView({behavior:"smooth",block:"start"}),80)}function W(){const t=document.querySelector("#account-button"),e=Z();if(!t)return;t.textContent=e?e.name.split(" ")[0]:"Кабінет",t.classList.toggle("is-signed-in",!!e);const a=document.querySelector("#request-account-hint");a&&(a.textContent=e?e.name:"Гість");const n=document.querySelector("#request-form");if(n&&e){const s=(i,r)=>{const o=n.elements.namedItem(i);o instanceof HTMLInputElement&&!o.value&&(o.value=r)};s("name",e.name),s("phone",e.phone),s("company",e.company)}G()}function na(){const t=Z();if(t){const e=B().filter(o=>o.accountId===t.id).slice().reverse(),a=e.filter(o=>o.status!=="Закрита").length,n=e.reduce((o,l)=>o+l.total,0),s=t.name.split(/\s+/).filter(Boolean).slice(0,2).map(o=>o[0]).join("").toLocaleUpperCase("uk-UA"),i=ht(),r=st(i,w,t);return`
      <div class="account-dashboard">
        <section class="account-dashboard__hero">
          <div class="account-identity">
            <span class="account-avatar">${d(s||"TP")}</span>
            <div>
              <p class="eyebrow eyebrow--light"><span></span> Особистий кабінет</p>
              <h1 id="account-page-title">${d(t.name)}</h1>
              <p>${d(t.phone)}${t.company?` · ${d(t.company)}`:""}</p>
            </div>
          </div>
          <div class="account-dashboard__hero-actions">
            <span class="account-client-badge">${t.partner?"Постійний клієнт":"Новий клієнт"}</span>
            <button class="account-logout" type="button" id="logout-button">Вийти</button>
          </div>
          <div class="account-price-card${t.partner?" is-partner":""}">
            <span>Ваші ціни</span>
            <strong>${t.partner?"Персональна ціна активна":"Стандартні ціни"}</strong>
            <p>${t.partner?"Ваша ціна вже застосована в каталозі, калькуляторі та кошику.":"Усі суми показані одразу в кінцевому вигляді."}</p>
          </div>
        </section>

        <div class="account-kpis">
          <article><span>Усі заявки</span><strong>${e.length}</strong><small>оформлено</small></article>
          <article><span>Активні</span><strong>${a}</strong><small>потребують уваги</small></article>
          <article><span>Сума заявок</span><strong>${$(n)}</strong><small>загальна вартість</small></article>
        </div>

        <div class="account-dashboard__grid">
          <section class="account-orders-panel">
            <div class="account-panel-heading">
              <div><p class="eyebrow"><span></span> Історія</p><h2>Мої заявки</h2></div>
              <a class="text-link" href="#request">Нова заявка <span>→</span></a>
            </div>
            <div class="account-order-list">
              ${e.length?e.map(o=>{const l=o.items.reduce((c,f)=>c+f.quantity,0);return`
                          <article class="account-order">
                            <div class="account-order__main">
                              <span>${d(o.id)}</span>
                              <strong>${Rt(o.items.length)}</strong>
                              <small>${l.toLocaleString("uk-UA")} шт. загалом</small>
                            </div>
                            <div class="account-order__price"><strong>${$(o.total)}</strong><small>загальна сума</small></div>
                            <div class="account-order__meta"><span>${d(o.status)}</span><time datetime="${o.createdAt}">${new Date(o.createdAt).toLocaleDateString("uk-UA")}</time></div>
                            <div class="account-order__items">
                              ${o.items.map(c=>`<span><b>№${d(c.productNumber)}</b> ${I(c.dimensions)} · ${c.quantity.toLocaleString("uk-UA")} шт.</span>`).join("")}
                            </div>
                            <button class="account-order__repeat" type="button" data-repeat-order="${d(o.id)}">Повторити замовлення</button>
                          </article>
                        `}).join(""):'<div class="account-empty"><strong>Заявок ще немає.</strong><p>Оберіть розмір, порахуйте тираж і збережіть першу заявку.</p><a class="button button--primary" href="#catalog">До каталогу</a></div>'}
            </div>
          </section>

          <aside class="account-sidebar">
            <article class="account-quick-order">
              <p class="technical-label">Швидкий розрахунок</p>
              <div class="account-quick-order__box">${bt(i,!1)}</div>
              <span>Коробка №${d(i.number)}</span>
              <h3>${I(i.dimensions)}</h3>
              <div><span>${w.toLocaleString("uk-UA")} шт.</span><strong>${$(r*w)}</strong></div>
              <button class="button button--gold button--wide" type="button" data-add-selected-to-cart>Додати до кошика</button>
            </article>
            <article class="account-profile-card">
              <div><p class="technical-label">Профіль</p><button class="text-link" type="button" data-edit-profile>Дані клієнта</button></div>
              <dl>
                <div><dt>Телефон</dt><dd>${d(t.phone)}</dd></div>
                <div><dt>Компанія</dt><dd>${d(t.company||"Не вказано")}</dd></div>
                <div><dt>Статус</dt><dd>${t.partner?"Постійний клієнт":"Новий клієнт"}</dd></div>
              </dl>
              ${t.role==="admin"?'<a class="button button--ghost button--wide" href="#admin">Відкрити адмінку</a>':""}
            </article>
            ${et().length?`<article class="account-measurements"><div><p class="technical-label">Збережені розміри</p><span>${et().length} останніх</span></div><div class="account-measurements__list">${et().map(o=>`<button type="button" data-saved-measurement="${d(o.id)}"><strong>${I(o.dimensions)}</strong><span>${nt(o.margin)}</span></button>`).join("")}</div></article>`:""}
          </aside>
        </div>
      </div>
    `}return`
    <div class="auth-layout">
      <div class="auth-intro">
        <p class="eyebrow"><span></span> Кабінет ToffiPacks</p>
        <h1 id="account-page-title">Увійдіть за номером телефону.</h1>
        <p>Постійним клієнтам менеджер може активувати фіксовану ціну нижче публічної оптової.</p>
      </div>
      <div class="auth-forms">
        <div class="auth-tabs" role="tablist">
          <button class="is-active" type="button" role="tab" aria-selected="true" data-auth-tab="login">Вхід</button>
          <button type="button" role="tab" aria-selected="false" data-auth-tab="register">Реєстрація</button>
        </div>
        <form id="login-form" class="auth-form" data-auth-panel="login" novalidate>
          <label class="field"><span>Телефон</span><input class="input" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+380..." pattern="[+]?380[0-9]{9}" required /></label>
          <label class="field"><span>Пароль</span><input class="input" name="password" type="password" required /></label>
          <div class="form-status" data-auth-status aria-live="polite"></div>
          <button class="button button--primary button--wide" type="submit">Увійти</button>
        </form>
        <form id="register-form" class="auth-form" data-auth-panel="register" hidden novalidate>
          <div class="form-grid">
            <label class="field"><span>Ім’я *</span><input class="input" name="name" required /></label>
            <label class="field"><span>Телефон *</span><input class="input" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+380..." pattern="[+]?380[0-9]{9}" required /></label>
          </div>
          <label class="field"><span>Компанія</span><input class="input" name="company" /></label>
          <label class="field"><span>Пароль, від 8 символів *</span><input class="input" name="password" type="password" minlength="8" required /></label>
          <div class="form-status" data-auth-status aria-live="polite"></div>
          <button class="button button--primary button--wide" type="submit">Створити акаунт</button>
        </form>
      </div>
    </div>
  `}function V(){const t=document.querySelector("#account-page-content");t&&(t.innerHTML=na())}function sa(t){return`
    <div class="profile-editor">
      <p class="eyebrow"><span></span> Дані клієнта</p>
      <h2 id="profile-dialog-title">Оновити профіль.</h2>
      <p>Телефон використовується для входу та зв’язку щодо заявки.</p>
      <form id="profile-form" novalidate>
        <label class="field"><span>Ім’я *</span><input class="input" name="name" value="${d(t.name)}" autocomplete="name" required /></label>
        <label class="field"><span>Телефон *</span><input class="input" name="phone" type="tel" inputmode="tel" autocomplete="tel" value="${d(t.phone)}" pattern="[+]?380[0-9]{9}" required /></label>
        <label class="field"><span>Компанія</span><input class="input" name="company" value="${d(t.company)}" autocomplete="organization" /></label>
        <label class="field"><span>Новий пароль</span><input class="input" name="password" type="password" minlength="8" autocomplete="new-password" placeholder="Залиште порожнім, щоб не змінювати" /></label>
        <div class="form-status" data-profile-status aria-live="polite"></div>
        <div class="profile-editor__actions">
          <button class="button button--ghost" type="button" data-close-profile>Скасувати</button>
          <button class="button button--primary" type="submit">Зберегти дані</button>
        </div>
      </form>
    </div>
  `}function ia(){const t=Z(),e=document.querySelector("#profile-dialog"),a=document.querySelector("#profile-dialog-content");!t||!e||!a||(a.innerHTML=sa(t),typeof e.showModal=="function"?e.showModal():e.setAttribute("open",""),a.querySelector('input[name="name"]')?.focus())}async function ra(t){t.classList.add("was-validated");const e=t.querySelector("[data-profile-status]");if(!t.reportValidity()){e&&(e.className="form-status is-error",e.textContent="Перевірте ім’я, телефон і новий пароль.");return}const a=Z();if(!a)return;const n=new FormData(t),s=Ct(String(n.get("phone")??"")),i=R();if(i.some(l=>l.id!==a.id&&mt(l.phone)===mt(s))){e&&(e.className="form-status is-error",e.textContent="Акаунт із таким номером уже існує.");return}const r=String(n.get("password")??"");if(A){try{const l=await q.updateMe({name:String(n.get("name")??"").trim(),phone:s,company:String(n.get("company")??"").trim(),...r?{password:r}:{}});Kt(l),document.querySelector("#profile-dialog")?.close(),W(),V(),J(),N(!1)}catch(l){e&&(e.className="form-status is-error",e.textContent=O(l,"Не вдалося оновити профіль."))}return}const o=i.map(l=>l.id===a.id?{...l,name:String(n.get("name")??"").trim(),phone:s,company:String(n.get("company")??"").trim(),password:r||l.password}:l);v(p.accounts,o),document.querySelector("#profile-dialog")?.close(),W(),V(),J(),N(!1)}function Vt(t,e,a){const n=t.querySelector("[data-auth-status]");n&&(n.textContent=e,n.className=`form-status is-${a}`)}function O(t,e){return t instanceof Ht?t.message:e}function oa(t,e){const a=mt(t),n=R().find(s=>mt(s.phone)===a&&s.password===e);return n?(localStorage.setItem(p.session,n.id),n):null}async function fe(t,e=!1){if(t.classList.add("was-validated"),!t.reportValidity())return;const a=new FormData(t);let n=null;if(A)try{const s=await q.login(String(a.get("phone")??""),String(a.get("password")??""));e&&s.role!=="admin"?ut():(n=Kt(s),await Bt())}catch(s){Vt(t,O(s,"Сервер авторизації недоступний."),"error");return}else n=oa(String(a.get("phone")??""),String(a.get("password")??""));if(!n||e&&n.role!=="admin"){Vt(t,e?"Потрібен акаунт менеджера.":"Невірний телефон або пароль.","error");return}W(),J(),N(!1),e?y():(V(),window.location.hash="account")}async function ca(t){if(t.classList.add("was-validated"),!t.reportValidity())return;const e=new FormData(t),a=Ct(String(e.get("phone")??""));if(A){try{const i=await q.register({name:String(e.get("name")??"").trim(),phone:a,company:String(e.get("company")??"").trim(),password:String(e.get("password")??"")});Kt(i),v(p.orders,[]),W(),J(),N(!1),V(),window.location.hash="account"}catch(i){Vt(t,O(i,"Не вдалося створити акаунт."),"error")}return}const n=R();if(n.some(i=>mt(i.phone)===mt(a))){Vt(t,"Акаунт із таким номером уже існує.","error");return}const s={id:`account-${Date.now().toString(36)}`,name:String(e.get("name")??"").trim(),phone:a,company:String(e.get("company")??"").trim(),password:String(e.get("password")??""),role:"client",partner:!1,fixedMarkup:te,createdAt:new Date().toISOString()};n.push(s),v(p.accounts,n),localStorage.setItem(p.session,s.id),W(),J(),N(!1),V(),window.location.hash="account"}async function da(t){const e=document.querySelector("#request-status"),a=z();if(!a.length){e&&(e.className="form-status is-error",e.textContent="Додайте хоча б одну коробку до кошика.");return}if(t.classList.add("was-validated"),!t.reportValidity()){e&&(e.className="form-status is-error",e.textContent="Перевірте обов’язкові поля та згоду.");return}const n=new FormData(t),s=Z(),i=Ct(String(n.get("phone")??"")),r=s??R().find(m=>Ct(m.phone)===i),o=a.flatMap(m=>{const b=M().find(E=>E.id===m.productId);if(!b)return[];const P=st(b,m.quantity,s);return[{productId:b.id,productNumber:b.number,dimensions:b.dimensions,quantity:m.quantity,unitPrice:P,total:P*m.quantity,priceType:Jt(m.quantity,s)}]}),l=o.reduce((m,b)=>m+b.total,0);if(A){const m=t.querySelector('button[type="submit"]');m&&(m.disabled=!0,m.dataset.originalText=m.textContent??"",m.textContent="Зберігаємо заявку…");try{const b=await q.createOrder({customerName:String(n.get("name")??"").trim(),phone:i,company:String(n.get("company")??"").trim(),comment:String(n.get("comment")??"").trim(),items:a.map(P=>({productId:P.productId,quantity:P.quantity}))});v(p.orders,[...B().filter(P=>P.id!==b.id),b]),v(p.cart,[]),G(),V(),e&&(e.className="form-status is-success",e.innerHTML=`<strong>Заявку ${d(b.id)} створено.</strong><span>${Rt(b.items.length)} на суму ${$(b.total)}. Менеджер побачить її в адмінці.</span>`)}catch(b){e&&(e.className="form-status is-error",e.textContent=O(b,"Не вдалося передати заявку на сервер."))}finally{m&&(m.disabled=!1,m.textContent=m.dataset.originalText||"Надіслати заявку",m.focus())}return}const c=new Date().toISOString(),f={id:`TP-${Date.now().toString(36).toUpperCase()}`,createdAt:c,customerName:String(n.get("name")??"").trim(),phone:i,company:String(n.get("company")??"").trim(),comment:String(n.get("comment")??"").trim(),items:o,total:l,accountId:r?.id,status:"Нова",statusHistory:[{status:"Нова",at:c}]},g=B();g.push(f),v(p.orders,g),v(p.cart,[]),G(),V(),e&&(e.className="form-status is-success",e.innerHTML=`<strong>Заявку ${d(f.id)} створено.</strong><span>${Rt(f.items.length)} на суму ${$(f.total)}. Номер можна повідомити менеджеру.</span>`),t.querySelector('button[type="submit"]')?.focus()}const la=["Нова","У роботі","Уточнення","Підтверджена","Закрита"];function ge(t){return t==="Нова"?"is-new":t==="У роботі"?"is-progress":t==="Уточнення"?"is-clarifying":t==="Підтверджена"?"is-confirmed":"is-closed"}function ua(t){return`
    <div class="order-status-control ${ge(t.status)}" data-order-status-control>
      <button class="order-status-control__trigger" type="button" data-order-status-trigger aria-haspopup="listbox" aria-expanded="false">
        <span class="order-status-control__dot" aria-hidden="true"></span>
        <span>${d(t.status)}</span>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
      </button>
      <div class="order-status-control__menu" role="listbox" aria-label="Статус заявки ${d(t.id)}" hidden>
        ${la.map(e=>`
            <button class="${ge(e)}" type="button" role="option" aria-selected="${e===t.status}" data-order-status-option="${d(e)}" data-order-id="${d(t.id)}">
              <span class="order-status-control__dot" aria-hidden="true"></span>
              <span>${d(e)}</span>
              ${e===t.status?'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7" /></svg>':""}
            </button>
          `).join("")}
      </div>
    </div>
  `}function kt(t){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${n}`}function xt(t){const[e,a,n]=t.split("-").map(Number);return new Date(e,Math.max(0,(a||1)-1),n||1,12)}function rt(t){return xt(t).toLocaleDateString("uk-UA",{day:"2-digit",month:"2-digit",year:"numeric"})}function Ee(t=!1){const a=kt(new Date),s=xt(_t||x||a),i=new Date(s.getFullYear(),s.getMonth(),1,12);_t=kt(i);const r=(i.getDay()+6)%7,o=new Date(i);o.setDate(i.getDate()-r);const l=Array.from({length:42},(P,E)=>{const F=new Date(o);F.setDate(o.getDate()+E);const U=kt(F),it=F.getMonth()!==i.getMonth(),yt=U===x,$t=U===L,wt=yt||$t,Et=!!(x&&L&&U>x&&U<L);return`<button class="${[it?"is-outside":"",Et?"is-in-range":"",yt?"is-range-start":"",$t?"is-range-end":"",wt?"is-selected":"",U===a?"is-today":""].filter(Boolean).join(" ")}" type="button" data-calendar-date="${U}" aria-label="${F.toLocaleDateString("uk-UA",{day:"numeric",month:"long",year:"numeric"})}" aria-pressed="${wt}">${F.getDate()}</button>`}).join(""),c=x?L&&L!==x?`${rt(x)} — ${rt(L)}`:rt(x):"Усі дати",f=x&&L?Math.round((xt(L).getTime()-xt(x).getTime())/864e5)+1:0,g=x?L?f===1?"Обрано один день":`Обрано ${f} дн.`:"Тепер оберіть кінець":"Оберіть початок",m=x?L?`${rt(x)} — ${rt(L)}`:`Початок: ${rt(x)}`:"Перший клік — початкова дата",b=i.toLocaleDateString("uk-UA",{month:"long",year:"numeric"});return`
    <div class="admin-calendar${t?" is-open":""}" data-admin-calendar>
      <button class="admin-calendar__trigger" type="button" data-calendar-trigger aria-haspopup="dialog" aria-expanded="${t}">
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 2v3m10-3v3M3 8h14M4 4h12a1 1 0 0 1 1 1v12H3V5a1 1 0 0 1 1-1Z" /></svg>
        <span><small>Період заявок</small><strong>${d(c)}</strong></span>
        <svg class="admin-calendar__chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
      </button>
      <div class="admin-calendar__popover" role="dialog" aria-label="Оберіть період заявок"${t?"":" hidden"}>
        <div class="admin-calendar__head">
          <strong>${d(b)}</strong>
          <div>
            <button type="button" data-calendar-month="-1" aria-label="Попередній місяць"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m10 3-5 5 5 5" /></svg></button>
            <button type="button" data-calendar-month="1" aria-label="Наступний місяць"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg></button>
          </div>
        </div>
        <div class="admin-calendar__range-state${x&&!L?" is-pending":""}" aria-live="polite">
          <span aria-hidden="true">${x&&L?"✓":x?"2":"1"}</span>
          <div><strong>${d(g)}</strong><small>${d(m)}</small></div>
        </div>
        <div class="admin-calendar__weekdays" aria-hidden="true">${["Пн","Вт","Ср","Чт","Пт","Сб","Нд"].map(P=>`<span>${P}</span>`).join("")}</div>
        <div class="admin-calendar__days">${l}</div>
        <div class="admin-calendar__footer">
          <button type="button" data-calendar-clear${x?"":" disabled"}>Очистити</button>
          <small>Дати включно</small>
        </div>
      </div>
    </div>
  `}function pa(){return window.location.hash==="#admin-orders"?"orders":window.location.hash==="#admin-clients"?"clients":window.location.hash==="#admin-products"?"products":"overview"}function ma(t,e,a,n){return[{view:"overview",href:"#admin",label:"Огляд"},{view:"orders",href:"#admin-orders",label:"Замовлення",count:e},{view:"clients",href:"#admin-clients",label:"Клієнти",count:a},{view:"products",href:"#admin-products",label:"Товари",count:n}].map((i,r)=>`
        <a class="admin-nav__link${t===i.view?" is-active":""}" href="${i.href}"${t===i.view?' aria-current="page"':""}>
          <span>${String(r+1).padStart(2,"0")}</span>
          <strong>${i.label}</strong>
          ${i.count===void 0?"":`<b>${i.count}</b>`}
        </a>
      `).join("")}function fa(t,e,a){const n=B(),s=R().filter(o=>o.role==="client"),i=K().length,r=S?`<div class="admin-notice" role="status"><span>Готово</span><p>${d(S)}</p></div>`:"";return S="",`
    <div class="admin-workspace">
      <aside class="admin-sidebar-nav">
        <div class="admin-sidebar-nav__head">
          <span class="technical-label">ToffiPacks / Control</span>
          <h2>Управління</h2>
          <p>Замовлення, клієнти й каталог в одному кабінеті.</p>
        </div>
        <nav class="admin-nav" aria-label="Розділи адмінки">
          ${ma(e,n.length,s.length,i)}
        </nav>
        <div class="admin-sidebar-nav__footer">
          <span>Ви увійшли як</span>
          <strong>${d(t.name)}</strong>
          <small>${d(t.phone)}</small>
          <button class="text-link" id="admin-logout" type="button">Вийти</button>
        </div>
      </aside>
      <main class="admin-main">
        ${r}
        ${a}
      </main>
    </div>
  `}function De(t){const e=`${t.id} ${t.customerName} ${t.phone} ${t.company}`.toLocaleLowerCase("uk-UA");return`
    <article class="order-card" data-admin-order data-status="${d(t.status)}" data-date="${t.createdAt.slice(0,10)}" data-search="${d(e)}">
      <div class="order-card__top">
        <div><span>${d(t.id)}</span><strong>${d(t.customerName)}</strong></div>
        ${ua(t)}
      </div>
      <div class="order-card__grid">
        <div><span>Контакт</span><a href="tel:${d(t.phone)}">${d(t.phone)}</a><small>Телефон клієнта</small></div>
        <div><span>Позицій</span><strong>${t.items.length}</strong><small>${t.items.reduce((a,n)=>a+n.quantity,0).toLocaleString("uk-UA")} шт. загалом</small></div>
        <div><span>Сума</span><strong>${$(t.total)}</strong><small>кінцева вартість</small></div>
      </div>
      <div class="order-card__items">
        ${t.items.map(a=>`
              <div>
                <span>№${d(a.productNumber)}</span>
                <strong>${I(a.dimensions)}</strong>
                <small>${a.quantity.toLocaleString("uk-UA")} шт. · ${$(a.unitPrice)} / шт.</small>
                <b>${$(a.total)}</b>
              </div>
            `).join("")}
      </div>
      ${t.company||t.comment?`<p class="order-card__comment">${d(t.company)}${t.company&&t.comment?" · ":""}${d(t.comment)}</p>`:""}
      <div class="order-status-history" aria-label="Історія статусів">
        <span>Історія</span>
        <div>
          ${(t.statusHistory??[{status:t.status,at:t.createdAt}]).slice().reverse().slice(0,5).map(a=>`<p><strong>${d(a.status)}</strong><time datetime="${d(a.at)}">${new Date(a.at).toLocaleString("uk-UA")}</time></p>`).join("")}
        </div>
      </div>
      <label class="order-card__manager-note">
        <span>Нотатка менеджера</span>
        <textarea data-order-note="${d(t.id)}" rows="2" placeholder="Домовленості після дзвінка, дата або деталі">${d(t.managerNote??"")}</textarea>
      </label>
      <div class="order-card__footer">
        <time datetime="${t.createdAt}">${new Date(t.createdAt).toLocaleString("uk-UA")}</time>
        <button type="button" data-delete-order="${d(t.id)}">
          <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M3 5h12M7 2h4l1 3H6l1-3Zm-2 3 1 11h6l1-11M8 8v5m3-5v5" /></svg>
          Видалити заявку
        </button>
      </div>
    </article>
  `}function ga(t,e){const a=t.filter(r=>r.status!=="Закрита").length,n=t.reduce((r,o)=>r+o.total,0),s=M().length,i=t.slice(0,3);return`
    <div class="admin-page-heading admin-page-heading--overview">
      <div><p class="eyebrow"><span></span> Панель керування</p><h1 id="admin-title">Все важливе<br />на одному екрані.</h1></div>
      <p>Швидкий стан каталогу, заявок і клієнтів. Детальна робота винесена в окремі розділи.</p>
    </div>
    <div class="admin-stats admin-stats--large">
      <article><span>Усі заявки</span><strong>${t.length}</strong><small>${a} потребують уваги</small></article>
      <article><span>Оборот заявок</span><strong>${$(n)}</strong><small>сума збережених розрахунків</small></article>
      <article><span>Клієнти</span><strong>${e.length}</strong><small>${e.filter(r=>r.partner).length} постійних</small></article>
      <article><span>Товари на сайті</span><strong>${s}</strong><small>${K().length-s} приховано</small></article>
    </div>
    <section class="admin-quick-grid" aria-label="Швидкі дії">
      <a href="#admin-orders"><span>01</span><h2>Замовлення</h2><p>Змінюйте статус, телефонуйте клієнту й дивіться склад заявки.</p><b>Відкрити →</b></a>
      <a href="#admin-products"><span>02</span><h2>Каталог</h2><p>Додавайте коробки, редагуйте розміри, ціни та видимість.</p><b>Керувати →</b></a>
      <a href="#admin-clients"><span>03</span><h2>Клієнти</h2><p>Активуйте постійного клієнта та його персональні умови.</p><b>Переглянути →</b></a>
    </section>
    <section class="admin-backup-panel">
      <div><span class="technical-label">Локальна копія</span><h2>Резерв даних кабінету</h2><p>Збережіть товари, заявки, клієнтів і локальні налаштування одним JSON-файлом.</p></div>
      <div class="admin-backup-panel__actions">
        <button class="button button--ghost button--small" type="button" data-export-backup>Завантажити копію</button>
        <label class="button button--ghost button--small admin-file-button">Відновити з копії<input type="file" accept=".json,application/json" data-import-backup /></label>
      </div>
    </section>
    <section class="admin-section">
      <div class="admin-section__head"><h2>Останні заявки</h2><a class="text-link" href="#admin-orders">Усі замовлення →</a></div>
      <div class="orders-list">
        ${i.length?i.map(De).join(""):'<div class="admin-empty"><h3>Заявок ще немає.</h3><p>Нові замовлення з сайту з’являться тут.</p></div>'}
      </div>
    </section>
  `}function ha(t){const e=["Усі","Нова","У роботі","Уточнення","Підтверджена","Закрита"];return`
    <div class="admin-page-heading">
      <div><p class="eyebrow"><span></span> Замовлення</p><h1 id="admin-title">Заявки без хаосу.</h1></div>
      <p>Пошук за клієнтом або номером, швидка зміна статусу та повний склад кожного замовлення.</p>
    </div>
    <div class="admin-toolbar">
      <label class="admin-search"><span class="sr-only">Пошук заявок</span><input id="admin-order-search" type="search" value="${d(ie)}" placeholder="Номер, ім’я або телефон" /></label>
      ${Ee()}
      <div class="admin-filter-chips" aria-label="Фільтр за статусом">
        ${e.map(a=>`<button class="${jt===a?"is-active":""}" type="button" data-admin-order-filter="${a}">${a}</button>`).join("")}
      </div>
    </div>
    <div class="admin-results-meta"><strong id="admin-order-count">${t.length}</strong><span>заявок показано</span></div>
    <div class="orders-list" id="admin-orders-list">
      ${t.length?t.map(De).join(""):'<div class="admin-empty"><h3>Заявок ще немає.</h3><p>Нові замовлення з сайту з’являться тут.</p></div>'}
    </div>
  `}function ba(t){return`
    <div class="admin-page-heading">
      <div><p class="eyebrow"><span></span> Клієнти</p><h1 id="admin-title">Контакти й особливі умови.</h1></div>
      <p>Знайдіть клієнта за телефоном, активуйте статус постійного та налаштуйте персональну ціну.</p>
    </div>
    <div class="admin-toolbar admin-toolbar--clients">
      <label class="admin-search"><span class="sr-only">Пошук клієнтів</span><input id="admin-client-search" type="search" placeholder="Ім’я, компанія або телефон" /></label>
    </div>
    <div class="clients-table clients-table--expanded">
      <div class="clients-table__head"><span>Клієнт</span><span>Статус</span><span>Умови</span></div>
      ${t.length?t.map(e=>`
                <div class="client-row" data-admin-client data-search="${d(`${e.name} ${e.company} ${e.phone}`.toLocaleLowerCase("uk-UA"))}">
                  <div><strong>${d(e.name)}</strong><span>${d(e.company||"Без компанії")}</span><a href="tel:${d(e.phone)}">${d(e.phone)}</a></div>
                  <label class="partner-toggle"><input type="checkbox" data-partner-toggle="${e.id}"${e.partner?" checked":""} /><span>${e.partner?"Постійний":"Звичайний"}</span></label>
                  <label class="client-price-field"><span>Персональна ставка</span><input class="input" type="number" min="0" max="0.99" step="0.01" value="${e.fixedMarkup}" data-partner-markup="${e.id}"${e.partner?"":" disabled"} /><small>грн / шт.</small></label>
                </div>
              `).join(""):'<div class="admin-empty"><h3>Клієнтів ще немає.</h3></div>'}
    </div>
  `}function re(){const t=se.trim().toLocaleLowerCase("uk-UA");return K().filter(e=>{const a=!t||`${e.number} ${e.name} ${I(e.dimensions)}`.toLocaleLowerCase("uk-UA").includes(t),n=ot==="all"||(ot==="active"?e.active:!e.active);return a&&n})}function Oe(){const t=re();return t.length?t.map(e=>`
        <article class="admin-product-card${e.active?"":" is-hidden"}" data-admin-product="${e.id}">
          <div class="admin-product-card__visual">${bt(e,!1)}</div>
          <div class="admin-product-card__content">
            <div class="admin-product-card__top"><span>№${d(e.number)}</span><b>${e.active?"На сайті":"Приховано"}</b></div>
            <h3>${I(e.dimensions)}</h3>
            <p>${d(e.name)}</p>
            <dl>
              <div><dt>1–999 шт.</dt><dd>${$(D(e,1))}</dd></div>
              <div><dt>від 1000 шт.</dt><dd>${$(D(e,Q))}</dd></div>
            </dl>
            <div class="admin-product-card__actions">
              <button class="button button--primary button--small" type="button" data-edit-product="${e.id}">Редагувати</button>
              <button class="button button--ghost button--small" type="button" data-toggle-product="${e.id}">${e.active?"Приховати":"Показати"}</button>
              <button class="admin-danger-link" type="button" data-delete-product="${e.id}">Видалити</button>
            </div>
          </div>
        </article>
      `).join(""):'<div class="admin-empty"><h3>Нічого не знайдено.</h3><p>Змініть пошук або фільтр видимості.</p></div>'}function va(){return`
    <div class="admin-page-heading admin-page-heading--products">
      <div><p class="eyebrow"><span></span> Товари</p><h1 id="admin-title">Каталог під контролем.</h1></div>
      <div class="admin-page-heading__action"><p>Окрема сторінка для розмірів, цін і видимості коробок.</p><button class="button button--primary" type="button" data-create-product>Додати коробку</button></div>
    </div>
    <div class="admin-toolbar admin-toolbar--products">
      <label class="admin-search"><span class="sr-only">Пошук товарів</span><input id="admin-product-search" type="search" value="${d(se)}" placeholder="Номер або розмір" /></label>
      <div class="admin-filter-chips" aria-label="Фільтр товарів">
        <button class="${ot==="all"?"is-active":""}" type="button" data-product-filter="all">Усі</button>
        <button class="${ot==="active"?"is-active":""}" type="button" data-product-filter="active">На сайті</button>
        <button class="${ot==="hidden"?"is-active":""}" type="button" data-product-filter="hidden">Приховані</button>
      </div>
      <button class="button button--ghost button--small" type="button" data-export-products>Експорт CSV</button>
      <label class="button button--ghost button--small admin-file-button">Імпорт CSV<input type="file" accept=".csv,text/csv" data-import-products /></label>
      <button class="admin-danger-link" type="button" data-reset-products>Відновити початкові</button>
    </div>
    <div class="admin-results-meta"><strong id="admin-product-count">${re().length}</strong><span>товарів показано</span></div>
    <div class="admin-products-grid" id="admin-product-list">${Oe()}</div>
  `}function y(){const t=document.querySelector("#admin-content");if(!t)return;const e=Z();if(!e||e.role!=="admin"){t.innerHTML=`
      <div class="admin-login">
        <p class="eyebrow"><span></span> Для менеджера</p>
        <h1 id="admin-title">Вхід до керування.</h1>
        <p>Замовлення, клієнти та каталог доступні тільки менеджеру.</p>
        <form id="admin-login-form" class="auth-form" novalidate>
          <label class="field"><span>Телефон</span><input class="input" name="phone" type="tel" autocomplete="tel" required /></label>
          <label class="field"><span>Пароль</span><input class="input" name="password" type="password" autocomplete="current-password" required /></label>
          <div class="form-status" data-auth-status aria-live="polite"></div>
          <button class="button button--primary button--wide" type="submit">Увійти</button>
        </form>
      </div>
    `;return}const a=B().slice().reverse(),n=R().filter(r=>r.role==="client"),s=pa();let i=ga(a,n);s==="orders"&&(i=ha(a)),s==="clients"&&(i=ba(n)),s==="products"&&(i=va()),t.innerHTML=fa(e,s,i),s==="orders"&&At()}function At(){const t=ie.trim().toLocaleLowerCase("uk-UA");let e=0;document.querySelectorAll("[data-admin-order]").forEach(n=>{const s=!t||(n.dataset.search??"").includes(t),i=jt==="Усі"||n.dataset.status===jt,r=n.dataset.date??"",o=!x||!L&&r===x||!!(L&&r>=x&&r<=L);n.hidden=!(s&&i&&o),n.hidden||(e+=1)});const a=document.querySelector("#admin-order-count");a&&(a.textContent=String(e))}function Ut(t){document.querySelectorAll("[data-order-status-control]").forEach(e=>{e!==t&&(e.classList.remove("is-open"),e.querySelector(".order-status-control__menu")?.setAttribute("hidden",""),e.querySelector("[data-order-status-trigger]")?.setAttribute("aria-expanded","false"))})}function Ne(){const t=document.querySelector("[data-admin-calendar]");t&&(t.classList.remove("is-open"),t.querySelector(".admin-calendar__popover")?.setAttribute("hidden",""),t.querySelector("[data-calendar-trigger]")?.setAttribute("aria-expanded","false"))}function Nt(t,e){const a=document.querySelector("[data-admin-calendar]");a&&(a.outerHTML=Ee(t),e&&window.requestAnimationFrame(()=>document.querySelector(`[data-admin-calendar] ${e}`)?.focus()))}async function ya(t,e){const a=B(),n=a.find(i=>i.id===t);if(!n||n.status===e)return;if(A){try{const i=await q.updateOrder(t,{status:e});v(p.orders,a.map(r=>r.id===t?i:r))}catch(i){S=O(i,"Не вдалося змінити статус заявки.")}y();return}const s=n.status;n.status=e,n.statusHistory=[...n.statusHistory??[{status:s,at:n.createdAt}],{status:e,at:new Date().toISOString()}],v(p.orders,a),y()}function $a(t){const e=t.trim().toLocaleLowerCase("uk-UA");document.querySelectorAll("[data-admin-client]").forEach(a=>{a.hidden=!!e&&!(a.dataset.search??"").includes(e)})}function wa(){const t=document.querySelector("#admin-product-list");t&&(t.innerHTML=Oe());const e=document.querySelector("#admin-product-count");e&&(e.textContent=String(re().length))}function j(){const t=M();if(!t.length)return;t.some(n=>n.id===at)||(at=t[0].id),Pe(!0);const e=document.querySelector("#hero-product-count");e&&(e.textContent=String(t.length));const a=document.querySelector("#catalog-ready-label");a&&(a.innerHTML=`<span></span> ${t.length} готових розмірів`),N(!1),J(),G()}function Sa(t){const e=!!t,a=t??{id:"",number:"",name:"",dimensions:{length:180,width:120,height:50},basePrice:5,active:!0};return`
    <div class="admin-product-editor">
      <p class="eyebrow"><span></span> ${e?"Редагування товару":"Новий товар"}</p>
      <h2 id="admin-product-dialog-title">${e?`Коробка №${d(a.number)}`:"Додати коробку"}</h2>
      <p>Після збереження товар одразу оновиться в каталозі та калькуляторі.</p>
      <form id="admin-product-form" novalidate>
        <input type="hidden" name="productId" value="${d(a.id)}" />
        <div class="admin-editor-grid admin-editor-grid--identity">
          <label class="field"><span>Номер *</span><input class="input" name="number" value="${d(a.number)}" maxlength="20" required /></label>
          <label class="field"><span>Назва</span><input class="input" name="name" value="${d(a.name)}" placeholder="Самозбірна коробка" /></label>
        </div>
        <fieldset class="admin-editor-fieldset">
          <legend>Внутрішній розмір, мм</legend>
          <div class="admin-editor-grid admin-editor-grid--dimensions">
            <label class="field"><span>Довжина *</span><input class="input" name="length" type="number" min="1" max="2000" value="${a.dimensions.length}" required /></label>
            <label class="field"><span>Ширина *</span><input class="input" name="width" type="number" min="1" max="2000" value="${a.dimensions.width}" required /></label>
            <label class="field"><span>Висота *</span><input class="input" name="height" type="number" min="1" max="2000" value="${a.dimensions.height}" required /></label>
          </div>
        </fieldset>
        <div class="admin-editor-grid admin-editor-grid--price">
          <label class="field"><span>Базова ціна, грн *</span><input class="input" name="basePrice" type="number" min="0.01" max="10000" step="0.01" value="${a.basePrice}" required /></label>
          <div class="admin-editor-price-preview"><span>На сайті зараз</span><strong>${$(D(a,1))}</strong><small>опт: ${$(D(a,Q))}</small></div>
        </div>
        <label class="checkbox admin-editor-active"><input name="active" type="checkbox"${a.active?" checked":""} /><span>Показувати товар у каталозі</span></label>
        <div class="form-status" data-product-form-status aria-live="polite"></div>
        <div class="admin-editor-actions">
          <button class="button button--ghost" type="button" data-close-admin-product>Скасувати</button>
          <button class="button button--primary" type="submit">${e?"Зберегти зміни":"Створити товар"}</button>
        </div>
      </form>
    </div>
  `}function he(t){const e=document.querySelector("#admin-product-dialog"),a=document.querySelector("#admin-product-editor");if(!e||!a)return;const n=t?K().find(s=>s.id===t):void 0;a.innerHTML=Sa(n),typeof e.showModal=="function"?e.showModal():e.setAttribute("open",""),a.querySelector('input[name="number"]')?.focus()}async function _a(t){t.classList.add("was-validated");const e=t.querySelector("[data-product-form-status]");if(!t.reportValidity()){e&&(e.className="form-status is-error",e.textContent="Перевірте обов’язкові поля.");return}const a=new FormData(t),n=String(a.get("productId")??""),s=String(a.get("number")??"").trim(),i=K(),r=i.find(g=>g.id===n);if(!ye.test(s)){e&&(e.className="form-status is-error",e.textContent="У номері можна використовувати літери, цифри, крапку, дефіс і підкреслення.");return}if(i.some(g=>g.number.toLocaleLowerCase("uk-UA")===s.toLocaleLowerCase("uk-UA")&&g.id!==n)){e&&(e.className="form-status is-error",e.textContent="Товар із таким номером уже існує.");return}const o=a.get("active")==="on";if(r?.active&&!o&&M().length<=1){e&&(e.className="form-status is-error",e.textContent="У каталозі має залишитися хоча б один активний товар.");return}const l=r?.id??`box-${s.toLocaleLowerCase("uk-UA").replace(/[^a-zа-яіїєґ0-9]+/giu,"-")}-${Date.now().toString(36)}`,c={...r,id:l,number:s,name:String(a.get("name")??"").trim()||`Самозбірна коробка №${s}`,dimensions:{length:Number(a.get("length")),width:Number(a.get("width")),height:Number(a.get("height"))},basePrice:Number(a.get("basePrice")),active:o,updatedAt:new Date().toISOString()};if(A){try{const g=r?await q.updateProduct(r.id,c):await q.createProduct({number:c.number,name:c.name,dimensions:c.dimensions,basePrice:c.basePrice,sourceQuantity:c.sourceQuantity,active:c.active}),m=r?i.map(b=>b.id===r.id?g:b):[...i,g];H(m),j(),document.querySelector("#admin-product-dialog")?.close(),S=r?`Товар №${s} оновлено.`:`Товар №${s} додано до каталогу.`,y()}catch(g){e&&(e.className="form-status is-error",e.textContent=O(g,"Не вдалося зберегти товар на сервері."))}return}const f=r?i.map(g=>g.id===r.id?c:g):[...i,c];H(f),j(),document.querySelector("#admin-product-dialog")?.close(),S=r?`Товар №${s} оновлено.`:`Товар №${s} додано до каталогу.`,y()}function be(t,e){const a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=URL.createObjectURL(a),s=document.createElement("a");s.href=n,s.download=t,s.click(),window.setTimeout(()=>URL.revokeObjectURL(n),0)}function qa(t,e,a){const n=new Blob([e],{type:a}),s=URL.createObjectURL(n),i=document.createElement("a");i.href=s,i.download=t,i.click(),window.setTimeout(()=>URL.revokeObjectURL(s),0)}function ka(t){const e=String(t);return/[;"\n\r]/.test(e)?`"${e.replaceAll('"','""')}"`:e}function xa(){const t=["number","name","length","width","height","basePrice","active"],e=K().map(a=>[a.number,a.name,a.dimensions.length,a.dimensions.width,a.dimensions.height,a.basePrice,a.active].map(ka).join(";"));return`\uFEFF${[t.join(";"),...e].join(`\r
`)}`}function Aa(){return{version:1,createdAt:new Date().toISOString(),accounts:R(),orders:B(),products:K(),cart:z(),measurements:et(),fit:k?{dimensions:k,margin:T}:null}}function La(t){if(!t||typeof t!="object")return!1;const e=t;if(e.version!==1||!Array.isArray(e.accounts)||!Array.isArray(e.orders)||!Array.isArray(e.products))return!1;const a=e.accounts.every(i=>i&&typeof i.id=="string"&&typeof i.phone=="string"&&(i.role==="admin"||i.role==="client")),n=e.products.every(i=>i&&typeof i.id=="string"&&typeof i.number=="string"&&Number.isFinite(i.basePrice)&&[i.dimensions?.length,i.dimensions?.width,i.dimensions?.height].every(r=>Number.isFinite(r)&&Number(r)>0)),s=e.orders.every(i=>i&&typeof i.id=="string"&&typeof i.phone=="string"&&Array.isArray(i.items)&&Number.isFinite(i.total));return a&&n&&s&&e.accounts.some(i=>i.role==="admin")}async function Pa(t){const e=t.files?.[0];if(e){if(A){S="Серверну копію можна завантажити, а відновлення виконується тільки на сервері адміністратором інфраструктури.",t.value="",y();return}try{const a=JSON.parse(await e.text());if(!La(a))throw new Error("Файл не є коректною резервною копією ToffiPacks.");if(!window.confirm("Відновити локальні дані з цієї копії? Поточні заявки, клієнти й товари буде замінено."))return;v(p.accounts,a.accounts),v(p.orders,a.orders),v(p.products,a.products),v(p.cart,Array.isArray(a.cart)?a.cart:[]),v(p.measurements,Array.isArray(a.measurements)?a.measurements:[]),a.fit?v(p.fit,a.fit):localStorage.removeItem(p.fit),k=a.fit?.dimensions??null,T=a.fit?.margin===5||a.fit?.margin===10?a.fit.margin:0,R().some(n=>n.id===localStorage.getItem(p.session))||localStorage.removeItem(p.session),j(),W(),V(),S=`Резервну копію від ${new Date(a.createdAt).toLocaleString("uk-UA")} відновлено.`,y()}catch(a){S=a instanceof Error?a.message:"Не вдалося відновити резервну копію.",y()}finally{t.value=""}}}function Ta(t){const e=[];let a=[],n="",s=!1;for(let i=0;i<t.length;i+=1){const r=t[i];r==='"'?s&&t[i+1]==='"'?(n+='"',i+=1):s=!s:r===";"&&!s?(a.push(n.trim()),n=""):(r===`
`||r==="\r")&&!s?(r==="\r"&&t[i+1]===`
`&&(i+=1),a.push(n.trim()),a.some(Boolean)&&e.push(a),a=[],n=""):n+=r}return a.push(n.trim()),a.some(Boolean)&&e.push(a),e}function Ma(t){const e=Ta(t.replace(/^\uFEFF/,"")),a=e.shift()?.map(c=>c.trim())??[],n=["number","name","length","width","height","basePrice","active"];if(!n.every(c=>a.includes(c)))throw new Error(`Потрібні колонки: ${n.join(", ")}`);const s=Object.fromEntries(a.map((c,f)=>[c,f])),i=K(),r=new Map(i.map(c=>[c.number.toLocaleLowerCase("uk-UA"),c])),o=e.map(c=>{const f=U=>c[s[U]]?.trim()??"",g=f("number"),m=U=>Number(f(U).replace(",",".")),b={length:m("length"),width:m("width"),height:m("height")},P=m("basePrice");if(!ye.test(g)||!Object.values(b).every(U=>Number.isFinite(U)&&U>0)||!Number.isFinite(P)||P<=0)throw new Error(`Некоректні дані для коробки ${g||"без номера"}.`);const E=r.get(g.toLocaleLowerCase("uk-UA")),F=f("active").toLocaleLowerCase("uk-UA");return{...E,id:E?.id??`box-${g.toLocaleLowerCase("uk-UA").replace(/[^a-zа-яіїєґ0-9]+/giu,"-")}-${Date.now().toString(36)}`,number:g,name:f("name")||E?.name||`Самозбірна коробка №${g}`,dimensions:b,basePrice:P,active:!["false","0","ні","no"].includes(F),updatedAt:new Date().toISOString()}}),l=new Set(o.map(c=>c.number.toLocaleLowerCase("uk-UA")));return[...i.filter(c=>!l.has(c.number.toLocaleLowerCase("uk-UA"))),...o]}async function Ca(t){const e=t.files?.[0];if(e)try{const a=Ma(await e.text());if(!window.confirm(`Імпортувати ${a.length} товарів? Позиції з однаковими номерами буде оновлено.`))return;if(A){const n=await q.adminProducts();for(const s of a){const i=n.find(r=>r.id===s.id||r.number.toLocaleLowerCase("uk-UA")===s.number.toLocaleLowerCase("uk-UA"));i?await q.updateProduct(i.id,s):await q.createProduct({number:s.number,name:s.name,dimensions:s.dimensions,basePrice:s.basePrice,sourceQuantity:s.sourceQuantity,active:s.active})}H(await q.adminProducts()),j(),S="CSV імпортовано на сервер. Каталог оновлено.",y();return}H(a),j(),S="CSV імпортовано. Каталог оновлено.",y()}catch(a){S=a instanceof Error?a.message:"Не вдалося прочитати CSV.",y()}finally{t.value=""}}function Wt(){const t=document.querySelector("#admin-page"),e=document.querySelector("#account-page"),a=document.querySelector("#main"),n=document.querySelector(".site-header"),s=document.querySelector(".site-footer"),i=document.querySelector(".demo-strip"),r=["#admin","#admin-orders","#admin-clients","#admin-products"].includes(window.location.hash),o=window.location.hash==="#account";t&&(t.hidden=!r),e&&(e.hidden=!o),a&&(a.hidden=r||o),n&&(n.hidden=r||o),s&&(s.hidden=r||o),i&&(i.hidden=r||o),document.body.classList.toggle("is-admin",r),document.body.classList.toggle("is-account",o),r?(y(),A&&Lt()&&Bt().then(()=>y()).catch(l=>{S=O(l,"Не вдалося оновити дані адмінки."),y()}),window.scrollTo({top:0})):o&&(V(),A&&Lt()&&Bt().then(()=>{W(),V()}).catch(()=>{}),window.scrollTo({top:0}))}function Ia(){const t=document.querySelectorAll(".reveal");if(!("IntersectionObserver"in window)){t.forEach(a=>a.classList.add("is-visible"));return}const e=new IntersectionObserver(a=>{a.forEach(n=>{n.isIntersecting&&(n.target.classList.add("is-visible"),e.unobserve(n.target))})},{threshold:.12});t.forEach(a=>e.observe(a))}document.querySelector("#menu-button")?.addEventListener("click",t=>{const e=t.currentTarget,a=document.querySelector("#site-nav"),n=e.getAttribute("aria-expanded")!=="true";e.setAttribute("aria-expanded",String(n)),a?.classList.toggle("is-open",n)});document.querySelectorAll(".site-nav a").forEach(t=>{t.addEventListener("click",()=>{document.querySelector("#site-nav")?.classList.remove("is-open"),document.querySelector("#menu-button")?.setAttribute("aria-expanded","false")})});document.querySelector('.site-header .brand[href="#top"]')?.addEventListener("click",t=>{t.preventDefault(),window.location.hash!=="#top"&&(window.history.pushState(null,"","#top"),Wt()),window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})});document.querySelector("#fit-form")?.addEventListener("submit",t=>{t.preventDefault();const e=t.currentTarget;e.classList.add("was-validated");const a=document.querySelector("#fit-message");if(!e.reportValidity()){a&&(a.textContent="Вкажіть три додатні розміри.",a.className="form-message is-error");return}const n=new FormData(e);k={length:Number(n.get("length")),width:Number(n.get("width")),height:Number(n.get("height"))};const s=Number(n.get("fitMargin"));T=s===5||s===10?s:0,xe(k,T),X=!1,a&&(a.textContent=`Розміри застосовано · ${nt(T)}.`,a.className="form-message is-success"),vt(),window.setTimeout(()=>document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth"}),180)});document.querySelector("#catalog-search")?.addEventListener("input",t=>{It=t.currentTarget.value,X=!1,vt()});const tt=document.querySelector("#catalog-sort"),lt=tt?.querySelector(".catalog-sort__trigger"),ft=tt?.querySelector(".catalog-sort__menu"),Y=Array.from(tt?.querySelectorAll("[data-sort-value]")??[]);function Zt(t=!1){!lt||!ft||(lt.setAttribute("aria-expanded","false"),ft.hidden=!0,tt?.classList.remove("is-open"),t&&lt.focus())}function Ue(){!lt||!ft||(lt.setAttribute("aria-expanded","true"),ft.hidden=!1,tt?.classList.add("is-open"))}function Ea(t){const e=Y.find(n=>n.dataset.sortValue===t),a=document.querySelector("#catalog-sort-value");!e||!tt||!a||(ee=t,tt.dataset.value=t,a.textContent=e.querySelector("span")?.textContent??e.textContent,Y.forEach(n=>{n.setAttribute("aria-selected",String(n===e))}),Zt(!0),vt())}lt?.addEventListener("click",()=>{ft?.hidden?Ue():Zt()});Y.forEach(t=>{t.addEventListener("click",()=>{Ea(t.dataset.sortValue)})});tt?.addEventListener("keydown",t=>{const e=Y.indexOf(document.activeElement),a=Y.findIndex(s=>s.getAttribute("aria-selected")==="true");if(t.key==="Escape"){t.preventDefault(),Zt(!0);return}if(t.key!=="ArrowDown"&&t.key!=="ArrowUp"&&t.key!=="Home"&&t.key!=="End")return;t.preventDefault(),ft?.hidden&&Ue();let n=e>=0?e:a;t.key==="Home"&&(n=0),t.key==="End"&&(n=Y.length-1),t.key==="ArrowDown"&&(n=(n+1)%Y.length),t.key==="ArrowUp"&&(n=(n-1+Y.length)%Y.length),Y[n]?.focus()});document.addEventListener("click",t=>{tt?.contains(t.target)||Zt()});document.querySelector("#reset-catalog")?.addEventListener("click",()=>{k=null,T=0,It="",X=!1;const t=document.querySelector("#catalog-search");t&&(t.value="");const e=document.querySelector("#fit-message");e&&(e.textContent=""),localStorage.removeItem(p.fit),vt()});document.querySelector("#catalog-more-button")?.addEventListener("click",()=>{X=!X,N(!1),X||document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth",block:"start"})});window.addEventListener("resize",()=>N(!1));document.querySelector("#quantity-input")?.addEventListener("input",t=>{dt(Number(t.currentTarget.value))});document.querySelector("#hero-quantity-input")?.addEventListener("input",t=>{dt(Number(t.currentTarget.value))});document.querySelector("#request-form")?.addEventListener("submit",t=>{t.preventDefault(),da(t.currentTarget)});document.addEventListener("click",t=>{const e=t.target,a=e.closest("[data-product-picker-value]");if(a?.dataset.productPickerValue){const u=a.closest("[data-product-picker]");u&&ct(u,!0),Ce(a.dataset.productPickerValue);return}const n=e.closest("[data-product-picker-trigger]");if(n){const u=n.closest("[data-product-picker]");u&&ta(u);return}e.closest("[data-product-picker]")||Te(),e.closest("[data-order-status-control]")||Ut(),e.closest("[data-admin-calendar]")||Ne();const s=e.closest("[data-order-status-trigger]");if(s){const u=s.closest("[data-order-status-control]"),h=u?.querySelector(".order-status-control__menu");if(!u||!h)return;const _=h.hidden;Ut(u),h.hidden=!_,u.classList.toggle("is-open",_),s.setAttribute("aria-expanded",String(_));return}const i=e.closest("[data-order-status-option]");if(i?.dataset.orderId&&i.dataset.orderStatusOption){ya(i.dataset.orderId,i.dataset.orderStatusOption);return}const r=e.closest("[data-calendar-trigger]");if(r){const u=r.closest("[data-admin-calendar]"),h=u?.querySelector(".admin-calendar__popover");if(!u||!h)return;const _=h.hidden;Ut(),h.hidden=!_,u.classList.toggle("is-open",_),r.setAttribute("aria-expanded",String(_));return}const o=e.closest("[data-calendar-month]");if(o?.dataset.calendarMonth){const u=xt(_t||kt(new Date));u.setMonth(u.getMonth()+Number(o.dataset.calendarMonth),1),_t=kt(u),Nt(!0,`[data-calendar-month="${o.dataset.calendarMonth}"]`);return}const l=e.closest("[data-calendar-date]");if(l?.dataset.calendarDate){const u=l.dataset.calendarDate;_t=u,!x||L?(x=u,L="",Nt(!0,`[data-calendar-date="${u}"]`)):(L=u,L<x&&([x,L]=[L,x]),Nt(!1)),At();return}if(e.closest("[data-calendar-clear]")){x="",L="",Nt(!1),At();return}const c=e.closest("[data-saved-measurement]");if(c?.dataset.savedMeasurement){const u=et().find(h=>h.id===c.dataset.savedMeasurement);u&&Ke(u);return}if(e.closest("[data-clear-measurements]")){localStorage.removeItem(p.measurements),ke(),V();return}if(e.closest("[data-use-tight-fit]")&&k){T=0,xe(k,T);const u=document.querySelector('#fit-form input[name="fitMargin"][value="0"]');u&&(u.checked=!0),vt();return}const f=e.closest("[data-open-product]");if(f?.dataset.openProduct){pe(f.dataset.openProduct);return}const g=e.closest("[data-quantity]");if(g?.dataset.quantity){dt(Number(g.dataset.quantity));return}const m=e.closest("[data-quantity-step]");if(m?.dataset.quantityStep){dt(w+Number(m.dataset.quantityStep));return}if(e.closest("[data-product-to-cart]")){me(pt??at,w),qt();return}if(e.closest("[data-add-selected-to-cart]")){me(at,w);return}const b=e.closest("[data-cart-step]");if(b?.dataset.cartProduct&&b.dataset.cartStep){const u=z().find(h=>h.productId===b.dataset.cartProduct);u&&Ie(u.productId,u.quantity+Number(b.dataset.cartStep));return}const P=e.closest("[data-edit-cart]");if(P?.dataset.editCart){const u=z().find(h=>h.productId===P.dataset.editCart);u&&(dt(u.quantity),pe(u.productId));return}if(e.closest("[data-clear-cart]")){window.confirm("Очистити всі позиції кошика?")&&(v(p.cart,[]),G());return}const E=e.closest("[data-repeat-order]");if(E?.dataset.repeatOrder){aa(E.dataset.repeatOrder);return}const F=e.closest("[data-remove-cart]");if(F?.dataset.removeCart){ea(F.dataset.removeCart);return}if(e.closest("[data-product-to-calculator]")){qt(()=>{window.location.hash="calculator",document.querySelector("#calculator")?.scrollIntoView({behavior:"smooth",block:"start"})});return}if(e.closest("[data-close-dialog]")){qt();return}if(e.closest("[data-edit-profile]")){ia();return}if(e.closest("[data-close-profile]")){document.querySelector("#profile-dialog")?.close();return}const it=e.closest("[data-auth-tab]");if(it?.dataset.authTab){const u=it.closest(".auth-forms");u?.querySelectorAll("[data-auth-tab]").forEach(h=>{const _=h.dataset.authTab===it.dataset.authTab;h.classList.toggle("is-active",_),h.setAttribute("aria-selected",String(_))}),u?.querySelectorAll("[data-auth-panel]").forEach(h=>{h.hidden=h.dataset.authPanel!==it.dataset.authTab});return}if(e.closest("#logout-button")){A&&q.logout().catch(()=>ut()),localStorage.removeItem(p.session),W(),J(),N(!1),V();return}if(e.closest("[data-create-product]")){he();return}const yt=e.closest("[data-edit-product]");if(yt?.dataset.editProduct){he(yt.dataset.editProduct);return}if(e.closest("[data-close-admin-product]")){document.querySelector("#admin-product-dialog")?.close();return}const $t=e.closest("[data-toggle-product]");if($t?.dataset.toggleProduct){const u=K(),h=u.find(_=>_.id===$t.dataset.toggleProduct);if(h){if(A){q.updateProduct(h.id,{active:!h.active}).then(_=>{H(u.map(oe=>oe.id===h.id?_:oe)),j(),S=_.active?`Товар №${_.number} повернуто на сайт.`:`Товар №${_.number} приховано.`,y()}).catch(_=>{S=O(_,"Не вдалося змінити видимість товару."),y()});return}h.active&&M().length<=1?S="У каталозі має залишитися хоча б один активний товар.":(h.active=!h.active,h.updatedAt=new Date().toISOString(),H(u),j(),S=h.active?`Товар №${h.number} повернуто на сайт.`:`Товар №${h.number} приховано.`),y()}return}const wt=e.closest("[data-delete-product]");if(wt?.dataset.deleteProduct){const u=K(),h=u.find(_=>_.id===wt.dataset.deleteProduct);if(!h)return;if(h.active&&M().length<=1){S="Не можна видалити останній активний товар.",y();return}if(window.confirm(`Видалити коробку №${h.number}? Цю дію не можна скасувати.`)){if(A){q.deleteProduct(h.id).then(()=>{H(u.filter(_=>_.id!==h.id)),v(p.cart,z().filter(_=>_.productId!==h.id)),j(),S=`Товар №${h.number} видалено.`,y()}).catch(_=>{S=O(_,"Не вдалося видалити товар."),y()});return}H(u.filter(_=>_.id!==h.id)),v(p.cart,z().filter(_=>_.productId!==h.id)),j(),S=`Товар №${h.number} видалено.`,y()}return}const Et=e.closest("[data-delete-order]");if(Et?.dataset.deleteOrder){const u=B().find(h=>h.id===Et.dataset.deleteOrder);if(!u)return;if(window.confirm(`Видалити заявку ${u.id} від ${u.customerName}? Цю дію не можна скасувати.`)){if(A){q.deleteOrder(u.id).then(()=>{v(p.orders,B().filter(h=>h.id!==u.id)),S=`Заявку ${u.id} видалено.`,y()}).catch(h=>{S=O(h,"Не вдалося видалити заявку."),y()});return}v(p.orders,B().filter(h=>h.id!==u.id)),S=`Заявку ${u.id} видалено.`,y()}return}const Yt=e.closest("[data-product-filter]");if(Yt?.dataset.productFilter){ot=Yt.dataset.productFilter,y();return}const Dt=e.closest("[data-admin-order-filter]");if(Dt?.dataset.adminOrderFilter){jt=Dt.dataset.adminOrderFilter,document.querySelectorAll("[data-admin-order-filter]").forEach(u=>{u.classList.toggle("is-active",u===Dt)}),At();return}if(e.closest("[data-export-backup]")){if(A){q.backup().then(u=>{be(`toffipacks-server-backup-${new Date().toISOString().slice(0,10)}.json`,u)}).catch(u=>{S=O(u,"Не вдалося завантажити серверну копію."),y()});return}be(`toffipacks-backup-${new Date().toISOString().slice(0,10)}.json`,Aa());return}if(e.closest("[data-export-products]")){qa(`toffipacks-products-${new Date().toISOString().slice(0,10)}.csv`,xa(),"text/csv;charset=utf-8");return}if(e.closest("[data-reset-products]")){if(window.confirm("Відновити початковий каталог? Усі ручні зміни товарів буде втрачено.")){if(A){q.resetProducts().then(u=>{H(u),j(),S="Початковий каталог відновлено.",y()}).catch(u=>{S=O(u,"Не вдалося відновити каталог."),y()});return}H(ne.map(u=>({...u,active:!0,updatedAt:new Date().toISOString()}))),j(),S="Початковий каталог відновлено.",y()}return}if(e.closest("#admin-logout")){A&&q.logout().catch(()=>ut()),localStorage.removeItem(p.session),W(),J(),N(!1),window.location.hash="admin",y();return}});document.addEventListener("keydown",t=>{const e=t.target,a=e.closest("[data-product-picker-trigger]");if(a){const c=a.closest("[data-product-picker]");if(c&&(t.key==="ArrowDown"||t.key==="ArrowUp")){t.preventDefault(),Me(c,!0);return}if(c&&t.key==="Escape"&&c.classList.contains("is-open")){t.preventDefault(),ct(c,!0);return}}const n=e.closest("[data-product-picker-value]");if(n){const c=n.closest("[data-product-picker]"),f=Array.from(c?.querySelectorAll("[data-product-picker-value]")??[]),g=f.indexOf(n);if(t.key==="Escape"){t.preventDefault(),c&&ct(c,!0);return}if(t.key==="Tab"){c&&ct(c);return}if(!["ArrowDown","ArrowUp","Home","End"].includes(t.key)||!f.length)return;t.preventDefault();let m=g;t.key==="ArrowDown"&&(m=(g+1)%f.length),t.key==="ArrowUp"&&(m=(g-1+f.length)%f.length),t.key==="Home"&&(m=0),t.key==="End"&&(m=f.length-1),f[m]?.focus(),f[m]?.scrollIntoView({block:"nearest"});return}const s=e.closest("[data-order-status-trigger]");if(s&&(t.key==="ArrowDown"||t.key==="ArrowUp")){t.preventDefault();const c=s.closest("[data-order-status-control]");c?.querySelector(".order-status-control__menu")?.hidden&&s.click();const g=Array.from(c?.querySelectorAll("[data-order-status-option]")??[]),m=Math.max(0,g.findIndex(b=>b.getAttribute("aria-selected")==="true"));g[t.key==="ArrowUp"?Math.max(0,m-1):m]?.focus();return}const i=e.closest("[data-order-status-option]");if(i){const c=i.closest("[data-order-status-control]"),f=Array.from(c?.querySelectorAll("[data-order-status-option]")??[]),g=f.indexOf(i);if(t.key==="Escape"){t.preventDefault(),Ut(),c?.querySelector("[data-order-status-trigger]")?.focus();return}if(!["ArrowDown","ArrowUp","Home","End"].includes(t.key))return;t.preventDefault();let m=g;t.key==="ArrowDown"&&(m=(g+1)%f.length),t.key==="ArrowUp"&&(m=(g-1+f.length)%f.length),t.key==="Home"&&(m=0),t.key==="End"&&(m=f.length-1),f[m]?.focus();return}const r=e.closest("[data-admin-calendar]");if(r&&t.key==="Escape"){t.preventDefault(),Ne(),r.querySelector("[data-calendar-trigger]")?.focus();return}const o=e.closest("[data-calendar-trigger]");if(o&&t.key==="ArrowDown"){t.preventDefault(),r?.querySelector(".admin-calendar__popover")?.hidden&&o.click(),(r?.querySelector("[data-calendar-date].is-selected")??r?.querySelector("[data-calendar-date].is-today")??r?.querySelector("[data-calendar-date]:not(.is-outside)"))?.focus();return}const l=e.closest("[data-calendar-date]");if(l&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(t.key)){t.preventDefault();const c=Array.from(r?.querySelectorAll("[data-calendar-date]")??[]),f=c.indexOf(l),g=t.key==="ArrowLeft"?-1:t.key==="ArrowRight"?1:t.key==="ArrowUp"?-7:7;c[f+g]?.focus()}});document.addEventListener("input",t=>{const e=t.target;if(e instanceof HTMLInputElement&&e.id==="modal-quantity-input"){dt(Number(e.value));return}if(e instanceof HTMLInputElement&&e.id==="admin-product-search"){se=e.value,wa();return}if(e instanceof HTMLInputElement&&e.id==="admin-order-search"){ie=e.value,At();return}if(e instanceof HTMLInputElement&&e.id==="admin-client-search"){$a(e.value);return}if(e instanceof HTMLInputElement&&e.name==="basePrice"&&e.closest("#admin-product-form")){const a=Number(e.value)||0,n={...ht(),basePrice:a},s=e.closest("form")?.querySelector(".admin-editor-price-preview"),i=s?.querySelector("strong"),r=s?.querySelector("small");i&&(i.textContent=$(D(n,1))),r&&(r.textContent=`опт: ${$(D(n,Q))}`)}});document.addEventListener("submit",t=>{const e=t.target;e instanceof HTMLFormElement&&(e.id==="login-form"?(t.preventDefault(),fe(e)):e.id==="register-form"?(t.preventDefault(),ca(e)):e.id==="admin-login-form"?(t.preventDefault(),fe(e,!0)):e.id==="admin-product-form"?(t.preventDefault(),_a(e)):e.id==="profile-form"&&(t.preventDefault(),ra(e)))});document.addEventListener("change",t=>{const e=t.target;if(e instanceof HTMLInputElement&&e.matches("[data-import-products]")){Ca(e);return}if(e instanceof HTMLInputElement&&e.matches("[data-import-backup]")){Pa(e);return}if(e instanceof HTMLTextAreaElement&&e.dataset.orderNote){const a=B(),n=a.find(s=>s.id===e.dataset.orderNote);n&&(n.managerNote=e.value.trim(),v(p.orders,a),A&&q.updateOrder(n.id,{managerNote:n.managerNote}).then(s=>{v(p.orders,a.map(i=>i.id===s.id?s:i))}).catch(s=>{S=O(s,"Не вдалося зберегти нотатку менеджера."),y()}));return}if(e instanceof HTMLInputElement||e instanceof HTMLSelectElement){if(e instanceof HTMLInputElement&&e.dataset.cartQuantity){Ie(e.dataset.cartQuantity,Number(e.value));return}if(e instanceof HTMLInputElement&&e.dataset.partnerToggle){const a=R(),n=a.find(s=>s.id===e.dataset.partnerToggle);if(n){if(n.partner=e.checked,v(p.accounts,a),A){q.updateClient(n.id,{partner:n.partner}).then(s=>{v(p.accounts,a.map(i=>i.id===s.id?s:i)),y()}).catch(s=>{S=O(s,"Не вдалося змінити статус клієнта."),y()});return}y()}return}if(e instanceof HTMLInputElement&&e.dataset.partnerMarkup){const a=R(),n=a.find(s=>s.id===e.dataset.partnerMarkup);if(n){if(n.fixedMarkup=Math.min(.99,Math.max(0,Number(e.value)||0)),v(p.accounts,a),A){q.updateClient(n.id,{fixedMarkup:n.fixedMarkup}).then(s=>{v(p.accounts,a.map(i=>i.id===s.id?s:i)),y()}).catch(s=>{S=O(s,"Не вдалося зберегти персональну ціну."),y()});return}y()}}}});document.querySelector("#product-dialog")?.addEventListener("click",t=>{t.target===t.currentTarget&&qt()});document.querySelector("#product-dialog")?.addEventListener("cancel",t=>{t.preventDefault(),qt()});document.querySelector("#admin-product-dialog")?.addEventListener("click",t=>{t.target===t.currentTarget&&t.currentTarget.close()});document.querySelector("#profile-dialog")?.addEventListener("click",t=>{t.target===t.currentTarget&&t.currentTarget.close()});window.addEventListener("hashchange",Wt);async function Da(){if(A){document.body.dataset.backend="loading";try{H(await q.products()),Lt()&&await Bt(),document.body.dataset.backend="online",j(),W(),Wt()}catch(t){document.body.dataset.backend="offline",console.error("ToffiPacks backend is unavailable:",t),window.location.hash.startsWith("#admin")&&(S="Сервер тимчасово недоступний. Дані не змінено.",y())}}}N(!0);window.setTimeout(()=>N(!1),460);J();W();Wt();Ia();Da();"serviceWorker"in navigator&&window.location.protocol==="https:"&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});
