import { BaseException } from './base-exception'

export class ConflictException extends BaseException {
  constructor (message: string = 'conflict.') {
    super(message, 409, 'ConflictException')
  }
}
