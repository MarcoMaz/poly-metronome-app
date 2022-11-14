import Engine from "../Engine";
import Metronome from "../Metronome";
import View from "../View";
import Shape from "./Shape";

class BeatsContainer {
  againstBeat: number;
  animation: number;
  baseBeat: number;
  currentNote: number;
  elementBaseSize: number;
  againstBeatSquare: Shape;
  baseBeatSquare: Shape;

  constructor(
    public metronome: Metronome,
    public engine: Engine,
    public view: View,
    public audioContext: AudioContext,
    public myCanvas: HTMLCanvasElement,
    public myCanvasContext: CanvasRenderingContext2D
  ) {
    this.elementBaseSize = Math.floor(this.myCanvas.width / 18);
    this.animation = 0;
    this.currentNote = 0;
  }

  public reset(): void {    
    this.myCanvasContext.clearRect(
      0,
      0,
      this.myCanvas.width,
      this.myCanvas.height
    );

    window.cancelAnimationFrame(this.animation);
  }

  public render(): void {    
    this.reset();

    this.animation = window.requestAnimationFrame(() => this.render());    

    // AgainstBeat
    for (let i = 0; i < this.metronome.againstBeat; i += 1) {
      this.againstBeatSquare = new Shape(
        this.myCanvasContext,
        this.metronome,
        this.elementBaseSize,
        i,
        "against",
        this.view.GUIselected
      );
      this.againstBeatSquare.render();
    }

    // BaseBeat
    for (let j = 0; j < this.metronome.baseBeat; j += 1) {
      this.baseBeatSquare = new Shape(
        this.myCanvasContext,
        this.metronome,
        this.elementBaseSize,
        j,
        "base",
        this.view.GUIselected
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
        this.myCanvasContext,
        this.metronome,
        this.elementBaseSize,
        i,
        "against",
        this.view.GUIselected,
        this.currentNote
      );
      this.againstBeatSquare.animate();
    }

    for (let j = 0; j < this.metronome.baseBeat; j += 1) {
      this.baseBeatSquare = new Shape(
        this.myCanvasContext,
        this.metronome,
        this.elementBaseSize,
        j,
        "base",
        this.view.GUIselected,
        this.currentNote
      );
      this.baseBeatSquare.animate();
    }

  }

  public stopAnimation(): void {
    window.cancelAnimationFrame(this.animation);    

    this.render();
  }
}

export default BeatsContainer;