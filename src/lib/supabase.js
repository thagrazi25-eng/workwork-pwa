// =======================================================
// WORKWORK — Integração Supabase SDK
// Gerencia Auth, Database e Storage
// =======================================================

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY  = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Erro: Variáveis de ambiente do Supabase não encontradas. Verifique o arquivo .env')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// -------------------------------------------------------
// AUTH — Sessão e Perfil
// -------------------------------------------------------

export async function login(email, senha) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha
  })
  if (error) throw error
  return data
}

export async function logout() {
  await supabase.auth.signOut()
}

export async function recuperarSenha(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/login'
  })
  if (error) throw error
}

export async function getMeuPerfil() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('usuarios')
    .select('*, profissionais(*), empresas(*)')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('Erro ao buscar perfil:', error)
    return null
  }
  return data
}

export async function atualizarPerfil(campos) {
  const { data: { user } } = await supabase.auth.getUser()
  const { error } = await supabase
    .from('usuarios')
    .update(campos)
    .eq('id', user.id)
  if (error) throw error
}

// -------------------------------------------------------
// CADASTRO
// -------------------------------------------------------

export async function cadastrarProfissional({ nome, email, senha, telefone, meta = {} }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: senha,
    options: {
      data: { nome, tipo: 'profissional', telefone }
    }
  })
  if (error) throw error

  // Se o usuário foi criado, insere os dados extras na tabela profissionais
  if (data.user) {
    const { error: profError } = await supabase
      .from('profissionais')
      .upsert({
        id: data.user.id,
        bio: meta.bio || '',
        nicho: meta.nicho || '',
        experiencia_anos: 0,
        subcategorias: meta.subcategorias || [],
        disponibilidade_dias: meta.dias_semana || [],
        disponibilidade_turnos: meta.horarios || [],
        raio_atendimento: parseInt(meta.raio) || 20
      })
      
    if (profError) {
      console.warn('Erro ao inserir meta do profissional (verifique schema SQL):', profError)
      // Não joga erro para não quebrar o fluxo de auth, mas avisa no console
    }
  }

  return data
}

export async function cadastrarEmpresa({ nome, email, senha, cnpj, razaoSocial, cidade }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: senha,
    options: {
      data: { nome, tipo: 'empresa' }
    }
  })
  if (error) throw error

  if (data.user) {
    const { error: empError } = await supabase
      .from('empresas')
      .insert({
        id:           data.user.id,
        cnpj,
        razao_social: razaoSocial,
        cidade
      })
    if (empError) throw empError
  }
  return data
}

// -------------------------------------------------------
// VAGAS
// -------------------------------------------------------

export async function listarVagas({ cidade, nicho, pagina = 0 } = {}) {
  let query = supabase
    .from('vagas')
    .select('*, empresas(razao_social, cidade)')
    .eq('status', 'aberta')
    .order('created_at', { ascending: false })
    .range(pagina * 20, pagina * 20 + 19)

  if (cidade) query = query.ilike('cidade', `%${cidade}%`)
  if (nicho)  query = query.eq('nicho_id', nicho)

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function criarVaga(vaga) {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('vagas')
    .insert({ ...vaga, empresa_id: user.id })
    .select()
    .single()
  if (error) throw error
  return data
}

// -------------------------------------------------------
// CANDIDATURAS
// -------------------------------------------------------

export async function candidatar(vagaId) {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('candidaturas')
    .insert({ vaga_id: vagaId, profissional_id: user.id })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getCandidatos(vagaId) {
  const { data, error } = await supabase
    .from('candidaturas')
    .select('*, profissionais(*, usuarios(nome, avatar_url, telefone))')
    .eq('vaga_id', vagaId)
  if (error) throw error
  return data
}

// -------------------------------------------------------
// CHAT
// -------------------------------------------------------

export async function getMensagens(outroUserId) {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('mensagens')
    .select('*')
    .or(
      `and(remetente_id.eq.${user.id},destinatario_id.eq.${outroUserId}),` +
      `and(remetente_id.eq.${outroUserId},destinatario_id.eq.${user.id})`
    )
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

export function ouvirMensagens(outroUserId, callback) {
  return supabase
    .channel('chat')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'mensagens'
    }, (payload) => {
      const msg = payload.new
      if (
        (msg.remetente_id === outroUserId) ||
        (msg.destinatario_id === outroUserId)
      ) callback(msg)
    })
    .subscribe()
}

export async function enviarMensagem(destinatarioId, texto) {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('mensagens')
    .insert({ remetente_id: user.id, destinatario_id: destinatarioId, texto })
    .select()
    .single()
  if (error) throw error
  return data
}

// -------------------------------------------------------
// UPLOAD
// -------------------------------------------------------

export async function uploadAvatar(file) {
  const { data: { user } } = await supabase.auth.getUser()
  const ext  = file.name.split('.').pop()
  const path = `${user.id}/avatar.${ext}`

  const { error: upError } = await supabase.storage
    .from('avatars')
    .upload(path, file, { upsert: true })

  if (upError) throw upError
  const { data } = supabase.storage.from('avatars').getPublicUrl(path)
  await atualizarPerfil({ avatar_url: data.publicUrl })
  return data.publicUrl
}

export async function uploadDocumentoKYC(file, tipo) {
  const { data: { user } } = await supabase.auth.getUser()
  const ext  = file.name.split('.').pop()
  const path = `${user.id}/${tipo}.${ext}`

  const { error: upError } = await supabase.storage
    .from('documentos-kyc')
    .upload(path, file, { upsert: true })

  if (upError) throw upError

  const { error: dbError } = await supabase
    .from('documentos_kyc')
    .upsert({
      usuario_id: user.id,
      tipo,
      url: path,
      status: 'pendente'
    })
  if (dbError) throw dbError
}
