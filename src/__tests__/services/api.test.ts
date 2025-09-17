// __tests__/services/api.test.ts
import { authApi, coursesApi } from '../../services/api';
import { apiClient } from '../../api/apiClient';

jest.mock('../../api/apiClient');

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

    it('should register successfully', async () => {
      const mockResponse = { data: { token: 'test-token' } };
      (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);

      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      };
      const result = await authApi.register(userData);

      expect(apiClient.post).toHaveBeenCalledWith('/fitness/auth/register', userData);
      expect(result).toEqual(mockResponse.data);
    });

    it('should logout successfully', async () => {
      (apiClient.post as jest.Mock).mockResolvedValue({});

      await authApi.logout();

      expect(apiClient.post).toHaveBeenCalledWith('/fitness/auth/logout');
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

    it('should get course by id', async () => {
      const mockCourse = { _id: '1', nameRU: 'Test Course' };
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockCourse });

      const result = await coursesApi.getById('1');

      expect(apiClient.get).toHaveBeenCalledWith('/fitness/courses/1');
      expect(result).toEqual(mockCourse);
    });

    it('should get courses by category', async () => {
      const mockCourses = [{ _id: '1', nameRU: 'Yoga Course', category: 'yoga' }];
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockCourses });

      const result = await coursesApi.getByCategory('yoga');

      expect(apiClient.get).toHaveBeenCalledWith('/fitness/courses?category=yoga');
      expect(result).toEqual(mockCourses);
    });
  });
});