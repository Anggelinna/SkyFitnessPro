// utils.test.ts
import { getTotalProgressNumber } from './getTotalProgressNumber';

describe('getTotalReps', () => {
  it('должна возвращать число повторений из скобок', () => {
    expect(getTotalProgressNumber('Приседания (15)')).toBe(15);
    expect(
      getTotalProgressNumber('Наклон к согнутой правой ноге (10 повторений)')
    ).toBe(10);
    expect(getTotalProgressNumber('Отжимания (5)')).toBe(5);
  });

  it('должна возвращать 0, если число не найдено', () => {
    expect(getTotalProgressNumber('Приседания')).toBe(0);
    expect(
      getTotalProgressNumber('Наклон к согнутой правой ноге (повторений)')
    ).toBe(0);
    expect(getTotalProgressNumber('')).toBe(0);
  });

  it('должна корректно работать с большими числами', () => {
    expect(getTotalProgressNumber('Марафон (1000)')).toBe(1000);
  });

  it('должна игнорировать лишние символы вокруг числа', () => {
    expect(getTotalProgressNumber('Приседания (15!)')).toBe(15); // берёт только число до символа
    expect(getTotalProgressNumber('Приседания (15abc)')).toBe(15);
  });
});