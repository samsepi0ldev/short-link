import { CreateShortLink } from '@/domain/usecases/create-short-link'
import { CreateShortLinkRepository } from '@/data/protocols/create-short-link-repository'
import { Link } from '@/domain/entities/link'

export class DbCreateShortLink implements CreateShortLink {
  constructor (private readonly createShortLinkRepository: CreateShortLinkRepository) {}
  
  async create({ slug, url }: CreateShortLink.Input): Promise<CreateShortLink.Output> {
    const shortLink = await this.createShortLinkRepository.create({ slug, url })
    
    return new Link({
      id: shortLink.id,
      url: shortLink.url,
      slug: shortLink.slug,
      short_url: shortLink.short_url,
      created_at: shortLink.created_at
    })
  }
}
