'use client'

import { Copy, Edit } from 'lucide-react'
import { FormEvent, useState } from 'react'

type ShortLink = {
  slug: string
  url: string
}

export default function Home () {
  const [shortLink, setShortLink] = useState<ShortLink[]>([])
  const [url, setUrl] = useState('')

  function generateRandomSlug(length = 8) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let slug = ''

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      slug += characters[randomIndex]
    }

    return slug.toLowerCase()
  }

  function handleShortLink (event: FormEvent) {
    event.preventDefault()
    
    const slug = generateRandomSlug()
    setShortLink(shortLinks => [...shortLinks, { slug, url }])
  }

  return (
    <div className='w-full h-screen'>
      <header className='w-full max-w-5xl mx-auto h-16 px-5 py-2.5 flex items-center justify-between'>
        <span className='text-xl font-semibold text-zinc-950'>short.<b className='text-blue-600'>ly</b></span>
      </header>

      <main className='w-full max-w-3xl mx-auto h-full flex flex-col items-center'>
        <h1 className='text-6xl font-bold my-11 text-zinc-900'>Crie URLs curtos</h1>
        <p className='text-lg text-center text-zinc-900 leading-snug'>
          Experimente a magia de um encurtador de links que não só simplifica seus URLs, mas também transforma sua maneira de compartilhar conteúdo. Com apenas um clique, nossa ferramenta converte seus longos e complicados links em URLs curtos e fáceis de compartilhar.
        </p>

        <form
          onSubmit={handleShortLink}
          className='w-full h-14 bg-white flex items-center rounded-xl shadow-2xl overflow-hidden focus-within:shadow-xl p-1.5 transition-all mt-10'>
          <input
            type='text'
            className='w-full h-full flex-1 outline-none bg-transparent px-6'
            placeholder='Digite a url aqui!'
            onChange={e => setUrl(e.target.value)}
          />
          <button className='bg-blue-600 h-full px-4 rounded-xl text-blue-50 font-semibold hover:bg-blue-700 transition-colors'>
            Encurtar
          </button>
        </form>
        
        {!!shortLink.length && (
          shortLink.map(link => (
            <div key={link.slug} className='w-full px-5 py-3 rounded-xl bg-blue-100 mt-10 flex items-start justify-between border border-blue-200'>
              <div className='space-y-4'>
                <button className='flex items-center gap-2 hover:underline font-semibold text-blue-950'>
                  lh.io/{link.slug}
                  <Copy className='size-4' />
                </button>
                <span className='text-blue-950 block'>
                  {link.url}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <button className='flex items-center gap-2 bg-rose-400 hover:bg-rose-500 transition-colors rounded-xl text-rose-50 font-semibold px-4 py-2.5'>
                  Editar
                  <Edit className='size-4' />
                </button>
                <button className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-xl text-rose-50 font-semibold px-4 py-2.5'>
                  Copiar
                  <Copy className='size-4' />
                </button>
              </div>
          </div>
          ))
        )}
      </main>
    </div>
  )
}
