import React, { useState, useEffect } from 'react';
import { Bell, X, Check } from 'lucide-react';
import './PushNotifications.css';

const PushNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [permission, setPermission] = useState('default');

  useEffect(() => {
    // Check if browser supports notifications
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    // Simulate receiving notifications
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        addNotification();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
    }
  };

  const addNotification = () => {
    const messages = [
      { title: '新しいいいね！', body: '山田さんがあなたの投稿にいいねしました', icon: '❤️' },
      { title: '新しいコメント', body: '佐藤さんがコメントしました', icon: '💬' },
      { title: '授業リマインダー', body: '15分後に線形代数学の授業があります', icon: '📚' },
      { title: 'サークル通知', body: 'AI研究会の新しい投稿があります', icon: '🤖' },
      { title: 'マーケット', body: '気になる商品の価格が下がりました', icon: '🛒' }
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const newNotification = {
      id: Date.now(),
      ...randomMessage,
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);

    // Show browser notification if permission granted
    if (permission === 'granted') {
      new Notification(randomMessage.title, {
        body: randomMessage.body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'cammunity-notification'
      });
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="push-notifications">
      {permission === 'default' && (
        <div className="notification-permission">
          <button className="permission-btn" onClick={requestPermission}>
            <Bell size={16} />
            通知を有効にする
          </button>
        </div>
      )}

      {notifications.length > 0 && (
        <div className="notifications-container">
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification-toast ${notification.read ? 'read' : 'unread'}`}
            >
              <div className="notification-icon">{notification.icon}</div>
              <div className="notification-content">
                <div className="notification-title">{notification.title}</div>
                <div className="notification-body">{notification.body}</div>
                <div className="notification-time">
                  {notification.timestamp.toLocaleTimeString('ja-JP', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
              <div className="notification-actions">
                {!notification.read && (
                  <button 
                    className="action-btn read-btn"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <Check size={14} />
                  </button>
                )}
                <button 
                  className="action-btn close-btn"
                  onClick={() => removeNotification(notification.id)}
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {unreadCount > 0 && (
        <div className="notification-badge">
          {unreadCount}
        </div>
      )}
    </div>
  );
};

export default PushNotifications;
