# React 视频播放器项目

这是一个基于 React 开发的现代化视频播放器组件，支持播放控制、进度保存、全屏切换等功能。该组件采用响应式设计，可在不同设备上提供良好的用户体验。

## 🚀 项目特点

- **完整的播放控制**：播放/暂停、进度条拖动、音量调节、全屏切换
- **自动保存播放进度**：使用 localStorage 保存每个视频的播放位置，下次观看时自动续播
- **双击全屏**：支持双击视频进入/退出全屏模式
- **响应式设计**：适配不同屏幕尺寸的设备
- **触控支持**：兼容移动设备的触摸操作
- **自动播放选项**：可配置是否自动开始播放

## 🛠️ 技术栈

- React 19.1.1
- JavaScript (ES6+)
- CSS3
- Create React App

## 📦 安装与运行

### 前置要求

- Node.js (>= 14.0.0)
- npm (>= 6.0.0) 或 yarn

### 安装依赖

```bash
npm install
# 或使用 yarn
# yarn install
```

### 开发模式

运行开发服务器，访问 [http://localhost:3000](http://localhost:3000) 查看应用

```bash
npm start
```

### 构建生产版本

构建用于生产环境的应用程序，输出到 `build` 目录

```bash
npm run build
```

### 运行测试

执行测试套件

```bash
npm test
```

## 🎯 核心功能详解

### 1. 播放控制

- 单击视频或播放按钮切换播放状态
- 拖动进度条跳转到视频任意位置
- 调节音量滑块控制音量大小
- 双击视频区域进入/退出全屏模式

### 2. 播放进度保存

- 自动保存每个视频的播放进度到 localStorage
- 播放/暂停时自动保存当前进度
- 每3秒自动保存一次播放进度
- 页面卸载或组件卸载时保存最后进度
- 切换视频时不会混淆播放进度

### 3. 智能控件显示

- 鼠标移入视频区域显示控件
- 视频播放时鼠标移出隐藏控件
- 视频暂停时始终显示控件

## 📁 项目结构

```text
video-player/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── VideoPlayer/
│   │   │   ├── VideoPlayer.jsx  # 视频播放器主组件
│   │   │   └── VideoPlayer.css  # 样式文件
│   │   ├── RankingList/
│   │   ├── Tabs/
│   │   └── VideoList/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## 📝 使用方法

### 在项目中引入视频播放器组件

```jsx
import VideoPlayer from './components/VideoPlayer/VideoPlayer';

function App() {
  return (
    <div className="app">
      <h1>React 视频播放器</h1>
      <VideoPlayer 
        src="/path/to/video.mp4" 
        autoPlay={true} 
        defaultControls={true}
      />
    </div>
  );
}

export default App;
```

### 组件属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| src | string | 必填 | 视频文件的URL路径 |
| autoPlay | boolean | true | 是否自动开始播放 |
| defaultControls | boolean | true | 是否默认显示控件 |

## 🔧 开发说明

### 代码优化

最近的代码优化包括：

1. 修复了React和hooks的导入问题
2. 移除了未使用的变量和冗余的effect
3. 优化了播放进度保存逻辑，调整了保存间隔
4. 简化了代码结构，提高了代码可读性
5. 减小了构建后的文件体积

### 性能优化

- 避免了重复获取DOM引用
- 优化了localStorage的写入频率
- 减少了不必要的控制台输出
- 清理了未使用的事件监听器

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 📄 许可证

MIT License

## 📞 联系

如有任何问题或建议，请随时联系项目维护者。
