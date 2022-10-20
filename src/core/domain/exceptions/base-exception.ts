export abstract class BaseException extends Error {
  constructor (
    readonly detail: string | Array<{ message: string }>,
    readonly statusCode: number,
    readonly type: string
  ) {
    super()
  }
}
