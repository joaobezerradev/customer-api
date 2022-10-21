import { HttpClient } from './http-client'
import axios from 'axios'

export class AxiosHttpClient implements HttpClient {
  async post<B = any, R = any> (uri: string, body: B, config?: HttpClient.Config): Promise<HttpClient.Output<R>> {
    const response = await axios.post<R>(uri, body, config)
    return {
      statusCode: response.status,
      data: response.data
    }
  }
}
