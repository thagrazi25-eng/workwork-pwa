import{n as r,s as a}from"./index-C2s5YXJs.js";async function u(t){t.innerHTML=x("admin-logs",`
    <div style="margin-bottom:32px;">
      <h1 style="font-family:'Sora',sans-serif; font-size:28px; font-weight:700; color:#1E293B;">Logs de Atividade</h1>
      <p style="color:#64748B; margin-top:4px;">Histórico de eventos recentes na plataforma.</p>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:20px; margin-bottom:32px;">
      <div style="background:white; border-radius:16px; border:1px solid #E2E8F0; padding:20px;">
        <div style="font-size:12px; color:#94A3B8; font-weight:600; text-transform:uppercase; margin-bottom:8px;">Novos Cadastros (hoje)</div>
        <div id="logCadastros" style="font-size:28px; font-weight:700; font-family:'Sora',sans-serif; color:#1E293B;">—</div>
      </div>
      <div style="background:white; border-radius:16px; border:1px solid #E2E8F0; padding:20px;">
        <div style="font-size:12px; color:#94A3B8; font-weight:600; text-transform:uppercase; margin-bottom:8px;">Aprovações Hoje</div>
        <div id="logAprovacoes" style="font-size:28px; font-weight:700; font-family:'Sora',sans-serif; color:#059669;">—</div>
      </div>
      <div style="background:white; border-radius:16px; border:1px solid #E2E8F0; padding:20px;">
        <div style="font-size:12px; color:#94A3B8; font-weight:600; text-transform:uppercase; margin-bottom:8px;">Vagas Criadas (hoje)</div>
        <div id="logVagas" style="font-size:28px; font-weight:700; font-family:'Sora',sans-serif; color:#4F46E5;">—</div>
      </div>
    </div>

    <div style="background:white; border-radius:20px; border:1px solid #E2E8F0; padding:32px;">
      <h2 style="font-family:'Sora',sans-serif; font-size:18px; font-weight:600; color:#1E293B; margin-bottom:24px;">Últimos Usuários Cadastrados</h2>
      <div id="logLista">
        <div style="text-align:center; color:#94A3B8; padding:24px;">Carregando...</div>
      </div>
    </div>
  `),m(),await f()}async function f(){try{const t=new Date;t.setHours(0,0,0,0);const i=t.toISOString(),[n,e,d,l]=await Promise.all([a.from("usuarios").select("*",{count:"exact",head:!0}).gte("created_at",i),a.from("usuarios").select("*",{count:"exact",head:!0}).eq("admin_approved",!0).gte("updated_at",i),a.from("vagas").select("*",{count:"exact",head:!0}).gte("created_at",i),a.from("usuarios").select("id, nome, email, tipo, admin_approved, created_at").order("created_at",{ascending:!1}).limit(20)]);document.getElementById("logCadastros").textContent=n.count??"0",document.getElementById("logAprovacoes").textContent=e.count??"0",document.getElementById("logVagas").textContent=d.count??"0";const s=l.data||[];document.getElementById("logLista").innerHTML=s.length===0?'<div style="text-align:center; color:#94A3B8; padding:24px;">Sem registros.</div>':s.map(o=>{const p=o.tipo==="profissional"?"👤":o.tipo==="empresa"?"🏢":"⚙️",c=o.admin_approved?'<span style="padding:2px 10px; border-radius:20px; font-size:11px; font-weight:600; background:#D1FAE5; color:#065F46;">Aprovado</span>':'<span style="padding:2px 10px; border-radius:20px; font-size:11px; font-weight:600; background:#FEF3C7; color:#92400E;">Pendente</span>',g=new Date(o.created_at).toLocaleString("pt-BR");return`
            <div style="display:flex; align-items:center; gap:16px; padding:14px 0; border-bottom:1px solid #F1F5F9;">
              <span style="font-size:22px;">${p}</span>
              <div style="flex:1;">
                <div style="font-weight:600; font-size:14px; color:#1E293B;">${o.nome||"—"}</div>
                <div style="font-size:12px; color:#94A3B8;">${o.email} • ${g}</div>
              </div>
              ${c}
            </div>`}).join("")}catch(t){document.getElementById("logLista").innerHTML=`<div style="color:#EF4444; padding:24px;">Erro: ${t.message}</div>`}}function x(t,i){return`
    <div style="height:100dvh; display:flex; background:#F8F9FD; font-family:'Inter',sans-serif; overflow:hidden;">
      <aside style="width:260px; background:#181C2E; color:white; display:flex; flex-direction:column; flex-shrink:0; overflow-y:auto;">
        <div style="padding:32px 24px 24px;">
          <div style="font-family:'Sora',sans-serif; font-size:20px; font-weight:800; color:#4F46E5; display:flex; align-items:center; gap:10px;">
            <div style="width:30px; height:30px; background:#4F46E5; border-radius:8px; display:flex; align-items:center; justify-content:center; color:white; font-size:14px; font-weight:800;">WW</div>
            WorkWork Admin
          </div>
        </div>
        <nav style="flex:1; padding:0 12px;">
          ${[{id:"admin-dashboard",icon:"📊",label:"Dashboard"},{id:"admin-profissionais",icon:"👤",label:"Profissionais"},{id:"admin-empresas",icon:"🏢",label:"Empresas"},{id:"admin-vagas",icon:"📋",label:"Vagas"},{id:"admin-aprovacoes",icon:"🔔",label:"Aprovações"},{id:"admin-logs",icon:"📜",label:"Logs"},{id:"admin-config",icon:"💎",label:"Assinaturas"},{id:"admin-relatorios",icon:"📈",label:"Relatórios"}].map(e=>`
            <button class="adm-nav-btn" data-screen="${e.id}" style="width:100%; padding:12px 16px; border-radius:10px; margin-bottom:2px; cursor:pointer; display:flex; align-items:center; gap:10px; font-weight:600; font-size:13px; border:none; transition:all 0.2s; background:${e.id===t?"#4F46E5":"transparent"}; color:${e.id===t?"white":"rgba(255,255,255,0.55)"}; text-align:left; font-family:'Inter',sans-serif;">
              <span style="font-size:16px;">${e.icon}</span> ${e.label}
            </button>
          `).join("")}
          <div style="height:1px; background:rgba(255,255,255,0.1); margin:16px 8px;"></div>
          <button id="btnLogout" style="width:100%; padding:12px 16px; border-radius:10px; cursor:pointer; display:flex; align-items:center; gap:10px; font-weight:600; font-size:13px; border:none; background:transparent; color:rgba(255,255,255,0.4); text-align:left; font-family:'Inter',sans-serif;"><span style="font-size:16px;">🚪</span> Sair</button>
        </nav>
      </aside>
      <main style="flex:1; overflow-y:auto; padding:40px 48px;">${i}</main>
    </div>`}function m(){document.querySelectorAll(".adm-nav-btn").forEach(t=>{t.onclick=()=>r(t.dataset.screen)}),document.getElementById("btnLogout").onclick=async()=>{await a.auth.signOut(),r("login")}}export{u as render};
