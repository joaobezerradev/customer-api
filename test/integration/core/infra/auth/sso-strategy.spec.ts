import { SSO, SSOStrategy } from '@infra/auth'
import { HttpClient } from '@infra/http-client'
import { BadGatewayException, UnauthorizedException } from '@nestjs/common'
import { mock, DeepMockProxy } from 'jest-mock-extended'

describe('SSOStrategy', () => {
  let httpClient: DeepMockProxy<HttpClient>
  let sut: SSO

  beforeAll(() => {
    httpClient = mock()
    sut = new SSOStrategy(httpClient)
  })

  it('should throws if sso is not available.', async () => {
    httpClient.post.mockRejectedValueOnce(new Error())
    const payload = { headers: { authorization: 'Bearer token' } }
    await expect(sut.validate(payload)).rejects.toThrowError(BadGatewayException)
  })

  it('should return true if token is valid.', async () => {
    httpClient.post.mockResolvedValueOnce({ statusCode: 200, data: { active: true } })
    const payload = { headers: { authorization: 'Bearer token' } }
    const response = await sut.validate(payload)
    expect(response).toBeTruthy()
  })

  it('should throws if provided token is not in bearer format.', async () => {
    httpClient.post.mockResolvedValueOnce({ statusCode: 200, data: { active: false } })
    const payload = { headers: { authorization: 'invalid-token' } }
    await expect(sut.validate(payload)).rejects.toThrowError(UnauthorizedException)
  })

  it('should throws if token is invalid.', async () => {
    httpClient.post.mockResolvedValueOnce({ statusCode: 200, data: { active: false } })
    const payload = { headers: { authorization: 'Bearer token' } }
    await expect(sut.validate(payload)).rejects.toThrowError(UnauthorizedException)
  })
})
