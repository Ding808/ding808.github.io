import { useState } from 'react';
import './App.css';
import NavBar from './Components/NavBar'; 
import CustomCursor from './Canvas/CustomCursor'; 
import Home from './pages/Home';
import About from './pages/About';

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
    }
  };

  return (
    <>
      {/* navigation bar */}
      <NavBar setPage={setPage} currentPage={page} />
      {/* remder the page */}
      {renderPage()}
      {/* mouse effect */}
      <CustomCursor />
    </>
  );
}

export default App;
