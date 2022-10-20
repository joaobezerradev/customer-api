import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { config } from 'dotenv'
import { ExceptionHandler } from './config'
import { MainModule } from './main.module'

config()

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create<NestFastifyApplication>(MainModule, new FastifyAdapter())
  app.useGlobalFilters(new ExceptionHandler())
  const port = process.env.PORT
  if (!port) throw new Error('ENV:PORT not set.')
  await app.listen(port, '0.0.0.0')
}
void bootstrap()
