'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-zinc-950 shadow-md py-4 px-6 flex items-center justify-between relative">
      {/* Logo + Nome */}
      <Link href="/" className="flex items-center space-x-3 z-20">
        <Image
          src="/logo.png"
          alt="Logo do portfólio"
          width={36}
          height={36}
          className="rounded-full"
          priority
        />
        <span className="text-yellow-400 text-lg font-bold tracking-wide whitespace-nowrap">
          Jean Carlos • Foto & Vídeo
        </span>
      </Link>

      {/* Botão Menu Mobile */}
      <button
        className="text-yellow-400 md:hidden focus:outline-none z-20"
        aria-label="Abrir menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {/* Ícone hambúrguer */}
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          {menuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" /> // ícone "X" quando aberto
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" /> // ícone hambúrguer
          )}
        </svg>
      </button>

      {/* Menu desktop */}
      <nav className="hidden md:flex space-x-6 z-20">
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

      {/* Menu mobile */}
      {menuOpen && (
        <nav
          className="absolute top-full right-0 mt-2 w-48 bg-black border border-yellow-400 rounded-md shadow-lg flex flex-col z-10"
          onClick={() => setMenuOpen(false)} // fecha menu ao clicar em link
>
          <Link href="/" className="px-4 py-3 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors font-medium">
            Home
          </Link>
          <Link href="/portfolio" className="px-4 py-3 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors font-medium">
            Portfólio
          </Link>
          <Link href="/sobre" className="px-4 py-3 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors font-medium">
            Sobre
          </Link>
          <Link href="/contato" className="px-4 py-3 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors font-medium">
            Contato
          </Link>
        </nav>
      )}
    </header>
  )
}
