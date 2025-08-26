import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare, Calendar, ShoppingBag, MapPin, User } from 'lucide-react';
import './Navigation.css';

const Navigation = ({ currentTab }) => {
  const location = useLocation();
  
  const navItems = [
    { id: 'home', path: '/', icon: Home, label: 'ホーム', labelKr: '홈' },
    { id: 'board', path: '/board', icon: MessageSquare, label: '掲示板', labelKr: '게시판' },
    { id: 'timetable', path: '/timetable', icon: Calendar, label: '時間割', labelKr: '시간표' },
    { id: 'marketplace', path: '/marketplace', icon: ShoppingBag, label: 'マーケット', labelKr: '마켓' },
    { id: 'map', path: '/map', icon: MapPin, label: 'マップ', labelKr: '지도' },
    { id: 'mypage', path: '/mypage', icon: User, label: 'マイページ', labelKr: '마이페이지' }
  ];

  return (
    <nav className="bottom-navigation">
      <div className="nav-container">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="nav-icon">
                <Icon size={20} />
              </div>
              <span className="nav-label">{item.label}</span>
              <span className="nav-label-kr">{item.labelKr}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
