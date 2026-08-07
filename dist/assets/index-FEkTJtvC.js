(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const mt=5e4,E=1e3,ge=2,he=1,Pt=.5,Nt=[{id:"box-301",number:"301",name:"Самозбірна коробка №301",dimensions:{length:165,width:100,height:30},basePrice:5,sourceQuantity:1e3},{id:"box-302",number:"302",name:"Самозбірна коробка №302",dimensions:{length:130,width:130,height:50},basePrice:7,sourceQuantity:800},{id:"box-303",number:"303",name:"Самозбірна коробка №303",dimensions:{length:190,width:150,height:100},basePrice:17,sourceQuantity:800},{id:"box-304",number:"304",name:"Самозбірна коробка №304",dimensions:{length:230,width:150,height:35},basePrice:11,sourceQuantity:800},{id:"box-305",number:"305",name:"Самозбірна коробка №305",dimensions:{length:160,width:85,height:110},basePrice:6.5},{id:"box-306",number:"306",name:"Самозбірна коробка №306",dimensions:{length:145,width:145,height:40},basePrice:6.5,sourceQuantity:1e3},{id:"box-307",number:"307",name:"Самозбірна коробка №307",dimensions:{length:280,width:180,height:100},basePrice:18,sourceQuantity:500},{id:"box-308",number:"308",name:"Самозбірна коробка №308",dimensions:{length:250,width:180,height:40},basePrice:12,sourceQuantity:800},{id:"box-309",number:"309",name:"Самозбірна коробка №309",dimensions:{length:210,width:150,height:50},basePrice:11,sourceQuantity:900},{id:"box-310",number:"310",name:"Самозбірна коробка №310",dimensions:{length:260,width:260,height:50},basePrice:15,sourceQuantity:600},{id:"box-311",number:"311",name:"Самозбірна коробка №311",dimensions:{length:370,width:170,height:100},basePrice:17},{id:"box-101",number:"101",name:"Самозбірна коробка №101",dimensions:{length:178,width:115,height:48},basePrice:4,sourceQuantity:800}],be=[{question:"Як відбувається доставка?",answer:"Доставляємо по Києву та Київській області. Формат, точну адресу й вартість потрібно уточнити з менеджером під час підтвердження заявки."},{question:"Які строки виготовлення?",answer:"Строк залежить від розміру коробки, тиражу та завантаження виробництва. Менеджер називає точну дату до запуску замовлення."},{question:"Що отримує постійний клієнт?",answer:"Після підтвердження менеджером у кабінеті активується персональна ціна. Вона автоматично відображається в каталозі, калькуляторі та кошику."},{question:"Як проходить оплата?",answer:"Форму оплати, рахунок і підсумкову суму менеджер погоджує з вами до початку виготовлення."},{question:"Чи працюєте ви з малим і великим бізнесом?",answer:"Так. Можна почати з невеликої партії або замовити регулярний великий тираж. Калькулятор рахує до 50 000 коробок, більший обсяг прораховує менеджер."},{question:"Чи робите коробки під індивідуальний запит?",answer:"Так. Якщо серед готових розмірів немає потрібного, вкажіть габарити й особливості замовлення в коментарі. Менеджер уточнить деталі та підготує розрахунок."}];function h(t){return new Intl.NumberFormat("uk-UA",{style:"currency",currency:"UAH",minimumFractionDigits:Number.isInteger(t)?0:2,maximumFractionDigits:2}).format(t)}function k(t,e){return t.basePrice+(e>=E?he:ge)}function X(t,e,a){return a?.partner?t.basePrice+Math.min(Math.max(a.fixedMarkup,0),.99):k(t,e)}function wt(t){const{length:e,width:a,height:n}=t.dimensions;return e*a*n}function _t(t,e,a=0){const n=[t.length,t.width,t.height].sort((r,c)=>c-r),s=[e.length,e.width,e.height].sort((r,c)=>c-r),i=n.map((r,c)=>(s[c]-r)/2),o=i.map(r=>Math.max(0,a-r));return{fits:o.every(r=>r===0),clearancesPerSide:i,deficitsPerSide:o}}const u={accounts:"toffipacks-accounts-v3",orders:"toffipacks-orders-v3",session:"toffipacks-session-v3",cart:"toffipacks-cart-v1",products:"toffipacks-products-v1",fit:"toffipacks-fit-v1",measurements:"toffipacks-measurements-v1"},Gt=/^[\p{L}\p{N}._-]+$/u,ft=new Date().toISOString(),te=[{id:"account-admin",name:"Адміністратор ToffiPacks",phone:"+380000000001",company:"ToffiPacks",password:"admin123",role:"admin",partner:!1,fixedMarkup:Pt,createdAt:ft},{id:"account-partner",name:"Постійний клієнт",phone:"+380671112233",company:"",password:"client123",role:"client",partner:!0,fixedMarkup:Pt,createdAt:ft}],ee=[];function ct(t,e){try{const a=localStorage.getItem(t);return a?JSON.parse(a):e}catch{return e}}function $(t,e){localStorage.setItem(t,JSON.stringify(e))}function ve(){localStorage.getItem(u.accounts)||$(u.accounts,te),localStorage.getItem(u.orders)||$(u.orders,ee),localStorage.getItem(u.cart)||$(u.cart,[]),localStorage.getItem(u.products)||$(u.products,Nt.map(t=>({...t,active:!0,updatedAt:ft})))}ve();const ae=ct(u.fit,null),ut=ae?.dimensions,ye=ut&&[ut.length,ut.width,ut.height].every(t=>Number.isFinite(t)&&t>0),Mt=ae?.margin;let R="box-101",v=500,bt="",Ct="size",F=!1,w=ye?ut:null,S=Mt===5||Mt===10?Mt:0,zt,K=null,Ut="",et="all",Ot="",St="Усі",C="",G="",T="";const ne=document.querySelector("#app");if(!ne)throw new Error("Root element #app was not found.");function D(){return ct(u.accounts,te)}function N(){const t=Nt.map(e=>({...e,active:!0,updatedAt:ft}));return ct(u.products,t).filter(e=>e&&typeof e.id=="string"&&typeof e.number=="string"&&Number.isFinite(e.basePrice)&&Number.isFinite(e.dimensions?.length)&&Number.isFinite(e.dimensions?.width)&&Number.isFinite(e.dimensions?.height)).map(e=>({...e,active:e.active!==!1,updatedAt:e.updatedAt||ft}))}function _(){return N().filter(t=>t.active)}function pt(t){$(u.products,t)}function B(){return ct(u.orders,ee).map(e=>{if("items"in e&&Array.isArray(e.items))return{...e,statusHistory:Array.isArray(e.statusHistory)&&e.statusHistory.length?e.statusHistory:[{status:e.status,at:e.createdAt}]};const a=e;return{id:a.id,createdAt:a.createdAt,customerName:a.customerName,phone:a.phone,company:a.company,comment:a.comment,items:[{productId:a.productId,productNumber:a.productNumber,dimensions:a.dimensions,quantity:a.quantity,unitPrice:a.unitPrice,total:a.total,priceType:a.priceType}],total:a.total,accountId:a.accountId,status:a.status,statusHistory:[{status:a.status,at:a.createdAt}]}})}function j(){const t=_();return ct(u.cart,[]).filter(e=>t.some(a=>a.id===e.productId)&&e.quantity>0)}function U(){const t=localStorage.getItem(u.session);return D().find(e=>e.id===t)??null}function qt(){const t=_();return t.find(e=>e.id===R)??t[0]}function gt(t){return Number.isFinite(t)?Math.min(mt,Math.max(1,Math.round(t))):1}function W(){return ct(u.measurements,[]).filter(t=>t&&typeof t.id=="string"&&[t.dimensions?.length,t.dimensions?.width,t.dimensions?.height].every(e=>Number.isFinite(e)&&Number(e)>0)&&[0,5,10].includes(t.margin))}function Z(t){return t===0?"без додаткового запасу":`+${t} мм з кожного боку`}function se(){const t=W();return t.length?`
    <div class="saved-measurements__head"><span>Збережені розміри</span><button type="button" data-clear-measurements>Очистити</button></div>
    <div class="saved-measurements__list">
      ${t.map(e=>`
            <button type="button" data-saved-measurement="${l(e.id)}">
              <strong>${M(e.dimensions)}</strong>
              <span>${Z(e.margin)}</span>
            </button>
          `).join("")}
    </div>
  `:""}function ie(){const t=document.querySelector("#saved-measurements");t&&(t.innerHTML=se(),t.hidden=!t.innerHTML)}function oe(t,e){const a=`${t.length}-${t.width}-${t.height}-${e}`,n=W().filter(i=>`${i.dimensions.length}-${i.dimensions.width}-${i.dimensions.height}-${i.margin}`!==a),s={id:`size-${a}`,dimensions:t,margin:e,createdAt:new Date().toISOString()};$(u.measurements,[s,...n].slice(0,5)),$(u.fit,{dimensions:t,margin:e}),ie()}function $e(t,e=!0){w={...t.dimensions},S=t.margin,$(u.fit,{dimensions:w,margin:S});const a=document.querySelector("#fit-form");if(a){a.elements.namedItem("length")?.setAttribute("value",String(w.length)),a.elements.namedItem("width")?.setAttribute("value",String(w.width)),a.elements.namedItem("height")?.setAttribute("value",String(w.height));const s=o=>{const r=a.elements.namedItem(o);r instanceof HTMLInputElement&&(r.value=String(w?.[o]??""))};s("length"),s("width"),s("height");const i=a.querySelector(`input[name="fitMargin"][value="${S}"]`);i&&(i.checked=!0)}const n=document.querySelector("#fit-message");n&&(n.textContent=`Розміри застосовано · ${Z(S)}.`,n.className="form-message is-success"),F=!1,dt(),e&&window.setTimeout(()=>document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth"}),180)}function ht(t){let e=t.replace(/\D/g,"");return e.length===10&&e.startsWith("0")&&(e=`38${e}`),e.length===12&&e.startsWith("380")?`+${e}`:t.trim()}function ot(t){return ht(t).replace(/\D/g,"")}function l(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function M(t){return`${t.length} × ${t.width} × ${t.height} мм`}function Ht(t){const e=t%100,a=t%10;return e>=11&&e<=14?`${t} позицій`:a===1?`${t} позиція`:a>=2&&a<=4?`${t} позиції`:`${t} позицій`}function xt(t,e){return e?.partner?"Фіксована ціна клієнта":t>=E?"Оптова ціна":"Роздрібна ціна"}function lt(t,e=!1){const{length:a,width:n,height:s}=t.dimensions,i=170+Math.min(100,a/3),o=58+Math.min(54,s/2.5),r=50+Math.min(44,n/4),c=72,d=e?70:82,m=d-r*.55,f=c+i,y=f+r,b=d+o;return`
    <svg class="box-visual${e?" box-visual--compact":""}" viewBox="0 0 470 270" role="img"
      aria-label="Схема коробки ${l(t.number)}, ${M(t.dimensions)}">
      <g class="box-visual__shape">
        <polygon class="box-visual__top" points="${c},${d} ${c+r},${m} ${y},${m} ${f},${d}" />
        <polygon class="box-visual__side" points="${f},${d} ${y},${m} ${y},${m+o} ${f},${b}" />
        <rect class="box-visual__front" x="${c}" y="${d}" width="${i}" height="${o}" />
        <rect class="box-visual__mark" x="${c+i*.35}" y="${d+o*.32}"
          width="${i*.3}" height="${Math.max(24,o*.34)}" rx="5" />
        <text class="box-visual__number" x="${c+i/2}" y="${d+o*.56}">№${l(t.number)}</text>
      </g>
      <g class="dimension-line dimension-line--length">
        <line x1="${c}" y1="${b+28}" x2="${f}" y2="${b+28}" />
        <line x1="${c}" y1="${b+20}" x2="${c}" y2="${b+36}" />
        <line x1="${f}" y1="${b+20}" x2="${f}" y2="${b+36}" />
        <rect x="${c+i/2-38}" y="${b+12}" width="76" height="32" rx="16" />
        <text x="${c+i/2}" y="${b+33}">${a} мм</text>
      </g>
      <g class="dimension-line dimension-line--height">
        <line x1="${c-26}" y1="${d}" x2="${c-26}" y2="${b}" />
        <line x1="${c-34}" y1="${d}" x2="${c-18}" y2="${d}" />
        <line x1="${c-34}" y1="${b}" x2="${c-18}" y2="${b}" />
        <rect x="2" y="${d+o/2-16}" width="66" height="32" rx="16" />
        <text x="35" y="${d+o/2+5}">${s} мм</text>
      </g>
      <g class="dimension-line dimension-line--width">
        <line x1="${f+8}" y1="${d-8}" x2="${y+8}" y2="${m-8}" />
        <rect x="${y-54}" y="${Math.max(4,m-48)}" width="76" height="32" rx="16" />
        <text x="${y-16}" y="${Math.max(25,m-27)}">${n} мм</text>
      </g>
    </svg>
  `}function It(){return _().map(t=>`<option value="${l(t.id)}"${t.id===R?" selected":""}>№${l(t.number)} · ${M(t.dimensions)}</option>`).join("")}function we(){const t=qt();return`
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
            <div><dt id="hero-product-count">${_().length}</dt><dd>готових розмірів</dd></div>
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
            <select class="select" id="hero-product-select">${It()}</select>
          </label>
          <label class="field">
            <span>Кількість</span>
            <input class="input" id="hero-quantity-input" type="number" min="1" max="${mt}" value="${v}" />
          </label>
          <div class="hero-calculator__result">
            <span id="hero-price-label">Роздрібна ціна</span>
            <strong id="hero-total">${h(k(t,v)*v)}</strong>
            <small id="hero-unit">${h(k(t,v))} / шт.</small>
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
                <input class="input" name="length" type="number" min="1" max="2000" value="${w?.length??170}" required />
              </label>
              <span class="dimension-sign" aria-hidden="true">×</span>
              <label class="field">
                <span>Ширина, мм</span>
                <input class="input" name="width" type="number" min="1" max="2000" value="${w?.width??110}" required />
              </label>
              <span class="dimension-sign" aria-hidden="true">×</span>
              <label class="field">
                <span>Висота, мм</span>
                <input class="input" name="height" type="number" min="1" max="2000" value="${w?.height??45}" required />
              </label>
            </div>
            <fieldset class="fit-margin">
              <legend>Запас навколо предмета</legend>
              <div class="fit-margin__options">
                ${[0,5,10].map(e=>`
                      <label>
                        <input type="radio" name="fitMargin" value="${e}"${S===e?" checked":""} />
                        <span>${e===0?"Точно":`+${e} мм / бік`}</span>
                      </label>
                    `).join("")}
              </div>
              <p>Запас додається з обох боків кожної сторони предмета.</p>
            </fieldset>
            <button class="button button--primary" type="submit">Знайти коробку</button>
            <p class="form-message" id="fit-message" aria-live="polite"></p>
            <div class="saved-measurements" id="saved-measurements"${W().length?"":" hidden"}>${se()}</div>
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
            <p class="eyebrow" id="catalog-ready-label"><span></span> ${_().length} готових розмірів</p>
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
              <select class="select select--large" id="calculator-product-select">${It()}</select>
            </label>
            <div class="calculator-preview" id="calculator-preview">${lt(t,!0)}</div>
            <div class="quantity-block">
              <div class="quantity-block__label">
                <label for="quantity-input">Кількість</label>
                <output id="quantity-output">${v.toLocaleString("uk-UA")} шт.</output>
              </div>
              <div class="quantity-control">
                <button type="button" data-quantity-step="-100" aria-label="Зменшити кількість на 100">−</button>
                <input id="quantity-input" type="number" min="1" max="${mt}" value="${v}" />
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
                <strong id="calculator-unit-price">${h(k(t,v))}<small>/ шт.</small></strong>
              </div>
              <div class="calculation-result__total">
                <span>Весь тираж</span>
                <strong id="calculator-total">${h(k(t,v)*v)}</strong>
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
          ${be.map((e,a)=>`
                <details${a===0?" open":""}>
                  <summary><span>${l(e.question)}</span><i aria-hidden="true"></i></summary>
                  <p>${l(e.answer)}</p>
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
  `}ne.innerHTML=we();const vt=document.querySelector("#product-grid"),Tt=document.querySelector("#catalog-count");function Et(t){return new Intl.NumberFormat("uk-UA",{maximumFractionDigits:1}).format(Math.max(0,t))}function Se(t){if(!w)return"";const e=_t(w,t.dimensions,S);if(e.fits){const n=Math.min(...e.clearancesPerSide);return`<div class="product-card__fit"><strong>Підходить</strong><span>мін. ${Et(n)} мм на бік</span></div>`}const a=Math.max(...e.deficitsPerSide)*2;return`<div class="product-card__fit is-near"><strong>Найближчий розмір</strong><span>бракує до ${Et(a)} мм</span></div>`}function _e(t){if(!w)return"";const e=_t(w,t.dimensions,S);if(e.fits)return`<div class="product-modal__fit is-fit"><strong>Коробка підходить</strong><span>${Z(S)} враховано у підборі.</span></div>`;const a=Math.max(...e.deficitsPerSide)*2;return`<div class="product-modal__fit is-warning" role="status"><strong>Цей розмір замалий</strong><span>Бракує до ${Et(a)} мм для обраного запасу. Додайте лише після ручної перевірки.</span></div>`}function Kt(t){const e=U(),a=k(t,1),n=k(t,E),s=e?.partner?X(t,1,e):null;return`
    <article
      class="product-card${t.id===R?" is-selected":""}"
      data-product-card="${l(t.id)}"
    >
      <div class="product-card__head">
        <span class="product-card__number">№${l(t.number)}</span>
        <span class="product-card__size-label">внутрішній розмір</span>
      </div>
      <div class="product-card__visual">${lt(t,!0)}</div>
      <h3>${M(t.dimensions)}</h3>
      ${Se(t)}
      <div class="product-card__prices">
        ${s!==null?`<div class="partner-price"><span>Ваша фіксована</span><strong>${h(s)}<small>/шт.</small></strong></div>`:`
              <div><span>1–999 шт.</span><strong>${h(a)}</strong></div>
              <div><span>від 1000 шт.</span><strong>${h(n)}</strong></div>
            `}
      </div>
      <span class="button button--card product-card__cta" aria-hidden="true">Детальніше</span>
      <button
        class="product-card__open"
        type="button"
        data-open-product="${l(t.id)}"
        aria-label="Відкрити коробку №${l(t.number)}, ${M(t.dimensions)}"
      ></button>
    </article>
  `}function qe(t){const e=U(),a=X(t,v,e),n=a*v;return`
    <div class="product-modal">
      <div class="product-modal__visual">
        <div class="product-modal__labels">
          <span>№${l(t.number)}</span>
        </div>
        <div class="product-modal__drawing">${lt(t,!0)}</div>
        <p>Внутрішній розмір · Д × Ш × В</p>
      </div>
      <div class="product-modal__content">
        <p class="eyebrow"><span></span> Внутрішній розмір</p>
        <h2 id="product-dialog-title">${M(t.dimensions)}</h2>
        ${_e(t)}

        <div class="product-modal__rules">
          <div><span>1–999 шт.</span><strong>${h(k(t,1))} / шт.</strong></div>
          <div><span>від 1 000 шт.</span><strong>${h(k(t,E))} / шт.</strong></div>
        </div>

        <div class="quantity-block quantity-block--modal">
          <div class="quantity-block__label">
            <label for="modal-quantity-input">Кількість</label>
            <output id="modal-quantity-output">${v.toLocaleString("uk-UA")} шт.</output>
          </div>
          <div class="quantity-control">
            <button type="button" data-quantity-step="-100" aria-label="Зменшити кількість на 100">−</button>
            <input id="modal-quantity-input" type="number" min="1" max="${mt}" value="${v}" />
            <button type="button" data-quantity-step="100" aria-label="Збільшити кількість на 100">+</button>
          </div>
          <div class="quantity-presets quantity-presets--modal" aria-label="Швидкий вибір кількості">
            ${[100,500,1e3,5e3,1e4,5e4].map(s=>`<button type="button" data-quantity="${s}">${s.toLocaleString("uk-UA")}</button>`).join("")}
          </div>
        </div>

        <div class="product-modal__total" aria-live="polite">
          <div><span id="modal-price-tier">${xt(v,e)}</span><strong id="modal-unit-price">${h(a)} / шт.</strong></div>
          <div><span>Весь тираж</span><strong id="modal-total">${h(n)}</strong></div>
        </div>

        <div class="product-modal__actions">
          <button class="button button--primary" type="button" data-product-to-cart>Додати до кошика</button>
          <button class="button button--ghost" type="button" data-product-to-calculator>Відкрити калькулятор</button>
        </div>
      </div>
    </div>
  `}function re(){const t=document.querySelector("#product-dialog");if(!t?.open||!K)return;const e=_().find(d=>d.id===K);if(!e)return;const a=U(),n=X(e,v,a),s=t.querySelector("#modal-quantity-input");s&&(s.value=String(v));const i=t.querySelector("#modal-quantity-output");i&&(i.value=`${v.toLocaleString("uk-UA")} шт.`);const o=t.querySelector("#modal-price-tier");o&&(o.textContent=xt(v,a));const r=t.querySelector("#modal-unit-price");r&&(r.textContent=`${h(n)} / шт.`);const c=t.querySelector("#modal-total");c&&(c.textContent=h(n*v)),t.querySelectorAll("[data-quantity]").forEach(d=>{d.classList.toggle("is-active",Number(d.dataset.quantity)===v)})}function Wt(t){const e=_().find(s=>s.id===t),a=document.querySelector("#product-dialog"),n=document.querySelector("#product-dialog-content");!e||!a||!n||(K=e.id,Ft(e.id),n.innerHTML=qe(e),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),re())}function xe(){const t=_(),e=bt.trim().toLocaleLowerCase("uk-UA");return t.filter(n=>{const s=`${n.number} ${n.name} ${M(n.dimensions)}`.toLocaleLowerCase("uk-UA"),i=!e||s.includes(e),o=!w||_t(w,n.dimensions,S).fits;return i&&o}).sort((n,s)=>Ct==="price"?n.basePrice-s.basePrice:Ct==="number"?n.number.localeCompare(s.number,"uk-UA",{numeric:!0}):wt(n)-wt(s))}function Ae(){if(!w)return[];const t=bt.trim().toLocaleLowerCase("uk-UA");return _().filter(e=>{const a=`${e.number} ${e.name} ${M(e.dimensions)}`.toLocaleLowerCase("uk-UA");return!t||a.includes(t)}).map(e=>{const n=_t(w,e.dimensions,S).deficitsPerSide.reduce((s,i)=>s+i,0);return{product:e,deficit:n}}).sort((e,a)=>e.deficit-a.deficit||wt(e.product)-wt(a.product)).slice(0,3).map(({product:e})=>e)}function P(t=!1){if(!vt||!Tt)return;const e=document.querySelector("#catalog-more"),a=document.querySelector("#catalog-more-button");if(t){Tt.textContent="Оновлюємо список…",e&&(e.hidden=!0),vt.innerHTML=Array.from({length:6},()=>'<div class="product-skeleton" aria-hidden="true"><i></i><i></i><i></i></div>').join("");return}const n=xe(),s=w?` · предмет ${M(w)} · ${Z(S)}`:"";if(Tt.textContent=`${n.length} із ${_().length} розмірів${s}`,!n.length){const c=Ae();vt.innerHTML=`
      <div class="empty-state${c.length?" empty-state--nearest":""}">
        <div class="empty-state__box" aria-hidden="true"></div>
        <h3>Готового розміру немає.</h3>
        <p>${S?`Із запасом ${Z(S)} точного варіанта немає. Найближчі коробки нижче замалі — це позначено окремо.`:"Змініть габарити предмета або залиште заявку з потрібним розміром."}</p>
        <div class="empty-state__actions">
          ${S?'<button class="button button--ghost" type="button" data-use-tight-fit>Показати без запасу</button>':""}
          <a class="button button--primary" href="#request">Описати свій розмір</a>
        </div>
        ${c.length?`<div class="nearest-results"><div class="nearest-results__head"><strong>Найближчі готові розміри</strong><span>Вони не відповідають обраному запасу</span></div><div class="nearest-results__grid">${c.map(Kt).join("")}</div></div>`:""}
      </div>
    `,e&&(e.hidden=!0);return}const o=window.matchMedia("(max-width: 680px)").matches&&!bt.trim()&&!w&&n.length>4,r=o&&!F?n.slice(0,4):n;vt.innerHTML=r.map(Kt).join(""),e&&a&&(e.hidden=!o,a.textContent=F?"Згорнути каталог":`Показати всі ${n.length} розмірів`,a.setAttribute("aria-expanded",String(F)))}function dt(){window.clearTimeout(zt),P(!0),zt=window.setTimeout(()=>P(!1),320)}function V(){const t=qt(),e=U(),a=X(t,v,e),n=a*v,s=xt(v,e);document.querySelectorAll("#calculator-product-select, #hero-product-select").forEach(q=>{q.value=t.id}),document.querySelectorAll("#quantity-input, #hero-quantity-input, #modal-quantity-input").forEach(q=>{q.value=String(v)});const i=document.querySelector("#quantity-output");i&&(i.value=`${v.toLocaleString("uk-UA")} шт.`);const o=document.querySelector("#calculator-preview");o&&(o.classList.remove("is-changing"),o.offsetWidth,o.classList.add("is-changing"),o.innerHTML=lt(t,!0));const r=document.querySelector("#calculator-tier");r&&(r.textContent=s);const c=document.querySelector("#calculator-unit-price");c&&(c.innerHTML=`${h(a)}<small>/ шт.</small>`);const d=document.querySelector("#calculator-total");d&&(d.textContent=h(n));const m=document.querySelector("#hero-price-label");m&&(m.textContent=s);const f=document.querySelector("#hero-total");f&&(f.textContent=h(n));const y=document.querySelector("#hero-unit");y&&(y.textContent=`${h(a)} / шт.`);const b=document.querySelector("#account-price-badge");b&&(b.textContent=e?.partner?"Персональна ціна активна":"Публічна ціна",b.classList.toggle("is-partner",!!e?.partner));const x=document.querySelector("#threshold-note");if(x)if(e?.partner)x.innerHTML=`<strong>Фіксована ціна:</strong> ${h(a)} за одиницю незалежно від тиражу.`;else if(v<E){const q=E-v,I=k(t,E)*E;x.innerHTML=`Ще <strong>${q.toLocaleString("uk-UA")} шт.</strong> до оптового тарифу. 1000 шт. коштуватимуть ${h(I)}.`}else x.innerHTML=`<strong>Оптовий тариф активний.</strong> Економія проти роздрібної ціни — ${h(v)} на всьому тиражі.`;document.querySelectorAll("[data-quantity]").forEach(q=>{q.classList.toggle("is-active",Number(q.dataset.quantity)===v)}),z(),re()}function Ft(t,e=!1){_().some(a=>a.id===t)&&(R=t,P(!1),V(),e&&document.querySelector("#calculator")?.scrollIntoView({behavior:"smooth",block:"start"}))}function at(t){v=gt(t),V()}function Jt(t,e){if(!_().some(i=>i.id===t))return;const a=j(),n=a.find(i=>i.productId===t);n?n.quantity=gt(e):a.push({productId:t,quantity:gt(e)}),$(u.cart,a),z();const s=document.querySelector("#cart-button");s?.classList.remove("is-updated"),s?.offsetWidth,s?.classList.add("is-updated")}function ce(t,e){const a=j(),n=a.find(s=>s.productId===t);n&&(n.quantity=gt(e),$(u.cart,a),z())}function Le(t){$(u.cart,j().filter(e=>e.productId!==t)),z()}function z(){const t=document.querySelector("#request-summary"),e=document.querySelector("#cart-count"),a=document.querySelector('#request-form button[type="submit"]'),n=j(),s=U();if(e&&(e.textContent=String(n.length)),a&&(a.disabled=n.length===0),!t)return;if(!n.length){t.innerHTML=`
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
    `;return}let i=0;const o=n.map(r=>{const c=_().find(f=>f.id===r.productId);if(!c)return"";const d=X(c,r.quantity,s),m=d*r.quantity;return i+=m,`
        <article class="cart-item">
          <div class="cart-item__index">№${l(c.number)}</div>
          <div class="cart-item__info">
            <strong>${M(c.dimensions)}</strong>
            <span>${h(d)} / шт.</span>
          </div>
          <label class="cart-item__quantity">
            <span>Кількість</span>
            <div class="cart-item__quantity-control">
              <button type="button" data-cart-step="-100" data-cart-product="${l(c.id)}" aria-label="Зменшити кількість коробки №${l(c.number)} на 100">−</button>
              <input class="input" type="number" min="1" max="${mt}" value="${r.quantity}" data-cart-quantity="${l(c.id)}" />
              <button type="button" data-cart-step="100" data-cart-product="${l(c.id)}" aria-label="Збільшити кількість коробки №${l(c.number)} на 100">+</button>
            </div>
          </label>
          <div class="cart-item__total">
            <span>Сума</span>
            <strong>${h(m)}</strong>
          </div>
          <div class="cart-item__actions">
            <button type="button" data-edit-cart="${l(c.id)}">Змінити</button>
            <button class="cart-item__remove" type="button" data-remove-cart="${l(c.id)}" aria-label="Прибрати коробку №${l(c.number)} з кошика">×</button>
          </div>
        </article>
      `}).join("");t.innerHTML=`
    <div class="cart-list">${o}</div>
    <div class="cart-summary__total">
      <span>${Ht(n.length)}</span>
      <div><small>Загальна вартість</small><strong>${h(i)}</strong></div>
    </div>
    <div class="cart-summary__actions">
      <a class="cart-continue" href="#catalog">+ Додати ще один розмір</a>
      <button type="button" data-clear-cart>Очистити кошик</button>
    </div>
  `}function ke(t){const e=B().find(i=>i.id===t);if(!e)return;const a=new Set(_().map(i=>i.id)),n=e.items.filter(i=>a.has(i.productId)).map(i=>({productId:i.productId,quantity:gt(i.quantity)}));if(!n.length)return;const s=j().filter(i=>!n.some(o=>o.productId===i.productId));$(u.cart,[...s,...n]),z(),window.location.hash="request",window.setTimeout(()=>document.querySelector("#request")?.scrollIntoView({behavior:"smooth",block:"start"}),80)}function Y(){const t=document.querySelector("#account-button"),e=U();if(!t)return;t.textContent=e?e.name.split(" ")[0]:"Кабінет",t.classList.toggle("is-signed-in",!!e);const a=document.querySelector("#request-account-hint");a&&(a.textContent=e?e.name:"Гість");const n=document.querySelector("#request-form");if(n&&e){const s=(i,o)=>{const r=n.elements.namedItem(i);r instanceof HTMLInputElement&&!r.value&&(r.value=o)};s("name",e.name),s("phone",e.phone),s("company",e.company)}z()}function Me(){const t=U();if(t){const e=B().filter(r=>r.accountId===t.id).slice().reverse(),a=e.filter(r=>r.status!=="Закрита").length,n=e.reduce((r,c)=>r+c.total,0),s=t.name.split(/\s+/).filter(Boolean).slice(0,2).map(r=>r[0]).join("").toLocaleUpperCase("uk-UA"),i=qt(),o=X(i,v,t);return`
      <div class="account-dashboard">
        <section class="account-dashboard__hero">
          <div class="account-identity">
            <span class="account-avatar">${l(s||"TP")}</span>
            <div>
              <p class="eyebrow eyebrow--light"><span></span> Особистий кабінет</p>
              <h1 id="account-page-title">${l(t.name)}</h1>
              <p>${l(t.phone)}${t.company?` · ${l(t.company)}`:""}</p>
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
          <article><span>Сума заявок</span><strong>${h(n)}</strong><small>загальна вартість</small></article>
        </div>

        <div class="account-dashboard__grid">
          <section class="account-orders-panel">
            <div class="account-panel-heading">
              <div><p class="eyebrow"><span></span> Історія</p><h2>Мої заявки</h2></div>
              <a class="text-link" href="#request">Нова заявка <span>→</span></a>
            </div>
            <div class="account-order-list">
              ${e.length?e.map(r=>{const c=r.items.reduce((d,m)=>d+m.quantity,0);return`
                          <article class="account-order">
                            <div class="account-order__main">
                              <span>${l(r.id)}</span>
                              <strong>${Ht(r.items.length)}</strong>
                              <small>${c.toLocaleString("uk-UA")} шт. загалом</small>
                            </div>
                            <div class="account-order__price"><strong>${h(r.total)}</strong><small>загальна сума</small></div>
                            <div class="account-order__meta"><span>${l(r.status)}</span><time datetime="${r.createdAt}">${new Date(r.createdAt).toLocaleDateString("uk-UA")}</time></div>
                            <div class="account-order__items">
                              ${r.items.map(d=>`<span><b>№${l(d.productNumber)}</b> ${M(d.dimensions)} · ${d.quantity.toLocaleString("uk-UA")} шт.</span>`).join("")}
                            </div>
                            <button class="account-order__repeat" type="button" data-repeat-order="${l(r.id)}">Повторити замовлення</button>
                          </article>
                        `}).join(""):'<div class="account-empty"><strong>Заявок ще немає.</strong><p>Оберіть розмір, порахуйте тираж і збережіть першу заявку.</p><a class="button button--primary" href="#catalog">До каталогу</a></div>'}
            </div>
          </section>

          <aside class="account-sidebar">
            <article class="account-quick-order">
              <p class="technical-label">Швидкий розрахунок</p>
              <div class="account-quick-order__box">${lt(i,!1)}</div>
              <span>Коробка №${l(i.number)}</span>
              <h3>${M(i.dimensions)}</h3>
              <div><span>${v.toLocaleString("uk-UA")} шт.</span><strong>${h(o*v)}</strong></div>
              <button class="button button--gold button--wide" type="button" data-add-selected-to-cart>Додати до кошика</button>
            </article>
            <article class="account-profile-card">
              <div><p class="technical-label">Профіль</p><button class="text-link" type="button" data-edit-profile>Дані клієнта</button></div>
              <dl>
                <div><dt>Телефон</dt><dd>${l(t.phone)}</dd></div>
                <div><dt>Компанія</dt><dd>${l(t.company||"Не вказано")}</dd></div>
                <div><dt>Статус</dt><dd>${t.partner?"Постійний клієнт":"Новий клієнт"}</dd></div>
              </dl>
              ${t.role==="admin"?'<a class="button button--ghost button--wide" href="#admin">Відкрити адмінку</a>':""}
            </article>
            ${W().length?`<article class="account-measurements"><div><p class="technical-label">Збережені розміри</p><span>${W().length} останніх</span></div><div class="account-measurements__list">${W().map(r=>`<button type="button" data-saved-measurement="${l(r.id)}"><strong>${M(r.dimensions)}</strong><span>${Z(r.margin)}</span></button>`).join("")}</div></article>`:""}
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
  `}function J(){const t=document.querySelector("#account-page-content");t&&(t.innerHTML=Me())}function Te(t){return`
    <div class="profile-editor">
      <p class="eyebrow"><span></span> Дані клієнта</p>
      <h2 id="profile-dialog-title">Оновити профіль.</h2>
      <p>Телефон використовується для входу та зв’язку щодо заявки.</p>
      <form id="profile-form" novalidate>
        <label class="field"><span>Ім’я *</span><input class="input" name="name" value="${l(t.name)}" autocomplete="name" required /></label>
        <label class="field"><span>Телефон *</span><input class="input" name="phone" type="tel" inputmode="tel" autocomplete="tel" value="${l(t.phone)}" pattern="[+]?380[0-9]{9}" required /></label>
        <label class="field"><span>Компанія</span><input class="input" name="company" value="${l(t.company)}" autocomplete="organization" /></label>
        <label class="field"><span>Новий пароль</span><input class="input" name="password" type="password" minlength="6" autocomplete="new-password" placeholder="Залиште порожнім, щоб не змінювати" /></label>
        <div class="form-status" data-profile-status aria-live="polite"></div>
        <div class="profile-editor__actions">
          <button class="button button--ghost" type="button" data-close-profile>Скасувати</button>
          <button class="button button--primary" type="submit">Зберегти дані</button>
        </div>
      </form>
    </div>
  `}function Pe(){const t=U(),e=document.querySelector("#profile-dialog"),a=document.querySelector("#profile-dialog-content");!t||!e||!a||(a.innerHTML=Te(t),typeof e.showModal=="function"?e.showModal():e.setAttribute("open",""),a.querySelector('input[name="name"]')?.focus())}function Ce(t){t.classList.add("was-validated");const e=t.querySelector("[data-profile-status]");if(!t.reportValidity()){e&&(e.className="form-status is-error",e.textContent="Перевірте ім’я, телефон і новий пароль.");return}const a=U();if(!a)return;const n=new FormData(t),s=ht(String(n.get("phone")??"")),i=D();if(i.some(c=>c.id!==a.id&&ot(c.phone)===ot(s))){e&&(e.className="form-status is-error",e.textContent="Акаунт із таким номером уже існує.");return}const o=String(n.get("password")??""),r=i.map(c=>c.id===a.id?{...c,name:String(n.get("name")??"").trim(),phone:s,company:String(n.get("company")??"").trim(),password:o||c.password}:c);$(u.accounts,r),document.querySelector("#profile-dialog")?.close(),Y(),J(),V(),P(!1)}function le(t,e,a){const n=t.querySelector("[data-auth-status]");n&&(n.textContent=e,n.className=`form-status is-${a}`)}function Ie(t,e){const a=ot(t),n=D().find(s=>ot(s.phone)===a&&s.password===e);return n?(localStorage.setItem(u.session,n.id),n):null}function Zt(t,e=!1){if(t.classList.add("was-validated"),!t.reportValidity())return;const a=new FormData(t),n=Ie(String(a.get("phone")??""),String(a.get("password")??""));if(!n||e&&n.role!=="admin"){le(t,e?"Потрібен акаунт менеджера.":"Невірний телефон або пароль.","error");return}Y(),V(),P(!1),e?L():(J(),window.location.hash="account")}function Ee(t){if(t.classList.add("was-validated"),!t.reportValidity())return;const e=new FormData(t),a=ht(String(e.get("phone")??"")),n=D();if(n.some(i=>ot(i.phone)===ot(a))){le(t,"Акаунт із таким номером уже існує.","error");return}const s={id:`account-${Date.now().toString(36)}`,name:String(e.get("name")??"").trim(),phone:a,company:String(e.get("company")??"").trim(),password:String(e.get("password")??""),role:"client",partner:!1,fixedMarkup:Pt,createdAt:new Date().toISOString()};n.push(s),$(u.accounts,n),localStorage.setItem(u.session,s.id),Y(),V(),P(!1),J(),window.location.hash="account"}function De(t){const e=document.querySelector("#request-status"),a=j();if(!a.length){e&&(e.className="form-status is-error",e.textContent="Додайте хоча б одну коробку до кошика.");return}if(t.classList.add("was-validated"),!t.reportValidity()){e&&(e.className="form-status is-error",e.textContent="Перевірте обов’язкові поля та згоду.");return}const n=new FormData(t),s=U(),i=ht(String(n.get("phone")??"")),o=s??D().find(y=>ht(y.phone)===i),r=a.flatMap(y=>{const b=_().find(q=>q.id===y.productId);if(!b)return[];const x=X(b,y.quantity,s);return[{productId:b.id,productNumber:b.number,dimensions:b.dimensions,quantity:y.quantity,unitPrice:x,total:x*y.quantity,priceType:xt(y.quantity,s)}]}),c=r.reduce((y,b)=>y+b.total,0),d=new Date().toISOString(),m={id:`TP-${Date.now().toString(36).toUpperCase()}`,createdAt:d,customerName:String(n.get("name")??"").trim(),phone:i,company:String(n.get("company")??"").trim(),comment:String(n.get("comment")??"").trim(),items:r,total:c,accountId:o?.id,status:"Нова",statusHistory:[{status:"Нова",at:d}]},f=B();f.push(m),$(u.orders,f),$(u.cart,[]),z(),J(),e&&(e.className="form-status is-success",e.innerHTML=`<strong>Заявку ${l(m.id)} створено.</strong><span>${Ht(m.items.length)} на суму ${h(m.total)}. Номер можна повідомити менеджеру.</span>`),t.querySelector('button[type="submit"]')?.focus()}const Ne=["Нова","У роботі","Уточнення","Підтверджена","Закрита"];function Yt(t){return t==="Нова"?"is-new":t==="У роботі"?"is-progress":t==="Уточнення"?"is-clarifying":t==="Підтверджена"?"is-confirmed":"is-closed"}function Ue(t){return`
    <div class="order-status-control ${Yt(t.status)}" data-order-status-control>
      <button class="order-status-control__trigger" type="button" data-order-status-trigger aria-haspopup="listbox" aria-expanded="false">
        <span class="order-status-control__dot" aria-hidden="true"></span>
        <span>${l(t.status)}</span>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
      </button>
      <div class="order-status-control__menu" role="listbox" aria-label="Статус заявки ${l(t.id)}" hidden>
        ${Ne.map(e=>`
            <button class="${Yt(e)}" type="button" role="option" aria-selected="${e===t.status}" data-order-status-option="${l(e)}" data-order-id="${l(t.id)}">
              <span class="order-status-control__dot" aria-hidden="true"></span>
              <span>${l(e)}</span>
              ${e===t.status?'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7" /></svg>':""}
            </button>
          `).join("")}
      </div>
    </div>
  `}function nt(t){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${n}`}function Dt(t){const[e,a,n]=t.split("-").map(Number);return new Date(e,Math.max(0,(a||1)-1),n||1,12)}function de(t=!1){const a=nt(new Date),s=Dt(G||C||a),i=new Date(s.getFullYear(),s.getMonth(),1,12);G=nt(i);const o=(i.getDay()+6)%7,r=new Date(i);r.setDate(i.getDate()-o);const c=Array.from({length:42},(f,y)=>{const b=new Date(r);b.setDate(r.getDate()+y);const x=nt(b),q=b.getMonth()!==i.getMonth(),I=x===C;return`<button class="${[q?"is-outside":"",I?"is-selected":"",x===a?"is-today":""].filter(Boolean).join(" ")}" type="button" data-calendar-date="${x}" aria-label="${b.toLocaleDateString("uk-UA",{day:"numeric",month:"long",year:"numeric"})}"${I?' aria-current="date"':""}>${b.getDate()}</button>`}).join(""),d=C?Dt(C).toLocaleDateString("uk-UA"):"Усі дати",m=i.toLocaleDateString("uk-UA",{month:"long",year:"numeric"});return`
    <div class="admin-calendar${t?" is-open":""}" data-admin-calendar>
      <button class="admin-calendar__trigger" type="button" data-calendar-trigger aria-haspopup="dialog" aria-expanded="${t}">
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 2v3m10-3v3M3 8h14M4 4h12a1 1 0 0 1 1 1v12H3V5a1 1 0 0 1 1-1Z" /></svg>
        <span><small>Дата заявки</small><strong>${l(d)}</strong></span>
        <svg class="admin-calendar__chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
      </button>
      <div class="admin-calendar__popover" role="dialog" aria-label="Оберіть дату заявки"${t?"":" hidden"}>
        <div class="admin-calendar__head">
          <strong>${l(m)}</strong>
          <div>
            <button type="button" data-calendar-month="-1" aria-label="Попередній місяць"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m10 3-5 5 5 5" /></svg></button>
            <button type="button" data-calendar-month="1" aria-label="Наступний місяць"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg></button>
          </div>
        </div>
        <div class="admin-calendar__weekdays" aria-hidden="true">${["Пн","Вт","Ср","Чт","Пт","Сб","Нд"].map(f=>`<span>${f}</span>`).join("")}</div>
        <div class="admin-calendar__days">${c}</div>
        <div class="admin-calendar__footer">
          <button type="button" data-calendar-clear${C?"":" disabled"}>Очистити</button>
          <button type="button" data-calendar-today>Сьогодні</button>
        </div>
      </div>
    </div>
  `}function Oe(){return window.location.hash==="#admin-orders"?"orders":window.location.hash==="#admin-clients"?"clients":window.location.hash==="#admin-products"?"products":"overview"}function He(t,e,a,n){return[{view:"overview",href:"#admin",label:"Огляд"},{view:"orders",href:"#admin-orders",label:"Замовлення",count:e},{view:"clients",href:"#admin-clients",label:"Клієнти",count:a},{view:"products",href:"#admin-products",label:"Товари",count:n}].map((i,o)=>`
        <a class="admin-nav__link${t===i.view?" is-active":""}" href="${i.href}"${t===i.view?' aria-current="page"':""}>
          <span>${String(o+1).padStart(2,"0")}</span>
          <strong>${i.label}</strong>
          ${i.count===void 0?"":`<b>${i.count}</b>`}
        </a>
      `).join("")}function Fe(t,e,a){const n=B(),s=D().filter(r=>r.role==="client"),i=N().length,o=T?`<div class="admin-notice" role="status"><span>Готово</span><p>${l(T)}</p></div>`:"";return T="",`
    <div class="admin-workspace">
      <aside class="admin-sidebar-nav">
        <div class="admin-sidebar-nav__head">
          <span class="technical-label">ToffiPacks / Control</span>
          <h2>Управління</h2>
          <p>Замовлення, клієнти й каталог в одному кабінеті.</p>
        </div>
        <nav class="admin-nav" aria-label="Розділи адмінки">
          ${He(e,n.length,s.length,i)}
        </nav>
        <div class="admin-sidebar-nav__footer">
          <span>Ви увійшли як</span>
          <strong>${l(t.name)}</strong>
          <small>${l(t.phone)}</small>
          <button class="text-link" id="admin-logout" type="button">Вийти</button>
        </div>
      </aside>
      <main class="admin-main">
        ${o}
        ${a}
      </main>
    </div>
  `}function ue(t){const e=`${t.id} ${t.customerName} ${t.phone} ${t.company}`.toLocaleLowerCase("uk-UA");return`
    <article class="order-card" data-admin-order data-status="${l(t.status)}" data-date="${t.createdAt.slice(0,10)}" data-search="${l(e)}">
      <div class="order-card__top">
        <div><span>${l(t.id)}</span><strong>${l(t.customerName)}</strong></div>
        ${Ue(t)}
      </div>
      <div class="order-card__grid">
        <div><span>Контакт</span><a href="tel:${l(t.phone)}">${l(t.phone)}</a><small>Телефон клієнта</small></div>
        <div><span>Позицій</span><strong>${t.items.length}</strong><small>${t.items.reduce((a,n)=>a+n.quantity,0).toLocaleString("uk-UA")} шт. загалом</small></div>
        <div><span>Сума</span><strong>${h(t.total)}</strong><small>кінцева вартість</small></div>
      </div>
      <div class="order-card__items">
        ${t.items.map(a=>`
              <div>
                <span>№${l(a.productNumber)}</span>
                <strong>${M(a.dimensions)}</strong>
                <small>${a.quantity.toLocaleString("uk-UA")} шт. · ${h(a.unitPrice)} / шт.</small>
                <b>${h(a.total)}</b>
              </div>
            `).join("")}
      </div>
      ${t.company||t.comment?`<p class="order-card__comment">${l(t.company)}${t.company&&t.comment?" · ":""}${l(t.comment)}</p>`:""}
      <div class="order-status-history" aria-label="Історія статусів">
        <span>Історія</span>
        <div>
          ${(t.statusHistory??[{status:t.status,at:t.createdAt}]).slice().reverse().slice(0,5).map(a=>`<p><strong>${l(a.status)}</strong><time datetime="${l(a.at)}">${new Date(a.at).toLocaleString("uk-UA")}</time></p>`).join("")}
        </div>
      </div>
      <label class="order-card__manager-note">
        <span>Нотатка менеджера</span>
        <textarea data-order-note="${l(t.id)}" rows="2" placeholder="Домовленості після дзвінка, дата або деталі">${l(t.managerNote??"")}</textarea>
      </label>
      <div class="order-card__footer">
        <time datetime="${t.createdAt}">${new Date(t.createdAt).toLocaleString("uk-UA")}</time>
        <button type="button" data-delete-order="${l(t.id)}">
          <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M3 5h12M7 2h4l1 3H6l1-3Zm-2 3 1 11h6l1-11M8 8v5m3-5v5" /></svg>
          Видалити заявку
        </button>
      </div>
    </article>
  `}function je(t,e){const a=t.filter(o=>o.status!=="Закрита").length,n=t.reduce((o,r)=>o+r.total,0),s=_().length,i=t.slice(0,3);return`
    <div class="admin-page-heading admin-page-heading--overview">
      <div><p class="eyebrow"><span></span> Панель керування</p><h1 id="admin-title">Все важливе<br />на одному екрані.</h1></div>
      <p>Швидкий стан каталогу, заявок і клієнтів. Детальна робота винесена в окремі розділи.</p>
    </div>
    <div class="admin-stats admin-stats--large">
      <article><span>Усі заявки</span><strong>${t.length}</strong><small>${a} потребують уваги</small></article>
      <article><span>Оборот заявок</span><strong>${h(n)}</strong><small>сума збережених розрахунків</small></article>
      <article><span>Клієнти</span><strong>${e.length}</strong><small>${e.filter(o=>o.partner).length} постійних</small></article>
      <article><span>Товари на сайті</span><strong>${s}</strong><small>${N().length-s} приховано</small></article>
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
        ${i.length?i.map(ue).join(""):'<div class="admin-empty"><h3>Заявок ще немає.</h3><p>Нові замовлення з сайту з’являться тут.</p></div>'}
      </div>
    </section>
  `}function Be(t){const e=["Усі","Нова","У роботі","Уточнення","Підтверджена","Закрита"];return`
    <div class="admin-page-heading">
      <div><p class="eyebrow"><span></span> Замовлення</p><h1 id="admin-title">Заявки без хаосу.</h1></div>
      <p>Пошук за клієнтом або номером, швидка зміна статусу та повний склад кожного замовлення.</p>
    </div>
    <div class="admin-toolbar">
      <label class="admin-search"><span class="sr-only">Пошук заявок</span><input id="admin-order-search" type="search" value="${l(Ot)}" placeholder="Номер, ім’я або телефон" /></label>
      ${de()}
      <div class="admin-filter-chips" aria-label="Фільтр за статусом">
        ${e.map(a=>`<button class="${St===a?"is-active":""}" type="button" data-admin-order-filter="${a}">${a}</button>`).join("")}
      </div>
    </div>
    <div class="admin-results-meta"><strong id="admin-order-count">${t.length}</strong><span>заявок показано</span></div>
    <div class="orders-list" id="admin-orders-list">
      ${t.length?t.map(ue).join(""):'<div class="admin-empty"><h3>Заявок ще немає.</h3><p>Нові замовлення з сайту з’являться тут.</p></div>'}
    </div>
  `}function Re(t){return`
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
                <div class="client-row" data-admin-client data-search="${l(`${e.name} ${e.company} ${e.phone}`.toLocaleLowerCase("uk-UA"))}">
                  <div><strong>${l(e.name)}</strong><span>${l(e.company||"Без компанії")}</span><a href="tel:${l(e.phone)}">${l(e.phone)}</a></div>
                  <label class="partner-toggle"><input type="checkbox" data-partner-toggle="${e.id}"${e.partner?" checked":""} /><span>${e.partner?"Постійний":"Звичайний"}</span></label>
                  <label class="client-price-field"><span>Персональна ставка</span><input class="input" type="number" min="0" max="0.99" step="0.01" value="${e.fixedMarkup}" data-partner-markup="${e.id}"${e.partner?"":" disabled"} /><small>грн / шт.</small></label>
                </div>
              `).join(""):'<div class="admin-empty"><h3>Клієнтів ще немає.</h3></div>'}
    </div>
  `}function jt(){const t=Ut.trim().toLocaleLowerCase("uk-UA");return N().filter(e=>{const a=!t||`${e.number} ${e.name} ${M(e.dimensions)}`.toLocaleLowerCase("uk-UA").includes(t),n=et==="all"||(et==="active"?e.active:!e.active);return a&&n})}function pe(){const t=jt();return t.length?t.map(e=>`
        <article class="admin-product-card${e.active?"":" is-hidden"}" data-admin-product="${e.id}">
          <div class="admin-product-card__visual">${lt(e,!1)}</div>
          <div class="admin-product-card__content">
            <div class="admin-product-card__top"><span>№${l(e.number)}</span><b>${e.active?"На сайті":"Приховано"}</b></div>
            <h3>${M(e.dimensions)}</h3>
            <p>${l(e.name)}</p>
            <dl>
              <div><dt>1–999 шт.</dt><dd>${h(k(e,1))}</dd></div>
              <div><dt>від 1000 шт.</dt><dd>${h(k(e,E))}</dd></div>
            </dl>
            <div class="admin-product-card__actions">
              <button class="button button--primary button--small" type="button" data-edit-product="${e.id}">Редагувати</button>
              <button class="button button--ghost button--small" type="button" data-toggle-product="${e.id}">${e.active?"Приховати":"Показати"}</button>
              <button class="admin-danger-link" type="button" data-delete-product="${e.id}">Видалити</button>
            </div>
          </div>
        </article>
      `).join(""):'<div class="admin-empty"><h3>Нічого не знайдено.</h3><p>Змініть пошук або фільтр видимості.</p></div>'}function Ve(){return`
    <div class="admin-page-heading admin-page-heading--products">
      <div><p class="eyebrow"><span></span> Товари</p><h1 id="admin-title">Каталог під контролем.</h1></div>
      <div class="admin-page-heading__action"><p>Окрема сторінка для розмірів, цін і видимості коробок.</p><button class="button button--primary" type="button" data-create-product>Додати коробку</button></div>
    </div>
    <div class="admin-toolbar admin-toolbar--products">
      <label class="admin-search"><span class="sr-only">Пошук товарів</span><input id="admin-product-search" type="search" value="${l(Ut)}" placeholder="Номер або розмір" /></label>
      <div class="admin-filter-chips" aria-label="Фільтр товарів">
        <button class="${et==="all"?"is-active":""}" type="button" data-product-filter="all">Усі</button>
        <button class="${et==="active"?"is-active":""}" type="button" data-product-filter="active">На сайті</button>
        <button class="${et==="hidden"?"is-active":""}" type="button" data-product-filter="hidden">Приховані</button>
      </div>
      <button class="button button--ghost button--small" type="button" data-export-products>Експорт CSV</button>
      <label class="button button--ghost button--small admin-file-button">Імпорт CSV<input type="file" accept=".csv,text/csv" data-import-products /></label>
      <button class="admin-danger-link" type="button" data-reset-products>Відновити початкові</button>
    </div>
    <div class="admin-results-meta"><strong id="admin-product-count">${jt().length}</strong><span>товарів показано</span></div>
    <div class="admin-products-grid" id="admin-product-list">${pe()}</div>
  `}function L(){const t=document.querySelector("#admin-content");if(!t)return;const e=U();if(!e||e.role!=="admin"){t.innerHTML=`
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
    `;return}const a=B().slice().reverse(),n=D().filter(o=>o.role==="client"),s=Oe();let i=je(a,n);s==="orders"&&(i=Be(a)),s==="clients"&&(i=Re(n)),s==="products"&&(i=Ve()),t.innerHTML=Fe(e,s,i),s==="orders"&&tt()}function tt(){const t=Ot.trim().toLocaleLowerCase("uk-UA");let e=0;document.querySelectorAll("[data-admin-order]").forEach(n=>{const s=!t||(n.dataset.search??"").includes(t),i=St==="Усі"||n.dataset.status===St,o=!C||n.dataset.date===C;n.hidden=!(s&&i&&o),n.hidden||(e+=1)});const a=document.querySelector("#admin-order-count");a&&(a.textContent=String(e))}function $t(t){document.querySelectorAll("[data-order-status-control]").forEach(e=>{e!==t&&(e.classList.remove("is-open"),e.querySelector(".order-status-control__menu")?.setAttribute("hidden",""),e.querySelector("[data-order-status-trigger]")?.setAttribute("aria-expanded","false"))})}function me(){const t=document.querySelector("[data-admin-calendar]");t&&(t.classList.remove("is-open"),t.querySelector(".admin-calendar__popover")?.setAttribute("hidden",""),t.querySelector("[data-calendar-trigger]")?.setAttribute("aria-expanded","false"))}function yt(t,e){const a=document.querySelector("[data-admin-calendar]");a&&(a.outerHTML=de(t),e&&window.requestAnimationFrame(()=>document.querySelector(`[data-admin-calendar] ${e}`)?.focus()))}function Qe(t,e){const a=B(),n=a.find(i=>i.id===t);if(!n||n.status===e)return;const s=n.status;n.status=e,n.statusHistory=[...n.statusHistory??[{status:s,at:n.createdAt}],{status:e,at:new Date().toISOString()}],$(u.orders,a),L()}function ze(t){const e=t.trim().toLocaleLowerCase("uk-UA");document.querySelectorAll("[data-admin-client]").forEach(a=>{a.hidden=!!e&&!(a.dataset.search??"").includes(e)})}function Ke(){const t=document.querySelector("#admin-product-list");t&&(t.innerHTML=pe());const e=document.querySelector("#admin-product-count");e&&(e.textContent=String(jt().length))}function st(){const t=_();if(!t.length)return;t.some(s=>s.id===R)||(R=t[0].id);const e=It();document.querySelectorAll("#calculator-product-select, #hero-product-select").forEach(s=>{s.innerHTML=e,s.value=R});const a=document.querySelector("#hero-product-count");a&&(a.textContent=String(t.length));const n=document.querySelector("#catalog-ready-label");n&&(n.innerHTML=`<span></span> ${t.length} готових розмірів`),P(!1),V(),z()}function We(t){const e=!!t,a=t??{id:"",number:"",name:"",dimensions:{length:180,width:120,height:50},basePrice:5,active:!0};return`
    <div class="admin-product-editor">
      <p class="eyebrow"><span></span> ${e?"Редагування товару":"Новий товар"}</p>
      <h2 id="admin-product-dialog-title">${e?`Коробка №${l(a.number)}`:"Додати коробку"}</h2>
      <p>Після збереження товар одразу оновиться в каталозі та калькуляторі.</p>
      <form id="admin-product-form" novalidate>
        <input type="hidden" name="productId" value="${l(a.id)}" />
        <div class="admin-editor-grid admin-editor-grid--identity">
          <label class="field"><span>Номер *</span><input class="input" name="number" value="${l(a.number)}" maxlength="20" required /></label>
          <label class="field"><span>Назва</span><input class="input" name="name" value="${l(a.name)}" placeholder="Самозбірна коробка" /></label>
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
          <div class="admin-editor-price-preview"><span>На сайті зараз</span><strong>${h(k(a,1))}</strong><small>опт: ${h(k(a,E))}</small></div>
        </div>
        <label class="checkbox admin-editor-active"><input name="active" type="checkbox"${a.active?" checked":""} /><span>Показувати товар у каталозі</span></label>
        <div class="form-status" data-product-form-status aria-live="polite"></div>
        <div class="admin-editor-actions">
          <button class="button button--ghost" type="button" data-close-admin-product>Скасувати</button>
          <button class="button button--primary" type="submit">${e?"Зберегти зміни":"Створити товар"}</button>
        </div>
      </form>
    </div>
  `}function Xt(t){const e=document.querySelector("#admin-product-dialog"),a=document.querySelector("#admin-product-editor");if(!e||!a)return;const n=t?N().find(s=>s.id===t):void 0;a.innerHTML=We(n),typeof e.showModal=="function"?e.showModal():e.setAttribute("open",""),a.querySelector('input[name="number"]')?.focus()}function Je(t){t.classList.add("was-validated");const e=t.querySelector("[data-product-form-status]");if(!t.reportValidity()){e&&(e.className="form-status is-error",e.textContent="Перевірте обов’язкові поля.");return}const a=new FormData(t),n=String(a.get("productId")??""),s=String(a.get("number")??"").trim(),i=N(),o=i.find(f=>f.id===n);if(!Gt.test(s)){e&&(e.className="form-status is-error",e.textContent="У номері можна використовувати літери, цифри, крапку, дефіс і підкреслення.");return}if(i.some(f=>f.number.toLocaleLowerCase("uk-UA")===s.toLocaleLowerCase("uk-UA")&&f.id!==n)){e&&(e.className="form-status is-error",e.textContent="Товар із таким номером уже існує.");return}const r=a.get("active")==="on";if(o?.active&&!r&&_().length<=1){e&&(e.className="form-status is-error",e.textContent="У каталозі має залишитися хоча б один активний товар.");return}const c=o?.id??`box-${s.toLocaleLowerCase("uk-UA").replace(/[^a-zа-яіїєґ0-9]+/giu,"-")}-${Date.now().toString(36)}`,d={...o,id:c,number:s,name:String(a.get("name")??"").trim()||`Самозбірна коробка №${s}`,dimensions:{length:Number(a.get("length")),width:Number(a.get("width")),height:Number(a.get("height"))},basePrice:Number(a.get("basePrice")),active:r,updatedAt:new Date().toISOString()},m=o?i.map(f=>f.id===o.id?d:f):[...i,d];pt(m),st(),document.querySelector("#admin-product-dialog")?.close(),T=o?`Товар №${s} оновлено.`:`Товар №${s} додано до каталогу.`,L()}function Ze(t,e){const a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=URL.createObjectURL(a),s=document.createElement("a");s.href=n,s.download=t,s.click(),window.setTimeout(()=>URL.revokeObjectURL(n),0)}function Ye(t,e,a){const n=new Blob([e],{type:a}),s=URL.createObjectURL(n),i=document.createElement("a");i.href=s,i.download=t,i.click(),window.setTimeout(()=>URL.revokeObjectURL(s),0)}function Xe(t){const e=String(t);return/[;"\n\r]/.test(e)?`"${e.replaceAll('"','""')}"`:e}function Ge(){const t=["number","name","length","width","height","basePrice","active"],e=N().map(a=>[a.number,a.name,a.dimensions.length,a.dimensions.width,a.dimensions.height,a.basePrice,a.active].map(Xe).join(";"));return`\uFEFF${[t.join(";"),...e].join(`\r
`)}`}function ta(){return{version:1,createdAt:new Date().toISOString(),accounts:D(),orders:B(),products:N(),cart:j(),measurements:W(),fit:w?{dimensions:w,margin:S}:null}}function ea(t){if(!t||typeof t!="object")return!1;const e=t;if(e.version!==1||!Array.isArray(e.accounts)||!Array.isArray(e.orders)||!Array.isArray(e.products))return!1;const a=e.accounts.every(i=>i&&typeof i.id=="string"&&typeof i.phone=="string"&&(i.role==="admin"||i.role==="client")),n=e.products.every(i=>i&&typeof i.id=="string"&&typeof i.number=="string"&&Number.isFinite(i.basePrice)&&[i.dimensions?.length,i.dimensions?.width,i.dimensions?.height].every(o=>Number.isFinite(o)&&Number(o)>0)),s=e.orders.every(i=>i&&typeof i.id=="string"&&typeof i.phone=="string"&&Array.isArray(i.items)&&Number.isFinite(i.total));return a&&n&&s&&e.accounts.some(i=>i.role==="admin")}async function aa(t){const e=t.files?.[0];if(e)try{const a=JSON.parse(await e.text());if(!ea(a))throw new Error("Файл не є коректною резервною копією ToffiPacks.");if(!window.confirm("Відновити локальні дані з цієї копії? Поточні заявки, клієнти й товари буде замінено."))return;$(u.accounts,a.accounts),$(u.orders,a.orders),$(u.products,a.products),$(u.cart,Array.isArray(a.cart)?a.cart:[]),$(u.measurements,Array.isArray(a.measurements)?a.measurements:[]),a.fit?$(u.fit,a.fit):localStorage.removeItem(u.fit),w=a.fit?.dimensions??null,S=a.fit?.margin===5||a.fit?.margin===10?a.fit.margin:0,D().some(n=>n.id===localStorage.getItem(u.session))||localStorage.removeItem(u.session),st(),Y(),J(),T=`Резервну копію від ${new Date(a.createdAt).toLocaleString("uk-UA")} відновлено.`,L()}catch(a){T=a instanceof Error?a.message:"Не вдалося відновити резервну копію.",L()}finally{t.value=""}}function na(t){const e=[];let a=[],n="",s=!1;for(let i=0;i<t.length;i+=1){const o=t[i];o==='"'?s&&t[i+1]==='"'?(n+='"',i+=1):s=!s:o===";"&&!s?(a.push(n.trim()),n=""):(o===`
`||o==="\r")&&!s?(o==="\r"&&t[i+1]===`
`&&(i+=1),a.push(n.trim()),a.some(Boolean)&&e.push(a),a=[],n=""):n+=o}return a.push(n.trim()),a.some(Boolean)&&e.push(a),e}function sa(t){const e=na(t.replace(/^\uFEFF/,"")),a=e.shift()?.map(d=>d.trim())??[],n=["number","name","length","width","height","basePrice","active"];if(!n.every(d=>a.includes(d)))throw new Error(`Потрібні колонки: ${n.join(", ")}`);const s=Object.fromEntries(a.map((d,m)=>[d,m])),i=N(),o=new Map(i.map(d=>[d.number.toLocaleLowerCase("uk-UA"),d])),r=e.map(d=>{const m=O=>d[s[O]]?.trim()??"",f=m("number"),y=O=>Number(m(O).replace(",",".")),b={length:y("length"),width:y("width"),height:y("height")},x=y("basePrice");if(!Gt.test(f)||!Object.values(b).every(O=>Number.isFinite(O)&&O>0)||!Number.isFinite(x)||x<=0)throw new Error(`Некоректні дані для коробки ${f||"без номера"}.`);const q=o.get(f.toLocaleLowerCase("uk-UA")),I=m("active").toLocaleLowerCase("uk-UA");return{...q,id:q?.id??`box-${f.toLocaleLowerCase("uk-UA").replace(/[^a-zа-яіїєґ0-9]+/giu,"-")}-${Date.now().toString(36)}`,number:f,name:m("name")||q?.name||`Самозбірна коробка №${f}`,dimensions:b,basePrice:x,active:!["false","0","ні","no"].includes(I),updatedAt:new Date().toISOString()}}),c=new Set(r.map(d=>d.number.toLocaleLowerCase("uk-UA")));return[...i.filter(d=>!c.has(d.number.toLocaleLowerCase("uk-UA"))),...r]}async function ia(t){const e=t.files?.[0];if(e)try{const a=sa(await e.text());if(!window.confirm(`Імпортувати ${a.length} товарів? Позиції з однаковими номерами буде оновлено.`))return;pt(a),st(),T="CSV імпортовано. Каталог оновлено.",L()}catch(a){T=a instanceof Error?a.message:"Не вдалося прочитати CSV.",L()}finally{t.value=""}}function Bt(){const t=document.querySelector("#admin-page"),e=document.querySelector("#account-page"),a=document.querySelector("#main"),n=document.querySelector(".site-header"),s=document.querySelector(".site-footer"),i=document.querySelector(".demo-strip"),o=["#admin","#admin-orders","#admin-clients","#admin-products"].includes(window.location.hash),r=window.location.hash==="#account";t&&(t.hidden=!o),e&&(e.hidden=!r),a&&(a.hidden=o||r),n&&(n.hidden=o||r),s&&(s.hidden=o||r),i&&(i.hidden=o||r),document.body.classList.toggle("is-admin",o),document.body.classList.toggle("is-account",r),o?(L(),window.scrollTo({top:0})):r&&(J(),window.scrollTo({top:0}))}function oa(){const t=document.querySelectorAll(".reveal");if(!("IntersectionObserver"in window)){t.forEach(a=>a.classList.add("is-visible"));return}const e=new IntersectionObserver(a=>{a.forEach(n=>{n.isIntersecting&&(n.target.classList.add("is-visible"),e.unobserve(n.target))})},{threshold:.12});t.forEach(a=>e.observe(a))}document.querySelector("#menu-button")?.addEventListener("click",t=>{const e=t.currentTarget,a=document.querySelector("#site-nav"),n=e.getAttribute("aria-expanded")!=="true";e.setAttribute("aria-expanded",String(n)),a?.classList.toggle("is-open",n)});document.querySelectorAll(".site-nav a").forEach(t=>{t.addEventListener("click",()=>{document.querySelector("#site-nav")?.classList.remove("is-open"),document.querySelector("#menu-button")?.setAttribute("aria-expanded","false")})});document.querySelector('.site-header .brand[href="#top"]')?.addEventListener("click",t=>{t.preventDefault(),window.location.hash!=="#top"&&(window.history.pushState(null,"","#top"),Bt()),window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})});document.querySelector("#fit-form")?.addEventListener("submit",t=>{t.preventDefault();const e=t.currentTarget;e.classList.add("was-validated");const a=document.querySelector("#fit-message");if(!e.reportValidity()){a&&(a.textContent="Вкажіть три додатні розміри.",a.className="form-message is-error");return}const n=new FormData(e);w={length:Number(n.get("length")),width:Number(n.get("width")),height:Number(n.get("height"))};const s=Number(n.get("fitMargin"));S=s===5||s===10?s:0,oe(w,S),F=!1,a&&(a.textContent=`Розміри застосовано · ${Z(S)}.`,a.className="form-message is-success"),dt(),window.setTimeout(()=>document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth"}),180)});document.querySelector("#catalog-search")?.addEventListener("input",t=>{bt=t.currentTarget.value,F=!1,dt()});const Q=document.querySelector("#catalog-sort"),it=Q?.querySelector(".catalog-sort__trigger"),rt=Q?.querySelector(".catalog-sort__menu"),H=Array.from(Q?.querySelectorAll("[data-sort-value]")??[]);function At(t=!1){!it||!rt||(it.setAttribute("aria-expanded","false"),rt.hidden=!0,Q?.classList.remove("is-open"),t&&it.focus())}function fe(){!it||!rt||(it.setAttribute("aria-expanded","true"),rt.hidden=!1,Q?.classList.add("is-open"))}function ra(t){const e=H.find(n=>n.dataset.sortValue===t),a=document.querySelector("#catalog-sort-value");!e||!Q||!a||(Ct=t,Q.dataset.value=t,a.textContent=e.querySelector("span")?.textContent??e.textContent,H.forEach(n=>{n.setAttribute("aria-selected",String(n===e))}),At(!0),dt())}it?.addEventListener("click",()=>{rt?.hidden?fe():At()});H.forEach(t=>{t.addEventListener("click",()=>{ra(t.dataset.sortValue)})});Q?.addEventListener("keydown",t=>{const e=H.indexOf(document.activeElement),a=H.findIndex(s=>s.getAttribute("aria-selected")==="true");if(t.key==="Escape"){t.preventDefault(),At(!0);return}if(t.key!=="ArrowDown"&&t.key!=="ArrowUp"&&t.key!=="Home"&&t.key!=="End")return;t.preventDefault(),rt?.hidden&&fe();let n=e>=0?e:a;t.key==="Home"&&(n=0),t.key==="End"&&(n=H.length-1),t.key==="ArrowDown"&&(n=(n+1)%H.length),t.key==="ArrowUp"&&(n=(n-1+H.length)%H.length),H[n]?.focus()});document.addEventListener("click",t=>{Q?.contains(t.target)||At()});document.querySelector("#reset-catalog")?.addEventListener("click",()=>{w=null,S=0,bt="",F=!1;const t=document.querySelector("#catalog-search");t&&(t.value="");const e=document.querySelector("#fit-message");e&&(e.textContent=""),localStorage.removeItem(u.fit),dt()});document.querySelector("#catalog-more-button")?.addEventListener("click",()=>{F=!F,P(!1),F||document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth",block:"start"})});window.addEventListener("resize",()=>P(!1));document.querySelector("#calculator-product-select")?.addEventListener("change",t=>{Ft(t.currentTarget.value)});document.querySelector("#hero-product-select")?.addEventListener("change",t=>{Ft(t.currentTarget.value)});document.querySelector("#quantity-input")?.addEventListener("input",t=>{at(Number(t.currentTarget.value))});document.querySelector("#hero-quantity-input")?.addEventListener("input",t=>{at(Number(t.currentTarget.value))});document.querySelector("#request-form")?.addEventListener("submit",t=>{t.preventDefault(),De(t.currentTarget)});document.addEventListener("click",t=>{const e=t.target;e.closest("[data-order-status-control]")||$t(),e.closest("[data-admin-calendar]")||me();const a=e.closest("[data-order-status-trigger]");if(a){const p=a.closest("[data-order-status-control]"),g=p?.querySelector(".order-status-control__menu");if(!p||!g)return;const A=g.hidden;$t(p),g.hidden=!A,p.classList.toggle("is-open",A),a.setAttribute("aria-expanded",String(A));return}const n=e.closest("[data-order-status-option]");if(n?.dataset.orderId&&n.dataset.orderStatusOption){Qe(n.dataset.orderId,n.dataset.orderStatusOption);return}const s=e.closest("[data-calendar-trigger]");if(s){const p=s.closest("[data-admin-calendar]"),g=p?.querySelector(".admin-calendar__popover");if(!p||!g)return;const A=g.hidden;$t(),g.hidden=!A,p.classList.toggle("is-open",A),s.setAttribute("aria-expanded",String(A));return}const i=e.closest("[data-calendar-month]");if(i?.dataset.calendarMonth){const p=Dt(G||nt(new Date));p.setMonth(p.getMonth()+Number(i.dataset.calendarMonth),1),G=nt(p),yt(!0,`[data-calendar-month="${i.dataset.calendarMonth}"]`);return}const o=e.closest("[data-calendar-date]");if(o?.dataset.calendarDate){C=o.dataset.calendarDate,G=C,yt(!1),tt();return}if(e.closest("[data-calendar-clear]")){C="",yt(!1),tt();return}if(e.closest("[data-calendar-today]")){C=nt(new Date),G=C,yt(!1),tt();return}const r=e.closest("[data-saved-measurement]");if(r?.dataset.savedMeasurement){const p=W().find(g=>g.id===r.dataset.savedMeasurement);p&&$e(p);return}if(e.closest("[data-clear-measurements]")){localStorage.removeItem(u.measurements),ie(),J();return}if(e.closest("[data-use-tight-fit]")&&w){S=0,oe(w,S);const p=document.querySelector('#fit-form input[name="fitMargin"][value="0"]');p&&(p.checked=!0),dt();return}const c=e.closest("[data-open-product]");if(c?.dataset.openProduct){Wt(c.dataset.openProduct);return}const d=e.closest("[data-quantity]");if(d?.dataset.quantity){at(Number(d.dataset.quantity));return}const m=e.closest("[data-quantity-step]");if(m?.dataset.quantityStep){at(v+Number(m.dataset.quantityStep));return}if(e.closest("[data-product-to-cart]")){Jt(K??R,v),document.querySelector("#product-dialog")?.close(),K=null;return}if(e.closest("[data-add-selected-to-cart]")){Jt(R,v);return}const f=e.closest("[data-cart-step]");if(f?.dataset.cartProduct&&f.dataset.cartStep){const p=j().find(g=>g.productId===f.dataset.cartProduct);p&&ce(p.productId,p.quantity+Number(f.dataset.cartStep));return}const y=e.closest("[data-edit-cart]");if(y?.dataset.editCart){const p=j().find(g=>g.productId===y.dataset.editCart);p&&(at(p.quantity),Wt(p.productId));return}if(e.closest("[data-clear-cart]")){window.confirm("Очистити всі позиції кошика?")&&($(u.cart,[]),z());return}const b=e.closest("[data-repeat-order]");if(b?.dataset.repeatOrder){ke(b.dataset.repeatOrder);return}const x=e.closest("[data-remove-cart]");if(x?.dataset.removeCart){Le(x.dataset.removeCart);return}if(e.closest("[data-product-to-calculator]")){document.querySelector("#product-dialog")?.close(),K=null,window.location.hash="calculator",document.querySelector("#calculator")?.scrollIntoView({behavior:"smooth",block:"start"});return}const q=e.closest("[data-close-dialog]");if(q){q.closest("dialog")?.close(),K=null;return}if(e.closest("[data-edit-profile]")){Pe();return}if(e.closest("[data-close-profile]")){document.querySelector("#profile-dialog")?.close();return}const I=e.closest("[data-auth-tab]");if(I?.dataset.authTab){const p=I.closest(".auth-forms");p?.querySelectorAll("[data-auth-tab]").forEach(g=>{const A=g.dataset.authTab===I.dataset.authTab;g.classList.toggle("is-active",A),g.setAttribute("aria-selected",String(A))}),p?.querySelectorAll("[data-auth-panel]").forEach(g=>{g.hidden=g.dataset.authPanel!==I.dataset.authTab});return}if(e.closest("#logout-button")){localStorage.removeItem(u.session),Y(),V(),P(!1),J();return}if(e.closest("[data-create-product]")){Xt();return}const O=e.closest("[data-edit-product]");if(O?.dataset.editProduct){Xt(O.dataset.editProduct);return}if(e.closest("[data-close-admin-product]")){document.querySelector("#admin-product-dialog")?.close();return}const Lt=e.closest("[data-toggle-product]");if(Lt?.dataset.toggleProduct){const p=N(),g=p.find(A=>A.id===Lt.dataset.toggleProduct);g&&(g.active&&_().length<=1?T="У каталозі має залишитися хоча б один активний товар.":(g.active=!g.active,g.updatedAt=new Date().toISOString(),pt(p),st(),T=g.active?`Товар №${g.number} повернуто на сайт.`:`Товар №${g.number} приховано.`),L());return}const Rt=e.closest("[data-delete-product]");if(Rt?.dataset.deleteProduct){const p=N(),g=p.find(A=>A.id===Rt.dataset.deleteProduct);if(!g)return;if(g.active&&_().length<=1){T="Не можна видалити останній активний товар.",L();return}window.confirm(`Видалити коробку №${g.number}? Цю дію не можна скасувати.`)&&(pt(p.filter(A=>A.id!==g.id)),$(u.cart,j().filter(A=>A.productId!==g.id)),st(),T=`Товар №${g.number} видалено.`,L());return}const Vt=e.closest("[data-delete-order]");if(Vt?.dataset.deleteOrder){const p=B().find(g=>g.id===Vt.dataset.deleteOrder);if(!p)return;window.confirm(`Видалити заявку ${p.id} від ${p.customerName}? Цю дію не можна скасувати.`)&&($(u.orders,B().filter(g=>g.id!==p.id)),T=`Заявку ${p.id} видалено.`,L());return}const Qt=e.closest("[data-product-filter]");if(Qt?.dataset.productFilter){et=Qt.dataset.productFilter,L();return}const kt=e.closest("[data-admin-order-filter]");if(kt?.dataset.adminOrderFilter){St=kt.dataset.adminOrderFilter,document.querySelectorAll("[data-admin-order-filter]").forEach(p=>{p.classList.toggle("is-active",p===kt)}),tt();return}if(e.closest("[data-export-backup]")){Ze(`toffipacks-backup-${new Date().toISOString().slice(0,10)}.json`,ta());return}if(e.closest("[data-export-products]")){Ye(`toffipacks-products-${new Date().toISOString().slice(0,10)}.csv`,Ge(),"text/csv;charset=utf-8");return}if(e.closest("[data-reset-products]")){window.confirm("Відновити початковий каталог? Усі ручні зміни товарів буде втрачено.")&&(pt(Nt.map(p=>({...p,active:!0,updatedAt:new Date().toISOString()}))),st(),T="Початковий каталог відновлено.",L());return}if(e.closest("#admin-logout")){localStorage.removeItem(u.session),Y(),V(),P(!1),window.location.hash="admin",L();return}});document.addEventListener("keydown",t=>{const e=t.target,a=e.closest("[data-order-status-trigger]");if(a&&(t.key==="ArrowDown"||t.key==="ArrowUp")){t.preventDefault();const r=a.closest("[data-order-status-control]");r?.querySelector(".order-status-control__menu")?.hidden&&a.click();const d=Array.from(r?.querySelectorAll("[data-order-status-option]")??[]),m=Math.max(0,d.findIndex(f=>f.getAttribute("aria-selected")==="true"));d[t.key==="ArrowUp"?Math.max(0,m-1):m]?.focus();return}const n=e.closest("[data-order-status-option]");if(n){const r=n.closest("[data-order-status-control]"),c=Array.from(r?.querySelectorAll("[data-order-status-option]")??[]),d=c.indexOf(n);if(t.key==="Escape"){t.preventDefault(),$t(),r?.querySelector("[data-order-status-trigger]")?.focus();return}if(!["ArrowDown","ArrowUp","Home","End"].includes(t.key))return;t.preventDefault();let m=d;t.key==="ArrowDown"&&(m=(d+1)%c.length),t.key==="ArrowUp"&&(m=(d-1+c.length)%c.length),t.key==="Home"&&(m=0),t.key==="End"&&(m=c.length-1),c[m]?.focus();return}const s=e.closest("[data-admin-calendar]");if(s&&t.key==="Escape"){t.preventDefault(),me(),s.querySelector("[data-calendar-trigger]")?.focus();return}const i=e.closest("[data-calendar-trigger]");if(i&&t.key==="ArrowDown"){t.preventDefault(),s?.querySelector(".admin-calendar__popover")?.hidden&&i.click(),(s?.querySelector("[data-calendar-date].is-selected")??s?.querySelector("[data-calendar-date].is-today")??s?.querySelector("[data-calendar-date]:not(.is-outside)"))?.focus();return}const o=e.closest("[data-calendar-date]");if(o&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(t.key)){t.preventDefault();const r=Array.from(s?.querySelectorAll("[data-calendar-date]")??[]),c=r.indexOf(o),d=t.key==="ArrowLeft"?-1:t.key==="ArrowRight"?1:t.key==="ArrowUp"?-7:7;r[c+d]?.focus()}});document.addEventListener("input",t=>{const e=t.target;if(e instanceof HTMLInputElement&&e.id==="modal-quantity-input"){at(Number(e.value));return}if(e instanceof HTMLInputElement&&e.id==="admin-product-search"){Ut=e.value,Ke();return}if(e instanceof HTMLInputElement&&e.id==="admin-order-search"){Ot=e.value,tt();return}if(e instanceof HTMLInputElement&&e.id==="admin-client-search"){ze(e.value);return}if(e instanceof HTMLInputElement&&e.name==="basePrice"&&e.closest("#admin-product-form")){const a=Number(e.value)||0,n={...qt(),basePrice:a},s=e.closest("form")?.querySelector(".admin-editor-price-preview"),i=s?.querySelector("strong"),o=s?.querySelector("small");i&&(i.textContent=h(k(n,1))),o&&(o.textContent=`опт: ${h(k(n,E))}`)}});document.addEventListener("submit",t=>{const e=t.target;e instanceof HTMLFormElement&&(e.id==="login-form"?(t.preventDefault(),Zt(e)):e.id==="register-form"?(t.preventDefault(),Ee(e)):e.id==="admin-login-form"?(t.preventDefault(),Zt(e,!0)):e.id==="admin-product-form"?(t.preventDefault(),Je(e)):e.id==="profile-form"&&(t.preventDefault(),Ce(e)))});document.addEventListener("change",t=>{const e=t.target;if(e instanceof HTMLInputElement&&e.matches("[data-import-products]")){ia(e);return}if(e instanceof HTMLInputElement&&e.matches("[data-import-backup]")){aa(e);return}if(e instanceof HTMLTextAreaElement&&e.dataset.orderNote){const a=B(),n=a.find(s=>s.id===e.dataset.orderNote);n&&(n.managerNote=e.value.trim(),$(u.orders,a));return}if(e instanceof HTMLInputElement||e instanceof HTMLSelectElement){if(e instanceof HTMLInputElement&&e.dataset.cartQuantity){ce(e.dataset.cartQuantity,Number(e.value));return}if(e instanceof HTMLInputElement&&e.dataset.partnerToggle){const a=D(),n=a.find(s=>s.id===e.dataset.partnerToggle);n&&(n.partner=e.checked,$(u.accounts,a),L());return}if(e instanceof HTMLInputElement&&e.dataset.partnerMarkup){const a=D(),n=a.find(s=>s.id===e.dataset.partnerMarkup);n&&(n.fixedMarkup=Math.min(.99,Math.max(0,Number(e.value)||0)),$(u.accounts,a),L())}}});document.querySelector("#product-dialog")?.addEventListener("click",t=>{t.target===t.currentTarget&&(t.currentTarget.close(),K=null)});document.querySelector("#admin-product-dialog")?.addEventListener("click",t=>{t.target===t.currentTarget&&t.currentTarget.close()});document.querySelector("#profile-dialog")?.addEventListener("click",t=>{t.target===t.currentTarget&&t.currentTarget.close()});window.addEventListener("hashchange",Bt);P(!0);window.setTimeout(()=>P(!1),460);V();Y();Bt();oa();"serviceWorker"in navigator&&window.location.protocol==="https:"&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});
