(() => {
const C = {blue:'#2f6bf2', ink:'#0e1b3d', teal:'#11a683', orange:'#ee8a1e', red:'#e5484d', gray:'#7d7f87', trunk:'#5a6f9b', field:'#8ea3c8', muted:'#66728f'};
const fmt = (v, d=1) => v.toLocaleString('ru-RU', {minimumFractionDigits:d, maximumFractionDigits:d});
const OSM = 'Геометрия: © участники OpenStreetMap, выгрузка 24.10.2026';

// ---------- points ----------
const FIELD = [71.40, 70.30];
const P = {
  field: FIELD, camp:[71.22, 70.255], gtl:[71.58, 70.335],
  tie:[68.3247, 70.3574], kar:[68.4057, 70.3139], bovSt:[68.994, 70.1316],
  sey:[72.5105, 70.1665], mk:[73.5727, 68.5119], np:[72.8986, 67.6928], sab:[72.127, 71.236]
};
const hav = (a, b) => { const R=6371, t=x=>x*Math.PI/180; const dl=t(b[1]-a[1]), dn=t(b[0]-a[0]);
  const h=Math.sin(dl/2)**2+Math.cos(t(a[1]))*Math.cos(t(b[1]))*Math.sin(dn/2)**2; return 2*R*Math.asin(Math.sqrt(h)); };
const km = (a,b) => Math.round(hav(a,b));

const existingPts = [
  {c:[68.40,70.40], n:'Бованенковское НГКМ', k:'field', d:'Опорный промысел Ямала: УКПГ с 30 турбодетандерными агрегатами, начало СМГ Бованенково–Ухта.', s:'<a href="https://istina.msu.ru/download/10927562/1eQBFE:XcE5QiQCx0gUPC8N7kt5CDWXt3s/" target="_blank" rel="noopener">ИСТИНА МГУ</a>; положение условное (центр промысла)'},
  {c:[66.86,71.10], n:'Харасавэйское ГКМ', k:'field', d:'Промысел Газпрома на западе Ямала, связан с узлом Бованенково.', s:'Положение — по пос. Харасавэй (OSM)'},
  {c:P.sab, n:'Сабетта — порт и «Ямал СПГ»', k:'port', d:`Морской порт и завод СПГ. От месторождения ≈${km(FIELD,P.sab)} км по прямой. Возможный потребитель ДТ (подрядчики, флот).`, s:OSM},
  {c:P.sey, n:'Сёяха', k:'vil', d:`Посёлок на берегу Обской губы, ≈${km(FIELD,P.sey)} км от месторождения. Получает топливо в конце навигации. Предлагаемый пункт отгрузки ДТ на воду.`, s:'<a href="https://arctic-russia.ru/news/na-yamale-zavershen-tsentralizovannyy-zavoz-topliva-v-otdalennye-poseleniya-regiona/" target="_blank" rel="noopener">Арктика — территория диалога</a>; '+OSM},
  {c:P.mk, n:'Мыс Каменный', k:'vil', d:'Посёлок и аэропорт; рядом нефтеналивной терминал «Ворота Арктики». Получатель централизованного завоза топлива.', s:OSM},
  {c:P.np, n:'Новый Порт', k:'vil', d:'Посёлок, получатель централизованного завоза топлива.', s:OSM},
  {c:[71.8178,71.4751], n:'Тамбей', k:'vil', d:'Посёлок на северо-востоке Ямала.', s:OSM},
  {c:[70.8365,66.8656], n:'Яр-Сале', k:'vil', d:'Административный центр Ямальского района.', s:OSM},
  {c:[66.6146,66.5299], n:'Салехард', k:'city', d:'Столица ЯНАО.', s:OSM},
  {c:[66.381,66.6615], n:'Лабытнанги', k:'city', d:'Ж/д узел на левом берегу Оби, выход на Северную железную дорогу.', s:OSM},
  {c:[66.2352,66.7195], n:'ст. Обская', k:'rail', d:'Начало линии Обская–Бованенково–Карская (572 км).', s:'<a href="https://www.gazprom.ru/press/news/reports/2013/yamalskiy-express/" target="_blank" rel="noopener">Газпром</a>; '+OSM},
  {c:P.bovSt, n:'ст. Бованенково', k:'rail', d:'Станция линии Обская–Карская.', s:OSM},
  {c:P.kar, n:'ст. Карская', k:'rail', d:'Конечная станция линии. Предлагаемый пункт налива стабильного конденсата.', s:OSM},
  {c:[68.3349,70.3158], n:'Аэропорт Бованенково', k:'air', d:'Вахтовые авиарейсы; используем для смены персонала.', s:OSM},
  {c:[66.9115,71.2346], n:'Аэропорт Харасавэй', k:'air', d:'Вахтовый аэропорт.', s:OSM},
  {c:[71.9773,71.206], n:'Аэропорт Сабетта', k:'air', d:'Международный аэропорт порта Сабетта.', s:OSM},
];
const kColor = {field:C.trunk, port:C.ink, vil:'#8a97b5', city:C.ink, rail:'#2a2f3a', air:'#3d7bd6'};

const fc = feats => ({type:'FeatureCollection', features:feats});
const line = (coords, props) => ({type:'Feature', properties:props, geometry:{type:'LineString', coordinates:coords}});
const pt = (c, props) => ({type:'Feature', properties:props, geometry:{type:'Point', coordinates:c}});

const lenGas = km(FIELD,[69.9,70.37]) + km([69.9,70.37], P.tie);
const lenCond = km(FIELD,[69.9,70.33]) + km([69.9,70.33], P.kar);
const proposed = fc([
  line([FIELD,[69.9,70.37],P.tie], {cat:'pr-gas', n:'Газопровод-подключение к СМГ Бованенково–Ухта', d:`≈11,5 млрд м³/год товарного газа на полке. Длина по прямой ≈${lenGas} км, в модели — 120 км, 37,7 млрд руб. Точка подключения — начало СМГ Бованенково–Ухта (по OSM).`, s:'Трасса схематична. Расчёт команды; '+OSM}),
  line([FIELD,[69.9,70.33],P.kar], {cat:'pr-cond', n:'Конденсатопровод до ст. Карская', d:`До ≈0,49 млн т/год стабильного конденсата. По прямой ≈${lenCond} км, в модели — 120 км, 8,6 млрд руб. Далее — налив в цистерны и ж/д 572 км до Обской (расширение до 2,2 млн т/год).`, s:'Трасса схематична. <a href="https://www.npktrans.ru/media/novosti/yamaltransstroi-rasshirit-zhd-liniyu-dlya-vyvoza-uglevodorodov-s-bovanenkovskogo-mestorozhdeniya-k-portu-ust-luga/" target="_blank" rel="noopener">НПК «Транс»</a>'}),
  line([FIELD,[69.9,70.30],P.bovSt], {cat:'pr-road', n:'Автодорога в коридоре трубопроводов', d:'Связь с базой, станцией и аэропортом Бованенково; общий коридор с газо- и конденсатопроводом сокращает отвод земель.', s:'Трасса схематична; CAPEX в статье «энергетика, посёлок, дорога» (26,9 млрд руб).'}),
  line([FIELD,P.sey], {cat:'pr-dsl', n:'Дизель → Сёяха (зимник / автодорога)', d:`≈${km(FIELD,P.sey)} км. Сёяха — причал на Обской губе для отгрузки ДТ в навигацию.`, s:'Схематично'}),
  line([P.sey,[73.1,69.4],P.mk], {cat:'pr-dsl', n:'Дизель → Мыс Каменный (Обская губа)', d:'Водная доставка в навигацию вместо завоза с НПЗ Сургута и Омска.', s:'Схематично; <a href="https://ks-yanao.ru/narrative/ekonomika/na-jamale-nachalsja-tsentralizovannyj-zavoz-topliva-v-otdalennye-poselki" target="_blank" rel="noopener">Красный Север</a>'}),
  line([P.mk,P.np], {cat:'pr-dsl', n:'Дизель → Новый Порт', d:'Продолжение водного маршрута по Обской губе.', s:'Схематично'}),
  line([FIELD,P.sab], {cat:'pr-dsl', n:'Дизель → Сабетта', d:`≈${km(FIELD,P.sab)} км. Потребители: порт, подрядчики, флот.`, s:'Схематично; объём спроса — [ЗАПОЛНИТЬ]'}),
]);
const proposedPts = [
  {c:P.field, n:'УКПГ «Северное сияние»', big:true, d:'12 млрд м³/год на полке (2033–2043), первый газ — 2031 г. НТС на 5 ТДА, стабилизация конденсата, регенерация метанола ректификацией. ≈78 скважин на кустах.', s:'Координаты — задание кейса (70,30° с.ш.; 71,40° в.д.)'},
  {c:P.gtl, n:'Модуль GTL (Фишер–Тропш)', d:'50 тыс. т/год синтетического ДТ и 17 тыс. т нафты; ≈167 млн м³/год газа; CAPEX 12,5 млрд руб; ввод — 2033 г.', s:'<a href="https://ru.infratechnology.ru/technology/" target="_blank" rel="noopener">INFRA</a>; допущения команды'},
  {c:P.camp, n:'Вахтовый посёлок', d:'Жилой комплекс для смены; связь с аэропортом Бованенково по дороге коридора.', s:'Положение схематично'},
];

function popupHTML(p){ return `<h4>${p.n}</h4><p>${p.d}</p><p class="src">${p.s||''}</p>`; }

function initMap(){
  const el = document.getElementById('mapEl');
  if (!window.maplibregl) { el.innerHTML = '<p style="padding:20px">Карта не загрузилась: нет доступа к библиотеке MapLibre.</p>'; return; }
  const map = new maplibregl.Map({
    container: el, style: 'https://tiles.openfreemap.org/styles/positron',
    center: [69.6, 69.6], zoom: 5.4, minZoom: 3, maxZoom: 12, attributionControl: {compact: true}, cooperativeGestures: window.matchMedia('(max-width:720px)').matches
  });
  map.addControl(new maplibregl.NavigationControl({showCompass:false}), 'top-right');
  map.addControl(new maplibregl.ScaleControl({unit:'metric'}), 'bottom-left');
  const note = document.createElement('div'); note.className='schem'; note.textContent='Пунктир — проектные трассы, схематично'; el.appendChild(note);

  map.on('load', async () => {
    let ex = fc([]);
    try { ex = await (await fetch('data/existing.geojson')).json(); } catch(e) {}
    map.addSource('ex', {type:'geojson', data: ex});
    map.addLayer({id:'ex-field', type:'line', source:'ex', filter:['==',['get','cat'],'gas_field'], paint:{'line-color':C.field,'line-width':['interpolate',['linear'],['zoom'],5,0.8,10,2]}});
    map.addLayer({id:'ex-field-liq', type:'line', source:'ex', filter:['==',['get','cat'],'liquid'], paint:{'line-color':'#c99a6a','line-width':1.4}});
    map.addLayer({id:'ex-trunk', type:'line', source:'ex', filter:['==',['get','cat'],'gas_trunk'], paint:{'line-color':C.trunk,'line-width':['interpolate',['linear'],['zoom'],4,2,10,4.5]}});
    map.addLayer({id:'ex-rail-base', type:'line', source:'ex', filter:['==',['get','cat'],'rail'], paint:{'line-color':'#2a2f3a','line-width':['interpolate',['linear'],['zoom'],4,2.4,10,5]}});
    map.addLayer({id:'ex-rail', type:'line', source:'ex', filter:['==',['get','cat'],'rail'], paint:{'line-color':'#ffffff','line-width':['interpolate',['linear'],['zoom'],4,1,10,2.4],'line-dasharray':[3,3]}});

    map.addSource('pr', {type:'geojson', data: proposed});
    const dash = (id, color, w, da) => map.addLayer({id, type:'line', source:'pr', filter:['==',['get','cat'],id], layout:{'line-cap':'round'}, paint:{'line-color':color,'line-width':w,'line-dasharray':da}});
    dash('pr-road', C.gray, 2.5, [1,1.6]);
    dash('pr-dsl', C.teal, 3, [1.4,1.4]);
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

    // pulsing marker on the field
    let pop = null;
    const openPop = (ll, p, off=10) => { if (pop) pop.remove(); pop = new maplibregl.Popup({offset:off, maxWidth:'300px'}).setLngLat(ll).setHTML(popupHTML(p)).addTo(map); };
    const m = document.createElement('button'); m.className='pin pin--big'; m.setAttribute('aria-label','УКПГ «Северное сияние»: показать параметры');
    m.addEventListener('click', ev => { ev.stopPropagation(); openPop(FIELD, proposedPts[0], 16); });
    new maplibregl.Marker({element:m}).setLngLat(FIELD).addTo(map);

    const clickable = ['pr-pts','ex-pts','pr-gas','pr-cond','pr-road','pr-dsl','ex-trunk','ex-rail-base'];
    clickable.forEach(id => {
      map.on('mouseenter', id, () => map.getCanvas().style.cursor='pointer');
      map.on('mouseleave', id, () => map.getCanvas().style.cursor='');
    });
    map.on('click', e => {
      const f = map.queryRenderedFeatures([[e.point.x-6,e.point.y-6],[e.point.x+6,e.point.y+6]], {layers: clickable.filter(id => map.getLayer(id) && map.getLayoutProperty(id,'visibility')!=='none')})[0];
      if (!f) return;
      let p = f.properties;
      if (f.layer.id==='ex-trunk') p = {n: p.name || 'Магистральный газопровод', d:'Существующая система магистральных газопроводов (Бованенково–Ухта, лупинги, перемычки).', s:OSM+'; <a href="https://energybase.ru/pipeline/bovanenkovo-ukhta" target="_blank" rel="noopener">Energybase</a>'};
      if (f.layer.id==='ex-rail-base') p = {n:'Ж/д Обская–Бованенково–Карская', d:'572 км; ведомственная линия Газпрома. Вывоз жидких УВ Бованенково расширяется до 2,2 млн т/год.', s:OSM+'; <a href="https://www.gazprom.ru/press/news/reports/2013/yamalskiy-express/" target="_blank" rel="noopener">Газпром</a>'};
      openPop(f.geometry.type==='Point' ? f.geometry.coordinates : e.lngLat, p);
    });

    // layer toggles
    const groups = {'ex-rail':['ex-rail','ex-rail-base'], 'ex-trunk':['ex-trunk'], 'ex-field':['ex-field','ex-field-liq'], 'ex-pts':['ex-pts','ex-pts-lbl'],
      'pr-gas':['pr-gas'], 'pr-cond':['pr-cond'], 'pr-road':['pr-road'], 'pr-dsl':['pr-dsl'], 'pr-pts':['pr-pts','pr-pts-lbl']};
    document.querySelectorAll('[data-layer]').forEach(cb => cb.addEventListener('change', () => {
      (groups[cb.dataset.layer]||[]).forEach(id => map.getLayer(id) && map.setLayoutProperty(id, 'visibility', cb.checked ? 'visible' : 'none'));
    }));
    document.querySelectorAll('[data-fly]').forEach(b => b.addEventListener('click', () => {
      if (b.dataset.fly==='field') map.flyTo({center:[70.1,70.3], zoom:7.1, speed:.9});
      else map.fitBounds([[64.8,66.3],[74.6,71.7]], {padding:40, speed:.9});
    }));
    window.__mapReady = true;
  });
  window.__map = map;
}

// ---------- charts ----------
async function initCharts(){
  let D; try { D = await (await fetch('data/model.json')).json(); } catch(e) { return; }
  // compare table
  const c = D.cmp, cols = ['A0','A','B','C','T'];
  const rows = [
    ['NPV при 10 %, млрд руб', k => fmt(c[k].npv), k => c[k].npv<0],
    ['IRR (реальная), %', k => fmt(c[k].irr)],
    ['CAPEX, млрд руб', k => fmt(c[k].capex)],
    ['Индекс доходности', k => fmt(c[k].pi,2)],
    ['Окупаемость (дисконт.)', k => c[k].npv>0 ? String(c[k].pb) : 'не окупается'],
    ['Продукты', k => ({A0:'газ, конденсат',A:'газ, конденсат',B:'газ, конденсат, СУГ',C:'газ, конденсат, СУГ, этан',T:'газ, конденсат, дизель'})[k]],
    ['Свой дизель и автономность', k => k==='T' ? 'да' : 'нет'],
    ['Использование инфраструктуры Бованенково', k => k==='A0' ? 'частично' : 'да'],
  ];
  document.getElementById('cmpBody').innerHTML = rows.map(([n,f,neg]) => `<tr><th scope="row">${n}</th>${cols.map(k => `<td class="${k==='T'?'hl':''} ${neg&&neg(k)?'neg':''}">${f(k)}</td>`).join('')}</tr>`).join('');

  if (!window.Chart) return;
  Chart.defaults.font.family = "'Onest', system-ui, sans-serif"; Chart.defaults.font.size = 12; Chart.defaults.color = C.muted;
  Chart.defaults.plugins.legend.labels.boxWidth = 12; Chart.defaults.maintainAspectRatio = false;
  const grid = {color:'rgba(14,27,61,.08)'};
  const Y = D.years;

  new Chart(document.getElementById('cDiesel'), {type:'bar', data:{labels:['Завоз ДТ ЯНАО, 2026','Модуль GTL «Северное сияние»'], datasets:[{data:[64,50], backgroundColor:['#9fb6ff', '#19c39c'], borderRadius:6, barThickness:56}]},
    options:{plugins:{legend:{display:false}, tooltip:{callbacks:{label:x=>x.raw+' тыс. т/год'}}}, scales:{x:{ticks:{color:'#dfe6ff'}, grid:{display:false}}, y:{ticks:{color:'#dfe6ff'}, grid:{color:'rgba(255,255,255,.12)'}, title:{display:true,text:'тыс. т',color:'#dfe6ff'}}}}});

  new Chart(document.getElementById('cNpv'), {type:'line', data:{labels:Y, datasets:[
    {label:'Наш вариант: ТДА + GTL', data:D.cum_dfcf, borderColor:C.blue, backgroundColor:'rgba(47,107,242,.10)', fill:true, borderWidth:3, pointRadius:0, tension:.25},
    {label:'Вариант А (НТС + кооперация)', data:D.cum_dfcf_A, borderColor:C.muted, borderDash:[5,4], borderWidth:2, pointRadius:0, tension:.25}]},
    options:{interaction:{mode:'index',intersect:false}, plugins:{tooltip:{callbacks:{label:x=>`${x.dataset.label}: ${fmt(x.raw)} млрд руб`}}},
      scales:{x:{grid:{display:false}, ticks:{maxTicksLimit:10}}, y:{grid, title:{display:true,text:'млрд руб'}}}}});

  const cs = D.capex_struct, csk = Object.keys(cs);
  const pal = ['#0e1b3d','#2f6bf2','#5b8cff','#9fb6ff','#19c39c','#11a683','#ee8a1e','#f2b705','#7d7f87','#e5484d'];
  new Chart(document.getElementById('cCapex'), {type:'doughnut', data:{labels:csk, datasets:[{data:csk.map(k=>cs[k]), backgroundColor:pal, borderColor:'#fff', borderWidth:2}]},
    options:{cutout:'62%', plugins:{legend:{position:'bottom', labels:{font:{size:11}, padding:8}}, tooltip:{callbacks:{label:x=>`${x.label}: ${fmt(x.raw)} млрд руб`}}}}});

  new Chart(document.getElementById('cProd'), {data:{labels:Y, datasets:[
    {type:'bar', label:'Добыча сырого газа, млрд м³', data:D.raw, backgroundColor:'rgba(47,107,242,.75)', yAxisID:'y', borderRadius:2},
    {type:'line', label:'Конденсат, тыс. т', data:D.cond.map(v=>v*1000), borderColor:C.orange, borderWidth:2.5, pointRadius:0, yAxisID:'y1'},
    {type:'line', label:'Дизель GTL, тыс. т', data:D.dsl.map(v=>v*1000), borderColor:C.teal, borderWidth:2.5, pointRadius:0, yAxisID:'y1'}]},
    options:{interaction:{mode:'index',intersect:false}, scales:{x:{grid:{display:false}, ticks:{maxTicksLimit:10}}, y:{grid, title:{display:true,text:'млрд м³'}}, y1:{position:'right', grid:{display:false}, title:{display:true,text:'тыс. т'}}}}});

  const t = D.tot;
  new Chart(document.getElementById('cRev'), {type:'doughnut', data:{labels:['Газ','Конденсат и нафта','Дизель GTL'], datasets:[{data:[t.rev_gas,t.rev_cond,t.rev_dsl], backgroundColor:[C.blue,C.orange,'#19c39c'], borderColor:'#fff', borderWidth:2}]},
    options:{cutout:'62%', plugins:{legend:{position:'bottom'}, tooltip:{callbacks:{label:x=>`${x.label}: ${fmt(x.raw,0)} млрд руб (${fmt(100*x.raw/(t.rev_gas+t.rev_cond+t.rev_dsl),0)} %)`}}}}});

  const tor = D.tornado, b = tor.base;
  new Chart(document.getElementById('cTor'), {type:'bar', data:{labels:tor.items.map(i=>i.name), datasets:[
    {label:'Неблагоприятно', data:tor.items.map(i=>[b, Math.min(i.lo,i.hi)]), backgroundColor:'rgba(229,72,77,.85)', borderRadius:3},
    {label:'Благоприятно', data:tor.items.map(i=>[b, Math.max(i.lo,i.hi)]), backgroundColor:'rgba(47,107,242,.85)', borderRadius:3}]},
    options:{indexAxis:'y', plugins:{tooltip:{callbacks:{label:x=>`${x.dataset.label}: NPV ${fmt(x.raw[1])} млрд руб`}}}, scales:{x:{grid, title:{display:true,text:'NPV, млрд руб'}}, y:{stacked:true, grid:{display:false}}}}});

  new Chart(document.getElementById('cFt'), {type:'bar', data:{labels:D.ft_price.map(p=>fmt(p[0]/1000,0)), datasets:[{label:'Прирост NPV, млрд руб', data:D.ft_price.map(p=>p[1].npv), backgroundColor:D.ft_price.map(p=>p[1].npv<0?'rgba(229,72,77,.85)':(p[0]===55000?C.blue:'rgba(17,166,131,.85)')), borderRadius:4}]},
    options:{plugins:{legend:{display:false}, tooltip:{callbacks:{label:x=>`NPV ${fmt(x.raw)} млрд руб, IRR ${fmt(D.ft_price[x.dataIndex][1].irr)} %`}}}, scales:{x:{grid:{display:false}, title:{display:true,text:'цена ДТ на промысле, тыс. руб/т без НДС и акциза'}}, y:{grid, title:{display:true,text:'млрд руб'}}}}});
}

initMap(); initCharts();
})();
