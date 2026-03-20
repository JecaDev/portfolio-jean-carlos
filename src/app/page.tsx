'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa'
import PageShell from '../components/ui/PageShell'

const email = 'jeanmacedo1302@gmail.com'

const contactLinks = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/5571988601554',
    icon: FaWhatsapp,
    className: 'from-emerald-400/20 via-emerald-500/10 to-transparent text-emerald-300',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/gradedbyjean',
    icon: FaInstagram,
    className: 'from-pink-400/20 via-fuchsia-500/10 to-transparent text-pink-300',
  },
  {
    id: 'email',
    label: 'Email',
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
    icon: FaEnvelope,
    className: 'from-yellow-300/20 via-amber-400/10 to-transparent text-yellow-300',
  },
]

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-400/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-cyan-500/20 blur-[160px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-10 sm:px-6 sm:py-16">
        <div className="grid min-w-0 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex min-w-0 flex-col items-center space-y-6 text-center lg:items-start lg:text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70">
              Portfólio criativo
            </span>

            <h1 className="text-2xl font-extrabold leading-tight text-yellow-300 sm:text-4xl lg:text-6xl">
              Bem-vindo ao meu portfólio
            </h1>

            <p className="text-sm leading-relaxed text-white/80 sm:text-base lg:text-lg">
              Eu sou <strong className="text-white">Jean Macêdo</strong>, fotógrafo e videomaker apaixonado por capturar momentos únicos e transformar ideias em arte visual. Explore meus projetos e entre em contato para criarmos algo incrível juntos.
            </p>

            <div className="flex w-full max-w-sm flex-wrap items-center justify-center gap-2 sm:gap-3 lg:justify-start">
              {contactLinks.map(({ id, label, href, icon: Icon, className }) => (
                <motion.a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-gradient-to-br px-3 py-2 text-xs font-semibold text-white/90 shadow-lg shadow-black/20 transition sm:gap-3 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm ${className}`}
                  aria-label={label}
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 text-sm transition group-hover:scale-105 sm:h-10 sm:w-10 sm:text-xl">
                    <Icon />
                  </span>
                  <span className="text-xs sm:text-base">{label}</span>
                </motion.a>
              ))}
            </div>

            <motion.a
              href="/contato"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-8 py-4 text-base font-bold text-slate-950 shadow-xl shadow-yellow-400/30 transition hover:bg-yellow-300"
            >
              Entrar em contato
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative mx-auto flex w-full max-w-sm items-center justify-center sm:max-w-md lg:max-w-none"
          >
            <div className="absolute -inset-4 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl sm:-inset-6 sm:rounded-[40px]" />
            <div className="relative w-full overflow-hidden rounded-[24px] border border-white/10 bg-slate-900/60 p-4 shadow-2xl sm:rounded-[32px] sm:p-6">
              <div className="absolute -right-6 top-8 h-24 w-24 rounded-full bg-yellow-400/30 blur-2xl" />
              <Image
                src="/JeanCarlos.jpg"
                alt="Jean Macêdo"
                width={420}
                height={520}
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 420px"
                quality={85}
                className="aspect-[3/4] w-full rounded-2xl object-cover sm:rounded-3xl"
                priority
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDIwIiBoZWlnaHQ9IjUyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWUyOTNiIi8+PC9zdmc+"
              />
              <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 sm:mt-6 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm">
                <span>Fotógrafo & Videomaker</span>
                <span className="flex items-center gap-2 text-yellow-300">
                  <span className="h-2 w-2 rounded-full bg-yellow-300" />
                  Disponível
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
