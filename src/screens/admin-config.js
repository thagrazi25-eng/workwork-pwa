// =======================================================
// Tela: Admin — Ajustes e Assinaturas
// =======================================================
import { supabase } from '../lib/supabase.js'
import { navegar, toast } from '../main.js'

export async function render(container) {
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
          <button class="adm-nav-btn" data-screen="admin-aprovacoes" style="${admNavStyle(false)}">
            <span style="font-size:18px;">🔔</span> Aprovações
          </button>
          <button class="adm-nav-btn active" data-screen="admin-config" style="${admNavStyle(true)}">
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
          <h1 style="font-family:'Sora', sans-serif; font-size:32px; font-weight:700; color:#1E293B;">Assinaturas e Ajustes</h1>
          <p style="color:#64748B; margin-top:4px;">Configure assinaturas, períodos de teste e regras do sistema.</p>
        </header>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:32px;">
          
          <!-- Configuração de Trial -->
          <div style="background:white; border-radius:24px; border:1px solid #E2E8F0; padding:32px;">
            <h2 style="font-size:18px; font-weight:700; margin-bottom:24px; display:flex; align-items:center; gap:10px;">🎁 Período de Teste (Trial)</h2>
            
            <div style="margin-bottom:24px;">
              <label style="display:block; font-size:13px; font-weight:600; color:#1E293B; margin-bottom:8px;">Dias de Teste Grátis</label>
              <input id="trial_days" type="number" value="7" style="${inp()}" />
              <p style="font-size:12px; color:#64748B; margin-top:8px;">Tempo que o usuário pode usar o app antes de ser cobrado.</p>
            </div>

            <div style="display:flex; align-items:center; justify-content:space-between; padding:16px; background:#F9FAFB; border-radius:12px;">
              <div>
                <p style="font-weight:600; font-size:14px;">Ativar Trial Global</p>
                <p style="font-size:12px; color:#64748B;">Se desativado, todos deverão pagar ao entrar.</p>
              </div>
              <input type="checkbox" id="trial_ativo" checked style="width:20px; height:20px; cursor:pointer;" />
            </div>
          </div>

          <!-- Valores de Assinatura -->
          <div style="background:white; border-radius:24px; border:1px solid #E2E8F0; padding:32px;">
            <h2 style="font-size:18px; font-weight:700; margin-bottom:24px; display:flex; align-items:center; gap:10px;">💎 Valores dos Planos (R$)</h2>
            
            <div style="display:flex; flex-direction:column; gap:16px;">
              <div>
                <label style="display:block; font-size:13px; font-weight:600; color:#64748B; margin-bottom:6px;">Plano Starter (Profissional)</label>
                <input id="preco_starter" type="number" step="0.01" value="49.90" style="${inp()}" />
              </div>
              <div>
                <label style="display:block; font-size:13px; font-weight:600; color:#64748B; margin-bottom:6px;">Plano Pro (Profissional)</label>
                <input id="preco_pro" type="number" step="0.01" value="89.90" style="${inp()}" />
              </div>
              <div>
                <label style="display:block; font-size:13px; font-weight:600; color:#64748B; margin-bottom:6px;">Plano Empresa (Recrutador)</label>
                <input id="preco_empresa" type="number" step="0.01" value="149.90" style="${inp()}" />
              </div>
            </div>
          </div>

        </div>

        <div style="margin-top:32px; display:flex; justify-content:flex-end;">
          <button id="btnSalvarConfig" style="
            background:#4F46E5; color:white; border:none;
            padding:16px 40px; border-radius:14px;
            font-weight:700; font-size:16px; cursor:pointer;
            box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
          ">Salvar Alterações</button>
        </div>
      </main>
    </div>
  `

  await carregarConfig()

  // Navegação Sidebar
  document.querySelectorAll('.adm-nav-btn').forEach(btn => {
    btn.onclick = () => navegar(btn.dataset.screen)
  })

  // Salvar Configurações
  document.getElementById('btnSalvarConfig').onclick = async () => {
    const btn = document.getElementById('btnSalvarConfig')
    btn.textContent = 'Salvando...'
    btn.disabled = true

    try {
      const payload = {
        trial_days: parseInt(document.getElementById('trial_days').value),
        trial_ativo: document.getElementById('trial_ativo').checked,
        preco_starter: parseFloat(document.getElementById('preco_starter').value),
        preco_pro: parseFloat(document.getElementById('preco_pro').value),
        preco_empresa: parseFloat(document.getElementById('preco_empresa').value),
        updated_at: new Date()
      }

      const { error } = await supabase
        .from('config_sistema')
        .update(payload)
        .eq('id', 1) // Assume que existe um registro com ID 1 para as configs globais

      if (error) throw error
      toast('Configurações salvas com sucesso!', 'success')
    } catch (e) {
      console.error(e)
      toast('Erro ao salvar no banco de dados', 'error')
    } finally {
      btn.textContent = 'Salvar Alterações'
      btn.disabled = false
    }
  }

  document.getElementById('btnLogout').onclick = async () => {
    await supabase.auth.signOut()
    navegar('login')
  }
}

async function carregarConfig() {
  try {
    const { data, error } = await supabase
      .from('config_sistema')
      .select('*')
      .eq('id', 1)
      .single()

    if (data) {
      document.getElementById('trial_days').value = data.trial_days
      document.getElementById('trial_ativo').checked = data.trial_ativo
      document.getElementById('preco_starter').value = data.preco_starter
      document.getElementById('preco_pro').value = data.preco_pro
      document.getElementById('preco_empresa').value = data.preco_empresa
    }
  } catch (e) {
    console.warn('Configurações iniciais não encontradas no banco')
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

const inp = () => `width:100%; padding:12px 16px; border:1.5px solid #E2E8F0; border-radius:10px; font-size:15px; font-family:'Inter', sans-serif; background:#F9FAFB; outline:none;`
