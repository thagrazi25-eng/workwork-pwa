import{n as r,h as l,u as c,t as s,_ as x}from"./index-DEW-c385.js";async function m(t){t.innerHTML=`
    <div style="height:100dvh; display:flex; flex-direction:column; background:#F4F5F7;">
      <div id="perfilContent" style="flex:1; overflow-y:auto; padding-bottom: 80px;">
        <div style="text-align:center; padding:60px; color:#94A3B8;">Carregando...</div>
      </div>

      <!-- Bottom Nav fixa -->
      <div class="bottom-nav" style="
        background:white; border-top:1px solid #E5E7EB;
        display:flex; justify-content:space-around; align-items:center;
        height:70px; padding-bottom:env(safe-area-inset-bottom);
        position:fixed; bottom:0; left:0; width:100%;
        z-index: 100;
      ">
        <button id="navHome" style="${a(!1)}">
          <span style="font-size:22px;">🏠</span><span style="font-size:11px;">Início</span>
        </button>
        <button onclick="window.navegar('chat')" style="${a(!1)}">
          <span style="font-size:22px;">💬</span><span style="font-size:11px;">Chat</span>
        </button>
        <button style="${a(!0)}">
          <span style="font-size:22px;">👤</span><span style="font-size:11px;">Perfil</span>
        </button>
      </div>
    </div>
  `,window.navegar=r;try{const o=await l();window._tipoUser=o==null?void 0:o.tipo,document.getElementById("navHome").onclick=()=>r((o==null?void 0:o.tipo)==="empresa"?"home-emp":"home-prof"),(o==null?void 0:o.tipo)==="empresa"?b(o):g(o),u()}catch{document.getElementById("perfilContent").innerHTML='<p style="color:#EF4444; text-align:center; padding:40px;">Erro ao carregar perfil</p>'}}function g(t){var e,n;const o=((e=t.profissionais)==null?void 0:e[0])||{},i=t.nome?t.nome.substring(0,2).toUpperCase():"👤";document.getElementById("perfilContent").innerHTML=`
    <div style="background:white; display: flex; flex-direction: column; align-items: center; padding-top: 60px; padding-bottom: 24px; position: relative;">
      
      <!-- Avatar -->
      <div style="position:relative; display:inline-block; margin-bottom: 16px;">
        <div id="avatarCircle" style="width: 100px; height: 100px; border-radius: 50%; background: #EEF2FF; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 700; color: #4F46E5; overflow:hidden; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          ${t.avatar_url?`<img src="${t.avatar_url}" style="width:100%;height:100%;object-fit:cover;" />`:i}
        </div>
        <button id="btnTrocarAvatar" style="position:absolute; bottom:0; right:0; width:32px; height:32px; border-radius:50%; background:#4F46E5; border:2px solid white; cursor:pointer; font-size:14px; color:white; display:flex; align-items:center; justify-content:center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">📷</button>
        <input id="inputAvatar" type="file" accept="image/*" style="display:none;" />
      </div>

      <h2 style="font-family:'Sora',sans-serif; font-size: 22px; font-weight: 700; margin-bottom: 4px; color: #111827;">${t.nome}</h2>
      <p style="color: #64748B; font-size: 14px; margin-bottom: 16px;">${o.nicho||"Profissional"} • ${t.telefone||"Sem local"}</p>
      
      <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 24px;">
        <span style="color: #F59E0B; font-size: 18px;">★</span>
        <span style="font-weight: 600; color:#111827;">4.9</span>
        <span style="color: #64748B; font-size: 14px;">(Novo)</span>
      </div>

      <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-bottom: 16px;">
        <span style="background: #ECFDF5; color: #10B981; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600;">Aprovado</span>
        <span style="background: #F3F4F6; color: #4B5563; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600;">${(n=o.disponibilidade_dias)!=null&&n.length?o.disponibilidade_dias.length+" dias":"Horários flexíveis"}</span>
        <span style="background: #F3F4F6; color: #4B5563; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600;">Raio: ${o.raio_atendimento||20}km</span>
      </div>
      
      <button style="background:white; border:1px solid #E5E7EB; color:#111827; padding: 10px 20px; font-size: 13px; font-weight:600; border-radius: 30px; display: flex; align-items: center; gap: 8px; cursor:pointer;" onclick="alert('Funcionalidade de editar em desenvolvimento. Logo você poderá alterar seus serviços!')">
        <span>✏️</span> Configurações e Serviços
      </button>
    </div>

    <!-- Status Toggle -->
    <div style="background:white; padding:16px 24px; border-top:1px solid #E5E7EB; border-bottom:1px solid #E5E7EB; display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <span style="font-size: 15px; font-weight: 500; color: #111827;">Status: <strong style="color: #10B981;">Online</strong></span>
      <div style="width:44px; height:24px; background:#10B981; border-radius:12px; position:relative; cursor:pointer;">
        <div style="width:20px; height:20px; background:white; border-radius:10px; position:absolute; top:2px; right:2px;"></div>
      </div>
    </div>

    <!-- Tabs -->
    <div style="display:flex; background:white; border-bottom:1px solid #E5E7EB;">
      <div style="flex:1; text-align:center; padding:16px; font-weight:600; color:#4F46E5; border-bottom:2px solid #4F46E5; cursor:pointer;">Sobre</div>
      <div style="flex:1; text-align:center; padding:16px; font-weight:500; color:#64748B; cursor:pointer;">Portfólio</div>
      <div style="flex:1; text-align:center; padding:16px; font-weight:500; color:#64748B; cursor:pointer;">Avaliações</div>
    </div>

    <div style="padding: 24px;">
      <p style="color: #374151; font-size: 15px; line-height: 1.6; margin-bottom: 32px;">
        ${o.bio||"Adicione uma bio para contar mais sobre você e sua experiência para as empresas."}
      </p>

      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        ${(o.subcategorias||[]).map(d=>`
          <span style="background: #F3F4F6; color: #4B5563; padding: 6px 12px; border-radius: 20px; font-size: 13px; font-weight: 500;">${d}</span>
        `).join("")}
      </div>

      <div style="margin-top: 48px; text-align: center; padding-bottom: 40px;">
        <button id="btnSair" style="background:none; border:none; color: #EF4444; font-weight: 600; font-size: 15px; cursor: pointer; display:block; width:100%; padding:16px; margin-bottom:12px;">Sair da conta</button>
      </div>
    </div>
  `,document.getElementById("btnSair").onclick=p}function b(t){var e;const o=((e=t.empresas)==null?void 0:e[0])||{},i=t.nome?t.nome.substring(0,2).toUpperCase():"🏢";document.getElementById("perfilContent").innerHTML=`
    <div style="background:white; display: flex; flex-direction: column; align-items: center; padding-top: 60px; padding-bottom: 24px; position: relative; border-bottom:1px solid #E5E7EB;">
      
      <!-- Avatar -->
      <div style="position:relative; display:inline-block; margin-bottom: 16px;">
        <div id="avatarCircle" style="width: 100px; height: 100px; border-radius: 20px; background: #EEF2FF; display: flex; align-items: center; justify-content: center; font-size: 40px; font-weight: 700; color: #4F46E5; overflow:hidden; border: 1px solid #E5E7EB; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          ${t.avatar_url?`<img src="${t.avatar_url}" style="width:100%;height:100%;object-fit:cover;" />`:i}
        </div>
        <button id="btnTrocarAvatar" style="position:absolute; bottom:-10px; right:-10px; width:32px; height:32px; border-radius:50%; background:#4F46E5; border:2px solid white; cursor:pointer; font-size:14px; color:white; display:flex; align-items:center; justify-content:center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">📷</button>
        <input id="inputAvatar" type="file" accept="image/*" style="display:none;" />
      </div>

      <h2 style="font-family:'Sora',sans-serif; font-size: 22px; font-weight: 700; margin-bottom: 4px; color: #111827;">${o.razao_social||t.nome}</h2>
      <p style="color: #64748B; font-size: 14px; margin-bottom: 24px;">CNPJ: ${o.cnpj||"Não informado"}</p>
      
      <button style="background:white; border:1px solid #E5E7EB; color:#111827; padding: 10px 20px; font-size: 13px; font-weight:600; border-radius: 30px; display: flex; align-items: center; gap: 8px; cursor:pointer;" onclick="alert('Configurações em breve!')">
        <span>⚙️</span> Configurações da Empresa
      </button>
    </div>

    <div style="padding: 24px;">
       <h3 style="font-size: 18px; font-weight: 700; color:#111827; margin-bottom: 16px;">Dados de Contato</h3>
       
       <div style="margin-bottom: 12px; padding: 16px; border-radius: 12px; background: white; border: 1px solid #E5E7EB;">
          <p style="font-size: 12px; color: #64748B; margin-bottom: 4px; text-transform: uppercase; font-weight: 600;">E-mail Corporativo</p>
          <p style="font-size: 15px; font-weight: 500; color:#111827;">${t.email}</p>
       </div>
       <div style="margin-bottom: 12px; padding: 16px; border-radius: 12px; background: white; border: 1px solid #E5E7EB;">
          <p style="font-size: 12px; color: #64748B; margin-bottom: 4px; text-transform: uppercase; font-weight: 600;">Telefone</p>
          <p style="font-size: 15px; font-weight: 500; color:#111827;">${t.telefone||"(Não informado)"}</p>
       </div>
       <div style="padding: 16px; border-radius: 12px; background: white; border: 1px solid #E5E7EB;">
          <p style="font-size: 12px; color: #64748B; margin-bottom: 4px; text-transform: uppercase; font-weight: 600;">Localização</p>
          <p style="font-size: 15px; font-weight: 500; color:#111827;">${o.cidade||"Não informada"}</p>
       </div>

       <div style="margin-top: 40px; text-align: center;">
          <button id="btnSair" style="background:none; border:none; color: #EF4444; font-weight: 600; font-size: 15px; cursor: pointer; display:block; width:100%; padding:16px;">Sair da conta</button>
       </div>
    </div>
  `,document.getElementById("btnSair").onclick=p}function u(){const t=document.getElementById("btnTrocarAvatar"),o=document.getElementById("inputAvatar");t&&o&&(t.onclick=()=>o.click(),o.onchange=async i=>{const e=i.target.files[0];if(e)try{t.innerHTML="⏳";const n=await c(e);document.getElementById("avatarCircle").innerHTML=`<img src="${n}?t=${Date.now()}" style="width:100%;height:100%;object-fit:cover;" />`,t.innerHTML="📷",s("Foto atualizada!","success")}catch{t.innerHTML="📷",s("Erro ao enviar foto","error")}})}async function p(){const{supabase:t}=await x(async()=>{const{supabase:o}=await import("./index-DEW-c385.js").then(i=>i.i);return{supabase:o}},[]);await t.auth.signOut(),r("login")}const a=t=>`
  display:flex; flex-direction:column; align-items:center; gap:3px;
  background:none; border:none; cursor:pointer; padding:8px 16px;
  color:${t?"#4F46E5":"#9CA3AF"}; font-family:'Inter',sans-serif;
  font-weight:${t?"600":"500"};
`;export{m as render};
