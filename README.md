# WorkWork PWA — Boilerplate

## Estrutura de Pastas

```
workwork-pwa/
├── public/
│   ├── icons/              ← Ícones PWA (gere em https://realfavicongenerator.net)
│   │   ├── icon-192.png
│   │   ├── icon-512.png
│   │   └── icon-maskable-512.png
│   ├── manifest.json       ← Config da PWA
│   └── sw.js               ← Service Worker (cache offline)
├── src/
│   ├── lib/
│   │   └── supabase.js     ← Client + todas as funções (arquivo que já temos)
│   ├── screens/            ← Uma pasta por tela (baseado nos protótipos)
│   │   ├── splash.js
│   │   ├── login.js
│   │   ├── cadastro-prof.js
│   │   ├── cadastro-empresa.js
│   │   ├── home-prof.js
│   │   ├── home-empresa.js
│   │   ├── vaga-detalhe.js
│   │   ├── chat.js
│   │   └── perfil.js
│   ├── components/         ← Componentes reutilizáveis
│   │   ├── bottom-nav.js
│   │   ├── card-profissional.js
│   │   ├── card-vaga.js
│   │   └── toast.js
│   └── main.js             ← Entry point (router + auth guard)
├── index.html              ← Shell da PWA
├── .env                    ← Credenciais Supabase (NÃO commitar)
├── .env.example            ← Template das variáveis
└── package.json
```

## Setup Rápido

```bash
# 1. Instalar dependências
npm install

# 2. Copiar e preencher variáveis de ambiente
cp .env.example .env

# 3. Rodar em desenvolvimento
npm run dev

# 4. Build de produção
npm run build
```

## Deploy (Vercel)

```bash
npm install -g vercel
vercel --prod
```

Adicione as variáveis de ambiente no painel da Vercel:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
