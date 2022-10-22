import { BaseException } from '@domain/exceptions'
import {
  ExceptionFilter,
  ConflictException,
  NotFoundException
} from '@nestjs/common'

export class ExceptionHandler implements ExceptionFilter {
  catch (exception: Error): void {
    if (exception instanceof BaseException) {
      switch (exception.code) {
        case 409:
          throw new ConflictException()
        case 404:
          throw new NotFoundException()
        default:
          throw exception
      }
    }
    throw exception
  }
}
