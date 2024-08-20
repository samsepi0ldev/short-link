import { CreateShortLinkController } from '@/presentation/controllers/create-short-link-controller'
import { makeCreateShortLink } from '@/main/factories/usecases/create-short-link-factory'

export const makeCreateShortLinkController = (): CreateShortLinkController => {
  return new CreateShortLinkController(makeCreateShortLink())
}
