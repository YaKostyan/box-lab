(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const Ce={},Bt="toffipacks-api-session-v1",Ie=Ce,he=String(Ie?.VITE_API_BASE_URL??"").trim().replace(/\/$/,""),k=!!he;class Ot extends Error{status;code;constructor(e,a,n="request_error"){super(a),this.status=e,this.code=n}}function dt(){localStorage.removeItem(Bt)}function At(){return!!localStorage.getItem(Bt)}async function C(t,e={}){if(!k)throw new Ot(0,"Backend API is not configured.","api_disabled");const a=localStorage.getItem(Bt),n=await fetch(`${he}${t}`,{...e,headers:{Accept:"application/json",...e.body?{"Content-Type":"application/json"}:{},...a?{Authorization:`Bearer ${a}`}:{},...e.headers}}),s=await n.json().catch(()=>({}));if(!n.ok)throw n.status===401&&dt(),new Ot(n.status,s.error?.message??"Сервер не зміг виконати запит.",s.error?.code);return s}async function oe(t,e){const a=await C(t,{method:"POST",body:JSON.stringify(e)});return localStorage.setItem(Bt,a.token),a.account}const q={products:async()=>(await C("/api/products")).products,login:(t,e)=>oe("/api/auth/login",{phone:t,password:e}),register:t=>oe("/api/auth/register",t),me:async()=>(await C("/api/auth/me")).account,updateMe:async t=>(await C("/api/auth/me",{method:"PATCH",body:JSON.stringify(t)})).account,logout:async()=>{try{await C("/api/auth/logout",{method:"POST"})}finally{dt()}},createOrder:async t=>(await C("/api/orders",{method:"POST",body:JSON.stringify(t)})).order,myOrders:async()=>(await C("/api/me/orders")).orders,adminProducts:async()=>(await C("/api/admin/products")).products,createProduct:async t=>(await C("/api/admin/products",{method:"POST",body:JSON.stringify(t)})).product,updateProduct:async(t,e)=>(await C(`/api/admin/products/${encodeURIComponent(t)}`,{method:"PATCH",body:JSON.stringify(e)})).product,deleteProduct:t=>C(`/api/admin/products/${encodeURIComponent(t)}`,{method:"DELETE"}),resetProducts:async()=>(await C("/api/admin/products/reset",{method:"POST"})).products,adminOrders:async()=>(await C("/api/admin/orders")).orders,updateOrder:async(t,e)=>(await C(`/api/admin/orders/${encodeURIComponent(t)}`,{method:"PATCH",body:JSON.stringify(e)})).order,deleteOrder:t=>C(`/api/admin/orders/${encodeURIComponent(t)}`,{method:"DELETE"}),adminClients:async()=>(await C("/api/admin/clients")).clients,updateClient:async(t,e)=>(await C(`/api/admin/clients/${encodeURIComponent(t)}`,{method:"PATCH",body:JSON.stringify(e)})).client,backup:()=>C("/api/admin/backup")},kt=5e4,Q=1e3,Ee=2,De=1,Yt=.5,ee=[{id:"box-301",number:"301",name:"Самозбірна коробка №301",dimensions:{length:165,width:100,height:30},basePrice:5,sourceQuantity:1e3},{id:"box-302",number:"302",name:"Самозбірна коробка №302",dimensions:{length:130,width:130,height:50},basePrice:7,sourceQuantity:800},{id:"box-303",number:"303",name:"Самозбірна коробка №303",dimensions:{length:190,width:150,height:100},basePrice:17,sourceQuantity:800},{id:"box-304",number:"304",name:"Самозбірна коробка №304",dimensions:{length:230,width:150,height:35},basePrice:11,sourceQuantity:800},{id:"box-305",number:"305",name:"Самозбірна коробка №305",dimensions:{length:160,width:85,height:110},basePrice:6.5},{id:"box-306",number:"306",name:"Самозбірна коробка №306",dimensions:{length:145,width:145,height:40},basePrice:6.5,sourceQuantity:1e3},{id:"box-307",number:"307",name:"Самозбірна коробка №307",dimensions:{length:280,width:180,height:100},basePrice:18,sourceQuantity:500},{id:"box-308",number:"308",name:"Самозбірна коробка №308",dimensions:{length:250,width:180,height:40},basePrice:12,sourceQuantity:800},{id:"box-309",number:"309",name:"Самозбірна коробка №309",dimensions:{length:210,width:150,height:50},basePrice:11,sourceQuantity:900},{id:"box-310",number:"310",name:"Самозбірна коробка №310",dimensions:{length:260,width:260,height:50},basePrice:15,sourceQuantity:600},{id:"box-311",number:"311",name:"Самозбірна коробка №311",dimensions:{length:370,width:170,height:100},basePrice:17},{id:"box-101",number:"101",name:"Самозбірна коробка №101",dimensions:{length:178,width:115,height:48},basePrice:4,sourceQuantity:800}],Oe=[{question:"Як відбувається доставка?",answer:"Доставляємо по Києву та Київській області. Формат, точну адресу й вартість потрібно уточнити з менеджером під час підтвердження заявки."},{question:"Які строки виготовлення?",answer:"Строк залежить від розміру коробки, тиражу та завантаження виробництва. Менеджер називає точну дату до запуску замовлення."},{question:"Що отримує постійний клієнт?",answer:"Після підтвердження менеджером у кабінеті активується персональна ціна. Вона автоматично відображається в каталозі, калькуляторі та кошику."},{question:"Як проходить оплата?",answer:"Форму оплати, рахунок і підсумкову суму менеджер погоджує з вами до початку виготовлення."},{question:"Чи працюєте ви з малим і великим бізнесом?",answer:"Так. Можна почати з невеликої партії або замовити регулярний великий тираж. Калькулятор рахує до 50 000 коробок, більший обсяг прораховує менеджер."},{question:"Чи робите коробки під індивідуальний запит?",answer:"Так. Якщо серед готових розмірів немає потрібного, вкажіть габарити й особливості замовлення в коментарі. Менеджер уточнить деталі та підготує розрахунок."}];function $(t){return new Intl.NumberFormat("uk-UA",{style:"currency",currency:"UAH",minimumFractionDigits:Number.isInteger(t)?0:2,maximumFractionDigits:2}).format(t)}function D(t,e){return t.basePrice+(e>=Q?De:Ee)}function st(t,e,a){return a?.partner?t.basePrice+Math.min(Math.max(a.fixedMarkup,0),.99):D(t,e)}function Nt(t){const{length:e,width:a,height:n}=t.dimensions;return e*a*n}function Rt(t,e,a=0){const n=[t.length,t.width,t.height].sort((o,c)=>c-o),s=[e.length,e.width,e.height].sort((o,c)=>c-o),i=n.map((o,c)=>(s[c]-o)/2),r=i.map(o=>Math.max(0,a-o));return{fits:r.every(o=>o===0),clearancesPerSide:i,deficitsPerSide:r}}const u={accounts:"toffipacks-accounts-v3",orders:"toffipacks-orders-v3",session:"toffipacks-session-v3",cart:"toffipacks-cart-v1",products:"toffipacks-products-v1",fit:"toffipacks-fit-v1",measurements:"toffipacks-measurements-v1"},be=/^[\p{L}\p{N}._-]+$/u,Lt=new Date().toISOString(),ve=[{id:"account-admin",name:"Адміністратор ToffiPacks",phone:"+380000000001",company:"ToffiPacks",password:"admin123",role:"admin",partner:!1,fixedMarkup:Yt,createdAt:Lt},{id:"account-partner",name:"Постійний клієнт",phone:"+380671112233",company:"",password:"client123",role:"client",partner:!0,fixedMarkup:Yt,createdAt:Lt}],ye=[];function mt(t,e){try{const a=localStorage.getItem(t);return a?JSON.parse(a):e}catch{return e}}function h(t,e){localStorage.setItem(t,JSON.stringify(e))}function Ne(){localStorage.getItem(u.accounts)||h(u.accounts,ve),localStorage.getItem(u.orders)||h(u.orders,ye),localStorage.getItem(u.cart)||h(u.cart,[]),localStorage.getItem(u.products)||h(u.products,ee.map(t=>({...t,active:!0,updatedAt:Lt})))}Ne();k&&(h(u.accounts,[]),h(u.orders,[]),At()||localStorage.removeItem(u.session));const $e=mt(u.fit,null),$t=$e?.dimensions,Ue=$t&&[$t.length,$t.width,$t.height].every(t=>Number.isFinite(t)&&t>0),Wt=$e?.margin;let tt="box-101",w=500,Mt="",Xt="size",X=!1,x=Ue?$t:null,T=Wt===5||Wt===10?Wt:0,ce,lt=null,ae="",rt="all",ne="",Ut="Усі",A="",L="",wt="",S="";const we=document.querySelector("#app");if(!we)throw new Error("Root element #app was not found.");function R(){return mt(u.accounts,ve)}function K(){const t=ee.map(e=>({...e,active:!0,updatedAt:Lt}));return mt(u.products,t).filter(e=>e&&typeof e.id=="string"&&typeof e.number=="string"&&Number.isFinite(e.basePrice)&&Number.isFinite(e.dimensions?.length)&&Number.isFinite(e.dimensions?.width)&&Number.isFinite(e.dimensions?.height)).map(e=>({...e,active:e.active!==!1,updatedAt:e.updatedAt||Lt}))}function M(){return K().filter(t=>t.active)}function F(t){h(u.products,t)}function B(){return mt(u.orders,ye).map(e=>{if("items"in e&&Array.isArray(e.items))return{...e,statusHistory:Array.isArray(e.statusHistory)&&e.statusHistory.length?e.statusHistory:[{status:e.status,at:e.createdAt}]};const a=e;return{id:a.id,createdAt:a.createdAt,customerName:a.customerName,phone:a.phone,company:a.company,comment:a.comment,items:[{productId:a.productId,productNumber:a.productNumber,dimensions:a.dimensions,quantity:a.quantity,unitPrice:a.unitPrice,total:a.total,priceType:a.priceType}],total:a.total,accountId:a.accountId,status:a.status,statusHistory:[{status:a.status,at:a.createdAt}]}})}function z(){const t=M();return mt(u.cart,[]).filter(e=>t.some(a=>a.id===e.productId)&&e.quantity>0)}function Z(){const t=localStorage.getItem(u.session);return R().find(e=>e.id===t)??null}function Vt(t){const e={...t},a=R().filter(n=>n.id!==t.id&&n.role!==t.role);return h(u.accounts,[e,...a]),localStorage.setItem(u.session,e.id),e}function He(t,e,a,n){h(u.accounts,[t,...e]),h(u.orders,a),F(n),localStorage.setItem(u.session,t.id)}async function Ht(){if(!k||!At())return null;try{const t=await q.me();if(t.role==="admin"){const[e,a,n]=await Promise.all([q.adminClients(),q.adminOrders(),q.adminProducts()]);He(t,e,a,n)}else{const[e,a]=await Promise.all([q.myOrders(),q.products()]);Vt(t),h(u.orders,e),F(a)}return t}catch(t){if(t instanceof Ot&&t.status===401)return dt(),localStorage.removeItem(u.session),null;throw t}}function Qt(){const t=M();return t.find(e=>e.id===tt)??t[0]}function Pt(t){return Number.isFinite(t)?Math.min(kt,Math.max(1,Math.round(t))):1}function at(){return mt(u.measurements,[]).filter(t=>t&&typeof t.id=="string"&&[t.dimensions?.length,t.dimensions?.width,t.dimensions?.height].every(e=>Number.isFinite(e)&&Number(e)>0)&&[0,5,10].includes(t.margin))}function nt(t){return t===0?"без додаткового запасу":`+${t} мм з кожного боку`}function Se(){const t=at();return t.length?`
    <div class="saved-measurements__head"><span>Збережені розміри</span><button type="button" data-clear-measurements>Очистити</button></div>
    <div class="saved-measurements__list">
      ${t.map(e=>`
            <button type="button" data-saved-measurement="${d(e.id)}">
              <strong>${O(e.dimensions)}</strong>
              <span>${nt(e.margin)}</span>
            </button>
          `).join("")}
    </div>
  `:""}function _e(){const t=document.querySelector("#saved-measurements");t&&(t.innerHTML=Se(),t.hidden=!t.innerHTML)}function qe(t,e){const a=`${t.length}-${t.width}-${t.height}-${e}`,n=at().filter(i=>`${i.dimensions.length}-${i.dimensions.width}-${i.dimensions.height}-${i.margin}`!==a),s={id:`size-${a}`,dimensions:t,margin:e,createdAt:new Date().toISOString()};h(u.measurements,[s,...n].slice(0,5)),h(u.fit,{dimensions:t,margin:e}),_e()}function Fe(t,e=!0){x={...t.dimensions},T=t.margin,h(u.fit,{dimensions:x,margin:T});const a=document.querySelector("#fit-form");if(a){a.elements.namedItem("length")?.setAttribute("value",String(x.length)),a.elements.namedItem("width")?.setAttribute("value",String(x.width)),a.elements.namedItem("height")?.setAttribute("value",String(x.height));const s=r=>{const o=a.elements.namedItem(r);o instanceof HTMLInputElement&&(o.value=String(x?.[r]??""))};s("length"),s("width"),s("height");const i=a.querySelector(`input[name="fitMargin"][value="${T}"]`);i&&(i.checked=!0)}const n=document.querySelector("#fit-message");n&&(n.textContent=`Розміри застосовано · ${nt(T)}.`,n.className="form-message is-success"),X=!1,gt(),e&&window.setTimeout(()=>document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth"}),180)}function Tt(t){let e=t.replace(/\D/g,"");return e.length===10&&e.startsWith("0")&&(e=`38${e}`),e.length===12&&e.startsWith("380")?`+${e}`:t.trim()}function ut(t){return Tt(t).replace(/\D/g,"")}function d(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function O(t){return`${t.length} × ${t.width} × ${t.height} мм`}function Ft(t){const e=t%100,a=t%10;return e>=11&&e<=14?`${t} позицій`:a===1?`${t} позиція`:a>=2&&a<=4?`${t} позиції`:`${t} позицій`}function zt(t,e){return e?.partner?"Фіксована ціна клієнта":t>=Q?"Оптова ціна":"Роздрібна ціна"}function ft(t,e=!1){const{length:a,width:n,height:s}=t.dimensions,i=170+Math.min(100,a/3),r=58+Math.min(54,s/2.5),o=50+Math.min(44,n/4),c=72,l=e?70:82,g=l-o*.55,f=c+i,v=f+o,b=l+r;return`
    <svg class="box-visual${e?" box-visual--compact":""}" viewBox="0 0 470 270" role="img"
      aria-label="Схема коробки ${d(t.number)}, ${O(t.dimensions)}">
      <g class="box-visual__shape">
        <polygon class="box-visual__top" points="${c},${l} ${c+o},${g} ${v},${g} ${f},${l}" />
        <polygon class="box-visual__side" points="${f},${l} ${v},${g} ${v},${g+r} ${f},${b}" />
        <rect class="box-visual__front" x="${c}" y="${l}" width="${i}" height="${r}" />
        <rect class="box-visual__mark" x="${c+i*.35}" y="${l+r*.32}"
          width="${i*.3}" height="${Math.max(24,r*.34)}" rx="5" />
        <text class="box-visual__number" x="${c+i/2}" y="${l+r*.56}">№${d(t.number)}</text>
      </g>
      <g class="dimension-line dimension-line--length">
        <line x1="${c}" y1="${b+28}" x2="${f}" y2="${b+28}" />
        <line x1="${c}" y1="${b+20}" x2="${c}" y2="${b+36}" />
        <line x1="${f}" y1="${b+20}" x2="${f}" y2="${b+36}" />
        <rect x="${c+i/2-38}" y="${b+12}" width="76" height="32" rx="16" />
        <text x="${c+i/2}" y="${b+33}">${a} мм</text>
      </g>
      <g class="dimension-line dimension-line--height">
        <line x1="${c-26}" y1="${l}" x2="${c-26}" y2="${b}" />
        <line x1="${c-34}" y1="${l}" x2="${c-18}" y2="${l}" />
        <line x1="${c-34}" y1="${b}" x2="${c-18}" y2="${b}" />
        <rect x="2" y="${l+r/2-16}" width="66" height="32" rx="16" />
        <text x="35" y="${l+r/2+5}">${s} мм</text>
      </g>
      <g class="dimension-line dimension-line--width">
        <line x1="${f+8}" y1="${l-8}" x2="${v+8}" y2="${g-8}" />
        <rect x="${v-54}" y="${Math.max(4,g-48)}" width="76" height="32" rx="16" />
        <text x="${v-16}" y="${Math.max(25,g-27)}">${n} мм</text>
      </g>
    </svg>
  `}function Gt(){return M().map(t=>`<option value="${d(t.id)}"${t.id===tt?" selected":""}>№${d(t.number)} · ${O(t.dimensions)}</option>`).join("")}function je(){const t=Qt();return`
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
          <label class="field">
            <span>Коробка</span>
            <select class="select" id="hero-product-select">${Gt()}</select>
          </label>
          <label class="field">
            <span>Кількість</span>
            <input class="input" id="hero-quantity-input" type="number" min="1" max="${kt}" value="${w}" />
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
                <input class="input" name="length" type="number" min="1" max="2000" value="${x?.length??170}" required />
              </label>
              <span class="dimension-sign" aria-hidden="true">×</span>
              <label class="field">
                <span>Ширина, мм</span>
                <input class="input" name="width" type="number" min="1" max="2000" value="${x?.width??110}" required />
              </label>
              <span class="dimension-sign" aria-hidden="true">×</span>
              <label class="field">
                <span>Висота, мм</span>
                <input class="input" name="height" type="number" min="1" max="2000" value="${x?.height??45}" required />
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
            <div class="saved-measurements" id="saved-measurements"${at().length?"":" hidden"}>${Se()}</div>
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
            <label class="field">
              <span>Розмір коробки</span>
              <select class="select select--large" id="calculator-product-select">${Gt()}</select>
            </label>
            <div class="calculator-preview" id="calculator-preview">${ft(t,!0)}</div>
            <div class="quantity-block">
              <div class="quantity-block__label">
                <label for="quantity-input">Кількість</label>
                <output id="quantity-output">${w.toLocaleString("uk-UA")} шт.</output>
              </div>
              <div class="quantity-control">
                <button type="button" data-quantity-step="-100" aria-label="Зменшити кількість на 100">−</button>
                <input id="quantity-input" type="number" min="1" max="${kt}" value="${w}" />
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
          ${Oe.map((e,a)=>`
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
  `}we.innerHTML=je();const It=document.querySelector("#product-grid"),Zt=document.querySelector("#catalog-count");function te(t){return new Intl.NumberFormat("uk-UA",{maximumFractionDigits:1}).format(Math.max(0,t))}function Be(t){if(!x)return"";const e=Rt(x,t.dimensions,T);if(e.fits){const n=Math.min(...e.clearancesPerSide);return`<div class="product-card__fit"><strong>Підходить</strong><span>мін. ${te(n)} мм на бік</span></div>`}const a=Math.max(...e.deficitsPerSide)*2;return`<div class="product-card__fit is-near"><strong>Найближчий розмір</strong><span>бракує до ${te(a)} мм</span></div>`}function Re(t){if(!x)return"";const e=Rt(x,t.dimensions,T);if(e.fits)return`<div class="product-modal__fit is-fit"><strong>Коробка підходить</strong><span>${nt(T)} враховано у підборі.</span></div>`;const a=Math.max(...e.deficitsPerSide)*2;return`<div class="product-modal__fit is-warning" role="status"><strong>Цей розмір замалий</strong><span>Бракує до ${te(a)} мм для обраного запасу. Додайте лише після ручної перевірки.</span></div>`}function de(t){const e=Z(),a=D(t,1),n=D(t,Q),s=e?.partner?st(t,1,e):null;return`
    <article
      class="product-card${t.id===tt?" is-selected":""}"
      data-product-card="${d(t.id)}"
    >
      <div class="product-card__head">
        <span class="product-card__number">№${d(t.number)}</span>
        <span class="product-card__size-label">внутрішній розмір</span>
      </div>
      <div class="product-card__visual">${ft(t,!0)}</div>
      <h3>${O(t.dimensions)}</h3>
      ${Be(t)}
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
        aria-label="Відкрити коробку №${d(t.number)}, ${O(t.dimensions)}"
      ></button>
    </article>
  `}function Ve(t){const e=Z(),a=st(t,w,e),n=a*w;return`
    <div class="product-modal">
      <div class="product-modal__visual">
        <div class="product-modal__labels">
          <span>№${d(t.number)}</span>
        </div>
        <div class="product-modal__drawing">${ft(t,!0)}</div>
        <p>Внутрішній розмір · Д × Ш × В</p>
      </div>
      <div class="product-modal__content">
        <p class="eyebrow"><span></span> Внутрішній розмір</p>
        <h2 id="product-dialog-title">${O(t.dimensions)}</h2>
        ${Re(t)}

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
            <input id="modal-quantity-input" type="number" min="1" max="${kt}" value="${w}" />
            <button type="button" data-quantity-step="100" aria-label="Збільшити кількість на 100">+</button>
          </div>
          <div class="quantity-presets quantity-presets--modal" aria-label="Швидкий вибір кількості">
            ${[100,500,1e3,5e3,1e4,5e4].map(s=>`<button type="button" data-quantity="${s}">${s.toLocaleString("uk-UA")}</button>`).join("")}
          </div>
        </div>

        <div class="product-modal__total" aria-live="polite">
          <div><span id="modal-price-tier">${zt(w,e)}</span><strong id="modal-unit-price">${$(a)} / шт.</strong></div>
          <div><span>Весь тираж</span><strong id="modal-total">${$(n)}</strong></div>
        </div>

        <div class="product-modal__actions">
          <button class="button button--primary" type="button" data-product-to-cart>Додати до кошика</button>
          <button class="button button--ghost" type="button" data-product-to-calculator>Відкрити калькулятор</button>
        </div>
      </div>
    </div>
  `}function xe(){const t=document.querySelector("#product-dialog");if(!t?.open||!lt)return;const e=M().find(l=>l.id===lt);if(!e)return;const a=Z(),n=st(e,w,a),s=t.querySelector("#modal-quantity-input");s&&(s.value=String(w));const i=t.querySelector("#modal-quantity-output");i&&(i.value=`${w.toLocaleString("uk-UA")} шт.`);const r=t.querySelector("#modal-price-tier");r&&(r.textContent=zt(w,a));const o=t.querySelector("#modal-unit-price");o&&(o.textContent=`${$(n)} / шт.`);const c=t.querySelector("#modal-total");c&&(c.textContent=$(n*w)),t.querySelectorAll("[data-quantity]").forEach(l=>{l.classList.toggle("is-active",Number(l.dataset.quantity)===w)})}function le(t){const e=M().find(s=>s.id===t),a=document.querySelector("#product-dialog"),n=document.querySelector("#product-dialog-content");!e||!a||!n||(lt=e.id,se(e.id),n.innerHTML=Ve(e),a.classList.remove("is-closing"),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),xe())}function St(t){const e=document.querySelector("#product-dialog");if(!e){lt=null,t?.();return}const a=()=>{e.classList.remove("is-closing"),e.open&&typeof e.close=="function"?e.close():e.removeAttribute("open"),lt=null,t?.()};if(!e.open||window.matchMedia("(prefers-reduced-motion: reduce)").matches){a();return}e.classList.contains("is-closing")||(e.classList.add("is-closing"),window.setTimeout(a,230))}function Qe(){const t=M(),e=Mt.trim().toLocaleLowerCase("uk-UA");return t.filter(n=>{const s=`${n.number} ${n.name} ${O(n.dimensions)}`.toLocaleLowerCase("uk-UA"),i=!e||s.includes(e),r=!x||Rt(x,n.dimensions,T).fits;return i&&r}).sort((n,s)=>Xt==="price"?n.basePrice-s.basePrice:Xt==="number"?n.number.localeCompare(s.number,"uk-UA",{numeric:!0}):Nt(n)-Nt(s))}function ze(){if(!x)return[];const t=Mt.trim().toLocaleLowerCase("uk-UA");return M().filter(e=>{const a=`${e.number} ${e.name} ${O(e.dimensions)}`.toLocaleLowerCase("uk-UA");return!t||a.includes(t)}).map(e=>{const n=Rt(x,e.dimensions,T).deficitsPerSide.reduce((s,i)=>s+i,0);return{product:e,deficit:n}}).sort((e,a)=>e.deficit-a.deficit||Nt(e.product)-Nt(a.product)).slice(0,3).map(({product:e})=>e)}function U(t=!1){if(!It||!Zt)return;const e=document.querySelector("#catalog-more"),a=document.querySelector("#catalog-more-button");if(t){Zt.textContent="Оновлюємо список…",e&&(e.hidden=!0),It.innerHTML=Array.from({length:6},()=>'<div class="product-skeleton" aria-hidden="true"><i></i><i></i><i></i></div>').join("");return}const n=Qe(),s=x?` · предмет ${O(x)} · ${nt(T)}`:"";if(Zt.textContent=`${n.length} із ${M().length} розмірів${s}`,!n.length){const c=ze();It.innerHTML=`
      <div class="empty-state${c.length?" empty-state--nearest":""}">
        <div class="empty-state__box" aria-hidden="true"></div>
        <h3>Готового розміру немає.</h3>
        <p>${T?`Із запасом ${nt(T)} точного варіанта немає. Найближчі коробки нижче замалі — це позначено окремо.`:"Змініть габарити предмета або залиште заявку з потрібним розміром."}</p>
        <div class="empty-state__actions">
          ${T?'<button class="button button--ghost" type="button" data-use-tight-fit>Показати без запасу</button>':""}
          <a class="button button--primary" href="#request">Описати свій розмір</a>
        </div>
        ${c.length?`<div class="nearest-results"><div class="nearest-results__head"><strong>Найближчі готові розміри</strong><span>Вони не відповідають обраному запасу</span></div><div class="nearest-results__grid">${c.map(de).join("")}</div></div>`:""}
      </div>
    `,e&&(e.hidden=!0);return}const r=window.matchMedia("(max-width: 680px)").matches&&!Mt.trim()&&!x&&n.length>4,o=r&&!X?n.slice(0,4):n;It.innerHTML=o.map(de).join(""),e&&a&&(e.hidden=!r,a.textContent=X?"Згорнути каталог":`Показати всі ${n.length} розмірів`,a.setAttribute("aria-expanded",String(X)))}function gt(){window.clearTimeout(ce),U(!0),ce=window.setTimeout(()=>U(!1),320)}function J(){const t=Qt(),e=Z(),a=st(t,w,e),n=a*w,s=zt(w,e);document.querySelectorAll("#calculator-product-select, #hero-product-select").forEach(I=>{I.value=t.id}),document.querySelectorAll("#quantity-input, #hero-quantity-input, #modal-quantity-input").forEach(I=>{I.value=String(w)});const i=document.querySelector("#quantity-output");i&&(i.value=`${w.toLocaleString("uk-UA")} шт.`);const r=document.querySelector("#calculator-preview");r&&(r.classList.remove("is-changing"),r.offsetWidth,r.classList.add("is-changing"),r.innerHTML=ft(t,!0));const o=document.querySelector("#calculator-tier");o&&(o.textContent=s);const c=document.querySelector("#calculator-unit-price");c&&(c.innerHTML=`${$(a)}<small>/ шт.</small>`);const l=document.querySelector("#calculator-total");l&&(l.textContent=$(n));const g=document.querySelector("#hero-price-label");g&&(g.textContent=s);const f=document.querySelector("#hero-total");f&&(f.textContent=$(n));const v=document.querySelector("#hero-unit");v&&(v.textContent=`${$(a)} / шт.`);const b=document.querySelector("#account-price-badge");b&&(b.textContent=e?.partner?"Персональна ціна активна":"Публічна ціна",b.classList.toggle("is-partner",!!e?.partner));const P=document.querySelector("#threshold-note");if(P)if(e?.partner)P.innerHTML=`<strong>Фіксована ціна:</strong> ${$(a)} за одиницю незалежно від тиражу.`;else if(w<Q){const I=Q-w,H=D(t,Q)*Q;P.innerHTML=`Ще <strong>${I.toLocaleString("uk-UA")} шт.</strong> до оптового тарифу. 1000 шт. коштуватимуть ${$(H)}.`}else P.innerHTML=`<strong>Оптовий тариф активний.</strong> Економія проти роздрібної ціни — ${$(w)} на всьому тиражі.`;document.querySelectorAll("[data-quantity]").forEach(I=>{I.classList.toggle("is-active",Number(I.dataset.quantity)===w)}),G(),xe()}function se(t,e=!1){M().some(a=>a.id===t)&&(tt=t,U(!1),J(),e&&document.querySelector("#calculator")?.scrollIntoView({behavior:"smooth",block:"start"}))}function ot(t){w=Pt(t),J()}function ue(t,e){if(!M().some(i=>i.id===t))return;const a=z(),n=a.find(i=>i.productId===t);n?n.quantity=Pt(e):a.push({productId:t,quantity:Pt(e)}),h(u.cart,a),G();const s=document.querySelector("#cart-button");s?.classList.remove("is-updated"),s?.offsetWidth,s?.classList.add("is-updated")}function Ae(t,e){const a=z(),n=a.find(s=>s.productId===t);n&&(n.quantity=Pt(e),h(u.cart,a),G())}function Ke(t){h(u.cart,z().filter(e=>e.productId!==t)),G()}function G(){const t=document.querySelector("#request-summary"),e=document.querySelector("#cart-count"),a=document.querySelector('#request-form button[type="submit"]'),n=z(),s=Z();if(e&&(e.textContent=String(n.length)),a&&(a.disabled=n.length===0),!t)return;if(!n.length){t.innerHTML=`
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
    `;return}let i=0;const r=n.map(o=>{const c=M().find(f=>f.id===o.productId);if(!c)return"";const l=st(c,o.quantity,s),g=l*o.quantity;return i+=g,`
        <article class="cart-item">
          <div class="cart-item__index">№${d(c.number)}</div>
          <div class="cart-item__info">
            <strong>${O(c.dimensions)}</strong>
            <span>${$(l)} / шт.</span>
          </div>
          <label class="cart-item__quantity">
            <span>Кількість</span>
            <div class="cart-item__quantity-control">
              <button type="button" data-cart-step="-100" data-cart-product="${d(c.id)}" aria-label="Зменшити кількість коробки №${d(c.number)} на 100">−</button>
              <input class="input" type="number" min="1" max="${kt}" value="${o.quantity}" data-cart-quantity="${d(c.id)}" />
              <button type="button" data-cart-step="100" data-cart-product="${d(c.id)}" aria-label="Збільшити кількість коробки №${d(c.number)} на 100">+</button>
            </div>
          </label>
          <div class="cart-item__total">
            <span>Сума</span>
            <strong>${$(g)}</strong>
          </div>
          <div class="cart-item__actions">
            <button type="button" data-edit-cart="${d(c.id)}">Змінити</button>
            <button class="cart-item__remove" type="button" data-remove-cart="${d(c.id)}" aria-label="Прибрати коробку №${d(c.number)} з кошика">×</button>
          </div>
        </article>
      `}).join("");t.innerHTML=`
    <div class="cart-list">${r}</div>
    <div class="cart-summary__total">
      <span>${Ft(n.length)}</span>
      <div><small>Загальна вартість</small><strong>${$(i)}</strong></div>
    </div>
    <div class="cart-summary__actions">
      <a class="cart-continue" href="#catalog">+ Додати ще один розмір</a>
      <button type="button" data-clear-cart>Очистити кошик</button>
    </div>
  `}function Je(t){const e=B().find(i=>i.id===t);if(!e)return;const a=new Set(M().map(i=>i.id)),n=e.items.filter(i=>a.has(i.productId)).map(i=>({productId:i.productId,quantity:Pt(i.quantity)}));if(!n.length)return;const s=z().filter(i=>!n.some(r=>r.productId===i.productId));h(u.cart,[...s,...n]),G(),window.location.hash="request",window.setTimeout(()=>document.querySelector("#request")?.scrollIntoView({behavior:"smooth",block:"start"}),80)}function W(){const t=document.querySelector("#account-button"),e=Z();if(!t)return;t.textContent=e?e.name.split(" ")[0]:"Кабінет",t.classList.toggle("is-signed-in",!!e);const a=document.querySelector("#request-account-hint");a&&(a.textContent=e?e.name:"Гість");const n=document.querySelector("#request-form");if(n&&e){const s=(i,r)=>{const o=n.elements.namedItem(i);o instanceof HTMLInputElement&&!o.value&&(o.value=r)};s("name",e.name),s("phone",e.phone),s("company",e.company)}G()}function We(){const t=Z();if(t){const e=B().filter(o=>o.accountId===t.id).slice().reverse(),a=e.filter(o=>o.status!=="Закрита").length,n=e.reduce((o,c)=>o+c.total,0),s=t.name.split(/\s+/).filter(Boolean).slice(0,2).map(o=>o[0]).join("").toLocaleUpperCase("uk-UA"),i=Qt(),r=st(i,w,t);return`
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
              ${e.length?e.map(o=>{const c=o.items.reduce((l,g)=>l+g.quantity,0);return`
                          <article class="account-order">
                            <div class="account-order__main">
                              <span>${d(o.id)}</span>
                              <strong>${Ft(o.items.length)}</strong>
                              <small>${c.toLocaleString("uk-UA")} шт. загалом</small>
                            </div>
                            <div class="account-order__price"><strong>${$(o.total)}</strong><small>загальна сума</small></div>
                            <div class="account-order__meta"><span>${d(o.status)}</span><time datetime="${o.createdAt}">${new Date(o.createdAt).toLocaleDateString("uk-UA")}</time></div>
                            <div class="account-order__items">
                              ${o.items.map(l=>`<span><b>№${d(l.productNumber)}</b> ${O(l.dimensions)} · ${l.quantity.toLocaleString("uk-UA")} шт.</span>`).join("")}
                            </div>
                            <button class="account-order__repeat" type="button" data-repeat-order="${d(o.id)}">Повторити замовлення</button>
                          </article>
                        `}).join(""):'<div class="account-empty"><strong>Заявок ще немає.</strong><p>Оберіть розмір, порахуйте тираж і збережіть першу заявку.</p><a class="button button--primary" href="#catalog">До каталогу</a></div>'}
            </div>
          </section>

          <aside class="account-sidebar">
            <article class="account-quick-order">
              <p class="technical-label">Швидкий розрахунок</p>
              <div class="account-quick-order__box">${ft(i,!1)}</div>
              <span>Коробка №${d(i.number)}</span>
              <h3>${O(i.dimensions)}</h3>
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
            ${at().length?`<article class="account-measurements"><div><p class="technical-label">Збережені розміри</p><span>${at().length} останніх</span></div><div class="account-measurements__list">${at().map(o=>`<button type="button" data-saved-measurement="${d(o.id)}"><strong>${O(o.dimensions)}</strong><span>${nt(o.margin)}</span></button>`).join("")}</div></article>`:""}
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
  `}function V(){const t=document.querySelector("#account-page-content");t&&(t.innerHTML=We())}function Ze(t){return`
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
  `}function Ye(){const t=Z(),e=document.querySelector("#profile-dialog"),a=document.querySelector("#profile-dialog-content");!t||!e||!a||(a.innerHTML=Ze(t),typeof e.showModal=="function"?e.showModal():e.setAttribute("open",""),a.querySelector('input[name="name"]')?.focus())}async function Xe(t){t.classList.add("was-validated");const e=t.querySelector("[data-profile-status]");if(!t.reportValidity()){e&&(e.className="form-status is-error",e.textContent="Перевірте ім’я, телефон і новий пароль.");return}const a=Z();if(!a)return;const n=new FormData(t),s=Tt(String(n.get("phone")??"")),i=R();if(i.some(c=>c.id!==a.id&&ut(c.phone)===ut(s))){e&&(e.className="form-status is-error",e.textContent="Акаунт із таким номером уже існує.");return}const r=String(n.get("password")??"");if(k){try{const c=await q.updateMe({name:String(n.get("name")??"").trim(),phone:s,company:String(n.get("company")??"").trim(),...r?{password:r}:{}});Vt(c),document.querySelector("#profile-dialog")?.close(),W(),V(),J(),U(!1)}catch(c){e&&(e.className="form-status is-error",e.textContent=N(c,"Не вдалося оновити профіль."))}return}const o=i.map(c=>c.id===a.id?{...c,name:String(n.get("name")??"").trim(),phone:s,company:String(n.get("company")??"").trim(),password:r||c.password}:c);h(u.accounts,o),document.querySelector("#profile-dialog")?.close(),W(),V(),J(),U(!1)}function jt(t,e,a){const n=t.querySelector("[data-auth-status]");n&&(n.textContent=e,n.className=`form-status is-${a}`)}function N(t,e){return t instanceof Ot?t.message:e}function Ge(t,e){const a=ut(t),n=R().find(s=>ut(s.phone)===a&&s.password===e);return n?(localStorage.setItem(u.session,n.id),n):null}async function pe(t,e=!1){if(t.classList.add("was-validated"),!t.reportValidity())return;const a=new FormData(t);let n=null;if(k)try{const s=await q.login(String(a.get("phone")??""),String(a.get("password")??""));e&&s.role!=="admin"?dt():(n=Vt(s),await Ht())}catch(s){jt(t,N(s,"Сервер авторизації недоступний."),"error");return}else n=Ge(String(a.get("phone")??""),String(a.get("password")??""));if(!n||e&&n.role!=="admin"){jt(t,e?"Потрібен акаунт менеджера.":"Невірний телефон або пароль.","error");return}W(),J(),U(!1),e?y():(V(),window.location.hash="account")}async function ta(t){if(t.classList.add("was-validated"),!t.reportValidity())return;const e=new FormData(t),a=Tt(String(e.get("phone")??""));if(k){try{const i=await q.register({name:String(e.get("name")??"").trim(),phone:a,company:String(e.get("company")??"").trim(),password:String(e.get("password")??"")});Vt(i),h(u.orders,[]),W(),J(),U(!1),V(),window.location.hash="account"}catch(i){jt(t,N(i,"Не вдалося створити акаунт."),"error")}return}const n=R();if(n.some(i=>ut(i.phone)===ut(a))){jt(t,"Акаунт із таким номером уже існує.","error");return}const s={id:`account-${Date.now().toString(36)}`,name:String(e.get("name")??"").trim(),phone:a,company:String(e.get("company")??"").trim(),password:String(e.get("password")??""),role:"client",partner:!1,fixedMarkup:Yt,createdAt:new Date().toISOString()};n.push(s),h(u.accounts,n),localStorage.setItem(u.session,s.id),W(),J(),U(!1),V(),window.location.hash="account"}async function ea(t){const e=document.querySelector("#request-status"),a=z();if(!a.length){e&&(e.className="form-status is-error",e.textContent="Додайте хоча б одну коробку до кошика.");return}if(t.classList.add("was-validated"),!t.reportValidity()){e&&(e.className="form-status is-error",e.textContent="Перевірте обов’язкові поля та згоду.");return}const n=new FormData(t),s=Z(),i=Tt(String(n.get("phone")??"")),r=s??R().find(v=>Tt(v.phone)===i),o=a.flatMap(v=>{const b=M().find(I=>I.id===v.productId);if(!b)return[];const P=st(b,v.quantity,s);return[{productId:b.id,productNumber:b.number,dimensions:b.dimensions,quantity:v.quantity,unitPrice:P,total:P*v.quantity,priceType:zt(v.quantity,s)}]}),c=o.reduce((v,b)=>v+b.total,0);if(k){const v=t.querySelector('button[type="submit"]');v&&(v.disabled=!0,v.dataset.originalText=v.textContent??"",v.textContent="Зберігаємо заявку…");try{const b=await q.createOrder({customerName:String(n.get("name")??"").trim(),phone:i,company:String(n.get("company")??"").trim(),comment:String(n.get("comment")??"").trim(),items:a.map(P=>({productId:P.productId,quantity:P.quantity}))});h(u.orders,[...B().filter(P=>P.id!==b.id),b]),h(u.cart,[]),G(),V(),e&&(e.className="form-status is-success",e.innerHTML=`<strong>Заявку ${d(b.id)} створено.</strong><span>${Ft(b.items.length)} на суму ${$(b.total)}. Менеджер побачить її в адмінці.</span>`)}catch(b){e&&(e.className="form-status is-error",e.textContent=N(b,"Не вдалося передати заявку на сервер."))}finally{v&&(v.disabled=!1,v.textContent=v.dataset.originalText||"Надіслати заявку",v.focus())}return}const l=new Date().toISOString(),g={id:`TP-${Date.now().toString(36).toUpperCase()}`,createdAt:l,customerName:String(n.get("name")??"").trim(),phone:i,company:String(n.get("company")??"").trim(),comment:String(n.get("comment")??"").trim(),items:o,total:c,accountId:r?.id,status:"Нова",statusHistory:[{status:"Нова",at:l}]},f=B();f.push(g),h(u.orders,f),h(u.cart,[]),G(),V(),e&&(e.className="form-status is-success",e.innerHTML=`<strong>Заявку ${d(g.id)} створено.</strong><span>${Ft(g.items.length)} на суму ${$(g.total)}. Номер можна повідомити менеджеру.</span>`),t.querySelector('button[type="submit"]')?.focus()}const aa=["Нова","У роботі","Уточнення","Підтверджена","Закрита"];function me(t){return t==="Нова"?"is-new":t==="У роботі"?"is-progress":t==="Уточнення"?"is-clarifying":t==="Підтверджена"?"is-confirmed":"is-closed"}function na(t){return`
    <div class="order-status-control ${me(t.status)}" data-order-status-control>
      <button class="order-status-control__trigger" type="button" data-order-status-trigger aria-haspopup="listbox" aria-expanded="false">
        <span class="order-status-control__dot" aria-hidden="true"></span>
        <span>${d(t.status)}</span>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
      </button>
      <div class="order-status-control__menu" role="listbox" aria-label="Статус заявки ${d(t.id)}" hidden>
        ${aa.map(e=>`
            <button class="${me(e)}" type="button" role="option" aria-selected="${e===t.status}" data-order-status-option="${d(e)}" data-order-id="${d(t.id)}">
              <span class="order-status-control__dot" aria-hidden="true"></span>
              <span>${d(e)}</span>
              ${e===t.status?'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7" /></svg>':""}
            </button>
          `).join("")}
      </div>
    </div>
  `}function _t(t){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${n}`}function qt(t){const[e,a,n]=t.split("-").map(Number);return new Date(e,Math.max(0,(a||1)-1),n||1,12)}function it(t){return qt(t).toLocaleDateString("uk-UA",{day:"2-digit",month:"2-digit",year:"numeric"})}function ke(t=!1){const a=_t(new Date),s=qt(wt||A||a),i=new Date(s.getFullYear(),s.getMonth(),1,12);wt=_t(i);const r=(i.getDay()+6)%7,o=new Date(i);o.setDate(i.getDate()-r);const c=Array.from({length:42},(P,I)=>{const H=new Date(o);H.setDate(o.getDate()+I);const E=_t(H),Ct=H.getMonth()!==i.getMonth(),ht=E===A,bt=E===L,vt=ht||bt,yt=!!(A&&L&&E>A&&E<L);return`<button class="${[Ct?"is-outside":"",yt?"is-in-range":"",ht?"is-range-start":"",bt?"is-range-end":"",vt?"is-selected":"",E===a?"is-today":""].filter(Boolean).join(" ")}" type="button" data-calendar-date="${E}" aria-label="${H.toLocaleDateString("uk-UA",{day:"numeric",month:"long",year:"numeric"})}" aria-pressed="${vt}">${H.getDate()}</button>`}).join(""),l=A?L&&L!==A?`${it(A)} — ${it(L)}`:it(A):"Усі дати",g=A&&L?Math.round((qt(L).getTime()-qt(A).getTime())/864e5)+1:0,f=A?L?g===1?"Обрано один день":`Обрано ${g} дн.`:"Тепер оберіть кінець":"Оберіть початок",v=A?L?`${it(A)} — ${it(L)}`:`Початок: ${it(A)}`:"Перший клік — початкова дата",b=i.toLocaleDateString("uk-UA",{month:"long",year:"numeric"});return`
    <div class="admin-calendar${t?" is-open":""}" data-admin-calendar>
      <button class="admin-calendar__trigger" type="button" data-calendar-trigger aria-haspopup="dialog" aria-expanded="${t}">
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 2v3m10-3v3M3 8h14M4 4h12a1 1 0 0 1 1 1v12H3V5a1 1 0 0 1 1-1Z" /></svg>
        <span><small>Період заявок</small><strong>${d(l)}</strong></span>
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
        <div class="admin-calendar__range-state${A&&!L?" is-pending":""}" aria-live="polite">
          <span aria-hidden="true">${A&&L?"✓":A?"2":"1"}</span>
          <div><strong>${d(f)}</strong><small>${d(v)}</small></div>
        </div>
        <div class="admin-calendar__weekdays" aria-hidden="true">${["Пн","Вт","Ср","Чт","Пт","Сб","Нд"].map(P=>`<span>${P}</span>`).join("")}</div>
        <div class="admin-calendar__days">${c}</div>
        <div class="admin-calendar__footer">
          <button type="button" data-calendar-clear${A?"":" disabled"}>Очистити</button>
          <small>Дати включно</small>
        </div>
      </div>
    </div>
  `}function sa(){return window.location.hash==="#admin-orders"?"orders":window.location.hash==="#admin-clients"?"clients":window.location.hash==="#admin-products"?"products":"overview"}function ia(t,e,a,n){return[{view:"overview",href:"#admin",label:"Огляд"},{view:"orders",href:"#admin-orders",label:"Замовлення",count:e},{view:"clients",href:"#admin-clients",label:"Клієнти",count:a},{view:"products",href:"#admin-products",label:"Товари",count:n}].map((i,r)=>`
        <a class="admin-nav__link${t===i.view?" is-active":""}" href="${i.href}"${t===i.view?' aria-current="page"':""}>
          <span>${String(r+1).padStart(2,"0")}</span>
          <strong>${i.label}</strong>
          ${i.count===void 0?"":`<b>${i.count}</b>`}
        </a>
      `).join("")}function ra(t,e,a){const n=B(),s=R().filter(o=>o.role==="client"),i=K().length,r=S?`<div class="admin-notice" role="status"><span>Готово</span><p>${d(S)}</p></div>`:"";return S="",`
    <div class="admin-workspace">
      <aside class="admin-sidebar-nav">
        <div class="admin-sidebar-nav__head">
          <span class="technical-label">ToffiPacks / Control</span>
          <h2>Управління</h2>
          <p>Замовлення, клієнти й каталог в одному кабінеті.</p>
        </div>
        <nav class="admin-nav" aria-label="Розділи адмінки">
          ${ia(e,n.length,s.length,i)}
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
  `}function Le(t){const e=`${t.id} ${t.customerName} ${t.phone} ${t.company}`.toLocaleLowerCase("uk-UA");return`
    <article class="order-card" data-admin-order data-status="${d(t.status)}" data-date="${t.createdAt.slice(0,10)}" data-search="${d(e)}">
      <div class="order-card__top">
        <div><span>${d(t.id)}</span><strong>${d(t.customerName)}</strong></div>
        ${na(t)}
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
                <strong>${O(a.dimensions)}</strong>
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
  `}function oa(t,e){const a=t.filter(r=>r.status!=="Закрита").length,n=t.reduce((r,o)=>r+o.total,0),s=M().length,i=t.slice(0,3);return`
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
        ${i.length?i.map(Le).join(""):'<div class="admin-empty"><h3>Заявок ще немає.</h3><p>Нові замовлення з сайту з’являться тут.</p></div>'}
      </div>
    </section>
  `}function ca(t){const e=["Усі","Нова","У роботі","Уточнення","Підтверджена","Закрита"];return`
    <div class="admin-page-heading">
      <div><p class="eyebrow"><span></span> Замовлення</p><h1 id="admin-title">Заявки без хаосу.</h1></div>
      <p>Пошук за клієнтом або номером, швидка зміна статусу та повний склад кожного замовлення.</p>
    </div>
    <div class="admin-toolbar">
      <label class="admin-search"><span class="sr-only">Пошук заявок</span><input id="admin-order-search" type="search" value="${d(ne)}" placeholder="Номер, ім’я або телефон" /></label>
      ${ke()}
      <div class="admin-filter-chips" aria-label="Фільтр за статусом">
        ${e.map(a=>`<button class="${Ut===a?"is-active":""}" type="button" data-admin-order-filter="${a}">${a}</button>`).join("")}
      </div>
    </div>
    <div class="admin-results-meta"><strong id="admin-order-count">${t.length}</strong><span>заявок показано</span></div>
    <div class="orders-list" id="admin-orders-list">
      ${t.length?t.map(Le).join(""):'<div class="admin-empty"><h3>Заявок ще немає.</h3><p>Нові замовлення з сайту з’являться тут.</p></div>'}
    </div>
  `}function da(t){return`
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
  `}function ie(){const t=ae.trim().toLocaleLowerCase("uk-UA");return K().filter(e=>{const a=!t||`${e.number} ${e.name} ${O(e.dimensions)}`.toLocaleLowerCase("uk-UA").includes(t),n=rt==="all"||(rt==="active"?e.active:!e.active);return a&&n})}function Pe(){const t=ie();return t.length?t.map(e=>`
        <article class="admin-product-card${e.active?"":" is-hidden"}" data-admin-product="${e.id}">
          <div class="admin-product-card__visual">${ft(e,!1)}</div>
          <div class="admin-product-card__content">
            <div class="admin-product-card__top"><span>№${d(e.number)}</span><b>${e.active?"На сайті":"Приховано"}</b></div>
            <h3>${O(e.dimensions)}</h3>
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
      `).join(""):'<div class="admin-empty"><h3>Нічого не знайдено.</h3><p>Змініть пошук або фільтр видимості.</p></div>'}function la(){return`
    <div class="admin-page-heading admin-page-heading--products">
      <div><p class="eyebrow"><span></span> Товари</p><h1 id="admin-title">Каталог під контролем.</h1></div>
      <div class="admin-page-heading__action"><p>Окрема сторінка для розмірів, цін і видимості коробок.</p><button class="button button--primary" type="button" data-create-product>Додати коробку</button></div>
    </div>
    <div class="admin-toolbar admin-toolbar--products">
      <label class="admin-search"><span class="sr-only">Пошук товарів</span><input id="admin-product-search" type="search" value="${d(ae)}" placeholder="Номер або розмір" /></label>
      <div class="admin-filter-chips" aria-label="Фільтр товарів">
        <button class="${rt==="all"?"is-active":""}" type="button" data-product-filter="all">Усі</button>
        <button class="${rt==="active"?"is-active":""}" type="button" data-product-filter="active">На сайті</button>
        <button class="${rt==="hidden"?"is-active":""}" type="button" data-product-filter="hidden">Приховані</button>
      </div>
      <button class="button button--ghost button--small" type="button" data-export-products>Експорт CSV</button>
      <label class="button button--ghost button--small admin-file-button">Імпорт CSV<input type="file" accept=".csv,text/csv" data-import-products /></label>
      <button class="admin-danger-link" type="button" data-reset-products>Відновити початкові</button>
    </div>
    <div class="admin-results-meta"><strong id="admin-product-count">${ie().length}</strong><span>товарів показано</span></div>
    <div class="admin-products-grid" id="admin-product-list">${Pe()}</div>
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
    `;return}const a=B().slice().reverse(),n=R().filter(r=>r.role==="client"),s=sa();let i=oa(a,n);s==="orders"&&(i=ca(a)),s==="clients"&&(i=da(n)),s==="products"&&(i=la()),t.innerHTML=ra(e,s,i),s==="orders"&&xt()}function xt(){const t=ne.trim().toLocaleLowerCase("uk-UA");let e=0;document.querySelectorAll("[data-admin-order]").forEach(n=>{const s=!t||(n.dataset.search??"").includes(t),i=Ut==="Усі"||n.dataset.status===Ut,r=n.dataset.date??"",o=!A||!L&&r===A||!!(L&&r>=A&&r<=L);n.hidden=!(s&&i&&o),n.hidden||(e+=1)});const a=document.querySelector("#admin-order-count");a&&(a.textContent=String(e))}function Dt(t){document.querySelectorAll("[data-order-status-control]").forEach(e=>{e!==t&&(e.classList.remove("is-open"),e.querySelector(".order-status-control__menu")?.setAttribute("hidden",""),e.querySelector("[data-order-status-trigger]")?.setAttribute("aria-expanded","false"))})}function Te(){const t=document.querySelector("[data-admin-calendar]");t&&(t.classList.remove("is-open"),t.querySelector(".admin-calendar__popover")?.setAttribute("hidden",""),t.querySelector("[data-calendar-trigger]")?.setAttribute("aria-expanded","false"))}function Et(t,e){const a=document.querySelector("[data-admin-calendar]");a&&(a.outerHTML=ke(t),e&&window.requestAnimationFrame(()=>document.querySelector(`[data-admin-calendar] ${e}`)?.focus()))}async function ua(t,e){const a=B(),n=a.find(i=>i.id===t);if(!n||n.status===e)return;if(k){try{const i=await q.updateOrder(t,{status:e});h(u.orders,a.map(r=>r.id===t?i:r))}catch(i){S=N(i,"Не вдалося змінити статус заявки.")}y();return}const s=n.status;n.status=e,n.statusHistory=[...n.statusHistory??[{status:s,at:n.createdAt}],{status:e,at:new Date().toISOString()}],h(u.orders,a),y()}function pa(t){const e=t.trim().toLocaleLowerCase("uk-UA");document.querySelectorAll("[data-admin-client]").forEach(a=>{a.hidden=!!e&&!(a.dataset.search??"").includes(e)})}function ma(){const t=document.querySelector("#admin-product-list");t&&(t.innerHTML=Pe());const e=document.querySelector("#admin-product-count");e&&(e.textContent=String(ie().length))}function j(){const t=M();if(!t.length)return;t.some(s=>s.id===tt)||(tt=t[0].id);const e=Gt();document.querySelectorAll("#calculator-product-select, #hero-product-select").forEach(s=>{s.innerHTML=e,s.value=tt});const a=document.querySelector("#hero-product-count");a&&(a.textContent=String(t.length));const n=document.querySelector("#catalog-ready-label");n&&(n.innerHTML=`<span></span> ${t.length} готових розмірів`),U(!1),J(),G()}function fa(t){const e=!!t,a=t??{id:"",number:"",name:"",dimensions:{length:180,width:120,height:50},basePrice:5,active:!0};return`
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
  `}function fe(t){const e=document.querySelector("#admin-product-dialog"),a=document.querySelector("#admin-product-editor");if(!e||!a)return;const n=t?K().find(s=>s.id===t):void 0;a.innerHTML=fa(n),typeof e.showModal=="function"?e.showModal():e.setAttribute("open",""),a.querySelector('input[name="number"]')?.focus()}async function ga(t){t.classList.add("was-validated");const e=t.querySelector("[data-product-form-status]");if(!t.reportValidity()){e&&(e.className="form-status is-error",e.textContent="Перевірте обов’язкові поля.");return}const a=new FormData(t),n=String(a.get("productId")??""),s=String(a.get("number")??"").trim(),i=K(),r=i.find(f=>f.id===n);if(!be.test(s)){e&&(e.className="form-status is-error",e.textContent="У номері можна використовувати літери, цифри, крапку, дефіс і підкреслення.");return}if(i.some(f=>f.number.toLocaleLowerCase("uk-UA")===s.toLocaleLowerCase("uk-UA")&&f.id!==n)){e&&(e.className="form-status is-error",e.textContent="Товар із таким номером уже існує.");return}const o=a.get("active")==="on";if(r?.active&&!o&&M().length<=1){e&&(e.className="form-status is-error",e.textContent="У каталозі має залишитися хоча б один активний товар.");return}const c=r?.id??`box-${s.toLocaleLowerCase("uk-UA").replace(/[^a-zа-яіїєґ0-9]+/giu,"-")}-${Date.now().toString(36)}`,l={...r,id:c,number:s,name:String(a.get("name")??"").trim()||`Самозбірна коробка №${s}`,dimensions:{length:Number(a.get("length")),width:Number(a.get("width")),height:Number(a.get("height"))},basePrice:Number(a.get("basePrice")),active:o,updatedAt:new Date().toISOString()};if(k){try{const f=r?await q.updateProduct(r.id,l):await q.createProduct({number:l.number,name:l.name,dimensions:l.dimensions,basePrice:l.basePrice,sourceQuantity:l.sourceQuantity,active:l.active}),v=r?i.map(b=>b.id===r.id?f:b):[...i,f];F(v),j(),document.querySelector("#admin-product-dialog")?.close(),S=r?`Товар №${s} оновлено.`:`Товар №${s} додано до каталогу.`,y()}catch(f){e&&(e.className="form-status is-error",e.textContent=N(f,"Не вдалося зберегти товар на сервері."))}return}const g=r?i.map(f=>f.id===r.id?l:f):[...i,l];F(g),j(),document.querySelector("#admin-product-dialog")?.close(),S=r?`Товар №${s} оновлено.`:`Товар №${s} додано до каталогу.`,y()}function ge(t,e){const a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=URL.createObjectURL(a),s=document.createElement("a");s.href=n,s.download=t,s.click(),window.setTimeout(()=>URL.revokeObjectURL(n),0)}function ha(t,e,a){const n=new Blob([e],{type:a}),s=URL.createObjectURL(n),i=document.createElement("a");i.href=s,i.download=t,i.click(),window.setTimeout(()=>URL.revokeObjectURL(s),0)}function ba(t){const e=String(t);return/[;"\n\r]/.test(e)?`"${e.replaceAll('"','""')}"`:e}function va(){const t=["number","name","length","width","height","basePrice","active"],e=K().map(a=>[a.number,a.name,a.dimensions.length,a.dimensions.width,a.dimensions.height,a.basePrice,a.active].map(ba).join(";"));return`\uFEFF${[t.join(";"),...e].join(`\r
`)}`}function ya(){return{version:1,createdAt:new Date().toISOString(),accounts:R(),orders:B(),products:K(),cart:z(),measurements:at(),fit:x?{dimensions:x,margin:T}:null}}function $a(t){if(!t||typeof t!="object")return!1;const e=t;if(e.version!==1||!Array.isArray(e.accounts)||!Array.isArray(e.orders)||!Array.isArray(e.products))return!1;const a=e.accounts.every(i=>i&&typeof i.id=="string"&&typeof i.phone=="string"&&(i.role==="admin"||i.role==="client")),n=e.products.every(i=>i&&typeof i.id=="string"&&typeof i.number=="string"&&Number.isFinite(i.basePrice)&&[i.dimensions?.length,i.dimensions?.width,i.dimensions?.height].every(r=>Number.isFinite(r)&&Number(r)>0)),s=e.orders.every(i=>i&&typeof i.id=="string"&&typeof i.phone=="string"&&Array.isArray(i.items)&&Number.isFinite(i.total));return a&&n&&s&&e.accounts.some(i=>i.role==="admin")}async function wa(t){const e=t.files?.[0];if(e){if(k){S="Серверну копію можна завантажити, а відновлення виконується тільки на сервері адміністратором інфраструктури.",t.value="",y();return}try{const a=JSON.parse(await e.text());if(!$a(a))throw new Error("Файл не є коректною резервною копією ToffiPacks.");if(!window.confirm("Відновити локальні дані з цієї копії? Поточні заявки, клієнти й товари буде замінено."))return;h(u.accounts,a.accounts),h(u.orders,a.orders),h(u.products,a.products),h(u.cart,Array.isArray(a.cart)?a.cart:[]),h(u.measurements,Array.isArray(a.measurements)?a.measurements:[]),a.fit?h(u.fit,a.fit):localStorage.removeItem(u.fit),x=a.fit?.dimensions??null,T=a.fit?.margin===5||a.fit?.margin===10?a.fit.margin:0,R().some(n=>n.id===localStorage.getItem(u.session))||localStorage.removeItem(u.session),j(),W(),V(),S=`Резервну копію від ${new Date(a.createdAt).toLocaleString("uk-UA")} відновлено.`,y()}catch(a){S=a instanceof Error?a.message:"Не вдалося відновити резервну копію.",y()}finally{t.value=""}}}function Sa(t){const e=[];let a=[],n="",s=!1;for(let i=0;i<t.length;i+=1){const r=t[i];r==='"'?s&&t[i+1]==='"'?(n+='"',i+=1):s=!s:r===";"&&!s?(a.push(n.trim()),n=""):(r===`
`||r==="\r")&&!s?(r==="\r"&&t[i+1]===`
`&&(i+=1),a.push(n.trim()),a.some(Boolean)&&e.push(a),a=[],n=""):n+=r}return a.push(n.trim()),a.some(Boolean)&&e.push(a),e}function _a(t){const e=Sa(t.replace(/^\uFEFF/,"")),a=e.shift()?.map(l=>l.trim())??[],n=["number","name","length","width","height","basePrice","active"];if(!n.every(l=>a.includes(l)))throw new Error(`Потрібні колонки: ${n.join(", ")}`);const s=Object.fromEntries(a.map((l,g)=>[l,g])),i=K(),r=new Map(i.map(l=>[l.number.toLocaleLowerCase("uk-UA"),l])),o=e.map(l=>{const g=E=>l[s[E]]?.trim()??"",f=g("number"),v=E=>Number(g(E).replace(",",".")),b={length:v("length"),width:v("width"),height:v("height")},P=v("basePrice");if(!be.test(f)||!Object.values(b).every(E=>Number.isFinite(E)&&E>0)||!Number.isFinite(P)||P<=0)throw new Error(`Некоректні дані для коробки ${f||"без номера"}.`);const I=r.get(f.toLocaleLowerCase("uk-UA")),H=g("active").toLocaleLowerCase("uk-UA");return{...I,id:I?.id??`box-${f.toLocaleLowerCase("uk-UA").replace(/[^a-zа-яіїєґ0-9]+/giu,"-")}-${Date.now().toString(36)}`,number:f,name:g("name")||I?.name||`Самозбірна коробка №${f}`,dimensions:b,basePrice:P,active:!["false","0","ні","no"].includes(H),updatedAt:new Date().toISOString()}}),c=new Set(o.map(l=>l.number.toLocaleLowerCase("uk-UA")));return[...i.filter(l=>!c.has(l.number.toLocaleLowerCase("uk-UA"))),...o]}async function qa(t){const e=t.files?.[0];if(e)try{const a=_a(await e.text());if(!window.confirm(`Імпортувати ${a.length} товарів? Позиції з однаковими номерами буде оновлено.`))return;if(k){const n=await q.adminProducts();for(const s of a){const i=n.find(r=>r.id===s.id||r.number.toLocaleLowerCase("uk-UA")===s.number.toLocaleLowerCase("uk-UA"));i?await q.updateProduct(i.id,s):await q.createProduct({number:s.number,name:s.name,dimensions:s.dimensions,basePrice:s.basePrice,sourceQuantity:s.sourceQuantity,active:s.active})}F(await q.adminProducts()),j(),S="CSV імпортовано на сервер. Каталог оновлено.",y();return}F(a),j(),S="CSV імпортовано. Каталог оновлено.",y()}catch(a){S=a instanceof Error?a.message:"Не вдалося прочитати CSV.",y()}finally{t.value=""}}function Kt(){const t=document.querySelector("#admin-page"),e=document.querySelector("#account-page"),a=document.querySelector("#main"),n=document.querySelector(".site-header"),s=document.querySelector(".site-footer"),i=document.querySelector(".demo-strip"),r=["#admin","#admin-orders","#admin-clients","#admin-products"].includes(window.location.hash),o=window.location.hash==="#account";t&&(t.hidden=!r),e&&(e.hidden=!o),a&&(a.hidden=r||o),n&&(n.hidden=r||o),s&&(s.hidden=r||o),i&&(i.hidden=r||o),document.body.classList.toggle("is-admin",r),document.body.classList.toggle("is-account",o),r?(y(),k&&At()&&Ht().then(()=>y()).catch(c=>{S=N(c,"Не вдалося оновити дані адмінки."),y()}),window.scrollTo({top:0})):o&&(V(),k&&At()&&Ht().then(()=>{W(),V()}).catch(()=>{}),window.scrollTo({top:0}))}function xa(){const t=document.querySelectorAll(".reveal");if(!("IntersectionObserver"in window)){t.forEach(a=>a.classList.add("is-visible"));return}const e=new IntersectionObserver(a=>{a.forEach(n=>{n.isIntersecting&&(n.target.classList.add("is-visible"),e.unobserve(n.target))})},{threshold:.12});t.forEach(a=>e.observe(a))}document.querySelector("#menu-button")?.addEventListener("click",t=>{const e=t.currentTarget,a=document.querySelector("#site-nav"),n=e.getAttribute("aria-expanded")!=="true";e.setAttribute("aria-expanded",String(n)),a?.classList.toggle("is-open",n)});document.querySelectorAll(".site-nav a").forEach(t=>{t.addEventListener("click",()=>{document.querySelector("#site-nav")?.classList.remove("is-open"),document.querySelector("#menu-button")?.setAttribute("aria-expanded","false")})});document.querySelector('.site-header .brand[href="#top"]')?.addEventListener("click",t=>{t.preventDefault(),window.location.hash!=="#top"&&(window.history.pushState(null,"","#top"),Kt()),window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})});document.querySelector("#fit-form")?.addEventListener("submit",t=>{t.preventDefault();const e=t.currentTarget;e.classList.add("was-validated");const a=document.querySelector("#fit-message");if(!e.reportValidity()){a&&(a.textContent="Вкажіть три додатні розміри.",a.className="form-message is-error");return}const n=new FormData(e);x={length:Number(n.get("length")),width:Number(n.get("width")),height:Number(n.get("height"))};const s=Number(n.get("fitMargin"));T=s===5||s===10?s:0,qe(x,T),X=!1,a&&(a.textContent=`Розміри застосовано · ${nt(T)}.`,a.className="form-message is-success"),gt(),window.setTimeout(()=>document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth"}),180)});document.querySelector("#catalog-search")?.addEventListener("input",t=>{Mt=t.currentTarget.value,X=!1,gt()});const et=document.querySelector("#catalog-sort"),ct=et?.querySelector(".catalog-sort__trigger"),pt=et?.querySelector(".catalog-sort__menu"),Y=Array.from(et?.querySelectorAll("[data-sort-value]")??[]);function Jt(t=!1){!ct||!pt||(ct.setAttribute("aria-expanded","false"),pt.hidden=!0,et?.classList.remove("is-open"),t&&ct.focus())}function Me(){!ct||!pt||(ct.setAttribute("aria-expanded","true"),pt.hidden=!1,et?.classList.add("is-open"))}function Aa(t){const e=Y.find(n=>n.dataset.sortValue===t),a=document.querySelector("#catalog-sort-value");!e||!et||!a||(Xt=t,et.dataset.value=t,a.textContent=e.querySelector("span")?.textContent??e.textContent,Y.forEach(n=>{n.setAttribute("aria-selected",String(n===e))}),Jt(!0),gt())}ct?.addEventListener("click",()=>{pt?.hidden?Me():Jt()});Y.forEach(t=>{t.addEventListener("click",()=>{Aa(t.dataset.sortValue)})});et?.addEventListener("keydown",t=>{const e=Y.indexOf(document.activeElement),a=Y.findIndex(s=>s.getAttribute("aria-selected")==="true");if(t.key==="Escape"){t.preventDefault(),Jt(!0);return}if(t.key!=="ArrowDown"&&t.key!=="ArrowUp"&&t.key!=="Home"&&t.key!=="End")return;t.preventDefault(),pt?.hidden&&Me();let n=e>=0?e:a;t.key==="Home"&&(n=0),t.key==="End"&&(n=Y.length-1),t.key==="ArrowDown"&&(n=(n+1)%Y.length),t.key==="ArrowUp"&&(n=(n-1+Y.length)%Y.length),Y[n]?.focus()});document.addEventListener("click",t=>{et?.contains(t.target)||Jt()});document.querySelector("#reset-catalog")?.addEventListener("click",()=>{x=null,T=0,Mt="",X=!1;const t=document.querySelector("#catalog-search");t&&(t.value="");const e=document.querySelector("#fit-message");e&&(e.textContent=""),localStorage.removeItem(u.fit),gt()});document.querySelector("#catalog-more-button")?.addEventListener("click",()=>{X=!X,U(!1),X||document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth",block:"start"})});window.addEventListener("resize",()=>U(!1));document.querySelector("#calculator-product-select")?.addEventListener("change",t=>{se(t.currentTarget.value)});document.querySelector("#hero-product-select")?.addEventListener("change",t=>{se(t.currentTarget.value)});document.querySelector("#quantity-input")?.addEventListener("input",t=>{ot(Number(t.currentTarget.value))});document.querySelector("#hero-quantity-input")?.addEventListener("input",t=>{ot(Number(t.currentTarget.value))});document.querySelector("#request-form")?.addEventListener("submit",t=>{t.preventDefault(),ea(t.currentTarget)});document.addEventListener("click",t=>{const e=t.target;e.closest("[data-order-status-control]")||Dt(),e.closest("[data-admin-calendar]")||Te();const a=e.closest("[data-order-status-trigger]");if(a){const p=a.closest("[data-order-status-control]"),m=p?.querySelector(".order-status-control__menu");if(!p||!m)return;const _=m.hidden;Dt(p),m.hidden=!_,p.classList.toggle("is-open",_),a.setAttribute("aria-expanded",String(_));return}const n=e.closest("[data-order-status-option]");if(n?.dataset.orderId&&n.dataset.orderStatusOption){ua(n.dataset.orderId,n.dataset.orderStatusOption);return}const s=e.closest("[data-calendar-trigger]");if(s){const p=s.closest("[data-admin-calendar]"),m=p?.querySelector(".admin-calendar__popover");if(!p||!m)return;const _=m.hidden;Dt(),m.hidden=!_,p.classList.toggle("is-open",_),s.setAttribute("aria-expanded",String(_));return}const i=e.closest("[data-calendar-month]");if(i?.dataset.calendarMonth){const p=qt(wt||_t(new Date));p.setMonth(p.getMonth()+Number(i.dataset.calendarMonth),1),wt=_t(p),Et(!0,`[data-calendar-month="${i.dataset.calendarMonth}"]`);return}const r=e.closest("[data-calendar-date]");if(r?.dataset.calendarDate){const p=r.dataset.calendarDate;wt=p,!A||L?(A=p,L="",Et(!0,`[data-calendar-date="${p}"]`)):(L=p,L<A&&([A,L]=[L,A]),Et(!1)),xt();return}if(e.closest("[data-calendar-clear]")){A="",L="",Et(!1),xt();return}const o=e.closest("[data-saved-measurement]");if(o?.dataset.savedMeasurement){const p=at().find(m=>m.id===o.dataset.savedMeasurement);p&&Fe(p);return}if(e.closest("[data-clear-measurements]")){localStorage.removeItem(u.measurements),_e(),V();return}if(e.closest("[data-use-tight-fit]")&&x){T=0,qe(x,T);const p=document.querySelector('#fit-form input[name="fitMargin"][value="0"]');p&&(p.checked=!0),gt();return}const c=e.closest("[data-open-product]");if(c?.dataset.openProduct){le(c.dataset.openProduct);return}const l=e.closest("[data-quantity]");if(l?.dataset.quantity){ot(Number(l.dataset.quantity));return}const g=e.closest("[data-quantity-step]");if(g?.dataset.quantityStep){ot(w+Number(g.dataset.quantityStep));return}if(e.closest("[data-product-to-cart]")){ue(lt??tt,w),St();return}if(e.closest("[data-add-selected-to-cart]")){ue(tt,w);return}const f=e.closest("[data-cart-step]");if(f?.dataset.cartProduct&&f.dataset.cartStep){const p=z().find(m=>m.productId===f.dataset.cartProduct);p&&Ae(p.productId,p.quantity+Number(f.dataset.cartStep));return}const v=e.closest("[data-edit-cart]");if(v?.dataset.editCart){const p=z().find(m=>m.productId===v.dataset.editCart);p&&(ot(p.quantity),le(p.productId));return}if(e.closest("[data-clear-cart]")){window.confirm("Очистити всі позиції кошика?")&&(h(u.cart,[]),G());return}const b=e.closest("[data-repeat-order]");if(b?.dataset.repeatOrder){Je(b.dataset.repeatOrder);return}const P=e.closest("[data-remove-cart]");if(P?.dataset.removeCart){Ke(P.dataset.removeCart);return}if(e.closest("[data-product-to-calculator]")){St(()=>{window.location.hash="calculator",document.querySelector("#calculator")?.scrollIntoView({behavior:"smooth",block:"start"})});return}if(e.closest("[data-close-dialog]")){St();return}if(e.closest("[data-edit-profile]")){Ye();return}if(e.closest("[data-close-profile]")){document.querySelector("#profile-dialog")?.close();return}const H=e.closest("[data-auth-tab]");if(H?.dataset.authTab){const p=H.closest(".auth-forms");p?.querySelectorAll("[data-auth-tab]").forEach(m=>{const _=m.dataset.authTab===H.dataset.authTab;m.classList.toggle("is-active",_),m.setAttribute("aria-selected",String(_))}),p?.querySelectorAll("[data-auth-panel]").forEach(m=>{m.hidden=m.dataset.authPanel!==H.dataset.authTab});return}if(e.closest("#logout-button")){k&&q.logout().catch(()=>dt()),localStorage.removeItem(u.session),W(),J(),U(!1),V();return}if(e.closest("[data-create-product]")){fe();return}const E=e.closest("[data-edit-product]");if(E?.dataset.editProduct){fe(E.dataset.editProduct);return}if(e.closest("[data-close-admin-product]")){document.querySelector("#admin-product-dialog")?.close();return}const Ct=e.closest("[data-toggle-product]");if(Ct?.dataset.toggleProduct){const p=K(),m=p.find(_=>_.id===Ct.dataset.toggleProduct);if(m){if(k){q.updateProduct(m.id,{active:!m.active}).then(_=>{F(p.map(re=>re.id===m.id?_:re)),j(),S=_.active?`Товар №${_.number} повернуто на сайт.`:`Товар №${_.number} приховано.`,y()}).catch(_=>{S=N(_,"Не вдалося змінити видимість товару."),y()});return}m.active&&M().length<=1?S="У каталозі має залишитися хоча б один активний товар.":(m.active=!m.active,m.updatedAt=new Date().toISOString(),F(p),j(),S=m.active?`Товар №${m.number} повернуто на сайт.`:`Товар №${m.number} приховано.`),y()}return}const ht=e.closest("[data-delete-product]");if(ht?.dataset.deleteProduct){const p=K(),m=p.find(_=>_.id===ht.dataset.deleteProduct);if(!m)return;if(m.active&&M().length<=1){S="Не можна видалити останній активний товар.",y();return}if(window.confirm(`Видалити коробку №${m.number}? Цю дію не можна скасувати.`)){if(k){q.deleteProduct(m.id).then(()=>{F(p.filter(_=>_.id!==m.id)),h(u.cart,z().filter(_=>_.productId!==m.id)),j(),S=`Товар №${m.number} видалено.`,y()}).catch(_=>{S=N(_,"Не вдалося видалити товар."),y()});return}F(p.filter(_=>_.id!==m.id)),h(u.cart,z().filter(_=>_.productId!==m.id)),j(),S=`Товар №${m.number} видалено.`,y()}return}const bt=e.closest("[data-delete-order]");if(bt?.dataset.deleteOrder){const p=B().find(m=>m.id===bt.dataset.deleteOrder);if(!p)return;if(window.confirm(`Видалити заявку ${p.id} від ${p.customerName}? Цю дію не можна скасувати.`)){if(k){q.deleteOrder(p.id).then(()=>{h(u.orders,B().filter(m=>m.id!==p.id)),S=`Заявку ${p.id} видалено.`,y()}).catch(m=>{S=N(m,"Не вдалося видалити заявку."),y()});return}h(u.orders,B().filter(m=>m.id!==p.id)),S=`Заявку ${p.id} видалено.`,y()}return}const vt=e.closest("[data-product-filter]");if(vt?.dataset.productFilter){rt=vt.dataset.productFilter,y();return}const yt=e.closest("[data-admin-order-filter]");if(yt?.dataset.adminOrderFilter){Ut=yt.dataset.adminOrderFilter,document.querySelectorAll("[data-admin-order-filter]").forEach(p=>{p.classList.toggle("is-active",p===yt)}),xt();return}if(e.closest("[data-export-backup]")){if(k){q.backup().then(p=>{ge(`toffipacks-server-backup-${new Date().toISOString().slice(0,10)}.json`,p)}).catch(p=>{S=N(p,"Не вдалося завантажити серверну копію."),y()});return}ge(`toffipacks-backup-${new Date().toISOString().slice(0,10)}.json`,ya());return}if(e.closest("[data-export-products]")){ha(`toffipacks-products-${new Date().toISOString().slice(0,10)}.csv`,va(),"text/csv;charset=utf-8");return}if(e.closest("[data-reset-products]")){if(window.confirm("Відновити початковий каталог? Усі ручні зміни товарів буде втрачено.")){if(k){q.resetProducts().then(p=>{F(p),j(),S="Початковий каталог відновлено.",y()}).catch(p=>{S=N(p,"Не вдалося відновити каталог."),y()});return}F(ee.map(p=>({...p,active:!0,updatedAt:new Date().toISOString()}))),j(),S="Початковий каталог відновлено.",y()}return}if(e.closest("#admin-logout")){k&&q.logout().catch(()=>dt()),localStorage.removeItem(u.session),W(),J(),U(!1),window.location.hash="admin",y();return}});document.addEventListener("keydown",t=>{const e=t.target,a=e.closest("[data-order-status-trigger]");if(a&&(t.key==="ArrowDown"||t.key==="ArrowUp")){t.preventDefault();const o=a.closest("[data-order-status-control]");o?.querySelector(".order-status-control__menu")?.hidden&&a.click();const l=Array.from(o?.querySelectorAll("[data-order-status-option]")??[]),g=Math.max(0,l.findIndex(f=>f.getAttribute("aria-selected")==="true"));l[t.key==="ArrowUp"?Math.max(0,g-1):g]?.focus();return}const n=e.closest("[data-order-status-option]");if(n){const o=n.closest("[data-order-status-control]"),c=Array.from(o?.querySelectorAll("[data-order-status-option]")??[]),l=c.indexOf(n);if(t.key==="Escape"){t.preventDefault(),Dt(),o?.querySelector("[data-order-status-trigger]")?.focus();return}if(!["ArrowDown","ArrowUp","Home","End"].includes(t.key))return;t.preventDefault();let g=l;t.key==="ArrowDown"&&(g=(l+1)%c.length),t.key==="ArrowUp"&&(g=(l-1+c.length)%c.length),t.key==="Home"&&(g=0),t.key==="End"&&(g=c.length-1),c[g]?.focus();return}const s=e.closest("[data-admin-calendar]");if(s&&t.key==="Escape"){t.preventDefault(),Te(),s.querySelector("[data-calendar-trigger]")?.focus();return}const i=e.closest("[data-calendar-trigger]");if(i&&t.key==="ArrowDown"){t.preventDefault(),s?.querySelector(".admin-calendar__popover")?.hidden&&i.click(),(s?.querySelector("[data-calendar-date].is-selected")??s?.querySelector("[data-calendar-date].is-today")??s?.querySelector("[data-calendar-date]:not(.is-outside)"))?.focus();return}const r=e.closest("[data-calendar-date]");if(r&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(t.key)){t.preventDefault();const o=Array.from(s?.querySelectorAll("[data-calendar-date]")??[]),c=o.indexOf(r),l=t.key==="ArrowLeft"?-1:t.key==="ArrowRight"?1:t.key==="ArrowUp"?-7:7;o[c+l]?.focus()}});document.addEventListener("input",t=>{const e=t.target;if(e instanceof HTMLInputElement&&e.id==="modal-quantity-input"){ot(Number(e.value));return}if(e instanceof HTMLInputElement&&e.id==="admin-product-search"){ae=e.value,ma();return}if(e instanceof HTMLInputElement&&e.id==="admin-order-search"){ne=e.value,xt();return}if(e instanceof HTMLInputElement&&e.id==="admin-client-search"){pa(e.value);return}if(e instanceof HTMLInputElement&&e.name==="basePrice"&&e.closest("#admin-product-form")){const a=Number(e.value)||0,n={...Qt(),basePrice:a},s=e.closest("form")?.querySelector(".admin-editor-price-preview"),i=s?.querySelector("strong"),r=s?.querySelector("small");i&&(i.textContent=$(D(n,1))),r&&(r.textContent=`опт: ${$(D(n,Q))}`)}});document.addEventListener("submit",t=>{const e=t.target;e instanceof HTMLFormElement&&(e.id==="login-form"?(t.preventDefault(),pe(e)):e.id==="register-form"?(t.preventDefault(),ta(e)):e.id==="admin-login-form"?(t.preventDefault(),pe(e,!0)):e.id==="admin-product-form"?(t.preventDefault(),ga(e)):e.id==="profile-form"&&(t.preventDefault(),Xe(e)))});document.addEventListener("change",t=>{const e=t.target;if(e instanceof HTMLInputElement&&e.matches("[data-import-products]")){qa(e);return}if(e instanceof HTMLInputElement&&e.matches("[data-import-backup]")){wa(e);return}if(e instanceof HTMLTextAreaElement&&e.dataset.orderNote){const a=B(),n=a.find(s=>s.id===e.dataset.orderNote);n&&(n.managerNote=e.value.trim(),h(u.orders,a),k&&q.updateOrder(n.id,{managerNote:n.managerNote}).then(s=>{h(u.orders,a.map(i=>i.id===s.id?s:i))}).catch(s=>{S=N(s,"Не вдалося зберегти нотатку менеджера."),y()}));return}if(e instanceof HTMLInputElement||e instanceof HTMLSelectElement){if(e instanceof HTMLInputElement&&e.dataset.cartQuantity){Ae(e.dataset.cartQuantity,Number(e.value));return}if(e instanceof HTMLInputElement&&e.dataset.partnerToggle){const a=R(),n=a.find(s=>s.id===e.dataset.partnerToggle);if(n){if(n.partner=e.checked,h(u.accounts,a),k){q.updateClient(n.id,{partner:n.partner}).then(s=>{h(u.accounts,a.map(i=>i.id===s.id?s:i)),y()}).catch(s=>{S=N(s,"Не вдалося змінити статус клієнта."),y()});return}y()}return}if(e instanceof HTMLInputElement&&e.dataset.partnerMarkup){const a=R(),n=a.find(s=>s.id===e.dataset.partnerMarkup);if(n){if(n.fixedMarkup=Math.min(.99,Math.max(0,Number(e.value)||0)),h(u.accounts,a),k){q.updateClient(n.id,{fixedMarkup:n.fixedMarkup}).then(s=>{h(u.accounts,a.map(i=>i.id===s.id?s:i)),y()}).catch(s=>{S=N(s,"Не вдалося зберегти персональну ціну."),y()});return}y()}}}});document.querySelector("#product-dialog")?.addEventListener("click",t=>{t.target===t.currentTarget&&St()});document.querySelector("#product-dialog")?.addEventListener("cancel",t=>{t.preventDefault(),St()});document.querySelector("#admin-product-dialog")?.addEventListener("click",t=>{t.target===t.currentTarget&&t.currentTarget.close()});document.querySelector("#profile-dialog")?.addEventListener("click",t=>{t.target===t.currentTarget&&t.currentTarget.close()});window.addEventListener("hashchange",Kt);async function ka(){if(k){document.body.dataset.backend="loading";try{F(await q.products()),At()&&await Ht(),document.body.dataset.backend="online",j(),W(),Kt()}catch(t){document.body.dataset.backend="offline",console.error("ToffiPacks backend is unavailable:",t),window.location.hash.startsWith("#admin")&&(S="Сервер тимчасово недоступний. Дані не змінено.",y())}}}U(!0);window.setTimeout(()=>U(!1),460);J();W();Kt();xa();ka();"serviceWorker"in navigator&&window.location.protocol==="https:"&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});
