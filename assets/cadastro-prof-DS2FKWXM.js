import{n as u,t as c,_ as h,c as x}from"./index-BMRtjzvn.js";let s=1;const e={nome:"",email:"",telefone:"",senha:"",bio:"",nicho:null,subcategorias:[],raio:20,dias_semana:[],horarios:[],avatarFile:null,avatarPreview:null,docFile:null,selfieFile:null},y=[{emoji:"🧱",nome:"Pedreiro",tag:"Construção / Reforma",subs:["Geral","Acabamento","Alvenaria","Revestimento"]},{emoji:"⚡",nome:"Eletricista",tag:"Instalação / Manutenção",subs:["Residencial","Predial","Industrial","Automação"]},{emoji:"🔧",nome:"Encanador / Hidráulica",tag:"Reparos Hidráulicos",subs:["Reparo de Vazamentos","Instalação Nova","Desentupimento"]},{emoji:"🖌️",nome:"Pintor",tag:"Pintura",subs:["Residencial","Comercial","Texturização","Gesso / Drywall"]},{emoji:"🧹",nome:"Limpeza / Diarista",tag:"Faxina",subs:["Pontual","Semanal","Quinzenal","Mensal"]},{emoji:"🌿",nome:"Jardineiro / Paisagista",tag:"Paisagismo",subs:["Manutenção","Poda","Plantio","Irrigação"]},{emoji:"🪵",nome:"Marceneiro / Carpinteiro",tag:"Móveis / Madeira",subs:["Móveis Planejados","Reparo","Deck","Portas / Janelas"]},{emoji:"🛡️",nome:"Vigilante / Segurança",tag:"Proteção",subs:["Diurno","Noturno","12x36","Portaria"]},{emoji:"🚗",nome:"Motorista / Entregador",tag:"Transporte",subs:["Moto","Carro","Van","Caminhão"]},{emoji:"🤲",nome:"Cuidador de Idosos / Crianças",tag:"Cuidados Pessoais",subs:["Idoso","Criança","PCD","Hospitalar"]},{emoji:"🏭",nome:"Auxiliar de Produção",tag:"Indústria / Logística",subs:["Alimentício","Montagem","Embalagem","Estoque"]},{emoji:"🏗️",nome:"Aux. Serviços Gerais",tag:"Apoio Operacional",subs:["Condomínio","Escritório","Obra","Shopping"]},{emoji:"🍳",nome:"Cozinheiro / Auxiliar de Coz.",tag:"Gastronomia",subs:["Eventos","Fixo","Diarista","Fast Food"]},{emoji:"💻",nome:"Técnico de TI / Informática",tag:"Suporte Técnico",subs:["Manutenção de PC","Redes","CFTV","Software"]},{emoji:"💆",nome:"Esteticista / Massagista",tag:"Beleza e Bem-estar",subs:["Massagem","Depilação","Estética Facial","Unhas"]},{emoji:"➕",nome:"Outros",tag:"Personalizado",subs:["Digitar manual..."]}];function E(r){s=1,d(r)}function d(r){r.innerHTML=`
    <div style="height:100%; background:#F4F5F7; display:flex; flex-direction:column; padding:60px 32px 40px;">
      
      <button id="btnVoltar" style="background:none; border:none; cursor:pointer; color:#64748B; font-size:15px; font-weight:600; text-align:left; padding:0; margin-bottom:28px; width:fit-content;">
        ← Voltar
      </button>

      <div style="display:flex; gap:8px; margin-bottom:28px;">
        ${[1,2,3,4].map(i=>`
          <div style="flex:1; height:5px; border-radius:3px; background:${i<=s?"#4F46E5":"#E5E7EB"};"></div>
        `).join("")}
      </div>

      <div id="etapaContent" style="flex:1; overflow-y:auto; margin-bottom:20px;"></div>

      <div style="margin-top:auto; padding-top:24px; background:linear-gradient(to top, #F4F5F7 80%, transparent); margin: 0 -32px; padding: 24px 32px 0;">
        <button id="btnAvancar" style="
          width:100%; padding:16px; border-radius:14px;
          background:#4F46E5; color:white; border:none;
          font-size:16px; font-weight:700; cursor:pointer;
          font-family:'Inter',sans-serif;
          transition: transform 0.1s;
        ">${s===4?"Enviar e Criar Conta":"Continuar"}</button>
      </div>
    </div>
  `;const m=document.getElementById("etapaContent");if(s===1){m.innerHTML=`
      <h2 style="font-size:24px; font-weight:800; color:#111827; margin-bottom:6px;">Seus dados</h2>
      <p style="color:#64748B; font-size:15px; margin-bottom:28px;">Etapa 1 de 4 — Informações básicas</p>

      <div style="display:flex; justify-content:center; margin-bottom:24px;">
        <div style="position:relative;">
          <div id="btnFotoReg" style="width:80px; height:80px; border-radius:40px; background:#F3F4F6; border:1px dashed #D1D5DB; display:flex; align-items:center; justify-content:center; font-size:24px; color:#9CA3AF; cursor:pointer; overflow:hidden;">
            ${e.avatarPreview?`<img src="${e.avatarPreview}" style="width:100%;height:100%;object-fit:cover;">`:"📷"}
          </div>
          <input type="file" id="inpFotoReg" accept="image/*" style="display:none;" />
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:16px;">
        <input id="nome"     placeholder="Seu nome completo" value="${e.nome}"     style="${p()}" />
        <input id="email"    placeholder="E-mail"            value="${e.email}"    type="email" style="${p()}" />
        <input id="telefone" placeholder="Telefone (DDD + número)" value="${e.telefone}" style="${p()}" />
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <label style="font-size:13px; font-weight:600; color:#1E293B;">Sobre mim (Biografia)</label>
            <button id="btnGerarIA" style="background:none; border:none; color:#4F46E5; font-size:13px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:4px; padding:0;">
              ✨ Gerar com IA
            </button>
          </div>
          <textarea id="bio" placeholder="Fale um pouco sobre sua experiência... (Opcional)" style="${p()} resize:none; height:100px;">${e.bio||""}</textarea>
        </div>
        <input id="senha"    placeholder="Senha (mín. 6 caracteres)" type="password"     style="${p()}" />
      </div>
    `;const i=document.getElementById("btnFotoReg"),o=document.getElementById("inpFotoReg");i&&o&&(i.onclick=()=>o.click(),o.onchange=a=>{const n=a.target.files[0];n&&(e.avatarFile=n,e.avatarPreview=URL.createObjectURL(n),i.innerHTML=`<img src="${e.avatarPreview}" style="width:100%;height:100%;object-fit:cover;">`)});const t=document.getElementById("btnGerarIA");t&&(t.onclick=()=>{const a=document.getElementById("nome").value.trim()||"Profissional",n=document.getElementById("bio");t.innerHTML="⏳ Gerando...",setTimeout(()=>{n.value=`Olá! Meu nome é ${a} e sou um profissional dedicado e detalhista, sempre focado em entregar o melhor resultado para meus clientes. Tenho experiência prática e busco sempre aprimorar minhas habilidades. Estou à disposição para ajudar no que for preciso!`,t.innerHTML="✨ Gerar com IA"},1200)})}else if(s===2)m.innerHTML=`
      <h2 style="font-size:24px; font-weight:800; color:#111827; margin-bottom:6px;">Sua área</h2>
      <p style="color:#64748B; font-size:15px; margin-bottom:24px;">Etapa 2 de 4 — Qual é o seu trabalho?</p>

      <div id="nichos-container">
        ${y.map(i=>`
          <div class="niche-card ${e.nicho===i.nome?"selected":""}" data-nicho="${i.nome}">
            <div class="niche-header">
              <span class="niche-icon">${i.emoji}</span>
              <div class="niche-label">
                <p class="niche-name">${i.nome}</p>
                <span style="display:inline-block; padding:4px 10px; background:${e.nicho===i.nome?"rgba(79, 70, 229, 0.15)":"#E5E7EB"}; color:${e.nicho===i.nome?"#3730A3":"#64748B"}; font-size:11px; font-weight:600; border-radius:12px; margin-top:4px;">
                  ${i.tag}
                </span>
              </div>
              <div class="radio-circle">
                <div class="radio-dot"></div>
              </div>
            </div>
            
            ${e.nicho===i.nome?`
              <div class="specs-panel">
                <p class="spec-group-title">Especialidades (Opcional)</p>
                <div class="spec-options">
                  ${i.subs.map(o=>`
                    <div class="spec-chip ${e.subcategorias.includes(o)?"active":""}" data-sub="${o}">${o}</div>
                  `).join("")}
                </div>
              </div>
            `:""}
          </div>
        `).join("")}
      </div>
    `,document.querySelectorAll(".niche-header").forEach(i=>{i.onclick=()=>{const o=i.closest(".niche-card").dataset.nicho;e.nicho!==o&&(e.nicho=o,e.subcategorias=[],d(r))}}),document.querySelectorAll(".spec-chip").forEach(i=>{i.onclick=o=>{o.stopPropagation();const t=i.dataset.sub;e.subcategorias.includes(t)?e.subcategorias=e.subcategorias.filter(a=>a!==t):e.subcategorias.push(t),d(r)}});else if(s===3){m.innerHTML=`
      <h2 style="font-size:24px; font-weight:800; color:#111827; margin-bottom:6px;">Área e Disponibilidade</h2>
      <p style="color:#64748B; font-size:15px; margin-bottom:24px;">Até qual distância e quando você pode trabalhar?</p>

      <label style="display:block; font-size:13px; font-weight:600; color:#111827; margin-bottom:8px;">Raio de Atendimento</label>
      <div style="background:white; border:1px solid #D1D5DB; border-radius:16px; padding:16px; margin-bottom:24px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:14px; font-weight:600; color:#3730A3;">
          <span>Distância Máxima</span>
          <span id="raioDisplay">${e.raio} km</span>
        </div>
        <input type="range" min="1" max="100" value="${e.raio}" id="inpRaio" style="width:100%; accent-color:#4F46E5;">
      </div>

      <label style="display:block; font-size:13px; font-weight:600; color:#111827; margin-bottom:8px;">Dias da semana</label>
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px;">
        ${["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"].map(o=>`
          <div class="dia-chip ${e.dias_semana.includes(o)?"active":""}" data-dia="${o}" style="
            padding:8px 16px; border-radius:20px; font-size:14px; font-weight:500; cursor:pointer; transition:all 0.15s;
            ${e.dias_semana.includes(o)?"background:#EEF2FF; color:#4F46E5; border:1.5px solid #4F46E5;":"background:white; color:#4B5563; border:1px solid #D1D5DB;"}
          ">${o}</div>
        `).join("")}
      </div>

      <label style="display:block; font-size:13px; font-weight:600; color:#111827; margin-bottom:8px;">Horário preferencial</label>
      <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:16px;">
        ${[["☀️","Manhã","06h - 12h"],["☁️","Tarde","12h - 18h"],["🌙","Noite","18h - 22h"]].map(([o,t,a])=>`
          <div class="hora-card ${e.horarios.includes(t)?"active":""}" data-hora="${t}" style="
            display:flex; align-items:center; gap:16px; padding:16px; border-radius:16px; cursor:pointer; transition:all 0.2s;
            ${e.horarios.includes(t)?"background:#EEF2FF; border:1.5px solid #4F46E5;":"background:white; border:1px solid #D1D5DB;"}
          ">
            <span style="font-size:24px;">${o}</span>
            <div style="flex:1;">
              <p style="font-weight:600; font-size:15px; color:#111827; margin-bottom:2px;">${t}</p>
              <p style="font-size:13px; color:#64748B;">${a}</p>
            </div>
            <div style="width:20px; height:20px; border-radius:50%; display:flex; align-items:center; justify-content:center;
              ${e.horarios.includes(t)?"border:6px solid #4F46E5; background:white;":"border:2px solid #D1D5DB;"}
            "></div>
          </div>
        `).join("")}
      </div>
    `;const i=document.getElementById("inpRaio");i&&(i.oninput=o=>{e.raio=o.target.value,document.getElementById("raioDisplay").textContent=`${e.raio} km`}),document.querySelectorAll(".dia-chip").forEach(o=>{o.onclick=()=>{const t=o.dataset.dia;e.dias_semana.includes(t)?e.dias_semana=e.dias_semana.filter(a=>a!==t):e.dias_semana.push(t),d(r)}}),document.querySelectorAll(".hora-card").forEach(o=>{o.onclick=()=>{const t=o.dataset.hora;e.horarios.includes(t)?e.horarios=e.horarios.filter(a=>a!==t):e.horarios.push(t),d(r)}})}else if(s===4){m.innerHTML=`
      <h2 style="font-size:24px; font-weight:800; color:#111827; margin-bottom:6px;">Verificação (KYC)</h2>
      <p style="color:#64748B; font-size:15px; margin-bottom:24px;">Etapa 4 de 4 — Segurança da Plataforma</p>
      
      <p style="color:#4B5563; font-size:14px; margin-bottom:24px; line-height:1.5;">
        Para garantir a segurança de todos, precisamos de uma foto do seu documento e uma selfie sua.
      </p>

      <div style="display:flex; flex-direction:column; gap:16px;">
        <!-- Card Documento -->
        <div id="cardDoc" style="background:white; border:1px dashed #4F46E5; border-radius:16px; padding:24px; text-align:center; cursor:pointer; transition:all 0.2s;">
          <div id="statusDoc">
            <div style="font-size:32px; margin-bottom:8px;">🪪</div>
            <h3 style="font-size:16px; font-weight:600; color:#111827; margin-bottom:4px;">Foto do RG ou CNH</h3>
            <p style="font-size:13px; color:#64748B;">Frente e Verso legível</p>
          </div>
          <input type="file" id="inpDoc" accept="image/*" style="display:none;" />
        </div>

        <!-- Card Selfie -->
        <div id="cardSelfie" style="background:white; border:1px dashed #4F46E5; border-radius:16px; padding:24px; text-align:center; cursor:pointer; transition:all 0.2s;">
          <div id="statusSelfie">
            <div style="font-size:32px; margin-bottom:8px;">🤳</div>
            <h3 style="font-size:16px; font-weight:600; color:#111827; margin-bottom:4px;">Selfie com o documento</h3>
            <p style="font-size:13px; color:#64748B;">Rosto nítido em local iluminado</p>
          </div>
          <input type="file" id="inpSelfie" accept="image/*" style="display:none;" />
        </div>
      </div>
    `;const i=document.getElementById("inpDoc"),o=document.getElementById("cardDoc");o&&i&&(o.onclick=()=>i.click(),i.onchange=n=>{const l=n.target.files[0];l&&(e.docFile=l,o.style.border="2px solid #10B981",o.style.backgroundColor="#ECFDF5",document.getElementById("statusDoc").innerHTML=`
            <div style="font-size:32px; margin-bottom:8px;">✅</div>
            <h3 style="font-size:16px; font-weight:600; color:#065F46;">Documento Anexado</h3>
            <p style="font-size:13px; color:#065F46;">${l.name}</p>
          `)});const t=document.getElementById("inpSelfie"),a=document.getElementById("cardSelfie");a&&t&&(a.onclick=()=>t.click(),t.onchange=n=>{const l=n.target.files[0];l&&(e.selfieFile=l,a.style.border="2px solid #10B981",a.style.backgroundColor="#ECFDF5",document.getElementById("statusSelfie").innerHTML=`
            <div style="font-size:32px; margin-bottom:8px;">✅</div>
            <h3 style="font-size:16px; font-weight:600; color:#065F46;">Selfie Anexada</h3>
            <p style="font-size:13px; color:#065F46;">${l.name}</p>
          `)})}document.getElementById("btnVoltar").onclick=()=>{s===1?u("splash"):(s--,d(r))},document.getElementById("btnAvancar").onclick=async()=>{if(s===1){if(e.nome=document.getElementById("nome").value.trim(),e.email=document.getElementById("email").value.trim(),e.telefone=document.getElementById("telefone").value.trim(),e.bio=document.getElementById("bio").value.trim(),e.senha=document.getElementById("senha").value,!e.nome||!e.email||!e.senha){c("Preencha todos os campos obrigatórios","error");return}if(e.senha.length<6){c("Senha deve ter pelo menos 6 caracteres","error");return}s=2,d(r)}else if(s===2){if(!e.nicho){c("Selecione sua área de atuação","error");return}s=3,d(r)}else if(s===3){if(e.dias_semana.length===0){c("Selecione pelo menos um dia","error");return}if(e.horarios.length===0){c("Selecione pelo menos um horário","error");return}s=4,d(r)}else{const i=document.getElementById("btnAvancar");i.textContent="Enviando Documentos...",i.disabled=!0;try{const{supabase:o,uploadAvatar:t,uploadDocumentoKYC:a}=await h(async()=>{const{supabase:l,uploadAvatar:g,uploadDocumentoKYC:f}=await import("./index-BMRtjzvn.js").then(b=>b.i);return{supabase:l,uploadAvatar:g,uploadDocumentoKYC:f}},[]);await x({nome:e.nome,email:e.email,senha:e.senha,telefone:e.telefone,meta:{bio:e.bio,nicho:e.nicho,subcategorias:e.subcategorias,raio:e.raio,dias_semana:e.dias_semana,horarios:e.horarios}});const n=[];e.avatarFile&&n.push(t(e.avatarFile)),e.docFile&&n.push(a(e.docFile,"documento")),e.selfieFile&&n.push(a(e.selfieFile,"selfie")),n.length&&await Promise.all(n),u("splash",{aguardandoAprovacao:!0})}catch(o){console.error("ERRO CADASTRO PROFISSIONAL:",o),c(o.message||"Erro ao criar conta. Veja o console.","error"),i.textContent="Enviar e Criar Conta",i.disabled=!1}}}}const p=()=>`
  width:100%; padding:14px 16px; border:1.5px solid #D1D5DB;
  border-radius:12px; font-size:15px; font-family:'Inter',sans-serif;
  background:white; outline:none; box-sizing:border-box; transition: border-color 0.2s;
`;export{E as render};
