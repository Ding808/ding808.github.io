import ParticleBackground from '../Canvas/ParticleBackground'; 

function Home({ count, setCount }) {
  return (
    <>
      <div>
        <ParticleBackground />
        <h1 style={{ color: 'white', textAlign: 'center' }}>
          欢迎来到我的网站
        </h1>
      </div>
      <div>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img
            src="/images/WechatIMG2451.jpg"
            className="logo"
            alt="My profile image"
          />
        </a>
        <a href="https://jinitaimei.com" target="_blank" rel="noreferrer">
          <img src="/images/鸡.jpg" className="logo" alt="鸡" />
        </a>
      </div>
      <h1>Ding808</h1>
      <div className="card">
        <button onClick={() => setCount((prev) => prev + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        This is my personal profile website.
      </p>
    </>
  );
}

export default Home;
