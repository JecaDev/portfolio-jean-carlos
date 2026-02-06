interface PostProps {
  id: number
  title: string
  body: string
  userId: number
}

interface ResponseProps {
  posts: PostProps[]
}

export default async function PostsPage() {
  const response = await fetch('https://dummyjson.com/posts', { cache: 'no-store' })
  const data: ResponseProps = await response.json()

  return (
    <main className="relative min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-yellow-400/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[160px]" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col gap-10">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Conteúdo</p>
          <h1 className="text-4xl font-bold text-yellow-300 sm:text-5xl">Todos os posts</h1>
          <p className="max-w-2xl text-sm text-white/70 sm:text-base">
            Lista atualizada com insights e novidades do universo criativo.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {data.posts.map((post) => (
            <article
              key={post.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/40 transition hover:-translate-y-1 hover:border-yellow-400/40"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-white/50">
                Post #{post.id}
              </span>
              <h2 className="mt-3 text-xl font-semibold text-white">{post.title}</h2>
              <p className="mt-3 text-sm text-white/70">{post.body}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
