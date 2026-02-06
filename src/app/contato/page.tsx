'use client'

import { FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa'

export default function Contato() {
  const whatsappNumber = '+5571988601554' // seu número completo, ex: +5598999999999
  const instagramUser = 'gradedbyjean'
  const email = 'jeanmacedo1302@gmail.com'

  return (
    <main className="relative min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/3 h-72 w-72 rounded-full bg-yellow-400/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[160px]" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-12">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Contato</p>
          <h1 className="mt-2 text-4xl font-bold text-yellow-300 sm:text-5xl">
            Fale comigo
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/70 sm:text-base">
            Estou pronto para entender seu projeto e sugerir a melhor solução visual.
          </p>
        </div>

        <div className="grid w-full gap-6 md:grid-cols-3">
          <a
            href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/40 transition hover:-translate-y-1 hover:border-green-400/40"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/20 text-green-300 transition group-hover:scale-105">
              <FaWhatsapp size={24} />
            </div>
            <h2 className="mt-4 text-lg font-semibold">WhatsApp</h2>
            <p className="mt-2 text-sm text-white/70">Resposta rápida e atendimento direto.</p>
          </a>

          <a
            href={`https://instagram.com/${instagramUser}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/40 transition hover:-translate-y-1 hover:border-pink-400/40"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-300 transition group-hover:scale-105">
              <FaInstagram size={24} />
            </div>
            <h2 className="mt-4 text-lg font-semibold">Instagram</h2>
            <p className="mt-2 text-sm text-white/70">Bastidores, novidades e portfólio diário.</p>
          </a>

          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/40 transition hover:-translate-y-1 hover:border-yellow-400/40"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/20 text-yellow-300 transition group-hover:scale-105">
              <FaEnvelope size={24} />
            </div>
            <h2 className="mt-4 text-lg font-semibold">Email</h2>
            <p className="mt-2 text-sm text-white/70">Envie briefings e propostas completas.</p>
          </a>
        </div>

        <p className="text-center text-sm text-white/60">
          Respondo rápido! Fique à vontade para entrar em contato pelo canal que preferir.
        </p>
      </div>
    </main>
  )
}
