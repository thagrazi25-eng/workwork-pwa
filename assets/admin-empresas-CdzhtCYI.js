import{n as l,s,t as p}from"./index-C2s5YXJs.js";async function w(t){t.innerHTML=b("admin-empresas",`
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:32px;">
      <div>
        <h1 style="font-family:'Sora',sans-serif; font-size:28px; font-weight:700; color:#1E293B;">Empresas</h1>
        <p style="color:#64748B; margin-top:4px;">Todas as empresas cadastradas na plataforma.</p>
      </div>
      <input id="searchEmp" type="text" placeholder="🔍 Buscar por nome ou CNPJ..."
        style="padding:12px 16px; border-radius:12px; border:1.5px solid #E2E8F0; width:280px; font-size:14px; outline:none; font-family:'Inter',sans-serif;">
    </div>
    <div style="background:white; border-radius:20px; border:1px solid #E2E8F0; overflow:hidden;">
      <div id="tabelaEmp" style="overflow-x:auto;">
        <div style="padding:40px; text-align:center; color:#64748B;">Carregando...</div>
      </div>
    </div>
  `),h(),await d(),document.getElementById("searchEmp").oninput=e=>y(e.target.value)}let r=[];async function d(){try{const{data:t,error:e}=await s.from("usuarios").select("*, empresas(cnpj, razao_social, cidade)").eq("tipo","empresa").order("created_at",{ascending:!1});if(e)throw e;r=t||[],f(r)}catch(t){document.getElementById("tabelaEmp").innerHTML=`<div style="padding:40px; text-align:center; color:#EF4444;">Erro: ${t.message}</div>`}}function f(t){if(!t.length){document.getElementById("tabelaEmp").innerHTML=`
      <div style="padding:60px; text-align:center;">
        <div style="font-size:48px; margin-bottom:16px;">🏢</div>
        <p style="color:#64748B; font-weight:500;">Nenhuma empresa encontrada.</p>
      </div>`;return}document.getElementById("tabelaEmp").innerHTML=`
    <table style="width:100%; border-collapse:collapse;">
      <thead>
        <tr style="background:#F8F9FD;">
          <th style="${i()}">Empresa</th>
          <th style="${i()}">CNPJ</th>
          <th style="${i()}">Cidade</th>
          <th style="${i()}">Status</th>
          <th style="${i()}">Cadastro</th>
          <th style="${i()}">Ações</th>
        </tr>
      </thead>
      <tbody>
        ${t.map(e=>{const a=e.empresas||{},n=(e.nome||"E").split(" ").map(u=>u[0]).join("").slice(0,2).toUpperCase(),m=e.admin_approved?"Ativo":"Pendente",x=e.admin_approved?"background:#D1FAE5; color:#065F46;":"background:#FEF3C7; color:#92400E;",g=new Date(e.created_at).toLocaleDateString("pt-BR");return`
            <tr style="border-bottom:1px solid #F1F5F9;" onmouseover="this.style.background='#F8F9FD'" onmouseout="this.style.background='white'">
              <td style="${o()}">
                <div style="display:flex; align-items:center; gap:12px;">
                  <div style="width:38px; height:38px; border-radius:10px; background:#FEF3C7; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; color:#D97706; flex-shrink:0;">${n}</div>
                  <div>
                    <div style="font-weight:600; font-size:14px;">${e.nome||a.razao_social||"—"}</div>
                    <div style="font-size:12px; color:#94A3B8;">${e.email||""}</div>
                  </div>
                </div>
              </td>
              <td style="${o()}">${a.cnpj||"—"}</td>
              <td style="${o()}">${a.cidade||"—"}</td>
              <td style="${o()}"><span style="padding:4px 12px; border-radius:20px; font-size:12px; font-weight:600; ${x}">${m}</span></td>
              <td style="${o()}; color:#94A3B8;">${g}</td>
              <td style="${o()}">
                <div style="display:flex; gap:8px;">
                  ${e.admin_approved?"":`<button onclick="window.empAprovar('${e.id}')" style="${c("#4F46E5")}">Aprovar</button>`}
                  <button onclick="window.empSuspender('${e.id}', '${e.nome}')" style="${c("#EF4444")}">Suspender</button>
                </div>
              </td>
            </tr>`}).join("")}
      </tbody>
    </table>`,window.empAprovar=async e=>{await s.from("usuarios").update({admin_approved:!0}).eq("id",e),p("Empresa aprovada!","success"),await d()},window.empSuspender=async(e,a)=>{confirm(`Suspender ${a}?`)&&(await s.from("usuarios").update({admin_approved:!1}).eq("id",e),p("Empresa suspensa.","error"),await d())}}function y(t){const e=t.toLowerCase();f(r.filter(a=>{var n;return(a.nome||"").toLowerCase().includes(e)||(a.email||"").toLowerCase().includes(e)||(((n=a.empresas)==null?void 0:n.cnpj)||"").includes(e)}))}function i(){return"padding:12px 16px; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; color:#94A3B8; text-align:left; white-space:nowrap;"}function o(){return"padding:16px; font-size:14px; color:#1E293B; white-space:nowrap;"}function c(t){return`padding:6px 14px; border-radius:8px; background:${t}; color:white; border:none; font-size:12px; font-weight:600; cursor:pointer; font-family:'Inter',sans-serif;`}function b(t,e){return`
    <div style="height:100dvh; display:flex; background:#F8F9FD; font-family:'Inter',sans-serif; overflow:hidden;">
      <aside style="width:260px; background:#181C2E; color:white; display:flex; flex-direction:column; flex-shrink:0; overflow-y:auto;">
        <div style="padding:32px 24px 24px;">
          <div style="font-family:'Sora',sans-serif; font-size:20px; font-weight:800; color:#4F46E5; display:flex; align-items:center; gap:10px;">
            <div style="width:30px; height:30px; background:#4F46E5; border-radius:8px; display:flex; align-items:center; justify-content:center; color:white; font-size:14px; font-weight:800;">WW</div>
            WorkWork Admin
          </div>
        </div>
        <nav style="flex:1; padding:0 12px;">
          ${[{id:"admin-dashboard",icon:"📊",label:"Dashboard"},{id:"admin-profissionais",icon:"👤",label:"Profissionais"},{id:"admin-empresas",icon:"🏢",label:"Empresas"},{id:"admin-vagas",icon:"📋",label:"Vagas"},{id:"admin-aprovacoes",icon:"🔔",label:"Aprovações"},{id:"admin-logs",icon:"📜",label:"Logs"},{id:"admin-config",icon:"💎",label:"Assinaturas"},{id:"admin-relatorios",icon:"📈",label:"Relatórios"}].map(n=>`
            <button class="adm-nav-btn" data-screen="${n.id}" style="
              width:100%; padding:12px 16px; border-radius:10px; margin-bottom:2px;
              cursor:pointer; display:flex; align-items:center; gap:10px;
              font-weight:600; font-size:13px; border:none; transition:all 0.2s;
              background:${n.id===t?"#4F46E5":"transparent"};
              color:${n.id===t?"white":"rgba(255,255,255,0.55)"};
              text-align:left; font-family:'Inter',sans-serif;
            ">
              <span style="font-size:16px;">${n.icon}</span> ${n.label}
            </button>
          `).join("")}
          <div style="height:1px; background:rgba(255,255,255,0.1); margin:16px 8px;"></div>
          <button id="btnLogout" style="width:100%; padding:12px 16px; border-radius:10px; cursor:pointer; display:flex; align-items:center; gap:10px; font-weight:600; font-size:13px; border:none; background:transparent; color:rgba(255,255,255,0.4); text-align:left; font-family:'Inter',sans-serif;">
            <span style="font-size:16px;">🚪</span> Sair
          </button>
        </nav>
      </aside>
      <main style="flex:1; overflow-y:auto; padding:40px 48px;">${e}</main>
    </div>`}function h(){document.querySelectorAll(".adm-nav-btn").forEach(t=>{t.onclick=()=>l(t.dataset.screen)}),document.getElementById("btnLogout").onclick=async()=>{await s.auth.signOut(),l("login")}}export{w as render};
