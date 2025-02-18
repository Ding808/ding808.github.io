import ParticleBackground from '../Canvas/ParticleBackground'; 

function Home() {
  return (
    <>
      <div>
        <h1 style={{ color: 'white', textAlign: 'center' }}>
          Hey there!!
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
      <h1>Welcome to my website!</h1>
    </>
  );
}

export default Home;
