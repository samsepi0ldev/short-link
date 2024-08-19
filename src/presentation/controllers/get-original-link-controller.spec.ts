import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { mock, MockProxy } from 'vitest-mock-extended'

import { GetOriginalLink } from '@/domain/usecases/get-original-link'
import { GetOriginalLinkController } from '@/presentation/controllers/get-original-link-controller'
import { badRequest, forbidden, ok, serverError } from '@/presentation/http/http-helper'
import { RequiredFieldError } from '@/presentation/errors/validation'
import { ForbiddenError } from '../errors/forbidden-error'

type Request = {
  slug: string
}

const fakeRequest = {
  slug: faker.word.sample()
}

const fakeResponse = {
  id: faker.string.uuid(),
  slug: faker.word.sample(),
  url: faker.internet.url(),
  short_url: faker.internet.url(),
  created_at: faker.date.anytime()
}

describe('GetOriginalLinkController', () => {
  let request: Request
  let getOriginalLinkStub: MockProxy<GetOriginalLink>
  let sut: GetOriginalLinkController

  beforeAll(() => {
    request = fakeRequest
    getOriginalLinkStub = mock()
  })

  beforeEach(() => {
    getOriginalLinkStub.get.mockResolvedValue(fakeResponse)
    sut = new GetOriginalLinkController(getOriginalLinkStub)
  })

  it('i should be return a bad request if params not specified', async () => {
    const response = await sut.handle({})
    expect(response).toEqual(badRequest(new RequiredFieldError('slug')))
  })

  it('is should be return a server error if get fails', async () => {
    const error = new Error('custom_server_error')
    getOriginalLinkStub.get.mockRejectedValueOnce(error)

    const response = await sut.handle(fakeRequest)

    expect(response).toEqual(serverError(error))
  })

  it('is should be return a forbidden error if link not found fails', async () => {
    getOriginalLinkStub.get.mockRejectedValueOnce(new ForbiddenError())

    const response = await sut.handle(fakeRequest)

    expect(response).toEqual(forbidden())
  })

  it('i should be return data if success', async () => {
    const response = await sut.handle(fakeRequest)
    
    expect(response).toEqual(ok(fakeResponse))
  })
})