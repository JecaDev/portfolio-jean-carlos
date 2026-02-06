'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 px-6 py-4 backdrop-blur">
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
        <span className="text-yellow-300 text-lg font-semibold tracking-wide whitespace-nowrap">
          Jean Carlos • Foto & Vídeo
        </span>
      </Link>

      {/* Botão Menu Mobile */}
      <button
        className="text-yellow-300 md:hidden focus:outline-none z-20"
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
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>

      {/* Menu desktop */}
      <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-white/80 z-20">
        <Link href="/" className="transition-colors duration-200 hover:text-yellow-200">
          Home
        </Link>
        <Link href="/portfolio" className="transition-colors duration-200 hover:text-yellow-200">
          Portfólio
        </Link>
        <Link href="/sobre" className="transition-colors duration-200 hover:text-yellow-200">
          Sobre
        </Link>
        <Link href="/servicos" className="transition-colors duration-200 hover:text-yellow-200">
          Serviços
        </Link>
        <Link href="/contato" className="transition-colors duration-200 hover:text-yellow-200">
          Contato
        </Link>
      </nav>

      {menuOpen && (
        <nav
          className="absolute top-full right-0 mt-2 w-52 rounded-2xl border border-white/10 bg-slate-950/95 p-2 shadow-xl flex flex-col z-10"
          onClick={() => setMenuOpen(false)} // fecha menu ao clicar em link
>
          <Link href="/" className="rounded-xl px-4 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white">
            Home
          </Link>
          <Link href="/portfolio" className="rounded-xl px-4 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white">
            Portfólio
          </Link>
          <Link href="/sobre" className="rounded-xl px-4 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white">
            Sobre
          </Link>
          <Link href="/servicos" className="rounded-xl px-4 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white">
            Serviços
          </Link>
          <Link href="/contato" className="rounded-xl px-4 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white">
            Contato
          </Link>
        </nav>
      )}
    </header>
  )
}
