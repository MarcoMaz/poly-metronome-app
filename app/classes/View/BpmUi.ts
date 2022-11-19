import Metronome from "../Metronome";

const BPM_LABEL = ".bpm__label";
const BPM_SLIDER = ".bpm__slider";
const BPM_INPUT_NUMBER = ".bpm__inputNumber";
const BPM_INPUT_NUMBER_STEP_FIVE = ".bpm__inputNumber--step-five";
export const BPM_MIN = 30;
const BPM_MAX = 300;

class BpmUi {
  public label: HTMLElement;

  public slider: HTMLInputElement;

  public inputNumber: HTMLInputElement;

  public inputNumberStepFive: HTMLInputElement;

  constructor(public metronome: Metronome) {
    this.label = document.querySelector(BPM_LABEL);

    this.slider = document.querySelector(BPM_SLIDER);

    this.inputNumber = document.querySelector(BPM_INPUT_NUMBER);

    this.inputNumberStepFive = document.querySelector(
      BPM_INPUT_NUMBER_STEP_FIVE
    );

    this.slider.addEventListener("input", (event) => {
      let eventTarget = event.target as HTMLInputElement;
      this.updateLabel(eventTarget);
      this.inputNumber.value = eventTarget.value;
      this.inputNumberStepFive.value = eventTarget.value;
    });

    this.inputNumber.addEventListener("change", (event) => {
      let eventTarget = event.target as HTMLInputElement;
      this.updateUi(eventTarget);
      this.inputNumberStepFive.value = eventTarget.value;
    });

    this.inputNumberStepFive.addEventListener("change", (event) => {
      let eventTarget = event.target as HTMLInputElement;
      this.updateUi(eventTarget);
      this.inputNumber.value = eventTarget.value;
    });
  }

  private updateLabel(element: HTMLInputElement): void {
    this.metronome.tempo = element.value as unknown as number;
    this.label.innerText = `${this.metronome.tempo}`;
  }

  private updateUi(element: HTMLInputElement): void {
    this.updateLabel(element);
    this.slider.value = element.value;

    if ((element.value as unknown as number) <= BPM_MIN) {
      this.metronome.tempo = BPM_MIN;
      this.inputNumber.value = `${BPM_MIN}`;
      this.inputNumberStepFive.value = `${BPM_MIN}`;
      this.label.innerText = `${BPM_MIN}`;
      this.slider.value = `${BPM_MIN}`;
    }

    if ((element.value as unknown as number) > BPM_MAX) {
      this.metronome.tempo = BPM_MAX;
      this.inputNumber.value = `${BPM_MAX}`;
      this.inputNumberStepFive.value = `${BPM_MAX}`;
      this.label.innerText = `${BPM_MAX}`;
      this.slider.value = `${BPM_MAX}`;
    }
  }
}

export default BpmUi;
