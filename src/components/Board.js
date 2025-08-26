import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Bookmark, Plus, Users, TrendingUp, Calendar, MapPin, Search, X, Filter, MessageSquare } from 'lucide-react';
import SkeletonLoader from './SkeletonLoader';
import './Board.css';

const Board = ({ user }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [boards, setBoards] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [followedClubs, setFollowedClubs] = useState(['프로그래밍동아리', 'AI연구회']);
  const [loading, setLoading] = useState(true);
  const [boardsLoading, setBoardsLoading] = useState(false);
  const [followAnimations, setFollowAnimations] = useState({});

  useEffect(() => {
    const sampleBoards = [
      {
        id: 1,
        name: '自由掲示板',
        description: '自由に話し合える場所',
        icon: '💬',
        posts: 1234,
        members: 5678,
        isClub: false,
        category: 'general'
      },
      {
        id: 2,
        name: '学業相談',
        description: '勉強や授業について',
        icon: '📚',
        posts: 856,
        members: 3421,
        isClub: false,
        category: 'academic'
      },
      {
        id: 3,
        name: '就職活動',
        description: '就活情報交換',
        icon: '💼',
        posts: 642,
        members: 2890,
        isClub: false,
        category: 'career'
      },
      {
        id: 4,
        name: '恋愛相談',
        description: '恋愛について語ろう',
        icon: '💕',
        posts: 423,
        members: 1567,
        isClub: false,
        category: 'romance'
      },
      {
        id: 5,
        name: 'フリーマーケット',
        description: '売買・交換の場',
        icon: '🛒',
        posts: 789,
        members: 4123,
        isClub: false,
        category: 'market'
      }
    ];

    const sampleClubs = [
      {
        id: 101,
        name: 'バスケットボール部',
        description: '一緒にバスケを楽しもう！',
        icon: '🏀',
        posts: 234,
        members: 45,
        isClub: true,
        category: 'sports',
        followers: 156
      },
      {
        id: 102,
        name: '軽音楽部',
        description: 'バンド活動・音楽好き集まれ',
        icon: '🎵',
        posts: 189,
        members: 32,
        isClub: true,
        category: 'culture',
        followers: 203
      },
      {
        id: 103,
        name: 'AI研究会',
        description: '人工知能について研究',
        icon: '🤖',
        posts: 156,
        members: 28,
        isClub: true,
        category: 'academic',
        followers: 89
      },
      {
        id: 104,
        name: '料理サークル',
        description: 'みんなで料理を作ろう',
        icon: '🍳',
        posts: 98,
        members: 24,
        isClub: true,
        category: 'culture',
        followers: 67
      }
    ];

    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setBoards(sampleBoards);
      setClubs(sampleClubs);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (activeCategory !== 'all') {
      setBoardsLoading(true);
      const timer = setTimeout(() => {
        setBoardsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [activeCategory]);

  const categories = [
    { id: 'all', name: 'すべて', icon: '📋' },
    { id: 'general', name: '自由', icon: '💬' },
    { id: 'academic', name: '学業', icon: '📚' },
    { id: 'career', name: '就職', icon: '💼' },
    { id: 'romance', name: '恋愛', icon: '💕' },
    { id: 'sports', name: 'スポーツ', icon: '⚽' },
    { id: 'culture', name: '文化', icon: '🎨' },
    { id: 'market', name: '売買', icon: '🛒' }
  ];

  const handleFollow = (clubName) => {
    const isFollowing = followedClubs.includes(clubName);
    
    // 애니메이션 트리거
    setFollowAnimations(prev => ({
      ...prev,
      [clubName]: {
        type: isFollowing ? 'unfollow' : 'follow',
        timestamp: Date.now()
      }
    }));
    
    // 팔로우 상태 업데이트
    if (isFollowing) {
      setFollowedClubs(followedClubs.filter(name => name !== clubName));
    } else {
      setFollowedClubs([...followedClubs, clubName]);
    }
    
    // 애니메이션 정리 (3초 후)
    setTimeout(() => {
      setFollowAnimations(prev => {
        const newAnimations = { ...prev };
        delete newAnimations[clubName];
        return newAnimations;
      });
    }, 3000);
  };

  const filteredBoards = boards.filter(board => 
    (activeCategory === 'all' || board.category === activeCategory) &&
    board.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredClubs = clubs.filter(club => 
    (activeCategory === 'all' || club.category === activeCategory) &&
    club.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const BoardCard = ({ board }) => (
    <div className="board-card card japanese-card fade-in">
      <div className="board-header">
        <div className="board-icon">{board.icon}</div>
        <div className="board-info">
          <h3 className="board-name">{board.name}</h3>
          <p className="board-description">{board.description}</p>
          <div className="board-stats">
            <span className="stat">
              <MessageSquare size={14} />
              {board.posts}投稿
            </span>
            <span className="stat">
              <Users size={14} />
              {board.members}人
            </span>
          </div>
        </div>
      </div>
      <div className="board-actions">
        <button className="btn btn-outline btn-small">参加する</button>
        <button className="btn btn-primary btn-small">投稿を見る</button>
      </div>
    </div>
  );

  const ClubCard = ({ club }) => (
    <div className="club-card card japanese-card fade-in">
      <div className="club-header">
        <div className="club-icon">{club.icon}</div>
        <div className="club-info">
          <h3 className="club-name">{club.name}</h3>
          <p className="club-description">{club.description}</p>
          <div className="club-stats">
            <span className="stat">
              <MessageSquare size={14} />
              {club.posts}投稿
            </span>
            <span className="stat">
              <Users size={14} />
              {club.members}メンバー
            </span>
            <span className="stat">
              <TrendingUp size={14} />
              {club.followers}フォロワー
            </span>
          </div>
        </div>
      </div>
      <div className="club-actions">
        <button 
          className={`follow-btn ${followedClubs.includes(club.name) ? 'following' : ''} ${
            followAnimations[club.name] ? `animating ${followAnimations[club.name].type}` : ''
          }`}
          onClick={() => handleFollow(club.name)}
        >
          <span className="follow-text">
            {followedClubs.includes(club.name) ? 'フォロー中' : 'フォロー'}
          </span>
          <span className="follow-icon">
            {followedClubs.includes(club.name) ? '✓' : '+'}
          </span>
          {followAnimations[club.name] && (
            <div className="follow-animation-overlay">
              {followAnimations[club.name].type === 'follow' ? (
                <div className="follow-success">
                  <span className="success-icon">❤️</span>
                  <span className="success-text">フォロー完了!</span>
                </div>
              ) : (
                <div className="unfollow-success">
                  <span className="success-icon">👋</span>
                  <span className="success-text">フォロー解除</span>
                </div>
              )}
            </div>
          )}
        </button>
        <button className="btn btn-primary btn-small">詳細を見る</button>
      </div>
    </div>
  );

  const CreatePostModal = () => (
    showCreateModal && (
      <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>新しい投稿を作成</h3>
            <button className="close-btn" onClick={() => setShowCreateModal(false)}>×</button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">掲示板を選択</label>
              <select className="form-input">
                <option>掲示板を選択してください</option>
                {boards.map(board => (
                  <option key={board.id} value={board.id}>
                    {board.icon} {board.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">タイトル</label>
              <input type="text" className="form-input" placeholder="投稿のタイトル" />
            </div>
            <div className="form-group">
              <label className="form-label">内容</label>
              <textarea 
                className="form-textarea" 
                placeholder="投稿内容を入力してください..."
                rows="6"
              />
            </div>
            <div className="form-group">
              <label>
                <input type="checkbox" />
                匿名で投稿する
              </label>
            </div>
            <button className="btn btn-primary">投稿する</button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="board">
      <div className="board-header-section">
        <h1 className="page-title">掲示板 📋</h1>
        <p className="page-subtitle">コミュニティで情報交換しよう</p>
      </div>

      <div className="search-bar">
        <Search size={16} />
        <input 
          type="text"
          className="search-input"
          placeholder="掲示板・サークルを検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="filter-btn">
          <Filter size={16} />
        </button>
      </div>

      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>

      <div className="popular-section">
        <h2 className="section-title">🔥 人気の投稿</h2>
        <div className="popular-posts">
          <div className="popular-post">
            <span className="post-title">春休みの計画について</span>
            <span className="post-stats">👍 45 💬 23</span>
          </div>
          <div className="popular-post">
            <span className="post-title">新学期のサークル募集</span>
            <span className="post-stats">👍 38 💬 19</span>
          </div>
          <div className="popular-post">
            <span className="post-title">おすすめの参考書</span>
            <span className="post-stats">👍 32 💬 15</span>
          </div>
        </div>
      </div>

      <div className="boards-section">
        <h2 className="section-title">📋 掲示板</h2>
        <div className="boards-grid">
          {filteredBoards.map(board => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      </div>

      <div className="clubs-section">
        <h2 className="section-title">🎯 サークル・部活</h2>
        <div className="clubs-grid">
          {filteredClubs.map(club => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </div>

      <button className="fab" onClick={() => setShowCreateModal(true)}>
        <Plus size={24} />
      </button>

      <CreatePostModal />
    </div>
  );
};

export default Board;
