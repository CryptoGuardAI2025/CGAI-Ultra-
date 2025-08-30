
// Burger toggle
document.addEventListener('DOMContentLoaded', ()=>{
  const burger = document.getElementById('burger');
  const panel = document.getElementById('nav-panel');
  if(burger && panel){
    burger.addEventListener('click', ()=>{
      burger.classList.toggle('open');
      panel.classList.toggle('open');
    });
  }

  // Prediction
  const btn = document.getElementById('btn-predict');
  if(btn){
    btn.addEventListener('click', async ()=>{
      const out = document.getElementById('pred-out');
      const coin = (document.getElementById('coin')?.value||'').trim().toLowerCase();
      if(!coin){ out.textContent='Bitte Coin eingeben.'; return; }
      const map = {btc:'bitcoin',bitcoin:'bitcoin',eth:'ethereum',ethereum:'ethereum',xrp:'ripple',ripple:'ripple',sol:'solana',solana:'solana',ada:'cardano',cardano:'cardano',ltc:'litecoin',litecoin:'litecoin',doge:'dogecoin',dogecoin:'dogecoin',shib:'shiba-inu','shiba inu':'shiba-inu',vet:'vechain',vechain:'vechain',vtho:'vethor-token','vethor token':'vethor-token'};
      const id = map[coin] || coin;
      try{
        const r = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(id)}&vs_currencies=usd`, {headers:{'accept':'application/json'}});
        if(!r.ok){ out.textContent='API-Fehler / Rate-Limit.'; return; }
        const j = await r.json();
        const price = j?.[id]?.usd;
        if(price==null){ out.textContent='Preis nicht gefunden.'; return; }
        const forecast = +(price * 1.18).toFixed(price<1?6:2);
        out.textContent = `${coin.toUpperCase()}: Aktuell $${price} → Prognose in 12M: $${forecast} (+18%)`;
      }catch(e){ out.textContent='Netzwerkfehler.'; }
    });
  }
});
