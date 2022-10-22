import { HttpClient } from '@infra/http-client'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-custom'
import { SSO } from './sso'
import { BadGatewayException, UnauthorizedException } from '@nestjs/common'
import { config } from 'dotenv'

config()

export class SSOStrategy extends PassportStrategy(Strategy, 'SSO') implements SSO {
  constructor (private readonly httpClient: HttpClient) {
    super()
  }

  async execute (token: string): Promise<void> {
    try {
      const params = new URLSearchParams({
        client_id: process.env.SSO_CLIENT_ID!,
        client_secret: process.env.SSO_CLIENT_SECRET!,
        token
      })
      const response = await this.httpClient.post<{ active: boolean }>(process.env.SSO_URL!, params.toString())
      if (!response.data.active) throw new UnauthorizedException('não autorizado')
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error
      throw new BadGatewayException('sso indisponível')
    }
  }
}
