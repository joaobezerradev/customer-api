import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export namespace CreateCustomerDTO {
  export class Body {
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
