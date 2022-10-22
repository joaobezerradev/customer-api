import { CreateCustomerCase, GetCustomerCase, UpdateCustomerCase } from '@application/use-cases'
import { CreateCustomer, GetCustomer, UpdateCustomer } from '@application/use-cases/contracts'
import { RepositoryFactory } from '@domain/factories'
import { SSO, SSOStrategy } from '@infra/auth'
import { Connection, RedisConnection } from '@infra/database'
import { RedisRepositoryFactory } from '@infra/factories'
import { AxiosHttpClient, HttpClient } from '@infra/http-client'
import { ClassProvider, FactoryProvider, Provider, ValueProvider } from '@nestjs/common'
import { ProviderEnum } from './provider-enum'

const connectionProvider: ValueProvider<Connection> = {
  provide: ProviderEnum.Connection,
  useValue: new RedisConnection(process.env.REDIS_HOST!)
}

const repositoryFactoryProvider: FactoryProvider<RepositoryFactory> = {
  provide: ProviderEnum.RepositoryFactory,
  useFactory: (connection: Connection) => new RedisRepositoryFactory(connection),
  inject: [ProviderEnum.Connection]
}

const getCustomerProvider: FactoryProvider<GetCustomer> = {
  provide: ProviderEnum.GetCustomer,
  useFactory: (repositoryFactory: RepositoryFactory) => new GetCustomerCase(repositoryFactory),
  inject: [ProviderEnum.RepositoryFactory]
}

const createCustomerProvider: FactoryProvider<CreateCustomer> = {
  provide: ProviderEnum.CreateCustomer,
  useFactory: (repositoryFactory: RepositoryFactory) => new CreateCustomerCase(repositoryFactory),
  inject: [ProviderEnum.RepositoryFactory]
}

const updateCustomerProvider: FactoryProvider<UpdateCustomer> = {
  provide: ProviderEnum.UpdateCustomer,
  useFactory: (repositoryFactory: RepositoryFactory) => new UpdateCustomerCase(repositoryFactory),
  inject: [ProviderEnum.RepositoryFactory]
}

const httpClientProvider: ClassProvider<HttpClient> = {
  provide: ProviderEnum.HttpClient,
  useClass: AxiosHttpClient
}

const ssoStrategyProvider: FactoryProvider<SSO> = {
  provide: ProviderEnum.SSO,
  useFactory: (httpClient: HttpClient) => new SSOStrategy(httpClient),
  inject: [ProviderEnum.HttpClient]
}

export const providers: Provider[] = [
  connectionProvider,
  repositoryFactoryProvider,
  getCustomerProvider,
  createCustomerProvider,
  updateCustomerProvider,
  httpClientProvider,
  ssoStrategyProvider
]
