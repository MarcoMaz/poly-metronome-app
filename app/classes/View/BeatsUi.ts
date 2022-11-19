import Metronome from "../Metronome";
import WarningUi from "./WarningUi";

const AGAINST_BEAT_INPUT_NUMBER = ".against-beat__inputNumber";
const AGAINST_BEAT_LABEL = ".against-beat__label";
const AGAINST_BEAT_SLIDER = ".against-beat__slider";
const BASE_BEAT_INPUT_NUMBER = ".base-beat__inputNumber";
const BASE_BEAT_LABEL = ".base-beat__label";
const BASE_BEAT_SLIDER = ".base-beat__slider";
const TOGGLE_BEATS = ".toggle-beats";
const BEAT_MIN = 2;
const BEAT_MAX = 9;

class BeatsUi {
  private againstBeatInputNumber: HTMLInputElement;

  private againstBeatLabel: HTMLElement;

  private againstBeatSlider: HTMLInputElement;

  private baseBeatInputNumber: HTMLInputElement;

  private baseBeatLabel: HTMLElement;

  private baseBeatSlider: HTMLInputElement;

  private toggleBeats: HTMLButtonElement;

  constructor(public warning: WarningUi, public metronome: Metronome) {
    this.againstBeatInputNumber = document.querySelector(
      AGAINST_BEAT_INPUT_NUMBER
    );

    this.againstBeatLabel = document.querySelector(AGAINST_BEAT_LABEL);

    this.againstBeatSlider = document.querySelector(AGAINST_BEAT_SLIDER);

    this.baseBeatInputNumber = document.querySelector(BASE_BEAT_INPUT_NUMBER);

    this.baseBeatLabel = document.querySelector(BASE_BEAT_LABEL);

    this.baseBeatSlider = document.querySelector(BASE_BEAT_SLIDER);

    this.toggleBeats = document.querySelector(TOGGLE_BEATS);

    this.againstBeatInputNumber.addEventListener("change", (event) => {
      let eventTarget = event.target as HTMLInputElement;
      this.warning.isPoly(eventTarget.value, this.metronome.baseBeat);
      this.updateUi(eventTarget, "against");
    });

    this.baseBeatInputNumber.addEventListener("change", (event) => {
      let eventTarget = event.target as HTMLInputElement;
      this.warning.isPoly(eventTarget.value, this.metronome.againstBeat);
      this.updateUi(eventTarget, "base");
    });

    this.againstBeatSlider.addEventListener("input", (event) => {
      let eventTarget = event.target as HTMLInputElement;
      this.warning.isPoly(eventTarget.value, this.metronome.baseBeat);
      this.metronome.againstBeat = eventTarget.value as unknown as number;
      this.againstBeatLabel.innerText = `${this.metronome.againstBeat}`;
      this.againstBeatInputNumber.value = eventTarget.value;
    });

    this.baseBeatSlider.addEventListener("input", (event) => {
      let eventTarget = event.target as HTMLInputElement;
      this.warning.isPoly(eventTarget.value, this.metronome.againstBeat);
      this.metronome.baseBeat = eventTarget.value as unknown as number;
      this.baseBeatLabel.innerText = `${this.metronome.baseBeat}`;
      this.baseBeatInputNumber.value = eventTarget.value;
    });

    this.toggleBeats.addEventListener("click", () => {
      [this.metronome.againstBeat, this.metronome.baseBeat] = [
        this.metronome.baseBeat,
        this.metronome.againstBeat,
      ];
      [this.againstBeatInputNumber.value, this.baseBeatInputNumber.value] = [
        this.baseBeatInputNumber.value,
        this.againstBeatInputNumber.value,
      ];
      this.baseBeatLabel.innerText = `${this.metronome.baseBeat}`;
      this.againstBeatLabel.innerText = `${this.metronome.againstBeat}`;
    });
  }

  private updateUi(
    event: HTMLInputElement,
    type: "against" | "base"
  ): void {
    if (type === "base") {
      this.metronome.baseBeat = event.value as unknown as number;
      this.baseBeatLabel.innerText = `${this.metronome.baseBeat}`;
      this.baseBeatSlider.value = event.value;
    } else {
      this.metronome.againstBeat = event.value as unknown as number;
      this.againstBeatLabel.innerText = `${this.metronome.againstBeat}`;
      this.againstBeatSlider.value = event.value;
    }

    if ((event.value as unknown as number) <= BEAT_MIN - 1) {
      if (type === "base") {
        this.metronome.baseBeat = BEAT_MIN;
        this.baseBeatInputNumber.value = `${BEAT_MIN}`;
        this.baseBeatLabel.innerText = `${BEAT_MIN}`;
        this.baseBeatSlider.value = `${BEAT_MIN}`;
      } else {
        this.metronome.againstBeat = BEAT_MIN;
        this.againstBeatInputNumber.value = `${BEAT_MIN}`;
        this.againstBeatLabel.innerText = `${BEAT_MIN}`;
        this.againstBeatSlider.value = `${BEAT_MIN}`;
      }
    }

    if ((event.value as unknown as number) > BEAT_MAX) {
      if (type === "base") {
        this.metronome.baseBeat = BEAT_MAX;
        this.baseBeatInputNumber.value = `${BEAT_MAX}`;
        this.baseBeatLabel.innerText = `${BEAT_MAX}`;
        this.baseBeatSlider.value = `${BEAT_MAX}`;
      }
    } else {
      this.metronome.againstBeat = BEAT_MAX;
      this.againstBeatInputNumber.value = `${BEAT_MAX}`;
      this.againstBeatLabel.innerText = `${BEAT_MAX}`;
      this.againstBeatSlider.value = `${BEAT_MAX}`;
    }
  }
}

export default BeatsUi;
