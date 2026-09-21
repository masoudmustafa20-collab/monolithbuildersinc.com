(()=>{
  const steps=[...document.querySelectorAll('.plannerStep')];
  let current=0,project='';
  const show=n=>{
    current=Math.max(0,Math.min(n,steps.length-1));
    steps.forEach((s,i)=>s.classList.toggle('active',i===current));
    document.querySelector('#planner')?.scrollIntoView({behavior:'smooth',block:'start'});
  };
  document.querySelectorAll('.choiceGrid button').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('.choiceGrid button').forEach(x=>x.classList.remove('selected'));
    b.classList.add('selected'); project=b.dataset.value;
  }));
  document.querySelectorAll('.plannerNext').forEach(b=>b.addEventListener('click',()=>{
    if(current===0&&!project){alert('Please choose a project type first.');return} show(current+1);
  }));
  document.querySelectorAll('.plannerBack').forEach(b=>b.addEventListener('click',()=>show(current-1)));
  const reset=document.querySelector('#plannerForm'); 
  document.querySelector('.plannerReset')?.onclick=()=>{reset.reset();project='';show(0);};
  document.querySelector('#plannerForm')?.addEventListener('submit',e=>{
    e.preventDefault(); const f=new FormData(e.currentTarget);
    const needs=[...document.querySelectorAll('.checkGrid input:checked')].map(x=>x.value).join(', ')||'Not specified';
    const subject=`Project request — ${project}`;
    const body=`Hello Monolith Builders Inc.,\n\nI would like to discuss a project.\n\nProject: ${project}\nScope: ${needs}\nZIP: ${f.get('zip')||''}\nTiming: ${f.get('timing')||''}\nDetails: ${f.get('details')||''}\n\nName: ${f.get('name')||''}\nPhone: ${f.get('phone')||''}\nEmail: ${f.get('email')||''}`;
    location.href=`mailto:info@monolithbuildersinc.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  const getVisibleImgs=()=>[...document.querySelectorAll('.inspiration figure:not(.hidden) .galleryImage')];
  const box=document.querySelector('#lightbox'),view=document.querySelector('.lightboxImage'),count=document.querySelector('.lightboxCount');
  let idx=0,touchX=0,visibleImgs=[];
  const open=im=>{
    visibleImgs=getVisibleImgs(); idx=Math.max(0,visibleImgs.indexOf(im));
    if(!visibleImgs.length||!box||!view)return;
    view.src=visibleImgs[idx].src; view.alt=visibleImgs[idx].alt;
    if(count)count.textContent=`${idx+1} / ${visibleImgs.length}`;
    box.classList.add('open'); box.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
  };
  const close=()=>{if(!box)return;box.classList.remove('open');box.setAttribute('aria-hidden','true');document.body.style.overflow=''};
  const move=d=>{if(!visibleImgs.length)return;idx=(idx+d+visibleImgs.length)%visibleImgs.length;view.src=visibleImgs[idx].src;view.alt=visibleImgs[idx].alt;if(count)count.textContent=`${idx+1} / ${visibleImgs.length}`};
  document.querySelectorAll('.galleryImage').forEach(im=>{
    im.addEventListener('click',()=>open(im));
    im.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(im)}});
  });
  document.querySelector('.lightboxClose')?.addEventListener('click',close);
  document.querySelector('.lightboxPrev')?.addEventListener('click',()=>move(-1));
  document.querySelector('.lightboxNext')?.addEventListener('click',()=>move(1));
  box?.addEventListener('click',e=>{if(e.target===box)close()});
  document.addEventListener('keydown',e=>{if(!box?.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')move(-1);if(e.key==='ArrowRight')move(1)});
  box?.addEventListener('touchstart',e=>touchX=e.changedTouches[0].clientX,{passive:true});
  box?.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-touchX;if(Math.abs(d)>45)move(d>0?-1:1)},{passive:true});

  document.querySelectorAll('.filters button').forEach(b=>b.addEventListener('click',()=>{
    const filter=(b.dataset.filter||'all').trim().toLowerCase();
    document.querySelectorAll('.filters button').forEach(x=>x.classList.toggle('active',x===b));
    document.querySelectorAll('.inspiration figure').forEach(f=>{
      const cat=(f.dataset.cat||'').trim().toLowerCase();
      const shouldHide=filter!=='all'&&cat!==filter;
      f.classList.toggle('hidden',shouldHide);
      f.style.display=shouldHide?'none':'';
    });
  }));
})();
