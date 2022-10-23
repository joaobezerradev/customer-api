import { BadGatewayException } from '@nestjs/common'
import axios from 'axios'

export const generateSSOToken = async (): Promise<{ token: string }> => {
  try {
    const api = axios.create({ baseURL: process.env.SSO_URL_TOKEN!, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    const params = new URLSearchParams({
      client_id: process.env.SSO_CLIENT_ID!,
      client_secret: process.env.SSO_CLIENT_SECRET!,
      grant_type: process.env.SSO_GRANT_TYPE!,
      username: process.env.SSO_USERNAME!,
      scope: process.env.SSO_SCOPE!,
      password: process.env.SSO_PASSWORD!
    })
    const response = await api.post<{ access_token: string }>('/', params.toString())
    return { token: `Bearer ${response.data.access_token}` }
  } catch {
    throw new BadGatewayException()
  }
}
