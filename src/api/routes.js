import { request } from './request';

// API基础配置
const BASE_URL = 'http://192.168.100.6';

// API路由配置
export const API_ROUTES = {
  // 视频相关接口
  VIDEO: {
    // 获取视频列表
    GET_MOVIE_LIST: `${BASE_URL}/api/play/movielist`,
    // 可以添加更多视频相关接口...
  },
  // 用户相关接口
  USER: {
    // 待添加...
  },
  // 其他模块接口...
};

// API统一请求方法
export const API = {
  // 视频相关
  video: {
    // 获取视频列表
    getMovieList: () => {
      return request(API_ROUTES.VIDEO.GET_MOVIE_LIST);
    },
    // 可以添加更多方法...
  }
};

// 工具函数：拼接完整的视频URL
export const getFullVideoUrl = (path) => {
  if (!path) return '';
  return `${BASE_URL}/${path}`;
};