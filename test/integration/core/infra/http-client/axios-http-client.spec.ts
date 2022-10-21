import { AxiosHttpClient } from '@infra/http-client'
import { BadGatewayException } from '@nestjs/common'
import { MockProxy, mock } from 'jest-mock-extended'

describe('AxiosHttpClient', () => {
  let sut: MockProxy<AxiosHttpClient>

  beforeAll(() => {
    sut = mock()
  })

  it('should execute POST method', async () => {
    sut.post.mockResolvedValueOnce({
      statusCode: 200,
      data: { ok: true }
    })

    const uri = 'https://mock.com.br/do-something'
    const response = await sut.post(uri, { ok: true })
    expect(response).toStrictEqual({
      statusCode: 200,
      data: { ok: true }
    })
  })

  it('should throws if gateway throws', async () => {
    sut.post.mockRejectedValueOnce(new BadGatewayException())
    const uri = 'https://mock.com.br/do-something'
    await expect(sut.post(uri, { ok: true })).rejects.toThrowError(BadGatewayException)
  })
})
