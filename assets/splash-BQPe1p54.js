import{_ as x,n as o}from"./index-yvVyeKFo.js";function u(e,i={}){if(i.aguardandoAprovacao){e.innerHTML=`
      <div style="
        display:flex; flex-direction:column; align-items:center;
        justify-content:center; height:100%; padding:40px;
        background:#F4F5F7; text-align:center; gap:20px;
        font-family:'Inter', sans-serif;
      ">
        <div style="font-size:64px; margin-bottom:4px;">⏳</div>
        <h2 style="font-size:24px; font-weight:800; color:#111827;">Documentos em Análise</h2>
        <p style="color:#64748B; font-size:15px; max-width:280px; line-height:1.6;">
          Recebemos seus dados e documentos! Nossa equipe está validando seu perfil.<br><br>
          Esse processo leva até <strong>24 horas</strong>. Assim que for aprovado, seu aplicativo será liberado.
        </p>
        <button id="btnSair" style="
          margin-top:16px; padding:14px 32px;
          background:none; border:1.5px solid #D1D5DB;
          border-radius:12px; font-size:15px; font-weight:600;
          color:#64748B; cursor:pointer;
        ">Sair da conta</button>
      </div>
    `,document.getElementById("btnSair").onclick=async()=>{const{supabase:t}=await x(async()=>{const{supabase:s}=await import("./index-yvVyeKFo.js").then(a=>a.i);return{supabase:s}},[]);await t.auth.signOut(),o("login")};return}if(i.escolhaPerfil){c(e);return}e.innerHTML=`
    <div style="
      width:100%; height:100%;
      background:#F4F5F7;
      display:flex; flex-direction:column;
      overflow:hidden; position:relative;
      font-family:'Inter', sans-serif;
    ">
      <!-- Slides -->
      <div style="flex:1; overflow:hidden; position:relative; margin-top:64px;">
        <div id="splashSlides" style="
          display:flex; width:300%; height:100%;
          transition:transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        ">
          <!-- Slide 1: Logo -->
          <div class="splash-slide">
            <div style="
              width:120px; height:120px; background:#4F46E5; border-radius:28px;
              display:flex; align-items:center; justify-content:center;
              margin:0 auto 32px;
              box-shadow:0 12px 30px rgba(79,70,229,0.25);
            ">
              <span style="color:white; font-size:56px; font-weight:800; letter-spacing:-2px;">WW</span>
            </div>
            <div style="font-size:32px; font-weight:800; color:#4F46E5; letter-spacing:-1px; margin-bottom:12px;">WorkWork</div>
            <p style="font-size:16px; color:#4B5563; line-height:1.5; text-align:center;">Conectando quem faz a quem precisa</p>
          </div>

          <!-- Slide 2: Profissionais -->
          <div class="splash-slide">
            <div style="font-size:80px; margin-bottom:24px;">👷‍♂️</div>
            <div style="font-size:24px; font-weight:800; color:#4F46E5; letter-spacing:-0.5px; margin-bottom:12px; text-align:center;">Para Profissionais</div>
            <p style="font-size:16px; color:#4B5563; line-height:1.5; text-align:center;">Ofereça seus serviços e encontre novos clientes na sua região com segurança.</p>
          </div>

          <!-- Slide 3: Empresas -->
          <div class="splash-slide">
            <div style="font-size:80px; margin-bottom:24px;">🏢</div>
            <div style="font-size:24px; font-weight:800; color:#4F46E5; letter-spacing:-0.5px; margin-bottom:12px; text-align:center;">Para Empresas</div>
            <p style="font-size:16px; color:#4B5563; line-height:1.5; text-align:center;">Contrate os melhores talentos avaliados para sua obra ou projeto.</p>
          </div>
        </div>
      </div>

      <!-- Dots -->
      <div style="display:flex; justify-content:center; gap:8px; margin:16px 0;">
        <div class="splash-dot active-splash-dot" data-i="0"></div>
        <div class="splash-dot" data-i="1"></div>
        <div class="splash-dot" data-i="2"></div>
      </div>

      <!-- Botões de Navegação (slides 1 e 2) -->
      <div id="splashNavBtns" style="position:absolute; bottom:40px; left:24px; right:24px; display:flex; flex-direction:column; gap:16px;">
        <button id="btnProx" style="
          background:#4F46E5; color:white; border:none;
          padding:16px; border-radius:12px;
          font-weight:600; font-size:16px; cursor:pointer;
          font-family:'Inter',sans-serif; width:100%;
        ">Próximo</button>
        <a href="#" id="btnPular" style="
          text-align:center; color:#4B5563; font-size:14px;
          font-weight:500; text-decoration:none; display:block;
        ">Pular apresentação</a>
      </div>

      <!-- Botões de Ação Final (slide 3) -->
      <div id="splashActionBtns" style="position:absolute; bottom:40px; left:24px; right:24px; display:none; flex-direction:column; gap:16px;">
        <button id="btnCadastrar" style="
          background:#4F46E5; color:white; border:none;
          padding:16px; border-radius:12px;
          font-weight:600; font-size:16px; cursor:pointer;
          font-family:'Inter',sans-serif; width:100%;
        ">Criar minha conta</button>
        <a href="#" id="btnEntrar" style="
          text-align:center; color:#3730A3; font-size:14px;
          font-weight:600; text-decoration:none; display:block;
        ">já tenho conta — entrar</a>
      </div>
    </div>

    <style>
      .splash-slide {
        width:33.333%; flex-shrink:0;
        display:flex; flex-direction:column;
        align-items:center; justify-content:center;
        padding:24px; box-sizing:border-box; overflow:hidden;
      }
      .splash-dot {
        width:8px; height:8px; border-radius:4px;
        background:#D1D5DB; cursor:pointer; transition:all 0.3s;
      }
      .active-splash-dot {
        width:24px; border-radius:4px; background:#4F46E5;
      }
    </style>
  `;let r=0;const f=document.getElementById("splashSlides"),l=document.querySelectorAll(".splash-dot"),d=document.getElementById("splashNavBtns"),p=document.getElementById("splashActionBtns");function n(t){r=t,f.style.transform=`translateX(-${t*33.333}%)`,l.forEach((s,a)=>{s.className=a===t?"splash-dot active-splash-dot":"splash-dot"}),t===2?(d.style.display="none",p.style.display="flex"):(d.style.display="flex",p.style.display="none")}l.forEach(t=>t.onclick=()=>n(parseInt(t.dataset.i))),document.getElementById("btnProx").onclick=()=>n(Math.min(r+1,2)),document.getElementById("btnPular").onclick=t=>{t.preventDefault(),n(2)},document.getElementById("btnCadastrar").onclick=()=>c(e),document.getElementById("btnEntrar").onclick=t=>{t.preventDefault(),o("login")}}function c(e){e.innerHTML=`
    <div style="
      height:100%; background:#F4F5F7;
      display:flex; flex-direction:column;
      padding:48px 24px; font-family:'Inter', sans-serif;
      justify-content:center;
    ">
      <h2 style="font-size:28px; font-weight:700; color:#111827; margin-bottom:40px; line-height:1.3;">
        Como você quer usar o WorkWork?
      </h2>

      <div style="display:flex; flex-direction:column; gap:16px;">
        <button id="btnSouProf" style="
          background:#4F46E5; color:white; border:none;
          padding:20px; border-radius:12px;
          text-align:left; cursor:pointer; font-family:'Inter',sans-serif;
          transition:transform 0.1s;
        ">
          <div style="font-weight:700; font-size:18px; margin-bottom:4px;">Sou profissional</div>
          <div style="font-size:13px; font-weight:400; opacity:0.9;">quero oferecer meus serviços</div>
        </button>

        <button id="btnSouEmp" style="
          background:transparent; color:#4F46E5;
          border:1px solid #D1D5DB;
          padding:20px; border-radius:12px;
          text-align:left; cursor:pointer; font-family:'Inter',sans-serif;
          transition:transform 0.1s;
        ">
          <div style="font-weight:700; font-size:18px; margin-bottom:4px; color:#111827;">Sou empresa</div>
          <div style="font-size:13px; font-weight:400; color:#4B5563;">quero contratar profissionais</div>
        </button>
      </div>

      <div style="position:absolute; bottom:40px; left:0; width:100%; text-align:center;">
        <a href="#" id="btnJaTenho" style="color:#3730A3; font-size:14px; font-weight:600; text-decoration:none;">
          já tenho conta — entrar
        </a>
      </div>
    </div>
  `,document.getElementById("btnSouProf").onclick=()=>o("cadastro-prof"),document.getElementById("btnSouEmp").onclick=()=>o("cadastro-emp"),document.getElementById("btnJaTenho").onclick=i=>{i.preventDefault(),o("login")}}export{u as render};
