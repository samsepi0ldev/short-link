import { afterAll, describe, beforeEach, it, expect, vi, beforeAll } from 'vitest'
import { ShortLinkPrismaRepository } from '@/infra/prisma/short-link-repository'
import { db } from '@/infra/prisma'
import { Link } from '@/domain/entities/link'

describe('ShortLinkPrismaRepository', () => {
  let sut: ShortLinkPrismaRepository

  beforeAll(async () => {
    await db.shortLink.create({
      data: {
        slug: 'test',
        shortUrl: 'test',
        url: 'test'
      }
    })
  })

  beforeEach(() => {
    sut = new ShortLinkPrismaRepository()
  })

  afterAll(async () => {
    await db.shortLink.deleteMany()
  })

  it('i should be return a erro if slug already exists', async () => {
    const data = sut.create({
      url: 'https://test.com',
      slug: 'test'
    })
    await expect(data).rejects.toThrow()
  })

  it('i should be create a new short link', async () => {
    const data = await sut.create({
      url: 'https://google.com',
      slug: 'gl'
    })

    expect(data.id).toBeTruthy()
    expect(data.url).toBeTruthy()
    expect(data.slug).toBeTruthy()
    expect(data.short_url).toBeTruthy()
    expect(data.created_at).toBeTruthy()
    expect(data).toBeInstanceOf(Link)
    expect(data.slug).toBe('gl')
    expect(data.url).toBe('https://google.com')
  })

  it('i should be return a url on findBySlug', async () => {
    const data = await sut.findBySlug({
      slug: 'gl'
    })
    
    expect(data?.url).toBeTruthy()
  })

  it('i should be return a null if slug not found findBySlug', async () => {
    const data = await sut.findBySlug({
      slug: 'error'
    })
    
    expect(data?.url).toBeFalsy()
    expect(data).toBeNull()
  })
})