import theme from '../assets/sound/theme.mp3';
import destroy01 from '../assets/sound/destroy_01.mp3';
import destroy02 from '../assets/sound/destroy_02.mp3';
import game_over from '../assets/sound/game_over.mp3';

const sounds = {
    theme: new Audio(theme),
    destroy01: new Audio(destroy01),
    destroy02: new Audio(destroy02),
    game_over: new Audio(game_over),
  };

sounds.theme.loop = true; // Hacer que la música de fondo se repita

const SoundManager = () => {
  const playSound = (soundName) => {
    const sound = sounds[soundName];
    if (sound) {
      sound.currentTime = 0; // Reinicia el sonido si ya se está reproduciendo
      sound.play();
    }
  };

  const pauseTheme = () => {
    sounds.theme.pause(); // Pausar la música de fondo
  };

  return { playSound, pauseTheme }; // Devuelve la función para que pueda ser utilizada en otros componentes
};

export default SoundManager;