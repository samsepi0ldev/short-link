export abstract class Validator {
  abstract validate (): Error | undefined
}
