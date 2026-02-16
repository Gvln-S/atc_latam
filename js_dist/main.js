import { initCarrusel } from './components/carrusel.js';

let timer;

async function start() {
    const control = initCarrusel('carrusel_track');
    const pauseBtn = document.getElementById('pause_button');

    const resetTimer = () => {
        clearInterval(timer);
        timer = setInterval(() => {
            if (!control.isPaused()) control.next();
        }, 10000); 
    };

    control.setOnInteraction(resetTimer);

    document.getElementById('next_button').onclick = () => { control.next(); resetTimer(); };
    document.getElementById('prev_button').onclick = () => { control.prev(); resetTimer(); };
    
    pauseBtn.onclick = () => {
        const isPaused = control.togglePause();
        pauseBtn.classList.toggle('paused', isPaused);
        if (!isPaused) resetTimer();
        else clearInterval(timer);
    };

    resetTimer();
}

start();
