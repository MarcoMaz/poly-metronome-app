import Metronome from './Metronome';
import BpmUi from './View/GuiControllers/BpmUi';
import {
  BPM_MIN,
  TAP_BUTTON_SELECTOR,
  TAP_SIXTY_SECONDS,
  TAP_THREE_SECONDS,
} from './base/constants';

/**
 * This class represents the UI controlling the Tap chip.
 *
 * @name Tap
 *
 * @param {HTMLButtonElement} tapChip     - The chip controlling the tap function.
 * @param {number} newTap                 - The new tap in a sequence.
 * @param {number} lastTap                - The last tap in a sequence.
 * @param {number} counterTap             - The counter counting the tap.
 * @param {number} differenceBetweenTaps  - The difference between new and last tap.
 * @param {number} avgBPM                 - The average BPM.
 * @param {number} previousTap            - The previous tap in a sequence.
 * @param {number} elapsedTime            - The elapsed time between taps.
 *
 */

class Tap {
  private tapChip: HTMLButtonElement;
  private newTap: number;
  private lastTap: number;
  private counterTap: number;
  private differenceBetweenTaps: number;
  private avgBPM: number;
  private previousTap: number;
  private elapsedTime: number;

  /**
   * Define DOM Elements and Variables.
   */
  constructor(public metronome: Metronome, public bpm: BpmUi) {
    this.tapChip = document.querySelector(TAP_BUTTON_SELECTOR);

    this.newTap = 0;

    this.lastTap = 0;

    this.counterTap = 0;

    this.differenceBetweenTaps = 0;

    this.avgBPM = 0;

    this.previousTap = 0;

    this.elapsedTime = 0;

    // Register events
    this.tapChip.addEventListener('click', this.updateTempo.bind(this));
  }

  /**
   * @name updateTempo
   * @description
   * Update the tempo.
   *
   */
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
      this.avgBPM = Math.round(
        (TAP_SIXTY_SECONDS * this.counterTap) / this.differenceBetweenTaps
      );
    } else {
      this.avgBPM = BPM_MIN;
    }
    this.counterTap += 1;
    this.metronome.tempo = this.avgBPM;
    this.bpm.bpmValue.value = this.metronome.tempo.toString();
    this.bpm.bpmValue.setAttribute('value', this.metronome.tempo.toString());

    if (this.elapsedTime > TAP_THREE_SECONDS) this.lastTap = 0;
  }
}

export default Tap;
