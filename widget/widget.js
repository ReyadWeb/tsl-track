<script>
(function(){
  // host element with id="tsl-track", using data attributes
  const host = document.getElementById('tsl-track');
  if (!host) return;
  const ref = (host.dataset.ref || '').trim();
  const carrierRaw = (host.dataset.carrier || '').trim();

  const norm = s => String(s||'').toLowerCase().replace(/[\s\-_.]+/g,'').trim();

  const CARRIERS = [
    { name:'Maersk', match:/^maersk$/, mode:'deeplink', to:r=>`https://www.maersk.com/tracking/#tracking/${encodeURIComponent(r)}` },
    { name:'Hapag-Lloyd', match:/^hapaglloyd|^hapag lloyd|^hapag-lloyd$/, mode:'deeplink', to:r=>`https://www.hapag-lloyd.com/en/online-business/track/track-by-booking-solution.html?booking=${encodeURIComponent(r)}` },
    { name:'MSC', match:/^msc$/, mode:'copygo', url:'https://www.msc.com/en/track-a-shipment?link=' },
    { name:'CMA CGM', match:/^cma$|^cma cgm$|^cma-cgm$/, mode:'copygo', url:'https://www.cma-cgm.com/ebusiness/tracking' },
    { name:'ShipmentLink', match:/^shipmentlink$/, mode:'copygo', url:'https://ct.shipmentlink.com/servlet/TDB1_CargoTracking.do' },
    { name:'Evergreen', match:/^evergreen$|^everygreen$/, mode:'copygo', url:'https://ct.shipmentlink.com/servlet/TDB1_CargoTracking.do' },
    { name:'Yang Ming', match:/^yangming$|^yang ming$/, mode:'copygo', url:'https://www.yangming.com/en' },
    { name:'Höegh Autoliners', match:/^hoegh|^hoeghautoliners$/, mode:'copygo', url:'https://www.hoeghautoliners.com/my-cargo' },
    { name:'HMM', match:/^hmm$/, mode:'copygo', url:'https://www.hmm21.com/e-service/general/DashBoard.do' },
    { name:'ONE (Ocean Network Express)', match:/^one$|^one line$|^oceannetworkexpress$/, mode:'copygo', url:'https://ecomm.one-line.com/one-ecom/manage-shipment/cargo-tracking' },
  ];
  const cfg = CARRIERS.find(c => c.match.test(norm(carrierRaw)));

  host.innerHTML = `
    <style>
      #tsl-track .card{border:1px solid #e6e6e6;border-radius:14px;padding:20px;background:#fafafa;font:16px system-ui}
      #tsl-track code{background:#fff;padding:6px 8px;border-radius:8px;border:1px solid #e6e6e6}
      #tsl-track button{padding:12px 16px;border:0;border-radius:10px;cursor:pointer}
      #tsl-track .primary{background:#111;color:#fff}
      #tsl-track .secondary{background:#eee;color:#111}
      #tsl-track .muted{color:#666;margin-top:10px}
    </style>
    <div class="card">
      <h3>Tracking helper ${cfg ? 'for '+cfg.name : ''}</h3>
      <p><b>Booking #:</b> <code id="ref"></code></p>
      <p class="muted">Click <b>Copy</b>, then <b>Go to tracking site</b>.</p>
      <p>
        <button class="primary" id="copyBtn">Copy</button>
        <button class="secondary" id="openBtn">Go to tracking site</button>
        <a id="openLink" target="_blank" rel="noopener noreferrer" style="display:none">open</a>
      </p>
      <p id="status" class="muted"></p>
    </div>`;

  host.querySelector('#ref').textContent = ref;
  const status = host.querySelector('#status');

  host.querySelector('#copyBtn').addEventListener('click', async ()=>{
    try{
      if (navigator.clipboard && navigator.isSecureContext){ await navigator.clipboard.writeText(ref); }
      else { const ta=document.createElement('textarea'); ta.value=ref; host.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
      status.textContent='Copied to clipboard.';
    }catch{ status.textContent='Clipboard blocked. Select and copy manually.'; }
  });

  host.querySelector('#openBtn').addEventListener('click', ()=>{
    if (!cfg){ status.textContent='Carrier not recognized.'; return; }
    const url = cfg.mode==='deeplink' ? cfg.to(ref) : cfg.url;
    const a = host.querySelector('#openLink'); a.href = url; a.click();
    setTimeout(()=>{ status.textContent='If no tab opened, allow popups and click again.'; }, 250);
  });
})();
</script>
