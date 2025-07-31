'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-black shadow-md py-4 px-6 flex items-center justify-between">
      {/* Logo + Nome */}
      <Link href="/" className="flex items-center space-x-3">
        <Image
          src="/logo.png" // certifique-se que o nome do arquivo esteja correto
          alt="Logo do portfólio"
          width={36}
          height={36}
          className="rounded-full"
        />
        <span className="text-yellow-400 text-xl font-bold tracking-wide">
          Jean Macêdo • Foto & Vídeo
        </span>
      </Link>

      {/* Navegação */}
      <nav className="space-x-6 hidden md:flex">
        <Link href="/" className="text-yellow-400 hover:text-white transition-colors duration-200 font-medium">
          Home
        </Link>
        <Link href="/portfolio" className="text-yellow-400 hover:text-white transition-colors duration-200 font-medium">
          Portfólio
        </Link>
        <Link href="/sobre" className="text-yellow-400 hover:text-white transition-colors duration-200 font-medium">
          Sobre
        </Link>
        <Link href="/contato" className="text-yellow-400 hover:text-white transition-colors duration-200 font-medium">
          Contato
        </Link>
      </nav>
    </header>
  )
}
