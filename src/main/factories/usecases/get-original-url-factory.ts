import { DbGetOriginalLink } from '@/data/usecases/db-get-original-link'
import { ShortLinkPrismaRepository } from '@/infra/prisma/short-link-repository'

export const makeGetOriginalLink = (): DbGetOriginalLink => {
  const shortLinkRepository = new ShortLinkPrismaRepository()
  return new DbGetOriginalLink(shortLinkRepository)
}
