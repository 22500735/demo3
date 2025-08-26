import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Bookmark, Plus, Search, Menu, Bell, MoreHorizontal, Copy, Eye, Flag, Share, ChevronLeft, ChevronRight } from 'lucide-react';
import NotificationSystem from './NotificationSystem';
import GlobalSearch from './GlobalSearch';
import SwipeableContainer from './SwipeableContainer';
import './MainFeed.css';

const sampleData = {
  posts: [
    {
      id: 1,
      author: '山田花子',
      username: '@yamada_hanako',
      isAnonymous: false,
      time: '2時間前',
      content: '今日の授業めっちゃ面白かった！AI について学んだよ 🤖✨\n\n#東京大学 #AI #授業',
      likes: 24,
      comments: 8,
      shares: 3,
      isLiked: false,
      isBookmarked: false,
      category: '学業',
      board: '自由掲示板',
      images: ['https://via.placeholder.com/300x200/4facfe/white?text=AI+Class'],
      circles: ['AI研究会', 'プログラミング部'],
      price: null
    },
    {
      id: 2,
      author: '匿名ユーザー',
      username: null,
      isAnonymous: true,
      time: '4時間前',
      content: '誰か一緒にカフェで勉強しませんか？☕📚\n場所：渋谷のスタバ\n時間：明日14:00〜',
      likes: 12,
      comments: 15,
      shares: 2,
      isLiked: true,
      isBookmarked: true,
      category: '交流',
      board: '自由掲示板',
      images: [],
      circles: [],
      price: null
    },
    {
      id: 3,
      author: '佐藤太郎',
      username: '@sato_taro',
      isAnonymous: false,
      time: '6時間前',
      content: 'MacBook Pro 売ります！\n2021年モデル、M1チップ\n使用期間：1年\n付属品完備 💻',
      likes: 45,
      comments: 23,
      shares: 8,
      isLiked: false,
      isBookmarked: false,
      category: '売買',
      board: 'フリーマーケット',
      images: ['https://via.placeholder.com/300x200/333/white?text=MacBook+Pro'],
      circles: [],
      price: '¥180,000'
    }
  ]
};

const MainFeed = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [posts, setPosts] = useState(sampleData.posts);
  const [newPost, setNewPost] = useState({ content: '', images: [], isAnonymous: false });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [pullToRefresh, setPullToRefresh] = useState({ pulling: false, distance: 0, triggered: false });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [longPressMenu, setLongPressMenu] = useState({ visible: false, x: 0, y: 0, postId: null });
  const [longPressTimer, setLongPressTimer] = useState(null);
  const [focusedPostIndex, setFocusedPostIndex] = useState(-1);
  const [keyboardNavActive, setKeyboardNavActive] = useState(false);
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const samplePosts = [
      {
        id: 1,
        author: '山田花子',
        username: '@yamada_hanako',
        isAnonymous: false,
        time: '2時間前',
        content: '今日の授業めっちゃ面白かった！AI について学んだよ 🤖✨\n\n#東京大学 #AI #授業',
        likes: 24,
        comments: 8,
        shares: 3,
        isLiked: false,
        isBookmarked: false,
        category: '学業',
        board: '自由掲示板',
        images: ['https://via.placeholder.com/300x200/4facfe/white?text=AI+Class'],
        circles: ['AI研究会', 'プログラミング部'],
        price: null
      },
      {
        id: 2,
        author: '匿名ユーザー',
        username: null,
        isAnonymous: true,
        time: '4時間前',
        content: '誰か一緒にカフェで勉強しませんか？☕📚\n場所：渋谷のスタバ\n時間：明日14:00〜',
        likes: 12,
        comments: 15,
        shares: 2,
        isLiked: true,
        isBookmarked: true,
        category: '交流',
        board: '自由掲示板',
        images: [],
        circles: [],
        price: null
      },
      {
        id: 3,
        author: '佐藤太郎',
        username: '@sato_taro',
        isAnonymous: false,
        time: '6時間前',
        content: 'MacBook Pro 売ります！\n2021年モデル、M1チップ\n使用期間：1年\n付属品完備 💻',
        likes: 45,
        comments: 23,
        shares: 8,
        isLiked: false,
        isBookmarked: false,
        category: '売買',
        board: 'フリーマーケット',
        images: ['https://via.placeholder.com/300x200/333/white?text=MacBook+Pro'],
        circles: [],
        price: '¥180,000'
      }
    ];
    setPosts(samplePosts);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      setTouchStartX(e.touches[0].clientX);
      setTouchStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (window.scrollY === 0 && !pullToRefresh.triggered) {
      const touchY = e.touches[0].clientY;
      const distance = touchY - touchStartY;
      
      if (distance > 0 && distance < 120) {
        e.preventDefault();
        setPullToRefresh({
          pulling: true,
          distance: Math.min(distance, 100),
          triggered: distance > 80
        });
      }
    }
  };

  const handleTouchEnd = () => {
    if (pullToRefresh.triggered && !isRefreshing) {
      setIsRefreshing(true);
      refreshFeed();
    }
    setPullToRefresh({ pulling: false, distance: 0, triggered: false });
  };

  const refreshFeed = async () => {
    // 새로운 게시물 로드 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 실제 앱에서는 API 호출로 새 데이터 가져오기
    const newPost = {
      id: Date.now(),
      author: {
        name: '새로운 사용자',
        username: '@new_user',
        avatar: '🆕'
      },
      content: '새로 고침으로 추가된 게시물입니다! 🎉',
      timestamp: '방금 전',
      likes: 0,
      comments: 0,
      bookmarks: 0,
      images: [],
      isLiked: false,
      isBookmarked: false
    };
    
    setPosts(prev => [newPost, ...prev]);
    setIsRefreshing(false);
  };

  const handleLongPressStart = (e, postId) => {
    const timer = setTimeout(() => {
      const rect = e.currentTarget.getBoundingClientRect();
      setLongPressMenu({
        visible: true,
        x: e.touches ? e.touches[0].clientX : e.clientX,
        y: e.touches ? e.touches[0].clientY : e.clientY,
        postId: postId
      });
    }, 500); // 500ms long press
    
    setLongPressTimer(timer);
  };

  const handleLongPressEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleContextMenuAction = (action, postId) => {
    switch (action) {
      case 'share':
        navigator.share ? 
          navigator.share({ title: 'Cammunity 게시물', url: window.location.href }) :
          alert('공유 기능이 지원되지 않는 브라우저입니다.');
        break;
      case 'report':
        alert('신고가 접수되었습니다.');
        break;
      case 'hide':
        setPosts(prev => prev.filter(post => post.id !== postId));
        break;
      case 'copy':
        const post = posts.find(p => p.id === postId);
        if (post) {
          navigator.clipboard.writeText(post.content);
          alert('텍스트가 복사되었습니다.');
        }
        break;
      default:
        break;
    }
    setLongPressMenu({ visible: false, x: 0, y: 0, postId: null });
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setLongPressMenu({ visible: false, x: 0, y: 0, postId: null });
    };
    
    if (longPressMenu.visible) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [longPressMenu.visible]);

  const handlePostAction = (postId, action) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        switch (action) {
          case 'like':
            return { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked };
          case 'bookmark':
            return { ...post, isBookmarked: !post.isBookmarked };
          default:
            return post;
        }
      }
      return post;
    }));
  };

  // Prevent context menu on right click for better UX
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Skip if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key) {
        case 'j': // Next post
        case 'ArrowDown':
          e.preventDefault();
          setKeyboardNavActive(true);
          setFocusedPostIndex(prev => {
            const newIndex = Math.min(prev + 1, posts.length - 1);
            scrollToPost(newIndex);
            return newIndex;
          });
          break;
        case 'k': // Previous post
        case 'ArrowUp':
          e.preventDefault();
          setKeyboardNavActive(true);
          setFocusedPostIndex(prev => {
            const newIndex = Math.max(prev - 1, 0);
            scrollToPost(newIndex);
            return newIndex;
          });
          break;
        case 'l': // Like post
          e.preventDefault();
          if (focusedPostIndex >= 0 && posts[focusedPostIndex]) {
            handlePostAction(posts[focusedPostIndex].id, 'like');
          }
          break;
        case 'b': // Bookmark post
          e.preventDefault();
          if (focusedPostIndex >= 0 && posts[focusedPostIndex]) {
            handlePostAction(posts[focusedPostIndex].id, 'bookmark');
          }
          break;
        case 's': // Toggle search
          e.preventDefault();
          setShowGlobalSearch(true);
          break;
        case 'm': // Toggle sidebar menu
          e.preventDefault();
          setSidebarOpen(!sidebarOpen);
          break;
        case 'Escape': // Close modals/menus
          e.preventDefault();
          setSidebarOpen(false);
          setSearchVisible(false);
          setShowGlobalSearch(false);
          setLongPressMenu({ visible: false, x: 0, y: 0, postId: null });
          setKeyboardNavActive(false);
          setFocusedPostIndex(-1);
          break;
        case '?': // Show keyboard shortcuts help
          e.preventDefault();
          showKeyboardHelp();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [posts, focusedPostIndex, searchVisible, sidebarOpen]);

  const scrollToPost = (index) => {
    const postElements = document.querySelectorAll('.post-card');
    if (postElements[index]) {
      postElements[index].scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  };

  const showKeyboardHelp = () => {
    alert(`키보드 단축키:\n\nj/↓ - 다음 게시물\nk/↑ - 이전 게시물\nl - 좋아요\nb - 북마크\ns - 검색 토글\nm - 메뉴 토글\nEsc - 닫기\n? - 도움말`);
  };

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop 
          >= document.documentElement.offsetHeight - 1000) {
        if (hasMore && !isLoadingMore) {
          loadMorePosts();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, isLoadingMore]);

  const loadMorePosts = async () => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    
    // 로딩 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 새로운 게시물 생성
    const newPosts = generateMorePosts(page);
    
    if (newPosts.length > 0) {
      setPosts(prev => [...prev, ...newPosts]);
      setPage(prev => prev + 1);
      
      // 5페이지 후 더 이상 로드하지 않음
      if (page >= 5) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }
    
    setIsLoadingMore(false);
  };

  const generateMorePosts = (pageNum) => {
    const authors = [
      { name: '이영희', username: '@lee_younghee', avatar: '👩‍🎓' },
      { name: '박민수', username: '@park_minsu', avatar: '👨‍💻' },
      { name: '김지은', username: '@kim_jieun', avatar: '👩‍🎨' },
      { name: '정대호', username: '@jung_daeho', avatar: '👨‍🔬' },
      { name: '최수진', username: '@choi_sujin', avatar: '👩‍🏫' }
    ];
    
    const contents = [
      '오늘 도서관에서 스터디했어요! 📚✨',
      '새로운 카페 발견! 커피가 정말 맛있어요 ☕️',
      '중간고사 준비 열심히 하고 있어요 💪',
      '오늘 날씨가 정말 좋네요! 산책하고 싶어요 🌞',
      '새로운 동아리 가입했어요. 여러분도 함께해요! 🎉',
      '오늘 수업이 정말 어려웠어요... 😅',
      '맛있는 라면집 추천해주세요! 🍜',
      '주말에 영화 보러 갈 사람? 🎦'
    ];
    
    const newPosts = [];
    
    for (let i = 0; i < 5; i++) {
      const author = authors[Math.floor(Math.random() * authors.length)];
      const content = contents[Math.floor(Math.random() * contents.length)];
      
      newPosts.push({
        id: Date.now() + i + (pageNum * 1000),
        author: author,
        content: content,
        timestamp: `${Math.floor(Math.random() * 24)}시간 전`,
        likes: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 20),
        shares: Math.floor(Math.random() * 5),
        bookmarks: Math.floor(Math.random() * 10),
        images: Math.random() > 0.7 ? ['https://via.placeholder.com/300x200/4facfe/white?text=Image'] : [],
        circles: Math.random() > 0.6 ? ['스터디그룹', 'AI연구회'] : [],
        isLiked: false,
        isBookmarked: false,
        category: '자유',
        board: '자유게시판'
      });
    }
    
    return newPosts;
  };

  const ImageSlider = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [touchStartX, setTouchStartX] = useState(null);
    const [touchEndX, setTouchEndX] = useState(null);

    if (!images || images.length === 0) return null;

    const handleTouchStart = (e) => {
      setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
      setTouchEndX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (touchStartX && touchEndX) {
        const distance = touchStartX - touchEndX;
        const threshold = 50;

        if (distance > threshold) {
          // Swipe left - next image
          setCurrentImage(prev => prev < images.length - 1 ? prev + 1 : 0);
        } else if (distance < -threshold) {
          // Swipe right - previous image
          setCurrentImage(prev => prev > 0 ? prev - 1 : images.length - 1);
        }
      }
      setTouchStartX(null);
      setTouchEndX(null);
    };

    return (
      <div 
        className="image-slider"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img src={images[currentImage]} alt="Post content" />
        {images.length > 1 && (
          <>
            <button 
              className="slider-btn prev" 
              onClick={() => setCurrentImage(prev => prev > 0 ? prev - 1 : images.length - 1)}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="slider-btn next" 
              onClick={() => setCurrentImage(prev => prev < images.length - 1 ? prev + 1 : 0)}
            >
              <ChevronRight size={20} />
            </button>
            <div className="slider-indicators">
              {images.map((_, index) => (
                <span 
                  key={index} 
                  className={`indicator ${index === currentImage ? 'active' : ''}`}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  const PostCard = ({ post, index }) => (
    <div 
      className={`post-card card ${keyboardNavActive && index === focusedPostIndex ? 'keyboard-focused' : ''}`}
      key={post.id}
      tabIndex={keyboardNavActive ? 0 : -1}
      onTouchStart={(e) => handleLongPressStart(e, post.id)}
      onTouchEnd={handleLongPressEnd}
      onMouseDown={(e) => handleLongPressStart(e, post.id)}
      onMouseUp={handleLongPressEnd}
      onMouseLeave={handleLongPressEnd}
      onFocus={() => setFocusedPostIndex(index)}
    >
      <div className="post-header">
        <div className="author-info">
          <div className="avatar">{post.author?.avatar || post.author?.charAt(0) || '👤'}</div>
          <div className="author-details">
            <div className="author-name">{post.author?.name || post.author}</div>
            <div className="username">{post.author?.username || `@${post.author?.toLowerCase().replace(' ', '_')}`}</div>
            <div className="post-meta">
              <span className="time">{post.timestamp || post.time}</span>
              {post.category && <span className="badge category">{post.category}</span>}
              {post.board && <span className="badge board">{post.board}</span>}
              {post.price && <span className="price">{post.price}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        <ImageSlider images={post.images} />
        
        {post.circles && post.circles.length > 0 && (
          <div className="circles">
            {post.circles.map((circle, index) => (
              <span key={index} className="circle-tag badge badge-success">
                🎯 {circle}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="post-actions">
        <button 
          className={`action-btn ${post.isLiked ? 'liked' : ''}`}
          onClick={() => handlePostAction(post.id, 'like')}
        >
          <Heart size={18} fill={post.isLiked ? '#ff6b6b' : 'none'} />
          <span>{post.likes}</span>
        </button>
        
        <button className="action-btn">
          <MessageCircle size={18} />
          <span>{post.comments}</span>
        </button>
        
        <button className="action-btn">
          <Share size={18} />
          <span>{post.shares}</span>
        </button>
        
        <button 
          className={`action-btn ${post.isBookmarked ? 'saved' : ''}`}
          onClick={() => handlePostAction(post.id, 'bookmark')}
        >
          <Bookmark size={18} fill={post.isBookmarked ? '#4facfe' : 'none'} />
        </button>
      </div>
    </div>
  );

  const TrendingSlide = () => (
    <div className="trending-slide">
      <div className="trending-tabs">
        <button className="trending-tab active">인기댓글</button>
        <button className="trending-tab">트렌딩 해시태그</button>
        <button className="trending-tab">활발한 서클</button>
      </div>
      <div className="trending-content">
        <div className="trending-cards">
          <div className="trending-card">
            <span className="trending-emoji">🔥</span>
            <div className="trending-info">
              <h4>#AI수업</h4>
              <p>324개 게시물</p>
            </div>
          </div>
          <div className="trending-card">
            <span className="trending-emoji">📚</span>
            <div className="trending-info">
              <h4>#중간고사</h4>
              <p>156개 게시물</p>
            </div>
          </div>
          <div className="trending-card">
            <span className="trending-emoji">☕</span>
            <div className="trending-info">
              <h4>#카페스터디</h4>
              <p>89개 게시물</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Sidebar = () => (
    <div className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}>
      <div className={`sidebar ${sidebarOpen ? 'active' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="sidebar-header">
          <h3>メニュー</h3>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>×</button>
        </div>
        
        <div className="sidebar-content">
          <div className="user-profile">
            <div className="avatar large">👤</div>
            <div className="user-info">
              <div className="name">{user.name}</div>
              <div className="department">{user.department} {user.year}年</div>
            </div>
          </div>

          <div className="menu-section">
            <h4>🔥 トレンド</h4>
            <div className="trending-item">#春休み計画</div>
            <div className="trending-item">#新学期準備</div>
            <div className="trending-item">#サークル募集</div>
          </div>

          <div className="menu-section">
            <h4>🎯 人気サークル</h4>
            <div className="circle-item">
              <span>🏀 バスケ部</span>
              <span className="member-count">234人</span>
            </div>
            <div className="circle-item">
              <span>🎵 軽音楽部</span>
              <span className="member-count">189人</span>
            </div>
            <div className="circle-item">
              <span>🤖 AI研究会</span>
              <span className="member-count">156人</span>
            </div>
          </div>

          <div className="menu-section">
            <h4>⚙️ 設定</h4>
            <div className="setting-item">
              <label>
                <input 
                  type="checkbox" 
                  checked={user.isAnonymous}
                  onChange={(e) => setUser({...user, isAnonymous: e.target.checked})}
                />
                匿名モード
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CreatePostModal = () => (
    showCreateModal && (
      <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>新しい投稿</h3>
            <button className="close-btn" onClick={() => setShowCreateModal(false)}>×</button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <textarea 
                className="form-textarea" 
                placeholder="今何してる？🤔"
                rows="4"
              />
            </div>
            <div className="form-group">
              <select className="form-input">
                <option>カテゴリを選択</option>
                <option>学業</option>
                <option>交流</option>
                <option>売買</option>
                <option>その他</option>
              </select>
            </div>
            <button className="btn btn-primary">投稿する</button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div 
      className="main-feed"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {(pullToRefresh.pulling || isRefreshing) && (
        <div 
          className="pull-to-refresh-indicator"
          style={{
            transform: `translateY(${pullToRefresh.distance}px)`,
            opacity: pullToRefresh.distance / 80
          }}
        >
          <div className={`refresh-spinner ${isRefreshing ? 'spinning' : ''}`}>
            {isRefreshing ? '🔄' : pullToRefresh.triggered ? '⬆️' : '⬇️'}
          </div>
          <span className="refresh-text">
            {isRefreshing ? '새로고침 중...' : pullToRefresh.triggered ? '놓아서 새로고침' : '아래로 당겨서 새로고침'}
          </span>
        </div>
      )}
      
      <div className={`header ${headerVisible ? 'visible' : 'hidden'}`}>
        <div className="header-content">
          <div className="header-left">
            <button 
              className="menu-btn"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="app-title">Cammunity</h1>
          </div>
          <div className="header-right">
            <button 
              className="search-btn"
              onClick={() => setShowGlobalSearch(true)}
            >
              <Search size={20} />
            </button>
            <NotificationSystem user={user} darkMode={user?.darkMode || false} />
          </div>
        </div>
        
        <div className={`search-bar ${searchVisible ? 'visible' : ''}`}>
          <Search size={16} />
          <input 
            type="text" 
            placeholder="검색어를 입력하세요..."
            className="search-input"
          />
        </div>
      </div>

      <div className="tab-container">
        <button 
          className={`tab-button ${activeTab === 'recommended' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommended')}
        >
          おすすめ
        </button>
        <button 
          className={`tab-button ${activeTab === 'following' ? 'active' : ''}`}
          onClick={() => setActiveTab('following')}
        >
          フォロー中
        </button>
      </div>

      <div className="slide-content">
        <div className="slide-item">
          <h4>💬 人気コメント</h4>
          <p>"今度のテスト頑張ろう！"</p>
        </div>
      </div>

      <div className="posts-container">
        {posts.map((post, index) => {
          if (index === 3 || index === 6) {
            return (
              <React.Fragment key={`slide-${index}`}>
                <PostCard post={post} index={index} />
                <TrendingSlide />
              </React.Fragment>
            );
          }
          return (
            <SwipeableContainer
              onSwipeLeft={() => handlePostAction(post.id, 'bookmark')}
              onSwipeRight={() => handlePostAction(post.id, 'like')}
            >
              <PostCard post={post} index={index} key={post.id} />
            </SwipeableContainer>
          );
        })}
        
        {/* Infinite Scroll Loading */}
        {isLoadingMore && (
          <div className="infinite-scroll-loading">
            <div className="loading-spinner"></div>
            <p>더 많은 게시물을 불러오는 중...</p>
          </div>
        )}
        
        {/* End of Posts */}
        {!hasMore && posts.length > 10 && (
          <div className="end-of-posts">
            <div className="end-message">
              <span className="end-icon">🎉</span>
              <h3>모든 게시물을 확인했어요!</h3>
              <p>새로운 게시물을 작성해보세요</p>
              <button 
                className="create-post-btn"
                onClick={() => setShowCreateModal(true)}
              >
                게시물 작성하기
              </button>
            </div>
          </div>
        )}
      </div>

      <button className="fab" onClick={() => setShowCreateModal(true)}>
        <Plus size={24} />
      </button>

      <Sidebar />
      <CreatePostModal />
      
      {/* Long Press Context Menu */}
      {longPressMenu.visible && (
        <div 
          className="context-menu"
          style={{
            left: Math.min(longPressMenu.x, window.innerWidth - 200),
            top: Math.min(longPressMenu.y, window.innerHeight - 200)
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="context-menu-item"
            onClick={() => handleContextMenuAction('share', longPressMenu.postId)}
          >
            <span className="context-icon">📤</span>
            공유하기
          </button>
          <button 
            className="context-menu-item"
            onClick={() => handleContextMenuAction('copy', longPressMenu.postId)}
          >
            <span className="context-icon">📋</span>
            텍스트 복사
          </button>
          <button 
            className="context-menu-item"
            onClick={() => handleContextMenuAction('hide', longPressMenu.postId)}
          >
            <span className="context-icon">👁️‍🗨️</span>
            게시물 숨기기
          </button>
          <button 
            className="context-menu-item danger"
            onClick={() => handleContextMenuAction('report', longPressMenu.postId)}
          >
            <span className="context-icon">🚨</span>
            신고하기
          </button>
        </div>
      )}
      
      {/* Global Search Modal */}
      {showGlobalSearch && (
        <GlobalSearch 
          isOpen={showGlobalSearch} 
          onClose={() => setShowGlobalSearch(false)}
          darkMode={user?.darkMode || false}
        />
      )}
    </div>
  );
};

export default MainFeed;
