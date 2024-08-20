import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { mock, MockProxy } from 'vitest-mock-extended'

import { DbCreateShortLink } from '@/data/usecases/db-create-short-link'
import { CreateShortLinkRepository } from '@/data/protocols/create-short-link-repository'
import { Link } from '@/domain/entities/link'

describe('DbCreateShortLink', () => {
  let linkResponse: Link
  let createShortLinkRepositoryStub: MockProxy<CreateShortLinkRepository>
  let sut: DbCreateShortLink

  beforeAll(() => {
    linkResponse = new Link({
      id: faker.string.uuid(),
      created_at: faker.date.anytime(),
      short_url: faker.internet.url(),
      slug: faker.word.sample(),
      url: faker.internet.url()
    })
    createShortLinkRepositoryStub = mock()
  })
  beforeEach(() => {
    createShortLinkRepositoryStub.create.mockResolvedValue(linkResponse)
    sut = new DbCreateShortLink(createShortLinkRepositoryStub)
  })

  it('i should be return a error if erro on create link', async () => {
    const error = new Error('any_error')
    createShortLinkRepositoryStub.create.mockRejectedValueOnce(error)

    const res = sut.create({
      slug: faker.word.sample(),
      url: faker.internet.url()
    })

    await expect(res).rejects.toThrow(error)
  })

  it('i should be return a link if success', async () => {
    const res = await sut.create({
      slug: faker.word.sample(),
      url: faker.internet.url()
    })

    expect(res).toHaveProperty('id')
    expect(res).toHaveProperty('slug')
    expect(res).toHaveProperty('url')
    expect(res).toHaveProperty('short_url')
    expect(res).toHaveProperty('created_at')

    expect(res.id).toBeTruthy()
    expect(res.created_at).toBeTruthy()
    expect(res.short_url).toBeTruthy()
    expect(res.slug).toBeTruthy()
    expect(res.url).toBeTruthy()
  })

  it('i should if have been called with correct params', async () => {
    const spy = vi.spyOn(createShortLinkRepositoryStub, 'create')
    const createData = {
      slug: faker.word.sample(),
      url: faker.internet.url()
    }
    await sut.create(createData)

    expect(spy).toHaveBeenCalledWith(createData)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
