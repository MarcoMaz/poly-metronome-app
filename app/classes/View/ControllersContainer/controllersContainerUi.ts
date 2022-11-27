import Engine from "../../Engine";
import Metronome from "../../Metronome";
import BpmUi, { BPM_MIN } from "../GuiControllers/BpmUi";

const SOUND_BUTTON = ".controllers__sound";
const SOUND_ON = "Sound: ON";
const SOUND_OFF = "Sound: OFF";
const SOUND_RESET = "Sound: ";

const PLAY_BUTTON = ".controllers__play";
const PLAY = "Play";
const STOP = "Stop";

const TAP_BUTTON = ".controllers__tap";
const SIXTY_SECONDS = 60000;
const THREE_SECONDS = 3000;

class ControllersContainerUi {
  private soundButton: HTMLButtonElement;
  private playButton: HTMLButtonElement;
  private isSoundMuted: boolean;
  private tapButton: HTMLButtonElement;
  private newTap: number;
  private lastTap: number;
  private counterTap: number;
  private differenceBetweenTaps: number;
  private avgbpm: number;
  private previousTap: number;
  private elapsedTime: number;

  private onPlay?: () => void;
  private onPause?: () => void;

  constructor(
    public engine: Engine,
    public metronome: Metronome,
    public bpm: BpmUi
  ) {
    this.soundButton = document.querySelector(SOUND_BUTTON);
    this.playButton = document.querySelector(PLAY_BUTTON);

    this.playButton.addEventListener("click", () => {
      if (this.playButton.innerHTML === PLAY) {
        this.playButton.innerHTML = STOP;
        this.soundButton.innerHTML = SOUND_ON;
        if (this.onPlay) this.onPlay();
        this.soundOn();
      } else {
        this.playButton.innerHTML = PLAY;
        this.soundButton.innerHTML = SOUND_RESET;
        if (this.onPause) this.onPause();
        this.soundOff();
      }
    });

    this.soundButton.addEventListener("click", () => {
      if (this.playButton.innerHTML === STOP) {
        if (this.isSoundMuted === false) {
          this.soundButton.innerHTML = SOUND_ON;
          this.soundOn();
          this.isSoundMuted = true;
        } else {
          this.soundButton.innerHTML = SOUND_OFF;
          this.soundOff();
          this.isSoundMuted = false;
        }
      }
      return;
    });

    this.tapButton = document.querySelector(TAP_BUTTON);

    this.newTap = 0;

    this.lastTap = 0;

    this.counterTap = 0;

    this.differenceBetweenTaps = 0;

    this.avgbpm = 0;

    this.previousTap = 0;

    this.elapsedTime = 0;

    this.tapButton.addEventListener("click", () => this.updateTempo());
  }

  public setOnPlay(callback: () => void) {
    this.onPlay = callback;
  }

  public setOnPause(callback: () => void) {
    this.onPause = callback;
  }

  private soundOn(): void {
    this.engine.gainNode.gain.value = 1;
  }

  private soundOff(): void {
    this.engine.gainNode.gain.value = 0;
  }

  private updateTempo(): void {
    if (this.lastTap === 0) {
      this.newTap = new Date().getTime();
      this.counterTap = 0;
    }

    this.lastTap = new Date().getTime();
    this.elapsedTime = new Date().getTime() - this.previousTap;
    this.previousTap = this.lastTap;
    this.differenceBetweenTaps = this.lastTap - this.newTap;

    if (this.differenceBetweenTaps !== 0) {
      this.avgbpm = Math.round(
        (SIXTY_SECONDS * this.counterTap) / this.differenceBetweenTaps
      );
    } else {
      this.avgbpm = BPM_MIN;
    }
    this.counterTap += 1;
    this.metronome.tempo = this.avgbpm;
    this.bpm.bpmValue.valueAsNumber = this.metronome.tempo;

    if (this.elapsedTime > THREE_SECONDS) this.lastTap = 0;
  }
}

export default ControllersContainerUi;
