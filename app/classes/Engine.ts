import Metronome from "./Metronome";

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
  public current16thNote: number;

  public lookahead: number;

  private scheduleAheadTime: number;

  public nextNoteTime: number;

  private noteLength: number;

  public notesInQueue: any[];

  public gainNode: GainNode;

  constructor(public metronome: Metronome, public audioContext: AudioContext) {
    this.current16thNote = 0;
    this.lookahead = 25.0;
    this.scheduleAheadTime = 0.1;
    this.nextNoteTime = 0.0;
    this.noteLength = 0.05;
    this.notesInQueue = [];
    this.gainNode = this.audioContext.createGain();
  }

  private nextNote(): void {
    const secondsPerBeat = 60.0 / this.metronome.tempo;
    this.nextNoteTime += 0.25 * secondsPerBeat;

    this.current16thNote += 1;

    if (
      this.current16thNote ===
      this.metronome.againstBeat * this.metronome.baseBeat
    )
      this.current16thNote = 0;
  }

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
      osc.frequency.value = 880.0;
    else if (beatNumber % this.metronome.againstBeat === 0)
      osc.frequency.value = 220.0;
    else if (beatNumber % this.metronome.baseBeat === 0)
      osc.frequency.value = 440.0;

    osc.start(time);
    osc.stop(time + this.noteLength);
  }

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
