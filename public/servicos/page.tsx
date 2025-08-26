'use client'

import { motion } from 'framer-motion'
import { FaCamera, FaVideo, FaPalette, FaInstagram, FaWhatsapp, FaEnvelope, FaLinkedin, FaDownload, FaQuoteLeft } from 'react-icons/fa'

export default function Sobre() {
  const instagramUser = 'gradedbyjean'
  const whatsappNumber = '+5571988601554'
  const email = 'jeanmacedo1302@gmail.com'
  const linkedinUser = 'jeancarlos1302'
  const cvPath = '/curriculo-jeanmacedo.pdf'

  return (
    <main className="bg-black text-white min-h-screen px-6 py-16 flex flex-col items-center">
      {/* Título principal */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl font-extrabold text-yellow-400 mb-12 text-center"
      >
        Sobre mim
      </motion.h1>

      {/* Seção principal */}
      <div className="flex flex-col-reverse md:flex-row items-center max-w-6xl w-full gap-12 mb-20">
        <div className="flex-1 space-y-6">
          <p className="text-lg leading-relaxed">
            Olá! Eu sou <strong>Jean Macêdo</strong>, apaixonado por fotografia e vídeo profissional. Transformo visões e emoções em imagens que impactam e contam histórias com autenticidade.
          </p>

          <p className="text-lg leading-relaxed">
            Com experiência em retratos, eventos e produção audiovisual, busco sempre inovar e conectar com o público, entregando qualidade visual e narrativa.
          </p>

          <ul className="list-disc list-inside space-y-1 text-lg">
            <li>📸 Fotografia profissional (retrato, eventos, editorial)</li>
            <li>🎬 Produção e edição de vídeo</li>
            <li>🎨 Direção criativa e color grading</li>
          </ul>

          <a
            href={cvPath}
            download
            className="inline-flex items-center gap-2 bg-yellow-400 text-black font-semibold px-6 py-3 rounded hover:bg-yellow-300 transition mt-4 shadow-lg"
          >
            <FaDownload />
            Baixar Currículo
          </a>

          <div className="flex gap-6 pt-6 text-3xl">
            <a href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`} target="_blank" className="text-green-500 hover:text-green-400"><FaWhatsapp /></a>
            <a href={`https://instagram.com/${instagramUser}`} target="_blank" className="text-pink-500 hover:text-pink-400"><FaInstagram /></a>
            <a href={`mailto:${email}`} className="text-yellow-400 hover:text-yellow-300"><FaEnvelope /></a>
            <a href={`https://linkedin.com/in/${linkedinUser}`} target="_blank" className="text-blue-500 hover:text-blue-400"><FaLinkedin /></a>
          </div>
        </div>

        {/* Imagem */}
        <div className="flex-shrink-0 w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-yellow-400 shadow-xl">
          <img src="/JeanCarlos.jpg" alt="Jean Macêdo" className="object-cover w-full h-full" />
        </div>
      </div>

      {/* Sessão de Serviços */}
      <section className="w-full max-w-6xl mb-20">
        <h2 className="text-3xl text-yellow-400 font-bold mb-8 text-center">Serviços</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <FaCamera size={32} />, title: 'Fotografia Profissional', desc: 'Retratos, ensaios, eventos e editoriais com direção e qualidade.' },
            { icon: <FaVideo size={32} />, title: 'Vídeo e Edição', desc: 'Produção audiovisual completa com narrativa impactante.' },
            { icon: <FaPalette size={32} />, title: 'Color Grading e Direção Criativa', desc: 'Refino visual e identidade única para cada projeto.' },
          ].map((s, i) => (
            <div key={i} className="bg-neutral-900 p-6 rounded shadow-lg text-center hover:bg-neutral-800 transition">
              <div className="text-yellow-400 mb-3">{s.icon}</div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-gray-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sessão de Depoimentos */}
      <section className="w-full max-w-6xl mb-20">
        <h2 className="text-3xl text-yellow-400 font-bold mb-10 text-center">Depoimentos</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              nome: 'Marina S.',
              texto: 'A sensibilidade do Jean ao capturar momentos foi além do esperado. As fotos do meu evento ficaram incríveis!',
            },
            {
              nome: 'Carlos A.',
              texto: 'Trabalhar com Jean foi fácil, rápido e com um resultado impecável. Recomendo de olhos fechados.',
            },
          ].map((dep, i) => (
            <div key={i} className="bg-neutral-900 p-6 rounded shadow-lg relative">
              <FaQuoteLeft className="absolute top-4 left-4 text-yellow-400 text-2xl opacity-60" />
              <p className="text-lg italic mb-4 pl-6">{dep.texto}</p>
              <p className="text-yellow-300 font-semibold text-right">— {dep.nome}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Frase final */}
      <blockquote className="mt-16 text-center italic text-yellow-300 text-xl font-medium max-w-3xl">
        "Transformando momentos em memórias inesquecíveis através da arte visual."
      </blockquote>
    </main>
  )
}
