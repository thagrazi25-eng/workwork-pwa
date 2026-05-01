import{_ as m,n as y,b as h,d as v,t as b}from"./index-DEW-c385.js";let n="Todas",l="";const E=["Todas","Pedreiro","Eletricista","Encanador","Pintor","Limpeza","Jardineiro","Marceneiro","Segurança","Motorista","Cuidador","Produção","Serviços Gerais","Cozinheiro","TI","Estética"];async function C(o,r={}){var s;o.innerHTML=`
    <div style="height:100dvh; display:flex; flex-direction:column; background:#F4F5F7;">

      <!-- Header -->
      <div style="background:white; padding:52px 24px 20px; border-bottom:1px solid #E5E7EB; flex-shrink:0;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <p style="color:#64748B; font-size:13px; font-weight:500;">Olá 👋</p>
            <h1 id="nomeUsuario" style="font-size:22px; font-weight:800; color:#111827; margin-top:2px;">
              Profissional
            </h1>
          </div>
          <button id="btnPerfil" style="
            width:44px; height:44px; border-radius:12px;
            background:#F3F4F6; border:none; cursor:pointer;
            font-size:20px; display:flex; align-items:center; justify-content:center;
          ">👤</button>
        </div>

        <!-- Busca -->
        <input id="busca" placeholder="🔍  Buscar por cargo ou empresa..." style="
          width:100%; margin-top:20px; padding:14px 16px;
          border:1.5px solid #E5E7EB; border-radius:12px;
          font-size:14px; font-family:'Inter',sans-serif;
          background:#F9FAFB; outline:none; transition: border-color 0.2s;
        " />

        <!-- Filtros Rápidos (Categorias) -->
        <div style="display:flex; gap:10px; overflow-x:auto; padding:16px 0 4px; margin:0 -24px; padding-left:24px; scrollbar-width:none;">
          ${E.map(t=>`
            <div class="chip-cat ${n===t?"active":""}" data-cat="${t}" style="
              padding:8px 16px; border-radius:20px; border:1.5px solid ${n===t?"#4F46E5":"#E5E7EB"};
              background:${n===t?"#4F46E5":"white"};
              color:${n===t?"white":"#64748B"};
              font-size:13px; font-weight:600; cursor:pointer; white-space:nowrap;
              transition:all 0.2s;
            ">${t}</div>
          `).join("")}
        </div>
      </div>

      <!-- Lista de Vagas -->
      <div id="listaVagas" style="flex:1; overflow-y:auto; padding:16px 20px;">
        <div style="text-align:center; padding:40px; color:#94A3B8;">
          <div style="font-size:32px; margin-bottom:12px;">⏳</div>
          Buscando as melhores vagas...
        </div>
      </div>

      <!-- Bottom Nav -->
      <nav style="
        background:white; border-top:1px solid #E5E7EB;
        display:flex; justify-content:space-around; align-items:center;
        height:75px; padding-bottom:env(safe-area-inset-bottom);
        flex-shrink:0;
      ">
        <button class="nav-btn active" data-tela="home-prof" style="${u(!0)}">
          <span style="font-size:24px;">🏠</span>
          <span style="font-size:11px;">Vagas</span>
        </button>
        <button class="nav-btn" data-tela="chat" style="${u(!1)}">
          <span style="font-size:24px;">💬</span>
          <span style="font-size:11px;">Chat</span>
        </button>
        <button class="nav-btn" data-tela="perfil" style="${u(!1)}">
          <span style="font-size:24px;">👤</span>
          <span style="font-size:11px;">Perfil</span>
        </button>
      </nav>
    </div>
  `;const i=document.getElementById("busca");i.onfocus=()=>i.style.borderColor="#4F46E5",i.onblur=()=>i.style.borderColor="#E5E7EB";try{const{getMeuPerfil:t}=await m(async()=>{const{getMeuPerfil:d}=await import("./index-DEW-c385.js").then(p=>p.i);return{getMeuPerfil:d}},[]),a=await t();a&&(document.getElementById("nomeUsuario").textContent=((s=a.nome)==null?void 0:s.split(" ")[0])||"Profissional")}catch{}await c(),document.querySelectorAll(".chip-cat").forEach(t=>{t.onclick=()=>{n=t.dataset.cat,document.querySelectorAll(".chip-cat").forEach(a=>{a.classList.remove("active"),a.style.background="white",a.style.color="#64748B",a.style.borderColor="#E5E7EB"}),t.classList.add("active"),t.style.background="#4F46E5",t.style.color="white",t.style.borderColor="#4F46E5",c()}});let e;i.addEventListener("input",t=>{l=t.target.value,clearTimeout(e),e=setTimeout(()=>c(),400)}),document.querySelectorAll(".nav-btn").forEach(t=>{t.onclick=()=>y(t.dataset.tela)}),document.getElementById("btnPerfil").onclick=()=>y("perfil")}async function c(){const o=document.getElementById("listaVagas");try{const i=(await h()).filter(e=>{var a,d,p,x,f,g;const s=!l||((a=e.titulo)==null?void 0:a.toLowerCase().includes(l.toLowerCase()))||((d=e.descricao)==null?void 0:d.toLowerCase().includes(l.toLowerCase()))||((x=(p=e.empresas)==null?void 0:p.razao_social)==null?void 0:x.toLowerCase().includes(l.toLowerCase())),t=n==="Todas"||((f=e.nicho)==null?void 0:f.toLowerCase().includes(n.toLowerCase()))||((g=e.categoria)==null?void 0:g.toLowerCase().includes(n.toLowerCase()));return s&&t});if(!i.length){o.innerHTML=`
        <div style="text-align:center; padding:60px 40px; color:#94A3B8;">
          <div style="font-size:48px; margin-bottom:16px;">🔍</div>
          <p style="font-weight:600; color:#475569;">Nenhuma vaga encontrada</p>
          <p style="font-size:14px; margin-top:8px;">Tente mudar os filtros ou o termo de busca.</p>
        </div>
      `;return}o.innerHTML=i.map(e=>w(e)).join(""),o.querySelectorAll(".btn-candidatar").forEach(e=>{e.onclick=async s=>{s.stopPropagation();const t=e.dataset.id,a=e.textContent;e.textContent="Enviando...",e.disabled=!0;try{await v(t),e.textContent="✓ Candidatura Enviada",e.style.background="#D1FAE5",e.style.color="#065F46",b("Candidatura enviada com sucesso!","success")}catch(d){d.code==="23505"?(e.textContent="Já candidatado",e.style.background="#F1F5F9",e.style.color="#64748B"):(b("Erro ao enviar candidatura","error"),e.textContent=a,e.disabled=!1)}}})}catch(r){console.error(r),o.innerHTML=`
      <div style="text-align:center; padding:60px 40px; color:#EF4444;">
        <div style="font-size:40px; margin-bottom:12px;">⚠️</div>
        <p>Não foi possível carregar as vagas agora.</p>
      </div>
    `}}function w(o){const r=o.empresas,i=o.valor?`R$ ${Number(o.valor).toFixed(2).replace(".",",")}`:"A combinar";return`
    <div style="
      background:white; border-radius:18px; padding:20px;
      margin-bottom:16px; border:1px solid #E5E7EB;
      box-shadow:0 2px 10px rgba(0,0,0,0.03);
      cursor:pointer;
    " onclick="navegar('vaga-detalhe', { id: '${o.id}' })">
      
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
        <div style="flex:1;">
          <h3 style="font-size:17px; font-weight:800; color:#111827; margin-bottom:4px; line-height:1.2;">
            ${o.titulo||"Vaga"}
          </h3>
          <p style="font-size:13px; color:#64748B; font-weight:500;">
            ${(r==null?void 0:r.razao_social)||"Empresa"} • ${o.cidade||"Localização..."}
          </p>
        </div>
        <span style="
          background:#F3F0FF; color:#4F46E5;
          padding:6px 12px; border-radius:20px;
          font-size:12px; font-weight:800; white-space:nowrap;
        ">${i}</span>
      </div>

      <div style="display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap;">
        <span style="background:#F1F5F9; color:#475569; padding:4px 10px; border-radius:8px; font-size:11px; font-weight:700; text-transform:uppercase;">${o.nicho||"Geral"}</span>
        ${o.disponibilidade?`<span style="background:#E0F2FE; color:#0369A1; padding:4px 10px; border-radius:8px; font-size:11px; font-weight:700; text-transform:uppercase;">${o.disponibilidade}</span>`:""}
      </div>

      <button class="btn-candidatar" data-id="${o.id}" style="
        width:100%; padding:14px; border-radius:12px;
        background:#4F46E5; color:white; border:none;
        font-size:14px; font-weight:700; cursor:pointer;
        font-family:'Inter',sans-serif; transition:all 0.2s;
      ">Me Candidatar</button>
    </div>
  `}function u(o){return`
    display:flex; flex-direction:column; align-items:center; gap:4px;
    background:none; border:none; cursor:pointer; padding:10px 20px;
    color:${o?"#4F46E5":"#9CA3AF"}; font-weight:${o?"700":"500"};
    font-family:'Inter',sans-serif; transition: color 0.2s;
  `}export{C as render};
