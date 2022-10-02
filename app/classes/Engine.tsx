/* eslint-disable @typescript-eslint/no-explicit-any */
import { metronome, engine, audioContext } from '../index';

/**
 *  This class represents the math behind the metronome's calculations.
 *
 * @constructor
 * @param {number} current16thNote    - The last scheduled note.
 * @param {number} lookahead          - The scheduler's call (in milliseconds)
 * @param {number} scheduleAheadTime  - The scheduled audio (in seconds) calculated from lookahead. It overlaps with next interval (in case the timer is late).
 * @param {number} nextNoteTime       - The next note's due.
 * @param {number} noteLength         - The "beep"'s length (in seconds).
 * @param {any[]} notesInQueue        - The notes put into the web audio, and may or may not have played yet. {note, time}
 */

class Engine {
  current16thNote: number;

  lookahead: number;

  scheduleAheadTime: number;

  nextNoteTime: number;

  noteLength: number;

  notesInQueue: any[];

  constructor() {
    this.current16thNote = 0;
    this.lookahead = 25.0;
    this.scheduleAheadTime = 0.1;
    this.nextNoteTime = 0.0;
    this.noteLength = 0.05;
    this.notesInQueue = [];
  }

  // eslint-disable-next-line class-methods-use-this
  nextNote() {
    const secondsPerBeat = 60.0 / metronome.tempo;
    engine.nextNoteTime += 0.25 * secondsPerBeat;

    engine.current16thNote += 1;
    if (engine.current16thNote === metronome.againstBeat * metronome.baseBeat)
      engine.current16thNote = 0;
  }

  scheduleNote(beatNumber: number, time: number) {
    this.notesInQueue.push({ note: beatNumber, time });

    if (
      beatNumber % metronome.baseBeat !== 0 &&
      beatNumber % metronome.againstBeat !== 0
    )
      return;

    const osc = audioContext.createOscillator();
    osc.connect(audioContext.destination);
    if (beatNumber % (metronome.baseBeat * metronome.againstBeat) === 0)
      osc.frequency.value = 880.0;
    else if (beatNumber % metronome.againstBeat === 0)
      osc.frequency.value = 220.0;
    else if (beatNumber % metronome.baseBeat === 0) osc.frequency.value = 440.0;

    osc.start(time);
    osc.stop(time + this.noteLength);
  }

  scheduler() {
    while (
      this.nextNoteTime <
      audioContext.currentTime + this.scheduleAheadTime
    ) {
      this.scheduleNote(this.current16thNote, this.nextNoteTime);
      this.nextNote();
    }
  }
}

export default Engine;
