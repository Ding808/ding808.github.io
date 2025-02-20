import React, { useRef, useState, useEffect } from 'react';
import './MusicPlayer.css';

const tracks = [
  { title: 'Умри, если меня не любишь', url: '/Audio/Умри, если меня не любишь.mp3' },
  { title: 'inhuman', url: '/Audio/inhuman.mp3' },
  { title: 'Sad Ghost', url: '/Audio/Sad Ghost.mp3' },
  { title: 'Late Night Drive', url: '/Audio/Late Night Drive.mp3' },
  { title: 'Клетка', url: '/Audio/Клетка.mp3' },
  { title: 'El Vals Del Taco de Rana', url: '/Audio/El Vals Del Taco de Rana.mp3' },
];

const MusicPlayer = () => {
  const audioRef = useRef(null);

  // 状态管理
  const [isMinimized, setIsMinimized] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackMode, setPlaybackMode] = useState('order');

  // 同步音量
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // 切换歌曲时更新 src 并自动播放（利用 muted 绕过自动播放限制）
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = tracks[currentTrackIndex].url;
      audioRef.current.muted = true;
      audioRef.current
        .play()
        .then(() => {
          // 播放成功后取消静音
          audioRef.current.muted = false;
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log('播放失败:', err);
        });
    }
  }, [currentTrackIndex]);

  // 监听事件来更新进度和时长
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);
    audio.addEventListener('canplay', updateProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateProgress);
      audio.removeEventListener('canplay', updateProgress);
    };
  }, []);

  // 备用方案：使用定时器确保进度同步
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress(audio.currentTime);
      }, 200);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying]);

  // 播放/暂停切换
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => console.log('播放错误:', err));
      setIsPlaying(true);
    }
  };

  // 下一首处理
  const handleNext = () => {
    if (!audioRef.current) return;

    switch (playbackMode) {
      case 'random': {
        let randomIndex = Math.floor(Math.random() * tracks.length);
        if (randomIndex === currentTrackIndex && tracks.length > 1) {
          randomIndex = (randomIndex + 1) % tracks.length;
        }
        setCurrentTrackIndex(randomIndex);
        break;
      }
      case 'single':
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setIsPlaying(true);
        return;
      case 'order':
      default: {
        const nextIndex = (currentTrackIndex + 1) % tracks.length;
        setCurrentTrackIndex(nextIndex);
        break;
      }
    }
    setIsPlaying(true);
  };

  // 拖动进度条时更新当前播放时间
  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      if (isPlaying && audioRef.current.paused) {
        audioRef.current.play().catch((err) => console.log('播放错误:', err));
      }
    }
    setProgress(newTime);
  };

  // 格式化时间为 mm:ss 格式
  const formatTime = (time) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const progressPercentage = duration ? (progress / duration) * 100 : 0;
  const volumePercentage = volume * 100;

  // 切换播放模式
  const cyclePlaybackMode = () => {
    if (playbackMode === 'order') {
      setPlaybackMode('random');
    } else if (playbackMode === 'random') {
      setPlaybackMode('single');
    } else {
      setPlaybackMode('order');
    }
  };

  const modeIcon =
    playbackMode === 'order'
      ? '🔁'
      : playbackMode === 'random'
      ? '🔀'
      : '🔂';
  const modeTitle =
    playbackMode === 'order'
      ? 'In order'
      : playbackMode === 'random'
      ? 'Randomly'
      : 'Repeating';

  return (
    <>
      {/* 始终挂载 audio 元素 */}
      <audio
        ref={audioRef}
        preload="auto"
        onEnded={handleNext}
        src={tracks[currentTrackIndex].url}
      />

      {/* 根据 isMinimized 控制 UI 显示 */}
      {isMinimized ? (
        <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 1000 }}>
          <button
            onClick={() => setIsMinimized(false)}
            style={{
              backgroundColor: '#00ccff',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              cursor: 'pointer',
              boxShadow: '0 0 15px #00ccff',
              fontSize: '24px',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            &#9835;
          </button>
        </div>
      ) : (
        <div
          style={{
            position: 'fixed',
            right: 20,
            bottom: 20,
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: '15px',
            borderRadius: '10px',
            color: '#fff',
            width: '340px',
            border: '2px solid #00ccff',
            boxShadow: '0 0 15px #00ccff',
          }}
        >
          {/* 最小化按钮 */}
          <div style={{ position: 'absolute', top: 5, right: 5 }}>
            <button
              onClick={() => setIsMinimized(true)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#00ccff',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              &#x2015;
            </button>
          </div>

          {/* 歌曲标题 */}
          <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>
            {tracks[currentTrackIndex].title}
          </div>

          {/* 按钮区域 */}
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button
                onClick={togglePlay}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#00ccff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  color: '#000',
                  fontSize: '16px',
                }}
              >
                {isPlaying ? 'Stop' : 'Play'}
              </button>
              <button
                onClick={handleNext}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#00ccff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  color: '#000',
                  fontSize: '16px',
                }}
              >
                Next
              </button>
            </div>
            <button
              onClick={cyclePlaybackMode}
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#00ccff',
                fontSize: '20px',
                cursor: 'pointer',
              }}
              title={modeTitle}
            >
              {modeIcon}
            </button>
          </div>

          {/* 进度条 */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <span style={{ fontSize: '12px' }}>{formatTime(progress)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={progress}
              onChange={handleProgressChange}
              className="custom-range"
              style={{
                flex: 1,
                margin: '0 10px',
                background: `linear-gradient(to right, #fff 0%, #fff ${progressPercentage}%, #444 ${progressPercentage}%, #444 100%)`,
              }}
            />
            <span style={{ fontSize: '12px' }}>{formatTime(duration)}</span>
          </div>

          {/* 音量调节 */}
          <div>
            <label style={{ fontSize: '12px', marginRight: '5px' }}>音量:</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="custom-range"
              style={{
                width: '100%',
                background: `linear-gradient(to right, #fff 0%, #fff ${volumePercentage}%, #444 ${volumePercentage}%, #444 100%)`,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
