// =======================================================
// Tela: Chat — Lista de Conversas + Chat Room
// Idêntico ao Protótipo (t13, t14)
// =======================================================
import { supabase, getMensagens, enviarMensagem, ouvirMensagens } from '../lib/supabase.js'
import { navegar, toast } from '../main.js'

export async function render(container, params = {}) {
  const { data: { user } } = await supabase.auth.getUser()

  // Se chamado com um outroUserId, vai direto ao chat room
  if (params.outroUserId) {
    await renderChatRoom(container, user, params)
    return
  }

  // Caso contrário, mostra lista de conversas
  await renderListaConversas(container, user)
}

async function renderListaConversas(container, user) {
  // Busca conversas: mensagens onde o usuário é remetente ou destinatário
  let conversas = []
  try {
    const { data } = await supabase
      .from('mensagens')
      .select('*, remetente:remetente_id(id, nome:raw_user_meta_data->nome, avatar_url), destinatario:destinatario_id(id, nome:raw_user_meta_data->nome, avatar_url)')
      .or(`remetente_id.eq.${user.id},destinatario_id.eq.${user.id}`)
      .order('created_at', { ascending: false })

    // Agrupa por conversa (outro usuário)
    const vistas = new Set()
    if (data) {
      for (const msg of data) {
        const outroId = msg.remetente_id === user.id ? msg.destinatario_id : msg.remetente_id
        if (!vistas.has(outroId)) {
          vistas.add(outroId)
          const outro = msg.remetente_id === user.id ? msg.destinatario : msg.remetente
          conversas.push({ outroId, outroNome: outro?.nome || 'Usuário', ultimaMsg: msg.texto, hora: msg.created_at })
        }
      }
    }
  } catch (e) {
    console.warn('Erro ao carregar conversas:', e)
  }

  container.innerHTML = `
    <div style="height:100%; display:flex; flex-direction:column; background:#F4F5F7; font-family:'Inter',sans-serif;">

      <!-- Header -->
      <div style="background:white; padding:52px 24px 20px; border-bottom:1px solid #E5E7EB; flex-shrink:0;">
        <h2 style="font-size:22px; font-weight:700; color:#111827;">Mensagens</h2>
      </div>

      <!-- Lista -->
      <div style="flex:1; overflow-y:auto; padding:16px;">
        ${conversas.length === 0 ? `
          <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:200px; gap:12px; color:#64748B; text-align:center;">
            <div style="font-size:48px;">💬</div>
            <p style="font-size:15px; font-weight:600; color:#111827;">Nenhuma conversa ainda</p>
            <p style="font-size:13px;">Suas conversas aparecerão aqui após um match.</p>
          </div>
        ` : conversas.map(c => `
          <div class="conversa-item" data-id="${c.outroId}" style="
            background:white; border-radius:16px; border:1px solid #E5E7EB;
            padding:16px; margin-bottom:12px;
            display:flex; gap:16px; align-items:center; cursor:pointer;
            transition:box-shadow 0.2s;
          ">
            <div style="
              width:50px; height:50px; border-radius:25px;
              background:#EDE9FE; display:flex; align-items:center;
              justify-content:center; font-weight:700; color:#4F46E5;
              font-size:18px; flex-shrink:0;
            ">${(c.outroNome || 'U').substring(0,2).toUpperCase()}</div>
            <div style="flex:1; min-width:0;">
              <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                <span style="font-weight:600; color:#111827;">${c.outroNome}</span>
                <span style="font-size:12px; color:#64748B;">${new Date(c.hora).toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})}</span>
              </div>
              <p style="font-size:14px; color:#64748B; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin:0;">
                ${c.ultimaMsg}
              </p>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Bottom Nav -->
      <div id="bottomNav" style="
        background:white; border-top:1px solid #E5E7EB;
        display:flex; justify-content:space-around; align-items:center;
        height:70px; padding-bottom:env(safe-area-inset-bottom);
        flex-shrink:0;
      "></div>
    </div>
  `

  // Event listeners conversas
  document.querySelectorAll('.conversa-item').forEach(el => {
    el.onclick = () => {
      const outroId = el.dataset.id
      const outroNome = el.querySelector('span').textContent
      renderChatRoom(container, user, { outroUserId: outroId, outroNome })
    }
  })

  // Bottom nav — detecta tipo de usuário e monta nav correto
  try {
    const { getMeuPerfil } = await import('../lib/supabase.js')
    const perfil = await getMeuPerfil()
    montarBottomNav(document.getElementById('bottomNav'), perfil?.tipo || 'profissional', 'chat')
  } catch {}
}

async function renderChatRoom(container, user, params) {
  const outroId   = params.outroUserId
  const outroNome = params.outroNome || 'Contato'
  let mensagens = []

  try {
    mensagens = await getMensagens(outroId)
  } catch (e) {
    console.warn('Erro ao carregar mensagens:', e)
  }

  function bolhaHTML(msg) {
    const minha = msg.remetente_id === user.id
    return `
      <div style="
        align-self:${minha ? 'flex-end' : 'flex-start'};
        background:${minha ? '#4F46E5' : 'white'};
        color:${minha ? 'white' : '#111827'};
        padding:12px 16px;
        border-radius:${minha ? '18px 18px 4px 18px' : '18px 18px 18px 4px'};
        max-width:80%;
        box-shadow:${minha ? '0 4px 10px rgba(79,70,229,0.2)' : '0 2px 5px rgba(0,0,0,0.05)'};
        font-size:14px; line-height:1.4;
      ">${msg.texto}</div>
    `
  }

  container.innerHTML = `
    <div style="height:100%; display:flex; flex-direction:column; background:#F3F4F6; font-family:'Inter',sans-serif;">

      <!-- Header -->
      <div style="background:white; padding:52px 24px 16px; border-bottom:1px solid #E5E7EB; display:flex; align-items:center; gap:12px; flex-shrink:0;">
        <button id="btnVoltarChat" style="background:none; border:none; font-size:22px; cursor:pointer; color:#111827;">←</button>
        <div style="
          width:40px; height:40px; border-radius:20px; background:#EDE9FE;
          display:flex; align-items:center; justify-content:center;
          font-weight:700; color:#4F46E5; font-size:15px;
        ">${outroNome.substring(0,2).toUpperCase()}</div>
        <div>
          <div style="font-weight:600; font-size:16px; color:#111827;">${outroNome}</div>
          <div style="font-size:12px; color:#059669;">Online</div>
        </div>
      </div>

      <!-- Mensagens -->
      <div id="chatContainer" style="
        flex:1; overflow-y:auto; padding:20px;
        display:flex; flex-direction:column; gap:12px;
      ">
        <div style="
          align-self:center; background:white; padding:8px 16px;
          border-radius:20px; font-size:12px; color:#64748B;
          box-shadow:0 2px 4px rgba(0,0,0,0.05);
        ">Match! 🎉 Vocês agora podem conversar.</div>
        ${mensagens.map(bolhaHTML).join('')}
      </div>

      <!-- Input -->
      <div style="
        padding:16px 20px 32px; background:white;
        border-top:1px solid #E5E7EB;
        display:flex; gap:12px; align-items:center;
        flex-shrink:0;
      ">
        <input id="chatInput" type="text" placeholder="Digite sua mensagem..." style="
          flex:1; padding:14px 18px; border:1px solid #D1D5DB;
          border-radius:30px; font-size:14px; font-family:'Inter',sans-serif;
          background:white; outline:none;
        ">
        <button id="btnEnviar" style="
          width:48px; height:48px; border-radius:24px;
          background:#4F46E5; border:none; color:white;
          font-size:20px; display:flex; align-items:center;
          justify-content:center; cursor:pointer; flex-shrink:0;
        ">➔</button>
      </div>
    </div>
  `

  const chatContainer = document.getElementById('chatContainer')
  chatContainer.scrollTop = chatContainer.scrollHeight

  document.getElementById('btnVoltarChat').onclick = () => renderListaConversas(container, user)

  async function enviar() {
    const input = document.getElementById('chatInput')
    const texto = input.value.trim()
    if (!texto) return
    input.value = ''
    try {
      const msg = await enviarMensagem(outroId, texto)
      chatContainer.insertAdjacentHTML('beforeend', bolhaHTML({ ...msg, remetente_id: user.id }))
      chatContainer.scrollTop = chatContainer.scrollHeight
    } catch (e) {
      toast('Erro ao enviar mensagem', 'error')
    }
  }

  document.getElementById('btnEnviar').onclick = enviar
  document.getElementById('chatInput').onkeypress = (e) => { if (e.key === 'Enter') enviar() }

  // Realtime
  const channel = ouvirMensagens(outroId, (msg) => {
    chatContainer.insertAdjacentHTML('beforeend', bolhaHTML(msg))
    chatContainer.scrollTop = chatContainer.scrollHeight
  })

  container._cleanup = () => supabase.removeChannel(channel)
}

function montarBottomNav(el, tipo, ativo) {
  const itens = tipo === 'empresa'
    ? [
        { icon: '🏠', label: 'Início',   tela: 'home-emp' },
        { icon: '➕', label: 'Vagas',    tela: 'publicar-vaga' },
        { icon: '💬', label: 'Chat',     tela: 'chat' },
        { icon: '👤', label: 'Perfil',   tela: 'perfil' },
      ]
    : [
        { icon: '🏠', label: 'Início',   tela: 'home-prof' },
        { icon: '🔍', label: 'Buscar Vagas', tela: 'home-prof' },
        { icon: '💬', label: 'Chat',     tela: 'chat' },
        { icon: '👤', label: 'Perfil',   tela: 'perfil' },
      ]

  el.innerHTML = itens.map(item => `
    <div class="nav-item-btn" data-tela="${item.tela}" style="
      display:flex; flex-direction:column; align-items:center; gap:3px;
      color:${ativo === item.tela ? '#4F46E5' : '#9CA3AF'};
      font-size:11px; font-weight:500; cursor:pointer;
    ">
      <span style="font-size:20px;">${item.icon}</span>
      <span>${item.label}</span>
    </div>
  `).join('')

  el.querySelectorAll('.nav-item-btn').forEach(btn => {
    btn.onclick = () => navegar(btn.dataset.tela)
  })
}
