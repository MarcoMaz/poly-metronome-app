import Engine from "./classes/Engine";
import View from "./classes/View/View";
import Metronome from "./classes/Metronome";
import CanvasUi from "./classes/View/GuiContainer/CanvasUi";

import {
  APP_SOUND_DELAY,
  WORKER_START_MESSAGE,
  WORKER_STOP_MESSAGE,
} from "./classes/base/constants";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./serviceWorker.js");
  });
}

/**
 *  This class represents the app itself.
 *
 * @name  App
 *
 * @param {boolean} isPlaying - Wheter of not the app is playing.
 */

class App {
  private isPlaying: boolean;
  private metronome: Metronome;
  private engine: Engine;
  private view: View;
  private audioContext: AudioContext;
  private timerWorker: Worker;
  private canvas: CanvasUi;

  /**
   * Define variables.
   */
  constructor() {
    this.isPlaying = false;
    this.metronome = new Metronome(3, 4, 120);
    this.audioContext = new AudioContext();
    this.engine = new Engine(this.metronome, this.audioContext);
    this.view = new View(this.metronome, this.engine);
    this.canvas = new CanvasUi(
      this.metronome,
      this.engine,
      this.view,
      this.audioContext
    );

    // starts the app on load.
    this.init();
  }

  /**
   * @name init
   * @description
   * Sets the initial setup of the app
   */

  public init(): void {
    this.view.controllers.setOnPlay(() => {
      app.play();
      this.canvas.playAnimation();
    });

    this.view.controllers.setOnPause(() => {
      app.pause();
      this.canvas.stopAnimation();
    });

    this.timerWorker = new Worker("../workers/worker.js");

    this.canvas.render();
    this.timerWorker.onmessage = (e: { data: string }) =>
      e.data === "tick"
        ? this.engine.scheduler()
        : console.log(`message: ${e.data}`);

    this.timerWorker.postMessage({ interval: this.engine.lookahead });
  }

  /**
   * @name play
   * @description
   * Play the app.
   */
  public play(): void {
    this.isPlaying = true;

    if (this.isPlaying) {
      this.engine.current16thNote = 0;
      this.engine.nextNoteTime = this.audioContext.currentTime;
      this.engine.nextNoteTime += APP_SOUND_DELAY; // adds a small delay to avoid the "beep" to click.
      this.timerWorker.postMessage(WORKER_START_MESSAGE);
    }
  }

  /**
   * @name pause
   * @description
   * Pause the app.
   */
  public pause(): void {
    this.isPlaying = false;

    if (!this.isPlaying) {
      this.timerWorker.postMessage(WORKER_STOP_MESSAGE);
      this.timerWorker.postMessage({ interval: 0 });
    }
  }
}

export default App;

export const app = new App();
