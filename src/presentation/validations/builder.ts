import { Validator } from '@/presentation/protocols/validator'
import { Required } from '@/presentation/validations/required'

type BuildValidatorParams = {
  value: any
  field?: string
}

export class BuilderValidation {
  constructor (
    private readonly value: string,
    private readonly field?: string,
    private readonly validators: Validator[] = []
  ) {}

  static of ({ value, field }: BuildValidatorParams): BuilderValidation {
    return new BuilderValidation(value, field)
  }

  required (): BuilderValidation {
    this.validators.push(new Required(this.value, this.field))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
