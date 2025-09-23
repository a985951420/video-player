import React, { useState, useRef, useEffect } from 'react';
import "./VideoPlayer.css";

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const VideoPlayer = ({ src, defaultControls, autoPlay = true }) => {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(defaultControls || true);
  const [lastTap, setLastTap] = useState(0);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
    // 在播放/暂停时保存进度
    if (video && src) {
      const savedTimeKey = `video_progress_${src}`;
      localStorage.setItem(savedTimeKey, video.currentTime.toString());
    }
  };

  const handleProgress = (e) => {
    // 阻止事件冒泡，避免触发容器的点击事件
    e.stopPropagation();

    const video = videoRef.current;
    const progressRect = progressRef.current.getBoundingClientRect();
    const clickX =
      e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX;
    const relativeX = clickX - progressRect.left;
    const time = (relativeX / progressRect.width) * duration;
    video.currentTime = Math.max(0, Math.min(time, duration));

    // 点击进度条后自动播放
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    }
  };

  const handleVolume = (e) => {
    const value = e.target.value;
    setVolume(value);
    videoRef.current.volume = value;
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    try {
      if (!isFullscreen) {
        if (container.requestFullscreen) {
          await container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
          await container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
          await container.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  const handleVideoClick = () => {
    const now = Date.now();
    const DOUBLE_CLICK_DELAY = 300;

    if (now - lastTap < DOUBLE_CLICK_DELAY) {
      // 双击
      toggleFullscreen();
    } else {
      // 单击切换播放状态
      togglePlay();
    }
    setLastTap(now);
  };

  // 鼠标移入视频区域显示控件
  const handleMouseEnter = () => {
    setShowControls(true);
  };

  // 处理自动播放和视频续播
  useEffect(() => {
    if (videoRef.current && src) {
      const video = videoRef.current;

      // 尝试从localStorage恢复播放进度
      const savedTimeKey = `video_progress_${src}`;
      const savedTime = localStorage.getItem(savedTimeKey);

      if (savedTime) {
        console.log("Restoring progress:", parseFloat(savedTime), "for", src);
        video.currentTime = parseFloat(savedTime);
        // 确保currentTime状态也同步
        setCurrentTime(parseFloat(savedTime));
      }

      // 执行自动播放
      if (autoPlay) {
        video
          .play()
          .then(() => {
            // 自动播放成功，确保isPlaying为true
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Auto-play was prevented:", error);
            // 自动播放被浏览器阻止时，设置isPlaying为false
            setIsPlaying(false);
          });
      }
    }
  }, [autoPlay, src]);

  // 保存播放进度的效果
  useEffect(() => {
    let interval = 0;
    // 创建一个针对当前视频的保存进度函数
    const saveCurrentVideoProgress = (name) => {
      console.log('saveCurrentVideoProgress', name);
      if (videoRef.current && src === name && isPlaying) {
        const video = videoRef.current;
        const savedTimeKey = `video_progress_${src}`;
        localStorage.setItem(savedTimeKey, video.currentTime.toString());
      }
    };

    // 监听页面卸载事件，保存播放进度
    window.addEventListener("beforeunload", saveCurrentVideoProgress);

    // 调整保存频率为每3秒一次，避免过于频繁的localStorage写入
    interval = setInterval(() => saveCurrentVideoProgress(src), 300);

    console.log('interval:', interval);

    return () => {
      window.removeEventListener("beforeunload", saveCurrentVideoProgress);
      clearInterval(interval);
      // 组件卸载时保存最后播放进度
      saveCurrentVideoProgress();
    };
  }, [src, isPlaying]);

  // 鼠标移出视频区域隐藏控件（仅在视频播放时）
  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    const handleMetadata = () => setDuration(video.duration);
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleFullscreenChange = () =>
      setIsFullscreen(!!document.fullscreenElement);

    video.addEventListener("loadedmetadata", handleMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      video.removeEventListener("loadedmetadata", handleMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);



  return (
    <div
      ref={containerRef}
      className={`video-player ${isFullscreen ? "fullscreen" : ""}`}
      onClick={handleVideoClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className="video-element"
        src={src}
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
      />
      <div className={`controls ${!showControls ? "hidden" : ""}`}>
        <button
          className="play-button"
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <div className="progress-container">
          <div
            ref={progressRef}
            className="progress-bar"
            onClick={handleProgress}
            onTouchEnd={handleProgress}
          >
            <div
              className="progress-filled"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <div className="time-display">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
        <div className="volume-control">
          <span className="volume-control-icon">
            {volume > 0.7
              ? "🔊"
              : volume > 0.3
              ? "🔉"
              : volume > 0
              ? "🔈"
              : "🔇"}
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolume}
          />
        </div>
        <button
          className="fullscreen-button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFullscreen();
          }}
        >
          {isFullscreen ? "⤮" : "⤢"}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;