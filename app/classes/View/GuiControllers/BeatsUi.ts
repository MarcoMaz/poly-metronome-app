import Metronome from "../../Metronome";
import Modal from "../../Modal";

import {
  BEATS_CONTAINER,
  AGAINST_BEAT_PLUS_SELECTOR,
  AGAINST_BEAT_VALUE_SELECTOR,
  AGAINST_BEAT_MINUS_SELECTOR,
  BASE_BEAT_PLUS_SELECTOR,
  BASE_BEAT_VALUE_SELECTOR,
  BASE_BEAT_MINUS_SELECTOR,
  SWITCH_BEATS_SELECTOR,
  BEAT_MIN,
  BEAT_MAX,
} from "../../base/constants";

/**
 * This class represents the UI controlling the beats.
 *
 * @name BeatsUi
 *
 * @param {HTMLDivElement} element              - The parent element container.
 * @param {HTMLButtonElement} againstBeatPlus   - The plus button controlling the against beat.
 * @param {HTMLInputElement} againstBeatValue   - The input value of the against beat.
 * @param {HTMLButtonElement} againstBeatMinus  - The minus button controlling the against beat.
 * @param {HTMLButtonElement} baseBeatPlus      - The plus button controlling the base beat.
 * @param {HTMLInputElement} baseBeatValue      - The input value of the base beat.
 * @param {HTMLButtonElement} baseBeatMinus     - The minus button controlling the base beat.
 * @param {HTMLButtonElement} switchBeats       - The button switching the beats.
 */

class BeatsUi {
  private element: HTMLDivElement;
  private againstBeatPlus: HTMLButtonElement;
  private againstBeatValue: HTMLInputElement;
  private againstBeatMinus: HTMLButtonElement;
  private baseBeatPlus: HTMLButtonElement;
  private baseBeatValue: HTMLInputElement;
  private baseBeatMinus: HTMLButtonElement;
  private switchBeats: HTMLButtonElement;

  /**
   * Define DOM Elements and Variables.
   */
  constructor(public modal: Modal, public metronome: Metronome) {
    this.element = document.querySelector(BEATS_CONTAINER);
    this.againstBeatPlus = this.element.querySelector(
      AGAINST_BEAT_PLUS_SELECTOR
    );
    this.againstBeatValue = this.element.querySelector(
      AGAINST_BEAT_VALUE_SELECTOR
    );
    this.againstBeatMinus = this.element.querySelector(
      AGAINST_BEAT_MINUS_SELECTOR
    );
    this.baseBeatPlus = this.element.querySelector(BASE_BEAT_PLUS_SELECTOR);
    this.baseBeatValue = this.element.querySelector(BASE_BEAT_VALUE_SELECTOR);
    this.baseBeatMinus = this.element.querySelector(BASE_BEAT_MINUS_SELECTOR);
    this.switchBeats = this.element.querySelector(SWITCH_BEATS_SELECTOR);

    // Register events
    this.againstBeatPlus.addEventListener("click", () => {
      this.metronome.againstBeat += 1;
      this.againstBeatValue.setAttribute(
        "value",
        this.metronome.againstBeat.toString()
      );
      this.modal.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkBeatsLimits(this.metronome.againstBeat, "against");
    });

    this.againstBeatMinus.addEventListener("click", () => {
      this.metronome.againstBeat -= 1;
      this.againstBeatValue.setAttribute(
        "value",
        this.metronome.againstBeat.toString()
      );
      this.modal.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkBeatsLimits(this.metronome.againstBeat, "against");
    });

    this.againstBeatValue.addEventListener("change", (event) => {
      let eventTarget = event.target as HTMLInputElement;
      this.metronome.againstBeat = eventTarget.valueAsNumber;
      this.againstBeatValue.setAttribute(
        "value",
        this.metronome.againstBeat.toString()
      );
      this.modal.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkBeatsLimits(eventTarget.valueAsNumber, "against");
    });

    this.baseBeatPlus.addEventListener("click", () => {
      this.metronome.baseBeat += 1;
      this.baseBeatValue.setAttribute(
        "value",
        this.metronome.baseBeat.toString()
      );
      this.modal.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkBeatsLimits(this.metronome.baseBeat, "base");
    });

    this.baseBeatMinus.addEventListener("click", () => {
      this.metronome.baseBeat -= 1;
      this.baseBeatValue.setAttribute(
        "value",
        this.metronome.baseBeat.toString()
      );
      this.modal.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkBeatsLimits(this.metronome.baseBeat, "base");
    });

    this.baseBeatValue.addEventListener("change", (event) => {
      let eventTarget = event.target as HTMLInputElement;
      this.metronome.baseBeat = eventTarget.valueAsNumber;
      this.baseBeatValue.setAttribute(
        "value",
        this.metronome.baseBeat.toString()
      );
      this.modal.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkBeatsLimits(eventTarget.valueAsNumber, "base");
    });

    this.switchBeats.addEventListener("click", () => {
      [this.metronome.againstBeat, this.metronome.baseBeat] = [
        this.metronome.baseBeat,
        this.metronome.againstBeat,
      ];
      [this.againstBeatValue.valueAsNumber, this.baseBeatValue.valueAsNumber] =
        [this.baseBeatValue.valueAsNumber, this.againstBeatValue.valueAsNumber];
    });
  }

  /**
   * @name checkBeatsLimits
   * @description
   * Check the beats' limits. If the number is too big or too low, resets to minimum and maximum.
   *
   */
  private checkBeatsLimits(element: number, type: "against" | "base"): void {
    if (element > BEAT_MAX) {
      if (type === "against") {
        this.metronome.againstBeat = BEAT_MAX;
        this.againstBeatValue.valueAsNumber = BEAT_MAX;
      } else {
        this.metronome.baseBeat = BEAT_MAX;
        this.baseBeatValue.valueAsNumber = BEAT_MAX;
      }
    }
    if (element <= BEAT_MIN - 1) {
      if (type === "against") {
        this.metronome.againstBeat = BEAT_MIN;
        this.againstBeatValue.valueAsNumber = BEAT_MIN;
      } else {
        this.metronome.baseBeat = BEAT_MIN;
        this.baseBeatValue.valueAsNumber = BEAT_MIN;
      }
    }
  }
}

export default BeatsUi;
