export interface GetCustomer {
  execute: (input: GetCustomer.Input) => Promise<GetCustomer.Output>
}

export namespace GetCustomer {
  export type Input = { id: string }
  export type Output = {
    id: string
    document: number
    name: string
  }
}
