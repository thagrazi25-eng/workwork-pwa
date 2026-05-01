import{n as u,s,t as f}from"./index-C2s5YXJs.js";async function B(a){a.innerHTML=E("admin-vagas",`
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:32px;">
      <div>
        <h1 style="font-family:'Sora',sans-serif; font-size:28px; font-weight:700; color:#1E293B;">Vagas</h1>
        <p style="color:#64748B; margin-top:4px;">Todas as vagas publicadas na plataforma.</p>
      </div>
      <input id="searchVaga" type="text" placeholder="🔍 Buscar por título ou empresa..."
        style="padding:12px 16px; border-radius:12px; border:1.5px solid #E2E8F0; width:280px; font-size:14px; outline:none; font-family:'Inter',sans-serif;">
    </div>
    <div style="background:white; border-radius:20px; border:1px solid #E2E8F0; overflow:hidden;">
      <div id="tabelaVagas" style="overflow-x:auto;">
        <div style="padding:40px; text-align:center; color:#64748B;">Carregando...</div>
      </div>
    </div>
  `),F(),await d(),document.getElementById("searchVaga").oninput=t=>$(t.target.value)}let r=[];async function d(){try{const{data:a,error:t}=await s.from("vagas").select("*, empresas(razao_social, cidade, usuarios(nome))").order("created_at",{ascending:!1});if(t)throw t;r=a||[],y(r)}catch(a){document.getElementById("tabelaVagas").innerHTML=`<div style="padding:40px; text-align:center; color:#EF4444;">Erro: ${a.message}</div>`}}function y(a){if(!a.length){document.getElementById("tabelaVagas").innerHTML=`
      <div style="padding:60px; text-align:center;">
        <div style="font-size:48px; margin-bottom:16px;">📋</div>
        <p style="color:#64748B;">Nenhuma vaga encontrada.</p>
      </div>`;return}document.getElementById("tabelaVagas").innerHTML=`
    <table style="width:100%; border-collapse:collapse;">
      <thead>
        <tr style="background:#F8F9FD;">
          <th style="${n()}">Vaga</th>
          <th style="${n()}">Empresa</th>
          <th style="${n()}">Cidade</th>
          <th style="${n()}">Candidatos</th>
          <th style="${n()}">Status</th>
          <th style="${n()}">Data</th>
          <th style="${n()}">Ações</th>
        </tr>
      </thead>
      <tbody>
        ${a.map(t=>{var l,c,p,g;const i=((c=(l=t.empresas)==null?void 0:l.usuarios)==null?void 0:c.nome)||((p=t.empresas)==null?void 0:p.razao_social)||"—",e=((g=t.empresas)==null?void 0:g.cidade)||t.cidade||"—",b={aberta:["#D1FAE5","#065F46","Aberta"],fechada:["#E5E7EB","#374151","Fechada"],pausada:["#FEF3C7","#92400E","Pausada"]},[h,m,w]=b[t.status]||["#E5E7EB","#374151",t.status],v=new Date(t.created_at).toLocaleDateString("pt-BR");return`
            <tr style="border-bottom:1px solid #F1F5F9;" onmouseover="this.style.background='#F8F9FD'" onmouseout="this.style.background='white'">
              <td style="${o()}">
                <div style="font-weight:600; font-size:14px; color:#1E293B;">${t.titulo||"—"}</div>
                <div style="font-size:12px; color:#94A3B8;">${t.nicho_id||""}</div>
              </td>
              <td style="${o()}">${i}</td>
              <td style="${o()}">${e}</td>
              <td style="${o()}; text-align:center;">${t.total_candidatos||0}</td>
              <td style="${o()}"><span style="padding:4px 12px; border-radius:20px; font-size:12px; font-weight:600; background:${h}; color:${m};">${w}</span></td>
              <td style="${o()}; color:#94A3B8;">${v}</td>
              <td style="${o()}">
                ${t.status==="aberta"?`<button onclick="window.vagaFechar('${t.id}')" style="${x("#F59E0B")}">Fechar</button>`:`<button onclick="window.vagaReabrir('${t.id}')" style="${x("#4F46E5")}">Reabrir</button>`}
              </td>
            </tr>`}).join("")}
      </tbody>
    </table>`,window.vagaFechar=async t=>{await s.from("vagas").update({status:"fechada"}).eq("id",t),f("Vaga fechada.","success"),await d()},window.vagaReabrir=async t=>{await s.from("vagas").update({status:"aberta"}).eq("id",t),f("Vaga reaberta!","success"),await d()}}function $(a){const t=a.toLowerCase();y(r.filter(i=>{var e;return(i.titulo||"").toLowerCase().includes(t)||(((e=i.empresas)==null?void 0:e.razao_social)||"").toLowerCase().includes(t)}))}function n(){return"padding:12px 16px; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; color:#94A3B8; text-align:left; white-space:nowrap;"}function o(){return"padding:16px; font-size:14px; color:#1E293B; white-space:nowrap;"}function x(a){return`padding:6px 14px; border-radius:8px; background:${a}; color:white; border:none; font-size:12px; font-weight:600; cursor:pointer; font-family:'Inter',sans-serif;`}function E(a,t){return`
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
            <button class="adm-nav-btn" data-screen="${e.id}" style="width:100%; padding:12px 16px; border-radius:10px; margin-bottom:2px; cursor:pointer; display:flex; align-items:center; gap:10px; font-weight:600; font-size:13px; border:none; transition:all 0.2s; background:${e.id===a?"#4F46E5":"transparent"}; color:${e.id===a?"white":"rgba(255,255,255,0.55)"}; text-align:left; font-family:'Inter',sans-serif;">
              <span style="font-size:16px;">${e.icon}</span> ${e.label}
            </button>
          `).join("")}
          <div style="height:1px; background:rgba(255,255,255,0.1); margin:16px 8px;"></div>
          <button id="btnLogout" style="width:100%; padding:12px 16px; border-radius:10px; cursor:pointer; display:flex; align-items:center; gap:10px; font-weight:600; font-size:13px; border:none; background:transparent; color:rgba(255,255,255,0.4); text-align:left; font-family:'Inter',sans-serif;"><span style="font-size:16px;">🚪</span> Sair</button>
        </nav>
      </aside>
      <main style="flex:1; overflow-y:auto; padding:40px 48px;">${t}</main>
    </div>`}function F(){document.querySelectorAll(".adm-nav-btn").forEach(a=>{a.onclick=()=>u(a.dataset.screen)}),document.getElementById("btnLogout").onclick=async()=>{await s.auth.signOut(),u("login")}}export{B as render};
