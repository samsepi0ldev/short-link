import { describe, it, expect, vi } from 'vitest'
import { makeGetOriginalLinkController } from '@/main/factories/controllers/get-original-link-controller-factory'
import { GetOriginalLinkController } from '@/presentation/controllers/get-original-link-controller'

describe('makeCreateShortLinkController Factory', () => {
  it('should create an instance of CreateShortLinkController', () => {
    const dbGetOriginalLink = makeGetOriginalLinkController()
    expect(dbGetOriginalLink).toBeInstanceOf(GetOriginalLinkController)
  })
})