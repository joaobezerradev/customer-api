import { SSO, SSOStrategy } from '@infra/auth'
import { HttpClient } from '@infra/http-client'
import { BadGatewayException, UnauthorizedException } from '@nestjs/common'
import { mock, MockProxy } from 'jest-mock-extended'

describe('SSOStrategy', () => {
  let httpClient: MockProxy<HttpClient>
  let sut: SSO

  beforeAll(() => {
    httpClient = mock()
    sut = new SSOStrategy(httpClient)
  })

  it('should throws if provided token is invalid.', async () => {
    jest.spyOn(httpClient, 'post').mockResolvedValueOnce({ statusCode: 200, data: { active: false } })

    const token = 'invalid-token'
    await expect(sut.execute(token)).rejects.toThrowError(UnauthorizedException)
  })

  it('should throws if sso is not available.', async () => {
    jest.spyOn(httpClient, 'post').mockRejectedValueOnce(new Error())
    const token = 'token'
    await expect(sut.execute(token)).rejects.toThrowError(BadGatewayException)
  })
})
