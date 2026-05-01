// =======================================================
// Tela: Cadastro — Empresa (Idêntico ao Protótipo)
// Fluxo: Dados → Nichos Buscados → Plano → Pagamento
// =======================================================
import { cadastrarEmpresa } from '../lib/supabase.js'
import { navegar, toast } from '../main.js'

let etapa = 1
const dados = {
  cnpj: '',
  razao_social: '',
  cidade: '',
  email: '',
  senha: '',
  telefone: '',
  nichos_buscados: [],
  plano: 'basic',
  avatarFile: null,
  avatarPreview: null,
  docFile: null,
  selfieFile: null
}

const NICHOS_EMP = [
  'Pedreiro', 'Eletricista', 'Encanador / Hidráulica', 'Pintor',
  'Limpeza / Diarista', 'Jardineiro', 'Marceneiro', 'Vigilante',
  'Motorista / Entregador', 'Cuidador', 'Auxiliar de Produção',
  'Serviços Gerais', 'Cozinheiro', 'Técnico de TI', 'Esteticista', 'Outros'
]

const CIDADES_BR = [
  'São Paulo, SP','Rio de Janeiro, RJ','Brasília, DF','Salvador, BA',
  'Fortaleza, CE','Belo Horizonte, MG','Manaus, AM','Curitiba, PR',
  'Recife, PE','Porto Alegre, RS','Belém, PA','Goiânia, GO',
  'Guarulhos, SP','Campinas, SP','São Luís, MA','Maceió, AL',
  'Natal, RN','Teresina, PI','Campo Grande, MS','Florianópolis, SC',
  'João Pessoa, PB','Ribeirão Preto, SP','Uberlândia, MG','Sorocaba, SP',
  'Cuiabá, MT','Aracaju, SE','Joinville, SC','Londrina, PR','Juiz de Fora, MG',
  'Porto Velho, RO','Vitória, ES','Niterói, RJ','Santos, SP'
]

export function render(container) {
  etapa = 1
  dados.cnpj = ''; dados.razao_social = ''; dados.cidade = ''
  dados.email = ''; dados.senha = ''; dados.telefone = ''
  dados.nichos_buscados = []; dados.avatarFile = null; dados.avatarPreview = null
  dados.docFile = null; dados.selfieFile = null
  renderEtapa(container)
}

function renderEtapa(container) {
  const totalEtapas = 4
  container.innerHTML = `
    <div style="height:100%; background:#F4F5F7; display:flex; flex-direction:column; font-family:'Inter',sans-serif;">

      <!-- Progress Bar -->
      <div style="background:white; padding:52px 24px 16px; flex-shrink:0; border-bottom:1px solid #E5E7EB;">
        <button id="btnVoltar" style="background:none; border:none; cursor:pointer; color:#64748B; font-size:15px; font-weight:600; padding:0; margin-bottom:20px; display:flex; align-items:center; gap:6px;">
          ← Voltar
        </button>
        <div style="display:flex; gap:8px;">
          ${[1,2,3,4].map(i => `
            <div style="flex:1; height:6px; border-radius:3px; background:${i <= etapa ? '#4F46E5' : '#E5E7EB'};"></div>
          `).join('')}
        </div>
      </div>

      <!-- Content -->
      <div id="etapaContent" style="flex:1; overflow-y:auto; padding:24px 24px 140px;"></div>

      <!-- Bottom Fixed Button -->
      <div style="position:absolute; bottom:0; left:0; right:0; padding:24px; background:linear-gradient(to top, #F4F5F7 85%, transparent); z-index:10;">
        <button id="btnAvancar" style="
          width:100%; padding:16px; border-radius:12px;
          background:#4F46E5; color:white; border:none;
          font-size:16px; font-weight:600; cursor:pointer;
          font-family:'Inter',sans-serif;
        ">${etapa === 4 ? 'Salvar e Finalizar' : 'Continuar'}</button>
        ${etapa === 4 ? `<button id="btnPularPagamento" style="
          width:100%; padding:12px; background:none; border:none;
          color:#64748B; font-size:14px; cursor:pointer; font-family:'Inter',sans-serif;
          margin-top:4px;
        ">Pular por enquanto e começar teste</button>` : ''}
      </div>
    </div>
  `

  const content = document.getElementById('etapaContent')
  renderConteudo(content, container)
  setupNav(container)
}

function renderConteudo(content, container) {
  if (etapa === 1) {
    content.innerHTML = `
      <h2 style="font-size:24px; font-weight:700; color:#111827; margin-bottom:24px;">Dados da empresa</h2>

      <div style="display:flex; justify-content:center; margin-bottom:24px;">
        <div id="btnFotoEmp" style="
          width:80px; height:80px; border-radius:20px;
          background:#F3F4F6; border:1px dashed #D1D5DB;
          display:flex; align-items:center; justify-content:center;
          font-size:32px; cursor:pointer; overflow:hidden;
        ">${dados.avatarPreview ? `<img src="${dados.avatarPreview}" style="width:100%;height:100%;object-fit:cover;">` : '🏢'}</div>
        <input type="file" id="inpFotoEmp" accept="image/*" style="display:none;">
      </div>

      <div style="display:flex; flex-direction:column; gap:0;">

        <!-- CNPJ -->
        <div style="margin-bottom:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <label style="${labelStyle()}">CNPJ</label>
            <span id="cnpjStatus" style="font-size:12px; font-weight:700; display:none;"></span>
          </div>
          <div style="position:relative;">
            <input id="cnpj" type="text" placeholder="00.000.000/0000-00" maxlength="18" value="${dados.cnpj}" style="${inp()} padding-right:48px;">
            <div id="cnpjSpinner" style="display:none; position:absolute; right:16px; top:50%; transform:translateY(-50%); font-size:18px;">⏳</div>
          </div>
        </div>

        <!-- Razão Social -->
        <div style="margin-bottom:20px;">
          <label style="${labelStyle()}">Razão Social</label>
          <input id="razao_social" type="text" placeholder="Preenchido automaticamente pelo CNPJ" value="${dados.razao_social}"
            style="${inp()} background:#F3F4F6; color:#64748B;" readonly>
        </div>

        <!-- Cidade -->
        <div style="margin-bottom:20px;">
          <label style="${labelStyle()}">Cidade / UF</label>
          <input id="cidade" type="text" placeholder="🔍 Digite para buscar a cidade..." list="cidadesBR" value="${dados.cidade}" style="${inp()}">
          <datalist id="cidadesBR">${CIDADES_BR.map(c => `<option value="${c}">`).join('')}</datalist>
        </div>

        <!-- Telefone -->
        <div style="margin-bottom:20px;">
          <label style="${labelStyle()}">Telefone</label>
          <input id="telefone" type="tel" placeholder="(00) 00000-0000" value="${dados.telefone}" style="${inp()}">
        </div>

        <!-- E-mail -->
        <div style="margin-bottom:20px;">
          <label style="${labelStyle()}">E-mail Corporativo</label>
          <input id="email" type="email" placeholder="contato@suaempresa.com.br" value="${dados.email}" style="${inp()}">
        </div>

        <!-- Senha -->
        <div style="margin-bottom:20px;">
          <label style="${labelStyle()}">Senha (mín. 6 caracteres)</label>
          <input id="senha" type="password" placeholder="••••••••" style="${inp()}">
        </div>
      </div>
    `

    // Foto
    const btnFoto = document.getElementById('btnFotoEmp')
    const inpFoto = document.getElementById('inpFotoEmp')
    btnFoto.onclick = () => inpFoto.click()
    inpFoto.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        dados.avatarFile = file
        dados.avatarPreview = URL.createObjectURL(file)
        btnFoto.innerHTML = `<img src="${dados.avatarPreview}" style="width:100%;height:100%;object-fit:cover;">`
      }
    }

    // CNPJ auto-fill
    document.getElementById('cnpj').addEventListener('input', (e) => {
      // Máscara CNPJ
      let v = e.target.value.replace(/\D/g, '')
      v = v.replace(/^(\d{2})(\d)/, '$1.$2')
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      v = v.replace(/\.(\d{3})(\d)/, '.$1/$2')
      v = v.replace(/(\d{4})(\d)/, '$1-$2')
      e.target.value = v

      if (v.replace(/\D/g, '').length === 14) {
        fetchCNPJ(v.replace(/\D/g, ''))
      }
    })

  } else if (etapa === 2) {
    content.innerHTML = `
      <h2 style="font-size:24px; font-weight:700; color:#111827; margin-bottom:8px;">De quais profissionais você precisa?</h2>
      <p style="color:#64748B; font-size:14px; margin-bottom:24px;">Selecione quantas áreas desejar.</p>

      <input id="buscaNicho" type="text" placeholder="🔍 Buscar profissão ou área..." style="${inp()} margin-bottom:16px;">

      <div id="nichosGrid" style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:32px;">
        ${NICHOS_EMP.map(n => `
          <div class="chip-nicho ${dados.nichos_buscados.includes(n) ? 'ativo' : ''}" data-nicho="${n}" style="
            padding:10px 16px; border-radius:30px;
            border:1px solid ${dados.nichos_buscados.includes(n) ? '#4F46E5' : '#D1D5DB'};
            background:${dados.nichos_buscados.includes(n) ? 'rgba(79,70,229,0.1)' : 'white'};
            color:${dados.nichos_buscados.includes(n) ? '#3730A3' : '#111827'};
            font-size:14px; font-weight:500; cursor:pointer; transition:all 0.15s;
          ">${n}</div>
        `).join('')}
      </div>
    `

    // Toggle nichos
    document.querySelectorAll('.chip-nicho').forEach(chip => {
      chip.onclick = () => {
        const nicho = chip.dataset.nicho
        if (dados.nichos_buscados.includes(nicho)) {
          dados.nichos_buscados = dados.nichos_buscados.filter(n => n !== nicho)
          chip.style.borderColor = '#D1D5DB'
          chip.style.background = 'white'
          chip.style.color = '#111827'
          chip.classList.remove('ativo')
        } else {
          dados.nichos_buscados.push(nicho)
          chip.style.borderColor = '#4F46E5'
          chip.style.background = 'rgba(79,70,229,0.1)'
          chip.style.color = '#3730A3'
          chip.classList.add('ativo')
        }
      }
    })

    // Busca de nichos
    document.getElementById('buscaNicho').oninput = (e) => {
      const q = e.target.value.toLowerCase()
      document.querySelectorAll('.chip-nicho').forEach(chip => {
        chip.style.display = chip.dataset.nicho.toLowerCase().includes(q) ? '' : 'none'
      })
    }

  } else if (etapa === 3) {
    content.innerHTML = `
      <h2 style="font-size:26px; font-weight:800; color:#111827; margin-bottom:8px; letter-spacing:-0.5px;">Escolha seu Plano</h2>
      <p style="color:#64748B; font-size:15px; margin-bottom:32px; line-height:1.4;">
        Libere o acesso total à plataforma e comece a contratar hoje mesmo.
      </p>

      <div style="
        border:2.5px solid #4F46E5; padding:32px 24px; border-radius:28px;
        background:white; box-shadow:0 20px 40px rgba(79,70,229,0.12);
        position:relative; overflow:visible;
      ">
        <!-- Badge trial -->
        <div style="
          position:absolute; top:-14px; left:24px;
          background:#059669; color:white;
          padding:6px 16px; border-radius:30px;
          font-size:12px; font-weight:800; text-transform:uppercase;
          box-shadow:0 8px 15px rgba(5,150,105,0.25);
          display:flex; align-items:center; gap:6px;
        ">🎁 7 Dias Grátis</div>

        <div style="text-align:center; margin-bottom:24px;">
          <div style="font-weight:800; font-size:22px; color:#111827; margin-bottom:8px;">Empresa Basic</div>
          <div style="display:flex; align-items:baseline; justify-content:center; gap:4px;">
            <span style="font-size:18px; font-weight:600; color:#64748B;">R$</span>
            <span style="font-size:48px; font-weight:900; color:#4F46E5; letter-spacing:-1px;">149,90</span>
            <span style="font-size:16px; font-weight:600; color:#64748B;">/mês</span>
          </div>
        </div>

        <div style="
          background:rgba(5,150,105,0.08); color:#059669;
          padding:12px; border-radius:12px;
          font-size:14px; font-weight:700; text-align:center;
          margin-bottom:24px; border:1px solid rgba(5,150,105,0.2);
        ">✦ Teste sem compromisso por 7 dias</div>

        <ul style="list-style:none; padding:0; font-size:15px; color:#111827; line-height:2.2;">
          <li style="display:flex; align-items:center; gap:10px;"><span style="color:#059669; font-weight:bold;">✓</span> Vagas ilimitadas</li>
          <li style="display:flex; align-items:center; gap:10px;"><span style="color:#059669; font-weight:bold;">✓</span> Busca de profissionais (KYC aprovados)</li>
          <li style="display:flex; align-items:center; gap:10px;"><span style="color:#059669; font-weight:bold;">✓</span> Chat em tempo real liberado</li>
          <li style="display:flex; align-items:center; gap:10px;"><span style="color:#059669; font-weight:bold;">✓</span> Suporte prioritário 24/7</li>
        </ul>
      </div>

      <p style="margin-top:24px; font-size:13px; color:#64748B; text-align:center; line-height:1.5;">
        A cobrança só será iniciada após o período de teste. Você pode cancelar a qualquer momento.
      </p>
    `

  } else if (etapa === 4) {
    content.innerHTML = `
      <h2 style="font-size:24px; font-weight:700; color:#111827; margin-bottom:8px;">Dados de Pagamento</h2>
      <p style="color:#64748B; font-size:14px; margin-bottom:32px;">
        Opcional: Cadastre seu cartão agora para evitar interrupções após o teste grátis.
      </p>

      <div style="margin-bottom:20px;">
        <label style="${labelStyle()}">Número do Cartão</label>
        <input id="cartao" type="text" placeholder="0000 0000 0000 0000" maxlength="19" style="${inp()}">
      </div>

      <div style="display:flex; gap:16px; margin-bottom:20px;">
        <div style="flex:1;">
          <label style="${labelStyle()}">Validade</label>
          <input id="validade" type="text" placeholder="MM/AA" maxlength="5" style="${inp()}">
        </div>
        <div style="flex:1;">
          <label style="${labelStyle()}">CVV</label>
          <input id="cvv" type="text" placeholder="123" maxlength="4" style="${inp()}">
        </div>
      </div>

      <div style="
        padding:16px; background:#F3F4F6; border-radius:16px;
        font-size:13px; color:#64748B; display:flex; gap:12px; align-items:center;
      ">
        <span style="font-size:20px;">🔒</span>
        Seus dados estão protegidos por criptografia de ponta a ponta.
      </div>
    `
  }
}

async function fetchCNPJ(cnpj) {
  const spinner = document.getElementById('cnpjSpinner')
  const status  = document.getElementById('cnpjStatus')
  const razao   = document.getElementById('razao_social')
  const cidade  = document.getElementById('cidade')

  spinner.style.display = 'block'
  try {
    const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
    if (res.ok) {
      const data = await res.json()
      razao.value = data.razao_social || ''
      dados.razao_social = razao.value
      if (data.municipio && data.uf) {
        cidade.value = `${data.municipio}, ${data.uf}`
        dados.cidade = cidade.value
      }
      status.textContent = '✅ Encontrado'
      status.style.color = '#059669'
      status.style.display = 'block'
    } else {
      status.textContent = '❌ Não encontrado'
      status.style.color = '#DC2626'
      status.style.display = 'block'
    }
  } catch (e) {
    console.warn('CNPJ API error:', e)
  } finally {
    spinner.style.display = 'none'
  }
}

function setupNav(container) {
  document.getElementById('btnVoltar').onclick = () => {
    if (etapa === 1) navegar('splash', { escolhaPerfil: true })
    else { etapa--; renderEtapa(container) }
  }

  document.getElementById('btnAvancar').onclick = async () => {
    if (etapa === 1) {
      dados.cnpj         = document.getElementById('cnpj').value.trim()
      dados.razao_social = document.getElementById('razao_social').value.trim()
      dados.cidade       = document.getElementById('cidade').value.trim()
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
      etapa = 3; renderEtapa(container)

    } else if (etapa === 3) {
      etapa = 4; renderEtapa(container)

    } else {
      // Etapa 4 — Finalizar
      await finalizarCadastro(container, false)
    }
  }

  // Botão "Pular pagamento" apenas na etapa 4
  const btnPular = document.getElementById('btnPularPagamento')
  if (btnPular) {
    btnPular.onclick = () => finalizarCadastro(container, true)
  }
}

async function finalizarCadastro(container, pular) {
  const btn = document.getElementById('btnAvancar')
  btn.textContent = 'Enviando...'
  btn.disabled = true

  try {
    const { uploadAvatar, uploadDocumentoKYC } = await import('../lib/supabase.js')

    await cadastrarEmpresa({
      razao_social: dados.razao_social,
      cnpj: dados.cnpj,
      email: dados.email,
      senha: dados.senha,
      telefone: dados.telefone,
      cidade: dados.cidade,
      plano: dados.plano
    })

    const uploads = []
    if (dados.avatarFile) uploads.push(uploadAvatar(dados.avatarFile))
    if (dados.docFile)    uploads.push(uploadDocumentoKYC(dados.docFile, 'documento'))
    if (dados.selfieFile) uploads.push(uploadDocumentoKYC(dados.selfieFile, 'selfie'))
    if (uploads.length) await Promise.all(uploads)

    navegar('splash', { aguardandoAprovacao: true })
  } catch (e) {
    console.error('ERRO CADASTRO EMPRESA:', e)
    toast(e.message?.includes('already') ? 'E-mail já cadastrado' : 'Erro ao cadastrar empresa.', 'error')
    btn.textContent = etapa === 4 ? 'Salvar e Finalizar' : 'Continuar'
    btn.disabled = false
  }
}

const inp = () => `
  width:100%; padding:14px 16px; border:1px solid #D1D5DB;
  border-radius:12px; font-size:15px; font-family:'Inter',sans-serif;
  background:white; color:#111827; outline:none; box-sizing:border-box;
`
const labelStyle = () => `display:block; font-size:13px; font-weight:600; color:#111827; margin-bottom:8px;`
