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

  // 控制是否处于重力模式
  const [gravityMode, setGravityMode] = useState(false);
  // 重力模式下每个图标的物理数据：{ x, y, vx, vy }
  const [physicsPositions, setPhysicsPositions] = useState(null);

  // 持续更新全局旋转（仅在非重力模式下）
  const speed = 0.007;
  useEffect(() => {
    if (gravityMode) return;
    let animationFrameId;
    const animate = () => {
      setGlobalRotation((prev) => prev + speed);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gravityMode]);

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

  /* ------------------ 物理模拟 ------------------ */
  useEffect(() => {
    if (!gravityMode) return;
    let lastTime = performance.now();
    const gravityAcceleration = 1000; // px/s²
    const restitution = 0.7; // 反弹系数
    const radius = 30; // 图标半径（图标尺寸 60x60）
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;

    const simulationStep = () => {
      const now = performance.now();
      const dt = (now - lastTime) / 1000; // 单位：秒
      lastTime = now;
      setPhysicsPositions((prevPositions) => {
        if (!prevPositions) return prevPositions;
        // 更新位置和速度
        const newPositions = prevPositions.map((pos) => {
          let newVY = pos.vy + gravityAcceleration * dt;
          let newVX = pos.vx; // 无水平加速度
          let newX = pos.x + newVX * dt;
          let newY = pos.y + newVY * dt;
          // 碰撞检测：左右边界
          if (newX - radius < 0) {
            newX = radius;
            newVX = -newVX * restitution;
          }
          if (newX + radius > containerWidth) {
            newX = containerWidth - radius;
            newVX = -newVX * restitution;
          }
          // 顶部和底部碰撞
          if (newY - radius < 0) {
            newY = radius;
            newVY = -newVY * restitution;
          }
          if (newY + radius > containerHeight) {
            newY = containerHeight - radius;
            newVY = -newVY * restitution;
            if (Math.abs(newVY) < 10) newVY = 0;
          }
          return { ...pos, x: newX, y: newY, vx: newVX, vy: newVY };
        });
        // 两两图标之间的碰撞检测（简单的圆碰撞检测）
        for (let i = 0; i < newPositions.length; i++) {
          for (let j = i + 1; j < newPositions.length; j++) {
            const dx = newPositions[j].x - newPositions[i].x;
            const dy = newPositions[j].y - newPositions[i].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 2 * radius && dist > 0) {
              const overlap = 2 * radius - dist;
              const nx = dx / dist;
              const ny = dy / dist;
              // 将两图标各自推开一半
              newPositions[i].x -= nx * overlap / 2;
              newPositions[i].y -= ny * overlap / 2;
              newPositions[j].x += nx * overlap / 2;
              newPositions[j].y += ny * overlap / 2;
              // 简单处理：交换法向分量
              const vi_n = newPositions[i].vx * nx + newPositions[i].vy * ny;
              const vj_n = newPositions[j].vx * nx + newPositions[j].vy * ny;
              newPositions[i].vx += (vj_n - vi_n) * nx * restitution;
              newPositions[i].vy += (vj_n - vi_n) * ny * restitution;
              newPositions[j].vx += (vi_n - vj_n) * nx * restitution;
              newPositions[j].vy += (vi_n - vj_n) * ny * restitution;
            }
          }
        }
        return newPositions;
      });
      requestAnimationFrame(simulationStep);
    };
    const animId = requestAnimationFrame(simulationStep);
    return () => cancelAnimationFrame(animId);
  }, [gravityMode]);

  /* ------------------ 按钮事件处理 ------------------ */
  // 点击 Gravity 按钮后，初始化每个图标的物理数据，并切换到重力模式
  const handleGravity = () => {
    if (!gravityMode) {
      // 原椭圆动画的容器在页面中的左上角位置
      const containerLeft = window.innerWidth / 2 - 300;
      const containerTop = window.innerHeight / 2 - 300;
      const initialPhysics = items.map((item, i) => {
        const angle = manualAngles[i] !== null ? manualAngles[i] : globalRotation + angleOffsets[i];
        const x0 = radiusX * Math.cos(angle);
        const y0 = radiusY * Math.sin(angle);
        const rotatedX = x0 * Math.cos(theta) - y0 * Math.sin(theta);
        const rotatedY = x0 * Math.sin(theta) + y0 * Math.cos(theta);
        // 转换为全屏坐标：原本 x 坐标为 centerX+rotatedX，相对于容器左上角（containerLeft）
        const x = containerLeft + (centerX + rotatedX);
        const y = containerTop + (centerY + rotatedY);
        return { x, y, vx: 0, vy: 0 };
      });
      setPhysicsPositions(initialPhysics);
      setGravityMode(true);
    }
  };

  // 点击 Reset 按钮，重置为椭圆旋转状态
  const handleReset = () => {
    setGravityMode(false);
    setPhysicsPositions(null);
    setGlobalRotation(0);
    setManualAngles(Array(items.length).fill(null));
    setIsHovered(Array(items.length).fill(false));
  };

  // 根据模式设置容器样式
  const containerStyle = gravityMode
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: 'none',
      }
    : {
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '600px',
        height: '600px',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        pointerEvents: 'none',
      };

  return (
    <div>
      {/* 控制按钮 */}
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 10000 }}>
        <button onClick={handleGravity} disabled={gravityMode} style={{ marginRight: '10px' }}>
          Gravity
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div style={containerStyle}>
        {items.map((item, i) => {
          let x, y;
          if (!gravityMode) {
            const angle = manualAngles[i] !== null ? manualAngles[i] : globalRotation + angleOffsets[i];
            const x0 = radiusX * Math.cos(angle);
            const y0 = radiusY * Math.sin(angle);
            const rotatedX = x0 * Math.cos(theta) - y0 * Math.sin(theta);
            const rotatedY = x0 * Math.sin(theta) + y0 * Math.cos(theta);
            x = centerX + rotatedX;
            y = centerY + rotatedY;
          } else {
            if (physicsPositions && physicsPositions[i]) {
              x = physicsPositions[i].x;
              y = physicsPositions[i].y;
            } else {
              x = 0;
              y = 0;
            }
          }
          // 只有在非重力模式下才使用悬停特效
          const scaleValue = !gravityMode && isHovered[i] ? 1.3 : 1;
          const boxShadow = !gravityMode && isHovered[i] ? '0 0 10px 4px #ADD8E6' : 'none';
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
              onMouseEnter={
                !gravityMode
                  ? () => {
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
                    }
                  : undefined
              }
              onMouseLeave={
                !gravityMode
                  ? () => {
                      setIsHovered((prev) => {
                        const newHovered = [...prev];
                        newHovered[i] = false;
                        return newHovered;
                      });
                      const frozenAngle =
                        manualAngles[i] !== null ? manualAngles[i] : globalRotation + angleOffsets[i];
                      const duration = 1000; // 动画过渡时间（毫秒）
                      animateTransition(i, frozenAngle, duration);
                    }
                  : undefined
              }
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
