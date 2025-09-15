import React from 'react';
import { Course } from '../../../types';
import './CourseCard.css';

// Импортируем изображения
import yogaImage from '../../../assets/images/yoga.jpg';
import stretchingImage from '../../../assets/images/stretching.jpg';
import fitnessImage from '../../../assets/images/fitness.jpg';
import bodyflexImage from '../../../assets/images/bodyflex.jpg';
import defaultImage from '../../../assets/images/default-course.jpg';

interface CourseCardProps {
  course: Course;
  onSelect: (courseId: string) => void;
}

// Маппинг категорий к изображениям
const categoryImages: { [key: string]: string } = {
  'йога': yogaImage,
  'стретчинг': stretchingImage,
  'фитнес': fitnessImage,
  'бодифлекс': bodyflexImage,
};

export const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect }) => {
  const getCourseImage = () => {
    const category = course.category.toLowerCase();
    return categoryImages[category] || defaultImage;
  };

  const getCategoryDisplayName = (category: string) => {
    const names: { [key: string]: string } = {
      'йога': 'Йога',
      'стретчинг': 'Стретчинг',
      'фитнес': 'Фитнес',
      'бодифлекс': 'Бодифлекс'
    };
    return names[category.toLowerCase()] || category;
  };

  return (
    <div className="course-card">
      <div className="course-card__image">
        <img 
          src={getCourseImage()} 
          alt={course.nameRU}
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultImage;
          }}
        />
      </div>
      <div className="course-card__content">
        <h3 className="course-card__title">{getCategoryDisplayName(course.category)}</h3>
        <div className="course-card__meta">
          <div>📅 {course.durationInDays} дней</div>
          <div>
            ⏱️ {course.dailyDurationInMinutes.from}-
            {course.dailyDurationInMinutes.to} мин/день
          </div>
        </div>
        <span 
          className="course-card__difficulty"
          data-difficulty={course.difficulty}
        >
          {course.difficulty}
        </span>
        <button
          className="button button--primary course-card__button"
          onClick={() => onSelect(course.id)}
        >
          Выбрать курс
        </button>
      </div>
    </div>
  );
};