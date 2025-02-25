import ParticleBackground from '../Canvas/ParticleBackground'; 
import BlurText from "../Canvas/BlurText";
const handleAnimationComplete = () => {
  console.log('Animation completed!');
};



function Home() {
  return (
    <>
      <div>
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
      <h1><BlurText
            text="Welcome to my own Portfolio Website !!!"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-2xl mb-8"
          /></h1>
    </>
  );
}

export default Home;
