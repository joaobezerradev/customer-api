import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { fastifyHelmet } from '@fastify/helmet'
import { config } from 'dotenv'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ExceptionHandler } from '~config/exception-handler'
import { MainModule } from './config/main.module'

config()

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create<NestFastifyApplication>(MainModule, new FastifyAdapter())
  app.useGlobalFilters(new ExceptionHandler())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.enableCors()

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Customer API')
    .setDescription('This is swagger customer API')
    .setVersion('1.0.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ['\'self\''],
        styleSrc: ['\'self\'', '\'unsafe-inline\''],
        imgSrc: ['\'self\'', 'data:', 'validator.swagger.io'],
        scriptSrc: ['\'self\'', 'https: \'unsafe-inline\'']
      }
    }
  })
  const port = process.env.PORT
  if (!port) throw new Error('ENV:PORT not set.')
  await app.listen(port, '0.0.0.0')
}

void bootstrap()
