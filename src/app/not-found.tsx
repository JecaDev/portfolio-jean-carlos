'use client'

import Link from 'next/link'
import PageShell from '../components/ui/PageShell'

export default function NotFound() {
  return (
    <PageShell containerClassName="flex min-h-screen flex-col items-center justify-center text-center">
      <p className="text-sm uppercase tracking-[0.35em] text-white/60">Erro 404</p>
      <h1 className="mt-4 text-4xl font-extrabold text-yellow-300 sm:text-5xl">
        Página não encontrada
      </h1>
      <p className="mt-4 max-w-md text-sm text-white/70 sm:text-base">
        Essa página que tentou acessar não existe ou foi movida.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-yellow-400/30 transition hover:bg-yellow-300"
      >
        Voltar para Home
      </Link>
    </PageShell>
  )
}
