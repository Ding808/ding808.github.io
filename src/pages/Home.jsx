import React, { useRef, useState, useEffect } from 'react';
import ParticleBackground from '../Canvas/ParticleBackground';
import BlurText from "../Canvas/BlurText";

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

const AnimatedSection = ({ children }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 1s ease-out, transform 1s ease-out',
      }}
      className="animated-section"
    >
      {children}
    </div>
  );
};

function Home() {
  // 通用样式
  const sectionStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '50px 0', // 每个页面之间的间隔
    padding: '50px 20px',
    borderRadius: '8px', // 可选：添加圆角效果
  };

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* 背景粒子动画 */}
      <ParticleBackground />

      {/* 英雄区：欢迎信息 */}
      <section
        style={{
          ...sectionStyle,
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // 英雄区背景稍微透明
          margin: '0 0 50px 0', // 顶部区不需要上间隔
        }}
      >
        <h1 style={{ color: 'white', textAlign: 'center' }}>
          <BlurText
            text="Hey there !!"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-2xl mb-8"
          />
        </h1>
        <div>
          <a target="_blank" rel="noreferrer">
            <img
              src="/images/ProfileImage.jpg"
              className="logo"
              alt="My profile image"
            />
          </a>
        </div>
        <h1 style={{ color: 'white', textAlign: 'center' }}>
          <BlurText
            text="Welcome to my own Portfolio Website !!!"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-2xl mb-8"
          />
        </h1>
      </section>

      {/* About 页面简介 */}
      <section
        style={{
          ...sectionStyle,
          backgroundColor: 'rgba(34, 34, 34, 0.8)',
        }}
      >
        <AnimatedSection>
          <h2 style={{ color: 'white', textAlign: 'center' }}>About</h2>
          <p style={{ color: 'white', maxWidth: '600px', textAlign: 'center' }}>
            some text
          </p>
        </AnimatedSection>
      </section>

      {/* Projects 页面简介 */}
      <section
        style={{
          ...sectionStyle,
          backgroundColor: 'rgba(51, 51, 51, 0.8)',
        }}
      >
        <AnimatedSection>
          <h2 style={{ color: 'white', textAlign: 'center' }}>Projects</h2>
          <p style={{ color: 'white', maxWidth: '600px', textAlign: 'center' }}>
          some text
          </p>
        </AnimatedSection>
      </section>

      {/* Skills 页面简介 */}
      <section
        style={{
          ...sectionStyle,
          backgroundColor: 'rgba(68, 68, 68, 0.8)',
        }}
      >
        <AnimatedSection>
          <h2 style={{ color: 'white', textAlign: 'center' }}>Skills</h2>
          <p style={{ color: 'white', maxWidth: '600px', textAlign: 'center' }}>
          some text
          </p>
        </AnimatedSection>
      </section>

      {/* Contact 页面简介 */}
      <section
        style={{
          ...sectionStyle,
          backgroundColor: 'rgba(85, 85, 85, 0.8)',
        }}
      >
        <AnimatedSection>
          <h2 style={{ color: 'white', textAlign: 'center' }}>Contact</h2>
          <p style={{ color: 'white', maxWidth: '600px', textAlign: 'center' }}>
          some text
          </p>
        </AnimatedSection>
      </section>
    </div>
  );
}

export default Home;
