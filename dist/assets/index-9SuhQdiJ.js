(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=a(i);fetch(i.href,o)}})();const U="Мікрогофрокартон, крафт",H=5e4,$=1e3,st=2,it=1,B=.5,S=[{id:"box-301",number:"301",sku:"Арт. 294",name:"Самозбірна коробка №301",dimensions:{length:165,width:100,height:30},basePrice:5,sourceQuantity:1e3},{id:"box-302",number:"302",sku:"Арт. 233",name:"Самозбірна коробка №302",dimensions:{length:130,width:130,height:50},basePrice:7,sourceQuantity:800},{id:"box-303",number:"303",sku:"Арт. 053",name:"Самозбірна коробка №303",dimensions:{length:190,width:150,height:100},basePrice:17,sourceQuantity:800},{id:"box-304",number:"304",sku:"Арт. 163",name:"Самозбірна коробка №304",dimensions:{length:230,width:150,height:35},basePrice:11,sourceQuantity:800},{id:"box-305",number:"305",sku:"Арт. 114",name:"Самозбірна коробка №305",dimensions:{length:160,width:85,height:110},basePrice:6.5},{id:"box-306",number:"306",sku:"Арт. 269",name:"Самозбірна коробка №306",dimensions:{length:145,width:145,height:40},basePrice:6.5,sourceQuantity:1e3},{id:"box-307",number:"307",sku:"Арт. 277",name:"Самозбірна коробка №307",dimensions:{length:280,width:180,height:100},basePrice:18,sourceQuantity:500},{id:"box-308",number:"308",sku:"Арт. 066",name:"Самозбірна коробка №308",dimensions:{length:250,width:180,height:40},basePrice:12,sourceQuantity:800},{id:"box-309",number:"309",sku:"Арт. 136",name:"Самозбірна коробка №309",dimensions:{length:210,width:150,height:50},basePrice:11,sourceQuantity:900},{id:"box-310",number:"310",sku:"Арт. 067",name:"Самозбірна коробка №310",dimensions:{length:260,width:260,height:50},basePrice:15,sourceQuantity:600},{id:"box-311",number:"311",sku:"Арт. 253",name:"Самозбірна коробка №311",dimensions:{length:370,width:170,height:100},basePrice:17},{id:"box-101",number:"101",sku:"Без артикулу",name:"Самозбірна коробка №101",dimensions:{length:178,width:115,height:48},basePrice:4,sourceQuantity:800}],ht=[{question:"Як формується ціна на сайті?",answer:"Для замовлень до 999 штук до базової ціни з прайса додається 2 грн за одиницю. Від 1000 до 50 000 штук — 1 грн. Калькулятор показує ціну за одиницю та весь тираж одразу."},{question:"Чи можна повернути коробку іншою стороною?",answer:"Так. Підбір за розміром враховує поворот предмета: сервіс порівнює три сторони предмета з трьома внутрішніми сторонами коробки."},{question:"Який матеріал використовується?",answer:"У поточному прайсі всі позиції показані в одному матеріалі — крафтовому мікрогофрокартоні. Інші матеріали не додаємо, доки власник не надасть окремі ціни."},{question:"Що отримує постійний клієнт?",answer:"Після підтвердження менеджером у кабінеті з’являється персональна фіксована ціна, нижча за публічну оптову ціну. У прототипі це працює локально в браузері."},{question:"Куди потрапляє заявка?",answer:"У цьому статичному прототипі заявка зберігається тільки у вашому браузері й одразу з’являється на локальній демо-сторінці адміністратора. Для реальної роботи потрібен backend і база даних."},{question:"Чи можна замовити більше 50 000 штук?",answer:"Калькулятор обмежений 50 000 одиниць. Більший тираж можна описати в коментарі до заявки — менеджер розрахує його окремо після запуску справжньої системи."}];function u(t){return new Intl.NumberFormat("uk-UA",{style:"currency",currency:"UAH",minimumFractionDigits:Number.isInteger(t)?0:2,maximumFractionDigits:2}).format(t)}function f(t,e){return t.basePrice+(e>=$?it:st)}function M(t,e,a){return a?.partner?t.basePrice+Math.min(Math.max(a.fixedMarkup,0),.99):f(t,e)}function tt(t){const{length:e,width:a,height:n}=t.dimensions;return e*a*n}function bt(t,e){const a=[t.length,t.width,t.height].sort((i,o)=>o-i),n=[e.length,e.width,e.height].sort((i,o)=>o-i);return a.every((i,o)=>i<=n[o])}const g={accounts:"toffipacks-demo-accounts-v2",orders:"toffipacks-demo-orders-v2",session:"toffipacks-demo-session-v2"},W=new Date().toISOString(),ot=[{id:"account-admin",name:"Адміністратор ToffiPacks",phone:"+380000000001",company:"ToffiPacks",password:"admin123",role:"admin",partner:!1,fixedMarkup:B,createdAt:W},{id:"account-partner",name:"Постійний клієнт",phone:"+380671112233",company:"Demo Coffee",password:"client123",role:"client",partner:!0,fixedMarkup:B,createdAt:W}],rt=[{id:"TP-DEMO-001",createdAt:W,customerName:"Олена",phone:"+380671112233",company:"Demo Coffee",comment:"Потрібно уточнити строк виготовлення.",productId:"box-101",productNumber:"101",dimensions:{length:178,width:115,height:48},quantity:1200,unitPrice:4.5,total:5400,priceType:"Фіксована ціна клієнта",accountId:"account-partner",status:"Нова"}];function ct(t,e){try{const a=localStorage.getItem(t);return a?JSON.parse(a):e}catch{return e}}function x(t,e){localStorage.setItem(t,JSON.stringify(e))}function vt(){localStorage.getItem(g.accounts)||x(g.accounts,ot),localStorage.getItem(g.orders)||x(g.orders,rt)}vt();let E="box-101",c=500,X="",G="size",A=null,et,k=null;const lt=document.querySelector("#app");if(!lt)throw new Error("Root element #app was not found.");function P(){return ct(g.accounts,ot)}function Q(){return ct(g.orders,rt)}function _(){const t=localStorage.getItem(g.session);return P().find(e=>e.id===t)??null}function R(){return S.find(t=>t.id===E)??S[0]}function ft(t){return Number.isFinite(t)?Math.min(H,Math.max(1,Math.round(t))):1}function J(t){let e=t.replace(/\D/g,"");return e.length===10&&e.startsWith("0")&&(e=`38${e}`),e.length===12&&e.startsWith("380")?`+${e}`:t.trim()}function F(t){return J(t).replace(/\D/g,"")}function d(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function b(t){return`${t.length} × ${t.width} × ${t.height} мм`}function j(t,e){return e?.partner?"Фіксована ціна клієнта":t>=$?"Оптова ціна":"Роздрібна ціна"}function C(t,e=!1){const{length:a,width:n,height:i}=t.dimensions,o=170+Math.min(100,a/3),s=58+Math.min(54,i/2.5),r=50+Math.min(44,n/4),l=72,p=e?70:82,v=p-r*.55,h=l+o,y=h+r,m=p+s;return`
    <svg class="box-visual${e?" box-visual--compact":""}" viewBox="0 0 470 270" role="img"
      aria-label="Схема коробки ${d(t.number)}, ${b(t.dimensions)}">
      <g class="box-visual__shape">
        <polygon class="box-visual__top" points="${l},${p} ${l+r},${v} ${y},${v} ${h},${p}" />
        <polygon class="box-visual__side" points="${h},${p} ${y},${v} ${y},${v+s} ${h},${m}" />
        <rect class="box-visual__front" x="${l}" y="${p}" width="${o}" height="${s}" />
        <rect class="box-visual__mark" x="${l+o*.35}" y="${p+s*.32}"
          width="${o*.3}" height="${Math.max(24,s*.34)}" rx="5" />
        <text class="box-visual__number" x="${l+o/2}" y="${p+s*.56}">№${t.number}</text>
      </g>
      <g class="dimension-line dimension-line--length">
        <line x1="${l}" y1="${m+28}" x2="${h}" y2="${m+28}" />
        <line x1="${l}" y1="${m+20}" x2="${l}" y2="${m+36}" />
        <line x1="${h}" y1="${m+20}" x2="${h}" y2="${m+36}" />
        <rect x="${l+o/2-38}" y="${m+12}" width="76" height="32" rx="16" />
        <text x="${l+o/2}" y="${m+33}">${a} мм</text>
      </g>
      <g class="dimension-line dimension-line--height">
        <line x1="${l-26}" y1="${p}" x2="${l-26}" y2="${m}" />
        <line x1="${l-34}" y1="${p}" x2="${l-18}" y2="${p}" />
        <line x1="${l-34}" y1="${m}" x2="${l-18}" y2="${m}" />
        <rect x="2" y="${p+s/2-16}" width="66" height="32" rx="16" />
        <text x="35" y="${p+s/2+5}">${i} мм</text>
      </g>
      <g class="dimension-line dimension-line--width">
        <line x1="${h+8}" y1="${p-8}" x2="${y+8}" y2="${v-8}" />
        <rect x="${y-54}" y="${Math.max(4,v-48)}" width="76" height="32" rx="16" />
        <text x="${y-16}" y="${Math.max(25,v-27)}">${n} мм</text>
      </g>
    </svg>
  `}function at(){return S.map(t=>`<option value="${t.id}"${t.id===E?" selected":""}>№${t.number} · ${b(t.dimensions)}</option>`).join("")}function yt(){const t=R();return`
    <div class="demo-strip" role="note">
      <span>Демо-прототип</span>
      <p>Акаунти та заявки зберігаються лише у цьому браузері. Реальної відправки немає.</p>
    </div>

    <header class="site-header" id="top">
      <a class="brand" href="#top" aria-label="ToffiPacks — на головну">
        <span class="brand__mark"><img src="./toffipacks-logo.webp" alt="" /></span>
        <span class="brand__copy"><strong>TOFFIPACKS</strong><small>самозбірні коробки</small></span>
      </a>
      <nav class="site-nav" id="site-nav" aria-label="Основна навігація">
        <a href="#catalog">Розміри</a>
        <a href="#calculator">Калькулятор</a>
        <a href="#business">Для бізнесу</a>
        <a href="#faq">FAQ</a>
      </nav>
      <div class="header-actions">
        <a class="button button--ghost button--small" id="account-button" href="#account">Кабінет</a>
        <a class="button button--primary button--small" href="#request">Залишити заявку</a>
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
            <div><dt>12</dt><dd>розмірів у прайсі</dd></div>
            <div><dt>1–50 000</dt><dd>діапазон калькулятора</dd></div>
            <div><dt>${d(U)}</dt><dd>один матеріал</dd></div>
          </dl>
        </div>

        <div class="hero__visual reveal">
          <div class="logo-stage">
            <div class="logo-stage__orbit" aria-hidden="true"></div>
            <div class="logo-stage__image">
              <img src="./toffipacks-logo.webp" alt="Логотип ToffiPacks із деревом у відбитку лапи" />
            </div>
            <div class="logo-stage__note">
              <span class="technical-label">TOFFIPACKS / 2026</span>
              <strong>Просто обрати.<br />Легко порахувати.</strong>
            </div>
          </div>
        </div>

        <div class="hero-calculator reveal" aria-label="Швидкий розрахунок">
          <div class="hero-calculator__head">
            <span class="technical-label">Швидкий розрахунок</span>
            <span class="price-rule">1–999: +${st} грн · ${$}+: +${it} грн</span>
          </div>
          <label class="field">
            <span>Коробка</span>
            <select class="select" id="hero-product-select">${at()}</select>
          </label>
          <label class="field">
            <span>Кількість</span>
            <input class="input" id="hero-quantity-input" type="number" min="1" max="${H}" value="${c}" />
          </label>
          <div class="hero-calculator__result">
            <span id="hero-price-label">Роздрібна ціна</span>
            <strong id="hero-total">${u(f(t,c)*c)}</strong>
            <small id="hero-unit">${u(f(t,c))} / шт.</small>
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
            <p class="eyebrow"><span></span> 12 позицій із прайса</p>
            <h2>Оберіть розмір,<br />не призначення.</h2>
          </div>
          <p>Усі картки побудовані за наданим прайсом ToffiPacks. Базові дані не вигадані.</p>
        </div>
        <div class="catalog-toolbar reveal">
          <label class="search-field">
            <span class="sr-only">Пошук</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"></circle><path d="m16 16 4 4"></path></svg>
            <input id="catalog-search" type="search" placeholder="Номер, артикул або розмір" autocomplete="off" />
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
          <p class="source-note">Джерело: Price_List_ToffiPacks-v3.xlsx</p>
        </div>
        <div class="product-grid" id="product-grid" aria-live="polite"></div>
      </section>

      <section class="section calculator-section" id="calculator">
        <div class="calculator-shell reveal">
          <div class="calculator-copy">
            <p class="eyebrow eyebrow--light"><span></span> Калькулятор тиражу</p>
            <h2>Від однієї коробки<br />до 50 тисяч.</h2>
            <p>
              Ціна змінюється рівно один раз — на 1000 штук. Для підтверджених
              постійних клієнтів застосовується фіксована персональна ціна.
            </p>
            <div class="price-logic">
              <div><span>1–999 шт.</span><strong>прайс + 2 грн</strong></div>
              <div><span>1 000–50 000 шт.</span><strong>прайс + 1 грн</strong></div>
              <div><span>Постійний клієнт</span><strong>фіксована ціна</strong></div>
            </div>
          </div>

          <div class="calculator-card">
            <div class="calculator-card__top">
              <span class="technical-label">Розрахунок / live</span>
              <span class="account-price-badge" id="account-price-badge">Публічна ціна</span>
            </div>
            <label class="field">
              <span>Розмір коробки</span>
              <select class="select select--large" id="calculator-product-select">${at()}</select>
            </label>
            <div class="calculator-preview" id="calculator-preview">${C(t,!0)}</div>
            <div class="quantity-block">
              <div class="quantity-block__label">
                <label for="quantity-input">Кількість</label>
                <output id="quantity-output">${c.toLocaleString("uk-UA")} шт.</output>
              </div>
              <div class="quantity-control">
                <button type="button" data-quantity-step="-100" aria-label="Зменшити кількість на 100">−</button>
                <input id="quantity-input" type="number" min="1" max="${H}" value="${c}" />
                <button type="button" data-quantity-step="100" aria-label="Збільшити кількість на 100">+</button>
              </div>
              <div class="quantity-guide" aria-label="Правила ціни">
                <span><b>1–999</b><small>прайс + 2 грн</small></span>
                <i aria-hidden="true"></i>
                <span><b>від 1 000</b><small>прайс + 1 грн</small></span>
              </div>
              <div class="quantity-presets" aria-label="Швидкий вибір кількості">
                ${[100,500,1e3,5e3,1e4,5e4].map(e=>`<button type="button" data-quantity="${e}">${e.toLocaleString("uk-UA")}</button>`).join("")}
              </div>
            </div>
            <div class="calculation-result" aria-live="polite">
              <div>
                <span id="calculator-tier">Роздрібна ціна</span>
                <strong id="calculator-unit-price">${u(f(t,c))}<small>/ шт.</small></strong>
              </div>
              <div class="calculation-result__total">
                <span>Весь тираж</span>
                <strong id="calculator-total">${u(f(t,c)*c)}</strong>
              </div>
            </div>
            <div class="threshold-note" id="threshold-note"></div>
            <a class="button button--gold button--wide" href="#request">Перенести в заявку</a>
          </div>
        </div>
      </section>

      <section class="section business-section" id="business">
        <div class="section-heading reveal">
          <div>
            <p class="eyebrow"><span></span> Постійним клієнтам</p>
            <h2>Ціна, яка не змінюється<br />від замовлення до замовлення.</h2>
          </div>
          <p>Персональні умови прив’язуються до акаунта після підтвердження менеджером.</p>
        </div>
        <div class="business-grid">
          <article class="business-card reveal">
            <span class="business-card__number">01</span>
            <h3>Реєстрація</h3>
            <p>Клієнт створює кабінет із контактами компанії. Новий профіль одразу видно в локальній демо-адмінці.</p>
          </article>
          <article class="business-card reveal">
            <span class="business-card__number">02</span>
            <h3>Підтвердження</h3>
            <p>Менеджер позначає клієнта як постійного та задає фіксовану націнку нижче публічної оптової.</p>
          </article>
          <article class="business-card business-card--accent reveal">
            <span class="business-card__number">03</span>
            <h3>Своя ціна</h3>
            <p>Після входу каталог, калькулятор і заявка автоматично працюють за персональною ціною.</p>
            <a class="text-link text-link--light" id="business-account-button" href="#account">Відкрити кабінет <span>→</span></a>
          </article>
        </div>
      </section>

      <section class="section request-section" id="request">
        <div class="request-copy reveal">
          <p class="eyebrow"><span></span> Заявка на замовлення</p>
          <h2>Залиште номер —<br />менеджер уточнить деталі.</h2>
          <p>
            Тут немає вигаданих телефонів ToffiPacks. Клієнт залишає свої контакти,
            а заявка з’являється в демо-адмінці.
          </p>
          <div class="request-summary" id="request-summary"></div>
          <div class="local-warning">
            <strong>Важливо</strong>
            <p>На GitHub Pages дані не передаються власнику. Вони зберігаються локально для демонстрації сценарію.</p>
          </div>
        </div>
        <form class="request-form reveal" id="request-form" novalidate>
          <div class="request-form__head">
            <span class="technical-label">Нова заявка</span>
            <span id="request-account-hint">Без акаунта</span>
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
            <span>Погоджуюся на локальну обробку введених даних у цьому демо *</span>
          </label>
          <div class="form-status" id="request-status" aria-live="polite"></div>
          <button class="button button--primary button--wide" type="submit">
            Зберегти демо-заявку
          </button>
        </form>
      </section>

      <section class="section faq-section" id="faq">
        <div class="faq-intro reveal">
          <p class="eyebrow"><span></span> FAQ / 06</p>
          <h2>Коротко про ціни,<br />розміри й акаунти.</h2>
          <p>Тільки те, що вже визначено прайсом і логікою прототипу.</p>
        </div>
        <div class="faq-list reveal">
          ${ht.map((e,a)=>`
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
        <a href="#request">Заявка</a>
        <a href="#admin">Демо-адмінка</a>
      </div>
      <div class="footer-meta">
        <p>Контакти, умови доставки та строки потрібні від власника.</p>
        <span>© 2026 ToffiPacks · demo</span>
      </div>
    </footer>

    <section class="admin-page" id="admin-page" hidden aria-labelledby="admin-title">
      <header class="admin-header">
        <a class="brand" href="#top">
          <span class="brand__mark"><img src="./toffipacks-logo.webp" alt="" /></span>
          <span class="brand__copy"><strong>TOFFIPACKS</strong><small>локальна демо-адмінка</small></span>
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
  `}lt.innerHTML=yt();const O=document.querySelector("#product-grid"),z=document.querySelector("#catalog-count");function $t(t){const e=_(),a=f(t,1),n=f(t,$),i=e?.partner?M(t,1,e):null;return`
    <article
      class="product-card${t.id===E?" is-selected":""}"
      data-open-product="${t.id}"
      tabindex="0"
      role="button"
      aria-label="Відкрити коробку №${t.number}, ${b(t.dimensions)}"
    >
      <div class="product-card__head">
        <div>
          <span class="product-card__number">№${t.number}</span>
          <span class="product-card__sku">${d(t.sku)}</span>
        </div>
        <span class="material-dot" title="${d(U)}"></span>
      </div>
      <div class="product-card__visual">${C(t,!0)}</div>
      <h3>${b(t.dimensions)}</h3>
      <p>${d(U)}</p>
      <div class="product-card__prices">
        ${i!==null?`<div class="partner-price"><span>Ваша фіксована</span><strong>${u(i)}<small>/шт.</small></strong></div>`:`
              <div><span>1–999 шт.</span><strong>${u(a)}</strong></div>
              <div><span>від 1000 шт.</span><strong>${u(n)}</strong></div>
            `}
      </div>
      <button class="button button--card" type="button" data-open-product="${t.id}">
        ${t.id===E?"Відкрити обрану коробку":"Детальніше й розрахувати"}
      </button>
    </article>
  `}function qt(t){const e=_(),a=M(t,c,e),n=a*c;return`
    <div class="product-modal">
      <div class="product-modal__visual">
        <div class="product-modal__labels">
          <span>№${t.number}</span>
          <small>${d(t.sku)}</small>
        </div>
        <div class="product-modal__drawing">${C(t,!0)}</div>
        <p>Внутрішній розмір · Д × Ш × В</p>
      </div>
      <div class="product-modal__content">
        <p class="eyebrow"><span></span> Коробка з прайса</p>
        <h2 id="product-dialog-title">${b(t.dimensions)}</h2>
        <p class="product-modal__material">${d(U)}</p>

        <div class="product-modal__rules">
          <div><span>1–999 шт.</span><strong>${u(f(t,1))} / шт.</strong></div>
          <div><span>від 1 000 шт.</span><strong>${u(f(t,$))} / шт.</strong></div>
        </div>

        <div class="quantity-block quantity-block--modal">
          <div class="quantity-block__label">
            <label for="modal-quantity-input">Кількість</label>
            <output id="modal-quantity-output">${c.toLocaleString("uk-UA")} шт.</output>
          </div>
          <div class="quantity-control">
            <button type="button" data-quantity-step="-100" aria-label="Зменшити кількість на 100">−</button>
            <input id="modal-quantity-input" type="number" min="1" max="${H}" value="${c}" />
            <button type="button" data-quantity-step="100" aria-label="Збільшити кількість на 100">+</button>
          </div>
          <div class="quantity-presets quantity-presets--modal" aria-label="Швидкий вибір кількості">
            ${[100,500,1e3,5e3,1e4,5e4].map(i=>`<button type="button" data-quantity="${i}">${i.toLocaleString("uk-UA")}</button>`).join("")}
          </div>
        </div>

        <div class="product-modal__total" aria-live="polite">
          <div><span id="modal-price-tier">${j(c,e)}</span><strong id="modal-unit-price">${u(a)} / шт.</strong></div>
          <div><span>Весь тираж</span><strong id="modal-total">${u(n)}</strong></div>
        </div>

        <div class="product-modal__actions">
          <button class="button button--primary" type="button" data-product-to-request>Перенести в заявку</button>
          <button class="button button--ghost" type="button" data-product-to-calculator>Відкрити калькулятор</button>
        </div>
      </div>
    </div>
  `}function dt(){const t=document.querySelector("#product-dialog");if(!t?.open||!k)return;const e=S.find(p=>p.id===k);if(!e)return;const a=_(),n=M(e,c,a),i=t.querySelector("#modal-quantity-input");i&&(i.value=String(c));const o=t.querySelector("#modal-quantity-output");o&&(o.value=`${c.toLocaleString("uk-UA")} шт.`);const s=t.querySelector("#modal-price-tier");s&&(s.textContent=j(c,a));const r=t.querySelector("#modal-unit-price");r&&(r.textContent=`${u(n)} / шт.`);const l=t.querySelector("#modal-total");l&&(l.textContent=u(n*c)),t.querySelectorAll("[data-quantity]").forEach(p=>{p.classList.toggle("is-active",Number(p.dataset.quantity)===c)})}function ut(t){const e=S.find(i=>i.id===t),a=document.querySelector("#product-dialog"),n=document.querySelector("#product-dialog-content");!e||!a||!n||(k=e.id,Y(e.id),n.innerHTML=qt(e),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),dt())}function wt(){const t=X.trim().toLocaleLowerCase("uk-UA");return S.filter(a=>{const n=`${a.number} ${a.sku} ${a.name} ${b(a.dimensions)}`.toLocaleLowerCase("uk-UA"),i=!t||n.includes(t),o=!A||bt(A,a.dimensions);return i&&o}).sort((a,n)=>G==="price"?a.basePrice-n.basePrice:G==="number"?Number(a.number)-Number(n.number):tt(a)-tt(n))}function q(t=!1){if(!O||!z)return;if(t){z.textContent="Оновлюємо список…",O.innerHTML=Array.from({length:6},()=>'<div class="product-skeleton" aria-hidden="true"><i></i><i></i><i></i></div>').join("");return}const e=wt(),a=A?` · предмет ${b(A)}`:"";if(z.textContent=`${e.length} із ${S.length} розмірів${a}`,!e.length){O.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__box" aria-hidden="true"></div>
        <h3>Готового розміру немає.</h3>
        <p>Змініть габарити предмета або залиште заявку з потрібним розміром.</p>
        <a class="button button--primary" href="#request">Описати свій розмір</a>
      </div>
    `;return}O.innerHTML=e.map($t).join("")}function K(){window.clearTimeout(et),q(!0),et=window.setTimeout(()=>q(!1),320)}function L(){const t=R(),e=_(),a=M(t,c,e),n=a*c,i=j(c,e);document.querySelectorAll("#calculator-product-select, #hero-product-select").forEach(w=>{w.value=t.id}),document.querySelectorAll("#quantity-input, #hero-quantity-input, #modal-quantity-input").forEach(w=>{w.value=String(c)});const o=document.querySelector("#quantity-output");o&&(o.value=`${c.toLocaleString("uk-UA")} шт.`);const s=document.querySelector("#calculator-preview");s&&(s.classList.remove("is-changing"),s.offsetWidth,s.classList.add("is-changing"),s.innerHTML=C(t,!0));const r=document.querySelector("#calculator-tier");r&&(r.textContent=i);const l=document.querySelector("#calculator-unit-price");l&&(l.innerHTML=`${u(a)}<small>/ шт.</small>`);const p=document.querySelector("#calculator-total");p&&(p.textContent=u(n));const v=document.querySelector("#hero-price-label");v&&(v.textContent=i);const h=document.querySelector("#hero-total");h&&(h.textContent=u(n));const y=document.querySelector("#hero-unit");y&&(y.textContent=`${u(a)} / шт.`);const m=document.querySelector("#account-price-badge");m&&(m.textContent=e?.partner?"Персональна ціна активна":"Публічна ціна",m.classList.toggle("is-partner",!!e?.partner));const N=document.querySelector("#threshold-note");if(N)if(e?.partner)N.innerHTML=`<strong>Фіксована ціна:</strong> ${u(a)} за одиницю незалежно від тиражу.`;else if(c<$){const w=$-c,gt=f(t,$)*$;N.innerHTML=`Ще <strong>${w.toLocaleString("uk-UA")} шт.</strong> до оптового тарифу. 1000 шт. коштуватимуть ${u(gt)}.`}else N.innerHTML=`<strong>Оптовий тариф активний.</strong> Економія проти роздрібної ціни — ${u(c)} на всьому тиражі.`;const Z=document.querySelector("#request-summary");Z&&(Z.innerHTML=`
      <span class="technical-label">Поточний розрахунок</span>
      <strong>Коробка №${t.number}</strong>
      <p>${b(t.dimensions)} · ${c.toLocaleString("uk-UA")} шт.</p>
      <div><span>${i}</span><b>${u(n)}</b></div>
    `),document.querySelectorAll("[data-quantity]").forEach(w=>{w.classList.toggle("is-active",Number(w.dataset.quantity)===c)}),dt()}function Y(t,e=!1){S.some(a=>a.id===t)&&(E=t,q(!1),L(),e&&document.querySelector("#calculator")?.scrollIntoView({behavior:"smooth",block:"start"}))}function I(t){c=ft(t),L()}function D(){const t=document.querySelector("#account-button"),e=_();if(!t)return;t.textContent=e?e.name.split(" ")[0]:"Кабінет",t.classList.toggle("is-signed-in",!!e);const a=document.querySelector("#request-account-hint");a&&(a.textContent=e?`${e.name}${e.partner?" · партнер":""}`:"Без акаунта");const n=document.querySelector("#request-form");if(n&&e){const i=(o,s)=>{const r=n.elements.namedItem(o);r instanceof HTMLInputElement&&!r.value&&(r.value=s)};i("name",e.name),i("phone",e.phone),i("company",e.company)}}function St(){const t=_();if(t){const e=Q().filter(r=>r.accountId===t.id).slice().reverse(),a=e.filter(r=>r.status!=="Закрита").length,n=e.reduce((r,l)=>r+l.total,0),i=t.name.split(/\s+/).filter(Boolean).slice(0,2).map(r=>r[0]).join("").toLocaleUpperCase("uk-UA"),o=R(),s=M(o,c,t);return`
      <div class="account-dashboard">
        <section class="account-dashboard__hero">
          <div class="account-identity">
            <span class="account-avatar">${d(i||"TP")}</span>
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
            <span>Ваші умови</span>
            <strong>${t.partner?`Базова ціна + ${t.fixedMarkup.toFixed(2)} грн`:"Публічний тариф"}</strong>
            <p>${t.partner?"Фіксована ціна застосовується автоматично в каталозі та калькуляторі.":"Менеджер може активувати персональну ціну для постійного клієнта."}</p>
          </div>
        </section>

        <div class="account-kpis">
          <article><span>Усі заявки</span><strong>${e.length}</strong><small>у цьому браузері</small></article>
          <article><span>Активні</span><strong>${a}</strong><small>потребують уваги</small></article>
          <article><span>Сума заявок</span><strong>${u(n)}</strong><small>демонстраційний підсумок</small></article>
        </div>

        <div class="account-dashboard__grid">
          <section class="account-orders-panel">
            <div class="account-panel-heading">
              <div><p class="eyebrow"><span></span> Історія</p><h2>Мої заявки</h2></div>
              <a class="text-link" href="#request">Нова заявка <span>→</span></a>
            </div>
            <div class="account-order-list">
              ${e.length?e.map(r=>`
                          <article class="account-order">
                            <div class="account-order__main">
                              <span>${d(r.id)}</span>
                              <strong>Коробка №${d(r.productNumber)}</strong>
                              <small>${b(r.dimensions)} · ${r.quantity.toLocaleString("uk-UA")} шт.</small>
                            </div>
                            <div class="account-order__price"><strong>${u(r.total)}</strong><small>${u(r.unitPrice)} / шт.</small></div>
                            <div class="account-order__meta"><span>${d(r.status)}</span><time datetime="${r.createdAt}">${new Date(r.createdAt).toLocaleDateString("uk-UA")}</time></div>
                          </article>
                        `).join(""):'<div class="account-empty"><strong>Заявок ще немає.</strong><p>Оберіть розмір, порахуйте тираж і збережіть першу заявку.</p><a class="button button--primary" href="#catalog">До каталогу</a></div>'}
            </div>
          </section>

          <aside class="account-sidebar">
            <article class="account-quick-order">
              <p class="technical-label">Швидкий розрахунок</p>
              <div class="account-quick-order__box">${C(o,!1)}</div>
              <span>Коробка №${o.number}</span>
              <h3>${b(o.dimensions)}</h3>
              <div><span>${c.toLocaleString("uk-UA")} шт.</span><strong>${u(s*c)}</strong></div>
              <a class="button button--gold button--wide" href="#calculator">Змінити розрахунок</a>
            </article>
            <article class="account-profile-card">
              <div><p class="technical-label">Профіль</p><a href="#account">Дані клієнта</a></div>
              <dl>
                <div><dt>Телефон</dt><dd>${d(t.phone)}</dd></div>
                <div><dt>Компанія</dt><dd>${d(t.company||"Не вказано")}</dd></div>
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
        <div class="demo-access">
          <strong>Демо-доступ</strong>
          <p>Клієнт: +380671112233 / client123</p>
          <p>Адмін: +380000000001 / admin123</p>
        </div>
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
  `}function V(){const t=document.querySelector("#account-page-content");t&&(t.innerHTML=St())}function pt(t,e,a){const n=t.querySelector("[data-auth-status]");n&&(n.textContent=e,n.className=`form-status is-${a}`)}function _t(t,e){const a=F(t),n=P().find(i=>F(i.phone)===a&&i.password===e);return n?(localStorage.setItem(g.session,n.id),n):null}function nt(t,e=!1){if(t.classList.add("was-validated"),!t.reportValidity())return;const a=new FormData(t),n=_t(String(a.get("phone")??""),String(a.get("password")??""));if(!n||e&&n.role!=="admin"){pt(t,e?"Потрібен демо-акаунт адміністратора.":"Невірний телефон або пароль.","error");return}D(),L(),q(!1),e?T():(V(),window.location.hash="account")}function xt(t){if(t.classList.add("was-validated"),!t.reportValidity())return;const e=new FormData(t),a=J(String(e.get("phone")??"")),n=P();if(n.some(o=>F(o.phone)===F(a))){pt(t,"Акаунт із таким номером уже існує.","error");return}const i={id:`account-${Date.now().toString(36)}`,name:String(e.get("name")??"").trim(),phone:a,company:String(e.get("company")??"").trim(),password:String(e.get("password")??""),role:"client",partner:!1,fixedMarkup:B,createdAt:new Date().toISOString()};n.push(i),x(g.accounts,n),localStorage.setItem(g.session,i.id),D(),L(),q(!1),V(),window.location.hash="account"}function kt(t){const e=document.querySelector("#request-status");if(t.classList.add("was-validated"),!t.reportValidity()){e&&(e.className="form-status is-error",e.textContent="Перевірте обов’язкові поля та згоду.");return}const a=new FormData(t),n=R(),i=_(),o=M(n,c,i),s={id:`TP-${Date.now().toString(36).toUpperCase()}`,createdAt:new Date().toISOString(),customerName:String(a.get("name")??"").trim(),phone:J(String(a.get("phone")??"")),company:String(a.get("company")??"").trim(),comment:String(a.get("comment")??"").trim(),productId:n.id,productNumber:n.number,dimensions:n.dimensions,quantity:c,unitPrice:o,total:o*c,priceType:j(c,i),accountId:i?.id,status:"Нова"},r=Q();r.push(s),x(g.orders,r),e&&(e.className="form-status is-success",e.innerHTML=`<strong>Заявку ${s.id} збережено локально.</strong><span>Вона вже доступна у демо-адмінці цього браузера.</span>`),t.querySelector('button[type="submit"]')?.focus()}function Lt(t){return["Нова","У роботі","Уточнення","Підтверджена","Закрита"].map(a=>`<option value="${a}"${a===t?" selected":""}>${a}</option>`).join("")}function T(){const t=document.querySelector("#admin-content");if(!t)return;const e=_();if(!e||e.role!=="admin"){t.innerHTML=`
      <div class="admin-login">
        <p class="eyebrow"><span></span> Захищений демо-розділ</p>
        <h1 id="admin-title">Вхід для менеджера.</h1>
        <p>У реальному продукті тут потрібні серверна авторизація, права доступу та база даних.</p>
        <form id="admin-login-form" class="auth-form" novalidate>
          <label class="field"><span>Телефон</span><input class="input" name="phone" type="tel" value="+380000000001" required /></label>
          <label class="field"><span>Пароль</span><input class="input" name="password" type="password" value="admin123" required /></label>
          <div class="form-status" data-auth-status aria-live="polite"></div>
          <button class="button button--primary button--wide" type="submit">Увійти в демо-адмінку</button>
        </form>
      </div>
    `;return}const a=Q().slice().reverse(),n=P().filter(s=>s.role==="client"),i=a.filter(s=>s.status!=="Закрита").length,o=a.reduce((s,r)=>s+r.total,0);t.innerHTML=`
    <div class="admin-shell">
      <div class="admin-title-row">
        <div>
          <p class="eyebrow"><span></span> Локальна демо-адмінка</p>
          <h1 id="admin-title">Заявки та клієнти.</h1>
        </div>
        <div>
          <span>${d(e.phone)}</span>
          <button class="text-link" id="admin-logout" type="button">Вийти</button>
        </div>
      </div>
      <div class="admin-warning">
        Це демонстрація в localStorage. Заявки з інших браузерів і пристроїв сюди не потрапляють.
      </div>
      <div class="admin-stats">
        <article><span>Усі заявки</span><strong>${a.length}</strong></article>
        <article><span>Активні</span><strong>${i}</strong></article>
        <article><span>Клієнти</span><strong>${n.length}</strong></article>
        <article><span>Сума демо-заявок</span><strong>${u(o)}</strong></article>
      </div>
      <section class="admin-section">
        <div class="admin-section__head"><h2>Заявки</h2><span>${a.length} записів</span></div>
        <div class="orders-list">
          ${a.length?a.map(s=>`
                      <article class="order-card">
                        <div class="order-card__top">
                          <div><span>${d(s.id)}</span><strong>${d(s.customerName)}</strong></div>
                          <select class="select status-select" data-order-status="${d(s.id)}">${Lt(s.status)}</select>
                        </div>
                        <div class="order-card__grid">
                          <div><span>Контакт</span><a href="tel:${d(s.phone)}">${d(s.phone)}</a><small>Телефон клієнта</small></div>
                          <div><span>Коробка</span><strong>№${d(s.productNumber)}</strong><small>${b(s.dimensions)}</small></div>
                          <div><span>Тираж</span><strong>${s.quantity.toLocaleString("uk-UA")} шт.</strong><small>${d(s.priceType)}</small></div>
                          <div><span>Сума</span><strong>${u(s.total)}</strong><small>${u(s.unitPrice)} / шт.</small></div>
                        </div>
                        ${s.company||s.comment?`<p class="order-card__comment">${d(s.company)}${s.company&&s.comment?" · ":""}${d(s.comment)}</p>`:""}
                        <time datetime="${s.createdAt}">${new Date(s.createdAt).toLocaleString("uk-UA")}</time>
                      </article>
                    `).join(""):'<div class="empty-state"><h3>Заявок ще немає.</h3><p>Створіть тестову заявку на головній сторінці.</p></div>'}
        </div>
      </section>
      <section class="admin-section">
        <div class="admin-section__head"><h2>Клієнти й фіксовані ціни</h2><span>Максимум +0,99 грн до базової</span></div>
        <div class="clients-table">
          <div class="clients-table__head"><span>Клієнт</span><span>Статус</span><span>Фіксована націнка</span></div>
          ${n.map(s=>`
                <div class="client-row">
                  <div><strong>${d(s.name)}</strong><span>${d(s.company||"Без компанії")}</span><a href="tel:${d(s.phone)}">${d(s.phone)}</a></div>
                  <label class="partner-toggle"><input type="checkbox" data-partner-toggle="${s.id}"${s.partner?" checked":""} /><span>${s.partner?"Постійний":"Новий"}</span></label>
                  <label class="markup-control"><input class="input" type="number" min="0" max="0.99" step="0.01" value="${s.fixedMarkup.toFixed(2)}" data-partner-markup="${s.id}"${s.partner?"":" disabled"} /><span>грн</span></label>
                </div>
              `).join("")}
        </div>
      </section>
    </div>
  `}function mt(){const t=document.querySelector("#admin-page"),e=document.querySelector("#account-page"),a=document.querySelector("#main"),n=document.querySelector(".site-header"),i=document.querySelector(".site-footer"),o=document.querySelector(".demo-strip"),s=window.location.hash==="#admin",r=window.location.hash==="#account";t&&(t.hidden=!s),e&&(e.hidden=!r),a&&(a.hidden=s||r),n&&(n.hidden=s||r),i&&(i.hidden=s||r),o&&(o.hidden=s||r),document.body.classList.toggle("is-admin",s),document.body.classList.toggle("is-account",r),s?(T(),window.scrollTo({top:0})):r&&(V(),window.scrollTo({top:0}))}function Tt(){const t=document.querySelectorAll(".reveal");if(!("IntersectionObserver"in window)){t.forEach(a=>a.classList.add("is-visible"));return}const e=new IntersectionObserver(a=>{a.forEach(n=>{n.isIntersecting&&(n.target.classList.add("is-visible"),e.unobserve(n.target))})},{threshold:.12});t.forEach(a=>e.observe(a))}document.querySelector("#menu-button")?.addEventListener("click",t=>{const e=t.currentTarget,a=document.querySelector("#site-nav"),n=e.getAttribute("aria-expanded")!=="true";e.setAttribute("aria-expanded",String(n)),a?.classList.toggle("is-open",n)});document.querySelectorAll(".site-nav a").forEach(t=>{t.addEventListener("click",()=>{document.querySelector("#site-nav")?.classList.remove("is-open"),document.querySelector("#menu-button")?.setAttribute("aria-expanded","false")})});document.querySelector("#fit-form")?.addEventListener("submit",t=>{t.preventDefault();const e=t.currentTarget;e.classList.add("was-validated");const a=document.querySelector("#fit-message");if(!e.reportValidity()){a&&(a.textContent="Вкажіть три додатні розміри.",a.className="form-message is-error");return}const n=new FormData(e);A={length:Number(n.get("length")),width:Number(n.get("width")),height:Number(n.get("height"))},a&&(a.textContent="Розміри застосовано. Показуємо коробки нижче.",a.className="form-message is-success"),K(),window.setTimeout(()=>document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth"}),180)});document.querySelector("#catalog-search")?.addEventListener("input",t=>{X=t.currentTarget.value,K()});document.querySelector("#catalog-sort")?.addEventListener("change",t=>{G=t.currentTarget.value,K()});document.querySelector("#reset-catalog")?.addEventListener("click",()=>{A=null,X="";const t=document.querySelector("#catalog-search");t&&(t.value="");const e=document.querySelector("#fit-message");e&&(e.textContent=""),K()});document.querySelector("#calculator-product-select")?.addEventListener("change",t=>{Y(t.currentTarget.value)});document.querySelector("#hero-product-select")?.addEventListener("change",t=>{Y(t.currentTarget.value)});document.querySelector("#quantity-input")?.addEventListener("input",t=>{I(Number(t.currentTarget.value))});document.querySelector("#hero-quantity-input")?.addEventListener("input",t=>{I(Number(t.currentTarget.value))});document.querySelector("#request-form")?.addEventListener("submit",t=>{t.preventDefault(),kt(t.currentTarget)});document.addEventListener("click",t=>{const e=t.target,a=e.closest("[data-open-product]");if(a?.dataset.openProduct){ut(a.dataset.openProduct);return}const n=e.closest("[data-quantity]");if(n?.dataset.quantity){I(Number(n.dataset.quantity));return}const i=e.closest("[data-quantity-step]");if(i?.dataset.quantityStep){I(c+Number(i.dataset.quantityStep));return}if(e.closest("[data-product-to-request]")){document.querySelector("#product-dialog")?.close(),k=null,window.location.hash="request",document.querySelector("#request")?.scrollIntoView({behavior:"smooth",block:"start"});return}if(e.closest("[data-product-to-calculator]")){document.querySelector("#product-dialog")?.close(),k=null,window.location.hash="calculator",document.querySelector("#calculator")?.scrollIntoView({behavior:"smooth",block:"start"});return}const o=e.closest("[data-close-dialog]");if(o){o.closest("dialog")?.close(),k=null;return}const s=e.closest("[data-auth-tab]");if(s?.dataset.authTab){const r=s.closest(".auth-forms");r?.querySelectorAll("[data-auth-tab]").forEach(l=>{const p=l.dataset.authTab===s.dataset.authTab;l.classList.toggle("is-active",p),l.setAttribute("aria-selected",String(p))}),r?.querySelectorAll("[data-auth-panel]").forEach(l=>{l.hidden=l.dataset.authPanel!==s.dataset.authTab});return}if(e.closest("#logout-button")){localStorage.removeItem(g.session),D(),L(),q(!1),V();return}e.closest("#admin-logout")&&(localStorage.removeItem(g.session),D(),L(),q(!1),T())});document.addEventListener("input",t=>{const e=t.target;e instanceof HTMLInputElement&&e.id==="modal-quantity-input"&&I(Number(e.value))});document.addEventListener("keydown",t=>{if(t.key!=="Enter"&&t.key!==" ")return;const e=t.target;!(e instanceof HTMLElement)||!e.matches(".product-card")||(t.preventDefault(),e.dataset.openProduct&&ut(e.dataset.openProduct))});document.addEventListener("submit",t=>{const e=t.target;e instanceof HTMLFormElement&&(e.id==="login-form"?(t.preventDefault(),nt(e)):e.id==="register-form"?(t.preventDefault(),xt(e)):e.id==="admin-login-form"&&(t.preventDefault(),nt(e,!0)))});document.addEventListener("change",t=>{const e=t.target;if(e instanceof HTMLInputElement||e instanceof HTMLSelectElement){if(e instanceof HTMLSelectElement&&e.dataset.orderStatus){const a=Q(),n=a.find(i=>i.id===e.dataset.orderStatus);n&&(n.status=e.value,x(g.orders,a),T());return}if(e instanceof HTMLInputElement&&e.dataset.partnerToggle){const a=P(),n=a.find(i=>i.id===e.dataset.partnerToggle);n&&(n.partner=e.checked,x(g.accounts,a),T());return}if(e instanceof HTMLInputElement&&e.dataset.partnerMarkup){const a=P(),n=a.find(i=>i.id===e.dataset.partnerMarkup);n&&(n.fixedMarkup=Math.min(.99,Math.max(0,Number(e.value)||0)),x(g.accounts,a),T())}}});document.querySelector("#product-dialog")?.addEventListener("click",t=>{t.target===t.currentTarget&&(t.currentTarget.close(),k=null)});window.addEventListener("hashchange",mt);q(!0);window.setTimeout(()=>q(!1),460);L();D();mt();Tt();
