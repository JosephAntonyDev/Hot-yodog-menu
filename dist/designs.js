const picker=document.querySelector('.design-switch');
picker.hidden=false;
picker.addEventListener('click',event=>{
 const button=event.target.closest('button[data-theme]');
 if(!button)return;
 const red=button.dataset.theme==='red';
 document.body.classList.toggle('theme-red',red);
 document.querySelector('.masthead img').src=red?'assets/logo-rojo-blanco.svg':'assets/logo-principal.svg';
 document.querySelector('meta[name="theme-color"]').content=red?'#A9322A':'#FFF5DF';
 picker.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
});
