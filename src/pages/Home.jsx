import ParticleBackground from '../Canvas/ParticleBackground'; 

function Home() {
  return (
    <>
      <div>
        <ParticleBackground />
        <h1 style={{ color: 'white', textAlign: 'center' }}>
          Welcome to my website
        </h1>
      </div>
      <div>
        <a target="_blank" rel="noreferrer">
          <img
            src="/images/WechatIMG2451.jpg"
            className="logo"
            alt="My profile image"
          />
        </a>
      </div>
      <h1>Ding808</h1>
    </>
  );
}

export default Home;
