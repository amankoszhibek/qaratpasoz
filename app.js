const icons={book:'M3 4q5-2 9 1 4-3 9-1v15q-5-2-9 1-4-3-9-1z M12 5v15',test:'M6 4h12v17H6z M9 4V2h6v2 M9 10l1 1 3-3 M9 16h6',chart:'M3 20h18 M6 16v-4 M12 16V7 M18 16V3',clock:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M12 6v6l4 2',user:'M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M4 21q0-9 8-9t8 9',layers:'M2 8l10-5 10 5-10 5z M3 12l9 5 9-5 M3 16l9 5 9-5',list:'M8 6h13 M8 12h13 M8 18h13 M3 6h1 M3 12h1 M3 18h1'};
const icon=k=>'<svg aria-hidden="true" viewBox="0 0 24 24"><path d="'+icons[k]+'"/></svg>';
const pages={index:['Сабақтар','book'],test:['Тест','test'],progress:['Прогресс','chart']};
const page=document.body.dataset.page, read=(k,d)=>{try{return JSON.parse(localStorage.getItem('ustaz.'+k))??d}catch{return d}}, save=(k,v)=>localStorage.setItem('ustaz.'+k,JSON.stringify(v));
let grade=Number(read('grade',7)), alt=read('alt',false), lesson, key;
if(!lessons.some(x=>x[0]===grade))grade=7;
const extra=[0,'Пунктуация','Қаратпа сөз','Сөйлеушінің біреуге назар аударта айтқан сөзі қаратпа сөз деп аталады. Ол сөйлемнің өзге бөлігінен үтір арқылы бөлінеді.','Балалар, кітаптарыңды ашыңдар.','Балалар','Қаратпа сөз','кітаптарыңды ашыңдар','Негізгі ой',[
['Қаратпа сөзі бар сөйлемді тап.','Асан, бері кел.','Асан келді.','Мен Асанды көрдім.','Сөйлеуші Асанға тікелей қарата айтып тұр.'],['Үтір дұрыс қойылған сөйлемді тап.','Сәлем, досым!','Сәлем досым!','Сә, лем досым!','Досым қаратпа сөзі сөйлемнің соңында үтірмен бөлінеді.']]];
function setLesson(){lesson=alt?extra:lessons.find(x=>x[0]===grade);key=grade+'-'+Number(alt)}
setLesson();
const head=(k,t)=>'<div class="head"><span class="ico">'+icon(k)+'</span><h3>'+t+'</h3></div>';
const link=(p,t)=>'<a class="primary" href="'+p+'.html">'+t+'</a>';
const app=document.querySelector('#app');
function shell(){app.innerHTML='<aside><a class="brand" href="index.html"><b>'+icon('book')+'</b><span>Болашақ ұстаз<small>Қазақ тілі платформасы</small></span></a><div class="sideLabel">ОҚУ КЕҢІСТІГІ</div><nav>'+Object.entries(pages).map(([p,[n,i]])=>'<a class="'+(page===p?'on':'')+'" href="'+p+'.html">'+icon(i)+n+'</a>').join('')+'</nav><div class="account"><span class="avatar">'+icon('user')+'</span><div>Оқушы<small>Жеке оқу кабинеті</small></div></div></aside><main><header class="bar"><span>'+icon('layers')+' Оқу кабинеті　/　'+pages[page][0]+'</span><span>Қазақ тілі <b class="avatar">'+icon('user')+'</b></span></header><div class="wrap"><div class="top"><div><div class="eyebrow">ҚАЗАҚ ТІЛІ</div><h1>'+({index:'Оқу кабинеті',test:'Білімді тексеру',progress:'Менің прогресім'})[page]+'</h1><p class="muted">'+({index:'Тақырыпты меңгеріп, біліміңді бекіт.',test:'Жауапты таңда да, түсіндірмесін оқы.',progress:'Оқыған сабақтарың мен тест нәтижелерің.'})[page]+'</p></div><select id="grade" aria-label="Сынып">'+lessons.map(x=>'<option '+(x[0]===grade?'selected':'')+' value="'+x[0]+'">'+x[0]+'-сынып</option>').join('')+'</select></div><div id="content"></div></div></main>';
document.querySelector('#grade').onchange=e=>{grade=+e.target.value;save('grade',grade);setLesson();render()}}
function topic(){return '<label class="topic"><small>Тақырыпты таңдау</small><br><select id="topic"><option value="0">'+lessons.find(x=>x[0]===grade)[2]+'</option><option value="1">'+extra[2]+'</option></select></label>'}
function setupTopic(){let t=document.querySelector('#topic');if(t){t.value=Number(alt);t.onchange=()=>{alt=!!Number(t.value);save('alt',alt);setLesson();render()}}}
function videoLesson(title) {
  const [id, name, duration, prompt] = grade === 7 && title === "Қаратпа сөз" ? gradeSevenAddressVideo : videos[title];
  return `<section class="video-lesson"><h4>Видеосабақ</h4>
    <p>${name} · ${duration}</p>
    ${prompt ? `<p class="lesson-detail">${prompt}</p>` : ""}
    <iframe loading="lazy" title="${name} — видеосабақ" src="https://www.youtube-nocookie.com/embed/${id}" referrerpolicy="strict-origin-when-cross-origin" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>
    <a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">YouTube-та көру</a></section>`;
}
function study(){let l=lesson;const [rule, analysis, task, solution]=explanations[l[2]];let done=read('read',[]).includes(key);
content.innerHTML='<section class="hero"><div class="heroText"><span class="pill">'+icon('book')+' Ағымдағы сабақ</span><h2>'+l[2]+'</h2><div class="meta">'+grade+'-сынып　·　'+l[1]+'　·　'+icon('clock')+' 5 мин</div></div><div class="boardarea" aria-hidden="true"><div class="board">'+(alt?'Қаратпа сөз':({5:'Зат есім',6:'Туынды сөз',7:'Сабақтас құрмалас',8:'Сөйлем мүшелері',9:'Салалас құрмалас'})[grade])+'<div class="branch">↙　　 ↘</div><div class="leaves"><i>'+l[6].replace(' сөйлем','')+'</i><i>'+l[8].replace(' сөйлем','')+'</i></div></div></div></section><div class="grid"><div><section class="card">'+head('book','Сабақ түсіндірмесі')+'<p>'+l[3]+'</p><p class="lesson-detail">'+rule+'</p><div class="example"><small>Мысал</small>'+l[4]+'</div><div class="tags"><div><small>'+l[6]+'</small><b>'+l[5]+'</b></div><div><small>'+l[8]+'</small><b>'+l[7]+'</b></div></div><h4>Мысалды талдайық</h4><p>'+analysis+'</p>'+videoLesson(l[2])+'<h4>Өзіңді тексер</h4><p>'+task+'</p><details><summary>Жауабын көру</summary><p>'+solution+'</p></details><button id="learned" class="primary" '+(done?'disabled':'')+'>'+(done?'✓ Сабақ оқылды':'Оқып болдым')+'</button></section></div><div><section class="card">'+head('list','Оқу жоспары')+[['Ережені оқы','Тақырыппен таныс'],['Мысалды талда','Бөліктердің байланысын анықта'],['Тест тапсыр','Біліміңді тексер']].map(([a,b],i)=>'<div class="line"><b class="num">'+(i+1)+'</b><div><b>'+a+'</b><small>'+b+'</small></div></div>').join('')+link('test','Тестке өту')+'</section><section class="card">'+topic()+'</section></div></div>';
if(globalThis.LanguageModel?.availability){
const learned=document.querySelector('#learned');const options={expectedOutputs:[{type:'text',languages:['kk']}]};
LanguageModel.availability(options).then(status=>{if(status!=='available'||!learned.isConnected)return;
const ask=document.createElement('button');ask.className='option';ask.textContent='ЖИ ұстаздан қосымша мысал алу';learned.after(ask);
ask.onclick=async()=>{ask.disabled=true;ask.textContent='Мысал дайындалып жатыр…';let session;
try{session=await LanguageModel.create(options);let answer=await session.prompt('Қазақ тілі мұғалімі ретінде '+grade+'-сыныпқа «'+l[2]+'» тақырыбынан бір жаңа мысал беріп, оны екі сөйлеммен қазақша түсіндір.');const box=document.createElement('p');box.className='example';box.textContent=answer;ask.replaceWith(box)}catch{ask.textContent='Қайта сұрау';ask.disabled=false}finally{session?.destroy()}}}).catch(()=>{})}
document.querySelector('#learned').onclick=()=>{save('read',[...new Set([...read('read',[]),key])]);study();setupTopic()}}
let qs,pos,points,locked;
function start() {
  const l = lesson;
  const first = '«'+l[5]+'» — '+l[6]+'.';
  const second = '«'+l[7]+'» — '+l[8]+'.';
  qs = l[9].map((q, index) => [...q, ...distractors[l[2]][index]]);
  qs.push([l[4]+' Мысалдағы бөліктер мен атаулардың сәйкестігін тап.',
    first, '«'+l[7]+'» — '+l[6]+'.', 'Екі бөлікке де «'+l[6]+'» сәйкес келеді.',
    first+' '+second, second+' Бұл атауды бірінші бөліктің атауымен шатастырдың.',
    'Екі бөліктің атауы әртүрлі. '+second]);
  pos = 0;
  points = 0;
  locked = false;
  question();
}
function question(){locked=false;let q=qs[pos];content.innerHTML='<section class="card" style="margin-top:24px">'+topic()+'<hr style="border:0;border-top:1px solid #dde3da;margin:22px 0"><small>'+ (pos<3?'Сұрақ '+(pos+1)+' / 3':'Қосымша жаттығу')+'</small><h2>'+q[0]+'</h2><div id="choices"></div><div id="feedback" aria-live="polite"></div></section>';
setupTopic();let choices=[1,2,3].map(i=>({i,r:Math.random()})).sort((a,b)=>a.r-b.r);for(let c of choices){let b=document.createElement('button');b.className='option';b.textContent=q[c.i];document.querySelector('#choices').append(b);b.onclick=()=>answer(c.i)}}
function answer(i){if(locked)return;locked=true;let q=qs[pos],ok=i===1;if(ok&&pos<3)points++;if(!ok&&pos<3){let idx=pos===1?7:5;qs.push(['Мысалды қайта қара: «'+lesson[4]+'» '+lesson[idx+1]+' — осы белгіге сәйкес бөлікті таңда.',lesson[idx],lesson[idx===5?7:5],'Екеуіне де','Бұл мысалда «'+lesson[idx]+'» — '+lesson[idx+1]+'.','«'+lesson[idx===5?7:5]+'» бөлігіне «'+lesson[idx===5?8:6]+'» сәйкес келеді.','Екі бөліктің мағынасы бөлек. «'+lesson[idx===5?7:5]+'» бөлігіне «'+lesson[idx===5?8:6]+'» сәйкес келеді.'])}
document.querySelectorAll('#choices .option').forEach(button=>{
  button.disabled=true;
  if(button.textContent===q[1])button.classList.add('correct-choice');
  if(!ok && button.textContent===q[i])button.classList.add('incorrect-choice');
});
const explanation = ok ? q[4] : '<p><strong>Сенің жауабың</strong> · '+q[i]+'</p><p>'+q[i+3]+'</p><p><strong>Дұрыс жауап</strong> · '+q[1]+'</p><p>'+q[4]+'</p>';
document.querySelector('#feedback').innerHTML='<div class="'+(ok?'right':'wrong')+'"><b>'+(ok?'Дұрыс жауап!':'Қатені талдайық')+'</b><br>'+explanation+'</div><button class="primary" id="next">'+(pos+1<qs.length?'Келесі тапсырма':'Нәтижені көру')+'</button>';document.querySelector('#next').onclick=()=>{pos++;if(pos<qs.length)return question();let history=read('history',[]);history.push({key,grade,title:lesson[2],points,date:Date.now()});save('history',history);content.innerHTML='<section class="card" style="margin-top:24px">'+head('chart','Тест аяқталды')+'<h2>'+points+' / 3 дұрыс жауап</h2><p>Нәтижең сақталды. Қосымша жаттығулар негізгі ұпайға қосылмайды.</p>'+link('progress','Прогресті көру')+'</section>'}}
function progress(){let h=read('history',[]).filter(x=>x.grade===grade).reverse(),n=read('read',[]).filter(k=>k.startsWith(grade+'-')).length,p=h.length?Math.round(h.reduce((s,x)=>s+x.points,0)/h.length/3*100):0;content.innerHTML='<div class="stats" style="margin-top:24px">'+[['Оқылған сабақ',n+' / 2'],['Тапсырылған тест',h.length],['Орташа нәтиже',h.length?p+'%':'—']].map(x=>'<div class="card"><small>'+x[0]+'</small><strong>'+x[1]+'</strong></div>').join('')+'</div><section class="card">'+head('book','Сабақтарды меңгеру')+'<div class="progress"><i style="width:'+n*50+'%"></i></div>'+link('index','Сабақтарға өту')+'</section><section class="card">'+head('chart','Тест нәтижелері')+(h.length?h.map(x=>'<div class="line"><div><b>'+x.title+'</b><small>'+new Date(x.date).toLocaleString('kk-KZ')+'</small></div><b style="margin-left:auto">'+x.points+' / 3</b></div>').join(''):'<p>Бұл сынып бойынша алғашқы тестіңді тапсырған соң, нәтижең осында көрінеді.</p>'+link('test','Тест тапсыру'))+'</section><a href="bolashaq-ustaz.zip" download>HTML файлдарын жүктеу (.zip)</a>'}
function render(){shell();if(page==='index')study();else if(page==='test')start();else progress();setupTopic()}
render();
