(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const B=5e4,x=1e3,Dt=2,Ot=1,ct=.5,ut=[{id:"box-301",number:"301",name:"Самозбірна коробка №301",dimensions:{length:165,width:100,height:30},basePrice:5,sourceQuantity:1e3},{id:"box-302",number:"302",name:"Самозбірна коробка №302",dimensions:{length:130,width:130,height:50},basePrice:7,sourceQuantity:800},{id:"box-303",number:"303",name:"Самозбірна коробка №303",dimensions:{length:190,width:150,height:100},basePrice:17,sourceQuantity:800},{id:"box-304",number:"304",name:"Самозбірна коробка №304",dimensions:{length:230,width:150,height:35},basePrice:11,sourceQuantity:800},{id:"box-305",number:"305",name:"Самозбірна коробка №305",dimensions:{length:160,width:85,height:110},basePrice:6.5},{id:"box-306",number:"306",name:"Самозбірна коробка №306",dimensions:{length:145,width:145,height:40},basePrice:6.5,sourceQuantity:1e3},{id:"box-307",number:"307",name:"Самозбірна коробка №307",dimensions:{length:280,width:180,height:100},basePrice:18,sourceQuantity:500},{id:"box-308",number:"308",name:"Самозбірна коробка №308",dimensions:{length:250,width:180,height:40},basePrice:12,sourceQuantity:800},{id:"box-309",number:"309",name:"Самозбірна коробка №309",dimensions:{length:210,width:150,height:50},basePrice:11,sourceQuantity:900},{id:"box-310",number:"310",name:"Самозбірна коробка №310",dimensions:{length:260,width:260,height:50},basePrice:15,sourceQuantity:600},{id:"box-311",number:"311",name:"Самозбірна коробка №311",dimensions:{length:370,width:170,height:100},basePrice:17},{id:"box-101",number:"101",name:"Самозбірна коробка №101",dimensions:{length:178,width:115,height:48},basePrice:4,sourceQuantity:800}],Ht=[{question:"Як відбувається доставка?",answer:"Доставляємо по Києву та Київській області. Формат, точну адресу й вартість потрібно уточнити з менеджером під час підтвердження заявки."},{question:"Які строки виготовлення?",answer:"Строк залежить від розміру коробки, тиражу та завантаження виробництва. Менеджер називає точну дату до запуску замовлення."},{question:"Що отримує постійний клієнт?",answer:"Після підтвердження менеджером у кабінеті активується персональна ціна. Вона автоматично відображається в каталозі, калькуляторі та кошику."},{question:"Як проходить оплата?",answer:"Форму оплати, рахунок і підсумкову суму менеджер погоджує з вами до початку виготовлення."},{question:"Чи працюєте ви з малим і великим бізнесом?",answer:"Так. Можна почати з невеликої партії або замовити регулярний великий тираж. Калькулятор рахує до 50 000 коробок, більший обсяг прораховує менеджер."},{question:"Чи робите коробки під індивідуальний запит?",answer:"Так. Якщо серед готових розмірів немає потрібного, вкажіть габарити й особливості замовлення в коментарі. Менеджер уточнить деталі та підготує розрахунок."}];function d(t){return new Intl.NumberFormat("uk-UA",{style:"currency",currency:"UAH",minimumFractionDigits:Number.isInteger(t)?0:2,maximumFractionDigits:2}).format(t)}function $(t,e){return t.basePrice+(e>=x?Ot:Dt)}function U(t,e,a){return a?.partner?t.basePrice+Math.min(Math.max(a.fixedMarkup,0),.99):$(t,e)}function wt(t){const{length:e,width:a,height:n}=t.dimensions;return e*a*n}function Ft(t,e){const a=[t.length,t.width,t.height].sort((s,i)=>i-s),n=[e.length,e.width,e.height].sort((s,i)=>i-s);return a.every((s,i)=>s<=n[i])}const b={accounts:"toffipacks-accounts-v3",orders:"toffipacks-orders-v3",session:"toffipacks-session-v3",cart:"toffipacks-cart-v1",products:"toffipacks-products-v1"},z=new Date().toISOString(),At=[{id:"account-admin",name:"Адміністратор ToffiPacks",phone:"+380000000001",company:"ToffiPacks",password:"admin123",role:"admin",partner:!1,fixedMarkup:ct,createdAt:z},{id:"account-partner",name:"Постійний клієнт",phone:"+380671112233",company:"",password:"client123",role:"client",partner:!0,fixedMarkup:ct,createdAt:z}],kt=[];function at(t,e){try{const a=localStorage.getItem(t);return a?JSON.parse(a):e}catch{return e}}function q(t,e){localStorage.setItem(t,JSON.stringify(e))}function jt(){localStorage.getItem(b.accounts)||q(b.accounts,At),localStorage.getItem(b.orders)||q(b.orders,kt),localStorage.getItem(b.cart)||q(b.cart,[]),localStorage.getItem(b.products)||q(b.products,ut.map(t=>({...t,active:!0,updatedAt:z})))}jt();let T="box-101",p=500,pt="",lt="size",F=null,qt,M=null,mt="",O="all",ht="",Z="Усі",k="";const Tt=document.querySelector("#app");if(!Tt)throw new Error("Root element #app was not found.");function N(){return at(b.accounts,At)}function P(){const t=ut.map(e=>({...e,active:!0,updatedAt:z}));return at(b.products,t).filter(e=>e&&typeof e.id=="string"&&typeof e.number=="string"&&Number.isFinite(e.basePrice)&&Number.isFinite(e.dimensions?.length)&&Number.isFinite(e.dimensions?.width)&&Number.isFinite(e.dimensions?.height)).map(e=>({...e,active:e.active!==!1,updatedAt:e.updatedAt||z}))}function y(){return P().filter(t=>t.active)}function G(t){q(b.products,t)}function Q(){return at(b.orders,kt).map(e=>{if("items"in e&&Array.isArray(e.items))return e;const a=e;return{id:a.id,createdAt:a.createdAt,customerName:a.customerName,phone:a.phone,company:a.company,comment:a.comment,items:[{productId:a.productId,productNumber:a.productNumber,dimensions:a.dimensions,quantity:a.quantity,unitPrice:a.unitPrice,total:a.total,priceType:a.priceType}],total:a.total,accountId:a.accountId,status:a.status}})}function R(){const t=y();return at(b.cart,[]).filter(e=>t.some(a=>a.id===e.productId)&&e.quantity>0)}function E(){const t=localStorage.getItem(b.session);return N().find(e=>e.id===t)??null}function nt(){const t=y();return t.find(e=>e.id===T)??t[0]}function tt(t){return Number.isFinite(t)?Math.min(B,Math.max(1,Math.round(t))):1}function bt(t){let e=t.replace(/\D/g,"");return e.length===10&&e.startsWith("0")&&(e=`38${e}`),e.length===12&&e.startsWith("380")?`+${e}`:t.trim()}function et(t){return bt(t).replace(/\D/g,"")}function u(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function _(t){return`${t.length} × ${t.width} × ${t.height} мм`}function gt(t){const e=t%100,a=t%10;return e>=11&&e<=14?`${t} позицій`:a===1?`${t} позиція`:a>=2&&a<=4?`${t} позиції`:`${t} позицій`}function st(t,e){return e?.partner?"Фіксована ціна клієнта":t>=x?"Оптова ціна":"Роздрібна ціна"}function V(t,e=!1){const{length:a,width:n,height:s}=t.dimensions,i=170+Math.min(100,a/3),o=58+Math.min(54,s/2.5),r=50+Math.min(44,n/4),c=72,l=e?70:82,h=l-r*.55,g=c+i,w=g+r,m=l+o;return`
    <svg class="box-visual${e?" box-visual--compact":""}" viewBox="0 0 470 270" role="img"
      aria-label="Схема коробки ${u(t.number)}, ${_(t.dimensions)}">
      <g class="box-visual__shape">
        <polygon class="box-visual__top" points="${c},${l} ${c+r},${h} ${w},${h} ${g},${l}" />
        <polygon class="box-visual__side" points="${g},${l} ${w},${h} ${w},${h+o} ${g},${m}" />
        <rect class="box-visual__front" x="${c}" y="${l}" width="${i}" height="${o}" />
        <rect class="box-visual__mark" x="${c+i*.35}" y="${l+o*.32}"
          width="${i*.3}" height="${Math.max(24,o*.34)}" rx="5" />
        <text class="box-visual__number" x="${c+i/2}" y="${l+o*.56}">№${t.number}</text>
      </g>
      <g class="dimension-line dimension-line--length">
        <line x1="${c}" y1="${m+28}" x2="${g}" y2="${m+28}" />
        <line x1="${c}" y1="${m+20}" x2="${c}" y2="${m+36}" />
        <line x1="${g}" y1="${m+20}" x2="${g}" y2="${m+36}" />
        <rect x="${c+i/2-38}" y="${m+12}" width="76" height="32" rx="16" />
        <text x="${c+i/2}" y="${m+33}">${a} мм</text>
      </g>
      <g class="dimension-line dimension-line--height">
        <line x1="${c-26}" y1="${l}" x2="${c-26}" y2="${m}" />
        <line x1="${c-34}" y1="${l}" x2="${c-18}" y2="${l}" />
        <line x1="${c-34}" y1="${m}" x2="${c-18}" y2="${m}" />
        <rect x="2" y="${l+o/2-16}" width="66" height="32" rx="16" />
        <text x="35" y="${l+o/2+5}">${s} мм</text>
      </g>
      <g class="dimension-line dimension-line--width">
        <line x1="${g+8}" y1="${l-8}" x2="${w+8}" y2="${h-8}" />
        <rect x="${w-54}" y="${Math.max(4,h-48)}" width="76" height="32" rx="16" />
        <text x="${w-16}" y="${Math.max(25,h-27)}">${n} мм</text>
      </g>
    </svg>
  `}function dt(){return y().map(t=>`<option value="${t.id}"${t.id===T?" selected":""}>№${t.number} · ${_(t.dimensions)}</option>`).join("")}function Qt(){const t=nt();return`
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
            <div><dt id="hero-product-count">${y().length}</dt><dd>готових розмірів</dd></div>
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
            <select class="select" id="hero-product-select">${dt()}</select>
          </label>
          <label class="field">
            <span>Кількість</span>
            <input class="input" id="hero-quantity-input" type="number" min="1" max="${B}" value="${p}" />
          </label>
          <div class="hero-calculator__result">
            <span id="hero-price-label">Роздрібна ціна</span>
            <strong id="hero-total">${d($(t,p)*p)}</strong>
            <small id="hero-unit">${d($(t,p))} / шт.</small>
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
            <p class="eyebrow" id="catalog-ready-label"><span></span> ${y().length} готових розмірів</p>
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
              <select class="select select--large" id="calculator-product-select">${dt()}</select>
            </label>
            <div class="calculator-preview" id="calculator-preview">${V(t,!0)}</div>
            <div class="quantity-block">
              <div class="quantity-block__label">
                <label for="quantity-input">Кількість</label>
                <output id="quantity-output">${p.toLocaleString("uk-UA")} шт.</output>
              </div>
              <div class="quantity-control">
                <button type="button" data-quantity-step="-100" aria-label="Зменшити кількість на 100">−</button>
                <input id="quantity-input" type="number" min="1" max="${B}" value="${p}" />
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
                <strong id="calculator-unit-price">${d($(t,p))}<small>/ шт.</small></strong>
              </div>
              <div class="calculation-result__total">
                <span>Весь тираж</span>
                <strong id="calculator-total">${d($(t,p)*p)}</strong>
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
          ${Ht.map((e,a)=>`
                <details${a===0?" open":""}>
                  <summary><span>${u(e.question)}</span><i aria-hidden="true"></i></summary>
                  <p>${u(e.answer)}</p>
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
  `}Tt.innerHTML=Qt();const X=document.querySelector("#product-grid"),rt=document.querySelector("#catalog-count");function Rt(t){const e=E(),a=$(t,1),n=$(t,x),s=e?.partner?U(t,1,e):null;return`
    <article
      class="product-card${t.id===T?" is-selected":""}"
      data-open-product="${t.id}"
      tabindex="0"
      role="button"
      aria-label="Відкрити коробку №${t.number}, ${_(t.dimensions)}"
    >
      <div class="product-card__head">
        <span class="product-card__number">№${t.number}</span>
        <span class="product-card__size-label">внутрішній розмір</span>
      </div>
      <div class="product-card__visual">${V(t,!0)}</div>
      <h3>${_(t.dimensions)}</h3>
      <div class="product-card__prices">
        ${s!==null?`<div class="partner-price"><span>Ваша фіксована</span><strong>${d(s)}<small>/шт.</small></strong></div>`:`
              <div><span>1–999 шт.</span><strong>${d(a)}</strong></div>
              <div><span>від 1000 шт.</span><strong>${d(n)}</strong></div>
            `}
      </div>
      <button class="button button--card" type="button" data-open-product="${t.id}">
        Детальніше
      </button>
    </article>
  `}function Vt(t){const e=E(),a=U(t,p,e),n=a*p;return`
    <div class="product-modal">
      <div class="product-modal__visual">
        <div class="product-modal__labels">
          <span>№${t.number}</span>
        </div>
        <div class="product-modal__drawing">${V(t,!0)}</div>
        <p>Внутрішній розмір · Д × Ш × В</p>
      </div>
      <div class="product-modal__content">
        <p class="eyebrow"><span></span> Внутрішній розмір</p>
        <h2 id="product-dialog-title">${_(t.dimensions)}</h2>

        <div class="product-modal__rules">
          <div><span>1–999 шт.</span><strong>${d($(t,1))} / шт.</strong></div>
          <div><span>від 1 000 шт.</span><strong>${d($(t,x))} / шт.</strong></div>
        </div>

        <div class="quantity-block quantity-block--modal">
          <div class="quantity-block__label">
            <label for="modal-quantity-input">Кількість</label>
            <output id="modal-quantity-output">${p.toLocaleString("uk-UA")} шт.</output>
          </div>
          <div class="quantity-control">
            <button type="button" data-quantity-step="-100" aria-label="Зменшити кількість на 100">−</button>
            <input id="modal-quantity-input" type="number" min="1" max="${B}" value="${p}" />
            <button type="button" data-quantity-step="100" aria-label="Збільшити кількість на 100">+</button>
          </div>
          <div class="quantity-presets quantity-presets--modal" aria-label="Швидкий вибір кількості">
            ${[100,500,1e3,5e3,1e4,5e4].map(s=>`<button type="button" data-quantity="${s}">${s.toLocaleString("uk-UA")}</button>`).join("")}
          </div>
        </div>

        <div class="product-modal__total" aria-live="polite">
          <div><span id="modal-price-tier">${st(p,e)}</span><strong id="modal-unit-price">${d(a)} / шт.</strong></div>
          <div><span>Весь тираж</span><strong id="modal-total">${d(n)}</strong></div>
        </div>

        <div class="product-modal__actions">
          <button class="button button--primary" type="button" data-product-to-cart>Додати до кошика</button>
          <button class="button button--ghost" type="button" data-product-to-calculator>Відкрити калькулятор</button>
        </div>
      </div>
    </div>
  `}function Pt(){const t=document.querySelector("#product-dialog");if(!t?.open||!M)return;const e=y().find(l=>l.id===M);if(!e)return;const a=E(),n=U(e,p,a),s=t.querySelector("#modal-quantity-input");s&&(s.value=String(p));const i=t.querySelector("#modal-quantity-output");i&&(i.value=`${p.toLocaleString("uk-UA")} шт.`);const o=t.querySelector("#modal-price-tier");o&&(o.textContent=st(p,a));const r=t.querySelector("#modal-unit-price");r&&(r.textContent=`${d(n)} / шт.`);const c=t.querySelector("#modal-total");c&&(c.textContent=d(n*p)),t.querySelectorAll("[data-quantity]").forEach(l=>{l.classList.toggle("is-active",Number(l.dataset.quantity)===p)})}function Ct(t){const e=y().find(s=>s.id===t),a=document.querySelector("#product-dialog"),n=document.querySelector("#product-dialog-content");!e||!a||!n||(M=e.id,vt(e.id),n.innerHTML=Vt(e),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),Pt())}function Bt(){const t=y(),e=pt.trim().toLocaleLowerCase("uk-UA");return t.filter(n=>{const s=`${n.number} ${n.name} ${_(n.dimensions)}`.toLocaleLowerCase("uk-UA"),i=!e||s.includes(e),o=!F||Ft(F,n.dimensions);return i&&o}).sort((n,s)=>lt==="price"?n.basePrice-s.basePrice:lt==="number"?n.number.localeCompare(s.number,"uk-UA",{numeric:!0}):wt(n)-wt(s))}function A(t=!1){if(!X||!rt)return;if(t){rt.textContent="Оновлюємо список…",X.innerHTML=Array.from({length:6},()=>'<div class="product-skeleton" aria-hidden="true"><i></i><i></i><i></i></div>').join("");return}const e=Bt(),a=F?` · предмет ${_(F)}`:"";if(rt.textContent=`${e.length} із ${y().length} розмірів${a}`,!e.length){X.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__box" aria-hidden="true"></div>
        <h3>Готового розміру немає.</h3>
        <p>Змініть габарити предмета або залиште заявку з потрібним розміром.</p>
        <a class="button button--primary" href="#request">Описати свій розмір</a>
      </div>
    `;return}X.innerHTML=e.map(Rt).join("")}function it(){window.clearTimeout(qt),A(!0),qt=window.setTimeout(()=>A(!1),320)}function I(){const t=nt(),e=E(),a=U(t,p,e),n=a*p,s=st(p,e);document.querySelectorAll("#calculator-product-select, #hero-product-select").forEach(f=>{f.value=t.id}),document.querySelectorAll("#quantity-input, #hero-quantity-input, #modal-quantity-input").forEach(f=>{f.value=String(p)});const i=document.querySelector("#quantity-output");i&&(i.value=`${p.toLocaleString("uk-UA")} шт.`);const o=document.querySelector("#calculator-preview");o&&(o.classList.remove("is-changing"),o.offsetWidth,o.classList.add("is-changing"),o.innerHTML=V(t,!0));const r=document.querySelector("#calculator-tier");r&&(r.textContent=s);const c=document.querySelector("#calculator-unit-price");c&&(c.innerHTML=`${d(a)}<small>/ шт.</small>`);const l=document.querySelector("#calculator-total");l&&(l.textContent=d(n));const h=document.querySelector("#hero-price-label");h&&(h.textContent=s);const g=document.querySelector("#hero-total");g&&(g.textContent=d(n));const w=document.querySelector("#hero-unit");w&&(w.textContent=`${d(a)} / шт.`);const m=document.querySelector("#account-price-badge");m&&(m.textContent=e?.partner?"Персональна ціна активна":"Публічна ціна",m.classList.toggle("is-partner",!!e?.partner));const v=document.querySelector("#threshold-note");if(v)if(e?.partner)v.innerHTML=`<strong>Фіксована ціна:</strong> ${d(a)} за одиницю незалежно від тиражу.`;else if(p<x){const f=x-p,Ut=$(t,x)*x;v.innerHTML=`Ще <strong>${f.toLocaleString("uk-UA")} шт.</strong> до оптового тарифу. 1000 шт. коштуватимуть ${d(Ut)}.`}else v.innerHTML=`<strong>Оптовий тариф активний.</strong> Економія проти роздрібної ціни — ${d(p)} на всьому тиражі.`;document.querySelectorAll("[data-quantity]").forEach(f=>{f.classList.toggle("is-active",Number(f.dataset.quantity)===p)}),D(),Pt()}function vt(t,e=!1){y().some(a=>a.id===t)&&(T=t,A(!1),I(),e&&document.querySelector("#calculator")?.scrollIntoView({behavior:"smooth",block:"start"}))}function K(t){p=tt(t),I()}function St(t,e){if(!y().some(i=>i.id===t))return;const a=R(),n=a.find(i=>i.productId===t);n?n.quantity=tt(e):a.push({productId:t,quantity:tt(e)}),q(b.cart,a),D();const s=document.querySelector("#cart-button");s?.classList.remove("is-updated"),s?.offsetWidth,s?.classList.add("is-updated")}function zt(t,e){const a=R(),n=a.find(s=>s.productId===t);n&&(n.quantity=tt(e),q(b.cart,a),D())}function Kt(t){q(b.cart,R().filter(e=>e.productId!==t)),D()}function D(){const t=document.querySelector("#request-summary"),e=document.querySelector("#cart-count"),a=document.querySelector('#request-form button[type="submit"]'),n=R(),s=E();if(e&&(e.textContent=String(n.length)),a&&(a.disabled=n.length===0),!t)return;if(!n.length){t.innerHTML=`
      <div class="cart-empty">
        <span aria-hidden="true">□</span>
        <strong>Кошик порожній</strong>
        <p>Оберіть розмір і додайте потрібну кількість коробок.</p>
        <a class="button button--ghost button--small" href="#catalog">Обрати коробки</a>
      </div>
    `;return}let i=0;const o=n.map(r=>{const c=y().find(g=>g.id===r.productId);if(!c)return"";const l=U(c,r.quantity,s),h=l*r.quantity;return i+=h,`
        <article class="cart-item">
          <div class="cart-item__index">№${c.number}</div>
          <div class="cart-item__info">
            <strong>${_(c.dimensions)}</strong>
            <span>${d(l)} / шт.</span>
          </div>
          <label class="cart-item__quantity">
            <span>Кількість</span>
            <input class="input" type="number" min="1" max="${B}" value="${r.quantity}" data-cart-quantity="${c.id}" />
          </label>
          <div class="cart-item__total">
            <span>Сума</span>
            <strong>${d(h)}</strong>
          </div>
          <button class="cart-item__remove" type="button" data-remove-cart="${c.id}" aria-label="Прибрати коробку №${c.number} з кошика">×</button>
        </article>
      `}).join("");t.innerHTML=`
    <div class="cart-list">${o}</div>
    <div class="cart-summary__total">
      <span>${gt(n.length)}</span>
      <div><small>Загальна вартість</small><strong>${d(i)}</strong></div>
    </div>
    <a class="cart-continue" href="#catalog">+ Додати ще один розмір</a>
  `}function W(){const t=document.querySelector("#account-button"),e=E();if(!t)return;t.textContent=e?e.name.split(" ")[0]:"Кабінет",t.classList.toggle("is-signed-in",!!e);const a=document.querySelector("#request-account-hint");a&&(a.textContent=e?e.name:"Гість");const n=document.querySelector("#request-form");if(n&&e){const s=(i,o)=>{const r=n.elements.namedItem(i);r instanceof HTMLInputElement&&!r.value&&(r.value=o)};s("name",e.name),s("phone",e.phone),s("company",e.company)}D()}function Wt(){const t=E();if(t){const e=Q().filter(r=>r.accountId===t.id).slice().reverse(),a=e.filter(r=>r.status!=="Закрита").length,n=e.reduce((r,c)=>r+c.total,0),s=t.name.split(/\s+/).filter(Boolean).slice(0,2).map(r=>r[0]).join("").toLocaleUpperCase("uk-UA"),i=nt(),o=U(i,p,t);return`
      <div class="account-dashboard">
        <section class="account-dashboard__hero">
          <div class="account-identity">
            <span class="account-avatar">${u(s||"TP")}</span>
            <div>
              <p class="eyebrow eyebrow--light"><span></span> Особистий кабінет</p>
              <h1 id="account-page-title">${u(t.name)}</h1>
              <p>${u(t.phone)}${t.company?` · ${u(t.company)}`:""}</p>
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
          <article><span>Сума заявок</span><strong>${d(n)}</strong><small>загальна вартість</small></article>
        </div>

        <div class="account-dashboard__grid">
          <section class="account-orders-panel">
            <div class="account-panel-heading">
              <div><p class="eyebrow"><span></span> Історія</p><h2>Мої заявки</h2></div>
              <a class="text-link" href="#request">Нова заявка <span>→</span></a>
            </div>
            <div class="account-order-list">
              ${e.length?e.map(r=>{const c=r.items.reduce((l,h)=>l+h.quantity,0);return`
                          <article class="account-order">
                            <div class="account-order__main">
                              <strong>${gt(r.items.length)}</strong>
                              <small>${c.toLocaleString("uk-UA")} шт. загалом</small>
                            </div>
                            <div class="account-order__price"><strong>${d(r.total)}</strong><small>загальна сума</small></div>
                            <div class="account-order__meta"><span>${u(r.status)}</span><time datetime="${r.createdAt}">${new Date(r.createdAt).toLocaleDateString("uk-UA")}</time></div>
                          </article>
                        `}).join(""):'<div class="account-empty"><strong>Заявок ще немає.</strong><p>Оберіть розмір, порахуйте тираж і збережіть першу заявку.</p><a class="button button--primary" href="#catalog">До каталогу</a></div>'}
            </div>
          </section>

          <aside class="account-sidebar">
            <article class="account-quick-order">
              <p class="technical-label">Швидкий розрахунок</p>
              <div class="account-quick-order__box">${V(i,!1)}</div>
              <span>Коробка №${i.number}</span>
              <h3>${_(i.dimensions)}</h3>
              <div><span>${p.toLocaleString("uk-UA")} шт.</span><strong>${d(o*p)}</strong></div>
              <button class="button button--gold button--wide" type="button" data-add-selected-to-cart>Додати до кошика</button>
            </article>
            <article class="account-profile-card">
              <div><p class="technical-label">Профіль</p><a href="#account">Дані клієнта</a></div>
              <dl>
                <div><dt>Телефон</dt><dd>${u(t.phone)}</dd></div>
                <div><dt>Компанія</dt><dd>${u(t.company||"Не вказано")}</dd></div>
                <div><dt>Статус</dt><dd>${t.partner?"Постійний клієнт":"Новий клієнт"}</dd></div>
              </dl>
              ${t.role==="admin"?'<a class="button button--ghost button--wide" href="#admin">Відкрити адмінку</a>':""}
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
  `}function J(){const t=document.querySelector("#account-page-content");t&&(t.innerHTML=Wt())}function Et(t,e,a){const n=t.querySelector("[data-auth-status]");n&&(n.textContent=e,n.className=`form-status is-${a}`)}function Jt(t,e){const a=et(t),n=N().find(s=>et(s.phone)===a&&s.password===e);return n?(localStorage.setItem(b.session,n.id),n):null}function _t(t,e=!1){if(t.classList.add("was-validated"),!t.reportValidity())return;const a=new FormData(t),n=Jt(String(a.get("phone")??""),String(a.get("password")??""));if(!n||e&&n.role!=="admin"){Et(t,e?"Потрібен акаунт менеджера.":"Невірний телефон або пароль.","error");return}W(),I(),A(!1),e?S():(J(),window.location.hash="account")}function Xt(t){if(t.classList.add("was-validated"),!t.reportValidity())return;const e=new FormData(t),a=bt(String(e.get("phone")??"")),n=N();if(n.some(i=>et(i.phone)===et(a))){Et(t,"Акаунт із таким номером уже існує.","error");return}const s={id:`account-${Date.now().toString(36)}`,name:String(e.get("name")??"").trim(),phone:a,company:String(e.get("company")??"").trim(),password:String(e.get("password")??""),role:"client",partner:!1,fixedMarkup:ct,createdAt:new Date().toISOString()};n.push(s),q(b.accounts,n),localStorage.setItem(b.session,s.id),W(),I(),A(!1),J(),window.location.hash="account"}function Gt(t){const e=document.querySelector("#request-status"),a=R();if(!a.length){e&&(e.className="form-status is-error",e.textContent="Додайте хоча б одну коробку до кошика.");return}if(t.classList.add("was-validated"),!t.reportValidity()){e&&(e.className="form-status is-error",e.textContent="Перевірте обов’язкові поля та згоду.");return}const n=new FormData(t),s=E(),i=a.flatMap(l=>{const h=y().find(w=>w.id===l.productId);if(!h)return[];const g=U(h,l.quantity,s);return[{productId:h.id,productNumber:h.number,dimensions:h.dimensions,quantity:l.quantity,unitPrice:g,total:g*l.quantity,priceType:st(l.quantity,s)}]}),o=i.reduce((l,h)=>l+h.total,0),r={id:`TP-${Date.now().toString(36).toUpperCase()}`,createdAt:new Date().toISOString(),customerName:String(n.get("name")??"").trim(),phone:bt(String(n.get("phone")??"")),company:String(n.get("company")??"").trim(),comment:String(n.get("comment")??"").trim(),items:i,total:o,accountId:s?.id,status:"Нова"},c=Q();c.push(r),q(b.orders,c),q(b.cart,[]),D(),J(),e&&(e.className="form-status is-success",e.innerHTML=`<strong>Заявку створено.</strong><span>${gt(r.items.length)} на суму ${d(r.total)}.</span>`),t.querySelector('button[type="submit"]')?.focus()}function Yt(t){return["Нова","У роботі","Уточнення","Підтверджена","Закрита"].map(a=>`<option value="${a}"${a===t?" selected":""}>${a}</option>`).join("")}function Zt(){return window.location.hash==="#admin-orders"?"orders":window.location.hash==="#admin-clients"?"clients":window.location.hash==="#admin-products"?"products":"overview"}function te(t,e,a,n){return[{view:"overview",href:"#admin",label:"Огляд"},{view:"orders",href:"#admin-orders",label:"Замовлення",count:e},{view:"clients",href:"#admin-clients",label:"Клієнти",count:a},{view:"products",href:"#admin-products",label:"Товари",count:n}].map((i,o)=>`
        <a class="admin-nav__link${t===i.view?" is-active":""}" href="${i.href}"${t===i.view?' aria-current="page"':""}>
          <span>${String(o+1).padStart(2,"0")}</span>
          <strong>${i.label}</strong>
          ${i.count===void 0?"":`<b>${i.count}</b>`}
        </a>
      `).join("")}function ee(t,e,a){const n=Q(),s=N().filter(r=>r.role==="client"),i=P().length,o=k?`<div class="admin-notice" role="status"><span>Готово</span><p>${u(k)}</p></div>`:"";return k="",`
    <div class="admin-workspace">
      <aside class="admin-sidebar-nav">
        <div class="admin-sidebar-nav__head">
          <span class="technical-label">ToffiPacks / Control</span>
          <h2>Управління</h2>
          <p>Замовлення, клієнти й каталог в одному кабінеті.</p>
        </div>
        <nav class="admin-nav" aria-label="Розділи адмінки">
          ${te(e,n.length,s.length,i)}
        </nav>
        <div class="admin-sidebar-nav__footer">
          <span>Ви увійшли як</span>
          <strong>${u(t.name)}</strong>
          <small>${u(t.phone)}</small>
          <button class="text-link" id="admin-logout" type="button">Вийти</button>
        </div>
      </aside>
      <main class="admin-main">
        ${o}
        ${a}
      </main>
    </div>
  `}function Mt(t){const e=`${t.id} ${t.customerName} ${t.phone} ${t.company}`.toLocaleLowerCase("uk-UA");return`
    <article class="order-card" data-admin-order data-status="${u(t.status)}" data-search="${u(e)}">
      <div class="order-card__top">
        <div><span>${u(t.id)}</span><strong>${u(t.customerName)}</strong></div>
        <select class="select status-select" data-order-status="${u(t.id)}">${Yt(t.status)}</select>
      </div>
      <div class="order-card__grid">
        <div><span>Контакт</span><a href="tel:${u(t.phone)}">${u(t.phone)}</a><small>Телефон клієнта</small></div>
        <div><span>Позицій</span><strong>${t.items.length}</strong><small>${t.items.reduce((a,n)=>a+n.quantity,0).toLocaleString("uk-UA")} шт. загалом</small></div>
        <div><span>Сума</span><strong>${d(t.total)}</strong><small>кінцева вартість</small></div>
      </div>
      <div class="order-card__items">
        ${t.items.map(a=>`
              <div>
                <span>№${u(a.productNumber)}</span>
                <strong>${_(a.dimensions)}</strong>
                <small>${a.quantity.toLocaleString("uk-UA")} шт. · ${d(a.unitPrice)} / шт.</small>
                <b>${d(a.total)}</b>
              </div>
            `).join("")}
      </div>
      ${t.company||t.comment?`<p class="order-card__comment">${u(t.company)}${t.company&&t.comment?" · ":""}${u(t.comment)}</p>`:""}
      <time datetime="${t.createdAt}">${new Date(t.createdAt).toLocaleString("uk-UA")}</time>
    </article>
  `}function ae(t,e){const a=t.filter(o=>o.status!=="Закрита").length,n=t.reduce((o,r)=>o+r.total,0),s=y().length,i=t.slice(0,3);return`
    <div class="admin-page-heading admin-page-heading--overview">
      <div><p class="eyebrow"><span></span> Панель керування</p><h1 id="admin-title">Все важливе<br />на одному екрані.</h1></div>
      <p>Швидкий стан каталогу, заявок і клієнтів. Детальна робота винесена в окремі розділи.</p>
    </div>
    <div class="admin-stats admin-stats--large">
      <article><span>Усі заявки</span><strong>${t.length}</strong><small>${a} потребують уваги</small></article>
      <article><span>Оборот заявок</span><strong>${d(n)}</strong><small>сума збережених розрахунків</small></article>
      <article><span>Клієнти</span><strong>${e.length}</strong><small>${e.filter(o=>o.partner).length} постійних</small></article>
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
        ${i.length?i.map(Mt).join(""):'<div class="admin-empty"><h3>Заявок ще немає.</h3><p>Нові замовлення з сайту з’являться тут.</p></div>'}
      </div>
    </section>
  `}function ne(t){const e=["Усі","Нова","У роботі","Уточнення","Підтверджена","Закрита"];return`
    <div class="admin-page-heading">
      <div><p class="eyebrow"><span></span> Замовлення</p><h1 id="admin-title">Заявки без хаосу.</h1></div>
      <p>Пошук за клієнтом або номером, швидка зміна статусу та повний склад кожного замовлення.</p>
    </div>
    <div class="admin-toolbar">
      <label class="admin-search"><span class="sr-only">Пошук заявок</span><input id="admin-order-search" type="search" value="${u(ht)}" placeholder="Номер, ім’я або телефон" /></label>
      <div class="admin-filter-chips" aria-label="Фільтр за статусом">
        ${e.map(a=>`<button class="${Z===a?"is-active":""}" type="button" data-admin-order-filter="${a}">${a}</button>`).join("")}
      </div>
      <button class="button button--ghost button--small" type="button" data-export-orders>Експорт JSON</button>
    </div>
    <div class="admin-results-meta"><strong id="admin-order-count">${t.length}</strong><span>заявок показано</span></div>
    <div class="orders-list" id="admin-orders-list">
      ${t.length?t.map(Mt).join(""):'<div class="admin-empty"><h3>Заявок ще немає.</h3><p>Нові замовлення з сайту з’являться тут.</p></div>'}
    </div>
  `}function se(t){return`
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
                <div class="client-row" data-admin-client data-search="${u(`${e.name} ${e.company} ${e.phone}`.toLocaleLowerCase("uk-UA"))}">
                  <div><strong>${u(e.name)}</strong><span>${u(e.company||"Без компанії")}</span><a href="tel:${u(e.phone)}">${u(e.phone)}</a></div>
                  <label class="partner-toggle"><input type="checkbox" data-partner-toggle="${e.id}"${e.partner?" checked":""} /><span>${e.partner?"Постійний":"Звичайний"}</span></label>
                  <label class="client-price-field"><span>Персональна ставка</span><input class="input" type="number" min="0" max="0.99" step="0.01" value="${e.fixedMarkup}" data-partner-markup="${e.id}"${e.partner?"":" disabled"} /><small>грн / шт.</small></label>
                </div>
              `).join(""):'<div class="admin-empty"><h3>Клієнтів ще немає.</h3></div>'}
    </div>
  `}function ft(){const t=mt.trim().toLocaleLowerCase("uk-UA");return P().filter(e=>{const a=!t||`${e.number} ${e.name} ${_(e.dimensions)}`.toLocaleLowerCase("uk-UA").includes(t),n=O==="all"||(O==="active"?e.active:!e.active);return a&&n})}function It(){const t=ft();return t.length?t.map(e=>`
        <article class="admin-product-card${e.active?"":" is-hidden"}" data-admin-product="${e.id}">
          <div class="admin-product-card__visual">${V(e,!1)}</div>
          <div class="admin-product-card__content">
            <div class="admin-product-card__top"><span>№${u(e.number)}</span><b>${e.active?"На сайті":"Приховано"}</b></div>
            <h3>${_(e.dimensions)}</h3>
            <p>${u(e.name)}</p>
            <dl>
              <div><dt>1–999 шт.</dt><dd>${d($(e,1))}</dd></div>
              <div><dt>від 1000 шт.</dt><dd>${d($(e,x))}</dd></div>
            </dl>
            <div class="admin-product-card__actions">
              <button class="button button--primary button--small" type="button" data-edit-product="${e.id}">Редагувати</button>
              <button class="button button--ghost button--small" type="button" data-toggle-product="${e.id}">${e.active?"Приховати":"Показати"}</button>
              <button class="admin-danger-link" type="button" data-delete-product="${e.id}">Видалити</button>
            </div>
          </div>
        </article>
      `).join(""):'<div class="admin-empty"><h3>Нічого не знайдено.</h3><p>Змініть пошук або фільтр видимості.</p></div>'}function ie(){return`
    <div class="admin-page-heading admin-page-heading--products">
      <div><p class="eyebrow"><span></span> Товари</p><h1 id="admin-title">Каталог під контролем.</h1></div>
      <div class="admin-page-heading__action"><p>Окрема сторінка для розмірів, цін і видимості коробок.</p><button class="button button--primary" type="button" data-create-product>Додати коробку</button></div>
    </div>
    <div class="admin-toolbar admin-toolbar--products">
      <label class="admin-search"><span class="sr-only">Пошук товарів</span><input id="admin-product-search" type="search" value="${u(mt)}" placeholder="Номер або розмір" /></label>
      <div class="admin-filter-chips" aria-label="Фільтр товарів">
        <button class="${O==="all"?"is-active":""}" type="button" data-product-filter="all">Усі</button>
        <button class="${O==="active"?"is-active":""}" type="button" data-product-filter="active">На сайті</button>
        <button class="${O==="hidden"?"is-active":""}" type="button" data-product-filter="hidden">Приховані</button>
      </div>
      <button class="button button--ghost button--small" type="button" data-export-products>Експорт</button>
      <button class="admin-danger-link" type="button" data-reset-products>Відновити початкові</button>
    </div>
    <div class="admin-results-meta"><strong id="admin-product-count">${ft().length}</strong><span>товарів показано</span></div>
    <div class="admin-products-grid" id="admin-product-list">${It()}</div>
  `}function S(){const t=document.querySelector("#admin-content");if(!t)return;const e=E();if(!e||e.role!=="admin"){t.innerHTML=`
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
    `;return}const a=Q().slice().reverse(),n=N().filter(o=>o.role==="client"),s=Zt();let i=ae(a,n);s==="orders"&&(i=ne(a)),s==="clients"&&(i=se(n)),s==="products"&&(i=ie()),t.innerHTML=ee(e,s,i),s==="orders"&&yt()}function yt(){const t=ht.trim().toLocaleLowerCase("uk-UA");let e=0;document.querySelectorAll("[data-admin-order]").forEach(n=>{const s=!t||(n.dataset.search??"").includes(t),i=Z==="Усі"||n.dataset.status===Z;n.hidden=!(s&&i),n.hidden||(e+=1)});const a=document.querySelector("#admin-order-count");a&&(a.textContent=String(e))}function oe(t){const e=t.trim().toLocaleLowerCase("uk-UA");document.querySelectorAll("[data-admin-client]").forEach(a=>{a.hidden=!!e&&!(a.dataset.search??"").includes(e)})}function re(){const t=document.querySelector("#admin-product-list");t&&(t.innerHTML=It());const e=document.querySelector("#admin-product-count");e&&(e.textContent=String(ft().length))}function Y(){const t=y();if(!t.length)return;t.some(s=>s.id===T)||(T=t[0].id);const e=dt();document.querySelectorAll("#calculator-product-select, #hero-product-select").forEach(s=>{s.innerHTML=e,s.value=T});const a=document.querySelector("#hero-product-count");a&&(a.textContent=String(t.length));const n=document.querySelector("#catalog-ready-label");n&&(n.innerHTML=`<span></span> ${t.length} готових розмірів`),A(!1),I(),D()}function ce(t){const e=!!t,a=t??{id:"",number:"",name:"",dimensions:{length:180,width:120,height:50},basePrice:5,active:!0};return`
    <div class="admin-product-editor">
      <p class="eyebrow"><span></span> ${e?"Редагування товару":"Новий товар"}</p>
      <h2 id="admin-product-dialog-title">${e?`Коробка №${u(a.number)}`:"Додати коробку"}</h2>
      <p>Після збереження товар одразу оновиться в каталозі та калькуляторі.</p>
      <form id="admin-product-form" novalidate>
        <input type="hidden" name="productId" value="${u(a.id)}" />
        <div class="admin-editor-grid admin-editor-grid--identity">
          <label class="field"><span>Номер *</span><input class="input" name="number" value="${u(a.number)}" maxlength="20" required /></label>
          <label class="field"><span>Назва</span><input class="input" name="name" value="${u(a.name)}" placeholder="Самозбірна коробка" /></label>
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
          <div class="admin-editor-price-preview"><span>На сайті зараз</span><strong>${d($(a,1))}</strong><small>опт: ${d($(a,x))}</small></div>
        </div>
        <label class="checkbox admin-editor-active"><input name="active" type="checkbox"${a.active?" checked":""} /><span>Показувати товар у каталозі</span></label>
        <div class="form-status" data-product-form-status aria-live="polite"></div>
        <div class="admin-editor-actions">
          <button class="button button--ghost" type="button" data-close-admin-product>Скасувати</button>
          <button class="button button--primary" type="submit">${e?"Зберегти зміни":"Створити товар"}</button>
        </div>
      </form>
    </div>
  `}function xt(t){const e=document.querySelector("#admin-product-dialog"),a=document.querySelector("#admin-product-editor");if(!e||!a)return;const n=t?P().find(s=>s.id===t):void 0;a.innerHTML=ce(n),typeof e.showModal=="function"?e.showModal():e.setAttribute("open",""),a.querySelector('input[name="number"]')?.focus()}function le(t){t.classList.add("was-validated");const e=t.querySelector("[data-product-form-status]");if(!t.reportValidity()){e&&(e.className="form-status is-error",e.textContent="Перевірте обов’язкові поля.");return}const a=new FormData(t),n=String(a.get("productId")??""),s=String(a.get("number")??"").trim(),i=P(),o=i.find(g=>g.id===n);if(i.some(g=>g.number.toLocaleLowerCase("uk-UA")===s.toLocaleLowerCase("uk-UA")&&g.id!==n)){e&&(e.className="form-status is-error",e.textContent="Товар із таким номером уже існує.");return}const r=a.get("active")==="on";if(o?.active&&!r&&y().length<=1){e&&(e.className="form-status is-error",e.textContent="У каталозі має залишитися хоча б один активний товар.");return}const c=o?.id??`box-${s.toLocaleLowerCase("uk-UA").replace(/[^a-zа-яіїєґ0-9]+/giu,"-")}-${Date.now().toString(36)}`,l={...o,id:c,number:s,name:String(a.get("name")??"").trim()||`Самозбірна коробка №${s}`,dimensions:{length:Number(a.get("length")),width:Number(a.get("width")),height:Number(a.get("height"))},basePrice:Number(a.get("basePrice")),active:r,updatedAt:new Date().toISOString()},h=o?i.map(g=>g.id===o.id?l:g):[...i,l];G(h),Y(),document.querySelector("#admin-product-dialog")?.close(),k=o?`Товар №${s} оновлено.`:`Товар №${s} додано до каталогу.`,S()}function Lt(t,e){const a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),n=URL.createObjectURL(a),s=document.createElement("a");s.href=n,s.download=t,s.click(),window.setTimeout(()=>URL.revokeObjectURL(n),0)}function $t(){const t=document.querySelector("#admin-page"),e=document.querySelector("#account-page"),a=document.querySelector("#main"),n=document.querySelector(".site-header"),s=document.querySelector(".site-footer"),i=document.querySelector(".demo-strip"),o=["#admin","#admin-orders","#admin-clients","#admin-products"].includes(window.location.hash),r=window.location.hash==="#account";t&&(t.hidden=!o),e&&(e.hidden=!r),a&&(a.hidden=o||r),n&&(n.hidden=o||r),s&&(s.hidden=o||r),i&&(i.hidden=o||r),document.body.classList.toggle("is-admin",o),document.body.classList.toggle("is-account",r),o?(S(),window.scrollTo({top:0})):r&&(J(),window.scrollTo({top:0}))}function de(){const t=document.querySelectorAll(".reveal");if(!("IntersectionObserver"in window)){t.forEach(a=>a.classList.add("is-visible"));return}const e=new IntersectionObserver(a=>{a.forEach(n=>{n.isIntersecting&&(n.target.classList.add("is-visible"),e.unobserve(n.target))})},{threshold:.12});t.forEach(a=>e.observe(a))}document.querySelector("#menu-button")?.addEventListener("click",t=>{const e=t.currentTarget,a=document.querySelector("#site-nav"),n=e.getAttribute("aria-expanded")!=="true";e.setAttribute("aria-expanded",String(n)),a?.classList.toggle("is-open",n)});document.querySelectorAll(".site-nav a").forEach(t=>{t.addEventListener("click",()=>{document.querySelector("#site-nav")?.classList.remove("is-open"),document.querySelector("#menu-button")?.setAttribute("aria-expanded","false")})});document.querySelector('.site-header .brand[href="#top"]')?.addEventListener("click",t=>{t.preventDefault(),window.location.hash!=="#top"&&(window.history.pushState(null,"","#top"),$t()),window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})});document.querySelector("#fit-form")?.addEventListener("submit",t=>{t.preventDefault();const e=t.currentTarget;e.classList.add("was-validated");const a=document.querySelector("#fit-message");if(!e.reportValidity()){a&&(a.textContent="Вкажіть три додатні розміри.",a.className="form-message is-error");return}const n=new FormData(e);F={length:Number(n.get("length")),width:Number(n.get("width")),height:Number(n.get("height"))},a&&(a.textContent="Розміри застосовано. Показуємо коробки нижче.",a.className="form-message is-success"),it(),window.setTimeout(()=>document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth"}),180)});document.querySelector("#catalog-search")?.addEventListener("input",t=>{pt=t.currentTarget.value,it()});const C=document.querySelector("#catalog-sort"),H=C?.querySelector(".catalog-sort__trigger"),j=C?.querySelector(".catalog-sort__menu"),L=Array.from(C?.querySelectorAll("[data-sort-value]")??[]);function ot(t=!1){!H||!j||(H.setAttribute("aria-expanded","false"),j.hidden=!0,C?.classList.remove("is-open"),t&&H.focus())}function Nt(){!H||!j||(H.setAttribute("aria-expanded","true"),j.hidden=!1,C?.classList.add("is-open"))}function ue(t){const e=L.find(n=>n.dataset.sortValue===t),a=document.querySelector("#catalog-sort-value");!e||!C||!a||(lt=t,C.dataset.value=t,a.textContent=e.querySelector("span")?.textContent??e.textContent,L.forEach(n=>{n.setAttribute("aria-selected",String(n===e))}),ot(!0),it())}H?.addEventListener("click",()=>{j?.hidden?Nt():ot()});L.forEach(t=>{t.addEventListener("click",()=>{ue(t.dataset.sortValue)})});C?.addEventListener("keydown",t=>{const e=L.indexOf(document.activeElement),a=L.findIndex(s=>s.getAttribute("aria-selected")==="true");if(t.key==="Escape"){t.preventDefault(),ot(!0);return}if(t.key!=="ArrowDown"&&t.key!=="ArrowUp"&&t.key!=="Home"&&t.key!=="End")return;t.preventDefault(),j?.hidden&&Nt();let n=e>=0?e:a;t.key==="Home"&&(n=0),t.key==="End"&&(n=L.length-1),t.key==="ArrowDown"&&(n=(n+1)%L.length),t.key==="ArrowUp"&&(n=(n-1+L.length)%L.length),L[n]?.focus()});document.addEventListener("click",t=>{C?.contains(t.target)||ot()});document.querySelector("#reset-catalog")?.addEventListener("click",()=>{F=null,pt="";const t=document.querySelector("#catalog-search");t&&(t.value="");const e=document.querySelector("#fit-message");e&&(e.textContent=""),it()});document.querySelector("#calculator-product-select")?.addEventListener("change",t=>{vt(t.currentTarget.value)});document.querySelector("#hero-product-select")?.addEventListener("change",t=>{vt(t.currentTarget.value)});document.querySelector("#quantity-input")?.addEventListener("input",t=>{K(Number(t.currentTarget.value))});document.querySelector("#hero-quantity-input")?.addEventListener("input",t=>{K(Number(t.currentTarget.value))});document.querySelector("#request-form")?.addEventListener("submit",t=>{t.preventDefault(),Gt(t.currentTarget)});document.addEventListener("click",t=>{const e=t.target,a=e.closest("[data-open-product]");if(a?.dataset.openProduct){Ct(a.dataset.openProduct);return}const n=e.closest("[data-quantity]");if(n?.dataset.quantity){K(Number(n.dataset.quantity));return}const s=e.closest("[data-quantity-step]");if(s?.dataset.quantityStep){K(p+Number(s.dataset.quantityStep));return}if(e.closest("[data-product-to-cart]")){St(M??T,p),document.querySelector("#product-dialog")?.close(),M=null;return}if(e.closest("[data-add-selected-to-cart]")){St(T,p);return}const i=e.closest("[data-remove-cart]");if(i?.dataset.removeCart){Kt(i.dataset.removeCart);return}if(e.closest("[data-product-to-calculator]")){document.querySelector("#product-dialog")?.close(),M=null,window.location.hash="calculator",document.querySelector("#calculator")?.scrollIntoView({behavior:"smooth",block:"start"});return}const o=e.closest("[data-close-dialog]");if(o){o.closest("dialog")?.close(),M=null;return}const r=e.closest("[data-auth-tab]");if(r?.dataset.authTab){const m=r.closest(".auth-forms");m?.querySelectorAll("[data-auth-tab]").forEach(v=>{const f=v.dataset.authTab===r.dataset.authTab;v.classList.toggle("is-active",f),v.setAttribute("aria-selected",String(f))}),m?.querySelectorAll("[data-auth-panel]").forEach(v=>{v.hidden=v.dataset.authPanel!==r.dataset.authTab});return}if(e.closest("#logout-button")){localStorage.removeItem(b.session),W(),I(),A(!1),J();return}if(e.closest("[data-create-product]")){xt();return}const c=e.closest("[data-edit-product]");if(c?.dataset.editProduct){xt(c.dataset.editProduct);return}if(e.closest("[data-close-admin-product]")){document.querySelector("#admin-product-dialog")?.close();return}const l=e.closest("[data-toggle-product]");if(l?.dataset.toggleProduct){const m=P(),v=m.find(f=>f.id===l.dataset.toggleProduct);v&&(v.active&&y().length<=1?k="У каталозі має залишитися хоча б один активний товар.":(v.active=!v.active,v.updatedAt=new Date().toISOString(),G(m),Y(),k=v.active?`Товар №${v.number} повернуто на сайт.`:`Товар №${v.number} приховано.`),S());return}const h=e.closest("[data-delete-product]");if(h?.dataset.deleteProduct){const m=P(),v=m.find(f=>f.id===h.dataset.deleteProduct);if(!v)return;if(v.active&&y().length<=1){k="Не можна видалити останній активний товар.",S();return}window.confirm(`Видалити коробку №${v.number}? Цю дію не можна скасувати.`)&&(G(m.filter(f=>f.id!==v.id)),q(b.cart,R().filter(f=>f.productId!==v.id)),Y(),k=`Товар №${v.number} видалено.`,S());return}const g=e.closest("[data-product-filter]");if(g?.dataset.productFilter){O=g.dataset.productFilter,S();return}const w=e.closest("[data-admin-order-filter]");if(w?.dataset.adminOrderFilter){Z=w.dataset.adminOrderFilter,document.querySelectorAll("[data-admin-order-filter]").forEach(m=>{m.classList.toggle("is-active",m===w)}),yt();return}if(e.closest("[data-export-orders]")){Lt(`toffipacks-orders-${new Date().toISOString().slice(0,10)}.json`,Q());return}if(e.closest("[data-export-products]")){Lt(`toffipacks-products-${new Date().toISOString().slice(0,10)}.json`,P());return}if(e.closest("[data-reset-products]")){window.confirm("Відновити початковий каталог? Усі ручні зміни товарів буде втрачено.")&&(G(ut.map(m=>({...m,active:!0,updatedAt:new Date().toISOString()}))),Y(),k="Початковий каталог відновлено.",S());return}if(e.closest("#admin-logout")){localStorage.removeItem(b.session),W(),I(),A(!1),window.location.hash="admin",S();return}});document.addEventListener("input",t=>{const e=t.target;if(e instanceof HTMLInputElement&&e.id==="modal-quantity-input"){K(Number(e.value));return}if(e instanceof HTMLInputElement&&e.id==="admin-product-search"){mt=e.value,re();return}if(e instanceof HTMLInputElement&&e.id==="admin-order-search"){ht=e.value,yt();return}if(e instanceof HTMLInputElement&&e.id==="admin-client-search"){oe(e.value);return}if(e instanceof HTMLInputElement&&e.name==="basePrice"&&e.closest("#admin-product-form")){const a=Number(e.value)||0,n={...nt(),basePrice:a},s=e.closest("form")?.querySelector(".admin-editor-price-preview"),i=s?.querySelector("strong"),o=s?.querySelector("small");i&&(i.textContent=d($(n,1))),o&&(o.textContent=`опт: ${d($(n,x))}`)}});document.addEventListener("keydown",t=>{if(t.key!=="Enter"&&t.key!==" ")return;const e=t.target;!(e instanceof HTMLElement)||!e.matches(".product-card")||(t.preventDefault(),e.dataset.openProduct&&Ct(e.dataset.openProduct))});document.addEventListener("submit",t=>{const e=t.target;e instanceof HTMLFormElement&&(e.id==="login-form"?(t.preventDefault(),_t(e)):e.id==="register-form"?(t.preventDefault(),Xt(e)):e.id==="admin-login-form"?(t.preventDefault(),_t(e,!0)):e.id==="admin-product-form"&&(t.preventDefault(),le(e)))});document.addEventListener("change",t=>{const e=t.target;if(e instanceof HTMLInputElement||e instanceof HTMLSelectElement){if(e instanceof HTMLInputElement&&e.dataset.cartQuantity){zt(e.dataset.cartQuantity,Number(e.value));return}if(e instanceof HTMLSelectElement&&e.dataset.orderStatus){const a=Q(),n=a.find(s=>s.id===e.dataset.orderStatus);n&&(n.status=e.value,q(b.orders,a),S());return}if(e instanceof HTMLInputElement&&e.dataset.partnerToggle){const a=N(),n=a.find(s=>s.id===e.dataset.partnerToggle);n&&(n.partner=e.checked,q(b.accounts,a),S());return}if(e instanceof HTMLInputElement&&e.dataset.partnerMarkup){const a=N(),n=a.find(s=>s.id===e.dataset.partnerMarkup);n&&(n.fixedMarkup=Math.min(.99,Math.max(0,Number(e.value)||0)),q(b.accounts,a),S())}}});document.querySelector("#product-dialog")?.addEventListener("click",t=>{t.target===t.currentTarget&&(t.currentTarget.close(),M=null)});document.querySelector("#admin-product-dialog")?.addEventListener("click",t=>{t.target===t.currentTarget&&t.currentTarget.close()});window.addEventListener("hashchange",$t);A(!0);window.setTimeout(()=>A(!1),460);I();W();$t();de();
