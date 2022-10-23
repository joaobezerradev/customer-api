import { CreateCustomer, GetCustomer, UpdateCustomer } from '@application/use-cases/contracts'
import { Body, Controller, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ProviderEnum } from '../../../config'
import { CreateCustomerDTO, GetCustomerDTO, UpdateCustomerDTO } from './dto'

@Controller('customers')
@UseGuards(AuthGuard('SSO'))
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
  async getCustomerCase (@Param() param: GetCustomerDTO.Param): Promise<GetCustomerDTO.Output> {
    return this.getCustomer.execute(param)
  }

  @Post()
  async createCustomerCase (@Body() body: CreateCustomerDTO.Body): Promise<CreateCustomerDTO.Output> {
    return this.createCustomer.execute(body)
  }

  @Put(':id')
  async updateCustomerCase (@Param() param: UpdateCustomerDTO.Param, @Body() body: UpdateCustomerDTO.Body): Promise<any> {
    return this.updateCustomer.execute({
      id: param.id,
      newId: body.id,
      document: body.document,
      name: body.name
    })
  }
}
