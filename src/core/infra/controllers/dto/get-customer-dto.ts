import { IsNotEmpty, IsUUID } from 'class-validator'

export namespace GetCustomerDTO {
  export class Param {
    @IsUUID('4')
    @IsNotEmpty()
    id: string
  }

  export class Output {
    id: string
    document: number
    name: string
  }
}
