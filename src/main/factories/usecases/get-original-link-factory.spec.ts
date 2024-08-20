import { describe, it, expect, vi } from 'vitest'
import { makeGetOriginalLink } from '@/main/factories/usecases/get-original-url-factory'
import { DbGetOriginalLink } from '@/data/usecases/db-get-original-link'

describe('makeGetOriginalLink Factory', () => {
  it('should create an instance of DbGetOriginalLink', () => {
    const dbGetOriginalLink = makeGetOriginalLink()
    expect(dbGetOriginalLink).toBeInstanceOf(DbGetOriginalLink)
  })
})