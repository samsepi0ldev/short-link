import { GetOriginalLinkController } from '@/presentation/controllers/get-original-link-controller'
import { makeGetOriginalLink } from '@/main/factories/usecases/get-original-url-factory'

export const makeGetOriginalLinkController = (): GetOriginalLinkController => {
  return new GetOriginalLinkController(makeGetOriginalLink())
}
