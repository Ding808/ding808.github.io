// NavBar.jsx
import React, { useRef, useEffect, useState } from 'react';

const NavBar = ({ setPage, currentPage, onHomeRef }) => {
  // create the ref
  const buttonRefs = {
    home: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    experience: useRef(null),
    hobbies: useRef(null),
    about: useRef(null),
  };

  // store the indication style
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  //mouse hoving reaction
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    if (onHomeRef) {
      onHomeRef(buttonRefs.home);
    }
  }, [onHomeRef]);

  // update width and height
  useEffect(() => {
    const activeButton = buttonRefs[currentPage]?.current;
    if (activeButton) {
      const { offsetLeft, offsetWidth } = activeButton;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [currentPage]);

  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <button
            ref={buttonRefs.home}
            style={{
              ...styles.navButton,
              ...(currentPage === 'home' ? styles.activeButton : {}),
              ...(hoveredButton === 'home' ? styles.hoveredButton : {}),
            }}
            onClick={() => setPage('home')}
            onMouseEnter={() => setHoveredButton('home')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Home
          </button>
        </li>
        <li style={styles.navItem}>
          <button
            ref={buttonRefs.skills}
            style={{
              ...styles.navButton,
              ...(currentPage === 'skills' ? styles.activeButton : {}),
              ...(hoveredButton === 'skills' ? styles.hoveredButton : {}),
            }}
            onClick={() => setPage('skills')}
            onMouseEnter={() => setHoveredButton('skills')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Skills
          </button>
        </li>
        <li style={styles.navItem}>
          <button
            ref={buttonRefs.projects}
            style={{
              ...styles.navButton,
              ...(currentPage === 'projects' ? styles.activeButton : {}),
              ...(hoveredButton === 'projects' ? styles.hoveredButton : {}),
            }}
            onClick={() => setPage('projects')}
            onMouseEnter={() => setHoveredButton('projects')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Peojects
          </button>
        </li>
        <li style={styles.navItem}>
          <button
            ref={buttonRefs.experience}
            style={{
              ...styles.navButton,
              ...(currentPage === 'experience' ? styles.activeButton : {}),
              ...(hoveredButton === 'experience' ? styles.hoveredButton : {}),
            }}
            onClick={() => setPage('experience')}
            onMouseEnter={() => setHoveredButton('experience')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Experience
          </button>
        </li>
        <li style={styles.navItem}>
          <button
            ref={buttonRefs.hobbies}
            style={{
              ...styles.navButton,
              ...(currentPage === 'hobbies' ? styles.activeButton : {}),
              ...(hoveredButton === 'hobbies' ? styles.hoveredButton : {}),
            }}
            onClick={() => setPage('hobbies')}
            onMouseEnter={() => setHoveredButton('hobbies')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Hobbies
          </button>
        </li>
        <li style={styles.navItem}>
          <button
            ref={buttonRefs.about}
            style={{
              ...styles.navButton,
              ...(currentPage === 'about' ? styles.activeButton : {}),
              ...(hoveredButton === 'about' ? styles.hoveredButton : {}),
            }}
            onClick={() => setPage('about')}
            onMouseEnter={() => setHoveredButton('about')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            About
          </button>
        </li>
        {}
        <div
          style={{
            ...styles.indicator,
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
        />
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    background: 'rgba(0, 0, 0, 0)',
    padding: '10px 20px',
    backdropFilter: 'blur(0px)',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
    margin: 0,
    padding: 0,
    position: 'relative',
  },
  navItem: {},
  navButton: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '30px',
    padding: '5px 10px',
    position: 'relative',
    transition: 'transform 0.2s ease, color 0.2s ease',
  },
  hoveredButton: {
    transform: 'scale(1.1)',
    color: '#ccc',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: '2px',
    backgroundColor: '#fff',
    transition: 'left 0.3s ease, width 0.3s ease',
    pointerEvents: 'none', 
  },
};

export default NavBar;
