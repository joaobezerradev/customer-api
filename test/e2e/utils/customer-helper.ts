import { faker } from '@faker-js/faker'
import { RedisConnection } from '@infra/database'

export const createCustomer = async (input?: CustomerData): Promise<CustomerData> => {
  const connection = new RedisConnection(process.env.REDIS_HOST!)
  const data = {
    id: input?.id ?? faker.datatype.uuid(),
    document: input?.document ?? faker.datatype.number(),
    name: input?.name ?? faker.name.fullName()
  }
  await connection.save(`customer:${data.id}`, data)
  connection.close()
  return data
}

type CustomerData = {
  id: string
  document: number
  name: string
}
