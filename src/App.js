import React, { useState, useMemo, useEffect } from 'react';
import { API, getFullVideoUrl } from './api/routes';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import RankingList from './components/RankingList/RankingList';
import Tabs from './components/Tabs/Tabs';
import './App.css';

function App() {
  // 视频数据状态
  const [hotState, setHotState] = useState([]);
  const [latestState, setLatestState] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);
  const [hotActiveId, setHotActiveId] = useState(0);
  const [latestActiveId, setLatestActiveId] = useState(0);
  const [defaultControls, setDefaultControls] = useState(true);

  // API 获取视频数据（使用封装的 request）
  useEffect(() => {
    API.video.getMovieList()
      .then(data => {
        const hot = (data.hot || []).map(v => ({  
          ...v,
          description: v.title || '',
          views: v.views || '',
          duration: v.duration || '',
          uploadDate: v.uploadDate || '2023-09-20',
          src: getFullVideoUrl(v.url) // 使用工具函数获取完整URL
        }));
        const latest = (data.latest || []).map(v => ({
          ...v,
          description: v.description || '',
          views: v.views || '',
          duration: v.duration || '',
          uploadDate: v.uploadDate || '2023-09-20',
          src: getFullVideoUrl(v.url) // 使用工具函数获取完整URL
        }));
        setHotState(hot);
        setLatestState(latest);
        if (hot.length > 0) setSelectedVideo(hot[0]);
      })
      .catch(err => {
        // 全局异常已处理，这里可选本地兜底
        alert('视频数据加载失败，请稍后重试！');
      });
  }, []);

  // 点击视频时，增加点击次数并设置高亮
  const handleVideoSelect = (video, type) => {
    if (video.editCount !== undefined) {
      if (type === 'hot') {
        setHotState(hotState.map(v => v.id === video.id ? { ...v, clickCount: video.editCount } : v));
        setHotActiveId(video.id);
        setSelectedVideo({ ...video, clickCount: video.editCount });
      } else if (type === 'latest') {
        setLatestState(latestState.map(v => v.id === video.id ? { ...v, clickCount: video.editCount } : v));
        setLatestActiveId(video.id);
        setSelectedVideo({ ...video, clickCount: video.editCount });
      }
    } else {
      if (type === 'hot') {
        setHotState(hotState.map(v => v.id === video.id ? { ...v, clickCount: (v.clickCount || 0) + 1 } : v));
        setHotActiveId(video.id);
        setSelectedVideo({ ...video, clickCount: (video.clickCount || 0) + 1 });
      } else if (type === 'latest') {
        setLatestState(latestState.map(v => v.id === video.id ? { ...v, clickCount: (v.clickCount || 0) + 1 } : v));
        setLatestActiveId(video.id);
        setSelectedVideo({ ...video, clickCount: (video.clickCount || 0) + 1 });
      }
    }
    setDefaultControls(true);
    setShouldAutoPlay(true);
  };

  // 修改点击次数（热门榜专用）
  const handleEditCount = (video) => {
    setHotState(hotState.map(v => v.id === video.id ? { ...v, clickCount: video.editCount } : v));
    setSelectedVideo({ ...video, clickCount: video.editCount });
  };


  // 排序
  const sortedHotVideos = useMemo(() => {
    return [...hotState].sort((a, b) => {
      // 没有views字段时不排序
      if (!a.views || !b.views) return 0;
      const viewsA = parseInt((a.views || '').replace(/[^0-9]/g, ''));
      const viewsB = parseInt((b.views || '').replace(/[^0-9]/g, ''));
      return viewsB - viewsA;
    });
  }, [hotState]);

  const sortedLatestVideos = useMemo(() => {
    return [...latestState].sort((a, b) => {
      return new Date(b.uploadDate) - new Date(a.uploadDate);
    });
  }, [latestState]);

  const tabItems = [
    {
      title: "热门排行",
      content: (
        <RankingList
          videos={sortedHotVideos}
          onVideoSelect={video => handleVideoSelect(video, 'hot')}
          onEditCount={handleEditCount}
          activeId={hotActiveId}
          type="hot"
        />
      )
    },
    {
      title: "最新发布",
      content: (
        <RankingList
          videos={sortedLatestVideos}
          onVideoSelect={video => handleVideoSelect(video, 'latest')}
          activeId={latestActiveId}
          type="latest"
        />
      )
    }
  ];

  return (
    <div className="app">
      <header className="header">
        <h1>视频播放器</h1>
      </header>
      <main className="main-content">
        <div className="player-section">
          {selectedVideo && (
            <>
              <VideoPlayer src={selectedVideo.src} defaultControls={defaultControls} autoPlay={shouldAutoPlay} />
              <div className="video-info">
                <h2>{selectedVideo.title}</h2>
                <p>{selectedVideo.description}</p>
                <div className="video-stats">
                  <span className="upload-date">{selectedVideo.uploadDate}</span>
                  <span className="click-count">点击次数：{selectedVideo.clickCount || 0}</span>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="rankings-section">
          <Tabs items={tabItems} />
        </div>
      </main>
    </div>
  );
}

export default App;