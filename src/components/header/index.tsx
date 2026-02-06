'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400/10">
            <Image
              src="/logo.png"
              alt="Logo do portfólio"
              width={36}
              height={36}
              className="rounded-full"
              priority
            />
          </span>
          <div>
            <span className="block text-sm uppercase tracking-[0.3em] text-white/60">
              Portfólio
            </span>
            <span className="text-lg font-semibold text-yellow-300">
              Jean Carlos • Foto & Vídeo
            </span>
          </div>
        </Link>

        <button
          className="rounded-full border border-yellow-400/40 p-2 text-yellow-300 md:hidden"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen(!menuOpen)}
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

        <nav className="hidden items-center gap-6 md:flex">
          {[
            { href: '/', label: 'Home' },
            { href: '/portfolio', label: 'Portfólio' },
            { href: '/sobre', label: 'Sobre' },
            { href: '/contato', label: 'Contato' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:text-yellow-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-slate-950/90 md:hidden">
          <nav
            className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-4"
            onClick={() => setMenuOpen(false)}
          >
            {[
              { href: '/', label: 'Home' },
              { href: '/portfolio', label: 'Portfólio' },
              { href: '/sobre', label: 'Sobre' },
              { href: '/contato', label: 'Contato' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-yellow-400/40 hover:text-yellow-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
