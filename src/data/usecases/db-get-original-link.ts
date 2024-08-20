import { GetOriginalLink } from '@/domain/usecases/get-original-link'
import { GetOriginalLinkRepository } from '@/data/protocols/get-original-link-repository'
import { ForbiddenError } from '@/presentation/errors/forbidden-error'

export class DbGetOriginalLink implements GetOriginalLink {
  constructor (private readonly getOriginalLinkRepository: GetOriginalLinkRepository) {}
  
  async get ({ slug }: GetOriginalLink.Input): Promise<GetOriginalLink.Output> {
    const data = await this.getOriginalLinkRepository.findBySlug({ slug })
    if (data === null)  {
      throw new ForbiddenError()
    }
    return { url: data.url }
  }
}
