import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CoursesPage } from './pages/CoursesPage/CoursesPage';
import { AuthPage } from './pages/AuthPage/AuthPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CoursesPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;