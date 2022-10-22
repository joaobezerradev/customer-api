import { CustomerController } from '@infra/controllers'
import { Module } from '@nestjs/common'

import { providers } from './ioc'

@Module({
  controllers: [CustomerController],
  providers
})
export class MainModule { }
