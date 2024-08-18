import { type HttpResponse, HttpStatusCode } from '@/presentation/protocols/http'
import { ServerError } from '@/presentation/erros/server-error'

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: HttpStatusCode.BAD_REQUEST,
  data: error
})

export const serverError = (error: unknown): HttpResponse => ({
  statusCode: HttpStatusCode.SERVER_ERROR,
  data: new ServerError(error instanceof Error ? error : undefined)
})
