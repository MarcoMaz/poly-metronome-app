/* eslint-disable no-console */
/* eslint-disable import/no-mutable-exports */
import Engine from './classes/Engine';
import View from './classes/View';
import Metronome from './classes/Metronome';
import Draw from './classes/Draw';

export let audioContext: AudioContext = null;
export let canvas: HTMLCanvasElement;
export let canvasContext: CanvasRenderingContext2D;
export const last16thNoteDrawn = -1; // the last "box" we drew on the screen
let timerWorker: Worker = null;

export const view = new View();
export const metronome = new Metronome();
export const engine = new Engine();

/**
 *  This class represents the app itself.
 *
 * @constructor
 * @param {boolean} isPlaying    - Wheter of not the app is playing.
 */

class App {
  isPlaying: boolean;

  constructor() {
    this.isPlaying = false;
  }

  // eslint-disable-next-line class-methods-use-this
  init() {
    const container = document.createElement('div');
    container.className = 'container';
    canvas = document.createElement('canvas');
    canvasContext = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(container);
    container.appendChild(canvas);

    audioContext = new AudioContext();

    window.requestAnimationFrame(Draw);

    timerWorker = new Worker(new URL('../workers/worker.tsx', import.meta.url));
    timerWorker.onmessage = (e) =>
      e.data === 'tick'
        ? engine.scheduler()
        : console.log(`message: ${e.data}`);
    timerWorker.postMessage({ interval: engine.lookahead });
  }

  play() {
    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      if (engine) {
        engine.current16thNote = 0;
        engine.nextNoteTime = audioContext.currentTime;
      }
      timerWorker.postMessage('start');
      if (view) view.playButton.innerHTML = 'stop';
    } else {
      timerWorker.postMessage('stop');
      if (view) view.playButton.innerHTML = 'play';
    }
  }
}

export const app = new App();

window.addEventListener('load', app.init);
