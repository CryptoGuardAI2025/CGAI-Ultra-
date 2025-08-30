
const I18N = (()=>{
  let dict = {};
  async function set(lang){
    const res = await fetch(`assets/locales/${lang}.json`);
    dict = await res.json();
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const k = el.getAttribute('data-i18n');
      if(dict[k]) el.innerHTML = dict[k];
    });
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }
  return { set };
})();
document.addEventListener('DOMContentLoaded', ()=>{
  const stored = localStorage.getItem('lang') || (navigator.language?.startsWith('de') ? 'de' : 'en');
  I18N.set(stored);
  document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>I18N.set(btn.dataset.lang)));
});
