import { BaseException } from './base-exception'

export class ConflictException extends BaseException {
  constructor () {
    super(409)
  }
}
