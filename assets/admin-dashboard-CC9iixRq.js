import{n as r,s as n,t as l}from"./index-C3CtvK1P.js";async function c(t){t.innerHTML=`
    <div style="height:100dvh; display:flex; background:#F8F9FD; font-family:'Inter', sans-serif; color:#1E293B;">
      
      <!-- Sidebar -->
      <aside style="width:280px; background:#181C2E; color:white; display:flex; flex-direction:column; flex-shrink:0;">
        <div style="padding:40px 32px;">
          <div style="font-family:'Sora', sans-serif; font-size:24px; font-weight:800; color:#4F46E5; display:flex; align-items:center; gap:12px;">
            <div style="width:32px; height:32px; background:#4F46E5; border-radius:8px; display:flex; align-items:center; justify-content:center; color:white; font-size:16px;">WW</div>
            WorkWork Admin
          </div>
        </div>

        <nav style="flex:1; padding:0 16px; list-style:none;">
          <button class="adm-nav-btn active" data-screen="admin-dashboard" style="${o(!0)}">
            <span style="font-size:18px;">📊</span> Dashboard
          </button>
          <button class="adm-nav-btn" data-screen="admin-aprovacoes" style="${o(!1)}">
            <span style="font-size:18px;">🔔</span> Aprovações 
            <span id="badgeAprov" style="margin-left:auto; background:#EF4444; color:white; font-size:11px; padding:2px 8px; border-radius:20px; display:none;">0</span>
          </button>
          <button class="adm-nav-btn" data-screen="admin-config" style="${o(!1)}">
            <span style="font-size:18px;">💎</span> Assinaturas
          </button>
          <div style="height:1px; background:rgba(255,255,255,0.1); margin:20px 16px;"></div>
          <button id="btnLogout" style="${o(!1)}">
            <span style="font-size:18px;">🚪</span> Sair
          </button>
        </nav>
      </aside>

      <!-- Main Content -->
      <main style="flex:1; overflow-y:auto; padding:40px 60px;">
        <header style="margin-bottom:40px; display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <h1 style="font-family:'Sora', sans-serif; font-size:32px; font-weight:700; color:#1E293B;">Visão Geral</h1>
            <p style="color:#64748B; margin-top:4px;">Bem-vindo ao painel de controle administrativo.</p>
          </div>
          <button id="btnAtualizar" style="padding:10px 20px; border:1.5px solid #E2E8F0; background:none; border-radius:12px; font-weight:600; font-size:14px; cursor:pointer; color:#1E293B; transition:all 0.2s;" onmouseover="this.style.borderColor='#4F46E5'; this.style.color='#4F46E5'" onmouseout="this.style.borderColor='#E2E8F0'; this.style.color='#1E293B'">🔄 Atualizar Dados</button>
        </header>

        <!-- Stats Grid -->
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:24px; margin-bottom:40px;">
          <div style="${i()}">
            <span style="color:#64748B; font-size:14px; font-weight:500; margin-bottom:12px; display:block;">Profissionais</span>
            <div id="statProf" style="font-family:'Sora', sans-serif; font-size:28px; font-weight:700; color:#181C2E;">--</div>
          </div>
          <div style="${i()}">
            <span style="color:#64748B; font-size:14px; font-weight:500; margin-bottom:12px; display:block;">Empresas</span>
            <div id="statEmp" style="font-family:'Sora', sans-serif; font-size:28px; font-weight:700; color:#181C2E;">--</div>
          </div>
          <div style="${i(!0)}">
            <span style="color:#4F46E5; font-size:14px; font-weight:500; margin-bottom:12px; display:block;">Aprovações Pendentes</span>
            <div id="statAprov" style="font-family:'Sora', sans-serif; font-size:28px; font-weight:700; color:#4F46E5;">--</div>
          </div>
        </div>

        <div style="background:white; border-radius:24px; border:1px solid #E2E8F0; padding:32px;">
          <h2 style="font-family:'Sora', sans-serif; font-size:20px; font-weight:600; margin-bottom:24px; color:#1E293B;">Últimas Atividades</h2>
          <div id="atividades" style="color:#64748B; font-size:14px; text-align:center; padding:40px;">
             Carregando atividades...
          </div>
        </div>
      </main>
    </div>
  `,await d(),document.querySelectorAll(".adm-nav-btn").forEach(e=>{e.onclick=()=>r(e.dataset.screen)}),document.getElementById("btnLogout").onclick=async()=>{await n.auth.signOut(),r("login")},document.getElementById("btnAtualizar").onclick=()=>d()}async function d(){try{const{count:t}=await n.from("profissionais").select("*",{count:"exact",head:!0}),{count:e}=await n.from("empresas").select("*",{count:"exact",head:!0}),{count:a}=await n.from("usuarios").select("*",{count:"exact",head:!0}).eq("admin_approved",!1);if(document.getElementById("statProf").textContent=t||0,document.getElementById("statEmp").textContent=e||0,document.getElementById("statAprov").textContent=a||0,a>0){const s=document.getElementById("badgeAprov");s.textContent=a,s.style.display="block"}document.getElementById("atividades").innerHTML=`
      <p style="color:#10B981; font-weight:600;">✅ Sistema operando normalmente</p>
      <p style="margin-top:8px; font-size:13px;">Última sincronização: ${new Date().toLocaleTimeString()}</p>
    `}catch(t){console.error(t),l("Erro ao carregar dados do painel","error")}}function o(t){return`
    width:100%; padding:14px 20px; border-radius:12px; margin-bottom:4px;
    cursor:pointer; display:flex; align-items:center; gap:12px;
    font-weight:600; font-size:14px; border:none; transition:all 0.2s;
    background:${t?"#4F46E5":"transparent"};
    color:${t?"white":"rgba(255,255,255,0.6)"};
    text-align:left; font-family:'Inter', sans-serif;
  `}function i(t=!1){return`
    background:${t?"rgba(79, 70, 229, 0.05)":"white"};
    padding:24px; border-radius:20px;
    border:1px solid ${t?"rgba(79, 70, 229, 0.2)":"#E2E8F0"};
    box-shadow:0 4px 12px rgba(0,0,0,0.02);
  `}export{c as render};
