import { describe, expect, it } from 'vitest'

import { RequiredFieldError } from '@/presentation/errors/validation'

describe('RequiredFieldError', () => {
  it('should create an error with a generic message if no field name is provided', () => {
    const error = new RequiredFieldError()
    expect(error.message).toBe('Field required')
    expect(error.name).toBe('RequiredFieldError')
  })

  it('should create an error with a specific field name in the message if provided', () => {
    const fieldName = 'email'
    const error = new RequiredFieldError(fieldName)
    expect(error.message).toBe(`The field ${fieldName} is required`)
    expect(error.name).toBe('RequiredFieldError')
  })

  it('should be an instance of Error', () => {
    const error = new RequiredFieldError()
    expect(error).toBeInstanceOf(Error)
  })

  it('should retain the stack trace of the error', () => {
    const error = new RequiredFieldError()
    expect(error.stack).toBeDefined()
  })
})