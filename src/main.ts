import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { config } from 'dotenv'
import { MainModule } from './main.module'

config()

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create<NestFastifyApplication>(MainModule, new FastifyAdapter())
  const port = process.env.PORT
  if (!port) throw new Error('ENV:PORT not set.')
  await app.listen(port, () => Logger.log(`Server is running on ${port}`, 'NestApplication'))
}
bootstrap().catch(console.log)
