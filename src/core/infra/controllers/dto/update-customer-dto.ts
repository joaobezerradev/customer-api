import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator'

export namespace UpdateCustomerDTO {
  export class Param {
    @IsUUID('4')
    @IsNotEmpty()
    id: string
  }

  export class Body {
    @IsUUID('4')
    @IsNotEmpty()
    id: string

    @IsNumber()
    @IsNotEmpty()
    document: number

    @IsString()
    @IsNotEmpty()
    name: string
  }

  export class Output {
    id: string
    document: number
    name: string
  }
}
