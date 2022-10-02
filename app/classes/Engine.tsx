import { metronome, engine, audioContext } from '../index';

export class Engine {
  current16thNote: number;

  lookahead: number;

  scheduleAheadTime: number;

  nextNoteTime: number;

  noteLength: number;

  notesInQueue: any[];

  constructor() {
    this.current16thNote = 0; // What note is currently last scheduled?
    this.lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
    this.scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec). This is calculated from lookahead, and overlaps with next interval (in case the timer is late)
    this.nextNoteTime = 0.0; // when the next note is due.
    this.noteLength = 0.05; // length of "beep" (in seconds)
    this.notesInQueue = []; // the notes that have been put into the web audio, and may or may not have played yet. {note, time}
  }

  nextNote() {
    const secondsPerBeat = 60.0 / metronome.tempo;
    engine.nextNoteTime += 0.25 * secondsPerBeat;

    engine.current16thNote++;
    if (engine.current16thNote === metronome.againstBeat * metronome.baseBeat)
      engine.current16thNote = 0;
  }

  scheduleNote(beatNumber: number, time: number) {
    this.notesInQueue.push({ note: beatNumber, time });

    if (
      beatNumber % metronome.baseBeat !== 0 &&
      beatNumber % metronome.againstBeat !== 0
    )
      return; // we're not playing non-8th 16th notes

    // create an oscillator
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
