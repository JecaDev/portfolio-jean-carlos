'use client'

import { FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa'

export default function Contato() {
  const whatsappNumber = '+5571988601554' // seu número completo, ex: +5598999999999
  const instagramUser = 'gradedbyjean'
  const email = 'jeanmacedo1302@gmail.com'

  return (
    <main className="bg-black min-h-screen flex flex-col items-center justify-center px-6 py-12 text-white">
      <h1 className="text-4xl font-extrabold text-yellow-400 mb-12 drop-shadow-lg">
        Fale comigo
      </h1>

      <div className="flex flex-col gap-6 w-full max-w-sm">
        {/* WhatsApp */}
        <a
          href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-green-600 hover:bg-green-700 transition rounded-lg px-6 py-4 shadow-lg transform hover:-translate-y-1 hover:shadow-2xl"
        >
          <FaWhatsapp size={28} />
          <span className="text-lg font-semibold">WhatsApp</span>
        </a>

        {/* Instagram */}
        <a
          href={`https://instagram.com/${instagramUser}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-pink-600 hover:bg-pink-700 transition rounded-lg px-6 py-4 shadow-lg transform hover:-translate-y-1 hover:shadow-2xl"
        >
          <FaInstagram size={28} />
          <span className="text-lg font-semibold">Instagram</span>
        </a>

        {/* Email */}
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-yellow-400 text-black hover:bg-yellow-300 transition rounded-lg px-6 py-4 shadow-lg transform hover:-translate-y-1 hover:shadow-2xl"
        >
          <FaEnvelope size={28} />
          <span className="text-lg font-semibold">Enviar Email</span>
        </a>
      </div>

      <p className="mt-16 text-gray-400 text-sm text-center max-w-xs mx-auto">
        Respondo rápido! Fique à vontade para entrar em contato pelo canal que preferir.
      </p>
    </main>
  )
}
