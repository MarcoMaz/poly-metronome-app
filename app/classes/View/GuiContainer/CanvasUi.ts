import Engine from "../../Engine";
import Metronome from "../../Metronome";
import View from "../View";
import Shape from "./Shape";

export const CANVAS_SELECTOR = ".gui-container__canvas";

// Viewports
export const MOBILE_VIEWPORT = 0;
export const TABLET_VIEWPORT = 700;
export const DESKTOP_VIEWPORT = 1000;

// Canvas' sizes on Resize
const CANVAS_PIXEL_WIDTH_PHONE = 350;
const CANVAS_PIXEL_HEIGHT_PHONE = 100;
const CANVAS_PIXEL_WIDTH_TABLET = 450;
const CANVAS_PIXEL_HEIGHT_TABLET = 100;
const CANVAS_PIXEL_WIDTH_DESKTOP = 600;
const CANVAS_PIXEL_HEIGHT_DESKTOP = 150;

/**
 * This class represents the UI controlling the canvas.
 *
 * @name CanvasUi
 *
 * @param {number} animation          - The canvas' animation.
 * @param {number} currentNote        - The current (16th) note playing.
 * @param {Shape} againstBeatSquare   - The shape representing the beats against the default beat.
 * @param {Shape} baseBeatSquare      - The shape representing the default beats.
 * @param {HTMLCanvasElement} canvas  - The canvas drawn into the screen.
 * @param {any} canvasContext         - The canvas' context where the animation appears.
 *
 */

class CanvasUi {
  animation: number;
  currentNote: number;
  againstBeatSquare: Shape;
  baseBeatSquare: Shape;
  canvas: HTMLCanvasElement;
  canvasContext: any; // the type here is 'any' to let have some experiemntal features (reset the context).

  /**
   * Define DOM Elements and Variables.
   */
  constructor(
    public metronome: Metronome,
    public engine: Engine,
    public view: View,
    public audioContext: AudioContext
  ) {
    this.canvas = document.querySelector(CANVAS_SELECTOR);
    this.canvasContext = this.canvas.getContext("2d");
    this.animation = 0;
    this.currentNote = 0;

    // Register events
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
  }

  /**
   * @name reset
   * @description
   * Reset the canvas context.
   *
   */
  public reset(): void {
    this.canvasContext.reset();
    window.cancelAnimationFrame(this.animation);
  }

  /**
   * @name render
   * @description
   * Reset and render the beats' animation.
   *
   */
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
      this.againstBeatSquare.renderShape();
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
      this.baseBeatSquare.renderShape();
    }
  }

  /**
   * @name playAnimation
   * @description
   * Reset and play the beats' animation.
   *
   */
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
      this.againstBeatSquare.animateShape();
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
      this.baseBeatSquare.animateShape();
    }
  }

  /**
   * @name stopAnimation
   * @description
   * Stop the animation.
   *
   */
  public stopAnimation(): void {
    window.cancelAnimationFrame(this.animation);

    this.render();
  }

  /**
   * @name resizeCanvas
   * @description
   * Resize the canvas.
   *
   */
  public resizeCanvas(): void {
    if (
      window.innerWidth >= MOBILE_VIEWPORT &&
      window.innerWidth < TABLET_VIEWPORT
    ) {
      this.canvas.width = CANVAS_PIXEL_WIDTH_PHONE;
      this.canvas.height = CANVAS_PIXEL_HEIGHT_PHONE;
    } else if (
      window.innerWidth >= TABLET_VIEWPORT &&
      window.innerWidth < DESKTOP_VIEWPORT
    ) {
      this.canvas.width = CANVAS_PIXEL_WIDTH_TABLET;
      this.canvas.height = CANVAS_PIXEL_HEIGHT_TABLET;
    } else {
      this.canvas.width = CANVAS_PIXEL_WIDTH_DESKTOP;
      this.canvas.height = CANVAS_PIXEL_HEIGHT_DESKTOP;
    }
  }
}

export default CanvasUi;
