/* eslint-disable no-console */
import Engine from "./classes/Engine";
import View from "./classes/View";
import Metronome from "./classes/Metronome";
import Canvas from "./classes/Canvas/Canvas";
import Observable from "./classes/Observable";

let timerWorker: Worker = null;

/**
 *  This class represents the app itself.
 *
 * @constructor
 * @param {boolean} isPlaying    - Wheter of not the app is playing.
 */

class App {
  private isPlaying: boolean;
  private metronome: Metronome;
  private engine: Engine;
  private view: View;
  private canvas: Canvas;
  private observable: Observable;
  private audioContext: AudioContext;

  constructor() {
    this.metronome;
    this.engine;
    this.view;
    this.isPlaying = false;
    this.canvas;
    this.audioContext = null;
  }

  public init(): void {
    const container = document.createElement("div");
    container.className = "container";
    document.body.appendChild(container);

    this.audioContext = new AudioContext();

    // Create an observable
    this.observable = new Observable();

    this.metronome = new Metronome(3, 4, 120);
    this.engine = new Engine(this.metronome, this.audioContext);

    // Connect the Observable
    this.view = new View(this.metronome, this.observable);
    this.view.setOnPlay(() => {
      app.play();
      this.canvas.playAnimation();
    });

    this.view.setOnPause(() => {
      app.pause();
      this.canvas.stopAnimation();
    });

    this.canvas = new Canvas(
      this.metronome,
      this.engine,
      this.audioContext,
      this.view
      );
      this.canvas.render();

    timerWorker = new Worker(new URL("../workers/worker.ts", import.meta.url));

    timerWorker.onmessage = (e) =>
      e.data === "tick"
        ? this.engine.scheduler()
        : console.log(`message: ${e.data}`);

    timerWorker.postMessage({ interval: this.engine.lookahead });

    // Register two ovservables (Who should I notify/update?)
    // this.observable.registerObserver(this.engine.udpate);
    // this.observable.registerObserver(this.metronome.update);

  }

  public play(): void {
    this.isPlaying = true;

    if (this.isPlaying) {
      if (this.engine) {
        this.engine.current16thNote = 0;
        this.engine.nextNoteTime = this.audioContext.currentTime;
      }
      timerWorker.postMessage("start");
    }
  }

  public pause(): void {
    this.isPlaying = false;

    if (!this.isPlaying) {
      timerWorker.postMessage("stop");
      timerWorker.postMessage({ interval: 0 });
    }
  }
}

export default App;

export const app = new App();

window.addEventListener("load", app.init);
