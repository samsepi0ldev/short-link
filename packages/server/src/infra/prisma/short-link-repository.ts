import type { CreateShortLinkRepository } from '@/data/protocols/create-short-link-repository'
import type { GetOriginalLinkRepository } from '@/data/protocols/get-original-link-repository'
import { Link } from '@/domain/entities/link'
import { db } from '@/infra/prisma'

export class ShortLinkPrismaRepository implements CreateShortLinkRepository, GetOriginalLinkRepository {
  async findBySlug ({ slug }: GetOriginalLinkRepository.Input): Promise<GetOriginalLinkRepository.Output> {
    const shortLink = await db.shortLink.findUnique({ where: { slug } })
   
    if (shortLink !== null) {
      return {
        url: shortLink.url
      }
    }
    return null
  }
  async create ({ slug, url }: CreateShortLinkRepository.Input): Promise<CreateShortLinkRepository.Output> {
    const shortLink = await db.shortLink.create({
      data: {
        slug,
        url,
        shortUrl: `http://localhost:3000/${slug}`
      }
    })
    return new Link({
      id: shortLink.id,
      slug: shortLink.slug,
      url: shortLink.url,
      short_url: shortLink.shortUrl,
      created_at: shortLink.createdAt
    })
  }

}