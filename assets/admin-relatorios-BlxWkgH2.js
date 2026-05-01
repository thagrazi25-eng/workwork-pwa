import{n as c,s as a}from"./index-C2s5YXJs.js";async function k(t){t.innerHTML=w("admin-relatorios",`
    <div style="margin-bottom:32px;">
      <h1 style="font-family:'Sora',sans-serif; font-size:28px; font-weight:700; color:#1E293B;">Relatórios</h1>
      <p style="color:#64748B; margin-top:4px;">Visão consolidada dos dados da plataforma.</p>
    </div>

    <div id="relStats" style="display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-bottom:32px;">
      ${["—","—","—","—","—","—"].map((s,n)=>`<div style="background:white; border-radius:16px; border:1px solid #E2E8F0; padding:24px;"><div id="rel-label-${n}" style="font-size:12px; color:#94A3B8; font-weight:600; text-transform:uppercase; margin-bottom:8px;">...</div><div id="rel-val-${n}" style="font-size:28px; font-weight:700; font-family:'Sora',sans-serif; color:#1E293B;">—</div></div>`).join("")}
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
      <div style="background:white; border-radius:20px; border:1px solid #E2E8F0; padding:32px;">
        <h2 style="font-family:'Sora',sans-serif; font-size:18px; font-weight:600; margin-bottom:20px;">Distribuição por Nicho</h2>
        <div id="relNichos">Carregando...</div>
      </div>
      <div style="background:white; border-radius:20px; border:1px solid #E2E8F0; padding:32px;">
        <h2 style="font-family:'Sora',sans-serif; font-size:18px; font-weight:600; margin-bottom:20px;">Status dos Usuários</h2>
        <div id="relStatus">Carregando...</div>
      </div>
    </div>
  `),F(),await E()}async function E(){var t;try{const[s,n,i,f,m,g]=await Promise.all([a.from("profissionais").select("*",{count:"exact",head:!0}),a.from("empresas").select("*",{count:"exact",head:!0}),a.from("vagas").select("*",{count:"exact",head:!0}).eq("status","aberta"),a.from("usuarios").select("*",{count:"exact",head:!0}).eq("admin_approved",!1),a.from("vagas").select("*",{count:"exact",head:!0}).eq("status","fechada"),a.from("candidaturas").select("*",{count:"exact",head:!0})]),u=["Total Profissionais","Total Empresas","Vagas Abertas","Pendentes de Aprovação","Vagas Fechadas","Total Candidaturas"],x=[s.count,n.count,i.count,f.count,m.count,g.count],v=["#1E293B","#1E293B","#4F46E5","#D97706","#94A3B8","#059669"];u.forEach((o,e)=>{document.getElementById(`rel-label-${e}`).textContent=o,document.getElementById(`rel-val-${e}`).textContent=x[e]??0,document.getElementById(`rel-val-${e}`).style.color=v[e]});const{data:h}=await a.from("profissionais").select("nicho"),d={};(h||[]).forEach(o=>{o.nicho&&(d[o.nicho]=(d[o.nicho]||0)+1)});const l=Object.entries(d).sort((o,e)=>e[1]-o[1]).slice(0,8),b=((t=l[0])==null?void 0:t[1])||1;document.getElementById("relNichos").innerHTML=l.length===0?'<p style="color:#94A3B8;">Sem dados.</p>':l.map(([o,e])=>`
          <div style="margin-bottom:14px;">
            <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:6px;">
              <span style="font-weight:600; color:#1E293B;">${o}</span>
              <span style="color:#94A3B8;">${e}</span>
            </div>
            <div style="height:6px; background:#F1F5F9; border-radius:3px; overflow:hidden;">
              <div style="height:100%; width:${Math.round(e/b*100)}%; background:#4F46E5; border-radius:3px; transition:width 0.8s ease;"></div>
            </div>
          </div>`).join("");const{data:y}=await a.from("usuarios").select("tipo, admin_approved"),r={profissional:{total:0,aprovados:0},empresa:{total:0,aprovados:0}};(y||[]).forEach(o=>{r[o.tipo]&&(r[o.tipo].total++,o.admin_approved&&r[o.tipo].aprovados++)}),document.getElementById("relStatus").innerHTML=Object.entries(r).map(([o,e])=>{const p=e.total>0?Math.round(e.aprovados/e.total*100):0;return`
        <div style="margin-bottom:20px; padding:16px; background:#F8F9FD; border-radius:14px; border:1px solid #E2E8F0;">
          <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
            <span style="font-weight:600; font-size:14px; color:#1E293B;">${o==="profissional"?"👤 Profissionais":"🏢 Empresas"}</span>
            <span style="font-size:13px; color:#64748B;">${e.aprovados}/${e.total} aprovados</span>
          </div>
          <div style="height:8px; background:#E2E8F0; border-radius:4px; overflow:hidden;">
            <div style="height:100%; width:${p}%; background:${o==="profissional"?"#4F46E5":"#F59E0B"}; border-radius:4px;"></div>
          </div>
          <div style="font-size:12px; color:#94A3B8; margin-top:6px;">${p}% aprovação</div>
        </div>`}).join("")}catch(s){console.error(s)}}function w(t,s){return`
    <div style="height:100dvh; display:flex; background:#F8F9FD; font-family:'Inter',sans-serif; overflow:hidden;">
      <aside style="width:260px; background:#181C2E; color:white; display:flex; flex-direction:column; flex-shrink:0; overflow-y:auto;">
        <div style="padding:32px 24px 24px;">
          <div style="font-family:'Sora',sans-serif; font-size:20px; font-weight:800; color:#4F46E5; display:flex; align-items:center; gap:10px;">
            <div style="width:30px; height:30px; background:#4F46E5; border-radius:8px; display:flex; align-items:center; justify-content:center; color:white; font-size:14px; font-weight:800;">WW</div>
            WorkWork Admin
          </div>
        </div>
        <nav style="flex:1; padding:0 12px;">
          ${[{id:"admin-dashboard",icon:"📊",label:"Dashboard"},{id:"admin-profissionais",icon:"👤",label:"Profissionais"},{id:"admin-empresas",icon:"🏢",label:"Empresas"},{id:"admin-vagas",icon:"📋",label:"Vagas"},{id:"admin-aprovacoes",icon:"🔔",label:"Aprovações"},{id:"admin-logs",icon:"📜",label:"Logs"},{id:"admin-config",icon:"💎",label:"Assinaturas"},{id:"admin-relatorios",icon:"📈",label:"Relatórios"}].map(i=>`
            <button class="adm-nav-btn" data-screen="${i.id}" style="width:100%; padding:12px 16px; border-radius:10px; margin-bottom:2px; cursor:pointer; display:flex; align-items:center; gap:10px; font-weight:600; font-size:13px; border:none; transition:all 0.2s; background:${i.id===t?"#4F46E5":"transparent"}; color:${i.id===t?"white":"rgba(255,255,255,0.55)"}; text-align:left; font-family:'Inter',sans-serif;">
              <span style="font-size:16px;">${i.icon}</span> ${i.label}
            </button>
          `).join("")}
          <div style="height:1px; background:rgba(255,255,255,0.1); margin:16px 8px;"></div>
          <button id="btnLogout" style="width:100%; padding:12px 16px; border-radius:10px; cursor:pointer; display:flex; align-items:center; gap:10px; font-weight:600; font-size:13px; border:none; background:transparent; color:rgba(255,255,255,0.4); text-align:left; font-family:'Inter',sans-serif;"><span style="font-size:16px;">🚪</span> Sair</button>
        </nav>
      </aside>
      <main style="flex:1; overflow-y:auto; padding:40px 48px;">${s}</main>
    </div>`}function F(){document.querySelectorAll(".adm-nav-btn").forEach(t=>{t.onclick=()=>c(t.dataset.screen)}),document.getElementById("btnLogout").onclick=async()=>{await a.auth.signOut(),c("login")}}export{k as render};
