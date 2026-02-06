'use client'

import { FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa'
import PageHeader from '../../components/ui/PageHeader'
import PageShell from '../../components/ui/PageShell'

export default function Contato() {
  const whatsappNumber = '+5571988601554' // seu número completo, ex: +5598999999999
  const instagramUser = 'gradedbyjean'
  const email = 'jeanmacedo1302@gmail.com'

  return (
    <PageShell containerClassName="flex min-h-screen flex-col justify-center">
      <PageHeader
        eyebrow="Contato"
        title="Fale comigo"
        description="Escolha o canal que preferir e vamos criar algo incrível juntos."
      />

      <div className="mx-auto grid w-full max-w-3xl gap-6 md:grid-cols-3">
        <a
          href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-400/20 via-emerald-500/10 to-transparent px-6 py-8 text-center shadow-lg shadow-black/30 transition hover:-translate-y-1"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-2xl text-emerald-300 transition group-hover:scale-110">
            <FaWhatsapp />
          </span>
          <span className="text-lg font-semibold text-white">WhatsApp</span>
          <span className="text-sm text-white/60">Resposta rápida e direta</span>
        </a>

        <a
          href={`https://instagram.com/${instagramUser}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-pink-400/20 via-fuchsia-500/10 to-transparent px-6 py-8 text-center shadow-lg shadow-black/30 transition hover:-translate-y-1"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-2xl text-pink-300 transition group-hover:scale-110">
            <FaInstagram />
          </span>
          <span className="text-lg font-semibold text-white">Instagram</span>
          <span className="text-sm text-white/60">Portfólio e bastidores</span>
        </a>

        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-yellow-300/20 via-amber-400/10 to-transparent px-6 py-8 text-center shadow-lg shadow-black/30 transition hover:-translate-y-1"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-2xl text-yellow-300 transition group-hover:scale-110">
            <FaEnvelope />
          </span>
          <span className="text-lg font-semibold text-white">Enviar Email</span>
          <span className="text-sm text-white/60">Propostas detalhadas</span>
        </a>
      </div>

      <p className="mt-12 text-center text-sm text-white/60">
        Respondo rápido! Fique à vontade para entrar em contato pelo canal que preferir.
      </p>
    </PageShell>
  )
}
