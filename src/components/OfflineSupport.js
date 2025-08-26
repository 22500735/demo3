import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Download, Upload } from 'lucide-react';
import './OfflineSupport.css';

const OfflineSupport = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);
  const [pendingActions, setPendingActions] = useState([]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
      syncPendingActions();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
      setTimeout(() => setShowOfflineMessage(false), 3000);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load pending actions from localStorage
    const saved = localStorage.getItem('pendingActions');
    if (saved) {
      setPendingActions(JSON.parse(saved));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const syncPendingActions = async () => {
    if (pendingActions.length === 0) return;

    console.log('Syncing pending actions:', pendingActions);
    
    // Simulate API calls
    for (const action of pendingActions) {
      try {
        // In real app, make actual API calls here
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('Synced action:', action);
      } catch (error) {
        console.error('Failed to sync action:', action, error);
      }
    }

    setPendingActions([]);
    localStorage.removeItem('pendingActions');
  };

  const addPendingAction = (action) => {
    const newActions = [...pendingActions, { ...action, timestamp: Date.now() }];
    setPendingActions(newActions);
    localStorage.setItem('pendingActions', JSON.stringify(newActions));
  };

  // Expose function globally for other components to use
  window.addOfflineAction = addPendingAction;

  return (
    <div className="offline-support">
      <div className={`connection-status ${isOnline ? 'online' : 'offline'}`}>
        {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
        <span className="status-text">
          {isOnline ? 'オンライン' : 'オフライン'}
        </span>
      </div>

      {showOfflineMessage && (
        <div className="offline-message">
          <WifiOff size={20} />
          <div className="message-content">
            <h4>オフラインモード</h4>
            <p>インターネット接続が切断されました。操作は後で同期されます。</p>
          </div>
        </div>
      )}

      {pendingActions.length > 0 && (
        <div className="pending-actions">
          <div className="pending-header">
            <Upload size={16} />
            <span>同期待ち: {pendingActions.length}件</span>
          </div>
          {isOnline && (
            <button className="sync-btn" onClick={syncPendingActions}>
              <Download size={14} />
              同期
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default OfflineSupport;
