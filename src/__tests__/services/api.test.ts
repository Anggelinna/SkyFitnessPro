// __tests__/services/api.test.ts
import { authApi, coursesApi } from '../services/api';
import { apiClient } from '../../api/apiClient';

jest.mock('../api/apiClient');

describe('API Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('authApi', () => {
    it('should login successfully', async () => {
      const mockResponse = { data: { token: 'test-token' } };
      (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await authApi.login('test@example.com', 'password123');

      expect(apiClient.post).toHaveBeenCalledWith('/fitness/auth/login', {
        email: 'test@example.com',
        password: 'password123',
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('coursesApi', () => {
    it('should get all courses', async () => {
      const mockCourses = [{ _id: '1', nameRU: 'Test Course' }];
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockCourses });

      const result = await coursesApi.getAll();

      expect(apiClient.get).toHaveBeenCalledWith('/fitness/courses');
      expect(result).toEqual(mockCourses);
    });
  });
});