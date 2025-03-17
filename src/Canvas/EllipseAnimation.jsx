import React, { useEffect, useMemo, useRef, useState } from 'react';

const EllipseAnimation = () => {
  const items = [
    { src: '/images/Bilibili.png', link: 'https://space.bilibili.com/452004794' },
    { src: '/images/Discord.png', link: 'https://discord.com/users/754567756237766688' },
    { src: '/images/Github.png', link: 'https://github.com/Ding808' },
    { src: '/images/Gmail.png', link: 'https://mail.google.com/mail/?view=cm&fs=1&to=dingyeuyang@gmail.com' },
    { src: '/images/Instagram.png', link: 'https://https://www.instagram.com/pigeond007' },
    { src: '/images/Wechat.png', link: 'https://www.wechat.com/A1974538170' },
    { src: '/images/QQ.png', link: 'http://im.qq.com/index/1974538170' },
    { src: '/images/Steam.png', link: 'https://steamcommunity.com/profiles/76561198873711484/' },
    { src: '/images/Tiktok.png', link: 'https://www.tiktok.com/@dpigeon' },
    { src: '/images/X.png', link: 'https://x.com/pigeond365?s=21' },
  ];

  // 每个图片的初始角度（均匀分布）
  const initialOffsets = useMemo(
    () => items.map((_, i) => (i * 2 * Math.PI) / items.length),
    [items]
  );
  const [angleOffsets] = useState(initialOffsets);

  // 椭圆旋转相关状态
  const [globalRotation, setGlobalRotation] = useState(0);
  const globalRotationRef = useRef(globalRotation);
  useEffect(() => {
    globalRotationRef.current = globalRotation;
  }, [globalRotation]);

  // 手动控制角度（当鼠标悬停时冻结该图标位置）
  const [manualAngles, setManualAngles] = useState(Array(items.length).fill(null));
  // 鼠标 hover 状态
  const [isHovered, setIsHovered] = useState(Array(items.length).fill(false));

  // 持续更新全局旋转
  const speed = 0.007;
  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      setGlobalRotation((prev) => prev + speed);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // 保存各图标动画帧 id，便于取消动画过渡
  const transitionAnimationRefs = useRef({});

  /**
   * animateTransition：对图标 i 进行动画过渡
   * frozenAngle：鼠标离开时冻结的角度
   * duration：动画持续时间（单位毫秒）
   */
  const animateTransition = (i, frozenAngle, duration) => {
    const startTime = performance.now();
    const step = () => {
      const now = performance.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const targetAngle = globalRotationRef.current + angleOffsets[i];
      const newAngle = frozenAngle * (1 - progress) + targetAngle * progress;

      setManualAngles((prev) => {
        const newManual = [...prev];
        newManual[i] = newAngle;
        return newManual;
      });

      if (progress < 1) {
        transitionAnimationRefs.current[i] = requestAnimationFrame(step);
      } else {
        // 动画结束后清除手动角度，恢复跟随全局旋转
        setManualAngles((prev) => {
          const newManual = [...prev];
          newManual[i] = null;
          return newManual;
        });
        transitionAnimationRefs.current[i] = null;
      }
    };
    transitionAnimationRefs.current[i] = requestAnimationFrame(step);
  };

  // 椭圆参数（容器中心为 (300, 300)，X 轴半径 250，Y 轴半径 150，旋转 -45°）
  const centerX = 300,
    centerY = 300,
    radiusX = 250,
    radiusY = 150,
    theta = -Math.PI / 4;

  // 容器样式
  const containerStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: '600px',
    height: '600px',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
    pointerEvents: 'none',
  };

  // 新增：头像悬停状态
  const [avatarHovered, setAvatarHovered] = useState(false);

  return (
    <div>
      {/* 旋转容器 */}
      <div style={containerStyle}>
        {/* 在圆心放置个人头像，点击回主页，悬停动画 */}
        <img
          src="/images/ProfileImage.jpg"
          alt="My profile image"
          // 点击头像回到主页
          onClick={() => (window.location.href = '/')}
          // 悬停动画
          onMouseEnter={() => setAvatarHovered(true)}
          onMouseLeave={() => setAvatarHovered(false)}
          style={{
            position: 'absolute',
            left: 300,
            top: 300,
            // 悬停时放大，光晕加强
            transform: `translate(-50%, -50%) scale(${avatarHovered ? 1.2 : 1})`,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            width: 100,
            height: 100,
            borderRadius: '50%',
            pointerEvents: 'auto',
            boxShadow: avatarHovered
              ? '0 0 15px 5px rgba(255, 255, 255, 0.8)'
              : '0 0 8px rgba(255, 255, 255, 0.8)',
          }}
        />

        {/* 循环渲染图标 */}
        {items.map((item, i) => {
          // 计算图标在椭圆上的位置
          const angle = manualAngles[i] !== null ? manualAngles[i] : globalRotation + angleOffsets[i];
          const x0 = radiusX * Math.cos(angle);
          const y0 = radiusY * Math.sin(angle);
          const rotatedX = x0 * Math.cos(theta) - y0 * Math.sin(theta);
          const rotatedY = x0 * Math.sin(theta) + y0 * Math.cos(theta);
          const x = centerX + rotatedX;
          const y = centerY + rotatedY;

          // 悬停放大效果
          const scaleValue = isHovered[i] ? 1.3 : 1;
          const boxShadow = isHovered[i] ? '0 0 10px 4px #ADD8E6' : 'none';

          return (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'absolute',
                left: x,
                top: y,
                display: 'block',
                pointerEvents: 'auto',
              }}
              onMouseEnter={() => {
                // 若存在正在进行的动画过渡，则取消它
                if (transitionAnimationRefs.current[i]) {
                  cancelAnimationFrame(transitionAnimationRefs.current[i]);
                  transitionAnimationRefs.current[i] = null;
                }
                setIsHovered((prev) => {
                  const newHovered = [...prev];
                  newHovered[i] = true;
                  return newHovered;
                });
                // 悬停时冻结当前位置
                setManualAngles((prev) => {
                  const newManual = [...prev];
                  newManual[i] = globalRotation + angleOffsets[i];
                  return newManual;
                });
              }}
              onMouseLeave={() => {
                setIsHovered((prev) => {
                  const newHovered = [...prev];
                  newHovered[i] = false;
                  return newHovered;
                });
                const frozenAngle =
                  manualAngles[i] !== null ? manualAngles[i] : globalRotation + angleOffsets[i];
                const duration = 1000; // 动画过渡时间（毫秒）
                animateTransition(i, frozenAngle, duration);
              }}
            >
              <img
                src={item.src}
                alt={`img-${i}`}
                style={{
                  width: 60,
                  height: 60,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  transform: `scale(${scaleValue})`,
                  boxShadow: boxShadow,
                }}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default EllipseAnimation;
