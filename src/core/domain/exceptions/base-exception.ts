export abstract class BaseException extends Error {
  constructor (readonly code: number) {
    super()
  }
}
