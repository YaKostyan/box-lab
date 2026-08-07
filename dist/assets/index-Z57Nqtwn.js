(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const Y=5e4,A=1e3,Ft=2,Ht=1,ht=.5,vt=[{id:"box-301",number:"301",name:"Самозбірна коробка №301",dimensions:{length:165,width:100,height:30},basePrice:5,sourceQuantity:1e3},{id:"box-302",number:"302",name:"Самозбірна коробка №302",dimensions:{length:130,width:130,height:50},basePrice:7,sourceQuantity:800},{id:"box-303",number:"303",name:"Самозбірна коробка №303",dimensions:{length:190,width:150,height:100},basePrice:17,sourceQuantity:800},{id:"box-304",number:"304",name:"Самозбірна коробка №304",dimensions:{length:230,width:150,height:35},basePrice:11,sourceQuantity:800},{id:"box-305",number:"305",name:"Самозбірна коробка №305",dimensions:{length:160,width:85,height:110},basePrice:6.5},{id:"box-306",number:"306",name:"Самозбірна коробка №306",dimensions:{length:145,width:145,height:40},basePrice:6.5,sourceQuantity:1e3},{id:"box-307",number:"307",name:"Самозбірна коробка №307",dimensions:{length:280,width:180,height:100},basePrice:18,sourceQuantity:500},{id:"box-308",number:"308",name:"Самозбірна коробка №308",dimensions:{length:250,width:180,height:40},basePrice:12,sourceQuantity:800},{id:"box-309",number:"309",name:"Самозбірна коробка №309",dimensions:{length:210,width:150,height:50},basePrice:11,sourceQuantity:900},{id:"box-310",number:"310",name:"Самозбірна коробка №310",dimensions:{length:260,width:260,height:50},basePrice:15,sourceQuantity:600},{id:"box-311",number:"311",name:"Самозбірна коробка №311",dimensions:{length:370,width:170,height:100},basePrice:17},{id:"box-101",number:"101",name:"Самозбірна коробка №101",dimensions:{length:178,width:115,height:48},basePrice:4,sourceQuantity:800}],jt=[{question:"Як відбувається доставка?",answer:"Доставляємо по Києву та Київській області. Формат, точну адресу й вартість потрібно уточнити з менеджером під час підтвердження заявки."},{question:"Які строки виготовлення?",answer:"Строк залежить від розміру коробки, тиражу та завантаження виробництва. Менеджер називає точну дату до запуску замовлення."},{question:"Що отримує постійний клієнт?",answer:"Після підтвердження менеджером у кабінеті активується персональна ціна. Вона автоматично відображається в каталозі, калькуляторі та кошику."},{question:"Як проходить оплата?",answer:"Форму оплати, рахунок і підсумкову суму менеджер погоджує з вами до початку виготовлення."},{question:"Чи працюєте ви з малим і великим бізнесом?",answer:"Так. Можна почати з невеликої партії або замовити регулярний великий тираж. Калькулятор рахує до 50 000 коробок, більший обсяг прораховує менеджер."},{question:"Чи робите коробки під індивідуальний запит?",answer:"Так. Якщо серед готових розмірів немає потрібного, вкажіть габарити й особливості замовлення в коментарі. Менеджер уточнить деталі та підготує розрахунок."}];function u(e){return new Intl.NumberFormat("uk-UA",{style:"currency",currency:"UAH",minimumFractionDigits:Number.isInteger(e)?0:2,maximumFractionDigits:2}).format(e)}function S(e,t){return e.basePrice+(t>=A?Ht:Ft)}function F(e,t,a){return a?.partner?e.basePrice+Math.min(Math.max(a.fixedMarkup,0),.99):S(e,t)}function xt(e){const{length:t,width:a,height:n}=e.dimensions;return t*a*n}function Rt(e,t){const a=[e.length,e.width,e.height].sort((s,i)=>i-s),n=[t.length,t.width,t.height].sort((s,i)=>i-s);return a.every((s,i)=>s<=n[i])}const g={accounts:"toffipacks-accounts-v3",orders:"toffipacks-orders-v3",session:"toffipacks-session-v3",cart:"toffipacks-cart-v1",products:"toffipacks-products-v1"},Pt=/^[\p{L}\p{N}._-]+$/u,Z=new Date().toISOString(),Ct=[{id:"account-admin",name:"Адміністратор ToffiPacks",phone:"+380000000001",company:"ToffiPacks",password:"admin123",role:"admin",partner:!1,fixedMarkup:ht,createdAt:Z},{id:"account-partner",name:"Постійний клієнт",phone:"+380671112233",company:"",password:"client123",role:"client",partner:!0,fixedMarkup:ht,createdAt:Z}],Et=[];function ot(e,t){try{const a=localStorage.getItem(e);return a?JSON.parse(a):t}catch{return t}}function w(e,t){localStorage.setItem(e,JSON.stringify(t))}function Vt(){localStorage.getItem(g.accounts)||w(g.accounts,Ct),localStorage.getItem(g.orders)||w(g.orders,Et),localStorage.getItem(g.cart)||w(g.cart,[]),localStorage.getItem(g.products)||w(g.products,vt.map(e=>({...e,active:!0,updatedAt:Z})))}Vt();let C="box-101",p=500,rt="",ft="size",E=!1,D=null,Lt,N=null,yt="",R="all",$t="",at="Усі",nt="",L="";const Mt=document.querySelector("#app");if(!Mt)throw new Error("Root element #app was not found.");function U(){return ot(g.accounts,Ct)}function P(){const e=vt.map(t=>({...t,active:!0,updatedAt:Z}));return ot(g.products,e).filter(t=>t&&typeof t.id=="string"&&typeof t.number=="string"&&Number.isFinite(t.basePrice)&&Number.isFinite(t.dimensions?.length)&&Number.isFinite(t.dimensions?.width)&&Number.isFinite(t.dimensions?.height)).map(t=>({...t,active:t.active!==!1,updatedAt:t.updatedAt||Z}))}function $(){return P().filter(e=>e.active)}function X(e){w(g.products,e)}function O(){return ot(g.orders,Et).map(t=>{if("items"in t&&Array.isArray(t.items))return t;const a=t;return{id:a.id,createdAt:a.createdAt,customerName:a.customerName,phone:a.phone,company:a.company,comment:a.comment,items:[{productId:a.productId,productNumber:a.productNumber,dimensions:a.dimensions,quantity:a.quantity,unitPrice:a.unitPrice,total:a.total,priceType:a.priceType}],total:a.total,accountId:a.accountId,status:a.status}})}function K(){const e=$();return ot(g.cart,[]).filter(t=>e.some(a=>a.id===t.productId)&&t.quantity>0)}function k(){const e=localStorage.getItem(g.session);return U().find(t=>t.id===e)??null}function ct(){const e=$();return e.find(t=>t.id===C)??e[0]}function st(e){return Number.isFinite(e)?Math.min(Y,Math.max(1,Math.round(e))):1}function lt(e){let t=e.replace(/\D/g,"");return t.length===10&&t.startsWith("0")&&(t=`38${t}`),t.length===12&&t.startsWith("380")?`+${t}`:e.trim()}function Q(e){return lt(e).replace(/\D/g,"")}function l(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function x(e){return`${e.length} × ${e.width} × ${e.height} мм`}function wt(e){const t=e%100,a=e%10;return t>=11&&t<=14?`${e} позицій`:a===1?`${e} позиція`:a>=2&&a<=4?`${e} позиції`:`${e} позицій`}function dt(e,t){return t?.partner?"Фіксована ціна клієнта":e>=A?"Оптова ціна":"Роздрібна ціна"}function W(e,t=!1){const{length:a,width:n,height:s}=e.dimensions,i=170+Math.min(100,a/3),o=58+Math.min(54,s/2.5),r=50+Math.min(44,n/4),d=72,c=t?70:82,m=c-r*.55,b=d+i,y=b+r,h=c+o;return`
    <svg class="box-visual${t?" box-visual--compact":""}" viewBox="0 0 470 270" role="img"
      aria-label="Схема коробки ${l(e.number)}, ${x(e.dimensions)}">
      <g class="box-visual__shape">
        <polygon class="box-visual__top" points="${d},${c} ${d+r},${m} ${y},${m} ${b},${c}" />
        <polygon class="box-visual__side" points="${b},${c} ${y},${m} ${y},${m+o} ${b},${h}" />
        <rect class="box-visual__front" x="${d}" y="${c}" width="${i}" height="${o}" />
        <rect class="box-visual__mark" x="${d+i*.35}" y="${c+o*.32}"
          width="${i*.3}" height="${Math.max(24,o*.34)}" rx="5" />
        <text class="box-visual__number" x="${d+i/2}" y="${c+o*.56}">№${l(e.number)}</text>
      </g>
      <g class="dimension-line dimension-line--length">
        <line x1="${d}" y1="${h+28}" x2="${b}" y2="${h+28}" />
        <line x1="${d}" y1="${h+20}" x2="${d}" y2="${h+36}" />
        <line x1="${b}" y1="${h+20}" x2="${b}" y2="${h+36}" />
        <rect x="${d+i/2-38}" y="${h+12}" width="76" height="32" rx="16" />
        <text x="${d+i/2}" y="${h+33}">${a} мм</text>
      </g>
      <g class="dimension-line dimension-line--height">
        <line x1="${d-26}" y1="${c}" x2="${d-26}" y2="${h}" />
        <line x1="${d-34}" y1="${c}" x2="${d-18}" y2="${c}" />
        <line x1="${d-34}" y1="${h}" x2="${d-18}" y2="${h}" />
        <rect x="2" y="${c+o/2-16}" width="66" height="32" rx="16" />
        <text x="35" y="${c+o/2+5}">${s} мм</text>
      </g>
      <g class="dimension-line dimension-line--width">
        <line x1="${b+8}" y1="${c-8}" x2="${y+8}" y2="${m-8}" />
        <rect x="${y-54}" y="${Math.max(4,m-48)}" width="76" height="32" rx="16" />
        <text x="${y-16}" y="${Math.max(25,m-27)}">${n} мм</text>
      </g>
    </svg>
  `}function gt(){return $().map(e=>`<option value="${l(e.id)}"${e.id===C?" selected":""}>№${l(e.number)} · ${x(e.dimensions)}</option>`).join("")}function Qt(){const e=ct();return`
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
            <div><dt id="hero-product-count">${$().length}</dt><dd>готових розмірів</dd></div>
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
            <select class="select" id="hero-product-select">${gt()}</select>
          </label>
          <label class="field">
            <span>Кількість</span>
            <input class="input" id="hero-quantity-input" type="number" min="1" max="${Y}" value="${p}" />
          </label>
          <div class="hero-calculator__result">
            <span id="hero-price-label">Роздрібна ціна</span>
            <strong id="hero-total">${u(S(e,p)*p)}</strong>
            <small id="hero-unit">${u(S(e,p))} / шт.</small>
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
                <input class="input" name="length" type="number" min="1" max="2000" value="170" required />
              </label>
              <span class="dimension-sign" aria-hidden="true">×</span>
              <label class="field">
                <span>Ширина, мм</span>
                <input class="input" name="width" type="number" min="1" max="2000" value="110" required />
              </label>
              <span class="dimension-sign" aria-hidden="true">×</span>
              <label class="field">
                <span>Висота, мм</span>
                <input class="input" name="height" type="number" min="1" max="2000" value="45" required />
              </label>
            </div>
            <button class="button button--primary" type="submit">Знайти коробку</button>
            <p class="form-message" id="fit-message" aria-live="polite"></p>
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
            <p class="eyebrow" id="catalog-ready-label"><span></span> ${$().length} готових розмірів</p>
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
              <select class="select select--large" id="calculator-product-select">${gt()}</select>
            </label>
            <div class="calculator-preview" id="calculator-preview">${W(e,!0)}</div>
            <div class="quantity-block">
              <div class="quantity-block__label">
                <label for="quantity-input">Кількість</label>
                <output id="quantity-output">${p.toLocaleString("uk-UA")} шт.</output>
              </div>
              <div class="quantity-control">
                <button type="button" data-quantity-step="-100" aria-label="Зменшити кількість на 100">−</button>
                <input id="quantity-input" type="number" min="1" max="${Y}" value="${p}" />
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
                <strong id="calculator-unit-price">${u(S(e,p))}<small>/ шт.</small></strong>
              </div>
              <div class="calculation-result__total">
                <span>Весь тираж</span>
                <strong id="calculator-total">${u(S(e,p)*p)}</strong>
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
          ${jt.map((t,a)=>`
                <details${a===0?" open":""}>
                  <summary><span>${l(t.question)}</span><i aria-hidden="true"></i></summary>
                  <p>${l(t.answer)}</p>
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
  `}Mt.innerHTML=Qt();const et=document.querySelector("#product-grid"),bt=document.querySelector("#catalog-count");function Bt(e){const t=k(),a=S(e,1),n=S(e,A),s=t?.partner?F(e,1,t):null;return`
    <article
      class="product-card${e.id===C?" is-selected":""}"
      data-product-card="${l(e.id)}"
    >
      <div class="product-card__head">
        <span class="product-card__number">№${l(e.number)}</span>
        <span class="product-card__size-label">внутрішній розмір</span>
      </div>
      <div class="product-card__visual">${W(e,!0)}</div>
      <h3>${x(e.dimensions)}</h3>
      <div class="product-card__prices">
        ${s!==null?`<div class="partner-price"><span>Ваша фіксована</span><strong>${u(s)}<small>/шт.</small></strong></div>`:`
              <div><span>1–999 шт.</span><strong>${u(a)}</strong></div>
              <div><span>від 1000 шт.</span><strong>${u(n)}</strong></div>
            `}
      </div>
      <span class="button button--card product-card__cta" aria-hidden="true">Детальніше</span>
      <button
        class="product-card__open"
        type="button"
        data-open-product="${l(e.id)}"
        aria-label="Відкрити коробку №${l(e.number)}, ${x(e.dimensions)}"
      ></button>
    </article>
  `}function zt(e){const t=k(),a=F(e,p,t),n=a*p;return`
    <div class="product-modal">
      <div class="product-modal__visual">
        <div class="product-modal__labels">
          <span>№${l(e.number)}</span>
        </div>
        <div class="product-modal__drawing">${W(e,!0)}</div>
        <p>Внутрішній розмір · Д × Ш × В</p>
      </div>
      <div class="product-modal__content">
        <p class="eyebrow"><span></span> Внутрішній розмір</p>
        <h2 id="product-dialog-title">${x(e.dimensions)}</h2>

        <div class="product-modal__rules">
          <div><span>1–999 шт.</span><strong>${u(S(e,1))} / шт.</strong></div>
          <div><span>від 1 000 шт.</span><strong>${u(S(e,A))} / шт.</strong></div>
        </div>

        <div class="quantity-block quantity-block--modal">
          <div class="quantity-block__label">
            <label for="modal-quantity-input">Кількість</label>
            <output id="modal-quantity-output">${p.toLocaleString("uk-UA")} шт.</output>
          </div>
          <div class="quantity-control">
            <button type="button" data-quantity-step="-100" aria-label="Зменшити кількість на 100">−</button>
            <input id="modal-quantity-input" type="number" min="1" max="${Y}" value="${p}" />
            <button type="button" data-quantity-step="100" aria-label="Збільшити кількість на 100">+</button>
          </div>
          <div class="quantity-presets quantity-presets--modal" aria-label="Швидкий вибір кількості">
            ${[100,500,1e3,5e3,1e4,5e4].map(s=>`<button type="button" data-quantity="${s}">${s.toLocaleString("uk-UA")}</button>`).join("")}
          </div>
        </div>

        <div class="product-modal__total" aria-live="polite">
          <div><span id="modal-price-tier">${dt(p,t)}</span><strong id="modal-unit-price">${u(a)} / шт.</strong></div>
          <div><span>Весь тираж</span><strong id="modal-total">${u(n)}</strong></div>
        </div>

        <div class="product-modal__actions">
          <button class="button button--primary" type="button" data-product-to-cart>Додати до кошика</button>
          <button class="button button--ghost" type="button" data-product-to-calculator>Відкрити калькулятор</button>
        </div>
      </div>
    </div>
  `}function It(){const e=document.querySelector("#product-dialog");if(!e?.open||!N)return;const t=$().find(c=>c.id===N);if(!t)return;const a=k(),n=F(t,p,a),s=e.querySelector("#modal-quantity-input");s&&(s.value=String(p));const i=e.querySelector("#modal-quantity-output");i&&(i.value=`${p.toLocaleString("uk-UA")} шт.`);const o=e.querySelector("#modal-price-tier");o&&(o.textContent=dt(p,a));const r=e.querySelector("#modal-unit-price");r&&(r.textContent=`${u(n)} / шт.`);const d=e.querySelector("#modal-total");d&&(d.textContent=u(n*p)),e.querySelectorAll("[data-quantity]").forEach(c=>{c.classList.toggle("is-active",Number(c.dataset.quantity)===p)})}function Kt(e){const t=$().find(s=>s.id===e),a=document.querySelector("#product-dialog"),n=document.querySelector("#product-dialog-content");!t||!a||!n||(N=t.id,St(t.id),n.innerHTML=zt(t),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),It())}function Wt(){const e=$(),t=rt.trim().toLocaleLowerCase("uk-UA");return e.filter(n=>{const s=`${n.number} ${n.name} ${x(n.dimensions)}`.toLocaleLowerCase("uk-UA"),i=!t||s.includes(t),o=!D||Rt(D,n.dimensions);return i&&o}).sort((n,s)=>ft==="price"?n.basePrice-s.basePrice:ft==="number"?n.number.localeCompare(s.number,"uk-UA",{numeric:!0}):xt(n)-xt(s))}function _(e=!1){if(!et||!bt)return;const t=document.querySelector("#catalog-more"),a=document.querySelector("#catalog-more-button");if(e){bt.textContent="Оновлюємо список…",t&&(t.hidden=!0),et.innerHTML=Array.from({length:6},()=>'<div class="product-skeleton" aria-hidden="true"><i></i><i></i><i></i></div>').join("");return}const n=Wt(),s=D?` · предмет ${x(D)}`:"";if(bt.textContent=`${n.length} із ${$().length} розмірів${s}`,!n.length){et.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__box" aria-hidden="true"></div>
        <h3>Готового розміру немає.</h3>
        <p>Змініть габарити предмета або залиште заявку з потрібним розміром.</p>
        <a class="button button--primary" href="#request">Описати свій розмір</a>
      </div>
    `,t&&(t.hidden=!0);return}const o=window.matchMedia("(max-width: 680px)").matches&&!rt.trim()&&!D&&n.length>4,r=o&&!E?n.slice(0,4):n;et.innerHTML=r.map(Bt).join(""),t&&a&&(t.hidden=!o,a.textContent=E?"Згорнути каталог":`Показати всі ${n.length} розмірів`,a.setAttribute("aria-expanded",String(E)))}function ut(){window.clearTimeout(Lt),_(!0),Lt=window.setTimeout(()=>_(!1),320)}function M(){const e=ct(),t=k(),a=F(e,p,t),n=a*p,s=dt(p,t);document.querySelectorAll("#calculator-product-select, #hero-product-select").forEach(v=>{v.value=e.id}),document.querySelectorAll("#quantity-input, #hero-quantity-input, #modal-quantity-input").forEach(v=>{v.value=String(p)});const i=document.querySelector("#quantity-output");i&&(i.value=`${p.toLocaleString("uk-UA")} шт.`);const o=document.querySelector("#calculator-preview");o&&(o.classList.remove("is-changing"),o.offsetWidth,o.classList.add("is-changing"),o.innerHTML=W(e,!0));const r=document.querySelector("#calculator-tier");r&&(r.textContent=s);const d=document.querySelector("#calculator-unit-price");d&&(d.innerHTML=`${u(a)}<small>/ шт.</small>`);const c=document.querySelector("#calculator-total");c&&(c.textContent=u(n));const m=document.querySelector("#hero-price-label");m&&(m.textContent=s);const b=document.querySelector("#hero-total");b&&(b.textContent=u(n));const y=document.querySelector("#hero-unit");y&&(y.textContent=`${u(a)} / шт.`);const h=document.querySelector("#account-price-badge");h&&(h.textContent=t?.partner?"Персональна ціна активна":"Публічна ціна",h.classList.toggle("is-partner",!!t?.partner));const f=document.querySelector("#threshold-note");if(f)if(t?.partner)f.innerHTML=`<strong>Фіксована ціна:</strong> ${u(a)} за одиницю незалежно від тиражу.`;else if(p<A){const v=A-p,mt=S(e,A)*A;f.innerHTML=`Ще <strong>${v.toLocaleString("uk-UA")} шт.</strong> до оптового тарифу. 1000 шт. коштуватимуть ${u(mt)}.`}else f.innerHTML=`<strong>Оптовий тариф активний.</strong> Економія проти роздрібної ціни — ${u(p)} на всьому тиражі.`;document.querySelectorAll("[data-quantity]").forEach(v=>{v.classList.toggle("is-active",Number(v.dataset.quantity)===p)}),H(),It()}function St(e,t=!1){$().some(a=>a.id===e)&&(C=e,_(!1),M(),t&&document.querySelector("#calculator")?.scrollIntoView({behavior:"smooth",block:"start"}))}function tt(e){p=st(e),M()}function At(e,t){if(!$().some(i=>i.id===e))return;const a=K(),n=a.find(i=>i.productId===e);n?n.quantity=st(t):a.push({productId:e,quantity:st(t)}),w(g.cart,a),H();const s=document.querySelector("#cart-button");s?.classList.remove("is-updated"),s?.offsetWidth,s?.classList.add("is-updated")}function Jt(e,t){const a=K(),n=a.find(s=>s.productId===e);n&&(n.quantity=st(t),w(g.cart,a),H())}function Xt(e){w(g.cart,K().filter(t=>t.productId!==e)),H()}function H(){const e=document.querySelector("#request-summary"),t=document.querySelector("#cart-count"),a=document.querySelector('#request-form button[type="submit"]'),n=K(),s=k();if(t&&(t.textContent=String(n.length)),a&&(a.disabled=n.length===0),!e)return;if(!n.length){e.innerHTML=`
      <div class="cart-empty">
        <span aria-hidden="true">□</span>
        <strong>Кошик порожній</strong>
        <p>Оберіть розмір і додайте потрібну кількість коробок.</p>
        <a class="button button--ghost button--small" href="#catalog">Обрати коробки</a>
      </div>
    `;return}let i=0;const o=n.map(r=>{const d=$().find(b=>b.id===r.productId);if(!d)return"";const c=F(d,r.quantity,s),m=c*r.quantity;return i+=m,`
        <article class="cart-item">
          <div class="cart-item__index">№${l(d.number)}</div>
          <div class="cart-item__info">
            <strong>${x(d.dimensions)}</strong>
            <span>${u(c)} / шт.</span>
          </div>
          <label class="cart-item__quantity">
            <span>Кількість</span>
            <input class="input" type="number" min="1" max="${Y}" value="${r.quantity}" data-cart-quantity="${l(d.id)}" />
          </label>
          <div class="cart-item__total">
            <span>Сума</span>
            <strong>${u(m)}</strong>
          </div>
          <button class="cart-item__remove" type="button" data-remove-cart="${l(d.id)}" aria-label="Прибрати коробку №${l(d.number)} з кошика">×</button>
        </article>
      `}).join("");e.innerHTML=`
    <div class="cart-list">${o}</div>
    <div class="cart-summary__total">
      <span>${wt(n.length)}</span>
      <div><small>Загальна вартість</small><strong>${u(i)}</strong></div>
    </div>
    <a class="cart-continue" href="#catalog">+ Додати ще один розмір</a>
  `}function B(){const e=document.querySelector("#account-button"),t=k();if(!e)return;e.textContent=t?t.name.split(" ")[0]:"Кабінет",e.classList.toggle("is-signed-in",!!t);const a=document.querySelector("#request-account-hint");a&&(a.textContent=t?t.name:"Гість");const n=document.querySelector("#request-form");if(n&&t){const s=(i,o)=>{const r=n.elements.namedItem(i);r instanceof HTMLInputElement&&!r.value&&(r.value=o)};s("name",t.name),s("phone",t.phone),s("company",t.company)}H()}function Gt(){const e=k();if(e){const t=O().filter(r=>r.accountId===e.id).slice().reverse(),a=t.filter(r=>r.status!=="Закрита").length,n=t.reduce((r,d)=>r+d.total,0),s=e.name.split(/\s+/).filter(Boolean).slice(0,2).map(r=>r[0]).join("").toLocaleUpperCase("uk-UA"),i=ct(),o=F(i,p,e);return`
      <div class="account-dashboard">
        <section class="account-dashboard__hero">
          <div class="account-identity">
            <span class="account-avatar">${l(s||"TP")}</span>
            <div>
              <p class="eyebrow eyebrow--light"><span></span> Особистий кабінет</p>
              <h1 id="account-page-title">${l(e.name)}</h1>
              <p>${l(e.phone)}${e.company?` · ${l(e.company)}`:""}</p>
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
          <article><span>Сума заявок</span><strong>${u(n)}</strong><small>загальна вартість</small></article>
        </div>

        <div class="account-dashboard__grid">
          <section class="account-orders-panel">
            <div class="account-panel-heading">
              <div><p class="eyebrow"><span></span> Історія</p><h2>Мої заявки</h2></div>
              <a class="text-link" href="#request">Нова заявка <span>→</span></a>
            </div>
            <div class="account-order-list">
              ${t.length?t.map(r=>{const d=r.items.reduce((c,m)=>c+m.quantity,0);return`
                          <article class="account-order">
                            <div class="account-order__main">
                              <strong>${wt(r.items.length)}</strong>
                              <small>${d.toLocaleString("uk-UA")} шт. загалом</small>
                            </div>
                            <div class="account-order__price"><strong>${u(r.total)}</strong><small>загальна сума</small></div>
                            <div class="account-order__meta"><span>${l(r.status)}</span><time datetime="${r.createdAt}">${new Date(r.createdAt).toLocaleDateString("uk-UA")}</time></div>
                          </article>
                        `}).join(""):'<div class="account-empty"><strong>Заявок ще немає.</strong><p>Оберіть розмір, порахуйте тираж і збережіть першу заявку.</p><a class="button button--primary" href="#catalog">До каталогу</a></div>'}
            </div>
          </section>

          <aside class="account-sidebar">
            <article class="account-quick-order">
              <p class="technical-label">Швидкий розрахунок</p>
              <div class="account-quick-order__box">${W(i,!1)}</div>
              <span>Коробка №${l(i.number)}</span>
              <h3>${x(i.dimensions)}</h3>
              <div><span>${p.toLocaleString("uk-UA")} шт.</span><strong>${u(o*p)}</strong></div>
              <button class="button button--gold button--wide" type="button" data-add-selected-to-cart>Додати до кошика</button>
            </article>
            <article class="account-profile-card">
              <div><p class="technical-label">Профіль</p><button class="text-link" type="button" data-edit-profile>Дані клієнта</button></div>
              <dl>
                <div><dt>Телефон</dt><dd>${l(e.phone)}</dd></div>
                <div><dt>Компанія</dt><dd>${l(e.company||"Не вказано")}</dd></div>
                <div><dt>Статус</dt><dd>${e.partner?"Постійний клієнт":"Новий клієнт"}</dd></div>
              </dl>
              ${e.role==="admin"?'<a class="button button--ghost button--wide" href="#admin">Відкрити адмінку</a>':""}
            </article>
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
  `}function J(){const e=document.querySelector("#account-page-content");e&&(e.innerHTML=Gt())}function Yt(e){return`
    <div class="profile-editor">
      <p class="eyebrow"><span></span> Дані клієнта</p>
      <h2 id="profile-dialog-title">Оновити профіль.</h2>
      <p>Телефон використовується для входу та зв’язку щодо заявки.</p>
      <form id="profile-form" novalidate>
        <label class="field"><span>Ім’я *</span><input class="input" name="name" value="${l(e.name)}" autocomplete="name" required /></label>
        <label class="field"><span>Телефон *</span><input class="input" name="phone" type="tel" inputmode="tel" autocomplete="tel" value="${l(e.phone)}" pattern="[+]?380[0-9]{9}" required /></label>
        <label class="field"><span>Компанія</span><input class="input" name="company" value="${l(e.company)}" autocomplete="organization" /></label>
        <label class="field"><span>Новий пароль</span><input class="input" name="password" type="password" minlength="6" autocomplete="new-password" placeholder="Залиште порожнім, щоб не змінювати" /></label>
        <div class="form-status" data-profile-status aria-live="polite"></div>
        <div class="profile-editor__actions">
          <button class="button button--ghost" type="button" data-close-profile>Скасувати</button>
          <button class="button button--primary" type="submit">Зберегти дані</button>
        </div>
      </form>
    </div>
  `}function Zt(){const e=k(),t=document.querySelector("#profile-dialog"),a=document.querySelector("#profile-dialog-content");!e||!t||!a||(a.innerHTML=Yt(e),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),a.querySelector('input[name="name"]')?.focus())}function te(e){e.classList.add("was-validated");const t=e.querySelector("[data-profile-status]");if(!e.reportValidity()){t&&(t.className="form-status is-error",t.textContent="Перевірте ім’я, телефон і новий пароль.");return}const a=k();if(!a)return;const n=new FormData(e),s=lt(String(n.get("phone")??"")),i=U();if(i.some(d=>d.id!==a.id&&Q(d.phone)===Q(s))){t&&(t.className="form-status is-error",t.textContent="Акаунт із таким номером уже існує.");return}const o=String(n.get("password")??""),r=i.map(d=>d.id===a.id?{...d,name:String(n.get("name")??"").trim(),phone:s,company:String(n.get("company")??"").trim(),password:o||d.password}:d);w(g.accounts,r),document.querySelector("#profile-dialog")?.close(),B(),J(),M(),_(!1)}function Nt(e,t,a){const n=e.querySelector("[data-auth-status]");n&&(n.textContent=t,n.className=`form-status is-${a}`)}function ee(e,t){const a=Q(e),n=U().find(s=>Q(s.phone)===a&&s.password===t);return n?(localStorage.setItem(g.session,n.id),n):null}function kt(e,t=!1){if(e.classList.add("was-validated"),!e.reportValidity())return;const a=new FormData(e),n=ee(String(a.get("phone")??""),String(a.get("password")??""));if(!n||t&&n.role!=="admin"){Nt(e,t?"Потрібен акаунт менеджера.":"Невірний телефон або пароль.","error");return}B(),M(),_(!1),t?q():(J(),window.location.hash="account")}function ae(e){if(e.classList.add("was-validated"),!e.reportValidity())return;const t=new FormData(e),a=lt(String(t.get("phone")??"")),n=U();if(n.some(i=>Q(i.phone)===Q(a))){Nt(e,"Акаунт із таким номером уже існує.","error");return}const s={id:`account-${Date.now().toString(36)}`,name:String(t.get("name")??"").trim(),phone:a,company:String(t.get("company")??"").trim(),password:String(t.get("password")??""),role:"client",partner:!1,fixedMarkup:ht,createdAt:new Date().toISOString()};n.push(s),w(g.accounts,n),localStorage.setItem(g.session,s.id),B(),M(),_(!1),J(),window.location.hash="account"}function ne(e){const t=document.querySelector("#request-status"),a=K();if(!a.length){t&&(t.className="form-status is-error",t.textContent="Додайте хоча б одну коробку до кошика.");return}if(e.classList.add("was-validated"),!e.reportValidity()){t&&(t.className="form-status is-error",t.textContent="Перевірте обов’язкові поля та згоду.");return}const n=new FormData(e),s=k(),i=a.flatMap(c=>{const m=$().find(y=>y.id===c.productId);if(!m)return[];const b=F(m,c.quantity,s);return[{productId:m.id,productNumber:m.number,dimensions:m.dimensions,quantity:c.quantity,unitPrice:b,total:b*c.quantity,priceType:dt(c.quantity,s)}]}),o=i.reduce((c,m)=>c+m.total,0),r={id:`TP-${Date.now().toString(36).toUpperCase()}`,createdAt:new Date().toISOString(),customerName:String(n.get("name")??"").trim(),phone:lt(String(n.get("phone")??"")),company:String(n.get("company")??"").trim(),comment:String(n.get("comment")??"").trim(),items:i,total:o,accountId:s?.id,status:"Нова"},d=O();d.push(r),w(g.orders,d),w(g.cart,[]),H(),J(),t&&(t.className="form-status is-success",t.innerHTML=`<strong>Заявку створено.</strong><span>${wt(r.items.length)} на суму ${u(r.total)}.</span>`),e.querySelector('button[type="submit"]')?.focus()}function se(e){return["Нова","У роботі","Уточнення","Підтверджена","Закрита"].map(a=>`<option value="${a}"${a===e?" selected":""}>${a}</option>`).join("")}function ie(){return window.location.hash==="#admin-orders"?"orders":window.location.hash==="#admin-clients"?"clients":window.location.hash==="#admin-products"?"products":"overview"}function oe(e,t,a,n){return[{view:"overview",href:"#admin",label:"Огляд"},{view:"orders",href:"#admin-orders",label:"Замовлення",count:t},{view:"clients",href:"#admin-clients",label:"Клієнти",count:a},{view:"products",href:"#admin-products",label:"Товари",count:n}].map((i,o)=>`
        <a class="admin-nav__link${e===i.view?" is-active":""}" href="${i.href}"${e===i.view?' aria-current="page"':""}>
          <span>${String(o+1).padStart(2,"0")}</span>
          <strong>${i.label}</strong>
          ${i.count===void 0?"":`<b>${i.count}</b>`}
        </a>
      `).join("")}function re(e,t,a){const n=O(),s=U().filter(r=>r.role==="client"),i=P().length,o=L?`<div class="admin-notice" role="status"><span>Готово</span><p>${l(L)}</p></div>`:"";return L="",`
    <div class="admin-workspace">
      <aside class="admin-sidebar-nav">
        <div class="admin-sidebar-nav__head">
          <span class="technical-label">ToffiPacks / Control</span>
          <h2>Управління</h2>
          <p>Замовлення, клієнти й каталог в одному кабінеті.</p>
        </div>
        <nav class="admin-nav" aria-label="Розділи адмінки">
          ${oe(t,n.length,s.length,i)}
        </nav>
        <div class="admin-sidebar-nav__footer">
          <span>Ви увійшли як</span>
          <strong>${l(e.name)}</strong>
          <small>${l(e.phone)}</small>
          <button class="text-link" id="admin-logout" type="button">Вийти</button>
        </div>
      </aside>
      <main class="admin-main">
        ${o}
        ${a}
      </main>
    </div>
  `}function Ut(e){const t=`${e.id} ${e.customerName} ${e.phone} ${e.company}`.toLocaleLowerCase("uk-UA");return`
    <article class="order-card" data-admin-order data-status="${l(e.status)}" data-date="${e.createdAt.slice(0,10)}" data-search="${l(t)}">
      <div class="order-card__top">
        <div><span>${l(e.id)}</span><strong>${l(e.customerName)}</strong></div>
        <select class="select status-select" data-order-status="${l(e.id)}">${se(e.status)}</select>
      </div>
      <div class="order-card__grid">
        <div><span>Контакт</span><a href="tel:${l(e.phone)}">${l(e.phone)}</a><small>Телефон клієнта</small></div>
        <div><span>Позицій</span><strong>${e.items.length}</strong><small>${e.items.reduce((a,n)=>a+n.quantity,0).toLocaleString("uk-UA")} шт. загалом</small></div>
        <div><span>Сума</span><strong>${u(e.total)}</strong><small>кінцева вартість</small></div>
      </div>
      <div class="order-card__items">
        ${e.items.map(a=>`
              <div>
                <span>№${l(a.productNumber)}</span>
                <strong>${x(a.dimensions)}</strong>
                <small>${a.quantity.toLocaleString("uk-UA")} шт. · ${u(a.unitPrice)} / шт.</small>
                <b>${u(a.total)}</b>
              </div>
            `).join("")}
      </div>
      ${e.company||e.comment?`<p class="order-card__comment">${l(e.company)}${e.company&&e.comment?" · ":""}${l(e.comment)}</p>`:""}
      <label class="order-card__manager-note">
        <span>Нотатка менеджера</span>
        <textarea data-order-note="${l(e.id)}" rows="2" placeholder="Домовленості після дзвінка, дата або деталі">${l(e.managerNote??"")}</textarea>
      </label>
      <time datetime="${e.createdAt}">${new Date(e.createdAt).toLocaleString("uk-UA")}</time>
    </article>
  `}function ce(e,t){const a=e.filter(o=>o.status!=="Закрита").length,n=e.reduce((o,r)=>o+r.total,0),s=$().length,i=e.slice(0,3);return`
    <div class="admin-page-heading admin-page-heading--overview">
      <div><p class="eyebrow"><span></span> Панель керування</p><h1 id="admin-title">Все важливе<br />на одному екрані.</h1></div>
      <p>Швидкий стан каталогу, заявок і клієнтів. Детальна робота винесена в окремі розділи.</p>
    </div>
    <div class="admin-stats admin-stats--large">
      <article><span>Усі заявки</span><strong>${e.length}</strong><small>${a} потребують уваги</small></article>
      <article><span>Оборот заявок</span><strong>${u(n)}</strong><small>сума збережених розрахунків</small></article>
      <article><span>Клієнти</span><strong>${t.length}</strong><small>${t.filter(o=>o.partner).length} постійних</small></article>
      <article><span>Товари на сайті</span><strong>${s}</strong><small>${P().length-s} приховано</small></article>
    </div>
    <section class="admin-quick-grid" aria-label="Швидкі дії">
      <a href="#admin-orders"><span>01</span><h2>Замовлення</h2><p>Змінюйте статус, телефонуйте клієнту й дивіться склад заявки.</p><b>Відкрити →</b></a>
      <a href="#admin-products"><span>02</span><h2>Каталог</h2><p>Додавайте коробки, редагуйте розміри, ціни та видимість.</p><b>Керувати →</b></a>
      <a href="#admin-clients"><span>03</span><h2>Клієнти</h2><p>Активуйте постійного клієнта та його персональні умови.</p><b>Переглянути →</b></a>
    </section>
    <section class="admin-section">
      <div class="admin-section__head"><h2>Останні заявки</h2><a class="text-link" href="#admin-orders">Усі замовлення →</a></div>
      <div class="orders-list">
        ${i.length?i.map(Ut).join(""):'<div class="admin-empty"><h3>Заявок ще немає.</h3><p>Нові замовлення з сайту з’являться тут.</p></div>'}
      </div>
    </section>
  `}function le(e){const t=["Усі","Нова","У роботі","Уточнення","Підтверджена","Закрита"];return`
    <div class="admin-page-heading">
      <div><p class="eyebrow"><span></span> Замовлення</p><h1 id="admin-title">Заявки без хаосу.</h1></div>
      <p>Пошук за клієнтом або номером, швидка зміна статусу та повний склад кожного замовлення.</p>
    </div>
    <div class="admin-toolbar">
      <label class="admin-search"><span class="sr-only">Пошук заявок</span><input id="admin-order-search" type="search" value="${l($t)}" placeholder="Номер, ім’я або телефон" /></label>
      <label class="admin-date-filter"><span class="sr-only">Дата заявки</span><input id="admin-order-date" type="date" value="${l(nt)}" /></label>
      <div class="admin-filter-chips" aria-label="Фільтр за статусом">
        ${t.map(a=>`<button class="${at===a?"is-active":""}" type="button" data-admin-order-filter="${a}">${a}</button>`).join("")}
      </div>
      <button class="button button--ghost button--small" type="button" data-export-orders>Експорт JSON</button>
    </div>
    <div class="admin-results-meta"><strong id="admin-order-count">${e.length}</strong><span>заявок показано</span></div>
    <div class="orders-list" id="admin-orders-list">
      ${e.length?e.map(Ut).join(""):'<div class="admin-empty"><h3>Заявок ще немає.</h3><p>Нові замовлення з сайту з’являться тут.</p></div>'}
    </div>
  `}function de(e){return`
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
                <div class="client-row" data-admin-client data-search="${l(`${t.name} ${t.company} ${t.phone}`.toLocaleLowerCase("uk-UA"))}">
                  <div><strong>${l(t.name)}</strong><span>${l(t.company||"Без компанії")}</span><a href="tel:${l(t.phone)}">${l(t.phone)}</a></div>
                  <label class="partner-toggle"><input type="checkbox" data-partner-toggle="${t.id}"${t.partner?" checked":""} /><span>${t.partner?"Постійний":"Звичайний"}</span></label>
                  <label class="client-price-field"><span>Персональна ставка</span><input class="input" type="number" min="0" max="0.99" step="0.01" value="${t.fixedMarkup}" data-partner-markup="${t.id}"${t.partner?"":" disabled"} /><small>грн / шт.</small></label>
                </div>
              `).join(""):'<div class="admin-empty"><h3>Клієнтів ще немає.</h3></div>'}
    </div>
  `}function qt(){const e=yt.trim().toLocaleLowerCase("uk-UA");return P().filter(t=>{const a=!e||`${t.number} ${t.name} ${x(t.dimensions)}`.toLocaleLowerCase("uk-UA").includes(e),n=R==="all"||(R==="active"?t.active:!t.active);return a&&n})}function Dt(){const e=qt();return e.length?e.map(t=>`
        <article class="admin-product-card${t.active?"":" is-hidden"}" data-admin-product="${t.id}">
          <div class="admin-product-card__visual">${W(t,!1)}</div>
          <div class="admin-product-card__content">
            <div class="admin-product-card__top"><span>№${l(t.number)}</span><b>${t.active?"На сайті":"Приховано"}</b></div>
            <h3>${x(t.dimensions)}</h3>
            <p>${l(t.name)}</p>
            <dl>
              <div><dt>1–999 шт.</dt><dd>${u(S(t,1))}</dd></div>
              <div><dt>від 1000 шт.</dt><dd>${u(S(t,A))}</dd></div>
            </dl>
            <div class="admin-product-card__actions">
              <button class="button button--primary button--small" type="button" data-edit-product="${t.id}">Редагувати</button>
              <button class="button button--ghost button--small" type="button" data-toggle-product="${t.id}">${t.active?"Приховати":"Показати"}</button>
              <button class="admin-danger-link" type="button" data-delete-product="${t.id}">Видалити</button>
            </div>
          </div>
        </article>
      `).join(""):'<div class="admin-empty"><h3>Нічого не знайдено.</h3><p>Змініть пошук або фільтр видимості.</p></div>'}function ue(){return`
    <div class="admin-page-heading admin-page-heading--products">
      <div><p class="eyebrow"><span></span> Товари</p><h1 id="admin-title">Каталог під контролем.</h1></div>
      <div class="admin-page-heading__action"><p>Окрема сторінка для розмірів, цін і видимості коробок.</p><button class="button button--primary" type="button" data-create-product>Додати коробку</button></div>
    </div>
    <div class="admin-toolbar admin-toolbar--products">
      <label class="admin-search"><span class="sr-only">Пошук товарів</span><input id="admin-product-search" type="search" value="${l(yt)}" placeholder="Номер або розмір" /></label>
      <div class="admin-filter-chips" aria-label="Фільтр товарів">
        <button class="${R==="all"?"is-active":""}" type="button" data-product-filter="all">Усі</button>
        <button class="${R==="active"?"is-active":""}" type="button" data-product-filter="active">На сайті</button>
        <button class="${R==="hidden"?"is-active":""}" type="button" data-product-filter="hidden">Приховані</button>
      </div>
      <button class="button button--ghost button--small" type="button" data-export-products>Експорт CSV</button>
      <label class="button button--ghost button--small admin-file-button">Імпорт CSV<input type="file" accept=".csv,text/csv" data-import-products /></label>
      <button class="admin-danger-link" type="button" data-reset-products>Відновити початкові</button>
    </div>
    <div class="admin-results-meta"><strong id="admin-product-count">${qt().length}</strong><span>товарів показано</span></div>
    <div class="admin-products-grid" id="admin-product-list">${Dt()}</div>
  `}function q(){const e=document.querySelector("#admin-content");if(!e)return;const t=k();if(!t||t.role!=="admin"){e.innerHTML=`
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
    `;return}const a=O().slice().reverse(),n=U().filter(o=>o.role==="client"),s=ie();let i=ce(a,n);s==="orders"&&(i=le(a)),s==="clients"&&(i=de(n)),s==="products"&&(i=ue()),e.innerHTML=re(t,s,i),s==="orders"&&it()}function it(){const e=$t.trim().toLocaleLowerCase("uk-UA");let t=0;document.querySelectorAll("[data-admin-order]").forEach(n=>{const s=!e||(n.dataset.search??"").includes(e),i=at==="Усі"||n.dataset.status===at,o=!nt||n.dataset.date===nt;n.hidden=!(s&&i&&o),n.hidden||(t+=1)});const a=document.querySelector("#admin-order-count");a&&(a.textContent=String(t))}function pe(e){const t=e.trim().toLocaleLowerCase("uk-UA");document.querySelectorAll("[data-admin-client]").forEach(a=>{a.hidden=!!t&&!(a.dataset.search??"").includes(t)})}function me(){const e=document.querySelector("#admin-product-list");e&&(e.innerHTML=Dt());const t=document.querySelector("#admin-product-count");t&&(t.textContent=String(qt().length))}function G(){const e=$();if(!e.length)return;e.some(s=>s.id===C)||(C=e[0].id);const t=gt();document.querySelectorAll("#calculator-product-select, #hero-product-select").forEach(s=>{s.innerHTML=t,s.value=C});const a=document.querySelector("#hero-product-count");a&&(a.textContent=String(e.length));const n=document.querySelector("#catalog-ready-label");n&&(n.innerHTML=`<span></span> ${e.length} готових розмірів`),_(!1),M(),H()}function be(e){const t=!!e,a=e??{id:"",number:"",name:"",dimensions:{length:180,width:120,height:50},basePrice:5,active:!0};return`
    <div class="admin-product-editor">
      <p class="eyebrow"><span></span> ${t?"Редагування товару":"Новий товар"}</p>
      <h2 id="admin-product-dialog-title">${t?`Коробка №${l(a.number)}`:"Додати коробку"}</h2>
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
          <div class="admin-editor-price-preview"><span>На сайті зараз</span><strong>${u(S(a,1))}</strong><small>опт: ${u(S(a,A))}</small></div>
        </div>
        <label class="checkbox admin-editor-active"><input name="active" type="checkbox"${a.active?" checked":""} /><span>Показувати товар у каталозі</span></label>
        <div class="form-status" data-product-form-status aria-live="polite"></div>
        <div class="admin-editor-actions">
          <button class="button button--ghost" type="button" data-close-admin-product>Скасувати</button>
          <button class="button button--primary" type="submit">${t?"Зберегти зміни":"Створити товар"}</button>
        </div>
      </form>
    </div>
  `}function Tt(e){const t=document.querySelector("#admin-product-dialog"),a=document.querySelector("#admin-product-editor");if(!t||!a)return;const n=e?P().find(s=>s.id===e):void 0;a.innerHTML=be(n),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),a.querySelector('input[name="number"]')?.focus()}function he(e){e.classList.add("was-validated");const t=e.querySelector("[data-product-form-status]");if(!e.reportValidity()){t&&(t.className="form-status is-error",t.textContent="Перевірте обов’язкові поля.");return}const a=new FormData(e),n=String(a.get("productId")??""),s=String(a.get("number")??"").trim(),i=P(),o=i.find(b=>b.id===n);if(!Pt.test(s)){t&&(t.className="form-status is-error",t.textContent="У номері можна використовувати літери, цифри, крапку, дефіс і підкреслення.");return}if(i.some(b=>b.number.toLocaleLowerCase("uk-UA")===s.toLocaleLowerCase("uk-UA")&&b.id!==n)){t&&(t.className="form-status is-error",t.textContent="Товар із таким номером уже існує.");return}const r=a.get("active")==="on";if(o?.active&&!r&&$().length<=1){t&&(t.className="form-status is-error",t.textContent="У каталозі має залишитися хоча б один активний товар.");return}const d=o?.id??`box-${s.toLocaleLowerCase("uk-UA").replace(/[^a-zа-яіїєґ0-9]+/giu,"-")}-${Date.now().toString(36)}`,c={...o,id:d,number:s,name:String(a.get("name")??"").trim()||`Самозбірна коробка №${s}`,dimensions:{length:Number(a.get("length")),width:Number(a.get("width")),height:Number(a.get("height"))},basePrice:Number(a.get("basePrice")),active:r,updatedAt:new Date().toISOString()},m=o?i.map(b=>b.id===o.id?c:b):[...i,c];X(m),G(),document.querySelector("#admin-product-dialog")?.close(),L=o?`Товар №${s} оновлено.`:`Товар №${s} додано до каталогу.`,q()}function fe(e,t){const a=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=URL.createObjectURL(a),s=document.createElement("a");s.href=n,s.download=e,s.click(),window.setTimeout(()=>URL.revokeObjectURL(n),0)}function ge(e,t,a){const n=new Blob([t],{type:a}),s=URL.createObjectURL(n),i=document.createElement("a");i.href=s,i.download=e,i.click(),window.setTimeout(()=>URL.revokeObjectURL(s),0)}function ve(e){const t=String(e);return/[;"\n\r]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function ye(){const e=["number","name","length","width","height","basePrice","active"],t=P().map(a=>[a.number,a.name,a.dimensions.length,a.dimensions.width,a.dimensions.height,a.basePrice,a.active].map(ve).join(";"));return`\uFEFF${[e.join(";"),...t].join(`\r
`)}`}function $e(e){const t=[];let a=[],n="",s=!1;for(let i=0;i<e.length;i+=1){const o=e[i];o==='"'?s&&e[i+1]==='"'?(n+='"',i+=1):s=!s:o===";"&&!s?(a.push(n.trim()),n=""):(o===`
`||o==="\r")&&!s?(o==="\r"&&e[i+1]===`
`&&(i+=1),a.push(n.trim()),a.some(Boolean)&&t.push(a),a=[],n=""):n+=o}return a.push(n.trim()),a.some(Boolean)&&t.push(a),t}function we(e){const t=$e(e.replace(/^\uFEFF/,"")),a=t.shift()?.map(c=>c.trim())??[],n=["number","name","length","width","height","basePrice","active"];if(!n.every(c=>a.includes(c)))throw new Error(`Потрібні колонки: ${n.join(", ")}`);const s=Object.fromEntries(a.map((c,m)=>[c,m])),i=P(),o=new Map(i.map(c=>[c.number.toLocaleLowerCase("uk-UA"),c])),r=t.map(c=>{const m=j=>c[s[j]]?.trim()??"",b=m("number"),y=j=>Number(m(j).replace(",",".")),h={length:y("length"),width:y("width"),height:y("height")},f=y("basePrice");if(!Pt.test(b)||!Object.values(h).every(j=>Number.isFinite(j)&&j>0)||!Number.isFinite(f)||f<=0)throw new Error(`Некоректні дані для коробки ${b||"без номера"}.`);const v=o.get(b.toLocaleLowerCase("uk-UA")),mt=m("active").toLocaleLowerCase("uk-UA");return{...v,id:v?.id??`box-${b.toLocaleLowerCase("uk-UA").replace(/[^a-zа-яіїєґ0-9]+/giu,"-")}-${Date.now().toString(36)}`,number:b,name:m("name")||v?.name||`Самозбірна коробка №${b}`,dimensions:h,basePrice:f,active:!["false","0","ні","no"].includes(mt),updatedAt:new Date().toISOString()}}),d=new Set(r.map(c=>c.number.toLocaleLowerCase("uk-UA")));return[...i.filter(c=>!d.has(c.number.toLocaleLowerCase("uk-UA"))),...r]}async function Se(e){const t=e.files?.[0];if(t)try{const a=we(await t.text());if(!window.confirm(`Імпортувати ${a.length} товарів? Позиції з однаковими номерами буде оновлено.`))return;X(a),G(),L="CSV імпортовано. Каталог оновлено.",q()}catch(a){L=a instanceof Error?a.message:"Не вдалося прочитати CSV.",q()}finally{e.value=""}}function _t(){const e=document.querySelector("#admin-page"),t=document.querySelector("#account-page"),a=document.querySelector("#main"),n=document.querySelector(".site-header"),s=document.querySelector(".site-footer"),i=document.querySelector(".demo-strip"),o=["#admin","#admin-orders","#admin-clients","#admin-products"].includes(window.location.hash),r=window.location.hash==="#account";e&&(e.hidden=!o),t&&(t.hidden=!r),a&&(a.hidden=o||r),n&&(n.hidden=o||r),s&&(s.hidden=o||r),i&&(i.hidden=o||r),document.body.classList.toggle("is-admin",o),document.body.classList.toggle("is-account",r),o?(q(),window.scrollTo({top:0})):r&&(J(),window.scrollTo({top:0}))}function qe(){const e=document.querySelectorAll(".reveal");if(!("IntersectionObserver"in window)){e.forEach(a=>a.classList.add("is-visible"));return}const t=new IntersectionObserver(a=>{a.forEach(n=>{n.isIntersecting&&(n.target.classList.add("is-visible"),t.unobserve(n.target))})},{threshold:.12});e.forEach(a=>t.observe(a))}document.querySelector("#menu-button")?.addEventListener("click",e=>{const t=e.currentTarget,a=document.querySelector("#site-nav"),n=t.getAttribute("aria-expanded")!=="true";t.setAttribute("aria-expanded",String(n)),a?.classList.toggle("is-open",n)});document.querySelectorAll(".site-nav a").forEach(e=>{e.addEventListener("click",()=>{document.querySelector("#site-nav")?.classList.remove("is-open"),document.querySelector("#menu-button")?.setAttribute("aria-expanded","false")})});document.querySelector('.site-header .brand[href="#top"]')?.addEventListener("click",e=>{e.preventDefault(),window.location.hash!=="#top"&&(window.history.pushState(null,"","#top"),_t()),window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})});document.querySelector("#fit-form")?.addEventListener("submit",e=>{e.preventDefault();const t=e.currentTarget;t.classList.add("was-validated");const a=document.querySelector("#fit-message");if(!t.reportValidity()){a&&(a.textContent="Вкажіть три додатні розміри.",a.className="form-message is-error");return}const n=new FormData(t);D={length:Number(n.get("length")),width:Number(n.get("width")),height:Number(n.get("height"))},E=!1,a&&(a.textContent="Розміри застосовано. Показуємо коробки нижче.",a.className="form-message is-success"),ut(),window.setTimeout(()=>document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth"}),180)});document.querySelector("#catalog-search")?.addEventListener("input",e=>{rt=e.currentTarget.value,E=!1,ut()});const I=document.querySelector("#catalog-sort"),V=I?.querySelector(".catalog-sort__trigger"),z=I?.querySelector(".catalog-sort__menu"),T=Array.from(I?.querySelectorAll("[data-sort-value]")??[]);function pt(e=!1){!V||!z||(V.setAttribute("aria-expanded","false"),z.hidden=!0,I?.classList.remove("is-open"),e&&V.focus())}function Ot(){!V||!z||(V.setAttribute("aria-expanded","true"),z.hidden=!1,I?.classList.add("is-open"))}function _e(e){const t=T.find(n=>n.dataset.sortValue===e),a=document.querySelector("#catalog-sort-value");!t||!I||!a||(ft=e,I.dataset.value=e,a.textContent=t.querySelector("span")?.textContent??t.textContent,T.forEach(n=>{n.setAttribute("aria-selected",String(n===t))}),pt(!0),ut())}V?.addEventListener("click",()=>{z?.hidden?Ot():pt()});T.forEach(e=>{e.addEventListener("click",()=>{_e(e.dataset.sortValue)})});I?.addEventListener("keydown",e=>{const t=T.indexOf(document.activeElement),a=T.findIndex(s=>s.getAttribute("aria-selected")==="true");if(e.key==="Escape"){e.preventDefault(),pt(!0);return}if(e.key!=="ArrowDown"&&e.key!=="ArrowUp"&&e.key!=="Home"&&e.key!=="End")return;e.preventDefault(),z?.hidden&&Ot();let n=t>=0?t:a;e.key==="Home"&&(n=0),e.key==="End"&&(n=T.length-1),e.key==="ArrowDown"&&(n=(n+1)%T.length),e.key==="ArrowUp"&&(n=(n-1+T.length)%T.length),T[n]?.focus()});document.addEventListener("click",e=>{I?.contains(e.target)||pt()});document.querySelector("#reset-catalog")?.addEventListener("click",()=>{D=null,rt="",E=!1;const e=document.querySelector("#catalog-search");e&&(e.value="");const t=document.querySelector("#fit-message");t&&(t.textContent=""),ut()});document.querySelector("#catalog-more-button")?.addEventListener("click",()=>{E=!E,_(!1),E||document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth",block:"start"})});window.addEventListener("resize",()=>_(!1));document.querySelector("#calculator-product-select")?.addEventListener("change",e=>{St(e.currentTarget.value)});document.querySelector("#hero-product-select")?.addEventListener("change",e=>{St(e.currentTarget.value)});document.querySelector("#quantity-input")?.addEventListener("input",e=>{tt(Number(e.currentTarget.value))});document.querySelector("#hero-quantity-input")?.addEventListener("input",e=>{tt(Number(e.currentTarget.value))});document.querySelector("#request-form")?.addEventListener("submit",e=>{e.preventDefault(),ne(e.currentTarget)});document.addEventListener("click",e=>{const t=e.target,a=t.closest("[data-open-product]");if(a?.dataset.openProduct){Kt(a.dataset.openProduct);return}const n=t.closest("[data-quantity]");if(n?.dataset.quantity){tt(Number(n.dataset.quantity));return}const s=t.closest("[data-quantity-step]");if(s?.dataset.quantityStep){tt(p+Number(s.dataset.quantityStep));return}if(t.closest("[data-product-to-cart]")){At(N??C,p),document.querySelector("#product-dialog")?.close(),N=null;return}if(t.closest("[data-add-selected-to-cart]")){At(C,p);return}const i=t.closest("[data-remove-cart]");if(i?.dataset.removeCart){Xt(i.dataset.removeCart);return}if(t.closest("[data-product-to-calculator]")){document.querySelector("#product-dialog")?.close(),N=null,window.location.hash="calculator",document.querySelector("#calculator")?.scrollIntoView({behavior:"smooth",block:"start"});return}const o=t.closest("[data-close-dialog]");if(o){o.closest("dialog")?.close(),N=null;return}if(t.closest("[data-edit-profile]")){Zt();return}if(t.closest("[data-close-profile]")){document.querySelector("#profile-dialog")?.close();return}const r=t.closest("[data-auth-tab]");if(r?.dataset.authTab){const h=r.closest(".auth-forms");h?.querySelectorAll("[data-auth-tab]").forEach(f=>{const v=f.dataset.authTab===r.dataset.authTab;f.classList.toggle("is-active",v),f.setAttribute("aria-selected",String(v))}),h?.querySelectorAll("[data-auth-panel]").forEach(f=>{f.hidden=f.dataset.authPanel!==r.dataset.authTab});return}if(t.closest("#logout-button")){localStorage.removeItem(g.session),B(),M(),_(!1),J();return}if(t.closest("[data-create-product]")){Tt();return}const d=t.closest("[data-edit-product]");if(d?.dataset.editProduct){Tt(d.dataset.editProduct);return}if(t.closest("[data-close-admin-product]")){document.querySelector("#admin-product-dialog")?.close();return}const c=t.closest("[data-toggle-product]");if(c?.dataset.toggleProduct){const h=P(),f=h.find(v=>v.id===c.dataset.toggleProduct);f&&(f.active&&$().length<=1?L="У каталозі має залишитися хоча б один активний товар.":(f.active=!f.active,f.updatedAt=new Date().toISOString(),X(h),G(),L=f.active?`Товар №${f.number} повернуто на сайт.`:`Товар №${f.number} приховано.`),q());return}const m=t.closest("[data-delete-product]");if(m?.dataset.deleteProduct){const h=P(),f=h.find(v=>v.id===m.dataset.deleteProduct);if(!f)return;if(f.active&&$().length<=1){L="Не можна видалити останній активний товар.",q();return}window.confirm(`Видалити коробку №${f.number}? Цю дію не можна скасувати.`)&&(X(h.filter(v=>v.id!==f.id)),w(g.cart,K().filter(v=>v.productId!==f.id)),G(),L=`Товар №${f.number} видалено.`,q());return}const b=t.closest("[data-product-filter]");if(b?.dataset.productFilter){R=b.dataset.productFilter,q();return}const y=t.closest("[data-admin-order-filter]");if(y?.dataset.adminOrderFilter){at=y.dataset.adminOrderFilter,document.querySelectorAll("[data-admin-order-filter]").forEach(h=>{h.classList.toggle("is-active",h===y)}),it();return}if(t.closest("[data-export-orders]")){fe(`toffipacks-orders-${new Date().toISOString().slice(0,10)}.json`,O());return}if(t.closest("[data-export-products]")){ge(`toffipacks-products-${new Date().toISOString().slice(0,10)}.csv`,ye(),"text/csv;charset=utf-8");return}if(t.closest("[data-reset-products]")){window.confirm("Відновити початковий каталог? Усі ручні зміни товарів буде втрачено.")&&(X(vt.map(h=>({...h,active:!0,updatedAt:new Date().toISOString()}))),G(),L="Початковий каталог відновлено.",q());return}if(t.closest("#admin-logout")){localStorage.removeItem(g.session),B(),M(),_(!1),window.location.hash="admin",q();return}});document.addEventListener("input",e=>{const t=e.target;if(t instanceof HTMLInputElement&&t.id==="modal-quantity-input"){tt(Number(t.value));return}if(t instanceof HTMLInputElement&&t.id==="admin-product-search"){yt=t.value,me();return}if(t instanceof HTMLInputElement&&t.id==="admin-order-search"){$t=t.value,it();return}if(t instanceof HTMLInputElement&&t.id==="admin-order-date"){nt=t.value,it();return}if(t instanceof HTMLInputElement&&t.id==="admin-client-search"){pe(t.value);return}if(t instanceof HTMLInputElement&&t.name==="basePrice"&&t.closest("#admin-product-form")){const a=Number(t.value)||0,n={...ct(),basePrice:a},s=t.closest("form")?.querySelector(".admin-editor-price-preview"),i=s?.querySelector("strong"),o=s?.querySelector("small");i&&(i.textContent=u(S(n,1))),o&&(o.textContent=`опт: ${u(S(n,A))}`)}});document.addEventListener("submit",e=>{const t=e.target;t instanceof HTMLFormElement&&(t.id==="login-form"?(e.preventDefault(),kt(t)):t.id==="register-form"?(e.preventDefault(),ae(t)):t.id==="admin-login-form"?(e.preventDefault(),kt(t,!0)):t.id==="admin-product-form"?(e.preventDefault(),he(t)):t.id==="profile-form"&&(e.preventDefault(),te(t)))});document.addEventListener("change",e=>{const t=e.target;if(t instanceof HTMLInputElement&&t.matches("[data-import-products]")){Se(t);return}if(t instanceof HTMLTextAreaElement&&t.dataset.orderNote){const a=O(),n=a.find(s=>s.id===t.dataset.orderNote);n&&(n.managerNote=t.value.trim(),w(g.orders,a));return}if(t instanceof HTMLInputElement||t instanceof HTMLSelectElement){if(t instanceof HTMLInputElement&&t.dataset.cartQuantity){Jt(t.dataset.cartQuantity,Number(t.value));return}if(t instanceof HTMLSelectElement&&t.dataset.orderStatus){const a=O(),n=a.find(s=>s.id===t.dataset.orderStatus);n&&(n.status=t.value,w(g.orders,a),q());return}if(t instanceof HTMLInputElement&&t.dataset.partnerToggle){const a=U(),n=a.find(s=>s.id===t.dataset.partnerToggle);n&&(n.partner=t.checked,w(g.accounts,a),q());return}if(t instanceof HTMLInputElement&&t.dataset.partnerMarkup){const a=U(),n=a.find(s=>s.id===t.dataset.partnerMarkup);n&&(n.fixedMarkup=Math.min(.99,Math.max(0,Number(t.value)||0)),w(g.accounts,a),q())}}});document.querySelector("#product-dialog")?.addEventListener("click",e=>{e.target===e.currentTarget&&(e.currentTarget.close(),N=null)});document.querySelector("#admin-product-dialog")?.addEventListener("click",e=>{e.target===e.currentTarget&&e.currentTarget.close()});document.querySelector("#profile-dialog")?.addEventListener("click",e=>{e.target===e.currentTarget&&e.currentTarget.close()});window.addEventListener("hashchange",_t);_(!0);window.setTimeout(()=>_(!1),460);M();B();_t();qe();
