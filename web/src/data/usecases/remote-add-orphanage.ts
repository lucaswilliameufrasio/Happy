import { HttpClient, HttpStatusCode } from '@/data/protocols/http/http-client'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { AddOrphanage } from '@/domain/usecases/add-orphanage'

export class RemoteAddOrphanage implements AddOrphanage {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async add (params: AddOrphanage.Params): Promise<AddOrphanage.Model> {
    const formData = new FormData()

    formData.append('name', params.name)
    formData.append('about', params.about)
    formData.append('whatsapp', params.whatsapp)
    formData.append('instructions', params.instructions)
    formData.append('latitude', String(params.latitude))
    formData.append('longitude', String(params.longitude))
    formData.append('opening_hours', params.opening_hours)
    formData.append('open_on_weekend', String(params.open_on_weekend))

    params.images.map(image => {
      formData.append('images', image)
    })

    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: formData
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok : return httpResponse.body
      default: throw new UnexpectedError()
    }
  }
}
