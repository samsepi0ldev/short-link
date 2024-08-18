import { type HttpResponse, HttpStatusCode } from '@/presentation/protocols/http'
import { ServerError } from '@/presentation/erros/server-error'

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
