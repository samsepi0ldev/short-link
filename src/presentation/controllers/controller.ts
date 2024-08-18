import type { HttpResponse } from '@/presentation/protocols/http'
import { requestHandle } from '@/utils/request-handle'
import { serverError } from '@/presentation/http/http-helper'
import type { Validator } from '@/presentation/protocols/validator'
import { ValidationComposite } from '@/presentation/validations/composite'

type Request = unknown

export abstract class Controller {
  abstract perform (request: Request): Promise<HttpResponse>

  buildValidator (request: Request): Validator[] {
    return []
  }

  async handle (request: Request): Promise<HttpResponse> {
    const [error, result] = await requestHandle(this.perform(request))

    if (result !== null) {
      return result
    }

    return serverError(error)
  }

  private validations (request: Request): Error | undefined {
    const validations = this.buildValidator(request)
    return new ValidationComposite(validations).validate()
  }
}
