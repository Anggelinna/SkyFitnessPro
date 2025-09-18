export function getExerciseQuestion(text: string): string {
  const formatExercise = (str: string) => {
    let cleaned = str.replace(/\(.*?\)/g, '').trim();
    return cleaned;
  };

  return `Сколько раз вы сделали упражнение "${formatExercise(text)}"?`;
}