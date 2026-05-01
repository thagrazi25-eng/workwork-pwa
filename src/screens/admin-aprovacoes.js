// =======================================================
// Tela: Admin — Aprovações (KYC)
// =======================================================
import { supabase } from '../lib/supabase.js'
import { navegar, toast } from '../main.js'

export async function render(container) {
  container.innerHTML = `
    <div style="height:100dvh; display:flex; background:#F8F9FD; font-family:'Inter', sans-serif; color:#1E293B;">
      
      <!-- Sidebar -->
      <aside style="width:280px; background:#181C2E; color:white; display:flex; flex-direction:column; flex-shrink:0;">
        <div style="padding:40px 32px;">
          <div style="font-family:'Sora', sans-serif; font-size:24px; font-weight:800; color:#4F46E5; display:flex; align-items:center; gap:12px;">
            <div style="width:32px; height:32px; background:#4F46E5; border-radius:8px; display:flex; align-items:center; justify-content:center; color:white; font-size:16px;">WW</div>
            WorkWork Admin
          </div>
        </div>

        <nav style="flex:1; padding:0 16px; list-style:none;">
          <button class="adm-nav-btn" data-screen="admin-dashboard" style="${admNavStyle(false)}">
            <span style="font-size:18px;">📊</span> Dashboard
          </button>
          <button class="adm-nav-btn active" data-screen="admin-aprovacoes" style="${admNavStyle(true)}">
            <span style="font-size:18px;">🔔</span> Aprovações
          </button>
          <button class="adm-nav-btn" data-screen="admin-config" style="${admNavStyle(false)}">
            <span style="font-size:18px;">💎</span> Assinaturas
          </button>
          <div style="height:1px; background:rgba(255,255,255,0.1); margin:20px 16px;"></div>
          <button id="btnLogout" style="${admNavStyle(false)}">
            <span style="font-size:18px;">🚪</span> Sair
          </button>
        </nav>
      </aside>

      <!-- Main Content -->
      <main style="flex:1; overflow-y:auto; padding:40px 60px;">
        <header style="margin-bottom:40px;">
          <h1 style="font-family:'Sora', sans-serif; font-size:32px; font-weight:700; color:#1E293B;">Aprovações Pendentes</h1>
          <p style="color:#64748B; margin-top:4px;">Analise os documentos e aprove novos profissionais/empresas.</p>
        </header>

        <div style="background:white; border-radius:24px; border:1px solid #E2E8F0; overflow:hidden;">
          <table style="width:100%; border-collapse:collapse;">
            <thead>
              <tr style="background:#F9FAFB; border-bottom:1px solid #E2E8F0;">
                <th style="${thStyle()}">Usuário</th>
                <th style="${thStyle()}">Tipo</th>
                <th style="${thStyle()}">Data Cadastro</th>
                <th style="${thStyle()} text-align:right;">Ações</th>
              </tr>
            </thead>
            <tbody id="listaPendentes">
              <tr><td colspan="4" style="padding:40px; text-align:center; color:#64748B;">Carregando...</td></tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  `

  await carregarPendentes()

  // Navegação
  document.querySelectorAll('.adm-nav-btn').forEach(btn => {
    btn.onclick = () => navegar(btn.dataset.screen)
  })

  document.getElementById('btnLogout').onclick = async () => {
    await supabase.auth.signOut()
    navegar('login')
  }
}

async function carregarPendentes() {
  const tbody = document.getElementById('listaPendentes')
  try {
    const { data: users, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('admin_approved', false)
      .order('created_at', { ascending: false })

    if (error) throw error

    if (!users.length) {
      tbody.innerHTML = `<tr><td colspan="4" style="padding:60px; text-align:center;">
        <div style="font-size:32px; margin-bottom:12px;">✅</div>
        <p style="font-weight:600; color:#1E293B;">Tudo em dia!</p>
        <p style="color:#64748B; font-size:14px;">Não há usuários aguardando aprovação.</p>
      </td></tr>`
      return
    }

    tbody.innerHTML = users.map(u => `
      <tr style="border-bottom:1px solid #F1F5F9;">
        <td style="padding:20px 24px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:36px; height:36px; border-radius:10px; background:#EDE9FE; color:#4F46E5; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px;">
              ${u.nome?.substring(0,2).toUpperCase()}
            </div>
            <div>
              <p style="font-weight:600; color:#1E293B;">${u.nome}</p>
              <p style="font-size:12px; color:#64748B;">${u.email}</p>
            </div>
          </div>
        </td>
        <td style="padding:20px 24px;">
          <span style="padding:4px 10px; border-radius:6px; font-size:12px; font-weight:700; background:#F1F5F9; color:#475569; text-transform:uppercase;">
            ${u.tipo}
          </span>
        </td>
        <td style="padding:20px 24px; color:#64748B; font-size:14px;">
          ${new Date(u.created_at).toLocaleDateString()}
        </td>
        <td style="padding:20px 24px; text-align:right;">
          <div style="display:flex; gap:8px; justify-content:flex-end;">
            <button class="btn-aprove" data-id="${u.id}" style="padding:8px 16px; border-radius:8px; border:none; background:#10B981; color:white; font-weight:600; cursor:pointer; font-size:13px;">Aprovar</button>
            <button class="btn-reject" data-id="${u.id}" style="padding:8px 16px; border-radius:8px; border:1px solid #EF4444; background:white; color:#EF4444; font-weight:600; cursor:pointer; font-size:13px;">Reprovar</button>
          </div>
        </td>
      </tr>
    `).join('')

    // Eventos de Ação
    tbody.querySelectorAll('.btn-aprove').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.dataset.id
        btn.disabled = true
        btn.textContent = '...'
        try {
          const { error } = await supabase.from('usuarios').update({ admin_approved: true }).eq('id', id)
          if (error) throw error
          toast('Usuário aprovado!', 'success')
          carregarPendentes()
        } catch (e) {
          toast('Erro ao aprovar', 'error')
          btn.disabled = false
          btn.textContent = 'Aprovar'
        }
      }
    })

  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="4" style="padding:40px; text-align:center; color:#EF4444;">Erro ao carregar dados.</td></tr>`
  }
}

function admNavStyle(active) {
  return `
    width:100%; padding:14px 20px; border-radius:12px; margin-bottom:4px;
    cursor:pointer; display:flex; align-items:center; gap:12px;
    font-weight:600; font-size:14px; border:none; transition:all 0.2s;
    background:${active ? '#4F46E5' : 'transparent'};
    color:${active ? 'white' : 'rgba(255,255,255,0.6)'};
    text-align:left; font-family:'Inter', sans-serif;
  `
}

function thStyle() {
  return `padding:16px 24px; text-align:left; font-size:12px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:0.05em;`
}
