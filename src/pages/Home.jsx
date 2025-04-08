import React, { useRef, useState, useEffect } from 'react';
import BlurText from '../Canvas/BlurText';
import './Home.css'; 
import SplitText from "../Components/SplitText";
import TiltedCard from '../Components/TiltedCard';

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
              <img src="/images/java-script.png" alt="JavaScript" />
              <p>JavaScript</p>
            </div>
            <div className="skill-item">
              <img src="/images/c-sharp.png" alt="CSharp" />
              <p>C#</p>
            </div>
            <div className="skill-item">
              <img src="/images/python.png" alt="Python" />
              <p>Python</p>
            </div>
            <div className="skill-item">
              <img src="/images/swift.png" alt="Swift" />
              <p>Swift</p>
            </div>
            <div className="skill-item">
              <img src="/images/react.png" alt="React" />
              <p>React</p>
            </div>
            <div className="skill-item">
              <img src="/images/java.png" alt="Java" />
              <p>Java</p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Projects 区域 */}
   
      <section className="projects-section">
        <AnimatedSection>
          <h2>Featured Projects</h2>
          <div className="projects-grid">
            {/* Finance App 项目卡片 */}
            <div className="project-card">
              <TiltedCard
                imageSrc="/images/admin-dashboard.png"
                altText="Finance App"
                captionText="Finance App"
                /* 去掉固定尺寸，让卡片随容器自适应 */
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="tilted-card-demo-text">
                    This is my finance app project
                  </p>
                }
              />
              <h3>Finance App</h3>
              <p>This is my finance app project</p>
            </div>

            {/* College Portal 项目卡片 */}
            <div className="project-card">
              <TiltedCard
                imageSrc="/images/ecommerce.png"
                altText="College Portal"
                captionText="College Portal"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="tilted-card-demo-text">
                    This is my college portal project
                  </p>
                }
              />
              <h3>College Portal</h3>
              <p>This is my college portal project</p>
            </div>

            {/* My Portfolio Website 项目卡片 */}
            <div className="project-card">
              <TiltedCard
                imageSrc="/images/ai-chatbot.png"
                altText="My Portfolio Website"
                captionText="My Portfolio Website"
                rotateAmplitude={12}
                scaleOnHover={1.2}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="tilted-card-demo-text">
                    This is my own portfolio website project
                  </p>
                }
              />
              <h3>My Portfolio Website</h3>
              <p>This is my own portfolio website project</p>
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
          <button
          className="contact-button"
          onClick={() => setPage("contact")}>
          Get in Touch
        </button>

        </AnimatedSection>
      </section>
    </div>
  );
}

export default Home;
