import nodemailer from 'nodemailer'
import type { OrcamentoFormData } from '@/types/orcamento'

const DEFAULT_NOTIFY_TO = 'jeanmacedo1302@gmail.com'

function getTransporter() {
  const host = process.env.SMTP_HOST?.trim()
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS?.trim()
  if (!host || !user || !pass) return null

  const port = Number(process.env.SMTP_PORT ?? '587')
  const secure = process.env.SMTP_SECURE === 'true' || port === 465

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  })
}

function formatFormText(form: OrcamentoFormData): string {
  const lines = [
    '=== Dados do formulário ===',
    `Serviço: ${form.service ?? '—'}`,
    `Nome: ${form.nome}`,
    `WhatsApp: ${form.whatsapp}`,
    `E-mail: ${form.email}`,
    `Data do evento/sessão: ${form.dataEvento || '—'}`,
    `Cidade: ${form.cidade}`,
    '',
    'Descrição:',
    form.descricao,
  ]
  return lines.join('\n')
}

export type SendOrcamentoEmailParams = {
  source: 'wizard' | 'chat'
  assistantReply: string
  form?: OrcamentoFormData
  lastUserMessage?: string
}

export async function sendOrcamentoResultEmail(
  params: SendOrcamentoEmailParams
): Promise<{ sent: true } | { sent: false; reason: 'smtp_missing' | 'send_failed'; detail?: string }> {
  const transporter = getTransporter()
  if (!transporter) {
    return { sent: false, reason: 'smtp_missing' }
  }

  const to = process.env.ORCAMENTO_NOTIFY_EMAIL?.trim() || DEFAULT_NOTIFY_TO
  const from =
    process.env.SMTP_FROM?.trim() ||
    `Portfólio Jean Macêdo <${process.env.SMTP_USER?.trim()}>`

  const subject =
    params.source === 'wizard'
      ? '[Portfólio] Novo pedido de orçamento (formulário)'
      : '[Portfólio] Orçamento — conversa no site'

  let body = ''
  if (params.source === 'wizard' && params.form) {
    body += `${formatFormText(params.form)}\n\n`
  }
  if (params.source === 'chat' && params.lastUserMessage) {
    body += `=== Mensagem do visitante ===\n${params.lastUserMessage}\n\n`
  }
  body += '=== Resposta do assistente (IA) ===\n\n'
  body += params.assistantReply.trim()

  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      text: body,
    })
    return { sent: true }
  } catch (e) {
    const detail = e instanceof Error ? e.message : String(e)
    console.error('[orcamento-mail]', detail)
    return { sent: false, reason: 'send_failed', detail }
  }
}
