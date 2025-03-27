import { useRef, useState, useEffect } from 'react';

// Make sure to import AnimatedSection, SplitText, and any other required components
// Example:
import SplitText from '../Components/SplitText';

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

function About() {
  // Define a handler for when letter animation completes (customize as needed)

  return (
    <section className="about-section py-8 px-4 bg-gray-900">
      <AnimatedSection>
        {/* Title Section */}
        <h2 className="text-3xl font-bold text-center text-white mb-6">About Me</h2>

        {/* Main Content: Centered and limited width */}
        <div className="about-content max-w-4xl mx-auto">
          {/* Introduction Paragraph */}
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

          {/* Skills Section: 2×2 Grid Layout */}
          <div className="skills-grid grid grid-cols-2 gap-6 mt-6">
            <AnimatedSection animationFrom={{ opacity: 0 }} animationTo={{ opacity: 1 }} delay={10}>
              <div className="skill-item p-5 bg-gray-800 rounded shadow text-center transition-transform duration-300 transform hover:scale-105">
                <span className="text-3xl">💻</span>
                <p className="mt-3 text-lg font-semibold text-gray-100">Full Stack Development</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animationFrom={{ opacity: 0 }} animationTo={{ opacity: 1 }} delay={20}>
              <div className="skill-item p-5 bg-gray-800 rounded shadow text-center transition-transform duration-300 transform hover:scale-105">
                <span className="text-3xl">📱</span>
                <p className="mt-3 text-lg font-semibold text-gray-100">Mobile App Development</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animationFrom={{ opacity: 0 }} animationTo={{ opacity: 1 }} delay={30}>
              <div className="skill-item p-5 bg-gray-800 rounded shadow text-center transition-transform duration-300 transform hover:scale-105">
                <span className="text-3xl">🛜</span>
                <p className="mt-3 text-lg font-semibold text-gray-100">Web App Development</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}

export default About;