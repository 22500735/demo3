import React, { useState, useEffect } from 'react';
import { Bell, X, Heart, MessageCircle, UserPlus, Calendar, MapPin } from 'lucide-react';
import './NotificationSystem.css';

const NotificationSystem = ({ user, darkMode }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showPanel, setShowPanel] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // 실시간 알림 시뮬레이션
  useEffect(() => {
    // WebSocket 연결 시뮬레이션
    const connectWebSocket = () => {
      setIsConnected(true);
      console.log('WebSocket 연결됨');
      
      // 실제 앱에서는 WebSocket 또는 Server-Sent Events 사용
      const interval = setInterval(() => {
        if (Math.random() > 0.7) { // 30% 확률로 새 알림
          addNotification(generateRandomNotification());
        }
      }, 10000); // 10초마다 체크

      return () => {
        clearInterval(interval);
        setIsConnected(false);
      };
    };

    const cleanup = connectWebSocket();
    return cleanup;
  }, []);

  const generateRandomNotification = () => {
    const types = [
      {
        type: 'like',
        icon: Heart,
        title: '좋아요',
        message: '山田花子님이 회원님의 게시물을 좋아합니다',
        color: '#ff6b6b',
        action: () => console.log('좋아요 알림 클릭')
      },
      {
        type: 'comment',
        icon: MessageCircle,
        title: '댓글',
        message: '田中太郎님이 회원님의 게시물에 댓글을 남겼습니다',
        color: '#4facfe',
        action: () => console.log('댓글 알림 클릭')
      },
      {
        type: 'follow',
        icon: UserPlus,
        title: '팔로우',
        message: '佐藤美咲님이 회원님을 팔로우하기 시작했습니다',
        color: '#2ecc71',
        action: () => console.log('팔로우 알림 클릭')
      },
      {
        type: 'event',
        icon: Calendar,
        title: '이벤트',
        message: '내일 오후 2시에 AI 스터디 모임이 있습니다',
        color: '#f39c12',
        action: () => console.log('이벤트 알림 클릭')
      },
      {
        type: 'location',
        icon: MapPin,
        title: '위치',
        message: '도서관 근처에 새로운 카페가 오픈했습니다',
        color: '#9b59b6',
        action: () => console.log('위치 알림 클릭')
      }
    ];

    const randomType = types[Math.floor(Math.random() * types.length)];
    return {
      id: Date.now(),
      ...randomType,
      timestamp: new Date(),
      read: false
    };
  };

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev.slice(0, 49)]); // 최대 50개 유지
    setUnreadCount(prev => prev + 1);
    
    // 브라우저 알림 (권한이 있는 경우)
    if (Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        badge: '/favicon.ico'
      });
    }

    // 진동 (모바일)
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, read: true }
          : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    setUnreadCount(0);
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    setUnreadCount(prev => {
      const deletedNotif = notifications.find(n => n.id === notificationId);
      return deletedNotif && !deletedNotif.read ? prev - 1 : prev;
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  // 브라우저 알림 권한 요청
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    return `${days}일 전`;
  };

  return (
    <>
      {/* 알림 버튼 */}
      <button 
        className={`notification-bell ${unreadCount > 0 ? 'has-unread' : ''}`}
        onClick={() => setShowPanel(!showPanel)}
        aria-label={`알림 ${unreadCount}개`}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="notification-badge">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
        <div className={`connection-indicator ${isConnected ? 'connected' : 'disconnected'}`} />
      </button>

      {/* 알림 패널 */}
      {showPanel && (
        <div className="notification-overlay" onClick={() => setShowPanel(false)}>
          <div 
            className={`notification-panel ${darkMode ? 'dark' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="notification-header">
              <h3>알림</h3>
              <div className="notification-actions">
                {unreadCount > 0 && (
                  <button 
                    className="mark-all-read-btn"
                    onClick={markAllAsRead}
                  >
                    모두 읽음
                  </button>
                )}
                <button 
                  className="clear-all-btn"
                  onClick={clearAllNotifications}
                >
                  모두 삭제
                </button>
                <button 
                  className="close-btn"
                  onClick={() => setShowPanel(false)}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="notification-list">
              {notifications.length === 0 ? (
                <div className="no-notifications">
                  <Bell size={48} />
                  <p>새로운 알림이 없습니다</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <div 
                      key={notification.id}
                      className={`notification-item ${!notification.read ? 'unread' : ''}`}
                      onClick={() => {
                        if (!notification.read) {
                          markAsRead(notification.id);
                        }
                        notification.action();
                      }}
                    >
                      <div 
                        className="notification-icon"
                        style={{ backgroundColor: notification.color }}
                      >
                        <IconComponent size={16} />
                      </div>
                      <div className="notification-content">
                        <div className="notification-title">{notification.title}</div>
                        <div className="notification-message">{notification.message}</div>
                        <div className="notification-time">
                          {formatTimeAgo(notification.timestamp)}
                        </div>
                      </div>
                      <button 
                        className="delete-notification-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            <div className="notification-footer">
              <div className="connection-status">
                <div className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`} />
                {isConnected ? '실시간 연결됨' : '연결 끊김'}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationSystem;
