import axios from 'axios'

import { HttpClient } from './http-client'

export class AxiosHttpClient implements HttpClient {
  async post<R, B> (uri: string, body: B, config?: HttpClient.Config): Promise<HttpClient.Output<R>> {
    const response = await axios.post(uri, body, { headers: config?.headers })
    return { statusCode: response.status, data: response.data }
  }
}
