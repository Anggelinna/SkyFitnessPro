export type Course = {
  dailyDurationInMinutes: { from: number; to: number };
  _id: string;
  description: string;
  directions: string[];
  fitting: string[];
  nameEN: string;
  nameRU: string;
  order: number;
  difficulty: string;
  durationInDays: number;
  workouts: string[];
  __v: number;
};

export type Exercise = {
  _id: string;
  name: string;
  quantity: number;
};

export type WorkOutLesson = {
  _id: string;
  name: string;
  video: string;
  exercises: Exercise[];
};

export type ProgressData = number[];

export type WorkOutsProgress = {
  workoutId: string;
  workoutCompleted: boolean;
  progressData: ProgressData;
  _id: string;
};

export type ExtendedWorkOutsProgress =
  | (WorkOutsProgress & {
      IsNotProgressData: false;
    })
  | (WorkOutsProgress & {
      IsNotProgressData: true;
      IsNotProgressDataDone: boolean;
    });

export type CourseProgress = {
  courseId: string;
  courseCompleted: boolean;
  workoutsProgress: WorkOutsProgress[];
  _id: string;
};

export type SelectedCourses = string[];

export type AllUsersData = {
  courseProgress: CourseProgress[];
  email: string;
  selectedCourses: SelectedCourses;
  createdAt: string;
  password: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

export type UserData = {
  user: AllUsersData;
};