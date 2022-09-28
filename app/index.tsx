let audioContext: AudioContext = null;
let timerWorker: Worker = null; // The Web Worker used to fire timer messages

let canvas: HTMLCanvasElement;
let canvasContext: CanvasRenderingContext2D;

var last16thNoteDrawn = -1; // the last "box" we drew on the screen

class App {
  isPlaying: boolean;

  constructor(){
    this.isPlaying = false;
  }

  init() {
    const container = document.createElement( 'div' );
    container.className = "container";
    canvas = document.createElement( 'canvas' );
    canvasContext = canvas.getContext( '2d' );
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
    document.body.appendChild( container );
    container.appendChild(canvas);    

    audioContext = new AudioContext();

    window.requestAnimationFrame(draw);    // start the drawing loop.

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
  switchBeatsButton: HTMLElement;
  radioButtons: any;
  selectedGUI: string;

  constructor() {
    this.playButton = document.querySelector('.play');
    this.BPMlabel = document.getElementById('showTempo');
    this.BPMslider = document.getElementById('tempo');
    this.againstBeatLabel = document.getElementById('againstBeatLabel');
    this.againstBeatSlider = document.getElementById('againstBeatSlider');
    this.baseBeatLabel = document.getElementById('baseBeatLabel');
    this.baseBeatSlider = document.getElementById('baseBeatSlider');
    this.switchBeatsButton = document.getElementById('switchBeatsButton');
    this.radioButtons = document.querySelectorAll('input[name="view-radio-btn"]');  
    this.selectedGUI = 'view-square';

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

    this.switchBeatsButton.addEventListener('click', () => {
      [metronome.againstBeat, metronome.baseBeat] = [metronome.baseBeat, metronome.againstBeat];
      this.baseBeatLabel.innerText = `${metronome.baseBeat}`;
      this.againstBeatLabel.innerText = `${metronome.againstBeat}`;
    })

    for (const radioButton of this.radioButtons) {
      radioButton.addEventListener('change', () => {
        if(radioButton.checked) this.selectedGUI = radioButton.value      
      });
    }
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

const draw = () => {
  let currentNote = last16thNoteDrawn;
  let currentTime = audioContext.currentTime;

  const ACTIVE_BEAT_COLOR_CURRENT = 'blue';
  const ACTIVE_BEAT_COLOR_OTHER = 'lightblue';
  
  while (engine.notesInQueue.length && engine.notesInQueue[0].time < currentTime) {
    currentNote = engine.notesInQueue[0].note;
    engine.notesInQueue.splice(0, 1);
  }  
  
  // We only need to draw if the note has moved.
  if (last16thNoteDrawn != currentNote) {    
    
    // General constants
    const HORIZONTAL_GAP_BETWEEN_ELEMENTS = 100;
    const VERTICAL_GAP_BETWEEN_ELEMENTS = 10;

    // Rect
    const ELEMENT_BASE_SIZE = Math.floor( canvas.width / 18 );
    const RECT_WIDTH = view.selectedGUI === 'view-square' ?  21 : 1;
    
    // Dot
    const DOT_RADIUS = 10;
    const DOT_START_ANGLE = 0;
    const DOT_END_ANGLE = 2 * Math.PI;

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    // AgainstBeat
    for (let i = 0; i < metronome.againstBeat; i++) {

      const AGAINST_BEAT_ELEMENT_X = ELEMENT_BASE_SIZE + ( i * HORIZONTAL_GAP_BETWEEN_ELEMENTS );

      if (currentNote % metronome.baseBeat === 0){
        canvasContext.fillStyle = (currentNote / metronome.baseBeat ===  i) ? ACTIVE_BEAT_COLOR_CURRENT : ACTIVE_BEAT_COLOR_OTHER
      } else {
        canvasContext.fillStyle = ACTIVE_BEAT_COLOR_OTHER
      }

      if (view.selectedGUI === 'view-square' || view.selectedGUI === 'view-pipelines') {
        canvasContext.fillRect( AGAINST_BEAT_ELEMENT_X, VERTICAL_GAP_BETWEEN_ELEMENTS, RECT_WIDTH, ELEMENT_BASE_SIZE / 2 );
      } else {
        canvasContext.beginPath();
        canvasContext.arc(AGAINST_BEAT_ELEMENT_X, VERTICAL_GAP_BETWEEN_ELEMENTS, DOT_RADIUS, DOT_START_ANGLE, DOT_END_ANGLE);
        canvasContext.fill();  
      }
    }

    // BaseBeat
    for (let j = 0; j < metronome.baseBeat; j++) {

      const BASE_BEAT_ELEMENT_X = ELEMENT_BASE_SIZE + ( (j * HORIZONTAL_GAP_BETWEEN_ELEMENTS) / metronome.baseBeat * metronome.againstBeat );
      
      if (currentNote % metronome.againstBeat === 0){
        canvasContext.fillStyle = (currentNote / metronome.againstBeat ===  j) ? ACTIVE_BEAT_COLOR_CURRENT : ACTIVE_BEAT_COLOR_OTHER  
      } else {
        canvasContext.fillStyle = ACTIVE_BEAT_COLOR_OTHER
      }
      
      if (view.selectedGUI === 'view-square' || view.selectedGUI === 'view-pipelines') {
        canvasContext.fillRect( BASE_BEAT_ELEMENT_X, ELEMENT_BASE_SIZE, RECT_WIDTH, ELEMENT_BASE_SIZE / 2 );
      } else {
        canvasContext.beginPath();
        canvasContext.arc(BASE_BEAT_ELEMENT_X, ELEMENT_BASE_SIZE, DOT_RADIUS, DOT_START_ANGLE, DOT_END_ANGLE);
        canvasContext.fill();  
      }
    }

    last16thNoteDrawn = currentNote;
  }
  window.requestAnimationFrame(draw);
}

const view = new View();
const metronome = new Metronome();
const engine = new Engine();

const app = new App();

window.addEventListener("load", app.init );