// =======================================================
// WORKWORK PWA — Entry Point
// Router simples + Auth Guard
// =======================================================

import { supabase, getMeuPerfil } from './lib/supabase.js'

// ------- Toast global -------
export function toast(msg, tipo = 'default', duracao = 3000) {
  const el = document.getElementById('toast')
  el.textContent = msg
  el.className = `show ${tipo}`
  clearTimeout(el._t)
  el._t = setTimeout(() => { el.className = '' }, duracao)
}

// ------- Router -------
// Cada tela é um módulo que exporta: { render(container), onDestroy? }
const rotas = {
  splash:                 () => import('./screens/splash.js'),
  login:                  () => import('./screens/login.js'),
  'cadastro-prof':        () => import('./screens/cadastro-prof.js'),
  'cadastro-emp':         () => import('./screens/cadastro-empresa.js'),
  'home-prof':            () => import('./screens/home-prof.js'),
  'home-emp':             () => import('./screens/home-empresa.js'),
  'vaga-detalhe':         () => import('./screens/vaga-detalhe.js'),
  chat:                   () => import('./screens/chat.js'),
  perfil:                 () => import('./screens/perfil.js'),
  'admin-dashboard':      () => import('./screens/admin-dashboard.js'),
  'admin-aprovacoes':     () => import('./screens/admin-aprovacoes.js'),
  'admin-config':         () => import('./screens/admin-config.js'),
  'admin-profissionais':  () => import('./screens/admin-profissionais.js'),
  'admin-empresas':       () => import('./screens/admin-empresas.js'),
  'admin-vagas':          () => import('./screens/admin-vagas.js'),
  'admin-logs':           () => import('./screens/admin-logs.js'),
  'admin-relatorios':     () => import('./screens/admin-relatorios.js'),
}

let telaAtual = null

export async function navegar(nomeTela, params = {}) {
  const container = document.getElementById('app')
  const isAdmin = nomeTela.startsWith('admin')

  // Ativa/desativa modo admin no body
  document.body.classList.toggle('admin-mode', isAdmin)

  // Destroi tela anterior se houver cleanup
  if (telaAtual?.onDestroy) telaAtual.onDestroy()

  // Animação de saída rápida
  container.style.opacity = '0'
  container.style.transform = 'translateY(8px)'
  container.style.transition = 'all 0.15s ease'

  await new Promise(r => setTimeout(r, 150))

  // Carrega novo módulo
  const loader = rotas[nomeTela]
  if (!loader) {
    console.error(`Tela "${nomeTela}" não encontrada`)
    return
  }

  const modulo = await loader()
  container.innerHTML = ''
  telaAtual = modulo

  modulo.render(container, params)

  // Animação de entrada
  container.style.opacity = '1'
  container.style.transform = 'translateY(0)'
}

// ------- Auth Guard -------
async function inicializar() {
  const loading = document.getElementById('app-loading')

  // Aguarda sessão do Supabase com timeout de 5 segundos
  let session = null
  try {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), 5000)
    )
    const authResult = supabase.auth.getSession()
    const { data } = await Promise.race([authResult, timeout])
    session = data?.session ?? null
  } catch (err) {
    console.warn('Supabase não respondeu (verifique o .env):', err.message)
    loading.classList.add('hide')
    await navegar('splash')
    return
  }

  // Esconde o loading

  if (!session) {
    // Sem sessão → tela de splash/onboarding
    loading.classList.add('hide')
    await navegar('splash')
    return
  }

  // Com sessão → verifica status do usuário
  try {
    const perfil = await getMeuPerfil()

    loading.classList.add('hide')

    if (!perfil) {
      // Usuário existe no auth mas não em public.usuarios (raro)
      await navegar('login')
      return
    }

    if (!perfil.admin_approved) {
      // Cadastro feito mas ainda não aprovado pelo admin
      await navegar('splash', { aguardandoAprovacao: true })
      return
    }

    // Redireciona para a home correta
    if (perfil.tipo === 'profissional') {
      await navegar('home-prof')
    } else if (perfil.tipo === 'empresa') {
      await navegar('home-emp')
    } else if (perfil.tipo === 'admin') {
      await navegar('admin-dashboard')
    }

  } catch (e) {
    console.error('Erro ao carregar perfil:', e)
    loading.classList.add('hide')
    await navegar('login')
  }
}

// ------- Ouvir mudanças de auth -------
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_OUT') {
    await navegar('login')
  }
  if (event === 'PASSWORD_RECOVERY') {
    await navegar('login', { modoRecuperacao: true })
  }
})

// ------- Start -------
inicializar()
