import React, { useState } from 'react';
import './RankingList.css';
import EditCountModal from './EditCountModal';

const RankingList = ({ videos, onVideoSelect, type, activeId }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVideo, setModalVideo] = useState(null);
  const [modalVideoCount, setModalVideoCount] = useState(0);

  const openModal = (video, e) => {
    e.stopPropagation();
    setModalVideo(video);
    setModalVideoCount(video.clickCount || 0);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setModalVideo(null);
  };
  const confirmModal = (num) => {
    if (!isNaN(num) && num >= 0 && modalVideo) {
      onVideoSelect({ ...modalVideo, editCount: num });
    }
    closeModal();
  };

  // 当前列表高亮只根据本列表的 activeId
  return (
    <div className="ranking-list">
      <div className="ranking-items">
        {[...videos].sort((a, b) => {
          if (type === 'hot') {
            const aCount = a.editCount !== undefined ? a.editCount : a.clickCount || 0;
            const bCount = b.editCount !== undefined ? b.editCount : b.clickCount || 0;
            return bCount - aCount;
          } else {
            return new Date(b.uploadDate) - new Date(a.uploadDate);
          }
        }).map((video, index) => {
          // 只高亮本列表的 activeId
          const isActive = activeId === video.id;
          return (
            <div
              key={video.id}
              className={`ranking-item${isActive ? ' active' : ''}`}
              onClick={() => onVideoSelect(video)}
            >
              <div className="ranking-number">{index + 1}</div>
              <div className="ranking-info">
                <h3 className="ranking-item-title">{video.title}</h3>
                <div className="ranking-stats">
                  <span className="ranking-click">点击次数：{video.clickCount || 0}</span>
                      <button
                        className={`edit-btn${isActive ? ' active' : ''}`}
                        style={{
                          padding: '6px 18px',
                          background: isActive ? 'linear-gradient(90deg,#1976d2,#4fc3f7)' : 'linear-gradient(90deg,#1a73e8,#4fc3f7)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '20px',
                          fontSize: '15px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.12)' : '0 1px 4px rgba(0,0,0,0.08)',
                          marginLeft: '12px',
                          letterSpacing: '1px',
                          transition: 'background 0.2s, box-shadow 0.2s'
                        }}
                        onClick={e => openModal(video, e)}
                      >修改</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <EditCountModal
        visible={modalVisible}
        onClose={closeModal}
        onConfirm={confirmModal}
        defaultValue={modalVideoCount}
      />
    </div>
  );
};

export default RankingList;