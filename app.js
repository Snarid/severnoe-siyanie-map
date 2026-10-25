(() => {
const C = {blue:'#2f6bf2', ink:'#0e1b3d', teal:'#11a683', orange:'#ee8a1e', red:'#e5484d', gray:'#7d7f87', trunk:'#5a6f9b', field:'#8ea3c8', muted:'#66728f'};
const fmt = (v, d=1) => v.toLocaleString('ru-RU', {minimumFractionDigits:d, maximumFractionDigits:d});
const OSM = 'Геометрия: © участники OpenStreetMap, выгрузка 24.10.2026';

// ---------- points ----------
const FIELD = [71.40, 70.30];
const P = {
  field: FIELD, gtl:[69.04, 70.147], node:[69.13, 70.195],
  tie:[68.3247, 70.3574], kar:[68.4057, 70.3139], bovSt:[68.994, 70.1316], vzhk:[68.37, 70.345],
  sab:[72.127, 71.236], obs:[66.2352, 66.7195]
};
const hav = (a, b) => { const R=6371, t=x=>x*Math.PI/180; const dl=t(b[1]-a[1]), dn=t(b[0]-a[0]);
  const h=Math.sin(dl/2)**2+Math.cos(t(a[1]))*Math.cos(t(b[1]))*Math.sin(dn/2)**2; return 2*R*Math.asin(Math.sqrt(h)); };
const km = (a,b) => Math.round(hav(a,b));
const A = (u,t) => `<a href="${u}" target="_blank" rel="noopener">${t}</a>`;
const SS2W = A('https://ru.wikipedia.org/wiki/%D0%A1%D0%B8%D0%BB%D0%B0_%D0%A1%D0%B8%D0%B1%D0%B8%D1%80%D0%B8_%E2%80%94_2','Википедия');
const SS2I = A('https://interfax.com/newsroom/top-stories/115470/','Interfax, 02.09.2025');
const SS2K = A('https://www.kommersant.ru/doc/8008007','Коммерсантъ');
const SS2G = A('https://www.gem.wiki/Power_of_Siberia_2_Gas_Pipeline','GEM Wiki');

const existingPts = [
  {c:[68.40,70.40], n:'Бованенковское НГКМ', k:'field', d:'Опорный промысел Ямала: УКПГ с 30 турбодетандерными агрегатами, начало СМГ Бованенково–Ухта; ресурсная база «Силы Сибири – 2».', s:A('https://istina.msu.ru/download/10927562/1eQBFE:XcE5QiQCx0gUPC8N7kt5CDWXt3s/','ИСТИНА МГУ')+'; '+SS2W+'; положение условное'},
  {c:[66.86,71.10], n:'Харасавэйское ГКМ', k:'field', d:'Промысел Газпрома на западе Ямала, связан с узлом Бованенково.', s:'Положение — по пос. Харасавэй (OSM)'},
  {c:P.vzhk, n:'ВЖК Бованенково (действующий)', k:'vil', d:'Вахтовый жилой комплекс Бованенковского промысла. Наш персонал живёт в собственном ВЖК у УКПГ; через Бованенково идёт только смена вахты (аэропорт).', s:'Положение условное'},
  {c:P.sab, n:'Сабетта — порт и «Ямал СПГ»', k:'port', d:'Морской порт и завод СПГ.', s:OSM},
  {c:[71.8178,71.4751], n:'Тамбей', k:'vil', d:'Посёлок на северо-востоке Ямала; по меморандуму 2025 г. восточный маршрут ЕСГ начинается от Тамбея через Бованенково.', s:SS2I},
  {c:[70.8365,66.8656], n:'Яр-Сале', k:'vil', d:'Административный центр Ямальского района.', s:OSM},
  {c:[66.6146,66.5299], n:'Салехард', k:'city', d:'Столица ЯНАО; аэропорт — потребитель авиакеросина.', s:OSM},
  {c:[66.381,66.6615], n:'Лабытнанги', k:'city', d:'Ж/д узел на левом берегу Оби, выход на Северную железную дорогу; перевалка ДТ и керосина.', s:OSM},
  {c:P.obs, n:'ст. Обская', k:'rail', d:'Начало линии Обская–Бованенково–Карская (572 км).', s:A('https://www.gazprom.ru/press/news/reports/2013/yamalskiy-express/','Газпром')+'; '+OSM},
  {c:P.bovSt, n:'ст. Бованенково', k:'rail', d:'Станция линии Обская–Карская. Рядом — наш завод GTL и пункт налива ДТ и керосина.', s:OSM},
  {c:P.kar, n:'ст. Карская', k:'rail', d:'Конечная станция линии. Пункт налива стабильного конденсата.', s:OSM},
  {c:[68.3349,70.3158], n:'Аэропорт Бованенково', k:'air', d:'Вахтовые авиарейсы; смена персонала и потребитель керосина.', s:OSM},
  {c:[66.9115,71.2346], n:'Аэропорт Харасавэй', k:'air', d:'Вахтовый аэропорт.', s:OSM},
  {c:[71.9773,71.206], n:'Аэропорт Сабетта', k:'air', d:'Международный аэропорт; потребитель авиакеросина.', s:OSM},
  {c:[63.99,67.5], n:'Воркута', k:'city', d:'Город в Республике Коми рядом с трассой СМГ.', s:OSM},
  {c:[60.13,66.04], n:'Инта', k:'city', d:'Здесь заканчиваются данные OSM в нашей выгрузке; дальше до Ухты трасса СМГ показана схематично.', s:OSM},
  {c:[53.69,63.56], n:'Ухта', k:'city', d:'Конец СМГ Бованенково–Ухта (1 266 км); далее — Ухта–Торжок.', s:A('https://energybase.ru/pipeline/bovanenkovo-ukhta','Energybase')},
];
const ss2Pts = [
  {c:[76.63,66.08], n:'Новый Уренгой', d:'Узел ЕСГ на маршруте «Силы Сибири – 2».'},
  {c:[84.97,56.48], n:'Томск', d:'Томская область — на маршруте по меморандуму 2025 г.'},
  {c:[92.87,56.01], n:'Красноярск', d:'Красноярский край — на маршруте.'},
  {c:[104.28,52.29], n:'Иркутск', d:'Иркутская область — на маршруте; соединение с «Силой Сибири» на Ковыкте (по данным СМИ).'},
  {c:[107.58,51.83], n:'Улан-Удэ', d:'Бурятия — далее выход на границу с Монголией.'},
  {c:[106.92,47.92], n:'Улан-Батор', d:'Транзитный участок «Союз Восток» по Монголии ≈960 км.'},
];
const kColor = {field:C.trunk, port:C.ink, vil:'#8a97b5', city:C.ink, rail:'#2a2f3a', air:'#3d7bd6'};

const fc = feats => ({type:'FeatureCollection', features:feats});
const line = (coords, props) => ({type:'Feature', properties:props, geometry:{type:'LineString', coordinates:coords}});
const pt = (c, props) => ({type:'Feature', properties:props, geometry:{type:'Point', coordinates:c}});

const lenGas = km(FIELD,[70.0,70.27]) + km([70.0,70.27], P.node) + km(P.node, P.tie);
const proposed = fc([
  line([FIELD,[70.0,70.27],P.node,P.tie], {cat:'pr-gas', n:'Газопровод 120 км: GTL и врезка в СМГ Бованенково–Ухта', d:`11,6 млрд м³/год товарного газа на полке: 0,19 млрд м³ отбираем на завод GTL у ст. Бованенково, 11,4 млрд м³ — в СМГ Бованенково–Ухта. По прямой ≈${lenGas} км, в модели — 120 км, 37,7 млрд руб.`, s:'Трасса схематична. Расчёт команды; '+OSM}),
  line([P.node,P.gtl], {cat:'pr-gas', n:'Отвод газа на завод GTL', d:'≈400 млн м³/год газа (5 % полки).', s:'Схематично'}),
  line([FIELD,[70.0,70.245],[69.15,70.175],P.kar], {cat:'pr-cond', n:'Конденсатопровод до ст. Карская', d:'0,49 млн т/год стабильного конденсата на полке. В модели — 8,6 млрд руб. Далее — налив в цистерны и ж/д 572 км до Обской (вывоз расширяется до 2,2 млн т/год).', s:'Трасса схематична. '+A('https://www.npktrans.ru/media/novosti/yamaltransstroi-rasshirit-zhd-liniyu-dlya-vyvoza-uglevodorodov-s-bovanenkovskogo-mestorozhdeniya-k-portu-ust-luga/','НПК «Транс»')}),
  line([FIELD,[70.0,70.258],[69.15,70.188],[69.0,70.14]], {cat:'pr-road', n:'Автодорога 120 км до Бованенково', d:'Новая дорога в общем коридоре с газо- и конденсатопроводом до ст. Бованенково и промзоны; дальше — существующие дороги к аэропорту. По ней ездит вахта из ВЖК у УКПГ. CAPEX — 24 млрд руб (0,2 млрд руб/км).', s:'Трасса схематична; удельная стоимость — '+A('https://goarctic.ru/kultura/uchenye-gotovyatsya-k-potepleniyu-izuchayut-iskusstvennuyu-zamorozku-grunta-chtoby-prodlit-rabotu-av/','GoArctic')+' ($2,4–2,5 млн/км в ЯНАО)'}),
]);
const ukhtaSchem = fc([line([[60.3379,65.9444],[58.9,65.6],[57.2,65.13],[55.6,64.5],[53.69,63.56]], {n:'СМГ Бованенково–Ухта: участок Инта–Ухта', d:'Продолжение действующей системы до Ухты. В нашей выгрузке OSM этого участка нет, поэтому он показан схематично по городам вдоль трассы.', s:A('https://energybase.ru/pipeline/bovanenkovo-ukhta','Energybase')+'; '+A('https://www.gem.wiki/Bovanenkovo-Ukhta_Gas_Pipeline','GEM Wiki')})]);
const ss2 = fc([line([[68.40,70.40],[72.5,68.6],[76.63,66.08],[77.0,61.6],[84.97,56.48],[86.09,55.35],[92.87,56.01],[99.0,55.0],[104.28,52.29],[107.58,51.83],[106.45,50.35],[106.92,47.92],[111.98,43.65]],
  {n:'«Сила Сибири – 2» («Сила Байкала») — перспектива', d:'До 50 млрд м³/год в Китай через Монголию, ≈2 600–2 700 км по России. Ресурсная база — Бованенково и Харасавэй. Маршрут по меморандуму 2025 г.: Бованенково → Новый Уренгой → ХМАО → Томская, Кемеровская обл. → Красноярский край → Иркутская обл. → Бурятия → Монголия. Трасса не утверждена — показана схематично по узлам.', s:[SS2W,SS2I,SS2K,SS2G].join('; ')})]);
const proposedPts = [
  {c:P.field, n:'УКПГ «Северное сияние»', big:true, d:'12 млрд м³/год на полке (2033–2043), первый газ — 2031 г. НТС на 5 ТДА, стабилизация конденсата, регенерация метанола. 57 горизонтальных скважин по 1,5 млрд руб, дебит 0,75 млн м³/сут.', s:'Координаты — задание кейса (70,30° с.ш.; 71,40° в.д.)'},
  {c:P.gtl, n:'Завод GTL у ст. Бованенково', d:'≈187 млн м³/год газа → ≈76,5 тыс. т синтетических УВ: 40 тыс. т ДТ, 30 тыс. т авиакеросина, 6,5 тыс. т нафты. Внутренние нужды кластера: буровые, техника, энергоцентры, вахтовая авиация. CAPEX 10,75 млрд руб, ввод — 2033 г.', s:A('https://ru.infratechnology.ru/technology/','INFRA')+'; объёмы — решение команды'},
  {c:[71.22,70.255], n:'ВЖК у УКПГ (проект)', d:'Вахтовый жилой комплекс на 200 мест рядом с УКПГ. CAPEX 4 млрд руб (оценка), содержание — в постоянных OPEX. Связь с Бованенково — автодорога 120 км.', s:'Аналог — ВЖК Семаковского месторождения на 200 мест: '+A('https://neftegas.info/news/article/20669','Нефтегаз.инфо')+'; положение условное'},
];
const expPt = {c:[68.25,70.43], n:'Перспективная точка расширения', d:'Узел Бованенково — ресурсная база и начало восточного маршрута «Силы Сибири – 2». Наш газ приходит сюда по газопроводу 120 км: при запуске СС-2 часть объёма может уйти на восток без новой трубы от промысла.', s:SS2W+'; '+SS2I};

function popupHTML(p){ return `<h4>${p.n}</h4><p>${p.d}</p><p class="src">${p.s||''}</p>`; }

function initMap(){
  const el = document.getElementById('mapEl');
  if (!window.maplibregl) { el.innerHTML = '<p style="padding:20px">Карта не загрузилась: нет доступа к библиотеке MapLibre.</p>'; return; }
  const mob = window.matchMedia('(max-width:720px)').matches;
  const map = new maplibregl.Map({
    container: el, style: 'https://tiles.openfreemap.org/styles/positron',
    center: [69.6, 69.9], zoom: mob ? 5.2 : 6.0, minZoom: 2.5, maxZoom: 12, attributionControl: {compact: true}, cooperativeGestures: mob
  });
  map.addControl(new maplibregl.NavigationControl({showCompass:false}), 'top-right');
  map.addControl(new maplibregl.ScaleControl({unit:'metric'}), 'bottom-left');
  const note = document.createElement('div'); note.className='schem'; note.textContent='Пунктир — проектные и перспективные трассы, схематично'; el.appendChild(note);

  map.on('load', async () => {
    map.fitBounds([[66.3,69.4],[72.6,71.4]], {padding: mob ? 16 : {top:30,bottom:30,left:330,right:30}, duration:0});
    let ex = fc([]), prod = fc([]);
    try { ex = await (await fetch('data/existing.geojson')).json(); } catch(e) {}
    try { prod = await (await fetch('data/products.geojson')).json(); } catch(e) {}
    const isBU = ['in','Бованенково — Ухта',['coalesce',['get','name'],'']];
    // perspective SS-2 first (bottom)
    map.addSource('ss2', {type:'geojson', data: ss2});
    map.addLayer({id:'ss2-halo', type:'line', source:'ss2', layout:{'line-cap':'round','line-join':'round'}, paint:{'line-color':'#8b5cf6','line-opacity':.15,'line-width':['interpolate',['linear'],['zoom'],3,8,8,16]}});
    map.addLayer({id:'ss2', type:'line', source:'ss2', layout:{'line-cap':'round','line-join':'round'}, paint:{'line-color':'#8b5cf6','line-width':['interpolate',['linear'],['zoom'],3,2.5,8,4.5],'line-dasharray':[2,1.4]}});
    map.addSource('ss2Pts', {type:'geojson', data: fc(ss2Pts.map(p => pt(p.c, {n:p.n, d:p.d, s:[SS2I,SS2K].join('; ')})))});
    map.addLayer({id:'ss2-pts', type:'circle', source:'ss2Pts', paint:{'circle-radius':5,'circle-color':'#8b5cf6','circle-stroke-color':'#fff','circle-stroke-width':2}});
    map.addLayer({id:'ss2-lbl', type:'symbol', source:'ss2Pts', layout:{'text-field':['get','n'],'text-font':['Noto Sans Regular'],'text-size':12,'text-offset':[0,1],'text-anchor':'top','text-optional':true}, paint:{'text-color':'#5b3cc4','text-halo-color':'#fff','text-halo-width':1.6}});
    map.addSource('ex', {type:'geojson', data: ex});
    map.addLayer({id:'ex-field', type:'line', source:'ex', filter:['==',['get','cat'],'gas_field'], paint:{'line-color':C.field,'line-width':['interpolate',['linear'],['zoom'],5,0.8,10,2]}});
    map.addLayer({id:'ex-field-liq', type:'line', source:'ex', filter:['==',['get','cat'],'liquid'], paint:{'line-color':'#c99a6a','line-width':1.4}});
    map.addLayer({id:'ex-trunk', type:'line', source:'ex', filter:['all',['==',['get','cat'],'gas_trunk'],['!',isBU]], paint:{'line-color':C.trunk,'line-width':['interpolate',['linear'],['zoom'],4,1.6,10,4]}});
    map.addSource('ukhta', {type:'geojson', data: ukhtaSchem});
    map.addLayer({id:'ex-bu-s', type:'line', source:'ukhta', layout:{'line-cap':'round'}, paint:{'line-color':'#1d4fc4','line-width':['interpolate',['linear'],['zoom'],3,2.5,10,5],'line-dasharray':[1,.8],'line-opacity':.85}});
    map.addLayer({id:'ex-bu', type:'line', source:'ex', filter:['all',['==',['get','cat'],'gas_trunk'],isBU], layout:{'line-cap':'round','line-join':'round'}, paint:{'line-color':'#1d4fc4','line-width':['interpolate',['linear'],['zoom'],3,2.5,10,5.5]}});
    map.addLayer({id:'ex-rail-base', type:'line', source:'ex', filter:['==',['get','cat'],'rail'], paint:{'line-color':'#2a2f3a','line-width':['interpolate',['linear'],['zoom'],4,2.4,10,5]}});
    map.addLayer({id:'ex-rail', type:'line', source:'ex', filter:['==',['get','cat'],'rail'], paint:{'line-color':'#ffffff','line-width':['interpolate',['linear'],['zoom'],4,1,10,2.4],'line-dasharray':[3,3]}});

    map.addSource('prod', {type:'geojson', data: prod});
    map.addLayer({id:'pr-dsl', type:'line', source:'prod', layout:{'line-cap':'round','line-join':'round'}, paint:{'line-color':C.teal,'line-width':['interpolate',['linear'],['zoom'],4,2.5,10,4],'line-offset':['interpolate',['linear'],['zoom'],4,4,10,8],'line-dasharray':[1.4,1.2]}});
    map.addSource('pr', {type:'geojson', data: proposed});
    const dash = (id, color, w, da) => map.addLayer({id, type:'line', source:'pr', filter:['==',['get','cat'],id], layout:{'line-cap':'round'}, paint:{'line-color':color,'line-width':w,'line-dasharray':da}});
    dash('pr-road', C.gray, 2.5, [1,1.6]);
    dash('pr-cond', C.orange, 4, [2,1.2]);
    dash('pr-gas', C.blue, 4.5, [2,1.2]);

    const exPts = fc(existingPts.map(p => pt(p.c, {n:p.n, d:p.d, s:p.s, k:p.k})));
    map.addSource('exPts', {type:'geojson', data: exPts});
    map.addLayer({id:'ex-pts', type:'circle', source:'exPts', paint:{
      'circle-radius':['match',['get','k'],'field',8,'city',6,'port',7,5],
      'circle-color':['match',['get','k'],'field',C.trunk,'port',C.ink,'city',C.ink,'rail','#2a2f3a','air','#3d7bd6','#8a97b5'],
      'circle-stroke-color':'#fff','circle-stroke-width':2}});
    map.addLayer({id:'ex-pts-lbl', type:'symbol', source:'exPts', layout:{'text-field':['get','n'],'text-font':['Noto Sans Regular'],'text-size':12,'text-offset':[0,1.1],'text-anchor':'top','text-optional':true}, paint:{'text-color':C.ink,'text-halo-color':'#fff','text-halo-width':1.6}});

    const prPts = fc(proposedPts.map(p => pt(p.c, {n:p.n, d:p.d, s:p.s})));
    map.addSource('prPts', {type:'geojson', data: prPts});
    map.addLayer({id:'pr-pts', type:'circle', source:'prPts', paint:{'circle-radius':8,'circle-color':C.red,'circle-stroke-color':'#fff','circle-stroke-width':3}});
    map.addLayer({id:'pr-pts-lbl', type:'symbol', source:'prPts', layout:{'text-field':['get','n'],'text-font':['Noto Sans Bold'],'text-size':12.5,'text-offset':[0,-1.3],'text-anchor':'bottom','text-optional':true}, paint:{'text-color':C.red,'text-halo-color':'#fff','text-halo-width':2}});
    map.addSource('exp', {type:'geojson', data: fc([pt(expPt.c, {n:expPt.n, d:expPt.d, s:expPt.s})])});
    map.addLayer({id:'exp', type:'symbol', source:'exp', layout:{'text-field':'◆','text-font':['Noto Sans Bold'],'text-size':26,'text-allow-overlap':true,'icon-allow-overlap':true}, paint:{'text-color':'#8b5cf6','text-halo-color':'#fff','text-halo-width':2}});
    map.addLayer({id:'exp-lbl', type:'symbol', source:'exp', layout:{'text-field':'Точка расширения → «Сила Сибири – 2»','text-font':['Noto Sans Bold'],'text-size':12,'text-offset':[0,-1.6],'text-anchor':'bottom','text-optional':true}, paint:{'text-color':'#5b3cc4','text-halo-color':'#fff','text-halo-width':2}});

    let pop = null;
    const openPop = (ll, p, off=10) => { if (pop) pop.remove(); pop = new maplibregl.Popup({offset:off, maxWidth:'300px'}).setLngLat(ll).setHTML(popupHTML(p)).addTo(map); };
    const m = document.createElement('button'); m.className='pin pin--big'; m.setAttribute('aria-label','УКПГ «Северное сияние»: показать параметры');
    m.addEventListener('click', ev => { ev.stopPropagation(); openPop(FIELD, proposedPts[0], 16); });
    new maplibregl.Marker({element:m}).setLngLat(FIELD).addTo(map);

    const clickable = ['exp','pr-pts','ss2-pts','ex-pts','pr-gas','pr-cond','pr-road','pr-dsl','ex-bu','ex-bu-s','ex-trunk','ex-rail-base','ss2'];
    clickable.forEach(id => {
      map.on('mouseenter', id, () => map.getCanvas().style.cursor='pointer');
      map.on('mouseleave', id, () => map.getCanvas().style.cursor='');
    });
    map.on('click', e => {
      const f = map.queryRenderedFeatures([[e.point.x-6,e.point.y-6],[e.point.x+6,e.point.y+6]], {layers: clickable.filter(id => map.getLayer(id) && map.getLayoutProperty(id,'visibility')!=='none')})[0];
      if (!f) return;
      let p = f.properties;
      if (f.layer.id==='ex-bu') p = {n:'СМГ Бованенково–Ухта (действующая)', d:'Система магистральных газопроводов 1 266 км, три нитки; переход через Байдарацкую губу. В 2025 г. по ней принято 101 млрд м³ газа. Сюда подключаем наш газопровод.', s:OSM+'; '+A('https://energybase.ru/pipeline/bovanenkovo-ukhta','Energybase')+'; '+A('https://www.gem.wiki/Bovanenkovo-Ukhta_Gas_Pipeline','GEM Wiki')};
      if (f.layer.id==='ex-trunk') p = {n: p.name || 'Магистральный газопровод', d:'Существующие газопроводы: лупинги, перемычки, коллекторы.', s:OSM};
      if (f.layer.id==='ex-rail-base') p = {n:'Ж/д Обская–Бованенково–Карская', d:'572 км; ведомственная линия Газпрома. Вывоз жидких УВ Бованенково расширяется до 2,2 млн т/год.', s:OSM+'; '+A('https://www.gazprom.ru/press/news/reports/2013/yamalskiy-express/','Газпром')};
      if (f.layer.id==='pr-dsl') p = {n:'ДТ и авиакеросин: ст. Бованенково → Обская → Лабытнанги', d:'40 тыс. т ДТ и 30 тыс. т керосина в год: в первую очередь — промыслы и аэропорт кластера Бованенково, излишки — в цистернах по действующей ж/д.', s:'Маршрут по действующей ж/д ('+OSM+')'};
      openPop(f.geometry.type==='Point' ? f.geometry.coordinates : e.lngLat, p);
    });

    const groups = {'ex-rail':['ex-rail','ex-rail-base'], 'ex-bu':['ex-bu','ex-bu-s'], 'ex-trunk':['ex-trunk'], 'ex-field':['ex-field','ex-field-liq'], 'ex-pts':['ex-pts','ex-pts-lbl'],
      'pr-gas':['pr-gas'], 'pr-cond':['pr-cond'], 'pr-road':['pr-road'], 'pr-dsl':['pr-dsl'], 'pr-pts':['pr-pts','pr-pts-lbl'], 'ss2':['ss2','ss2-halo','ss2-pts','ss2-lbl'], 'exp':['exp','exp-lbl']};
    document.querySelectorAll('[data-layer]').forEach(cb => cb.addEventListener('change', () => {
      (groups[cb.dataset.layer]||[]).forEach(id => map.getLayer(id) && map.setLayoutProperty(id, 'visibility', cb.checked ? 'visible' : 'none'));
    }));
    const pad = mob ? 20 : {top:40, bottom:40, left:340, right:40};
    document.querySelectorAll('[data-fly]').forEach(b => b.addEventListener('click', () => {
      const v = b.dataset.fly;
      if (v==='field') map.fitBounds([[68.1,69.95],[71.7,70.6]], {padding:pad, speed:.9});
      else if (v==='ukhta') map.fitBounds([[52.5,63.2],[72.5,71.5]], {padding:pad, speed:.9});
      else if (v==='ss2') map.fitBounds([[50,41.5],[114,71.8]], {padding:pad, speed:.9});
      else map.fitBounds([[64.8,66.3],[74.6,71.7]], {padding:pad, speed:.9});
    }));
    window.__mapReady = true;
  });
  window.__map = map;
}

// ---------- charts ----------
async function initCharts(){
  let D; try { D = await (await fetch('data/model.json')).json(); } catch(e) { return; }
  const c = D.cmp, cols = ['A','B','C','T0','T'];
  const rows = [
    ['NPV при 10 %, млрд руб', k => fmt(c[k].npv), k => c[k].npv<0],
    ['IRR (реальная), %', k => fmt(c[k].irr)],
    ['CAPEX, млрд руб', k => fmt(c[k].capex)],
    ['Индекс доходности', k => fmt(c[k].pi,2)],
    ['Окупаемость (дисконт.)', k => c[k].npv>0 ? String(c[k].pb) : 'нет при 10 %'],
    ['Продукты', k => ({A:'газ, конденсат',B:'газ, конденсат, СУГ',C:'газ, конденсат, СУГ, этан',T0:'газ, конденсат',T:'газ, конденсат, ДТ, керосин'})[k]],
    ['Своё топливо для Арктики', k => k==='T' ? 'да, 70 тыс. т/год' : 'нет'],
  ];
  document.getElementById('cmpBody').innerHTML = rows.map(([n,f,neg]) => `<tr><th scope="row">${n}</th>${cols.map(k => `<td class="${k==='T'?'hl':''} ${neg&&neg(k)?'neg':''}">${f(k)}</td>`).join('')}</tr>`).join('');

  if (!window.Chart) return;
  Chart.defaults.font.family = "'Onest', system-ui, sans-serif"; Chart.defaults.font.size = 12; Chart.defaults.color = C.muted;
  Chart.defaults.plugins.legend.labels.boxWidth = 12; Chart.defaults.maintainAspectRatio = false;
  const grid = {color:'rgba(14,27,61,.08)'};
  const Y = D.years;
  const W = '#dfe6ff';

  new Chart(document.getElementById('cDiesel'), {type:'bar', data:{labels:['Дизельное топливо','Авиакеросин'], datasets:[
      {label:'Завоз в ЯНАО', data:[89.5,329], backgroundColor:'#9fb6ff', borderRadius:6, maxBarThickness:56},
      {label:'Завод GTL «Северное сияние»', data:[40,30], backgroundColor:'#19c39c', borderRadius:6, maxBarThickness:56}]},
    options:{plugins:{legend:{labels:{color:W}}, tooltip:{callbacks:{label:x=>`${x.dataset.label}: ${fmt(x.raw, x.raw%1?1:0)} тыс. т/год`, afterLabel:x=> x.datasetIndex===0 ? (x.dataIndex===0 ? 'весь централизованный завоз 2025 (Север-Пресс)' : 'данные команды, 2026') : ''}}},
      scales:{x:{ticks:{color:W}, grid:{display:false}}, y:{ticks:{color:W}, grid:{color:'rgba(255,255,255,.12)'}, title:{display:true,text:'тыс. т/год',color:W}}}}});

  new Chart(document.getElementById('cNpv'), {type:'line', data:{labels:Y, datasets:[
    {label:'Наш вариант: ТДА + GTL', data:D.cum_dfcf, borderColor:C.blue, backgroundColor:'rgba(47,107,242,.10)', fill:true, borderWidth:3, pointRadius:0, tension:.25},
    {label:'Вариант А (НТС)', data:D.cum_dfcf_A, borderColor:C.muted, borderDash:[5,4], borderWidth:2, pointRadius:0, tension:.25}]},
    options:{interaction:{mode:'index',intersect:false}, plugins:{tooltip:{callbacks:{label:x=>`${x.dataset.label}: ${fmt(x.raw)} млрд руб`}}},
      scales:{x:{grid:{display:false}, ticks:{maxTicksLimit:10}}, y:{grid, title:{display:true,text:'млрд руб'}}}}});

  const sc = D.scan;
  new Chart(document.getElementById('cScan'), {type:'bar', data:{labels:sc.map(s=>s.pl), datasets:[{label:'NPV', data:sc.map(s=>s.npv), backgroundColor:sc.map(s=>s.pl===D.plateau?C.blue:'rgba(125,127,135,.45)'), borderRadius:4}]},
    options:{plugins:{legend:{display:false}, tooltip:{callbacks:{title:x=>`Полка ${x[0].label} млрд м³/год`, label:x=>`NPV ${fmt(x.raw)} млрд руб · IRR ${fmt(sc[x.dataIndex].irr)} % · ${sc[x.dataIndex].wells} скв.`}}},
      scales:{x:{grid:{display:false}, title:{display:true,text:'полка, млрд м³/год'}}, y:{grid, title:{display:true,text:'млрд руб'}}}}});

  const cs = D.capex_struct, csk = Object.keys(cs);
  const pal = ['#0e1b3d','#2f6bf2','#5b8cff','#9fb6ff','#3d4f7a','#7d7f87','#c2c7d4','#ee8a1e','#f2b705','#e5484d','#19c39c'];
  new Chart(document.getElementById('cCapex'), {type:'doughnut', data:{labels:csk, datasets:[{data:csk.map(k=>cs[k]), backgroundColor:pal, borderColor:'#fff', borderWidth:2}]},
    options:{cutout:'58%', plugins:{legend:{position:'bottom', labels:{font:{size:10.5}, padding:6, boxWidth:10}}, tooltip:{callbacks:{label:x=>`${x.label}: ${fmt(x.raw)} млрд руб`}}}}});

  new Chart(document.getElementById('cProd'), {data:{labels:Y, datasets:[
    {type:'bar', label:'Добыча сырого газа, млрд м³', data:D.raw, backgroundColor:'rgba(47,107,242,.75)', yAxisID:'y', borderRadius:2},
    {type:'line', label:'Конденсат, тыс. т', data:D.cond.map(v=>v*1000), borderColor:C.orange, borderWidth:2.5, pointRadius:0, yAxisID:'y1'},
    {type:'line', label:'ДТ GTL, тыс. т', data:D.dsl.map(v=>v*1000), borderColor:C.teal, borderWidth:2.5, pointRadius:0, yAxisID:'y1'},
    {type:'line', label:'Керосин GTL, тыс. т', data:D.kero.map(v=>v*1000), borderColor:'#8b5cf6', borderWidth:2.5, pointRadius:0, yAxisID:'y1'}]},
    options:{interaction:{mode:'index',intersect:false}, scales:{x:{grid:{display:false}, ticks:{maxTicksLimit:10}}, y:{grid, title:{display:true,text:'млрд м³'}}, y1:{position:'right', grid:{display:false}, title:{display:true,text:'тыс. т'}}}}});

  const t = D.tot, rv = [t.rev_gas,t.rev_cond,t.rev_dsl,t.rev_kero], rs = rv.reduce((a,b)=>a+b,0);
  new Chart(document.getElementById('cRev'), {type:'doughnut', data:{labels:['Газ','Конденсат и нафта','ДТ GTL','Авиакеросин GTL'], datasets:[{data:rv, backgroundColor:[C.blue,C.orange,'#19c39c','#8b5cf6'], borderColor:'#fff', borderWidth:2}]},
    options:{cutout:'62%', plugins:{legend:{position:'bottom'}, tooltip:{callbacks:{label:x=>`${x.label}: ${fmt(x.raw,0)} млрд руб (${fmt(100*x.raw/rs,0)} %)`}}}}});

  const tor = D.tornado, b = tor.base;
  new Chart(document.getElementById('cTor'), {type:'bar', data:{labels:tor.items.map(i=>i.name), datasets:[
    {label:'Неблагоприятно', data:tor.items.map(i=>[b, Math.min(i.lo,i.hi)]), backgroundColor:'rgba(229,72,77,.85)', borderRadius:3},
    {label:'Благоприятно', data:tor.items.map(i=>[b, Math.max(i.lo,i.hi)]), backgroundColor:'rgba(47,107,242,.85)', borderRadius:3}]},
    options:{indexAxis:'y', plugins:{tooltip:{callbacks:{label:x=>`${x.dataset.label}: NPV ${fmt(x.raw[1])} млрд руб`}}}, scales:{x:{grid, title:{display:true,text:'NPV, млрд руб'}}, y:{stacked:true, grid:{display:false}}}}});

  new Chart(document.getElementById('cFt'), {type:'bar', data:{labels:D.ft_price.map(p=>`${fmt(56.1*p[0],1)} / ${fmt(64.5*p[0],1)}`), datasets:[{label:'Прирост NPV, млрд руб', data:D.ft_price.map(p=>p[1].npv), backgroundColor:D.ft_price.map(p=>p[1].npv<0?'rgba(229,72,77,.85)':(p[0]===1?C.blue:'rgba(17,166,131,.85)')), borderRadius:4}]},
    options:{plugins:{legend:{display:false}, tooltip:{callbacks:{label:x=>`NPV ${fmt(x.raw)} млрд руб, IRR ${fmt(D.ft_price[x.dataIndex][1].irr)} %`}}}, scales:{x:{grid:{display:false}, title:{display:true,text:'цена ДТ / керосина в модели, тыс. руб/т'}}, y:{grid, title:{display:true,text:'млрд руб'}}}}});
}

initMap(); initCharts();
})();
