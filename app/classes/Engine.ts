import Metronome from "./Metronome";

import {
  ONE_MINUTE_IN_SECONDS,
  ENGINE_SMALL_DELAY,
  ENGINE_FREQUENCIES_BEAT_ONE,
  ENGINE_FREQUENCIES_BASE_BEAT,
  ENGINE_FREQUENCIES_AGAINST_BEAT,
} from "./base/constants";

/**
 *  This class represents the math behind the metronome's calculations.
 *
 * @name Engine
 *
 * @param {number} current16thNote      - The last scheduled note.
 * @param {number} lookahead            - The scheduler's call (in milliseconds).
 * @param {number} scheduleAheadTime    - The scheduled audio (in seconds) calculated from lookahead. It overlaps with next interval (in case the timer is late).
 * @param {number} nextNoteTime         - The next note's due.
 * @param {number} noteLength           - The "beep"'s length (in seconds).
 * @param {NotesInQueue[]} notesInQueue - The notes put into the web audio, and may or may not have played yet. {note, time}.
 * @param {GainNode} gainNode           - The "beep"'s volume.
 *
 */

interface NotesInQueue {
  note: number;
  time: number;
}

class Engine {
  public current16thNote: number;
  public lookahead: number;
  private scheduleAheadTime: number;
  public nextNoteTime: number;
  private noteLength: number;
  public notesInQueue: NotesInQueue[];
  public gainNode: GainNode;

  /**
   * Define Variables.
   */
  constructor(public metronome: Metronome, public audioContext: AudioContext) {
    this.current16thNote = 0;
    this.lookahead = 25.0;
    this.scheduleAheadTime = 0.1;
    this.nextNoteTime = 0.0;
    this.noteLength = 0.05;
    this.notesInQueue = [];
    this.gainNode = this.audioContext.createGain();
  }

  /**
   * @name nextNote
   * @description
   * Calculate the next set of notes in the pipeline.
   */
  private nextNote(): void {
    const secondsPerBeat = ONE_MINUTE_IN_SECONDS / this.metronome.tempo;
    this.nextNoteTime += ENGINE_SMALL_DELAY * secondsPerBeat;

    this.current16thNote += 1;

    if (
      this.current16thNote >=
      this.metronome.againstBeat * this.metronome.baseBeat
    )
      this.current16thNote = 0;
  }

  /**
   * @name scheduleNote
   * @description
   * Queue the next note and create and oscillator.
   */
  private scheduleNote(beatNumber: number, time: number): void {
    this.notesInQueue.push({ note: beatNumber, time });

    if (
      beatNumber % this.metronome.baseBeat !== 0 &&
      beatNumber % this.metronome.againstBeat !== 0
    )
      return;

    const osc = this.audioContext.createOscillator();
    osc.connect(this.gainNode).connect(this.audioContext.destination);

    if (
      beatNumber % (this.metronome.againstBeat * this.metronome.baseBeat) ===
      0
    )
      osc.frequency.value = ENGINE_FREQUENCIES_BEAT_ONE;
    else if (beatNumber % this.metronome.againstBeat === 0)
      osc.frequency.value = ENGINE_FREQUENCIES_BASE_BEAT;
    else if (beatNumber % this.metronome.baseBeat === 0)
      osc.frequency.value = ENGINE_FREQUENCIES_AGAINST_BEAT;

    osc.start(time);
    osc.stop(time + this.noteLength);
  }

  /**
   * @name scheduler
   * @description
   * If the metronome didn't catch up, schedule the next note.
   */
  public scheduler(): void {
    while (
      this.nextNoteTime <
      this.audioContext.currentTime + this.scheduleAheadTime
    ) {
      this.scheduleNote(this.current16thNote, this.nextNoteTime);
      this.nextNote();
    }
  }
}

export default Engine;
