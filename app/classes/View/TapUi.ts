import Metronome from "../Metronome";
import BpmUi, { BPM_MIN } from "./BpmUi";

const BUTTON_TAP = ".tap";
const SIX_SECONDS = 6000;
const THREE_SECONDS = 3000;

class TapUi {
  private tap: HTMLElement;

  private newTap: number;

  private lastTap: number;

  private counterTap: number;

  private differenceBetweenTaps: number;

  private avgbpm: number;

  private previousTap: number;

  private elapsedTime: number;

  constructor(public metronome: Metronome, public bpm: BpmUi) {
    this.tap = document.querySelector(BUTTON_TAP);

    this.newTap = 0;

    this.lastTap = 0;

    this.counterTap = 0;

    this.differenceBetweenTaps = 0;

    this.avgbpm = 0;

    this.previousTap = 0;

    this.elapsedTime = 0;

    this.tap.addEventListener("click", () => this.updateTempo());
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
        (SIX_SECONDS * this.counterTap) / this.differenceBetweenTaps
      );
    } else {
      this.avgbpm = BPM_MIN;
    }
    this.counterTap += 1;
    this.metronome.tempo = this.avgbpm;
    this.bpm.label.innerText = `${this.metronome.tempo}`;
    this.bpm.inputNumber.value = `${this.metronome.tempo}`;
    this.bpm.inputNumberStepFive.value = `${this.metronome.tempo}`;
    this.bpm.slider.value = `${this.metronome.tempo}`;

    if (this.elapsedTime > THREE_SECONDS) this.lastTap = 0;
  }
}

export default TapUi;
