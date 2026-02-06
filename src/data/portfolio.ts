export type ProjetoImagem = {
  title: string
  folder: string
  images: { filename: string; title?: string }[]
}

export type ProjetoVideo = {
  title: string
  youtubeId: string
}

type SequenceConfig = {
  start: number
  end: number
  prefix?: string
}

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, index) => start + index)

const buildSequence = ({ start, end, prefix = '' }: SequenceConfig) =>
  range(start, end).map((value) => `${prefix}${value}.jpg`)

const buildImageList = ({
  coverFile,
  coverTitle,
  sequences = [],
  extraFiles = [],
}: {
  coverFile: string
  coverTitle?: string
  sequences?: SequenceConfig[]
  extraFiles?: string[]
}) => [
  { filename: coverFile, title: coverTitle },
  ...sequences.flatMap(buildSequence).map((filename) => ({ filename })),
  ...extraFiles.map((filename) => ({ filename })),
]

const createImageProject = ({
  title,
  folder,
  coverTitle,
  coverFile = 'foto1.jpg',
  sequences = [],
  extraFiles = [],
}: {
  title: string
  folder: string
  coverTitle?: string
  coverFile?: string
  sequences?: SequenceConfig[]
  extraFiles?: string[]
}): ProjetoImagem => ({
  title,
  folder,
  images: buildImageList({ coverFile, coverTitle, sequences, extraFiles }),
})

export const projetosComImagens: ProjetoImagem[] = [
  createImageProject({
    title: 'Cobertura Fotográfica de Evento - Design & Dendê 2025',
    folder: '/projetos/design&dende/',
    coverTitle: 'Design & Dendê 2025',
    sequences: [{ start: 2, end: 32 }],
  }),
  createImageProject({
    title: 'Aniversário de 15 Anos - Núbia',
    folder: '/projetos/15anosNubia/',
    coverTitle: 'Aniversário de 15 Anos - Núbia',
    sequences: [{ start: 2, end: 27 }],
  }),
  createImageProject({
    title: 'Fotografia de Casamento Civil',
    folder: '/projetos/casamento-adailma/',
    coverTitle: 'Casamento Adailma',
    sequences: [{ start: 2, end: 18 }],
  }),
  createImageProject({
    title: 'Fotografia de Produto - Acessórios Ninfa',
    folder: '/projetos/acessoriosninfa/',
    coverTitle: 'Fotografia de Produto - Acessórios Ninfa',
    sequences: [{ start: 2, end: 30 }],
  }),
  createImageProject({
    title: 'Ensaio Fotográfico - Perfil Profissional',
    folder: '/projetos/retrato/',
    coverTitle: 'Retrato em Estúdio',
    sequences: [{ start: 3, end: 18, prefix: 'foto' }],
  }),
  createImageProject({
    title: 'RedBull Paranauê 2025',
    folder: '/projetos/redbullparanaue/',
    coverTitle: 'Redbull Paranaue 2025',
    sequences: [{ start: 3, end: 12, prefix: 'foto' }],
  }),
  createImageProject({
    title: 'Aniversário de 15 Anos - Letícia',
    folder: '/projetos/15anosLet/',
    coverTitle: 'Aniversário de 15 Anos Let',
    sequences: [{ start: 3, end: 12 }],
  }),
  createImageProject({
    title: 'Registro Fotográfico - Pelourinho',
    folder: '/projetos/pelourinho/',
    coverTitle: 'Registro Fotográfico - Pelourinho',
    sequences: [{ start: 2, end: 12 }],
  }),
  createImageProject({
    title: 'Registro Fotográfico - Itacaré',
    folder: '/projetos/itacare/',
    coverTitle: 'Registro Fotográfico - Itacaré',
    extraFiles: ['foto2.jpg', 'foto3.jpg', 'foto4.jpg'],
  }),
  createImageProject({
    title: 'Ensaio Fotográfico - Album de Trap',
    folder: '/projetos/estudioSky/',
    coverTitle: 'Ensaio Artístico',
    coverFile: 'foto2.jpg',
    sequences: [{ start: 3, end: 5, prefix: 'foto' }],
  }),
]

export const projetosComVideos: ProjetoVideo[] = [
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

export const videosVerticais: ProjetoVideo[] = [
  {
    title: 'Vídeo Depoimento Sobre Emagrecimento',
    youtubeId: 'g_lILSizZrc',
  },
  {
    title: 'Campanha \"O Peso da Virilidade Vídeo 1\"',
    youtubeId: 'M2kMF6042tk',
  },
  {
    title: 'VSL \"Caixinhas de Pergunta\"',
    youtubeId: 'ocAllZBHHa8',
  },
  {
    title: 'VSL \"Marcos no desenvolvimento do bebê\"',
    youtubeId: 'YP91a-KDHAk',
  },
  {
    title: 'Campanha \"O Peso da Virilidade\" Vídeo 2',
    youtubeId: 'A8jYlMXG1AE',
  },
  {
    title: 'VSL \"Plano de tratamento sob medida\"',
    youtubeId: 'Yjlxw44mKbs',
  },
  {
    title: 'Prévia Pivete do Trap',
    youtubeId: 'Iij7XFpMTPY',
  },
]
