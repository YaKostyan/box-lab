(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const Ye={},Jt="toffipacks-api-session-v1",Xe=Ye,xe=String(Xe?.VITE_API_BASE_URL??"").trim().replace(/\/$/,""),P=!!xe;class Tt extends Error{status;code;constructor(e,a,n="request_error"){super(a),this.status=e,this.code=n}}function rt(){localStorage.removeItem(Jt)}function ft(){return!!localStorage.getItem(Jt)}async function I(t,e={}){if(!P)throw new Tt(0,"Backend API is not configured.","api_disabled");const a=localStorage.getItem(Jt),n=await fetch(`${xe}${t}`,{...e,headers:{Accept:"application/json",...e.body?{"Content-Type":"application/json"}:{},...a?{Authorization:`Bearer ${a}`}:{},...e.headers}}),s=await n.json().catch(()=>({}));if(!n.ok)throw n.status===401&&rt(),new Tt(n.status,s.error?.message??"Сервер не зміг виконати запит.",s.error?.code);return s}async function ge(t,e){const a=await I(t,{method:"POST",body:JSON.stringify(e)});return localStorage.setItem(Jt,a.token),a.account}const k={products:async()=>(await I("/api/products")).products,login:(t,e)=>ge("/api/auth/login",{phone:t,password:e}),register:t=>ge("/api/auth/register",t),me:async()=>(await I("/api/auth/me")).account,updateMe:async t=>(await I("/api/auth/me",{method:"PATCH",body:JSON.stringify(t)})).account,logout:async()=>{try{await I("/api/auth/logout",{method:"POST"})}finally{rt()}},createOrder:async t=>(await I("/api/orders",{method:"POST",body:JSON.stringify(t)})).order,myOrders:async()=>(await I("/api/me/orders")).orders,adminProducts:async()=>(await I("/api/admin/products")).products,createProduct:async t=>(await I("/api/admin/products",{method:"POST",body:JSON.stringify(t)})).product,updateProduct:async(t,e)=>(await I(`/api/admin/products/${encodeURIComponent(t)}`,{method:"PATCH",body:JSON.stringify(e)})).product,deleteProduct:t=>I(`/api/admin/products/${encodeURIComponent(t)}`,{method:"DELETE"}),resetProducts:async()=>(await I("/api/admin/products/reset",{method:"POST"})).products,adminOrders:async()=>(await I("/api/admin/orders")).orders,updateOrder:async(t,e)=>(await I(`/api/admin/orders/${encodeURIComponent(t)}`,{method:"PATCH",body:JSON.stringify(e)})).order,deleteOrder:t=>I(`/api/admin/orders/${encodeURIComponent(t)}`,{method:"DELETE"}),adminClients:async()=>(await I("/api/admin/clients")).clients,updateClient:async(t,e)=>(await I(`/api/admin/clients/${encodeURIComponent(t)}`,{method:"PATCH",body:JSON.stringify(e)})).client,backup:()=>I("/api/admin/backup")},Ct=5e4,z=1e3,Ge=2,ta=1,Mt=.5,Wt=[{id:"box-301",number:"301",name:"Самозбірна коробка №301",dimensions:{length:165,width:100,height:30},basePrice:5,sourceQuantity:1e3},{id:"box-302",number:"302",name:"Самозбірна коробка №302",dimensions:{length:130,width:130,height:50},basePrice:7,sourceQuantity:800},{id:"box-303",number:"303",name:"Самозбірна коробка №303",dimensions:{length:190,width:150,height:100},basePrice:17,sourceQuantity:800},{id:"box-304",number:"304",name:"Самозбірна коробка №304",dimensions:{length:230,width:150,height:35},basePrice:11,sourceQuantity:800},{id:"box-305",number:"305",name:"Самозбірна коробка №305",dimensions:{length:160,width:85,height:110},basePrice:6.5},{id:"box-306",number:"306",name:"Самозбірна коробка №306",dimensions:{length:145,width:145,height:40},basePrice:6.5,sourceQuantity:1e3},{id:"box-307",number:"307",name:"Самозбірна коробка №307",dimensions:{length:280,width:180,height:100},basePrice:18,sourceQuantity:500},{id:"box-308",number:"308",name:"Самозбірна коробка №308",dimensions:{length:250,width:180,height:40},basePrice:12,sourceQuantity:800},{id:"box-309",number:"309",name:"Самозбірна коробка №309",dimensions:{length:210,width:150,height:50},basePrice:11,sourceQuantity:900},{id:"box-310",number:"310",name:"Самозбірна коробка №310",dimensions:{length:260,width:260,height:50},basePrice:15,sourceQuantity:600},{id:"box-311",number:"311",name:"Самозбірна коробка №311",dimensions:{length:370,width:170,height:100},basePrice:17},{id:"box-101",number:"101",name:"Самозбірна коробка №101",dimensions:{length:178,width:115,height:48},basePrice:4,sourceQuantity:800}],ea=[{question:"Як відбувається доставка?",answer:"Доставляємо по Києву та Київській області. Формат, точну адресу й вартість потрібно уточнити з менеджером під час підтвердження заявки."},{question:"Які строки виготовлення?",answer:"Строк залежить від розміру коробки, тиражу та завантаження виробництва. Менеджер називає точну дату до запуску замовлення."},{question:"Що отримує постійний клієнт?",answer:"Після підтвердження менеджером у кабінеті активується персональна ціна. Вона автоматично відображається в каталозі, калькуляторі та кошику."},{question:"Як проходить оплата?",answer:"Форму оплати, рахунок і підсумкову суму менеджер погоджує з вами до початку виготовлення."},{question:"Чи працюєте ви з малим і великим бізнесом?",answer:"Так. Можна почати з невеликої партії або замовити регулярний великий тираж. Калькулятор рахує до 50 000 коробок, більший обсяг прораховує менеджер."},{question:"Чи робите коробки під індивідуальний запит?",answer:"Так. Якщо серед готових розмірів немає потрібного, вкажіть габарити й особливості замовлення в коментарі. Менеджер уточнить деталі та підготує розрахунок."}],Pe=[{id:"find-size",question:"Як підібрати розмір?",answer:"Введіть довжину, ширину та висоту предмета. Сайт порівняє всі три сторони й покаже найкомпактніші коробки, у які він поміститься.",actionLabel:"Підібрати коробку",actionHref:"#fit"},{id:"calculate-price",question:"Як дізнатися ціну?",answer:"Оберіть коробку та вкажіть кількість від 1 до 50 000 штук. Калькулятор одразу покаже ціну за одиницю та за весь тираж.",actionLabel:"Розрахувати ціну",actionHref:"#calculator"},{id:"delivery",question:"Як працює доставка?",answer:"Доставляємо по Києву та Київській області. Формат, адресу й вартість менеджер погоджує під час підтвердження заявки.",actionLabel:"Умови доставки",actionHref:"#delivery"},{id:"lead-time",question:"Які строки виготовлення?",answer:"Строк залежить від розміру, тиражу та завантаження виробництва. Точну дату менеджер назве до запуску замовлення.",actionLabel:"Залишити заявку",actionHref:"#request"},{id:"personal-price",question:"Де побачити мої ціни?",answer:"Увійдіть до кабінету за номером телефону. Якщо менеджер призначив персональні ціни, вони автоматично з’являться в кабінеті, каталозі, калькуляторі та кошику.",actionLabel:"Відкрити кабінет",actionHref:"#account"},{id:"custom-size",question:"Немає потрібного розміру?",answer:"Опишіть потрібні габарити, кількість та особливості у коментарі до заявки. Менеджер уточнить деталі й підготує окремий розрахунок.",actionLabel:"Описати запит",actionHref:"#request"}];function y(t){return new Intl.NumberFormat("uk-UA",{style:"currency",currency:"UAH",minimumFractionDigits:Number.isInteger(t)?0:2,maximumFractionDigits:2}).format(t)}function D(t,e){return t.basePrice+(e>=z?ta:Ge)}function vt(t,e,a){const n=ot(t,a);return n!==null?n:D(t,e)}function ot(t,e){if(!e?.partner)return null;const a=Number(e.productPrices?.[t.id]);return Number.isFinite(a)&&a>0?a:null}function Rt(t){const{length:e,width:a,height:n}=t.dimensions;return e*a*n}function Zt(t,e,a=0){const n=[t.length,t.width,t.height].sort((u,o)=>o-u),s=[e.length,e.width,e.height].sort((u,o)=>o-u),i=n.map((u,o)=>(s[o]-u)/2),r=i.map(u=>Math.max(0,a-u));return{fits:r.every(u=>u===0),clearancesPerSide:i,deficitsPerSide:r}}const f={accounts:"toffipacks-accounts-v3",orders:"toffipacks-orders-v3",session:"toffipacks-session-v3",cart:"toffipacks-cart-v1",products:"toffipacks-products-v1",fit:"toffipacks-fit-v1",measurements:"toffipacks-measurements-v1"},Le=/^[\p{L}\p{N}._-]+$/u,Et=new Date().toISOString(),Te=()=>Object.fromEntries(Wt.map(t=>[t.id,Math.round((t.basePrice+Mt)*100)/100])),Ce=[{id:"account-admin",name:"Адміністратор ToffiPacks",phone:"+380000000001",company:"ToffiPacks",password:"admin123",role:"admin",partner:!1,fixedMarkup:Mt,productPrices:{},createdAt:Et},{id:"account-partner",name:"Постійний клієнт",phone:"+380671112233",company:"",password:"client123",role:"client",partner:!0,fixedMarkup:Mt,productPrices:Te(),createdAt:Et}],Me=[];function yt(t,e){try{const a=localStorage.getItem(t);return a?JSON.parse(a):e}catch{return e}}function v(t,e){localStorage.setItem(t,JSON.stringify(e))}function aa(){localStorage.getItem(f.accounts)||v(f.accounts,Ce),localStorage.getItem(f.orders)||v(f.orders,Me),localStorage.getItem(f.cart)||v(f.cart,[]),localStorage.getItem(f.products)||v(f.products,Wt.map(t=>({...t,active:!0,updatedAt:Et})))}aa();P&&(v(f.accounts,[]),v(f.orders,[]),ft()||localStorage.removeItem(f.session));const Ee=yt(f.fit,null),qt=Ee?.dimensions,na=qt&&[qt.length,qt.width,qt.height].every(t=>Number.isFinite(t)&&t>0),ne=Ee?.margin;let tt="box-101",S=500,Ot="",ie="size",X=!1,A=na?qt:null,C=ne===5||ne===10?ne:0,he,gt=null,ce="",lt="all",de="",Vt="Усі",x="",L="",kt="",q="";const it=new Set;let be="",ve;const Ie=document.querySelector("#app");if(!Ie)throw new Error("Root element #app was not found.");function J(){return yt(f.accounts,Ce).map(t=>({...t,productPrices:t.productPrices&&typeof t.productPrices=="object"?t.productPrices:t.partner?Te():{}}))}function O(){const t=Wt.map(e=>({...e,active:!0,updatedAt:Et}));return yt(f.products,t).filter(e=>e&&typeof e.id=="string"&&typeof e.number=="string"&&Number.isFinite(e.basePrice)&&Number.isFinite(e.dimensions?.length)&&Number.isFinite(e.dimensions?.width)&&Number.isFinite(e.dimensions?.height)).map(e=>({...e,active:e.active!==!1,updatedAt:e.updatedAt||Et}))}function M(){return O().filter(t=>t.active)}function F(t){v(f.products,t)}function K(){return yt(f.orders,Me).map(e=>{if("items"in e&&Array.isArray(e.items))return{...e,statusHistory:Array.isArray(e.statusHistory)&&e.statusHistory.length?e.statusHistory:[{status:e.status,at:e.createdAt}]};const a=e;return{id:a.id,createdAt:a.createdAt,customerName:a.customerName,phone:a.phone,company:a.company,comment:a.comment,items:[{productId:a.productId,productNumber:a.productNumber,dimensions:a.dimensions,quantity:a.quantity,unitPrice:a.unitPrice,total:a.total,priceType:a.priceType}],total:a.total,accountId:a.accountId,status:a.status,statusHistory:[{status:a.status,at:a.createdAt}]}})}function Z(){const t=M();return yt(f.cart,[]).filter(e=>t.some(a=>a.id===e.productId)&&e.quantity>0)}function R(){const t=localStorage.getItem(f.session);return J().find(e=>e.id===t)??null}function Nt(t){const e={...t},a=J().filter(n=>n.id!==t.id&&n.role!==t.role);return v(f.accounts,[e,...a]),localStorage.setItem(f.session,e.id),e}function sa(t,e,a,n){v(f.accounts,[t,...e]),v(f.orders,a),F(n),localStorage.setItem(f.session,t.id)}async function Qt(){if(!P||!ft())return null;try{const t=await k.me();if(t.role==="admin"){const[e,a,n]=await Promise.all([k.adminClients(),k.adminOrders(),k.adminProducts()]);sa(t,e,a,n)}else{const[e,a]=await Promise.all([k.myOrders(),k.products()]);Nt(t),v(f.orders,e),F(a)}return t}catch(t){if(t instanceof Tt&&t.status===401)return rt(),localStorage.removeItem(f.session),null;throw t}}function $t(){const t=M();return t.find(e=>e.id===tt)??t[0]}function It(t){return Number.isFinite(t)?Math.min(Ct,Math.max(1,Math.round(t))):1}function nt(){return yt(f.measurements,[]).filter(t=>t&&typeof t.id=="string"&&[t.dimensions?.length,t.dimensions?.width,t.dimensions?.height].every(e=>Number.isFinite(e)&&Number(e)>0)&&[0,5,10].includes(t.margin))}function ct(t){return t===0?"без додаткового запасу":`+${t} мм з кожного боку`}function De(){const t=nt();return t.length?`
    <div class="saved-measurements__head"><span>Збережені розміри</span><button type="button" data-clear-measurements>Очистити</button></div>
    <div class="saved-measurements__list">
      ${t.map(e=>`
            <button type="button" data-saved-measurement="${c(e.id)}">
              <strong>${E(e.dimensions)}</strong>
              <span>${ct(e.margin)}</span>
            </button>
          `).join("")}
    </div>
  `:""}function Oe(){const t=document.querySelector("#saved-measurements");t&&(t.innerHTML=De(),t.hidden=!t.innerHTML)}function Ne(t,e){const a=`${t.length}-${t.width}-${t.height}-${e}`,n=nt().filter(i=>`${i.dimensions.length}-${i.dimensions.width}-${i.dimensions.height}-${i.margin}`!==a),s={id:`size-${a}`,dimensions:t,margin:e,createdAt:new Date().toISOString()};v(f.measurements,[s,...n].slice(0,5)),v(f.fit,{dimensions:t,margin:e}),Oe()}function ia(t,e=!0){A={...t.dimensions},C=t.margin,v(f.fit,{dimensions:A,margin:C});const a=document.querySelector("#fit-form");if(a){a.elements.namedItem("length")?.setAttribute("value",String(A.length)),a.elements.namedItem("width")?.setAttribute("value",String(A.width)),a.elements.namedItem("height")?.setAttribute("value",String(A.height));const s=r=>{const u=a.elements.namedItem(r);u instanceof HTMLInputElement&&(u.value=String(A?.[r]??""))};s("length"),s("width"),s("height");const i=a.querySelector(`input[name="fitMargin"][value="${C}"]`);i&&(i.checked=!0)}const n=document.querySelector("#fit-message");n&&(n.textContent=`Розміри застосовано · ${ct(C)}.`,n.className="form-message is-success"),X=!1,St(),e&&window.setTimeout(()=>document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth"}),180)}function Dt(t){let e=t.replace(/\D/g,"");return e.length===10&&e.startsWith("0")&&(e=`38${e}`),e.length===12&&e.startsWith("380")?`+${e}`:t.trim()}function ht(t){return Dt(t).replace(/\D/g,"")}function c(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function E(t){return`${t.length} × ${t.width} × ${t.height} мм`}function zt(t){const e=t%100,a=t%10;return e>=11&&e<=14?`${t} позицій`:a===1?`${t} позиція`:a>=2&&a<=4?`${t} позиції`:`${t} позицій`}function Yt(t,e,a){return ot(a,e)!==null?"Персональна ціна":t>=z?"Оптова ціна":"Роздрібна ціна"}function wt(t,e=!1){const{length:a,width:n,height:s}=t.dimensions,i=170+Math.min(100,a/3),r=58+Math.min(54,s/2.5),u=50+Math.min(44,n/4),o=72,l=e?70:82,g=l-u*.55,d=o+i,m=d+u,h=l+r;return`
    <svg class="box-visual${e?" box-visual--compact":""}" viewBox="0 0 470 270" role="img"
      aria-label="Схема коробки ${c(t.number)}, ${E(t.dimensions)}">
      <g class="box-visual__shape">
        <polygon class="box-visual__top" points="${o},${l} ${o+u},${g} ${m},${g} ${d},${l}" />
        <polygon class="box-visual__side" points="${d},${l} ${m},${g} ${m},${g+r} ${d},${h}" />
        <rect class="box-visual__front" x="${o}" y="${l}" width="${i}" height="${r}" />
        <rect class="box-visual__mark" x="${o+i*.35}" y="${l+r*.32}"
          width="${i*.3}" height="${Math.max(24,r*.34)}" rx="5" />
        <text class="box-visual__number" x="${o+i/2}" y="${l+r*.56}">№${c(t.number)}</text>
      </g>
      <g class="dimension-line dimension-line--length">
        <line x1="${o}" y1="${h+28}" x2="${d}" y2="${h+28}" />
        <line x1="${o}" y1="${h+20}" x2="${o}" y2="${h+36}" />
        <line x1="${d}" y1="${h+20}" x2="${d}" y2="${h+36}" />
        <rect x="${o+i/2-38}" y="${h+12}" width="76" height="32" rx="16" />
        <text x="${o+i/2}" y="${h+33}">${a} мм</text>
      </g>
      <g class="dimension-line dimension-line--height">
        <line x1="${o-26}" y1="${l}" x2="${o-26}" y2="${h}" />
        <line x1="${o-34}" y1="${l}" x2="${o-18}" y2="${l}" />
        <line x1="${o-34}" y1="${h}" x2="${o-18}" y2="${h}" />
        <rect x="2" y="${l+r/2-16}" width="66" height="32" rx="16" />
        <text x="35" y="${l+r/2+5}">${s} мм</text>
      </g>
      <g class="dimension-line dimension-line--width">
        <line x1="${d+8}" y1="${l-8}" x2="${m+8}" y2="${g-8}" />
        <rect x="${m-54}" y="${Math.max(4,g-48)}" width="76" height="32" rx="16" />
        <text x="${m-16}" y="${Math.max(25,g-27)}">${n} мм</text>
      </g>
    </svg>
  `}function Ue(){return M().slice().sort((t,e)=>t.number.localeCompare(e.number,"uk-UA",{numeric:!0})).map(t=>`<button class="product-picker__option" type="button" role="option" data-product-picker-value="${c(t.id)}" aria-selected="${t.id===tt}">
          <span class="product-picker__number">№${c(t.number)}</span>
          <span class="product-picker__dimensions">${E(t.dimensions)}</span>
          <i aria-hidden="true"></i>
        </button>`).join("")}function ye(t,e=!1){const a=$t();return`
    <div class="product-picker${e?" product-picker--large":""}" id="${t}" data-product-picker data-value="${c(a.id)}">
      <button
        class="product-picker__trigger"
        type="button"
        data-product-picker-trigger
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-controls="${t}-menu"
        aria-labelledby="${t}-label ${t}-value"
      >
        <span class="product-picker__value" id="${t}-value"><b>№${c(a.number)}</b><span>${E(a.dimensions)}</span></span>
        <i class="product-picker__chevron" aria-hidden="true"></i>
      </button>
      <div class="product-picker__menu" id="${t}-menu" role="listbox" aria-labelledby="${t}-label" hidden>
        ${Ue()}
      </div>
    </div>
  `}function ra(){return`
    <section class="support-widget" id="support-widget" aria-label="Швидка підтримка">
      <div class="support-panel" id="support-panel" role="dialog" aria-modal="false" aria-labelledby="support-title" hidden>
        <header class="support-panel__head">
          <div class="support-agent" aria-hidden="true">
            <span class="support-agent__mark">
              <svg viewBox="0 0 32 32">
                <path d="m5.5 10.5 10.5-6 10.5 6v11L16 27.5l-10.5-6v-11Z" />
                <path d="m5.5 10.5 10.5 6 10.5-6M16 16.5v11M10.8 7.5l10.4 6" />
              </svg>
            </span>
          </div>
          <div>
            <strong id="support-title">Помічник ToffiPacks</strong>
            <span><i aria-hidden="true"></i> Відповідає одразу</span>
          </div>
          <button class="support-panel__close" type="button" data-support-close aria-label="Закрити підтримку">×</button>
        </header>

        <div class="support-panel__body">
          <div class="support-conversation" id="support-conversation" aria-live="polite">
            <div class="support-message support-message--bot">
              <span>Вітаю! Допоможу швидко знайти відповідь. Оберіть потрібне питання нижче.</span>
            </div>
          </div>

          <div class="support-questions" aria-label="Готові питання">
            <p>Що вас цікавить?</p>
            <div>
              ${Pe.map((t,e)=>`
                    <button type="button" data-support-topic="${c(t.id)}" aria-pressed="false">
                      <span>${String(e+1).padStart(2,"0")}</span>
                      <strong>${c(t.question)}</strong>
                      <i aria-hidden="true">→</i>
                    </button>
                  `).join("")}
            </div>
          </div>
        </div>

        <footer class="support-panel__foot">
          <span>Готові відповіді без очікування</span>
          <a href="#request" data-support-action>Залишити заявку <i aria-hidden="true">→</i></a>
        </footer>
      </div>

      <button
        class="support-trigger"
        id="support-trigger"
        type="button"
        aria-expanded="false"
        aria-controls="support-panel"
        aria-label="Відкрити швидку підтримку"
      >
        <span class="support-trigger__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M6.5 17.5 3 20v-5.2A8 8 0 0 1 2 11c0-4.4 4.5-8 10-8s10 3.6 10 8-4.5 8-10 8c-2 0-3.9-.5-5.5-1.5Z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/></svg>
        </span>
        <span class="support-trigger__copy"><strong>Допомога</strong><small>Швидкі відповіді</small></span>
        <i class="support-trigger__status" aria-hidden="true"></i>
      </button>
    </section>
  `}function oa(){const t=$t();return`
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
            ${ye("hero-product-picker")}
          </div>
          <label class="field">
            <span>Кількість</span>
            <input class="input" id="hero-quantity-input" type="number" min="1" max="${Ct}" value="${S}" />
          </label>
          <div class="hero-calculator__result">
            <span id="hero-price-label">Роздрібна ціна</span>
            <strong id="hero-total">${y(D(t,S)*S)}</strong>
            <small id="hero-unit">${y(D(t,S))} / шт.</small>
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
                <input class="input" name="length" type="number" min="1" max="2000" value="${A?.length??170}" required />
              </label>
              <span class="dimension-sign" aria-hidden="true">×</span>
              <label class="field">
                <span>Ширина, мм</span>
                <input class="input" name="width" type="number" min="1" max="2000" value="${A?.width??110}" required />
              </label>
              <span class="dimension-sign" aria-hidden="true">×</span>
              <label class="field">
                <span>Висота, мм</span>
                <input class="input" name="height" type="number" min="1" max="2000" value="${A?.height??45}" required />
              </label>
            </div>
            <fieldset class="fit-margin">
              <legend>Запас навколо предмета</legend>
              <div class="fit-margin__options">
                ${[0,5,10].map(e=>`
                      <label>
                        <input type="radio" name="fitMargin" value="${e}"${C===e?" checked":""} />
                        <span>${e===0?"Точно":`+${e} мм / бік`}</span>
                      </label>
                    `).join("")}
              </div>
              <p>Запас додається з обох боків кожної сторони предмета.</p>
            </fieldset>
            <button class="button button--primary" type="submit">Знайти коробку</button>
            <p class="form-message" id="fit-message" aria-live="polite"></p>
            <div class="saved-measurements" id="saved-measurements"${nt().length?"":" hidden"}>${De()}</div>
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
              ${ye("calculator-product-picker",!0)}
            </div>
            <div class="calculator-preview" id="calculator-preview">${wt(t,!0)}</div>
            <div class="quantity-block">
              <div class="quantity-block__label">
                <label for="quantity-input">Кількість</label>
                <output id="quantity-output">${S.toLocaleString("uk-UA")} шт.</output>
              </div>
              <div class="quantity-control">
                <button type="button" data-quantity-step="-100" aria-label="Зменшити кількість на 100">−</button>
                <input id="quantity-input" type="number" min="1" max="${Ct}" value="${S}" />
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
                <strong id="calculator-unit-price">${y(D(t,S))}<small>/ шт.</small></strong>
              </div>
              <div class="calculation-result__total">
                <span>Весь тираж</span>
                <strong id="calculator-total">${y(D(t,S)*S)}</strong>
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
          ${ea.map((e,a)=>`
                <details${a===0?" open":""}>
                  <summary><span>${c(e.question)}</span><i aria-hidden="true"></i></summary>
                  <p>${c(e.answer)}</p>
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

    ${ra()}

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
  `}Ie.innerHTML=oa();function ca(){const t=document.querySelector("#support-panel"),e=document.querySelector("#support-trigger");!t||!e||!t.hidden||(t.hidden=!1,e.setAttribute("aria-expanded","true"),e.setAttribute("aria-label","Закрити швидку підтримку"),window.requestAnimationFrame(()=>{t.classList.add("is-open"),t.querySelector("[data-support-topic]")?.focus({preventScroll:!0})}))}function Ut(t=!0){const e=document.querySelector("#support-panel"),a=document.querySelector("#support-trigger");!e||!a||e.hidden||(e.classList.remove("is-open"),a.setAttribute("aria-expanded","false"),a.setAttribute("aria-label","Відкрити швидку підтримку"),window.setTimeout(()=>{e.classList.contains("is-open")||(e.hidden=!0)},240),t&&a.focus({preventScroll:!0}))}function da(t){const e=Pe.find(n=>n.id===t),a=document.querySelector("#support-conversation");!e||!a||(be=e.id,window.clearTimeout(ve),document.querySelectorAll("[data-support-topic]").forEach(n=>{const s=n.dataset.supportTopic===e.id;n.classList.toggle("is-active",s),n.setAttribute("aria-pressed",String(s))}),a.innerHTML=`
    <div class="support-message support-message--user"><span>${c(e.question)}</span></div>
    <div class="support-message support-message--bot support-message--typing" aria-label="Помічник готує відповідь">
      <i></i><i></i><i></i>
    </div>
  `,a.scrollTo({top:a.scrollHeight,behavior:"smooth"}),ve=window.setTimeout(()=>{be===e.id&&(a.innerHTML=`
      <div class="support-message support-message--user"><span>${c(e.question)}</span></div>
      <div class="support-message support-message--bot support-message--answer">
        <span>${c(e.answer)}</span>
        <a href="${c(e.actionHref)}" data-support-action>${c(e.actionLabel)} <i aria-hidden="true">→</i></a>
      </div>
    `,a.scrollTo({top:a.scrollHeight,behavior:"smooth"}))},460))}const Ft=document.querySelector("#product-grid"),se=document.querySelector("#catalog-count");function re(t){return new Intl.NumberFormat("uk-UA",{maximumFractionDigits:1}).format(Math.max(0,t))}function la(t){if(!A)return"";const e=Zt(A,t.dimensions,C);if(e.fits){const n=Math.min(...e.clearancesPerSide);return`<div class="product-card__fit"><strong>Підходить</strong><span>мін. ${re(n)} мм на бік</span></div>`}const a=Math.max(...e.deficitsPerSide)*2;return`<div class="product-card__fit is-near"><strong>Найближчий розмір</strong><span>бракує до ${re(a)} мм</span></div>`}function ua(t){if(!A)return"";const e=Zt(A,t.dimensions,C);if(e.fits)return`<div class="product-modal__fit is-fit"><strong>Коробка підходить</strong><span>${ct(C)} враховано у підборі.</span></div>`;const a=Math.max(...e.deficitsPerSide)*2;return`<div class="product-modal__fit is-warning" role="status"><strong>Цей розмір замалий</strong><span>Бракує до ${re(a)} мм для обраного запасу. Додайте лише після ручної перевірки.</span></div>`}function $e(t){const e=R(),a=D(t,1),n=D(t,z),s=ot(t,e);return`
    <article
      class="product-card${t.id===tt?" is-selected":""}"
      data-product-card="${c(t.id)}"
    >
      <div class="product-card__head">
        <span class="product-card__number">№${c(t.number)}</span>
        <span class="product-card__size-label">внутрішній розмір</span>
      </div>
      <div class="product-card__visual">${wt(t,!0)}</div>
      <h3>${E(t.dimensions)}</h3>
      ${la(t)}
      <div class="product-card__prices">
        ${s!==null?`<div class="partner-price"><span>Ваша персональна</span><strong>${y(s)}<small>/шт.</small></strong></div>`:`
              <div><span>1–999 шт.</span><strong>${y(a)}</strong></div>
              <div><span>від 1000 шт.</span><strong>${y(n)}</strong></div>
            `}
      </div>
      <span class="button button--card product-card__cta" aria-hidden="true">Детальніше</span>
      <button
        class="product-card__open"
        type="button"
        data-open-product="${c(t.id)}"
        aria-label="Відкрити коробку №${c(t.number)}, ${E(t.dimensions)}"
      ></button>
    </article>
  `}function pa(t){const e=R(),a=vt(t,S,e),n=a*S;return`
    <div class="product-modal">
      <div class="product-modal__visual">
        <div class="product-modal__labels">
          <span>№${c(t.number)}</span>
        </div>
        <div class="product-modal__drawing">${wt(t,!0)}</div>
        <p>Внутрішній розмір · Д × Ш × В</p>
      </div>
      <div class="product-modal__content">
        <p class="eyebrow"><span></span> Внутрішній розмір</p>
        <h2 id="product-dialog-title">${E(t.dimensions)}</h2>
        ${ua(t)}

        <div class="product-modal__rules">
          <div><span>1–999 шт.</span><strong>${y(D(t,1))} / шт.</strong></div>
          <div><span>від 1 000 шт.</span><strong>${y(D(t,z))} / шт.</strong></div>
        </div>

        <div class="quantity-block quantity-block--modal">
          <div class="quantity-block__label">
            <label for="modal-quantity-input">Кількість</label>
            <output id="modal-quantity-output">${S.toLocaleString("uk-UA")} шт.</output>
          </div>
          <div class="quantity-control">
            <button type="button" data-quantity-step="-100" aria-label="Зменшити кількість на 100">−</button>
            <input id="modal-quantity-input" type="number" min="1" max="${Ct}" value="${S}" />
            <button type="button" data-quantity-step="100" aria-label="Збільшити кількість на 100">+</button>
          </div>
          <div class="quantity-presets quantity-presets--modal" aria-label="Швидкий вибір кількості">
            ${[100,500,1e3,5e3,1e4,5e4].map(s=>`<button type="button" data-quantity="${s}">${s.toLocaleString("uk-UA")}</button>`).join("")}
          </div>
        </div>

        <div class="product-modal__total" aria-live="polite">
          <div><span id="modal-price-tier">${Yt(S,e,t)}</span><strong id="modal-unit-price">${y(a)} / шт.</strong></div>
          <div><span>Весь тираж</span><strong id="modal-total">${y(n)}</strong></div>
        </div>

        <div class="product-modal__actions">
          <button class="button button--primary" type="button" data-product-to-cart>Додати до кошика</button>
          <button class="button button--ghost" type="button" data-product-to-calculator>Відкрити калькулятор</button>
        </div>
      </div>
    </div>
  `}function He(){const t=document.querySelector("#product-dialog");if(!t?.open||!gt)return;const e=M().find(l=>l.id===gt);if(!e)return;const a=R(),n=vt(e,S,a),s=t.querySelector("#modal-quantity-input");s&&(s.value=String(S));const i=t.querySelector("#modal-quantity-output");i&&(i.value=`${S.toLocaleString("uk-UA")} шт.`);const r=t.querySelector("#modal-price-tier");r&&(r.textContent=Yt(S,a,e));const u=t.querySelector("#modal-unit-price");u&&(u.textContent=`${y(n)} / шт.`);const o=t.querySelector("#modal-total");o&&(o.textContent=y(n*S)),t.querySelectorAll("[data-quantity]").forEach(l=>{l.classList.toggle("is-active",Number(l.dataset.quantity)===S)})}function we(t){const e=M().find(s=>s.id===t),a=document.querySelector("#product-dialog"),n=document.querySelector("#product-dialog-content");!e||!a||!n||(gt=e.id,Re(e.id),n.innerHTML=pa(e),a.classList.remove("is-closing"),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),He())}function At(t){const e=document.querySelector("#product-dialog");if(!e){gt=null,t?.();return}const a=()=>{e.classList.remove("is-closing"),e.open&&typeof e.close=="function"?e.close():e.removeAttribute("open"),gt=null,t?.()};if(!e.open||window.matchMedia("(prefers-reduced-motion: reduce)").matches){a();return}e.classList.contains("is-closing")||(e.classList.add("is-closing"),window.setTimeout(a,230))}function ma(){const t=M(),e=Ot.trim().toLocaleLowerCase("uk-UA");return t.filter(n=>{const s=`${n.number} ${n.name} ${E(n.dimensions)}`.toLocaleLowerCase("uk-UA"),i=!e||s.includes(e),r=!A||Zt(A,n.dimensions,C).fits;return i&&r}).sort((n,s)=>ie==="price"?n.basePrice-s.basePrice:ie==="number"?n.number.localeCompare(s.number,"uk-UA",{numeric:!0}):Rt(n)-Rt(s))}function fa(){if(!A)return[];const t=Ot.trim().toLocaleLowerCase("uk-UA");return M().filter(e=>{const a=`${e.number} ${e.name} ${E(e.dimensions)}`.toLocaleLowerCase("uk-UA");return!t||a.includes(t)}).map(e=>{const n=Zt(A,e.dimensions,C).deficitsPerSide.reduce((s,i)=>s+i,0);return{product:e,deficit:n}}).sort((e,a)=>e.deficit-a.deficit||Rt(e.product)-Rt(a.product)).slice(0,3).map(({product:e})=>e)}function N(t=!1){if(!Ft||!se)return;const e=document.querySelector("#catalog-more"),a=document.querySelector("#catalog-more-button");if(t){se.textContent="Оновлюємо список…",e&&(e.hidden=!0),Ft.innerHTML=Array.from({length:6},()=>'<div class="product-skeleton" aria-hidden="true"><i></i><i></i><i></i></div>').join("");return}const n=ma(),s=A?` · предмет ${E(A)} · ${ct(C)}`:"";if(se.textContent=`${n.length} із ${M().length} розмірів${s}`,!n.length){const o=fa();Ft.innerHTML=`
      <div class="empty-state${o.length?" empty-state--nearest":""}">
        <div class="empty-state__box" aria-hidden="true"></div>
        <h3>Готового розміру немає.</h3>
        <p>${C?`Із запасом ${ct(C)} точного варіанта немає. Найближчі коробки нижче замалі — це позначено окремо.`:"Змініть габарити предмета або залиште заявку з потрібним розміром."}</p>
        <div class="empty-state__actions">
          ${C?'<button class="button button--ghost" type="button" data-use-tight-fit>Показати без запасу</button>':""}
          <a class="button button--primary" href="#request">Описати свій розмір</a>
        </div>
        ${o.length?`<div class="nearest-results"><div class="nearest-results__head"><strong>Найближчі готові розміри</strong><span>Вони не відповідають обраному запасу</span></div><div class="nearest-results__grid">${o.map($e).join("")}</div></div>`:""}
      </div>
    `,e&&(e.hidden=!0);return}const r=window.matchMedia("(max-width: 680px)").matches&&!Ot.trim()&&!A&&n.length>4,u=r&&!X?n.slice(0,4):n;Ft.innerHTML=u.map($e).join(""),e&&a&&(e.hidden=!r,a.textContent=X?"Згорнути каталог":`Показати всі ${n.length} розмірів`,a.setAttribute("aria-expanded",String(X)))}function St(){window.clearTimeout(he),N(!0),he=window.setTimeout(()=>N(!1),320)}function Fe(t=!1){const e=$t();document.querySelectorAll("[data-product-picker]").forEach(a=>{a.dataset.value=e.id;const n=a.querySelector(".product-picker__value b"),s=a.querySelector(".product-picker__value span");n&&(n.textContent=`№${e.number}`),s&&(s.textContent=E(e.dimensions));const i=a.querySelector(".product-picker__menu");i&&t&&(i.innerHTML=Ue()),a.querySelectorAll("[data-product-picker-value]").forEach(r=>{r.setAttribute("aria-selected",String(r.dataset.productPickerValue===e.id))})})}function ut(t,e=!1){const a=t.querySelector("[data-product-picker-trigger]"),n=t.querySelector(".product-picker__menu");t.classList.remove("is-open"),a?.setAttribute("aria-expanded","false"),window.setTimeout(()=>{n&&!t.classList.contains("is-open")&&(n.hidden=!0)},190),e&&a?.focus()}function je(t){document.querySelectorAll("[data-product-picker].is-open").forEach(e=>{e!==t&&ut(e)})}function Be(t,e=!1){je(t);const a=t.querySelector("[data-product-picker-trigger]"),n=t.querySelector(".product-picker__menu");!a||!n||(n.hidden=!1,a.setAttribute("aria-expanded","true"),window.requestAnimationFrame(()=>{t.classList.add("is-open");const s=t.querySelector('[data-product-picker-value][aria-selected="true"]');s?.scrollIntoView({block:"nearest"}),e&&s?.focus()}))}function ga(t){t.classList.contains("is-open")?ut(t):Be(t)}function j(){const t=$t(),e=R(),a=vt(t,S,e),n=a*S,s=Yt(S,e,t);Fe(),document.querySelectorAll("#quantity-input, #hero-quantity-input, #modal-quantity-input").forEach(T=>{T.value=String(S)});const i=document.querySelector("#quantity-output");i&&(i.value=`${S.toLocaleString("uk-UA")} шт.`);const r=document.querySelector("#calculator-preview");r&&(r.classList.remove("is-changing"),r.offsetWidth,r.classList.add("is-changing"),r.innerHTML=wt(t,!0));const u=document.querySelector("#calculator-tier");u&&(u.textContent=s);const o=document.querySelector("#calculator-unit-price");o&&(o.innerHTML=`${y(a)}<small>/ шт.</small>`);const l=document.querySelector("#calculator-total");l&&(l.textContent=y(n));const g=document.querySelector("#hero-price-label");g&&(g.textContent=s);const d=document.querySelector("#hero-total");d&&(d.textContent=y(n));const m=document.querySelector("#hero-unit");m&&(m.textContent=`${y(a)} / шт.`);const h=document.querySelector("#account-price-badge");if(h){const T=ot(t,e)!==null;h.textContent=T?"Персональна ціна активна":"Публічна ціна",h.classList.toggle("is-partner",T)}const $=document.querySelector("#threshold-note");if($)if(ot(t,e)!==null)$.innerHTML=`<strong>Ваша персональна ціна:</strong> ${y(a)} за одиницю незалежно від тиражу.`;else if(S<z){const T=z-S,V=D(t,z)*z;$.innerHTML=`Ще <strong>${T.toLocaleString("uk-UA")} шт.</strong> до оптового тарифу. 1000 шт. коштуватимуть ${y(V)}.`}else $.innerHTML=`<strong>Оптовий тариф активний.</strong> Економія проти роздрібної ціни — ${y(S)} на всьому тиражі.`;document.querySelectorAll("[data-quantity]").forEach(T=>{T.classList.toggle("is-active",Number(T.dataset.quantity)===S)}),G(),He()}function Re(t,e=!1){M().some(a=>a.id===t)&&(tt=t,N(!1),j(),e&&document.querySelector("#calculator")?.scrollIntoView({behavior:"smooth",block:"start"}))}function pt(t){S=It(t),j()}function Se(t,e){if(!M().some(i=>i.id===t))return;const a=Z(),n=a.find(i=>i.productId===t);n?n.quantity=It(e):a.push({productId:t,quantity:It(e)}),v(f.cart,a),G();const s=document.querySelector("#cart-button");s?.classList.remove("is-updated"),s?.offsetWidth,s?.classList.add("is-updated")}function Ve(t,e){const a=Z(),n=a.find(s=>s.productId===t);n&&(n.quantity=It(e),v(f.cart,a),G())}function ha(t){v(f.cart,Z().filter(e=>e.productId!==t)),G()}function G(){const t=document.querySelector("#request-summary"),e=document.querySelector("#cart-count"),a=document.querySelector('#request-form button[type="submit"]'),n=Z(),s=R();if(e&&(e.textContent=String(n.length)),a&&(a.disabled=n.length===0),!t)return;if(!n.length){t.innerHTML=`
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
    `;return}let i=0;const r=n.map(u=>{const o=M().find(d=>d.id===u.productId);if(!o)return"";const l=vt(o,u.quantity,s),g=l*u.quantity;return i+=g,`
        <article class="cart-item">
          <div class="cart-item__index">№${c(o.number)}</div>
          <div class="cart-item__info">
            <strong>${E(o.dimensions)}</strong>
            <span>${y(l)} / шт.</span>
          </div>
          <label class="cart-item__quantity">
            <span>Кількість</span>
            <div class="cart-item__quantity-control">
              <button type="button" data-cart-step="-100" data-cart-product="${c(o.id)}" aria-label="Зменшити кількість коробки №${c(o.number)} на 100">−</button>
              <input class="input" type="number" min="1" max="${Ct}" value="${u.quantity}" data-cart-quantity="${c(o.id)}" />
              <button type="button" data-cart-step="100" data-cart-product="${c(o.id)}" aria-label="Збільшити кількість коробки №${c(o.number)} на 100">+</button>
            </div>
          </label>
          <div class="cart-item__total">
            <span>Сума</span>
            <strong>${y(g)}</strong>
          </div>
          <div class="cart-item__actions">
            <button type="button" data-edit-cart="${c(o.id)}">Змінити</button>
            <button class="cart-item__remove" type="button" data-remove-cart="${c(o.id)}" aria-label="Прибрати коробку №${c(o.number)} з кошика">×</button>
          </div>
        </article>
      `}).join("");t.innerHTML=`
    <div class="cart-list">${r}</div>
    <div class="cart-summary__total">
      <span>${zt(n.length)}</span>
      <div><small>Загальна вартість</small><strong>${y(i)}</strong></div>
    </div>
    <div class="cart-summary__actions">
      <a class="cart-continue" href="#catalog">+ Додати ще один розмір</a>
      <button type="button" data-clear-cart>Очистити кошик</button>
    </div>
  `}function ba(t){const e=K().find(i=>i.id===t);if(!e)return;const a=new Set(M().map(i=>i.id)),n=e.items.filter(i=>a.has(i.productId)).map(i=>({productId:i.productId,quantity:It(i.quantity)}));if(!n.length)return;const s=Z().filter(i=>!n.some(r=>r.productId===i.productId));v(f.cart,[...s,...n]),G(),window.location.hash="request",window.setTimeout(()=>document.querySelector("#request")?.scrollIntoView({behavior:"smooth",block:"start"}),80)}function W(){const t=document.querySelector("#account-button"),e=R();if(!t)return;t.textContent=e?e.name.split(" ")[0]:"Кабінет",t.classList.toggle("is-signed-in",!!e);const a=document.querySelector("#request-account-hint");a&&(a.textContent=e?e.name:"Гість");const n=document.querySelector("#request-form");if(n&&e){const s=(i,r)=>{const u=n.elements.namedItem(i);u instanceof HTMLInputElement&&!u.value&&(u.value=r)};s("name",e.name),s("phone",e.phone),s("company",e.company)}G()}function va(){const t=R();if(t){const e=K().filter(g=>g.accountId===t.id).slice().reverse(),a=e.filter(g=>g.status!=="Закрита").length,n=e.reduce((g,d)=>g+d.total,0),s=t.name.split(/\s+/).filter(Boolean).slice(0,2).map(g=>g[0]).join("").toLocaleUpperCase("uk-UA"),i=$t(),r=vt(i,S,t),u=M().flatMap(g=>{const d=ot(g,t);return d===null?[]:[{product:g,price:d}]}),o=u.length,l=o>0;return`
      <div class="account-dashboard">
        <section class="account-dashboard__hero">
          <div class="account-identity">
            <span class="account-avatar">${c(s||"TP")}</span>
            <div>
              <p class="eyebrow eyebrow--light"><span></span> Особистий кабінет</p>
              <h1 id="account-page-title">${c(t.name)}</h1>
              <p>${c(t.phone)}${t.company?` · ${c(t.company)}`:""}</p>
            </div>
          </div>
          <div class="account-dashboard__hero-actions">
            <span class="account-client-badge">${t.partner?"Постійний клієнт":"Новий клієнт"}</span>
            <button class="account-logout" type="button" id="logout-button">Вийти</button>
          </div>
          <div class="account-price-card${l?" is-partner":""}">
            <span>Ваші ціни</span>
            <strong>${l?"Персональні ціни активні":"Стандартні ціни"}</strong>
            <p>${l?`Окремі ціни застосовано для ${o} розмірів у каталозі, калькуляторі та кошику.`:"Усі суми показані одразу в кінцевому вигляді."}</p>
          </div>
        </section>

        <div class="account-kpis">
          <article><span>Усі заявки</span><strong>${e.length}</strong><small>оформлено</small></article>
          <article><span>Активні</span><strong>${a}</strong><small>потребують уваги</small></article>
          <article><span>Сума заявок</span><strong>${y(n)}</strong><small>загальна вартість</small></article>
        </div>

        <section class="account-personal-prices${l?" is-active":""}">
          <div class="account-personal-prices__head">
            <div>
              <p class="eyebrow"><span></span> Ваш персональний прайс</p>
              <h2>${l?"Ціни, доступні тільки вам.":"Персональні ціни ще не налаштовані."}</h2>
            </div>
            <p>${l?"Менеджер задає кінцеву ціну окремо для кожного розміру. Вона автоматично використовується в усіх розрахунках після входу.":"Після узгодження менеджер додасть індивідуальні ціни для потрібних коробок."}</p>
          </div>
          ${l?`<div class="account-personal-prices__grid">
                  ${u.map(({product:g,price:d},m)=>`
                        <button type="button" data-account-price-product="${c(g.id)}">
                          <span class="account-personal-prices__index">${String(m+1).padStart(2,"0")}</span>
                          <span class="account-personal-prices__product"><strong>№${c(g.number)}</strong><small>${E(g.dimensions)}</small></span>
                          <span class="account-personal-prices__value"><strong>${y(d)}</strong><small>за 1 шт.</small></span>
                          <i aria-hidden="true">→</i>
                        </button>
                      `).join("")}
                </div>`:'<a class="button button--ghost" href="#catalog">Переглянути звичайні ціни</a>'}
        </section>

        <div class="account-dashboard__grid">
          <section class="account-orders-panel">
            <div class="account-panel-heading">
              <div><p class="eyebrow"><span></span> Історія</p><h2>Мої заявки</h2></div>
              <a class="text-link" href="#request">Нова заявка <span>→</span></a>
            </div>
            <div class="account-order-list">
              ${e.length?e.map(g=>{const d=g.items.reduce((m,h)=>m+h.quantity,0);return`
                          <article class="account-order">
                            <div class="account-order__main">
                              <span>${c(g.id)}</span>
                              <strong>${zt(g.items.length)}</strong>
                              <small>${d.toLocaleString("uk-UA")} шт. загалом</small>
                            </div>
                            <div class="account-order__price"><strong>${y(g.total)}</strong><small>загальна сума</small></div>
                            <div class="account-order__meta"><span>${c(g.status)}</span><time datetime="${g.createdAt}">${new Date(g.createdAt).toLocaleDateString("uk-UA")}</time></div>
                            <div class="account-order__items">
                              ${g.items.map(m=>`<span><b>№${c(m.productNumber)}</b> ${E(m.dimensions)} · ${m.quantity.toLocaleString("uk-UA")} шт.</span>`).join("")}
                            </div>
                            <button class="account-order__repeat" type="button" data-repeat-order="${c(g.id)}">Повторити замовлення</button>
                          </article>
                        `}).join(""):'<div class="account-empty"><strong>Заявок ще немає.</strong><p>Оберіть розмір, порахуйте тираж і збережіть першу заявку.</p><a class="button button--primary" href="#catalog">До каталогу</a></div>'}
            </div>
          </section>

          <aside class="account-sidebar">
            <article class="account-quick-order">
              <p class="technical-label">Швидкий розрахунок</p>
              <div class="account-quick-order__box">${wt(i,!1)}</div>
              <span>Коробка №${c(i.number)}</span>
              <h3>${E(i.dimensions)}</h3>
              <div><span>${S.toLocaleString("uk-UA")} шт. · ${ot(i,t)!==null?"ваша ціна":"ціна на сайті"}</span><strong>${y(r*S)}</strong></div>
              <button class="button button--gold button--wide" type="button" data-add-selected-to-cart>Додати до кошика</button>
            </article>
            <article class="account-profile-card">
              <div><p class="technical-label">Профіль</p><button class="text-link" type="button" data-edit-profile>Дані клієнта</button></div>
              <dl>
                <div><dt>Телефон</dt><dd>${c(t.phone)}</dd></div>
                <div><dt>Компанія</dt><dd>${c(t.company||"Не вказано")}</dd></div>
                <div><dt>Статус</dt><dd>${t.partner?"Постійний клієнт":"Новий клієнт"}</dd></div>
              </dl>
              ${t.role==="admin"?'<a class="button button--ghost button--wide" href="#admin">Відкрити адмінку</a>':""}
            </article>
            ${nt().length?`<article class="account-measurements"><div><p class="technical-label">Збережені розміри</p><span>${nt().length} останніх</span></div><div class="account-measurements__list">${nt().map(g=>`<button type="button" data-saved-measurement="${c(g.id)}"><strong>${E(g.dimensions)}</strong><span>${ct(g.margin)}</span></button>`).join("")}</div></article>`:""}
          </aside>
        </div>
      </div>
    `}return`
    <div class="auth-layout">
      <div class="auth-intro">
        <p class="eyebrow"><span></span> Кабінет ToffiPacks</p>
        <h1 id="account-page-title">Увійдіть за номером телефону.</h1>
        <p>Постійним клієнтам менеджер може налаштувати окрему персональну ціну для кожної коробки.</p>
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
  `}function B(){const t=document.querySelector("#account-page-content");t&&(t.innerHTML=va())}function ya(t){return`
    <div class="profile-editor">
      <p class="eyebrow"><span></span> Дані клієнта</p>
      <h2 id="profile-dialog-title">Оновити профіль.</h2>
      <p>Телефон використовується для входу та зв’язку щодо заявки.</p>
      <form id="profile-form" novalidate>
        <label class="field"><span>Ім’я *</span><input class="input" name="name" value="${c(t.name)}" autocomplete="name" required /></label>
        <label class="field"><span>Телефон *</span><input class="input" name="phone" type="tel" inputmode="tel" autocomplete="tel" value="${c(t.phone)}" pattern="[+]?380[0-9]{9}" required /></label>
        <label class="field"><span>Компанія</span><input class="input" name="company" value="${c(t.company)}" autocomplete="organization" /></label>
        <label class="field"><span>Новий пароль</span><input class="input" name="password" type="password" minlength="8" autocomplete="new-password" placeholder="Залиште порожнім, щоб не змінювати" /></label>
        <div class="form-status" data-profile-status aria-live="polite"></div>
        <div class="profile-editor__actions">
          <button class="button button--ghost" type="button" data-close-profile>Скасувати</button>
          <button class="button button--primary" type="submit">Зберегти дані</button>
        </div>
      </form>
    </div>
  `}function $a(){const t=R(),e=document.querySelector("#profile-dialog"),a=document.querySelector("#profile-dialog-content");!t||!e||!a||(a.innerHTML=ya(t),typeof e.showModal=="function"?e.showModal():e.setAttribute("open",""),a.querySelector('input[name="name"]')?.focus())}async function wa(t){t.classList.add("was-validated");const e=t.querySelector("[data-profile-status]");if(!t.reportValidity()){e&&(e.className="form-status is-error",e.textContent="Перевірте ім’я, телефон і новий пароль.");return}const a=R();if(!a)return;const n=new FormData(t),s=Dt(String(n.get("phone")??"")),i=J();if(i.some(o=>o.id!==a.id&&ht(o.phone)===ht(s))){e&&(e.className="form-status is-error",e.textContent="Акаунт із таким номером уже існує.");return}const r=String(n.get("password")??"");if(P){try{const o=await k.updateMe({name:String(n.get("name")??"").trim(),phone:s,company:String(n.get("company")??"").trim(),...r?{password:r}:{}});Nt(o),document.querySelector("#profile-dialog")?.close(),W(),B(),j(),N(!1)}catch(o){e&&(e.className="form-status is-error",e.textContent=H(o,"Не вдалося оновити профіль."))}return}const u=i.map(o=>o.id===a.id?{...o,name:String(n.get("name")??"").trim(),phone:s,company:String(n.get("company")??"").trim(),password:r||o.password}:o);v(f.accounts,u),document.querySelector("#profile-dialog")?.close(),W(),B(),j(),N(!1)}function Kt(t,e,a){const n=t.querySelector("[data-auth-status]");n&&(n.textContent=e,n.className=`form-status is-${a}`)}function H(t,e){return t instanceof Tt?t.message:e}function Sa(t,e){const a=ht(t),n=J().find(s=>ht(s.phone)===a&&s.password===e);return n?(localStorage.setItem(f.session,n.id),n):null}async function _e(t,e=!1){if(t.classList.add("was-validated"),!t.reportValidity())return;const a=new FormData(t);let n=null;if(P)try{const s=await k.login(String(a.get("phone")??""),String(a.get("password")??""));e&&s.role!=="admin"?rt():(n=Nt(s),await Qt())}catch(s){Kt(t,H(s,"Сервер авторизації недоступний."),"error");return}else n=Sa(String(a.get("phone")??""),String(a.get("password")??""));if(!n||e&&n.role!=="admin"){Kt(t,e?"Потрібен акаунт менеджера.":"Невірний телефон або пароль.","error");return}W(),j(),N(!1),e?w():(B(),window.location.hash="account")}async function _a(t){if(t.classList.add("was-validated"),!t.reportValidity())return;const e=new FormData(t),a=Dt(String(e.get("phone")??""));if(P){try{const i=await k.register({name:String(e.get("name")??"").trim(),phone:a,company:String(e.get("company")??"").trim(),password:String(e.get("password")??"")});Nt(i),v(f.orders,[]),W(),j(),N(!1),B(),window.location.hash="account"}catch(i){Kt(t,H(i,"Не вдалося створити акаунт."),"error")}return}const n=J();if(n.some(i=>ht(i.phone)===ht(a))){Kt(t,"Акаунт із таким номером уже існує.","error");return}const s={id:`account-${Date.now().toString(36)}`,name:String(e.get("name")??"").trim(),phone:a,company:String(e.get("company")??"").trim(),password:String(e.get("password")??""),role:"client",partner:!1,fixedMarkup:Mt,productPrices:{},createdAt:new Date().toISOString()};n.push(s),v(f.accounts,n),localStorage.setItem(f.session,s.id),W(),j(),N(!1),B(),window.location.hash="account"}async function qa(t){const e=document.querySelector("#request-status"),a=Z();if(!a.length){e&&(e.className="form-status is-error",e.textContent="Додайте хоча б одну коробку до кошика.");return}if(t.classList.add("was-validated"),!t.reportValidity()){e&&(e.className="form-status is-error",e.textContent="Перевірте обов’язкові поля та згоду.");return}const n=new FormData(t),s=R(),i=Dt(String(n.get("phone")??"")),r=s??J().find(m=>Dt(m.phone)===i),u=a.flatMap(m=>{const h=M().find(T=>T.id===m.productId);if(!h)return[];const $=vt(h,m.quantity,s);return[{productId:h.id,productNumber:h.number,dimensions:h.dimensions,quantity:m.quantity,unitPrice:$,total:$*m.quantity,priceType:Yt(m.quantity,s,h)}]}),o=u.reduce((m,h)=>m+h.total,0);if(P){const m=t.querySelector('button[type="submit"]');m&&(m.disabled=!0,m.dataset.originalText=m.textContent??"",m.textContent="Зберігаємо заявку…");try{const h=await k.createOrder({customerName:String(n.get("name")??"").trim(),phone:i,company:String(n.get("company")??"").trim(),comment:String(n.get("comment")??"").trim(),items:a.map($=>({productId:$.productId,quantity:$.quantity}))});v(f.orders,[...K().filter($=>$.id!==h.id),h]),v(f.cart,[]),G(),B(),e&&(e.className="form-status is-success",e.innerHTML=`<strong>Заявку ${c(h.id)} створено.</strong><span>${zt(h.items.length)} на суму ${y(h.total)}. Менеджер побачить її в адмінці.</span>`)}catch(h){e&&(e.className="form-status is-error",e.textContent=H(h,"Не вдалося передати заявку на сервер."))}finally{m&&(m.disabled=!1,m.textContent=m.dataset.originalText||"Надіслати заявку",m.focus())}return}const l=new Date().toISOString(),g={id:`TP-${Date.now().toString(36).toUpperCase()}`,createdAt:l,customerName:String(n.get("name")??"").trim(),phone:i,company:String(n.get("company")??"").trim(),comment:String(n.get("comment")??"").trim(),items:u,total:o,accountId:r?.id,status:"Нова",statusHistory:[{status:"Нова",at:l}]},d=K();d.push(g),v(f.orders,d),v(f.cart,[]),G(),B(),e&&(e.className="form-status is-success",e.innerHTML=`<strong>Заявку ${c(g.id)} створено.</strong><span>${zt(g.items.length)} на суму ${y(g.total)}. Номер можна повідомити менеджеру.</span>`),t.querySelector('button[type="submit"]')?.focus()}const ka=["Нова","У роботі","Уточнення","Підтверджена","Закрита"];function qe(t){return t==="Нова"?"is-new":t==="У роботі"?"is-progress":t==="Уточнення"?"is-clarifying":t==="Підтверджена"?"is-confirmed":"is-closed"}function Aa(t){return`
    <div class="order-status-control ${qe(t.status)}" data-order-status-control>
      <button class="order-status-control__trigger" type="button" data-order-status-trigger aria-haspopup="listbox" aria-expanded="false">
        <span class="order-status-control__dot" aria-hidden="true"></span>
        <span>${c(t.status)}</span>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
      </button>
      <div class="order-status-control__menu" role="listbox" aria-label="Статус заявки ${c(t.id)}" hidden>
        ${ka.map(e=>`
            <button class="${qe(e)}" type="button" role="option" aria-selected="${e===t.status}" data-order-status-option="${c(e)}" data-order-id="${c(t.id)}">
              <span class="order-status-control__dot" aria-hidden="true"></span>
              <span>${c(e)}</span>
              ${e===t.status?'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7" /></svg>':""}
            </button>
          `).join("")}
      </div>
    </div>
  `}function xt(t){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${n}`}function Pt(t){const[e,a,n]=t.split("-").map(Number);return new Date(e,Math.max(0,(a||1)-1),n||1,12)}function dt(t){return Pt(t).toLocaleDateString("uk-UA",{day:"2-digit",month:"2-digit",year:"numeric"})}function Qe(t=!1){const a=xt(new Date),s=Pt(kt||x||a),i=new Date(s.getFullYear(),s.getMonth(),1,12);kt=xt(i);const r=(i.getDay()+6)%7,u=new Date(i);u.setDate(i.getDate()-r);const o=Array.from({length:42},($,T)=>{const V=new Date(u);V.setDate(u.getDate()+T);const U=xt(V),ue=V.getMonth()!==i.getMonth(),st=U===x,_t=U===L,at=st||_t,Ht=!!(x&&L&&U>x&&U<L);return`<button class="${[ue?"is-outside":"",Ht?"is-in-range":"",st?"is-range-start":"",_t?"is-range-end":"",at?"is-selected":"",U===a?"is-today":""].filter(Boolean).join(" ")}" type="button" data-calendar-date="${U}" aria-label="${V.toLocaleDateString("uk-UA",{day:"numeric",month:"long",year:"numeric"})}" aria-pressed="${at}">${V.getDate()}</button>`}).join(""),l=x?L&&L!==x?`${dt(x)} — ${dt(L)}`:dt(x):"Усі дати",g=x&&L?Math.round((Pt(L).getTime()-Pt(x).getTime())/864e5)+1:0,d=x?L?g===1?"Обрано один день":`Обрано ${g} дн.`:"Тепер оберіть кінець":"Оберіть початок",m=x?L?`${dt(x)} — ${dt(L)}`:`Початок: ${dt(x)}`:"Перший клік — початкова дата",h=i.toLocaleDateString("uk-UA",{month:"long",year:"numeric"});return`
    <div class="admin-calendar${t?" is-open":""}" data-admin-calendar>
      <button class="admin-calendar__trigger" type="button" data-calendar-trigger aria-haspopup="dialog" aria-expanded="${t}">
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 2v3m10-3v3M3 8h14M4 4h12a1 1 0 0 1 1 1v12H3V5a1 1 0 0 1 1-1Z" /></svg>
        <span><small>Період заявок</small><strong>${c(l)}</strong></span>
        <svg class="admin-calendar__chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
      </button>
      <div class="admin-calendar__popover" role="dialog" aria-label="Оберіть період заявок"${t?"":" hidden"}>
        <div class="admin-calendar__head">
          <strong>${c(h)}</strong>
          <div>
            <button type="button" data-calendar-month="-1" aria-label="Попередній місяць"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m10 3-5 5 5 5" /></svg></button>
            <button type="button" data-calendar-month="1" aria-label="Наступний місяць"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg></button>
          </div>
        </div>
        <div class="admin-calendar__range-state${x&&!L?" is-pending":""}" aria-live="polite">
          <span aria-hidden="true">${x&&L?"✓":x?"2":"1"}</span>
          <div><strong>${c(d)}</strong><small>${c(m)}</small></div>
        </div>
        <div class="admin-calendar__weekdays" aria-hidden="true">${["Пн","Вт","Ср","Чт","Пт","Сб","Нд"].map($=>`<span>${$}</span>`).join("")}</div>
        <div class="admin-calendar__days">${o}</div>
        <div class="admin-calendar__footer">
          <button type="button" data-calendar-clear${x?"":" disabled"}>Очистити</button>
          <small>Дати включно</small>
        </div>
      </div>
    </div>
  `}function xa(){return window.location.hash==="#admin-orders"?"orders":window.location.hash==="#admin-clients"?"clients":window.location.hash==="#admin-products"?"products":"overview"}function Pa(t,e,a,n){return[{view:"overview",href:"#admin",label:"Огляд"},{view:"orders",href:"#admin-orders",label:"Замовлення",count:e},{view:"clients",href:"#admin-clients",label:"Клієнти",count:a},{view:"products",href:"#admin-products",label:"Товари",count:n}].map((i,r)=>`
        <a class="admin-nav__link${t===i.view?" is-active":""}" href="${i.href}"${t===i.view?' aria-current="page"':""}>
          <span>${String(r+1).padStart(2,"0")}</span>
          <strong>${i.label}</strong>
          ${i.count===void 0?"":`<b>${i.count}</b>`}
        </a>
      `).join("")}function La(t,e,a){const n=K(),s=J().filter(u=>u.role==="client"),i=O().length,r=q?`<div class="admin-notice" role="status"><span>Готово</span><p>${c(q)}</p></div>`:"";return q="",`
    <div class="admin-workspace">
      <aside class="admin-sidebar-nav">
        <div class="admin-sidebar-nav__head">
          <span class="technical-label">ToffiPacks / Control</span>
          <h2>Управління</h2>
          <p>Замовлення, клієнти й каталог в одному кабінеті.</p>
        </div>
        <nav class="admin-nav" aria-label="Розділи адмінки">
          ${Pa(e,n.length,s.length,i)}
        </nav>
        <div class="admin-sidebar-nav__footer">
          <span>Ви увійшли як</span>
          <strong>${c(t.name)}</strong>
          <small>${c(t.phone)}</small>
          <button class="text-link" id="admin-logout" type="button">Вийти</button>
        </div>
      </aside>
      <main class="admin-main">
        ${r}
        ${a}
      </main>
    </div>
  `}function ze(t){const e=`${t.id} ${t.customerName} ${t.phone} ${t.company}`.toLocaleLowerCase("uk-UA");return`
    <article class="order-card" data-admin-order data-status="${c(t.status)}" data-date="${t.createdAt.slice(0,10)}" data-search="${c(e)}">
      <div class="order-card__top">
        <div><span>${c(t.id)}</span><strong>${c(t.customerName)}</strong></div>
        ${Aa(t)}
      </div>
      <div class="order-card__grid">
        <div><span>Контакт</span><a href="tel:${c(t.phone)}">${c(t.phone)}</a><small>Телефон клієнта</small></div>
        <div><span>Позицій</span><strong>${t.items.length}</strong><small>${t.items.reduce((a,n)=>a+n.quantity,0).toLocaleString("uk-UA")} шт. загалом</small></div>
        <div><span>Сума</span><strong>${y(t.total)}</strong><small>кінцева вартість</small></div>
      </div>
      <div class="order-card__items">
        ${t.items.map(a=>`
              <div>
                <span>№${c(a.productNumber)}</span>
                <strong>${E(a.dimensions)}</strong>
                <small>${a.quantity.toLocaleString("uk-UA")} шт. · ${y(a.unitPrice)} / шт.</small>
                <b>${y(a.total)}</b>
              </div>
            `).join("")}
      </div>
      ${t.company||t.comment?`<p class="order-card__comment">${c(t.company)}${t.company&&t.comment?" · ":""}${c(t.comment)}</p>`:""}
      <div class="order-status-history" aria-label="Історія статусів">
        <span>Історія</span>
        <div>
          ${(t.statusHistory??[{status:t.status,at:t.createdAt}]).slice().reverse().slice(0,5).map(a=>`<p><strong>${c(a.status)}</strong><time datetime="${c(a.at)}">${new Date(a.at).toLocaleString("uk-UA")}</time></p>`).join("")}
        </div>
      </div>
      <label class="order-card__manager-note">
        <span>Нотатка менеджера</span>
        <textarea data-order-note="${c(t.id)}" rows="2" placeholder="Домовленості після дзвінка, дата або деталі">${c(t.managerNote??"")}</textarea>
      </label>
      <div class="order-card__footer">
        <time datetime="${t.createdAt}">${new Date(t.createdAt).toLocaleString("uk-UA")}</time>
        <button type="button" data-delete-order="${c(t.id)}">
          <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M3 5h12M7 2h4l1 3H6l1-3Zm-2 3 1 11h6l1-11M8 8v5m3-5v5" /></svg>
          Видалити заявку
        </button>
      </div>
    </article>
  `}function Ta(t,e){const a=t.filter(r=>r.status!=="Закрита").length,n=t.reduce((r,u)=>r+u.total,0),s=M().length,i=t.slice(0,3);return`
    <div class="admin-page-heading admin-page-heading--overview">
      <div><p class="eyebrow"><span></span> Панель керування</p><h1 id="admin-title">Все важливе<br />на одному екрані.</h1></div>
      <p>Швидкий стан каталогу, заявок і клієнтів. Детальна робота винесена в окремі розділи.</p>
    </div>
    <div class="admin-stats admin-stats--large">
      <article><span>Усі заявки</span><strong>${t.length}</strong><small>${a} потребують уваги</small></article>
      <article><span>Оборот заявок</span><strong>${y(n)}</strong><small>сума збережених розрахунків</small></article>
      <article><span>Клієнти</span><strong>${e.length}</strong><small>${e.filter(r=>r.partner).length} постійних</small></article>
      <article><span>Товари на сайті</span><strong>${s}</strong><small>${O().length-s} приховано</small></article>
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
        ${i.length?i.map(ze).join(""):'<div class="admin-empty"><h3>Заявок ще немає.</h3><p>Нові замовлення з сайту з’являться тут.</p></div>'}
      </div>
    </section>
  `}function Ca(t){const e=["Усі","Нова","У роботі","Уточнення","Підтверджена","Закрита"];return`
    <div class="admin-page-heading">
      <div><p class="eyebrow"><span></span> Замовлення</p><h1 id="admin-title">Заявки без хаосу.</h1></div>
      <p>Пошук за клієнтом або номером, швидка зміна статусу та повний склад кожного замовлення.</p>
    </div>
    <div class="admin-toolbar">
      <label class="admin-search"><span class="sr-only">Пошук заявок</span><input id="admin-order-search" type="search" value="${c(de)}" placeholder="Номер, ім’я або телефон" /></label>
      ${Qe()}
      <div class="admin-filter-chips" aria-label="Фільтр за статусом">
        ${e.map(a=>`<button class="${Vt===a?"is-active":""}" type="button" data-admin-order-filter="${a}">${a}</button>`).join("")}
      </div>
    </div>
    <div class="admin-results-meta"><strong id="admin-order-count">${t.length}</strong><span>заявок показано</span></div>
    <div class="orders-list" id="admin-orders-list">
      ${t.length?t.map(ze).join(""):'<div class="admin-empty"><h3>Заявок ще немає.</h3><p>Нові замовлення з сайту з’являться тут.</p></div>'}
    </div>
  `}function Ma(t){return`
    <div class="client-prices-panel__head">
      <div>
        <span class="technical-label">Персональний прайс</span>
        <h3>Окрема ціна для кожної коробки</h3>
      </div>
      <p>Вкажіть кінцеву ціну за одну штуку. Це не відсоток і не загальна знижка.</p>
    </div>
    <div class="client-product-prices">
      ${O().map((e,a)=>{const n=Number(t.productPrices?.[e.id]),s=Number.isFinite(n)&&n>0;return`
            <label class="client-product-price${e.active?"":" is-hidden"}">
              <span class="client-product-price__index">${String(a+1).padStart(2,"0")}</span>
              <span class="client-product-price__product">
                <strong>№${c(e.number)} · ${E(e.dimensions)}</strong>
                <small>${e.active?"Доступна на сайті":"Прихована в каталозі"}</small>
              </span>
              <span class="client-product-price__public">
                <small>Звичайна / оптова</small>
                <strong>${y(D(e,1))} / ${y(D(e,z))}</strong>
              </span>
              <span class="client-product-price__field">
                <small>Ціна клієнта</small>
                <span>
                  <input
                    class="input"
                    type="number"
                    inputmode="decimal"
                    min="0.01"
                    max="10000"
                    step="0.01"
                    value="${s?n:""}"
                    placeholder="Не задано"
                    data-client-product-price="${c(e.id)}"
                    data-client-id="${c(t.id)}"
                    ${t.partner?"":"disabled"}
                  />
                  <em>грн / шт.</em>
                </span>
              </span>
            </label>
          `}).join("")}
    </div>
  `}function Ea(t){if(!it.size){const e=t.find(a=>a.partner)??t[0];e&&it.add(e.id)}return`
    <div class="admin-page-heading">
      <div><p class="eyebrow"><span></span> Клієнти</p><h1 id="admin-title">Контакти й особливі умови.</h1></div>
      <p>Знайдіть клієнта за телефоном, активуйте статус постійного та задайте окрему кінцеву ціну для кожної коробки.</p>
    </div>
    <div class="admin-toolbar admin-toolbar--clients">
      <label class="admin-search"><span class="sr-only">Пошук клієнтів</span><input id="admin-client-search" type="search" placeholder="Ім’я, компанія або телефон" /></label>
    </div>
    <div class="clients-table clients-table--expanded">
      <div class="clients-table__head"><span>Клієнт</span><span>Статус</span><span>Персональні ціни</span></div>
      ${t.length?t.map(e=>{const a=it.has(e.id),n=O().filter(s=>Number(e.productPrices?.[s.id])>0).length;return`
                <article class="client-card" data-admin-client data-search="${c(`${e.name} ${e.company} ${e.phone}`.toLocaleLowerCase("uk-UA"))}">
                  <div class="client-row">
                    <div class="client-row__identity"><strong>${c(e.name)}</strong><span>${c(e.company||"Без компанії")}</span><a href="tel:${c(e.phone)}">${c(e.phone)}</a></div>
                    <label class="partner-toggle"><input type="checkbox" data-partner-toggle="${e.id}"${e.partner?" checked":""} /><span>${e.partner?"Постійний":"Звичайний"}</span></label>
                    <button class="client-prices-toggle${a?" is-open":""}" type="button" data-client-prices-toggle="${c(e.id)}" aria-expanded="${a}" aria-controls="client-prices-${c(e.id)}">
                      <span><strong>${n} із ${O().length}</strong><small>цін налаштовано</small></span>
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 9 5 5 5-5" /></svg>
                    </button>
                  </div>
                  <section class="client-prices-panel${a?" is-open":""}" id="client-prices-${c(e.id)}"${a?"":" hidden"}>
                    ${Ma(e)}
                  </section>
                </article>
              `}).join(""):'<div class="admin-empty"><h3>Клієнтів ще немає.</h3></div>'}
    </div>
  `}function le(){const t=ce.trim().toLocaleLowerCase("uk-UA");return O().filter(e=>{const a=!t||`${e.number} ${e.name} ${E(e.dimensions)}`.toLocaleLowerCase("uk-UA").includes(t),n=lt==="all"||(lt==="active"?e.active:!e.active);return a&&n})}function Ke(){const t=le();return t.length?t.map(e=>`
        <article class="admin-product-card${e.active?"":" is-hidden"}" data-admin-product="${e.id}">
          <div class="admin-product-card__visual">${wt(e,!1)}</div>
          <div class="admin-product-card__content">
            <div class="admin-product-card__top"><span>№${c(e.number)}</span><b>${e.active?"На сайті":"Приховано"}</b></div>
            <h3>${E(e.dimensions)}</h3>
            <p>${c(e.name)}</p>
            <dl>
              <div><dt>1–999 шт.</dt><dd>${y(D(e,1))}</dd></div>
              <div><dt>від 1000 шт.</dt><dd>${y(D(e,z))}</dd></div>
            </dl>
            <div class="admin-product-card__actions">
              <button class="button button--primary button--small" type="button" data-edit-product="${e.id}">Редагувати</button>
              <button class="button button--ghost button--small" type="button" data-toggle-product="${e.id}">${e.active?"Приховати":"Показати"}</button>
              <button class="admin-danger-link" type="button" data-delete-product="${e.id}">Видалити</button>
            </div>
          </div>
        </article>
      `).join(""):'<div class="admin-empty"><h3>Нічого не знайдено.</h3><p>Змініть пошук або фільтр видимості.</p></div>'}function Ia(){return`
    <div class="admin-page-heading admin-page-heading--products">
      <div><p class="eyebrow"><span></span> Товари</p><h1 id="admin-title">Каталог під контролем.</h1></div>
      <div class="admin-page-heading__action"><p>Окрема сторінка для розмірів, цін і видимості коробок.</p><button class="button button--primary" type="button" data-create-product>Додати коробку</button></div>
    </div>
    <div class="admin-toolbar admin-toolbar--products">
      <label class="admin-search"><span class="sr-only">Пошук товарів</span><input id="admin-product-search" type="search" value="${c(ce)}" placeholder="Номер або розмір" /></label>
      <div class="admin-filter-chips" aria-label="Фільтр товарів">
        <button class="${lt==="all"?"is-active":""}" type="button" data-product-filter="all">Усі</button>
        <button class="${lt==="active"?"is-active":""}" type="button" data-product-filter="active">На сайті</button>
        <button class="${lt==="hidden"?"is-active":""}" type="button" data-product-filter="hidden">Приховані</button>
      </div>
      <button class="button button--ghost button--small" type="button" data-export-products>Експорт CSV</button>
      <label class="button button--ghost button--small admin-file-button">Імпорт CSV<input type="file" accept=".csv,text/csv" data-import-products /></label>
      <button class="admin-danger-link" type="button" data-reset-products>Відновити початкові</button>
    </div>
    <div class="admin-results-meta"><strong id="admin-product-count">${le().length}</strong><span>товарів показано</span></div>
    <div class="admin-products-grid" id="admin-product-list">${Ke()}</div>
  `}function w(){const t=document.querySelector("#admin-content");if(!t)return;const e=R();if(!e||e.role!=="admin"){t.innerHTML=`
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
    `;return}const a=K().slice().reverse(),n=J().filter(r=>r.role==="client"),s=xa();let i=Ta(a,n);s==="orders"&&(i=Ca(a)),s==="clients"&&(i=Ea(n)),s==="products"&&(i=Ia()),t.innerHTML=La(e,s,i),s==="orders"&&Lt()}function Lt(){const t=de.trim().toLocaleLowerCase("uk-UA");let e=0;document.querySelectorAll("[data-admin-order]").forEach(n=>{const s=!t||(n.dataset.search??"").includes(t),i=Vt==="Усі"||n.dataset.status===Vt,r=n.dataset.date??"",u=!x||!L&&r===x||!!(L&&r>=x&&r<=L);n.hidden=!(s&&i&&u),n.hidden||(e+=1)});const a=document.querySelector("#admin-order-count");a&&(a.textContent=String(e))}function Bt(t){document.querySelectorAll("[data-order-status-control]").forEach(e=>{e!==t&&(e.classList.remove("is-open"),e.querySelector(".order-status-control__menu")?.setAttribute("hidden",""),e.querySelector("[data-order-status-trigger]")?.setAttribute("aria-expanded","false"))})}function Je(){const t=document.querySelector("[data-admin-calendar]");t&&(t.classList.remove("is-open"),t.querySelector(".admin-calendar__popover")?.setAttribute("hidden",""),t.querySelector("[data-calendar-trigger]")?.setAttribute("aria-expanded","false"))}function jt(t,e){const a=document.querySelector("[data-admin-calendar]");a&&(a.outerHTML=Qe(t),e&&window.requestAnimationFrame(()=>document.querySelector(`[data-admin-calendar] ${e}`)?.focus()))}async function Da(t,e){const a=K(),n=a.find(i=>i.id===t);if(!n||n.status===e)return;if(P){try{const i=await k.updateOrder(t,{status:e});v(f.orders,a.map(r=>r.id===t?i:r))}catch(i){q=H(i,"Не вдалося змінити статус заявки.")}w();return}const s=n.status;n.status=e,n.statusHistory=[...n.statusHistory??[{status:s,at:n.createdAt}],{status:e,at:new Date().toISOString()}],v(f.orders,a),w()}function Oa(t){const e=t.trim().toLocaleLowerCase("uk-UA");document.querySelectorAll("[data-admin-client]").forEach(a=>{a.hidden=!!e&&!(a.dataset.search??"").includes(e)})}function Na(){const t=document.querySelector("#admin-product-list");t&&(t.innerHTML=Ke());const e=document.querySelector("#admin-product-count");e&&(e.textContent=String(le().length))}function Q(){const t=M();if(!t.length)return;t.some(n=>n.id===tt)||(tt=t[0].id),Fe(!0);const e=document.querySelector("#hero-product-count");e&&(e.textContent=String(t.length));const a=document.querySelector("#catalog-ready-label");a&&(a.innerHTML=`<span></span> ${t.length} готових розмірів`),N(!1),j(),G()}function Ua(t){const e=!!t,a=t??{id:"",number:"",name:"",dimensions:{length:180,width:120,height:50},basePrice:5,active:!0};return`
    <div class="admin-product-editor">
      <p class="eyebrow"><span></span> ${e?"Редагування товару":"Новий товар"}</p>
      <h2 id="admin-product-dialog-title">${e?`Коробка №${c(a.number)}`:"Додати коробку"}</h2>
      <p>Після збереження товар одразу оновиться в каталозі та калькуляторі.</p>
      <form id="admin-product-form" novalidate>
        <input type="hidden" name="productId" value="${c(a.id)}" />
        <div class="admin-editor-grid admin-editor-grid--identity">
          <label class="field"><span>Номер *</span><input class="input" name="number" value="${c(a.number)}" maxlength="20" required /></label>
          <label class="field"><span>Назва</span><input class="input" name="name" value="${c(a.name)}" placeholder="Самозбірна коробка" /></label>
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
          <div class="admin-editor-price-preview"><span>На сайті зараз</span><strong>${y(D(a,1))}</strong><small>опт: ${y(D(a,z))}</small></div>
        </div>
        <label class="checkbox admin-editor-active"><input name="active" type="checkbox"${a.active?" checked":""} /><span>Показувати товар у каталозі</span></label>
        <div class="form-status" data-product-form-status aria-live="polite"></div>
        <div class="admin-editor-actions">
          <button class="button button--ghost" type="button" data-close-admin-product>Скасувати</button>
          <button class="button button--primary" type="submit">${e?"Зберегти зміни":"Створити товар"}</button>
        </div>
      </form>
    </div>
  `}function ke(t){const e=document.querySelector("#admin-product-dialog"),a=document.querySelector("#admin-product-editor");if(!e||!a)return;const n=t?O().find(s=>s.id===t):void 0;a.innerHTML=Ua(n),typeof e.showModal=="function"?e.showModal():e.setAttribute("open",""),a.querySelector('input[name="number"]')?.focus()}async function Ha(t){t.classList.add("was-validated");const e=t.querySelector("[data-product-form-status]");if(!t.reportValidity()){e&&(e.className="form-status is-error",e.textContent="Перевірте обов’язкові поля.");return}const a=new FormData(t),n=String(a.get("productId")??""),s=String(a.get("number")??"").trim(),i=O(),r=i.find(d=>d.id===n);if(!Le.test(s)){e&&(e.className="form-status is-error",e.textContent="У номері можна використовувати літери, цифри, крапку, дефіс і підкреслення.");return}if(i.some(d=>d.number.toLocaleLowerCase("uk-UA")===s.toLocaleLowerCase("uk-UA")&&d.id!==n)){e&&(e.className="form-status is-error",e.textContent="Товар із таким номером уже існує.");return}const u=a.get("active")==="on";if(r?.active&&!u&&M().length<=1){e&&(e.className="form-status is-error",e.textContent="У каталозі має залишитися хоча б один активний товар.");return}const o=r?.id??`box-${s.toLocaleLowerCase("uk-UA").replace(/[^a-zа-яіїєґ0-9]+/giu,"-")}-${Date.now().toString(36)}`,l={...r,id:o,number:s,name:String(a.get("name")??"").trim()||`Самозбірна коробка №${s}`,dimensions:{length:Number(a.get("length")),width:Number(a.get("width")),height:Number(a.get("height"))},basePrice:Number(a.get("basePrice")),active:u,updatedAt:new Date().toISOString()};if(P){try{const d=r?await k.updateProduct(r.id,l):await k.createProduct({number:l.number,name:l.name,dimensions:l.dimensions,basePrice:l.basePrice,sourceQuantity:l.sourceQuantity,active:l.active}),m=r?i.map(h=>h.id===r.id?d:h):[...i,d];F(m),Q(),document.querySelector("#admin-product-dialog")?.close(),q=r?`Товар №${s} оновлено.`:`Товар №${s} додано до каталогу.`,w()}catch(d){e&&(e.className="form-status is-error",e.textContent=H(d,"Не вдалося зберегти товар на сервері."))}return}const g=r?i.map(d=>d.id===r.id?l:d):[...i,l];F(g),Q(),document.querySelector("#admin-product-dialog")?.close(),q=r?`Товар №${s} оновлено.`:`Товар №${s} додано до каталогу.`,w()}function Ae(t,e){const a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=URL.createObjectURL(a),s=document.createElement("a");s.href=n,s.download=t,s.click(),window.setTimeout(()=>URL.revokeObjectURL(n),0)}function Fa(t,e,a){const n=new Blob([e],{type:a}),s=URL.createObjectURL(n),i=document.createElement("a");i.href=s,i.download=t,i.click(),window.setTimeout(()=>URL.revokeObjectURL(s),0)}function ja(t){const e=String(t);return/[;"\n\r]/.test(e)?`"${e.replaceAll('"','""')}"`:e}function Ba(){const t=["number","name","length","width","height","basePrice","active"],e=O().map(a=>[a.number,a.name,a.dimensions.length,a.dimensions.width,a.dimensions.height,a.basePrice,a.active].map(ja).join(";"));return`\uFEFF${[t.join(";"),...e].join(`\r
`)}`}function Ra(){return{version:1,createdAt:new Date().toISOString(),accounts:J(),orders:K(),products:O(),cart:Z(),measurements:nt(),fit:A?{dimensions:A,margin:C}:null}}function Va(t){if(!t||typeof t!="object")return!1;const e=t;if(e.version!==1||!Array.isArray(e.accounts)||!Array.isArray(e.orders)||!Array.isArray(e.products))return!1;const a=e.accounts.every(i=>i&&typeof i.id=="string"&&typeof i.phone=="string"&&(i.role==="admin"||i.role==="client")),n=e.products.every(i=>i&&typeof i.id=="string"&&typeof i.number=="string"&&Number.isFinite(i.basePrice)&&[i.dimensions?.length,i.dimensions?.width,i.dimensions?.height].every(r=>Number.isFinite(r)&&Number(r)>0)),s=e.orders.every(i=>i&&typeof i.id=="string"&&typeof i.phone=="string"&&Array.isArray(i.items)&&Number.isFinite(i.total));return a&&n&&s&&e.accounts.some(i=>i.role==="admin")}async function Qa(t){const e=t.files?.[0];if(e){if(P){q="Серверну копію можна завантажити, а відновлення виконується тільки на сервері адміністратором інфраструктури.",t.value="",w();return}try{const a=JSON.parse(await e.text());if(!Va(a))throw new Error("Файл не є коректною резервною копією ToffiPacks.");if(!window.confirm("Відновити локальні дані з цієї копії? Поточні заявки, клієнти й товари буде замінено."))return;v(f.accounts,a.accounts),v(f.orders,a.orders),v(f.products,a.products),v(f.cart,Array.isArray(a.cart)?a.cart:[]),v(f.measurements,Array.isArray(a.measurements)?a.measurements:[]),a.fit?v(f.fit,a.fit):localStorage.removeItem(f.fit),A=a.fit?.dimensions??null,C=a.fit?.margin===5||a.fit?.margin===10?a.fit.margin:0,J().some(n=>n.id===localStorage.getItem(f.session))||localStorage.removeItem(f.session),Q(),W(),B(),q=`Резервну копію від ${new Date(a.createdAt).toLocaleString("uk-UA")} відновлено.`,w()}catch(a){q=a instanceof Error?a.message:"Не вдалося відновити резервну копію.",w()}finally{t.value=""}}}function za(t){const e=[];let a=[],n="",s=!1;for(let i=0;i<t.length;i+=1){const r=t[i];r==='"'?s&&t[i+1]==='"'?(n+='"',i+=1):s=!s:r===";"&&!s?(a.push(n.trim()),n=""):(r===`
`||r==="\r")&&!s?(r==="\r"&&t[i+1]===`
`&&(i+=1),a.push(n.trim()),a.some(Boolean)&&e.push(a),a=[],n=""):n+=r}return a.push(n.trim()),a.some(Boolean)&&e.push(a),e}function Ka(t){const e=za(t.replace(/^\uFEFF/,"")),a=e.shift()?.map(l=>l.trim())??[],n=["number","name","length","width","height","basePrice","active"];if(!n.every(l=>a.includes(l)))throw new Error(`Потрібні колонки: ${n.join(", ")}`);const s=Object.fromEntries(a.map((l,g)=>[l,g])),i=O(),r=new Map(i.map(l=>[l.number.toLocaleLowerCase("uk-UA"),l])),u=e.map(l=>{const g=U=>l[s[U]]?.trim()??"",d=g("number"),m=U=>Number(g(U).replace(",",".")),h={length:m("length"),width:m("width"),height:m("height")},$=m("basePrice");if(!Le.test(d)||!Object.values(h).every(U=>Number.isFinite(U)&&U>0)||!Number.isFinite($)||$<=0)throw new Error(`Некоректні дані для коробки ${d||"без номера"}.`);const T=r.get(d.toLocaleLowerCase("uk-UA")),V=g("active").toLocaleLowerCase("uk-UA");return{...T,id:T?.id??`box-${d.toLocaleLowerCase("uk-UA").replace(/[^a-zа-яіїєґ0-9]+/giu,"-")}-${Date.now().toString(36)}`,number:d,name:g("name")||T?.name||`Самозбірна коробка №${d}`,dimensions:h,basePrice:$,active:!["false","0","ні","no"].includes(V),updatedAt:new Date().toISOString()}}),o=new Set(u.map(l=>l.number.toLocaleLowerCase("uk-UA")));return[...i.filter(l=>!o.has(l.number.toLocaleLowerCase("uk-UA"))),...u]}async function Ja(t){const e=t.files?.[0];if(e)try{const a=Ka(await e.text());if(!window.confirm(`Імпортувати ${a.length} товарів? Позиції з однаковими номерами буде оновлено.`))return;if(P){const n=await k.adminProducts();for(const s of a){const i=n.find(r=>r.id===s.id||r.number.toLocaleLowerCase("uk-UA")===s.number.toLocaleLowerCase("uk-UA"));i?await k.updateProduct(i.id,s):await k.createProduct({number:s.number,name:s.name,dimensions:s.dimensions,basePrice:s.basePrice,sourceQuantity:s.sourceQuantity,active:s.active})}F(await k.adminProducts()),Q(),q="CSV імпортовано на сервер. Каталог оновлено.",w();return}F(a),Q(),q="CSV імпортовано. Каталог оновлено.",w()}catch(a){q=a instanceof Error?a.message:"Не вдалося прочитати CSV.",w()}finally{t.value=""}}function Xt(){const t=document.querySelector("#admin-page"),e=document.querySelector("#account-page"),a=document.querySelector("#main"),n=document.querySelector(".site-header"),s=document.querySelector(".site-footer"),i=document.querySelector("#support-widget"),r=document.querySelector(".demo-strip"),u=["#admin","#admin-orders","#admin-clients","#admin-products"].includes(window.location.hash),o=window.location.hash==="#account";t&&(t.hidden=!u),e&&(e.hidden=!o),a&&(a.hidden=u||o),n&&(n.hidden=u||o),s&&(s.hidden=u||o),i&&(i.hidden=u),r&&(r.hidden=u||o),document.body.classList.toggle("is-admin",u),document.body.classList.toggle("is-account",o),u?(Ut(!1),w(),P&&ft()&&Qt().then(()=>w()).catch(l=>{q=H(l,"Не вдалося оновити дані адмінки."),w()}),window.scrollTo({top:0})):o&&(B(),P&&ft()&&Qt().then(()=>{W(),B()}).catch(()=>{}),window.scrollTo({top:0}))}function Wa(){const t=document.querySelectorAll(".reveal");if(!("IntersectionObserver"in window)){t.forEach(a=>a.classList.add("is-visible"));return}const e=new IntersectionObserver(a=>{a.forEach(n=>{n.isIntersecting&&(n.target.classList.add("is-visible"),e.unobserve(n.target))})},{threshold:.12});t.forEach(a=>e.observe(a))}document.querySelector("#menu-button")?.addEventListener("click",t=>{const e=t.currentTarget,a=document.querySelector("#site-nav"),n=e.getAttribute("aria-expanded")!=="true";e.setAttribute("aria-expanded",String(n)),a?.classList.toggle("is-open",n)});document.querySelector("#support-trigger")?.addEventListener("click",()=>{document.querySelector("#support-panel")?.hidden?ca():Ut()});document.querySelector("[data-support-close]")?.addEventListener("click",()=>{Ut()});document.querySelectorAll(".site-nav a").forEach(t=>{t.addEventListener("click",()=>{document.querySelector("#site-nav")?.classList.remove("is-open"),document.querySelector("#menu-button")?.setAttribute("aria-expanded","false")})});document.querySelector('.site-header .brand[href="#top"]')?.addEventListener("click",t=>{t.preventDefault(),window.location.hash!=="#top"&&(window.history.pushState(null,"","#top"),Xt()),window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})});document.querySelector("#fit-form")?.addEventListener("submit",t=>{t.preventDefault();const e=t.currentTarget;e.classList.add("was-validated");const a=document.querySelector("#fit-message");if(!e.reportValidity()){a&&(a.textContent="Вкажіть три додатні розміри.",a.className="form-message is-error");return}const n=new FormData(e);A={length:Number(n.get("length")),width:Number(n.get("width")),height:Number(n.get("height"))};const s=Number(n.get("fitMargin"));C=s===5||s===10?s:0,Ne(A,C),X=!1,a&&(a.textContent=`Розміри застосовано · ${ct(C)}.`,a.className="form-message is-success"),St(),window.setTimeout(()=>document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth"}),180)});document.querySelector("#catalog-search")?.addEventListener("input",t=>{Ot=t.currentTarget.value,X=!1,St()});const et=document.querySelector("#catalog-sort"),mt=et?.querySelector(".catalog-sort__trigger"),bt=et?.querySelector(".catalog-sort__menu"),Y=Array.from(et?.querySelectorAll("[data-sort-value]")??[]);function Gt(t=!1){!mt||!bt||(mt.setAttribute("aria-expanded","false"),bt.hidden=!0,et?.classList.remove("is-open"),t&&mt.focus())}function We(){!mt||!bt||(mt.setAttribute("aria-expanded","true"),bt.hidden=!1,et?.classList.add("is-open"))}function Za(t){const e=Y.find(n=>n.dataset.sortValue===t),a=document.querySelector("#catalog-sort-value");!e||!et||!a||(ie=t,et.dataset.value=t,a.textContent=e.querySelector("span")?.textContent??e.textContent,Y.forEach(n=>{n.setAttribute("aria-selected",String(n===e))}),Gt(!0),St())}mt?.addEventListener("click",()=>{bt?.hidden?We():Gt()});Y.forEach(t=>{t.addEventListener("click",()=>{Za(t.dataset.sortValue)})});et?.addEventListener("keydown",t=>{const e=Y.indexOf(document.activeElement),a=Y.findIndex(s=>s.getAttribute("aria-selected")==="true");if(t.key==="Escape"){t.preventDefault(),Gt(!0);return}if(t.key!=="ArrowDown"&&t.key!=="ArrowUp"&&t.key!=="Home"&&t.key!=="End")return;t.preventDefault(),bt?.hidden&&We();let n=e>=0?e:a;t.key==="Home"&&(n=0),t.key==="End"&&(n=Y.length-1),t.key==="ArrowDown"&&(n=(n+1)%Y.length),t.key==="ArrowUp"&&(n=(n-1+Y.length)%Y.length),Y[n]?.focus()});document.addEventListener("click",t=>{et?.contains(t.target)||Gt()});document.querySelector("#reset-catalog")?.addEventListener("click",()=>{A=null,C=0,Ot="",X=!1;const t=document.querySelector("#catalog-search");t&&(t.value="");const e=document.querySelector("#fit-message");e&&(e.textContent=""),localStorage.removeItem(f.fit),St()});document.querySelector("#catalog-more-button")?.addEventListener("click",()=>{X=!X,N(!1),X||document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth",block:"start"})});window.addEventListener("resize",()=>N(!1));document.querySelector("#quantity-input")?.addEventListener("input",t=>{pt(Number(t.currentTarget.value))});document.querySelector("#hero-quantity-input")?.addEventListener("input",t=>{pt(Number(t.currentTarget.value))});document.querySelector("#request-form")?.addEventListener("submit",t=>{t.preventDefault(),qa(t.currentTarget)});document.addEventListener("click",t=>{const e=t.target,a=e.closest("[data-support-topic]");if(a?.dataset.supportTopic){da(a.dataset.supportTopic);return}if(e.closest("[data-support-action]")){Ut(!1);return}const n=e.closest("[data-product-picker-value]");if(n?.dataset.productPickerValue){const p=n.closest("[data-product-picker]");p&&ut(p,!0),Re(n.dataset.productPickerValue);return}const s=e.closest("[data-product-picker-trigger]");if(s){const p=s.closest("[data-product-picker]");p&&ga(p);return}e.closest("[data-product-picker]")||je(),e.closest("[data-order-status-control]")||Bt(),e.closest("[data-admin-calendar]")||Je();const i=e.closest("[data-order-status-trigger]");if(i){const p=i.closest("[data-order-status-control]"),b=p?.querySelector(".order-status-control__menu");if(!p||!b)return;const _=b.hidden;Bt(p),b.hidden=!_,p.classList.toggle("is-open",_),i.setAttribute("aria-expanded",String(_));return}const r=e.closest("[data-order-status-option]");if(r?.dataset.orderId&&r.dataset.orderStatusOption){Da(r.dataset.orderId,r.dataset.orderStatusOption);return}const u=e.closest("[data-calendar-trigger]");if(u){const p=u.closest("[data-admin-calendar]"),b=p?.querySelector(".admin-calendar__popover");if(!p||!b)return;const _=b.hidden;Bt(),b.hidden=!_,p.classList.toggle("is-open",_),u.setAttribute("aria-expanded",String(_));return}const o=e.closest("[data-calendar-month]");if(o?.dataset.calendarMonth){const p=Pt(kt||xt(new Date));p.setMonth(p.getMonth()+Number(o.dataset.calendarMonth),1),kt=xt(p),jt(!0,`[data-calendar-month="${o.dataset.calendarMonth}"]`);return}const l=e.closest("[data-calendar-date]");if(l?.dataset.calendarDate){const p=l.dataset.calendarDate;kt=p,!x||L?(x=p,L="",jt(!0,`[data-calendar-date="${p}"]`)):(L=p,L<x&&([x,L]=[L,x]),jt(!1)),Lt();return}if(e.closest("[data-calendar-clear]")){x="",L="",jt(!1),Lt();return}const g=e.closest("[data-saved-measurement]");if(g?.dataset.savedMeasurement){const p=nt().find(b=>b.id===g.dataset.savedMeasurement);p&&ia(p);return}if(e.closest("[data-clear-measurements]")){localStorage.removeItem(f.measurements),Oe(),B();return}if(e.closest("[data-use-tight-fit]")&&A){C=0,Ne(A,C);const p=document.querySelector('#fit-form input[name="fitMargin"][value="0"]');p&&(p.checked=!0),St();return}const d=e.closest("[data-open-product]");if(d?.dataset.openProduct){we(d.dataset.openProduct);return}const m=e.closest("[data-quantity]");if(m?.dataset.quantity){pt(Number(m.dataset.quantity));return}const h=e.closest("[data-quantity-step]");if(h?.dataset.quantityStep){pt(S+Number(h.dataset.quantityStep));return}if(e.closest("[data-product-to-cart]")){Se(gt??tt,S),At();return}if(e.closest("[data-add-selected-to-cart]")){Se(tt,S);return}const $=e.closest("[data-cart-step]");if($?.dataset.cartProduct&&$.dataset.cartStep){const p=Z().find(b=>b.productId===$.dataset.cartProduct);p&&Ve(p.productId,p.quantity+Number($.dataset.cartStep));return}const T=e.closest("[data-edit-cart]");if(T?.dataset.editCart){const p=Z().find(b=>b.productId===T.dataset.editCart);p&&(pt(p.quantity),we(p.productId));return}if(e.closest("[data-clear-cart]")){window.confirm("Очистити всі позиції кошика?")&&(v(f.cart,[]),G());return}const V=e.closest("[data-repeat-order]");if(V?.dataset.repeatOrder){ba(V.dataset.repeatOrder);return}const U=e.closest("[data-remove-cart]");if(U?.dataset.removeCart){ha(U.dataset.removeCart);return}if(e.closest("[data-product-to-calculator]")){At(()=>{window.location.hash="calculator",document.querySelector("#calculator")?.scrollIntoView({behavior:"smooth",block:"start"})});return}if(e.closest("[data-close-dialog]")){At();return}if(e.closest("[data-edit-profile]")){$a();return}if(e.closest("[data-close-profile]")){document.querySelector("#profile-dialog")?.close();return}const st=e.closest("[data-auth-tab]");if(st?.dataset.authTab){const p=st.closest(".auth-forms");p?.querySelectorAll("[data-auth-tab]").forEach(b=>{const _=b.dataset.authTab===st.dataset.authTab;b.classList.toggle("is-active",_),b.setAttribute("aria-selected",String(_))}),p?.querySelectorAll("[data-auth-panel]").forEach(b=>{b.hidden=b.dataset.authPanel!==st.dataset.authTab});return}if(e.closest("#logout-button")){P&&k.logout().catch(()=>rt()),localStorage.removeItem(f.session),W(),j(),N(!1),B();return}const _t=e.closest("[data-account-price-product]");if(_t?.dataset.accountPriceProduct){const p=M().find(b=>b.id===_t.dataset.accountPriceProduct);p&&(tt=p.id,j(),N(!1),window.location.hash="calculator");return}const at=e.closest("[data-client-prices-toggle]");if(at?.dataset.clientPricesToggle){const p=at.dataset.clientPricesToggle,b=document.getElementById(`client-prices-${p}`),_=!at.classList.contains("is-open");at.classList.toggle("is-open",_),at.setAttribute("aria-expanded",String(_)),_?(it.add(p),b&&(b.hidden=!1,window.requestAnimationFrame(()=>b.classList.add("is-open")))):(it.delete(p),b?.classList.remove("is-open"),window.setTimeout(()=>{b&&!b.classList.contains("is-open")&&(b.hidden=!0)},220));return}if(e.closest("[data-create-product]")){ke();return}const Ht=e.closest("[data-edit-product]");if(Ht?.dataset.editProduct){ke(Ht.dataset.editProduct);return}if(e.closest("[data-close-admin-product]")){document.querySelector("#admin-product-dialog")?.close();return}const te=e.closest("[data-toggle-product]");if(te?.dataset.toggleProduct){const p=O(),b=p.find(_=>_.id===te.dataset.toggleProduct);if(b){if(P){k.updateProduct(b.id,{active:!b.active}).then(_=>{F(p.map(fe=>fe.id===b.id?_:fe)),Q(),q=_.active?`Товар №${_.number} повернуто на сайт.`:`Товар №${_.number} приховано.`,w()}).catch(_=>{q=H(_,"Не вдалося змінити видимість товару."),w()});return}b.active&&M().length<=1?q="У каталозі має залишитися хоча б один активний товар.":(b.active=!b.active,b.updatedAt=new Date().toISOString(),F(p),Q(),q=b.active?`Товар №${b.number} повернуто на сайт.`:`Товар №${b.number} приховано.`),w()}return}const ee=e.closest("[data-delete-product]");if(ee?.dataset.deleteProduct){const p=O(),b=p.find(_=>_.id===ee.dataset.deleteProduct);if(!b)return;if(b.active&&M().length<=1){q="Не можна видалити останній активний товар.",w();return}if(window.confirm(`Видалити коробку №${b.number}? Цю дію не можна скасувати.`)){if(P){k.deleteProduct(b.id).then(()=>{F(p.filter(_=>_.id!==b.id)),v(f.cart,Z().filter(_=>_.productId!==b.id)),Q(),q=`Товар №${b.number} видалено.`,w()}).catch(_=>{q=H(_,"Не вдалося видалити товар."),w()});return}F(p.filter(_=>_.id!==b.id)),v(f.cart,Z().filter(_=>_.productId!==b.id)),Q(),q=`Товар №${b.number} видалено.`,w()}return}const pe=e.closest("[data-delete-order]");if(pe?.dataset.deleteOrder){const p=K().find(b=>b.id===pe.dataset.deleteOrder);if(!p)return;if(window.confirm(`Видалити заявку ${p.id} від ${p.customerName}? Цю дію не можна скасувати.`)){if(P){k.deleteOrder(p.id).then(()=>{v(f.orders,K().filter(b=>b.id!==p.id)),q=`Заявку ${p.id} видалено.`,w()}).catch(b=>{q=H(b,"Не вдалося видалити заявку."),w()});return}v(f.orders,K().filter(b=>b.id!==p.id)),q=`Заявку ${p.id} видалено.`,w()}return}const me=e.closest("[data-product-filter]");if(me?.dataset.productFilter){lt=me.dataset.productFilter,w();return}const ae=e.closest("[data-admin-order-filter]");if(ae?.dataset.adminOrderFilter){Vt=ae.dataset.adminOrderFilter,document.querySelectorAll("[data-admin-order-filter]").forEach(p=>{p.classList.toggle("is-active",p===ae)}),Lt();return}if(e.closest("[data-export-backup]")){if(P){k.backup().then(p=>{Ae(`toffipacks-server-backup-${new Date().toISOString().slice(0,10)}.json`,p)}).catch(p=>{q=H(p,"Не вдалося завантажити серверну копію."),w()});return}Ae(`toffipacks-backup-${new Date().toISOString().slice(0,10)}.json`,Ra());return}if(e.closest("[data-export-products]")){Fa(`toffipacks-products-${new Date().toISOString().slice(0,10)}.csv`,Ba(),"text/csv;charset=utf-8");return}if(e.closest("[data-reset-products]")){if(window.confirm("Відновити початковий каталог? Усі ручні зміни товарів буде втрачено.")){if(P){k.resetProducts().then(p=>{F(p),Q(),q="Початковий каталог відновлено.",w()}).catch(p=>{q=H(p,"Не вдалося відновити каталог."),w()});return}F(Wt.map(p=>({...p,active:!0,updatedAt:new Date().toISOString()}))),Q(),q="Початковий каталог відновлено.",w()}return}if(e.closest("#admin-logout")){P&&k.logout().catch(()=>rt()),localStorage.removeItem(f.session),W(),j(),N(!1),window.location.hash="admin",w();return}});document.addEventListener("keydown",t=>{const e=t.target,a=document.querySelector("#support-panel");if(t.key==="Escape"&&a&&!a.hidden){t.preventDefault(),Ut();return}const n=e.closest("[data-support-topic]");if(n&&["ArrowDown","ArrowUp","Home","End"].includes(t.key)){t.preventDefault();const d=Array.from(document.querySelectorAll("[data-support-topic]")),m=d.indexOf(n);let h=m;t.key==="ArrowDown"&&(h=(m+1)%d.length),t.key==="ArrowUp"&&(h=(m-1+d.length)%d.length),t.key==="Home"&&(h=0),t.key==="End"&&(h=d.length-1),d[h]?.focus();return}const s=e.closest("[data-product-picker-trigger]");if(s){const d=s.closest("[data-product-picker]");if(d&&(t.key==="ArrowDown"||t.key==="ArrowUp")){t.preventDefault(),Be(d,!0);return}if(d&&t.key==="Escape"&&d.classList.contains("is-open")){t.preventDefault(),ut(d,!0);return}}const i=e.closest("[data-product-picker-value]");if(i){const d=i.closest("[data-product-picker]"),m=Array.from(d?.querySelectorAll("[data-product-picker-value]")??[]),h=m.indexOf(i);if(t.key==="Escape"){t.preventDefault(),d&&ut(d,!0);return}if(t.key==="Tab"){d&&ut(d);return}if(!["ArrowDown","ArrowUp","Home","End"].includes(t.key)||!m.length)return;t.preventDefault();let $=h;t.key==="ArrowDown"&&($=(h+1)%m.length),t.key==="ArrowUp"&&($=(h-1+m.length)%m.length),t.key==="Home"&&($=0),t.key==="End"&&($=m.length-1),m[$]?.focus(),m[$]?.scrollIntoView({block:"nearest"});return}const r=e.closest("[data-order-status-trigger]");if(r&&(t.key==="ArrowDown"||t.key==="ArrowUp")){t.preventDefault();const d=r.closest("[data-order-status-control]");d?.querySelector(".order-status-control__menu")?.hidden&&r.click();const h=Array.from(d?.querySelectorAll("[data-order-status-option]")??[]),$=Math.max(0,h.findIndex(T=>T.getAttribute("aria-selected")==="true"));h[t.key==="ArrowUp"?Math.max(0,$-1):$]?.focus();return}const u=e.closest("[data-order-status-option]");if(u){const d=u.closest("[data-order-status-control]"),m=Array.from(d?.querySelectorAll("[data-order-status-option]")??[]),h=m.indexOf(u);if(t.key==="Escape"){t.preventDefault(),Bt(),d?.querySelector("[data-order-status-trigger]")?.focus();return}if(!["ArrowDown","ArrowUp","Home","End"].includes(t.key))return;t.preventDefault();let $=h;t.key==="ArrowDown"&&($=(h+1)%m.length),t.key==="ArrowUp"&&($=(h-1+m.length)%m.length),t.key==="Home"&&($=0),t.key==="End"&&($=m.length-1),m[$]?.focus();return}const o=e.closest("[data-admin-calendar]");if(o&&t.key==="Escape"){t.preventDefault(),Je(),o.querySelector("[data-calendar-trigger]")?.focus();return}const l=e.closest("[data-calendar-trigger]");if(l&&t.key==="ArrowDown"){t.preventDefault(),o?.querySelector(".admin-calendar__popover")?.hidden&&l.click(),(o?.querySelector("[data-calendar-date].is-selected")??o?.querySelector("[data-calendar-date].is-today")??o?.querySelector("[data-calendar-date]:not(.is-outside)"))?.focus();return}const g=e.closest("[data-calendar-date]");if(g&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(t.key)){t.preventDefault();const d=Array.from(o?.querySelectorAll("[data-calendar-date]")??[]),m=d.indexOf(g),h=t.key==="ArrowLeft"?-1:t.key==="ArrowRight"?1:t.key==="ArrowUp"?-7:7;d[m+h]?.focus()}});document.addEventListener("input",t=>{const e=t.target;if(e instanceof HTMLInputElement&&e.id==="modal-quantity-input"){pt(Number(e.value));return}if(e instanceof HTMLInputElement&&e.id==="admin-product-search"){ce=e.value,Na();return}if(e instanceof HTMLInputElement&&e.id==="admin-order-search"){de=e.value,Lt();return}if(e instanceof HTMLInputElement&&e.id==="admin-client-search"){Oa(e.value);return}if(e instanceof HTMLInputElement&&e.name==="basePrice"&&e.closest("#admin-product-form")){const a=Number(e.value)||0,n={...$t(),basePrice:a},s=e.closest("form")?.querySelector(".admin-editor-price-preview"),i=s?.querySelector("strong"),r=s?.querySelector("small");i&&(i.textContent=y(D(n,1))),r&&(r.textContent=`опт: ${y(D(n,z))}`)}});document.addEventListener("submit",t=>{const e=t.target;e instanceof HTMLFormElement&&(e.id==="login-form"?(t.preventDefault(),_e(e)):e.id==="register-form"?(t.preventDefault(),_a(e)):e.id==="admin-login-form"?(t.preventDefault(),_e(e,!0)):e.id==="admin-product-form"?(t.preventDefault(),Ha(e)):e.id==="profile-form"&&(t.preventDefault(),wa(e)))});document.addEventListener("change",t=>{const e=t.target;if(e instanceof HTMLInputElement&&e.matches("[data-import-products]")){Ja(e);return}if(e instanceof HTMLInputElement&&e.matches("[data-import-backup]")){Qa(e);return}if(e instanceof HTMLTextAreaElement&&e.dataset.orderNote){const a=K(),n=a.find(s=>s.id===e.dataset.orderNote);n&&(n.managerNote=e.value.trim(),v(f.orders,a),P&&k.updateOrder(n.id,{managerNote:n.managerNote}).then(s=>{v(f.orders,a.map(i=>i.id===s.id?s:i))}).catch(s=>{q=H(s,"Не вдалося зберегти нотатку менеджера."),w()}));return}if(e instanceof HTMLInputElement||e instanceof HTMLSelectElement){if(e instanceof HTMLInputElement&&e.dataset.cartQuantity){Ve(e.dataset.cartQuantity,Number(e.value));return}if(e instanceof HTMLInputElement&&e.dataset.partnerToggle){const a=J(),n=a.find(s=>s.id===e.dataset.partnerToggle);if(n){if(n.partner=e.checked,n.partner&&!Object.keys(n.productPrices??{}).length&&(n.productPrices=Object.fromEntries(O().map(s=>[s.id,Math.round((s.basePrice+Mt)*100)/100]))),n.partner&&it.add(n.id),v(f.accounts,a),P){k.updateClient(n.id,{partner:n.partner,productPrices:n.productPrices}).then(s=>{v(f.accounts,a.map(i=>i.id===s.id?s:i)),w()}).catch(s=>{q=H(s,"Не вдалося змінити статус клієнта."),w()});return}w()}return}if(e instanceof HTMLInputElement&&e.dataset.clientProductPrice&&e.dataset.clientId){const a=J(),n=a.find(s=>s.id===e.dataset.clientId);if(n){const s=e.value.trim(),i=Number(s);if(s&&(!Number.isFinite(i)||i<.01||i>1e4)){e.setCustomValidity("Вкажіть кінцеву ціну від 0,01 до 10 000 грн."),e.reportValidity();return}e.setCustomValidity(""),n.productPrices={...n.productPrices??{}},s?n.productPrices[e.dataset.clientProductPrice]=Math.round(i*100)/100:delete n.productPrices[e.dataset.clientProductPrice],it.add(n.id),v(f.accounts,a);const r=O().filter(l=>Number(n.productPrices?.[l.id])>0).length,u=document.querySelector(`[data-client-prices-toggle="${CSS.escape(n.id)}"] strong`);u&&(u.textContent=`${r} із ${O().length}`);const o=e.closest(".client-product-price");if(o?.classList.remove("is-saved"),o&&(o.offsetWidth,o.classList.add("is-saved"),window.setTimeout(()=>o.classList.remove("is-saved"),900)),P){k.updateClient(n.id,{productPrices:n.productPrices}).then(l=>{v(f.accounts,a.map(g=>g.id===l.id?l:g))}).catch(l=>{q=H(l,"Не вдалося зберегти персональну ціну."),w()});return}}}}});document.querySelector("#product-dialog")?.addEventListener("click",t=>{t.target===t.currentTarget&&At()});document.querySelector("#product-dialog")?.addEventListener("cancel",t=>{t.preventDefault(),At()});document.querySelector("#admin-product-dialog")?.addEventListener("click",t=>{t.target===t.currentTarget&&t.currentTarget.close()});document.querySelector("#profile-dialog")?.addEventListener("click",t=>{t.target===t.currentTarget&&t.currentTarget.close()});window.addEventListener("hashchange",Xt);async function Ya(){if(P){document.body.dataset.backend="loading";try{F(await k.products()),ft()&&await Qt(),document.body.dataset.backend="online",Q(),W(),Xt()}catch(t){document.body.dataset.backend="offline",console.error("ToffiPacks backend is unavailable:",t),window.location.hash.startsWith("#admin")&&(q="Сервер тимчасово недоступний. Дані не змінено.",w())}}}function oe(){W(),N(!1),j(),B()}async function Ze(){if(!(!P||!ft()||R()?.role!=="client"))try{Nt(await k.me()),oe()}catch(t){t instanceof Tt&&t.status===401&&(rt(),localStorage.removeItem(f.session),oe())}}window.addEventListener("storage",t=>{t.key===f.accounts&&R()?.role==="client"&&oe()});window.addEventListener("focus",()=>{Ze()});window.setInterval(()=>{document.visibilityState==="visible"&&Ze()},2e4);N(!0);window.setTimeout(()=>N(!1),460);j();W();Xt();Wa();Ya();"serviceWorker"in navigator&&window.location.protocol==="https:"&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});
