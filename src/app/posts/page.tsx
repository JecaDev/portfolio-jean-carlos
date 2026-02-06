interface PostProps{
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

export default async function PostsPage () {

    const response = await fetch('https://dummyjson.com/posts', { cache: 'no-store' })
    const data: ResponseProps = await response.json()

    return (
        <PageShell>
            <PageHeader
                eyebrow="Conteúdo"
                title="Todos os posts"
                description="Atualizações rápidas sobre projetos, bastidores e novidades."
            />

            <div className="grid gap-6 md:grid-cols-2">
                {data.posts.map(post => (
                    <article key={post.id} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80 shadow-lg shadow-black/30">
                        <h2 className="text-lg font-semibold text-white">{post.title}</h2>
                        <p className="mt-3 text-sm text-white/70">{post.body}</p>
                    </article>
                ))}
            </div>
        </PageShell>
    )
}
