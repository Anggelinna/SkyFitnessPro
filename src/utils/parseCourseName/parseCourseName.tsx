type CourseInfo = {
  title: string | null;
  subtitle: string | null;
  day: string | null;
  author: string | null;
};
export function parseCourseName(name: string): CourseInfo {
  const parts = name.split(' / ').map((p) => p.trim());

  return {
    title: parts[0] || null,
    subtitle: parts[1] || null,
    day: parts[2] || null,
    author: parts[3] || null,
  };
}