export interface Connection {
  query: <T = any>(key: string) => Promise<T | null>
  save: <T = any>(key: string, data: T) => Promise<void>
  clearStorage: () => Promise<void>
  close: () => void
}
