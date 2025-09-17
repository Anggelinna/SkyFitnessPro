import { apiClient } from '../../api/apiClient'
import axios from 'axios'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

describe('apiClient', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
    mockedAxios.create.mockReturnValue(mockedAxios)
  })

  it('should create axios instance with correct config', () => {
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: expect.any(String),
      timeout: 10000,
    })
  })

  it('should add auth token to request headers', async () => {
    localStorage.setItem('authToken', 'test-token')

    const config = {
      headers: {},
    }

    const requestInterceptor = apiClient.interceptors.request.handlers[0].fulfilled
    if (requestInterceptor) {
      await requestInterceptor(config)
    }

    expect(config.headers.Authorization).toBe('Bearer test-token')
  })

  it('should not add auth token if no token exists', async () => {
    const config = {
      headers: {},
    }

    const requestInterceptor = apiClient.interceptors.request.handlers[0].fulfilled
    if (requestInterceptor) {
      await requestInterceptor(config)
    }

    expect(config.headers.Authorization).toBeUndefined()
  })
})