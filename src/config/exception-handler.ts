import { BaseException } from '@domain/exceptions'
import {
  ExceptionFilter,
  ArgumentsHost,
  Catch
} from '@nestjs/common'

@Catch()
export class ExceptionHandler implements ExceptionFilter {
  catch (exception: Error, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse()
    if (exception instanceof BaseException) {
      const { statusCode, detail, type } = exception

      if (typeof detail === 'string') {
        response.status(statusCode).send({
          message: detail,
          type
        })
      } else {
        response.status(statusCode).send({
          messages: detail.map(message => ({ message })),
          type
        })
      }
    }

    response.status(500).send({ message: exception.message })
  }
}
