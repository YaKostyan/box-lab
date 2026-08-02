(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=a(s);fetch(s.href,o)}})();const C=5e4,x=1e3,vt=2,bt=1,W=.5,f=[{id:"box-301",number:"301",name:"Самозбірна коробка №301",dimensions:{length:165,width:100,height:30},basePrice:5,sourceQuantity:1e3},{id:"box-302",number:"302",name:"Самозбірна коробка №302",dimensions:{length:130,width:130,height:50},basePrice:7,sourceQuantity:800},{id:"box-303",number:"303",name:"Самозбірна коробка №303",dimensions:{length:190,width:150,height:100},basePrice:17,sourceQuantity:800},{id:"box-304",number:"304",name:"Самозбірна коробка №304",dimensions:{length:230,width:150,height:35},basePrice:11,sourceQuantity:800},{id:"box-305",number:"305",name:"Самозбірна коробка №305",dimensions:{length:160,width:85,height:110},basePrice:6.5},{id:"box-306",number:"306",name:"Самозбірна коробка №306",dimensions:{length:145,width:145,height:40},basePrice:6.5,sourceQuantity:1e3},{id:"box-307",number:"307",name:"Самозбірна коробка №307",dimensions:{length:280,width:180,height:100},basePrice:18,sourceQuantity:500},{id:"box-308",number:"308",name:"Самозбірна коробка №308",dimensions:{length:250,width:180,height:40},basePrice:12,sourceQuantity:800},{id:"box-309",number:"309",name:"Самозбірна коробка №309",dimensions:{length:210,width:150,height:50},basePrice:11,sourceQuantity:900},{id:"box-310",number:"310",name:"Самозбірна коробка №310",dimensions:{length:260,width:260,height:50},basePrice:15,sourceQuantity:600},{id:"box-311",number:"311",name:"Самозбірна коробка №311",dimensions:{length:370,width:170,height:100},basePrice:17},{id:"box-101",number:"101",name:"Самозбірна коробка №101",dimensions:{length:178,width:115,height:48},basePrice:4,sourceQuantity:800}],ft=[{question:"Як відбувається доставка?",answer:"Відправляємо замовлення по Україні. Місто, відділення або адресний формат менеджер погоджує з вами під час підтвердження заявки."},{question:"Які строки виготовлення?",answer:"Строк залежить від розміру коробки, тиражу та завантаження виробництва. Менеджер називає точну дату до запуску замовлення."},{question:"Що отримує постійний клієнт?",answer:"Після підтвердження менеджером у кабінеті активується персональна ціна. Вона автоматично відображається в каталозі, калькуляторі та кошику."},{question:"Як проходить оплата?",answer:"Форму оплати, рахунок і підсумкову суму менеджер погоджує з вами до початку виготовлення."},{question:"Чи працюєте ви з малим і великим бізнесом?",answer:"Так. Можна почати з невеликої партії або замовити регулярний великий тираж. Калькулятор рахує до 50 000 коробок, більший обсяг прораховує менеджер."},{question:"Чи робите коробки під індивідуальний запит?",answer:"Так. Якщо серед готових розмірів немає потрібного, вкажіть габарити й особливості замовлення в коментарі. Менеджер уточнить деталі та підготує розрахунок."}];function u(t){return new Intl.NumberFormat("uk-UA",{style:"currency",currency:"UAH",minimumFractionDigits:Number.isInteger(t)?0:2,maximumFractionDigits:2}).format(t)}function $(t,e){return t.basePrice+(e>=x?bt:vt)}function A(t,e,a){return a?.partner?t.basePrice+Math.min(Math.max(a.fixedMarkup,0),.99):$(t,e)}function at(t){const{length:e,width:a,height:n}=t.dimensions;return e*a*n}function yt(t,e){const a=[t.length,t.width,t.height].sort((s,o)=>o-s),n=[e.length,e.width,e.height].sort((s,o)=>o-s);return a.every((s,o)=>s<=n[o])}const h={accounts:"toffipacks-accounts-v3",orders:"toffipacks-orders-v3",session:"toffipacks-session-v3",cart:"toffipacks-cart-v1"},nt=new Date().toISOString(),ct=[{id:"account-admin",name:"Адміністратор ToffiPacks",phone:"+380000000001",company:"ToffiPacks",password:"admin123",role:"admin",partner:!1,fixedMarkup:W,createdAt:nt},{id:"account-partner",name:"Постійний клієнт",phone:"+380671112233",company:"",password:"client123",role:"client",partner:!0,fixedMarkup:W,createdAt:nt}],lt=[];function G(t,e){try{const a=localStorage.getItem(t);return a?JSON.parse(a):e}catch{return e}}function b(t,e){localStorage.setItem(t,JSON.stringify(e))}function $t(){localStorage.getItem(h.accounts)||b(h.accounts,ct),localStorage.getItem(h.orders)||b(h.orders,lt),localStorage.getItem(h.cart)||b(h.cart,[])}$t();let P="box-101",d=500,J="",X="size",M=null,st,L=null;const dt=document.querySelector("#app");if(!dt)throw new Error("Root element #app was not found.");function E(){return G(h.accounts,ct)}function z(){return G(h.orders,lt).map(e=>{if("items"in e&&Array.isArray(e.items))return e;const a=e;return{id:a.id,createdAt:a.createdAt,customerName:a.customerName,phone:a.phone,company:a.company,comment:a.comment,items:[{productId:a.productId,productNumber:a.productNumber,dimensions:a.dimensions,quantity:a.quantity,unitPrice:a.unitPrice,total:a.total,priceType:a.priceType}],total:a.total,accountId:a.accountId,status:a.status}})}function U(){return G(h.cart,[]).filter(t=>f.some(e=>e.id===t.productId)&&t.quantity>0)}function _(){const t=localStorage.getItem(h.session);return E().find(e=>e.id===t)??null}function Y(){return f.find(t=>t.id===P)??f[0]}function j(t){return Number.isFinite(t)?Math.min(C,Math.max(1,Math.round(t))):1}function Z(t){let e=t.replace(/\D/g,"");return e.length===10&&e.startsWith("0")&&(e=`38${e}`),e.length===12&&e.startsWith("380")?`+${e}`:t.trim()}function R(t){return Z(t).replace(/\D/g,"")}function m(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function q(t){return`${t.length} × ${t.width} × ${t.height} мм`}function tt(t){const e=t%100,a=t%10;return e>=11&&e<=14?`${t} позицій`:a===1?`${t} позиція`:a>=2&&a<=4?`${t} позиції`:`${t} позицій`}function B(t,e){return e?.partner?"Фіксована ціна клієнта":t>=x?"Оптова ціна":"Роздрібна ціна"}function H(t,e=!1){const{length:a,width:n,height:s}=t.dimensions,o=170+Math.min(100,a/3),i=58+Math.min(54,s/2.5),r=50+Math.min(44,n/4),c=72,l=e?70:82,p=l-r*.55,g=c+o,y=g+r,v=l+i;return`
    <svg class="box-visual${e?" box-visual--compact":""}" viewBox="0 0 470 270" role="img"
      aria-label="Схема коробки ${m(t.number)}, ${q(t.dimensions)}">
      <g class="box-visual__shape">
        <polygon class="box-visual__top" points="${c},${l} ${c+r},${p} ${y},${p} ${g},${l}" />
        <polygon class="box-visual__side" points="${g},${l} ${y},${p} ${y},${p+i} ${g},${v}" />
        <rect class="box-visual__front" x="${c}" y="${l}" width="${o}" height="${i}" />
        <rect class="box-visual__mark" x="${c+o*.35}" y="${l+i*.32}"
          width="${o*.3}" height="${Math.max(24,i*.34)}" rx="5" />
        <text class="box-visual__number" x="${c+o/2}" y="${l+i*.56}">№${t.number}</text>
      </g>
      <g class="dimension-line dimension-line--length">
        <line x1="${c}" y1="${v+28}" x2="${g}" y2="${v+28}" />
        <line x1="${c}" y1="${v+20}" x2="${c}" y2="${v+36}" />
        <line x1="${g}" y1="${v+20}" x2="${g}" y2="${v+36}" />
        <rect x="${c+o/2-38}" y="${v+12}" width="76" height="32" rx="16" />
        <text x="${c+o/2}" y="${v+33}">${a} мм</text>
      </g>
      <g class="dimension-line dimension-line--height">
        <line x1="${c-26}" y1="${l}" x2="${c-26}" y2="${v}" />
        <line x1="${c-34}" y1="${l}" x2="${c-18}" y2="${l}" />
        <line x1="${c-34}" y1="${v}" x2="${c-18}" y2="${v}" />
        <rect x="2" y="${l+i/2-16}" width="66" height="32" rx="16" />
        <text x="35" y="${l+i/2+5}">${s} мм</text>
      </g>
      <g class="dimension-line dimension-line--width">
        <line x1="${g+8}" y1="${l-8}" x2="${y+8}" y2="${p-8}" />
        <rect x="${y-54}" y="${Math.max(4,p-48)}" width="76" height="32" rx="16" />
        <text x="${y-16}" y="${Math.max(25,p-27)}">${n} мм</text>
      </g>
    </svg>
  `}function it(){return f.map(t=>`<option value="${t.id}"${t.id===P?" selected":""}>№${t.number} · ${q(t.dimensions)}</option>`).join("")}function qt(){const t=Y();return`
    <header class="site-header" id="top">
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
            <div><dt>12</dt><dd>готових розмірів</dd></div>
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
            <select class="select" id="hero-product-select">${it()}</select>
          </label>
          <label class="field">
            <span>Кількість</span>
            <input class="input" id="hero-quantity-input" type="number" min="1" max="${C}" value="${d}" />
          </label>
          <div class="hero-calculator__result">
            <span id="hero-price-label">Роздрібна ціна</span>
            <strong id="hero-total">${u($(t,d)*d)}</strong>
            <small id="hero-unit">${u($(t,d))} / шт.</small>
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
            <p class="eyebrow"><span></span> 12 готових розмірів</p>
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
          <label class="sort-field">
            <span>Сортувати</span>
            <select class="select" id="catalog-sort">
              <option value="size">Від компактних</option>
              <option value="price">За ціною</option>
              <option value="number">За номером</option>
            </select>
          </label>
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
              <select class="select select--large" id="calculator-product-select">${it()}</select>
            </label>
            <div class="calculator-preview" id="calculator-preview">${H(t,!0)}</div>
            <div class="quantity-block">
              <div class="quantity-block__label">
                <label for="quantity-input">Кількість</label>
                <output id="quantity-output">${d.toLocaleString("uk-UA")} шт.</output>
              </div>
              <div class="quantity-control">
                <button type="button" data-quantity-step="-100" aria-label="Зменшити кількість на 100">−</button>
                <input id="quantity-input" type="number" min="1" max="${C}" value="${d}" />
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
                <strong id="calculator-unit-price">${u($(t,d))}<small>/ шт.</small></strong>
              </div>
              <div class="calculation-result__total">
                <span>Весь тираж</span>
                <strong id="calculator-total">${u($(t,d)*d)}</strong>
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
            <div class="eco-card__limit">
              <strong>до 2 кг</strong>
              <p>рекомендоване навантаження для цього картону</p>
            </div>
            <p class="eco-card__note">
              За умови щільного внутрішнього пакування коробка надійно утримує вміст під час
              зберігання та перевезення.
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
              <div><h3>Доставка</h3><p>Відправлення по Україні: місто, відділення або адресний формат узгоджуємо під час підтвердження.</p></div>
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
          ${ft.map((e,a)=>`
                <details${a===0?" open":""}>
                  <summary><span>${m(e.question)}</span><i aria-hidden="true"></i></summary>
                  <p>${m(e.answer)}</p>
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
  `}dt.innerHTML=qt();const Q=document.querySelector("#product-grid"),V=document.querySelector("#catalog-count");function wt(t){const e=_(),a=$(t,1),n=$(t,x),s=e?.partner?A(t,1,e):null;return`
    <article
      class="product-card${t.id===P?" is-selected":""}"
      data-open-product="${t.id}"
      tabindex="0"
      role="button"
      aria-label="Відкрити коробку №${t.number}, ${q(t.dimensions)}"
    >
      <div class="product-card__head">
        <span class="product-card__number">№${t.number}</span>
        <span class="product-card__size-label">внутрішній розмір</span>
      </div>
      <div class="product-card__visual">${H(t,!0)}</div>
      <h3>${q(t.dimensions)}</h3>
      <div class="product-card__prices">
        ${s!==null?`<div class="partner-price"><span>Ваша фіксована</span><strong>${u(s)}<small>/шт.</small></strong></div>`:`
              <div><span>1–999 шт.</span><strong>${u(a)}</strong></div>
              <div><span>від 1000 шт.</span><strong>${u(n)}</strong></div>
            `}
      </div>
      <button class="button button--card" type="button" data-open-product="${t.id}">
        Детальніше
      </button>
    </article>
  `}function _t(t){const e=_(),a=A(t,d,e),n=a*d;return`
    <div class="product-modal">
      <div class="product-modal__visual">
        <div class="product-modal__labels">
          <span>№${t.number}</span>
        </div>
        <div class="product-modal__drawing">${H(t,!0)}</div>
        <p>Внутрішній розмір · Д × Ш × В</p>
      </div>
      <div class="product-modal__content">
        <p class="eyebrow"><span></span> Внутрішній розмір</p>
        <h2 id="product-dialog-title">${q(t.dimensions)}</h2>

        <div class="product-modal__rules">
          <div><span>1–999 шт.</span><strong>${u($(t,1))} / шт.</strong></div>
          <div><span>від 1 000 шт.</span><strong>${u($(t,x))} / шт.</strong></div>
        </div>

        <div class="quantity-block quantity-block--modal">
          <div class="quantity-block__label">
            <label for="modal-quantity-input">Кількість</label>
            <output id="modal-quantity-output">${d.toLocaleString("uk-UA")} шт.</output>
          </div>
          <div class="quantity-control">
            <button type="button" data-quantity-step="-100" aria-label="Зменшити кількість на 100">−</button>
            <input id="modal-quantity-input" type="number" min="1" max="${C}" value="${d}" />
            <button type="button" data-quantity-step="100" aria-label="Збільшити кількість на 100">+</button>
          </div>
          <div class="quantity-presets quantity-presets--modal" aria-label="Швидкий вибір кількості">
            ${[100,500,1e3,5e3,1e4,5e4].map(s=>`<button type="button" data-quantity="${s}">${s.toLocaleString("uk-UA")}</button>`).join("")}
          </div>
        </div>

        <div class="product-modal__total" aria-live="polite">
          <div><span id="modal-price-tier">${B(d,e)}</span><strong id="modal-unit-price">${u(a)} / шт.</strong></div>
          <div><span>Весь тираж</span><strong id="modal-total">${u(n)}</strong></div>
        </div>

        <div class="product-modal__actions">
          <button class="button button--primary" type="button" data-product-to-cart>Додати до кошика</button>
          <button class="button button--ghost" type="button" data-product-to-calculator>Відкрити калькулятор</button>
        </div>
      </div>
    </div>
  `}function ut(){const t=document.querySelector("#product-dialog");if(!t?.open||!L)return;const e=f.find(l=>l.id===L);if(!e)return;const a=_(),n=A(e,d,a),s=t.querySelector("#modal-quantity-input");s&&(s.value=String(d));const o=t.querySelector("#modal-quantity-output");o&&(o.value=`${d.toLocaleString("uk-UA")} шт.`);const i=t.querySelector("#modal-price-tier");i&&(i.textContent=B(d,a));const r=t.querySelector("#modal-unit-price");r&&(r.textContent=`${u(n)} / шт.`);const c=t.querySelector("#modal-total");c&&(c.textContent=u(n*d)),t.querySelectorAll("[data-quantity]").forEach(l=>{l.classList.toggle("is-active",Number(l.dataset.quantity)===d)})}function pt(t){const e=f.find(s=>s.id===t),a=document.querySelector("#product-dialog"),n=document.querySelector("#product-dialog-content");!e||!a||!n||(L=e.id,et(e.id),n.innerHTML=_t(e),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),ut())}function St(){const t=J.trim().toLocaleLowerCase("uk-UA");return f.filter(a=>{const n=`${a.number} ${a.name} ${q(a.dimensions)}`.toLocaleLowerCase("uk-UA"),s=!t||n.includes(t),o=!M||yt(M,a.dimensions);return s&&o}).sort((a,n)=>X==="price"?a.basePrice-n.basePrice:X==="number"?Number(a.number)-Number(n.number):at(a)-at(n))}function w(t=!1){if(!Q||!V)return;if(t){V.textContent="Оновлюємо список…",Q.innerHTML=Array.from({length:6},()=>'<div class="product-skeleton" aria-hidden="true"><i></i><i></i><i></i></div>').join("");return}const e=St(),a=M?` · предмет ${q(M)}`:"";if(V.textContent=`${e.length} із ${f.length} розмірів${a}`,!e.length){Q.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__box" aria-hidden="true"></div>
        <h3>Готового розміру немає.</h3>
        <p>Змініть габарити предмета або залиште заявку з потрібним розміром.</p>
        <a class="button button--primary" href="#request">Описати свій розмір</a>
      </div>
    `;return}Q.innerHTML=e.map(wt).join("")}function K(){window.clearTimeout(st),w(!0),st=window.setTimeout(()=>w(!1),320)}function T(){const t=Y(),e=_(),a=A(t,d,e),n=a*d,s=B(d,e);document.querySelectorAll("#calculator-product-select, #hero-product-select").forEach(S=>{S.value=t.id}),document.querySelectorAll("#quantity-input, #hero-quantity-input, #modal-quantity-input").forEach(S=>{S.value=String(d)});const o=document.querySelector("#quantity-output");o&&(o.value=`${d.toLocaleString("uk-UA")} шт.`);const i=document.querySelector("#calculator-preview");i&&(i.classList.remove("is-changing"),i.offsetWidth,i.classList.add("is-changing"),i.innerHTML=H(t,!0));const r=document.querySelector("#calculator-tier");r&&(r.textContent=s);const c=document.querySelector("#calculator-unit-price");c&&(c.innerHTML=`${u(a)}<small>/ шт.</small>`);const l=document.querySelector("#calculator-total");l&&(l.textContent=u(n));const p=document.querySelector("#hero-price-label");p&&(p.textContent=s);const g=document.querySelector("#hero-total");g&&(g.textContent=u(n));const y=document.querySelector("#hero-unit");y&&(y.textContent=`${u(a)} / шт.`);const v=document.querySelector("#account-price-badge");v&&(v.textContent=e?.partner?"Персональна ціна активна":"Публічна ціна",v.classList.toggle("is-partner",!!e?.partner));const F=document.querySelector("#threshold-note");if(F)if(e?.partner)F.innerHTML=`<strong>Фіксована ціна:</strong> ${u(a)} за одиницю незалежно від тиражу.`;else if(d<x){const S=x-d,gt=$(t,x)*x;F.innerHTML=`Ще <strong>${S.toLocaleString("uk-UA")} шт.</strong> до оптового тарифу. 1000 шт. коштуватимуть ${u(gt)}.`}else F.innerHTML=`<strong>Оптовий тариф активний.</strong> Економія проти роздрібної ціни — ${u(d)} на всьому тиражі.`;document.querySelectorAll("[data-quantity]").forEach(S=>{S.classList.toggle("is-active",Number(S.dataset.quantity)===d)}),I(),ut()}function et(t,e=!1){f.some(a=>a.id===t)&&(P=t,w(!1),T(),e&&document.querySelector("#calculator")?.scrollIntoView({behavior:"smooth",block:"start"}))}function N(t){d=j(t),T()}function ot(t,e){if(!f.some(o=>o.id===t))return;const a=U(),n=a.find(o=>o.productId===t);n?n.quantity=j(e):a.push({productId:t,quantity:j(e)}),b(h.cart,a),I();const s=document.querySelector("#cart-button");s?.classList.remove("is-updated"),s?.offsetWidth,s?.classList.add("is-updated")}function xt(t,e){const a=U(),n=a.find(s=>s.productId===t);n&&(n.quantity=j(e),b(h.cart,a),I())}function Lt(t){b(h.cart,U().filter(e=>e.productId!==t)),I()}function I(){const t=document.querySelector("#request-summary"),e=document.querySelector("#cart-count"),a=document.querySelector('#request-form button[type="submit"]'),n=U(),s=_();if(e&&(e.textContent=String(n.length)),a&&(a.disabled=n.length===0),!t)return;if(!n.length){t.innerHTML=`
      <div class="cart-empty">
        <span aria-hidden="true">□</span>
        <strong>Кошик порожній</strong>
        <p>Оберіть розмір і додайте потрібну кількість коробок.</p>
        <a class="button button--ghost button--small" href="#catalog">Обрати коробки</a>
      </div>
    `;return}let o=0;const i=n.map(r=>{const c=f.find(g=>g.id===r.productId);if(!c)return"";const l=A(c,r.quantity,s),p=l*r.quantity;return o+=p,`
        <article class="cart-item">
          <div class="cart-item__index">№${c.number}</div>
          <div class="cart-item__info">
            <strong>${q(c.dimensions)}</strong>
            <span>${u(l)} / шт.</span>
          </div>
          <label class="cart-item__quantity">
            <span>Кількість</span>
            <input class="input" type="number" min="1" max="${C}" value="${r.quantity}" data-cart-quantity="${c.id}" />
          </label>
          <div class="cart-item__total">
            <span>Сума</span>
            <strong>${u(p)}</strong>
          </div>
          <button class="cart-item__remove" type="button" data-remove-cart="${c.id}" aria-label="Прибрати коробку №${c.number} з кошика">×</button>
        </article>
      `}).join("");t.innerHTML=`
    <div class="cart-list">${i}</div>
    <div class="cart-summary__total">
      <span>${tt(n.length)}</span>
      <div><small>Загальна вартість</small><strong>${u(o)}</strong></div>
    </div>
    <a class="cart-continue" href="#catalog">+ Додати ще один розмір</a>
  `}function D(){const t=document.querySelector("#account-button"),e=_();if(!t)return;t.textContent=e?e.name.split(" ")[0]:"Кабінет",t.classList.toggle("is-signed-in",!!e);const a=document.querySelector("#request-account-hint");a&&(a.textContent=e?e.name:"Гість");const n=document.querySelector("#request-form");if(n&&e){const s=(o,i)=>{const r=n.elements.namedItem(o);r instanceof HTMLInputElement&&!r.value&&(r.value=i)};s("name",e.name),s("phone",e.phone),s("company",e.company)}I()}function Tt(){const t=_();if(t){const e=z().filter(r=>r.accountId===t.id).slice().reverse(),a=e.filter(r=>r.status!=="Закрита").length,n=e.reduce((r,c)=>r+c.total,0),s=t.name.split(/\s+/).filter(Boolean).slice(0,2).map(r=>r[0]).join("").toLocaleUpperCase("uk-UA"),o=Y(),i=A(o,d,t);return`
      <div class="account-dashboard">
        <section class="account-dashboard__hero">
          <div class="account-identity">
            <span class="account-avatar">${m(s||"TP")}</span>
            <div>
              <p class="eyebrow eyebrow--light"><span></span> Особистий кабінет</p>
              <h1 id="account-page-title">${m(t.name)}</h1>
              <p>${m(t.phone)}${t.company?` · ${m(t.company)}`:""}</p>
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
          <article><span>Сума заявок</span><strong>${u(n)}</strong><small>загальна вартість</small></article>
        </div>

        <div class="account-dashboard__grid">
          <section class="account-orders-panel">
            <div class="account-panel-heading">
              <div><p class="eyebrow"><span></span> Історія</p><h2>Мої заявки</h2></div>
              <a class="text-link" href="#request">Нова заявка <span>→</span></a>
            </div>
            <div class="account-order-list">
              ${e.length?e.map(r=>{const c=r.items.reduce((l,p)=>l+p.quantity,0);return`
                          <article class="account-order">
                            <div class="account-order__main">
                              <strong>${tt(r.items.length)}</strong>
                              <small>${c.toLocaleString("uk-UA")} шт. загалом</small>
                            </div>
                            <div class="account-order__price"><strong>${u(r.total)}</strong><small>загальна сума</small></div>
                            <div class="account-order__meta"><span>${m(r.status)}</span><time datetime="${r.createdAt}">${new Date(r.createdAt).toLocaleDateString("uk-UA")}</time></div>
                          </article>
                        `}).join(""):'<div class="account-empty"><strong>Заявок ще немає.</strong><p>Оберіть розмір, порахуйте тираж і збережіть першу заявку.</p><a class="button button--primary" href="#catalog">До каталогу</a></div>'}
            </div>
          </section>

          <aside class="account-sidebar">
            <article class="account-quick-order">
              <p class="technical-label">Швидкий розрахунок</p>
              <div class="account-quick-order__box">${H(o,!1)}</div>
              <span>Коробка №${o.number}</span>
              <h3>${q(o.dimensions)}</h3>
              <div><span>${d.toLocaleString("uk-UA")} шт.</span><strong>${u(i*d)}</strong></div>
              <button class="button button--gold button--wide" type="button" data-add-selected-to-cart>Додати до кошика</button>
            </article>
            <article class="account-profile-card">
              <div><p class="technical-label">Профіль</p><a href="#account">Дані клієнта</a></div>
              <dl>
                <div><dt>Телефон</dt><dd>${m(t.phone)}</dd></div>
                <div><dt>Компанія</dt><dd>${m(t.company||"Не вказано")}</dd></div>
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
  `}function O(){const t=document.querySelector("#account-page-content");t&&(t.innerHTML=Tt())}function mt(t,e,a){const n=t.querySelector("[data-auth-status]");n&&(n.textContent=e,n.className=`form-status is-${a}`)}function At(t,e){const a=R(t),n=E().find(s=>R(s.phone)===a&&s.password===e);return n?(localStorage.setItem(h.session,n.id),n):null}function rt(t,e=!1){if(t.classList.add("was-validated"),!t.reportValidity())return;const a=new FormData(t),n=At(String(a.get("phone")??""),String(a.get("password")??""));if(!n||e&&n.role!=="admin"){mt(t,e?"Потрібен акаунт менеджера.":"Невірний телефон або пароль.","error");return}D(),T(),w(!1),e?k():(O(),window.location.hash="account")}function kt(t){if(t.classList.add("was-validated"),!t.reportValidity())return;const e=new FormData(t),a=Z(String(e.get("phone")??"")),n=E();if(n.some(o=>R(o.phone)===R(a))){mt(t,"Акаунт із таким номером уже існує.","error");return}const s={id:`account-${Date.now().toString(36)}`,name:String(e.get("name")??"").trim(),phone:a,company:String(e.get("company")??"").trim(),password:String(e.get("password")??""),role:"client",partner:!1,fixedMarkup:W,createdAt:new Date().toISOString()};n.push(s),b(h.accounts,n),localStorage.setItem(h.session,s.id),D(),T(),w(!1),O(),window.location.hash="account"}function Pt(t){const e=document.querySelector("#request-status"),a=U();if(!a.length){e&&(e.className="form-status is-error",e.textContent="Додайте хоча б одну коробку до кошика.");return}if(t.classList.add("was-validated"),!t.reportValidity()){e&&(e.className="form-status is-error",e.textContent="Перевірте обов’язкові поля та згоду.");return}const n=new FormData(t),s=_(),o=a.flatMap(l=>{const p=f.find(y=>y.id===l.productId);if(!p)return[];const g=A(p,l.quantity,s);return[{productId:p.id,productNumber:p.number,dimensions:p.dimensions,quantity:l.quantity,unitPrice:g,total:g*l.quantity,priceType:B(l.quantity,s)}]}),i=o.reduce((l,p)=>l+p.total,0),r={id:`TP-${Date.now().toString(36).toUpperCase()}`,createdAt:new Date().toISOString(),customerName:String(n.get("name")??"").trim(),phone:Z(String(n.get("phone")??"")),company:String(n.get("company")??"").trim(),comment:String(n.get("comment")??"").trim(),items:o,total:i,accountId:s?.id,status:"Нова"},c=z();c.push(r),b(h.orders,c),b(h.cart,[]),I(),O(),e&&(e.className="form-status is-success",e.innerHTML=`<strong>Заявку створено.</strong><span>${tt(r.items.length)} на суму ${u(r.total)}.</span>`),t.querySelector('button[type="submit"]')?.focus()}function Mt(t){return["Нова","У роботі","Уточнення","Підтверджена","Закрита"].map(a=>`<option value="${a}"${a===t?" selected":""}>${a}</option>`).join("")}function k(){const t=document.querySelector("#admin-content");if(!t)return;const e=_();if(!e||e.role!=="admin"){t.innerHTML=`
      <div class="admin-login">
        <p class="eyebrow"><span></span> Для менеджера</p>
        <h1 id="admin-title">Вхід для менеджера.</h1>
        <p>Увійдіть, щоб переглядати заявки та керувати статусами клієнтів.</p>
        <form id="admin-login-form" class="auth-form" novalidate>
          <label class="field"><span>Телефон</span><input class="input" name="phone" type="tel" autocomplete="tel" required /></label>
          <label class="field"><span>Пароль</span><input class="input" name="password" type="password" autocomplete="current-password" required /></label>
          <div class="form-status" data-auth-status aria-live="polite"></div>
          <button class="button button--primary button--wide" type="submit">Увійти</button>
        </form>
      </div>
    `;return}const a=z().slice().reverse(),n=E().filter(i=>i.role==="client"),s=a.filter(i=>i.status!=="Закрита").length,o=a.reduce((i,r)=>i+r.total,0);t.innerHTML=`
    <div class="admin-shell">
      <div class="admin-title-row">
        <div>
          <p class="eyebrow"><span></span> Кабінет менеджера</p>
          <h1 id="admin-title">Заявки та клієнти.</h1>
        </div>
        <div>
          <span>${m(e.phone)}</span>
          <button class="text-link" id="admin-logout" type="button">Вийти</button>
        </div>
      </div>
      <div class="admin-stats">
        <article><span>Усі заявки</span><strong>${a.length}</strong></article>
        <article><span>Активні</span><strong>${s}</strong></article>
        <article><span>Клієнти</span><strong>${n.length}</strong></article>
        <article><span>Загальна сума</span><strong>${u(o)}</strong></article>
      </div>
      <section class="admin-section">
        <div class="admin-section__head"><h2>Заявки</h2><span>${a.length} записів</span></div>
        <div class="orders-list">
          ${a.length?a.map(i=>`
                      <article class="order-card">
                        <div class="order-card__top">
                          <div><span>${m(i.id)}</span><strong>${m(i.customerName)}</strong></div>
                          <select class="select status-select" data-order-status="${m(i.id)}">${Mt(i.status)}</select>
                        </div>
                        <div class="order-card__grid">
                          <div><span>Контакт</span><a href="tel:${m(i.phone)}">${m(i.phone)}</a><small>Телефон клієнта</small></div>
                          <div><span>Позицій</span><strong>${i.items.length}</strong><small>${i.items.reduce((r,c)=>r+c.quantity,0).toLocaleString("uk-UA")} шт. загалом</small></div>
                          <div><span>Сума</span><strong>${u(i.total)}</strong><small>кінцева вартість</small></div>
                        </div>
                        <div class="order-card__items">
                          ${i.items.map(r=>`
                                <div>
                                  <span>№${m(r.productNumber)}</span>
                                  <strong>${q(r.dimensions)}</strong>
                                  <small>${r.quantity.toLocaleString("uk-UA")} шт. · ${u(r.unitPrice)} / шт.</small>
                                  <b>${u(r.total)}</b>
                                </div>
                              `).join("")}
                        </div>
                        ${i.company||i.comment?`<p class="order-card__comment">${m(i.company)}${i.company&&i.comment?" · ":""}${m(i.comment)}</p>`:""}
                        <time datetime="${i.createdAt}">${new Date(i.createdAt).toLocaleString("uk-UA")}</time>
                      </article>
                    `).join(""):'<div class="empty-state"><h3>Заявок ще немає.</h3><p>Нові заявки з’являться в цьому розділі.</p></div>'}
        </div>
      </section>
      <section class="admin-section">
        <div class="admin-section__head"><h2>Клієнти</h2><span>Персональні умови</span></div>
        <div class="clients-table">
          <div class="clients-table__head"><span>Клієнт</span><span>Персональна ціна</span></div>
          ${n.map(i=>`
                <div class="client-row">
                  <div><strong>${m(i.name)}</strong><span>${m(i.company||"Без компанії")}</span><a href="tel:${m(i.phone)}">${m(i.phone)}</a></div>
                  <label class="partner-toggle"><input type="checkbox" data-partner-toggle="${i.id}"${i.partner?" checked":""} /><span>${i.partner?"Активна":"Неактивна"}</span></label>
                </div>
              `).join("")}
        </div>
      </section>
    </div>
  `}function ht(){const t=document.querySelector("#admin-page"),e=document.querySelector("#account-page"),a=document.querySelector("#main"),n=document.querySelector(".site-header"),s=document.querySelector(".site-footer"),o=document.querySelector(".demo-strip"),i=window.location.hash==="#admin",r=window.location.hash==="#account";t&&(t.hidden=!i),e&&(e.hidden=!r),a&&(a.hidden=i||r),n&&(n.hidden=i||r),s&&(s.hidden=i||r),o&&(o.hidden=i||r),document.body.classList.toggle("is-admin",i),document.body.classList.toggle("is-account",r),i?(k(),window.scrollTo({top:0})):r&&(O(),window.scrollTo({top:0}))}function Et(){const t=document.querySelectorAll(".reveal");if(!("IntersectionObserver"in window)){t.forEach(a=>a.classList.add("is-visible"));return}const e=new IntersectionObserver(a=>{a.forEach(n=>{n.isIntersecting&&(n.target.classList.add("is-visible"),e.unobserve(n.target))})},{threshold:.12});t.forEach(a=>e.observe(a))}document.querySelector("#menu-button")?.addEventListener("click",t=>{const e=t.currentTarget,a=document.querySelector("#site-nav"),n=e.getAttribute("aria-expanded")!=="true";e.setAttribute("aria-expanded",String(n)),a?.classList.toggle("is-open",n)});document.querySelectorAll(".site-nav a").forEach(t=>{t.addEventListener("click",()=>{document.querySelector("#site-nav")?.classList.remove("is-open"),document.querySelector("#menu-button")?.setAttribute("aria-expanded","false")})});document.querySelector("#fit-form")?.addEventListener("submit",t=>{t.preventDefault();const e=t.currentTarget;e.classList.add("was-validated");const a=document.querySelector("#fit-message");if(!e.reportValidity()){a&&(a.textContent="Вкажіть три додатні розміри.",a.className="form-message is-error");return}const n=new FormData(e);M={length:Number(n.get("length")),width:Number(n.get("width")),height:Number(n.get("height"))},a&&(a.textContent="Розміри застосовано. Показуємо коробки нижче.",a.className="form-message is-success"),K(),window.setTimeout(()=>document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth"}),180)});document.querySelector("#catalog-search")?.addEventListener("input",t=>{J=t.currentTarget.value,K()});document.querySelector("#catalog-sort")?.addEventListener("change",t=>{X=t.currentTarget.value,K()});document.querySelector("#reset-catalog")?.addEventListener("click",()=>{M=null,J="";const t=document.querySelector("#catalog-search");t&&(t.value="");const e=document.querySelector("#fit-message");e&&(e.textContent=""),K()});document.querySelector("#calculator-product-select")?.addEventListener("change",t=>{et(t.currentTarget.value)});document.querySelector("#hero-product-select")?.addEventListener("change",t=>{et(t.currentTarget.value)});document.querySelector("#quantity-input")?.addEventListener("input",t=>{N(Number(t.currentTarget.value))});document.querySelector("#hero-quantity-input")?.addEventListener("input",t=>{N(Number(t.currentTarget.value))});document.querySelector("#request-form")?.addEventListener("submit",t=>{t.preventDefault(),Pt(t.currentTarget)});document.addEventListener("click",t=>{const e=t.target,a=e.closest("[data-open-product]");if(a?.dataset.openProduct){pt(a.dataset.openProduct);return}const n=e.closest("[data-quantity]");if(n?.dataset.quantity){N(Number(n.dataset.quantity));return}const s=e.closest("[data-quantity-step]");if(s?.dataset.quantityStep){N(d+Number(s.dataset.quantityStep));return}if(e.closest("[data-product-to-cart]")){ot(L??P,d),document.querySelector("#product-dialog")?.close(),L=null;return}if(e.closest("[data-add-selected-to-cart]")){ot(P,d);return}const o=e.closest("[data-remove-cart]");if(o?.dataset.removeCart){Lt(o.dataset.removeCart);return}if(e.closest("[data-product-to-calculator]")){document.querySelector("#product-dialog")?.close(),L=null,window.location.hash="calculator",document.querySelector("#calculator")?.scrollIntoView({behavior:"smooth",block:"start"});return}const i=e.closest("[data-close-dialog]");if(i){i.closest("dialog")?.close(),L=null;return}const r=e.closest("[data-auth-tab]");if(r?.dataset.authTab){const c=r.closest(".auth-forms");c?.querySelectorAll("[data-auth-tab]").forEach(l=>{const p=l.dataset.authTab===r.dataset.authTab;l.classList.toggle("is-active",p),l.setAttribute("aria-selected",String(p))}),c?.querySelectorAll("[data-auth-panel]").forEach(l=>{l.hidden=l.dataset.authPanel!==r.dataset.authTab});return}if(e.closest("#logout-button")){localStorage.removeItem(h.session),D(),T(),w(!1),O();return}e.closest("#admin-logout")&&(localStorage.removeItem(h.session),D(),T(),w(!1),k())});document.addEventListener("input",t=>{const e=t.target;e instanceof HTMLInputElement&&e.id==="modal-quantity-input"&&N(Number(e.value))});document.addEventListener("keydown",t=>{if(t.key!=="Enter"&&t.key!==" ")return;const e=t.target;!(e instanceof HTMLElement)||!e.matches(".product-card")||(t.preventDefault(),e.dataset.openProduct&&pt(e.dataset.openProduct))});document.addEventListener("submit",t=>{const e=t.target;e instanceof HTMLFormElement&&(e.id==="login-form"?(t.preventDefault(),rt(e)):e.id==="register-form"?(t.preventDefault(),kt(e)):e.id==="admin-login-form"&&(t.preventDefault(),rt(e,!0)))});document.addEventListener("change",t=>{const e=t.target;if(e instanceof HTMLInputElement||e instanceof HTMLSelectElement){if(e instanceof HTMLInputElement&&e.dataset.cartQuantity){xt(e.dataset.cartQuantity,Number(e.value));return}if(e instanceof HTMLSelectElement&&e.dataset.orderStatus){const a=z(),n=a.find(s=>s.id===e.dataset.orderStatus);n&&(n.status=e.value,b(h.orders,a),k());return}if(e instanceof HTMLInputElement&&e.dataset.partnerToggle){const a=E(),n=a.find(s=>s.id===e.dataset.partnerToggle);n&&(n.partner=e.checked,b(h.accounts,a),k());return}if(e instanceof HTMLInputElement&&e.dataset.partnerMarkup){const a=E(),n=a.find(s=>s.id===e.dataset.partnerMarkup);n&&(n.fixedMarkup=Math.min(.99,Math.max(0,Number(e.value)||0)),b(h.accounts,a),k())}}});document.querySelector("#product-dialog")?.addEventListener("click",t=>{t.target===t.currentTarget&&(t.currentTarget.close(),L=null)});window.addEventListener("hashchange",ht);w(!0);window.setTimeout(()=>w(!1),460);T();D();ht();Et();
