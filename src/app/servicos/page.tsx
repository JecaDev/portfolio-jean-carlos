'use client'

import { motion } from 'framer-motion'
import {
  FaCamera,
  FaVideo,
  FaPalette,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaLinkedin,
  FaDownload,
  FaQuoteLeft,
} from 'react-icons/fa'

export default function Servicos() {
  const instagramUser = 'gradedbyjean'
  const whatsappNumber = '+5571988601554'
  const email = 'jeanmacedo1302@gmail.com'
  const linkedinUser = 'jeancarlos1302'
  const cvPath = '/curriculo-jeanmacedo.pdf'

  return (
    <main className="relative min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/3 h-72 w-72 rounded-full bg-yellow-400/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[160px]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-3"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-white/50">Serviços</span>
          <h1 className="text-4xl font-bold text-yellow-300 sm:text-5xl">
            Produções que conectam pessoas e marcas
          </h1>
          <p className="max-w-3xl text-sm text-white/70 sm:text-base">
            Olá! Eu sou <strong>Jean Macêdo</strong>, apaixonado por fotografia e vídeo profissional. Transformo visões e emoções em imagens que impactam e contam histórias com autenticidade.
          </p>
        </motion.div>

        <section className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/40">
          <p className="text-lg leading-relaxed text-white/80">
            Com experiência em retratos, eventos e produção audiovisual, busco sempre inovar e conectar com o público, entregando qualidade visual e narrativa.
          </p>
          <ul className="space-y-2 text-lg text-white/80">
            <li>📸 Fotografia profissional (retrato, eventos, editorial)</li>
            <li>🎬 Produção e edição de vídeo</li>
            <li>🎨 Direção criativa e color grading</li>
          </ul>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={cvPath}
              download
              className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
            >
              <FaDownload />
              Baixar Currículo
            </a>
            <div className="flex items-center gap-3 text-2xl">
              <a
                href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white/5 p-3 text-green-400 transition hover:bg-white/10"
              >
                <FaWhatsapp />
              </a>
              <a
                href={`https://instagram.com/${instagramUser}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white/5 p-3 text-pink-400 transition hover:bg-white/10"
              >
                <FaInstagram />
              </a>
              <a
                href={`mailto:${email}`}
                className="rounded-full bg-white/5 p-3 text-yellow-300 transition hover:bg-white/10"
              >
                <FaEnvelope />
              </a>
              <a
                href={`https://linkedin.com/in/${linkedinUser}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white/5 p-3 text-sky-400 transition hover:bg-white/10"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">Especialidades</p>
            <h2 className="text-3xl font-bold text-yellow-300">O que posso criar</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <FaCamera size={28} />,
                title: 'Fotografia Profissional',
                desc: 'Retratos, ensaios, eventos e editoriais com direção e qualidade.',
              },
              {
                icon: <FaVideo size={28} />,
                title: 'Vídeo e Edição',
                desc: 'Produção audiovisual completa com narrativa impactante.',
              },
              {
                icon: <FaPalette size={28} />,
                title: 'Color Grading e Direção Criativa',
                desc: 'Refino visual e identidade única para cada projeto.',
              },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/40 transition hover:-translate-y-1 hover:border-yellow-400/40"
              >
                <div className="mb-4 text-yellow-300">{s.icon}</div>
                <h3 className="mb-2 text-lg font-semibold">{s.title}</h3>
                <p className="text-sm text-white/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">Depoimentos</p>
            <h2 className="text-3xl font-bold text-yellow-300">Clientes satisfeitos</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                nome: 'Marina S.',
                texto:
                  'A sensibilidade do Jean ao capturar momentos foi além do esperado. As fotos do meu evento ficaram incríveis!',
              },
              {
                nome: 'Carlos A.',
                texto:
                  'Trabalhar com Jean foi fácil, rápido e com um resultado impecável. Recomendo de olhos fechados.',
              },
            ].map((dep, i) => (
              <div
                key={i}
                className="relative rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/40"
              >
                <FaQuoteLeft className="absolute top-6 left-6 text-yellow-300/70" />
                <p className="pl-8 text-base italic text-white/80">{dep.texto}</p>
                <p className="mt-4 text-right text-sm font-semibold text-yellow-200">
                  — {dep.nome}
                </p>
              </div>
            ))}
          </div>
        </section>

        <blockquote className="rounded-3xl border border-white/10 bg-white/5 px-6 py-6 text-center text-lg italic text-yellow-200">
          "Transformando momentos em memórias inesquecíveis através da arte visual."
        </blockquote>
      </div>
    </main>
  )
}
