interface PostProps {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface ResponseProps {
  posts: PostProps[]
}

import PageHeader from '../../components/ui/PageHeader'
import PageShell from '../../components/ui/PageShell'

async function fetchPosts(): Promise<PostProps[] | null> {
    try {
        const response = await fetch('https://dummyjson.com/posts', { cache: 'no-store' })

        if (!response.ok) return null

        const data: ResponseProps = await response.json()
        return data.posts
    } catch {
        return null
    }
}

export default async function PostsPage() {
    const posts = await fetchPosts()

    return (
        <PageShell>
            <PageHeader
                eyebrow="Conteúdo"
                title="Todos os posts"
                description="Atualizações rápidas sobre projetos, bastidores e novidades."
            />

            {posts === null ? (
                <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-16 text-center shadow-lg shadow-black/30">
                    <span className="text-4xl" role="img" aria-label="Sem conexão">📡</span>
                    <h2 className="text-lg font-semibold text-white">
                        Não foi possível carregar os posts
                    </h2>
                    <p className="max-w-md text-sm text-white/70">
                        Parece que houve um problema de conexão. Verifique sua internet e
                        tente recarregar a página.
                    </p>
                </div>
            ) : posts.length === 0 ? (
                <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-16 text-center shadow-lg shadow-black/30">
                    <span className="text-4xl" role="img" aria-label="Vazio">📝</span>
                    <h2 className="text-lg font-semibold text-white">
                        Nenhum post disponível no momento
                    </h2>
                    <p className="max-w-md text-sm text-white/70">
                        Novos conteúdos serão publicados em breve. Volte depois!
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {posts.map(post => (
                        <article key={post.id} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80 shadow-lg shadow-black/30">
                            <h2 className="text-lg font-semibold text-white">{post.title}</h2>
                            <p className="mt-3 text-sm text-white/70">{post.body}</p>
                        </article>
                    ))}
                </div>
            )}
        </PageShell>
    )
}
