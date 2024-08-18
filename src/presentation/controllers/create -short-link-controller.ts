import { HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/controllers/controller'
import { CreateShortLink } from '@/domain/usecases/create-short-link'
import { requestHandle } from '@/utils/request-handle'
import { badRequest, ok } from '@/presentation/http/http-helper'
import { Validator } from '@/presentation/protocols/validator'
import { BuilderValidation as Builder } from '@/presentation/validations/builder'

type Request = {
  url: string
  slug: string
}

export class CreateShortLinkController extends Controller {
  constructor (private readonly createShortLink: CreateShortLink) {
    super()
  }

  async perform({ url, slug }: Request): Promise<HttpResponse> {
    const [error, result] = await requestHandle(this.createShortLink.create({ url, slug }))

    if (error !== null) {
      return badRequest(error)
    }

    return ok(result)
  }

  override buildValidator({ url, slug }: Request): Validator[] {
    return [
      ...Builder.of({ value: url, field: 'url' }).required().build(),
      ...Builder.of({ value: slug, field: 'slug' }).required().build()
    ]
  }
}
