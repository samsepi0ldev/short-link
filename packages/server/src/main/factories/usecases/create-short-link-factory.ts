import { DbCreateShortLink } from '@/data/usecases/db-create-short-link'
import { ShortLinkPrismaRepository } from '@/infra/prisma/short-link-repository'

export const makeCreateShortLink = (): DbCreateShortLink => {
  const shortLinkRepository = new ShortLinkPrismaRepository()
  return new DbCreateShortLink(shortLinkRepository)
}
