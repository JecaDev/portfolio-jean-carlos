import PortfolioClient from '@/components/portfolio/PortfolioClient'
import { getPhotoProjects } from '@/lib/projects'

export const dynamic = 'force-dynamic'

const videoProjects = [
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

const verticalVideos = [
  {
    title: 'Vídeo Depoimento Sobre Emagrecimento',
    youtubeId: 'g_lILSizZrc',
  },
  {
    title: 'Campanha "O Peso da Virilidade Vídeo 1"',
    youtubeId: 'M2kMF6042tk',
  },
  {
    title: 'VSL "Caixinhas de Pergunta"',
    youtubeId: 'ocAllZBHHa8',
  },
  {
    title: 'VSL "Marcos no desenvolvimento do bebê"',
    youtubeId: 'YP91a-KDHAk',
  },
  {
    title: 'Campanha "O Peso da Virilidade" Vídeo 2',
    youtubeId: 'A8jYlMXG1AE',
  },
  {
    title: 'VSL "Plano de tratamento sob medida"',
    youtubeId: 'Yjlxw44mKbs',
  },
  {
    title: 'Prévia Pivete do Trap',
    youtubeId: 'Iij7XFpMTPY',
  },
]

export default async function PortfolioPage() {
  const photoProjects = await getPhotoProjects()

  return (
    <PortfolioClient
      photoProjects={photoProjects}
      videoProjects={videoProjects}
      verticalVideos={verticalVideos}
    />
  )
}
