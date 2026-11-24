const icons={game:['  ##########  ',' ############ ','##############','###.######.###','##...####.#.##','###.##########','#####    #####',' ###      ### '],pin:['  ####  ',' ###### ','###..###','###..###',' ###### ','  ####  ','   ##   '],star:['    ##    ','   ####   ','##########',' ######## ','  ######  ',' ######## ',' ###  ### '],flag:['##       ','#########','######## ','#######  ','##       ','##       ','##       '],map:['###  ###  ','##########','##.###.###','##.###.###','##.###.###','##########','   ###  ##'],user:['  ####  ','  ####  ','  ####  ','        ',' ###### ','########','########'],sound:['    ##    ','   ###    ','###### # #','######  # ','###### # #','   ###    ','    ##    ']};
document.querySelectorAll('[data-i]').forEach(i=>{const rows=icons[i.dataset.i];const rects=rows.flatMap((r,y)=>[...r].map((c,x)=>c==='#'?'<rect x="'+x+'" y="'+y+'" width="1" height="1"/>':'')).join('');i.setAttribute('aria-hidden','true');i.innerHTML='<svg viewBox="0 0 '+rows[0].length+' '+rows.length+'" shape-rendering="crispEdges">'+rects+'</svg>'});
const cities=[
['Dubai','United Arab Emirates','International','An international trip from Warangal to Dubai. The city’s skyline marks a stop far beyond my home base.',''],
['Delhi','India','India','Delhi is one of the stops in my India travel log. India Gate is pictured here.','India_Gate_front.jpg'],
['Agra','India','India','Agra adds another city to my travel log. The Taj Mahal, pictured here, stands on the banks of the Yamuna.','Taj_Mahal_(Edited).jpeg'],
['Jaipur','India','India','Jaipur is on my list of places explored in India. This postcard shows the colorful façade of Hawa Mahal.','East_facade_Hawa_Mahal_Jaipur_from_ground_level_(July_2022)_-_img_01.jpg'],
['Hyderabad','India','India','A little closer to home, Hyderabad is another city I’ve explored. This postcard features Charminar.','Charminar_Hyderabad_1.jpg'],
['Ajmer','India','India','My Rajasthan travels also took me to Ajmer, where I visited Ajmer Sharif Dargah.','Dargah_of_Sufi_saint_Moinuddin_Chishti_Ajmer_India_(5).JPG'],
['Russia','Planned trip','Planned','Russia is on my travel wishlist. This postcard shows Saint Basil’s Cathedral in Moscow.','Saint_Basil\'s_Cathedral_in_Moscow.jpg'],
['Vietnam','Planned trip','Planned','Vietnam is one of my next travel quests. This postcard shows the limestone islands of Ha Long Bay.','Ha_Long_Bay_in_2019.jpg']];
const landmarks = {
  Dubai: ['Burj Khalifa', 'Dubai Mall', 'Burj Al Arab', 'Palm Jumeirah'],
  Agra: ['Taj Mahal'],
  Ajmer: ['Ajmer Sharif Dargah'],
  Delhi: ['Qutub Minar', 'Red Fort'],
  Hyderabad: ['Charminar']
};
const dialog=document.querySelector('dialog');dialog.setAttribute('aria-labelledby','dtitle');
function card(city){const [name,location,category,copy,credit]=city;const button=document.createElement('button');button.className='card';const src=name.toLowerCase()+'.jpg';button.innerHTML='<div class="pic"><img loading="lazy" src="'+src+'" alt=""><span class="cardtag '+(category==='International'?'world':'')+'">'+(category==='India'?'DOMESTIC':category.toUpperCase())+'</span></div><div class="cardfoot"><div><small>'+location+'</small><h3>'+name+'</h3></div><span class="arrow">↗</span></div>';if (landmarks[name]) {
  const stops = document.createElement('div');
  stops.className = 'stops';
  stops.textContent = landmarks[name].join(' · ');
  button.append(stops);
}
button.onclick=()=>{document.querySelector('#dimg').src=src;document.querySelector('#dimg').alt=name+' destination photograph';document.querySelector('#dtitle').textContent=name;document.querySelector('#dtag').textContent=category==='Planned'?'PLANNED QUEST':'VISITED · '+location.toUpperCase();const p=document.querySelector('#dcopy');p.textContent=copy;
if (landmarks[name]) {
  const visited = document.createElement('strong');
  visited.className = 'visited';
  visited.textContent = 'Visited: ' + landmarks[name].join(', ');
  p.append(visited);
}
if(credit){let a=document.createElement('a');a.href='https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(credit);a.textContent='Photo credits and license ↗';a.style.cssText='display:block;text-decoration:underline;font-size:10px;margin-top:12px';a.target='_blank';a.rel='noopener';p.append(a)}dialog.showModal()};return button}
function render(filter){document.querySelector('#places').replaceChildren(...cities.filter(c=>c[2]!=='Planned').filter(c=>filter==='All'||c[2]===filter).map(card))}render('All');document.querySelector('#plans').append(...cities.filter(c=>c[2]==='Planned').map(card));document.querySelector('.close').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close()}});
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-filter]').forEach(el=>{el.classList.toggle('sel',el===b);el.setAttribute('aria-pressed',el===b)});render(b.dataset.filter)});
const reduced=matchMedia('(prefers-reduced-motion: reduce)');const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('appear');observer.unobserve(e.target)}}));document.querySelectorAll('.card,.profilein,.family-album,.bro-photo').forEach(n=>observer.observe(n));
const anchors=[...document.querySelectorAll('nav a')];function updateNav(){const active=['home','travel','profile','my-pics','family','next'].filter(id=>document.getElementById(id).getBoundingClientRect().top<innerHeight*.48).pop()||'home';anchors.forEach(a=>{a.classList.toggle('active',a.hash==='#'+active)})}window.addEventListener('scroll',updateNav,{passive:true});updateNav();
let last=0;const colors=['#9e70e1','#ffc745','#62cfb3'];document.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||reduced.matches||performance.now()-last<80)return;last=performance.now();const s=document.createElement('b');s.className='spark';s.style.cssText='left:'+(e.clientX+8)+'px;top:'+(e.clientY+8)+'px;background:'+colors[Math.floor(Math.random()*3)];document.body.append(s);setTimeout(()=>s.remove(),500)});
let audio,enabled=false;function beep(){if(!enabled||!audio)return;const o=audio.createOscillator(),g=audio.createGain();o.type='square';o.frequency.setValueAtTime(523,audio.currentTime);o.frequency.setValueAtTime(784,audio.currentTime+.045);g.gain.setValueAtTime(.025,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.12);o.connect(g);g.connect(audio.destination);o.start();o.stop(audio.currentTime+.12)}document.querySelector('#sound').onclick=async e=>{let b=e.currentTarget;if(!audio)audio=new AudioContext();await audio.resume();enabled=!enabled;b.setAttribute('aria-pressed',enabled);b.querySelector('span').textContent=enabled?'Sound on':'Sound off';beep()};document.addEventListener('click',e=>{if(!e.target.closest('#sound')&&e.target.closest('a,button'))beep()});

const photoView = document.querySelector('#photo-view');
const largePhoto = document.querySelector('#photo-large');
document.querySelectorAll('figure a').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    largePhoto.src = link.href;
    largePhoto.alt = link.querySelector('img').alt;
    const section = link.closest('section');
    const caption = link.parentElement.querySelector('figcaption');
    document.querySelector('#photo-label').textContent = caption?.textContent || section.querySelector('h2').textContent;
    photoView.showModal();
  });
});
photoView.addEventListener('click', event => {
  if (event.target !== photoView) return;
  const box = photoView.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) photoView.close();
});
