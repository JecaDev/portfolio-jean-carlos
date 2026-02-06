export type ProjetoImagem = {
  title: string
  folder: string
  cover: string
  images: string[]
}

export type ProjetoVideo = {
  title: string
  youtubeId: string
}

export type PortfolioPayload = {
  images: ProjetoImagem[]
  videos: ProjetoVideo[]
  shorts: ProjetoVideo[]
}
