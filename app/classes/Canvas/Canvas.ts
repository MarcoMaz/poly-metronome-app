import Engine from "../Engine";
import Metronome from "../Metronome";
import View from "../View/View";
import BeatsContainer from "./BeatsContainer";

class Canvas {
  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  beatsContainer: BeatsContainer;

  constructor(
    public metronome: Metronome,
    public engine: Engine,
    public audioContext: AudioContext,
    public view: View
  ) {
    this.canvas = document.querySelector("canvas");
    // this.canvas.width = window.innerWidth;
    // this.canvas.height = window.innerHeight;

    this.canvas.width = window.innerWidth;
    this.canvas.height = 200
    // this.canvas.style.border = "1px solid"
    this.canvasContext = this.canvas.getContext("2d");
    this.beatsContainer = new BeatsContainer(
      this.metronome,
      this.engine,
      this.view,
      this.audioContext,
      this.canvas,
      this.canvasContext
    );
  }

  public render(): void {
    this.beatsContainer.render();
  }

  public playAnimation(): void {
    this.beatsContainer.playAnimation();
  }

  public stopAnimation(): void {
    this.beatsContainer.stopAnimation();
  }
}

export default Canvas;
