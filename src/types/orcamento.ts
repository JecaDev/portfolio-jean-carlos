export type ServiceType = 'fotografia' | 'video' | 'grading' | 'pacote'

export interface OrcamentoFormData {
  service: ServiceType | null
  nome: string
  whatsapp: string
  email: string
  dataEvento: string
  cidade: string
  descricao: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}
