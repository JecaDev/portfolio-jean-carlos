import { NextRequest } from 'next/server'
import type { ChatMessage, OrcamentoFormData } from '@/types/orcamento'

/**
 * Variável de ambiente necessária (crie `.env.local` na raiz do projeto):
 *
 * ```
 * GROQ_API_KEY=sua_chave_aqui
 * ```
 *
 * Obtenha a chave em: https://console.groq.com/
 */

const SYSTEM_PROMPT = `Você é o assistente virtual do Jean Carlos Macêdo, fotógrafo e videomaker profissional baseado em Salvador, Bahia.

Seu papel é ajudar potenciais clientes a entender os serviços disponíveis, tirar dúvidas e gerar um orçamento personalizado de forma amigável e profissional.

== SERVIÇOS E PREÇOS ==

1. FOTOGRAFIA PROFISSIONAL
   - Ensaio Fotográfico Individual (retratos, book): a partir de R$ 350
     * Inclui: até 2h de sessão, 1 locação, 20 fotos editadas entregues em alta resolução
   - Ensaio de Casal/Família: a partir de R$ 450
     * Inclui: até 3h de sessão, 1 locação, 30 fotos editadas
   - Cobertura de Eventos (aniversários, formaturas, corporativo): a partir de R$ 600
     * Inclui: até 4h de cobertura, fotos ilimitadas, entrega de 80+ fotos editadas em 7 dias úteis
   - Editorial/Moda/Comercial: sob consulta (orçamento personalizado)

2. VÍDEO E EDIÇÃO
   - Vídeo de Evento (highlight): a partir de R$ 800
     * Inclui: até 4h de captação, edição completa com trilha, entrega em até 10 dias úteis
   - Vídeo Institucional/Corporativo: a partir de R$ 1.500
     * Inclui: roteiro básico, captação, edição, cor e trilha
   - Reels/Conteúdo para Instagram: a partir de R$ 250 por vídeo (pacotes disponíveis)
   - Teaser de Casamento: a partir de R$ 1.200

3. COLOR GRADING & DIREÇÃO CRIATIVA
   - Color grading de fotos avulsas (pacote 10 fotos): R$ 120
   - Color grading de vídeo (por minuto editado): R$ 80
   - Direção criativa de ensaio: incluso nos pacotes fotográficos ou R$ 200 avulso
   - LUT personalizado (identidade visual do cliente): R$ 180

== FORMAS DE ATENDIMENTO ==
- Atendimento presencial: Salvador, BA e região metropolitana
- Atendimento remoto: serviços de edição, grading e direção criativa para todo o Brasil
- Idiomas: Português (principal)
- Tempo médio de resposta: até 2h em dias úteis

== ENTREGA ==
- Fotos: via Google Drive ou WeTransfer, em alta resolução (JPEG editado + RAW opcional)
- Vídeos: link privado no YouTube ou Google Drive
- Prazo padrão: 7 a 15 dias úteis dependendo do serviço

== PAGAMENTO ==
- Pix (preferencial), cartão de crédito (parcelamento em até 3x sem juros mediante acordo)
- Sinal de 30% no ato da confirmação, restante na entrega
- Descontos para pacotes combinados (foto + vídeo): até 15% de desconto

== CONTATO APÓS ORÇAMENTO ==
- WhatsApp: +55 71 9 8860-1554
- E-mail: jeanmacedo1302@gmail.com
- Instagram: @gradedbyjean

== INSTRUÇÕES DE COMPORTAMENTO ==
- Seja simpático, profissional e use linguagem acessível
- Quando o cliente informar o tipo de serviço desejado, pergunte detalhes para personalizar (data, localização, quantidade de horas, etc.)
- Ao final da conversa, ofereça um resumo do orçamento estimado
- Não invente valores que não estão listados acima — diga "vou verificar com o Jean" nesses casos
- Encoraje o cliente a fechar contato via WhatsApp para finalizar o contrato
- Responda sempre em português brasileiro`

const MAX_MESSAGES = 24
const MAX_MESSAGE_LENGTH = 8000

type IncomingMessage = { role: string; content: string }

function sanitizeMessages(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return []
  const out: ChatMessage[] = []
  for (const item of raw) {
    if (out.length >= MAX_MESSAGES) break
    if (!item || typeof item !== 'object') continue
    const m = item as IncomingMessage
    if (m.role !== 'user' && m.role !== 'assistant') continue
    if (typeof m.content !== 'string') continue
    const trimmed = m.content.slice(0, MAX_MESSAGE_LENGTH)
    if (trimmed.length === 0) continue
    out.push({ role: m.role, content: trimmed })
  }
  return out
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return Response.json(
      { error: 'GROQ_API_KEY não configurada. Adicione em .env.local na raiz do projeto.' },
      { status: 503 }
    )
  }

  let body: { messages?: unknown; formData?: OrcamentoFormData }
  try {
    body = (await req.json()) as { messages?: unknown; formData?: OrcamentoFormData }
  } catch {
    return Response.json({ error: 'Corpo da requisição inválido.' }, { status: 400 })
  }

  const messages = sanitizeMessages(body.messages)
  if (messages.length === 0) {
    return Response.json({ error: 'Envie ao menos uma mensagem válida (user ou assistant).' }, { status: 400 })
  }

  const groqBody = {
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'system' as const, content: SYSTEM_PROMPT }, ...messages],
    stream: true,
    temperature: 0.7,
    max_tokens: 1024,
  }

  const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(groqBody),
  })

  if (!upstream.ok) {
    const text = await upstream.text()
    return Response.json(
      { error: 'Falha ao contatar o provedor de IA.', detail: text.slice(0, 500) },
      { status: upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502 }
    )
  }

  if (!upstream.body) {
    return Response.json({ error: 'Resposta sem corpo utilizável.' }, { status: 502 })
  }

  return new Response(upstream.body, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
