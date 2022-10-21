export interface HttpClient {
  post: <B = any, R = any> (uri: string, body: B, config?: HttpClient.Config) => Promise<HttpClient.Output<R>>
}

export namespace HttpClient {
  export type Config = {
    headers: {
      [key: string]: string
    }
  }
  export type Output<R> = {
    statusCode: number
    data: R
  }
}
