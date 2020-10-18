export type HttpResponse = {
  statusCode: number
  body: any
}

export type HttpRequest = {
  body?: any
  files?: any
  params?: any
}
