export interface SSO {
  execute: (token: string) => Promise<void>
}
