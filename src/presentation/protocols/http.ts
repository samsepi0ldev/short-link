export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
  NOT_FOUND = 404
}

export interface HttpResponse<T = unknown> {
  statusCode: HttpStatusCode,
  data: T
}
