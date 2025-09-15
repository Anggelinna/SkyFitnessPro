import React, { useState, useEffect } from 'react';
import { CourseList } from '../../components/courses/CourseList/CourseList';
import { ScrollToTop } from '../../components/common/ScrollToTop/ScrollToTop';
import { Course } from '../../types';
import { coursesAPI } from '../../services/api';
import './CoursesPage.css';

export const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      
      // Моковые данные для демонстрации
      const mockCourses: Course[] = [
        {
          id: '1',
          name: 'yoga-beginners',
          nameRU: 'Йога для начинающих',
          durationInDays: 25,
          dailyDurationInMinutes: { from: 20, to: 50 },
          difficulty: 'Начинающий' as const,
          category: 'йога'
        },
        {
          id: '2',
          name: 'stretching-flexibility',
          nameRU: 'Стретчинг на гибкость',
          durationInDays: 25,
          dailyDurationInMinutes: { from: 20, to: 50 },
          difficulty: 'Средний' as const,
          category: 'стретчинг'
        },
        {
          id: '3',
          name: 'fitness-strength',
          nameRU: 'Фитнес на силу',
          durationInDays: 25,
          dailyDurationInMinutes: { from: 20, to: 50 },
          difficulty: 'Продвинутый' as const,
          category: 'фитнес'
        },
        {
          id: '4',
          name: 'bodyflex-breathing',
          nameRU: 'Бодифлекс дыхание',
          durationInDays: 25,
          dailyDurationInMinutes: { from: 20, to: 50 },
          difficulty: 'Начинающий' as const,
          category: 'бодифлекс'
        }
      ];
      
      setCourses(mockCourses);
      
      // Когда бэкенд будет готов, замените на:
      // const response = await coursesAPI.getCourses();
      // setCourses(response.data);
      
    } catch (err) {
      setError('Не удалось загрузить курсы. Попробуйте обновить страницу.');
      console.error('Ошибка загрузки курсов:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseSelect = (courseId: string) => {
    console.log('Выбран курс:', courseId);
    // Здесь будет логика добавления курса пользователю
    alert(`Курс "${courses.find(c => c.id === courseId)?.nameRU}" добавлен!`);
  };

  if (loading) {
    return (
      <div className="courses-page">
        <div className="loading">Загрузка курсов...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="courses-page">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="courses-page">
      <header className="courses-header">
       <h1>Наши фитнес-курсы</h1>
        <p>Выберите подходящую программу тренировок для ваших целей</p>
      </header>
      
      <CourseList courses={courses} onCourseSelect={handleCourseSelect} />
      <ScrollToTop />
    </div>
  );
};