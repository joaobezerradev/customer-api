import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCustomerBodyDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 88888 })
  readonly document: number

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Jhon Doe' })
  readonly name: string
}

export class CreateCustomerOutputDTO {
  @ApiProperty({ example: '46d13be3-94ac-4e92-aee6-ae7092115e05' })
  readonly id: string

  @ApiProperty({ example: 88888 })
  readonly document: number

  @ApiProperty({ example: 'Jhon Doe' })
  readonly name: string
}
