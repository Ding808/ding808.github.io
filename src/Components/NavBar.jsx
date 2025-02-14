// NavBar.jsx
import React from 'react';

const NavBar = ({ setPage, currentPage }) => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <button
            style={{
              ...styles.navButton,
              ...(currentPage === 'home' ? styles.activeButton : {}),
            }}
            onClick={() => setPage('home')}
          >
            Home
          </button>
        </li>
        <li style={styles.navItem}>
          <button
            style={{
              ...styles.navButton,
              ...(currentPage === 'about' ? styles.activeButton : {}),
            }}
            onClick={() => setPage('about')}
          >
            About
          </button>
        </li>
        <li style={styles.navItem}>
          <button
            style={{
              ...styles.navButton,
              ...(currentPage === 'contact' ? styles.activeButton : {}),
            }}
            onClick={() => setPage('contact')}
          >
            Contact
          </button>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    position: 'fixed',      // 置顶
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,           // 确保导航栏显示在最上层
    background: 'rgba(0, 0, 0, 0)', // 半透明黑色背景
    padding: '10px 20px',
    backdropFilter: 'blur(0px)',  // 可选：增加背景模糊效果
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
    margin: 0,
    padding: 0,
  },
  navItem: {},
  navButton: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '30px',
    padding: '5px 10px',
  },
  activeButton: {
    borderBottom: '2px solid #fff',
  },
};

export default NavBar;
