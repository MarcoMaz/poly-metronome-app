var audioContext: AudioContext = null;
var isPlaying = false;          // Are we currently playing?
var current16thNote: number;            // What note is currently last scheduled?
var againstBeat = 3;
var baseBeat = 4;
var tempo = 120.0;              // Tempo (in beats per minute)
var lookahead = 25.0;           // How frequently to call scheduling function (in milliseconds)
var scheduleAheadTime = 0.1;    // How far ahead to schedule audio (sec). This is calculated from lookahead, and overlaps with next interval (in case the timer is late)
var nextNoteTime = 0.0;         // when the next note is due.
var noteLength = 0.05;          // length of "beep" (in seconds)
var notesInQueue = [];          // the notes that have been put into the web audio, and may or may not have played yet. {note, time}
var timerWorker: Worker = null;         // The Web Worker used to fire timer messages

const nextNote = () => {
  var secondsPerBeat = 60.0 / tempo;
  nextNoteTime += 0.25 * secondsPerBeat;

  current16thNote++;
  if (current16thNote == againstBeat * baseBeat) current16thNote = 0;
}

const scheduleNote = ( beatNumber: number, time: number ) => {
  notesInQueue.push( { note: beatNumber, time: time } );

  console.log('beatNumber', beatNumber);

  if (beatNumber % baseBeat !== 0 && beatNumber % againstBeat !== 0) return; // we're not playing non-8th 16th notes

  // create an oscillator
  var osc = audioContext.createOscillator();
  osc.connect( audioContext.destination );
  if (beatNumber % (baseBeat * againstBeat) === 0) osc.frequency.value = 880.0;
  else if (beatNumber % againstBeat === 0) osc.frequency.value = 220.0;
  else if (beatNumber % baseBeat === 0) osc.frequency.value = 440.0;

  osc.start( time );
  osc.stop( time + noteLength );
}

const scheduler = () => {
  while (nextNoteTime < audioContext.currentTime + scheduleAheadTime ) {
    scheduleNote( current16thNote, nextNoteTime );
    nextNote();
  }
}

const play = () => {
  isPlaying = !isPlaying;

  if (isPlaying) {
    current16thNote = 0;
    nextNoteTime = audioContext.currentTime;
    timerWorker.postMessage("start");
    playButton.innerHTML = 'stop';
  } else {
    timerWorker.postMessage("stop");
    playButton.innerHTML = 'play';
  }
}

const init = () => {
  audioContext = new AudioContext();
  timerWorker = new Worker(new URL('../workers/worker.tsx', import.meta.url));
  timerWorker.onmessage = (e) => (e.data == "tick") ? scheduler() : console.log("message: " + e.data);
  timerWorker.postMessage({"interval": lookahead});
}

const playButton = document.querySelector('.play');

playButton.addEventListener('click', () => {
  play();
})

const showTempo = document.getElementById('showTempo');
const inputTempo = document.getElementById('tempo');

inputTempo.addEventListener('input', (event) => {
  tempo = (event.target as HTMLInputElement).value as unknown as number;
  console.log('tempo is ', tempo);
  showTempo.innerText = `${tempo}`;
})

const showAgainstBeat = document.getElementById('againstBeat');
const inputAgainstBeat = document.getElementById('againstSlider');

inputAgainstBeat.addEventListener('input', (event) => {
  againstBeat = (event.target as HTMLInputElement).value as unknown as number;
  showAgainstBeat.innerText = `${againstBeat}`;
  console.log('againstBeat', againstBeat);
})

const showBaseBeat = document.getElementById('baseBeat');
const inputBaseBeat = document.getElementById('baseSlider');

inputBaseBeat.addEventListener('input', (event) => {
  baseBeat = (event.target as HTMLInputElement).value as unknown as number;
  showBaseBeat.innerText = `${baseBeat}`;
  console.log('baseBeat', baseBeat);
})



window.addEventListener("load", init );