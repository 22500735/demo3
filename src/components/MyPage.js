import React, { useState, useEffect } from 'react';
import { User, Heart, MessageSquare, Edit, Camera, LogOut } from 'lucide-react';
import './MyPage.css';

const MyPage = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userStats, setUserStats] = useState({});
  const [myPosts, setMyPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    const sampleStats = {
      posts: 23,
      likes: 156,
      comments: 89,
      followers: 45,
      following: 67,
      gpa: 3.85,
      credits: 84
    };

    const sampleMyPosts = [
      {
        id: 1,
        content: '今日のプログラミング授業、めっちゃ面白かった！🤖',
        likes: 12,
        comments: 5,
        time: '2時間前',
        category: '学業'
      },
      {
        id: 2,
        content: 'MacBook Pro売ります。詳細はDMで！',
        likes: 28,
        comments: 8,
        time: '1日前',
        category: '売買'
      }
    ];

    const sampleSavedPosts = [
      {
        id: 3,
        author: '山田花子',
        content: 'AI研究会のイベント情報です',
        likes: 45,
        comments: 12,
        time: '3時間前'
      }
    ];

    const sampleNotifications = [
      {
        id: 1,
        type: 'like',
        message: '田中太郎さんがあなたの投稿にいいねしました',
        time: '30分前',
        read: false
      },
      {
        id: 2,
        type: 'comment',
        message: '佐藤花子さんがコメントしました',
        time: '1時間前',
        read: false
      },
      {
        id: 3,
        type: 'follow',
        message: '鈴木次郎さんがフォローしました',
        time: '2時間前',
        read: true
      }
    ];

    setUserStats(sampleStats);
    setMyPosts(sampleMyPosts);
    setSavedPosts(sampleSavedPosts);
    setNotifications(sampleNotifications);
  }, []);

  const ProfileSection = () => (
    <div className="profile-section">
      <div className="profile-header">
        <div className="profile-avatar-container">
          <div className="profile-avatar">
            <span className="avatar-text">👤</span>
            <button className="avatar-edit-btn">
              <Camera size={16} />
            </button>
          </div>
        </div>
        
        <div className="profile-info">
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-username">{user.username}</p>
          <p className="profile-department">{user.department} {user.year}年</p>
          
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">{userStats.posts}</span>
              <span className="stat-label">投稿</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{userStats.followers}</span>
              <span className="stat-label">フォロワー</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{userStats.following}</span>
              <span className="stat-label">フォロー中</span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-actions">
        <button 
          className="btn btn-outline"
          onClick={() => setShowEditProfile(true)}
        >
          <Edit size={16} />
          プロフィール編集
        </button>
      </div>

      <div className="academic-info">
        <h3>📚 学業情報</h3>
        <div className="academic-stats">
          <div className="academic-item">
            <span className="academic-label">GPA</span>
            <span className="academic-value">{userStats.gpa}</span>
          </div>
          <div className="academic-item">
            <span className="academic-label">取得単位</span>
            <span className="academic-value">{userStats.credits}</span>
          </div>
        </div>
      </div>

      <div className="activity-summary">
        <h3>📊 活動サマリー</h3>
        <div className="activity-grid">
          <div className="activity-item">
            <Heart size={20} />
            <div className="activity-info">
              <span className="activity-number">{userStats.likes}</span>
              <span className="activity-label">もらったいいね</span>
            </div>
          </div>
          <div className="activity-item">
            <MessageSquare size={20} />
            <div className="activity-info">
              <span className="activity-number">{userStats.comments}</span>
              <span className="activity-label">コメント数</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MyPostsSection = () => (
    <div className="my-posts-section">
      <h3>📝 私の投稿</h3>
      <div className="posts-list">
        {myPosts.map(post => (
          <div key={post.id} className="post-item card">
            <div className="post-content">
              <p>{post.content}</p>
              <div className="post-meta">
                <span className="post-category badge badge-primary">{post.category}</span>
                <span className="post-time">{post.time}</span>
              </div>
            </div>
            <div className="post-stats">
              <span className="post-stat">
                <Heart size={14} />
                {post.likes}
              </span>
              <span className="post-stat">
                <MessageSquare size={14} />
                {post.comments}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SavedPostsSection = () => (
    <div className="saved-posts-section">
      <h3>🔖 保存した投稿</h3>
      <div className="posts-list">
        {savedPosts.map(post => (
          <div key={post.id} className="post-item card">
            <div className="post-header">
              <span className="post-author">{post.author}</span>
              <span className="post-time">{post.time}</span>
            </div>
            <div className="post-content">
              <p>{post.content}</p>
            </div>
            <div className="post-stats">
              <span className="post-stat">
                <Heart size={14} />
                {post.likes}
              </span>
              <span className="post-stat">
                <MessageSquare size={14} />
                {post.comments}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const NotificationsSection = () => (
    <div className="notifications-section">
      <h3>🔔 通知</h3>
      <div className="notifications-list">
        {notifications.map(notification => (
          <div key={notification.id} className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
            <div className="notification-icon">
              {notification.type === 'like' && <Heart size={16} />}
              {notification.type === 'comment' && <MessageSquare size={16} />}
              {notification.type === 'follow' && <User size={16} />}
            </div>
            <div className="notification-content">
              <p className="notification-message">{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
            {!notification.read && <div className="notification-dot"></div>}
          </div>
        ))}
      </div>
    </div>
  );

  const SettingsSection = () => (
    <div className="settings-section">
      <h3>⚙️ 設定</h3>
      <div className="settings-list">
        <div className="setting-group">
          <h4>プライバシー</h4>
          <div className="setting-item">
            <label className="setting-label">
              <input 
                type="checkbox" 
                checked={user.isAnonymous}
                onChange={(e) => setUser({...user, isAnonymous: e.target.checked})}
              />
              <span>匿名モードを有効にする</span>
            </label>
          </div>
          <div className="setting-item">
            <label className="setting-label">
              <input type="checkbox" defaultChecked />
              <span>プロフィールを公開する</span>
            </label>
          </div>
        </div>

        <div className="setting-group">
          <h4>通知設定</h4>
          <div className="setting-item">
            <label className="setting-label">
              <input type="checkbox" defaultChecked />
              <span>いいね通知</span>
            </label>
          </div>
          <div className="setting-item">
            <label className="setting-label">
              <input type="checkbox" defaultChecked />
              <span>コメント通知</span>
            </label>
          </div>
          <div className="setting-item">
            <label className="setting-label">
              <input type="checkbox" defaultChecked />
              <span>フォロー通知</span>
            </label>
          </div>
        </div>

        <div className="setting-group">
          <h4>表示設定</h4>
          <div className="setting-item">
            <label className="setting-label">
              <span>テーマ</span>
              <select className="setting-select">
                <option>ライト</option>
                <option>ダーク</option>
                <option>自動</option>
              </select>
            </label>
          </div>
          <div className="setting-item">
            <label className="setting-label">
              <span>言語</span>
              <select className="setting-select">
                <option>日本語</option>
                <option>한국어</option>
                <option>English</option>
              </select>
            </label>
          </div>
        </div>

        <div className="setting-group danger-zone">
          <h4>アカウント</h4>
          <button className="btn btn-outline danger">
            <LogOut size={16} />
            ログアウト
          </button>
        </div>
      </div>
    </div>
  );

  const EditProfileModal = () => (
    showEditProfile && (
      <div className="modal-overlay" onClick={() => setShowEditProfile(false)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>プロフィール編集</h3>
            <button className="close-btn" onClick={() => setShowEditProfile(false)}>×</button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">名前</label>
              <input 
                type="text" 
                className="form-input" 
                defaultValue={user.name}
              />
            </div>
            <div className="form-group">
              <label className="form-label">ユーザー名</label>
              <input 
                type="text" 
                className="form-input" 
                defaultValue={user.username}
              />
            </div>
            <div className="form-group">
              <label className="form-label">学部</label>
              <select className="form-input" defaultValue={user.department}>
                <option>工学部</option>
                <option>理学部</option>
                <option>文学部</option>
                <option>経済学部</option>
                <option>法学部</option>
                <option>医学部</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">学年</label>
              <select className="form-input" defaultValue={user.year}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">自己紹介</label>
              <textarea 
                className="form-textarea" 
                placeholder="自己紹介を入力してください..."
                rows="4"
              />
            </div>
            <button className="btn btn-primary">保存</button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="mypage">
      <div className="mypage-header">
        <h1 className="page-title">マイページ 👤</h1>
      </div>

      <div className="tab-container">
        <button 
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          プロフィール
        </button>
        <button 
          className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          投稿
        </button>
        <button 
          className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          保存済み
        </button>
        <button 
          className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          通知
        </button>
        <button 
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          設定
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'profile' && <ProfileSection />}
        {activeTab === 'posts' && <MyPostsSection />}
        {activeTab === 'saved' && <SavedPostsSection />}
        {activeTab === 'notifications' && <NotificationsSection />}
        {activeTab === 'settings' && <SettingsSection />}
      </div>

      <EditProfileModal />
    </div>
  );
};

export default MyPage;
