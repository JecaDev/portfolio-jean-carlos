'use client'

import Link from 'next/link'
import PageShell from '../components/ui/PageShell'

export default function NotFound() {
  return (
    <PageShell containerClassName="flex min-h-screen flex-col items-center justify-center text-center">
      <span className="text-5xl" role="img" aria-label="Lupa">🔍</span>
      <h1 className="mt-6 text-3xl font-extrabold text-yellow-300 sm:text-4xl">
        Ops! Essa página não existe
      </h1>
      <p className="mt-4 max-w-md text-sm text-white/70 sm:text-base">
        O link que você acessou pode estar incorreto ou a página foi removida.
        Que tal voltar ao início?
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-yellow-400/30 transition hover:bg-yellow-300"
      >
        Ir para a página inicial
      </Link>
    </PageShell>
  )
}
