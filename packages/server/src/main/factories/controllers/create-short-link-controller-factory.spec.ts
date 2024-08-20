import { describe, it, expect, vi } from 'vitest'
import { makeCreateShortLinkController } from '@/main/factories/controllers/create-short-link-controller-factory'
import { CreateShortLinkController } from '@/presentation/controllers/create-short-link-controller'

describe('makeCreateShortLinkController Factory', () => {
  it('should create an instance of CreateShortLinkController', () => {
    const dbGetOriginalLink = makeCreateShortLinkController()
    expect(dbGetOriginalLink).toBeInstanceOf(CreateShortLinkController)
  })
})