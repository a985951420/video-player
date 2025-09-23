import React from 'react';
import './VideoList.css';

const VideoList = ({ videos, onVideoSelect }) => {
  return (
    <div className="video-list">
      {videos.map((video, index) => (
        <div
          key={index}
          className="video-item"
          onClick={() => onVideoSelect(video)}
        >
          <img src={video.thumbnail} alt={video.title} />
          <div className="video-info">
            <h3>{video.title}</h3>
            <p>{video.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;