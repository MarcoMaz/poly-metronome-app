let audioContext: AudioContext = null;
let timerWorker: Worker = null; // The Web Worker used to fire timer messages       

class App {
  isPlaying: boolean;

  constructor(){
    this.isPlaying = false;
  }

  init() {
    audioContext = new AudioContext();
    timerWorker = new Worker(new URL('../workers/worker.tsx', import.meta.url));
    timerWorker.onmessage = (e) => (e.data == "tick") ? engine.scheduler() : console.log("message: " + e.data);
    timerWorker.postMessage({"interval": engine.lookahead});
  }

  play() {
    this.isPlaying = !this.isPlaying;
  
    if (this.isPlaying) {
      if (engine) {
        engine.current16thNote = 0;
        engine.nextNoteTime = audioContext.currentTime;
      }
      timerWorker.postMessage("start");
      if (view) view.playButton.innerHTML = 'stop';
    } else {
      timerWorker.postMessage("stop");
      if (view) view.playButton.innerHTML = 'play';
    }
  }
}

class View {
  playButton: HTMLButtonElement;
  BPMlabel: HTMLElement;
  BPMslider: HTMLElement;
  baseBeatLabel: HTMLElement;
  baseBeatSlider: HTMLElement;

  againstBeatLabel: HTMLElement;
  againstBeatSlider: HTMLElement;

  constructor() {
    this.playButton = document.querySelector('.play');
    this.BPMlabel = document.getElementById('showTempo');
    this.BPMslider = document.getElementById('tempo');
    this.againstBeatLabel = document.getElementById('againstBeatLabel');
    this.againstBeatSlider = document.getElementById('againstBeatSlider');
    this.baseBeatLabel = document.getElementById('baseBeatLabel');
    this.baseBeatSlider = document.getElementById('baseBeatSlider');

    this.playButton.addEventListener('click', () => {
      app.play();
    })

    this.BPMslider.addEventListener('input', (event) => {
      metronome.tempo = (event.target as HTMLInputElement).value as unknown as number;
      this.BPMlabel.innerText = `${metronome.tempo}`;
    })
    
    this.againstBeatSlider.addEventListener('input', (event) => {
      metronome.againstBeat = (event.target as HTMLInputElement).value as unknown as number;
      this.againstBeatLabel.innerText = `${metronome.againstBeat}`;
    })

    this.baseBeatSlider.addEventListener('input', (event) => {
      metronome.baseBeat = (event.target as HTMLInputElement).value as unknown as number;
      this.baseBeatLabel.innerText = `${metronome.baseBeat}`;
    })
  }
}

class Metronome {
  againstBeat: number;
  baseBeat: number;
  tempo: number;

  constructor(){
    this.againstBeat = 3;
    this.baseBeat = 4;
    this.tempo = 120.0;  
  }
}

class Engine {
  current16thNote: number;
  lookahead: number;
  scheduleAheadTime: number;
  nextNoteTime: number;
  noteLength: number;
  notesInQueue: any[];

  constructor(){
    this.current16thNote = 0;        // What note is currently last scheduled?
    this.lookahead = 25.0;           // How frequently to call scheduling function (in milliseconds)
    this.scheduleAheadTime = 0.1;    // How far ahead to schedule audio (sec). This is calculated from lookahead, and overlaps with next interval (in case the timer is late)
    this.nextNoteTime = 0.0;         // when the next note is due.
    this.noteLength = 0.05;          // length of "beep" (in seconds)
    this.notesInQueue = [];          // the notes that have been put into the web audio, and may or may not have played yet. {note, time}    
  }

  nextNote() {
    let secondsPerBeat = 60.0 / metronome.tempo;
    engine.nextNoteTime += 0.25 * secondsPerBeat;
  
    engine.current16thNote++;
    if (engine.current16thNote == metronome.againstBeat * metronome.baseBeat) engine.current16thNote = 0;
  }
  
  scheduleNote( beatNumber: number, time: number ) {
    this.notesInQueue.push( { note: beatNumber, time: time } );
  
    console.log('beatNumber', beatNumber);
  
    if (beatNumber % metronome.baseBeat !== 0 && beatNumber % metronome.againstBeat !== 0) return; // we're not playing non-8th 16th notes
  
    // create an oscillator
    let osc = audioContext.createOscillator();
    osc.connect( audioContext.destination );
    if (beatNumber % (metronome.baseBeat * metronome.againstBeat) === 0) osc.frequency.value = 880.0;
    else if (beatNumber % metronome.againstBeat === 0) osc.frequency.value = 220.0;
    else if (beatNumber % metronome.baseBeat === 0) osc.frequency.value = 440.0;
  
    osc.start( time );
    osc.stop( time + this.noteLength );
  }
  
  scheduler() {
    while (this.nextNoteTime < audioContext.currentTime + this.scheduleAheadTime ) {
      this.scheduleNote( this.current16thNote, this.nextNoteTime );
      this.nextNote();
    }
  }
}

const view = new View();
const metronome = new Metronome();
const engine = new Engine();

const app = new App();

window.addEventListener("load", app.init );