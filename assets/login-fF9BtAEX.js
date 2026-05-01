import{t,l as x,_ as g,n as a,r as f,s as b}from"./index-DEW-c385.js";function E(r,i={}){if(i.modoRecuperacao){y(r);return}r.innerHTML=`
    <div style="min-height: 100dvh; background: #F4F5F7; display: flex; flex-direction: column; padding: 60px 32px 40px; font-family:'Inter',sans-serif;">
      <div style="margin-bottom: 40px;">
        <h1 style="font-size:28px; font-weight:800; color:#1E293B; letter-spacing:-1px;">Bem-vindo de volta</h1>
        <p style="color:#64748B; margin-top:6px; font-size:15px;">Entre na sua conta WorkWork</p>
      </div>

      <div style="display:flex; flex-direction:column; gap:16px; flex:1;">
        <div>
          <label style="display:block; font-size:13px; font-weight:600; color:#1E293B; margin-bottom:8px;">E-mail</label>
          <input id="email" type="email" placeholder="seu@email.com" style="${l()}" />
        </div>

        <div>
          <label style="display:block; font-size:13px; font-weight:600; color:#1E293B; margin-bottom:8px;">Senha</label>
          <input id="senha" type="password" placeholder="••••••••" style="${l()}" />
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
  `;const e=document.getElementById("btnEntrar"),d=document.getElementById("email"),p=document.getElementById("senha");e.onclick=async()=>{const o=d.value.trim(),s=p.value;if(!o||!s)return t("Preencha todos os campos","error");e.textContent="Entrando...",e.disabled=!0;try{const{session:c}=await x(o,s);if(c){const{getMeuPerfil:u}=await g(async()=>{const{getMeuPerfil:m}=await import("./index-DEW-c385.js").then(h=>h.i);return{getMeuPerfil:m}},[]),n=await u();(n==null?void 0:n.tipo)==="admin"?a("admin-dashboard"):(n==null?void 0:n.tipo)==="empresa"?a("home-emp"):a("home-prof")}}catch{t("E-mail ou senha incorretos","error"),e.textContent="Entrar",e.disabled=!1}},document.getElementById("btnRecuperar").onclick=async()=>{const o=d.value.trim();if(!o)return t("Digite seu e-mail para recuperar","error");try{await f(o),t("Link de recuperação enviado!","success")}catch{t("Erro ao enviar e-mail","error")}},document.getElementById("btnCadastrar").onclick=()=>a("splash")}function y(r){r.innerHTML=`
    <div style="min-height: 100dvh; background: #F4F5F7; display: flex; flex-direction: column; padding: 60px 32px 40px; font-family:'Inter',sans-serif;">
      <h2 style="font-size:24px; font-weight:800; color:#1E293B; margin-bottom:12px;">Nova Senha</h2>
      <p style="color:#64748B; font-size:15px; margin-bottom:32px;">Digite sua nova senha de acesso.</p>

      <div style="display:flex; flex-direction:column; gap:16px;">
        <input id="novaSenha" type="password" placeholder="Mínimo 6 caracteres" style="${l()}" />
        <button id="btnSalvarSenha" style="background:#4F46E5; color:white; border:none; padding:16px; border-radius:14px; font-size:16px; font-weight:700; cursor:pointer; margin-top:12px;">Salvar e Entrar</button>
      </div>
    </div>
  `,document.getElementById("btnSalvarSenha").onclick=async()=>{const i=document.getElementById("novaSenha").value;if(i.length<6)return t("Mínimo 6 caracteres","error");try{const{error:e}=await b.auth.updateUser({password:i});if(e)throw e;t("Senha atualizada!","success"),a("login")}catch{t("Erro ao atualizar senha","error")}}}const l=()=>"width:100%; padding:14px 16px; border:1.5px solid #D1D5DB; border-radius:12px; font-size:15px; font-family:'Inter',sans-serif; background:white; outline:none; box-sizing:border-box;";export{E as render};
