'use client'

import Image from 'next/image'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import PageHeader from '../../components/ui/PageHeader'
import PageShell from '../../components/ui/PageShell'
import {
  projetosComImagens,
  projetosComVideos,
  videosVerticais,
} from '../../data/portfolio'

function VideoCarousel({ videos, itemsPerPage }: {
  videos: { title: string; youtubeId: string }[]
  itemsPerPage: number
}) {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(videos.length / itemsPerPage)
  const hasPrev = page > 0
  const hasNext = page < totalPages - 1

  const goPrev = () => setPage((p) => Math.max(0, p - 1))
  const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1))

  const aspectClass = itemsPerPage === 1 ? 'aspect-video' : 'aspect-[9/16]'

  // Cada “página” ocupa 80% da viewport para deixar 10% de cada lado com os itens adjacentes visíveis
  const pageWidthPercent = 80
  const slidingWidth = totalPages * pageWidthPercent

  return (
    <div className="relative flex items-center gap-3 md:gap-4">
      {/* Botão anterior */}
      <div className="flex shrink-0 items-center">
        {hasPrev && (
          <button
            onClick={goPrev}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90 transition hover:bg-white/20 hover:text-white md:h-12 md:w-12"
            aria-label="Vídeo anterior"
          >
            <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* Área do carrossel: mostra ~80% da página atual e um pouco das adjacentes */}
      <div className="min-w-0 flex-1 overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            width: `${slidingWidth}%`,
            transform: `translateX(-${(page * 100) / totalPages}%)`,
          }}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => {
            const start = pageIndex * itemsPerPage
            const pageVideos = videos.slice(start, start + itemsPerPage)
            const isCurrent = pageIndex === page

            return (
              <div
                key={pageIndex}
                className={`flex shrink-0 gap-6 pr-6 md:pr-8 ${
                  itemsPerPage === 3
                    ? pageVideos.length >= 3
                      ? 'justify-center'
                      : 'justify-start'
                    : ''
                }`}
                style={{
                  width: `${100 / totalPages}%`,
                  opacity: isCurrent ? 1 : 0.35,
                  transition: 'opacity 0.25s ease-out',
                }}
              >
                {pageVideos.map((video) => (
                  <div
                    key={video.youtubeId}
                    className={`flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/30 ${
                      itemsPerPage === 3 ? 'min-w-0 max-w-[260px] flex-1 basis-0' : 'min-w-0 flex-1'
                    }`}
                  >
                    <div className={`w-full shrink-0 ${aspectClass}`}>
                      <iframe
                        className="h-full w-full"
                        src={`https://www.youtube.com/embed/${video.youtubeId}`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                    <div
                      className={`flex shrink-0 items-center justify-start px-4 ${
                        itemsPerPage === 1 ? 'min-h-[4.5rem] py-4' : 'h-14 py-3'
                      }`}
                    >
                      <h3 className="line-clamp-2 w-full text-left text-base font-semibold leading-snug text-white">
                        {video.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      {/* Botão próximo */}
      <div className="flex shrink-0 items-center">
        {hasNext && (
          <button
            onClick={goNext}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90 transition hover:bg-white/20 hover:text-white md:h-12 md:w-12"
            aria-label="Próximo vídeo"
          >
            <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <PageShell>
      <PageHeader
        eyebrow="Trabalhos em destaque"
        title="Portfólio Fotográfico & Audiovisual"
        description="Uma seleção de coberturas fotográficas, projetos editoriais e produções em vídeo que mostram minha visão criativa."
      />

      <section className="space-y-8">
        <div className="flex flex-col items-center gap-1 text-center sm:flex-row sm:justify-between sm:text-left">
          <h2 className="text-xl font-semibold text-yellow-200 sm:text-2xl">Portfólio Fotográfico</h2>
          <span className="text-xs text-white/60 sm:text-sm">
            {projetosComImagens.length} projetos disponíveis
          </span>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projetosComImagens.map((project, index) => {
            const coverImage = project.images[0]?.filename ?? 'foto1.jpg'
            const capa = `${project.folder}${coverImage}`
            const lightboxSlides = project.images.map((img) => ({
              src: `${project.folder}${img.filename}`,
              title: img.title,
            }))

            return (
              <div
                key={index}
                className="group cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/30 transition hover:-translate-y-1 hover:border-white/20"
                onClick={() => setOpenIndex(index)}
              >
                <div className="relative mb-5 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src={capa}
                    alt={`Capa do projeto ${project.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={80}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWUyOTNiIi8+PC9zdmc+"
                    className="object-cover object-[center_40%] transition duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <p className="mt-2 text-sm text-white/60">{project.images.length} fotos neste projeto</p>

                {openIndex === index && (
                  <Lightbox
                    open={true}
                    close={() => setOpenIndex(null)}
                    slides={lightboxSlides}
                  />
                )}
              </div>
            )
          })}
        </div>
      </section>

      <section className="mt-16 space-y-6">
        <h2 className="text-xl font-semibold text-yellow-200 sm:text-2xl">Portfólio em Vídeo</h2>
        <VideoCarousel videos={projetosComVideos} itemsPerPage={1} />
      </section>

      <section className="mt-16 space-y-6">
        <h2 className="text-xl font-semibold text-yellow-200 sm:text-2xl">Vídeos Verticais</h2>
        <VideoCarousel videos={videosVerticais} itemsPerPage={3} />
      </section>
    </PageShell>
  )
}
