import WorkOutForm from '../components/WorkOutForm/WorkOutForm';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';
import { CourseContext } from '../context/CourseContext';
import { useContext, useEffect } from 'react';

function WorkOutFormPage() {
  const { courseId } = useParams();
  const courseContext = useContext(CourseContext);

  if (!courseContext) return null;

  const {
    workouts,
    loadingWorkouts,
    getWorkoutsList,
    courseProgress,
    getCourseProgressById,
  } = courseContext;

  useEffect(() => {
    if (courseId) {
      getWorkoutsList(courseId);
    }
  }, [courseId, getWorkoutsList]);

  useEffect(() => {
    if (courseId) {
      getCourseProgressById(courseId);
    }
  }, [courseId, getCourseProgressById]);

  return loadingWorkouts ? (
    <Spinner />
  ) : (
    <WorkOutForm
      workouts={workouts}
      courseId={courseId}
      courseProgress={courseProgress}
    />
  );
}

export default WorkOutFormPage;