'use client'

import PageShell from '../components/ui/PageShell'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <PageShell containerClassName="flex min-h-screen flex-col items-center justify-center text-center">
      <span className="text-5xl" role="img" aria-label="Aviso">⚠️</span>
      <h1 className="mt-6 text-3xl font-extrabold text-yellow-300 sm:text-4xl">
        Algo deu errado
      </h1>
      <p className="mt-4 max-w-md text-sm text-white/70 sm:text-base">
        Tivemos um problema inesperado ao carregar esta página.
        Você pode tentar novamente ou voltar mais tarde.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-yellow-400/30 transition hover:bg-yellow-300"
        >
          Tentar novamente
        </button>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
        >
          Ir para a página inicial
        </a>
      </div>
    </PageShell>
  )
}
