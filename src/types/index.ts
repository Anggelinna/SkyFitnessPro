export interface Course {
  id: string;
  name: string;
  nameRU: string;
  durationInDays: number;
  dailyDurationInMinutes: {
    from: number;
    to: number;
  };
  difficulty: 'Начинающий' | 'Средний' | 'Продвинутый';
  category: string;
  image?: string;
}

export interface User {
  id: string;
  email: string;
  selectedCourses: string[];
}

export interface AuthCredentials {
  email: string;
  password: string;
}