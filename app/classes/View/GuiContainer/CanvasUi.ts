import Engine from "../../Engine";
import Metronome from "../../Metronome";
import View from "../View";
import Shape from "./Shape";

export const MOBILE_VIEWPORT = 0;
export const TABLET_VIEWPORT = 700;
export const DESKTOP_VIEWPORT = 1000;

class CanvasUi {
  againstBeat: number;
  animation: number;
  baseBeat: number;
  currentNote: number;
  elementBaseSize: number;
  againstBeatSquare: Shape;
  baseBeatSquare: Shape;
  canvas: HTMLCanvasElement;
  canvasContext: any;

  constructor(
    public metronome: Metronome,
    public engine: Engine,
    public view: View,
    public audioContext: AudioContext
  ) {
    this.canvas = document.querySelector("canvas");
    this.canvasContext = this.canvas.getContext("2d");
    this.animation = 0;
    this.currentNote = 0;

    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  public reset(): void {
    this.canvasContext.reset();
    window.cancelAnimationFrame(this.animation);
  }

  public render(): void {
    this.reset();

    this.animation = window.requestAnimationFrame(() => this.render());

    // AgainstBeat
    for (let i = 0; i < this.metronome.againstBeat; i += 1) {
      this.againstBeatSquare = new Shape(
        this.canvas,
        this.canvasContext,
        this.metronome,
        i,
        "against",
        this.view.tabSelection.selected
      );
      this.againstBeatSquare.render();
    }

    // BaseBeat
    for (let j = 0; j < this.metronome.baseBeat; j += 1) {
      this.baseBeatSquare = new Shape(
        this.canvas,
        this.canvasContext,
        this.metronome,
        j,
        "base",
        this.view.tabSelection.selected
      );
      this.baseBeatSquare.render();
    }
  }

  public playAnimation(): void {
    this.reset();

    this.animation = window.requestAnimationFrame(() => this.playAnimation());

    while (
      this.engine.notesInQueue.length &&
      this.engine.notesInQueue[0].time < this.audioContext.currentTime
    ) {
      this.currentNote = this.engine.notesInQueue[0].note;
      this.engine.notesInQueue.splice(0, 1);
    }

    for (let i = 0; i < this.metronome.againstBeat; i++) {
      this.againstBeatSquare = new Shape(
        this.canvas,
        this.canvasContext,
        this.metronome,
        i,
        "against",
        this.view.tabSelection.selected,
        this.currentNote
      );
      this.againstBeatSquare.animate();
    }

    for (let j = 0; j < this.metronome.baseBeat; j += 1) {
      this.baseBeatSquare = new Shape(
        this.canvas,
        this.canvasContext,
        this.metronome,
        j,
        "base",
        this.view.tabSelection.selected,
        this.currentNote
      );
      this.baseBeatSquare.animate();
    }
  }

  public stopAnimation(): void {
    window.cancelAnimationFrame(this.animation);

    this.render();
  }

  public resize(): void {
    if (window.innerWidth >= MOBILE_VIEWPORT && window.innerWidth < TABLET_VIEWPORT) {      
      this.canvas.width = 350;
      this.canvas.height = 100;  
    } else if (window.innerWidth >= TABLET_VIEWPORT && window.innerWidth < DESKTOP_VIEWPORT) {      
      this.canvas.width = 450;
      this.canvas.height = 100;  
    } else {      
      this.canvas.width = 600;
      this.canvas.height = 150;  
    }
  }
}

export default CanvasUi;
