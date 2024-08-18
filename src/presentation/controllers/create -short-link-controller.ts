import { HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/controllers/controller'
import { CreateShortLink } from '@/domain/usecases/create-short-link'
import { requestHandle } from '@/utils/request-handle'
import { badRequest, ok } from '@/presentation/http/http-helper'

type Request = {
  url: string
  slug: string
}

export class CreateShortLinkController extends Controller {
  constructor (private readonly createShortLink: CreateShortLink) {
    super()
  }

  async perform(request: Request): Promise<HttpResponse> {
    const [error, result] = await requestHandle(this.createShortLink.create(request))

    if (error !== null) {
      return badRequest(error)
    }

    return ok(result)
  }
}
