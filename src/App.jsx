// App.jsx
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
        return <Home count={count} setCount={setCount} />;
      case 'about':
        return <About />;
      case 'contact':
        return (
          <div style={{ padding: '20px', color: 'white' }}>
            <h2>Contact</h2>
            <p>You can contact me at: example@example.com</p>
          </div>
        );
      default:
        return (
          <div style={{ padding: '20px', color: 'white' }}>
            <h2>Page Not Found</h2>
          </div>
        );
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
