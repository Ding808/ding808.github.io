import { useState } from 'react';
import './App.css';
import NavBar from './Components/NavBar'; 
import CustomCursor from './Canvas/CustomCursor'; 
import Home from './pages/Home';
import About from './pages/About';
import Hobbies from './pages/Hobbies';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import MusicPlayer from './Canvas/BackgroundMusic';

function App() {
  const [page, setPage] = useState('home');
  const [count, setCount] = useState(0);

  // reder tha page
  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home/>;
      case 'skills':
        return <Skills/>;
      case 'projects':
        return <Projects/>
      case 'experience':
        return <Experience/>
      case 'hobbies':
        return <Hobbies/>
      case 'about':
        return <About/>
      case 'contact':
        return <Contact/>
    }
  };

  return (
    <>
    {}
      {/* navigation bar */}
      <NavBar setPage={setPage} currentPage={page} />
      {/* remder the page */}
      {renderPage()}
      {/* mouse effect */}
      <MusicPlayer/>
      <CustomCursor />
    </>
  );
}

export default App;
