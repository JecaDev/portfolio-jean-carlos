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
import PageHeader from '../../components/ui/PageHeader'
import PageShell from '../../components/ui/PageShell'

const servicos = [
  {
    icon: <FaCamera size={32} />,
    title: 'Fotografia Profissional',
    desc: 'Retratos, ensaios, eventos e editoriais com direção criativa e qualidade de entrega.',
  },
  {
    icon: <FaVideo size={32} />,
    title: 'Vídeo e Edição',
    desc: 'Produção audiovisual completa — da captação ao corte final — com narrativa impactante.',
  },
  {
    icon: <FaPalette size={32} />,
    title: 'Color Grading & Direção Criativa',
    desc: 'Refino visual e identidade única para cada projeto, do tom à paleta de cor.',
  },
]

const depoimentos = [
  {
    nome: 'Marina S.',
    texto: 'A sensibilidade do Jean ao capturar momentos foi além do esperado. As fotos do meu evento ficaram incríveis!',
  },
  {
    nome: 'Carlos A.',
    texto: 'Trabalhar com Jean foi fácil, rápido e com um resultado impecável. Recomendo de olhos fechados.',
  },
]

const instagramUser = 'gradedbyjean'
const whatsappNumber = '+5571988601554'
const email = 'jeanmacedo1302@gmail.com'
const linkedinUser = 'jeancarlos1302'
const cvPath = '/curriculo-jeanmacedo.pdf'

export default function Servicos() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Serviços"
        title="O que posso criar para você"
        description="Soluções completas em foto, vídeo e direção criativa com foco em impacto visual."
      />

      {/* Cards de serviços */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid gap-6 md:grid-cols-3"
      >
        {servicos.map((s, i) => (
          <div
            key={i}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-white/80 shadow-lg shadow-black/30 transition hover:-translate-y-1"
          >
            <div className="mb-4 flex justify-center text-yellow-300">{s.icon}</div>
            <h3 className="text-lg font-semibold text-white">{s.title}</h3>
            <p className="mt-2 text-sm text-white/70">{s.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Depoimentos */}
      <section className="mt-16">
        <h2 className="text-center text-2xl font-semibold text-yellow-200">Depoimentos</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {depoimentos.map((dep, i) => (
            <div
              key={i}
              className="relative rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80 shadow-lg shadow-black/30"
            >
              <FaQuoteLeft className="absolute left-4 top-4 text-xl text-yellow-400 opacity-60" />
              <p className="mb-4 pl-6 text-base italic">{dep.texto}</p>
              <p className="text-right text-sm font-semibold text-yellow-200">— {dep.nome}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-16 flex flex-col items-center gap-6"
      >
        <p className="text-center text-lg font-medium italic text-yellow-200">
          "Transformando momentos em memórias inesquecíveis através da arte visual."
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={cvPath}
            download
            className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-yellow-400/30 transition hover:bg-yellow-300"
          >
            <FaDownload />
            Baixar Currículo
          </a>

          <div className="flex items-center gap-3 text-2xl">
            <a
              href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/5 p-3 text-green-400 transition hover:-translate-y-1 hover:text-green-300"
            >
              <FaWhatsapp />
            </a>
            <a
              href={`https://instagram.com/${instagramUser}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/5 p-3 text-pink-400 transition hover:-translate-y-1 hover:text-pink-300"
            >
              <FaInstagram />
            </a>
            <a
              href={`mailto:${email}`}
              className="rounded-full border border-white/10 bg-white/5 p-3 text-yellow-300 transition hover:-translate-y-1 hover:text-yellow-200"
            >
              <FaEnvelope />
            </a>
            <a
              href={`https://linkedin.com/in/${linkedinUser}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/5 p-3 text-sky-300 transition hover:-translate-y-1 hover:text-sky-200"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </motion.div>
    </PageShell>
  )
}
