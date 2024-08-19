import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { mock, MockProxy } from 'vitest-mock-extended'

import { DbGetOriginalLink } from '@/data/usecases/db-get-original-link'
import { GetOriginalLinkRepository } from '@/data/protocols/get-original-link-repository'
import { Link } from '@/domain/entities/link'
import { ForbiddenError } from '@/presentation/errors/forbidden-error'

describe('DbGetOriginalLink', () => {
  let linkResponse: { url: string }
  let getOriginalLinkRepository: MockProxy<GetOriginalLinkRepository>
  let sut: DbGetOriginalLink

  beforeAll(() => {
    linkResponse = {
      url: faker.internet.url()
    }
    getOriginalLinkRepository = mock()
  })
  beforeEach(() => {
    getOriginalLinkRepository.findBySlug.mockResolvedValue(linkResponse)
    sut = new DbGetOriginalLink(getOriginalLinkRepository)
  })

  it('i should be return a error if erro on get link', async () => {
    const error = new Error('any_error')
    getOriginalLinkRepository.findBySlug.mockRejectedValueOnce(error)

    const res = sut.get({
      slug: faker.word.sample()
    })

    await expect(res).rejects.toThrow(error)
  })

  it('i should be return a forbidden erro if return null', async () => {
    getOriginalLinkRepository.findBySlug.mockResolvedValueOnce(null)

    const res = sut.get({
      slug: faker.word.sample()
    })

    await expect(res).rejects.toThrow(new ForbiddenError())
  })

  it('i should be return a link if success', async () => {
    const res = await sut.get({
      slug: faker.word.sample()
    })

    expect(res?.url).toBeTruthy()
  })

  it('i should if have been called with correct params', async () => {
    const spy = vi.spyOn(getOriginalLinkRepository, 'findBySlug')
    const createData = {
      slug: faker.word.sample()
    }
    await sut.get(createData)

    expect(spy).toHaveBeenCalledWith(createData)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
