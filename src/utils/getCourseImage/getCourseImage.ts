export function getCourseImage(str: string): string {
  return str.trim().toLowerCase().replace(/\s+/g, ' ');
}