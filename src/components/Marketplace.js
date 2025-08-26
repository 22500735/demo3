import React, { useState, useEffect } from 'react';
import { Search, Filter, Heart, MessageCircle, Eye, Plus, MapPin, Clock, Star } from 'lucide-react';
import './Marketplace.css';

const Marketplace = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [wishlist, setWishlist] = useState(new Set());
  const [showProductDetail, setShowProductDetail] = useState(null);
  const [showCreateProduct, setShowCreateProduct] = useState(false);

  useEffect(() => {
    const sampleCategories = [
      { id: 'all', name: 'すべて', icon: '🛍️' },
      { id: 'electronics', name: '電子機器', icon: '📱' },
      { id: 'books', name: '教材・書籍', icon: '📚' },
      { id: 'clothing', name: '衣類', icon: '👕' },
      { id: 'furniture', name: '家具・生活', icon: '🪑' },
      { id: 'sports', name: 'スポーツ', icon: '⚽' },
      { id: 'beauty', name: 'ビューティー', icon: '💄' },
      { id: 'other', name: 'その他', icon: '📦' }
    ];

    const sampleProducts = [
      {
        id: 1,
        title: 'MacBook Pro 2021 M1チップ',
        price: 180000,
        image: 'https://via.placeholder.com/300x200/333/white?text=MacBook+Pro',
        category: 'electronics',
        location: '渋谷区',
        time: '2時間前',
        likes: 45,
        comments: 12,
        views: 234,
        condition: '良好',
        seller: {
          name: '佐藤太郎',
          username: '@sato_taro',
          rating: 4.8,
          department: '工学部',
          year: 3
        },
        description: '使用期間1年のMacBook Proです。付属品完備、目立った傷なし。プログラミング用に使用していました。',
        status: 'available',
        tags: ['Apple', 'ノートPC', 'プログラミング']
      },
      {
        id: 2,
        title: '線形代数学の教科書',
        price: 2500,
        image: 'https://via.placeholder.com/300x200/4facfe/white?text=Math+Book',
        category: 'books',
        location: '新宿区',
        time: '5時間前',
        likes: 12,
        comments: 3,
        views: 89,
        condition: '普通',
        seller: {
          name: '山田花子',
          username: '@yamada_hanako',
          rating: 4.5,
          department: '理学部',
          year: 2
        },
        description: '線形代数学の教科書です。書き込みありますが、学習には問題ありません。',
        status: 'available',
        tags: ['数学', '教科書', '理系']
      },
      {
        id: 3,
        title: 'ナイキ エアマックス スニーカー',
        price: 8500,
        image: 'https://via.placeholder.com/300x200/ff6b6b/white?text=Nike+Shoes',
        category: 'clothing',
        location: '池袋',
        time: '1日前',
        likes: 28,
        comments: 8,
        views: 156,
        condition: '良好',
        seller: {
          name: '田中次郎',
          username: '@tanaka_jiro',
          rating: 4.2,
          department: 'スポーツ科学部',
          year: 4
        },
        description: 'サイズ26.5cm。数回着用のみ、ほぼ新品状態です。',
        status: 'available',
        tags: ['ナイキ', 'スニーカー', '26.5cm']
      },
      {
        id: 4,
        title: '学習机とチェアセット',
        price: 15000,
        image: 'https://via.placeholder.com/300x200/2ecc71/white?text=Study+Desk',
        category: 'furniture',
        location: '世田谷区',
        time: '2日前',
        likes: 19,
        comments: 6,
        views: 98,
        condition: '良好',
        seller: {
          name: '鈴木美咲',
          username: '@suzuki_misaki',
          rating: 4.9,
          department: '文学部',
          year: 4
        },
        description: '卒業のため売却します。4年間使用しましたが、大切に使っていたので状態良好です。',
        status: 'sold',
        tags: ['机', 'チェア', '学習用']
      }
    ];

    setCategories(sampleCategories);
    setProducts(sampleProducts);
  }, []);

  const handleWishlist = (productId) => {
    setWishlist(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });

    setProducts(products.map(product => 
      product.id === productId 
        ? { 
            ...product, 
            likes: wishlist.has(productId) 
              ? product.likes - 1 
              : product.likes + 1 
          }
        : product
    ));
  };

  const filteredProducts = products
    .filter(product => 
      (activeCategory === 'all' || product.category === activeCategory) &&
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popular':
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

  const ProductCard = ({ product }) => (
    <div className="product-card card japanese-card fade-in">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
        <button 
          className={`wishlist-btn ${wishlist.has(product.id) ? 'active' : ''}`}
          onClick={() => handleWishlist(product.id)}
        >
          <Heart size={16} fill={wishlist.has(product.id) ? '#ff6b6b' : 'none'} />
        </button>
        {product.status === 'sold' && (
          <div className="sold-overlay">
            <span>SOLD</span>
          </div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-price">¥{product.price.toLocaleString()}</div>
        
        <div className="product-meta">
          <span className="location">
            <MapPin size={12} />
            {product.location}
          </span>
          <span className="time">
            <Clock size={12} />
            {product.time}
          </span>
          <span className={`condition condition-${product.condition === '良好' ? 'good' : product.condition === '普通' ? 'fair' : 'poor'}`}>
            {product.condition}
          </span>
        </div>

        <div className="product-tags">
          {product.tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="tag badge badge-primary">
              {tag}
            </span>
          ))}
        </div>

        <div className="product-stats">
          <span className="stat">
            <Heart size={14} />
            {product.likes}
          </span>
          <span className="stat">
            <MessageCircle size={14} />
            {product.comments}
          </span>
          <span className="stat">
            <Eye size={14} />
            {product.views}
          </span>
        </div>

        <div className="seller-info">
          <div className="seller-avatar">👤</div>
          <div className="seller-details">
            <div className="seller-name">{product.seller.name}</div>
            <div className="seller-rating">
              <Star size={12} fill="#f39c12" />
              <span>{product.seller.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="product-actions">
        <button 
          className="btn btn-outline btn-small"
          onClick={() => setShowProductDetail(product)}
        >
          詳細
        </button>
        <button className="btn btn-primary btn-small">
          {product.status === 'sold' ? '売り切れ' : 'メッセージ'}
        </button>
      </div>
    </div>
  );

  const ProductDetailModal = () => (
    showProductDetail && (
      <div className="modal-overlay" onClick={() => setShowProductDetail(null)}>
        <div className="modal-content product-detail-modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>{showProductDetail.title}</h3>
            <button className="close-btn" onClick={() => setShowProductDetail(null)}>×</button>
          </div>
          <div className="modal-body">
            <img src={showProductDetail.image} alt={showProductDetail.title} className="detail-image" />
            
            <div className="detail-price">¥{showProductDetail.price.toLocaleString()}</div>
            
            <div className="detail-info">
              <div className="info-item">
                <span className="info-label">状態:</span>
                <span className="info-value">{showProductDetail.condition}</span>
              </div>
              <div className="info-item">
                <span className="info-label">場所:</span>
                <span className="info-value">{showProductDetail.location}</span>
              </div>
              <div className="info-item">
                <span className="info-label">投稿:</span>
                <span className="info-value">{showProductDetail.time}</span>
              </div>
            </div>

            <div className="detail-description">
              <h4>商品説明</h4>
              <p>{showProductDetail.description}</p>
            </div>

            <div className="detail-tags">
              {showProductDetail.tags.map((tag, index) => (
                <span key={index} className="tag badge badge-primary">
                  {tag}
                </span>
              ))}
            </div>

            <div className="seller-profile">
              <div className="seller-avatar large">👤</div>
              <div className="seller-info-detail">
                <div className="seller-name">{showProductDetail.seller.name}</div>
                <div className="seller-department">
                  {showProductDetail.seller.department} {showProductDetail.seller.year}年
                </div>
                <div className="seller-rating">
                  <Star size={14} fill="#f39c12" />
                  <span>{showProductDetail.seller.rating} (評価)</span>
                </div>
              </div>
              <button className="btn btn-outline btn-small">プロフィール</button>
            </div>

            <div className="detail-actions">
              <button className="btn btn-secondary">
                <Heart size={16} />
                お気に入り
              </button>
              <button className="btn btn-primary">
                <MessageCircle size={16} />
                メッセージを送る
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  const CreateProductModal = () => (
    showCreateProduct && (
      <div className="modal-overlay" onClick={() => setShowCreateProduct(false)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>商品を出品</h3>
            <button className="close-btn" onClick={() => setShowCreateProduct(false)}>×</button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">商品名</label>
              <input type="text" className="form-input" placeholder="商品名を入力" />
            </div>
            <div className="form-group">
              <label className="form-label">価格</label>
              <input type="number" className="form-input" placeholder="価格を入力" />
            </div>
            <div className="form-group">
              <label className="form-label">カテゴリ</label>
              <select className="form-input">
                <option>カテゴリを選択</option>
                {categories.filter(cat => cat.id !== 'all').map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">状態</label>
              <select className="form-input">
                <option>新品</option>
                <option>良好</option>
                <option>普通</option>
                <option>要修理</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">商品説明</label>
              <textarea 
                className="form-textarea" 
                placeholder="商品の詳細を入力してください..."
                rows="4"
              />
            </div>
            <div className="form-group">
              <label className="form-label">受け渡し場所</label>
              <input type="text" className="form-input" placeholder="例: 渋谷駅" />
            </div>
            <button className="btn btn-primary">出品する</button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="marketplace">
      <div className="marketplace-header">
        <h1 className="page-title">マーケット 🛒</h1>
        <p className="page-subtitle">学生同士で売買・交換しよう</p>
      </div>

      <div className="search-section">
        <div className="search-bar">
          <Search size={16} />
          <input 
            type="text"
            className="search-input"
            placeholder="商品を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="filter-btn">
            <Filter size={16} />
          </button>
        </div>

        <div className="sort-options">
          <select 
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="latest">最新順</option>
            <option value="price-low">価格の安い順</option>
            <option value="price-high">価格の高い順</option>
            <option value="popular">人気順</option>
          </select>
        </div>
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

      <div className="featured-section">
        <h2 className="section-title">🔥 注目の商品</h2>
        <div className="featured-items">
          <div className="featured-item">
            <span className="item-title">MacBook Pro 特価</span>
            <span className="item-price">¥180,000</span>
          </div>
          <div className="featured-item">
            <span className="item-title">教科書セット</span>
            <span className="item-price">¥5,000</span>
          </div>
        </div>
      </div>

      <div className="products-section">
        <div className="section-header">
          <h2 className="section-title">商品一覧</h2>
          <span className="product-count">{filteredProducts.length}件</span>
        </div>
        
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <button className="fab" onClick={() => setShowCreateProduct(true)}>
        <Plus size={24} />
      </button>

      <ProductDetailModal />
      <CreateProductModal />
    </div>
  );
};

export default Marketplace;
