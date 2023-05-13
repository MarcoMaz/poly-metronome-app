import Metronome from "../../Metronome";
import {
  BORDER_RADIUS,
  DESKTOP_VIEWPORT,
  MOBILE_VIEWPORT,
  TABLET_VIEWPORT,
  SHAPE_ACTIVE_BEAT_COLOR_OTHER,
  SHAPE_ACTIVE_BEAT_COLOR_CURRENT,
  SHAPE_INACTIVE_BEAT_COLOR,
  SHAPE_GRID_BORDER_COLOR,
  SHAPE_SIZE_MOBILE,
  SHAPE_SIZE_TABLET,
  SHAPE_SIZE_DESKTOP,
  SHAPE_DOT_START_ANGLE,
  SHAPE_DOT_END_ANGLE,
} from "../../base/constants";

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
      this.size = SHAPE_SIZE_MOBILE;
    } else if (
      window.innerWidth >= TABLET_VIEWPORT &&
      window.innerWidth < DESKTOP_VIEWPORT
    ) {
      this.size = SHAPE_SIZE_TABLET;
    } else {
      this.size = SHAPE_SIZE_DESKTOP;
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
    let offset: number;

    // Square / Line
    let rectX: number;
    let rectY: number;
    let rectHeight: number;
    let rectWidth: number;
    let radii: number;

    // Grid
    let gridX: number;
    let gridY: number;
    let gridHeight: number;
    let gridWidth: number;

    // Dot
    let dotX: number;
    let dotY: number;
    let dotRadius: number;

    if (this.beatType === "against") {
      if (this.type === "square" || this.type === "line") {
        padding = this.canvas.width / this.metronome.againstBeat - this.size;
        rectY = 0;
      } else if (this.type === "grid") {
        padding = 10;
        offset = 1;

        gridX = (this.canvas.width / this.metronome.againstBeat) * this.index;
        gridY = offset;

        if (this.index !== this.metronome.againstBeat - 1) {
          gridWidth = this.canvas.width / this.metronome.againstBeat - padding;
        } else {
          gridWidth = this.canvas.width / this.metronome.againstBeat;
        }
      } else {
        padding = this.canvas.width / this.metronome.againstBeat - this.size;
        dotY = this.size;
      }
    } else {
      if (this.type === "square" || this.type === "line") {
        padding = this.canvas.width / this.metronome.baseBeat - this.size;
        rectY = this.canvas.height - this.size * 2;
      } else if (this.type === "grid") {
        padding = 10;
        offset = 1;

        gridX = (this.canvas.width / this.metronome.baseBeat) * this.index;
        gridY = this.canvas.height / 2 + offset;

        if (this.index !== this.metronome.baseBeat - 1) {
          gridWidth = this.canvas.width / this.metronome.baseBeat - padding;
        } else {
          gridWidth = this.canvas.width / this.metronome.baseBeat;
        }
      } else {
        padding = this.canvas.width / this.metronome.baseBeat - this.size;
        dotY = this.canvas.height - this.size;
      }
    }

    switch (this.type) {
      case "square":
        rectX = (this.size + padding) * this.index;
        rectWidth = this.size * 2;
        rectHeight = rectWidth;
        radii = BORDER_RADIUS;

        this.canvasContext.beginPath();
        this.canvasContext.roundRect(
          rectX,
          rectY,
          rectWidth,
          rectHeight,
          radii
        );
        this.canvasContext.fill();
        break;
      case "line":
        rectX = (this.size + padding) * this.index;
        rectWidth = this.size / 2;
        rectHeight = this.size * 2;
        radii = BORDER_RADIUS;

        this.canvasContext.beginPath();
        this.canvasContext.roundRect(
          rectX,
          rectY,
          rectWidth,
          rectHeight,
          radii
        );
        this.canvasContext.fill();
        break;
      case "grid":
        gridHeight = this.canvas.height / 2.5;
        radii = BORDER_RADIUS;

        this.canvasContext.beginPath();
        this.canvasContext.roundRect(
          gridX,
          gridY,
          gridWidth,
          gridHeight,
          radii
        );
        this.canvasContext.strokeStyle = SHAPE_GRID_BORDER_COLOR;
        this.canvasContext.fill();
        this.canvasContext.stroke();
        break;
      case "dot":
        dotX = (this.size + padding) * this.index + this.size;
        dotRadius = this.size;

        this.canvasContext.beginPath();
        this.canvasContext.arc(
          dotX,
          dotY,
          dotRadius,
          SHAPE_DOT_START_ANGLE,
          SHAPE_DOT_END_ANGLE
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
    this.canvasContext.fillStyle = SHAPE_INACTIVE_BEAT_COLOR;
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
          ? SHAPE_ACTIVE_BEAT_COLOR_CURRENT
          : SHAPE_ACTIVE_BEAT_COLOR_OTHER;
    } else {
      this.canvasContext.fillStyle = SHAPE_ACTIVE_BEAT_COLOR_OTHER;
    }
    this.createShape();
  }
}

export default Shape;
