import PortfolioClient from '@/components/portfolio/PortfolioClient'
import { getPhotoProjects } from '@/lib/projects'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import PageHeader from '../../components/ui/PageHeader'
import PageShell from '../../components/ui/PageShell'
import {
  projetosComImagens,
  projetosComVideos,
  videosVerticais,
} from '../../data/portfolio'

export default function Portfolio() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [portfolio, setPortfolio] = useState<PortfolioPayload | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const response = await fetch('/data/portfolio.json', { cache: 'no-store' })
        const payload: PortfolioPayload = await response.json()
        setPortfolio(payload)
      } finally {
        setIsLoading(false)
      }
    }

    loadPortfolio()
  }, [])

  const imagesProjects = useMemo(() => portfolio?.images ?? [], [portfolio])
  const videos = useMemo(() => portfolio?.videos ?? [], [portfolio])
  const shorts = useMemo(() => portfolio?.shorts ?? [], [portfolio])

  return (
    <PageShell>
      <PageHeader
        eyebrow="Trabalhos em destaque"
        title="Portfólio Fotográfico & Audiovisual"
        description="Uma seleção de coberturas fotográficas, projetos editoriais e produções em vídeo que mostram minha visão criativa."
      />

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-yellow-200">Portfólio Fotográfico</h2>
          <span className="text-sm text-white/60">
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

      <section className="mt-16 space-y-8">
        <h2 className="text-2xl font-semibold text-yellow-200">Portfólio em Vídeo</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {projetosComVideos.map((video, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/30"
            >
              <div className="w-full aspect-video">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-white">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 space-y-8">
        <h2 className="text-2xl font-semibold text-yellow-200">Vídeos Verticais</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videosVerticais.map((video, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/30"
            >
              <div className="w-full aspect-[9/16]">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-white">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
