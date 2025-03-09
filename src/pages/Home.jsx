import ParticleBackground from '../Canvas/ParticleBackground'; 
import BlurText from "../Canvas/BlurText";
import './Home.css';  // 引入外部样式文件

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

function Home() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* 背景半透明灰色区 */}
      <div className="fadeInBackground" />

      {/* 内容层，z-index比背景高 */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div>
          <h1 style={{ color: 'white', textAlign: 'left' }}>
            <BlurText
              text="👋 Hey there this is Ding!!"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-2xl mb-8"
            />
          </h1>
        </div>
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
      </div>
    </div>
  );
}

export default Home;
