export enum HttpStatusCode {
  ok = 200,
  badRequest = 400,
  serverError = 500
}

export type HttpMethod = 'post'

export type HttpRequest = {
  url: string
  method: HttpMethod
  body?: any
  headers?: any
}

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}
