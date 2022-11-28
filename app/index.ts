import Engine from "./classes/Engine";
import View from "./classes/View/View";
import Metronome from "./classes/Metronome";
import CanvasInspector from "./CanvasInspector/CanvasInspector";
import CanvasUi from "./classes/View/GuiContainer/CanvasUi";

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
  private audioContext: AudioContext;
  private timerWorker: Worker;
  private canvasInspector: CanvasInspector;
  private canvas: CanvasUi;

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
      this.audioContext,
    );

    this.init();
  }

  public init(): void {
    this.view.controllers.setOnPlay(() => {
      app.play();
      this.canvas.playAnimation();
    });

    this.view.controllers.setOnPause(() => {
      app.pause();
      this.canvas.stopAnimation();
    });

    this.timerWorker = new Worker(
      new URL("../workers/worker.ts", import.meta.url)
    );

    this.canvas.render();
    this.timerWorker.onmessage = (e: { data: string }) =>
      e.data === "tick"
        ? this.engine.scheduler()
        : console.log(`message: ${e.data}`);

    this.timerWorker.postMessage({ interval: this.engine.lookahead });
    this.canvasInspector = new CanvasInspector();
  }

  public play(): void {
    this.isPlaying = true;

    if (this.isPlaying) {
      this.engine.current16thNote = 0;
      this.engine.nextNoteTime = this.audioContext.currentTime;
      this.timerWorker.postMessage("start");
    }
  }

  public pause(): void {
    this.isPlaying = false;

    if (!this.isPlaying) {
      this.timerWorker.postMessage("stop");
      this.timerWorker.postMessage({ interval: 0 });
    }
  }
}

export default App;

export const app = new App();