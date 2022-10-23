import { CreateCustomer, GetCustomer, UpdateCustomer } from '@application/use-cases/contracts'
import { Body, Controller, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiDefaultResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'
import {
  CreateCustomerBodyDTO,
  CreateCustomerOutputDTO,
  GetCustomerParamDTO,
  GetCustomerOutputDTO,
  UpdateCustomerParamDTO,
  UpdateCustomerBodyDTO,
  UpdateCustomerOutputDTO
} from './dto'
import { ProviderEnum } from '../../../config'

@Controller('customers')
@UseGuards(AuthGuard('SSO'))
@ApiTags('Customer')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'não autorizado' })
@ApiBadGatewayResponse({ description: 'cache indisponível ou sso indisponível' })
export class CustomerController {
  constructor (
    @Inject(ProviderEnum.GetCustomer)
    private readonly getCustomer: GetCustomer,
    @Inject(ProviderEnum.CreateCustomer)
    private readonly createCustomer: CreateCustomer,
    @Inject(ProviderEnum.UpdateCustomer)
    private readonly updateCustomer: UpdateCustomer
  ) { }

  @Get(':id')
  @ApiDefaultResponse({ type: GetCustomerOutputDTO })
  @ApiNotFoundResponse({ description: 'cliente inexistente' })
  async getCustomerCase (@Param() param: GetCustomerParamDTO): Promise<GetCustomerOutputDTO> {
    return this.getCustomer.execute(param)
  }

  @Post()
  @ApiBody({ type: CreateCustomerBodyDTO })
  @ApiDefaultResponse({ type: CreateCustomerOutputDTO })
  @ApiBadRequestResponse({ description: 'request inválida' })
  async createCustomerCase (@Body() body: CreateCustomerBodyDTO): Promise<CreateCustomerOutputDTO> {
    return this.createCustomer.execute(body)
  }

  @Put(':id')
  @ApiBody({ type: UpdateCustomerBodyDTO })
  @ApiDefaultResponse({ type: UpdateCustomerOutputDTO })
  @ApiNotFoundResponse({ description: 'cliente inexistente' })
  @ApiConflictResponse({ description: 'conflito de ID' })
  @ApiBadRequestResponse({ description: 'request inválida' })
  async updateCustomerCase (@Param() param: UpdateCustomerParamDTO, @Body() body: UpdateCustomerBodyDTO): Promise<UpdateCustomerOutputDTO> {
    return this.updateCustomer.execute({ id: param.id, newId: body.id, document: body.document, name: body.name })
  }
}
