import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

export const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      {/* Хедер с навигацией */}
      <header className="home-header">
        <div className="home-header__content">
          <div className="home-header__logo">
            <h1 className="home-header__title">SkyFitnessPro</h1>
            <p className="home-header__subtitle">Онлайн-тренировки для занятий дома</p>
          </div>
          <nav className="home-header__nav">
            <Link to="/login" className="home-header__login-btn">
              Войти
            </Link>
          </nav>
        </div>
      </header>

      {/* Герой-секция */}
      <section className="home-hero">
        <div className="home-hero__content">
          <div className="home-hero__text">
            <h2 className="home-hero__main">
              Начните заниматься спортом<br />
              и улучшите качество жизни
            </h2>
            <p className="home-hero__sub">
              Измени своё тело за полгода!
            </p>
          </div>
          
          {/* Карточка тренировки */}
          <div className="training-card">
            <img 
              src="/path/to/your/image.jpg" 
              alt="Силовая тренировка"
              className="training-card__image"
            />
            <div className="training-card__content">
              <h3 className="training-card__title">Силовая тренировка для занятий дома</h3>
              
              <div className="training-card__details">
                <div className="detail-item">
                  <span className="detail-icon">⏱</span>
                  <span>Время: 45 минут</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">⚡</span>
                  <span>Сложность: Средняя</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">🔥</span>
                  <span>Калории: 350-400</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">💪</span>
                  <span>Оборудование: Не требуется</span>
                </div>
              </div>
              
              <Link to="/courses" className="training-card__button">
                Начать тренировку
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};