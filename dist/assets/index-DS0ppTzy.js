(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerPolicy&&(o.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?o.credentials="include":l.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(l){if(l.ep)return;l.ep=!0;const o=t(l);fetch(l.href,o)}})();const M=[{name:"Одяг",icon:"◫",note:"футболки, білизна, аксесуари"},{name:"Взуття",icon:"⌁",note:"пари до 33 см"},{name:"Косметика",icon:"◒",note:"баночки, набори, свічки"},{name:"Їжа",icon:"△",note:"торти й сухі продукти"},{name:"Подарунки",icon:"✦",note:"набори та сувеніри"},{name:"Електроніка",icon:"▣",note:"невеликі пристрої"},{name:"Пошта",icon:"→",note:"відправлення перевізником"},{name:"Інше",icon:"+",note:"підберемо за розміром"}],Q=[{id:"fit-mini",sku:"BL–101",name:"Fit Mini 160 × 110 × 40",shortName:"Fit Mini",purposes:["Косметика","Подарунки","Пошта"],type:"Поштова",inner:{length:160,width:110,height:40},outer:{length:168,width:116,height:44},material:"Мікрогофрокартон",colors:["Білий","Крафт"],colorTone:"white",basePrice:14.8,minOrder:10,inStock:!0,shippingDays:"1–2 дні",brandable:!0,postal:!0,description:"Компактна коробка для невеликих наборів, аксесуарів і косметики."},{id:"mailer-m",sku:"BL–122",name:"Mailer M 220 × 160 × 70",shortName:"Mailer M",purposes:["Одяг","Електроніка","Подарунки","Пошта"],type:"Поштова",inner:{length:220,width:160,height:70},outer:{length:230,width:168,height:76},material:"Мікрогофрокартон",colors:["Крафт","Білий","Графіт"],colorTone:"sand",basePrice:20.9,minOrder:10,inStock:!0,shippingDays:"1–2 дні",brandable:!0,postal:!0,description:"Універсальний формат для одягу, подарунків та безпечної доставки."},{id:"slide-100",sku:"BL–205",name:"Slide 100 × 75 × 35",shortName:"Slide 100",purposes:["Косметика","Подарунки"],type:"Шухляда",inner:{length:100,width:75,height:35},outer:{length:106,width:81,height:39},material:"Картон 350 г/м²",colors:["Білий","Графіт"],colorTone:"graphite",basePrice:18.4,minOrder:25,inStock:!0,shippingDays:"2–3 дні",brandable:!0,postal:!1,description:"Коробка-шухляда для свічок, прикрас і невеликих преміальних наборів."},{id:"shoe-330",sku:"BL–330",name:"Shoe 330 × 220 × 120",shortName:"Shoe 330",purposes:["Взуття","Пошта"],type:"Кришка-дно",inner:{length:330,width:220,height:120},outer:{length:342,width:232,height:128},material:"Мікрогофрокартон",colors:["Крафт","Білий"],colorTone:"sand",basePrice:31.6,minOrder:10,inStock:!0,shippingDays:"1–3 дні",brandable:!0,postal:!0,description:"Міцна коробка з окремою кришкою для взуття та об’ємних наборів."},{id:"cake-260",sku:"BL–426",name:"Cake 260 × 260 × 180",shortName:"Cake 260",purposes:["Їжа","Подарунки"],type:"Самозбірна",inner:{length:260,width:260,height:180},outer:{length:268,width:268,height:188},material:"Картон 350 г/м²",colors:["Білий"],colorTone:"white",basePrice:36.5,minOrder:10,inStock:!1,shippingDays:"5–7 днів",brandable:!0,postal:!1,description:"Висока коробка з харчового картону для тортів і кондитерських наборів."},{id:"gift-180",sku:"BL–518",name:"Gift 180 × 180 × 90",shortName:"Gift 180",purposes:["Косметика","Подарунки"],type:"Кришка-дно",inner:{length:180,width:180,height:90},outer:{length:190,width:190,height:98},material:"Крафт-картон",colors:["Крафт","Графіт"],colorTone:"lime",basePrice:27.2,minOrder:25,inStock:!0,shippingDays:"2–3 дні",brandable:!0,postal:!1,description:"Квадратний формат для подарункових, косметичних і гастронаборів."},{id:"safe-300",sku:"BL–630",name:"Safe 300 × 200 × 100",shortName:"Safe 300",purposes:["Одяг","Електроніка","Пошта"],type:"Поштова",inner:{length:300,width:200,height:100},outer:{length:312,width:210,height:108},material:"Мікрогофрокартон",colors:["Крафт"],colorTone:"sand",basePrice:28.9,minOrder:10,inStock:!0,shippingDays:"1–2 дні",brandable:!1,postal:!0,description:"Посилений поштовий формат для техніки, одягу й наборів середнього розміру."},{id:"long-360",sku:"BL–709",name:"Long 360 × 90 × 90",shortName:"Long 360",purposes:["Подарунки","Пошта","Інше"],type:"Самозбірна",inner:{length:360,width:90,height:90},outer:{length:370,width:98,height:98},material:"Крафт-картон",colors:["Крафт","Білий"],colorTone:"white",basePrice:23.6,minOrder:25,inStock:!1,shippingDays:"4–6 днів",brandable:!0,postal:!0,description:"Витягнута коробка для пляшок, текстилю, постерів і нестандартних подарунків."}],Y=[{q:"Який мінімальний тираж?",a:"Для демо-товарів — від 10 або 25 штук. Реальний мінімум залежить від конструкції, матеріалу та друку й має бути підтверджений власником."},{q:"Як правильно виміряти предмет?",a:"Виміряйте найдовшу, найширшу й найвищу сторону самого предмета. Сервіс автоматично врахує технологічний запас; не вводьте розмір старої коробки."},{q:"Чи можна додати логотип?",a:"У прототипі доступні демо-варіанти: наклейка або одноколірний друк. Точна ціна з’являється після перевірки макета й матеріалу."},{q:"Скільки триває виготовлення?",a:"На картках вказані демонстраційні строки. Готові коробки зазвичай відправляються швидше, а власний розмір і брендоване пакування потребують узгодження."},{q:"Як відбувається доставка й оплата?",a:"Цей прототип не приймає оплату. Перед запуском потрібно додати реальні способи доставки, реквізити, умови передоплати та повернення."},{q:"Можна спочатку отримати зразок?",a:"Таку опцію передбачено для майбутнього сервісу. У демо можна залишити заявку, але доступність і вартість набору зразків треба підтвердити."}],_=[{min:500,discount:.28,label:"500+"},{min:100,discount:.18,label:"100+"},{min:50,discount:.1,label:"50+"},{min:1,discount:0,label:"10+"}];function k(e,a){const t=_.find(s=>a>=s.min)??_[_.length-1];return Number((e*(1-t.discount)).toFixed(2))}function b(e){return new Intl.NumberFormat("uk-UA",{style:"currency",currency:"UAH",maximumFractionDigits:0}).format(e)}const Z="Усі назви, ціни, наявність і строки на цій сторінці — демонстраційні. Вони не є публічною офертою.",R=document.querySelector("#app");if(!R)throw new Error("Root element #app was not found.");const d={search:"",purpose:"",type:"",material:"",inStock:!1,brandable:!1,postal:!1,dimensions:null,sort:"recommended",loading:!0},n={step:0,purpose:"",dimensions:{length:180,width:120,height:60},weight:.4,structure:"",material:"",color:"Крафт",branding:"",quantity:50,urgency:"Стандартний"};let F=0,L="assembled",v=10,w=!1,q="plain";function C(e,a,t){return Math.min(Math.max(e,a),t)}function f(e){return`${e.length} × ${e.width} × ${e.height} мм`}function y(e,a={}){const t=Math.max(e.length,e.width,e.height,1),s=C(150+e.length/t*100,165,270),l=C(48+e.width/t*72,54,120),o=C(58+e.height/t*70,62,128),i=82,r=120,c=l*.62,u=l*.38,m=a.logo?" has-logo":"",$=a.objectLabel??"предмет";return`
    <svg class="box-diagram${m}" data-diagram-id="${a.id??""}" viewBox="0 0 540 350" role="img" aria-label="Схема коробки з внутрішніми розмірами ${f(e)}">
      <title>Коробка ${f(e)}</title>
      <desc>Технічна схема коробки з підписами довжини, ширини та висоти.</desc>
      <polygon class="box-face box-top" points="${i},${r} ${i+c},${r-u} ${i+s+c},${r-u} ${i+s},${r}" />
      <polygon class="box-face" points="${i+s},${r} ${i+s+c},${r-u} ${i+s+c},${r+o-u} ${i+s},${r+o}" />
      <rect class="box-face" x="${i}" y="${r}" width="${s}" height="${o}" />
      <rect class="object" x="${i+s*.18}" y="${r+o*.28}" width="${s*.64}" height="${o*.5}" rx="2" />
      <text x="${i+s/2}" y="${r+o*.59}" text-anchor="middle">${$}</text>
      <g class="logo-print" transform="translate(${i+s/2-28} ${r+o*.58-12})">
        <rect width="56" height="24" fill="#1c1e1b" />
        <text x="28" y="16" fill="#f3f3ed" text-anchor="middle" style="fill:#f3f3ed;font-size:10px">ВАШ ЛОГО</text>
      </g>
      <path class="measure" d="M ${i} ${r+o+36} V ${r+o+24} M ${i} ${r+o+30} H ${i+s} M ${i+s} ${r+o+36} V ${r+o+24}" />
      <g class="dimension-badge" transform="translate(${i+s/2} ${r+o+55})">
        <rect x="-34" y="-12" width="68" height="24" rx="12" />
        <text y="4" text-anchor="middle">${e.length} мм</text>
      </g>
      <path class="measure" d="M ${i-26} ${r} H ${i-14} M ${i-20} ${r} V ${r+o} M ${i-26} ${r+o} H ${i-14}" />
      <g class="dimension-badge" transform="translate(${i-54} ${r+o/2})">
        <rect x="-26" y="-12" width="52" height="24" rx="12" />
        <text y="4" text-anchor="middle">${e.height} мм</text>
      </g>
      <path class="measure measure--width" d="M ${i+s+c} ${r-u-4} V ${r-u-28}" />
      <g class="dimension-badge dimension-badge--width" transform="translate(${i+s+c} ${r-u-42})">
        <rect x="-34" y="-12" width="68" height="24" rx="12" />
        <text y="4" text-anchor="middle">${e.width} мм</text>
      </g>
    </svg>`}function J(e,a="assembled",t=!1){const s=`tone-${e.colorTone}`;return a==="net"?`
      <svg class="product-svg" viewBox="0 0 420 300" role="img" aria-label="Розгортка коробки ${e.shortName}">
        <title>Технічна розгортка ${e.shortName}</title>
        <g transform="translate(42 35)">
          <rect class="face ${s}" x="94" y="57" width="145" height="96" />
          <rect class="face ${s}" x="94" y="8" width="145" height="49" />
          <rect class="face ${s}" x="94" y="153" width="145" height="49" />
          <rect class="face ${s}" x="34" y="57" width="60" height="96" />
          <rect class="face ${s}" x="239" y="57" width="60" height="96" />
          <path class="measure" stroke-dasharray="5 4" d="M94 57H239M94 153H239M94 57V153M239 57V153" />
          <text x="166" y="110" text-anchor="middle">${e.sku}</text>
          ${t?'<rect x="141" y="119" width="52" height="18" fill="#1c1e1b"/><text x="167" y="132" text-anchor="middle" style="fill:#f3f3ed;font-size:8px">ВАШ ЛОГО</text>':""}
        </g>
      </svg>`:`
    <svg class="product-svg" viewBox="0 0 420 300" role="img" aria-label="Зібрана коробка ${e.shortName}">
      <title>Коробка ${e.shortName}</title>
      <g transform="translate(38 30)">
        <polygon class="face fold-flap ${s}" points="58,82 132,39 329,39 255,82" />
        <polygon class="face ${s}" points="255,82 329,39 329,155 255,201" />
        <polygon class="face ${s}" points="58,82 255,82 255,201 58,201" />
        ${t?'<rect x="128" y="126" width="62" height="25" fill="#1c1e1b"/><text x="159" y="142" text-anchor="middle" style="fill:#f3f3ed;font-size:8px">ВАШ ЛОГО</text>':`<text x="157" y="146" text-anchor="middle">${e.sku}</text>`}
        <path class="measure" d="M58 224V211M58 218H255M255 224V211" />
        <text x="156" y="244" text-anchor="middle">${e.inner.length} мм</text>
      </g>
    </svg>`}function ee(){return`
    <div class="demo-strip" role="note">Демо-прототип · ціни, наявність і строки не є офертою</div>
    <header class="site-header">
      <div class="shell header-row">
        <a class="brand" href="#top" aria-label="Box Lab, на головну">
          <span class="brand-mark" aria-hidden="true">□</span>
          <span>Box Lab</span>
        </a>
        <nav class="main-nav" id="main-nav" aria-label="Головна навігація">
          <a href="#catalog">Каталог</a>
          <a href="#constructor">Конструктор</a>
          <a href="#branding">Брендування</a>
          <a href="#business">Для бізнесу</a>
          <a href="#delivery">Доставка</a>
          <a href="#faq">FAQ</a>
          <a class="button button--accent header-cta" href="#request">Запросити розрахунок</a>
        </nav>
        <button class="icon-button menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="Відкрити меню">
          <span aria-hidden="true">☰</span>
        </button>
      </div>
    </header>`}function te(){const e={length:180,width:120,height:60};return`
    <main id="main">
      <section class="hero" id="top">
        <div class="shell">
          <div class="hero-intro">
            <div>
              <p class="eyebrow">Лабораторія пакування / 01</p>
              <h1>Коробка точно під ваш продукт.</h1>
            </div>
            <div class="hero-copy">
              <p>Введіть розміри предмета — сервіс покаже готові варіанти й чесно порахує демо-ціну.</p>
              <div class="hero-actions">
                <a class="button button--accent" href="#fit-form">Підібрати за розміром <span aria-hidden="true">↓</span></a>
                <a class="button" href="#constructor">Створити свою</a>
              </div>
            </div>
          </div>
          <div class="fit-lab">
            <form class="fit-controls" id="fit-form">
              <span class="technical-label">Fit check / внутрішній розмір</span>
              <h2>Підберімо розмір</h2>
              <p class="microcopy">Розміри предмета, а не старої коробки. Для підбору можна повертати предмет усередині.</p>
              <div class="field">
                <label for="hero-purpose">Предмет</label>
                <select class="select" id="hero-purpose" name="purpose">
                  ${M.map(a=>`<option value="${a.name}">${a.name} — ${a.note}</option>`).join("")}
                </select>
              </div>
              <div class="dimensions-grid" aria-label="Розміри предмета у міліметрах">
                <div class="field dimension-field">
                  <label for="hero-length">Довжина</label>
                  <input class="input" id="hero-length" name="length" type="number" min="10" max="1200" value="${e.length}" required inputmode="numeric" />
                </div>
                <div class="field dimension-field">
                  <label for="hero-width">Ширина</label>
                  <input class="input" id="hero-width" name="width" type="number" min="10" max="1200" value="${e.width}" required inputmode="numeric" />
                </div>
                <div class="field dimension-field">
                  <label for="hero-height">Висота</label>
                  <input class="input" id="hero-height" name="height" type="number" min="10" max="1200" value="${e.height}" required inputmode="numeric" />
                </div>
              </div>
              <p class="microcopy">Внутрішній розмір — стільки місця буде у товару. Додамо технологічний запас у конструкторі.</p>
              <button class="button button--accent fit-submit" type="submit">Знайти коробку <span aria-hidden="true">→</span></button>
            </form>
            <div class="fit-visual" id="hero-visual">
              ${y(e,{objectLabel:"ваш предмет",id:"hero"})}
              <div class="air-note" id="air-note">Рекомендуємо запас 5 мм з кожного боку.</div>
            </div>
          </div>
        </div>
      </section>`}function ae(){const e=[{structure:"Самозбірна",dimensions:{length:320,width:240,height:80},result:"Плаский одяг, комплекти та аксесуари."},{structure:"Кришка-дно",dimensions:{length:340,width:220,height:120},result:"Пара взуття з місцем для паперу."},{structure:"Шухляда",dimensions:{length:180,width:120,height:70},result:"Набори, баночки та невеликі флакони."},{structure:"Кришка-дно",dimensions:{length:260,width:260,height:140},result:"Сухі продукти, випічка та набори."},{structure:"Кришка-дно",dimensions:{length:240,width:170,height:80},result:"Подарунковий набір із презентаційною подачею."},{structure:"Самозбірна",dimensions:{length:220,width:160,height:80},result:"Невеликі пристрої з місцем для захисту."},{structure:"Поштова",dimensions:{length:300,width:210,height:100},result:"Відправлення перевізником без зайвої обгортки."},{structure:"Підбір за розміром",dimensions:{length:240,width:170,height:80},result:"Введіть габарити — підберемо найближчий формат."}];return`
    <section class="section section--purpose" aria-labelledby="purpose-title">
      <div class="shell">
        <div class="section-head">
          <div>
            <p class="eyebrow">За предметом / 02</p>
            <h2 id="purpose-title">Оберіть, що пакуєте.</h2>
          </div>
          <p>Спочатку оберіть сценарій. Праворуч з’явиться орієнтовна конструкція, а каталог уже буде відфільтровано.</p>
        </div>
        <div class="purpose-lab">
          <div class="purpose-grid" role="group" aria-label="Сценарії пакування">
            ${M.map((a,t)=>{const s=e[t];return`
                  <button
                    class="purpose-card"
                    type="button"
                    data-purpose="${a.name}"
                    data-index="${String(t+1).padStart(2,"0")}"
                    data-length="${s.dimensions.length}"
                    data-width="${s.dimensions.width}"
                    data-height="${s.dimensions.height}"
                    data-structure="${s.structure}"
                    data-result="${s.result}"
                    aria-pressed="false"
                  >
                    <span class="purpose-card__number" aria-hidden="true">${String(t+1).padStart(2,"0")}</span>
                    <span class="purpose-card__copy">
                      <strong>${a.name}</strong>
                      <small>${a.note}</small>
                    </span>
                    <span class="purpose-card__action" aria-hidden="true">Обрати</span>
                  </button>`}).join("")}
          </div>
          <aside class="purpose-preview" id="purpose-preview" aria-live="polite">
            <div class="purpose-preview__top">
              <span>LIVE / СЦЕНАРІЙ</span>
              <span id="purpose-preview-counter">— / 08</span>
            </div>
            <div class="purpose-preview__canvas" id="purpose-preview-canvas">
              ${y({length:240,width:170,height:80},{objectLabel:"ваш предмет",id:"purpose"})}
            </div>
            <div class="purpose-preview__info">
              <span class="technical-label" id="purpose-preview-structure">Орієнтовна конструкція</span>
              <h3 id="purpose-preview-title">Оберіть предмет</h3>
              <p id="purpose-preview-note">Покажемо демо-формат коробки та підготуємо каталог до перегляду.</p>
              <button class="button purpose-preview__cta" id="purpose-preview-cta" type="button" disabled>
                Спочатку оберіть сценарій
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>`}function se(){const e=["Самозбірна","Кришка-дно","Шухляда","Поштова"],a=["Мікрогофрокартон","Картон 350 г/м²","Крафт-картон"];return`
    <section class="section" id="catalog" aria-labelledby="catalog-title">
      <div class="shell">
        <div class="section-head">
          <div>
            <p class="eyebrow">Демо-каталог / 03</p>
            <h2 id="catalog-title">Готові розміри, які легко порівняти.</h2>
          </div>
          <p>Асортимент, ціни й строки — демонстраційні дані. Підбір і ступенева ціна працюють як у майбутньому сервісі.</p>
        </div>
        <div class="catalog-layout">
          <aside class="catalog-filters" aria-label="Фільтри каталогу">
            <h3>Фільтри</h3>
            <div class="field filter-full">
              <label for="filter-purpose">Що пакуємо</label>
              <select class="select" id="filter-purpose">
                <option value="">Усі задачі</option>
                ${M.map(t=>`<option value="${t.name}">${t.name}</option>`).join("")}
              </select>
            </div>
            <div class="field filter-full">
              <label for="filter-type">Тип коробки</label>
              <select class="select" id="filter-type">
                <option value="">Усі типи</option>
                ${e.map(t=>`<option value="${t}">${t}</option>`).join("")}
              </select>
            </div>
            <div class="field filter-full">
              <label for="filter-material">Матеріал</label>
              <select class="select" id="filter-material">
                <option value="">Усі матеріали</option>
                ${a.map(t=>`<option value="${t}">${t}</option>`).join("")}
              </select>
            </div>
            <label class="check"><input id="filter-stock" type="checkbox" /> <span>Є в наявності</span></label>
            <label class="check"><input id="filter-brandable" type="checkbox" /> <span>Можна брендувати</span></label>
            <label class="check"><input id="filter-postal" type="checkbox" /> <span>Для поштової відправки</span></label>
            <div id="active-size-filter"></div>
            <button class="button button--ghost" id="reset-filters" type="button">Скинути фільтри</button>
          </aside>
          <div class="catalog-main">
            <div class="catalog-toolbar">
              <div class="search-wrap">
                <span class="search-icon" aria-hidden="true">⌕</span>
                <label class="sr-only" for="catalog-search">Пошук у каталозі</label>
                <input class="input" id="catalog-search" type="search" placeholder="Назва, артикул або призначення" autocomplete="off" />
              </div>
              <div class="field">
                <label class="sr-only" for="catalog-sort">Сортування</label>
                <select class="select" id="catalog-sort">
                  <option value="recommended">Рекомендовані</option>
                  <option value="price-asc">Спочатку дешевші</option>
                  <option value="price-desc">Спочатку дорожчі</option>
                  <option value="size">За об’ємом</option>
                </select>
              </div>
            </div>
            <div class="results-meta"><span id="results-count" aria-live="polite">Завантажуємо демо-товари…</span><span class="tag tag--accent">demo data</span></div>
            <div id="catalog-results" aria-busy="true"></div>
          </div>
        </div>
      </div>
    </section>`}function ie(){return`
    <section class="section section--ink" id="constructor" aria-labelledby="constructor-title">
      <div class="shell">
        <div class="section-head">
          <div>
            <p class="eyebrow">Box builder / 04</p>
            <h2 id="constructor-title">Власна коробка — крок за кроком.</h2>
          </div>
          <p>Шість коротких кроків. Можна повертатися назад — введені дані залишаться на місці.</p>
        </div>
        <div class="wizard-shell">
          <div class="wizard-main" id="wizard-main"></div>
          <div class="wizard-visual" id="wizard-visual">
            ${y(n.dimensions,{objectLabel:"ваш продукт",id:"wizard"})}
          </div>
        </div>
      </div>
    </section>`}function ne(){return`
    <section class="section" id="branding" aria-labelledby="branding-title">
      <div class="shell">
        <div class="section-head">
          <div>
            <p class="eyebrow">Брендування / 05</p>
            <h2 id="branding-title">Пакування, яке працює на бренд.</h2>
          </div>
          <p>Перемикач показує функціональну різницю: друк з’являється на коробці, а демо-ціна змінюється прозоро.</p>
        </div>
        <div class="branding-lab">
          <div class="branding-copy">
            <span class="technical-label">Demo branding options</span>
            <h3>Додайте бренд тоді, коли готові.</h3>
            <p class="muted">Не обіцяємо технологію до перевірки макета. У прототипі показані три типові сценарії.</p>
            <ul>
              <li>Без брендування — базова коробка</li>
              <li>Наклейка — від +3 грн / шт. у демо</li>
              <li>Одноколірний друк — від +5 грн / шт. у демо</li>
            </ul>
            <a class="button" href="#request">Надіслати макет</a>
          </div>
          <div class="branding-stage" id="branding-stage">
            <div class="segmented" role="group" aria-label="Показати коробку без або з логотипом">
              <button class="segment" type="button" data-brand-mode="plain" aria-pressed="true">Без логотипа</button>
              <button class="segment" type="button" data-brand-mode="logo" aria-pressed="false">З логотипом</button>
            </div>
            <div id="branding-visual">${y({length:240,width:170,height:80},{id:"branding"})}</div>
            <div class="branding-price"><span id="branding-caption">Чиста коробка</span><strong id="branding-cost">Базова ціна</strong></div>
          </div>
        </div>
      </div>
    </section>`}function re(){return`
    <section class="section section--accent" id="business" aria-labelledby="business-title">
      <div class="shell">
        <div class="section-head">
          <div>
            <p class="eyebrow">Для бізнесу / 06</p>
            <h2 id="business-title">Почніть із малого тиражу.</h2>
          </div>
          <p>Сервіс запам’ятовує параметри локально в браузері. Реальний кабінет і повтор замовлення — наступний етап після підтвердження процесів.</p>
        </div>
        <div class="business-grid">
          <article class="business-item">
            <span class="business-item__num">01 / Зразки</span>
            <h3>Спочатку перевірте.</h3>
            <p>Запросіть демо-набір популярних розмірів і матеріалів перед великим тиражем.</p>
          </article>
          <article class="business-item">
            <span class="business-item__num">02 / Свій розмір</span>
            <h3>Менше повітря.</h3>
            <p>Підженемо внутрішній розмір під продукт і покажемо орієнтир ціни до заявки.</p>
          </article>
          <article class="business-item">
            <span class="business-item__num">03 / Повтор</span>
            <h3>Ті самі параметри.</h3>
            <p>Збережіть розрахунок локально. Після запуску його можна перетворити на шаблон повторного замовлення.</p>
          </article>
        </div>
        <div class="process-line" aria-label="Етапи роботи">
          <div class="process-step"><strong>Задача</strong><small>Предмет, розмір, тираж</small></div>
          <div class="process-step"><strong>Зразок</strong><small>Матеріал і тест посадки</small></div>
          <div class="process-step"><strong>Виробництво</strong><small>Після підтвердження макета</small></div>
          <div class="process-step"><strong>Доставка</strong><small>За реальними умовами власника</small></div>
        </div>
      </div>
    </section>`}function oe(){return`
    <section class="section" id="delivery" aria-labelledby="delivery-title">
      <div class="shell">
        <div class="section-head">
          <div>
            <p class="eyebrow">Логістика / 07</p>
            <h2 id="delivery-title">Зрозумілі умови без прихованих кроків.</h2>
          </div>
          <p>Прототип не приймає гроші та не надсилає замовлення. Нижче — структура, яку треба заповнити реальними умовами.</p>
        </div>
        <div class="delivery-grid">
          <article class="delivery-item">
            <span class="delivery-item__num">01 / Доставка</span>
            <h3>Україна</h3>
            <p>Перевізники, міста відправки, строки й тариф потребують підтвердження власника.</p>
          </article>
          <article class="delivery-item">
            <span class="delivery-item__num">02 / Оплата</span>
            <h3>Після узгодження</h3>
            <p>У демо є лише запит розрахунку. Рахунок, передоплата та документи не імітуються.</p>
          </article>
          <article class="delivery-item">
            <span class="delivery-item__num">03 / Повернення</span>
            <h3>Різні правила</h3>
            <p>Для готових і персоналізованих коробок мають діяти окремі реальні умови повернення.</p>
          </article>
        </div>
      </div>
    </section>`}function le(){return`
    <section class="section" id="faq" aria-labelledby="faq-title">
      <div class="shell">
        <div class="section-head">
          <div>
            <p class="eyebrow">FAQ / 08</p>
            <h2 id="faq-title">Все важливе перед замовленням.</h2>
          </div>
          <p>Технічні слова пояснюємо поруч із вибором. Невідомі бізнес-умови не маскуємо вигаданими обіцянками.</p>
          <div class="faq-meta" aria-label="Коротко про розділ">
            <span>06 відповідей</span>
            <span>≈ 2 хв читання</span>
          </div>
        </div>
        <div class="faq-list">
          ${Y.map((e,a)=>`
                <details class="faq-item" ${a===0?"open":""}>
                  <summary>${e.q}</summary>
                  <p>${e.a}</p>
                </details>`).join("")}
        </div>
      </div>
    </section>`}function ce(){return`
    <section class="section section--ink" id="request" aria-labelledby="request-title">
      <div class="shell contact-layout">
        <div class="contact-copy">
          <p class="eyebrow">Запит / 09</p>
          <h2 id="request-title">Покажіть продукт — ми підберемо коробку.</h2>
          <p>Опишіть продукт і тираж. Форма перевіряє дані, але нічого не відправляє на сервер — це безпечна локальна демонстрація.</p>
          <div class="contact-points" aria-label="Контактні дані">
            <span><strong>Email:</strong> потрібен від власника</span>
            <span><strong>Телефон:</strong> потрібен від власника</span>
            <span><strong>Місто виробництва:</strong> потрібне від власника</span>
          </div>
        </div>
        <form class="quote-form" id="quote-form" novalidate>
          <h3>Запросити розрахунок</h3>
          <p class="muted">Відповідь не надсилається. Успіх форми показує лише стан прототипу.</p>
          <div class="form-grid">
            <div class="field">
              <label for="quote-name">Ім’я *</label>
              <input class="input" id="quote-name" name="name" autocomplete="name" aria-describedby="quote-name-error" />
              <p class="field-error" id="quote-name-error"></p>
            </div>
            <div class="field">
              <label for="quote-contact">Телефон або email *</label>
              <input class="input" id="quote-contact" name="contact" autocomplete="email" aria-describedby="quote-contact-error" />
              <p class="field-error" id="quote-contact-error"></p>
            </div>
            <div class="field field--full">
              <label for="quote-company">Компанія</label>
              <input class="input" id="quote-company" name="company" autocomplete="organization" />
              <p class="field-error"></p>
            </div>
            <div class="field field--full">
              <label for="quote-message">Що пакуємо, розмір і тираж *</label>
              <textarea class="textarea" id="quote-message" name="message" aria-describedby="quote-message-error" placeholder="Наприклад: свічка 90 × 90 × 110 мм, 100 штук, потрібна наклейка"></textarea>
              <p class="field-error" id="quote-message-error"></p>
            </div>
            <div class="field field--full">
              <label for="quote-logo">Макет логотипа, якщо є</label>
              <input class="input" id="quote-logo" name="logo" type="file" accept=".svg,.pdf,.png,.jpg,.jpeg" aria-describedby="file-note" />
              <span class="file-note" id="file-note">SVG, PDF, PNG або JPG. Файл залишається у вашому браузері.</span>
            </div>
            <div class="field field--full">
              <label class="check"><input id="quote-consent" name="consent" type="checkbox" aria-describedby="quote-consent-error" /> <span>Погоджуюся на локальну обробку введених даних у цьому демо *</span></label>
              <p class="field-error" id="quote-consent-error"></p>
            </div>
          </div>
          <div class="form-status" id="form-status" role="status" aria-live="polite"></div>
          <button class="button button--accent" id="quote-submit" type="submit">Перевірити запит</button>
        </form>
      </div>
    </section>
    </main>`}function de(){return`
    <footer class="site-footer">
      <div class="shell footer-row">
        <a class="brand" href="#top"><span class="brand-mark" aria-hidden="true">□</span><span>Box Lab</span></a>
        <p>${Z} © 2026 Box Lab prototype.</p>
      </div>
    </footer>
    <dialog class="product-dialog" id="product-dialog" aria-labelledby="product-dialog-title"></dialog>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>`}R.innerHTML=[ee(),te(),ae(),se(),ie(),ne(),re(),oe(),le(),ce(),de()].join("");function g(e,a=!1){const t=e.querySelector(".select-trigger"),s=e.querySelector(".select-menu");e.classList.remove("is-open"),t?.setAttribute("aria-expanded","false"),s&&(s.matches(":popover-open")&&s.hidePopover(),s.hidden=!0),a&&t?.focus()}function ue(e,a){if(!a.matches(":popover-open"))return;const t=e.getBoundingClientRect(),s=8,l=window.innerHeight-t.bottom-s,o=t.top-s,i=Math.min(a.scrollHeight,288),r=l<Math.min(i,190)&&o>l,c=Math.max(120,r?o:l),u=Math.min(t.width,window.innerWidth-16),m=Math.min(Math.max(8,t.left),Math.max(8,window.innerWidth-u-8));a.style.left=`${m}px`,a.style.width=`${u}px`,a.style.maxHeight=`${Math.min(288,c)}px`,a.style.top=r?"auto":`${t.bottom+s}px`,a.style.bottom=r?`${window.innerHeight-t.top+s}px`:"auto"}function S(e){const a=e.closest(".custom-select");if(!a)return;const s=e.options[e.selectedIndex]?.textContent?.trim()||"Оберіть варіант",l=a.querySelector(".select-trigger__value");l&&(l.textContent=s),a.querySelectorAll(".select-option").forEach(o=>{const i=o.dataset.value===e.value;o.classList.toggle("is-selected",i),o.setAttribute("aria-selected",String(i))})}function P(e=document){e.querySelectorAll("select.select:not([data-enhanced])").forEach(a=>{a.dataset.enhanced="true",a.classList.add("select-native"),a.tabIndex=-1,a.setAttribute("aria-hidden","true");const t=document.createElement("div");t.className="custom-select",a.parentNode?.insertBefore(t,a),t.append(a);const s=document.createElement("button");s.className="select-trigger",s.type="button",s.id=`${a.id||`select-${Math.random().toString(36).slice(2)}`}-trigger`,s.setAttribute("role","combobox"),s.setAttribute("aria-haspopup","listbox"),s.setAttribute("aria-expanded","false"),s.innerHTML='<span class="select-trigger__value"></span><span class="select-trigger__chevron" aria-hidden="true"></span>';const l=a.id?document.querySelector(`label[for="${a.id}"]`):null;l?(l.htmlFor=s.id,l.id||(l.id=`${s.id}-label`),s.setAttribute("aria-labelledby",l.id)):s.setAttribute("aria-label",a.getAttribute("aria-label")||"Оберіть варіант");const o=document.createElement("div");o.className="select-menu",o.id=`${s.id}-listbox`,o.setAttribute("role","listbox"),o.setAttribute("popover","manual"),o.hidden=!0,s.setAttribute("aria-controls",o.id),Array.from(a.options).forEach(i=>{const r=document.createElement("button");r.className="select-option",r.type="button",r.tabIndex=-1,r.dataset.value=i.value,r.setAttribute("role","option"),r.textContent=i.textContent,r.addEventListener("click",()=>{a.value=i.value,S(a),a.dispatchEvent(new Event("input",{bubbles:!0})),a.dispatchEvent(new Event("change",{bubbles:!0})),g(t,!0)}),r.addEventListener("keydown",c=>{const u=Array.from(o.querySelectorAll(".select-option")),m=u.indexOf(r);if(c.key==="ArrowDown"||c.key==="ArrowUp"){c.preventDefault();const $=c.key==="ArrowDown"?1:-1;u[(m+$+u.length)%u.length]?.focus()}(c.key==="Home"||c.key==="End")&&(c.preventDefault(),u[c.key==="Home"?0:u.length-1]?.focus()),c.key==="Escape"&&(c.preventDefault(),g(t,!0)),c.key==="Tab"&&g(t)}),o.append(r)}),t.append(s,o),S(a),a.addEventListener("change",()=>S(a)),s.addEventListener("click",()=>{const i=!t.classList.contains("is-open");document.querySelectorAll(".custom-select.is-open").forEach(r=>g(r)),i&&(t.classList.add("is-open"),s.setAttribute("aria-expanded","true"),o.hidden=!1,o.showPopover(),ue(s,o))}),s.addEventListener("keydown",i=>{if(i.key==="Escape"&&t.classList.contains("is-open")){i.preventDefault(),g(t,!0);return}if(!["ArrowDown","ArrowUp","Home","End"].includes(i.key))return;i.preventDefault(),t.classList.contains("is-open")||s.click();const r=Array.from(o.querySelectorAll(".select-option")),c=Math.max(0,a.selectedIndex),u=i.key==="End"?r.length-1:i.key==="Home"?0:c;r[u]?.focus()})})}function D(e=document){e.querySelectorAll("input.range").forEach(a=>{const t=()=>{const s=Number(a.min)||0,l=Number(a.max)||100,i=(Number(a.value)-s)/Math.max(1,l-s)*100;a.style.setProperty("--range-progress",`${i}%`)};t(),a.dataset.rangeEnhanced!=="true"&&(a.dataset.rangeEnhanced="true",a.addEventListener("input",t))})}document.addEventListener("pointerdown",e=>{const a=e.target;document.querySelectorAll(".custom-select.is-open").forEach(t=>{t.contains(a)||g(t)})});window.addEventListener("resize",()=>{document.querySelectorAll(".custom-select.is-open").forEach(e=>g(e))});window.addEventListener("scroll",e=>{e.target instanceof Element&&e.target.closest(".select-menu")||document.querySelectorAll(".custom-select.is-open").forEach(a=>g(a))},!0);function K(){return{length:Number(document.querySelector("#hero-length")?.value)||0,width:Number(document.querySelector("#hero-width")?.value)||0,height:Number(document.querySelector("#hero-height")?.value)||0}}function W(){const e=K(),a=document.querySelector("#hero-visual");if(!a||Object.values(e).some(i=>i<=0))return;const t=document.querySelector("#hero-purpose")?.value.toLowerCase()??"предмет";a.querySelector(".box-diagram")?.remove(),a.insertAdjacentHTML("afterbegin",y(e,{objectLabel:t,id:"hero"}));const l=e.length*e.width*e.height/1e6,o=document.querySelector("#air-note");o&&(o.textContent=`Об’єм: ${l.toFixed(1)} л · рекомендуємо запас 5 мм.`)}function E(e){return e.inner.length*e.inner.width*e.inner.height}function pe(e,a){const t=[e.inner.length,e.inner.width,e.inner.height].sort((l,o)=>l-o);return[a.length,a.width,a.height].sort((l,o)=>l-o).every((l,o)=>l<=t[o])}function he(){const e=d.search.trim().toLocaleLowerCase("uk-UA"),a=Q.filter(t=>{const s=[t.name,t.sku,t.description,t.type,t.material,...t.purposes].join(" ").toLocaleLowerCase("uk-UA");return(!e||s.includes(e))&&(!d.purpose||t.purposes.includes(d.purpose))&&(!d.type||t.type===d.type)&&(!d.material||t.material===d.material)&&(!d.inStock||t.inStock)&&(!d.brandable||t.brandable)&&(!d.postal||t.postal)&&(!d.dimensions||pe(t,d.dimensions))});return d.sort==="price-asc"?a.sort((t,s)=>t.basePrice-s.basePrice):d.sort==="price-desc"?a.sort((t,s)=>s.basePrice-t.basePrice):d.sort==="size"?a.sort((t,s)=>E(t)-E(s)):d.dimensions?a.sort((t,s)=>E(t)-E(s)):a}function me(){return`<div class="skeleton-grid" aria-label="Завантаження товарів">
    ${Array.from({length:6},()=>`
      <div class="skeleton-card" aria-hidden="true">
        <div class="skeleton skeleton--visual"></div>
        <div class="skeleton skeleton--line"></div>
        <div class="skeleton skeleton--line short"></div>
      </div>`).join("")}
  </div>`}function ve(e){return`
    <button class="product-card" type="button" data-product-id="${e.id}" aria-label="Відкрити картку ${e.name}">
      <span class="product-card__visual">
        ${J(e)}
      </span>
      <span class="product-card__body">
        <span class="product-card__topline">
          <span class="technical-label">${e.sku}</span>
          <span class="tag tag--accent">demo</span>
        </span>
        <h3>${e.shortName}</h3>
        <span class="mono">Внутрішній: ${f(e.inner)}</span>
        <span class="product-card__use">${e.purposes.slice(0,3).join(" · ")}</span>
        <span class="product-card__foot">
          <span><span class="price">від ${b(k(e.basePrice,500))}</span><br /><small>/ шт. при 500</small></span>
          <span><strong>мін. ${e.minOrder}</strong><br /><small>${e.inStock?"є в наявності":"під замовлення"}</small></span>
        </span>
      </span>
    </button>`}function ge(){const e=document.querySelector("#active-size-filter");e&&(e.innerHTML=d.dimensions?`<div class="active-size"><strong>Розмір предмета</strong><br />${f(d.dimensions)}<br /><button type="button" id="clear-size-filter">Прибрати розмір</button></div>`:"",document.querySelector("#clear-size-filter")?.addEventListener("click",()=>{d.dimensions=null,p()}))}function A(){const e=document.querySelector("#catalog-results"),a=document.querySelector("#results-count");if(!e||!a)return;if(ge(),d.loading){e.setAttribute("aria-busy","true"),e.innerHTML=me(),a.textContent="Завантажуємо демо-товари…";return}if(e.setAttribute("aria-busy","false"),d.search.trim().toLocaleLowerCase("uk-UA")==="помилка"){a.textContent="Каталог тимчасово недоступний",e.innerHTML=`
      <div class="error-state" role="alert">
        <div><div class="empty-box" aria-hidden="true"></div><h3>Не вдалося завантажити каталог.</h3><p class="muted">Це демонстраційний стан помилки. Дані не втрачено.</p><button class="button" id="catalog-retry" type="button">Спробувати ще раз</button></div>
      </div>`,document.querySelector("#catalog-retry")?.addEventListener("click",()=>{d.search="";const s=document.querySelector("#catalog-search");s&&(s.value=""),p()});return}const t=he();if(a.textContent=`${t.length} ${t.length===1?"коробка":t.length<5?"коробки":"коробок"} знайдено`,!t.length){e.innerHTML=`
      <div class="empty-state">
        <div><div class="empty-box" aria-hidden="true"></div><h3>Готового розміру немає.</h3><p class="muted">Змініть фільтри або створіть коробку під ваш продукт.</p><a class="button button--accent" href="#constructor">Створити свій розмір</a></div>
      </div>`;return}e.innerHTML=`<div class="product-grid">${t.map(ve).join("")}</div>`,e.querySelectorAll("[data-product-id]").forEach(s=>{s.addEventListener("click",()=>be(s.dataset.productId??""))})}function p(e=320){window.clearTimeout(F),d.loading=!0,A(),F=window.setTimeout(()=>{d.loading=!1,A()},e)}function be(e){const a=Q.find(s=>s.id===e),t=document.querySelector("#product-dialog");!a||!t||(L="assembled",v=a.minOrder,w=!1,H(a),t.showModal(),document.body.classList.add("dialog-open"))}function H(e){const a=document.querySelector("#product-dialog");if(!a)return;const t=k(e.basePrice+(w?3:0),v);a.innerHTML=`
    <button class="icon-button dialog-close" id="dialog-close" type="button" aria-label="Закрити картку">×</button>
    <article class="product-detail">
      <div class="product-detail__visual" id="detail-visual">
        ${J(e,L,w)}
        <div class="detail-tabs" role="group" aria-label="Вигляд коробки">
          <button class="detail-tab" type="button" data-detail-view="assembled" aria-pressed="${L==="assembled"}">Зібрана</button>
          <button class="detail-tab" type="button" data-detail-view="net" aria-pressed="${L==="net"}">Розгортка</button>
        </div>
      </div>
      <div class="product-detail__content">
        <span class="tag tag--accent">demo data</span>
        <h2 id="product-dialog-title">${e.shortName}</h2>
        <p>${e.description}</p>
        <div class="detail-measures">
          <div><span class="technical-label">Внутрішній</span><strong>${f(e.inner)}</strong></div>
          <div><span class="technical-label">Зовнішній</span><strong>${f(e.outer)}</strong></div>
          <div><span class="technical-label">Матеріал</span><strong>${e.material}</strong></div>
          <div><span class="technical-label">Відправка</span><strong>${e.shippingDays}</strong></div>
        </div>
        <div class="field">
          <label for="detail-color">Колір</label>
          <select class="select" id="detail-color">${e.colors.map(s=>`<option>${s}</option>`).join("")}</select>
        </div>
        ${e.brandable?`<label class="check" style="margin-top:1rem"><input id="detail-logo" type="checkbox" ${w?"checked":""} /> <span>Додати демо-наклейку (+3 грн / шт. до знижки)</span></label>`:'<p class="muted" style="margin-top:1rem">Брендування цієї демо-моделі недоступне.</p>'}
        <div class="detail-price">
          <div><span class="technical-label">Разом, орієнтовно</span><strong class="detail-price__total" id="detail-total">${b(t*v)}</strong></div>
          <div><strong id="detail-unit">${b(t)} / шт.</strong><br /><small class="muted">мін. ${e.minOrder} шт.</small></div>
        </div>
        <div class="field">
          <label for="detail-quantity">Кількість: <strong id="detail-quantity-value">${v} шт.</strong></label>
          <input class="range" id="detail-quantity" type="range" min="${e.minOrder}" max="500" step="${e.minOrder>=25?25:10}" value="${v}" />
        </div>
        <div class="tier-row" aria-label="Демо-ціна за тиражами">
          ${[10,50,100,500].map(s=>`<div><strong>${s}+</strong><small>${b(k(e.basePrice,s))}/шт.</small></div>`).join("")}
        </div>
        <p class="muted"><small>Демо-правило: 50+ −10%, 100+ −18%, 500+ −28%. Ціна стане точною після перевірки матеріалу й макета.</small></p>
        <a class="button button--accent" href="#request" id="detail-request">Запросити цей розрахунок</a>
      </div>
    </article>`,P(a),D(a),document.querySelector("#dialog-close")?.addEventListener("click",()=>a.close()),a.querySelectorAll("[data-detail-view]").forEach(s=>{s.addEventListener("click",()=>{L=s.dataset.detailView==="net"?"net":"assembled",H(e)})}),document.querySelector("#detail-logo")?.addEventListener("change",s=>{w=s.currentTarget.checked,H(e)}),document.querySelector("#detail-quantity")?.addEventListener("input",s=>{v=Number(s.currentTarget.value),fe(e)}),document.querySelector("#detail-request")?.addEventListener("click",()=>{const s=document.querySelector("#quote-message");s&&(s.value=`${e.name}, ${v} шт.${w?", з логотипом":""}.`),a.close()})}function fe(e){const a=e.basePrice+(w?3:0),t=k(a,v),s=document.querySelector("#detail-quantity-value"),l=document.querySelector("#detail-total"),o=document.querySelector("#detail-unit");s&&(s.textContent=`${v} шт.`),l&&(l.textContent=b(t*v)),o&&(o.textContent=`${b(t)} / шт.`)}function ye(){return`<ol class="wizard-progress" aria-label="Прогрес конструктора">
    ${["Предмет","Розмір","Тип","Матеріал","Бренд","Тираж"].map((a,t)=>`<li class="${t===n.step?"is-active":t<n.step?"is-complete":""}"><span>0${t+1} ${a}</span></li>`).join("")}
  </ol>`}function h(e,a,t,s="",l=a){return`<button class="choice" type="button" data-wizard-field="${e}" data-wizard-value="${a}" aria-pressed="${t}"><strong>${l}</strong>${s?`<small>${s}</small>`:""}</button>`}function we(){if(n.step===0)return`<div class="wizard-step"><span class="technical-label">Крок 01 / 06</span><h3>Що буде всередині?</h3><p>Ми використаємо відповідь для рекомендації конструкції.</p><div class="choice-grid">${M.map(t=>h("purpose",t.name,n.purpose===t.name,t.note)).join("")}</div></div>`;if(n.step===1)return`<div class="wizard-step"><span class="technical-label">Крок 02 / 06</span><h3>Внутрішній розмір.</h3><p>Додайте розміри самого предмета. На схемі вони змінюються одразу.</p><div class="wizard-form-grid">
      <div class="field"><label for="wizard-length">Довжина, мм</label><input class="input" id="wizard-length" data-wizard-input="length" type="number" min="10" max="1200" value="${n.dimensions.length}" /></div>
      <div class="field"><label for="wizard-width">Ширина, мм</label><input class="input" id="wizard-width" data-wizard-input="width" type="number" min="10" max="1200" value="${n.dimensions.width}" /></div>
      <div class="field"><label for="wizard-height">Висота, мм</label><input class="input" id="wizard-height" data-wizard-input="height" type="number" min="10" max="1200" value="${n.dimensions.height}" /></div>
      <div class="field"><label for="wizard-weight">Вага предмета, кг</label><input class="input" id="wizard-weight" data-wizard-input="weight" type="number" min="0.05" max="30" step="0.05" value="${n.weight}" /></div>
    </div></div>`;if(n.step===2)return`<div class="wizard-step"><span class="technical-label">Крок 03 / 06</span><h3>Як коробка відкривається?</h3><p>Замість технічних кодів — три зрозумілі сценарії.</p><div class="choice-grid">
      ${h("structure","Поштова",n.structure==="Поштова","Закривається клапаном, зручна для доставки")}
      ${h("structure","Кришка-дно",n.structure==="Кришка-дно","Презентаційна коробка з окремою кришкою")}
      ${h("structure","Шухляда",n.structure==="Шухляда","Висувний лоток для невеликих продуктів")}
      ${h("structure","Самозбірна",n.structure==="Самозбірна","Пласка при зберіганні, збирається без клею")}
    </div></div>`;if(n.step===3)return`<div class="wizard-step"><span class="technical-label">Крок 04 / 06</span><h3>Матеріал і колір.</h3><p>Пояснюємо матеріал через задачу, а не лише щільність.</p><div class="choice-grid">
      ${h("material","Мікрогофрокартон",n.material==="Мікрогофрокартон","Міцний для доставки та ваги")}
      ${h("material","Картон 350 г/м²",n.material==="Картон 350 г/м²","Гладкий для чистої поліграфії")}
      ${h("material","Крафт-картон",n.material==="Крафт-картон","Теплий природний колір, без еко-кліше")}
    </div><div class="wizard-form-grid"><div class="field field--full"><label for="wizard-color">Колір</label><select class="select" id="wizard-color" data-wizard-input="color"><option ${n.color==="Крафт"?"selected":""}>Крафт</option><option ${n.color==="Білий"?"selected":""}>Білий</option><option ${n.color==="Графіт"?"selected":""}>Графіт</option></select></div></div></div>`;if(n.step===4)return`<div class="wizard-step"><span class="technical-label">Крок 05 / 06</span><h3>Брендувати коробку?</h3><p>Ціна стане точною після перевірки макета. Поки показуємо зрозумілу демо-надбавку.</p><div class="choice-grid">
      ${h("branding","none",n.branding==="none","+0 грн / шт.","Без брендування")}
      ${h("branding","sticker",n.branding==="sticker","+3 грн / шт. у демо","Наклейка")}
      ${h("branding","print",n.branding==="print","+5 грн / шт. у демо","Одноколірний друк")}
    </div></div>`;if(n.step===5)return`<div class="wizard-step"><span class="technical-label">Крок 06 / 06</span><h3>Кількість і строк.</h3><p>Більший тираж знижує демо-ціну однієї коробки за тим самим правилом, що й у каталозі.</p><div class="wizard-form-grid">
      <div class="field field--full"><label for="wizard-quantity">Кількість: <strong id="wizard-quantity-value">${n.quantity} шт.</strong></label><input class="range" id="wizard-quantity" data-wizard-input="quantity" type="range" min="10" max="500" step="10" value="${n.quantity}" /></div>
      <div class="field field--full"><label for="wizard-urgency">Бажаний строк</label><select class="select" id="wizard-urgency" data-wizard-input="urgency"><option ${n.urgency==="Стандартний"?"selected":""}>Стандартний</option><option ${n.urgency==="Потрібно швидко"?"selected":""}>Потрібно швидко</option><option ${n.urgency==="Гнучкий"?"selected":""}>Гнучкий</option></select></div>
    </div><p class="muted" style="margin-top:1rem"><small>Демо-знижки: 50+ −10%, 100+ −18%, 500+ −28%.</small></p></div>`;const e=$e(),a=n.branding==="none"?"Без брендування":n.branding==="sticker"?"Наклейка":"Одноколірний друк";return`<div class="wizard-step"><span class="technical-label">Результат / орієнтовно</span><h3>Коробка зібрана.</h3><div class="summary-list">
    <div><span>Призначення</span><strong>${n.purpose}</strong></div>
    <div><span>Внутрішній розмір</span><strong>${f(n.dimensions)}</strong></div>
    <div><span>Конструкція</span><strong>${n.structure}</strong></div>
    <div><span>Матеріал / колір</span><strong>${n.material} / ${n.color}</strong></div>
    <div><span>Брендування</span><strong>${a}</strong></div>
    <div><span>Тираж</span><strong>${n.quantity} шт.</strong></div>
  </div><div class="summary-total">≈ ${b(e.total)}</div><p>${b(e.unit)} / шт. · демо-розрахунок, не оферта.</p><div class="hero-actions"><button class="button button--light" id="save-calculation" type="button">Зберегти локально</button><button class="button button--accent" id="wizard-request" type="button">Надіслати заявку</button></div></div>`}function $e(){const a=12+n.dimensions.length*n.dimensions.width*n.dimensions.height/13e4,t=n.material==="Мікрогофрокартон"?1.08:n.material==="Картон 350 г/м²"?1:1.04,s=n.structure==="Кришка-дно"||n.structure==="Шухляда"?1.18:1,l=n.branding==="sticker"?3:n.branding==="print"?5:0,o=k(a*t*s+l,n.quantity);return{unit:o,total:Math.round(o*n.quantity)}}function U(){const e=document.querySelector("#wizard-visual");if(!e)return;const a=e.querySelector(".saved-note")?.outerHTML??"";e.innerHTML=`${y(n.dimensions,{logo:n.branding==="sticker"||n.branding==="print",objectLabel:n.purpose?n.purpose.toLowerCase():"ваш продукт",id:"wizard"})}${a}`}function qe(){if(n.step===0&&!n.purpose)return"Оберіть, що буде всередині.";if(n.step===1){if(Object.values(n.dimensions).some(e=>e<10||e>1200))return"Вкажіть усі розміри від 10 до 1200 мм.";if(n.weight<=0||n.weight>30)return"Вкажіть вагу від 0,05 до 30 кг."}return n.step===2&&!n.structure?"Оберіть конструкцію коробки.":n.step===3&&!n.material?"Оберіть матеріал.":n.step===4&&!n.branding?"Оберіть варіант брендування.":n.step===5&&n.quantity<10?"Мінімальний демо-тираж — 10 штук.":""}function z(){const e=document.querySelector("#wizard-main");if(!e)return;const a=n.step===6;e.innerHTML=`${ye()}${we()}<p class="wizard-error" id="wizard-error" role="alert"></p>${a?"":`<div class="wizard-actions">${n.step>0?'<button class="button button--light" data-wizard-back type="button">← Назад</button>':"<span></span>"}<button class="button button--accent" data-wizard-next type="button">${n.step===5?"Показати розрахунок":"Далі →"}</button></div>`}`,U(),P(e),D(e),e.querySelectorAll("[data-wizard-field]").forEach(t=>{t.addEventListener("click",()=>{const s=t.dataset.wizardField,l=t.dataset.wizardValue??"";s==="purpose"&&(n.purpose=l),s==="structure"&&(n.structure=l),s==="material"&&(n.material=l),s==="branding"&&(n.branding=l),z()})}),e.querySelectorAll("[data-wizard-input]").forEach(t=>{t.addEventListener("input",()=>{const s=t.dataset.wizardInput;if((s==="length"||s==="width"||s==="height")&&(n.dimensions[s]=Number(t.value),U()),s==="weight"&&(n.weight=Number(t.value)),s==="quantity"){n.quantity=Number(t.value);const l=document.querySelector("#wizard-quantity-value");l&&(l.textContent=`${n.quantity} шт.`)}s==="color"&&(n.color=t.value),s==="urgency"&&(n.urgency=t.value)})}),e.querySelector("[data-wizard-next]")?.addEventListener("click",()=>{const t=qe(),s=document.querySelector("#wizard-error");if(t){s&&(s.textContent=t);return}n.step=Math.min(n.step+1,6),z()}),e.querySelector("[data-wizard-back]")?.addEventListener("click",()=>{n.step=Math.max(n.step-1,0),z()}),document.querySelector("#save-calculation")?.addEventListener("click",Se),document.querySelector("#wizard-request")?.addEventListener("click",xe)}function Se(){try{localStorage.setItem("box-lab-calculation",JSON.stringify({...n,savedAt:new Date().toISOString()}));const e=document.querySelector("#wizard-visual");e&&e.insertAdjacentHTML("beforeend",'<div class="saved-note">Розрахунок збережено локально на цьому пристрої ✓</div>'),G("Розрахунок збережено в localStorage. Сервер не використовується.")}catch{G("Браузер заблокував локальне збереження. Дані конструктора залишились на сторінці.")}}function xe(){const e=document.querySelector("#quote-message");if(e){const a=n.branding==="none"?"без брендування":n.branding==="sticker"?"наклейка":"одноколірний друк";e.value=`${n.purpose}: ${f(n.dimensions)}, ${n.structure}, ${n.material}, ${a}, ${n.quantity} шт.`}document.querySelector("#request")?.scrollIntoView({behavior:"smooth"}),window.setTimeout(()=>document.querySelector("#quote-name")?.focus(),450)}function X(){const e=document.querySelector("#branding-stage"),a=document.querySelector("#branding-visual"),t=document.querySelector("#branding-caption"),s=document.querySelector("#branding-cost");!e||!a||!t||!s||(e.classList.toggle("is-branded",q==="logo"),a.innerHTML=y({length:240,width:170,height:80},{logo:q==="logo",id:"branding"}),t.textContent=q==="logo"?"Одноколірний демо-друк":"Чиста коробка",s.textContent=q==="logo"?"+5 грн / шт. у демо":"Базова ціна",document.querySelectorAll("[data-brand-mode]").forEach(l=>{l.setAttribute("aria-pressed",String(l.dataset.brandMode===q))}))}function N(e,a){e.setAttribute("aria-invalid",a?"true":"false");const t=document.querySelector(`#${e.id}-error`);t&&(t.textContent=a)}function Le(e){const a=e.elements.namedItem("name"),t=e.elements.namedItem("contact"),s=e.elements.namedItem("message"),l=e.elements.namedItem("consent"),o=/@/.test(t.value)||/\d[\d\s()+-]{7,}/.test(t.value);N(a,a.value.trim().length>=2?"":"Вкажіть ім’я — щонайменше 2 символи."),N(t,o?"":"Вкажіть коректний email або телефон."),N(s,s.value.trim().length>=10?"":"Опишіть продукт, розмір або бажаний тираж."),l.setAttribute("aria-invalid",l.checked?"false":"true");const i=document.querySelector("#quote-consent-error");i&&(i.textContent=l.checked?"":"Потрібна згода для демонстрації форми.");const r=e.querySelector('[aria-invalid="true"]');return r?.focus(),!r}function x(e,a){const t=document.querySelector("#form-status");t&&(t.className=`form-status${e?` is-visible form-status--${e}`:""}`,t.textContent=a)}function G(e){const a=document.querySelector("#toast");a&&(a.textContent=e,a.classList.add("is-visible"),window.setTimeout(()=>a.classList.remove("is-visible"),3200))}function ke(){const e=document.querySelector(".menu-toggle"),a=document.querySelector("#main-nav");e?.addEventListener("click",()=>{const i=e.getAttribute("aria-expanded")==="true";e.setAttribute("aria-expanded",String(!i)),e.setAttribute("aria-label",i?"Відкрити меню":"Закрити меню"),a?.classList.toggle("is-open",!i)}),a?.querySelectorAll("a").forEach(i=>i.addEventListener("click",()=>{a.classList.remove("is-open"),e?.setAttribute("aria-expanded","false")})),document.querySelectorAll("#hero-length, #hero-width, #hero-height").forEach(i=>i.addEventListener("input",W)),document.querySelector("#hero-purpose")?.addEventListener("change",W),document.querySelector("#fit-form")?.addEventListener("submit",i=>{if(i.preventDefault(),!i.currentTarget.reportValidity())return;d.dimensions=K(),d.purpose=document.querySelector("#hero-purpose")?.value??"";const c=document.querySelector("#filter-purpose");c&&(c.value=d.purpose,S(c)),p(520),document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth"})}),document.querySelectorAll("[data-purpose]").forEach(i=>{i.addEventListener("click",()=>{const r=i.dataset.purpose;d.purpose=r,document.querySelectorAll("[data-purpose]").forEach(V=>V.setAttribute("aria-pressed",String(V.dataset.purpose===d.purpose)));const c=document.querySelector("#filter-purpose");c&&(c.value=d.purpose,S(c));const u={length:Number(i.dataset.length),width:Number(i.dataset.width),height:Number(i.dataset.height)},m=document.querySelector("#purpose-preview"),$=document.querySelector("#purpose-preview-canvas"),j=document.querySelector("#purpose-preview-counter"),O=document.querySelector("#purpose-preview-structure"),I=document.querySelector("#purpose-preview-title"),B=document.querySelector("#purpose-preview-note"),T=document.querySelector("#purpose-preview-cta");m&&(m.classList.remove("is-changing"),m.offsetWidth,m.classList.add("is-selected","is-changing")),$&&($.innerHTML=y(u,{objectLabel:r.toLowerCase(),id:"purpose"})),j&&(j.textContent=`${i.dataset.index} / 08`),O&&(O.textContent=i.dataset.structure??"Орієнтовна конструкція"),I&&(I.textContent=r),B&&(B.textContent=i.dataset.result??""),T&&(T.disabled=!1,T.textContent=`Показати коробки для «${r.toLowerCase()}»`),p()})}),document.querySelector("#purpose-preview-cta")?.addEventListener("click",()=>{document.querySelector("#catalog")?.scrollIntoView({behavior:"smooth"})});const t=document.querySelector(".section--purpose");t&&(t.classList.add("has-purpose-motion"),"IntersectionObserver"in window?new IntersectionObserver((r,c)=>{r.forEach(u=>{u.isIntersecting&&(t.classList.add("is-visible"),c.disconnect())})},{threshold:.16}).observe(t):t.classList.add("is-visible"));const s=document.querySelector("#catalog-search");s?.addEventListener("input",()=>{d.search=s.value,p()}),document.querySelector("#filter-purpose")?.addEventListener("change",i=>{d.purpose=i.currentTarget.value,p()}),document.querySelector("#filter-type")?.addEventListener("change",i=>{d.type=i.currentTarget.value,p()}),document.querySelector("#filter-material")?.addEventListener("change",i=>{d.material=i.currentTarget.value,p()}),document.querySelector("#filter-stock")?.addEventListener("change",i=>{d.inStock=i.currentTarget.checked,p()}),document.querySelector("#filter-brandable")?.addEventListener("change",i=>{d.brandable=i.currentTarget.checked,p()}),document.querySelector("#filter-postal")?.addEventListener("change",i=>{d.postal=i.currentTarget.checked,p()}),document.querySelector("#catalog-sort")?.addEventListener("change",i=>{d.sort=i.currentTarget.value,p()}),document.querySelector("#reset-filters")?.addEventListener("click",()=>{Object.assign(d,{search:"",purpose:"",type:"",material:"",inStock:!1,brandable:!1,postal:!1,dimensions:null,sort:"recommended"}),["catalog-search","filter-purpose","filter-type","filter-material","catalog-sort"].forEach(r=>{const c=document.querySelector(`#${r}`);c&&(c.value=r==="catalog-sort"?"recommended":"",c instanceof HTMLSelectElement&&S(c))}),["filter-stock","filter-brandable","filter-postal"].forEach(r=>{const c=document.querySelector(`#${r}`);c&&(c.checked=!1)}),document.querySelectorAll("[data-purpose]").forEach(r=>r.setAttribute("aria-pressed","false")),p()}),document.querySelectorAll("[data-brand-mode]").forEach(i=>{i.addEventListener("click",()=>{q=i.dataset.brandMode==="logo"?"logo":"plain",X()})});const l=document.querySelector("#product-dialog");l?.addEventListener("close",()=>document.body.classList.remove("dialog-open")),l?.addEventListener("click",i=>{i.target===l&&l.close()}),document.querySelectorAll(".faq-item").forEach(i=>{i.addEventListener("toggle",()=>{i.open&&document.querySelectorAll(".faq-item[open]").forEach(r=>{r!==i&&(r.open=!1)})})});const o=document.querySelector("#quote-form");o?.addEventListener("submit",i=>{if(i.preventDefault(),!Le(o)){x("error","Перевірте виділені поля. Дані не відправлено.");return}const r=document.querySelector("#quote-submit");r&&(r.disabled=!0,r.innerHTML='<span class="spinner" aria-hidden="true"></span> Перевіряємо локально…'),x("",""),window.setTimeout(()=>{o.elements.namedItem("contact").value.toLowerCase().includes("error")?x("error","Демо-помилка: не вдалося підготувати локальну заявку. Змініть контакт і повторіть."):(x("success","Запит перевірено. Дані залишилися у вашому браузері й нікуди не надсилалися."),o.querySelectorAll("[aria-invalid]").forEach(u=>u.setAttribute("aria-invalid","false"))),r&&(r.disabled=!1,r.textContent="Перевірити запит")},850)}),o?.querySelectorAll("input, textarea").forEach(i=>{i.addEventListener("input",()=>{if(document.querySelector("#form-status.form-status--success")&&x("",""),i.getAttribute("aria-invalid")==="true"){i.setAttribute("aria-invalid","false");const r=document.querySelector(`#${i.id}-error`);r&&(r.textContent="")}})})}ke();P();D();A();z();X();window.setTimeout(()=>{d.loading=!1,A()},520);
