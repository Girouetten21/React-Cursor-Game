import React, { useEffect, useRef } from 'react';
import '../css/DestructibleCircle.css'

const DestructibleCircle = ({ position, onDestroy }) => {
  const circleRef = useRef(null);

  useEffect(() => {
    const checkCollision = () => {
      const circle = circleRef.current;
      const mouseFollower = document.querySelector('.mouse-follower');

      if (circle && mouseFollower) {
        const circleRect = circle.getBoundingClientRect();
        const mouseFollowerRect = mouseFollower.getBoundingClientRect();

        // Comprobar si hay colisión
        if (
          circleRect.x < mouseFollowerRect.x + mouseFollowerRect.width &&
          circleRect.x + circleRect.width > mouseFollowerRect.x &&
          circleRect.y < mouseFollowerRect.y + mouseFollowerRect.height &&
          circleRect.y + circleRect.height > mouseFollowerRect.y
        ) {
          onDestroy(); // Llama a la función onDestroy si hay colisión
        }
      }
    };

    const interval = setInterval(checkCollision, 100); // Verifica colisiones cada 100 ms

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [onDestroy]);

  return (
    <div
      ref={circleRef}
      className="destructible-circle"
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y
      }}
    />
  );
};

export default DestructibleCircle;