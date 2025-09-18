export function getTotalProgressNumber(taskName: string): number {
  const match = taskName.match(/\((\d+)/); // берём любое число после '('
  return match ? parseInt(match[1], 10) : 0;
}