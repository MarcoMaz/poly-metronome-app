import BpmKnob from "./BpmKnob";
import Metronome from "./Metronome";

import { BPM_MIN, TAP_CHIP_SELECTOR, SIXTY_SECONDS } from "./base/constants";

/**
 * This class represents the UI controlling the tap chip.
 *
 * @name TapChip
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

class TapChip {
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
  constructor(public metronome: Metronome, public bpmKnob: BpmKnob) {
    this.tapChip = document.querySelector(TAP_CHIP_SELECTOR);
    this.newTap = 0;
    this.lastTap = 0;
    this.counterTap = 0;
    this.differenceBetweenTaps = 0;
    this.avgBPM = 0;
    this.previousTap = 0;
    this.elapsedTime = 0;

    // Register events
    this.tapChip.addEventListener("click", this.updateTempo.bind(this));
  }

  /**
   * @name updateTempo
   * @description
   * Update the tempo.
   *
   */
  private updateTempo(): void {
    if (this.lastTap === 0) {
      this.handleFirstTap();
    }

    this.handleSubsequentTap();
    this.updateMetronomeTempo();
    this.updateBpmUi();
  }

  /**
   * @name updateTempo
   * @description
   * Update the tempo.
   *
   */
  private handleFirstTap(): void {
    this.newTap = new Date().getTime();
    this.counterTap = 0;
  }

  /**
   * @name handleSubsequentTap
   * @description
   * Handle the subsequent Ttp.
   *
   */
  private handleSubsequentTap(): void {
    this.lastTap = new Date().getTime();
    this.elapsedTime = new Date().getTime() - this.previousTap;
    this.previousTap = this.lastTap;
    this.differenceBetweenTaps = this.lastTap - this.newTap;
    this.updateAvgBPM();
    this.counterTap += 1;
  }

  /**
   * @name updateAvgBPM
   * @description
   * Update the average bpm.
   *
   */
  private updateAvgBPM(): void {
    if (this.differenceBetweenTaps !== 0) {
      this.avgBPM = Math.round(
        (SIXTY_SECONDS * this.counterTap) / this.differenceBetweenTaps
      );
    } else {
      this.avgBPM = BPM_MIN;
    }
  }

  /**
   * @name updateMetronomeTempo
   * @description
   * Update the metronome's tempo.
   *
   */
  private updateMetronomeTempo(): void {
    this.metronome.tempo = this.avgBPM;
  }

  /**
   * @name updateBpmUi
   * @description
   * Update the ui of the bpm element.
   *
   */
  private updateBpmUi(): void {
    this.bpmKnob.bpmKnobRange.value = this.metronome.tempo.toString();
    this.bpmKnob.bpmKnobRange.setAttribute("value", this.metronome.tempo.toString());
    this.bpmKnob.updateKnob();
  }
}

export default TapChip;
