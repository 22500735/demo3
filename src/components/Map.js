import React, { useState, useEffect } from 'react';
import { MapPin, Search, Navigation, Clock, Phone, Star, Calendar, Users, Thermometer } from 'lucide-react';
import './Map.css';

const Map = ({ user }) => {
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showReservation, setShowReservation] = useState(false);
  const [mapMode, setMapMode] = useState('normal');
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [mapZoom, setMapZoom] = useState(1);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [navigationRoute, setNavigationRoute] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({ x: 50, y: 80 });
  const [isNavigating, setIsNavigating] = useState(false);

  const categories = [
    { id: 'all', name: 'すべて', icon: '🏫' },
    { id: 'library', name: '図書館', icon: '📚' },
    { id: 'cafeteria', name: '食堂', icon: '🍽️' },
    { id: 'gym', name: 'ジム', icon: '💪' },
    { id: 'classroom', name: '教室', icon: '🏛️' },
    { id: 'lab', name: '研究室', icon: '🔬' },
    { id: 'cafe', name: 'カフェ', icon: '☕' },
    { id: 'other', name: 'その他', icon: '📍' }
  ];

  useEffect(() => {
    const sampleFacilities = [
      {
        id: 1,
        name: '中央図書館',
        category: 'library',
        distance: '200m',
        rating: 4.5,
        description: '24時間利用可能な図書館',
        tags: ['静か', '24時間', 'WiFi'],
        color: '#4facfe',
        coordinates: { x: 30, y: 40 },
        hours: '24時間',
        phone: '03-1234-5678',
        amenities: ['WiFi', 'エアコン', '個人ブース', 'グループ学習室'],
        images: ['https://via.placeholder.com/300x200/4facfe/white?text=Library'],
        reviews: 234,
        canReserve: true,
        currentUsers: 45,
        maxCapacity: 200
      },
      {
        id: 2,
        name: '学生食堂',
        category: 'cafeteria',
        distance: '150m',
        rating: 4.2,
        description: '安くて美味しい学食',
        tags: ['安い', '美味しい', '混雑'],
        color: '#ff6b6b',
        coordinates: { x: 60, y: 30 },
        hours: '11:00-20:00',
        phone: '03-1234-5679',
        amenities: ['座席300席', 'キャッシュレス対応', 'テイクアウト'],
        images: ['https://via.placeholder.com/300x200/ff6b6b/white?text=Cafeteria'],
        reviews: 189,
        canReserve: false,
        currentUsers: 120,
        maxCapacity: 300
      },
      {
        id: 3,
        name: 'フィットネスセンター',
        category: 'gym',
        distance: '300m',
        rating: 4.7,
        description: '最新設備のジム',
        tags: ['新しい', '設備充実', '要予約'],
        color: '#2ecc71',
        coordinates: { x: 20, y: 70 },
        hours: '6:00-22:00',
        phone: '03-1234-5680',
        amenities: ['トレーニング機器', 'シャワー', 'ロッカー', 'プール'],
        images: ['https://via.placeholder.com/300x200/2ecc71/white?text=Gym'],
        reviews: 156,
        canReserve: true,
        currentUsers: 28,
        maxCapacity: 80
      },
      {
        id: 4,
        name: 'スターバックス',
        category: 'cafe',
        distance: '100m',
        rating: 4.3,
        description: 'キャンパス内のスタバ',
        tags: ['人気', 'WiFi', '勉強'],
        color: '#f39c12',
        coordinates: { x: 70, y: 60 },
        hours: '7:00-21:00',
        phone: '03-1234-5681',
        amenities: ['WiFi', '電源', '勉強スペース'],
        images: ['https://via.placeholder.com/300x200/f39c12/white?text=Starbucks'],
        reviews: 298,
        canReserve: false,
        currentUsers: 35,
        maxCapacity: 60
      },
      {
        id: 5,
        name: 'AI研究棟',
        category: 'lab',
        distance: '400m',
        rating: 4.8,
        description: '最先端AI研究施設',
        tags: ['最新', 'AI', '研究'],
        color: '#9b59b6',
        coordinates: { x: 80, y: 20 },
        hours: '8:00-20:00',
        phone: '03-1234-5682',
        amenities: ['高性能PC', 'GPU', 'セミナー室'],
        images: ['https://via.placeholder.com/300x200/9b59b6/white?text=AI+Lab'],
        reviews: 67,
        canReserve: true,
        currentUsers: 12,
        maxCapacity: 40
      }
    ];

    const sampleWeather = {
      temperature: 22,
      condition: '晴れ',
      icon: '☀️',
      humidity: 65,
      windSpeed: 3.2
    };

    setFacilities(sampleFacilities);
    setWeatherInfo(sampleWeather);
  }, []);

  const filteredFacilities = facilities.filter(facility => 
    (activeCategory === 'all' || facility.category === activeCategory) &&
    facility.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMapMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - mapPosition.x,
      y: e.clientY - mapPosition.y
    });
  };

  const handleMapMouseMove = (e) => {
    if (!isDragging) return;
    
    setMapPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMapMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setMapZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setMapZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const resetMapView = () => {
    setMapZoom(1);
    setMapPosition({ x: 0, y: 0 });
  };

  const calculateRoute = (destination) => {
    // 簡単なルート計算（実際のアプリではより複雑なアルゴリズムを使用）
    const start = currentLocation;
    const end = destination.coordinates;
    
    // ウェイポイントを生成（直線ではなく道に沿ったルート）
    const waypoints = [
      start,
      { x: start.x + (end.x - start.x) * 0.3, y: start.y + (end.y - start.y) * 0.2 },
      { x: start.x + (end.x - start.x) * 0.7, y: start.y + (end.y - start.y) * 0.8 },
      end
    ];
    
    const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)) * 5; // 概算距離
    const estimatedTime = Math.round(distance / 80 * 60); // 徒歩時間（分）
    
    return {
      waypoints,
      destination,
      distance: Math.round(distance),
      estimatedTime,
      steps: [
        { instruction: '現在地から出発', distance: 0 },
        { instruction: '正面の道を直進', distance: Math.round(distance * 0.4) },
        { instruction: '右に曲がって建物に向かう', distance: Math.round(distance * 0.3) },
        { instruction: `${destination.name}に到着`, distance: Math.round(distance * 0.3) }
      ]
    };
  };

  const startNavigation = (facility) => {
    const route = calculateRoute(facility);
    setNavigationRoute(route);
    setIsNavigating(true);
    setMapMode('navigation');
    
    // 目的地にフォーカス
    const facilityX = (facility.coordinates.x / 100) * 300;
    const facilityY = (facility.coordinates.y / 100) * 300;
    setMapPosition({ x: -facilityX + 150, y: -facilityY + 150 });
    setMapZoom(1.5);
  };

  const stopNavigation = () => {
    setNavigationRoute(null);
    setIsNavigating(false);
    setMapMode('normal');
  };

  const CampusMap = () => (
    <div className="campus-map">
      <div className="map-container">
        <div 
          className="map-background"
          onMouseDown={handleMapMouseDown}
          onMouseMove={handleMapMouseMove}
          onMouseUp={handleMapMouseUp}
          onMouseLeave={handleMapMouseUp}
          style={{
            transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${mapZoom})`,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          <div className="campus-outline">
            {/* Current location marker */}
            <div 
              className="current-location-marker"
              style={{
                left: `${currentLocation.x}%`,
                top: `${currentLocation.y}%`
              }}
            >
              <div className="location-pulse"></div>
              <div className="location-dot"></div>
            </div>

            {/* Navigation route */}
            {navigationRoute && (
              <svg className="route-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d={`M ${navigationRoute.waypoints.map(point => `${point.x} ${point.y}`).join(' L ')}`}
                  stroke="#4facfe"
                  strokeWidth="0.5"
                  strokeDasharray="2,1"
                  fill="none"
                  className="route-path"
                />
              </svg>
            )}

            {/* Campus buildings representation */}
            <div className="building main-building">
              <span>本館</span>
            </div>
            <div className="building library-building">
              <span>図書館</span>
            </div>
            <div className="building cafeteria-building">
              <span>食堂</span>
            </div>
            <div className="building gym-building">
              <span>ジム</span>
            </div>
            
            {/* Facility markers */}
            {filteredFacilities.map(facility => (
              <div
                key={facility.id}
                className={`facility-marker ${selectedFacility?.id === facility.id ? 'selected' : ''} ${facility.category}`}
                style={{
                  left: `${facility.coordinates.x}%`,
                  top: `${facility.coordinates.y}%`,
                  backgroundColor: facility.color
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFacility(facility);
                }}
              >
                <div className="marker-icon">
                  <MapPin size={16} />
                </div>
                <div className="marker-popup">
                  <div className="popup-content">
                    <h4>{facility.name}</h4>
                    <p>{facility.distance} • {facility.rating}⭐</p>
                    <div className="usage-indicator">
                      <div 
                        className="usage-bar" 
                        style={{ width: `${(facility.currentUsers / facility.maxCapacity) * 100}%` }}
                      ></div>
                    </div>
                    <span className="usage-text">{facility.currentUsers}/{facility.maxCapacity}人</span>
                  </div>
                </div>
                <span className="facility-name">{facility.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="map-controls">
          <div className="zoom-controls">
            <button className="zoom-btn" onClick={handleZoomIn}>
              <span>+</span>
            </button>
            <button className="zoom-btn" onClick={handleZoomOut}>
              <span>-</span>
            </button>
            <button className="zoom-btn reset-btn" onClick={resetMapView}>
              <span>⌂</span>
            </button>
          </div>
          <div className="mode-controls">
            <button 
              className={`map-mode-btn ${mapMode === 'normal' ? 'active' : ''}`}
              onClick={() => setMapMode('normal')}
            >
              通常
            </button>
            <button 
              className={`map-mode-btn ${mapMode === 'navigation' ? 'active' : ''}`}
              onClick={() => {
                if (isNavigating) {
                  stopNavigation();
                } else {
                  setMapMode('navigation');
                }
              }}
            >
              {isNavigating ? 'ナビ停止' : 'ナビ'}
            </button>
          </div>
          <div className="map-info">
            <span className="zoom-level">ズーム: {Math.round(mapZoom * 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );

  const FacilityCard = ({ facility }) => (
    <div className="facility-card card japanese-card fade-in">
      <div className="facility-header">
        <div className="facility-icon" style={{ backgroundColor: facility.color }}>
          {categories.find(cat => cat.id === facility.category)?.icon}
        </div>
        <div className="facility-info">
          <h3 className="facility-name">{facility.name}</h3>
          <div className="facility-meta">
            <span className="distance">
              <Navigation size={12} />
              {facility.distance}
            </span>
            <span className="rating">
              <Star size={12} fill="#f39c12" />
              {facility.rating}
            </span>
            <span className="users">
              <Users size={12} />
              {facility.currentUsers}/{facility.maxCapacity}
            </span>
          </div>
        </div>
      </div>
      
      <p className="facility-description">{facility.description}</p>
      
      <div className="facility-tags">
        {facility.tags.map((tag, index) => (
          <span key={index} className="tag badge badge-primary">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="facility-hours">
        <Clock size={14} />
        <span>{facility.hours}</span>
      </div>
      
      <div className="facility-actions">
        <button 
          className="btn btn-outline btn-small"
          onClick={() => setSelectedFacility(facility)}
        >
          詳細
        </button>
        {facility.canReserve && (
          <button 
            className="btn btn-primary btn-small"
            onClick={() => setShowReservation(facility)}
          >
            予約
          </button>
        )}
      </div>
    </div>
  );

  const FacilityDetailModal = () => (
    selectedFacility && (
      <div className="modal-overlay" onClick={() => setSelectedFacility(null)}>
        <div className="modal-content facility-detail-modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>{selectedFacility.name}</h3>
            <button className="close-btn" onClick={() => setSelectedFacility(null)}>×</button>
          </div>
          <div className="modal-body">
            <img src={selectedFacility.images[0]} alt={selectedFacility.name} className="facility-image" />
            
            <div className="facility-details">
              <div className="detail-item">
                <Navigation size={16} />
                <span>距離: {selectedFacility.distance}</span>
              </div>
              <div className="detail-item">
                <Clock size={16} />
                <span>営業時間: {selectedFacility.hours}</span>
              </div>
              <div className="detail-item">
                <Phone size={16} />
                <span>電話: {selectedFacility.phone}</span>
              </div>
              <div className="detail-item">
                <Star size={16} />
                <span>評価: {selectedFacility.rating}/5.0 ({selectedFacility.reviews}件)</span>
              </div>
              <div className="detail-item">
                <Users size={16} />
                <span>利用状況: {selectedFacility.currentUsers}/{selectedFacility.maxCapacity}人</span>
              </div>
            </div>

            <div className="facility-amenities">
              <h4>設備・サービス</h4>
              <div className="amenities-list">
                {selectedFacility.amenities.map((amenity, index) => (
                  <span key={index} className="amenity badge badge-success">
                    ✓ {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="facility-description-detail">
              <h4>詳細情報</h4>
              <p>{selectedFacility.description}</p>
            </div>

            <div className="facility-actions-detail">
              <button 
                className="btn btn-outline"
                onClick={() => {
                  // Focus on facility location
                  const facilityX = (selectedFacility.coordinates.x / 100) * 300;
                  const facilityY = (selectedFacility.coordinates.y / 100) * 300;
                  setMapPosition({ x: -facilityX + 150, y: -facilityY + 150 });
                  setMapZoom(2);
                  setSelectedFacility(null);
                }}
              >
                <Navigation size={16} />
                地図で確認
              </button>
              <button 
                className="btn btn-outline"
                onClick={() => {
                  startNavigation(selectedFacility);
                  setSelectedFacility(null);
                }}
              >
                <Navigation size={16} />
                道順を見る
              </button>
              {selectedFacility.canReserve && (
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowReservation(selectedFacility)}
                >
                  <Calendar size={16} />
                  予約する
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );

  const ReservationModal = () => (
    showReservation && (
      <div className="modal-overlay" onClick={() => setShowReservation(false)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>{showReservation.name} - 予約</h3>
            <button className="close-btn" onClick={() => setShowReservation(false)}>×</button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">予約日</label>
              <input type="date" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">開始時間</label>
              <select className="form-input">
                <option>09:00</option>
                <option>10:00</option>
                <option>11:00</option>
                <option>12:00</option>
                <option>13:00</option>
                <option>14:00</option>
                <option>15:00</option>
                <option>16:00</option>
                <option>17:00</option>
                <option>18:00</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">利用時間</label>
              <select className="form-input">
                <option>1時間</option>
                <option>2時間</option>
                <option>3時間</option>
                <option>4時間</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">利用人数</label>
              <input type="number" className="form-input" min="1" max="10" defaultValue="1" />
            </div>
            <div className="form-group">
              <label className="form-label">利用目的</label>
              <textarea className="form-textarea" placeholder="利用目的を入力してください..." rows="3" />
            </div>
            <button className="btn btn-primary">予約を確定</button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="map">
      <div className="map-header">
        <h1 className="page-title">キャンパスマップ 🗺️</h1>
        <div className="weather-info">
          <span className="weather-icon">{weatherInfo?.icon}</span>
          <span className="temperature">
            <Thermometer size={14} />
            {weatherInfo?.temperature}°C
          </span>
          <span className="condition">{weatherInfo?.condition}</span>
        </div>
      </div>

      <div className="search-bar">
        <Search size={16} />
        <input 
          type="text"
          className="search-input"
          placeholder="施設を検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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

      <CampusMap />

      {/* Navigation Panel */}
      {isNavigating && navigationRoute && (
        <div className="navigation-panel">
          <div className="navigation-header">
            <h3>🧭 {navigationRoute.destination.name}への道順</h3>
            <button className="close-nav-btn" onClick={stopNavigation}>×</button>
          </div>
          <div className="navigation-info">
            <div className="nav-stats">
              <span className="nav-distance">📏 {navigationRoute.distance}m</span>
              <span className="nav-time">⏱️ 徒歩{navigationRoute.estimatedTime}分</span>
            </div>
          </div>
          <div className="navigation-steps">
            <h4>📍 ルート案内</h4>
            {navigationRoute.steps.map((step, index) => (
              <div key={index} className="nav-step">
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <div className="step-instruction">{step.instruction}</div>
                  {step.distance > 0 && (
                    <div className="step-distance">{step.distance}m</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="navigation-actions">
            <button className="btn btn-primary" onClick={() => {
              // 実際のアプリでは音声ナビゲーション開始
              alert('音声ナビゲーションを開始します');
            }}>
              🔊 音声案内開始
            </button>
            <button className="btn btn-outline" onClick={stopNavigation}>
              ナビ終了
            </button>
          </div>
        </div>
      )}

      <div className="campus-info">
        <div className="info-cards">
          <div className="info-card">
            <div className="info-icon">👥</div>
            <div className="info-content">
              <div className="info-title">現在の利用者</div>
              <div className="info-value">1,234人</div>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">🏃</div>
            <div className="info-content">
              <div className="info-title">運営中施設</div>
              <div className="info-value">28/32</div>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">📅</div>
            <div className="info-content">
              <div className="info-title">今日の予約</div>
              <div className="info-value">156件</div>
            </div>
          </div>
        </div>
      </div>

      <div className="facilities-section">
        <h2 className="section-title">🏫 施設一覧</h2>
        <div className="facilities-grid">
          {filteredFacilities.map(facility => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
        </div>
      </div>

      <div className="announcements">
        <h2 className="section-title">📢 お知らせ・イベント</h2>
        <div className="announcement-list">
          <div className="announcement-item">
            <div className="announcement-date">3/15</div>
            <div className="announcement-content">
              <h4>図書館システムメンテナンス</h4>
              <p>3/16 2:00-6:00の間、図書館システムが利用できません</p>
            </div>
          </div>
          <div className="announcement-item">
            <div className="announcement-date">3/20</div>
            <div className="announcement-content">
              <h4>春の学園祭準備</h4>
              <p>学園祭の準備のため、一部施設の利用に制限があります</p>
            </div>
          </div>
        </div>
      </div>

      <FacilityDetailModal />
      <ReservationModal />
    </div>
  );
};

export default Map;
