// =======================================================
// Tela: Home — Empresa
// =======================================================
import { criarVaga } from '../lib/supabase.js'
import { navegar, toast } from '../main.js'

export async function render(container, params = {}) {
  container.innerHTML = `
    <div style="height:100dvh; display:flex; flex-direction:column; background:#F4F5F7;">

      <!-- Header -->
      <div style="background:white; padding:52px 24px 20px; border-bottom:1px solid #E5E7EB;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <p style="color:#64748B; font-size:13px;">Empresa 🏢</p>
            <h1 id="nomeEmpresa" style="font-family:'Sora',sans-serif; font-size:22px; font-weight:700; color:#111827; margin-top:2px;">
              Carregando...
            </h1>
          </div>
          <button id="btnNovaVaga" style="
            background:#4F46E5; color:white; border:none;
            padding:10px 18px; border-radius:10px; font-weight:700;
            font-size:14px; cursor:pointer; font-family:'Inter',sans-serif;
          ">+ Vaga</button>
        </div>
      </div>

      <!-- Conteúdo -->
      <div style="flex:1; overflow-y:auto; padding:20px 24px;">
        <div id="dashboard" style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:24px;">
          <div style="${statCard()}">
            <p style="font-size:12px; color:#64748B; font-weight:600; margin-bottom:6px;">VAGAS ATIVAS</p>
            <p id="totalVagas" style="font-size:28px; font-weight:800; color:#4F46E5; font-family:'Sora',sans-serif;">—</p>
          </div>
          <div style="${statCard()}">
            <p style="font-size:12px; color:#64748B; font-weight:600; margin-bottom:6px;">CANDIDATOS</p>
            <p id="totalCandidatos" style="font-size:28px; font-weight:800; color:#4F46E5; font-family:'Sora',sans-serif;">—</p>
          </div>
        </div>

        <h2 style="font-family:'Sora',sans-serif; font-size:17px; font-weight:700; color:#111827; margin-bottom:14px;">
          Suas Vagas
        </h2>
        <div id="listaVagasEmp">
          <div style="text-align:center; padding:40px; color:#94A3B8;">
            <div style="font-size:32px; margin-bottom:12px;">⏳</div>
            Carregando...
          </div>
        </div>
      </div>

      <!-- Bottom Nav -->
      <nav style="
        background:white; border-top:1px solid #E5E7EB;
        display:flex; justify-content:space-around; align-items:center;
        height:70px; padding-bottom:env(safe-area-inset-bottom); flex-shrink:0;
      ">
        <button onclick="window.navegar('home-emp')" style="${navBtn(true)}">
          <span style="font-size:22px;">🏠</span><span style="font-size:11px;">Início</span>
        </button>
        <button onclick="window.navegar('chat')" style="${navBtn(false)}">
          <span style="font-size:22px;">💬</span><span style="font-size:11px;">Chat</span>
        </button>
        <button onclick="window.navegar('perfil')" style="${navBtn(false)}">
          <span style="font-size:22px;">👤</span><span style="font-size:11px;">Perfil</span>
        </button>
      </nav>

    </div>

    <!-- Modal Nova Vaga -->
    <div id="modalVaga" style="
      display:none; position:fixed; inset:0; background:rgba(0,0,0,0.5);
      z-index:1000; align-items:flex-end; justify-content:center;
    ">
      <div style="
        background:white; border-radius:24px 24px 0 0; padding:28px 24px;
        width:100%; max-width:480px;
        padding-bottom:calc(28px + env(safe-area-inset-bottom));
      ">
        <h3 style="font-family:'Sora',sans-serif; font-size:20px; font-weight:700; margin-bottom:20px;">
          Nova Vaga
        </h3>
        <div style="display:flex; flex-direction:column; gap:14px;">
          <input id="vTitulo"   placeholder="Título da vaga"     style="${inputStyle()}" />
          <input id="vCidade"   placeholder="Cidade"             style="${inputStyle()}" />
          <input id="vValor"    placeholder="Valor (R$)"  type="number" style="${inputStyle()}" />
          <textarea id="vDesc"  placeholder="Descrição da vaga..." style="
            ${inputStyle()} height:90px; resize:none;
          "></textarea>
          <button id="btnPublicar" style="
            background:#4F46E5; color:white; border:none;
            padding:16px; border-radius:14px; font-size:16px;
            font-weight:700; cursor:pointer; font-family:'Inter',sans-serif;
          ">Publicar Vaga</button>
          <button id="btnCancelarVaga" style="
            background:none; border:none; color:#64748B;
            font-size:15px; font-weight:600; cursor:pointer; padding:8px;
          ">Cancelar</button>
        </div>
      </div>
    </div>
  `

  // navegar disponível globalmente para os botões inline
  window.navegar = navegar

  // Carregar perfil
  try {
    const { getMeuPerfil } = await import('../lib/supabase.js')
    const perfil = await getMeuPerfil()
    document.getElementById('nomeEmpresa').textContent =
      perfil?.empresas?.razao_social || perfil?.nome || 'Empresa'
  } catch {}

  // Carregar vagas da empresa
  await carregarVagasEmpresa()

  // Modal
  document.getElementById('btnNovaVaga').onclick = () => {
    document.getElementById('modalVaga').style.display = 'flex'
  }
  document.getElementById('btnCancelarVaga').onclick = () => {
    document.getElementById('modalVaga').style.display = 'none'
  }

  document.getElementById('btnPublicar').onclick = async () => {
    const titulo = document.getElementById('vTitulo').value.trim()
    const cidade = document.getElementById('vCidade').value.trim()
    const valor  = document.getElementById('vValor').value
    const desc   = document.getElementById('vDesc').value.trim()

    if (!titulo || !cidade) {
      toast('Preencha título e cidade', 'error')
      return
    }

    const btn = document.getElementById('btnPublicar')
    btn.textContent = 'Publicando...'
    btn.disabled = true

    try {
      await criarVaga({ titulo, cidade, valor: valor || null, descricao: desc, status: 'aberta' })
      document.getElementById('modalVaga').style.display = 'none'
      toast('Vaga publicada!', 'success')
      await carregarVagasEmpresa()
    } catch (e) {
      toast('Erro ao publicar vaga', 'error')
    } finally {
      btn.textContent = 'Publicar Vaga'
      btn.disabled = false
    }
  }
}

async function carregarVagasEmpresa() {
  const lista = document.getElementById('listaVagasEmp')
  const { supabase } = await import('../lib/supabase.js')
  const { data: { user } } = await supabase.auth.getUser()

  try {
    const { data: vagas } = await supabase
      .from('vagas')
      .select('*, candidaturas(count)')
      .eq('empresa_id', user.id)
      .order('created_at', { ascending: false })

    document.getElementById('totalVagas').textContent =
      vagas?.filter(v => v.status === 'aberta').length ?? 0
    document.getElementById('totalCandidatos').textContent =
      vagas?.reduce((acc, v) => acc + (v.candidaturas?.[0]?.count ?? 0), 0) ?? 0

    if (!vagas?.length) {
      lista.innerHTML = `
        <div style="text-align:center; padding:60px 40px; color:#94A3B8;">
          <div style="font-size:40px; margin-bottom:12px;">📋</div>
          <p>Nenhuma vaga publicada ainda</p>
        </div>
      `
      return
    }

    lista.innerHTML = vagas.map(v => `
      <div style="background:white; border-radius:14px; padding:18px; margin-bottom:10px; border:1px solid #E5E7EB;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <p style="font-weight:700; font-size:15px; color:#111827;">${v.titulo}</p>
            <p style="font-size:13px; color:#64748B; margin-top:2px;">${v.cidade} · ${v.candidaturas?.[0]?.count ?? 0} candidatos</p>
          </div>
          <span style="
            padding:4px 12px; border-radius:20px; font-size:12px; font-weight:600;
            background:${v.status === 'aberta' ? '#D1FAE5' : '#F1F5F9'};
            color:${v.status === 'aberta' ? '#065F46' : '#64748B'};
          ">${v.status}</span>
        </div>
      </div>
    `).join('')

  } catch {
    lista.innerHTML = `<p style="color:#EF4444; text-align:center; padding:20px;">Erro ao carregar vagas</p>`
  }
}

const statCard = () => `
  background:white; border-radius:14px; padding:18px;
  border:1px solid #E5E7EB;
`
const navBtn = (active) => `
  display:flex; flex-direction:column; align-items:center; gap:3px;
  background:none; border:none; cursor:pointer; padding:8px 16px;
  color:${active ? '#4F46E5' : '#9CA3AF'}; font-family:'Inter',sans-serif;
  font-weight:${active ? '600' : '500'};
`
const inputStyle = () => `
  width:100%; padding:14px 16px; border:1.5px solid #D1D5DB;
  border-radius:12px; font-size:15px; font-family:'Inter',sans-serif;
  background:white; outline:none; box-sizing:border-box;
`
