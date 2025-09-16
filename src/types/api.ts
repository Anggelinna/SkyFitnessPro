export interface User {
  email: string;
  selectedCourses: string[];
}

export interface Course {
  _id: string;
  nameRU: string;
  nameEN: string;
  description: string;
  directions: string[];
  fitting: string[];
  difficulty: string;
  durationInDays: number;
  dailyDurationInMinutes: {
    from: number;
    to: number;
  };
  workouts: string[];
  // UI поля
  progress?: number;
  isAdded?: boolean;
  max?: number;
}

export interface Workout {
  _id: string;
  name: string;
  video: string;
  exercises?: Exercise[];
  // UI поля
  courseName?: string;
  day?: number;
  max?: number;
  progress?: number;
}

export interface Exercise {
  _id: string;
  name: string;
  quantity: number;
  progress?: number;
}

export interface AuthResponse {
  token: string;
}

export interface ProgressData {
  courseId: string;
  courseCompleted: boolean;
  workoutsProgress: WorkoutProgress[];
}

export interface WorkoutProgress {
  workoutId: string;
  workoutCompleted: boolean;
  progressData: number[];
}

export interface MessageResponse {
  message: string;
}