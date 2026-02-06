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
    <PageShell containerClassName="flex min-h-screen flex-col justify-center">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.25em] text-white/70">
              Portfólio criativo
            </span>

            <h1 className="text-4xl font-extrabold leading-tight text-yellow-300 sm:text-5xl lg:text-6xl">
              Bem-vindo ao meu portfólio
            </h1>

            <p className="text-base text-white/80 sm:text-lg leading-relaxed">
              Eu sou <strong className="text-white">Jean Macêdo</strong>, fotógrafo e videomaker apaixonado por capturar momentos únicos e transformar ideias em arte visual. Explore meus projetos e entre em contato para criarmos algo incrível juntos.
            </p>

            <div className="flex flex-wrap gap-4">
              {contactLinks.map(({ id, label, href, icon: Icon, className }) => (
                <motion.a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group flex items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-br px-5 py-3 text-sm font-semibold text-white/90 shadow-lg shadow-black/20 transition ${className}`}
                  aria-label={label}
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-xl transition group-hover:scale-105">
                    <Icon />
                  </span>
                  <span className="text-base">{label}</span>
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
            className="relative flex items-center justify-center"
          >
            <div className="absolute -inset-6 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-white/20 bg-slate-900/60 p-6 shadow-2xl">
              <div className="absolute -right-6 top-8 h-24 w-24 rounded-full bg-yellow-400/30 blur-2xl" />
              <Image
                src="/JeanCarlos.jpg"
                alt="Jean Macêdo"
                width={420}
                height={520}
                className="h-[420px] w-[320px] rounded-3xl object-cover sm:h-[460px] sm:w-[360px]"
                priority
                placeholder="empty"
              />
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                <span>Fotógrafo & Videomaker</span>
                <span className="flex items-center gap-2 text-yellow-300">
                  <span className="h-2 w-2 rounded-full bg-yellow-300" />
                  Disponível
                </span>
              </div>
            </div>
          </motion.div>
        </div>
    </PageShell>
  )
}
