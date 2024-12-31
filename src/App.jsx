import React, { useState, useEffect, useRef } from 'react';
import { createExplosion } from './assets/explosionEffect';

import MouseFollower from './components/MouseFollower';
import DestructibleCircle from './components/DestructibleCircle';
import Score from './components/Score';
import Modal from './components/Modal';
import SoundManager from './components/SoundManager';

import './css/App.css';
import './css/DestructibleCircle.css';

const App = () => {
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false); // Estado para el estado de Game Over
  const [circles, setCircles] = useState([]); // Estado para los círculos destructibles
  const [speedGenerate, setSpeedGenerate] = useState(1000); // Intervalo de generación de círculos
  const [timer, setTimer] = useState(5); // Estado para el temporizador
  const [speedTimer, setSpeedTimer] = useState(1000); // Intervalo de temporizador
  const [score, setScore] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

  const circlesAmount = 10; 
  const timerAmount = 5;
  const divCirclesRef = useRef(null); // Crear una referencia para el div generate-circles
  const soundManager = SoundManager();

  const handleGameToggle = () => {
    if (isGameActive) {
      // Si el juego está activo, se detiene y se establece Game Over
      setGameOver(true);
      setIsGameActive(false);
      setCircles([]); // Elimina todos los círculos en pantalla
      soundManager.pauseTheme(); // Pausar la música de fondo
      soundManager.playSound('game_over'); // Reproducir sonido de Game Over
      setIsModalVisible(true); // Muestra el modal al detener el juego
    } else {
      // Si el juego no está activo, se inicia
      setTimer(timerAmount); // Reinicia el temporizador
      setScore(0); // Reinicia el puntaje
      setGameOver(false); // Reinicia el estado de Game Over
      setSpeedTimer(1000); // Reinicia el intervalo de temporizador
      setSpeedGenerate(1000); // Reinicia el intervalo de generación de círculos
      generateCircles(); // Genera círculos al iniciar el juego
      setIsGameActive(true); // Inicia el juego
      soundManager.playSound('theme'); // Inicia la musica de fondo
    }
  };

  const incrementScore = (value) => {
    setScore((prevScore) => prevScore + value); // Incrementa el puntaje con el valor proporcionado
  };

  const generateCircles = () => {
    const newCircles = [];
    const container = divCirclesRef.current; // Obtener el contenedor
    if (container) {
      const { clientWidth, clientHeight } = container; // Obtener el ancho y alto del contenedor
      for (let i = 0; i < circlesAmount; i++) { // Cantidad de Circulos a generar
        const x = Math.random() * (clientWidth - 30); // Genera una posición aleatoria en el eje X
        const y = Math.random() * (clientHeight - 30); // Genera una posición aleatoria en el eje Y
        newCircles.push({ x, y });
      }
    }
    setCircles(newCircles);
  };

  const handleCircleDestroy = (index) => {
    const circle = circles[index];
    createExplosion(circle.x + 15, circle.y + 15); // Ajusta la posición para centrar la explosión
    incrementScore(20); // Incrementa el puntaje en 20

    // Reproducir un sonido de destrucción aleatorio
    const randomSound = Math.random() < 0.5 ? 'destroy01' : 'destroy02';
    soundManager.playSound(randomSound);

    setCircles((prevCircles) => prevCircles.filter((_, i) => i !== index)); // Elimina el círculo del array
    setTimer(timerAmount); // Reinicia el temporizador al destruir un círculo
  };

  useEffect(() => {
    if (isGameActive && !gameOver) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(countdown);
            setGameOver(true); // Detiene el juego y establece Game Over
            setIsGameActive(false);
            setTimer(timerAmount);
            setCircles([]); // Elimina todos los círculos en pantalla
            setIsModalVisible(true); // Muestra el modal al llegar a Game Over
            soundManager.pauseTheme(); // Pausar la música de fondo
            soundManager.playSound('game_over');
            return 0; // Evita que el temporizador no baja de 0
          }
          return prevTimer - 1; // Decrementa el temporizador
        });
      }, speedTimer); // Usa speedTimer para el temporizador
  
      const circleGeneration = setInterval(() => {
        if (isGameActive && !gameOver) {
          generateCircles(); // Genera nuevos círculos
        }
      }, speedGenerate); // Usa speedGenerate para la generación de círculos
  
      // Aumentar la velocidad de generación cada 10 segundos
      const speedIncrease = setInterval(() => {
        if (isGameActive && !gameOver) {
          setSpeedGenerate((prev) => Math.max(prev - 100, 200)); // Aumenta la velocidad, mínimo 200ms
        }
      }, 10000); // Cada 10 segundos
  
      return () => {
        clearInterval(countdown); // Limpia el intervalo del temporizador al desmontar
        clearInterval(circleGeneration); // Limpia el intervalo de generación de círculos
        clearInterval(speedIncrease); // Limpia el intervalo de aumento de velocidad
      };
    }
  }, [isGameActive, gameOver, speedTimer, speedGenerate]);
  
  return (
    <div id='root'>
      <div className="menu-container">
        <h1>Cursor Vs Circles</h1>
        <Score score={score} incrementScore={incrementScore} />
        <h2>Timer: {timer}</h2>
        <button onClick={handleGameToggle}>
          {gameOver ? 'Start Game' : isGameActive ? 'Surrender' : 'Start Game'}
        </button>

        {isGameActive && circles.map((position, index) => (
          <DestructibleCircle 
            key={index} 
            position={position} 
            onDestroy={() => handleCircleDestroy(index)}
          />
        ))}
        
        {isModalVisible && (
          <Modal
            message="Game Over"
            score={score}
            onClose={() => setIsModalVisible(false)}
          />
        )}
      </div>
      <MouseFollower isActive={isGameActive} />
      <div className="generate-circles" ref={divCirclesRef} />
    </div>
  );
}

export default App;