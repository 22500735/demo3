// Centralized sample data for better database integration structure
export const userData = {
  id: 1,
  name: '田中太郎',
  username: '@tanaka_taro',
  avatar: '👤',
  department: '工学部',
  year: 3,
  isAnonymous: false,
  email: 'tanaka@university.ac.jp',
  bio: 'プログラミングが好きな工学部3年生です。AI研究に興味があります。',
  joinDate: '2022-04-01',
  followers: 45,
  following: 67,
  gpa: 3.85,
  credits: 84,
  preferences: {
    theme: 'light',
    language: 'ja',
    notifications: {
      likes: true,
      comments: true,
      follows: true
    }
  }
};

export const postsData = [
  {
    id: 1,
    authorId: 2,
    author: '山田花子',
    username: '@yamada_hanako',
    isAnonymous: false,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    content: '今日の授業めっちゃ面白かった！AI について学んだよ 🤖✨\n\n#東京大学 #AI #授業',
    likes: 24,
    comments: 8,
    shares: 3,
    liked: false,
    saved: false,
    category: '学業',
    board: '自由掲示板',
    images: ['https://via.placeholder.com/300x200/4facfe/white?text=AI+Class'],
    circles: ['AI研究会', 'プログラミング部'],
    price: null,
    location: '東京都',
    hashtags: ['東京大学', 'AI', '授業']
  },
  {
    id: 2,
    authorId: null,
    author: '匿名ユーザー',
    username: null,
    isAnonymous: true,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    content: '誰か一緒にカフェで勉強しませんか？☕📚\n場所：渋谷のスタバ\n時間：明日14:00〜',
    likes: 12,
    comments: 15,
    shares: 2,
    liked: true,
    saved: true,
    category: '交流',
    board: '自由掲示板',
    images: [],
    circles: [],
    price: null,
    location: '渋谷区',
    hashtags: ['勉強', 'カフェ', '渋谷']
  },
  {
    id: 3,
    authorId: 3,
    author: '佐藤太郎',
    username: '@sato_taro',
    isAnonymous: false,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    content: 'MacBook Pro 売ります！\n2021年モデル、M1チップ\n使用期間：1年\n付属品完備 💻',
    likes: 45,
    comments: 23,
    shares: 8,
    liked: false,
    saved: false,
    category: '売買',
    board: 'フリーマーケット',
    images: ['https://via.placeholder.com/300x200/333/white?text=MacBook+Pro'],
    circles: [],
    price: 180000,
    location: '新宿区',
    hashtags: ['MacBook', '売ります', 'M1']
  }
];

export const boardsData = [
  {
    id: 1,
    name: '自由掲示板',
    description: '自由に話し合える場所',
    icon: '💬',
    posts: 1234,
    members: 5678,
    isClub: false,
    category: 'general',
    moderators: [1, 2],
    rules: ['相手を尊重しましょう', 'スパムは禁止です', '建設的な議論を心がけましょう'],
    createdAt: '2022-01-01'
  },
  {
    id: 2,
    name: '学業相談',
    description: '勉強や授業について',
    icon: '📚',
    posts: 856,
    members: 3421,
    isClub: false,
    category: 'academic',
    moderators: [3, 4],
    rules: ['学業に関する内容のみ', '質問は具体的に', '回答は丁寧に'],
    createdAt: '2022-01-01'
  }
];

export const clubsData = [
  {
    id: 101,
    name: 'バスケットボール部',
    description: '一緒にバスケを楽しもう！',
    icon: '🏀',
    posts: 234,
    members: 45,
    isClub: true,
    category: 'sports',
    followers: 156,
    president: 5,
    advisors: [6, 7],
    meetingSchedule: '毎週火・木 18:00-20:00',
    location: '第1体育館',
    budget: 500000,
    activities: ['練習', '試合', '合宿', '新歓'],
    requirements: '運動経験不問、やる気のある方歓迎',
    createdAt: '2020-04-01'
  }
];

export const timetableData = {
  '月-1': {
    id: 'mon-1',
    subject: '線形代数学',
    room: 'A101',
    professor: '田中教授',
    credits: 2,
    description: '行列と線形変換について学ぶ',
    color: '#4facfe',
    rating: 4.2,
    reviews: 45,
    syllabus: 'ベクトル空間、線形写像、固有値・固有ベクトル',
    textbook: '線形代数学入門（東京出版）',
    grading: '中間試験40%、期末試験40%、レポート20%',
    attendance: true
  }
};

export const marketplaceData = [
  {
    id: 1,
    title: 'MacBook Pro 2021 M1チップ',
    price: 180000,
    image: 'https://via.placeholder.com/300x200/333/white?text=MacBook+Pro',
    category: 'electronics',
    location: '渋谷区',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 45,
    comments: 12,
    views: 234,
    condition: '良好',
    sellerId: 3,
    seller: {
      id: 3,
      name: '佐藤太郎',
      username: '@sato_taro',
      rating: 4.8,
      department: '工学部',
      year: 3,
      reviewCount: 23,
      responseRate: 95,
      joinDate: '2022-04-01'
    },
    description: '使用期間1年のMacBook Proです。付属品完備、目立った傷なし。プログラミング用に使用していました。',
    status: 'available',
    tags: ['Apple', 'ノートPC', 'プログラミング'],
    specifications: {
      model: 'MacBook Pro 13-inch',
      year: 2021,
      processor: 'Apple M1',
      memory: '8GB',
      storage: '256GB SSD',
      warranty: '2024年3月まで'
    },
    shipping: {
      available: true,
      cost: 1000,
      methods: ['宅急便', '手渡し']
    }
  }
];

export const facilitiesData = [
  {
    id: 1,
    name: '中央図書館',
    category: 'library',
    distance: 200,
    rating: 4.5,
    description: '24時間利用可能な図書館',
    tags: ['静か', '24時間', 'WiFi'],
    color: '#4facfe',
    coordinates: { x: 30, y: 40, lat: 35.6762, lng: 139.6503 },
    hours: {
      weekday: '24時間',
      weekend: '24時間',
      holiday: '9:00-22:00'
    },
    contact: {
      phone: '03-1234-5678',
      email: 'library@university.ac.jp',
      website: 'https://library.university.ac.jp'
    },
    amenities: ['WiFi', 'エアコン', '個人ブース', 'グループ学習室', 'コピー機', '自販機'],
    images: ['https://via.placeholder.com/300x200/4facfe/white?text=Library'],
    reviews: 234,
    canReserve: true,
    currentUsers: 45,
    maxCapacity: 200,
    reservationSlots: 30,
    facilities: {
      studyRooms: 20,
      computers: 50,
      printers: 5,
      scanners: 3
    }
  }
];

export const notificationsData = [
  {
    id: 1,
    type: 'like',
    fromUserId: 2,
    fromUser: '田中太郎',
    message: '田中太郎さんがあなたの投稿にいいねしました',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
    postId: 1,
    actionUrl: '/post/1'
  },
  {
    id: 2,
    type: 'comment',
    fromUserId: 3,
    fromUser: '佐藤花子',
    message: '佐藤花子さんがコメントしました',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    read: false,
    postId: 2,
    actionUrl: '/post/2',
    commentText: 'とても参考になりました！'
  }
];

// Helper functions for data manipulation
export const formatTime = (timestamp) => {
  const now = new Date();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 60) return `${minutes}分前`;
  if (hours < 24) return `${hours}時間前`;
  return `${days}日前`;
};

export const formatPrice = (price) => {
  return `¥${price.toLocaleString()}`;
};

export const getSeasonalGreeting = () => {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return 'こんにちは、春ですね！🌸';
  if (month >= 6 && month <= 8) return '暑い夏ですが頑張りましょう！☀️';
  if (month >= 9 && month <= 11) return '秋の季節、勉強に集中！🍂';
  return '寒い冬ですが、温かい気持ちで！❄️';
};
