import React, { useEffect, useMemo, useRef, useState } from 'react';

const EllipseAnimation = () => {
  const items = [
    { src: '/images/Bilibili.png', link: 'https://space.bilibili.com/452004794' },
    { src: '/images/Discord.png', link: 'https://www.example.com/2' },
    { src: '/images/Github.png', link: 'https://github.com/Ding808' },
    { src: '/images/Gmail.png', link: 'https://mail.google.com/mail/?view=cm&fs=1&to=dingyeuyang@gmail.com' },
    { src: '/images/Instagram.png', link: 'https://www.example.com/5' },
    { src: '/images/Wechat.png', link: 'https://www.example.com/6' },
    { src: '/images/QQ.png', link: 'https://www.example.com/7' },
    { src: '/images/Steam.png', link: 'https://www.example.com/8' },
    { src: '/images/Tiktok.png', link: 'https://www.example.com/9' },
    { src: '/images/X.png', link: 'https://www.example.com/10' },
  ];

  // 每个图片的初始角度（均匀分布）
  const initialOffsets = useMemo(
    () => items.map((_, i) => (i * 2 * Math.PI) / items.length),
    [items]
  );
  const [angleOffsets, setAngleOffsets] = useState(initialOffsets);

  // globalRotation 表示整体旋转的进度
  const [globalRotation, setGlobalRotation] = useState(0);
  const globalRotationRef = useRef(globalRotation);
  useEffect(() => {
    globalRotationRef.current = globalRotation;
  }, [globalRotation]);

  // manualAngles：当不为 null 时，表示该图片当前使用手动控制的角度（用于悬停或动画过渡）
  const [manualAngles, setManualAngles] = useState(Array(items.length).fill(null));
  // isHovered：记录每个图片是否处于鼠标 hover 状态
  const [isHovered, setIsHovered] = useState(Array(items.length).fill(false));

  const speed = 0.008;
  // 持续更新 globalRotation 以实现整体旋转效果
  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      setGlobalRotation(prev => prev + speed);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // 保存各图片动画帧 id，便于取消动画过渡
  const transitionAnimationRefs = useRef({});

  /**
   * animateTransition：对图片 i 进行动画过渡
   * frozenAngle：鼠标离开时冻结的角度
   * duration：动画持续时间（单位毫秒）
   *
   * 每一帧计算当前目标角度为：
   *    targetAngle = 当前 globalRotation + angleOffsets[i]
   * 然后用线性插值使图片的角度从 frozenAngle 平滑过渡到 targetAngle，
   * 以确保动画结束时图片的位置与旋转队列完全吻合。
   */
  const animateTransition = (i, frozenAngle, duration) => {
    const startTime = performance.now();
    const step = () => {
      const now = performance.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const targetAngle = globalRotationRef.current + angleOffsets[i];
      const newAngle = frozenAngle * (1 - progress) + targetAngle * progress;
      setManualAngles(prev => {
        const newManual = [...prev];
        newManual[i] = newAngle;
        return newManual;
      });
      if (progress < 1) {
        transitionAnimationRefs.current[i] = requestAnimationFrame(step);
      } else {
        // 动画结束后清除手动角度，恢复跟随全局旋转
        setManualAngles(prev => {
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
  const centerX = 300, centerY = 300, radiusX = 250, radiusY = 150, theta = -Math.PI / 4;

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '600px',
        height: '600px',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      {items.map((item, i) => {
        // 如果 manualAngles[i] 存在，则使用它；否则使用 globalRotation + angleOffsets[i]
        const angle = manualAngles[i] !== null ? manualAngles[i] : globalRotation + angleOffsets[i];
        // 计算椭圆轨迹上的未旋转坐标
        const x0 = radiusX * Math.cos(angle);
        const y0 = radiusY * Math.sin(angle);
        // 应用 -45° 旋转
        const rotatedX = x0 * Math.cos(theta) - y0 * Math.sin(theta);
        const rotatedY = x0 * Math.sin(theta) + y0 * Math.cos(theta);
        // 最终坐标（以容器中心为原点）
        const x = centerX + rotatedX;
        const y = centerY + rotatedY;

        // 当鼠标 hover 时显示选中特效：scale 1.3 且添加金色发光阴影
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
              setIsHovered(prev => {
                const newHovered = [...prev];
                newHovered[i] = true;
                return newHovered;
              });
              // 悬停时冻结当前位置
              setManualAngles(prev => {
                const newManual = [...prev];
                newManual[i] = globalRotation + angleOffsets[i];
                return newManual;
              });
            }}
            onMouseLeave={() => {
              setIsHovered(prev => {
                const newHovered = [...prev];
                newHovered[i] = false;
                return newHovered;
              });
              const frozenAngle =
                manualAngles[i] !== null ? manualAngles[i] : globalRotation + angleOffsets[i];
              const duration = 1000; // 500 毫秒动画过渡
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
  );
};

export default EllipseAnimation;
