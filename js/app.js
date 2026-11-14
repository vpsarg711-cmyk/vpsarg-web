/* VPS ARG 2.0 — frontend unificado. Mantiene los contratos API del sitio recibido. */
(() => {
  'use strict';
  const API = 'https://api.vpsarg.com.ar';
  const WA = 'https://wa.me/5493435350260';
  let selectedPlan = null;
  let userVerified = false;
  const $ = (id) => document.getElementById(id);
  const money = (n) => '$' + Number(n).toLocaleString('es-AR');
  const prices = {
    ss: {1: 8000, 2: 14000, 3: 18000},
    gamers: {1: 10000, 2: 16000, 3: 20000},
    iphone: {1: 12000, 2: 20000}
  };
  const categories = {ss: 916, gamers: 946, iphone: 946};
  const planNames = {ss: 'SS Premium', gamers: 'GAMER Premium', iphone: 'iPhone Premium'};

  function addModals() {
    if ($('vpsModals')) return;
    const root = document.createElement('div'); root.id = 'vpsModals';
    root.innerHTML = `
      <div class="modal" id="modalCompra" aria-hidden="true"><div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="purchaseTitle"><button class="modal-close" type="button" data-close="modalCompra" aria-label="Cerrar">×</button><span class="eyebrow">Contratación VPS ARG</span><h2 id="purchaseTitle">Completá tus datos</h2><p class="muted">Tu servicio se procesa mediante nuestro sistema de pagos.</p><form id="formCompra">
        <label for="nombre">Nombre completo</label><input id="nombre" autocomplete="name" required minlength="3" placeholder="Tu nombre y apellido">
        <label for="whatsapp">WhatsApp</label><input id="whatsapp" inputmode="numeric" autocomplete="tel" required placeholder="Código de área + número">
        <label for="usuario">Usuario (6 a 8 caracteres)</label><input id="usuario" maxlength="8" minlength="6" autocomplete="username" required placeholder="Ej.: usuario123">
        <label for="email">Correo electrónico</label><input id="email" type="email" autocomplete="email" required placeholder="nombre@correo.com">
        <label for="conexiones">Cantidad de conexiones</label><select id="conexiones" required></select>
        <div class="price-summary" id="precioSeleccionado">Seleccioná un plan</div>
        <button class="btn full" id="btnCompra" type="submit">Continuar al pago</button><p class="form-note" id="compraEstado" role="status"></p>
      </form></div></div>
      <div class="modal" id="modalRenovacion" aria-hidden="true"><div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="renewTitle"><button class="modal-close" type="button" data-close="modalRenovacion" aria-label="Cerrar">×</button><span class="eyebrow">Clientes VPS ARG</span><h2 id="renewTitle">Renovar servicio</h2><p class="muted">Verificá tu usuario antes de continuar.</p><form id="formRenovacion">
        <label for="usuarioRenovar">Usuario Servex</label><div class="inline-fields"><input id="usuarioRenovar" minlength="6" maxlength="8" required placeholder="Tu usuario"><button class="btn secondary" id="btnBuscarUsuario" type="button">Verificar</button></div><div id="infoUsuario" class="verify-info" aria-live="polite"></div>
        <label for="emailRenovar">Correo electrónico</label><input id="emailRenovar" type="email" required placeholder="Correo para el comprobante">
        <button class="btn full" id="btnRenovar" type="submit">Continuar al pago</button><p class="form-note" id="renovacionEstado" role="status"></p>
      </form></div></div>
      <div class="modal" id="modalPrueba" aria-hidden="true"><div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="trialTitle"><button class="modal-close" type="button" data-close="modalPrueba" aria-label="Cerrar">×</button><span class="eyebrow">Probá VPS ARG</span><h2 id="trialTitle">Prueba gratuita</h2><p class="muted">SS y GAMER: prueba de 45 minutos. iPhone: asistencia de configuración por WhatsApp.</p><form id="formPrueba">
        <label for="nombrePrueba">Nombre completo</label><input id="nombrePrueba" required minlength="3" placeholder="Tu nombre y apellido">
        <label for="whatsappPrueba">WhatsApp</label><input id="whatsappPrueba" inputmode="numeric" required placeholder="Código de área + número">
        <label for="servicioPrueba">Servicio</label><select id="servicioPrueba"><option value="ss">SS Premium</option><option value="gamers">GAMER Premium</option><option value="iphone">iPhone Premium</option></select>
        <button class="btn full" id="btnPrueba" type="submit">Solicitar prueba gratis</button>
      </form><div id="resultadoPrueba" class="trial-result" aria-live="polite"></div></div></div>`;
    document.body.append(root);
  }
  function openModal(id) { const m = $(id); if (!m) return; m.classList.add('is-open'); m.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open'); const first=m.querySelector('input,select'); if(first) setTimeout(()=>first.focus(),80); }
  function closeModal(id) { const m=$(id); if(!m)return; m.classList.remove('is-open'); m.setAttribute('aria-hidden','true'); if(!document.querySelector('.modal.is-open'))document.body.classList.remove('modal-open'); }
  function selectPlan(plan) {
    if (!prices[plan]) return;
    selectedPlan=plan;
    $('purchaseTitle').textContent=`Contratar ${planNames[plan]}`;
    const select=$('conexiones');
    select.innerHTML=Object.keys(prices[plan]).map(n=>`<option value="${n}">${n} ${n==='1'?'conexión':'conexiones'}</option>`).join('');
    updatePrice(); $('formCompra').reset(); select.value='1'; updatePrice(); $('compraEstado').textContent=''; openModal('modalCompra');
  }
  function updatePrice(){ if(!$('conexiones')||!selectedPlan)return; const amount=prices[selectedPlan][Number($('conexiones').value)]||0; $('precioSeleccionado').textContent=`${planNames[selectedPlan]} · ${$('conexiones').value} conexión(es) · ${money(amount)}`; }
  function password(){const chars='abcdefghijklmnopqrstuvwxyz0123456789';let out='';for(let i=0;i<8;i++)out+=chars[Math.floor(Math.random()*chars.length)];return out;}
  function status(id,msg,error=false){const el=$(id);if(el){el.textContent=msg;el.classList.toggle('error-text',error);}}
  async function jsonPost(path,payload){const response=await fetch(`${API}${path}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});let data;try{data=await response.json();}catch{throw new Error('El servidor devolvió una respuesta no válida.');}return {response,data};}

  async function submitPurchase(e){e.preventDefault();if(!selectedPlan)return;const nombre=$('nombre').value.trim(), whatsapp=$('whatsapp').value.replace(/\D/g,''), usuario=$('usuario').value.trim().toLowerCase().replace(/[^a-z0-9]/g,''), email=$('email').value.trim(), conexiones=Number($('conexiones').value);
    if(nombre.length<3)return status('compraEstado','Ingresá tu nombre completo.',true);
    if(whatsapp.length<10)return status('compraEstado','Ingresá un WhatsApp válido.',true);
    if(!/^[a-z0-9]{6,8}$/.test(usuario))return status('compraEstado','El usuario debe tener entre 6 y 8 caracteres, solo letras y números.',true);
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return status('compraEstado','Ingresá un correo electrónico válido.',true);
    const precio=prices[selectedPlan][conexiones]; if(!precio)return status('compraEstado','La cantidad de conexiones no es válida.',true);
    const btn=$('btnCompra');btn.disabled=true;btn.textContent='Generando pago…';status('compraEstado','Conectando con VPS ARG…');
    try{const {response,data}=await jsonPost('/crear-preferencia',{nombre,whatsapp,servicio:selectedPlan,usuario_servex:usuario,password_servex:password(),email,categoria:categories[selectedPlan],conexiones,precio});if(!response.ok||!data.ok||!data.init_point)throw new Error(data.error||'No se pudo crear la preferencia de pago.');window.location.assign(data.init_point);}
    catch(err){status('compraEstado',err.message||'Error de conexión con VPS ARG.',true);btn.disabled=false;btn.textContent='Continuar al pago';}
  }
  async function verifyUser(){const user=$('usuarioRenovar').value.trim().toLowerCase();if(!user)return status('renovacionEstado','Ingresá tu usuario.',true);const btn=$('btnBuscarUsuario');btn.disabled=true;btn.textContent='Verificando…';status('renovacionEstado','Consultando el servicio…');userVerified=false;
    try{const {response,data}=await jsonPost('/buscar-usuario',{usuario:user});if(!response.ok||!data.ok)throw new Error(data.error||'No encontramos ese usuario.');userVerified=true;const days=Math.ceil((new Date(data.vence)-new Date())/86400000);const plan=data.observacion==='IPHONE'?'IPHONE PREMIUM':String(data.categoria||'').toLowerCase().includes('gamers')?'GAMER PREMIUM':'SS PREMIUM';$('infoUsuario').innerHTML=`<div class="verify-card"><strong>✓ Usuario verificado</strong><span>Plan: ${plan}</span><span>Renovación: ${money(data.precio)}</span><span>Conexiones: ${data.conexiones}</span><span>Vencimiento: ${new Date(data.vence).toLocaleDateString('es-AR')}</span><span>${days<0?'Servicio vencido':`Restan ${days} días`}</span></div>`;status('renovacionEstado','Usuario validado. Ya podés continuar.');btn.textContent='Usuario verificado';}
    catch(err){$('infoUsuario').innerHTML=`<div class="verify-card verify-error">${err.message}</div>`;status('renovacionEstado',err.message,true);btn.disabled=false;btn.textContent='Verificar';}
  }
  async function submitRenewal(e){e.preventDefault();if(!userVerified)return status('renovacionEstado','Primero verificá el usuario.',true);const email=$('emailRenovar').value.trim(),usuario=$('usuarioRenovar').value.trim();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return status('renovacionEstado','Ingresá un correo válido.',true);const btn=$('btnRenovar');btn.disabled=true;btn.textContent='Generando pago…';
    try{const {response,data}=await jsonPost('/crear-preferencia-renovacion',{usuario_servex:usuario,email});if(!response.ok||!data.ok||!data.init_point)throw new Error(data.error||'No se pudo crear la renovación.');window.location.assign(data.init_point);}
    catch(err){status('renovacionEstado',err.message,true);btn.disabled=false;btn.textContent='Continuar al pago';}
  }
  function showTrial(html){$('resultadoPrueba').innerHTML=html;}
  async function submitTrial(e){e.preventDefault();const nombre=$('nombrePrueba').value.trim(),whatsapp=$('whatsappPrueba').value.replace(/\D/g,''),servicio=$('servicioPrueba').value,btn=$('btnPrueba');if(nombre.length<3)return showTrial('<p class="error-text">Ingresá tu nombre completo.</p>');if(whatsapp.length<10)return showTrial('<p class="error-text">Ingresá un WhatsApp válido.</p>');
    if(servicio==='iphone'){showTrial(`<div class="verify-card"><strong>Configuración para iPhone</strong><p>Descargá NPV Tunnel y solicitá la configuración personalizada.</p><a class="btn" href="https://apps.apple.com/us/app/npv-tunnel/id1629465476" target="_blank" rel="noopener">Descargar NPV Tunnel</a> <a class="btn secondary" href="${WA}?text=Hola%2C%20quiero%20configurar%20mi%20iPhone%20con%20VPS%20ARG" target="_blank" rel="noopener">Solicitar por WhatsApp</a></div>`);return;}
    btn.disabled=true;btn.textContent='Creando prueba…';showTrial('<p>Estamos creando tu prueba gratuita. No cierres esta ventana.</p>');
    try{const {response,data}=await jsonPost('/crear-prueba',{nombre,whatsapp,servicio});if(!response.ok||!data.ok)throw new Error(data.error||'No se pudo crear la prueba.');const u=data.usuario||data.cliente?.username||'',p=data.password||data.cliente?.password||'',vence=data.vence||data.cliente?.expiration_date||'';showTrial(`<div class="verify-card"><strong>✓ Prueba creada correctamente</strong><p>Guardá tus credenciales:</p><p><b>Usuario:</b> ${escapeHTML(u)}<br><b>Contraseña:</b> ${escapeHTML(p)}<br><b>Vence:</b> ${vence?new Date(vence).toLocaleString('es-AR'):'45 minutos'}</p><button type="button" class="btn secondary" id="copyTrial">Copiar credenciales</button><a class="btn" href="https://play.google.com/store/apps/details?id=app.vpsarg" target="_blank" rel="noopener">Descargar app VPS ARG</a></div>`);$('copyTrial')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(`Usuario: ${u}\nContraseña: ${p}`);$('copyTrial').textContent='Credenciales copiadas';}catch{$('copyTrial').textContent='No se pudo copiar';}});}
    catch(err){showTrial(`<p class="error-text">${escapeHTML(err.message)}</p>`);}finally{btn.disabled=false;btn.textContent='Solicitar prueba gratis';}
  }
  function escapeHTML(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

  function init(){addModals();document.querySelectorAll('[data-plan]').forEach(b=>b.addEventListener('click',()=>selectPlan(b.dataset.plan)));document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.open)));document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>closeModal(b.dataset.close)));document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModal(m.id);}));document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.modal.is-open').forEach(m=>closeModal(m.id));});
    $('conexiones')?.addEventListener('change',updatePrice);$('formCompra')?.addEventListener('submit',submitPurchase);$('formRenovacion')?.addEventListener('submit',submitRenewal);$('btnBuscarUsuario')?.addEventListener('click',verifyUser);$('usuarioRenovar')?.addEventListener('input',()=>{userVerified=false;$('infoUsuario').innerHTML='';status('renovacionEstado','');$('btnBuscarUsuario').disabled=false;$('btnBuscarUsuario').textContent='Verificar';});$('formPrueba')?.addEventListener('submit',submitTrial);$('whatsapp')?.addEventListener('input',e=>e.target.value=e.target.value.replace(/\D/g,''));$('whatsappPrueba')?.addEventListener('input',e=>e.target.value=e.target.value.replace(/\D/g,''));$('usuario')?.addEventListener('input',e=>e.target.value=e.target.value.toLowerCase().replace(/[^a-z0-9]/g,'').slice(0,8));
    // El menú se controla con <details>/<summary> y no depende de JavaScript.

  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
  window.VPSARG={selectPlan,openModal};
})();
