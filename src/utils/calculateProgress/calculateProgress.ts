/**
 * Вычисляет процент выполнения упражнения.
 * @param done - количество выполненных повторений
 * @param total - общее количество повторений
 * @returns процент выполнения, округлённый до целого числа, максимум 100%
 */
export function calculateProgress(done: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(Math.round((done / total) * 100), 100);
}