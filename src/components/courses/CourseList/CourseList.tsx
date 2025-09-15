import React from 'react';
import { Course } from '../../../types';
import { CourseCard } from '../CourseCard/CourseCard';
import './CourseList.css';

interface CourseListProps {
  courses: Course[];
  onCourseSelect: (courseId: string) => void;
}

export const CourseList: React.FC<CourseListProps> = ({ courses, onCourseSelect }) => {
  return (
    <div className="course-list">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onSelect={onCourseSelect}
        />
      ))}
    </div>
  );
};