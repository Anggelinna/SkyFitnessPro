import { getCourseImage } from './getCourseImage';

describe('normalize', () => {
  it('убирает пробелы по краям', () => {
    expect(getCourseImage('   hello   ')).toBe('hello');
  });

  it('приводит строку к нижнему регистру', () => {
    expect(getCourseImage('HeLLo')).toBe('hello');
  });

  it('заменяет несколько пробелов на один', () => {
    expect(getCourseImage('hello    world')).toBe('hello world');
  });

  it('работает с пустой строкой', () => {
    expect(getCourseImage('   ')).toBe('');
  });

  it('комбинирует все правила сразу', () => {
    expect(getCourseImage('   HeLLo    WoRLd   ')).toBe('hello world');
  });
});