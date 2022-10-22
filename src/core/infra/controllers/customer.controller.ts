import { CreateCustomer, GetCustomer, UpdateCustomer } from '@application/use-cases/contracts'
import { Body, Controller, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ProviderEnum } from '~config/provider-enum'

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
  async getCustomerCaseC (@Param('id') id: string): Promise<any> {
    return this.getCustomer.execute({ id })
  }

  @Post()
  async createCustomerCase (@Body() body: any): Promise<any> {
    return this.createCustomer.execute(body)
  }

  @Put(':id')
  async updateCustomerCase (@Param('id') id: string, @Body() { newId, ...rest }: any): Promise<any> {
    return this.updateCustomer.execute({
      id,
      newId,
      ...rest
    })
  }
}
