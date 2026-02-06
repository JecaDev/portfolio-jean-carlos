import { readdir } from 'fs/promises'
import path from 'path'

type ProjetoImagem = {
  title: string
  folder: string
  images: { filename: string; title?: string }[]
}

const PROJECT_TITLE_OVERRIDES: Record<string, string> = {
  'design&dende': 'Cobertura Fotográfica de Evento - Design & Dendê 2025',
  '15anosNubia': 'Aniversário de 15 Anos - Núbia',
  'casamento-adailma': 'Fotografia de Casamento Civil',
  acessoriosninfa: 'Fotografia de Produto - Acessórios Ninfa',
  retrato: 'Ensaio Fotográfico - Perfil Profissional',
  redbullparanaue: 'RedBull Paranauê 2025',
  '15anosLet': 'Aniversário de 15 Anos - Letícia',
  pelourinho: 'Registro Fotográfico - Pelourinho',
  itacare: 'Registro Fotográfico - Itacaré',
  estudioSky: 'Ensaio Fotográfico - Album de Trap',
}

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

const formatProjectTitle = (folderName: string) => {
  const withSpacing = folderName
    .replace(/&/g, ' & ')
    .replace(/[-_]/g, ' ')
    .replace(/(\d+)([a-zA-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()

  return withSpacing.replace(/\b\w/g, (char) => char.toUpperCase())
}

export const getPhotoProjects = async (): Promise<ProjetoImagem[]> => {
  const projetosPath = path.join(process.cwd(), 'public', 'projetos')
  const entries = await readdir(projetosPath, { withFileTypes: true })
  const folders = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name)

  const projects = await Promise.all(
    folders.map(async (folderName) => {
      const folderPath = path.join(projetosPath, folderName)
      const files = await readdir(folderPath)
      const images = files
        .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
        .map((filename, index) => ({
          filename,
          title: index === 0 ? PROJECT_TITLE_OVERRIDES[folderName] : undefined,
        }))

      return {
        title: PROJECT_TITLE_OVERRIDES[folderName] ?? formatProjectTitle(folderName),
        folder: `/projetos/${folderName}/`,
        images,
      }
    })
  )

  return projects.sort((a, b) => a.title.localeCompare(b.title))
}
