import {
  engine,
  view,
  metronome,
  last16thNoteDrawn,
  audioContext,
  canvas,
  canvasContext,
} from '../index';

export const Draw = () => {
  let currentNote = last16thNoteDrawn;
  const { currentTime } = audioContext;

  const ACTIVE_BEAT_COLOR_CURRENT = 'blue';
  const ACTIVE_BEAT_COLOR_OTHER = 'lightblue';
  const GRID_BORDER_COLOR = 'black';

  while (
    engine.notesInQueue.length &&
    engine.notesInQueue[0].time < currentTime
  ) {
    currentNote = engine.notesInQueue[0].note;
    engine.notesInQueue.splice(0, 1);
  }

  // We only need to draw if the note has moved.
  if (last16thNoteDrawn !== currentNote) {
    // General constants
    const HORIZONTAL_GAP_BETWEEN_ELEMENTS = 100;
    const VERTICAL_GAP_BETWEEN_ELEMENTS = 10;

    // Rect
    const ELEMENT_BASE_SIZE = Math.floor(canvas.width / 18);
    const RECT_WIDTH = view.selectedGUI === 'view-square' ? 21 : 1;

    // Dot
    const DOT_RADIUS = 10;
    const DOT_START_ANGLE = 0;
    const DOT_END_ANGLE = 2 * Math.PI;

    // Grid
    const GRID_CELL_SIZE = 70;
    const VERTICAL_GAP_BETWEEN_GRID_CELLS = 22;

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    // AgainstBeat
    for (let i = 0; i < metronome.againstBeat; i++) {
      const AGAINST_BEAT_ELEMENT_X =
        ELEMENT_BASE_SIZE + i * HORIZONTAL_GAP_BETWEEN_ELEMENTS;

      const AGAINST_BEAT_GRID_X = ELEMENT_BASE_SIZE + i * GRID_CELL_SIZE;
      const AGAINST_BEAT_GRID_Y = VERTICAL_GAP_BETWEEN_GRID_CELLS;
      const AGAINST_BEAT_GRID_WIDTH = GRID_CELL_SIZE;

      if (currentNote % metronome.baseBeat === 0) {
        canvasContext.fillStyle =
          currentNote / metronome.baseBeat === i
            ? ACTIVE_BEAT_COLOR_CURRENT
            : ACTIVE_BEAT_COLOR_OTHER;
      } else {
        canvasContext.fillStyle = ACTIVE_BEAT_COLOR_OTHER;
      }

      if (
        view.selectedGUI === 'view-square' ||
        view.selectedGUI === 'view-pipelines'
      ) {
        canvasContext.fillRect(
          AGAINST_BEAT_ELEMENT_X,
          VERTICAL_GAP_BETWEEN_ELEMENTS,
          RECT_WIDTH,
          ELEMENT_BASE_SIZE / 2,
        );
      } else if (view.selectedGUI === 'view-grid') {
        canvasContext.beginPath();
        canvasContext.rect(
          AGAINST_BEAT_GRID_X,
          AGAINST_BEAT_GRID_Y,
          AGAINST_BEAT_GRID_WIDTH,
          ELEMENT_BASE_SIZE / 2,
        );
        canvasContext.strokeStyle = GRID_BORDER_COLOR;
        canvasContext.fill();
        canvasContext.stroke();
      } else {
        canvasContext.beginPath();
        canvasContext.arc(
          AGAINST_BEAT_ELEMENT_X,
          VERTICAL_GAP_BETWEEN_ELEMENTS,
          DOT_RADIUS,
          DOT_START_ANGLE,
          DOT_END_ANGLE,
        );
        canvasContext.fill();
      }
    }

    // BaseBeat
    for (let j = 0; j < metronome.baseBeat; j++) {
      const BASE_BEAT_ELEMENT_X =
        ELEMENT_BASE_SIZE +
        ((j * HORIZONTAL_GAP_BETWEEN_ELEMENTS) / metronome.baseBeat) *
          metronome.againstBeat;

      const BASE_BEAT_GRID_X =
        ELEMENT_BASE_SIZE +
        ((j * GRID_CELL_SIZE) / metronome.baseBeat) * metronome.againstBeat;
      const BASE_BEAT_GRID_WIDTH =
        (GRID_CELL_SIZE / metronome.baseBeat) * metronome.againstBeat;

      if (currentNote % metronome.againstBeat === 0) {
        canvasContext.fillStyle =
          currentNote / metronome.againstBeat === j
            ? ACTIVE_BEAT_COLOR_CURRENT
            : ACTIVE_BEAT_COLOR_OTHER;
      } else {
        canvasContext.fillStyle = ACTIVE_BEAT_COLOR_OTHER;
      }

      if (
        view.selectedGUI === 'view-square' ||
        view.selectedGUI === 'view-pipelines'
      ) {
        canvasContext.fillRect(
          BASE_BEAT_ELEMENT_X,
          ELEMENT_BASE_SIZE,
          RECT_WIDTH,
          ELEMENT_BASE_SIZE / 2,
        );
      } else if (view.selectedGUI === 'view-grid') {
        canvasContext.beginPath();
        canvasContext.rect(
          BASE_BEAT_GRID_X,
          ELEMENT_BASE_SIZE,
          BASE_BEAT_GRID_WIDTH,
          ELEMENT_BASE_SIZE / 2,
        );
        canvasContext.strokeStyle = GRID_BORDER_COLOR;
        canvasContext.fill();
        canvasContext.stroke();
      } else {
        canvasContext.beginPath();
        canvasContext.arc(
          BASE_BEAT_ELEMENT_X,
          ELEMENT_BASE_SIZE,
          DOT_RADIUS,
          DOT_START_ANGLE,
          DOT_END_ANGLE,
        );
        canvasContext.fill();
      }
    }

    // last16thNoteDrawn = currentNote;
  }
  window.requestAnimationFrame(Draw);
};
