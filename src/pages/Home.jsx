import React, { useRef, useState, useEffect } from 'react';
import BlurText from '../Canvas/BlurText';
import './Home.css'; 

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
      <section className="about-section">
        <AnimatedSection>
          <h2>About Me</h2>
          <div className="about-content">
            <p>
              With over 5 years of experience in software development, I specialize in building
              robust, scalable, and user-friendly web applications. I’m always looking to improve
              my skills and learn new technologies to keep up with the rapidly changing tech
              industry.
            </p>
            <p>
              <strong>Core Focus Areas:</strong> Full-stack Web Development · Mobile Development ·
              Database Design · Cloud Services
            </p>
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
