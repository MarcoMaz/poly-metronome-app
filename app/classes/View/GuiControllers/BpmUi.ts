import Metronome from '../../Metronome';

import {
  BPM_SELECTOR,
  BPM_MINUS_1_SELECTOR,
  BPM_MINUS_5_SELECTOR,
  BPM_PLUS_1_SELECTOR,
  BPM_PLUS_5_SELECTOR,
  BPM_VALUE_SELECTOR,
  BPM_MIN,
  BPM_MAX,
} from '../../base/constants';

/**
 * This class represents the UI controlling the Bpm.
 *
 * @name BpmUi
 *
 * @param {HTMLDivElement} element          - The parent element container.
 * @param {HTMLButtonElement} bpmMinusOne   - The button subtracting one BPM.
 * @param {HTMLButtonElement} bpmMinusFive  - The button subtracting five BPMs.
 * @param {HTMLButtonElement} bpmPlusOne    - The button adding one BPMs.
 * @param {HTMLButtonElement} bpmPlusFive   - The button adding five BPMs.
 * @param {HTMLInputElement} bpmValue       - The input value of the BPM.
 */

class BpmUi {
  private element: HTMLDivElement;
  public bpmMinusOne: HTMLButtonElement;
  public bpmMinusFive: HTMLButtonElement;
  public bpmPlusOne: HTMLButtonElement;
  public bpmPlusFive: HTMLButtonElement;
  public bpmValue: HTMLInputElement;

  /**
   * Define DOM Elements and Variables.
   */
  constructor(public metronome: Metronome) {
    this.element = document.querySelector(BPM_SELECTOR);
    this.bpmMinusOne = this.element.querySelector(BPM_MINUS_1_SELECTOR);
    this.bpmMinusFive = this.element.querySelector(BPM_MINUS_5_SELECTOR);
    this.bpmPlusOne = this.element.querySelector(BPM_PLUS_1_SELECTOR);
    this.bpmPlusFive = this.element.querySelector(BPM_PLUS_5_SELECTOR);
    this.bpmValue = this.element.querySelector(BPM_VALUE_SELECTOR);

    // Register events
    if (this.bpmMinusOne && this.bpmValue) {
      this.bpmMinusOne.addEventListener('click', () => {
        this.metronome.tempo -= 1;
        this.bpmValue.value = this.metronome.tempo.toString();
        this.bpmValue.setAttribute('value', this.metronome.tempo.toString());
        this.checkBpmLimits();
      });
    }

    if (this.bpmMinusFive && this.bpmValue) {
      this.bpmMinusFive.addEventListener('click', () => {
        this.metronome.tempo -= 5;
        this.bpmValue.value = this.metronome.tempo.toString();
        this.bpmValue.setAttribute('value', this.metronome.tempo.toString());
        this.checkBpmLimits();
      });
    }

    if (this.bpmPlusOne && this.bpmValue) {
      this.bpmPlusOne.addEventListener('click', () => {
        this.metronome.tempo += 1;
        this.bpmValue.value = this.metronome.tempo.toString();
        this.bpmValue.setAttribute('value', this.metronome.tempo.toString());
        this.checkBpmLimits();
      });
    }

    if (this.bpmPlusFive && this.bpmValue) {
      this.bpmPlusFive.addEventListener('click', () => {
        this.metronome.tempo += 5;
        this.bpmValue.value = this.metronome.tempo.toString();
        this.bpmValue.setAttribute('value', this.metronome.tempo.toString());
        this.checkBpmLimits();
      });
    }

    this.bpmValue.addEventListener('change', (event) => {
      let eventTarget = event.target as HTMLInputElement;
      this.metronome.tempo = Number(eventTarget.value);
      this.bpmValue.setAttribute('value', eventTarget.value);
      this.checkBpmLimits();
    });
  }

  /**
   * @name checkBpmLimits
   * @description
   * Check the BPMs' limits. If the number is too big or too low, resets to minimum and maximum.
   *
   */
  private checkBpmLimits(): void {
    if (this.metronome.tempo > BPM_MAX) {
      this.metronome.tempo = BPM_MAX;
      this.bpmValue.value = BPM_MAX.toString();
      this.bpmValue.setAttribute('value', BPM_MAX.toString());
    }
    if (this.metronome.tempo <= BPM_MIN) {
      this.metronome.tempo = BPM_MIN;
      this.bpmValue.value = BPM_MIN.toString();
      this.bpmValue.setAttribute('value', BPM_MIN.toString());
    }
  }
}

export default BpmUi;
