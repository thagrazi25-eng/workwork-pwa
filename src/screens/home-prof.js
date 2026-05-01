// =======================================================
// Tela: Home — Profissional
// =======================================================
import { listarVagas, candidatar } from '../lib/supabase.js'
import { navegar, toast } from '../main.js'

let categoriaSelecionada = 'Todas'
let buscaTexto = ''

const CATEGORIAS = [
  'Todas', 'Pedreiro', 'Eletricista', 'Encanador', 'Pintor', 
  'Limpeza', 'Jardineiro', 'Marceneiro', 'Segurança', 'Motorista', 
  'Cuidador', 'Produção', 'Serviços Gerais', 'Cozinheiro', 'TI', 'Estética'
]

export async function render(container, params = {}) {
  container.innerHTML = `
    <div style="height:100dvh; display:flex; flex-direction:column; background:#F4F5F7;">

      <!-- Header -->
      <div style="background:white; padding:52px 24px 20px; border-bottom:1px solid #E5E7EB; flex-shrink:0;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <p style="color:#64748B; font-size:13px; font-weight:500;">Olá 👋</p>
            <h1 id="nomeUsuario" style="font-size:22px; font-weight:800; color:#111827; margin-top:2px;">
              Profissional
            </h1>
          </div>
          <button id="btnPerfil" style="
            width:44px; height:44px; border-radius:12px;
            background:#F3F4F6; border:none; cursor:pointer;
            font-size:20px; display:flex; align-items:center; justify-content:center;
          ">👤</button>
        </div>

        <!-- Busca -->
        <input id="busca" placeholder="🔍  Buscar por cargo ou empresa..." style="
          width:100%; margin-top:20px; padding:14px 16px;
          border:1.5px solid #E5E7EB; border-radius:12px;
          font-size:14px; font-family:'Inter',sans-serif;
          background:#F9FAFB; outline:none; transition: border-color 0.2s;
        " />

        <!-- Filtros Rápidos (Categorias) -->
        <div style="display:flex; gap:10px; overflow-x:auto; padding:16px 0 4px; margin:0 -24px; padding-left:24px; scrollbar-width:none;">
          ${CATEGORIAS.map(cat => `
            <div class="chip-cat ${categoriaSelecionada === cat ? 'active' : ''}" data-cat="${cat}" style="
              padding:8px 16px; border-radius:20px; border:1.5px solid ${categoriaSelecionada === cat ? '#4F46E5' : '#E5E7EB'};
              background:${categoriaSelecionada === cat ? '#4F46E5' : 'white'};
              color:${categoriaSelecionada === cat ? 'white' : '#64748B'};
              font-size:13px; font-weight:600; cursor:pointer; white-space:nowrap;
              transition:all 0.2s;
            ">${cat}</div>
          `).join('')}
        </div>
      </div>

      <!-- Lista de Vagas -->
      <div id="listaVagas" style="flex:1; overflow-y:auto; padding:16px 20px;">
        <div style="text-align:center; padding:40px; color:#94A3B8;">
          <div style="font-size:32px; margin-bottom:12px;">⏳</div>
          Buscando as melhores vagas...
        </div>
      </div>

      <!-- Bottom Nav -->
      <nav style="
        background:white; border-top:1px solid #E5E7EB;
        display:flex; justify-content:space-around; align-items:center;
        height:75px; padding-bottom:env(safe-area-inset-bottom);
        flex-shrink:0;
      ">
        <button class="nav-btn active" data-tela="home-prof" style="${navBtnStyle(true)}">
          <span style="font-size:24px;">🏠</span>
          <span style="font-size:11px;">Vagas</span>
        </button>
        <button class="nav-btn" data-tela="chat" style="${navBtnStyle(false)}">
          <span style="font-size:24px;">💬</span>
          <span style="font-size:11px;">Chat</span>
        </button>
        <button class="nav-btn" data-tela="perfil" style="${navBtnStyle(false)}">
          <span style="font-size:24px;">👤</span>
          <span style="font-size:11px;">Perfil</span>
        </button>
      </nav>
    </div>
  `

  // Focus effect na busca
  const buscaEl = document.getElementById('busca')
  buscaEl.onfocus = () => buscaEl.style.borderColor = '#4F46E5'
  buscaEl.onblur  = () => buscaEl.style.borderColor = '#E5E7EB'

  // Carregar perfil do usuário
  try {
    const { getMeuPerfil } = await import('../lib/supabase.js')
    const perfil = await getMeuPerfil()
    if (perfil) {
      document.getElementById('nomeUsuario').textContent = perfil.nome?.split(' ')[0] || 'Profissional'
    }
  } catch {}

  // Carregar vagas iniciais
  await carregarVagas()

  // Eventos de Categoria
  document.querySelectorAll('.chip-cat').forEach(el => {
    el.onclick = () => {
      categoriaSelecionada = el.dataset.cat
      document.querySelectorAll('.chip-cat').forEach(c => {
        c.classList.remove('active')
        c.style.background = 'white'
        c.style.color = '#64748B'
        c.style.borderColor = '#E5E7EB'
      })
      el.classList.add('active')
      el.style.background = '#4F46E5'
      el.style.color = 'white'
      el.style.borderColor = '#4F46E5'
      carregarVagas()
    }
  })

  // Busca com debounce
  let debounce
  buscaEl.addEventListener('input', (e) => {
    buscaTexto = e.target.value
    clearTimeout(debounce)
    debounce = setTimeout(() => carregarVagas(), 400)
  })

  // Navegação
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.onclick = () => navegar(btn.dataset.tela)
  })

  document.getElementById('btnPerfil').onclick = () => navegar('perfil')
}

async function carregarVagas() {
  const lista = document.getElementById('listaVagas')

  try {
    const vagas = await listarVagas()
    
    // Filtragem combinada
    const filtradas = vagas.filter(v => {
      const matchTexto = !buscaTexto || 
        v.titulo?.toLowerCase().includes(buscaTexto.toLowerCase()) ||
        v.descricao?.toLowerCase().includes(buscaTexto.toLowerCase()) ||
        v.empresas?.razao_social?.toLowerCase().includes(buscaTexto.toLowerCase())
      
      const matchCat = categoriaSelecionada === 'Todas' || 
        v.nicho?.toLowerCase().includes(categoriaSelecionada.toLowerCase()) ||
        v.categoria?.toLowerCase().includes(categoriaSelecionada.toLowerCase())

      return matchTexto && matchCat
    })

    if (!filtradas.length) {
      lista.innerHTML = `
        <div style="text-align:center; padding:60px 40px; color:#94A3B8;">
          <div style="font-size:48px; margin-bottom:16px;">🔍</div>
          <p style="font-weight:600; color:#475569;">Nenhuma vaga encontrada</p>
          <p style="font-size:14px; margin-top:8px;">Tente mudar os filtros ou o termo de busca.</p>
        </div>
      `
      return
    }

    lista.innerHTML = filtradas.map(vaga => cardVaga(vaga)).join('')

    // Eventos de candidatura
    lista.querySelectorAll('.btn-candidatar').forEach(btn => {
      btn.onclick = async (e) => {
        e.stopPropagation()
        const vagaId = btn.dataset.id
        const originalText = btn.textContent
        btn.textContent = 'Enviando...'
        btn.disabled = true
        
        try {
          await candidatar(vagaId)
          btn.textContent = '✓ Candidatura Enviada'
          btn.style.background = '#D1FAE5'
          btn.style.color = '#065F46'
          toast('Candidatura enviada com sucesso!', 'success')
        } catch (e) {
          if (e.code === '23505') {
            btn.textContent = 'Já candidatado'
            btn.style.background = '#F1F5F9'
            btn.style.color = '#64748B'
          } else {
            toast('Erro ao enviar candidatura', 'error')
            btn.textContent = originalText
            btn.disabled = false
          }
        }
      }
    })

  } catch (e) {
    console.error(e)
    lista.innerHTML = `
      <div style="text-align:center; padding:60px 40px; color:#EF4444;">
        <div style="font-size:40px; margin-bottom:12px;">⚠️</div>
        <p>Não foi possível carregar as vagas agora.</p>
      </div>
    `
  }
}

function cardVaga(vaga) {
  const empresa = vaga.empresas
  const valorLabel = vaga.valor
    ? `R$ ${Number(vaga.valor).toFixed(2).replace('.', ',')}`
    : 'A combinar'

  return `
    <div style="
      background:white; border-radius:18px; padding:20px;
      margin-bottom:16px; border:1px solid #E5E7EB;
      box-shadow:0 2px 10px rgba(0,0,0,0.03);
      cursor:pointer;
    " onclick="navegar('vaga-detalhe', { id: '${vaga.id}' })">
      
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
        <div style="flex:1;">
          <h3 style="font-size:17px; font-weight:800; color:#111827; margin-bottom:4px; line-height:1.2;">
            ${vaga.titulo || 'Vaga'}
          </h3>
          <p style="font-size:13px; color:#64748B; font-weight:500;">
            ${empresa?.razao_social || 'Empresa'} • ${vaga.cidade || 'Localização...'}
          </p>
        </div>
        <span style="
          background:#F3F0FF; color:#4F46E5;
          padding:6px 12px; border-radius:20px;
          font-size:12px; font-weight:800; white-space:nowrap;
        ">${valorLabel}</span>
      </div>

      <div style="display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap;">
        <span style="background:#F1F5F9; color:#475569; padding:4px 10px; border-radius:8px; font-size:11px; font-weight:700; text-transform:uppercase;">${vaga.nicho || 'Geral'}</span>
        ${vaga.disponibilidade ? `<span style="background:#E0F2FE; color:#0369A1; padding:4px 10px; border-radius:8px; font-size:11px; font-weight:700; text-transform:uppercase;">${vaga.disponibilidade}</span>` : ''}
      </div>

      <button class="btn-candidatar" data-id="${vaga.id}" style="
        width:100%; padding:14px; border-radius:12px;
        background:#4F46E5; color:white; border:none;
        font-size:14px; font-weight:700; cursor:pointer;
        font-family:'Inter',sans-serif; transition:all 0.2s;
      ">Me Candidatar</button>
    </div>
  `
}

function navBtnStyle(active) {
  return `
    display:flex; flex-direction:column; align-items:center; gap:4px;
    background:none; border:none; cursor:pointer; padding:10px 20px;
    color:${active ? '#4F46E5' : '#9CA3AF'}; font-weight:${active ? '700' : '500'};
    font-family:'Inter',sans-serif; transition: color 0.2s;
  `
}
