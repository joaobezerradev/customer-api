import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator'

export class UpdateCustomerParamDTO {
  @IsUUID('4')
  @IsNotEmpty()
  @ApiProperty({ example: '46d13be3-94ac-4e92-aee6-ae7092115e05' })
  readonly id: string
}

export class UpdateCustomerBodyDTO {
  @IsUUID('4')
  @IsNotEmpty()
  @ApiProperty({ example: '46d13be3-94ac-4e92-aee6-ae7092115e05' })
  readonly id: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 88888 })
  readonly document: number

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Jhon Doe' })
  readonly name: string
}

export class UpdateCustomerOutputDTO {
  @ApiProperty({ example: '46d13be3-94ac-4e92-aee6-ae7092115e05' })
  readonly id: string

  @ApiProperty({ example: 88888 })
  readonly document: number

  @ApiProperty({ example: 'Jhon Doe' })
  readonly name: string
}
