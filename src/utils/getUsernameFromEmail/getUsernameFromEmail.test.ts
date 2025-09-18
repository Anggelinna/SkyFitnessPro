import { getUsernameFromEmail } from './getUsernameFromEmail';

describe('getUsernameFromEmail', () => {
  it('должен возвращать часть до @ для стандартного email', () => {
    expect(getUsernameFromEmail('example@gmail.com')).toBe('example');
  });

  it('должен возвращать пустую строку, если email пустой', () => {
    expect(getUsernameFromEmail('')).toBe('');
  });

  it('должен возвращать всю строку, если нет @', () => {
    expect(getUsernameFromEmail('no-at-symbol')).toBe('no-at-symbol');
  });

  it('должен работать с email с несколькими @', () => {
    expect(getUsernameFromEmail('first@second@domain.com')).toBe('first');
  });

  it('должен работать с email, начинающимся с @', () => {
    expect(getUsernameFromEmail('@domain.com')).toBe('');
  });

  it('должен работать с email с точками и знаками', () => {
    expect(getUsernameFromEmail('john.doe+123@gmail.com')).toBe('john.doe+123');
  });
});