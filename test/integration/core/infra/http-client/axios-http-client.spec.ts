import { AxiosHttpClient, HttpClient } from '@infra/http-client'

import axiosLib from 'axios'

const axios = axiosLib as jest.Mocked<typeof axiosLib>

describe('AxiosHttpClient', () => {
  let sut: HttpClient

  beforeAll(() => {
    jest.spyOn(axiosLib, 'post').mockImplementation()
    sut = new AxiosHttpClient()
  })

  it('should execute POST method', async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: { ok: true }
    })
    const endpoint = '/do-something'

    const response = await sut.post(endpoint, { ok: true })
    expect(response).toStrictEqual({
      statusCode: 200,
      data: { ok: true }
    })
  })

  it('should throws if gateway throws', async () => {
    axios.post.mockRejectedValueOnce(new Error())
    const endpoint = '/do-something'
    await expect(() => sut.post(endpoint, { ok: true })).rejects.toThrowError(Error)
  })
})
