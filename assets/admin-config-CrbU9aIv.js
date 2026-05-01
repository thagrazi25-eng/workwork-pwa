import{n as s,s as i,t as l}from"./index-C3CtvK1P.js";async function c(e){e.innerHTML=`
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
          <button class="adm-nav-btn" data-screen="admin-dashboard" style="${a(!1)}">
            <span style="font-size:18px;">📊</span> Dashboard
          </button>
          <button class="adm-nav-btn" data-screen="admin-aprovacoes" style="${a(!1)}">
            <span style="font-size:18px;">🔔</span> Aprovações
          </button>
          <button class="adm-nav-btn active" data-screen="admin-config" style="${a(!0)}">
            <span style="font-size:18px;">💎</span> Assinaturas
          </button>
          <div style="height:1px; background:rgba(255,255,255,0.1); margin:20px 16px;"></div>
          <button id="btnLogout" style="${a(!1)}">
            <span style="font-size:18px;">🚪</span> Sair
          </button>
        </nav>
      </aside>

      <!-- Main Content -->
      <main style="flex:1; overflow-y:auto; padding:40px 60px;">
        <header style="margin-bottom:40px;">
          <h1 style="font-family:'Sora', sans-serif; font-size:32px; font-weight:700; color:#1E293B;">Assinaturas e Ajustes</h1>
          <p style="color:#64748B; margin-top:4px;">Configure assinaturas, períodos de teste e regras do sistema.</p>
        </header>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:32px;">
          
          <!-- Configuração de Trial -->
          <div style="background:white; border-radius:24px; border:1px solid #E2E8F0; padding:32px;">
            <h2 style="font-size:18px; font-weight:700; margin-bottom:24px; display:flex; align-items:center; gap:10px;">🎁 Período de Teste (Trial)</h2>
            
            <div style="margin-bottom:24px;">
              <label style="display:block; font-size:13px; font-weight:600; color:#1E293B; margin-bottom:8px;">Dias de Teste Grátis</label>
              <input id="trial_days" type="number" value="7" style="${o()}" />
              <p style="font-size:12px; color:#64748B; margin-top:8px;">Tempo que o usuário pode usar o app antes de ser cobrado.</p>
            </div>

            <div style="display:flex; align-items:center; justify-content:space-between; padding:16px; background:#F9FAFB; border-radius:12px;">
              <div>
                <p style="font-weight:600; font-size:14px;">Ativar Trial Global</p>
                <p style="font-size:12px; color:#64748B;">Se desativado, todos deverão pagar ao entrar.</p>
              </div>
              <input type="checkbox" id="trial_ativo" checked style="width:20px; height:20px; cursor:pointer;" />
            </div>
          </div>

          <!-- Valores de Assinatura -->
          <div style="background:white; border-radius:24px; border:1px solid #E2E8F0; padding:32px;">
            <h2 style="font-size:18px; font-weight:700; margin-bottom:24px; display:flex; align-items:center; gap:10px;">💎 Valores dos Planos (R$)</h2>
            
            <div style="display:flex; flex-direction:column; gap:16px;">
              <div>
                <label style="display:block; font-size:13px; font-weight:600; color:#64748B; margin-bottom:6px;">Plano Starter (Profissional)</label>
                <input id="preco_starter" type="number" step="0.01" value="49.90" style="${o()}" />
              </div>
              <div>
                <label style="display:block; font-size:13px; font-weight:600; color:#64748B; margin-bottom:6px;">Plano Pro (Profissional)</label>
                <input id="preco_pro" type="number" step="0.01" value="89.90" style="${o()}" />
              </div>
              <div>
                <label style="display:block; font-size:13px; font-weight:600; color:#64748B; margin-bottom:6px;">Plano Empresa (Recrutador)</label>
                <input id="preco_empresa" type="number" step="0.01" value="149.90" style="${o()}" />
              </div>
            </div>
          </div>

        </div>

        <div style="margin-top:32px; display:flex; justify-content:flex-end;">
          <button id="btnSalvarConfig" style="
            background:#4F46E5; color:white; border:none;
            padding:16px 40px; border-radius:14px;
            font-weight:700; font-size:16px; cursor:pointer;
            box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
          ">Salvar Alterações</button>
        </div>
      </main>
    </div>
  `,await d(),document.querySelectorAll(".adm-nav-btn").forEach(t=>{t.onclick=()=>s(t.dataset.screen)}),document.getElementById("btnSalvarConfig").onclick=async()=>{const t=document.getElementById("btnSalvarConfig");t.textContent="Salvando...",t.disabled=!0;try{const n={trial_days:parseInt(document.getElementById("trial_days").value),trial_ativo:document.getElementById("trial_ativo").checked,preco_starter:parseFloat(document.getElementById("preco_starter").value),preco_pro:parseFloat(document.getElementById("preco_pro").value),preco_empresa:parseFloat(document.getElementById("preco_empresa").value),updated_at:new Date},{error:r}=await i.from("config_sistema").update(n).eq("id",1);if(r)throw r;l("Configurações salvas com sucesso!","success")}catch(n){console.error(n),l("Erro ao salvar no banco de dados","error")}finally{t.textContent="Salvar Alterações",t.disabled=!1}},document.getElementById("btnLogout").onclick=async()=>{await i.auth.signOut(),s("login")}}async function d(){try{const{data:e,error:t}=await i.from("config_sistema").select("*").eq("id",1).single();e&&(document.getElementById("trial_days").value=e.trial_days,document.getElementById("trial_ativo").checked=e.trial_ativo,document.getElementById("preco_starter").value=e.preco_starter,document.getElementById("preco_pro").value=e.preco_pro,document.getElementById("preco_empresa").value=e.preco_empresa)}catch{console.warn("Configurações iniciais não encontradas no banco")}}function a(e){return`
    width:100%; padding:14px 20px; border-radius:12px; margin-bottom:4px;
    cursor:pointer; display:flex; align-items:center; gap:12px;
    font-weight:600; font-size:14px; border:none; transition:all 0.2s;
    background:${e?"#4F46E5":"transparent"};
    color:${e?"white":"rgba(255,255,255,0.6)"};
    text-align:left; font-family:'Inter', sans-serif;
  `}const o=()=>"width:100%; padding:12px 16px; border:1.5px solid #E2E8F0; border-radius:10px; font-size:15px; font-family:'Inter', sans-serif; background:#F9FAFB; outline:none;";export{c as render};
