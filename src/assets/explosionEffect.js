export const createExplosion = (x, y) => {
    const explosion = document.createElement('div');
    explosion.className = 'explosion';

    explosion.style.left = `${x}px`;
    explosion.style.top = `${y}px`;
    
    document.body.appendChild(explosion);
  
    // Animación de explosión
    setTimeout(() => {
      explosion.remove(); // Elimina el elemento después de la animación
    }, 1000); // Duración de la animación
  };