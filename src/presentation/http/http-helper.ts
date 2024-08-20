import { type HttpResponse, HttpStatusCode } from '@/presentation/protocols/http'
import { ServerError } from '@/presentation/errors/server-error'
import { ForbiddenError } from '@/presentation/errors/forbidden-error'

export const serverError = (error: any): HttpResponse => ({
  statusCode: HttpStatusCode.SERVER_ERROR,
  data: new ServerError(error instanceof Error ? error : undefined)
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: HttpStatusCode.BAD_REQUEST,
  data: error
})

export const ok = (data: any): HttpResponse<Error> => ({
  statusCode: HttpStatusCode.OK,
  data
})

export const forbidden = (): HttpResponse => ({
  statusCode: HttpStatusCode.FORBIDDEN,
  data: new ForbiddenError()
})

export const redirect = (url: string): HttpResponse => ({
  statusCode: HttpStatusCode.REDIRECTION,
  headers: {
    Location: url
  },
  data: null
})
