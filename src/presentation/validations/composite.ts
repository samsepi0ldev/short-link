import type { Validator } from '@/presentation/protocols/validator'

export class ValidationComposite implements Validator {
  constructor (private readonly validations: Validator[]) {}

  validate (): Error | undefined {
    for (const validation of this.validations) {
      const error = validation.validate()
      if (error !== undefined) {
        return error
      }
    }
  }
}
