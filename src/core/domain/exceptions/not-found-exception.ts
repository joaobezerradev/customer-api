import { BaseException } from './base-exception'

export class NotFoundException extends BaseException {
  constructor (message: string = 'not found.') {
    super(message, 404, 'NotFoundException')
  }
}
