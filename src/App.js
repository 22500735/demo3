import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import MainFeed from './components/MainFeed';
import Board from './components/Board';
import Timetable from './components/Timetable';
import Marketplace from './components/Marketplace';
import Map from './components/Map';
import MyPage from './components/MyPage';
import SeasonalTheme from './components/SeasonalTheme';
import JapaneseMascot from './components/JapaneseMascot';
import PushNotifications from './components/PushNotifications';
import OfflineSupport from './components/OfflineSupport';
import './App.css';

function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [user, setUser] = useState({
    id: 1,
    name: '田中太郎',
    username: '@tanaka_taro',
    avatar: '👤',
    department: '工学部',
    year: 3,
    isAnonymous: false
  });
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setCurrentTab('home');
    else if (path === '/board') setCurrentTab('board');
    else if (path === '/timetable') setCurrentTab('timetable');
    else if (path === '/marketplace') setCurrentTab('marketplace');
    else if (path === '/map') setCurrentTab('map');
    else if (path === '/mypage') setCurrentTab('mypage');
  }, [location]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <SeasonalTheme>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <div className="app-container">
          {/* Dark Mode Toggle */}
          <button 
            className="dark-mode-toggle"
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<MainFeed user={user} setUser={setUser} darkMode={darkMode} />} />
              <Route path="/board" element={<Board user={user} darkMode={darkMode} />} />
              <Route path="/timetable" element={<Timetable user={user} darkMode={darkMode} />} />
              <Route path="/marketplace" element={<Marketplace user={user} darkMode={darkMode} />} />
              <Route path="/map" element={<Map user={user} darkMode={darkMode} />} />
              <Route path="/mypage" element={<MyPage user={user} setUser={setUser} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
            </Routes>
          </main>
          <Navigation currentTab={currentTab} darkMode={darkMode} />
          <JapaneseMascot mood="happy" size="medium" position="floating" />
          <PushNotifications />
          <OfflineSupport />
        </div>
      </div>
    </SeasonalTheme>
  );
}

export default App;
