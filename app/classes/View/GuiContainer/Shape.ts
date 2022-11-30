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

class Shape {
  size: number;
  index: number;
  beatType: string;
  currentNote: number;
  type: string;

  constructor(
    public canvas: HTMLCanvasElement,
    public myCanvasContext: CanvasRenderingContext2D,
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

        this.myCanvasContext.fillRect(rectX, rectY, rectWidth, rectHeight);
        this.myCanvasContext.fill();
        break;
      case "pipelines":
        rectX = (this.size + padding) * this.index;
        rectWidth = this.size / 2;
        rectHeight = this.size * 2;

        this.myCanvasContext.fillRect(rectX, rectY, rectWidth, rectHeight);
        this.myCanvasContext.fill();
        break;
      case "grid":
        gridHeight = this.canvas.height / 2;

        this.myCanvasContext.beginPath();
        this.myCanvasContext.rect(gridX, gridY, gridWidth, gridHeight);
        this.myCanvasContext.strokeStyle = GRID_BORDER_COLOR;
        this.myCanvasContext.fill();
        this.myCanvasContext.stroke();
        break;
      case "dots":
        dotX = (this.size + padding) * this.index + this.size;
        dotRadius = this.size;

        this.myCanvasContext.beginPath();
        this.myCanvasContext.arc(
          dotX,
          dotY,
          dotRadius,
          DOT_START_ANGLE,
          DOT_END_ANGLE
        );
        this.myCanvasContext.fill();
        break;
    }
  }

  public render(): void {
    this.myCanvasContext.fillStyle = INACTIVE_BEAT_COLOR;
    this.createShape();
  }

  public animate(): void {
    let metronomeType: number;

    this.beatType === "against"
      ? (metronomeType = this.metronome.baseBeat)
      : (metronomeType = this.metronome.againstBeat);

    if (this.currentNote % metronomeType === 0) {
      this.myCanvasContext.fillStyle =
        this.currentNote / metronomeType === this.index
          ? ACTIVE_BEAT_COLOR_CURRENT
          : ACTIVE_BEAT_COLOR_OTHER;
    } else {
      this.myCanvasContext.fillStyle = ACTIVE_BEAT_COLOR_OTHER;
    }
    this.createShape();
  }
}

export default Shape;
