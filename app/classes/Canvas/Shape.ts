import Metronome from "../Metronome";

//// GENERAL
const ACTIVE_BEAT_COLOR_OTHER = "lightblue";
const ACTIVE_BEAT_COLOR_CURRENT = "blue";
const INACTIVE_BEAT_COLOR = "lightgray";
const HORIZONTAL_GAP_BETWEEN_ELEMENTS = 100;
const VERTICAL_GAP_BETWEEN_ELEMENTS = 10;

//// GRID
const GRID_BORDER_COLOR = "black";
const GRID_CELL_SIZE = 70;
const VERTICAL_GAP_BETWEEN_GRID_CELLS = 35;

//// Dot
const DOT_RADIUS = 10;
const DOT_START_ANGLE = 0;
const DOT_END_ANGLE = 2 * Math.PI;

class Shape {
  size: number;
  index: number;
  beatType: string;
  currentNote: number;
  type: string;

  constructor(
    public myCanvasContext: CanvasRenderingContext2D,
    public metronome: Metronome,
    size: number,
    index: number,
    beatType: "base" | "against",
    type: string,
    currentNote?: number
  ) {
    this.size = size;
    this.index = index;
    this.beatType = beatType;
    this.type = type;
    this.currentNote = currentNote;
  }

  public render(): void {
    this.myCanvasContext.fillStyle = INACTIVE_BEAT_COLOR;

    // Rect / Pipeline
    let rectX: number;
    let rectY: number;
    let rectHeight: number;
    let rectWidth: number;

    // Grid
    let gridX: number;
    let gridY: number;
    let gridWidth: number;
    const gridHeight: number = this.size / 2;

    // Dots
    let dotX: number;
    let dotY: number;

    if (this.beatType === "against") {
      // Rect
      rectX = this.size + this.index * HORIZONTAL_GAP_BETWEEN_ELEMENTS;
      rectY = VERTICAL_GAP_BETWEEN_ELEMENTS;

      // Grid
      gridX = this.size + this.index * GRID_CELL_SIZE;
      gridY = VERTICAL_GAP_BETWEEN_GRID_CELLS;
      gridWidth = GRID_CELL_SIZE;

      // Dots
      dotX = rectX;
      dotY = rectY;
    } else {
      // Rect
      rectX =
        this.size +
        ((this.index * HORIZONTAL_GAP_BETWEEN_ELEMENTS) /
          this.metronome.baseBeat) *
          this.metronome.againstBeat;
      rectY = this.size;

      // Grid
      gridX =
        this.size +
        ((this.index * GRID_CELL_SIZE) / this.metronome.baseBeat) *
          this.metronome.againstBeat;
      gridY = this.size;
      gridWidth =
        (GRID_CELL_SIZE / this.metronome.baseBeat) * this.metronome.againstBeat;

      // Dots
      dotX = rectX;
      dotY = rectY;
    }

    switch (this.type) {
      case "square":
        rectWidth = 21;
        rectHeight = this.size / 2;
        this.myCanvasContext.fillRect(rectX, rectY, rectWidth, rectHeight);
        this.myCanvasContext.fill();
        break;
      case "pipelines":
        rectWidth = 1;
        rectHeight = this.size / 2;
        this.myCanvasContext.fillRect(rectX, rectY, rectWidth, rectHeight);
        this.myCanvasContext.fill();
        break;
      case "grid":
        this.myCanvasContext.beginPath();
        this.myCanvasContext.rect(gridX, gridY, gridWidth, gridHeight);
        this.myCanvasContext.strokeStyle = GRID_BORDER_COLOR;
        this.myCanvasContext.fill();
        this.myCanvasContext.stroke();
        break;
      case "dots":
        this.myCanvasContext.beginPath();
        this.myCanvasContext.arc(
          dotX,
          dotY,
          DOT_RADIUS,
          DOT_START_ANGLE,
          DOT_END_ANGLE
        );
        this.myCanvasContext.fill();
        break;
    }
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

    // Rect
    let rectX: number;
    let rectY: number;
    let rectWidth: number;
    let rectHeight: number;

    // Grid
    let gridX: number;
    let gridY: number;
    let gridWidth: number;
    let gridHeight: number;

    // Dots
    let dotX: number;
    let dotY: number;

    if (this.beatType === "against") {
      // Rect
      rectX = this.size + this.index * HORIZONTAL_GAP_BETWEEN_ELEMENTS;
      rectY = VERTICAL_GAP_BETWEEN_ELEMENTS;

      // Grid
      gridX = this.size + this.index * GRID_CELL_SIZE;
      gridY = VERTICAL_GAP_BETWEEN_GRID_CELLS;
      gridWidth = GRID_CELL_SIZE;
      gridHeight = this.size / 2;

      // Dots
      dotX = rectX;
      dotY = rectY;
    } else {
      // Rect
      rectX =
        this.size +
        ((this.index * HORIZONTAL_GAP_BETWEEN_ELEMENTS) /
          this.metronome.baseBeat) *
          this.metronome.againstBeat;
      rectY = this.size;

      // Grid
      gridX =
        this.size +
        ((this.index * GRID_CELL_SIZE) / this.metronome.baseBeat) *
          this.metronome.againstBeat;
      gridY = this.size;
      gridWidth =
        (GRID_CELL_SIZE / this.metronome.baseBeat) * this.metronome.againstBeat;
      gridHeight = this.size / 2;

      // Dots
      dotX = rectX;
      dotY = rectY;
    }

    switch (this.type) {
      case "square":
        rectWidth = 21;
        rectHeight = this.size / 2;
        this.myCanvasContext.fillRect(rectX, rectY, rectWidth, rectHeight);
        break;
      case "pipelines":
        rectWidth = 1;
        rectHeight = this.size / 2;
        this.myCanvasContext.fillRect(rectX, rectY, rectWidth, rectHeight);
        break;
      case "grid":
        this.myCanvasContext.beginPath();
        this.myCanvasContext.rect(gridX, gridY, gridWidth, gridHeight);
        this.myCanvasContext.strokeStyle = GRID_BORDER_COLOR;
        this.myCanvasContext.fill();
        this.myCanvasContext.stroke();
        break;
      case "dots":
        this.myCanvasContext.beginPath();
        this.myCanvasContext.arc(
          dotX,
          dotY,
          DOT_RADIUS,
          DOT_START_ANGLE,
          DOT_END_ANGLE
        );
        this.myCanvasContext.fill();
        break;
    }
  }
}

export default Shape;
