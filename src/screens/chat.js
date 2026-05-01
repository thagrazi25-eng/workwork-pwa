// chat.js — placeholder
import { navegar } from '../main.js'
export function render(container) {
  container.innerHTML = `
    <div style="min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;text-align:center;gap:16px;background:#F4F5F7;">
      <div style="font-size:48px;">💬</div>
      <h2 style="font-family:'Sora',sans-serif;font-size:22px;color:#111827;">Chat</h2>
      <p style="color:#64748B;font-size:15px;">Mensagens em tempo real via Supabase Realtime.<br>Em implementação.</p>
      <button id="b" style="background:#4F46E5;color:white;border:none;padding:14px 28px;border-radius:12px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;">← Voltar</button>
    </div>
  `
  document.getElementById('b').onclick = () => history.back?.() || navegar('home-prof')
}
