import Metronome from "../../Metronome";
import { DESKTOP_VIEWPORT, MOBILE_VIEWPORT, TABLET_VIEWPORT } from "./CanvasUi";

// Colors
const ACTIVE_BEAT_COLOR_OTHER = "lightblue";
const ACTIVE_BEAT_COLOR_CURRENT = "blue";
const INACTIVE_BEAT_COLOR = "lightgray";
const GRID_BORDER_COLOR = "black";

// Sizes
const SIZE_MOBILE = 16;
const SIZE_TABLET = 20;
const SIZE_DESKTOP = 32;

// Angles
const DOT_START_ANGLE = 0;
const DOT_END_ANGLE = 2 * Math.PI;

/**
 * This class represents the shape of the beats' sequence.
 * 
 * @name Shape
 * 
 * @param {number} size         - The shape's size.
 * @param {number} index        - The shape's index.
 * @param {string} beatType     - The shape's type of beat. Either 'against' or 'base'.
 * @param {number} currentNote  - The current note being played. Optional.
 * @param {string} type         - The shape's type. Square (default), pipelines, grid or dots.
 * 
 */

class Shape {
  size: number;
  index: number;
  beatType: string;
  currentNote: number;
  type: string;

  /**
   * Define DOM Elements and Variables.
   */
  constructor(
    public canvas: HTMLCanvasElement,
    public canvasContext: CanvasRenderingContext2D,
    public metronome: Metronome,
    index: number,
    beatType: "base" | "against",
    type: string,
    currentNote?: number
  ) {
    this.index = index;
    this.beatType = beatType;
    this.type = type;
    this.currentNote = currentNote;
  }

  /**
   * @name resize
   * @description
   * Change the shape's size based on the window viewport.
   * 
   */
  public resize(): void {
    if (
      window.innerWidth >= MOBILE_VIEWPORT &&
      window.innerWidth < TABLET_VIEWPORT
    ) {
      this.size = SIZE_MOBILE;
    } else if (
      window.innerWidth >= TABLET_VIEWPORT &&
      window.innerWidth < DESKTOP_VIEWPORT
    ) {
      this.size = SIZE_TABLET;
    } else {
      this.size = SIZE_DESKTOP;
    }
  }

  /**
   * @name createShape
   * @description
   * Create the shape based on its type.
   * 
   */
  public createShape(): void {
    this.resize();

    // General
    let padding: number;

    // Squares / Pipelines
    let rectX: number;
    let rectY: number;
    let rectHeight: number;
    let rectWidth: number;

    // Grid
    let gridX: number;
    let gridY: number;
    let gridHeight: number;
    let gridWidth: number;

    // Dots
    let dotX: number;
    let dotY: number;
    let dotRadius: number;

    if (this.beatType === "against") {
      padding = this.canvas.width / this.metronome.againstBeat - this.size;
      rectY = 0;
      dotY = this.size;
      gridX = (this.canvas.width / this.metronome.againstBeat) * this.index;
      gridY = 0;
      gridWidth = this.canvas.width / this.metronome.againstBeat;
    } else {
      padding = this.canvas.width / this.metronome.baseBeat - this.size;
      rectY = this.canvas.height - this.size * 2;
      dotY = this.canvas.height - this.size;
      gridX = (this.canvas.width / this.metronome.baseBeat) * this.index;
      gridY = this.canvas.height / 2;
      gridWidth = this.canvas.width / this.metronome.baseBeat;
    }

    switch (this.type) {
      case "square":
        rectX = (this.size + padding) * this.index;
        rectWidth = this.size * 2;
        rectHeight = rectWidth;

        this.canvasContext.fillRect(rectX, rectY, rectWidth, rectHeight);
        this.canvasContext.fill();
        break;
      case "pipelines":
        rectX = (this.size + padding) * this.index;
        rectWidth = this.size / 2;
        rectHeight = this.size * 2;

        this.canvasContext.fillRect(rectX, rectY, rectWidth, rectHeight);
        this.canvasContext.fill();
        break;
      case "grid":
        gridHeight = this.canvas.height / 2;

        this.canvasContext.beginPath();
        this.canvasContext.rect(gridX, gridY, gridWidth, gridHeight);
        this.canvasContext.strokeStyle = GRID_BORDER_COLOR;
        this.canvasContext.fill();
        this.canvasContext.stroke();
        break;
      case "dots":
        dotX = (this.size + padding) * this.index + this.size;
        dotRadius = this.size;

        this.canvasContext.beginPath();
        this.canvasContext.arc(
          dotX,
          dotY,
          dotRadius,
          DOT_START_ANGLE,
          DOT_END_ANGLE
        );
        this.canvasContext.fill();
        break;
    }
  }

  /**
   * @name renderShape
   * @description
   * Render the shape.
   * 
   */
  public renderShape(): void {
    this.canvasContext.fillStyle = INACTIVE_BEAT_COLOR;
    this.createShape();
  }

  /**
   * @name animateShape
   * @description
   * Animate the shape.
   * 
   */
  public animateShape(): void {
    let metronomeType: number;

    this.beatType === "against"
      ? (metronomeType = this.metronome.baseBeat)
      : (metronomeType = this.metronome.againstBeat);

    if (this.currentNote % metronomeType === 0) {
      this.canvasContext.fillStyle =
        this.currentNote / metronomeType === this.index
          ? ACTIVE_BEAT_COLOR_CURRENT
          : ACTIVE_BEAT_COLOR_OTHER;
    } else {
      this.canvasContext.fillStyle = ACTIVE_BEAT_COLOR_OTHER;
    }
    this.createShape();
  }
}

export default Shape;
