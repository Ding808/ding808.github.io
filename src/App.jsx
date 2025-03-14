import { useState } from 'react';
import './App.css';
import NavBar from './Components/NavBar'; 
import CustomCursor from './Canvas/CustomCursor'; 
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import MusicPlayer from './Canvas/BackgroundMusic';
import ParticleBackground from './Canvas/ParticleBackground'; 

import Lanyard from './Canvas/Lanyard.jsx'


function App() {
  const [page, setPage] = useState('home');

  // 根据页面名称渲染对应页面组件
  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home />;
      case 'skills':
        return <Skills />;
      case 'projects':
        return <Projects />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      {/* 粒子背景组件放在最外层 */}
      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      <ParticleBackground />
      
      {/* 导航栏 */}
      <NavBar setPage={setPage} currentPage={page} />
      
      {/* 渲染页面 */}
      {renderPage()}

      {/* 背景音乐和自定义光标 */}
      <MusicPlayer />
      <CustomCursor />
    </>
  );
}

export default App;
