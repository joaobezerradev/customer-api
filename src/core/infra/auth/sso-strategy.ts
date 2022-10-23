import { HttpClient } from '@infra/http-client'
import { PassportStrategy } from '@nestjs/passport'
import { FastifyRequest } from 'fastify'
import { Strategy } from 'passport-custom'
import { SSO } from './sso'
import { BadGatewayException, HttpException, UnauthorizedException } from '@nestjs/common'
import { config } from 'dotenv'

config()

export class SSOStrategy extends PassportStrategy(Strategy, 'SSO') implements SSO {
  constructor (private readonly httpClient: HttpClient) {
    super()
  }

  async validate (request: FastifyRequest): Promise<boolean> {
    try {
      const params = new URLSearchParams({
        client_id: process.env.SSO_CLIENT_ID!,
        client_secret: process.env.SSO_CLIENT_SECRET!,
        token: this.getToken(request)
      })
      const response = await this.httpClient.post<{ active: boolean }>(process.env.SSO_URL!, params.toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      if (!response.data.active) throw new UnauthorizedException()
      return true
    } catch (error) {
      if (!(error instanceof HttpException)) throw new BadGatewayException()
      throw error
    }
  }

  protected getToken (request: FastifyRequest): string {
    const authType = 'Bearer '
    if (request?.headers?.authorization?.startsWith(authType)) return request.headers.authorization.replace(authType, '')
    throw new UnauthorizedException()
  }
}
