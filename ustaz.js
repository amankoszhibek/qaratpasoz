const icons={book:'M3 4q5-2 9 1 4-3 9-1v15q-5-2-9 1-4-3-9-1z M12 5v15',test:'M6 4h12v17H6z M9 4V2h6v2 M9 10l1 1 3-3 M9 16h6',chart:'M3 20h18 M6 16v-4 M12 16V7 M18 16V3',clock:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M12 6v6l4 2',user:'M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M4 21q0-9 8-9t8 9',layers:'M2 8l10-5 10 5-10 5z M3 12l9 5 9-5 M3 16l9 5 9-5',list:'M8 6h13 M8 12h13 M8 18h13 M3 6h1 M3 12h1 M3 18h1'};
const icon=k=>'<svg aria-hidden="true" viewBox="0 0 24 24"><path d="'+icons[k]+'"/></svg>';
const pages={index:['Сабақтар','book'],test:['Жалпы тест','test'],progress:['Прогресс','chart']};
function currentPage(){const id=location.hash.slice(1);return Object.hasOwn(pages,id)?id:'index'}
let page=currentPage();
const read=(k,d)=>{try{return JSON.parse(localStorage.getItem('ustaz.'+k))??d}catch{return d}}, save=(k,v)=>localStorage.setItem('ustaz.'+k,JSON.stringify(v));
let grade=Number(read('grade',7)), alt=read('alt',false), lesson, key;
if(!lessons.some(x=>x[0]===grade))grade=7;
const extra=[0,'Пунктуация','Қаратпа сөз','Сөйлеушінің біреуге назар аударта айтқан сөзі қаратпа сөз деп аталады. Ол сөйлемнің өзге бөлігінен үтір арқылы бөлінеді.','Балалар, кітаптарыңды ашыңдар.','Балалар','Қаратпа сөз','кітаптарыңды ашыңдар','Негізгі ой',[
['Қаратпа сөзі бар сөйлемді тап.','Асан, бері кел.','Асан келді.','Мен Асанды көрдім.','Сөйлеуші Асанға тікелей қарата айтып тұр.'],['Үтір дұрыс қойылған сөйлемді тап.','Сәлем, досым!','Сәлем досым!','Сә, лем досым!','Досым қаратпа сөзі сөйлемнің соңында үтірмен бөлінеді.']]];
function setLesson(){lesson=alt?extra:lessons.find(x=>x[0]===grade);key=grade+'-'+Number(alt)}
setLesson();
const head=(k,t)=>'<div class="head"><span class="ico">'+icon(k)+'</span><h3>'+t+'</h3></div>';
const link=(p,t)=>'<a class="primary" href="#'+p+'">'+t+'</a>';
const app=document.querySelector('#app');
function shell(){app.innerHTML='<aside><a class="brand" href="#index"><b>'+icon('book')+'</b><span>BolashaqUstaz<small>Қазақ тілі платформасы</small></span></a><div class="sideLabel">ОҚУ КЕҢІСТІГІ</div><nav>'+Object.entries(pages).map(([p,[n,i]])=>'<a class="'+(page===p?'on':'')+'" href="#'+p+'">'+icon(i)+n+'</a>').join('')+'</nav><div class="account"><span class="avatar">'+icon('user')+'</span><div>Оқушы<small>Жеке оқу кабинеті</small></div></div></aside><main><header class="bar"><span>'+icon('layers')+' Оқу кабинеті　/　'+pages[page][0]+'</span><span>Қазақ тілі <b class="avatar">'+icon('user')+'</b></span></header><div class="wrap"><div class="top"><div><div class="eyebrow">ҚАЗАҚ ТІЛІ</div><h1>'+({index:'BolashaqUstaz',test:'Жалпы тест',progress:'Менің прогресім'})[page]+'</h1><p class="muted">'+({index:'Тақырыпты меңгеріп, біліміңді бекіт.',test:'Қазақ тілі грамматикасы · 6 тақырып бойынша 12 сұрақ.',progress:'Оқыған сабақтарың мен тест нәтижелерің.'})[page]+'</p></div><select id="grade" aria-label="Сынып">'+lessons.map(x=>'<option '+(x[0]===grade?'selected':'')+' value="'+x[0]+'">'+x[0]+'-сынып</option>').join('')+'</select></div><div id="content"></div></div></main>';
document.querySelector('#grade').onchange=e=>{grade=+e.target.value;save('grade',grade);setLesson();render()}}
function topic(){return '<label class="topic"><small>Тақырыпты таңдау</small><br><select id="topic"><option value="0">'+lessons.find(x=>x[0]===grade)[2]+'</option><option value="1">'+extra[2]+'</option></select></label>'}
function setupTopic(){let t=document.querySelector('#topic');if(t){t.value=Number(alt);t.onchange=()=>{alt=!!Number(t.value);save('alt',alt);setLesson();render()}}}
function videoLesson(title) {
  const [id, name, duration, prompt] = grade === 7 && title === "Қаратпа сөз" ? gradeSevenAddressVideo : videos[title];
  return `<section class="video-lesson"><h4>Видеосабақ</h4>
    <p>${name} · ${duration}</p>
    ${prompt ? `<p class="lesson-detail">${prompt}</p>` : ""}
    <a class="primary video-open" href="https://www.youtube.com/watch?v=${id}">▶ Видеосабақты YouTube-та ашу</a>
    ${/^https?:$/.test(location.protocol) ? `<iframe loading="lazy" title="${name} — видеосабақ" src="https://www.youtube-nocookie.com/embed/${id}" referrerpolicy="strict-origin-when-cross-origin" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>` : ''}</section>`;
}
const practice = {
  'Зат есім': {
    claim:'«Қуаныш» сөзі сезімнің атын білдіретіндіктен, зат есімге жатады.', truth:true, why:'Зат есім дерексіз ұғымды да атай алады. «Қуаныш» сөзіне «не?» деген сұрақ қойылады.',
    find:'Адамды атайтын сөзді тап.', words:['жүгірді','дәрігер','биік','жел'], pick:'дәрігер', hint:'«Кім?» деген сұрақты қой.',
    goal:'Зат есімді мағынасы мен сұрағы арқылы анықтау.', criterion:'Зат есімді тауып, оған «кім?» немесе «не?» сұрағын дұрыс қояды.'
  },
  'Туынды сөз': {
    claim:'«Үйлер» сөзіндегі -лер жұрнағы жаңа сөз жасайды.', truth:false, why:'-лер — көптік жалғауы. «Үй» сөзінің мағынасы сақталып, саны ғана өзгереді.',
    find:'Жұрнақ арқылы жасалған кәсіп атауын тап.', words:['балық','қалада','егінші','жолдар'], pick:'егінші',hint:'Іс иесін білдіретін -шы немесе -ші жұрнағын ізде.',
    goal:'Туынды сөздің түбірі мен жұрнағын ажырату.',criterion:'Түбірді көрсетіп, жұрнақтың қандай мағына қосқанын түсіндіреді.'
  },
  'Сабақтас құрмалас сөйлем': {
    claim:'«Жаңбыр басылса, серуенге шығамыз» сөйлемінде бірінші бөлік серуенге шығудың шартын білдіреді.',truth:true,why:'Қандай жағдайда шығамыз? Жаңбыр басылса. -са тұлғасы шартты білдіреді.',
    find:'«Қоңырау соғылғанда, балалар сыныпқа кірді» сөйлемінен мезгілді білдіретін бағыныңқы бөліктің баяндауышын тап.',words:['қоңырау','соғылғанда','балалар','кірді'],pick:'соғылғанда',hint:'«Балалар қашан кірді?» деп сұра. Жауаптағы қимылды білдіретін сөзді таңда.',
    goal:'Бағыныңқы және басыңқы бөліктердің мағыналық байланысын түсіндіру.',criterion:'Екі бөлікті ажыратып, басыңқыдан бағыныңқыға орынды сұрақ қояды.'
  },
  'Сөйлем мүшелері': {
    claim:'«Құстар оралды» сөйлемінде «құстар» сөзі баяндауыш қызметін атқарады.',truth:false,why:'«Нелер оралды?» деген сұраққа «құстар» жауап береді. Ол — бастауыш. Баяндауыш — «оралды».',
    find:'«Таңертең бақта құстар сайрады» сөйлемінен баяндауышты тап.',words:['таңертең','бақта','құстар','сайрады'],pick:'сайрады',hint:'«Құстар не істеді?» деген сұраққа жауап беретін сөзді ізде.',
    goal:'Сөйлемнің грамматикалық негізін табу.',criterion:'Бастауыш пен баяндауышты атап, әрқайсысына тиісті сұрақ қояды.'
  },
  'Салалас құрмалас сөйлем': {
    claim:'Салалас құрмаластағы жай сөйлемдер тең дәрежеде байланысады.',truth:true,why:'Әр бөліктің баяндауышы тиянақты болады. Оларды жалғаулық немесе интонация байланыстырады.',
    find:'«Жол алыс, … біз уақытында жеттік» сөйлеміне қарсылық мәнін беретін сөзді таңда.',words:['өйткені','бірақ','немесе','сондықтан'],pick:'бірақ',hint:'Екінші оқиға бірінші бөліктен күтілетін нәтижеге қарама-қарсы.',
    goal:'Салалас құрмаластың бөліктері арасындағы мағыналық қатынасты анықтау.',criterion:'Тиянақты баяндауыштарды тауып, жалғаулықтың қызметін түсіндіреді.'
  },
  'Қаратпа сөз': {
    claim:'Қаратпа сөз сөйлемнің ортасында келсе, екі жағынан үтір қойылады.',truth:true,why:'«Бүгін, Айша, кезек сенде» сөйлемінде сөйлеуші Айшаға тіл қатып тұр. Екі үтір қаратпа сөздің шегін көрсетеді.',
    find:'«Аружан, ертең кітапханаға келші» сөйлемінен қаратпа сөзді тап.',words:['ертең','Аружан','кітапханаға','келші'],pick:'Аружан',hint:'Сөйлеуші кімге тіл қатып тұр?',
    goal:'Қаратпа сөзді танып, оған қатысты үтірді дұрыс қою.',criterion:'Сөздің кімге арналғанын анықтап, үтірдің орнын түсіндіреді.'
  }
};

function practiceBlock(l) {
  const x=practice[l[2]];
  return `<section class="card" id="practice">${head('book','Тәжірибелік тапсырмалар')}
    <fieldset><legend>Дұрыс па, бұрыс па?</legend><p>${x.claim}</p>
      <button class="chip" data-truth="true">Дұрыс</button> <button class="chip" data-truth="false">Бұрыс</button>
      <p class="reply" id="truthReply" role="status"></p></fieldset>
    <fieldset><legend>Сөзді тап</legend><p>${x.find}</p>
      ${x.words.map(w=>`<button class="chip" data-word="${w}">${w}</button>`).join(' ')}
      <p class="reply" id="wordReply" role="status"></p></fieldset>
    <label for="written"><b>Ашық сұрақ</b></label><p>${explanations[l[2]][2]}</p>
    <textarea id="written" rows="3" placeholder="Жауабыңды өз сөзіңмен жаз"></textarea>
    <button class="primary" id="compare">Үлгі жауаппен салыстыру</button><p class="reply" id="model" role="status"></p>
  </section>`;
}
function planBlock(l) {
  const x=practice[l[2]];
  return `<section class="card" id="plan"><details><summary>Қысқа мерзімді жоспар (ҚМЖ)</summary>
    <h4>${grade}-сынып · ${l[2]}</h4><p><b>Сабақ мақсаты.</b> ${x.goal}</p>
    <p><b>Бағалау критерийі.</b> ${x.criterion}</p>
    <p><b>Сабақтың басы · 5 минут.</b> Мұғалім «${l[4]}» мысалын көрсетеді. Оқушылар таныс сөздер мен құрылымдарды атайды.</p>
    <p><b>Түсіндіру · 15 минут.</b> Оқушылар видеосабақты қарап, мұғаліммен бірге мысалды талдайды. Тақтаға «${l[5]}» және «${l[7]}» бөліктерін жазып, әрқайсысының қызметін анықтайды.</p>
    <p><b>Бекіту · 15 минут.</b> Оқушы үш практикалық тапсырманы орындайды. Жұбына сөзді неге таңдағанын түсіндіріп, жазбаша жауабын үлгімен салыстырады.</p>
    <p><b>Қорытынды · 5 минут.</b> Мұғалім жауаптарды бағалау критерийі бойынша талдайды. Оқушы сабақты бағалап, қай тұсына тағы мысал қажет екенін жазады.</p>
    <p><b>Саралау.</b> Қолдау қажет болса, мұғалім «${x.hint}» деген бағыт береді. Ерте аяқтаған оқушы ережеге өз мысалын келтіреді.</p>
    <p><b>Ресурстар.</b> Сабақ мәтіні, бейнесабақ, тапсырмалар және дәптер.</p></details></section>`;
}
function reviewBlock(){
  return `<form class="card" id="review">${head('list','Сабақ туралы пікір')}
    <fieldset><legend>Сабақ ұнады ма?</legend><p>1 — ұнамады, 5 — өте ұнады.</p>
    ${[1,2,3,4,5].map(i=>`<label class="rating"><input type="radio" name="rating" value="${i}" required> ${i}</label>`).join('')}</fieldset>
    <label for="comment">Сабақта не жетіспеді? Қандай ұсынысың бар?</label>
    <textarea id="comment" rows="2" placeholder="Пікіріңді осында жаз (міндетті емес)"></textarea>
    <button class="primary">Пікірді сақтау</button><p class="reply" id="reviewStatus" role="status"></p></form>
    <article id="savedReview" class="card saved-review" aria-label="Сақталған пікір" hidden>
      <header><strong>Менің пікірім</strong><span class="review-stars" role="img"></span></header>
      <p class="review-body"></p><time></time>
    </article>`;
}
function bindActivities(){
  const x=practice[lesson[2]];
  const $=s=>document.querySelector(s);
  const storeKey='practice.'+key;
  const state=read(storeKey,{});
  function choose(selector, value, good, message, target){
    document.querySelectorAll(selector).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.truth===value || b.dataset.word===value)));
    $(target).textContent=(good?'Дұрыс. ':'Қайта ойланып көр. ')+message;
  }
  function truth(value){choose('[data-truth]',value,value===String(x.truth),x.why,'#truthReply')}
  function word(value){const good=value===x.pick;choose('[data-word]',value,good,good?'«'+value+'» дұрыс таңдалды. '+x.hint:x.hint,'#wordReply')}
  document.querySelectorAll('[data-truth]').forEach(b=>b.onclick=()=>{state.truth=b.dataset.truth;save(storeKey,state);truth(state.truth)});
  document.querySelectorAll('[data-word]').forEach(b=>b.onclick=()=>{state.word=b.dataset.word;save(storeKey,state);word(state.word)});
  if(state.truth)truth(state.truth);
  if(state.word)word(state.word);
  $('#written').value=state.written||'';
  $('#written').oninput=e=>{state.written=e.target.value;save(storeKey,state);$('#model').textContent=''};
  $('#compare').onclick=()=>{$('#model').textContent=$('#written').value.trim()?'Үлгі жауап. '+explanations[lesson[2]][3]:'Алдымен өз жауабыңды жаз.'};
  const reviewKey='review.'+key;
  const old=read(reviewKey,null);
  function showReview(review){
    const card=$('#savedReview');
    const rating=Number(review.rating);
    if(!Number.isInteger(rating)||rating<1||rating>5)return;
    const stars=card.querySelector('.review-stars');
    stars.textContent='★'.repeat(rating)+'☆'.repeat(5-rating);
    stars.setAttribute('aria-label','5 балдың '+rating+' балы');
    const body=card.querySelector('.review-body');
    body.textContent=review.comment||'';
    body.hidden=!body.textContent;
    const time=card.querySelector('time');
    time.hidden=!review.date;
    if(review.date){
      const date=new Date(review.date);
      time.dateTime=date.toISOString();
      time.textContent=date.toLocaleDateString('kk-KZ',{day:'numeric',month:'long',year:'numeric'});
    }
    card.hidden=false;
  }
  if(old){
    $('#review').elements.rating.value=old.rating;
    $('#comment').value=old.comment||'';
    showReview(old);
  }
  $('#review').onsubmit=e=>{
    e.preventDefault();
    const review={rating:e.target.elements.rating.value,comment:$('#comment').value.trim(),date:Date.now()};
    save(reviewKey,review);
    showReview(review);
    $('#reviewStatus').textContent='Пікірің осы браузерде сақталды.';
    $('#savedReview').scrollIntoView({block:'nearest'});
  };
}

function study(){let l=lesson;const [rule, analysis]=explanations[l[2]];let done=read('read',[]).includes(key);
content.innerHTML='<section class="hero"><div class="heroText"><span class="pill">'+icon('book')+' Ағымдағы сабақ</span><h2>'+l[2]+'</h2><div class="meta">'+grade+'-сынып　·　'+l[1]+'　·　'+icon('clock')+' 5 мин</div></div><div class="boardarea" aria-hidden="true"><div class="board">'+(alt?'Қаратпа сөз':({5:'Зат есім',6:'Туынды сөз',7:'Сабақтас құрмалас',8:'Сөйлем мүшелері',9:'Салалас құрмалас'})[grade])+'<div class="branch">↙　　 ↘</div><div class="leaves"><i>'+l[6].replace(' сөйлем','')+'</i><i>'+l[8].replace(' сөйлем','')+'</i></div></div></div></section><div class="grid"><div><section class="card">'+head('book','Сабақ түсіндірмесі')+'<p>'+l[3]+'</p><p class="lesson-detail">'+rule+'</p><div class="example"><small>Мысал</small>'+l[4]+'</div><div class="tags"><div><small>'+l[6]+'</small><b>'+l[5]+'</b></div><div><small>'+l[8]+'</small><b>'+l[7]+'</b></div></div><h4>Мысалды талдайық</h4><p>'+analysis+'</p>'+videoLesson(l[2])+'</section>'+practiceBlock(l)+'<section class="card"><button id="learned" class="primary" '+(done?'disabled':'')+'>'+(done?'✓ Сабақ оқылды':'Оқып болдым')+'</button></section>'+planBlock(l)+reviewBlock()+'</div><div><section class="card">'+head('list','Оқу жоспары')+[['Ережені оқы','Тақырыппен таныс'],['Мысалды талда','Бөліктердің байланысын анықта'],['Тапсырмаларды орында','Жауабыңды жазып, үлгімен салыстыр']].map(([a,b],i)=>'<div class="line"><b class="num">'+(i+1)+'</b><div><b>'+a+'</b><small>'+b+'</small></div></div>').join('')+'</section><section class="card">'+topic()+'</section></div></div>';
content.insertAdjacentHTML('afterbegin','<div class="lesson-jumps"><button class="chip" data-jump="practice">Тапсырмалар</button> <button class="chip" data-jump="plan">ҚМЖ</button> <button class="chip" data-jump="review">Сабақты бағалау</button></div>');
document.querySelectorAll('[data-jump]').forEach(button=>button.onclick=()=>{
  const section=document.getElementById(button.dataset.jump);
  if(button.dataset.jump==='plan')section.querySelector('details').open=true;
  section.scrollIntoView({block:'start'});
});
bindActivities();
if(globalThis.LanguageModel?.availability){
const learned=document.querySelector('#learned');const options={expectedOutputs:[{type:'text',languages:['kk']}]};
LanguageModel.availability(options).then(status=>{if(status!=='available'||!learned.isConnected)return;
const ask=document.createElement('button');ask.className='option';ask.textContent='ЖИ ұстаздан қосымша мысал алу';learned.after(ask);
ask.onclick=async()=>{ask.disabled=true;ask.textContent='Мысал дайындалып жатыр…';let session;
try{session=await LanguageModel.create(options);let answer=await session.prompt('Қазақ тілі мұғалімі ретінде '+grade+'-сыныпқа «'+l[2]+'» тақырыбынан бір жаңа мысал беріп, оны екі сөйлеммен қазақша түсіндір.');const box=document.createElement('p');box.className='example';box.textContent=answer;ask.replaceWith(box)}catch{ask.textContent='Қайта сұрау';ask.disabled=false}finally{session?.destroy()}}}).catch(()=>{})}
document.querySelector('#learned').onclick=()=>{save('read',[...new Set([...read('read',[]),key])]);study();setupTopic()}}
let qs,pos,points,locked,scoredCount,remedialTopics;
function start() {
  qs = [...lessons,extra].flatMap(l => l[9].map((q,index) => ({
    item:[...q,...distractors[l[2]][index]], lesson:l
  })));
  scoredCount = qs.length;
  remedialTopics = new Set();
  pos = 0;
  points = 0;
  locked = false;
  question();
}
function question(){locked=false;let q=qs[pos].item;content.innerHTML='<section class="card" style="margin-top:24px"><b>Қазақ тілі грамматикасы</b><hr style="border:0;border-top:1px solid #dde3da;margin:22px 0"><small>'+ (pos<scoredCount?'Сұрақ '+(pos+1)+' / '+scoredCount:'Қосымша жаттығу')+'</small><h2>'+q[0]+'</h2><div id="choices"></div><div id="feedback" aria-live="polite"></div></section>';
setupTopic();let choices=[1,2,3].map(i=>({i,r:Math.random()})).sort((a,b)=>a.r-b.r);for(let c of choices){let b=document.createElement('button');b.className='option';b.textContent=q[c.i];document.querySelector('#choices').append(b);b.onclick=()=>answer(c.i)}}
function answer(i){if(locked)return;locked=true;const {item:q,lesson:subject}=qs[pos],ok=i===1;
if(ok && pos<scoredCount)points++;
if(!ok && pos<scoredCount && !remedialTopics.has(subject[2])){
  remedialTopics.add(subject[2]);
  const x=practice[subject[2]];
  const others=x.words.filter(w=>w!==x.pick);
  qs.push({lesson:subject,item:[x.find,x.pick,...others.slice(0,2),x.hint,x.hint,x.hint]});
}
document.querySelectorAll('#choices .option').forEach(button=>{
  button.disabled=true;
  if(button.textContent===q[1])button.classList.add('correct-choice');
  if(!ok && button.textContent===q[i])button.classList.add('incorrect-choice');
});
const explanation = ok ? q[4] : '<p><strong>Сенің жауабың</strong> · '+q[i]+'</p><p>'+q[i+3]+'</p><p><strong>Дұрыс жауап</strong> · '+q[1]+'</p><p>'+q[4]+'</p>';
document.querySelector('#feedback').innerHTML='<div class="'+(ok?'right':'wrong')+'"><b>'+(ok?'Дұрыс жауап!':'Қатені талдайық')+'</b><br>'+explanation+'</div><button class="primary" id="next">'+(pos+1<qs.length?'Келесі тапсырма':'Нәтижені көру')+'</button>';document.querySelector('#next').onclick=()=>{pos++;if(pos<qs.length)return question();let history=read('history',[]);history.push({key,grade,title:'Жалпы тест · Қазақ тілі грамматикасы',points,total:scoredCount,date:Date.now()});save('history',history);content.innerHTML='<section class="card" style="margin-top:24px">'+head('chart','Тест аяқталды')+'<h2>'+points+' / '+scoredCount+' дұрыс жауап</h2><p>Нәтижең сақталды. Қосымша жаттығулар негізгі ұпайға қосылмайды.</p>'+link('progress','Прогресті көру')+'</section>'}}
function progress(){let h=read('history',[]).filter(x=>x.grade===grade).reverse(),n=read('read',[]).filter(k=>k.startsWith(grade+'-')).length,p=h.length?Math.round(h.reduce((s,x)=>s+x.points/(x.total||3),0)/h.length*100):0;content.innerHTML='<div class="stats" style="margin-top:24px">'+[['Оқылған сабақ',n+' / 2'],['Тапсырылған тест',h.length],['Орташа нәтиже',h.length?p+'%':'—']].map(x=>'<div class="card"><small>'+x[0]+'</small><strong>'+x[1]+'</strong></div>').join('')+'</div><section class="card">'+head('book','Сабақтарды меңгеру')+'<div class="progress"><i style="width:'+n*50+'%"></i></div>'+link('index','Сабақтарға өту')+'</section><section class="card">'+head('chart','Тест нәтижелері')+(h.length?h.map(x=>'<div class="line"><div><b>'+x.title+'</b><small>'+new Date(x.date).toLocaleString('kk-KZ')+'</small></div><b style="margin-left:auto">'+x.points+' / '+(x.total||3)+'</b></div>').join(''):'<p>Бұл сынып бойынша алғашқы тестіңді тапсырған соң, нәтижең осында көрінеді.</p>'+link('test','Тест тапсыру'))+'</section>'}
function render(){shell();if(page==='index')study();else if(page==='test')start();else progress();setupTopic()}
render();

window.addEventListener('hashchange',()=>{page=currentPage();document.title=pages[page][0]+' · BolashaqUstaz';render();window.scrollTo(0,0)});
