'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaCamera, FaPalette, FaStar, FaVideo, FaWhatsapp } from 'react-icons/fa'
import PageHeader from '@/components/ui/PageHeader'
import PageShell from '@/components/ui/PageShell'
import type { ChatMessage, OrcamentoFormData, ServiceType } from '@/types/orcamento'

const WHATSAPP_HREF = 'https://wa.me/5571988601554'

const ASSISTANT_GREETING =
  'Olá! 👋 Sou o assistente do Jean Carlos. Me conta: o que você tem em mente para o seu projeto?'

const SERVICE_OPTIONS: { id: ServiceType; label: string; icon: ReactNode }[] = [
  { id: 'fotografia', label: 'Fotografia', icon: <FaCamera className="text-2xl" aria-hidden /> },
  { id: 'video', label: 'Vídeo', icon: <FaVideo className="text-2xl" aria-hidden /> },
  { id: 'grading', label: 'Color Grading', icon: <FaPalette className="text-2xl" aria-hidden /> },
  { id: 'pacote', label: 'Pacote Completo', icon: <FaStar className="text-2xl" aria-hidden /> },
]

const SERVICE_LABEL: Record<ServiceType, string> = {
  fotografia: 'Fotografia',
  video: 'Vídeo',
  grading: 'Color Grading',
  pacote: 'Pacote Completo (foto + vídeo)',
}

function emptyForm(): OrcamentoFormData {
  return {
    service: null,
    nome: '',
    whatsapp: '',
    email: '',
    dataEvento: '',
    cidade: '',
    descricao: '',
  }
}

function buildFormSummary(form: OrcamentoFormData): string {
  const serviceLabel = form.service ? SERVICE_LABEL[form.service] : 'Não informado'
  return [
    'Quero solicitar um orçamento com base no formulário do site.',
    '',
    `Tipo de serviço: ${serviceLabel}`,
    `Nome: ${form.nome}`,
    `WhatsApp: ${form.whatsapp}`,
    `E-mail: ${form.email}`,
    `Data do evento / sessão: ${form.dataEvento || 'A definir'}`,
    `Cidade: ${form.cidade}`,
    '',
    'Descrição do projeto:',
    form.descricao,
  ].join('\n')
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function normalizeWhatsapp(value: string): string {
  return value.replace(/\D/g, '')
}

type TabId = 'formulario' | 'chat'

type FieldErrors = Partial<Record<keyof OrcamentoFormData, string>>

/** Dispara e-mail para o Jean após a resposta do assistente ser concluída. */
type OrcamentoStreamNotify =
  | { source: 'wizard'; form: OrcamentoFormData }
  | { source: 'chat'; lastUserMessage: string }

export default function OrcamentoPage() {
  const [tab, setTab] = useState<TabId>('formulario')
  const [wizardStep, setWizardStep] = useState(1)
  const [form, setForm] = useState<OrcamentoFormData>(emptyForm)
  const [step1Error, setStep1Error] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamError, setStreamError] = useState<string | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  /** Evita duas respostas escrevendo no mesmo balão (requisições concorrentes / double submit). */
  const streamGenRef = useRef(0)
  const streamAbortRef = useRef<AbortController | null>(null)

  const scrollChatToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollChatToBottom()
  }, [messages, isStreaming, scrollChatToBottom])

  useEffect(() => {
    if (tab !== 'chat') return
    if (messages.length > 0) return
    setMessages([{ role: 'assistant', content: ASSISTANT_GREETING }])
  }, [tab, messages.length])

  const consumeGroqStream = useCallback(async (apiMessages: ChatMessage[], notify?: OrcamentoStreamNotify) => {
    streamAbortRef.current?.abort()
    streamGenRef.current += 1
    const myGen = streamGenRef.current
    const ac = new AbortController()
    streamAbortRef.current = ac

    setStreamError(null)
    setIsStreaming(true)

    const isStale = () => streamGenRef.current !== myGen

    try {
      const res = await fetch('/api/chat-orcamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
        signal: ac.signal,
      })

      if (isStale()) return

      const contentType = res.headers.get('content-type') ?? ''
      if (!res.ok) {
        if (contentType.includes('application/json')) {
          const data = (await res.json()) as { error?: string }
          if (!isStale()) setStreamError(data.error ?? 'Não foi possível obter resposta.')
        } else if (!isStale()) {
          setStreamError('Não foi possível obter resposta.')
        }
        if (!isStale()) {
          setMessages((prev) => {
            const next = [...prev]
            const last = next[next.length - 1]
            if (last?.role === 'assistant' && last.content === '') {
              next[next.length - 1] = {
                role: 'assistant',
                content: 'Desculpe, ocorreu um erro ao gerar a resposta. Tente novamente ou fale pelo WhatsApp.',
              }
              return next
            }
            return prev
          })
        }
        return
      }

      if (!res.body) {
        if (!isStale()) setStreamError('Resposta vazia do servidor.')
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let assistantAccum = ''

      while (true) {
        const { done, value } = await reader.read()
        if (isStale()) {
          await reader.cancel().catch(() => {})
          break
        }
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split(/\r?\n/)
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (isStale()) break
          const trimmed = line.trim()
          if (!trimmed.startsWith('data:')) continue
          const payload = trimmed.startsWith('data: ') ? trimmed.slice(6) : trimmed.slice(5).trimStart()
          if (payload === '[DONE]') continue
          try {
            const parsed = JSON.parse(payload) as {
              choices?: Array<{ delta?: { content?: string } }>
            }
            const piece = parsed.choices?.[0]?.delta?.content
            if (piece) {
              assistantAccum += piece
              setMessages((prev) => {
                if (streamGenRef.current !== myGen) return prev
                const next = [...prev]
                const last = next[next.length - 1]
                if (last?.role === 'assistant') {
                  next[next.length - 1] = { role: 'assistant', content: last.content + piece }
                }
                return next
              })
            }
          } catch {
            /* ignora chunks não-JSON */
          }
        }
      }

      if (!isStale() && notify && assistantAccum.trim()) {
        const payload =
          notify.source === 'wizard'
            ? { source: 'wizard' as const, form: notify.form, assistantReply: assistantAccum }
            : {
                source: 'chat' as const,
                lastUserMessage: notify.lastUserMessage,
                assistantReply: assistantAccum,
              }
        void fetch('/api/orcamento-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch(() => {})
      }
    } catch (e) {
      const aborted =
        (e instanceof DOMException && e.name === 'AbortError') ||
        (e instanceof Error && e.name === 'AbortError')
      if (aborted) return
      if (!isStale()) {
        setStreamError('Falha de rede. Verifique sua conexão.')
        setMessages((prev) => {
          if (streamGenRef.current !== myGen) return prev
          const next = [...prev]
          const last = next[next.length - 1]
          if (last?.role === 'assistant' && last.content === '') {
            next[next.length - 1] = {
              role: 'assistant',
              content: 'Não consegui concluir a resposta agora. Tente de novo em instantes.',
            }
          }
          return next
        })
      }
    } finally {
      if (streamGenRef.current === myGen) {
        setIsStreaming(false)
        streamAbortRef.current = null
      }
    }
  }, [])

  const validateStep1 = (): boolean => {
    if (!form.service) {
      setStep1Error('Selecione um tipo de serviço para continuar.')
      return false
    }
    setStep1Error(null)
    return true
  }

  const validateStep2 = (): boolean => {
    const errors: FieldErrors = {}
    if (!form.nome.trim()) errors.nome = 'Informe seu nome.'
    if (!form.whatsapp.trim()) errors.whatsapp = 'Informe seu WhatsApp.'
    else if (normalizeWhatsapp(form.whatsapp).length < 10)
      errors.whatsapp = 'Digite um número válido com DDD.'
    if (!form.email.trim()) errors.email = 'Informe seu e-mail.'
    else if (!isValidEmail(form.email)) errors.email = 'E-mail inválido.'
    if (!form.dataEvento) errors.dataEvento = 'Informe a data prevista ou a data do evento.'
    if (!form.cidade.trim()) errors.cidade = 'Informe a cidade.'
    if (!form.descricao.trim()) errors.descricao = 'Descreva brevemente o projeto.'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const goNext = () => {
    if (wizardStep === 1) {
      if (!validateStep1()) return
      setWizardStep(2)
    } else if (wizardStep === 2) {
      if (!validateStep2()) return
      setWizardStep(3)
    }
  }

  const goBack = () => {
    if (wizardStep > 1) setWizardStep((s) => s - 1)
  }

  const handleWizardSubmit = async () => {
    const summary = buildFormSummary(form)
    setStreamError(null)
    setMessages([
      { role: 'user', content: summary },
      { role: 'assistant', content: '' },
    ])
    setTab('chat')
    await consumeGroqStream([{ role: 'user', content: summary }], { source: 'wizard', form })
  }

  const handleChatSend = () => {
    const trimmed = chatInput.trim()
    if (!trimmed || isStreaming) return
    setChatInput('')

    const withoutGreetingOnly =
      messages.length === 1 &&
      messages[0]?.role === 'assistant' &&
      messages[0].content === ASSISTANT_GREETING
    const base: ChatMessage[] = withoutGreetingOnly ? [] : messages
    const userMsg: ChatMessage = { role: 'user', content: trimmed }
    const apiMessages: ChatMessage[] = [...base, userMsg]

    setMessages([...base, userMsg, { role: 'assistant', content: '' }])
    void consumeGroqStream(apiMessages, { source: 'chat', lastUserMessage: trimmed })
  }

  const onChatKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleChatSend()
    }
  }

  return (
    <PageShell>
      <PageHeader
        eyebrow="Orçamento"
        title="Vamos criar algo incrível"
        description="Monte um pedido rápido pelo formulário ou converse com o assistente para tirar dúvidas e estimar valores com base nos pacotes do Jean."
      />

      <div
        className="mx-auto mb-8 flex max-w-xl flex-wrap justify-center gap-2 rounded-3xl border border-white/10 bg-white/5 p-1 sm:max-w-2xl"
        role="tablist"
        aria-label="Modo de orçamento"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'formulario'}
          id="tab-formulario"
          aria-controls="panel-formulario"
          onClick={() => setTab('formulario')}
          className={`min-h-[44px] flex-1 rounded-2xl px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${
            tab === 'formulario'
              ? 'bg-yellow-400/20 text-yellow-300 shadow-inner'
              : 'text-white/70 hover:text-white'
          }`}
        >
          Formulário rápido
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'chat'}
          id="tab-chat"
          aria-controls="panel-chat"
          onClick={() => setTab('chat')}
          className={`min-h-[44px] flex-1 rounded-2xl px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${
            tab === 'chat' ? 'bg-yellow-400/20 text-yellow-300 shadow-inner' : 'text-white/70 hover:text-white'
          }`}
        >
          Falar com assistente
        </button>
      </div>

      <AnimatePresence mode="wait">
        {tab === 'formulario' ? (
          <motion.div
            key="form"
            id="panel-formulario"
            role="tabpanel"
            aria-labelledby="tab-formulario"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-auto max-w-2xl"
          >
            <div className="mb-8">
              <div className="mb-2 flex justify-between text-xs text-white/50">
                <span>
                  Etapa {wizardStep} de 3
                </span>
                <span className="text-yellow-300/90">{Math.round((wizardStep / 3) * 100)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-300"
                  initial={false}
                  animate={{ width: `${(wizardStep / 3) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                />
              </div>
            </div>

            {wizardStep === 1 ? (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <p className="text-center text-sm text-white/70">Qual tipo de serviço você precisa?</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {SERVICE_OPTIONS.map((opt) => {
                    const selected = form.service === opt.id
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setForm((f) => ({ ...f, service: opt.id }))
                          setStep1Error(null)
                        }}
                        aria-pressed={selected}
                        className={`flex flex-col items-center gap-3 rounded-3xl border p-6 text-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${
                          selected
                            ? 'border-yellow-400 bg-yellow-400/10 text-white shadow-lg shadow-yellow-400/10'
                            : 'border-white/10 bg-white/5 text-white/80 hover:border-white/20'
                        }`}
                      >
                        <span className="text-yellow-300">{opt.icon}</span>
                        <span className="font-semibold">{opt.label}</span>
                      </button>
                    )
                  })}
                </div>
                {step1Error ? (
                  <p className="text-center text-sm text-red-300" role="alert">
                    {step1Error}
                  </p>
                ) : null}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={goNext}
                    className="rounded-2xl bg-yellow-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-yellow-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-200"
                  >
                    Continuar
                  </button>
                </div>
              </motion.div>
            ) : null}

            {wizardStep === 2 ? (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="nome" className="mb-1 block text-xs font-medium uppercase tracking-wide text-white/60">
                      Nome completo
                    </label>
                    <input
                      id="nome"
                      autoComplete="name"
                      value={form.nome}
                      onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white placeholder:text-white/30 focus:border-yellow-400/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/30"
                      placeholder="Seu nome"
                    />
                    {fieldErrors.nome ? (
                      <p className="mt-1 text-xs text-red-300" role="alert">
                        {fieldErrors.nome}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="whatsapp" className="mb-1 block text-xs font-medium uppercase tracking-wide text-white/60">
                      WhatsApp
                    </label>
                    <input
                      id="whatsapp"
                      autoComplete="tel"
                      value={form.whatsapp}
                      onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white placeholder:text-white/30 focus:border-yellow-400/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/30"
                      placeholder="(71) 99999-9999"
                    />
                    {fieldErrors.whatsapp ? (
                      <p className="mt-1 text-xs text-red-300" role="alert">
                        {fieldErrors.whatsapp}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1 block text-xs font-medium uppercase tracking-wide text-white/60">
                      E-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white placeholder:text-white/30 focus:border-yellow-400/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/30"
                      placeholder="voce@email.com"
                    />
                    {fieldErrors.email ? (
                      <p className="mt-1 text-xs text-red-300" role="alert">
                        {fieldErrors.email}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="dataEvento" className="mb-1 block text-xs font-medium uppercase tracking-wide text-white/60">
                      Data do evento / sessão
                    </label>
                    <input
                      id="dataEvento"
                      type="date"
                      value={form.dataEvento}
                      onChange={(e) => setForm((f) => ({ ...f, dataEvento: e.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white focus:border-yellow-400/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/30"
                    />
                    {fieldErrors.dataEvento ? (
                      <p className="mt-1 text-xs text-red-300" role="alert">
                        {fieldErrors.dataEvento}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="cidade" className="mb-1 block text-xs font-medium uppercase tracking-wide text-white/60">
                      Cidade
                    </label>
                    <input
                      id="cidade"
                      autoComplete="address-level2"
                      value={form.cidade}
                      onChange={(e) => setForm((f) => ({ ...f, cidade: e.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white placeholder:text-white/30 focus:border-yellow-400/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/30"
                      placeholder="Salvador, BA"
                    />
                    {fieldErrors.cidade ? (
                      <p className="mt-1 text-xs text-red-300" role="alert">
                        {fieldErrors.cidade}
                      </p>
                    ) : null}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="descricao" className="mb-1 block text-xs font-medium uppercase tracking-wide text-white/60">
                      Descrição do projeto
                    </label>
                    <textarea
                      id="descricao"
                      rows={4}
                      value={form.descricao}
                      onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))}
                      className="w-full resize-y rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white placeholder:text-white/30 focus:border-yellow-400/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/30"
                      placeholder="Conte o que você imagina: estilo, duração, referências..."
                    />
                    {fieldErrors.descricao ? (
                      <p className="mt-1 text-xs text-red-300" role="alert">
                        {fieldErrors.descricao}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-wrap justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={goBack}
                    className="rounded-2xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/90 transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="rounded-2xl bg-yellow-400 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-yellow-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-200"
                  >
                    Continuar
                  </button>
                </div>
              </motion.div>
            ) : null}

            {wizardStep === 3 ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8"
              >
                <h2 className="text-lg font-semibold text-yellow-300">Resumo do pedido</h2>
                <dl className="space-y-3 text-sm text-white/80">
                  <div className="flex flex-wrap justify-between gap-2 border-b border-white/10 pb-3">
                    <dt className="text-white/50">Serviço</dt>
                    <dd className="font-medium text-white">{form.service ? SERVICE_LABEL[form.service] : '—'}</dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2 border-b border-white/10 pb-3">
                    <dt className="text-white/50">Nome</dt>
                    <dd className="text-right font-medium text-white">{form.nome}</dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2 border-b border-white/10 pb-3">
                    <dt className="text-white/50">Contato</dt>
                    <dd className="text-right font-medium text-white">
                      {form.whatsapp} · {form.email}
                    </dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2 border-b border-white/10 pb-3">
                    <dt className="text-white/50">Data</dt>
                    <dd className="font-medium text-white">{form.dataEvento}</dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2 border-b border-white/10 pb-3">
                    <dt className="text-white/50">Cidade</dt>
                    <dd className="font-medium text-white">{form.cidade}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-white/50">Descrição</dt>
                    <dd className="rounded-2xl bg-slate-900/50 p-4 text-white/90">{form.descricao}</dd>
                  </div>
                </dl>
                <div className="flex flex-wrap justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={goBack}
                    className="rounded-2xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/90 transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    disabled={isStreaming}
                    onClick={() => void handleWizardSubmit()}
                    className="rounded-2xl bg-yellow-400 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-yellow-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Enviar e falar com o assistente
                  </button>
                </div>
              </motion.div>
            ) : null}
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            id="panel-chat"
            role="tabpanel"
            aria-labelledby="tab-chat"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-auto flex max-w-2xl flex-col"
          >
            <div
              className="mb-4 max-h-[min(70vh,520px)] min-h-[280px] space-y-4 overflow-y-auto rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6"
              aria-live="polite"
              aria-relevant="additions text"
            >
              {messages.map((m, i) => (
                <div
                  key={`${i}-${m.role}`}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[75%] ${
                      m.role === 'user'
                        ? 'bg-yellow-400/20 text-white'
                        : 'border border-white/10 bg-white/5 text-white/90'
                    }`}
                  >
                    {m.content ? (
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    ) : m.role === 'assistant' && isStreaming ? (
                      <TypingDots />
                    ) : null}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            {streamError ? (
              <p className="mb-2 text-center text-xs text-red-300" role="alert">
                {streamError}
              </p>
            ) : null}
            <div className="flex gap-2 rounded-3xl border border-white/10 bg-slate-900/60 p-2">
              <label htmlFor="chat-input" className="sr-only">
                Mensagem para o assistente
              </label>
              <input
                id="chat-input"
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={onChatKeyDown}
                disabled={isStreaming}
                placeholder="Escreva sua mensagem..."
                className="min-h-[48px] flex-1 rounded-2xl border border-transparent bg-transparent px-4 text-sm text-white placeholder:text-white/35 focus:border-yellow-400/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 disabled:opacity-50"
              />
              <button
                type="button"
                disabled={isStreaming || !chatInput.trim()}
                onClick={handleChatSend}
                className="shrink-0 rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-yellow-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Enviar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-auto mt-14 max-w-2xl text-center"
      >
        <p className="mb-4 text-sm text-white/55">Prefere fechar direto pelo WhatsApp?</p>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-3xl border border-emerald-400/30 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <FaWhatsapp className="text-lg" aria-hidden />
          Chamar no WhatsApp
        </a>
      </motion.footer>
    </PageShell>
  )
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-0.5" aria-label="Assistente digitando">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block h-2 w-2 rounded-full bg-yellow-300/80"
          animate={{ opacity: [0.35, 1, 0.35], y: [0, -3, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  )
}
