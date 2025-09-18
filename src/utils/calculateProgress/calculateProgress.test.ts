import { calculateProgress } from './calculateProgress';

describe('calculateProgress', () => {
  it('должна корректно вычислять процент выполнения', () => {
    expect(calculateProgress(5, 10)).toBe(50);
    expect(calculateProgress(3, 10)).toBe(30);
    expect(calculateProgress(10, 10)).toBe(100);
    expect(calculateProgress(0, 10)).toBe(0);
  });

  it('не должна превышать 100%', () => {
    expect(calculateProgress(15, 10)).toBe(100);
  });

  it('должна корректно работать с total = 0', () => {
    expect(calculateProgress(5, 0)).toBe(0);
    expect(calculateProgress(0, 0)).toBe(0);
  });

  it('должна округлять до целого числа', () => {
    expect(calculateProgress(7, 12)).toBe(58);
    expect(calculateProgress(2, 3)).toBe(67);
  });
});