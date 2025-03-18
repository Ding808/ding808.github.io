import { useState } from 'react';
import './App.css';
import NavBar from './Components/NavBar'; 
import CustomCursor from './Canvas/CustomCursor'; 
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Lanyard from './Canvas/Lanyard.jsx';
import ResumePage from './pages/ResumePage';

function App() {
  const [page, setPage] = useState('home');

  // 根据页面名称渲染对应页面组件
  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home setPage={setPage} />;
      case 'resumepage':
        return <ResumePage setPage={setPage} />;
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
      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      
      {/* 导航栏 */}
      <NavBar setPage={setPage} currentPage={page} />
      
      {/* 渲染页面 */}
      {renderPage()}

      <CustomCursor />
    </>
  );
}

export default App;
