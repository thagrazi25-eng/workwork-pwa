import{n as c,s as r,t as f}from"./index-C2s5YXJs.js";async function E(t){t.innerHTML=v("admin-profissionais",`
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:32px;">
      <div>
        <h1 style="font-family:'Sora',sans-serif; font-size:28px; font-weight:700; color:#1E293B;">Profissionais</h1>
        <p style="color:#64748B; margin-top:4px;">Todos os profissionais cadastrados na plataforma.</p>
      </div>
      <input id="searchProf" type="text" placeholder="🔍 Buscar por nome ou nicho..."
        style="padding:12px 16px; border-radius:12px; border:1.5px solid #E2E8F0; width:280px; font-size:14px; outline:none; font-family:'Inter',sans-serif;">
    </div>
    <div style="background:white; border-radius:20px; border:1px solid #E2E8F0; overflow:hidden;">
      <div id="tabelaProf" style="overflow-x:auto;">
        <div style="padding:40px; text-align:center; color:#64748B;">Carregando...</div>
      </div>
    </div>
  `),w(),await l(),document.getElementById("searchProf").oninput=e=>{b(e.target.value)}}let d=[];async function l(){try{const{data:t,error:e}=await r.from("usuarios").select("*, profissionais(nicho, experiencia_anos, raio_atendimento)").eq("tipo","profissional").order("created_at",{ascending:!1});if(e)throw e;d=t||[],g(d)}catch(t){console.error(t),document.getElementById("tabelaProf").innerHTML=`<div style="padding:40px; text-align:center; color:#EF4444;">Erro ao carregar: ${t.message}</div>`}}function g(t){if(!t.length){document.getElementById("tabelaProf").innerHTML=`
      <div style="padding:60px; text-align:center;">
        <div style="font-size:48px; margin-bottom:16px;">👤</div>
        <p style="color:#64748B; font-weight:500;">Nenhum profissional encontrado.</p>
      </div>`;return}document.getElementById("tabelaProf").innerHTML=`
    <table style="width:100%; border-collapse:collapse;">
      <thead>
        <tr style="background:#F8F9FD;">
          <th style="${i()}">Profissional</th>
          <th style="${i()}">Nicho</th>
          <th style="${i()}">Telefone</th>
          <th style="${i()}">Status</th>
          <th style="${i()}">Cadastro</th>
          <th style="${i()}">Ações</th>
        </tr>
      </thead>
      <tbody>
        ${t.map(e=>{var p;const n=(e.nome||"U").split(" ").map(h=>h[0]).join("").slice(0,2).toUpperCase(),o=((p=e.profissionais)==null?void 0:p.nicho)||"—",s=e.telefone||"—",u=e.admin_approved?"Ativo":"Pendente",y=e.admin_approved?"background:#D1FAE5; color:#065F46;":"background:#FEF3C7; color:#92400E;",m=new Date(e.created_at).toLocaleDateString("pt-BR");return`
            <tr style="border-bottom:1px solid #F1F5F9; transition:background 0.15s;" onmouseover="this.style.background='#F8F9FD'" onmouseout="this.style.background='white'">
              <td style="${a()}">
                <div style="display:flex; align-items:center; gap:12px;">
                  <div style="width:38px; height:38px; border-radius:10px; background:#EEF2FF; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; color:#4F46E5; flex-shrink:0;">${n}</div>
                  <div>
                    <div style="font-weight:600; font-size:14px; color:#1E293B;">${e.nome||"—"}</div>
                    <div style="font-size:12px; color:#94A3B8;">${e.email||""}</div>
                  </div>
                </div>
              </td>
              <td style="${a()}">${o}</td>
              <td style="${a()}">${s}</td>
              <td style="${a()}"><span style="padding:4px 12px; border-radius:20px; font-size:12px; font-weight:600; ${y}">${u}</span></td>
              <td style="${a()}; color:#94A3B8;">${m}</td>
              <td style="${a()}">
                <div style="display:flex; gap:8px;">
                  ${e.admin_approved?"":`<button onclick="window.admAprovar('${e.id}')" style="${x("#4F46E5")}">Aprovar</button>`}
                  <button onclick="window.admSuspender('${e.id}', '${e.nome}')" style="${x("#EF4444")}">Suspender</button>
                </div>
              </td>
            </tr>`}).join("")}
      </tbody>
    </table>`,window.admAprovar=async e=>{await r.from("usuarios").update({admin_approved:!0}).eq("id",e),f("Profissional aprovado!","success"),await l()},window.admSuspender=async(e,n)=>{confirm(`Suspender ${n}?`)&&(await r.from("usuarios").update({admin_approved:!1}).eq("id",e),f("Usuário suspenso.","error"),await l())}}function b(t){const e=t.toLowerCase(),n=d.filter(o=>{var s;return(o.nome||"").toLowerCase().includes(e)||(o.email||"").toLowerCase().includes(e)||(((s=o.profissionais)==null?void 0:s.nicho)||"").toLowerCase().includes(e)});g(n)}function i(){return"padding:12px 16px; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; color:#94A3B8; text-align:left; white-space:nowrap;"}function a(){return"padding:16px; font-size:14px; color:#1E293B; white-space:nowrap;"}function x(t){return`padding:6px 14px; border-radius:8px; background:${t}; color:white; border:none; font-size:12px; font-weight:600; cursor:pointer; font-family:'Inter',sans-serif;`}function v(t,e){return`
    <div style="height:100dvh; display:flex; background:#F8F9FD; font-family:'Inter',sans-serif; overflow:hidden;">
      <aside style="width:260px; background:#181C2E; color:white; display:flex; flex-direction:column; flex-shrink:0; overflow-y:auto;">
        <div style="padding:32px 24px 24px;">
          <div style="font-family:'Sora',sans-serif; font-size:20px; font-weight:800; color:#4F46E5; display:flex; align-items:center; gap:10px;">
            <div style="width:30px; height:30px; background:#4F46E5; border-radius:8px; display:flex; align-items:center; justify-content:center; color:white; font-size:14px; font-weight:800;">WW</div>
            WorkWork Admin
          </div>
        </div>
        <nav style="flex:1; padding:0 12px;">
          ${[{id:"admin-dashboard",icon:"📊",label:"Dashboard"},{id:"admin-profissionais",icon:"👤",label:"Profissionais"},{id:"admin-empresas",icon:"🏢",label:"Empresas"},{id:"admin-vagas",icon:"📋",label:"Vagas"},{id:"admin-aprovacoes",icon:"🔔",label:"Aprovações"},{id:"admin-logs",icon:"📜",label:"Logs"},{id:"admin-config",icon:"💎",label:"Assinaturas"},{id:"admin-relatorios",icon:"📈",label:"Relatórios"}].map(o=>`
            <button class="adm-nav-btn" data-screen="${o.id}" style="
              width:100%; padding:12px 16px; border-radius:10px; margin-bottom:2px;
              cursor:pointer; display:flex; align-items:center; gap:10px;
              font-weight:600; font-size:13px; border:none; transition:all 0.2s;
              background:${o.id===t?"#4F46E5":"transparent"};
              color:${o.id===t?"white":"rgba(255,255,255,0.55)"};
              text-align:left; font-family:'Inter',sans-serif;
            ">
              <span style="font-size:16px;">${o.icon}</span> ${o.label}
            </button>
          `).join("")}
          <div style="height:1px; background:rgba(255,255,255,0.1); margin:16px 8px;"></div>
          <button id="btnLogout" style="
            width:100%; padding:12px 16px; border-radius:10px;
            cursor:pointer; display:flex; align-items:center; gap:10px;
            font-weight:600; font-size:13px; border:none; background:transparent;
            color:rgba(255,255,255,0.4); text-align:left; font-family:'Inter',sans-serif;
          ">
            <span style="font-size:16px;">🚪</span> Sair
          </button>
        </nav>
      </aside>
      <main style="flex:1; overflow-y:auto; padding:40px 48px;">
        ${e}
      </main>
    </div>`}function w(){document.querySelectorAll(".adm-nav-btn").forEach(t=>{t.onclick=()=>c(t.dataset.screen)}),document.getElementById("btnLogout").onclick=async()=>{await r.auth.signOut(),c("login")}}export{E as render};
