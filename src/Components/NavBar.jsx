// NavBar.jsx
import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import ShinyText from './ShinyText.jsx';
  
const NavBar = ({ setPage, currentPage, onHomeRef }) => {
  const buttonRefs = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null)
  };

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [hoveredButton, setHoveredButton] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // 确保在 DOM 渲染后同步获取布局信息
  useLayoutEffect(() => {
    if (onHomeRef) {
      onHomeRef(buttonRefs.home);
    }
  }, [onHomeRef]);

  // 根据当前激活按钮更新指示器的位置和宽度
  useLayoutEffect(() => {
    const activeButton = buttonRefs[currentPage]?.current;
    if (activeButton) {
      const { offsetLeft, offsetWidth } = activeButton;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [currentPage, hoveredButton]);

  // 监听滚动事件，根据 scrollY 更新 isScrolled 状态
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={isScrolled ? { ...styles.nav, ...styles.navScrolled } : styles.nav}>
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
            <ShinyText 
              text="Home" 
              disabled={false} 
              speed={3} 
              className="custom-class" 
            />
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
            <ShinyText 
              text="About" 
              disabled={false} 
              speed={3} 
              className="custom-class" 
            />
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
            <ShinyText 
              text="Skills" 
              disabled={false} 
              speed={3} 
              className="custom-class" 
            />
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
            <ShinyText 
              text="Projects" 
              disabled={false} 
              speed={3} 
              className="custom-class" 
            />
          </button>
        </li>
        <li style={styles.navItem}>
          <button
            ref={buttonRefs.contact}
            style={{
              ...styles.navButton,
              ...(currentPage === 'contact' ? styles.activeButton : {}),
              ...(hoveredButton === 'contact' ? styles.hoveredButton : {}),
            }}
            onClick={() => setPage('contact')}
            onMouseEnter={() => setHoveredButton('contact')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <ShinyText 
              text="Contact" 
              disabled={false} 
              speed={3} 
              className="custom-class" 
            />
          </button>
        </li>
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
    background: 'rgba(0, 0, 0, 0)', // 初始背景透明
    padding: '10px 20px',
    backdropFilter: 'blur(0px)',
    display: 'flex',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  navScrolled: {
    padding: '5px 20px', // 缩小后的 padding
    background: 'rgba(0, 0, 0, 0.7)', // 滚动时增加背景色
    backdropFilter: 'blur(5px)',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
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
