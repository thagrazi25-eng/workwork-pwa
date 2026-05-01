import{n as g,t as u,_ as f,a as v}from"./index-DEW-c385.js";let n=1;const e={cnpj:"",razao_social:"",cidade:"",email:"",senha:"",telefone:"",nichos_buscados:[],plano:"basic",avatarFile:null,avatarPreview:null,docFile:null,selfieFile:null},h=["Pedreiro","Eletricista","Encanador / Hidráulica","Pintor","Limpeza / Diarista","Jardineiro","Marceneiro","Vigilante","Motorista / Entregador","Cuidador","Auxiliar de Produção","Serviços Gerais","Cozinheiro","Técnico de TI","Esteticista","Outros"],E=["São Paulo, SP","Rio de Janeiro, RJ","Brasília, DF","Salvador, BA","Fortaleza, CE","Belo Horizonte, MG","Manaus, AM","Curitiba, PR","Recife, PE","Porto Alegre, RS","Belém, PA","Goiânia, GO","Guarulhos, SP","Campinas, SP","São Luís, MA","Maceió, AL","Natal, RN","Teresina, PI","Campo Grande, MS","Florianópolis, SC","João Pessoa, PB","Ribeirão Preto, SP","Uberlândia, MG","Sorocaba, SP","Cuiabá, MT","Aracaju, SE","Joinville, SC","Londrina, PR","Juiz de Fora, MG","Porto Velho, RO","Vitória, ES","Niterói, RJ","Santos, SP"];function P(i){n=1,e.cnpj="",e.razao_social="",e.cidade="",e.email="",e.senha="",e.telefone="",e.nichos_buscados=[],e.avatarFile=null,e.avatarPreview=null,e.docFile=null,e.selfieFile=null,c(i)}function c(i){i.innerHTML=`
    <div style="height:100%; background:#F4F5F7; display:flex; flex-direction:column; font-family:'Inter',sans-serif;">

      <!-- Progress Bar -->
      <div style="background:white; padding:52px 24px 16px; flex-shrink:0; border-bottom:1px solid #E5E7EB;">
        <button id="btnVoltar" style="background:none; border:none; cursor:pointer; color:#64748B; font-size:15px; font-weight:600; padding:0; margin-bottom:20px; display:flex; align-items:center; gap:6px;">
          ← Voltar
        </button>
        <div style="display:flex; gap:8px;">
          ${[1,2,3,4].map(t=>`
            <div style="flex:1; height:6px; border-radius:3px; background:${t<=n?"#4F46E5":"#E5E7EB"};"></div>
          `).join("")}
        </div>
      </div>

      <!-- Content -->
      <div id="etapaContent" style="flex:1; overflow-y:auto; padding:24px 24px 140px;"></div>

      <!-- Bottom Fixed Button -->
      <div style="position:absolute; bottom:0; left:0; right:0; padding:24px; background:linear-gradient(to top, #F4F5F7 85%, transparent); z-index:10;">
        <button id="btnAvancar" style="
          width:100%; padding:16px; border-radius:12px;
          background:#4F46E5; color:white; border:none;
          font-size:16px; font-weight:600; cursor:pointer;
          font-family:'Inter',sans-serif;
        ">${n===4?"Salvar e Finalizar":"Continuar"}</button>
        ${n===4?`<button id="btnPularPagamento" style="
          width:100%; padding:12px; background:none; border:none;
          color:#64748B; font-size:14px; cursor:pointer; font-family:'Inter',sans-serif;
          margin-top:4px;
        ">Pular por enquanto e começar teste</button>`:""}
      </div>
    </div>
  `;const d=document.getElementById("etapaContent");w(d),z(i)}function w(i,d){if(n===1){i.innerHTML=`
      <h2 style="font-size:24px; font-weight:700; color:#111827; margin-bottom:24px;">Dados da empresa</h2>

      <div style="display:flex; justify-content:center; margin-bottom:24px;">
        <div id="btnFotoEmp" style="
          width:80px; height:80px; border-radius:20px;
          background:#F3F4F6; border:1px dashed #D1D5DB;
          display:flex; align-items:center; justify-content:center;
          font-size:32px; cursor:pointer; overflow:hidden;
        ">${e.avatarPreview?`<img src="${e.avatarPreview}" style="width:100%;height:100%;object-fit:cover;">`:"🏢"}</div>
        <input type="file" id="inpFotoEmp" accept="image/*" style="display:none;">
      </div>

      <div style="display:flex; flex-direction:column; gap:0;">

        <!-- CNPJ -->
        <div style="margin-bottom:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <label style="${p()}">CNPJ</label>
            <span id="cnpjStatus" style="font-size:12px; font-weight:700; display:none;"></span>
          </div>
          <div style="position:relative;">
            <input id="cnpj" type="text" placeholder="00.000.000/0000-00" maxlength="18" value="${e.cnpj}" style="${r()} padding-right:48px;">
            <div id="cnpjSpinner" style="display:none; position:absolute; right:16px; top:50%; transform:translateY(-50%); font-size:18px;">⏳</div>
          </div>
        </div>

        <!-- Razão Social -->
        <div style="margin-bottom:20px;">
          <label style="${p()}">Razão Social</label>
          <input id="razao_social" type="text" placeholder="Preenchido automaticamente pelo CNPJ" value="${e.razao_social}"
            style="${r()} background:#F3F4F6; color:#64748B;" readonly>
        </div>

        <!-- Cidade -->
        <div style="margin-bottom:20px;">
          <label style="${p()}">Cidade / UF</label>
          <input id="cidade" type="text" placeholder="🔍 Digite para buscar a cidade..." list="cidadesBR" value="${e.cidade}" style="${r()}">
          <datalist id="cidadesBR">${E.map(o=>`<option value="${o}">`).join("")}</datalist>
        </div>

        <!-- Telefone -->
        <div style="margin-bottom:20px;">
          <label style="${p()}">Telefone</label>
          <input id="telefone" type="tel" placeholder="(00) 00000-0000" value="${e.telefone}" style="${r()}">
        </div>

        <!-- E-mail -->
        <div style="margin-bottom:20px;">
          <label style="${p()}">E-mail Corporativo</label>
          <input id="email" type="email" placeholder="contato@suaempresa.com.br" value="${e.email}" style="${r()}">
        </div>

        <!-- Senha -->
        <div style="margin-bottom:20px;">
          <label style="${p()}">Senha (mín. 6 caracteres)</label>
          <input id="senha" type="password" placeholder="••••••••" style="${r()}">
        </div>
      </div>
    `;const t=document.getElementById("btnFotoEmp"),l=document.getElementById("inpFotoEmp");t.onclick=()=>l.click(),l.onchange=o=>{const a=o.target.files[0];a&&(e.avatarFile=a,e.avatarPreview=URL.createObjectURL(a),t.innerHTML=`<img src="${e.avatarPreview}" style="width:100%;height:100%;object-fit:cover;">`)},document.getElementById("cnpj").addEventListener("input",o=>{let a=o.target.value.replace(/\D/g,"");a=a.replace(/^(\d{2})(\d)/,"$1.$2"),a=a.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3"),a=a.replace(/\.(\d{3})(\d)/,".$1/$2"),a=a.replace(/(\d{4})(\d)/,"$1-$2"),o.target.value=a,a.replace(/\D/g,"").length===14&&$(a.replace(/\D/g,""))})}else n===2?(i.innerHTML=`
      <h2 style="font-size:24px; font-weight:700; color:#111827; margin-bottom:8px;">De quais profissionais você precisa?</h2>
      <p style="color:#64748B; font-size:14px; margin-bottom:24px;">Selecione quantas áreas desejar.</p>

      <input id="buscaNicho" type="text" placeholder="🔍 Buscar profissão ou área..." style="${r()} margin-bottom:16px;">

      <div id="nichosGrid" style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:32px;">
        ${h.map(t=>`
          <div class="chip-nicho ${e.nichos_buscados.includes(t)?"ativo":""}" data-nicho="${t}" style="
            padding:10px 16px; border-radius:30px;
            border:1px solid ${e.nichos_buscados.includes(t)?"#4F46E5":"#D1D5DB"};
            background:${e.nichos_buscados.includes(t)?"rgba(79,70,229,0.1)":"white"};
            color:${e.nichos_buscados.includes(t)?"#3730A3":"#111827"};
            font-size:14px; font-weight:500; cursor:pointer; transition:all 0.15s;
          ">${t}</div>
        `).join("")}
      </div>
    `,document.querySelectorAll(".chip-nicho").forEach(t=>{t.onclick=()=>{const l=t.dataset.nicho;e.nichos_buscados.includes(l)?(e.nichos_buscados=e.nichos_buscados.filter(o=>o!==l),t.style.borderColor="#D1D5DB",t.style.background="white",t.style.color="#111827",t.classList.remove("ativo")):(e.nichos_buscados.push(l),t.style.borderColor="#4F46E5",t.style.background="rgba(79,70,229,0.1)",t.style.color="#3730A3",t.classList.add("ativo"))}}),document.getElementById("buscaNicho").oninput=t=>{const l=t.target.value.toLowerCase();document.querySelectorAll(".chip-nicho").forEach(o=>{o.style.display=o.dataset.nicho.toLowerCase().includes(l)?"":"none"})}):n===3?i.innerHTML=`
      <h2 style="font-size:26px; font-weight:800; color:#111827; margin-bottom:8px; letter-spacing:-0.5px;">Escolha seu Plano</h2>
      <p style="color:#64748B; font-size:15px; margin-bottom:32px; line-height:1.4;">
        Libere o acesso total à plataforma e comece a contratar hoje mesmo.
      </p>

      <div style="
        border:2.5px solid #4F46E5; padding:32px 24px; border-radius:28px;
        background:white; box-shadow:0 20px 40px rgba(79,70,229,0.12);
        position:relative; overflow:visible;
      ">
        <!-- Badge trial -->
        <div style="
          position:absolute; top:-14px; left:24px;
          background:#059669; color:white;
          padding:6px 16px; border-radius:30px;
          font-size:12px; font-weight:800; text-transform:uppercase;
          box-shadow:0 8px 15px rgba(5,150,105,0.25);
          display:flex; align-items:center; gap:6px;
        ">🎁 7 Dias Grátis</div>

        <div style="text-align:center; margin-bottom:24px;">
          <div style="font-weight:800; font-size:22px; color:#111827; margin-bottom:8px;">Empresa Basic</div>
          <div style="display:flex; align-items:baseline; justify-content:center; gap:4px;">
            <span style="font-size:18px; font-weight:600; color:#64748B;">R$</span>
            <span style="font-size:48px; font-weight:900; color:#4F46E5; letter-spacing:-1px;">149,90</span>
            <span style="font-size:16px; font-weight:600; color:#64748B;">/mês</span>
          </div>
        </div>

        <div style="
          background:rgba(5,150,105,0.08); color:#059669;
          padding:12px; border-radius:12px;
          font-size:14px; font-weight:700; text-align:center;
          margin-bottom:24px; border:1px solid rgba(5,150,105,0.2);
        ">✦ Teste sem compromisso por 7 dias</div>

        <ul style="list-style:none; padding:0; font-size:15px; color:#111827; line-height:2.2;">
          <li style="display:flex; align-items:center; gap:10px;"><span style="color:#059669; font-weight:bold;">✓</span> Vagas ilimitadas</li>
          <li style="display:flex; align-items:center; gap:10px;"><span style="color:#059669; font-weight:bold;">✓</span> Busca de profissionais (KYC aprovados)</li>
          <li style="display:flex; align-items:center; gap:10px;"><span style="color:#059669; font-weight:bold;">✓</span> Chat em tempo real liberado</li>
          <li style="display:flex; align-items:center; gap:10px;"><span style="color:#059669; font-weight:bold;">✓</span> Suporte prioritário 24/7</li>
        </ul>
      </div>

      <p style="margin-top:24px; font-size:13px; color:#64748B; text-align:center; line-height:1.5;">
        A cobrança só será iniciada após o período de teste. Você pode cancelar a qualquer momento.
      </p>
    `:n===4&&(i.innerHTML=`
      <h2 style="font-size:24px; font-weight:700; color:#111827; margin-bottom:8px;">Dados de Pagamento</h2>
      <p style="color:#64748B; font-size:14px; margin-bottom:32px;">
        Opcional: Cadastre seu cartão agora para evitar interrupções após o teste grátis.
      </p>

      <div style="margin-bottom:20px;">
        <label style="${p()}">Número do Cartão</label>
        <input id="cartao" type="text" placeholder="0000 0000 0000 0000" maxlength="19" style="${r()}">
      </div>

      <div style="display:flex; gap:16px; margin-bottom:20px;">
        <div style="flex:1;">
          <label style="${p()}">Validade</label>
          <input id="validade" type="text" placeholder="MM/AA" maxlength="5" style="${r()}">
        </div>
        <div style="flex:1;">
          <label style="${p()}">CVV</label>
          <input id="cvv" type="text" placeholder="123" maxlength="4" style="${r()}">
        </div>
      </div>

      <div style="
        padding:16px; background:#F3F4F6; border-radius:16px;
        font-size:13px; color:#64748B; display:flex; gap:12px; align-items:center;
      ">
        <span style="font-size:20px;">🔒</span>
        Seus dados estão protegidos por criptografia de ponta a ponta.
      </div>
    `)}async function $(i){const d=document.getElementById("cnpjSpinner"),t=document.getElementById("cnpjStatus"),l=document.getElementById("razao_social"),o=document.getElementById("cidade");d.style.display="block";try{const a=await fetch(`https://brasilapi.com.br/api/cnpj/v1/${i}`);if(a.ok){const s=await a.json();l.value=s.razao_social||"",e.razao_social=l.value,s.municipio&&s.uf&&(o.value=`${s.municipio}, ${s.uf}`,e.cidade=o.value),t.textContent="✅ Encontrado",t.style.color="#059669",t.style.display="block"}else t.textContent="❌ Não encontrado",t.style.color="#DC2626",t.style.display="block"}catch(a){console.warn("CNPJ API error:",a)}finally{d.style.display="none"}}function z(i){document.getElementById("btnVoltar").onclick=()=>{n===1?g("splash",{escolhaPerfil:!0}):(n--,c(i))},document.getElementById("btnAvancar").onclick=async()=>{if(n===1){if(e.cnpj=document.getElementById("cnpj").value.trim(),e.razao_social=document.getElementById("razao_social").value.trim(),e.cidade=document.getElementById("cidade").value.trim(),e.email=document.getElementById("email").value.trim(),e.telefone=document.getElementById("telefone").value.trim(),e.senha=document.getElementById("senha").value,!e.cnpj||!e.razao_social||!e.email||!e.senha){u("Preencha todos os campos obrigatórios","error");return}if(e.senha.length<6){u("Senha deve ter pelo menos 6 caracteres","error");return}n=2,c(i)}else n===2?(n=3,c(i)):n===3?(n=4,c(i)):await m()};const d=document.getElementById("btnPularPagamento");d&&(d.onclick=()=>m())}async function m(i,d){var l;const t=document.getElementById("btnAvancar");t.textContent="Enviando...",t.disabled=!0;try{const{uploadAvatar:o,uploadDocumentoKYC:a}=await f(async()=>{const{uploadAvatar:y,uploadDocumentoKYC:x}=await import("./index-DEW-c385.js").then(b=>b.i);return{uploadAvatar:y,uploadDocumentoKYC:x}},[]);await v({razao_social:e.razao_social,cnpj:e.cnpj,email:e.email,senha:e.senha,telefone:e.telefone,cidade:e.cidade,plano:e.plano});const s=[];e.avatarFile&&s.push(o(e.avatarFile)),e.docFile&&s.push(a(e.docFile,"documento")),e.selfieFile&&s.push(a(e.selfieFile,"selfie")),s.length&&await Promise.all(s),g("splash",{aguardandoAprovacao:!0})}catch(o){console.error("ERRO CADASTRO EMPRESA:",o),u((l=o.message)!=null&&l.includes("already")?"E-mail já cadastrado":"Erro ao cadastrar empresa.","error"),t.textContent=n===4?"Salvar e Finalizar":"Continuar",t.disabled=!1}}const r=()=>`
  width:100%; padding:14px 16px; border:1px solid #D1D5DB;
  border-radius:12px; font-size:15px; font-family:'Inter',sans-serif;
  background:white; color:#111827; outline:none; box-sizing:border-box;
`,p=()=>"display:block; font-size:13px; font-weight:600; color:#111827; margin-bottom:8px;";export{P as render};
