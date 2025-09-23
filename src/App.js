import React, { useState, useMemo } from 'react';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import RankingList from './components/RankingList/RankingList';
import Tabs from './components/Tabs/Tabs';
import './App.css';
import 第一个 from './video/视频.mp4';
import 第二个 from './video/布加迪.mp4';
import 第三个 from './video/星空Vincent.mp4';

// 热门视频数据
const hotVideos = [
  {
    id: 1,
    title: '2023年度最佳电影混剪',
    description: '年度精选电影混剪，带你重温精彩瞬间',
    src: 第一个,
    views: '1.2万',
    duration: '3:45',
    uploadDate: '2023-09-20',
    clickCount: 0
  },
  {
    id: 2,
    title: '独家：超级英雄电影幕后花絮',
    description: '揭秘超级英雄电影的制作过程',
    src: 第二个,
    views: '8,632',
    duration: '5:20',
    uploadDate: '2023-09-18',
    clickCount: 0
  },
  {
    id: 3,
    title: '经典动画电影回顾',
    description: '重温童年最爱的动画电影',
    src: 'https://example.com/video3.mp4',
    views: '6,521',
    duration: '4:15',
    uploadDate: '2023-09-15',
    clickCount: 0
  },
  {
    id: 4,
    title: '好莱坞动作场面混剪',
    description: '精选好莱坞动作电影精彩片段',
    src: 'https://example.com/video4.mp4',
    views: '5,893',
    duration: '6:30',
    uploadDate: '2023-09-12',
    clickCount: 0
  },
  {
    id: 5,
    title: '科幻电影特效解析',
    description: '揭秘顶级科幻电影的特效制作',
    src: 'https://example.com/video5.mp4',
    views: '4,752',
    duration: '7:45',
    uploadDate: '2023-09-10',
    clickCount: 0
  }
];

// 最新视频数据
const latestVideos = [
  {
    id: 6,
    title: '新片速递：本周最新电影预告',
    description: '最新电影预告片合集',
    src: 第三个,
    views: '3,241',
    duration: '4:00',
    uploadDate: '2023-09-23',
    clickCount: 0
  },
  {
    id: 7,
    title: '独家采访：知名导演谈新作',
    description: '导演分享新电影创作历程',
    src: 'https://example.com/video7.mp4',
    views: '2,845',
    duration: '8:30',
    uploadDate: '2023-09-22',
    clickCount: 0
  },
  {
    id: 8,
    title: '电影配乐制作幕后',
    description: '探索电影配乐的创作过程',
    src: 'https://example.com/video8.mp4',
    views: '2,156',
    duration: '5:45',
    uploadDate: '2023-09-21',
    clickCount: 0
  },
  {
    id: 9,
    title: '新片评测：本周必看电影',
    description: '专业影评人为你推荐本周新片',
    src: 'https://example.com/video9.mp4',
    thumbnail: 'https://via.placeholder.com/300x200',
    views: '1,987',
    duration: '6:15',
    uploadDate: '2023-09-21',
    clickCount: 0
  },
  {
    id: 10,
    title: '特效化妆师的工作日常',
    description: '揭秘电影特效化妆的创作过程',
    src: 'https://example.com/video10.mp4',
    views: '1,654',
    duration: '4:50',
    uploadDate: '2023-09-20',
    clickCount: 0
  }
];

function App() {
  // 初始化视频数据，添加点击次数和修改次数
  const [hotState, setHotState] = useState(
    hotVideos.map(v => ({ ...v, clickCount: 0 }))
  );
  const [latestState, setLatestState] = useState(
    latestVideos.map(v => ({ ...v, clickCount: 0 }))
  );
  const [selectedVideo, setSelectedVideo] = useState(hotState[0]);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);

  // 每个列表分别维护自己的高亮项
  const [hotActiveId, setHotActiveId] = useState(0);
  const [latestActiveId, setLatestActiveId] = useState(0);
  const [defaultControls, setDefaultControls] = useState(true);

  // 点击视频时，增加点击次数并设置高亮
  const handleVideoSelect = (video, type) => {
    if (video.editCount !== undefined) {
      if (type === 'hot') {
        setHotState(hotState.map(v => v.id === video.id ? { ...v, clickCount: video.editCount } : v));
        setHotActiveId(video.id);
        const updated = hotState.find(v => v.id === video.id);
        setSelectedVideo({ ...updated, clickCount: video.editCount });
      } else if (type === 'latest') {
        setLatestState(latestState.map(v => v.id === video.id ? { ...v, clickCount: video.editCount } : v));
        setLatestActiveId(video.id);
        const updated = latestState.find(v => v.id === video.id);
        setSelectedVideo({ ...updated, clickCount: video.editCount });
      }
    }else{
      if (type === 'hot') {
        setHotState(hotState.map(v => v.id === video.id ? { ...v, clickCount: video.clickCount + 1 } : v));
        setHotActiveId(video.id);
        const updated = hotState.find(v => v.id === video.id);
        setSelectedVideo({ ...updated, clickCount: video.clickCount + 1 });
      } else if (type === 'latest') {
        setLatestState(latestState.map(v => v.id === video.id ? { ...v, clickCount: video.clickCount + 1 } : v));
        setLatestActiveId(video.id);
        const updated = latestState.find(v => v.id === video.id);
        setSelectedVideo({ ...updated, clickCount: video.clickCount + 1 });
      }
    }
    setDefaultControls(true);
    // 设置自动播放
    setShouldAutoPlay(true);
  };

  // 修改点击次数（热门榜专用）
  const handleEditCount = (video) => {
    setHotState(hotState.map(v => v.id === video.id ? { ...v, clickCount: video.editCount } : v));
    const updated = hotState.find(v => v.id === video.id);
    setSelectedVideo({ ...updated, clickCount: video.editCount });
  };

  // 排序
  const sortedHotVideos = useMemo(() => {
    return [...hotState].sort((a, b) => {
      const viewsA = parseInt(a.views.replace(/[^0-9]/g, ''));
      const viewsB = parseInt(b.views.replace(/[^0-9]/g, ''));
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
          <VideoPlayer src={selectedVideo.src} defaultControls={defaultControls} autoPlay={shouldAutoPlay} />
          <div className="video-info">
            <h2>{selectedVideo.title}</h2>
            <p>{selectedVideo.description}</p>
            <div className="video-stats">
              <span className="upload-date">{selectedVideo.uploadDate}</span>
              <span className="click-count">点击次数：{selectedVideo.clickCount || 0}</span>
            </div>
          </div>
        </div>
        <div className="rankings-section">
          <Tabs items={tabItems} />
        </div>
      </main>
    </div>
  );
}

export default App;