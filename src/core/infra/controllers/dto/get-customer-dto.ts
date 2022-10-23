import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class GetCustomerParamDTO {
  @IsUUID('4')
  @IsNotEmpty()
  @ApiProperty({ example: '46d13be3-94ac-4e92-aee6-ae7092115e05' })
  readonly id: string
}

export class GetCustomerOutputDTO {
  @ApiProperty({ example: '46d13be3-94ac-4e92-aee6-ae7092115e05' })
  readonly id: string

  @ApiProperty({ example: 88888 })
  readonly document: number

  @ApiProperty({ example: 'Jhon Doe' })
  readonly name: string
}
