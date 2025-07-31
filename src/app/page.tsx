'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa'

const email = 'jeanmacedo1302@gmail.com'

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-6 py-16">
      {/* Imagem de destaque */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-1 mb-6 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-yellow-400 shadow-xl"
      >
        <Image
          src="/JeanCarlos.jpg"
          alt="Jean Macêdo"
          width={320}   // md:w-80 == 320px, ajustei para corresponder
          height={320}
          className="object-cover rounded-full"
          priority  // carrega rápido pois é a imagem principal
          placeholder="empty" // para usar blur, precisa de uma base64; sem ela, use "empty"
        />
      </motion.div>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 mb-6">
          Bem-vindo ao meu portfólio
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
          Eu sou <strong>Jean Macêdo</strong>, fotógrafo e videomaker apaixonado por capturar momentos únicos e transformar ideias em arte visual. Explore meus projetos e entre em contato para criarmos algo incrível juntos.
        </p>

        {/* Botões de contato */}
        <div className="flex justify-center gap-6 text-2xl">
          <a
            href="https://wa.me/5571988601554"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-400 transition"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://instagram.com/gradedbyjean"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 hover:text-yellow-300 transition"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* CTA */}
        <a
          href="/contato"
          className="mt-10 inline-block px-8 py-4 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition shadow-lg"
        >
          Entrar em contato
        </a>
      </motion.div>

      
    </main>
  )
}
