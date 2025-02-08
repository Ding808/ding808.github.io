import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
        <img src="/images/蔡徐坤-篮球.gif" className="logo" alt="蔡徐坤打篮球" />
      </a>
        <a href="https://react.dev" target="_blank">
          <img src="/images/鸡.jpg" className="logo" alt="鸡" />
        </a>
      </div>
      <h1>Vite + React</h1>
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
