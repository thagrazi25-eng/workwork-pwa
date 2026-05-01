import{s as c,g as m,o as h,_ as v,f as y,t as b,n as w}from"./index-C3CtvK1P.js";async function k(i,n={}){const{data:{user:r}}=await c.auth.getUser();if(n.outroUserId){await g(i,r,n);return}await f(i,r)}async function f(i,n){let r=[];try{const{data:e}=await c.from("mensagens").select("*, remetente:remetente_id(id, nome:raw_user_meta_data->nome, avatar_url), destinatario:destinatario_id(id, nome:raw_user_meta_data->nome, avatar_url)").or(`remetente_id.eq.${n.id},destinatario_id.eq.${n.id}`).order("created_at",{ascending:!1}),t=new Set;if(e)for(const o of e){const d=o.remetente_id===n.id?o.destinatario_id:o.remetente_id;if(!t.has(d)){t.add(d);const a=o.remetente_id===n.id?o.destinatario:o.remetente;r.push({outroId:d,outroNome:(a==null?void 0:a.nome)||"Usuário",ultimaMsg:o.texto,hora:o.created_at})}}}catch(e){console.warn("Erro ao carregar conversas:",e)}i.innerHTML=`
    <div style="height:100%; display:flex; flex-direction:column; background:#F4F5F7; font-family:'Inter',sans-serif;">

      <!-- Header -->
      <div style="background:white; padding:52px 24px 20px; border-bottom:1px solid #E5E7EB; flex-shrink:0;">
        <h2 style="font-size:22px; font-weight:700; color:#111827;">Mensagens</h2>
      </div>

      <!-- Lista -->
      <div style="flex:1; overflow-y:auto; padding:16px;">
        ${r.length===0?`
          <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:200px; gap:12px; color:#64748B; text-align:center;">
            <div style="font-size:48px;">💬</div>
            <p style="font-size:15px; font-weight:600; color:#111827;">Nenhuma conversa ainda</p>
            <p style="font-size:13px;">Suas conversas aparecerão aqui após um match.</p>
          </div>
        `:r.map(e=>`
          <div class="conversa-item" data-id="${e.outroId}" style="
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
            ">${(e.outroNome||"U").substring(0,2).toUpperCase()}</div>
            <div style="flex:1; min-width:0;">
              <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                <span style="font-weight:600; color:#111827;">${e.outroNome}</span>
                <span style="font-size:12px; color:#64748B;">${new Date(e.hora).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</span>
              </div>
              <p style="font-size:14px; color:#64748B; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin:0;">
                ${e.ultimaMsg}
              </p>
            </div>
          </div>
        `).join("")}
      </div>

      <!-- Bottom Nav -->
      <div id="bottomNav" style="
        background:white; border-top:1px solid #E5E7EB;
        display:flex; justify-content:space-around; align-items:center;
        height:70px; padding-bottom:env(safe-area-inset-bottom);
        flex-shrink:0;
      "></div>
    </div>
  `,document.querySelectorAll(".conversa-item").forEach(e=>{e.onclick=()=>{const t=e.dataset.id,o=e.querySelector("span").textContent;g(i,n,{outroUserId:t,outroNome:o})}});try{const{getMeuPerfil:e}=await v(async()=>{const{getMeuPerfil:o}=await import("./index-C3CtvK1P.js").then(d=>d.i);return{getMeuPerfil:o}},[]),t=await e();E(document.getElementById("bottomNav"),(t==null?void 0:t.tipo)||"profissional","chat")}catch{}}async function g(i,n,r){const e=r.outroUserId,t=r.outroNome||"Contato";let o=[];try{o=await m(e)}catch(s){console.warn("Erro ao carregar mensagens:",s)}function d(s){const l=s.remetente_id===n.id;return`
      <div style="
        align-self:${l?"flex-end":"flex-start"};
        background:${l?"#4F46E5":"white"};
        color:${l?"white":"#111827"};
        padding:12px 16px;
        border-radius:${l?"18px 18px 4px 18px":"18px 18px 18px 4px"};
        max-width:80%;
        box-shadow:${l?"0 4px 10px rgba(79,70,229,0.2)":"0 2px 5px rgba(0,0,0,0.05)"};
        font-size:14px; line-height:1.4;
      ">${s.texto}</div>
    `}i.innerHTML=`
    <div style="height:100%; display:flex; flex-direction:column; background:#F3F4F6; font-family:'Inter',sans-serif;">

      <!-- Header -->
      <div style="background:white; padding:52px 24px 16px; border-bottom:1px solid #E5E7EB; display:flex; align-items:center; gap:12px; flex-shrink:0;">
        <button id="btnVoltarChat" style="background:none; border:none; font-size:22px; cursor:pointer; color:#111827;">←</button>
        <div style="
          width:40px; height:40px; border-radius:20px; background:#EDE9FE;
          display:flex; align-items:center; justify-content:center;
          font-weight:700; color:#4F46E5; font-size:15px;
        ">${t.substring(0,2).toUpperCase()}</div>
        <div>
          <div style="font-weight:600; font-size:16px; color:#111827;">${t}</div>
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
        ${o.map(d).join("")}
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
  `;const a=document.getElementById("chatContainer");a.scrollTop=a.scrollHeight,document.getElementById("btnVoltarChat").onclick=()=>f(i,n);async function p(){const s=document.getElementById("chatInput"),l=s.value.trim();if(l){s.value="";try{const x=await y(e,l);a.insertAdjacentHTML("beforeend",d({...x,remetente_id:n.id})),a.scrollTop=a.scrollHeight}catch{b("Erro ao enviar mensagem","error")}}}document.getElementById("btnEnviar").onclick=p,document.getElementById("chatInput").onkeypress=s=>{s.key==="Enter"&&p()};const u=h(e,s=>{a.insertAdjacentHTML("beforeend",d(s)),a.scrollTop=a.scrollHeight});i._cleanup=()=>c.removeChannel(u)}function E(i,n,r){const e=n==="empresa"?[{icon:"🏠",label:"Início",tela:"home-emp"},{icon:"➕",label:"Vagas",tela:"publicar-vaga"},{icon:"💬",label:"Chat",tela:"chat"},{icon:"👤",label:"Perfil",tela:"perfil"}]:[{icon:"🏠",label:"Início",tela:"home-prof"},{icon:"🔍",label:"Buscar Vagas",tela:"home-prof"},{icon:"💬",label:"Chat",tela:"chat"},{icon:"👤",label:"Perfil",tela:"perfil"}];i.innerHTML=e.map(t=>`
    <div class="nav-item-btn" data-tela="${t.tela}" style="
      display:flex; flex-direction:column; align-items:center; gap:3px;
      color:${r===t.tela?"#4F46E5":"#9CA3AF"};
      font-size:11px; font-weight:500; cursor:pointer;
    ">
      <span style="font-size:20px;">${t.icon}</span>
      <span>${t.label}</span>
    </div>
  `).join(""),i.querySelectorAll(".nav-item-btn").forEach(t=>{t.onclick=()=>w(t.dataset.tela)})}export{k as render};
