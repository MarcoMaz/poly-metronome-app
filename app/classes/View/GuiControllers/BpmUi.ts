import Metronome from "../../Metronome";

const BPM_MINUS_1 = ".gui-controllers__bpm.gui-controllers__bpm-minus--1";
const BPM_MINUS_5 = ".gui-controllers__bpm.gui-controllers__bpm-minus--5";
const BPM_PLUS_1 = ".gui-controllers__bpm.gui-controllers__bpm-plus--1";
const BPM_PLUS_5 = ".gui-controllers__bpm.gui-controllers__bpm-plus--5";
const BPM_VALUE = ".gui-controllers__bpm.gui-controllers__bpm-value--number";

export const BPM_MIN = 30;
const BPM_MAX = 300;

class BpmUi {
  public bpmMinusOne: HTMLButtonElement;
  public bpmMinusFive: HTMLButtonElement;
  public bpmPlusOne: HTMLButtonElement;
  public bpmPlusFive: HTMLButtonElement;
  public bpmValue: HTMLInputElement;

  constructor(public metronome: Metronome) {
    this.bpmMinusOne = document.querySelector(BPM_MINUS_1);
    this.bpmMinusFive = document.querySelector(BPM_MINUS_5);
    this.bpmPlusOne = document.querySelector(BPM_PLUS_1);
    this.bpmPlusFive = document.querySelector(BPM_PLUS_5);
    this.bpmValue = document.querySelector(BPM_VALUE);

    this.bpmMinusOne.addEventListener("click", () => {
      this.metronome.tempo -= 1;
      this.bpmValue.valueAsNumber -= 1;
      this.checkLimits();
    });
    this.bpmMinusFive.addEventListener("click", () => {
      this.metronome.tempo -= 5;
      this.bpmValue.valueAsNumber -= 5;
      this.checkLimits();
    });
    this.bpmPlusOne.addEventListener("click", () => {
      this.metronome.tempo += 1;
      this.bpmValue.valueAsNumber += 1;
      this.checkLimits();
    });
    this.bpmPlusFive.addEventListener("click", () => {
      this.metronome.tempo += 5;
      this.bpmValue.valueAsNumber += 5;
      this.checkLimits();
    });
    this.bpmValue.addEventListener("change", (event) => {
      let eventTarget = event.target as HTMLInputElement;
      this.metronome.tempo = eventTarget.valueAsNumber;
      this.bpmValue.valueAsNumber = eventTarget.valueAsNumber;
      this.checkLimits();
    });
  }

  private checkLimits(): void {
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
