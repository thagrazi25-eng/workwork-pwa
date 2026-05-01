// =======================================================
// Tela: Cadastro — Empresa
// =======================================================
import { cadastrarEmpresa } from '../lib/supabase.js'
import { navegar, toast } from '../main.js'

let etapa = 1
const dados = {
  cnpj: '',
  razao_social: '',
  email: '',
  senha: '',
  telefone: '',
  plano: 'starter',
  avatarFile: null,
  avatarPreview: null,
  docFile: null,
  selfieFile: null
}

export function render(container) {
  etapa = 1
  renderEtapa(container)
}

function renderEtapa(container) {
  container.innerHTML = `
    <div style="height:100%; background:#F4F5F7; display:flex; flex-direction:column; padding:60px 32px 40px;">
      
      <button id="btnVoltar" style="background:none; border:none; cursor:pointer; color:#64748B; font-size:15px; font-weight:600; text-align:left; padding:0; margin-bottom:28px; width:fit-content;">
        ← Voltar
      </button>

      <div style="display:flex; gap:8px; margin-bottom:28px;">
        ${[1,2,3].map(i => `
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
        ">${etapa === 3 ? 'Finalizar Cadastro' : 'Continuar'}</button>
      </div>
    </div>
  `

  const content = document.getElementById('etapaContent')

  if (etapa === 1) {
    content.innerHTML = `
      <h2 style="font-size:24px; font-weight:800; color:#111827; margin-bottom:6px;">Dados da Empresa</h2>
      <p style="color:#64748B; font-size:15px; margin-bottom:28px;">Etapa 1 de 3 — Informações do negócio</p>

      <div style="display:flex; justify-content:center; margin-bottom:24px;">
        <div style="position:relative;">
          <div id="btnFotoRegEmp" style="width:80px; height:80px; border-radius:20px; background:#F3F4F6; border:1px dashed #D1D5DB; display:flex; align-items:center; justify-content:center; font-size:32px; color:#9CA3AF; cursor:pointer; overflow:hidden;">
            ${dados.avatarPreview ? `<img src="${dados.avatarPreview}" style="width:100%;height:100%;object-fit:cover;">` : '🏢'}
          </div>
          <input type="file" id="inpFotoRegEmp" accept="image/*" style="display:none;" />
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:16px;">
        <input id="cnpj"         placeholder="CNPJ"                value="${dados.cnpj}"         style="${inp()}" />
        <input id="razao_social" placeholder="Razão Social"        value="${dados.razao_social}" style="${inp()}" />
        <input id="telefone"     placeholder="Telefone / WhatsApp" value="${dados.telefone}"     style="${inp()}" />
        <input id="email"        placeholder="E-mail Corporativo"  value="${dados.email}"        type="email" style="${inp()}" />
        <input id="senha"        placeholder="Senha (mín. 6 caracteres)" type="password"         style="${inp()}" />
      </div>
    `
    const btnFotoRegEmp = document.getElementById('btnFotoRegEmp')
    const inpFotoRegEmp = document.getElementById('inpFotoRegEmp')
    if(btnFotoRegEmp && inpFotoRegEmp) {
      btnFotoRegEmp.onclick = () => inpFotoRegEmp.click()
      inpFotoRegEmp.onchange = (e) => {
        const file = e.target.files[0]
        if (file) {
          dados.avatarFile = file
          dados.avatarPreview = URL.createObjectURL(file)
          btnFotoRegEmp.innerHTML = `<img src="${dados.avatarPreview}" style="width:100%;height:100%;object-fit:cover;">`
        }
      }
    }

    // Busca de CNPJ Automática
    const inpCnpj = document.getElementById('cnpj')
    const inpRazao = document.getElementById('razao_social')
    if (inpCnpj && inpRazao) {
      inpCnpj.addEventListener('blur', async (e) => {
        const val = e.target.value.replace(/\D/g, '')
        if (val.length === 14) {
          try {
            inpRazao.value = 'Buscando...'
            const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${val}`)
            if (res.ok) {
              const data = await res.json()
              inpRazao.value = data.razao_social || data.nome_fantasia || ''
            } else {
              inpRazao.value = ''
              toast('CNPJ não encontrado ou inválido', 'error')
            }
          } catch (err) {
            inpRazao.value = ''
            console.error('Erro na BrasilAPI', err)
          }
        }
      })
    }
  } else if (etapa === 2) {
    content.innerHTML = `
      <h2 style="font-size:24px; font-weight:800; color:#111827; margin-bottom:6px;">Documentação (KYC)</h2>
      <p style="color:#64748B; font-size:15px; margin-bottom:24px;">Etapa 2 de 3 — Segurança e Validação</p>
      
      <p style="color:#4B5563; font-size:14px; margin-bottom:24px; line-height:1.5;">
        Para proteger nossa comunidade, exigimos a validação dos dados da empresa antes da liberação do perfil.
      </p>

      <div style="display:flex; flex-direction:column; gap:16px;">
        <div id="cardDocEmp" style="background:white; border:1px dashed #4F46E5; border-radius:16px; padding:24px; text-align:center; cursor:pointer; transition:all 0.2s;">
          <div id="statusDocEmp">
            <div style="font-size:32px; margin-bottom:8px;">📄</div>
            <h3 style="font-size:16px; font-weight:600; color:#111827; margin-bottom:4px;">Contrato Social ou CCMEI</h3>
            <p style="font-size:13px; color:#64748B;">Documento atualizado da empresa</p>
          </div>
          <input type="file" id="inpDocEmp" accept="image/*,application/pdf" style="display:none;" />
        </div>

        <div id="cardSelfieEmp" style="background:white; border:1px dashed #4F46E5; border-radius:16px; padding:24px; text-align:center; cursor:pointer; transition:all 0.2s;">
          <div id="statusSelfieEmp">
            <div style="font-size:32px; margin-bottom:8px;">🤳</div>
            <h3 style="font-size:16px; font-weight:600; color:#111827; margin-bottom:4px;">Selfie do Responsável</h3>
            <p style="font-size:13px; color:#64748B;">Com documento de identidade em mãos</p>
          </div>
          <input type="file" id="inpSelfieEmp" accept="image/*" style="display:none;" />
        </div>
      </div>
    `
    // Event Listeners Step 2
    const inpDocEmp = document.getElementById('inpDocEmp')
    const cardDocEmp = document.getElementById('cardDocEmp')
    if(cardDocEmp && inpDocEmp) {
      cardDocEmp.onclick = () => inpDocEmp.click()
      inpDocEmp.onchange = (e) => {
        const file = e.target.files[0]
        if(file) {
          dados.docFile = file
          cardDocEmp.style.border = '2px solid #10B981'
          cardDocEmp.style.backgroundColor = '#ECFDF5'
          document.getElementById('statusDocEmp').innerHTML = `
            <div style="font-size:32px; margin-bottom:8px;">✅</div>
            <h3 style="font-size:16px; font-weight:600; color:#065F46;">Documento Anexado</h3>
            <p style="font-size:13px; color:#065F46;">${file.name}</p>
          `
        }
      }
    }

    const inpSelfieEmp = document.getElementById('inpSelfieEmp')
    const cardSelfieEmp = document.getElementById('cardSelfieEmp')
    if(cardSelfieEmp && inpSelfieEmp) {
      cardSelfieEmp.onclick = () => inpSelfieEmp.click()
      inpSelfieEmp.onchange = (e) => {
        const file = e.target.files[0]
        if(file) {
          dados.selfieFile = file
          cardSelfieEmp.style.border = '2px solid #10B981'
          cardSelfieEmp.style.backgroundColor = '#ECFDF5'
          document.getElementById('statusSelfieEmp').innerHTML = `
            <div style="font-size:32px; margin-bottom:8px;">✅</div>
            <h3 style="font-size:16px; font-weight:600; color:#065F46;">Selfie Anexada</h3>
            <p style="font-size:13px; color:#065F46;">${file.name}</p>
          `
        }
      }
    }
  } else if (etapa === 3) {
    content.innerHTML = `
      <h2 style="font-size:24px; font-weight:800; color:#111827; margin-bottom:6px;">Escolha seu Plano</h2>
      <p style="color:#64748B; font-size:15px; margin-bottom:24px;">Etapa 3 de 3 — Assinatura</p>

      <div style="background:linear-gradient(135deg, #4F46E5, #3B82F6); border-radius:20px; padding:24px; color:white; margin-bottom:20px; position:relative; overflow:hidden;">
        <div style="position:absolute; top:-20px; right:-20px; font-size:100px; opacity:0.1;">👑</div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <h3 style="font-size:20px; font-weight:800;">Recrutador Pro</h3>
          <span style="background:rgba(255,255,255,0.2); padding:4px 10px; border-radius:8px; font-size:11px; font-weight:700;">Recomendado</span>
        </div>
        <p style="font-size:14px; opacity:0.9; margin-bottom:20px; line-height:1.5;">Publique vagas ilimitadas, acesse contatos diretos e contrate sem taxas adicionais.</p>
        <div style="display:flex; align-items:baseline; gap:4px;">
          <span style="font-size:16px; font-weight:600;">R$</span>
          <span style="font-size:36px; font-weight:800; letter-spacing:-1px;">149</span>
          <span style="font-size:16px; font-weight:600;">,90 / mês</span>
        </div>
      </div>

      <div style="background:#F1F5F9; border-radius:16px; padding:16px; display:flex; align-items:center; gap:16px;">
        <div style="font-size:24px;">🎁</div>
        <div>
          <h4 style="font-size:14px; font-weight:700; color:#1E293B; margin-bottom:2px;">7 dias grátis</h4>
          <p style="font-size:12px; color:#64748B;">Você só será cobrado após o período de teste. Cancele quando quiser.</p>
        </div>
      </div>
    `
  }

  // Voltar
  document.getElementById('btnVoltar').onclick = () => {
    if (etapa === 1) navegar('splash')
    else { etapa--; renderEtapa(container) }
  }

  // Avançar / Criar conta
  document.getElementById('btnAvancar').onclick = async () => {
    if (etapa === 1) {
      dados.cnpj         = document.getElementById('cnpj').value.trim()
      dados.razao_social = document.getElementById('razao_social').value.trim()
      dados.email        = document.getElementById('email').value.trim()
      dados.telefone     = document.getElementById('telefone').value.trim()
      dados.senha        = document.getElementById('senha').value

      if (!dados.cnpj || !dados.razao_social || !dados.email || !dados.senha) {
        toast('Preencha todos os campos obrigatórios', 'error'); return
      }
      if (dados.senha.length < 6) {
        toast('Senha deve ter pelo menos 6 caracteres', 'error'); return
      }
      etapa = 2; renderEtapa(container)

    } else if (etapa === 2) {
      // Simulação de KYC
      etapa = 3; renderEtapa(container)

    } else {
      const btn = document.getElementById('btnAvancar')
      btn.textContent = 'Enviando e Finalizando...'
      btn.disabled = true

      try {
        const { supabase, uploadAvatar, uploadDocumentoKYC } = await import('../lib/supabase.js')

        await cadastrarEmpresa({
          razao_social: dados.razao_social,
          cnpj: dados.cnpj,
          email: dados.email,
          senha: dados.senha,
          telefone: dados.telefone,
          plano: dados.plano
        })

        // Upload dos arquivos após cadastro com sucesso
        const uploads = []
        if (dados.avatarFile) uploads.push(uploadAvatar(dados.avatarFile))
        if (dados.docFile)    uploads.push(uploadDocumentoKYC(dados.docFile, 'documento'))
        if (dados.selfieFile) uploads.push(uploadDocumentoKYC(dados.selfieFile, 'selfie'))
        
        if(uploads.length) await Promise.all(uploads)

        navegar('splash', { aguardandoAprovacao: true })
      } catch (e) {
        console.error('ERRO CADASTRO EMPRESA:', e)
        toast(e.message?.includes('already') ? 'E-mail já cadastrado' : 'Erro ao cadastrar empresa. Veja o console.', 'error')
        btn.textContent = 'Finalizar Cadastro'
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
