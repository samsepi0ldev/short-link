import { Controller } from '@/presentation/controllers/controller'
import { HttpResponse } from '@/presentation/protocols/http'
import { GetOriginalLink } from '@/domain/usecases/get-original-link'
import { requestHandle } from '@/utils/request-handle'
import { Validator } from '@/presentation/protocols/validator'
import { BuilderValidation as Builder } from '@/presentation/validations/builder'
import { forbidden, redirect, serverError } from '@/presentation/http/http-helper'
import { ForbiddenError } from '../errors/forbidden-error'

type Request = {
  slug: string
}

export class GetOriginalLinkController extends Controller {
  constructor (private readonly getOriginalLink: GetOriginalLink) {
    super()
  }

  async perform({ slug }: Request): Promise<HttpResponse> {
    const [error, result] = await requestHandle(this.getOriginalLink.get({ slug }))

    if (result !== null) {
      return redirect(result?.url)
    }
    if (error instanceof ForbiddenError) {
      return forbidden()
    }
    return serverError(error)
  }
  
  override buildValidator({ slug }: Request): Validator[] {
    return [
      ...Builder.of({ value: slug, field: 'slug' }).required().build()
    ]
  }
}
