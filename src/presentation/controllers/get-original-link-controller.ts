import { Controller } from '@/presentation/controllers/controller'
import { HttpResponse } from '@/presentation/protocols/http'
import { GetOriginalLink } from '@/domain/usecases/get-original-link'
import { requestHandle } from '@/utils/request-handle'
import { Validator } from '@/presentation/protocols/validator'
import { BuilderValidation as Builder } from '@/presentation/validations/builder'
import { ok, serverError } from '@/presentation/http/http-helper'

type Request = {
  slug: string
}

export class GetOriginalLinkController extends Controller {
  constructor (private readonly getOriginalLink: GetOriginalLink) {
    super()
  }

  async perform({ slug }: Request): Promise<HttpResponse> {
    const [error, result] = await requestHandle(this.getOriginalLink.get({ slug }))

    if (error !== null) {
      return serverError(error)
    }

    return ok(result)
  }

  override buildValidator({ slug }: Request): Validator[] {
    return [
      ...Builder.of({ value: slug, field: 'slug' }).required().build()
    ]
  }
}
