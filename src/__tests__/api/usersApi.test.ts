import { usersApi } from '../../api/usersApi'
import { API_BASE_URL } from '../../api/config'

// Mock fetch
global.fetch = jest.fn() as jest.Mock

describe('usersApi', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  describe('create', () => {
    it('should create user successfully', async () => {
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ user: mockUser, token: 'test-token' }),
      })

      const result = await usersApi.create('test@example.com', 'password123', 'Test User')

      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'test@example.com', password: 'password123', name: 'Test User' }),
      })
      expect(result).toEqual(mockUser);
    })

    it('should throw error on failed registration', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        text: () => Promise.resolve('Registration failed'),
      })

      await expect(usersApi.create('test@example.com', 'password123', 'Test User'))
        .rejects
        .toThrow('Registration failed');
    })
  })

  describe('auth', () => {
    it('should authenticate user successfully', async () => {
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ user: mockUser, token: 'test-token' }),
      });

      const result = await usersApi.auth('test@example.com', 'password123');

      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
      })
      expect(result).toEqual(mockUser)
      expect(localStorage.getItem('authToken')).toBe('test-token')
    })
  })

  describe('logout', () => {
    it('should remove auth token', async () => {
      localStorage.setItem('authToken', 'test-token')

      await usersApi.logout()

      expect(localStorage.getItem('authToken')).toBeNull()
    })
  })

  describe('getCurrentUser', () => {
    it('should return null if no token', async () => {
      const result = await usersApi.getCurrentUser();
      expect(result).toBeNull()
    })

    it('should return user if token exists', async () => {
      localStorage.setItem('authToken', 'test-token')
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' };

      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ user: mockUser }),
      })

      const result = await usersApi.getCurrentUser()

      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer test-token',
        },
      })
      expect(result).toEqual(mockUser);
    })

    it('should return null on error', async () => {
      localStorage.setItem('authToken', 'test-token');

      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
      })

      const result = await usersApi.getCurrentUser()
      expect(result).toBeNull()
    })
  })
})