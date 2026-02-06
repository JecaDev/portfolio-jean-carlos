'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

type ProjetoImagem = {
  title: string
  folder: string
  images: { filename: string; title?: string }[]
}

type ProjetoVideo = {
  title: string
  youtubeId: string
}

type PortfolioClientProps = {
  photoProjects: ProjetoImagem[]
  videoProjects: ProjetoVideo[]
  verticalVideos: ProjetoVideo[]
}

export default function PortfolioClient({
  photoProjects,
  videoProjects,
  verticalVideos,
}: PortfolioClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const lightboxSlides = useMemo(
    () =>
      photoProjects.map((project) =>
        project.images.map((img) => ({
          src: `${project.folder}${img.filename}`,
          title: img.title ?? project.title,
        }))
      ),
    [photoProjects]
  )

  return (
    <main className="relative min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/4 rounded-full bg-cyan-500/20 blur-[160px]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16">
        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                Projetos recentes
              </p>
              <h1 className="text-4xl font-bold text-yellow-300 sm:text-5xl">
                Portfólio Fotográfico
              </h1>
            </div>
            <div className="max-w-md text-sm text-white/70">
              Navegue pelos trabalhos mais recentes e clique em um card para abrir a galeria
              completa.
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {photoProjects.map((project, index) => {
              const cover = project.images[0]
                ? `${project.folder}${project.images[0].filename}`
                : '/logo.png'
              return (
                <button
                  key={project.title}
                  type="button"
                  className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left shadow-lg shadow-black/30 transition hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-white/10"
                  onClick={() => setOpenIndex(index)}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={cover}
                      alt={`Capa do projeto ${project.title}`}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h2 className="text-lg font-semibold text-white">{project.title}</h2>
                    <p className="text-sm text-white/60">
                      {project.images.length} fotos neste projeto
                    </p>
                    <span className="mt-auto text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
                      Ver galeria
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {openIndex !== null && (
            <Lightbox
              open={openIndex !== null}
              close={() => setOpenIndex(null)}
              slides={lightboxSlides[openIndex]}
            />
          )}
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                Conteúdo audiovisual
              </p>
              <h2 className="text-3xl font-bold text-yellow-300 sm:text-4xl">
                Portfólio em Vídeo
              </h2>
            </div>
            <div className="max-w-md text-sm text-white/70">
              Cliques rápidos em vídeos horizontais com storytelling e direção criativa.
            </div>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {videoProjects.map((video) => (
              <div
                key={video.youtubeId}
                className="min-w-[320px] max-w-[360px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/30"
              >
                <div className="aspect-video w-full">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <div className="p-4 text-sm font-semibold text-white">{video.title}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                Shorts e reels
              </p>
              <h2 className="text-3xl font-bold text-yellow-300 sm:text-4xl">
                Vídeos Verticais
              </h2>
            </div>
            <div className="max-w-md text-sm text-white/70">
              Conteúdo mobile-friendly pensado para redes sociais e campanhas rápidas.
            </div>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {verticalVideos.map((video) => (
              <div
                key={video.youtubeId}
                className="min-w-[260px] max-w-[300px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/30"
              >
                <div className="aspect-[9/16] w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
                <div className="p-4 text-sm font-semibold text-white">{video.title}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
