// =======================================================
// Tela: Login + Redefinição de Senha
// =======================================================
import { login, recuperarSenha, supabase } from '../lib/supabase.js'
import { navegar, toast } from '../main.js'

export function render(container, params = {}) {
  // Se estivermos em modo de recuperação (vindo do link do e-mail)
  if (params.modoRecuperacao) {
    renderNovaSenha(container)
    return
  }

  container.innerHTML = `
    <div style="min-height: 100dvh; background: #F4F5F7; display: flex; flex-direction: column; padding: 60px 32px 40px; font-family:'Inter',sans-serif;">
      <div style="margin-bottom: 40px;">
        <h1 style="font-size:28px; font-weight:800; color:#1E293B; letter-spacing:-1px;">Bem-vindo de volta</h1>
        <p style="color:#64748B; margin-top:6px; font-size:15px;">Entre na sua conta WorkWork</p>
      </div>

      <div style="display:flex; flex-direction:column; gap:16px; flex:1;">
        <div>
          <label style="display:block; font-size:13px; font-weight:600; color:#1E293B; margin-bottom:8px;">E-mail</label>
          <input id="email" type="email" placeholder="seu@email.com" style="${inp()}" />
        </div>

        <div>
          <label style="display:block; font-size:13px; font-weight:600; color:#1E293B; margin-bottom:8px;">Senha</label>
          <input id="senha" type="password" placeholder="••••••••" style="${inp()}" />
        </div>

        <div style="text-align:right;">
          <button id="btnRecuperar" style="background:none; border:none; color:#4F46E5; font-size:13px; font-weight:600; cursor:pointer;">Esqueci minha senha</button>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:12px; margin-top:32px;">
        <button id="btnEntrar" style="background:#4F46E5; color:white; border:none; padding:16px; border-radius:14px; font-size:16px; font-weight:700; cursor:pointer;">Entrar</button>
        <p style="text-align:center; color:#64748B; font-size:14px;">Não tem conta? <button id="btnCadastrar" style="background:none; border:none; color:#4F46E5; font-weight:700; cursor:pointer;">Cadastre-se</button></p>
      </div>
    </div>
  `

  const btnEntrar = document.getElementById('btnEntrar')
  const emailEl = document.getElementById('email')
  const senhaEl = document.getElementById('senha')

  btnEntrar.onclick = async () => {
    const email = emailEl.value.trim()
    const senha = senhaEl.value
    if (!email || !senha) return toast('Preencha todos os campos', 'error')

    btnEntrar.textContent = 'Entrando...'
    btnEntrar.disabled = true

    try {
      const { session } = await login(email, senha)
      if (session) {
        const { getMeuPerfil } = await import('../lib/supabase.js')
        const perfil = await getMeuPerfil()
        if (perfil?.tipo === 'admin') navegar('admin-dashboard')
        else if (perfil?.tipo === 'empresa') navegar('home-emp')
        else navegar('home-prof')
      }
    } catch (e) {
      toast('E-mail ou senha incorretos', 'error')
      btnEntrar.textContent = 'Entrar'
      btnEntrar.disabled = false
    }
  }

  document.getElementById('btnRecuperar').onclick = async () => {
    const email = emailEl.value.trim()
    if (!email) return toast('Digite seu e-mail para recuperar', 'error')
    try {
      await recuperarSenha(email)
      toast('Link de recuperação enviado!', 'success')
    } catch (e) { toast('Erro ao enviar e-mail', 'error') }
  }

  document.getElementById('btnCadastrar').onclick = () => navegar('splash')
}

function renderNovaSenha(container) {
  container.innerHTML = `
    <div style="min-height: 100dvh; background: #F4F5F7; display: flex; flex-direction: column; padding: 60px 32px 40px; font-family:'Inter',sans-serif;">
      <h2 style="font-size:24px; font-weight:800; color:#1E293B; margin-bottom:12px;">Nova Senha</h2>
      <p style="color:#64748B; font-size:15px; margin-bottom:32px;">Digite sua nova senha de acesso.</p>

      <div style="display:flex; flex-direction:column; gap:16px;">
        <input id="novaSenha" type="password" placeholder="Mínimo 6 caracteres" style="${inp()}" />
        <button id="btnSalvarSenha" style="background:#4F46E5; color:white; border:none; padding:16px; border-radius:14px; font-size:16px; font-weight:700; cursor:pointer; margin-top:12px;">Salvar e Entrar</button>
      </div>
    </div>
  `

  document.getElementById('btnSalvarSenha').onclick = async () => {
    const senha = document.getElementById('novaSenha').value
    if (senha.length < 6) return toast('Mínimo 6 caracteres', 'error')

    try {
      const { error } = await supabase.auth.updateUser({ password: senha })
      if (error) throw error
      toast('Senha atualizada!', 'success')
      navegar('login')
    } catch (e) { toast('Erro ao atualizar senha', 'error') }
  }
}

const inp = () => `width:100%; padding:14px 16px; border:1.5px solid #D1D5DB; border-radius:12px; font-size:15px; font-family:'Inter',sans-serif; background:white; outline:none; box-sizing:border-box;`
