// =======================================================
// Tela: Splash / Onboarding (Igual ao Protótipo Original)
// =======================================================
import { navegar } from '../main.js'

export function render(container, params = {}) {
  // Se voltou aqui após cadastro, mostra mensagem de aguardo
  if (params.aguardandoAprovacao) {
    container.innerHTML = `
      <div style="
        display: flex; flex-direction: column; align-items: center;
        justify-content: center; height: 100dvh; padding: 40px;
        background: #F4F5F7; text-align: center; gap: 20px;
        font-family: 'Inter', sans-serif;
      ">
        <div style="font-size: 56px;">⏳</div>
        <h2 style="font-size: 24px; font-weight: 800; color: #1E293B;">
          Cadastro em análise
        </h2>
        <p style="color: #64748B; font-size: 15px; max-width: 280px; line-height: 1.6;">
          Nossa equipe está verificando seus dados. Você será notificado assim que seu acesso for liberado.
        </p>
        <button id="btnSair" style="
          margin-top: 16px; padding: 14px 32px;
          background: none; border: 1.5px solid #D1D5DB;
          border-radius: 12px; font-size: 15px; font-weight: 600;
          color: #64748B; cursor: pointer;
        ">Sair</button>
      </div>
    `
    document.getElementById('btnSair').onclick = async () => {
      const { supabase } = await import('../lib/supabase.js')
      await supabase.auth.signOut()
      navegar('login')
    }
    return
  }

  // Onboarding normal — Baseado no protótipo original
  container.innerHTML = `
    <div style="
      width: 100%; height: 100dvh;
      background: #4F46E5;
      display: flex; flex-direction: column;
      overflow: hidden; position: relative;
      font-family: 'Inter', sans-serif;
    ">
      <!-- Slides -->
      <div style="flex:1; overflow: hidden; position: relative; margin-top: 60px;">
        <div id="splashSlides" style="
          display: flex; width: 300%; height: 100%;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        ">
          <!-- Slide 1: Logo -->
          <div class="slide-container">
            <div class="logo-box">WW</div>
            <h2 class="slide-title">WorkWork</h2>
            <p class="slide-desc">Conectando quem faz a quem precisa</p>
          </div>

          <!-- Slide 2: Profissionais -->
          <div class="slide-container">
            <div class="slide-emoji">👷‍♂️</div>
            <h2 class="slide-title">Para Profissionais</h2>
            <p class="slide-desc">Ofereça seus serviços e encontre novos clientes na sua região com segurança.</p>
          </div>

          <!-- Slide 3: Empresas -->
          <div class="slide-container">
            <div class="slide-emoji">🏢</div>
            <h2 class="slide-title">Para Empresas</h2>
            <p class="slide-desc">Contrate os melhores talentos avaliados para sua obra ou projeto.</p>
          </div>
        </div>
      </div>

      <!-- Dots -->
      <div style="display: flex; justify-content: center; gap: 8px; padding: 20px 0; margin-bottom: auto;">
        <div class="dot active-dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>

      <!-- Botões de Navegação -->
      <div id="splashNav" style="padding: 0 32px 40px; display: flex; justify-content: space-between; align-items: center;">
        <button id="btnPular" style="background:none; border:none; color:rgba(255,255,255,0.7); font-size:15px; font-weight:600; cursor:pointer;">Pular</button>
        <button id="btnProx" style="
          background: white; color: #4F46E5; border: none;
          padding: 14px 28px; border-radius: 50px;
          font-weight: 700; font-size: 15px; cursor: pointer;
        ">Próximo →</button>
      </div>

      <!-- Botões de Ação Final -->
      <div id="splashAcao" style="padding: 0 32px 40px; gap: 12px; display: none; flex-direction: column;">
        <button id="btnCadastrar" style="
          background: white; color: #4F46E5; border: none;
          padding: 18px; border-radius: 14px;
          font-weight: 700; font-size: 16px; cursor: pointer;
        ">Criar minha conta</button>
        <button id="btnEntrar" style="
          background: none; color: white; border: none;
          padding: 10px; font-weight: 600; font-size: 15px; cursor: pointer;
          opacity: 0.9;
        ">já tenho conta — entrar</button>
      </div>
    </div>

    <style>
      .slide-container {
        width: 33.333%; flex-shrink: 0;
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        padding: 0 40px; text-align: center;
      }
      .logo-box {
        width: 120px; height: 120px; background: #4F46E5; border-radius: 28px;
        display: flex; align-items: center; justify-content: center;
        color: white; font-size: 56px; font-weight: 800; letter-spacing: -2px;
        margin-bottom: 32px; box-shadow: 0 12px 30px rgba(0,0,0,0.15);
        border: 2px solid rgba(255,255,255,0.2);
      }
      .slide-emoji { font-size: 80px; margin-bottom: 24px; }
      .slide-title { font-size: 32px; font-weight: 800; color: white; margin-bottom: 12px; letter-spacing: -1px; }
      .slide-desc { color: rgba(255,255,255,0.85); font-size: 16px; line-height: 1.5; max-width: 280px; }
      
      .dot {
        width: 8px; height: 8px; border-radius: 50%;
        background: rgba(255,255,255,0.3); transition: all 0.3s;
      }
      .active-dot {
        width: 24px; border-radius: 4px;
        background: white;
      }
    </style>
  `

  let current = 0
  const slides = document.getElementById('splashSlides')
  const dots   = document.querySelectorAll('.dot')
  const nav    = document.getElementById('splashNav')
  const acao   = document.getElementById('splashAcao')

  function goTo(i) {
    current = i
    slides.style.transform = `translateX(-${i * 33.333}%)`
    dots.forEach((d, idx) => {
      d.className = idx === i ? 'dot active-dot' : 'dot'
    })
    if (i === 2) {
      nav.style.display = 'none'
      acao.style.display = 'flex'
    } else {
      nav.style.display = 'flex'
      acao.style.display = 'none'
    }
  }

  document.getElementById('btnProx').onclick  = () => goTo(Math.min(current + 1, 2))
  document.getElementById('btnPular').onclick  = () => goTo(2)
  document.getElementById('btnCadastrar').onclick = () => navegar('splash') // Abre escolha de perfil
  
  // No protótipo original, o fluxo de cadastro começa com a escolha de perfil
  document.getElementById('btnCadastrar').onclick = () => {
    // Simula a Tela 1: Escolha de Perfil
    container.innerHTML = `
      <div style="height:100dvh; background:#4F46E5; display:flex; flex-direction:column; padding:40px 32px; font-family:'Inter', sans-serif;">
        <h2 style="font-size:28px; font-weight:800; color:white; margin: auto 0 40px; line-height:1.3;">Como você quer usar o WorkWork?</h2>
        <div style="display:flex; flex-direction:column; gap:16px; margin-bottom:40px;">
          <button id="souProf" style="background:white; color:#4F46E5; border:none; padding:20px; border-radius:16px; text-align:left; cursor:pointer;">
            <div style="font-weight:800; font-size:18px;">Sou profissional</div>
            <div style="font-size:13px; opacity:0.8;">quero oferecer meus serviços</div>
          </button>
          <button id="souEmp" style="background:rgba(255,255,255,0.15); color:white; border:1.5px solid rgba(255,255,255,0.3); padding:20px; border-radius:16px; text-align:left; cursor:pointer;">
            <div style="font-weight:800; font-size:18px;">Sou empresa</div>
            <div style="font-size:13px; opacity:0.8;">quero contratar profissionais</div>
          </button>
        </div>
        <button id="btnVoltarSplash" style="background:none; border:none; color:white; font-size:14px; font-weight:600; cursor:pointer;">← Voltar</button>
      </div>
    `
    document.getElementById('souProf').onclick = () => navegar('cadastro-prof')
    document.getElementById('souEmp').onclick = () => navegar('cadastro-emp')
    document.getElementById('btnVoltarSplash').onclick = () => render(container)
  }

  document.getElementById('btnEntrar').onclick = () => navegar('login')
}
