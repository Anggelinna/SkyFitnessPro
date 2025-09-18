import type { Exercise, ProgressData } from '../sharesTypes/sharesTypes';

export function validateProgressForm(
  formValues: { [key: string]: string },
  currentProgress: ProgressData,
  workoutTasks: Exercise[]
): { isValid: boolean; errors: { [key: string]: string } } {
  const errors: { [key: string]: string } = {};

  workoutTasks.forEach((_, index) => {
    const key = `exercise-${index}`;
    const oldValue = currentProgress[index] || 0;
    const newValue =
      formValues[key] === '' ? oldValue : Number(formValues[key]);

    if (!/^\d*$/.test(formValues[key] || '0')) {
      errors[key] = 'Введите число 0 или больше';
    } else if (newValue < oldValue) {
      errors[key] = `Нельзя уменьшать прогресс (минимум ${oldValue})`;
    }
  });

  return { isValid: Object.keys(errors).length === 0, errors };
}