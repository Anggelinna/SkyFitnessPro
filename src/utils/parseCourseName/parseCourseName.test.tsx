import { parseCourseName } from './parseCourseName';

describe('parseCourseName', () => {
  it('должна корректно парсить полное название с 4 частями', () => {
    const name =
      'Утренняя практика / Йога на каждый день / 1 день / Алексей Казубский';
    expect(parseCourseName(name)).toEqual({
      title: 'Утренняя практика',
      subtitle: 'Йога на каждый день',
      day: '1 день',
      author: 'Алексей Казубский',
    });
  });

  it('должна корректно парсить название только с 2 частями', () => {
    const name = 'Утренняя практика / Йога на каждый день';
    expect(parseCourseName(name)).toEqual({
      title: 'Утренняя практика',
      subtitle: 'Йога на каждый день',
      day: null,
      author: null,
    });
  });

  it('должна класть строку без слэшей только в title', () => {
    const name = 'Йога';
    expect(parseCourseName(name)).toEqual({
      title: 'Йога',
      subtitle: null,
      day: null,
      author: null,
    });
  });

  it('должна вернуть null во всех полях если строка пустая', () => {
    const name = '';
    expect(parseCourseName(name)).toEqual({
      title: null,
      subtitle: null,
      day: null,
      author: null,
    });
  });

  it('должна обрезать пробелы вокруг частей', () => {
    const name = '  Утренняя практика  /   Йога   ';
    expect(parseCourseName(name)).toEqual({
      title: 'Утренняя практика',
      subtitle: 'Йога',
      day: null,
      author: null,
    });
  });
});