export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
  NOT_FOUND = 404,
  FORBIDDEN = 403
}

export interface HttpResponse<T = any> {
  statusCode: HttpStatusCode,
  data: T
}
