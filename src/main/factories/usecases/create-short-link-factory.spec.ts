import { describe, it, expect, vi } from 'vitest'
import { makeCreateShortLink } from '@/main/factories/usecases/create-short-link-factory'
import { DbCreateShortLink } from '@/data/usecases/db-create-short-link'

describe('makeCreateShortLink Factory', () => {
  it('should create an instance of DbCreateShortLink', () => {
    const dbGetOriginalLink = makeCreateShortLink()
    expect(dbGetOriginalLink).toBeInstanceOf(DbCreateShortLink)
  })
})