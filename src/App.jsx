import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <a href="https://react.dev" target="_blank">
        <img src="/images/WechatIMG2451.jpg" className="logo" alt="My profile image" />
      </a>
        <a href="https://react.dev" target="_blank">
          <img src="/images/鸡.jpg" className="logo" alt="鸡" />
        </a>
      </div>
      <h1>Ding808</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
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
  )
}

export default App
