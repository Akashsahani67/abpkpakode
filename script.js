'use strict';
/* ===== CONFIG: replace before production ===== */
const CONFIG={
  WHATSAPP_NUMBER:'91XXXXXXXXXX', // country code + number, digits only
  address:'Address placeholder',phone:'Phone placeholder',email:'email@placeholder.com',
  hours:'Opening hours placeholder',instagram:'#contact',reviewUrl:'#reviews',
  FORM_ENDPOINT:'' // optional: URL of a form service/backend. If empty, the inquiry opens in WhatsApp.
};
/* Images: put files in /images (name.jpg). If missing, an emoji tile shows instead. */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const CATS=['All Items','Classic Pakodas','Signature Specials','Premium Pakodas','Crazy Twists','Chai & Drinks','Chutneys & Add-ons'];
const M=[
['aloo','🥔','Aloo Pakoda','Crispy potato, desi masala.','Classic Pakodas','Popular'],
['onion','🧅','Onion Pakoda','Thinly sliced onions with a perfectly spiced coating.','Classic Pakodas','Popular'],
['mixveg','🥦','Mix Veg Pakoda','Seasonal vegetables packed with flavour.','Classic Pakodas'],
['mirchi','🌶️','Mirchi Pakoda','Spicy green chillies, crispy outside and soft inside.','Classic Pakodas'],
['icecream','🍦','Ice Cream Ka Pakoda','A playful sweet-and-crispy dessert concept.','Signature Specials','Signature'],
['maggi','🍜','Maggi with Mozzarella Pakoda','A fusion snack with a gooey cheese centre.','Signature Specials','Signature'],
['pineapple','🍍','Pineapple Pakoda','A sweet and spicy twist with a crunchy coating.','Signature Specials','Signature'],
['chai','☕','Masala Chai','Hot, spiced and made for pakodas.','Chai & Drinks'],
['colddrink','🥤','Cold Drink','Chilled, to cool the masala.','Chai & Drinks'],
['water','💧','Mineral Water','Simple and refreshing.','Chai & Drinks'],
['green','🌿','Green Chutney','Fresh mint and coriander dip.','Chutneys & Add-ons'],
['red','🍅','Red Chutney','Tangy and spicy.','Chutneys & Add-ons'],
['sauce','🥫','Extra Sauce','For the extra dip.','Chutneys & Add-ons']];
const tile=e=>'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#f6b600"/><text x="200" y="185" font-size="120" text-anchor="middle">${e}</text></svg>`);
const emo={aloo:'🥔',counter:'🍳',party:'🎉'};M.forEach(m=>emo[m[0]]=m[1]);
const src=k=>`images/${k}.jpg`;
function img(k,alt,lazy=1){const i=new Image();i.src=src(k);i.alt=alt;if(lazy)i.loading='lazy';i.width=400;i.height=300;i.onerror=()=>{i.onerror=null;i.src=tile(emo[k]||'🍽️')};return i}
$$('img[data-k]').forEach(i=>{const k=i.dataset.k;i.onerror=()=>{i.onerror=null;i.src=tile(emo[k])};i.src=src(k)});

/* Menu */
const tabs=$('#tabs'),grid=$('#menuGrid');let cur='All Items';
CATS.forEach(c=>{const b=document.createElement('button');b.textContent=c;b.setAttribute('role','tab');b.setAttribute('aria-selected',c===cur);b.onclick=()=>{cur=c;$$('button',tabs).forEach(x=>x.setAttribute('aria-selected',x===b));filter()};tabs.append(b)});
M.forEach((m,i)=>{const d=document.createElement('button');d.className='dish';d.dataset.cat=m[4];d.dataset.i=i;
d.innerHTML=`<div class="im"></div><div class="t">${m[5]?`<span class="lbl">${m[5]}</span>`:''}<h3>${m[2]}</h3><p>${m[3]}</p></div>`;$('.im',d).append(img(m[0],m[2]));d.onclick=()=>openModal(i);grid.append(d)});
function filter(){let n=0;$$('.dish',grid).forEach(d=>{const ok=cur==='All Items'||d.dataset.cat===cur;d.classList.add('out');setTimeout(()=>{d.hidden=!ok;if(ok){d.classList.remove('out');d.classList.remove('pop');void d.offsetWidth;d.style.animationDelay=(n++*60)+'ms';d.classList.add('pop')}},200)})}
/* Modals */
let lastFocus,modalIdx=0;
function show(m){lastFocus=document.activeElement;m.hidden=false;requestAnimationFrame(()=>m.classList.add('show'));$('button',m).focus()}
function hide(m){m.classList.remove('show');setTimeout(()=>{m.hidden=true;lastFocus&&lastFocus.focus()},250)}
const modal=$('#modal');
function openModal(i){modalIdx=i;const m=M[i];$('#mt').textContent=m[2];$('#md').textContent=m[3];$('#ml').textContent=m[4]+(m[5]?' • '+m[5]:'');const mi=$('#mi');mi.onerror=()=>{mi.onerror=null;mi.src=tile(m[1])};mi.src=src(m[0]);mi.alt=m[2];show(modal)}
$('#mx').onclick=()=>hide(modal);modal.onclick=e=>{if(e.target===modal)hide(modal)};
$('#madd').onclick=()=>{setQty(modalIdx,1);hide(modal);location.hash='#order'};
/* Signature */
[[5,'Cheese-pull alert. Gooey mozzarella inside a crunchy coat.'],[4,'Cold meets hot. The dessert nobody expects.'],[6,'Sweet, tangy, spicy and crunchy in one bite.']].forEach(([i,t])=>{const m=M[i],a=document.createElement('article');a.className='reveal';a.innerHTML=`<div class="im"></div><div><h3>${m[2]}</h3><p>${t}</p>${i===5?'<div class="cheese"></div>':''}</div>`;$('.im',a).append(img(m[0],m[2]));$('#sig').append(a)});
/* Gallery */
const G=[['aloo','Golden aloo pakodas'],['onion','Onion pakodas'],['mixveg','Mixed vegetable pakodas'],['mirchi','Mirchi pakodas'],['maggi','Cheese-filled fusion snack'],['chai','Chai and snacks'],['green','Chutneys and dipping sauces'],['party','Festive party snack spread'],['counter','Live snack counter']];
let gi=0;const lb=$('#lb');
G.forEach((g,i)=>{const f=document.createElement('figure'),b=document.createElement('button');b.setAttribute('aria-label','Open '+g[1]);b.append(img(g[0],g[1]));f.append(b);const c=document.createElement('figcaption');c.textContent=g[1];f.append(c);b.onclick=()=>{lbShow(i);show(lb)};$('#gal').append(f)});
function lbShow(i){gi=(i+G.length)%G.length;const l=$('#li');l.onerror=()=>{l.onerror=null;l.src=tile(emo[G[gi][0]])};l.src=src(G[gi][0]);l.alt=G[gi][1];$('#lc').textContent=G[gi][1]}
$('#lx').onclick=()=>hide(lb);$('#lp').onclick=()=>lbShow(gi-1);$('#ln').onclick=()=>lbShow(gi+1);lb.onclick=e=>{if(e.target===lb)hide(lb)};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){[modal,lb].forEach(m=>!m.hidden&&hide(m));nav.classList.remove('open')}if(!lb.hidden){if(e.key==='ArrowLeft')lbShow(gi-1);if(e.key==='ArrowRight')lbShow(gi+1)}});
/* Reviews (sample content) */
[['Sample Customer A','The onion pakodas were perfectly crispy, and the chutney was amazing!'],['Sample Customer B','Loved the fusion snacks. The mozzarella pakoda was such a fun surprise.'],['Sample Customer C','A great snack option for our family gathering.']].forEach(r=>{const d=document.createElement('article');d.className='rv';d.innerHTML=`<div class="st" aria-hidden="true">★★★★★</div><p>${r[1]}</p><small>${r[0]} (sample testimonial)</small>`;$('#car').append(d)});
const car=$('#car');$('#next').onclick=()=>car.scrollBy({left:car.clientWidth*.8,behavior:'smooth'});$('#prev').onclick=()=>car.scrollBy({left:-car.clientWidth*.8,behavior:'smooth'});
$('#reviewLink').href=CONFIG.reviewUrl;
/* Contact + footer */
$('#cAddr').textContent=CONFIG.address;$('#cPhone').textContent=CONFIG.phone;$('#cMail').textContent=CONFIG.email;$('#cHours').textContent=CONFIG.hours;$('#cIg').href=CONFIG.instagram;$('#yr').textContent=new Date().getFullYear();
$('#fCats').innerHTML=CATS.slice(1).map(c=>`<a href="#menu" data-cat="${c}">${c}</a>`).join('');
$$('#fCats a').forEach(a=>a.onclick=()=>{const b=$$('button',tabs).find(x=>x.textContent===a.dataset.cat);b&&b.click()});
const wa=t=>`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(t)}`;
$('#cWa').href=wa('Hi ABP K Pakode!');
/* Events form */
const types=['Birthday Parties','Weddings','Engagement Ceremonies','Family Functions','Corporate Events','College Festivals','Festive Gatherings','Bulk Snack Orders'];
const form=$('#evForm'),sel=form.type;
types.forEach(t=>{sel.add(new Option(t,t));const b=document.createElement('button');b.type='button';b.textContent=t;b.onclick=()=>{sel.value=t;$$('#chips button').forEach(x=>x.classList.toggle('on',x===b));form.scrollIntoView({behavior:'smooth',block:'center'})};$('#chips').append(b)});
const PH=/^(?:\+91[\s-]?|91[\s-]?|0)?[6-9]\d{4}[\s-]?\d{5}$/;
form.date.min=new Date().toISOString().split('T')[0];
function validate(){let ok=true;const err=(el,m)=>{el.setAttribute('aria-invalid',!!m);el.parentElement.querySelector('small').textContent=m||'';if(m)ok=false};
err(form.name,form.name.value.trim().length<2?'Enter your full name.':'');
err(form.phone,PH.test(form.phone.value.trim())?'':'Enter a valid 10-digit Indian mobile number.');
err(form.email,form.email.value&&!form.email.checkValidity()?'Enter a valid email or leave it blank.':'');
err(form.type,form.type.value?'':'Choose an event type.');
err(form.date,form.date.value?'':'Choose an event date.');
err(form.guests,+form.guests.value>0?'':'Enter the approximate guest count.');
err(form.location,form.location.value.trim()?'':'Enter the event location.');return ok}
const evMsg=()=>{const v=n=>form[n].value.trim()||'-';return `Hi ABP K Pakode! Event enquiry:\nName: ${v('name')}\nPhone: ${v('phone')}\nEmail: ${v('email')}\nEvent: ${v('type')}\nDate: ${v('date')}\nGuests: ${v('guests')}\nLocation: ${v('location')}\nPreferred items: ${v('items')}\nNotes: ${v('notes')}`};
form.onsubmit=async e=>{e.preventDefault();const ok$=$('#evOk');ok$.hidden=true;if(!validate())return;const b=$('#submitBtn');b.classList.add('load');b.textContent='Sending...';
try{if(CONFIG.FORM_ENDPOINT){const r=await fetch(CONFIG.FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});if(!r.ok)throw 0;ok$.textContent='Thank you! Your enquiry has been sent. We will get back to you to discuss your event. This is not a booking confirmation.'}
else{await new Promise(r=>setTimeout(r,600));window.open(wa(evMsg()),'_blank','noopener');ok$.textContent='Almost done! Your enquiry is ready in WhatsApp. Press send there to reach us. This is not a booking confirmation.'}
ok$.hidden=false;form.reset()}catch{ok$.textContent='Could not send. Please try WhatsApp instead.';ok$.hidden=false}
b.classList.remove('load');b.textContent='Request Event Menu'};
$('#evWa').onclick=()=>{if(validate())window.open(wa(evMsg()),'_blank','noopener')};
/* Order builder (no prices) */
const Q={};const pick=$('#pick');
M.forEach((m,i)=>{const d=document.createElement('div');d.innerHTML=`<span>${m[1]} ${m[2]}</span><span class="qty"><button aria-label="Remove one ${m[2]}">−</button><output id="q${i}">0</output><button aria-label="Add one ${m[2]}">+</button></span>`;const[b1,b2]=$$('button',d);b1.onclick=()=>setQty(i,(Q[i]||0)-1);b2.onclick=()=>setQty(i,(Q[i]||0)+1);pick.append(d)});
function setQty(i,n){Q[i]=Math.max(0,n);$('#q'+i).textContent=Q[i];const s=$('#sum'),items=M.map((m,j)=>Q[j]?`<li>${Q[j]} × ${m[2]}</li>`:'').join('');s.innerHTML=items||'<li class="empty">Pick items to start.</li>'}
const orderMsg=()=>{const l=M.map((m,j)=>Q[j]?`${Q[j]} x ${m[2]}`:'').filter(Boolean);return `Hi ABP K Pakode! I'd like to order:\n${l.join('\n')||'(please suggest)'}\nMode: ${$('input[name=mode]:checked').value}\nNotes: ${$('#instr').value.trim()||'-'}`};
$('#orderWa').onclick=()=>window.open(wa(orderMsg()),'_blank','noopener');
$('#orderTop').onclick=e=>{e.preventDefault();$('.order').scrollIntoView({behavior:'smooth'})};$('#waFloat').onclick=e=>{e.preventDefault();$('#order').scrollIntoView({behavior:'smooth'})};
/* Nav, scroll, reveal */
const nav=$('#nav'),links=$('#links'),burger=$('#burger');
burger.onclick=()=>{const o=links.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
$$('a',links).forEach(a=>a.onclick=()=>{links.classList.remove('open');burger.setAttribute('aria-expanded',false)});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('.reveal,.ul').forEach(el=>io.observe(el));
const secs=$$('main section[id]'),ao=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const id=e.target.id==='signature'?'menu':e.target.id==='order'?'menu':e.target.id;$$('a',links).forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id))}}),{rootMargin:'-45% 0px -50% 0px'});secs.forEach(s=>ao.observe(s));
const hero=$('#home'),topB=$('#top'),ring=$('#ring'),par=$('.parallax');let tick=false;
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
addEventListener('scroll',()=>{if(tick)return;tick=true;requestAnimationFrame(()=>{const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;nav.classList.toggle('scrolled',y>hero.offsetHeight-80);$('#waFloat').classList.toggle('show',y>hero.offsetHeight*.8);topB.classList.toggle('show',y>600);ring.style.strokeDashoffset=100.5*(1-y/h);if(par&&!rm&&y<innerHeight)par.style.transform=`translateY(${y*.06}px)`;tick=false})},{passive:true});
topB.onclick=()=>scrollTo({top:0,behavior:'smooth'});
/* Subtle magnetic buttons */
if(!rm&&matchMedia('(hover:hover)').matches)$$('.magnetic').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.2}px)`});b.addEventListener('mouseleave',()=>b.style.transform='')});
