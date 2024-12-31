import React, { useEffect, useState } from 'react';
import '../css/MouseFollower.css';

const MouseFollower = ({ isActive }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Calcula la nueva posición del mouse
      const newX = event.clientX;
      const newY = event.clientY;

      // Ajusta la posición para que el círculo no se salga de los bordes
      const adjustedX = Math.min(newX, window.innerWidth - 20); // 20 es la mitad del tamaño del círculo
      const adjustedY = Math.min(newY, window.innerHeight - 20); // 20 es la mitad del tamaño del círculo

      setPosition({ x: adjustedX, y: adjustedY });
    };

    if (isActive) {
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      // Si el juego no está activo, no actualizamos la posición
      setPosition({ x: 0, y: 0 }); // Reseteamos la posición
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isActive]);

  return (
    isActive && // Solo renderizamos el div si el juego está activo
    (
      <div
        className="mouse-follower"
        style={{
          left: position.x,
          top: position.y,
          position: 'absolute',
          transform: 'translate(-50%, -50%)', // Centra el círculo en el cursor
        }}
      />
    )
  );
};

export default MouseFollower;