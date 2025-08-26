import React, { useState, useEffect, useRef } from 'react';
import { Plus, X, Clock, BookOpen, User, Calendar, Search, ChevronLeft, ChevronRight, MapPin, Filter, Star, Calculator } from 'lucide-react';
import './Timetable.css';

const Timetable = ({ user }) => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [showClassModal, setShowClassModal] = useState(false);
  const [showGPAModal, setShowGPAModal] = useState(false);
  const [showMemoModal, setShowMemoModal] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [showAddClass, setShowAddClass] = useState(false);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [weeklyMemo, setWeeklyMemo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [draggedClass, setDraggedClass] = useState(null);
  const [dragOverCell, setDragOverCell] = useState(null);
  const dragRef = useRef(null);
  const [popularClasses, setPopularClasses] = useState([]);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [grades, setGrades] = useState({});
  const [targetGPA, setTargetGPA] = useState(3.5);
  const [weeklyMemos, setWeeklyMemos] = useState({});
  const [selectedMemoWeek, setSelectedMemoWeek] = useState(1);

  const handleDragStart = (e, classData, day, period) => {
    setDraggedClass({ ...classData, originalDay: day, originalPeriod: period });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, day, period) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverCell(`${day}-${period}`);
  };

  const handleDragLeave = () => {
    setDragOverCell(null);
  };

  const handleDrop = (e, day, period) => {
    e.preventDefault();
    setDragOverCell(null);
    
    if (!draggedClass) return;
    
    const newSchedule = { ...schedule };
    
    // Remove from original position
    if (newSchedule[draggedClass.originalDay] && newSchedule[draggedClass.originalDay][draggedClass.originalPeriod]) {
      delete newSchedule[draggedClass.originalDay][draggedClass.originalPeriod];
    }
    
    // Add to new position (if not occupied)
    if (!newSchedule[day]) newSchedule[day] = {};
    if (!newSchedule[day][period]) {
      newSchedule[day][period] = {
        subject: draggedClass.subject,
        professor: draggedClass.professor,
        room: draggedClass.room,
        color: draggedClass.color
      };
    }
    
    setSchedule(newSchedule);
    setDraggedClass(null);
  };

  const timeSlots = [
    { period: 1, time: '9:00-10:30' },
    { period: 2, time: '10:40-12:10' },
    { period: 3, time: '13:00-14:30' },
    { period: 4, time: '14:40-16:10' },
    { period: 5, time: '16:20-17:50' },
    { period: 6, time: '18:00-19:30' },
    { period: 7, time: '19:40-21:10' }
  ];

  const days = ['月', '火', '水', '木', '金'];
  // const daysFull = ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日']; // Reserved for future use

  const [schedule, setSchedule] = useState({
    monday: {
      1: { subject: '数学解析I', professor: '田中教授', room: 'A101', color: '#4facfe' },
      3: { subject: '英語コミュニケーション', professor: '佐藤教授', room: 'B205', color: '#ff6b6b' }
    },
    tuesday: {
      2: { subject: 'プログラミング基礎', professor: '山田教授', room: 'C301', color: '#2ecc71' }
    },
    wednesday: {
      4: { subject: '日本史', professor: '鈴木教授', room: 'D102', color: '#f39c12' }
    },
    thursday: {},
    friday: {
      1: { subject: '体育', professor: '高橋教授', room: '体育館', color: '#9b59b6' }
    }
  });

  useEffect(() => {
    const sampleTimetable = {
      '月-1': {
        subject: '線形代数学',
        room: 'A101',
        professor: '田中教授',
        credits: 2,
        description: '行列と線形変換について学ぶ',
        color: '#4facfe',
        rating: 4.2,
        reviews: 45
      },
      '火-2': {
        subject: 'プログラミング基礎',
        room: 'PC室B',
        professor: '佐藤准教授',
        credits: 3,
        description: 'Python プログラミングの基礎',
        color: '#ff6b6b',
        rating: 4.8,
        reviews: 67
      },
      '水-3': {
        subject: '英語コミュニケーション',
        room: 'C205',
        professor: 'Smith先生',
        credits: 2,
        description: '実践的な英語会話',
        color: '#2ecc71',
        rating: 4.5,
        reviews: 32
      },
      '木-1': {
        subject: 'データ構造とアルゴリズム',
        room: 'A203',
        professor: '山田教授',
        credits: 3,
        description: 'コンピュータサイエンスの基礎',
        color: '#f39c12',
        rating: 4.0,
        reviews: 28
      },
      '金-4': {
        subject: '統計学入門',
        room: 'B301',
        professor: '鈴木教授',
        credits: 2,
        description: '統計的思考の基礎',
        color: '#9b59b6',
        rating: 3.8,
        reviews: 41
      }
    };

    const samplePopularClasses = [
      {
        id: 1,
        subject: 'AI・機械学習入門',
        professor: '高橋教授',
        credits: 3,
        rating: 4.9,
        reviews: 89,
        difficulty: '中級',
        description: '人工知能の基礎から応用まで'
      },
      {
        id: 2,
        subject: 'ウェブデザイン',
        professor: '中村准教授',
        credits: 2,
        rating: 4.7,
        reviews: 56,
        difficulty: '初級',
        description: 'HTML/CSS/JavaScriptの実践'
      },
      {
        id: 3,
        subject: '心理学概論',
        professor: '松本教授',
        credits: 2,
        rating: 4.6,
        reviews: 73,
        difficulty: '初級',
        description: '人間の心理と行動について'
      }
    ];

    setPopularClasses(samplePopularClasses);
  }, []);

  const calculateGPA = () => {
    const allClasses = [];
    Object.keys(schedule).forEach(day => {
      Object.keys(schedule[day]).forEach(period => {
        const cls = schedule[day][period];
        if (cls && cls.credits) {
          allClasses.push(cls);
        }
      });
    });

    if (allClasses.length === 0) return '0.00';

    let totalPoints = 0;
    let totalCredits = 0;

    allClasses.forEach(cls => {
      const classKey = `${cls.subject}-${cls.professor}`;
      const grade = grades[classKey] || cls.rating || 4.0;
      const gradePoint = grade >= 4.5 ? 4.0 : 
                       grade >= 4.0 ? 3.5 :
                       grade >= 3.5 ? 3.0 :
                       grade >= 3.0 ? 2.5 :
                       grade >= 2.5 ? 2.0 :
                       grade >= 2.0 ? 1.5 :
                       grade >= 1.5 ? 1.0 : 0.0;

      totalPoints += gradePoint * cls.credits;
      totalCredits += cls.credits;
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const getTotalCredits = () => {
    const allClasses = [];
    Object.keys(schedule).forEach(day => {
      Object.keys(schedule[day]).forEach(period => {
        const cls = schedule[day][period];
        if (cls && cls.credits) {
          allClasses.push(cls);
        }
      });
    });
    return allClasses.reduce((sum, cls) => sum + cls.credits, 0);
  };

  const updateGrade = (classKey, newGrade) => {
    setGrades(prev => ({
      ...prev,
      [classKey]: parseFloat(newGrade)
    }));
  };

  const calculateRequiredGrade = (targetGPA, remainingCredits) => {
    const currentGPA = parseFloat(calculateGPA());
    const currentCredits = getTotalCredits();
    const totalCredits = currentCredits + remainingCredits;
    
    if (totalCredits === 0) return 0;
    
    const requiredTotalPoints = targetGPA * totalCredits;
    const currentTotalPoints = currentGPA * currentCredits;
    const requiredPoints = requiredTotalPoints - currentTotalPoints;
    
    return remainingCredits > 0 ? (requiredPoints / remainingCredits).toFixed(2) : 0;
  };

  const getWeekDate = (week) => {
    const startDate = new Date('2024-04-08'); // 春学期開始日
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + (week - 1) * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    return `${weekStart.getMonth() + 1}/${weekStart.getDate()} - ${weekEnd.getMonth() + 1}/${weekEnd.getDate()}`;
  };

  const handleMemoChange = (week, content) => {
    if (content.length <= 500) {
      setWeeklyMemos(prev => ({
        ...prev,
        [week]: content
      }));
    }
  };

  const saveMemo = (week) => {
    // 実際のアプリではここでサーバーに保存
    console.log(`第${week}週のメモを保存:`, weeklyMemos[week]);
    
    // 保存成功のフィードバック
    const saveBtn = document.querySelector('.memo-save-btn');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = '✅ 保存完了';
    saveBtn.style.background = '#4caf50';
    
    setTimeout(() => {
      saveBtn.textContent = originalText;
      saveBtn.style.background = '';
    }, 2000);
  };

  const handleCellClick = (day, timeIndex) => {
    const key = `${day}-${timeIndex}`;
    if (schedule[day] && schedule[day][timeIndex]) {
      setSelectedClass(schedule[day][timeIndex]);
      setShowClassModal(true);
    } else {
      setShowAddClassModal(true);
    }
  };

  const addClass = (classData) => {
    if (selectedClass) {
      setSchedule({
        ...schedule,
        [selectedClass.day]: {
          ...schedule[selectedClass.day],
          [selectedClass.timeIndex]: classData
        }
      });
      setShowAddClassModal(false);
      setSelectedClass(null);
    }
  };

  const removeClass = (key) => {
    const newSchedule = { ...schedule };
    delete newSchedule[key];
    setSchedule(newSchedule);
    setSelectedClass(null);
  };

  const TimetableGrid = () => (
    <div className="timetable-grid">
      <div className="time-header"></div>
      {days.map(day => (
        <div key={day} className="day-header">{day}</div>
      ))}
      
      {timeSlots.map((slot, index) => (
        <React.Fragment key={index}>
          <div className="time-slot">{slot.time}</div>
          {days.map(day => {
            const key = `${day}-${slot.period}`;
            
            return (
              <div
                key={key}
                className={`timetable-cell ${schedule[day] && schedule[day][slot.period] ? 'has-class' : 'empty'}`}
                style={schedule[day] && schedule[day][slot.period] ? { backgroundColor: schedule[day][slot.period].color + '20', borderColor: schedule[day][slot.period].color } : {}}
                onClick={() => handleCellClick(day, slot.period)}
              >
                {schedule[day] && schedule[day][slot.period] && (
                  <div className="class-info">
                    <div className="class-subject">{schedule[day][slot.period].subject}</div>
                    <div className="class-room">{schedule[day][slot.period].room}</div>
                    <div className="class-professor">{schedule[day][slot.period].professor}</div>
                  </div>
                )}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );

  const ClassDetailModal = () => (
    selectedClass && (
      <div className="modal-overlay" onClick={() => setSelectedClass(null)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>{selectedClass.subject}</h3>
            <button className="close-btn" onClick={() => setSelectedClass(null)}>×</button>
          </div>
          <div className="modal-body">
            <div className="class-details">
              <div className="detail-item">
                <MapPin size={16} />
                <span>教室: {selectedClass.room}</span>
              </div>
              <div className="detail-item">
                <BookOpen size={16} />
                <span>担当: {selectedClass.professor}</span>
              </div>
              <div className="detail-item">
                <Star size={16} />
                <span>単位: {selectedClass.credits}</span>
              </div>
              <div className="detail-item">
                <Star size={16} />
                <span>評価: {selectedClass.rating}/5.0 ({selectedClass.reviews}件)</span>
              </div>
            </div>
            <p className="class-description">{selectedClass.description}</p>
            <div className="class-actions">
              <button className="btn btn-secondary" onClick={() => removeClass(selectedClass.key)}>
                削除
              </button>
              <button className="btn btn-primary">掲示板へ</button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  const AddClassModal = () => (
    showAddClass && (
      <div className="modal-overlay" onClick={() => setShowAddClass(false)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <h3>授業を追加</h3>
          <button className="modal-close" onClick={() => setShowAddClass(false)}>×</button>
          <div className="form-group">
            <label className="form-label">教室</label>
            <input type="text" className="form-input" placeholder="教室番号" />
          </div>
          <div className="form-group">
            <label className="form-label">担当教授</label>
            <input type="text" className="form-input" placeholder="教授名" />
          </div>
          <div className="form-group">
            <label className="form-label">単位数</label>
            <select className="form-input">
              <option value="1">1単位</option>
              <option value="2">2単位</option>
              <option value="3">3単位</option>
              <option value="4">4単位</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">説明</label>
            <textarea className="form-textarea" placeholder="授業の説明" rows="3" />
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setShowAddClass(false);
            }}
          >
            追加
          </button>
        </div>
      </div>
    )
  );

  const GPACalculatorModal = () => {
    const allClasses = [];
    Object.keys(schedule).forEach(day => {
      Object.keys(schedule[day]).forEach(period => {
        const cls = schedule[day][period];
        if (cls && cls.credits) {
          allClasses.push({ ...cls, classKey: `${cls.subject}-${cls.professor}` });
        }
      });
    });

    return showGPAModal && (
      <div className="modal-overlay" onClick={() => setShowGPAModal(false)}>
        <div className="modal-content gpa-modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>📊 GPA計算機</h3>
            <button className="close-btn" onClick={() => setShowGPAModal(false)}>×</button>
          </div>
          <div className="modal-body">
            <div className="gpa-summary">
              <div className="gpa-card">
                <div className="gpa-main">
                  <span className="gpa-label">現在のGPA</span>
                  <span className="gpa-value current">{calculateGPA()}</span>
                </div>
                <div className="gpa-details">
                  <div className="gpa-item">
                    <span className="gpa-label">総単位数</span>
                    <span className="gpa-value">{getTotalCredits()}</span>
                  </div>
                  <div className="gpa-item">
                    <span className="gpa-label">履修科目</span>
                    <span className="gpa-value">{allClasses.length}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="target-gpa-section">
              <h4>🎯 目標GPA設定</h4>
              <div className="target-input-group">
                <label>目標GPA:</label>
                <input 
                  type="number" 
                  step="0.1" 
                  min="0" 
                  max="4.0" 
                  value={targetGPA}
                  onChange={(e) => setTargetGPA(parseFloat(e.target.value))}
                  className="gpa-input"
                />
              </div>
              <div className="required-grade">
                残り単位で必要な評価: <strong>{calculateRequiredGrade(targetGPA, 10)}</strong>/5.0
              </div>
            </div>

            <div className="gpa-classes">
              <h4>📚 履修科目の成績</h4>
              {allClasses.map((cls, index) => {
                const classKey = cls.classKey;
                const currentGrade = grades[classKey] || cls.rating || 4.0;
                return (
                  <div key={index} className="gpa-class-item">
                    <div className="class-info">
                      <span className="class-name">{cls.subject}</span>
                      <span className="class-credits">{cls.credits}単位</span>
                    </div>
                    <div className="grade-input-group">
                      <label>成績:</label>
                      <input 
                        type="number" 
                        step="0.1" 
                        min="0" 
                        max="5.0" 
                        value={currentGrade}
                        onChange={(e) => updateGrade(classKey, e.target.value)}
                        className="grade-input"
                      />
                      <span className="grade-letter">
                        {currentGrade >= 4.5 ? 'A+' :
                         currentGrade >= 4.0 ? 'A' :
                         currentGrade >= 3.5 ? 'B+' :
                         currentGrade >= 3.0 ? 'B' :
                         currentGrade >= 2.5 ? 'C+' :
                         currentGrade >= 2.0 ? 'C' : 'F'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="gpa-tips">
              <h4>💡 GPA向上のコツ</h4>
              <ul>
                <li>単位数の多い科目に集中する</li>
                <li>教授の評価基準を事前に確認</li>
                <li>出席率を高く保つ</li>
                <li>課題の提出期限を守る</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="timetable">
      <div className="timetable-header">
        <h1 className="page-title">時間割 📅</h1>
        <div className="header-actions">
              <button 
                className="btn btn-primary gpa-btn"
                onClick={() => setShowGPAModal(true)}
              >
                <Calculator size={16} />
                GPA: {calculateGPA()}
              </button>
        </div>
      </div>


      <div className="search-section">
        <div className="search-bar">
          <Search size={16} />
          <input
            type="text"
            className="search-input"
            placeholder="授業を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="filter-btn">
            <Filter size={16} />
          </button>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-label">GPA</span>
          <span className="stat-value">{calculateGPA()}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">単位</span>
          <span className="stat-value">{getTotalCredits()}</span>
        </div>
      </div>

      <TimetableGrid />

      <div className="popular-classes-section">
        <h3>人気授業</h3>
        <div className="popular-classes-list">
          {popularClasses.map(cls => (
            <div key={cls.id} className="popular-class-card card">
              <div className="class-header">
                <h4 className="class-title">{cls.subject}</h4>
                <div className="class-rating">
                  <Star size={14} fill="#f39c12" />
                  <span>{cls.rating}</span>
                </div>
              </div>
              <div className="class-meta">
                <span className="professor">{cls.professor}</span>
                <span className="credits">{cls.credits}単位</span>
                <span className={`difficulty difficulty-${cls.difficulty === '初級' ? 'easy' : cls.difficulty === '中級' ? 'medium' : 'hard'}`}>
                  {cls.difficulty}
                </span>
              </div>
              <p className="class-desc">{cls.description}</p>
              <div className="class-actions">
                <button className="btn btn-outline btn-small">詳細</button>
                <button className="btn btn-primary btn-small">追加</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="fab" onClick={() => setShowAddClass(true)}>
        <Plus size={24} />
      </button>

      <ClassDetailModal />
      <AddClassModal />
      <GPACalculatorModal />
    </div>
  );
};

export default Timetable;
