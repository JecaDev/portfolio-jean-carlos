'use client'

import Image from 'next/image'
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

export default function Sobre() {
  const instagramUser = 'gradedbyjean'
  const whatsappNumber = '+5571988601554'
  const email = 'jeanmacedo1302@gmail.com'
  const linkedinUser = 'jeancarlos1302'
  const cvPath = '/curriculo-jeanmacedo.pdf'

  return (
    <PageShell>
      <PageHeader
        eyebrow="Minha história"
        title="Sobre mim"
        description="Fotógrafo e videomaker focado em transformar ideias em experiências visuais marcantes."
      />

      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <p className="text-base leading-relaxed text-white/80 sm:text-lg">
            Olá! Eu sou <strong>Jean Macêdo</strong>, apaixonado por fotografia e vídeo profissional. Transformo visões e emoções em imagens que impactam e contam histórias com autenticidade.
          </p>

          <p className="text-base leading-relaxed text-white/80 sm:text-lg">
            Com experiência em retratos, eventos e produção audiovisual, busco sempre inovar e conectar com o público, entregando qualidade visual e narrativa.
          </p>

          <ul className="space-y-2 text-base text-white/80 sm:text-lg">
            <li>📸 Fotografia profissional (retrato, eventos, editorial)</li>
            <li>🎬 Produção e edição de vídeo</li>
            <li>🎨 Direção criativa e color grading</li>
          </ul>

          <a
            href={cvPath}
            download
            className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-yellow-400/30 transition hover:bg-yellow-300"
          >
            <FaDownload />
            Baixar Currículo
          </a>

          <div className="flex flex-wrap gap-4 pt-4 text-2xl">
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute -inset-6 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl" />
          <div className="relative overflow-hidden rounded-[32px] border border-white/20 bg-slate-900/60 p-6 shadow-2xl">
            <Image
              src="/JeanCarlos.jpg"
              alt="Jean Macêdo"
              width={360}
              height={360}
              className="h-[320px] w-[320px] rounded-3xl object-cover sm:h-[360px] sm:w-[360px]"
            />
          </div>
        </motion.div>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-yellow-200 text-center">Serviços</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { icon: <FaCamera size={32} />, title: 'Fotografia Profissional', desc: 'Retratos, ensaios, eventos e editoriais com direção e qualidade.' },
            { icon: <FaVideo size={32} />, title: 'Vídeo e Edição', desc: 'Produção audiovisual completa com narrativa impactante.' },
            { icon: <FaPalette size={32} />, title: 'Color Grading e Direção Criativa', desc: 'Refino visual e identidade única para cada projeto.' },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-white/80 shadow-lg shadow-black/30 transition hover:-translate-y-1"
            >
              <div className="mb-4 text-yellow-300">{s.icon}</div>
              <h3 className="text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-white/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-yellow-200 text-center">Depoimentos</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            {
              nome: 'Marina A.',
              texto: 'A sensibilidade do Jean ao capturar momentos foi além do esperado. As fotos do meu evento ficaram incríveis!',
            },
            {
              nome: 'Noelice S.',
              texto: 'Trabalho de excelência, feito com muitíssimo profissionalismo e muito amor também. Obrigada por ajudar a eternizar os melhores momentos da minha família.',
            },
          ].map((dep, i) => (
            <div
              key={i}
              className="relative rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80 shadow-lg shadow-black/30"
            >
              <FaQuoteLeft className="absolute top-4 left-4 text-yellow-400 text-xl opacity-60" />
              <p className="mb-4 pl-6 text-base italic">{dep.texto}</p>
              <p className="text-right text-sm font-semibold text-yellow-200">— {dep.nome}</p>
            </div>
          ))}
        </div>
      </section>

      <blockquote className="mt-16 text-center text-lg font-medium italic text-yellow-200">
        "Transformando momentos em memórias inesquecíveis através da arte visual."
      </blockquote>
    </PageShell>
  )
}
