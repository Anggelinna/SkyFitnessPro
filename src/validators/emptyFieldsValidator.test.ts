import { emptyFieldsValidator } from './emptyFieldsValidator';

describe('emptyFieldsValidator', () => {
  it('Проверяет, что во входящих данных обрезаются пробелы корректно', () => {
    const result = emptyFieldsValidator({ name: '   ' }, ['name']);
    expect(result).toEqual({ hasEmpty: true, errors: { name: true } });
  });
  it('Проверяет, что во входящих данных обрезаются пробелы корректно', () => {
    const result = emptyFieldsValidator({ name: 'Jon Mells' }, ['name']);
    expect(result).toEqual({ hasEmpty: false, errors: {} });
  });
  it('Проверяет, что заполненные поля не попадают в обьект errors', () => {
    const result = emptyFieldsValidator({ name: 'John' }, ['name']);
    expect(result).toEqual({ hasEmpty: false, errors: {} });
  });
  it('Проверяет, что пустые поля или поля с пробелами попадают в обьект errors', () => {
    const result = emptyFieldsValidator({ name: '', age: '   ' }, [
      'name',
      'age',
    ]);
    expect(result).toEqual({
      hasEmpty: true,
      errors: { name: true, age: true },
    });
  });
  it('Проверяет, что только невалидные поля попадают в обьект errors и что при единственном незаполненном поле hasEmpty срабатывает', () => {
    const result = emptyFieldsValidator({ name: '', age: '25', login: '123' }, [
      'name',
      'age',
      'login',
    ]);
    expect(result).toEqual({ hasEmpty: true, errors: { name: true } });
  });
  it('Проверяет, что все заполненные поля  не попадают в обьект errors и  hasEmpty не срабатывает', () => {
    const result = emptyFieldsValidator(
      { name: 'Петр', age: '25', login: '123' },
      ['name', 'age', 'login']
    );
    expect(result).toEqual({ hasEmpty: false, errors: {} });
  });
  it('Считает отсутствующие при вызове функции пустыми', () => {
    const result = emptyFieldsValidator({}, ['missingField']);
    expect(result).toEqual({ hasEmpty: true, errors: { missingField: true } });
  });
});