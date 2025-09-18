import { checkLocalStorage } from './checkLocalStorage';
import * as tokenService from '../../services/token';

describe('checkLocalStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('возвращает null, если токен отсутствует', () => {
    jest.spyOn(tokenService, 'getToken').mockReturnValue(null);
    expect(checkLocalStorage()).toBeNull();
  });

  it('возвращает токен, если он корректный', () => {
    jest.spyOn(tokenService, 'getToken').mockReturnValue('abc');
    expect(checkLocalStorage()).toEqual('abc');
  });

  it('возвращает null и вызывает warn, если токен пустой или пробельный', () => {
    jest.spyOn(tokenService, 'getToken').mockReturnValue('   ');
    expect(checkLocalStorage()).toBeNull();
    expect(console.warn).toHaveBeenCalledWith('Некорректный токен в localStorage');
  });

  it('возвращает null и вызывает error, если getToken выбросил ошибку', () => {
    jest.spyOn(tokenService, 'getToken').mockImplementation(() => {
      throw new Error('test error');
    });
    expect(checkLocalStorage()).toBeNull();
    expect(console.error).toHaveBeenCalledWith(
      'Ошибка при чтении localStorage token:',
      expect.any(Error)
    );
  });
});