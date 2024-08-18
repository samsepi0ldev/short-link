import { RequiredFieldError } from '@/presentation/errors/validation'
import { Validator } from '@/presentation/protocols/validator'

export class Required implements Validator {
  constructor (
    readonly value: any,
    readonly field?: string,
  ) {}

  validate (): Error | undefined {
    if (this.value === undefined || this.value === null || this.value.trim() === '') {
      return new RequiredFieldError(this.field)
    }
  }
}
