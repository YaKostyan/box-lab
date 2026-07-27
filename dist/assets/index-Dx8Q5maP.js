(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=a(i);fetch(i.href,o)}})();const Q="Мікрогофрокартон, крафт",N=5e4,y=1e3,et=2,at=1,R=.5,_=[{id:"box-301",number:"301",sku:"Арт. 294",name:"Самозбірна коробка №301",dimensions:{length:165,width:100,height:30},basePrice:5,sourceQuantity:1e3},{id:"box-302",number:"302",sku:"Арт. 233",name:"Самозбірна коробка №302",dimensions:{length:130,width:130,height:50},basePrice:7,sourceQuantity:800},{id:"box-303",number:"303",sku:"Арт. 053",name:"Самозбірна коробка №303",dimensions:{length:190,width:150,height:100},basePrice:17,sourceQuantity:800},{id:"box-304",number:"304",sku:"Арт. 163",name:"Самозбірна коробка №304",dimensions:{length:230,width:150,height:35},basePrice:11,sourceQuantity:800},{id:"box-305",number:"305",sku:"Арт. 114",name:"Самозбірна коробка №305",dimensions:{length:160,width:85,height:110},basePrice:6.5},{id:"box-306",number:"306",sku:"Арт. 269",name:"Самозбірна коробка №306",dimensions:{length:145,width:145,height:40},basePrice:6.5,sourceQuantity:1e3},{id:"box-307",number:"307",sku:"Арт. 277",name:"Самозбірна коробка №307",dimensions:{length:280,width:180,height:100},basePrice:18,sourceQuantity:500},{id:"box-308",number:"308",sku:"Арт. 066",name:"Самозбірна коробка №308",dimensions:{length:250,width:180,height:40},basePrice:12,sourceQuantity:800},{id:"box-309",number:"309",sku:"Арт. 136",name:"Самозбірна коробка №309",dimensions:{length:210,width:150,height:50},basePrice:11,sourceQuantity:900},{id:"box-310",number:"310",sku:"Арт. 067",name:"Самозбірна коробка №310",dimensions:{length:260,width:260,height:50},basePrice:15,sourceQuantity:600},{id:"box-311",number:"311",sku:"Арт. 253",name:"Самозбірна коробка №311",dimensions:{length:370,width:170,height:100},basePrice:17},{id:"box-101",number:"101",sku:"Без артикулу",name:"Самозбірна коробка №101",dimensions:{length:178,width:115,height:48},basePrice:4,sourceQuantity:800}],dt=[{question:"Як формується ціна на сайті?",answer:"Для замовлень до 999 штук до базової ціни з прайса додається 2 грн за одиницю. Від 1000 до 50 000 штук — 1 грн. Калькулятор показує ціну за одиницю та весь тираж одразу."},{question:"Чи можна повернути коробку іншою стороною?",answer:"Так. Підбір за розміром враховує поворот предмета: сервіс порівнює три сторони предмета з трьома внутрішніми сторонами коробки."},{question:"Який матеріал використовується?",answer:"У поточному прайсі всі позиції показані в одному матеріалі — крафтовому мікрогофрокартоні. Інші матеріали не додаємо, доки власник не надасть окремі ціни."},{question:"Що отримує постійний клієнт?",answer:"Після підтвердження менеджером у кабінеті з’являється персональна фіксована ціна, нижча за публічну оптову ціну. У прототипі це працює локально в браузері."},{question:"Куди потрапляє заявка?",answer:"У цьому статичному прототипі заявка зберігається тільки у вашому браузері й одразу з’являється на локальній демо-сторінці адміністратора. Для реальної роботи потрібен backend і база даних."},{question:"Чи можна замовити більше 50 000 штук?",answer:"Калькулятор обмежений 50 000 одиниць. Більший тираж можна описати в коментарі до заявки — менеджер розрахує його окремо після запуску справжньої системи."}];function d(t){return new Intl.NumberFormat("uk-UA",{style:"currency",currency:"UAH",minimumFractionDigits:Number.isInteger(t)?0:2,maximumFractionDigits:2}).format(t)}function $(t,e){return t.basePrice+(e>=y?at:et)}function V(t,e,a){return a?.partner?t.basePrice+Math.min(Math.max(a.fixedMarkup,0),.99):$(t,e)}function J(t){const{length:e,width:a,height:s}=t.dimensions;return e*a*s}function pt(t,e){const a=[t.length,t.width,t.height].sort((i,o)=>o-i),s=[e.length,e.width,e.height].sort((i,o)=>o-i);return a.every((i,o)=>i<=s[o])}const m={accounts:"toffipacks-demo-accounts-v1",orders:"toffipacks-demo-orders-v1",session:"toffipacks-demo-session-v1"},j=new Date().toISOString(),st=[{id:"account-admin",name:"Адміністратор ToffiPacks",email:"admin@toffipacks.demo",phone:"+380000000000",company:"ToffiPacks",password:"admin123",role:"admin",partner:!1,fixedMarkup:R,createdAt:j},{id:"account-partner",name:"Постійний клієнт",email:"client@toffipacks.demo",phone:"+380671112233",company:"Demo Coffee",password:"client123",role:"client",partner:!0,fixedMarkup:R,createdAt:j}],nt=[{id:"TP-DEMO-001",createdAt:j,customerName:"Олена",phone:"+380671112233",email:"client@toffipacks.demo",company:"Demo Coffee",comment:"Потрібно уточнити строк виготовлення.",productId:"box-101",productNumber:"101",dimensions:{length:178,width:115,height:48},quantity:1200,unitPrice:4.5,total:5400,priceType:"Фіксована ціна клієнта",accountId:"account-partner",status:"Нова"}];function it(t,e){try{const a=localStorage.getItem(t);return a?JSON.parse(a):e}catch{return e}}function q(t,e){localStorage.setItem(t,JSON.stringify(e))}function mt(){localStorage.getItem(m.accounts)||q(m.accounts,st),localStorage.getItem(m.orders)||q(m.orders,nt)}mt();let M="box-101",r=500,z="",K="size",L=null,Y;const ot=document.querySelector("#app");if(!ot)throw new Error("Root element #app was not found.");function k(){return it(m.accounts,st)}function O(){return it(m.orders,nt)}function T(){const t=localStorage.getItem(m.session);return k().find(e=>e.id===t)??null}function B(){return _.find(t=>t.id===M)??_[0]}function gt(t){return Number.isFinite(t)?Math.min(N,Math.max(1,Math.round(t))):1}function l(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function S(t){return`${t.length} × ${t.width} × ${t.height} мм`}function rt(t,e){return e?.partner?"Фіксована ціна клієнта":t>=y?"Оптова ціна":"Роздрібна ціна"}function W(t,e=!1){const{length:a,width:s,height:i}=t.dimensions,o=170+Math.min(100,a/3),n=58+Math.min(54,i/2.5),c=50+Math.min(44,s/4),u=72,p=e?70:82,b=p-c*.55,h=u+o,f=h+c,g=p+n;return`
    <svg class="box-visual${e?" box-visual--compact":""}" viewBox="0 0 470 270" role="img"
      aria-label="Схема коробки ${l(t.number)}, ${S(t.dimensions)}">
      <g class="box-visual__shape">
        <polygon class="box-visual__top" points="${u},${p} ${u+c},${b} ${f},${b} ${h},${p}" />
        <polygon class="box-visual__side" points="${h},${p} ${f},${b} ${f},${b+n} ${h},${g}" />
        <rect class="box-visual__front" x="${u}" y="${p}" width="${o}" height="${n}" />
        <rect class="box-visual__mark" x="${u+o*.35}" y="${p+n*.32}"
          width="${o*.3}" height="${Math.max(24,n*.34)}" rx="5" />
        <text class="box-visual__number" x="${u+o/2}" y="${p+n*.56}">№${t.number}</text>
      </g>
      <g class="dimension-line dimension-line--length">
        <line x1="${u}" y1="${g+28}" x2="${h}" y2="${g+28}" />
        <line x1="${u}" y1="${g+20}" x2="${u}" y2="${g+36}" />
        <line x1="${h}" y1="${g+20}" x2="${h}" y2="${g+36}" />
        <rect x="${u+o/2-38}" y="${g+12}" width="76" height="32" rx="16" />
        <text x="${u+o/2}" y="${g+33}">${a} мм</text>
      </g>
      <g class="dimension-line dimension-line--height">
        <line x1="${u-26}" y1="${p}" x2="${u-26}" y2="${g}" />
        <line x1="${u-34}" y1="${p}" x2="${u-18}" y2="${p}" />
        <line x1="${u-34}" y1="${g}" x2="${u-18}" y2="${g}" />
        <rect x="2" y="${p+n/2-16}" width="66" height="32" rx="16" />
        <text x="35" y="${p+n/2+5}">${i} мм</text>
      </g>
      <g class="dimension-line dimension-line--width">
        <line x1="${h+8}" y1="${p-8}" x2="${f+8}" y2="${b-8}" />
        <rect x="${f-54}" y="${Math.max(4,b-48)}" width="76" height="32" rx="16" />
        <text x="${f-16}" y="${Math.max(25,b-27)}">${s} мм</text>
      </g>
    </svg>
  `}function Z(){return _.map(t=>`<option value="${t.id}"${t.id===M?" selected":""}>№${t.number} · ${S(t.dimensions)}</option>`).join("")}function ht(){const t=B();return`
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
        <button class="button button--ghost button--small" id="account-button" type="button">Кабінет</button>
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
            <div><dt>${l(Q)}</dt><dd>один матеріал</dd></div>
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
              <strong>Крафтова подача.<br />Точний розрахунок.</strong>
            </div>
          </div>
        </div>

        <div class="hero-calculator reveal" aria-label="Швидкий розрахунок">
          <div class="hero-calculator__head">
            <span class="technical-label">Швидкий розрахунок</span>
            <span class="price-rule">1–999: +${et} грн · ${y}+: +${at} грн</span>
          </div>
          <label class="field">
            <span>Коробка</span>
            <select class="select" id="hero-product-select">${Z()}</select>
          </label>
          <label class="field">
            <span>Кількість</span>
            <input class="input" id="hero-quantity-input" type="number" min="1" max="${N}" value="${r}" />
          </label>
          <div class="hero-calculator__result">
            <span id="hero-price-label">Роздрібна ціна</span>
            <strong id="hero-total">${d($(t,r)*r)}</strong>
            <small id="hero-unit">${d($(t,r))} / шт.</small>
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
              <select class="select select--large" id="calculator-product-select">${Z()}</select>
            </label>
            <div class="calculator-preview" id="calculator-preview">${W(t,!0)}</div>
            <div class="quantity-block">
              <div class="quantity-block__label">
                <label for="quantity-input">Кількість</label>
                <output id="quantity-output">${r.toLocaleString("uk-UA")} шт.</output>
              </div>
              <div class="quantity-control">
                <button type="button" data-quantity-step="-100" aria-label="Зменшити кількість на 100">−</button>
                <input id="quantity-input" type="number" min="1" max="${N}" value="${r}" />
                <button type="button" data-quantity-step="100" aria-label="Збільшити кількість на 100">+</button>
              </div>
              <input class="range" id="quantity-range" type="range" min="1" max="${N}" value="${r}" />
              <div class="quantity-presets" aria-label="Швидкий вибір кількості">
                ${[100,500,1e3,5e3,1e4,5e4].map(e=>`<button type="button" data-quantity="${e}">${e.toLocaleString("uk-UA")}</button>`).join("")}
              </div>
            </div>
            <div class="calculation-result" aria-live="polite">
              <div>
                <span id="calculator-tier">Роздрібна ціна</span>
                <strong id="calculator-unit-price">${d($(t,r))}<small>/ шт.</small></strong>
              </div>
              <div class="calculation-result__total">
                <span>Весь тираж</span>
                <strong id="calculator-total">${d($(t,r)*r)}</strong>
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
            <button class="text-link text-link--light" id="business-account-button" type="button">Відкрити кабінет <span>→</span></button>
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
              <input class="input" name="phone" type="tel" autocomplete="tel" placeholder="+380..." required />
            </label>
            <label class="field">
              <span>Email</span>
              <input class="input" name="email" type="email" autocomplete="email" />
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
          ${dt.map((e,a)=>`
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

    <dialog class="account-dialog" id="account-dialog" aria-labelledby="account-dialog-title">
      <button class="dialog-close" type="button" data-close-dialog aria-label="Закрити">×</button>
      <div id="account-dialog-content"></div>
    </dialog>
  `}ot.innerHTML=ht();const C=document.querySelector("#product-grid"),F=document.querySelector("#catalog-count");function bt(t){const e=T(),a=$(t,1),s=$(t,y),i=e?.partner?V(t,1,e):null;return`
    <article class="product-card${t.id===M?" is-selected":""}">
      <div class="product-card__head">
        <div>
          <span class="product-card__number">№${t.number}</span>
          <span class="product-card__sku">${l(t.sku)}</span>
        </div>
        <span class="material-dot" title="${l(Q)}"></span>
      </div>
      <div class="product-card__visual">${W(t,!0)}</div>
      <h3>${S(t.dimensions)}</h3>
      <p>${l(Q)}</p>
      <div class="product-card__prices">
        ${i!==null?`<div class="partner-price"><span>Ваша фіксована</span><strong>${d(i)}<small>/шт.</small></strong></div>`:`
              <div><span>1–999 шт.</span><strong>${d(a)}</strong></div>
              <div><span>від 1000 шт.</span><strong>${d(s)}</strong></div>
            `}
      </div>
      <button class="button button--card" type="button" data-select-product="${t.id}">
        ${t.id===M?"Обрано для розрахунку":"Обрати й розрахувати"}
      </button>
    </article>
  `}function ft(){const t=z.trim().toLocaleLowerCase("uk-UA");return _.filter(a=>{const s=`${a.number} ${a.sku} ${a.name} ${S(a.dimensions)}`.toLocaleLowerCase("uk-UA"),i=!t||s.includes(t),o=!L||pt(L,a.dimensions);return i&&o}).sort((a,s)=>K==="price"?a.basePrice-s.basePrice:K==="number"?Number(a.number)-Number(s.number):J(a)-J(s))}function v(t=!1){if(!C||!F)return;if(t){F.textContent="Оновлюємо список…",C.innerHTML=Array.from({length:6},()=>'<div class="product-skeleton" aria-hidden="true"><i></i><i></i><i></i></div>').join("");return}const e=ft(),a=L?` · предмет ${S(L)}`:"";if(F.textContent=`${e.length} із ${_.length} розмірів${a}`,!e.length){C.innerHTML=`
      <div class="empty-state">
        <div class="empty-state__box" aria-hidden="true"></div>
        <h3>Готового розміру немає.</h3>
        <p>Змініть габарити предмета або залиште заявку з потрібним розміром.</p>
        <a class="button button--primary" href="#request">Описати свій розмір</a>
      </div>
    `;return}C.innerHTML=e.map(bt).join("")}function U(){window.clearTimeout(Y),v(!0),Y=window.setTimeout(()=>v(!1),320)}function w(){const t=B(),e=T(),a=V(t,r,e),s=a*r,i=rt(r,e);document.querySelectorAll("#calculator-product-select, #hero-product-select").forEach(A=>{A.value=t.id}),document.querySelectorAll("#quantity-input, #hero-quantity-input").forEach(A=>{A.value=String(r)});const o=document.querySelector("#quantity-range");o&&(o.value=String(r));const n=document.querySelector("#quantity-output");n&&(n.value=`${r.toLocaleString("uk-UA")} шт.`);const c=document.querySelector("#calculator-preview");c&&(c.classList.remove("is-changing"),c.offsetWidth,c.classList.add("is-changing"),c.innerHTML=W(t,!0));const u=document.querySelector("#calculator-tier");u&&(u.textContent=i);const p=document.querySelector("#calculator-unit-price");p&&(p.innerHTML=`${d(a)}<small>/ шт.</small>`);const b=document.querySelector("#calculator-total");b&&(b.textContent=d(s));const h=document.querySelector("#hero-price-label");h&&(h.textContent=i);const f=document.querySelector("#hero-total");f&&(f.textContent=d(s));const g=document.querySelector("#hero-unit");g&&(g.textContent=`${d(a)} / шт.`);const H=document.querySelector("#account-price-badge");H&&(H.textContent=e?.partner?"Персональна ціна активна":"Публічна ціна",H.classList.toggle("is-partner",!!e?.partner));const I=document.querySelector("#threshold-note");if(I)if(e?.partner)I.innerHTML=`<strong>Фіксована ціна:</strong> ${d(a)} за одиницю незалежно від тиражу.`;else if(r<y){const A=y-r,ut=$(t,y)*y;I.innerHTML=`Ще <strong>${A.toLocaleString("uk-UA")} шт.</strong> до оптового тарифу. 1000 шт. коштуватимуть ${d(ut)}.`}else I.innerHTML=`<strong>Оптовий тариф активний.</strong> Економія проти роздрібної ціни — ${d(r)} на всьому тиражі.`;const X=document.querySelector("#request-summary");X&&(X.innerHTML=`
      <span class="technical-label">Поточний розрахунок</span>
      <strong>Коробка №${t.number}</strong>
      <p>${S(t.dimensions)} · ${r.toLocaleString("uk-UA")} шт.</p>
      <div><span>${i}</span><b>${d(s)}</b></div>
    `)}function G(t,e=!1){_.some(a=>a.id===t)&&(M=t,v(!1),w(),e&&document.querySelector("#calculator")?.scrollIntoView({behavior:"smooth",block:"start"}))}function P(t){r=gt(t),w()}function E(){const t=document.querySelector("#account-button"),e=T();if(!t)return;t.textContent=e?e.name.split(" ")[0]:"Кабінет",t.classList.toggle("is-signed-in",!!e);const a=document.querySelector("#request-account-hint");a&&(a.textContent=e?`${e.name}${e.partner?" · партнер":""}`:"Без акаунта");const s=document.querySelector("#request-form");if(s&&e){const i=(o,n)=>{const c=s.elements.namedItem(o);c instanceof HTMLInputElement&&!c.value&&(c.value=n)};i("name",e.name),i("phone",e.phone),i("email",e.email),i("company",e.company)}}function vt(){const t=T();if(t){const e=O().filter(a=>a.accountId===t.id);return`
      <div class="account-panel">
        <p class="eyebrow"><span></span> Особистий кабінет</p>
        <h2 id="account-dialog-title">${l(t.name)}</h2>
        <p>${l(t.email)}${t.company?` · ${l(t.company)}`:""}</p>
        <div class="account-status${t.partner?" is-partner":""}">
          <span>${t.partner?"Постійний клієнт":"Новий клієнт"}</span>
          <strong>${t.partner?`Базова ціна + ${t.fixedMarkup.toFixed(2)} грн`:"Публічні ціни"}</strong>
        </div>
        <div class="account-orders">
          <div class="account-orders__head"><strong>Мої локальні заявки</strong><span>${e.length}</span></div>
          ${e.length?e.slice().reverse().map(a=>`
                      <article>
                        <div><strong>№${a.productNumber} · ${a.quantity.toLocaleString("uk-UA")} шт.</strong><span>${new Date(a.createdAt).toLocaleDateString("uk-UA")}</span></div>
                        <b>${d(a.total)}</b>
                        <small>${a.status}</small>
                      </article>
                    `).join(""):'<p class="muted">Заявок у цьому браузері ще немає.</p>'}
        </div>
        <div class="account-actions">
          ${t.role==="admin"?'<a class="button button--primary" href="#admin" data-close-dialog>Відкрити адмінку</a>':'<a class="button button--primary" href="#calculator" data-close-dialog>Новий розрахунок</a>'}
          <button class="button button--ghost" type="button" id="logout-button">Вийти</button>
        </div>
      </div>
    `}return`
    <div class="auth-layout">
      <div class="auth-intro">
        <p class="eyebrow"><span></span> Кабінет ToffiPacks</p>
        <h2 id="account-dialog-title">Увійдіть або створіть акаунт.</h2>
        <p>Постійним клієнтам менеджер може активувати фіксовану ціну нижче публічної оптової.</p>
        <div class="demo-access">
          <strong>Демо-доступ</strong>
          <p>Клієнт: client@toffipacks.demo / client123</p>
          <p>Адмін: admin@toffipacks.demo / admin123</p>
        </div>
      </div>
      <div class="auth-forms">
        <div class="auth-tabs" role="tablist">
          <button class="is-active" type="button" role="tab" aria-selected="true" data-auth-tab="login">Вхід</button>
          <button type="button" role="tab" aria-selected="false" data-auth-tab="register">Реєстрація</button>
        </div>
        <form id="login-form" class="auth-form" data-auth-panel="login" novalidate>
          <label class="field"><span>Email</span><input class="input" name="email" type="email" required /></label>
          <label class="field"><span>Пароль</span><input class="input" name="password" type="password" required /></label>
          <div class="form-status" data-auth-status aria-live="polite"></div>
          <button class="button button--primary button--wide" type="submit">Увійти</button>
        </form>
        <form id="register-form" class="auth-form" data-auth-panel="register" hidden novalidate>
          <div class="form-grid">
            <label class="field"><span>Ім’я *</span><input class="input" name="name" required /></label>
            <label class="field"><span>Телефон *</span><input class="input" name="phone" type="tel" required /></label>
          </div>
          <label class="field"><span>Компанія</span><input class="input" name="company" /></label>
          <label class="field"><span>Email *</span><input class="input" name="email" type="email" required /></label>
          <label class="field"><span>Пароль, від 6 символів *</span><input class="input" name="password" type="password" minlength="6" required /></label>
          <div class="form-status" data-auth-status aria-live="polite"></div>
          <button class="button button--primary button--wide" type="submit">Створити акаунт</button>
        </form>
      </div>
    </div>
  `}function D(){const t=document.querySelector("#account-dialog"),e=document.querySelector("#account-dialog-content");!t||!e||(e.innerHTML=vt(),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""))}function ct(t,e,a){const s=t.querySelector("[data-auth-status]");s&&(s.textContent=e,s.className=`form-status is-${a}`)}function yt(t,e){const a=t.trim().toLocaleLowerCase("uk-UA"),s=k().find(i=>i.email.toLocaleLowerCase("uk-UA")===a&&i.password===e);return s?(localStorage.setItem(m.session,s.id),s):null}function tt(t,e=!1){if(!t.reportValidity())return;const a=new FormData(t),s=yt(String(a.get("email")??""),String(a.get("password")??""));if(!s||e&&s.role!=="admin"){ct(t,e?"Потрібен демо-акаунт адміністратора.":"Невірний email або пароль.","error");return}E(),w(),v(!1),e?x():D()}function $t(t){if(!t.reportValidity())return;const e=new FormData(t),a=String(e.get("email")??"").trim().toLocaleLowerCase("uk-UA"),s=k();if(s.some(o=>o.email.toLocaleLowerCase("uk-UA")===a)){ct(t,"Акаунт із таким email уже існує.","error");return}const i={id:`account-${Date.now().toString(36)}`,name:String(e.get("name")??"").trim(),phone:String(e.get("phone")??"").trim(),company:String(e.get("company")??"").trim(),email:a,password:String(e.get("password")??""),role:"client",partner:!1,fixedMarkup:R,createdAt:new Date().toISOString()};s.push(i),q(m.accounts,s),localStorage.setItem(m.session,i.id),E(),w(),v(!1),D()}function qt(t){const e=document.querySelector("#request-status");if(!t.reportValidity()){e&&(e.className="form-status is-error",e.textContent="Перевірте обов’язкові поля та згоду.");return}const a=new FormData(t),s=B(),i=T(),o=V(s,r,i),n={id:`TP-${Date.now().toString(36).toUpperCase()}`,createdAt:new Date().toISOString(),customerName:String(a.get("name")??"").trim(),phone:String(a.get("phone")??"").trim(),email:String(a.get("email")??"").trim(),company:String(a.get("company")??"").trim(),comment:String(a.get("comment")??"").trim(),productId:s.id,productNumber:s.number,dimensions:s.dimensions,quantity:r,unitPrice:o,total:o*r,priceType:rt(r,i),accountId:i?.id,status:"Нова"},c=O();c.push(n),q(m.orders,c),e&&(e.className="form-status is-success",e.innerHTML=`<strong>Заявку ${n.id} збережено локально.</strong><span>Вона вже доступна у демо-адмінці цього браузера.</span>`),t.querySelector('button[type="submit"]')?.focus()}function wt(t){return["Нова","У роботі","Уточнення","Підтверджена","Закрита"].map(a=>`<option value="${a}"${a===t?" selected":""}>${a}</option>`).join("")}function x(){const t=document.querySelector("#admin-content");if(!t)return;const e=T();if(!e||e.role!=="admin"){t.innerHTML=`
      <div class="admin-login">
        <p class="eyebrow"><span></span> Захищений демо-розділ</p>
        <h1 id="admin-title">Вхід для менеджера.</h1>
        <p>У реальному продукті тут потрібні серверна авторизація, права доступу та база даних.</p>
        <form id="admin-login-form" class="auth-form" novalidate>
          <label class="field"><span>Email</span><input class="input" name="email" type="email" value="admin@toffipacks.demo" required /></label>
          <label class="field"><span>Пароль</span><input class="input" name="password" type="password" value="admin123" required /></label>
          <div class="form-status" data-auth-status aria-live="polite"></div>
          <button class="button button--primary button--wide" type="submit">Увійти в демо-адмінку</button>
        </form>
      </div>
    `;return}const a=O().slice().reverse(),s=k().filter(n=>n.role==="client"),i=a.filter(n=>n.status!=="Закрита").length,o=a.reduce((n,c)=>n+c.total,0);t.innerHTML=`
    <div class="admin-shell">
      <div class="admin-title-row">
        <div>
          <p class="eyebrow"><span></span> Локальна демо-адмінка</p>
          <h1 id="admin-title">Заявки та клієнти.</h1>
        </div>
        <div>
          <span>${l(e.email)}</span>
          <button class="text-link" id="admin-logout" type="button">Вийти</button>
        </div>
      </div>
      <div class="admin-warning">
        Це демонстрація в localStorage. Заявки з інших браузерів і пристроїв сюди не потрапляють.
      </div>
      <div class="admin-stats">
        <article><span>Усі заявки</span><strong>${a.length}</strong></article>
        <article><span>Активні</span><strong>${i}</strong></article>
        <article><span>Клієнти</span><strong>${s.length}</strong></article>
        <article><span>Сума демо-заявок</span><strong>${d(o)}</strong></article>
      </div>
      <section class="admin-section">
        <div class="admin-section__head"><h2>Заявки</h2><span>${a.length} записів</span></div>
        <div class="orders-list">
          ${a.length?a.map(n=>`
                      <article class="order-card">
                        <div class="order-card__top">
                          <div><span>${l(n.id)}</span><strong>${l(n.customerName)}</strong></div>
                          <select class="select status-select" data-order-status="${l(n.id)}">${wt(n.status)}</select>
                        </div>
                        <div class="order-card__grid">
                          <div><span>Контакт</span><a href="tel:${l(n.phone)}">${l(n.phone)}</a><small>${l(n.email||"Email не вказано")}</small></div>
                          <div><span>Коробка</span><strong>№${l(n.productNumber)}</strong><small>${S(n.dimensions)}</small></div>
                          <div><span>Тираж</span><strong>${n.quantity.toLocaleString("uk-UA")} шт.</strong><small>${l(n.priceType)}</small></div>
                          <div><span>Сума</span><strong>${d(n.total)}</strong><small>${d(n.unitPrice)} / шт.</small></div>
                        </div>
                        ${n.company||n.comment?`<p class="order-card__comment">${l(n.company)}${n.company&&n.comment?" · ":""}${l(n.comment)}</p>`:""}
                        <time datetime="${n.createdAt}">${new Date(n.createdAt).toLocaleString("uk-UA")}</time>
                      </article>
                    `).join(""):'<div class="empty-state"><h3>Заявок ще немає.</h3><p>Створіть тестову заявку на головній сторінці.</p></div>'}
        </div>
      </section>
      <section class="admin-section">
        <div class="admin-section__head"><h2>Клієнти й фіксовані ціни</h2><span>Максимум +0,99 грн до базової</span></div>
        <div class="clients-table">
          <div class="clients-table__head"><span>Клієнт</span><span>Статус</span><span>Фіксована націнка</span></div>
          ${s.map(n=>`
                <div class="client-row">
                  <div><strong>${l(n.name)}</strong><span>${l(n.company||n.email)}</span><a href="tel:${l(n.phone)}">${l(n.phone)}</a></div>
                  <label class="partner-toggle"><input type="checkbox" data-partner-toggle="${n.id}"${n.partner?" checked":""} /><span>${n.partner?"Постійний":"Новий"}</span></label>
                  <label class="markup-control"><input class="input" type="number" min="0" max="0.99" step="0.01" value="${n.fixedMarkup.toFixed(2)}" data-partner-markup="${n.id}"${n.partner?"":" disabled"} /><span>грн</span></label>
                </div>
              `).join("")}
        </div>
      </section>
    </div>
  `}function lt(){const t=document.querySelector("#admin-page"),e=document.querySelector("#main"),a=document.querySelector(".site-header"),s=document.querySelector(".site-footer"),i=document.querySelector(".demo-strip"),o=window.location.hash==="#admin";t&&(t.hidden=!o),e&&(e.hidden=o),a&&(a.hidden=o),s&&(s.hidden=o),i&&(i.hidden=o),document.body.classList.toggle("is-admin",o),o&&(x(),window.scrollTo({top:0}))}function St(){const t=document.querySelectorAll(".reveal");if(!("IntersectionObserver"in window)){t.forEach(a=>a.classList.add("is-visible"));return}const e=new IntersectionObserver(a=>{a.forEach(s=>{s.isIntersecting&&(s.target.classList.add("is-visible"),e.unobserve(s.target))})},{threshold:.12});t.forEach(a=>e.observe(a))}document.querySelector("#menu-button")?.addEventListener("click",t=>{const e=t.currentTarget,a=document.querySelector("#site-nav"),s=e.getAttribute("aria-expanded")!=="true";e.setAttribute("aria-expanded",String(s)),a?.classList.toggle("is-open",s)});document.querySelectorAll(".site-nav a").forEach(t=>{t.addEventListener("click",()=>{document.querySelector("#site-nav")?.classList.remove("is-open"),document.querySelector("#menu-button")?.setAttribute("aria-expanded","false")})});document.querySelector("#fit-form")?.addEventListener("submit",t=>{t.preventDefault();const e=t.currentTarget,a=document.querySelector("#fit-message");if(!e.reportValidity()){a&&(a.textContent="Вкажіть три додатні розміри.",a.className="form-message is-error");return}const s=new FormData(e);L={length:Number(s.get("length")),width:Number(s.get("width")),height:Number(s.get("height"))},a&&(a.textContent="Розміри застосовано. Показуємо коробки нижче.",a.className="form-message is-success"),U(),window.setTimeout(()=>document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth"}),180)});document.querySelector("#catalog-search")?.addEventListener("input",t=>{z=t.currentTarget.value,U()});document.querySelector("#catalog-sort")?.addEventListener("change",t=>{K=t.currentTarget.value,U()});document.querySelector("#reset-catalog")?.addEventListener("click",()=>{L=null,z="";const t=document.querySelector("#catalog-search");t&&(t.value="");const e=document.querySelector("#fit-message");e&&(e.textContent=""),U()});document.querySelector("#calculator-product-select")?.addEventListener("change",t=>{G(t.currentTarget.value)});document.querySelector("#hero-product-select")?.addEventListener("change",t=>{G(t.currentTarget.value)});document.querySelector("#quantity-input")?.addEventListener("input",t=>{P(Number(t.currentTarget.value))});document.querySelector("#hero-quantity-input")?.addEventListener("input",t=>{P(Number(t.currentTarget.value))});document.querySelector("#quantity-range")?.addEventListener("input",t=>{P(Number(t.currentTarget.value))});document.querySelector("#request-form")?.addEventListener("submit",t=>{t.preventDefault(),qt(t.currentTarget)});document.addEventListener("click",t=>{const e=t.target,a=e.closest("[data-select-product]");if(a?.dataset.selectProduct){G(a.dataset.selectProduct,!0);return}const s=e.closest("[data-quantity]");if(s?.dataset.quantity){P(Number(s.dataset.quantity));return}const i=e.closest("[data-quantity-step]");if(i?.dataset.quantityStep){P(r+Number(i.dataset.quantityStep));return}if(e.closest("#account-button")||e.closest("#business-account-button")){D();return}if(e.closest("[data-close-dialog]")){(e.closest("dialog")??document.querySelector("#account-dialog"))?.close();return}const o=e.closest("[data-auth-tab]");if(o?.dataset.authTab){const n=o.closest(".auth-forms");n?.querySelectorAll("[data-auth-tab]").forEach(c=>{const u=c.dataset.authTab===o.dataset.authTab;c.classList.toggle("is-active",u),c.setAttribute("aria-selected",String(u))}),n?.querySelectorAll("[data-auth-panel]").forEach(c=>{c.hidden=c.dataset.authPanel!==o.dataset.authTab});return}if(e.closest("#logout-button")){localStorage.removeItem(m.session),E(),w(),v(!1),D();return}e.closest("#admin-logout")&&(localStorage.removeItem(m.session),E(),w(),v(!1),x())});document.addEventListener("submit",t=>{const e=t.target;e instanceof HTMLFormElement&&(e.id==="login-form"?(t.preventDefault(),tt(e)):e.id==="register-form"?(t.preventDefault(),$t(e)):e.id==="admin-login-form"&&(t.preventDefault(),tt(e,!0)))});document.addEventListener("change",t=>{const e=t.target;if(e instanceof HTMLInputElement||e instanceof HTMLSelectElement){if(e instanceof HTMLSelectElement&&e.dataset.orderStatus){const a=O(),s=a.find(i=>i.id===e.dataset.orderStatus);s&&(s.status=e.value,q(m.orders,a),x());return}if(e instanceof HTMLInputElement&&e.dataset.partnerToggle){const a=k(),s=a.find(i=>i.id===e.dataset.partnerToggle);s&&(s.partner=e.checked,q(m.accounts,a),x());return}if(e instanceof HTMLInputElement&&e.dataset.partnerMarkup){const a=k(),s=a.find(i=>i.id===e.dataset.partnerMarkup);s&&(s.fixedMarkup=Math.min(.99,Math.max(0,Number(e.value)||0)),q(m.accounts,a),x())}}});document.querySelector("#account-dialog")?.addEventListener("click",t=>{t.target===t.currentTarget&&t.currentTarget.close()});window.addEventListener("hashchange",lt);v(!0);window.setTimeout(()=>v(!1),460);w();E();lt();St();
