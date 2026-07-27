(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=a(i);fetch(i.href,o)}})();const O="Мікрогофрокартон, крафт",H=5e4,y=1e3,st=2,it=1,z=.5,S=[{id:"box-301",number:"301",sku:"Арт. 294",name:"Самозбірна коробка №301",dimensions:{length:165,width:100,height:30},basePrice:5,sourceQuantity:1e3},{id:"box-302",number:"302",sku:"Арт. 233",name:"Самозбірна коробка №302",dimensions:{length:130,width:130,height:50},basePrice:7,sourceQuantity:800},{id:"box-303",number:"303",sku:"Арт. 053",name:"Самозбірна коробка №303",dimensions:{length:190,width:150,height:100},basePrice:17,sourceQuantity:800},{id:"box-304",number:"304",sku:"Арт. 163",name:"Самозбірна коробка №304",dimensions:{length:230,width:150,height:35},basePrice:11,sourceQuantity:800},{id:"box-305",number:"305",sku:"Арт. 114",name:"Самозбірна коробка №305",dimensions:{length:160,width:85,height:110},basePrice:6.5},{id:"box-306",number:"306",sku:"Арт. 269",name:"Самозбірна коробка №306",dimensions:{length:145,width:145,height:40},basePrice:6.5,sourceQuantity:1e3},{id:"box-307",number:"307",sku:"Арт. 277",name:"Самозбірна коробка №307",dimensions:{length:280,width:180,height:100},basePrice:18,sourceQuantity:500},{id:"box-308",number:"308",sku:"Арт. 066",name:"Самозбірна коробка №308",dimensions:{length:250,width:180,height:40},basePrice:12,sourceQuantity:800},{id:"box-309",number:"309",sku:"Арт. 136",name:"Самозбірна коробка №309",dimensions:{length:210,width:150,height:50},basePrice:11,sourceQuantity:900},{id:"box-310",number:"310",sku:"Арт. 067",name:"Самозбірна коробка №310",dimensions:{length:260,width:260,height:50},basePrice:15,sourceQuantity:600},{id:"box-311",number:"311",sku:"Арт. 253",name:"Самозбірна коробка №311",dimensions:{length:370,width:170,height:100},basePrice:17},{id:"box-101",number:"101",sku:"Без артикулу",name:"Самозбірна коробка №101",dimensions:{length:178,width:115,height:48},basePrice:4,sourceQuantity:800}],gt=[{question:"Як формується ціна на сайті?",answer:"Для замовлень до 999 штук до базової ціни з прайса додається 2 грн за одиницю. Від 1000 до 50 000 штук — 1 грн. Калькулятор показує ціну за одиницю та весь тираж одразу."},{question:"Чи можна повернути коробку іншою стороною?",answer:"Так. Підбір за розміром враховує поворот предмета: сервіс порівнює три сторони предмета з трьома внутрішніми сторонами коробки."},{question:"Який матеріал використовується?",answer:"У поточному прайсі всі позиції показані в одному матеріалі — крафтовому мікрогофрокартоні. Інші матеріали не додаємо, доки власник не надасть окремі ціни."},{question:"Що отримує постійний клієнт?",answer:"Після підтвердження менеджером у кабінеті з’являється персональна фіксована ціна, нижча за публічну оптову ціну. У прототипі це працює локально в браузері."},{question:"Куди потрапляє заявка?",answer:"У цьому статичному прототипі заявка зберігається тільки у вашому браузері й одразу з’являється на локальній демо-сторінці адміністратора. Для реальної роботи потрібен backend і база даних."},{question:"Чи можна замовити більше 50 000 штук?",answer:"Калькулятор обмежений 50 000 одиниць. Більший тираж можна описати в коментарі до заявки — менеджер розрахує його окремо після запуску справжньої системи."}];function p(t){return new Intl.NumberFormat("uk-UA",{style:"currency",currency:"UAH",minimumFractionDigits:Number.isInteger(t)?0:2,maximumFractionDigits:2}).format(t)}function v(t,e){return t.basePrice+(e>=y?it:st)}function D(t,e,a){return a?.partner?t.basePrice+Math.min(Math.max(a.fixedMarkup,0),.99):v(t,e)}function tt(t){const{length:e,width:a,height:n}=t.dimensions;return e*a*n}function bt(t,e){const a=[t.length,t.width,t.height].sort((i,o)=>o-i),n=[e.length,e.width,e.height].sort((i,o)=>o-i);return a.every((i,o)=>i<=n[o])}const h={accounts:"toffipacks-demo-accounts-v2",orders:"toffipacks-demo-orders-v2",session:"toffipacks-demo-session-v2"},B=new Date().toISOString(),ot=[{id:"account-admin",name:"Адміністратор ToffiPacks",phone:"+380000000001",company:"ToffiPacks",password:"admin123",role:"admin",partner:!1,fixedMarkup:z,createdAt:B},{id:"account-partner",name:"Постійний клієнт",phone:"+380671112233",company:"Demo Coffee",password:"client123",role:"client",partner:!0,fixedMarkup:z,createdAt:B}],rt=[{id:"TP-DEMO-001",createdAt:B,customerName:"Олена",phone:"+380671112233",company:"Demo Coffee",comment:"Потрібно уточнити строк виготовлення.",productId:"box-101",productNumber:"101",dimensions:{length:178,width:115,height:48},quantity:1200,unitPrice:4.5,total:5400,priceType:"Фіксована ціна клієнта",accountId:"account-partner",status:"Нова"}];function ct(t,e){try{const a=localStorage.getItem(t);return a?JSON.parse(a):e}catch{return e}}function x(t,e){localStorage.setItem(t,JSON.stringify(e))}function vt(){localStorage.getItem(h.accounts)||x(h.accounts,ot),localStorage.getItem(h.orders)||x(h.orders,rt)}vt();let M="box-101",r=500,G="",W="size",A=null,et,L=null;const lt=document.querySelector("#app");if(!lt)throw new Error("Root element #app was not found.");function P(){return ct(h.accounts,ot)}function F(){return ct(h.orders,rt)}function _(){const t=localStorage.getItem(h.session);return P().find(e=>e.id===t)??null}function X(){return S.find(t=>t.id===M)??S[0]}function ft(t){return Number.isFinite(t)?Math.min(H,Math.max(1,Math.round(t))):1}function J(t){let e=t.replace(/\D/g,"");return e.length===10&&e.startsWith("0")&&(e=`38${e}`),e.length===12&&e.startsWith("380")?`+${e}`:t.trim()}function U(t){return J(t).replace(/\D/g,"")}function d(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function $(t){return`${t.length} × ${t.width} × ${t.height} мм`}function Q(t,e){return e?.partner?"Фіксована ціна клієнта":t>=y?"Оптова ціна":"Роздрібна ціна"}function R(t,e=!1){const{length:a,width:n,height:i}=t.dimensions,o=170+Math.min(100,a/3),s=58+Math.min(54,i/2.5),l=50+Math.min(44,n/4),c=72,u=e?70:82,b=u-l*.55,g=c+o,f=g+l,m=u+s;return`
    <svg class="box-visual${e?" box-visual--compact":""}" viewBox="0 0 470 270" role="img"
      aria-label="Схема коробки ${d(t.number)}, ${$(t.dimensions)}">
      <g class="box-visual__shape">
        <polygon class="box-visual__top" points="${c},${u} ${c+l},${b} ${f},${b} ${g},${u}" />
        <polygon class="box-visual__side" points="${g},${u} ${f},${b} ${f},${b+s} ${g},${m}" />
        <rect class="box-visual__front" x="${c}" y="${u}" width="${o}" height="${s}" />
        <rect class="box-visual__mark" x="${c+o*.35}" y="${u+s*.32}"
          width="${o*.3}" height="${Math.max(24,s*.34)}" rx="5" />
        <text class="box-visual__number" x="${c+o/2}" y="${u+s*.56}">№${t.number}</text>
      </g>
      <g class="dimension-line dimension-line--length">
        <line x1="${c}" y1="${m+28}" x2="${g}" y2="${m+28}" />
        <line x1="${c}" y1="${m+20}" x2="${c}" y2="${m+36}" />
        <line x1="${g}" y1="${m+20}" x2="${g}" y2="${m+36}" />
        <rect x="${c+o/2-38}" y="${m+12}" width="76" height="32" rx="16" />
        <text x="${c+o/2}" y="${m+33}">${a} мм</text>
      </g>
      <g class="dimension-line dimension-line--height">
        <line x1="${c-26}" y1="${u}" x2="${c-26}" y2="${m}" />
        <line x1="${c-34}" y1="${u}" x2="${c-18}" y2="${u}" />
        <line x1="${c-34}" y1="${m}" x2="${c-18}" y2="${m}" />
        <rect x="2" y="${u+s/2-16}" width="66" height="32" rx="16" />
        <text x="35" y="${u+s/2+5}">${i} мм</text>
      </g>
      <g class="dimension-line dimension-line--width">
        <line x1="${g+8}" y1="${u-8}" x2="${f+8}" y2="${b-8}" />
        <rect x="${f-54}" y="${Math.max(4,b-48)}" width="76" height="32" rx="16" />
        <text x="${f-16}" y="${Math.max(25,b-27)}">${n} мм</text>
      </g>
    </svg>
  `}function at(){return S.map(t=>`<option value="${t.id}"${t.id===M?" selected":""}>№${t.number} · ${$(t.dimensions)}</option>`).join("")}function yt(){const t=X();return`
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
            <div><dt>${d(O)}</dt><dd>один матеріал</dd></div>
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
            <span class="price-rule">1–999: +${st} грн · ${y}+: +${it} грн</span>
          </div>
          <label class="field">
            <span>Коробка</span>
            <select class="select" id="hero-product-select">${at()}</select>
          </label>
          <label class="field">
            <span>Кількість</span>
            <input class="input" id="hero-quantity-input" type="number" min="1" max="${H}" value="${r}" />
          </label>
          <div class="hero-calculator__result">
            <span id="hero-price-label">Роздрібна ціна</span>
            <strong id="hero-total">${p(v(t,r)*r)}</strong>
            <small id="hero-unit">${p(v(t,r))} / шт.</small>
          </div>
          <a class="button button--secondary" href="#calculator">Детальний розрахунок</a>
        </div>
      </section>

      <section class="section principles-section" aria-labelledby="principles-title">
        <div class="principles-intro reveal">
          <p class="eyebrow"><span></span> Як ми працюємо</p>
          <h2 id="principles-title">Без зайвих умов.<br />Без прихованих цифр.</h2>
          <p>Сервіс і коробки побудовані навколо чотирьох простих речей.</p>
        </div>
        <div class="principles-list">
          <article class="principle reveal">
            <span>01</span><div><h3>Зручність</h3><p>Розмір, кількість і ціна — в одному зрозумілому сценарії.</p></div>
          </article>
          <article class="principle reveal">
            <span>02</span><div><h3>Прозорість</h3><p>Відразу показуємо ціну за штуку та весь тираж.</p></div>
          </article>
          <article class="principle reveal">
            <span>03</span><div><h3>Простота</h3><p>Жодних категорій і складних термінів — тільки точні розміри.</p></div>
          </article>
          <article class="principle reveal">
            <span>04</span><div><h3>Якість</h3><p>Один перевірений матеріал і зрозумілий результат.</p></div>
          </article>
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
            <div class="calculator-preview" id="calculator-preview">${R(t,!0)}</div>
            <div class="quantity-block">
              <div class="quantity-block__label">
                <label for="quantity-input">Кількість</label>
                <output id="quantity-output">${r.toLocaleString("uk-UA")} шт.</output>
              </div>
              <div class="quantity-control">
                <button type="button" data-quantity-step="-100" aria-label="Зменшити кількість на 100">−</button>
                <input id="quantity-input" type="number" min="1" max="${H}" value="${r}" />
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
                <strong id="calculator-unit-price">${p(v(t,r))}<small>/ шт.</small></strong>
              </div>
              <div class="calculation-result__total">
                <span>Весь тираж</span>
                <strong id="calculator-total">${p(v(t,r)*r)}</strong>
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
          ${gt.map((e,a)=>`
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
  `}lt.innerHTML=yt();const C=document.querySelector("#product-grid"),V=document.querySelector("#catalog-count");function $t(t){const e=_(),a=v(t,1),n=v(t,y),i=e?.partner?D(t,1,e):null;return`
    <article
      class="product-card${t.id===M?" is-selected":""}"
      data-open-product="${t.id}"
      tabindex="0"
      role="button"
      aria-label="Відкрити коробку №${t.number}, ${$(t.dimensions)}"
    >
      <div class="product-card__head">
        <div>
          <span class="product-card__number">№${t.number}</span>
          <span class="product-card__sku">${d(t.sku)}</span>
        </div>
        <span class="material-dot" title="${d(O)}"></span>
      </div>
      <div class="product-card__visual">${R(t,!0)}</div>
      <h3>${$(t.dimensions)}</h3>
      <p>${d(O)}</p>
      <div class="product-card__prices">
        ${i!==null?`<div class="partner-price"><span>Ваша фіксована</span><strong>${p(i)}<small>/шт.</small></strong></div>`:`
              <div><span>1–999 шт.</span><strong>${p(a)}</strong></div>
              <div><span>від 1000 шт.</span><strong>${p(n)}</strong></div>
            `}
      </div>
      <button class="button button--card" type="button" data-open-product="${t.id}">
        ${t.id===M?"Відкрити обрану коробку":"Детальніше й розрахувати"}
      </button>
    </article>
  `}function qt(t){const e=_(),a=D(t,r,e),n=a*r;return`
    <div class="product-modal">
      <div class="product-modal__visual">
        <div class="product-modal__labels">
          <span>№${t.number}</span>
          <small>${d(t.sku)}</small>
        </div>
        <div class="product-modal__drawing">${R(t,!0)}</div>
        <p>Внутрішній розмір · Д × Ш × В</p>
      </div>
      <div class="product-modal__content">
        <p class="eyebrow"><span></span> Коробка з прайса</p>
        <h2 id="product-dialog-title">${$(t.dimensions)}</h2>
        <p class="product-modal__material">${d(O)}</p>

        <div class="product-modal__rules">
          <div><span>1–999 шт.</span><strong>${p(v(t,1))} / шт.</strong></div>
          <div><span>від 1 000 шт.</span><strong>${p(v(t,y))} / шт.</strong></div>
        </div>

        <div class="quantity-block quantity-block--modal">
          <div class="quantity-block__label">
            <label for="modal-quantity-input">Кількість</label>
            <output id="modal-quantity-output">${r.toLocaleString("uk-UA")} шт.</output>
          </div>
          <div class="quantity-control">
            <button type="button" data-quantity-step="-100" aria-label="Зменшити кількість на 100">−</button>
            <input id="modal-quantity-input" type="number" min="1" max="${H}" value="${r}" />
            <button type="button" data-quantity-step="100" aria-label="Збільшити кількість на 100">+</button>
          </div>
          <div class="quantity-presets quantity-presets--modal" aria-label="Швидкий вибір кількості">
            ${[100,500,1e3,5e3,1e4,5e4].map(i=>`<button type="button" data-quantity="${i}">${i.toLocaleString("uk-UA")}</button>`).join("")}
          </div>
        </div>

        <div class="product-modal__total" aria-live="polite">
          <div><span id="modal-price-tier">${Q(r,e)}</span><strong id="modal-unit-price">${p(a)} / шт.</strong></div>
          <div><span>Весь тираж</span><strong id="modal-total">${p(n)}</strong></div>
        </div>

        <div class="product-modal__actions">
          <button class="button button--primary" type="button" data-product-to-request>Перенести в заявку</button>
          <button class="button button--ghost" type="button" data-product-to-calculator>Відкрити калькулятор</button>
        </div>
      </div>
    </div>
  `}function dt(){const t=document.querySelector("#product-dialog");if(!t?.open||!L)return;const e=S.find(u=>u.id===L);if(!e)return;const a=_(),n=D(e,r,a),i=t.querySelector("#modal-quantity-input");i&&(i.value=String(r));const o=t.querySelector("#modal-quantity-output");o&&(o.value=`${r.toLocaleString("uk-UA")} шт.`);const s=t.querySelector("#modal-price-tier");s&&(s.textContent=Q(r,a));const l=t.querySelector("#modal-unit-price");l&&(l.textContent=`${p(n)} / шт.`);const c=t.querySelector("#modal-total");c&&(c.textContent=p(n*r)),t.querySelectorAll("[data-quantity]").forEach(u=>{u.classList.toggle("is-active",Number(u.dataset.quantity)===r)})}function ut(t){const e=S.find(i=>i.id===t),a=document.querySelector("#product-dialog"),n=document.querySelector("#product-dialog-content");!e||!a||!n||(L=e.id,Y(e.id),n.innerHTML=qt(e),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),dt())}function wt(){const t=G.trim().toLocaleLowerCase("uk-UA");return S.filter(a=>{const n=`${a.number} ${a.sku} ${a.name} ${$(a.dimensions)}`.toLocaleLowerCase("uk-UA"),i=!t||n.includes(t),o=!A||bt(A,a.dimensions);return i&&o}).sort((a,n)=>W==="price"?a.basePrice-n.basePrice:W==="number"?Number(a.number)-Number(n.number):tt(a)-tt(n))}function q(t=!1){if(!C||!V)return;if(t){V.textContent="Оновлюємо список…",C.innerHTML=Array.from({length:6},()=>'<div class="product-skeleton" aria-hidden="true"><i></i><i></i><i></i></div>').join("");return}const e=wt(),a=A?` · предмет ${$(A)}`:"";if(V.textContent=`${e.length} із ${S.length} розмірів${a}`,!e.length){C.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__box" aria-hidden="true"></div>
        <h3>Готового розміру немає.</h3>
        <p>Змініть габарити предмета або залиште заявку з потрібним розміром.</p>
        <a class="button button--primary" href="#request">Описати свій розмір</a>
      </div>
    `;return}C.innerHTML=e.map($t).join("")}function j(){window.clearTimeout(et),q(!0),et=window.setTimeout(()=>q(!1),320)}function k(){const t=X(),e=_(),a=D(t,r,e),n=a*r,i=Q(r,e);document.querySelectorAll("#calculator-product-select, #hero-product-select").forEach(w=>{w.value=t.id}),document.querySelectorAll("#quantity-input, #hero-quantity-input, #modal-quantity-input").forEach(w=>{w.value=String(r)});const o=document.querySelector("#quantity-output");o&&(o.value=`${r.toLocaleString("uk-UA")} шт.`);const s=document.querySelector("#calculator-preview");s&&(s.classList.remove("is-changing"),s.offsetWidth,s.classList.add("is-changing"),s.innerHTML=R(t,!0));const l=document.querySelector("#calculator-tier");l&&(l.textContent=i);const c=document.querySelector("#calculator-unit-price");c&&(c.innerHTML=`${p(a)}<small>/ шт.</small>`);const u=document.querySelector("#calculator-total");u&&(u.textContent=p(n));const b=document.querySelector("#hero-price-label");b&&(b.textContent=i);const g=document.querySelector("#hero-total");g&&(g.textContent=p(n));const f=document.querySelector("#hero-unit");f&&(f.textContent=`${p(a)} / шт.`);const m=document.querySelector("#account-price-badge");m&&(m.textContent=e?.partner?"Персональна ціна активна":"Публічна ціна",m.classList.toggle("is-partner",!!e?.partner));const N=document.querySelector("#threshold-note");if(N)if(e?.partner)N.innerHTML=`<strong>Фіксована ціна:</strong> ${p(a)} за одиницю незалежно від тиражу.`;else if(r<y){const w=y-r,ht=v(t,y)*y;N.innerHTML=`Ще <strong>${w.toLocaleString("uk-UA")} шт.</strong> до оптового тарифу. 1000 шт. коштуватимуть ${p(ht)}.`}else N.innerHTML=`<strong>Оптовий тариф активний.</strong> Економія проти роздрібної ціни — ${p(r)} на всьому тиражі.`;const Z=document.querySelector("#request-summary");Z&&(Z.innerHTML=`
      <span class="technical-label">Поточний розрахунок</span>
      <strong>Коробка №${t.number}</strong>
      <p>${$(t.dimensions)} · ${r.toLocaleString("uk-UA")} шт.</p>
      <div><span>${i}</span><b>${p(n)}</b></div>
    `),document.querySelectorAll("[data-quantity]").forEach(w=>{w.classList.toggle("is-active",Number(w.dataset.quantity)===r)}),dt()}function Y(t,e=!1){S.some(a=>a.id===t)&&(M=t,q(!1),k(),e&&document.querySelector("#calculator")?.scrollIntoView({behavior:"smooth",block:"start"}))}function E(t){r=ft(t),k()}function I(){const t=document.querySelector("#account-button"),e=_();if(!t)return;t.textContent=e?e.name.split(" ")[0]:"Кабінет",t.classList.toggle("is-signed-in",!!e);const a=document.querySelector("#request-account-hint");a&&(a.textContent=e?`${e.name}${e.partner?" · партнер":""}`:"Без акаунта");const n=document.querySelector("#request-form");if(n&&e){const i=(o,s)=>{const l=n.elements.namedItem(o);l instanceof HTMLInputElement&&!l.value&&(l.value=s)};i("name",e.name),i("phone",e.phone),i("company",e.company)}}function St(){const t=_();if(t){const e=F().filter(a=>a.accountId===t.id);return`
      <div class="account-panel">
        <p class="eyebrow"><span></span> Особистий кабінет</p>
        <h1 id="account-page-title">${d(t.name)}</h1>
        <p>${d(t.phone)}${t.company?` · ${d(t.company)}`:""}</p>
        <div class="account-status${t.partner?" is-partner":""}">
          <span>${t.partner?"Постійний клієнт":"Новий клієнт"}</span>
          <strong>${t.partner?`Базова ціна + ${t.fixedMarkup.toFixed(2)} грн`:"Публічні ціни"}</strong>
        </div>
        <div class="account-orders">
          <div class="account-orders__head"><strong>Мої локальні заявки</strong><span>${e.length}</span></div>
          ${e.length?e.slice().reverse().map(a=>`
                      <article>
                        <div><strong>№${a.productNumber} · ${a.quantity.toLocaleString("uk-UA")} шт.</strong><span>${new Date(a.createdAt).toLocaleDateString("uk-UA")}</span></div>
                        <b>${p(a.total)}</b>
                        <small>${a.status}</small>
                      </article>
                    `).join(""):'<p class="muted">Заявок у цьому браузері ще немає.</p>'}
        </div>
        <div class="account-actions">
          ${t.role==="admin"?'<a class="button button--primary" href="#admin">Відкрити адмінку</a>':'<a class="button button--primary" href="#calculator">Новий розрахунок</a>'}
          <button class="button button--ghost" type="button" id="logout-button">Вийти</button>
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
  `}function K(){const t=document.querySelector("#account-page-content");t&&(t.innerHTML=St())}function pt(t,e,a){const n=t.querySelector("[data-auth-status]");n&&(n.textContent=e,n.className=`form-status is-${a}`)}function _t(t,e){const a=U(t),n=P().find(i=>U(i.phone)===a&&i.password===e);return n?(localStorage.setItem(h.session,n.id),n):null}function nt(t,e=!1){if(t.classList.add("was-validated"),!t.reportValidity())return;const a=new FormData(t),n=_t(String(a.get("phone")??""),String(a.get("password")??""));if(!n||e&&n.role!=="admin"){pt(t,e?"Потрібен демо-акаунт адміністратора.":"Невірний телефон або пароль.","error");return}I(),k(),q(!1),e?T():(K(),window.location.hash="account")}function xt(t){if(t.classList.add("was-validated"),!t.reportValidity())return;const e=new FormData(t),a=J(String(e.get("phone")??"")),n=P();if(n.some(o=>U(o.phone)===U(a))){pt(t,"Акаунт із таким номером уже існує.","error");return}const i={id:`account-${Date.now().toString(36)}`,name:String(e.get("name")??"").trim(),phone:a,company:String(e.get("company")??"").trim(),password:String(e.get("password")??""),role:"client",partner:!1,fixedMarkup:z,createdAt:new Date().toISOString()};n.push(i),x(h.accounts,n),localStorage.setItem(h.session,i.id),I(),k(),q(!1),K(),window.location.hash="account"}function Lt(t){const e=document.querySelector("#request-status");if(t.classList.add("was-validated"),!t.reportValidity()){e&&(e.className="form-status is-error",e.textContent="Перевірте обов’язкові поля та згоду.");return}const a=new FormData(t),n=X(),i=_(),o=D(n,r,i),s={id:`TP-${Date.now().toString(36).toUpperCase()}`,createdAt:new Date().toISOString(),customerName:String(a.get("name")??"").trim(),phone:J(String(a.get("phone")??"")),company:String(a.get("company")??"").trim(),comment:String(a.get("comment")??"").trim(),productId:n.id,productNumber:n.number,dimensions:n.dimensions,quantity:r,unitPrice:o,total:o*r,priceType:Q(r,i),accountId:i?.id,status:"Нова"},l=F();l.push(s),x(h.orders,l),e&&(e.className="form-status is-success",e.innerHTML=`<strong>Заявку ${s.id} збережено локально.</strong><span>Вона вже доступна у демо-адмінці цього браузера.</span>`),t.querySelector('button[type="submit"]')?.focus()}function kt(t){return["Нова","У роботі","Уточнення","Підтверджена","Закрита"].map(a=>`<option value="${a}"${a===t?" selected":""}>${a}</option>`).join("")}function T(){const t=document.querySelector("#admin-content");if(!t)return;const e=_();if(!e||e.role!=="admin"){t.innerHTML=`
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
    `;return}const a=F().slice().reverse(),n=P().filter(s=>s.role==="client"),i=a.filter(s=>s.status!=="Закрита").length,o=a.reduce((s,l)=>s+l.total,0);t.innerHTML=`
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
        <article><span>Сума демо-заявок</span><strong>${p(o)}</strong></article>
      </div>
      <section class="admin-section">
        <div class="admin-section__head"><h2>Заявки</h2><span>${a.length} записів</span></div>
        <div class="orders-list">
          ${a.length?a.map(s=>`
                      <article class="order-card">
                        <div class="order-card__top">
                          <div><span>${d(s.id)}</span><strong>${d(s.customerName)}</strong></div>
                          <select class="select status-select" data-order-status="${d(s.id)}">${kt(s.status)}</select>
                        </div>
                        <div class="order-card__grid">
                          <div><span>Контакт</span><a href="tel:${d(s.phone)}">${d(s.phone)}</a><small>Телефон клієнта</small></div>
                          <div><span>Коробка</span><strong>№${d(s.productNumber)}</strong><small>${$(s.dimensions)}</small></div>
                          <div><span>Тираж</span><strong>${s.quantity.toLocaleString("uk-UA")} шт.</strong><small>${d(s.priceType)}</small></div>
                          <div><span>Сума</span><strong>${p(s.total)}</strong><small>${p(s.unitPrice)} / шт.</small></div>
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
  `}function mt(){const t=document.querySelector("#admin-page"),e=document.querySelector("#account-page"),a=document.querySelector("#main"),n=document.querySelector(".site-header"),i=document.querySelector(".site-footer"),o=document.querySelector(".demo-strip"),s=window.location.hash==="#admin",l=window.location.hash==="#account";t&&(t.hidden=!s),e&&(e.hidden=!l),a&&(a.hidden=s||l),n&&(n.hidden=s||l),i&&(i.hidden=s||l),o&&(o.hidden=s||l),document.body.classList.toggle("is-admin",s),document.body.classList.toggle("is-account",l),s?(T(),window.scrollTo({top:0})):l&&(K(),window.scrollTo({top:0}))}function Tt(){const t=document.querySelectorAll(".reveal");if(!("IntersectionObserver"in window)){t.forEach(a=>a.classList.add("is-visible"));return}const e=new IntersectionObserver(a=>{a.forEach(n=>{n.isIntersecting&&(n.target.classList.add("is-visible"),e.unobserve(n.target))})},{threshold:.12});t.forEach(a=>e.observe(a))}document.querySelector("#menu-button")?.addEventListener("click",t=>{const e=t.currentTarget,a=document.querySelector("#site-nav"),n=e.getAttribute("aria-expanded")!=="true";e.setAttribute("aria-expanded",String(n)),a?.classList.toggle("is-open",n)});document.querySelectorAll(".site-nav a").forEach(t=>{t.addEventListener("click",()=>{document.querySelector("#site-nav")?.classList.remove("is-open"),document.querySelector("#menu-button")?.setAttribute("aria-expanded","false")})});document.querySelector("#fit-form")?.addEventListener("submit",t=>{t.preventDefault();const e=t.currentTarget;e.classList.add("was-validated");const a=document.querySelector("#fit-message");if(!e.reportValidity()){a&&(a.textContent="Вкажіть три додатні розміри.",a.className="form-message is-error");return}const n=new FormData(e);A={length:Number(n.get("length")),width:Number(n.get("width")),height:Number(n.get("height"))},a&&(a.textContent="Розміри застосовано. Показуємо коробки нижче.",a.className="form-message is-success"),j(),window.setTimeout(()=>document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth"}),180)});document.querySelector("#catalog-search")?.addEventListener("input",t=>{G=t.currentTarget.value,j()});document.querySelector("#catalog-sort")?.addEventListener("change",t=>{W=t.currentTarget.value,j()});document.querySelector("#reset-catalog")?.addEventListener("click",()=>{A=null,G="";const t=document.querySelector("#catalog-search");t&&(t.value="");const e=document.querySelector("#fit-message");e&&(e.textContent=""),j()});document.querySelector("#calculator-product-select")?.addEventListener("change",t=>{Y(t.currentTarget.value)});document.querySelector("#hero-product-select")?.addEventListener("change",t=>{Y(t.currentTarget.value)});document.querySelector("#quantity-input")?.addEventListener("input",t=>{E(Number(t.currentTarget.value))});document.querySelector("#hero-quantity-input")?.addEventListener("input",t=>{E(Number(t.currentTarget.value))});document.querySelector("#request-form")?.addEventListener("submit",t=>{t.preventDefault(),Lt(t.currentTarget)});document.addEventListener("click",t=>{const e=t.target,a=e.closest("[data-open-product]");if(a?.dataset.openProduct){ut(a.dataset.openProduct);return}const n=e.closest("[data-quantity]");if(n?.dataset.quantity){E(Number(n.dataset.quantity));return}const i=e.closest("[data-quantity-step]");if(i?.dataset.quantityStep){E(r+Number(i.dataset.quantityStep));return}if(e.closest("[data-product-to-request]")){document.querySelector("#product-dialog")?.close(),L=null,window.location.hash="request",document.querySelector("#request")?.scrollIntoView({behavior:"smooth",block:"start"});return}if(e.closest("[data-product-to-calculator]")){document.querySelector("#product-dialog")?.close(),L=null,window.location.hash="calculator",document.querySelector("#calculator")?.scrollIntoView({behavior:"smooth",block:"start"});return}const o=e.closest("[data-close-dialog]");if(o){o.closest("dialog")?.close(),L=null;return}const s=e.closest("[data-auth-tab]");if(s?.dataset.authTab){const l=s.closest(".auth-forms");l?.querySelectorAll("[data-auth-tab]").forEach(c=>{const u=c.dataset.authTab===s.dataset.authTab;c.classList.toggle("is-active",u),c.setAttribute("aria-selected",String(u))}),l?.querySelectorAll("[data-auth-panel]").forEach(c=>{c.hidden=c.dataset.authPanel!==s.dataset.authTab});return}if(e.closest("#logout-button")){localStorage.removeItem(h.session),I(),k(),q(!1),K();return}e.closest("#admin-logout")&&(localStorage.removeItem(h.session),I(),k(),q(!1),T())});document.addEventListener("input",t=>{const e=t.target;e instanceof HTMLInputElement&&e.id==="modal-quantity-input"&&E(Number(e.value))});document.addEventListener("keydown",t=>{if(t.key!=="Enter"&&t.key!==" ")return;const e=t.target;!(e instanceof HTMLElement)||!e.matches(".product-card")||(t.preventDefault(),e.dataset.openProduct&&ut(e.dataset.openProduct))});document.addEventListener("submit",t=>{const e=t.target;e instanceof HTMLFormElement&&(e.id==="login-form"?(t.preventDefault(),nt(e)):e.id==="register-form"?(t.preventDefault(),xt(e)):e.id==="admin-login-form"&&(t.preventDefault(),nt(e,!0)))});document.addEventListener("change",t=>{const e=t.target;if(e instanceof HTMLInputElement||e instanceof HTMLSelectElement){if(e instanceof HTMLSelectElement&&e.dataset.orderStatus){const a=F(),n=a.find(i=>i.id===e.dataset.orderStatus);n&&(n.status=e.value,x(h.orders,a),T());return}if(e instanceof HTMLInputElement&&e.dataset.partnerToggle){const a=P(),n=a.find(i=>i.id===e.dataset.partnerToggle);n&&(n.partner=e.checked,x(h.accounts,a),T());return}if(e instanceof HTMLInputElement&&e.dataset.partnerMarkup){const a=P(),n=a.find(i=>i.id===e.dataset.partnerMarkup);n&&(n.fixedMarkup=Math.min(.99,Math.max(0,Number(e.value)||0)),x(h.accounts,a),T())}}});document.querySelector("#product-dialog")?.addEventListener("click",t=>{t.target===t.currentTarget&&(t.currentTarget.close(),L=null)});window.addEventListener("hashchange",mt);q(!0);window.setTimeout(()=>q(!1),460);k();I();mt();Tt();
