(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const ct=5e4,M=1e3,se=2,ie=1,_t=.5,kt=[{id:"box-301",number:"301",name:"Самозбірна коробка №301",dimensions:{length:165,width:100,height:30},basePrice:5,sourceQuantity:1e3},{id:"box-302",number:"302",name:"Самозбірна коробка №302",dimensions:{length:130,width:130,height:50},basePrice:7,sourceQuantity:800},{id:"box-303",number:"303",name:"Самозбірна коробка №303",dimensions:{length:190,width:150,height:100},basePrice:17,sourceQuantity:800},{id:"box-304",number:"304",name:"Самозбірна коробка №304",dimensions:{length:230,width:150,height:35},basePrice:11,sourceQuantity:800},{id:"box-305",number:"305",name:"Самозбірна коробка №305",dimensions:{length:160,width:85,height:110},basePrice:6.5},{id:"box-306",number:"306",name:"Самозбірна коробка №306",dimensions:{length:145,width:145,height:40},basePrice:6.5,sourceQuantity:1e3},{id:"box-307",number:"307",name:"Самозбірна коробка №307",dimensions:{length:280,width:180,height:100},basePrice:18,sourceQuantity:500},{id:"box-308",number:"308",name:"Самозбірна коробка №308",dimensions:{length:250,width:180,height:40},basePrice:12,sourceQuantity:800},{id:"box-309",number:"309",name:"Самозбірна коробка №309",dimensions:{length:210,width:150,height:50},basePrice:11,sourceQuantity:900},{id:"box-310",number:"310",name:"Самозбірна коробка №310",dimensions:{length:260,width:260,height:50},basePrice:15,sourceQuantity:600},{id:"box-311",number:"311",name:"Самозбірна коробка №311",dimensions:{length:370,width:170,height:100},basePrice:17},{id:"box-101",number:"101",name:"Самозбірна коробка №101",dimensions:{length:178,width:115,height:48},basePrice:4,sourceQuantity:800}],oe=[{question:"Як відбувається доставка?",answer:"Доставляємо по Києву та Київській області. Формат, точну адресу й вартість потрібно уточнити з менеджером під час підтвердження заявки."},{question:"Які строки виготовлення?",answer:"Строк залежить від розміру коробки, тиражу та завантаження виробництва. Менеджер називає точну дату до запуску замовлення."},{question:"Що отримує постійний клієнт?",answer:"Після підтвердження менеджером у кабінеті активується персональна ціна. Вона автоматично відображається в каталозі, калькуляторі та кошику."},{question:"Як проходить оплата?",answer:"Форму оплати, рахунок і підсумкову суму менеджер погоджує з вами до початку виготовлення."},{question:"Чи працюєте ви з малим і великим бізнесом?",answer:"Так. Можна почати з невеликої партії або замовити регулярний великий тираж. Калькулятор рахує до 50 000 коробок, більший обсяг прораховує менеджер."},{question:"Чи робите коробки під індивідуальний запит?",answer:"Так. Якщо серед готових розмірів немає потрібного, вкажіть габарити й особливості замовлення в коментарі. Менеджер уточнить деталі та підготує розрахунок."}];function p(e){return new Intl.NumberFormat("uk-UA",{style:"currency",currency:"UAH",minimumFractionDigits:Number.isInteger(e)?0:2,maximumFractionDigits:2}).format(e)}function L(e,t){return e.basePrice+(t>=M?ie:se)}function X(e,t,a){return a?.partner?e.basePrice+Math.min(Math.max(a.fixedMarkup,0),.99):L(e,t)}function ft(e){const{length:t,width:a,height:n}=e.dimensions;return t*a*n}function vt(e,t,a=0){const n=[e.length,e.width,e.height].sort((r,l)=>l-r),s=[t.length,t.width,t.height].sort((r,l)=>l-r),i=n.map((r,l)=>(s[l]-r)/2),o=i.map(r=>Math.max(0,a-r));return{fits:o.every(r=>r===0),clearancesPerSide:i,deficitsPerSide:o}}const u={accounts:"toffipacks-accounts-v3",orders:"toffipacks-orders-v3",session:"toffipacks-session-v3",cart:"toffipacks-cart-v1",products:"toffipacks-products-v1",fit:"toffipacks-fit-v1",measurements:"toffipacks-measurements-v1"},Vt=/^[\p{L}\p{N}._-]+$/u,lt=new Date().toISOString(),Bt=[{id:"account-admin",name:"Адміністратор ToffiPacks",phone:"+380000000001",company:"ToffiPacks",password:"admin123",role:"admin",partner:!1,fixedMarkup:_t,createdAt:lt},{id:"account-partner",name:"Постійний клієнт",phone:"+380671112233",company:"",password:"client123",role:"client",partner:!0,fixedMarkup:_t,createdAt:lt}],Qt=[];function nt(e,t){try{const a=localStorage.getItem(e);return a?JSON.parse(a):t}catch{return t}}function y(e,t){localStorage.setItem(e,JSON.stringify(t))}function re(){localStorage.getItem(u.accounts)||y(u.accounts,Bt),localStorage.getItem(u.orders)||y(u.orders,Qt),localStorage.getItem(u.cart)||y(u.cart,[]),localStorage.getItem(u.products)||y(u.products,kt.map(e=>({...e,active:!0,updatedAt:lt})))}re();const zt=nt(u.fit,null),ot=zt?.dimensions,ce=ot&&[ot.length,ot.width,ot.height].every(e=>Number.isFinite(e)&&e>0),St=zt?.margin;let H="box-101",f=500,pt="",xt="size",U=!1,$=ce?ot:null,S=St===5||St===10?St:0,Nt,B=null,Pt="",G="all",Tt="",ht="Усі",bt="",P="";const Kt=document.querySelector("#app");if(!Kt)throw new Error("Root element #app was not found.");function C(){return nt(u.accounts,Bt)}function I(){const e=kt.map(t=>({...t,active:!0,updatedAt:lt}));return nt(u.products,e).filter(t=>t&&typeof t.id=="string"&&typeof t.number=="string"&&Number.isFinite(t.basePrice)&&Number.isFinite(t.dimensions?.length)&&Number.isFinite(t.dimensions?.width)&&Number.isFinite(t.dimensions?.height)).map(t=>({...t,active:t.active!==!1,updatedAt:t.updatedAt||lt}))}function q(){return I().filter(e=>e.active)}function rt(e){y(u.products,e)}function F(){return nt(u.orders,Qt).map(t=>{if("items"in t&&Array.isArray(t.items))return{...t,statusHistory:Array.isArray(t.statusHistory)&&t.statusHistory.length?t.statusHistory:[{status:t.status,at:t.createdAt}]};const a=t;return{id:a.id,createdAt:a.createdAt,customerName:a.customerName,phone:a.phone,company:a.company,comment:a.comment,items:[{productId:a.productId,productNumber:a.productNumber,dimensions:a.dimensions,quantity:a.quantity,unitPrice:a.unitPrice,total:a.total,priceType:a.priceType}],total:a.total,accountId:a.accountId,status:a.status,statusHistory:[{status:a.status,at:a.createdAt}]}})}function O(){const e=q();return nt(u.cart,[]).filter(t=>e.some(a=>a.id===t.productId)&&t.quantity>0)}function E(){const e=localStorage.getItem(u.session);return C().find(t=>t.id===e)??null}function yt(){const e=q();return e.find(t=>t.id===H)??e[0]}function dt(e){return Number.isFinite(e)?Math.min(ct,Math.max(1,Math.round(e))):1}function Q(){return nt(u.measurements,[]).filter(e=>e&&typeof e.id=="string"&&[e.dimensions?.length,e.dimensions?.width,e.dimensions?.height].every(t=>Number.isFinite(t)&&Number(t)>0)&&[0,5,10].includes(e.margin))}function W(e){return e===0?"без додаткового запасу":`+${e} мм з кожного боку`}function Wt(){const e=Q();return e.length?`
    <div class="saved-measurements__head"><span>Збережені розміри</span><button type="button" data-clear-measurements>Очистити</button></div>
    <div class="saved-measurements__list">
      ${e.map(t=>`
            <button type="button" data-saved-measurement="${c(t.id)}">
              <strong>${A(t.dimensions)}</strong>
              <span>${W(t.margin)}</span>
            </button>
          `).join("")}
    </div>
  `:""}function Jt(){const e=document.querySelector("#saved-measurements");e&&(e.innerHTML=Wt(),e.hidden=!e.innerHTML)}function Xt(e,t){const a=`${e.length}-${e.width}-${e.height}-${t}`,n=Q().filter(i=>`${i.dimensions.length}-${i.dimensions.width}-${i.dimensions.height}-${i.margin}`!==a),s={id:`size-${a}`,dimensions:e,margin:t,createdAt:new Date().toISOString()};y(u.measurements,[s,...n].slice(0,5)),y(u.fit,{dimensions:e,margin:t}),Jt()}function le(e,t=!0){$={...e.dimensions},S=e.margin,y(u.fit,{dimensions:$,margin:S});const a=document.querySelector("#fit-form");if(a){a.elements.namedItem("length")?.setAttribute("value",String($.length)),a.elements.namedItem("width")?.setAttribute("value",String($.width)),a.elements.namedItem("height")?.setAttribute("value",String($.height));const s=o=>{const r=a.elements.namedItem(o);r instanceof HTMLInputElement&&(r.value=String($?.[o]??""))};s("length"),s("width"),s("height");const i=a.querySelector(`input[name="fitMargin"][value="${S}"]`);i&&(i.checked=!0)}const n=document.querySelector("#fit-message");n&&(n.textContent=`Розміри застосовано · ${W(S)}.`,n.className="form-message is-success"),U=!1,it(),t&&window.setTimeout(()=>document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth"}),180)}function ut(e){let t=e.replace(/\D/g,"");return t.length===10&&t.startsWith("0")&&(t=`38${t}`),t.length===12&&t.startsWith("380")?`+${t}`:e.trim()}function et(e){return ut(e).replace(/\D/g,"")}function c(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function A(e){return`${e.length} × ${e.width} × ${e.height} мм`}function Mt(e){const t=e%100,a=e%10;return t>=11&&t<=14?`${e} позицій`:a===1?`${e} позиція`:a>=2&&a<=4?`${e} позиції`:`${e} позицій`}function $t(e,t){return t?.partner?"Фіксована ціна клієнта":e>=M?"Оптова ціна":"Роздрібна ціна"}function st(e,t=!1){const{length:a,width:n,height:s}=e.dimensions,i=170+Math.min(100,a/3),o=58+Math.min(54,s/2.5),r=50+Math.min(44,n/4),l=72,d=t?70:82,b=d-r*.55,m=l+i,w=m+r,g=d+o;return`
    <svg class="box-visual${t?" box-visual--compact":""}" viewBox="0 0 470 270" role="img"
      aria-label="Схема коробки ${c(e.number)}, ${A(e.dimensions)}">
      <g class="box-visual__shape">
        <polygon class="box-visual__top" points="${l},${d} ${l+r},${b} ${w},${b} ${m},${d}" />
        <polygon class="box-visual__side" points="${m},${d} ${w},${b} ${w},${b+o} ${m},${g}" />
        <rect class="box-visual__front" x="${l}" y="${d}" width="${i}" height="${o}" />
        <rect class="box-visual__mark" x="${l+i*.35}" y="${d+o*.32}"
          width="${i*.3}" height="${Math.max(24,o*.34)}" rx="5" />
        <text class="box-visual__number" x="${l+i/2}" y="${d+o*.56}">№${c(e.number)}</text>
      </g>
      <g class="dimension-line dimension-line--length">
        <line x1="${l}" y1="${g+28}" x2="${m}" y2="${g+28}" />
        <line x1="${l}" y1="${g+20}" x2="${l}" y2="${g+36}" />
        <line x1="${m}" y1="${g+20}" x2="${m}" y2="${g+36}" />
        <rect x="${l+i/2-38}" y="${g+12}" width="76" height="32" rx="16" />
        <text x="${l+i/2}" y="${g+33}">${a} мм</text>
      </g>
      <g class="dimension-line dimension-line--height">
        <line x1="${l-26}" y1="${d}" x2="${l-26}" y2="${g}" />
        <line x1="${l-34}" y1="${d}" x2="${l-18}" y2="${d}" />
        <line x1="${l-34}" y1="${g}" x2="${l-18}" y2="${g}" />
        <rect x="2" y="${d+o/2-16}" width="66" height="32" rx="16" />
        <text x="35" y="${d+o/2+5}">${s} мм</text>
      </g>
      <g class="dimension-line dimension-line--width">
        <line x1="${m+8}" y1="${d-8}" x2="${w+8}" y2="${b-8}" />
        <rect x="${w-54}" y="${Math.max(4,b-48)}" width="76" height="32" rx="16" />
        <text x="${w-16}" y="${Math.max(25,b-27)}">${n} мм</text>
      </g>
    </svg>
  `}function Lt(){return q().map(e=>`<option value="${c(e.id)}"${e.id===H?" selected":""}>№${c(e.number)} · ${A(e.dimensions)}</option>`).join("")}function de(){const e=yt();return`
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
            <div><dt id="hero-product-count">${q().length}</dt><dd>готових розмірів</dd></div>
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
            <select class="select" id="hero-product-select">${Lt()}</select>
          </label>
          <label class="field">
            <span>Кількість</span>
            <input class="input" id="hero-quantity-input" type="number" min="1" max="${ct}" value="${f}" />
          </label>
          <div class="hero-calculator__result">
            <span id="hero-price-label">Роздрібна ціна</span>
            <strong id="hero-total">${p(L(e,f)*f)}</strong>
            <small id="hero-unit">${p(L(e,f))} / шт.</small>
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
                <input class="input" name="length" type="number" min="1" max="2000" value="${$?.length??170}" required />
              </label>
              <span class="dimension-sign" aria-hidden="true">×</span>
              <label class="field">
                <span>Ширина, мм</span>
                <input class="input" name="width" type="number" min="1" max="2000" value="${$?.width??110}" required />
              </label>
              <span class="dimension-sign" aria-hidden="true">×</span>
              <label class="field">
                <span>Висота, мм</span>
                <input class="input" name="height" type="number" min="1" max="2000" value="${$?.height??45}" required />
              </label>
            </div>
            <fieldset class="fit-margin">
              <legend>Запас навколо предмета</legend>
              <div class="fit-margin__options">
                ${[0,5,10].map(t=>`
                      <label>
                        <input type="radio" name="fitMargin" value="${t}"${S===t?" checked":""} />
                        <span>${t===0?"Точно":`+${t} мм / бік`}</span>
                      </label>
                    `).join("")}
              </div>
              <p>Запас додається з обох боків кожної сторони предмета.</p>
            </fieldset>
            <button class="button button--primary" type="submit">Знайти коробку</button>
            <p class="form-message" id="fit-message" aria-live="polite"></p>
            <div class="saved-measurements" id="saved-measurements"${Q().length?"":" hidden"}>${Wt()}</div>
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
            <p class="eyebrow" id="catalog-ready-label"><span></span> ${q().length} готових розмірів</p>
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
              <select class="select select--large" id="calculator-product-select">${Lt()}</select>
            </label>
            <div class="calculator-preview" id="calculator-preview">${st(e,!0)}</div>
            <div class="quantity-block">
              <div class="quantity-block__label">
                <label for="quantity-input">Кількість</label>
                <output id="quantity-output">${f.toLocaleString("uk-UA")} шт.</output>
              </div>
              <div class="quantity-control">
                <button type="button" data-quantity-step="-100" aria-label="Зменшити кількість на 100">−</button>
                <input id="quantity-input" type="number" min="1" max="${ct}" value="${f}" />
                <button type="button" data-quantity-step="100" aria-label="Збільшити кількість на 100">+</button>
              </div>
              <div class="quantity-guide" aria-label="Правила ціни">
                <span><b>1–999</b><small>роздрібна ціна</small></span>
                <i aria-hidden="true"></i>
                <span><b>від 1 000</b><small>оптова ціна</small></span>
              </div>
              <div class="quantity-presets" aria-label="Швидкий вибір кількості">
                ${[100,500,1e3,5e3,1e4,5e4].map(t=>`<button type="button" data-quantity="${t}">${t.toLocaleString("uk-UA")}</button>`).join("")}
              </div>
            </div>
            <div class="calculation-result" aria-live="polite">
              <div>
                <span id="calculator-tier">Роздрібна ціна</span>
                <strong id="calculator-unit-price">${p(L(e,f))}<small>/ шт.</small></strong>
              </div>
              <div class="calculation-result__total">
                <span>Весь тираж</span>
                <strong id="calculator-total">${p(L(e,f)*f)}</strong>
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
          ${oe.map((t,a)=>`
                <details${a===0?" open":""}>
                  <summary><span>${c(t.question)}</span><i aria-hidden="true"></i></summary>
                  <p>${c(t.answer)}</p>
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
  `}Kt.innerHTML=de();const mt=document.querySelector("#product-grid"),qt=document.querySelector("#catalog-count");function At(e){return new Intl.NumberFormat("uk-UA",{maximumFractionDigits:1}).format(Math.max(0,e))}function ue(e){if(!$)return"";const t=vt($,e.dimensions,S);if(t.fits){const n=Math.min(...t.clearancesPerSide);return`<div class="product-card__fit"><strong>Підходить</strong><span>мін. ${At(n)} мм на бік</span></div>`}const a=Math.max(...t.deficitsPerSide)*2;return`<div class="product-card__fit is-near"><strong>Найближчий розмір</strong><span>бракує до ${At(a)} мм</span></div>`}function pe(e){if(!$)return"";const t=vt($,e.dimensions,S);if(t.fits)return`<div class="product-modal__fit is-fit"><strong>Коробка підходить</strong><span>${W(S)} враховано у підборі.</span></div>`;const a=Math.max(...t.deficitsPerSide)*2;return`<div class="product-modal__fit is-warning" role="status"><strong>Цей розмір замалий</strong><span>Бракує до ${At(a)} мм для обраного запасу. Додайте лише після ручної перевірки.</span></div>`}function Dt(e){const t=E(),a=L(e,1),n=L(e,M),s=t?.partner?X(e,1,t):null;return`
    <article
      class="product-card${e.id===H?" is-selected":""}"
      data-product-card="${c(e.id)}"
    >
      <div class="product-card__head">
        <span class="product-card__number">№${c(e.number)}</span>
        <span class="product-card__size-label">внутрішній розмір</span>
      </div>
      <div class="product-card__visual">${st(e,!0)}</div>
      <h3>${A(e.dimensions)}</h3>
      ${ue(e)}
      <div class="product-card__prices">
        ${s!==null?`<div class="partner-price"><span>Ваша фіксована</span><strong>${p(s)}<small>/шт.</small></strong></div>`:`
              <div><span>1–999 шт.</span><strong>${p(a)}</strong></div>
              <div><span>від 1000 шт.</span><strong>${p(n)}</strong></div>
            `}
      </div>
      <span class="button button--card product-card__cta" aria-hidden="true">Детальніше</span>
      <button
        class="product-card__open"
        type="button"
        data-open-product="${c(e.id)}"
        aria-label="Відкрити коробку №${c(e.number)}, ${A(e.dimensions)}"
      ></button>
    </article>
  `}function me(e){const t=E(),a=X(e,f,t),n=a*f;return`
    <div class="product-modal">
      <div class="product-modal__visual">
        <div class="product-modal__labels">
          <span>№${c(e.number)}</span>
        </div>
        <div class="product-modal__drawing">${st(e,!0)}</div>
        <p>Внутрішній розмір · Д × Ш × В</p>
      </div>
      <div class="product-modal__content">
        <p class="eyebrow"><span></span> Внутрішній розмір</p>
        <h2 id="product-dialog-title">${A(e.dimensions)}</h2>
        ${pe(e)}

        <div class="product-modal__rules">
          <div><span>1–999 шт.</span><strong>${p(L(e,1))} / шт.</strong></div>
          <div><span>від 1 000 шт.</span><strong>${p(L(e,M))} / шт.</strong></div>
        </div>

        <div class="quantity-block quantity-block--modal">
          <div class="quantity-block__label">
            <label for="modal-quantity-input">Кількість</label>
            <output id="modal-quantity-output">${f.toLocaleString("uk-UA")} шт.</output>
          </div>
          <div class="quantity-control">
            <button type="button" data-quantity-step="-100" aria-label="Зменшити кількість на 100">−</button>
            <input id="modal-quantity-input" type="number" min="1" max="${ct}" value="${f}" />
            <button type="button" data-quantity-step="100" aria-label="Збільшити кількість на 100">+</button>
          </div>
          <div class="quantity-presets quantity-presets--modal" aria-label="Швидкий вибір кількості">
            ${[100,500,1e3,5e3,1e4,5e4].map(s=>`<button type="button" data-quantity="${s}">${s.toLocaleString("uk-UA")}</button>`).join("")}
          </div>
        </div>

        <div class="product-modal__total" aria-live="polite">
          <div><span id="modal-price-tier">${$t(f,t)}</span><strong id="modal-unit-price">${p(a)} / шт.</strong></div>
          <div><span>Весь тираж</span><strong id="modal-total">${p(n)}</strong></div>
        </div>

        <div class="product-modal__actions">
          <button class="button button--primary" type="button" data-product-to-cart>Додати до кошика</button>
          <button class="button button--ghost" type="button" data-product-to-calculator>Відкрити калькулятор</button>
        </div>
      </div>
    </div>
  `}function Gt(){const e=document.querySelector("#product-dialog");if(!e?.open||!B)return;const t=q().find(d=>d.id===B);if(!t)return;const a=E(),n=X(t,f,a),s=e.querySelector("#modal-quantity-input");s&&(s.value=String(f));const i=e.querySelector("#modal-quantity-output");i&&(i.value=`${f.toLocaleString("uk-UA")} шт.`);const o=e.querySelector("#modal-price-tier");o&&(o.textContent=$t(f,a));const r=e.querySelector("#modal-unit-price");r&&(r.textContent=`${p(n)} / шт.`);const l=e.querySelector("#modal-total");l&&(l.textContent=p(n*f)),e.querySelectorAll("[data-quantity]").forEach(d=>{d.classList.toggle("is-active",Number(d.dataset.quantity)===f)})}function Ut(e){const t=q().find(s=>s.id===e),a=document.querySelector("#product-dialog"),n=document.querySelector("#product-dialog-content");!t||!a||!n||(B=t.id,Ct(t.id),n.innerHTML=me(t),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),Gt())}function fe(){const e=q(),t=pt.trim().toLocaleLowerCase("uk-UA");return e.filter(n=>{const s=`${n.number} ${n.name} ${A(n.dimensions)}`.toLocaleLowerCase("uk-UA"),i=!t||s.includes(t),o=!$||vt($,n.dimensions,S).fits;return i&&o}).sort((n,s)=>xt==="price"?n.basePrice-s.basePrice:xt==="number"?n.number.localeCompare(s.number,"uk-UA",{numeric:!0}):ft(n)-ft(s))}function he(){if(!$)return[];const e=pt.trim().toLocaleLowerCase("uk-UA");return q().filter(t=>{const a=`${t.number} ${t.name} ${A(t.dimensions)}`.toLocaleLowerCase("uk-UA");return!e||a.includes(e)}).map(t=>{const n=vt($,t.dimensions,S).deficitsPerSide.reduce((s,i)=>s+i,0);return{product:t,deficit:n}}).sort((t,a)=>t.deficit-a.deficit||ft(t.product)-ft(a.product)).slice(0,3).map(({product:t})=>t)}function T(e=!1){if(!mt||!qt)return;const t=document.querySelector("#catalog-more"),a=document.querySelector("#catalog-more-button");if(e){qt.textContent="Оновлюємо список…",t&&(t.hidden=!0),mt.innerHTML=Array.from({length:6},()=>'<div class="product-skeleton" aria-hidden="true"><i></i><i></i><i></i></div>').join("");return}const n=fe(),s=$?` · предмет ${A($)} · ${W(S)}`:"";if(qt.textContent=`${n.length} із ${q().length} розмірів${s}`,!n.length){const l=he();mt.innerHTML=`
      <div class="empty-state${l.length?" empty-state--nearest":""}">
        <div class="empty-state__box" aria-hidden="true"></div>
        <h3>Готового розміру немає.</h3>
        <p>${S?`Із запасом ${W(S)} точного варіанта немає. Найближчі коробки нижче замалі — це позначено окремо.`:"Змініть габарити предмета або залиште заявку з потрібним розміром."}</p>
        <div class="empty-state__actions">
          ${S?'<button class="button button--ghost" type="button" data-use-tight-fit>Показати без запасу</button>':""}
          <a class="button button--primary" href="#request">Описати свій розмір</a>
        </div>
        ${l.length?`<div class="nearest-results"><div class="nearest-results__head"><strong>Найближчі готові розміри</strong><span>Вони не відповідають обраному запасу</span></div><div class="nearest-results__grid">${l.map(Dt).join("")}</div></div>`:""}
      </div>
    `,t&&(t.hidden=!0);return}const o=window.matchMedia("(max-width: 680px)").matches&&!pt.trim()&&!$&&n.length>4,r=o&&!U?n.slice(0,4):n;mt.innerHTML=r.map(Dt).join(""),t&&a&&(t.hidden=!o,a.textContent=U?"Згорнути каталог":`Показати всі ${n.length} розмірів`,a.setAttribute("aria-expanded",String(U)))}function it(){window.clearTimeout(Nt),T(!0),Nt=window.setTimeout(()=>T(!1),320)}function j(){const e=yt(),t=E(),a=X(e,f,t),n=a*f,s=$t(f,t);document.querySelectorAll("#calculator-product-select, #hero-product-select").forEach(_=>{_.value=e.id}),document.querySelectorAll("#quantity-input, #hero-quantity-input, #modal-quantity-input").forEach(_=>{_.value=String(f)});const i=document.querySelector("#quantity-output");i&&(i.value=`${f.toLocaleString("uk-UA")} шт.`);const o=document.querySelector("#calculator-preview");o&&(o.classList.remove("is-changing"),o.offsetWidth,o.classList.add("is-changing"),o.innerHTML=st(e,!0));const r=document.querySelector("#calculator-tier");r&&(r.textContent=s);const l=document.querySelector("#calculator-unit-price");l&&(l.innerHTML=`${p(a)}<small>/ шт.</small>`);const d=document.querySelector("#calculator-total");d&&(d.textContent=p(n));const b=document.querySelector("#hero-price-label");b&&(b.textContent=s);const m=document.querySelector("#hero-total");m&&(m.textContent=p(n));const w=document.querySelector("#hero-unit");w&&(w.textContent=`${p(a)} / шт.`);const g=document.querySelector("#account-price-badge");g&&(g.textContent=t?.partner?"Персональна ціна активна":"Публічна ціна",g.classList.toggle("is-partner",!!t?.partner));const k=document.querySelector("#threshold-note");if(k)if(t?.partner)k.innerHTML=`<strong>Фіксована ціна:</strong> ${p(a)} за одиницю незалежно від тиражу.`;else if(f<M){const _=M-f,K=L(e,M)*M;k.innerHTML=`Ще <strong>${_.toLocaleString("uk-UA")} шт.</strong> до оптового тарифу. 1000 шт. коштуватимуть ${p(K)}.`}else k.innerHTML=`<strong>Оптовий тариф активний.</strong> Економія проти роздрібної ціни — ${p(f)} на всьому тиражі.`;document.querySelectorAll("[data-quantity]").forEach(_=>{_.classList.toggle("is-active",Number(_.dataset.quantity)===f)}),V(),Gt()}function Ct(e,t=!1){q().some(a=>a.id===e)&&(H=e,T(!1),j(),t&&document.querySelector("#calculator")?.scrollIntoView({behavior:"smooth",block:"start"}))}function Y(e){f=dt(e),j()}function Ot(e,t){if(!q().some(i=>i.id===e))return;const a=O(),n=a.find(i=>i.productId===e);n?n.quantity=dt(t):a.push({productId:e,quantity:dt(t)}),y(u.cart,a),V();const s=document.querySelector("#cart-button");s?.classList.remove("is-updated"),s?.offsetWidth,s?.classList.add("is-updated")}function Yt(e,t){const a=O(),n=a.find(s=>s.productId===e);n&&(n.quantity=dt(t),y(u.cart,a),V())}function be(e){y(u.cart,O().filter(t=>t.productId!==e)),V()}function V(){const e=document.querySelector("#request-summary"),t=document.querySelector("#cart-count"),a=document.querySelector('#request-form button[type="submit"]'),n=O(),s=E();if(t&&(t.textContent=String(n.length)),a&&(a.disabled=n.length===0),!e)return;if(!n.length){e.innerHTML=`
      <div class="cart-empty">
        <span aria-hidden="true">□</span>
        <strong>Кошик порожній</strong>
        <p>Оберіть розмір і додайте потрібну кількість коробок.</p>
        <a class="button button--ghost button--small" href="#catalog">Обрати коробки</a>
      </div>
    `;return}let i=0;const o=n.map(r=>{const l=q().find(m=>m.id===r.productId);if(!l)return"";const d=X(l,r.quantity,s),b=d*r.quantity;return i+=b,`
        <article class="cart-item">
          <div class="cart-item__index">№${c(l.number)}</div>
          <div class="cart-item__info">
            <strong>${A(l.dimensions)}</strong>
            <span>${p(d)} / шт.</span>
          </div>
          <label class="cart-item__quantity">
            <span>Кількість</span>
            <div class="cart-item__quantity-control">
              <button type="button" data-cart-step="-100" data-cart-product="${c(l.id)}" aria-label="Зменшити кількість коробки №${c(l.number)} на 100">−</button>
              <input class="input" type="number" min="1" max="${ct}" value="${r.quantity}" data-cart-quantity="${c(l.id)}" />
              <button type="button" data-cart-step="100" data-cart-product="${c(l.id)}" aria-label="Збільшити кількість коробки №${c(l.number)} на 100">+</button>
            </div>
          </label>
          <div class="cart-item__total">
            <span>Сума</span>
            <strong>${p(b)}</strong>
          </div>
          <div class="cart-item__actions">
            <button type="button" data-edit-cart="${c(l.id)}">Змінити</button>
            <button class="cart-item__remove" type="button" data-remove-cart="${c(l.id)}" aria-label="Прибрати коробку №${c(l.number)} з кошика">×</button>
          </div>
        </article>
      `}).join("");e.innerHTML=`
    <div class="cart-list">${o}</div>
    <div class="cart-summary__total">
      <span>${Mt(n.length)}</span>
      <div><small>Загальна вартість</small><strong>${p(i)}</strong></div>
    </div>
    <div class="cart-summary__actions">
      <a class="cart-continue" href="#catalog">+ Додати ще один розмір</a>
      <button type="button" data-clear-cart>Очистити кошик</button>
    </div>
  `}function ge(e){const t=F().find(i=>i.id===e);if(!t)return;const a=new Set(q().map(i=>i.id)),n=t.items.filter(i=>a.has(i.productId)).map(i=>({productId:i.productId,quantity:dt(i.quantity)}));if(!n.length)return;const s=O().filter(i=>!n.some(o=>o.productId===i.productId));y(u.cart,[...s,...n]),V(),window.location.hash="request",window.setTimeout(()=>document.querySelector("#request")?.scrollIntoView({behavior:"smooth",block:"start"}),80)}function J(){const e=document.querySelector("#account-button"),t=E();if(!e)return;e.textContent=t?t.name.split(" ")[0]:"Кабінет",e.classList.toggle("is-signed-in",!!t);const a=document.querySelector("#request-account-hint");a&&(a.textContent=t?t.name:"Гість");const n=document.querySelector("#request-form");if(n&&t){const s=(i,o)=>{const r=n.elements.namedItem(i);r instanceof HTMLInputElement&&!r.value&&(r.value=o)};s("name",t.name),s("phone",t.phone),s("company",t.company)}V()}function ve(){const e=E();if(e){const t=F().filter(r=>r.accountId===e.id).slice().reverse(),a=t.filter(r=>r.status!=="Закрита").length,n=t.reduce((r,l)=>r+l.total,0),s=e.name.split(/\s+/).filter(Boolean).slice(0,2).map(r=>r[0]).join("").toLocaleUpperCase("uk-UA"),i=yt(),o=X(i,f,e);return`
      <div class="account-dashboard">
        <section class="account-dashboard__hero">
          <div class="account-identity">
            <span class="account-avatar">${c(s||"TP")}</span>
            <div>
              <p class="eyebrow eyebrow--light"><span></span> Особистий кабінет</p>
              <h1 id="account-page-title">${c(e.name)}</h1>
              <p>${c(e.phone)}${e.company?` · ${c(e.company)}`:""}</p>
            </div>
          </div>
          <div class="account-dashboard__hero-actions">
            <span class="account-client-badge">${e.partner?"Постійний клієнт":"Новий клієнт"}</span>
            <button class="account-logout" type="button" id="logout-button">Вийти</button>
          </div>
          <div class="account-price-card${e.partner?" is-partner":""}">
            <span>Ваші ціни</span>
            <strong>${e.partner?"Персональна ціна активна":"Стандартні ціни"}</strong>
            <p>${e.partner?"Ваша ціна вже застосована в каталозі, калькуляторі та кошику.":"Усі суми показані одразу в кінцевому вигляді."}</p>
          </div>
        </section>

        <div class="account-kpis">
          <article><span>Усі заявки</span><strong>${t.length}</strong><small>оформлено</small></article>
          <article><span>Активні</span><strong>${a}</strong><small>потребують уваги</small></article>
          <article><span>Сума заявок</span><strong>${p(n)}</strong><small>загальна вартість</small></article>
        </div>

        <div class="account-dashboard__grid">
          <section class="account-orders-panel">
            <div class="account-panel-heading">
              <div><p class="eyebrow"><span></span> Історія</p><h2>Мої заявки</h2></div>
              <a class="text-link" href="#request">Нова заявка <span>→</span></a>
            </div>
            <div class="account-order-list">
              ${t.length?t.map(r=>{const l=r.items.reduce((d,b)=>d+b.quantity,0);return`
                          <article class="account-order">
                            <div class="account-order__main">
                              <span>${c(r.id)}</span>
                              <strong>${Mt(r.items.length)}</strong>
                              <small>${l.toLocaleString("uk-UA")} шт. загалом</small>
                            </div>
                            <div class="account-order__price"><strong>${p(r.total)}</strong><small>загальна сума</small></div>
                            <div class="account-order__meta"><span>${c(r.status)}</span><time datetime="${r.createdAt}">${new Date(r.createdAt).toLocaleDateString("uk-UA")}</time></div>
                            <div class="account-order__items">
                              ${r.items.map(d=>`<span><b>№${c(d.productNumber)}</b> ${A(d.dimensions)} · ${d.quantity.toLocaleString("uk-UA")} шт.</span>`).join("")}
                            </div>
                            <button class="account-order__repeat" type="button" data-repeat-order="${c(r.id)}">Повторити замовлення</button>
                          </article>
                        `}).join(""):'<div class="account-empty"><strong>Заявок ще немає.</strong><p>Оберіть розмір, порахуйте тираж і збережіть першу заявку.</p><a class="button button--primary" href="#catalog">До каталогу</a></div>'}
            </div>
          </section>

          <aside class="account-sidebar">
            <article class="account-quick-order">
              <p class="technical-label">Швидкий розрахунок</p>
              <div class="account-quick-order__box">${st(i,!1)}</div>
              <span>Коробка №${c(i.number)}</span>
              <h3>${A(i.dimensions)}</h3>
              <div><span>${f.toLocaleString("uk-UA")} шт.</span><strong>${p(o*f)}</strong></div>
              <button class="button button--gold button--wide" type="button" data-add-selected-to-cart>Додати до кошика</button>
            </article>
            <article class="account-profile-card">
              <div><p class="technical-label">Профіль</p><button class="text-link" type="button" data-edit-profile>Дані клієнта</button></div>
              <dl>
                <div><dt>Телефон</dt><dd>${c(e.phone)}</dd></div>
                <div><dt>Компанія</dt><dd>${c(e.company||"Не вказано")}</dd></div>
                <div><dt>Статус</dt><dd>${e.partner?"Постійний клієнт":"Новий клієнт"}</dd></div>
              </dl>
              ${e.role==="admin"?'<a class="button button--ghost button--wide" href="#admin">Відкрити адмінку</a>':""}
            </article>
            ${Q().length?`<article class="account-measurements"><div><p class="technical-label">Збережені розміри</p><span>${Q().length} останніх</span></div><div class="account-measurements__list">${Q().map(r=>`<button type="button" data-saved-measurement="${c(r.id)}"><strong>${A(r.dimensions)}</strong><span>${W(r.margin)}</span></button>`).join("")}</div></article>`:""}
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
          <label class="field"><span>Пароль, від 6 символів *</span><input class="input" name="password" type="password" minlength="6" required /></label>
          <div class="form-status" data-auth-status aria-live="polite"></div>
          <button class="button button--primary button--wide" type="submit">Створити акаунт</button>
        </form>
      </div>
    </div>
  `}function z(){const e=document.querySelector("#account-page-content");e&&(e.innerHTML=ve())}function ye(e){return`
    <div class="profile-editor">
      <p class="eyebrow"><span></span> Дані клієнта</p>
      <h2 id="profile-dialog-title">Оновити профіль.</h2>
      <p>Телефон використовується для входу та зв’язку щодо заявки.</p>
      <form id="profile-form" novalidate>
        <label class="field"><span>Ім’я *</span><input class="input" name="name" value="${c(e.name)}" autocomplete="name" required /></label>
        <label class="field"><span>Телефон *</span><input class="input" name="phone" type="tel" inputmode="tel" autocomplete="tel" value="${c(e.phone)}" pattern="[+]?380[0-9]{9}" required /></label>
        <label class="field"><span>Компанія</span><input class="input" name="company" value="${c(e.company)}" autocomplete="organization" /></label>
        <label class="field"><span>Новий пароль</span><input class="input" name="password" type="password" minlength="6" autocomplete="new-password" placeholder="Залиште порожнім, щоб не змінювати" /></label>
        <div class="form-status" data-profile-status aria-live="polite"></div>
        <div class="profile-editor__actions">
          <button class="button button--ghost" type="button" data-close-profile>Скасувати</button>
          <button class="button button--primary" type="submit">Зберегти дані</button>
        </div>
      </form>
    </div>
  `}function $e(){const e=E(),t=document.querySelector("#profile-dialog"),a=document.querySelector("#profile-dialog-content");!e||!t||!a||(a.innerHTML=ye(e),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),a.querySelector('input[name="name"]')?.focus())}function we(e){e.classList.add("was-validated");const t=e.querySelector("[data-profile-status]");if(!e.reportValidity()){t&&(t.className="form-status is-error",t.textContent="Перевірте ім’я, телефон і новий пароль.");return}const a=E();if(!a)return;const n=new FormData(e),s=ut(String(n.get("phone")??"")),i=C();if(i.some(l=>l.id!==a.id&&et(l.phone)===et(s))){t&&(t.className="form-status is-error",t.textContent="Акаунт із таким номером уже існує.");return}const o=String(n.get("password")??""),r=i.map(l=>l.id===a.id?{...l,name:String(n.get("name")??"").trim(),phone:s,company:String(n.get("company")??"").trim(),password:o||l.password}:l);y(u.accounts,r),document.querySelector("#profile-dialog")?.close(),J(),z(),j(),T(!1)}function Zt(e,t,a){const n=e.querySelector("[data-auth-status]");n&&(n.textContent=t,n.className=`form-status is-${a}`)}function Se(e,t){const a=et(e),n=C().find(s=>et(s.phone)===a&&s.password===t);return n?(localStorage.setItem(u.session,n.id),n):null}function Ft(e,t=!1){if(e.classList.add("was-validated"),!e.reportValidity())return;const a=new FormData(e),n=Se(String(a.get("phone")??""),String(a.get("password")??""));if(!n||t&&n.role!=="admin"){Zt(e,t?"Потрібен акаунт менеджера.":"Невірний телефон або пароль.","error");return}J(),j(),T(!1),t?x():(z(),window.location.hash="account")}function qe(e){if(e.classList.add("was-validated"),!e.reportValidity())return;const t=new FormData(e),a=ut(String(t.get("phone")??"")),n=C();if(n.some(i=>et(i.phone)===et(a))){Zt(e,"Акаунт із таким номером уже існує.","error");return}const s={id:`account-${Date.now().toString(36)}`,name:String(t.get("name")??"").trim(),phone:a,company:String(t.get("company")??"").trim(),password:String(t.get("password")??""),role:"client",partner:!1,fixedMarkup:_t,createdAt:new Date().toISOString()};n.push(s),y(u.accounts,n),localStorage.setItem(u.session,s.id),J(),j(),T(!1),z(),window.location.hash="account"}function _e(e){const t=document.querySelector("#request-status"),a=O();if(!a.length){t&&(t.className="form-status is-error",t.textContent="Додайте хоча б одну коробку до кошика.");return}if(e.classList.add("was-validated"),!e.reportValidity()){t&&(t.className="form-status is-error",t.textContent="Перевірте обов’язкові поля та згоду.");return}const n=new FormData(e),s=E(),i=ut(String(n.get("phone")??"")),o=s??C().find(w=>ut(w.phone)===i),r=a.flatMap(w=>{const g=q().find(_=>_.id===w.productId);if(!g)return[];const k=X(g,w.quantity,s);return[{productId:g.id,productNumber:g.number,dimensions:g.dimensions,quantity:w.quantity,unitPrice:k,total:k*w.quantity,priceType:$t(w.quantity,s)}]}),l=r.reduce((w,g)=>w+g.total,0),d=new Date().toISOString(),b={id:`TP-${Date.now().toString(36).toUpperCase()}`,createdAt:d,customerName:String(n.get("name")??"").trim(),phone:i,company:String(n.get("company")??"").trim(),comment:String(n.get("comment")??"").trim(),items:r,total:l,accountId:o?.id,status:"Нова",statusHistory:[{status:"Нова",at:d}]},m=F();m.push(b),y(u.orders,m),y(u.cart,[]),V(),z(),t&&(t.className="form-status is-success",t.innerHTML=`<strong>Заявку ${c(b.id)} створено.</strong><span>${Mt(b.items.length)} на суму ${p(b.total)}. Номер можна повідомити менеджеру.</span>`),e.querySelector('button[type="submit"]')?.focus()}function xe(e){return["Нова","У роботі","Уточнення","Підтверджена","Закрита"].map(a=>`<option value="${a}"${a===e?" selected":""}>${a}</option>`).join("")}function Le(){return window.location.hash==="#admin-orders"?"orders":window.location.hash==="#admin-clients"?"clients":window.location.hash==="#admin-products"?"products":"overview"}function Ae(e,t,a,n){return[{view:"overview",href:"#admin",label:"Огляд"},{view:"orders",href:"#admin-orders",label:"Замовлення",count:t},{view:"clients",href:"#admin-clients",label:"Клієнти",count:a},{view:"products",href:"#admin-products",label:"Товари",count:n}].map((i,o)=>`
        <a class="admin-nav__link${e===i.view?" is-active":""}" href="${i.href}"${e===i.view?' aria-current="page"':""}>
          <span>${String(o+1).padStart(2,"0")}</span>
          <strong>${i.label}</strong>
          ${i.count===void 0?"":`<b>${i.count}</b>`}
        </a>
      `).join("")}function ke(e,t,a){const n=F(),s=C().filter(r=>r.role==="client"),i=I().length,o=P?`<div class="admin-notice" role="status"><span>Готово</span><p>${c(P)}</p></div>`:"";return P="",`
    <div class="admin-workspace">
      <aside class="admin-sidebar-nav">
        <div class="admin-sidebar-nav__head">
          <span class="technical-label">ToffiPacks / Control</span>
          <h2>Управління</h2>
          <p>Замовлення, клієнти й каталог в одному кабінеті.</p>
        </div>
        <nav class="admin-nav" aria-label="Розділи адмінки">
          ${Ae(t,n.length,s.length,i)}
        </nav>
        <div class="admin-sidebar-nav__footer">
          <span>Ви увійшли як</span>
          <strong>${c(e.name)}</strong>
          <small>${c(e.phone)}</small>
          <button class="text-link" id="admin-logout" type="button">Вийти</button>
        </div>
      </aside>
      <main class="admin-main">
        ${o}
        ${a}
      </main>
    </div>
  `}function te(e){const t=`${e.id} ${e.customerName} ${e.phone} ${e.company}`.toLocaleLowerCase("uk-UA");return`
    <article class="order-card" data-admin-order data-status="${c(e.status)}" data-date="${e.createdAt.slice(0,10)}" data-search="${c(t)}">
      <div class="order-card__top">
        <div><span>${c(e.id)}</span><strong>${c(e.customerName)}</strong></div>
        <select class="select status-select" data-order-status="${c(e.id)}">${xe(e.status)}</select>
      </div>
      <div class="order-card__grid">
        <div><span>Контакт</span><a href="tel:${c(e.phone)}">${c(e.phone)}</a><small>Телефон клієнта</small></div>
        <div><span>Позицій</span><strong>${e.items.length}</strong><small>${e.items.reduce((a,n)=>a+n.quantity,0).toLocaleString("uk-UA")} шт. загалом</small></div>
        <div><span>Сума</span><strong>${p(e.total)}</strong><small>кінцева вартість</small></div>
      </div>
      <div class="order-card__items">
        ${e.items.map(a=>`
              <div>
                <span>№${c(a.productNumber)}</span>
                <strong>${A(a.dimensions)}</strong>
                <small>${a.quantity.toLocaleString("uk-UA")} шт. · ${p(a.unitPrice)} / шт.</small>
                <b>${p(a.total)}</b>
              </div>
            `).join("")}
      </div>
      ${e.company||e.comment?`<p class="order-card__comment">${c(e.company)}${e.company&&e.comment?" · ":""}${c(e.comment)}</p>`:""}
      <div class="order-status-history" aria-label="Історія статусів">
        <span>Історія</span>
        <div>
          ${(e.statusHistory??[{status:e.status,at:e.createdAt}]).slice().reverse().slice(0,5).map(a=>`<p><strong>${c(a.status)}</strong><time datetime="${c(a.at)}">${new Date(a.at).toLocaleString("uk-UA")}</time></p>`).join("")}
        </div>
      </div>
      <label class="order-card__manager-note">
        <span>Нотатка менеджера</span>
        <textarea data-order-note="${c(e.id)}" rows="2" placeholder="Домовленості після дзвінка, дата або деталі">${c(e.managerNote??"")}</textarea>
      </label>
      <time datetime="${e.createdAt}">${new Date(e.createdAt).toLocaleString("uk-UA")}</time>
    </article>
  `}function Pe(e,t){const a=e.filter(o=>o.status!=="Закрита").length,n=e.reduce((o,r)=>o+r.total,0),s=q().length,i=e.slice(0,3);return`
    <div class="admin-page-heading admin-page-heading--overview">
      <div><p class="eyebrow"><span></span> Панель керування</p><h1 id="admin-title">Все важливе<br />на одному екрані.</h1></div>
      <p>Швидкий стан каталогу, заявок і клієнтів. Детальна робота винесена в окремі розділи.</p>
    </div>
    <div class="admin-stats admin-stats--large">
      <article><span>Усі заявки</span><strong>${e.length}</strong><small>${a} потребують уваги</small></article>
      <article><span>Оборот заявок</span><strong>${p(n)}</strong><small>сума збережених розрахунків</small></article>
      <article><span>Клієнти</span><strong>${t.length}</strong><small>${t.filter(o=>o.partner).length} постійних</small></article>
      <article><span>Товари на сайті</span><strong>${s}</strong><small>${I().length-s} приховано</small></article>
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
        ${i.length?i.map(te).join(""):'<div class="admin-empty"><h3>Заявок ще немає.</h3><p>Нові замовлення з сайту з’являться тут.</p></div>'}
      </div>
    </section>
  `}function Te(e){const t=["Усі","Нова","У роботі","Уточнення","Підтверджена","Закрита"];return`
    <div class="admin-page-heading">
      <div><p class="eyebrow"><span></span> Замовлення</p><h1 id="admin-title">Заявки без хаосу.</h1></div>
      <p>Пошук за клієнтом або номером, швидка зміна статусу та повний склад кожного замовлення.</p>
    </div>
    <div class="admin-toolbar">
      <label class="admin-search"><span class="sr-only">Пошук заявок</span><input id="admin-order-search" type="search" value="${c(Tt)}" placeholder="Номер, ім’я або телефон" /></label>
      <label class="admin-date-filter"><span class="sr-only">Дата заявки</span><input id="admin-order-date" type="date" value="${c(bt)}" /></label>
      <div class="admin-filter-chips" aria-label="Фільтр за статусом">
        ${t.map(a=>`<button class="${ht===a?"is-active":""}" type="button" data-admin-order-filter="${a}">${a}</button>`).join("")}
      </div>
      <div class="admin-toolbar__actions">
        <button class="button button--ghost button--small" type="button" data-export-orders-csv>CSV</button>
        <button class="button button--ghost button--small" type="button" data-export-orders>JSON</button>
      </div>
    </div>
    <div class="admin-results-meta"><strong id="admin-order-count">${e.length}</strong><span>заявок показано</span></div>
    <div class="orders-list" id="admin-orders-list">
      ${e.length?e.map(te).join(""):'<div class="admin-empty"><h3>Заявок ще немає.</h3><p>Нові замовлення з сайту з’являться тут.</p></div>'}
    </div>
  `}function Me(e){return`
    <div class="admin-page-heading">
      <div><p class="eyebrow"><span></span> Клієнти</p><h1 id="admin-title">Контакти й особливі умови.</h1></div>
      <p>Знайдіть клієнта за телефоном, активуйте статус постійного та налаштуйте персональну ціну.</p>
    </div>
    <div class="admin-toolbar admin-toolbar--clients">
      <label class="admin-search"><span class="sr-only">Пошук клієнтів</span><input id="admin-client-search" type="search" placeholder="Ім’я, компанія або телефон" /></label>
    </div>
    <div class="clients-table clients-table--expanded">
      <div class="clients-table__head"><span>Клієнт</span><span>Статус</span><span>Умови</span></div>
      ${e.length?e.map(t=>`
                <div class="client-row" data-admin-client data-search="${c(`${t.name} ${t.company} ${t.phone}`.toLocaleLowerCase("uk-UA"))}">
                  <div><strong>${c(t.name)}</strong><span>${c(t.company||"Без компанії")}</span><a href="tel:${c(t.phone)}">${c(t.phone)}</a></div>
                  <label class="partner-toggle"><input type="checkbox" data-partner-toggle="${t.id}"${t.partner?" checked":""} /><span>${t.partner?"Постійний":"Звичайний"}</span></label>
                  <label class="client-price-field"><span>Персональна ставка</span><input class="input" type="number" min="0" max="0.99" step="0.01" value="${t.fixedMarkup}" data-partner-markup="${t.id}"${t.partner?"":" disabled"} /><small>грн / шт.</small></label>
                </div>
              `).join(""):'<div class="admin-empty"><h3>Клієнтів ще немає.</h3></div>'}
    </div>
  `}function It(){const e=Pt.trim().toLocaleLowerCase("uk-UA");return I().filter(t=>{const a=!e||`${t.number} ${t.name} ${A(t.dimensions)}`.toLocaleLowerCase("uk-UA").includes(e),n=G==="all"||(G==="active"?t.active:!t.active);return a&&n})}function ee(){const e=It();return e.length?e.map(t=>`
        <article class="admin-product-card${t.active?"":" is-hidden"}" data-admin-product="${t.id}">
          <div class="admin-product-card__visual">${st(t,!1)}</div>
          <div class="admin-product-card__content">
            <div class="admin-product-card__top"><span>№${c(t.number)}</span><b>${t.active?"На сайті":"Приховано"}</b></div>
            <h3>${A(t.dimensions)}</h3>
            <p>${c(t.name)}</p>
            <dl>
              <div><dt>1–999 шт.</dt><dd>${p(L(t,1))}</dd></div>
              <div><dt>від 1000 шт.</dt><dd>${p(L(t,M))}</dd></div>
            </dl>
            <div class="admin-product-card__actions">
              <button class="button button--primary button--small" type="button" data-edit-product="${t.id}">Редагувати</button>
              <button class="button button--ghost button--small" type="button" data-toggle-product="${t.id}">${t.active?"Приховати":"Показати"}</button>
              <button class="admin-danger-link" type="button" data-delete-product="${t.id}">Видалити</button>
            </div>
          </div>
        </article>
      `).join(""):'<div class="admin-empty"><h3>Нічого не знайдено.</h3><p>Змініть пошук або фільтр видимості.</p></div>'}function Ce(){return`
    <div class="admin-page-heading admin-page-heading--products">
      <div><p class="eyebrow"><span></span> Товари</p><h1 id="admin-title">Каталог під контролем.</h1></div>
      <div class="admin-page-heading__action"><p>Окрема сторінка для розмірів, цін і видимості коробок.</p><button class="button button--primary" type="button" data-create-product>Додати коробку</button></div>
    </div>
    <div class="admin-toolbar admin-toolbar--products">
      <label class="admin-search"><span class="sr-only">Пошук товарів</span><input id="admin-product-search" type="search" value="${c(Pt)}" placeholder="Номер або розмір" /></label>
      <div class="admin-filter-chips" aria-label="Фільтр товарів">
        <button class="${G==="all"?"is-active":""}" type="button" data-product-filter="all">Усі</button>
        <button class="${G==="active"?"is-active":""}" type="button" data-product-filter="active">На сайті</button>
        <button class="${G==="hidden"?"is-active":""}" type="button" data-product-filter="hidden">Приховані</button>
      </div>
      <button class="button button--ghost button--small" type="button" data-export-products>Експорт CSV</button>
      <label class="button button--ghost button--small admin-file-button">Імпорт CSV<input type="file" accept=".csv,text/csv" data-import-products /></label>
      <button class="admin-danger-link" type="button" data-reset-products>Відновити початкові</button>
    </div>
    <div class="admin-results-meta"><strong id="admin-product-count">${It().length}</strong><span>товарів показано</span></div>
    <div class="admin-products-grid" id="admin-product-list">${ee()}</div>
  `}function x(){const e=document.querySelector("#admin-content");if(!e)return;const t=E();if(!t||t.role!=="admin"){e.innerHTML=`
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
    `;return}const a=F().slice().reverse(),n=C().filter(o=>o.role==="client"),s=Le();let i=Pe(a,n);s==="orders"&&(i=Te(a)),s==="clients"&&(i=Me(n)),s==="products"&&(i=Ce()),e.innerHTML=ke(t,s,i),s==="orders"&&gt()}function gt(){const e=Tt.trim().toLocaleLowerCase("uk-UA");let t=0;document.querySelectorAll("[data-admin-order]").forEach(n=>{const s=!e||(n.dataset.search??"").includes(e),i=ht==="Усі"||n.dataset.status===ht,o=!bt||n.dataset.date===bt;n.hidden=!(s&&i&&o),n.hidden||(t+=1)});const a=document.querySelector("#admin-order-count");a&&(a.textContent=String(t))}function Ie(e){const t=e.trim().toLocaleLowerCase("uk-UA");document.querySelectorAll("[data-admin-client]").forEach(a=>{a.hidden=!!t&&!(a.dataset.search??"").includes(t)})}function Ee(){const e=document.querySelector("#admin-product-list");e&&(e.innerHTML=ee());const t=document.querySelector("#admin-product-count");t&&(t.textContent=String(It().length))}function Z(){const e=q();if(!e.length)return;e.some(s=>s.id===H)||(H=e[0].id);const t=Lt();document.querySelectorAll("#calculator-product-select, #hero-product-select").forEach(s=>{s.innerHTML=t,s.value=H});const a=document.querySelector("#hero-product-count");a&&(a.textContent=String(e.length));const n=document.querySelector("#catalog-ready-label");n&&(n.innerHTML=`<span></span> ${e.length} готових розмірів`),T(!1),j(),V()}function Ne(e){const t=!!e,a=e??{id:"",number:"",name:"",dimensions:{length:180,width:120,height:50},basePrice:5,active:!0};return`
    <div class="admin-product-editor">
      <p class="eyebrow"><span></span> ${t?"Редагування товару":"Новий товар"}</p>
      <h2 id="admin-product-dialog-title">${t?`Коробка №${c(a.number)}`:"Додати коробку"}</h2>
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
          <div class="admin-editor-price-preview"><span>На сайті зараз</span><strong>${p(L(a,1))}</strong><small>опт: ${p(L(a,M))}</small></div>
        </div>
        <label class="checkbox admin-editor-active"><input name="active" type="checkbox"${a.active?" checked":""} /><span>Показувати товар у каталозі</span></label>
        <div class="form-status" data-product-form-status aria-live="polite"></div>
        <div class="admin-editor-actions">
          <button class="button button--ghost" type="button" data-close-admin-product>Скасувати</button>
          <button class="button button--primary" type="submit">${t?"Зберегти зміни":"Створити товар"}</button>
        </div>
      </form>
    </div>
  `}function Ht(e){const t=document.querySelector("#admin-product-dialog"),a=document.querySelector("#admin-product-editor");if(!t||!a)return;const n=e?I().find(s=>s.id===e):void 0;a.innerHTML=Ne(n),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),a.querySelector('input[name="number"]')?.focus()}function De(e){e.classList.add("was-validated");const t=e.querySelector("[data-product-form-status]");if(!e.reportValidity()){t&&(t.className="form-status is-error",t.textContent="Перевірте обов’язкові поля.");return}const a=new FormData(e),n=String(a.get("productId")??""),s=String(a.get("number")??"").trim(),i=I(),o=i.find(m=>m.id===n);if(!Vt.test(s)){t&&(t.className="form-status is-error",t.textContent="У номері можна використовувати літери, цифри, крапку, дефіс і підкреслення.");return}if(i.some(m=>m.number.toLocaleLowerCase("uk-UA")===s.toLocaleLowerCase("uk-UA")&&m.id!==n)){t&&(t.className="form-status is-error",t.textContent="Товар із таким номером уже існує.");return}const r=a.get("active")==="on";if(o?.active&&!r&&q().length<=1){t&&(t.className="form-status is-error",t.textContent="У каталозі має залишитися хоча б один активний товар.");return}const l=o?.id??`box-${s.toLocaleLowerCase("uk-UA").replace(/[^a-zа-яіїєґ0-9]+/giu,"-")}-${Date.now().toString(36)}`,d={...o,id:l,number:s,name:String(a.get("name")??"").trim()||`Самозбірна коробка №${s}`,dimensions:{length:Number(a.get("length")),width:Number(a.get("width")),height:Number(a.get("height"))},basePrice:Number(a.get("basePrice")),active:r,updatedAt:new Date().toISOString()},b=o?i.map(m=>m.id===o.id?d:m):[...i,d];rt(b),Z(),document.querySelector("#admin-product-dialog")?.close(),P=o?`Товар №${s} оновлено.`:`Товар №${s} додано до каталогу.`,x()}function jt(e,t){const a=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=URL.createObjectURL(a),s=document.createElement("a");s.href=n,s.download=e,s.click(),window.setTimeout(()=>URL.revokeObjectURL(n),0)}function Rt(e,t,a){const n=new Blob([t],{type:a}),s=URL.createObjectURL(n),i=document.createElement("a");i.href=s,i.download=e,i.click(),window.setTimeout(()=>URL.revokeObjectURL(s),0)}function ae(e){const t=String(e);return/[;"\n\r]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function Ue(){const e=["number","name","length","width","height","basePrice","active"],t=I().map(a=>[a.number,a.name,a.dimensions.length,a.dimensions.width,a.dimensions.height,a.basePrice,a.active].map(ae).join(";"));return`\uFEFF${[e.join(";"),...t].join(`\r
`)}`}function Oe(){const e=["orderId","createdAt","status","customerName","phone","company","productNumber","length","width","height","quantity","unitPrice","lineTotal","orderTotal","comment","managerNote"],t=F().flatMap(a=>a.items.map(n=>[a.id,a.createdAt,a.status,a.customerName,a.phone,a.company,n.productNumber,n.dimensions.length,n.dimensions.width,n.dimensions.height,n.quantity,n.unitPrice,n.total,a.total,a.comment,a.managerNote??""].map(ae).join(";")));return`\uFEFF${[e.join(";"),...t].join(`\r
`)}`}function Fe(){return{version:1,createdAt:new Date().toISOString(),accounts:C(),orders:F(),products:I(),cart:O(),measurements:Q(),fit:$?{dimensions:$,margin:S}:null}}function He(e){if(!e||typeof e!="object")return!1;const t=e;if(t.version!==1||!Array.isArray(t.accounts)||!Array.isArray(t.orders)||!Array.isArray(t.products))return!1;const a=t.accounts.every(i=>i&&typeof i.id=="string"&&typeof i.phone=="string"&&(i.role==="admin"||i.role==="client")),n=t.products.every(i=>i&&typeof i.id=="string"&&typeof i.number=="string"&&Number.isFinite(i.basePrice)&&[i.dimensions?.length,i.dimensions?.width,i.dimensions?.height].every(o=>Number.isFinite(o)&&Number(o)>0)),s=t.orders.every(i=>i&&typeof i.id=="string"&&typeof i.phone=="string"&&Array.isArray(i.items)&&Number.isFinite(i.total));return a&&n&&s&&t.accounts.some(i=>i.role==="admin")}async function je(e){const t=e.files?.[0];if(t)try{const a=JSON.parse(await t.text());if(!He(a))throw new Error("Файл не є коректною резервною копією ToffiPacks.");if(!window.confirm("Відновити локальні дані з цієї копії? Поточні заявки, клієнти й товари буде замінено."))return;y(u.accounts,a.accounts),y(u.orders,a.orders),y(u.products,a.products),y(u.cart,Array.isArray(a.cart)?a.cart:[]),y(u.measurements,Array.isArray(a.measurements)?a.measurements:[]),a.fit?y(u.fit,a.fit):localStorage.removeItem(u.fit),$=a.fit?.dimensions??null,S=a.fit?.margin===5||a.fit?.margin===10?a.fit.margin:0,C().some(n=>n.id===localStorage.getItem(u.session))||localStorage.removeItem(u.session),Z(),J(),z(),P=`Резервну копію від ${new Date(a.createdAt).toLocaleString("uk-UA")} відновлено.`,x()}catch(a){P=a instanceof Error?a.message:"Не вдалося відновити резервну копію.",x()}finally{e.value=""}}function Re(e){const t=[];let a=[],n="",s=!1;for(let i=0;i<e.length;i+=1){const o=e[i];o==='"'?s&&e[i+1]==='"'?(n+='"',i+=1):s=!s:o===";"&&!s?(a.push(n.trim()),n=""):(o===`
`||o==="\r")&&!s?(o==="\r"&&e[i+1]===`
`&&(i+=1),a.push(n.trim()),a.some(Boolean)&&t.push(a),a=[],n=""):n+=o}return a.push(n.trim()),a.some(Boolean)&&t.push(a),t}function Ve(e){const t=Re(e.replace(/^\uFEFF/,"")),a=t.shift()?.map(d=>d.trim())??[],n=["number","name","length","width","height","basePrice","active"];if(!n.every(d=>a.includes(d)))throw new Error(`Потрібні колонки: ${n.join(", ")}`);const s=Object.fromEntries(a.map((d,b)=>[d,b])),i=I(),o=new Map(i.map(d=>[d.number.toLocaleLowerCase("uk-UA"),d])),r=t.map(d=>{const b=h=>d[s[h]]?.trim()??"",m=b("number"),w=h=>Number(b(h).replace(",",".")),g={length:w("length"),width:w("width"),height:w("height")},k=w("basePrice");if(!Vt.test(m)||!Object.values(g).every(h=>Number.isFinite(h)&&h>0)||!Number.isFinite(k)||k<=0)throw new Error(`Некоректні дані для коробки ${m||"без номера"}.`);const _=o.get(m.toLocaleLowerCase("uk-UA")),K=b("active").toLocaleLowerCase("uk-UA");return{..._,id:_?.id??`box-${m.toLocaleLowerCase("uk-UA").replace(/[^a-zа-яіїєґ0-9]+/giu,"-")}-${Date.now().toString(36)}`,number:m,name:b("name")||_?.name||`Самозбірна коробка №${m}`,dimensions:g,basePrice:k,active:!["false","0","ні","no"].includes(K),updatedAt:new Date().toISOString()}}),l=new Set(r.map(d=>d.number.toLocaleLowerCase("uk-UA")));return[...i.filter(d=>!l.has(d.number.toLocaleLowerCase("uk-UA"))),...r]}async function Be(e){const t=e.files?.[0];if(t)try{const a=Ve(await t.text());if(!window.confirm(`Імпортувати ${a.length} товарів? Позиції з однаковими номерами буде оновлено.`))return;rt(a),Z(),P="CSV імпортовано. Каталог оновлено.",x()}catch(a){P=a instanceof Error?a.message:"Не вдалося прочитати CSV.",x()}finally{e.value=""}}function Et(){const e=document.querySelector("#admin-page"),t=document.querySelector("#account-page"),a=document.querySelector("#main"),n=document.querySelector(".site-header"),s=document.querySelector(".site-footer"),i=document.querySelector(".demo-strip"),o=["#admin","#admin-orders","#admin-clients","#admin-products"].includes(window.location.hash),r=window.location.hash==="#account";e&&(e.hidden=!o),t&&(t.hidden=!r),a&&(a.hidden=o||r),n&&(n.hidden=o||r),s&&(s.hidden=o||r),i&&(i.hidden=o||r),document.body.classList.toggle("is-admin",o),document.body.classList.toggle("is-account",r),o?(x(),window.scrollTo({top:0})):r&&(z(),window.scrollTo({top:0}))}function Qe(){const e=document.querySelectorAll(".reveal");if(!("IntersectionObserver"in window)){e.forEach(a=>a.classList.add("is-visible"));return}const t=new IntersectionObserver(a=>{a.forEach(n=>{n.isIntersecting&&(n.target.classList.add("is-visible"),t.unobserve(n.target))})},{threshold:.12});e.forEach(a=>t.observe(a))}document.querySelector("#menu-button")?.addEventListener("click",e=>{const t=e.currentTarget,a=document.querySelector("#site-nav"),n=t.getAttribute("aria-expanded")!=="true";t.setAttribute("aria-expanded",String(n)),a?.classList.toggle("is-open",n)});document.querySelectorAll(".site-nav a").forEach(e=>{e.addEventListener("click",()=>{document.querySelector("#site-nav")?.classList.remove("is-open"),document.querySelector("#menu-button")?.setAttribute("aria-expanded","false")})});document.querySelector('.site-header .brand[href="#top"]')?.addEventListener("click",e=>{e.preventDefault(),window.location.hash!=="#top"&&(window.history.pushState(null,"","#top"),Et()),window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})});document.querySelector("#fit-form")?.addEventListener("submit",e=>{e.preventDefault();const t=e.currentTarget;t.classList.add("was-validated");const a=document.querySelector("#fit-message");if(!t.reportValidity()){a&&(a.textContent="Вкажіть три додатні розміри.",a.className="form-message is-error");return}const n=new FormData(t);$={length:Number(n.get("length")),width:Number(n.get("width")),height:Number(n.get("height"))};const s=Number(n.get("fitMargin"));S=s===5||s===10?s:0,Xt($,S),U=!1,a&&(a.textContent=`Розміри застосовано · ${W(S)}.`,a.className="form-message is-success"),it(),window.setTimeout(()=>document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth"}),180)});document.querySelector("#catalog-search")?.addEventListener("input",e=>{pt=e.currentTarget.value,U=!1,it()});const R=document.querySelector("#catalog-sort"),tt=R?.querySelector(".catalog-sort__trigger"),at=R?.querySelector(".catalog-sort__menu"),D=Array.from(R?.querySelectorAll("[data-sort-value]")??[]);function wt(e=!1){!tt||!at||(tt.setAttribute("aria-expanded","false"),at.hidden=!0,R?.classList.remove("is-open"),e&&tt.focus())}function ne(){!tt||!at||(tt.setAttribute("aria-expanded","true"),at.hidden=!1,R?.classList.add("is-open"))}function ze(e){const t=D.find(n=>n.dataset.sortValue===e),a=document.querySelector("#catalog-sort-value");!t||!R||!a||(xt=e,R.dataset.value=e,a.textContent=t.querySelector("span")?.textContent??t.textContent,D.forEach(n=>{n.setAttribute("aria-selected",String(n===t))}),wt(!0),it())}tt?.addEventListener("click",()=>{at?.hidden?ne():wt()});D.forEach(e=>{e.addEventListener("click",()=>{ze(e.dataset.sortValue)})});R?.addEventListener("keydown",e=>{const t=D.indexOf(document.activeElement),a=D.findIndex(s=>s.getAttribute("aria-selected")==="true");if(e.key==="Escape"){e.preventDefault(),wt(!0);return}if(e.key!=="ArrowDown"&&e.key!=="ArrowUp"&&e.key!=="Home"&&e.key!=="End")return;e.preventDefault(),at?.hidden&&ne();let n=t>=0?t:a;e.key==="Home"&&(n=0),e.key==="End"&&(n=D.length-1),e.key==="ArrowDown"&&(n=(n+1)%D.length),e.key==="ArrowUp"&&(n=(n-1+D.length)%D.length),D[n]?.focus()});document.addEventListener("click",e=>{R?.contains(e.target)||wt()});document.querySelector("#reset-catalog")?.addEventListener("click",()=>{$=null,S=0,pt="",U=!1;const e=document.querySelector("#catalog-search");e&&(e.value="");const t=document.querySelector("#fit-message");t&&(t.textContent=""),localStorage.removeItem(u.fit),it()});document.querySelector("#catalog-more-button")?.addEventListener("click",()=>{U=!U,T(!1),U||document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth",block:"start"})});window.addEventListener("resize",()=>T(!1));document.querySelector("#calculator-product-select")?.addEventListener("change",e=>{Ct(e.currentTarget.value)});document.querySelector("#hero-product-select")?.addEventListener("change",e=>{Ct(e.currentTarget.value)});document.querySelector("#quantity-input")?.addEventListener("input",e=>{Y(Number(e.currentTarget.value))});document.querySelector("#hero-quantity-input")?.addEventListener("input",e=>{Y(Number(e.currentTarget.value))});document.querySelector("#request-form")?.addEventListener("submit",e=>{e.preventDefault(),_e(e.currentTarget)});document.addEventListener("click",e=>{const t=e.target,a=t.closest("[data-saved-measurement]");if(a?.dataset.savedMeasurement){const h=Q().find(v=>v.id===a.dataset.savedMeasurement);h&&le(h);return}if(t.closest("[data-clear-measurements]")){localStorage.removeItem(u.measurements),Jt(),z();return}if(t.closest("[data-use-tight-fit]")&&$){S=0,Xt($,S);const h=document.querySelector('#fit-form input[name="fitMargin"][value="0"]');h&&(h.checked=!0),it();return}const n=t.closest("[data-open-product]");if(n?.dataset.openProduct){Ut(n.dataset.openProduct);return}const s=t.closest("[data-quantity]");if(s?.dataset.quantity){Y(Number(s.dataset.quantity));return}const i=t.closest("[data-quantity-step]");if(i?.dataset.quantityStep){Y(f+Number(i.dataset.quantityStep));return}if(t.closest("[data-product-to-cart]")){Ot(B??H,f),document.querySelector("#product-dialog")?.close(),B=null;return}if(t.closest("[data-add-selected-to-cart]")){Ot(H,f);return}const o=t.closest("[data-cart-step]");if(o?.dataset.cartProduct&&o.dataset.cartStep){const h=O().find(v=>v.productId===o.dataset.cartProduct);h&&Yt(h.productId,h.quantity+Number(o.dataset.cartStep));return}const r=t.closest("[data-edit-cart]");if(r?.dataset.editCart){const h=O().find(v=>v.productId===r.dataset.editCart);h&&(Y(h.quantity),Ut(h.productId));return}if(t.closest("[data-clear-cart]")){window.confirm("Очистити всі позиції кошика?")&&(y(u.cart,[]),V());return}const l=t.closest("[data-repeat-order]");if(l?.dataset.repeatOrder){ge(l.dataset.repeatOrder);return}const d=t.closest("[data-remove-cart]");if(d?.dataset.removeCart){be(d.dataset.removeCart);return}if(t.closest("[data-product-to-calculator]")){document.querySelector("#product-dialog")?.close(),B=null,window.location.hash="calculator",document.querySelector("#calculator")?.scrollIntoView({behavior:"smooth",block:"start"});return}const b=t.closest("[data-close-dialog]");if(b){b.closest("dialog")?.close(),B=null;return}if(t.closest("[data-edit-profile]")){$e();return}if(t.closest("[data-close-profile]")){document.querySelector("#profile-dialog")?.close();return}const m=t.closest("[data-auth-tab]");if(m?.dataset.authTab){const h=m.closest(".auth-forms");h?.querySelectorAll("[data-auth-tab]").forEach(v=>{const N=v.dataset.authTab===m.dataset.authTab;v.classList.toggle("is-active",N),v.setAttribute("aria-selected",String(N))}),h?.querySelectorAll("[data-auth-panel]").forEach(v=>{v.hidden=v.dataset.authPanel!==m.dataset.authTab});return}if(t.closest("#logout-button")){localStorage.removeItem(u.session),J(),j(),T(!1),z();return}if(t.closest("[data-create-product]")){Ht();return}const w=t.closest("[data-edit-product]");if(w?.dataset.editProduct){Ht(w.dataset.editProduct);return}if(t.closest("[data-close-admin-product]")){document.querySelector("#admin-product-dialog")?.close();return}const g=t.closest("[data-toggle-product]");if(g?.dataset.toggleProduct){const h=I(),v=h.find(N=>N.id===g.dataset.toggleProduct);v&&(v.active&&q().length<=1?P="У каталозі має залишитися хоча б один активний товар.":(v.active=!v.active,v.updatedAt=new Date().toISOString(),rt(h),Z(),P=v.active?`Товар №${v.number} повернуто на сайт.`:`Товар №${v.number} приховано.`),x());return}const k=t.closest("[data-delete-product]");if(k?.dataset.deleteProduct){const h=I(),v=h.find(N=>N.id===k.dataset.deleteProduct);if(!v)return;if(v.active&&q().length<=1){P="Не можна видалити останній активний товар.",x();return}window.confirm(`Видалити коробку №${v.number}? Цю дію не можна скасувати.`)&&(rt(h.filter(N=>N.id!==v.id)),y(u.cart,O().filter(N=>N.productId!==v.id)),Z(),P=`Товар №${v.number} видалено.`,x());return}const _=t.closest("[data-product-filter]");if(_?.dataset.productFilter){G=_.dataset.productFilter,x();return}const K=t.closest("[data-admin-order-filter]");if(K?.dataset.adminOrderFilter){ht=K.dataset.adminOrderFilter,document.querySelectorAll("[data-admin-order-filter]").forEach(h=>{h.classList.toggle("is-active",h===K)}),gt();return}if(t.closest("[data-export-orders]")){jt(`toffipacks-orders-${new Date().toISOString().slice(0,10)}.json`,F());return}if(t.closest("[data-export-orders-csv]")){Rt(`toffipacks-orders-${new Date().toISOString().slice(0,10)}.csv`,Oe(),"text/csv;charset=utf-8");return}if(t.closest("[data-export-backup]")){jt(`toffipacks-backup-${new Date().toISOString().slice(0,10)}.json`,Fe());return}if(t.closest("[data-export-products]")){Rt(`toffipacks-products-${new Date().toISOString().slice(0,10)}.csv`,Ue(),"text/csv;charset=utf-8");return}if(t.closest("[data-reset-products]")){window.confirm("Відновити початковий каталог? Усі ручні зміни товарів буде втрачено.")&&(rt(kt.map(h=>({...h,active:!0,updatedAt:new Date().toISOString()}))),Z(),P="Початковий каталог відновлено.",x());return}if(t.closest("#admin-logout")){localStorage.removeItem(u.session),J(),j(),T(!1),window.location.hash="admin",x();return}});document.addEventListener("input",e=>{const t=e.target;if(t instanceof HTMLInputElement&&t.id==="modal-quantity-input"){Y(Number(t.value));return}if(t instanceof HTMLInputElement&&t.id==="admin-product-search"){Pt=t.value,Ee();return}if(t instanceof HTMLInputElement&&t.id==="admin-order-search"){Tt=t.value,gt();return}if(t instanceof HTMLInputElement&&t.id==="admin-order-date"){bt=t.value,gt();return}if(t instanceof HTMLInputElement&&t.id==="admin-client-search"){Ie(t.value);return}if(t instanceof HTMLInputElement&&t.name==="basePrice"&&t.closest("#admin-product-form")){const a=Number(t.value)||0,n={...yt(),basePrice:a},s=t.closest("form")?.querySelector(".admin-editor-price-preview"),i=s?.querySelector("strong"),o=s?.querySelector("small");i&&(i.textContent=p(L(n,1))),o&&(o.textContent=`опт: ${p(L(n,M))}`)}});document.addEventListener("submit",e=>{const t=e.target;t instanceof HTMLFormElement&&(t.id==="login-form"?(e.preventDefault(),Ft(t)):t.id==="register-form"?(e.preventDefault(),qe(t)):t.id==="admin-login-form"?(e.preventDefault(),Ft(t,!0)):t.id==="admin-product-form"?(e.preventDefault(),De(t)):t.id==="profile-form"&&(e.preventDefault(),we(t)))});document.addEventListener("change",e=>{const t=e.target;if(t instanceof HTMLInputElement&&t.matches("[data-import-products]")){Be(t);return}if(t instanceof HTMLInputElement&&t.matches("[data-import-backup]")){je(t);return}if(t instanceof HTMLTextAreaElement&&t.dataset.orderNote){const a=F(),n=a.find(s=>s.id===t.dataset.orderNote);n&&(n.managerNote=t.value.trim(),y(u.orders,a));return}if(t instanceof HTMLInputElement||t instanceof HTMLSelectElement){if(t instanceof HTMLInputElement&&t.dataset.cartQuantity){Yt(t.dataset.cartQuantity,Number(t.value));return}if(t instanceof HTMLSelectElement&&t.dataset.orderStatus){const a=F(),n=a.find(s=>s.id===t.dataset.orderStatus);if(n){const s=t.value;if(n.status!==s){const i=n.status;n.status=s,n.statusHistory=[...n.statusHistory??[{status:i,at:n.createdAt}],{status:s,at:new Date().toISOString()}]}y(u.orders,a),x()}return}if(t instanceof HTMLInputElement&&t.dataset.partnerToggle){const a=C(),n=a.find(s=>s.id===t.dataset.partnerToggle);n&&(n.partner=t.checked,y(u.accounts,a),x());return}if(t instanceof HTMLInputElement&&t.dataset.partnerMarkup){const a=C(),n=a.find(s=>s.id===t.dataset.partnerMarkup);n&&(n.fixedMarkup=Math.min(.99,Math.max(0,Number(t.value)||0)),y(u.accounts,a),x())}}});document.querySelector("#product-dialog")?.addEventListener("click",e=>{e.target===e.currentTarget&&(e.currentTarget.close(),B=null)});document.querySelector("#admin-product-dialog")?.addEventListener("click",e=>{e.target===e.currentTarget&&e.currentTarget.close()});document.querySelector("#profile-dialog")?.addEventListener("click",e=>{e.target===e.currentTarget&&e.currentTarget.close()});window.addEventListener("hashchange",Et);T(!0);window.setTimeout(()=>T(!1),460);j();J();Et();Qe();"serviceWorker"in navigator&&window.location.protocol==="https:"&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});
