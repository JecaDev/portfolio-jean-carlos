'use client'

import Image from 'next/image'
import { useState } from 'react'
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

const projetosComImagens: ProjetoImagem[] = [
  {
    title: 'Retratos',
    folder: '/projetos/retrato/',
    images: [
      { filename: 'foto1.jpg', title: 'Retrato em Estúdio' },
      { filename: 'foto3.jpg', title: 'Retrato em Externo' },
      { filename: 'foto4.jpg', title: 'Retrato em Externo' },
      { filename: 'foto5.jpg', title: 'Retrato em Externo' },
      { filename: 'foto6.jpg', title: 'Retrato em Externo' },
      { filename: 'foto7.jpg', title: 'Retrato em Externo' },
      { filename: 'foto8.jpg', title: 'Retrato em Externo' },
      { filename: 'foto9.jpg', title: 'Retrato em Externo' },
      { filename: 'foto10.jpg', title: 'Retrato em Externo' },
      { filename: 'foto11.jpg', title: 'Retrato em Externo' },
      { filename: 'foto12.jpg', title: 'Retrato em Externo' },
      { filename: 'foto13.jpg', title: 'Retrato em Externo' },
      { filename: 'foto14.jpg', title: 'Retrato em Externo' },
      { filename: 'foto15.jpg', title: 'Retrato em Externo' },
      { filename: 'foto16.jpg', title: 'Retrato em Externo' },
      { filename: 'foto17.jpg', title: 'Retrato em Externo' },
      { filename: 'foto18.jpg', title: 'Retrato em Externo' },
    ],
  },
]

const projetosComVideos: ProjetoVideo[] = [
  {
    title: 'Clipe: Pivete do Trap',
    youtubeId: 'G4NT8T_BJbs',
  },
]

export default function Portfolio() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <main className="bg-black min-h-screen text-white px-6 py-12 space-y-12">
      <section>
        <h1 className="text-4xl font-bold text-yellow-400 mb-8">Portfólio Fotográfico</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projetosComImagens.map((project, index) => {
            const capa = `${project.folder}foto1.jpg`
            const lightboxSlides = project.images.map((img) => ({
              src: `${project.folder}${img.filename}`,
              title: img.title,
            }))

            return (
              <div
                key={index}
                className="bg-neutral-900 p-4 rounded shadow-lg cursor-pointer hover:scale-[1.02] transition"
                onClick={() => setOpenIndex(index)}
              >
                <div className="relative w-full h-64 mb-4 rounded overflow-hidden border border-yellow-400">
                  <Image
                    src={capa}
                    alt={`Capa do projeto ${project.title}`}
                    fill
                    className="object-cover"
                    placeholder="empty"
                    // Se quiser blur placeholder, pode adicionar blurDataURL aqui
                  />
                </div>
                <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                <p className="text-neutral-400">{project.images.length} fotos neste projeto</p>

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

      <section>
        <h2 className="text-4xl font-bold text-yellow-400 mb-8">Portfólio em Vídeo</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projetosComVideos.map((video, index) => (
            <div key={index} className="bg-neutral-900 p-4 rounded shadow-lg">
              <div className="relative w-full aspect-video mb-4 rounded overflow-hidden border border-yellow-400">
                <iframe
                  className="w-full h-full rounded"
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy" // para ajudar no carregamento
                />
              </div>
              <h3 className="text-2xl font-semibold">{video.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
