export interface SSO<R = any> {
  validate: (request: R) => Promise<boolean>
}
