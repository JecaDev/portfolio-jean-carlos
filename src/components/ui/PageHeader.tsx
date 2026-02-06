type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
}

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="mb-12 space-y-4 text-center">
      {eyebrow ? (
        <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70">
          {eyebrow}
        </span>
      ) : null}
      <h1 className="text-4xl font-extrabold text-yellow-300 sm:text-5xl">{title}</h1>
      {description ? (
        <p className="mx-auto max-w-3xl text-base text-white/75 sm:text-lg">{description}</p>
      ) : null}
    </div>
  )
}
