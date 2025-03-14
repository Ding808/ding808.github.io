import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  // record mouse position
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // save all animation eddects
  const [clickEffects, setClickEffects] = useState([]);
  // use audio
  const audioRef = useRef(null);

  // update the mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  //init the audio

  // use mouse effect 
  useEffect(() => {
    const handleClick = (e) => {
      // add mouse animation
      const effectId = Date.now();
      const effect = { x: e.clientX, y: e.clientY, id: effectId };
      setClickEffects((prev) => [...prev, effect]);

      // animation keep 600ms and disappear
      setTimeout(() => {
        setClickEffects((prev) => prev.filter((item) => item.id !== effectId));
      }, 600);

      // quick click clone audio
      if (audioRef.current) {
        const audioClone = audioRef.current.cloneNode();
        audioClone.currentTime = 0;
        audioClone.play().catch((error) => {
          console.error("Audio playback error:", error);
        });
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {/* white dots */}
      <div
        className="custom-cursor-dot"
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          transform: 'translate(-50%, -50%)',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      {/* mouse animation */}
      {clickEffects.map((effect) => (
        <div
          key={effect.id}
          className="click-effect"
          style={{
            position: 'fixed',
            top: effect.y,
            left: effect.x,
            transform: 'translate(-50%, -50%)',
            width: '0px',
            height: '0px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            pointerEvents: 'none',
            zIndex: 9999,
            animation: 'ripple 600ms ease-out',
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
