const picker=document.querySelector('.design-switch');
picker.hidden=false;

const params=new URLSearchParams(window.location.search);
if(params.has('sin-promo')||params.get('promo')==='0'||params.get('promo')==='false'){
  document.body.classList.add('no-promo');
  const promoOff=picker.querySelector('button[data-promo="false"]');
  if(promoOff){
    picker.querySelectorAll('button[data-promo]').forEach(b=>b.setAttribute('aria-pressed',String(b===promoOff)));
  }
}

picker.addEventListener('click',event=>{
 const themeBtn=event.target.closest('button[data-theme]');
 if(themeBtn){
  const red=themeBtn.dataset.theme==='red';
  document.body.classList.toggle('theme-red',red);
  document.body.classList.toggle('theme-white',themeBtn.dataset.theme==='white');
  document.querySelector('.masthead img').src=red?'assets/logo-rojo-blanco.svg':'assets/logo-principal.svg';
  document.querySelector('meta[name="theme-color"]').content=red?'#A9322A':themeBtn.dataset.theme==='white'?'#FFFFFF':'#FFF5DF';
  picker.querySelectorAll('button[data-theme]').forEach(b=>b.setAttribute('aria-pressed',String(b===themeBtn)));
  return;
 }
 const promoBtn=event.target.closest('button[data-promo]');
 if(promoBtn){
  const withoutPromo=promoBtn.dataset.promo==='false';
  document.body.classList.toggle('no-promo',withoutPromo);
  picker.querySelectorAll('button[data-promo]').forEach(b=>b.setAttribute('aria-pressed',String(b===promoBtn)));
  return;
 }
});
