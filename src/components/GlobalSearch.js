import React, { useState, useEffect, useRef } from 'react';
import { Search, X, User, Hash, MapPin, Calendar, Book } from 'lucide-react';
import './GlobalSearch.css';

const GlobalSearch = ({ darkMode, onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);

  // 샘플 데이터
  const sampleData = {
    users: [
      { id: 1, name: '山田花子', username: '@yamada_hanako', department: '컴퓨터과학과', year: 3, avatar: '👩‍💻' },
      { id: 2, name: '田中太郎', username: '@tanaka_taro', department: '경영학과', year: 2, avatar: '👨‍💼' },
      { id: 3, name: '佐藤美咲', username: '@sato_misaki', department: '디자인학과', year: 4, avatar: '🎨' },
      { id: 4, name: '鈴木一郎', username: '@suzuki_ichiro', department: '물리학과', year: 1, avatar: '🔬' }
    ],
    hashtags: [
      { tag: '#AI', count: 1234, trending: true },
      { tag: '#스터디', count: 892, trending: true },
      { tag: '#카페', count: 567, trending: false },
      { tag: '#시험', count: 445, trending: true },
      { tag: '#동아리', count: 334, trending: false },
      { tag: '#취업', count: 289, trending: true }
    ],
    locations: [
      { id: 1, name: '중앙도서관', type: 'library', description: '24시간 개방' },
      { id: 2, name: '학생회관', type: 'building', description: '식당, 카페, 편의점' },
      { id: 3, name: '공학관', type: 'building', description: '컴퓨터과학과, 전자공학과' },
      { id: 4, name: '스타벅스 캠퍼스점', type: 'cafe', description: '와이파이, 스터디룸' }
    ],
    courses: [
      { id: 1, name: '인공지능개론', professor: '김교수', code: 'CS101' },
      { id: 2, name: '데이터구조', professor: '이교수', code: 'CS201' },
      { id: 3, name: '웹프로그래밍', professor: '박교수', code: 'CS301' },
      { id: 4, name: '머신러닝', professor: '최교수', code: 'CS401' }
    ],
    posts: [
      { id: 1, content: 'AI 스터디 모집합니다!', author: '山田花子', likes: 23 },
      { id: 2, content: '중간고사 화이팅!', author: '田中太郎', likes: 45 },
      { id: 3, content: '새로운 카페 발견했어요', author: '佐藤美咲', likes: 12 }
    ]
  };

  useEffect(() => {
    // 최근 검색어 로드
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      generateSuggestions(query);
    } else {
      setSuggestions([]);
      setSearchResults(null);
    }
  }, [query]);

  const generateSuggestions = (searchQuery) => {
    const lowerQuery = searchQuery.toLowerCase();
    const suggestions = [];

    // 사용자 검색
    sampleData.users.forEach(user => {
      if (user.name.toLowerCase().includes(lowerQuery) || 
          user.username.toLowerCase().includes(lowerQuery) ||
          user.department.toLowerCase().includes(lowerQuery)) {
        suggestions.push({
          type: 'user',
          data: user,
          icon: User,
          title: user.name,
          subtitle: `${user.department} ${user.year}년`,
          action: () => console.log('사용자 프로필 보기:', user.name)
        });
      }
    });

    // 해시태그 검색
    sampleData.hashtags.forEach(hashtag => {
      if (hashtag.tag.toLowerCase().includes(lowerQuery)) {
        suggestions.push({
          type: 'hashtag',
          data: hashtag,
          icon: Hash,
          title: hashtag.tag,
          subtitle: `${hashtag.count}개 게시물`,
          action: () => console.log('해시태그 검색:', hashtag.tag)
        });
      }
    });

    // 장소 검색
    sampleData.locations.forEach(location => {
      if (location.name.toLowerCase().includes(lowerQuery)) {
        suggestions.push({
          type: 'location',
          data: location,
          icon: MapPin,
          title: location.name,
          subtitle: location.description,
          action: () => console.log('장소 보기:', location.name)
        });
      }
    });

    // 과목 검색
    sampleData.courses.forEach(course => {
      if (course.name.toLowerCase().includes(lowerQuery) ||
          course.professor.toLowerCase().includes(lowerQuery) ||
          course.code.toLowerCase().includes(lowerQuery)) {
        suggestions.push({
          type: 'course',
          data: course,
          icon: Book,
          title: course.name,
          subtitle: `${course.professor} (${course.code})`,
          action: () => console.log('과목 정보 보기:', course.name)
        });
      }
    });

    setSuggestions(suggestions.slice(0, 8)); // 최대 8개 제한
  };

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    
    // 검색 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const results = {
      users: sampleData.users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      ),
      posts: sampleData.posts.filter(post =>
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      ),
      hashtags: sampleData.hashtags.filter(hashtag =>
        hashtag.tag.toLowerCase().includes(searchQuery.toLowerCase())
      ),
      locations: sampleData.locations.filter(location =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    };

    setSearchResults(results);
    setIsLoading(false);

    // 최근 검색어에 추가
    addToRecentSearches(searchQuery);
  };

  const addToRecentSearches = (searchQuery) => {
    const newRecentSearches = [
      searchQuery,
      ...recentSearches.filter(item => item !== searchQuery)
    ].slice(0, 10); // 최대 10개 유지

    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        suggestions[selectedIndex].action();
        onClose();
      } else {
        performSearch(query);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    suggestion.action();
    onClose();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className="global-search-overlay" onClick={onClose}>
      <div 
        className={`global-search-container ${darkMode ? 'dark' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="search-header">
          <div className="search-input-container">
            <Search size={20} className="search-icon" />
            <input
              ref={inputRef}
              type="text"
              placeholder="사용자, 해시태그, 장소, 과목 검색..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="search-input"
            />
            {query && (
              <button 
                className="clear-btn"
                onClick={() => setQuery('')}
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button className="close-search-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="search-content">
          {isLoading ? (
            <div className="search-loading">
              <div className="loading-spinner"></div>
              <p>검색 중...</p>
            </div>
          ) : query.length === 0 ? (
            <div className="search-empty-state">
              <div className="recent-searches">
                <div className="section-header">
                  <h3>최근 검색</h3>
                  {recentSearches.length > 0 && (
                    <button className="clear-recent-btn" onClick={clearRecentSearches}>
                      모두 삭제
                    </button>
                  )}
                </div>
                {recentSearches.length === 0 ? (
                  <p className="no-recent">최근 검색 기록이 없습니다</p>
                ) : (
                  <div className="recent-list">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        className="recent-item"
                        onClick={() => {
                          setQuery(search);
                          performSearch(search);
                        }}
                      >
                        <Search size={14} />
                        {search}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="trending-section">
                <h3>인기 해시태그</h3>
                <div className="trending-tags">
                  {sampleData.hashtags.filter(h => h.trending).map((hashtag, index) => (
                    <button
                      key={index}
                      className="trending-tag"
                      onClick={() => {
                        setQuery(hashtag.tag);
                        performSearch(hashtag.tag);
                      }}
                    >
                      <Hash size={14} />
                      {hashtag.tag}
                      <span className="tag-count">{hashtag.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="suggestions-list">
              {suggestions.map((suggestion, index) => {
                const IconComponent = suggestion.icon;
                return (
                  <button
                    key={index}
                    className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="suggestion-icon">
                      <IconComponent size={16} />
                    </div>
                    <div className="suggestion-content">
                      <div className="suggestion-title">{suggestion.title}</div>
                      <div className="suggestion-subtitle">{suggestion.subtitle}</div>
                    </div>
                    <div className="suggestion-type">{suggestion.type}</div>
                  </button>
                );
              })}
            </div>
          ) : searchResults ? (
            <div className="search-results">
              {Object.entries(searchResults).map(([category, items]) => (
                items.length > 0 && (
                  <div key={category} className="result-category">
                    <h3 className="category-title">
                      {category === 'users' && '사용자'}
                      {category === 'posts' && '게시물'}
                      {category === 'hashtags' && '해시태그'}
                      {category === 'locations' && '장소'}
                      ({items.length})
                    </h3>
                    <div className="result-items">
                      {items.map((item, index) => (
                        <div key={index} className="result-item">
                          {category === 'users' && (
                            <>
                              <div className="result-avatar">{item.avatar}</div>
                              <div className="result-content">
                                <div className="result-title">{item.name}</div>
                                <div className="result-subtitle">{item.username} • {item.department}</div>
                              </div>
                            </>
                          )}
                          {category === 'posts' && (
                            <>
                              <div className="result-content">
                                <div className="result-title">{item.content}</div>
                                <div className="result-subtitle">{item.author} • {item.likes} 좋아요</div>
                              </div>
                            </>
                          )}
                          {category === 'hashtags' && (
                            <>
                              <Hash size={16} />
                              <div className="result-content">
                                <div className="result-title">{item.tag}</div>
                                <div className="result-subtitle">{item.count}개 게시물</div>
                              </div>
                            </>
                          )}
                          {category === 'locations' && (
                            <>
                              <MapPin size={16} />
                              <div className="result-content">
                                <div className="result-title">{item.name}</div>
                                <div className="result-subtitle">{item.description}</div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          ) : (
            <div className="no-results">
              <Search size={48} />
              <h3>검색 결과가 없습니다</h3>
              <p>다른 키워드로 검색해보세요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
