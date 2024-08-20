import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { mock, MockProxy } from 'vitest-mock-extended'

import { CreateShortLink } from '@/domain/usecases/create-short-link'
import { CreateShortLinkController } from '@/presentation/controllers/create-short-link-controller'
import { badRequest, serverError } from '@/presentation/http/http-helper'
import { RequiredFieldError } from '@/presentation/errors/validation'

type Request = {
  url: string
  slug: string
}

const fakeRequest = {
  url: faker.internet.url(),
  slug: faker.word.sample()
}

describe('CreateShortLinkController', () => {
  let request: Request
  let createShortLinkStub: MockProxy<CreateShortLink>
  let sut: CreateShortLinkController

  beforeAll(() => {
    request = fakeRequest
    createShortLinkStub = mock()
  })

  beforeEach(() => {
    createShortLinkStub.create.mockResolvedValue({
      id: faker.string.uuid(),
      created_at: faker.date.anytime(),
      short_url: faker.internet.url(),
      slug: faker.word.sample(),
      url: faker.internet.url()
    })
    sut = new CreateShortLinkController(createShortLinkStub)
  })

  it('i should be return a bad request if params not specified', async () => {
    const response = await sut.handle({})
    expect(response).toEqual(badRequest(new RequiredFieldError('url')))
  })

  it('i should be return a exception erro if controller throws', async () => {
    vi.spyOn(CreateShortLinkController.prototype, 'perform').mockRejectedValueOnce(new Error(''))
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new RequiredFieldError('url')))
  })

  it('i should be buildValidator return array of errors', async () => {
    const buildSpy = vi.spyOn(CreateShortLinkController.prototype, 'buildValidator')
    await sut.handle({})
    expect(buildSpy).toReturnTimes(1)
  })

  it('i should be buildValidator return array empty', async () => {
    const buildSpy = vi.spyOn(CreateShortLinkController.prototype, 'buildValidator')
    await sut.handle(request)
    expect(buildSpy).toHaveBeenCalledWith(request)
  })

  it('is should be return a server error if create fails', async () => {
    const error = new Error('custom_server_error')
    createShortLinkStub.create.mockRejectedValueOnce(error)

    const response = await sut.handle(fakeRequest)

    expect(response).toEqual(serverError(error))
  })

  it('i should be return id if data success created', async () => {
    const response = await sut.handle(fakeRequest)
    
    expect(response.statusCode).toBe(200)
    expect(response.data).toHaveProperty('id')
    expect(response.data).toHaveProperty('slug')
    expect(response.data).toHaveProperty('url')
    expect(response.data).toHaveProperty('short_url')
    expect(response.data).toHaveProperty('created_at')
  })
})
