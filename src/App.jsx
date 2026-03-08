import React, { useEffect, useState } from 'react';
import './App.css';
import sakuraVideo from './sakura.mp4'; 
import confetti from 'canvas-confetti';
import VaryaPhoto1 from "./photo_2026-03-06_21-26-59.jpg";
import VaryaPhoto2 from "./VaryaPhoto2.png";
import VaryaPhoto3 from "./VaryaPhoto3.png";
import VaryaPhoto4 from "./VaryaPhoto4.png";
import VaryaPhoto5 from "./VaryaPhoto5.png";
import VaryaPhoto6 from "./VaryaPhoto6.png";
import VaryaPhoto7 from "./VaryaPhoto7.png";
import VaryaPhoto8 from "./VaryaPhoto8.png";
import VaryaPhoto9 from "./VaryaPhoto9.png";
import VaryaPhoto10 from "./VaryaPhoto10.png";
import { motion, AnimatePresence } from "framer-motion";

const photos = [VaryaPhoto1, VaryaPhoto2, VaryaPhoto3, VaryaPhoto4, VaryaPhoto5, VaryaPhoto6, VaryaPhoto7, VaryaPhoto8,VaryaPhoto9,VaryaPhoto10];

const PhotoSlider = ({ photos }) => {
  return (
    <div 
      className="slider-container"
      style={{ 
        display: 'flex',
        width: '100%', 
        maxWidth: '300px', 
        margin: '0 auto', 
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
      }}
    >
      <style>
        {`
          .slider-container::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      {photos.map((src, index) => (
        <div
          key={index}
          style={{
            scrollSnapAlign: 'center',
            flex: '0 0 100%',
            height: '400px',
            padding: '0 5px',
            boxSizing: 'border-box'
          }}
        >
          <img
            src={src}
            alt={`slide-${index}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '25px',
              pointerEvents: 'none'
            }}
          />
        </div>
      ))}
    </div>
  );
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [openButton, setOpenButton] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [score, setScore] = useState(0);
  const [flowerPos, setFlowerPos] = useState({ top: '50%', left: '50%' });

  useEffect(() => {
    if (score >= 10) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffdae9', '#ffb7d5', '#ffffff']
      });
    }
  }, [score]);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.setHeaderColor('#ffdae9'); 
      tg.expand(); 
    }
  }, []);

  const handleFlowerClick = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 500);
  };

  const catchFlower = () => {
    const newScore = score + 1;
    setScore(newScore);
    if (newScore < 10) {
      const randomTop = Math.floor(Math.random() * 60) + 20;
      const randomLeft = Math.floor(Math.random() * 60) + 20;
      setFlowerPos({ top: `${randomTop}%`, left: `${randomLeft}%` });
    }
  };

  return (
    <div className="app-wrapper">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={sakuraVideo} type="video/mp4" />
      </video>
      <div className="video-overlay"></div>

      {!openButton ? (
        <div className="card-container">
          <div className={`flowers ${isBouncing ? 'bounce' : ''}`} onClick={handleFlowerClick}>
            🌸🌺🌸
          </div>
          <div className="date-badge">8 МАРТА</div>

          {!isOpen ? (
            <>
              <button className="open-button" onClick={() => setIsOpen(true)}>Открыть послание ✨</button>
              <div className="divider">🌸 🌿 🌸</div>
              <div className="footer">С нежностью и любовью • 8 Марта</div>
            </>
          ) : (
            <div className="content-fade-in">
              <h1 className="title">Эта открытка — для тебя,<br />Варя!</h1>
              <p className="message">С праздником весны! Ты — самая лучшая! 🌸</p>
              <div className="signature">— Олег</div>
              <button className='open-button march' onClick={() => setOpenButton(true)}>Собрать Букетик 🌸</button>
            </div>
          )}
        </div>
      ) : (
        <div className="card-container content-fade-in" style={{ position: 'relative' }}>
          {score < 10 ? (
            <>
              <h2 className="title" style={{ fontSize: '28px' }}>Собери букет!</h2>
              <p className="message">Поймай 10 цветочков: {score} / 10</p>
              <div onClick={catchFlower} style={{
                  position: 'absolute',
                  top: flowerPos.top,
                  left: flowerPos.left,
                  fontSize: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-out',
                  zIndex: 20
                }}>🌸</div>
            </>
          ) : (
            <div className="content-fade-in">
              <div className="flowers">💖</div>
              <h1 className="title">Ура! Букет собран!</h1>
              <p className="message">Ты справилась! Вот подборка наших фоточек(Cвайпни):</p>
              <PhotoSlider photos={photos} />
              <button className="open-button" style={{ marginTop: '20px' }} onClick={() => { setOpenButton(false); setScore(0); }}>
                Вернуться в начало
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
