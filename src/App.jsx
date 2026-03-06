import React, { useEffect, useState } from 'react';
import './App.css';
import sakuraVideo from './sakura.mp4'; 

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [openButton, setOpenButton] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  
  const [score, setScore] = useState(0);
  const [flowerPos, setFlowerPos] = useState({ top: '50%', left: '50%' });

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
      const randomTop = Math.floor(Math.random() * 70) + 10;
      const randomLeft = Math.floor(Math.random() * 70) + 10;
      setFlowerPos({ top: `${randomTop}%`, left: `${randomLeft}%` });
    }
  };

  return (
    <div className="app-wrapper">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={sakuraVideo} type="video/mp4" />
        Твой браузер не поддерживает видео.
      </video>
      <div className="video-overlay"></div>

      {!openButton ? (
        <div className="card-container">
          <div 
            className={`flowers ${isBouncing ? 'bounce' : ''}`} 
            onClick={handleFlowerClick}
            title="Нажми на меня!"
          >
            🌸🌺🌸
          </div>
          
          <div className="date-badge">8 МАРТА</div>

          {!isOpen ? (
            <>
              <button className="open-button" onClick={() => setIsOpen(true)}>
                Открыть послание ✨
              </button>
              <div className="divider">🌸 🌿 🌸</div>
              <div className="footer">С нежностью и любовью • 8 Марта</div>
            </>
          ) : (
            <div className="content-fade-in">
              <h1 className="title">
                Этот букет — для тебя,<br />
                Варя!
              </h1>
              <p className="message">
                С праздником весны! Желаю тебе счастья,
                здоровья и только ярких дней. Ты — самая
                лучшая! 🌸
              </p>
              <div className="signature">— Олег</div>

              <button 
                className='open-button march' 
                style={{ marginTop: '20px' }} 
                onClick={() => setOpenButton(true)}
              >
                Сюрприз 🎁
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="card-container content-fade-in" style={{ position: 'relative' }}>
          
          {score < 10 ? (
            <>
              <h2 className="title" style={{ fontSize: '28px' }}>Собери букет!</h2>
              <p className="message">Поймай 10 цветочков: {score} / 10</p>
              
              <div 
                onClick={catchFlower}
                style={{
                  position: 'absolute',
                  top: flowerPos.top,
                  left: flowerPos.left,
                  fontSize: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-out',
                  userSelect: 'none',
                  zIndex: 20
                }}
              >
                🌸
              </div>
            </>
          ) : (
            <div className="content-fade-in">
              <div className="flowers">💖</div>
              <h1 className="title">Ура! Букет собран!</h1>
              <p className="message">
                Ты справилась! А вот и главный сюрприз: 
                <br/><br/>
                Здесь будет подарок, секретное слово или красивая картинка!
              </p>
              
              <button 
                className="open-button" 
                style={{ marginTop: '20px' }}
                onClick={() => { setOpenButton(false); setScore(0); }}
              >
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