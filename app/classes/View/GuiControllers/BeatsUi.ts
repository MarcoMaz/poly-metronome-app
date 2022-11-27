import Metronome from "../../Metronome";
import WarningUi from "./WarningUi";

const AGAINST_BEAT_PLUS =
  ".gui-controllers__against-beat.gui-controllers__beat-plus";
const AGAINST_BEAT_VALUE =
  ".gui-controllers__against-beat.gui-controllers__beat-value";
const AGAINST_BEAT_MINUS =
  ".gui-controllers__against-beat.gui-controllers__beat-minus";

const BASE_BEAT_PLUS = ".gui-controllers__base-beat.gui-controllers__beat-plus";
const BASE_BEAT_VALUE = ".gui-controllers__base-beat.gui-controllers__beat-value";
const BASE_BEAT_MINUS = ".gui-controllers__base-beat.gui-controllers__beat-minus";

const TOGGLE_BEATS = ".toggle-beats";

const BEAT_MIN = 2;
const BEAT_MAX = 9;

class BeatsUi {
  private againstBeatPlus: HTMLButtonElement;
  private againstBeatValue: HTMLInputElement;
  private againstBeatMinus: HTMLButtonElement;

  private baseBeatPlus: HTMLButtonElement;
  private baseBeatValue: HTMLInputElement;
  private baseBeatMinus: HTMLButtonElement;

  private toggleBeats: HTMLButtonElement;

  constructor(public warning: WarningUi, public metronome: Metronome) {
    this.againstBeatPlus = document.querySelector(AGAINST_BEAT_PLUS);
    this.againstBeatValue = document.querySelector(AGAINST_BEAT_VALUE);
    this.againstBeatMinus = document.querySelector(AGAINST_BEAT_MINUS);

    this.baseBeatPlus = document.querySelector(BASE_BEAT_PLUS);
    this.baseBeatValue = document.querySelector(BASE_BEAT_VALUE);
    this.baseBeatMinus = document.querySelector(BASE_BEAT_MINUS);

    this.toggleBeats = document.querySelector(TOGGLE_BEATS);

    this.againstBeatPlus.addEventListener("click", () => {
      this.metronome.againstBeat += 1;
      this.againstBeatValue.valueAsNumber += 1;

      this.warning.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkLimits(this.metronome.againstBeat, "against");
    });

    this.againstBeatMinus.addEventListener("click", () => {
      this.metronome.againstBeat -= 1;
      this.againstBeatValue.valueAsNumber -= 1;

      this.warning.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkLimits(this.metronome.againstBeat, "against");
    });

    this.againstBeatValue.addEventListener("change", (event) => {
      let eventTarget = event.target as HTMLInputElement;
      this.metronome.againstBeat = eventTarget.valueAsNumber;
      this.againstBeatValue.valueAsNumber = eventTarget.valueAsNumber;

      this.warning.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkLimits(eventTarget.valueAsNumber, "against");
    });

    this.baseBeatPlus.addEventListener("click", () => {
      this.metronome.baseBeat += 1;
      this.baseBeatValue.valueAsNumber += 1;

      this.warning.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkLimits(this.metronome.baseBeat, "base");
    });

    this.baseBeatMinus.addEventListener("click", () => {
      this.metronome.baseBeat -= 1;
      this.baseBeatValue.valueAsNumber -= 1;

      this.warning.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkLimits(this.metronome.baseBeat, "base");
    });

    this.baseBeatValue.addEventListener("change", (event) => {
      let eventTarget = event.target as HTMLInputElement;
      this.metronome.baseBeat = eventTarget.valueAsNumber;
      this.baseBeatValue.valueAsNumber = eventTarget.valueAsNumber;

      this.warning.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkLimits(eventTarget.valueAsNumber, "base");
    });

    this.toggleBeats.addEventListener("click", () => {
      [this.metronome.againstBeat, this.metronome.baseBeat] = [
        this.metronome.baseBeat,
        this.metronome.againstBeat,
      ];
      [this.againstBeatValue.valueAsNumber, this.baseBeatValue.valueAsNumber] =
        [this.baseBeatValue.valueAsNumber, this.againstBeatValue.valueAsNumber];
    });
  }

  private checkLimits(element: number, type: "against" | "base"): void {
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
