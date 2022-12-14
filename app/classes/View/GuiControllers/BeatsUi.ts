import Metronome from "../../Metronome";
import WarningUi from "./WarningUi";

// Against Beat Selectors
const AGAINST_BEAT_PLUS_SELECTOR =
  ".gui-controllers__against-beat.gui-controllers__beat-plus";
const AGAINST_BEAT_VALUE_SELECTOR =
  ".gui-controllers__against-beat.gui-controllers__beat-value";
const AGAINST_BEAT_MINUS_SELECTOR =
  ".gui-controllers__against-beat.gui-controllers__beat-minus";

// Base Beat Selectors
const BASE_BEAT_PLUS_SELECTOR = ".gui-controllers__base-beat.gui-controllers__beat-plus";
const BASE_BEAT_VALUE_SELECTOR = ".gui-controllers__base-beat.gui-controllers__beat-value";
const BASE_BEAT_MINUS_SELECTOR = ".gui-controllers__base-beat.gui-controllers__beat-minus";

// Switch Beat Selector
const SWITCH_BEATS_SELECTOR = ".gui-controllers__switch-beats";

// Min and Max Beats' values
const BEAT_MIN = 2;
const BEAT_MAX = 9;

/**
 * This class represents the UI controlling the beats.
 * 
 * @name BeatsUi
 * 
 * @param {HTMLButtonElement} againstBeatPlus   - The plus button controlling the against beat.
 * @param {HTMLInputElement} againstBeatValue   - The input value of the against beat.
 * @param {HTMLButtonElement} againstBeatMinus  - The minus button controlling the against beat.
 * @param {HTMLButtonElement} baseBeatPlus      - The plus button controlling the base beat.
 * @param {HTMLInputElement} baseBeatValue      - The input value of the base beat.
 * @param {HTMLButtonElement} baseBeatMinus     - The minus button controlling the base beat.
 * @param {HTMLButtonElement} switchBeats       - The button switching the beats. 
 */

class BeatsUi {
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
  constructor(public warning: WarningUi, public metronome: Metronome) {
    this.againstBeatPlus = document.querySelector(AGAINST_BEAT_PLUS_SELECTOR);
    this.againstBeatValue = document.querySelector(AGAINST_BEAT_VALUE_SELECTOR);
    this.againstBeatMinus = document.querySelector(AGAINST_BEAT_MINUS_SELECTOR);

    this.baseBeatPlus = document.querySelector(BASE_BEAT_PLUS_SELECTOR);
    this.baseBeatValue = document.querySelector(BASE_BEAT_VALUE_SELECTOR);
    this.baseBeatMinus = document.querySelector(BASE_BEAT_MINUS_SELECTOR);

    this.switchBeats = document.querySelector(SWITCH_BEATS_SELECTOR);

    // Register events
    this.againstBeatPlus.addEventListener("click", () => {
      this.metronome.againstBeat += 1;
      this.againstBeatValue.valueAsNumber += 1;

      this.warning.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkBeatsLimits(this.metronome.againstBeat, "against");
    });

    this.againstBeatMinus.addEventListener("click", () => {
      this.metronome.againstBeat -= 1;
      this.againstBeatValue.valueAsNumber -= 1;

      this.warning.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkBeatsLimits(this.metronome.againstBeat, "against");
    });

    this.againstBeatValue.addEventListener("change", (event) => {
      let eventTarget = event.target as HTMLInputElement;
      this.metronome.againstBeat = eventTarget.valueAsNumber;
      this.againstBeatValue.valueAsNumber = eventTarget.valueAsNumber;

      this.warning.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkBeatsLimits(eventTarget.valueAsNumber, "against");
    });

    this.baseBeatPlus.addEventListener("click", () => {
      this.metronome.baseBeat += 1;
      this.baseBeatValue.valueAsNumber += 1;

      this.warning.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkBeatsLimits(this.metronome.baseBeat, "base");
    });

    this.baseBeatMinus.addEventListener("click", () => {
      this.metronome.baseBeat -= 1;
      this.baseBeatValue.valueAsNumber -= 1;

      this.warning.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkBeatsLimits(this.metronome.baseBeat, "base");
    });

    this.baseBeatValue.addEventListener("change", (event) => {
      let eventTarget = event.target as HTMLInputElement;
      this.metronome.baseBeat = eventTarget.valueAsNumber;
      this.baseBeatValue.valueAsNumber = eventTarget.valueAsNumber;

      this.warning.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
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
