import type { ReactNode } from 'react'

type PageShellProps = {
  children: ReactNode
  className?: string
  containerClassName?: string
}

export default function PageShell({
  children,
  className = '',
  containerClassName = '',
}: PageShellProps) {
  return (
    <main className={`relative min-h-screen overflow-hidden bg-slate-950 text-white ${className}`}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-400/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-sky-500/20 blur-[140px]" />
      </div>
      <div className={`relative mx-auto w-full max-w-6xl px-6 py-16 ${containerClassName}`}>
        {children}
      </div>
    </main>
  )
}
