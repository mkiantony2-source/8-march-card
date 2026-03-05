import React, { useEffect, useState } from 'react';
import './App.css';
// Убедись, что файл sakura.mp4 лежит в папке src рядом с этим файлом
import sakuraVideo from './sakura.mp4'; 

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  // Эффект для работы с Telegram Mini App
  useEffect(() => {
    // Проверяем, что скрипт Telegram загружен
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.setHeaderColor('#ffdae9'); // Розовый хедер под стиль
      tg.expand(); // Разворачиваем на весь экран
    }
  }, []);

  const handleFlowerClick = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 500);
  };

  return (
    <div className="app-wrapper">
      {/* Видео фон */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src={sakuraVideo} type="video/mp4" />
        Твой браузер не поддерживает видео.
      </video>
      
      {/* Слой поверх видео для мягкости */}
      <div className="video-overlay"></div>

      <div className="card-container">
        <div 
          className={`flowers ${isBouncing ? 'bounce' : ''}`} 
          onClick={handleFlowerClick}
          title="Нажми на меня!"
        >
          🌸🌺🌸
        </div>

        <div className="date-badge">
          8 МАРТА
        </div>

        {!isOpen ? (
          <button className="open-button" onClick={() => setIsOpen(true)}>
            Открыть послание ✨
          </button>
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

            <div className="signature">
              — Олег
            </div>
          </div>
        )}

        <div className="divider">
          🌸 🌿 🌸
        </div>

        <div className="footer">
          С нежностью и любовью • 8 Марта
        </div>

      </div>
    </div>
  );
}

export default App;