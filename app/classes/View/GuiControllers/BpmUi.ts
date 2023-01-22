import Metronome from "../../Metronome";

// BPM Selector
const BPM_SELECTOR =
  ".gui-controllers__bpm";

// BPM Minus Selectors
const BPM_MINUS_1_SELECTOR =
  ".gui-controllers__bpm.gui-controllers__bpm-minus--1";
const BPM_MINUS_5_SELECTOR =
  ".gui-controllers__bpm.gui-controllers__bpm-minus--5";

// BPM Plus Selectors
const BPM_PLUS_1_SELECTOR =
  ".gui-controllers__bpm.gui-controllers__bpm-plus--1";
const BPM_PLUS_5_SELECTOR =
  ".gui-controllers__bpm.gui-controllers__bpm-plus--5";

// BPM Value Selectors
const BPM_VALUE_SELECTOR =
  ".gui-controllers__bpm.gui-controllers__bpm-value--number";

// Min and Max BPM's values
export const BPM_MIN = 30;
const BPM_MAX = 300;

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
      this.bpmMinusOne.addEventListener("click", () => {
        this.metronome.tempo -= 1;
        this.bpmValue.value = this.metronome.tempo.toString();
      });
    }
    this.bpmMinusFive.addEventListener("click", () => {
      this.metronome.tempo -= 5;
      this.bpmValue.valueAsNumber -= 5;
      this.checkBpmLimits();
    });
    this.bpmPlusOne.addEventListener("click", () => {
      this.metronome.tempo += 1;
      this.bpmValue.valueAsNumber += 1;
      this.checkBpmLimits();
    });
    this.bpmPlusFive.addEventListener("click", () => {
      this.metronome.tempo += 5;
      this.bpmValue.valueAsNumber += 5;
      this.checkBpmLimits();
    });
    this.bpmValue.addEventListener("change", (event) => {
      let eventTarget = event.target as HTMLInputElement;
      this.metronome.tempo = eventTarget.valueAsNumber;
      this.bpmValue.valueAsNumber = eventTarget.valueAsNumber;
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
      this.bpmValue.valueAsNumber = BPM_MAX;
    }
    if (this.metronome.tempo <= BPM_MIN) {
      this.metronome.tempo = BPM_MIN;
      this.bpmValue.valueAsNumber = BPM_MIN;
    }
  }
}

export default BpmUi;
