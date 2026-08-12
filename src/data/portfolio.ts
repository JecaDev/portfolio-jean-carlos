export type ProjetoImagem = {
  title: string;
  folder: string;
  images: { filename: string; title?: string }[];
};

export type ProjetoVideo = {
  title: string;
  youtubeId: string;
};

type SequenceConfig = {
  start: number;
  end: number;
  prefix?: string;
};

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, index) => start + index);

const buildSequence = ({ start, end, prefix = "" }: SequenceConfig) =>
  range(start, end).map((value) => `${prefix}${value}.jpg`);

const buildImageList = ({
  coverFile,
  coverTitle,
  sequences = [],
  extraFiles = [],
}: {
  coverFile: string;
  coverTitle?: string;
  sequences?: SequenceConfig[];
  extraFiles?: string[];
}) => [
  { filename: coverFile, title: coverTitle },
  ...sequences.flatMap(buildSequence).map((filename) => ({ filename })),
  ...extraFiles.map((filename) => ({ filename })),
];

const createImageProject = ({
  title,
  folder,
  coverTitle,
  coverFile = "foto1.jpg",
  sequences = [],
  extraFiles = [],
}: {
  title: string;
  folder: string;
  coverTitle?: string;
  coverFile?: string;
  sequences?: SequenceConfig[];
  extraFiles?: string[];
}): ProjetoImagem => ({
  title,
  folder,
  images: buildImageList({ coverFile, coverTitle, sequences, extraFiles }),
});

export const projetosComImagens: ProjetoImagem[] = [
  createImageProject({
    title: "Aniversário de 15 Anos - Alice",
    folder: "/projetos/15anosAlice/",
    coverTitle: "Aniversário de 15 Anos - Alice",
    coverFile: "Capa.jpg",
    sequences: [{ start: 2, end: 13 }],
  }),
  createImageProject({
    title: "Ensaio de Perfil - Yuri Rafael",
    folder: "/projetos/Ensaio-Yuri/",
    coverFile: "Capa.jpg",
    coverTitle: "Ensaio de Perfil - Yuri Rafael",
    sequences: [{ start: 2, end: 20 }],
  }),
  createImageProject({
    title: 'Ensaio de Moda "Icons" - Acessórios Ninfa',
    folder: "/projetos/Icons-Ninfa/",
    coverFile: "Capa.jpg",
    coverTitle: "Fotografia de Produto - Icons",
    sequences: [{ start: 1, end: 19 }],
  }),
  createImageProject({
    title: "Barber Branding - Mr. Barber",
    folder: "/projetos/MrBarber/",
    coverFile: "Capa.jpg",
    coverTitle: "Barber Branding - Mr. Barber Cabula",
    sequences: [{ start: 2, end: 12 }],
  }),
  createImageProject({
    title: "Pré Wedding - Ítalo e Lícia",
    folder: "/projetos/pre-wedding-Italo/",
    coverTitle: "Pré-Wedding - Ítalo e Lícia",
    coverFile: "Capa.jpg",
    sequences: [{ start: 2, end: 17, prefix: "foto" }],
  }),
  createImageProject({
    title: "MuzenBela 2026",
    folder: "/projetos/muzenbela2026/",
    coverTitle: "Muzenza - Concurso MuzenBela 2026",
    sequences: [{ start: 2, end: 30, prefix: "foto" }],
  }),
  createImageProject({
    title: "Afrofuturismo 2025",
    folder: "/projetos/afrofuturismo2025/",
    coverTitle: "Afrofuturismo 2025",
    coverFile: "foto3.jpg",
    sequences: [{ start: 2, end: 30, prefix: "foto" }],
  }),
  createImageProject({
    title: "Cobertura de Evento - Design & Dendê 2025",
    folder: "/projetos/design&dende/",
    coverTitle: "Design & Dendê 2025",
    sequences: [{ start: 2, end: 32, prefix: "foto" }],
  }),
  createImageProject({
    title: "Aniversário de 15 Anos - Núbia",
    folder: "/projetos/15anosNubia/",
    coverTitle: "Aniversário de 15 Anos - Núbia",
    sequences: [{ start: 2, end: 23, prefix: "foto" }],
  }),
  createImageProject({
    title: "Fotografia de Produto - Acessórios Ninfa",
    folder: "/projetos/acessoriosninfa/",
    coverTitle: "Fotografia de Produto - Acessórios Ninfa",
    sequences: [{ start: 2, end: 30, prefix: "foto" }],
  }),
  createImageProject({
    title: "RedBull Paranauê 2025",
    folder: "/projetos/redbullparanaue/",
    coverTitle: "RedBull Paranauê 2025",
    sequences: [{ start: 2, end: 12, prefix: "foto" }],
  }),
  createImageProject({
    title: "Ensaio Fotográfico - Álbum de Trap",
    folder: "/projetos/estudioSky/",
    coverTitle: "Ensaio Artístico",
    sequences: [{ start: 2, end: 5, prefix: "foto" }],
  }),
];

export const projetosComVideos: ProjetoVideo[] = [
  {
    title: "Pivete do Trap (Clipe Oficial)",
    youtubeId: "G4NT8T_BJbs",
  },
  {
    title: "Making Of - Flashback (Clipe Oficial)",
    youtubeId: "d1MHpjXBafc",
  },
  {
    title: "Color Grading Profissional (Antes/Depois)",
    youtubeId: "mgYjOblMF6I",
  },
];

export const videosVerticais: ProjetoVideo[] = [
  {
    title: "Vídeo Depoimento Sobre Emagrecimento",
    youtubeId: "g_lILSizZrc",
  },
  {
    title: 'Campanha \"O Peso da Virilidade Vídeo 1\"',
    youtubeId: "M2kMF6042tk",
  },
  {
    title: 'VSL \"Caixinhas de Pergunta\"',
    youtubeId: "ocAllZBHHa8",
  },
  {
    title: 'VSL \"Marcos no desenvolvimento do bebê\"',
    youtubeId: "YP91a-KDHAk",
  },
  {
    title: 'Campanha \"O Peso da Virilidade\" Vídeo 2',
    youtubeId: "A8jYlMXG1AE",
  },
  {
    title: 'VSL \"Plano de tratamento sob medida\"',
    youtubeId: "Yjlxw44mKbs",
  },
  {
    title: "Prévia Pivete do Trap",
    youtubeId: "Iij7XFpMTPY",
  },
];
