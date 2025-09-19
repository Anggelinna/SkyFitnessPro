import { useContext } from 'react';
import { CourseContext } from '../context/CourseContext';

export function useProgressCourse(courseId: string) { 
    const courseContext = useContext(CourseContext);

    if (!courseContext) return null;
    const { courseProgress } = courseContext;

    const workoutsProgress = courseProgress?.workoutsProgress ?? [];
    const isLessonCompleted = (lessonId: string) =>
        workoutsProgress.some(
            (w) => w.workoutId === lessonId && w.workoutCompleted
        );
    
    return { workoutsProgress, isLessonCompleted };
}