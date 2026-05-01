// =======================================================
// Tela: Cadastro — Profissional (fluxo de 3 etapas)
// =======================================================
import { cadastrarProfissional } from '../lib/supabase.js'
import { navegar, toast } from '../main.js'

let etapa = 1
const dados = {
  nome: '',
  email: '',
  telefone: '',
  senha: '',
  bio: '',
  nicho: null,
  subcategorias: [],
  raio: 20,
  dias_semana: [],
  horarios: [],
  avatarFile: null,
  avatarPreview: null,
  docFile: null,
  selfieFile: null
}

const NICHOS_DATA = [
  { emoji: '🧱', nome: 'Pedreiro', tag: 'Construção / Reforma', subs: ['Geral', 'Acabamento', 'Alvenaria', 'Revestimento'] },
  { emoji: '⚡', nome: 'Eletricista', tag: 'Instalação / Manutenção', subs: ['Residencial', 'Predial', 'Industrial', 'Automação'] },
  { emoji: '🔧', nome: 'Encanador / Hidráulica', tag: 'Reparos Hidráulicos', subs: ['Reparo de Vazamentos', 'Instalação Nova', 'Desentupimento'] },
  { emoji: '🖌️', nome: 'Pintor', tag: 'Pintura', subs: ['Residencial', 'Comercial', 'Texturização', 'Gesso / Drywall'] },
  { emoji: '🧹', nome: 'Limpeza / Diarista', tag: 'Faxina', subs: ['Pontual', 'Semanal', 'Quinzenal', 'Mensal'] },
  { emoji: '🌿', nome: 'Jardineiro / Paisagista', tag: 'Paisagismo', subs: ['Manutenção', 'Poda', 'Plantio', 'Irrigação'] },
  { emoji: '🪵', nome: 'Marceneiro / Carpinteiro', tag: 'Móveis / Madeira', subs: ['Móveis Planejados', 'Reparo', 'Deck', 'Portas / Janelas'] },
  { emoji: '🛡️', nome: 'Vigilante / Segurança', tag: 'Proteção', subs: ['Diurno', 'Noturno', '12x36', 'Portaria'] },
  { emoji: '🚗', nome: 'Motorista / Entregador', tag: 'Transporte', subs: ['Moto', 'Carro', 'Van', 'Caminhão'] },
  { emoji: '🤲', nome: 'Cuidador de Idosos / Crianças', tag: 'Cuidados Pessoais', subs: ['Idoso', 'Criança', 'PCD', 'Hospitalar'] },
  { emoji: '🏭', nome: 'Auxiliar de Produção', tag: 'Indústria / Logística', subs: ['Alimentício', 'Montagem', 'Embalagem', 'Estoque'] },
  { emoji: '🏗️', nome: 'Aux. Serviços Gerais', tag: 'Apoio Operacional', subs: ['Condomínio', 'Escritório', 'Obra', 'Shopping'] },
  { emoji: '🍳', nome: 'Cozinheiro / Auxiliar de Coz.', tag: 'Gastronomia', subs: ['Eventos', 'Fixo', 'Diarista', 'Fast Food'] },
  { emoji: '💻', nome: 'Técnico de TI / Informática', tag: 'Suporte Técnico', subs: ['Manutenção de PC', 'Redes', 'CFTV', 'Software'] },
  { emoji: '💆', nome: 'Esteticista / Massagista', tag: 'Beleza e Bem-estar', subs: ['Massagem', 'Depilação', 'Estética Facial', 'Unhas'] },
  { emoji: '➕', nome: 'Outros', tag: 'Personalizado', subs: ['Digitar manual...'] }
]

export function render(container) {
  etapa = 1
  renderEtapa(container)
}

function renderEtapa(container) {
  container.innerHTML = `
    <div style="min-height:100dvh; background:#F4F5F7; display:flex; flex-direction:column; padding:60px 32px 40px;">
      
      <button id="btnVoltar" style="background:none; border:none; cursor:pointer; color:#64748B; font-size:15px; font-weight:600; text-align:left; padding:0; margin-bottom:28px; width:fit-content;">
        ← Voltar
      </button>

      <div style="display:flex; gap:8px; margin-bottom:28px;">
        ${[1,2,3,4].map(i => `
          <div style="flex:1; height:5px; border-radius:3px; background:${i <= etapa ? '#4F46E5' : '#E5E7EB'};"></div>
        `).join('')}
      </div>

      <div id="etapaContent" style="flex:1; overflow-y:auto; margin-bottom:20px;"></div>

      <div style="margin-top:auto; padding-top:24px; background:linear-gradient(to top, #F4F5F7 80%, transparent); margin: 0 -32px; padding: 24px 32px 0;">
        <button id="btnAvancar" style="
          width:100%; padding:16px; border-radius:14px;
          background:#4F46E5; color:white; border:none;
          font-size:16px; font-weight:700; cursor:pointer;
          font-family:'Inter',sans-serif;
          transition: transform 0.1s;
        ">${etapa === 4 ? 'Enviar e Criar Conta' : 'Continuar'}</button>
      </div>
    </div>
  `

  const content = document.getElementById('etapaContent')

  if (etapa === 1) {
    content.innerHTML = `
      <h2 style="font-size:24px; font-weight:800; color:#111827; margin-bottom:6px;">Seus dados</h2>
      <p style="color:#64748B; font-size:15px; margin-bottom:28px;">Etapa 1 de 4 — Informações básicas</p>

      <div style="display:flex; justify-content:center; margin-bottom:24px;">
        <div style="position:relative;">
          <div id="btnFotoReg" style="width:80px; height:80px; border-radius:40px; background:#F3F4F6; border:1px dashed #D1D5DB; display:flex; align-items:center; justify-content:center; font-size:24px; color:#9CA3AF; cursor:pointer; overflow:hidden;">
            ${dados.avatarPreview ? `<img src="${dados.avatarPreview}" style="width:100%;height:100%;object-fit:cover;">` : '📷'}
          </div>
          <input type="file" id="inpFotoReg" accept="image/*" style="display:none;" />
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:16px;">
        <input id="nome"     placeholder="Seu nome completo" value="${dados.nome}"     style="${inp()}" />
        <input id="email"    placeholder="E-mail"            value="${dados.email}"    type="email" style="${inp()}" />
        <input id="telefone" placeholder="Telefone (DDD + número)" value="${dados.telefone}" style="${inp()}" />
        <textarea id="bio" placeholder="Fale um pouco sobre sua experiência... (Opcional)" style="${inp()} resize:none; height:100px;">${dados.bio || ''}</textarea>
        <input id="senha"    placeholder="Senha (mín. 6 caracteres)" type="password"     style="${inp()}" />
      </div>
    `

    const btnFotoReg = document.getElementById('btnFotoReg')
    const inpFotoReg = document.getElementById('inpFotoReg')
    if(btnFotoReg && inpFotoReg) {
      btnFotoReg.onclick = () => inpFotoReg.click()
      inpFotoReg.onchange = (e) => {
        const file = e.target.files[0]
        if (file) {
          dados.avatarFile = file
          dados.avatarPreview = URL.createObjectURL(file)
          btnFotoReg.innerHTML = `<img src="${dados.avatarPreview}" style="width:100%;height:100%;object-fit:cover;">`
        }
      }
    }
  } else if (etapa === 2) {
    content.innerHTML = `
      <h2 style="font-size:24px; font-weight:800; color:#111827; margin-bottom:6px;">Sua área</h2>
      <p style="color:#64748B; font-size:15px; margin-bottom:24px;">Etapa 2 de 4 — Qual é o seu trabalho?</p>

      <div id="nichos-container">
        ${NICHOS_DATA.map(n => `
          <div class="niche-card ${dados.nicho === n.nome ? 'selected' : ''}" data-nicho="${n.nome}">
            <div class="niche-header">
              <span class="niche-icon">${n.emoji}</span>
              <div class="niche-label">
                <p class="niche-name">${n.nome}</p>
                <span style="display:inline-block; padding:4px 10px; background:${dados.nicho === n.nome ? 'rgba(79, 70, 229, 0.15)' : '#E5E7EB'}; color:${dados.nicho === n.nome ? '#3730A3' : '#64748B'}; font-size:11px; font-weight:600; border-radius:12px; margin-top:4px;">
                  ${n.tag}
                </span>
              </div>
              <div class="radio-circle">
                <div class="radio-dot"></div>
              </div>
            </div>
            
            ${dados.nicho === n.nome ? `
              <div class="specs-panel">
                <p class="spec-group-title">Especialidades (Opcional)</p>
                <div class="spec-options">
                  ${n.subs.map(s => `
                    <div class="spec-chip ${dados.subcategorias.includes(s) ? 'active' : ''}" data-sub="${s}">${s}</div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `
    // Eventos de Nicho
    document.querySelectorAll('.niche-header').forEach(el => {
      el.onclick = () => {
        const novoNicho = el.closest('.niche-card').dataset.nicho
        if (dados.nicho !== novoNicho) {
          dados.nicho = novoNicho
          dados.subcategorias = [] // Reseta subs ao trocar nicho
          renderEtapa(container)
        }
      }
    })

    // Eventos de Subcategoria
    document.querySelectorAll('.spec-chip').forEach(el => {
      el.onclick = (e) => {
        e.stopPropagation()
        const sub = el.dataset.sub
        if (dados.subcategorias.includes(sub)) {
          dados.subcategorias = dados.subcategorias.filter(s => s !== sub)
        } else {
          dados.subcategorias.push(sub)
        }
        renderEtapa(container)
      }
    })

  } else if (etapa === 3) {
    content.innerHTML = `
      <h2 style="font-size:24px; font-weight:800; color:#111827; margin-bottom:6px;">Área e Disponibilidade</h2>
      <p style="color:#64748B; font-size:15px; margin-bottom:24px;">Até qual distância e quando você pode trabalhar?</p>

      <label style="display:block; font-size:13px; font-weight:600; color:#111827; margin-bottom:8px;">Raio de Atendimento</label>
      <div style="background:white; border:1px solid #D1D5DB; border-radius:16px; padding:16px; margin-bottom:24px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:14px; font-weight:600; color:#3730A3;">
          <span>Distância Máxima</span>
          <span id="raioDisplay">${dados.raio} km</span>
        </div>
        <input type="range" min="1" max="100" value="${dados.raio}" id="inpRaio" style="width:100%; accent-color:#4F46E5;">
      </div>

      <label style="display:block; font-size:13px; font-weight:600; color:#111827; margin-bottom:8px;">Dias da semana</label>
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px;">
        ${['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(dia => `
          <div class="dia-chip ${dados.dias_semana.includes(dia) ? 'active' : ''}" data-dia="${dia}" style="
            padding:8px 16px; border-radius:20px; font-size:14px; font-weight:500; cursor:pointer; transition:all 0.15s;
            ${dados.dias_semana.includes(dia) 
              ? 'background:#EEF2FF; color:#4F46E5; border:1.5px solid #4F46E5;' 
              : 'background:white; color:#4B5563; border:1px solid #D1D5DB;'}
          ">${dia}</div>
        `).join('')}
      </div>

      <label style="display:block; font-size:13px; font-weight:600; color:#111827; margin-bottom:8px;">Horário preferencial</label>
      <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:16px;">
        ${[
          ['☀️', 'Manhã', '06h - 12h'],
          ['☁️', 'Tarde', '12h - 18h'],
          ['🌙', 'Noite', '18h - 22h']
        ].map(([icon, titulo, horario]) => `
          <div class="hora-card ${dados.horarios.includes(titulo) ? 'active' : ''}" data-hora="${titulo}" style="
            display:flex; align-items:center; gap:16px; padding:16px; border-radius:16px; cursor:pointer; transition:all 0.2s;
            ${dados.horarios.includes(titulo)
              ? 'background:#EEF2FF; border:1.5px solid #4F46E5;'
              : 'background:white; border:1px solid #D1D5DB;'}
          ">
            <span style="font-size:24px;">${icon}</span>
            <div style="flex:1;">
              <p style="font-weight:600; font-size:15px; color:#111827; margin-bottom:2px;">${titulo}</p>
              <p style="font-size:13px; color:#64748B;">${horario}</p>
            </div>
            <div style="width:20px; height:20px; border-radius:50%; display:flex; align-items:center; justify-content:center;
              ${dados.horarios.includes(titulo) ? 'border:6px solid #4F46E5; background:white;' : 'border:2px solid #D1D5DB;'}
            "></div>
          </div>
        `).join('')}
      </div>
    `

    // Event listeners
    const inpRaio = document.getElementById('inpRaio')
    if(inpRaio) {
      inpRaio.oninput = (e) => {
        dados.raio = e.target.value
        document.getElementById('raioDisplay').textContent = `${dados.raio} km`
      }
    }

    document.querySelectorAll('.dia-chip').forEach(el => {
      el.onclick = () => {
        const d = el.dataset.dia
        if (dados.dias_semana.includes(d)) dados.dias_semana = dados.dias_semana.filter(x => x !== d)
        else dados.dias_semana.push(d)
        renderEtapa(container)
      }
    })

    document.querySelectorAll('.hora-card').forEach(el => {
      el.onclick = () => {
        const h = el.dataset.hora
        if (dados.horarios.includes(h)) dados.horarios = dados.horarios.filter(x => x !== h)
        else dados.horarios.push(h)
        renderEtapa(container)
      }
    })

  } else if (etapa === 4) {
    content.innerHTML = `
      <h2 style="font-size:24px; font-weight:800; color:#111827; margin-bottom:6px;">Verificação (KYC)</h2>
      <p style="color:#64748B; font-size:15px; margin-bottom:24px;">Etapa 4 de 4 — Segurança da Plataforma</p>
      
      <p style="color:#4B5563; font-size:14px; margin-bottom:24px; line-height:1.5;">
        Para garantir a segurança de todos, precisamos de uma foto do seu documento e uma selfie sua.
      </p>

      <div style="display:flex; flex-direction:column; gap:16px;">
        <!-- Card Documento -->
        <div id="cardDoc" style="background:white; border:1px dashed #4F46E5; border-radius:16px; padding:24px; text-align:center; cursor:pointer; transition:all 0.2s;">
          <div id="statusDoc">
            <div style="font-size:32px; margin-bottom:8px;">🪪</div>
            <h3 style="font-size:16px; font-weight:600; color:#111827; margin-bottom:4px;">Foto do RG ou CNH</h3>
            <p style="font-size:13px; color:#64748B;">Frente e Verso legível</p>
          </div>
          <input type="file" id="inpDoc" accept="image/*" style="display:none;" />
        </div>

        <!-- Card Selfie -->
        <div id="cardSelfie" style="background:white; border:1px dashed #4F46E5; border-radius:16px; padding:24px; text-align:center; cursor:pointer; transition:all 0.2s;">
          <div id="statusSelfie">
            <div style="font-size:32px; margin-bottom:8px;">🤳</div>
            <h3 style="font-size:16px; font-weight:600; color:#111827; margin-bottom:4px;">Selfie com o documento</h3>
            <p style="font-size:13px; color:#64748B;">Rosto nítido em local iluminado</p>
          </div>
          <input type="file" id="inpSelfie" accept="image/*" style="display:none;" />
        </div>
      </div>
    `

    // Event Listeners Step 4
    const inpDoc = document.getElementById('inpDoc')
    const cardDoc = document.getElementById('cardDoc')
    if(cardDoc && inpDoc) {
      cardDoc.onclick = () => inpDoc.click()
      inpDoc.onchange = (e) => {
        const file = e.target.files[0]
        if(file) {
          dados.docFile = file
          cardDoc.style.border = '2px solid #10B981'
          cardDoc.style.backgroundColor = '#ECFDF5'
          document.getElementById('statusDoc').innerHTML = `
            <div style="font-size:32px; margin-bottom:8px;">✅</div>
            <h3 style="font-size:16px; font-weight:600; color:#065F46;">Documento Anexado</h3>
            <p style="font-size:13px; color:#065F46;">${file.name}</p>
          `
        }
      }
    }

    const inpSelfie = document.getElementById('inpSelfie')
    const cardSelfie = document.getElementById('cardSelfie')
    if(cardSelfie && inpSelfie) {
      cardSelfie.onclick = () => inpSelfie.click()
      inpSelfie.onchange = (e) => {
        const file = e.target.files[0]
        if(file) {
          dados.selfieFile = file
          cardSelfie.style.border = '2px solid #10B981'
          cardSelfie.style.backgroundColor = '#ECFDF5'
          document.getElementById('statusSelfie').innerHTML = `
            <div style="font-size:32px; margin-bottom:8px;">✅</div>
            <h3 style="font-size:16px; font-weight:600; color:#065F46;">Selfie Anexada</h3>
            <p style="font-size:13px; color:#065F46;">${file.name}</p>
          `
        }
      }
    }
  }

  // Voltar
  document.getElementById('btnVoltar').onclick = () => {
    if (etapa === 1) navegar('splash')
    else { etapa--; renderEtapa(container) }
  }

  // Avançar / Criar conta
  document.getElementById('btnAvancar').onclick = async () => {
    if (etapa === 1) {
      dados.nome     = document.getElementById('nome').value.trim()
      dados.email    = document.getElementById('email').value.trim()
      dados.telefone = document.getElementById('telefone').value.trim()
      dados.bio      = document.getElementById('bio').value.trim()
      dados.senha    = document.getElementById('senha').value

      if (!dados.nome || !dados.email || !dados.senha) {
        toast('Preencha todos os campos obrigatórios', 'error'); return
      }
      if (dados.senha.length < 6) {
        toast('Senha deve ter pelo menos 6 caracteres', 'error'); return
      }
      etapa = 2; renderEtapa(container)

    } else if (etapa === 2) {
      if (!dados.nicho) { toast('Selecione sua área de atuação', 'error'); return }
      etapa = 3; renderEtapa(container)

    } else if (etapa === 3) {
      if (dados.dias_semana.length === 0) { toast('Selecione pelo menos um dia', 'error'); return }
      if (dados.horarios.length === 0) { toast('Selecione pelo menos um horário', 'error'); return }
      etapa = 4; renderEtapa(container)

    } else {
      // Finalização (Etapa 4 KYC)
      // Como é protótipo/PWA, consideramos que o usuário anexou se clicou
      
      const btn = document.getElementById('btnAvancar')
      btn.textContent = 'Enviando Documentos...'
      btn.disabled = true

      try {
        const { supabase, uploadAvatar, uploadDocumentoKYC } = await import('../lib/supabase.js')
        
        await cadastrarProfissional({
          nome: dados.nome,
          email: dados.email,
          senha: dados.senha,
          telefone: dados.telefone,
          meta: { 
            bio: dados.bio,
            nicho: dados.nicho, 
            subcategorias: dados.subcategorias, 
            raio: dados.raio,
            dias_semana: dados.dias_semana,
            horarios: dados.horarios
          }
        })
        
        // Upload dos arquivos após cadastro com sucesso
        const uploads = []
        if (dados.avatarFile) uploads.push(uploadAvatar(dados.avatarFile))
        if (dados.docFile)    uploads.push(uploadDocumentoKYC(dados.docFile, 'documento'))
        if (dados.selfieFile) uploads.push(uploadDocumentoKYC(dados.selfieFile, 'selfie'))
        
        if(uploads.length) await Promise.all(uploads)
        
        navegar('splash', { aguardandoAprovacao: true })
      } catch (e) {
        console.error('ERRO CADASTRO PROFISSIONAL:', e)
        toast(e.message?.includes('already') ? 'E-mail já cadastrado' : 'Erro ao criar conta. Veja o console.', 'error')
        btn.textContent = 'Enviar e Criar Conta'
        btn.disabled = false
      }
    }
  }
}

const inp = () => `
  width:100%; padding:14px 16px; border:1.5px solid #D1D5DB;
  border-radius:12px; font-size:15px; font-family:'Inter',sans-serif;
  background:white; outline:none; box-sizing:border-box; transition: border-color 0.2s;
`
