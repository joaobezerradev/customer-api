import * as request from 'supertest'
import { faker } from '@faker-js/faker'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { Test } from '@nestjs/testing'

import { ExceptionHandler, MainModule } from '../../../../../src/config'
import { createCustomer, generateSSOToken } from '~/test/e2e/utils'

describe('/customers', () => {
  let app: INestApplication
  let authorization: string

  beforeAll(async () => {
    const module = await Test.createTestingModule({ imports: [MainModule] }).compile()
    app = module.createNestApplication(new FastifyAdapter())
    app.useGlobalFilters(new ExceptionHandler())
    app.useGlobalPipes(new ValidationPipe())
    app.enableCors()
    await app.init()
    await app.getHttpAdapter().getInstance().ready()
    authorization = (await generateSSOToken()).token
  })

  afterAll(async () => {
    await app.close()
  })

  describe('@GET /:id', () => {
    it('200', async () => {
      const customer = await createCustomer()
      const response = await request(app.getHttpServer())
        .get(`/customers/${customer.id}`).set('Authorization', authorization)
      expect(response.status).toEqual(200)
      expect(response.body).toStrictEqual(customer)
    })

    it('401', async () => {
      const response = await request(app.getHttpServer())
        .get(`/customers/${faker.datatype.uuid()}`)
        .set('Authorization', 'invalid-token')
      expect(response.status).toEqual(401)
    })

    it('404', async () => {
      const response = await request(app.getHttpServer())
        .get(`/customers/${faker.datatype.uuid()}`)
        .set('Authorization', authorization)
      expect(response.status).toEqual(404)
    })
  })

  describe('@POST', () => {
    it('201', async () => {
      const payload = {
        id: faker.datatype.uuid(),
        document: faker.datatype.number(),
        name: faker.name.fullName()
      }
      const response = await request(app.getHttpServer())
        .post('/customers')
        .set('Authorization', authorization)
        .send(payload)
      expect(response.status).toEqual(201)
      expect(payload).toStrictEqual(response.body)
    })

    it('400', async () => {
      const payload = {
        id: 'invalid',
        document: 'invalid',
        name: 0
      }
      const response = await request(app.getHttpServer())
        .post('/customers')
        .set('Authorization', authorization)
        .send(payload)
      expect(response.status).toEqual(400)
    })

    it('401', async () => {
      const response = await request(app.getHttpServer())
        .post('/customers')
        .set('Authorization', 'invalid-token')
      expect(response.status).toEqual(401)
    })
  })

  describe('@PUT /:id', () => {
    it('200', async () => {
      const customer = await createCustomer({
        id: faker.datatype.uuid(),
        document: faker.datatype.number(),
        name: faker.name.fullName()
      })
      const updatedCustomerData = {
        id: faker.datatype.uuid(),
        document: faker.datatype.number(),
        name: faker.name.fullName()
      }
      const response = await request(app.getHttpServer())
        .put(`/customers/${customer.id}`)
        .set('Authorization', authorization)
        .send(updatedCustomerData)
      expect(response.status).toEqual(200)
      expect(response.body).toStrictEqual(updatedCustomerData)
    })

    it('401', async () => {
      const response = await request(app.getHttpServer())
        .put(`/customers/${faker.datatype.uuid()}`)
        .set('Authorization', 'invalid-token')
      expect(response.status).toEqual(401)
    })

    it('400', async () => {
      const payload = {
        id: 'invalid',
        document: 'invalid',
        name: 0
      }
      const customer = await createCustomer()
      const response = await request(app.getHttpServer())
        .put(`/customers/${customer.id}`)
        .set('Authorization', authorization)
        .send(payload)
      expect(response.status).toEqual(400)
    })

    it('404', async () => {
      const response = await request(app.getHttpServer())
        .put(`/customers/${faker.datatype.uuid()}`)
        .set('Authorization', authorization)
        .send({
          id: faker.datatype.uuid(),
          document: faker.datatype.number(),
          name: faker.name.fullName()
        })
      expect(response.status).toEqual(404)
    })

    it('409', async () => {
      const payload = {
        id: faker.datatype.uuid(),
        document: faker.datatype.number(),
        name: faker.name.fullName()
      }
      await createCustomer(payload)
      const response = await request(app.getHttpServer())
        .put(`/customers/${payload.id}`)
        .set('Authorization', authorization)
        .send(payload)
      expect(response.status).toEqual(409)
    })
  })
})
