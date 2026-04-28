import { NextRequest } from 'next/server'
import { sendOrcamentoResultEmail } from '@/lib/orcamento-mail'
import type { OrcamentoFormData, ServiceType } from '@/types/orcamento'

/**
 * Envia cópia do resultado do orçamento (resposta do assistente) para o e-mail do Jean.
 *
 * Variáveis de ambiente (`.env.local`):
 *
 * ```
 * SMTP_HOST=smtp.gmail.com
 * SMTP_PORT=587
 * SMTP_USER=seu_email@gmail.com
 * SMTP_PASS=senha_de_app_do_gmail
 * SMTP_FROM=Portfólio <seu_email@gmail.com>   # opcional
 * ORCAMENTO_NOTIFY_EMAIL=jeanmacedo1302@gmail.com   # opcional; padrão já é este e-mail
 * SMTP_SECURE=false   # true se usar porta 465
 * ```
 */

const MAX_REPLY = 48_000
const MAX_USER = 8_000

function isServiceType(v: unknown): v is ServiceType {
  return v === 'fotografia' || v === 'video' || v === 'grading' || v === 'pacote'
}

function parseForm(raw: unknown): OrcamentoFormData | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  const service = o.service
  return {
    service: service === null || service === undefined ? null : isServiceType(service) ? service : null,
    nome: typeof o.nome === 'string' ? o.nome.slice(0, 500) : '',
    whatsapp: typeof o.whatsapp === 'string' ? o.whatsapp.slice(0, 80) : '',
    email: typeof o.email === 'string' ? o.email.slice(0, 320) : '',
    dataEvento: typeof o.dataEvento === 'string' ? o.dataEvento.slice(0, 40) : '',
    cidade: typeof o.cidade === 'string' ? o.cidade.slice(0, 200) : '',
    descricao: typeof o.descricao === 'string' ? o.descricao.slice(0, 8000) : '',
  }
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ ok: false, error: 'JSON inválido.' }, { status: 400 })
  }

  if (!body || typeof body !== 'object') {
    return Response.json({ ok: false, error: 'Corpo inválido.' }, { status: 400 })
  }

  const b = body as Record<string, unknown>
  const source = b.source === 'wizard' || b.source === 'chat' ? b.source : null
  const assistantReply =
    typeof b.assistantReply === 'string' ? b.assistantReply.trim().slice(0, MAX_REPLY) : ''

  if (!source || assistantReply.length === 0) {
    return Response.json(
      { ok: false, error: 'Informe source (wizard|chat) e assistantReply não vazio.' },
      { status: 400 }
    )
  }

  if (source === 'wizard') {
    const form = parseForm(b.form)
    if (!form || !form.nome.trim()) {
      return Response.json({ ok: false, error: 'Formulário inválido para source=wizard.' }, { status: 400 })
    }
    const result = await sendOrcamentoResultEmail({
      source: 'wizard',
      form,
      assistantReply,
    })
    if (!result.sent && result.reason === 'smtp_missing') {
      return Response.json({ ok: true, sent: false, skipped: 'smtp_not_configured' })
    }
    if (!result.sent) {
      return Response.json(
        { ok: false, error: 'Falha ao enviar e-mail.', detail: result.detail },
        { status: 502 }
      )
    }
    return Response.json({ ok: true, sent: true })
  }

  const lastUserMessage =
    typeof b.lastUserMessage === 'string' ? b.lastUserMessage.trim().slice(0, MAX_USER) : ''
  if (!lastUserMessage) {
    return Response.json({ ok: false, error: 'lastUserMessage obrigatório para source=chat.' }, { status: 400 })
  }

  const result = await sendOrcamentoResultEmail({
    source: 'chat',
    lastUserMessage,
    assistantReply,
  })
  if (!result.sent && result.reason === 'smtp_missing') {
    return Response.json({ ok: true, sent: false, skipped: 'smtp_not_configured' })
  }
  if (!result.sent) {
    return Response.json(
      { ok: false, error: 'Falha ao enviar e-mail.', detail: result.detail },
      { status: 502 }
    )
  }
  return Response.json({ ok: true, sent: true })
}
