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
    title: 'Ensaio Fotográfico - Perfil Profissional',
    folder: '/projetos/retrato/',
    images: [
      { filename: 'foto1.jpg', title: 'Retrato em Estúdio' },
      { filename: 'foto3.jpg' },
      { filename: 'foto4.jpg' },
      { filename: 'foto5.jpg' },
      { filename: 'foto6.jpg' },
      { filename: 'foto7.jpg' },
      { filename: 'foto8.jpg' },
      { filename: 'foto9.jpg' },
      { filename: 'foto10.jpg' },
      { filename: 'foto11.jpg' },
      { filename: 'foto12.jpg' },
      { filename: 'foto13.jpg' },
      { filename: 'foto14.jpg' },
      { filename: 'foto15.jpg' },
      { filename: 'foto16.jpg' },
      { filename: 'foto17.jpg' },
      { filename: 'foto18.jpg' },
    ],
  },
  {
    title: 'Aniversário de 15 Anos',
    folder: '/projetos/15anosLet/',
    images: [
      { filename: 'foto1.jpg', title: 'Aniversário de 15 Anos' },
      { filename: '3.jpg' },
      { filename: '4.jpg' },
      { filename: '5.jpg' },
      { filename: '6.jpg' },
      { filename: '7.jpg' },
      { filename: '8.jpg' },
      { filename: '9.jpg' },
      { filename: '10.jpg' },
      { filename: '11.jpg' },
      { filename: '12.jpg' },
    ],
  },
  {
    title: 'Registro Fotográfico - Pelourinho',
    folder: '/projetos/pelourinho/',
    images: [
      { filename: 'foto1.jpg', title: 'Registro Fotográfico - Pelourinho' },
      { filename: '2.jpg' },
      { filename: '3.jpg' },
      { filename: '4.jpg' },
      { filename: '5.jpg' },
      { filename: '6.jpg' },
      { filename: '7.jpg' },
      { filename: '8.jpg' },
      { filename: '9.jpg' },
      { filename: '10.jpg' },
      { filename: '11.jpg' },
      { filename: '12.jpg' },
    ],
  },
  {
    title: 'Registro Fotográfico - Itacaré',
    folder: '/projetos/itacare/',
    images: [
      { filename: 'foto1.jpg', title: 'Registro Fotográfico - Itacaré' },
      { filename: 'foto2.jpg' },
      { filename: 'foto3.jpg' },
      { filename: 'foto4.jpg' },
      
    ],
  },
  {
    title: 'Ensaio Fotográfico - Album de Trap',
    folder: '/projetos/estudioSk"y/',
    images: [
      { filename: 'foto2.jpg', title: 'Ensaio Artístico' },
      { filename: 'foto3.jpg' },
      { filename: 'foto4.jpg' },
      { filename: 'foto5.jpg' },
      
    ],
  },
  
]

const projetosComVideos: ProjetoVideo[] = [
  {
    title: 'Pivete do Trap (Clipe Oficial)',
    youtubeId: 'G4NT8T_BJbs',
  },
  {
    title: 'Making Of - Flashback (Clipe Oficial)',
    youtubeId: 'd1MHpjXBafc',
  },
  {
    title: 'Color Grading Profissional (Antes/Depois)',
    youtubeId: 'mgYjOblMF6I',
  },
]

const videosVerticais: ProjetoVideo[] = [
  {
    title: 'VSL "Caixinhas de Pergunta"',
    youtubeId: 'ocAllZBHHa8',
  },
  {
    title: 'Prévia Pivete do Trap',
    youtubeId: 'Iij7XFpMTPY',
  },
  {
    title: 'VSL "Marcos no desenvolvimento do bebê"',
    youtubeId: 'YP91a-KDHAk',
  },
  {
    title: 'VSL "Plano de tratamento sob medida"',
    youtubeId: 'Yjlxw44mKbs',
  },
]

export default function Portfolio() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <main className="bg-black min-h-screen text-white px-6 py-12 space-y-16">
      {/* Projetos com fotos */}
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
                <div className="relative w-full aspect-[4/3] mb-4 rounded overflow-hidden border border-yellow-400">

                  <Image
                    src={capa}
                    alt={`Capa do projeto ${project.title}`}
                    fill
                    className="object-cover object-[center_40%]"
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

      {/* Vídeos horizontais */}
      <section>
  <h2 className="text-4xl font-bold text-yellow-400 mb-8">Portfólio em Vídeo</h2>
  <div className="flex space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-yellow-400 pb-4">
    {projetosComVideos.map((video, index) => (
      <div
        key={index}
        className="min-w-[380px] max-w-[420px] bg-neutral-900 rounded-lg shadow-lg border border-yellow-400 overflow-hidden"
      >
        <div className="w-full aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className="p-3">
          <h3 className="text-lg font-semibold">{video.title}</h3>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Vídeos verticais (YouTube Shorts) */}
      <section>
        <h2 className="text-4xl font-bold text-yellow-400 mb-8">Vídeos Verticais</h2>
        <div className="flex space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-neutral-800 scrollbar-thumb-rounded-full pb-4">

          {videosVerticais.map((video, index) => (
            <div
              key={index}
              className="min-w-[300px] max-w-[320px] bg-neutral-900 rounded-lg shadow-lg border border-yellow-400 overflow-hidden"
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
              <div className="p-3">
                <h3 className="text-lg font-semibold">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
