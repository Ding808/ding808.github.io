import React, { useRef, useState, useEffect } from 'react';
import BlurText from '../Canvas/BlurText';
import './Home.css'; 
import SplitText from "../Components/SplitText";

// 动画完成后的回调
const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

// Intersection Observer 动画封装
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
      className="animated-section"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 1s ease-out, transform 1s ease-out',
      }}
      ref={ref}
    >
      {children}
    </div>
  );
};

function Home({setPage}) {
  return (
    <div className="home-container">
      {/* Hero 区域 */}
      <section className="hero-section">
        {/* 左侧文字 */}
        <div className="hero-left">
          <h1>
            <BlurText
              text="Hey, I'm Ding"
              delay={100}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-3xl"
            />
          </h1>
          <h2>
            <BlurText
              text="Software Developer"
              delay={200}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-2xl"
            />
          </h2>
          <p>
            <BlurText
                text=" Passionate about crafting seamless user experiences through clean, efficient code. Driven by innovation, guided by design."
                delay={100}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-3xl"
              />
          </p>
          <button
              className="resume-button"
              onClick={() => setPage('resumepage')}
            >
              View Resume
            </button>
        </div>

        {/* 右侧形象照片 */}
        <div className="hero-right">
          <img
            src="/images/ProfileImage.jpg"
            alt="Profile"
          />
        </div>
      </section>

      {/* About 区域 */}
      <section className="about-section py-8 px-4 bg-gray-900">
        <AnimatedSection>
          {/* 标题部分 */}
          <h2 className="text-3xl font-bold text-center text-white mb-6">About Me</h2>

          {/* 内容主体，限制最大宽度，居中排版 */}
          <div className="about-content max-w-4xl mx-auto">
            {/* 简介段落 */}
            <p className="mb-6 text-lg leading-relaxed text-center text-gray-300">
              <SplitText
                text="With a strong foundation in computer science, I am passionate about software development, blockchain technology, and mobile computing. I specialize in building scalable and secure applications, turning ideas into reality through innovative solutions. My experience spans full-stack development, mobile app development, and web application development, with a strong focus on efficiency, performance, and user experience."
                className="text-xl font-medium"
                delay={10}
                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                easing="easeOutCubic"
                threshold={0.2}
                rootMargin="-50px"
                onLetterAnimationComplete={handleAnimationComplete}
              />
            </p>

            {/* 技能区域，2×2 网格布局，并加大卡片与卡片之间的间距 */}
            <div className="skills-grid grid grid-cols-2 gap-6 mt-6">
              <AnimatedSection
                animationFrom={{ opacity: 0 }}
                animationTo={{ opacity: 1 }}
                delay={10}
              >
                <div className="skill-item p-5 bg-gray-800 rounded shadow text-center transition-transform duration-300 transform hover:scale-105">
                  <span className="text-3xl">💻</span>
                  <p className="mt-3 text-lg font-semibold text-gray-100">Full Stack Development</p>
                </div>
              </AnimatedSection>

              <AnimatedSection
                animationFrom={{ opacity: 0 }}
                animationTo={{ opacity: 1 }}
                delay={20}
              >
                <div className="skill-item p-5 bg-gray-800 rounded shadow text-center transition-transform duration-300 transform hover:scale-105">
                  <span className="text-3xl">📱</span>
                  <p className="mt-3 text-lg font-semibold text-gray-100">Mobile App Development</p>
                </div>
              </AnimatedSection>

              <AnimatedSection
                animationFrom={{ opacity: 0 }}
                animationTo={{ opacity: 1 }}
                delay={30}
              >
                <div className="skill-item p-5 bg-gray-800 rounded shadow text-center transition-transform duration-300 transform hover:scale-105">
                  <span className="text-3xl">🛜</span>
                  <p className="mt-3 text-lg font-semibold text-gray-100">Web App Development</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </AnimatedSection>
      </section>






      {/* Skills 区域 */}
      <section className="skills-section">
        <AnimatedSection>
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            {/* 示例技能卡片 */}
            <div className="skill-item">
              <img src="/images/javascript-icon.png" alt="JavaScript" />
              <p>JavaScript</p>
            </div>
            <div className="skill-item">
              <img src="/images/react-icon.png" alt="React" />
              <p>React</p>
            </div>
            <div className="skill-item">
              <img src="/images/node-icon.png" alt="Node.js" />
              <p>Node.js</p>
            </div>
            <div className="skill-item">
              <img src="/images/python-icon.png" alt="Python" />
              <p>Python</p>
            </div>
            <div className="skill-item">
              <img src="/images/python-icon.png" alt="Python" />
              <p>Python</p>
            </div>
            <div className="skill-item">
              <img src="/images/python-icon.png" alt="Python" />
              <p>Python</p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Projects 区域 */}
      <section className="projects-section">
        <AnimatedSection>
          <h2>Featured Projects</h2>
          <div className="projects-grid">
            {/* 示例项目卡片 */}
            <div className="project-card">
              <img
                src="/images/admin-dashboard.png"
                alt="Admin Dashboard"
              />
              <h3>Admin Dashboard</h3>
              <p>A comprehensive admin panel for managing data and user interactions.</p>
            </div>

            <div className="project-card">
              <img
                src="/images/ecommerce.png"
                alt="E-commerce App"
              />
              <h3>E-commerce App</h3>
              <p>A scalable, secure online store built with React and Node.js.</p>
            </div>

            <div className="project-card">
              <img
                src="/images/ai-chatbot.png"
                alt="AI Chatbot"
              />
              <h3>AI Chatbot</h3>
              <p>A conversational AI chatbot powered by NLP techniques.</p>
            </div>

            <div className="project-card">
              <img
                src="/images/realtime-chat.png"
                alt="Real-time Chat"
              />
              <h3>Real-time Chat</h3>
              <p>A socket-based real-time messaging app with custom channels.</p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Contact 区域 */}
      <section className="contact-section">
        <AnimatedSection>
          <h2>Contact</h2>
          <p className="contact-text">
            Interested in working together or have a question? Let’s connect!
          </p>
          <button className="contact-button" >
            Get in Touch
          </button>
        </AnimatedSection>
      </section>
    </div>
  );
}

export default Home;
