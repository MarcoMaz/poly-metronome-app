import Engine from "./Engine";
import Metronome from "./Metronome";
import Observable from "./Observable";

/**
 * This class represents the UI of the metronome.
 *
 * @constructor
 * @param {HTMLButtonElement} appToggle                        - The button toggling the App.
 * @param {HTMLElement} BPMlabel                               - The input label of the BPM.
 * @param {HTMLElement} BPMslider                              - The input slider of the BPM.
 * @param {HTMLElement} baseBeatLabel                          - The input label of the baseBeat.
 * @param {HTMLElement} baseBeatSlider                         - The input slider of the baseBeat.
 * @param {HTMLElement} againstBeatLabel                       - The input label of the againstBeat.
 * @param {HTMLElement} againstBeatSlider                      - The input slider of the againstBeat.
 * @param {HTMLElement} toggleBeats                            - The button toggling baseBeat and againstBeat.
 * @param {NodeListOf<HTMLInputElement>} GUIselectionOptions   - The collections of radio buttons handling the GUI.
 * @param {string} GUIselected                                 - The selected GUI.
 */

const APP_TOGGLE = ".app__toggle";
const BUTTON_TAP = ".tap";
const VOLUME_SLIDER = ".volume";
const BPM_LABEL = ".bpm__label";
const BPM_SLIDER = ".bpm__slider";
const BPM_INPUT_NUMBER = ".bpm__inputNumber";
const BPM_INPUT_NUMBER_STEP_FIVE = ".bpm__inputNumber--step-five";
const AGAINST_BEAT_INPUT_NUMBER = ".against-beat__inputNumber";
const AGAINST_BEAT_LABEL = ".against-beat__label";
const AGAINST_BEAT_SLIDER = ".against-beat__slider";
const BASE_BEAT_INPUT_NUMBER = ".base-beat__inputNumber";
const BASE_BEAT_LABEL = ".base-beat__label";
const BASE_BEAT_SLIDER = ".base-beat__slider";
const TOGGLE_BEATS = ".toggle-beats";
const GUI_SELECTION_OPTIONS = 'input[name="view-radio-btn"]';
const WARNING = ".-warning";
const SHOW = "-show";

class View {
  private appToggle: HTMLButtonElement;

  private tap: HTMLElement;

  private volumeSlider: HTMLInputElement;

  private newTap: number;

  private lastTap: number;

  private counterTap: number;

  private differenceBetweenTaps: number;

  private avgbpm: number;

  private previousTap: number;

  private elapsedTime: number;

  private BPMlabel: HTMLElement;

  private BPMslider: HTMLInputElement;

  private BPMinputNumber: HTMLInputElement;

  private BPMinputNumberStepFive: HTMLInputElement;

  private againstBeatInputNumber: HTMLInputElement;

  private againstBeatLabel: HTMLElement;

  private againstBeatSlider: HTMLInputElement;

  private baseBeatInputNumber: HTMLInputElement;

  private baseBeatLabel: HTMLElement;

  private baseBeatSlider: HTMLInputElement;

  private toggleBeats: HTMLElement;

  private GUIselectionOptions: NodeListOf<HTMLInputElement>;

  public GUIselected: string;

  public warning: HTMLElement;

  private onPlay?: () => void;

  private onPause?: () => void;

  constructor(public metronome: Metronome, public engine: Engine, public observable: Observable) {
    this.appToggle = document.querySelector(APP_TOGGLE);

    this.tap = document.querySelector(BUTTON_TAP);

    this.volumeSlider = document.querySelector(VOLUME_SLIDER);    

    this.newTap = 0;

    this.lastTap = 0;
    
    this.counterTap = 0;
    
    this.differenceBetweenTaps = 0;
    
    this.avgbpm = 0;
    
    this.previousTap = 0;
    
    this.elapsedTime = 0;

    this.BPMlabel = document.querySelector(BPM_LABEL);

    this.BPMslider = document.querySelector(BPM_SLIDER);

    this.BPMinputNumber = document.querySelector(BPM_INPUT_NUMBER);

    this.BPMinputNumberStepFive = document.querySelector(
      BPM_INPUT_NUMBER_STEP_FIVE
    );

    this.againstBeatInputNumber = document.querySelector(
      AGAINST_BEAT_INPUT_NUMBER
    );

    this.againstBeatLabel = document.querySelector(AGAINST_BEAT_LABEL);

    this.againstBeatSlider = document.querySelector(AGAINST_BEAT_SLIDER);

    this.baseBeatInputNumber = document.querySelector(BASE_BEAT_INPUT_NUMBER);

    this.baseBeatLabel = document.querySelector(BASE_BEAT_LABEL);

    this.baseBeatSlider = document.querySelector(BASE_BEAT_SLIDER);

    this.toggleBeats = document.querySelector(TOGGLE_BEATS);

    this.GUIselectionOptions = document.querySelectorAll(GUI_SELECTION_OPTIONS);

    this.warning = document.querySelector(WARNING);

    this.GUIselected = "view-square";

    this.tap.addEventListener("click", () => this.tapTempo());

    this.volumeSlider.addEventListener('input', (event) => {
      let eventTarget = event.target as HTMLInputElement;      

      this.engine.gainNode.gain.value = eventTarget.value as unknown as number;
    });

    this.appToggle.addEventListener("click", () => {
      if (this.appToggle.innerHTML === "play") {
        this.appToggle.innerHTML = "stop!";
        if (this.onPlay) {
          this.onPlay();
        }
      } else {
        this.appToggle.innerHTML = "play";
        if (this.onPause) {
          this.onPause();
        }
      }
    });

    this.BPMslider.addEventListener("input", (event) => {
      let eventTarget = event.target as HTMLInputElement;

      this.metronome.tempo = eventTarget.value as unknown as number;
      this.BPMlabel.innerText = `${this.metronome.tempo}`;

      this.BPMinputNumber.value = eventTarget.value;
      this.BPMinputNumberStepFive.value = eventTarget.value;
    });

    this.BPMinputNumber.addEventListener("change", (event) => {
      let eventTarget = event.target as HTMLInputElement;
      this.updateBpmUi(eventTarget);
      this.BPMinputNumberStepFive.value = eventTarget.value;
    });

    this.BPMinputNumberStepFive.addEventListener("change", (event) => {
      let eventTarget = event.target as HTMLInputElement;
      this.updateBpmUi(eventTarget);
      this.BPMinputNumber.value = eventTarget.value;
    });

    this.againstBeatInputNumber.addEventListener("change", (event) => {
      let eventTarget = event.target as HTMLInputElement;

      this.isPoly(eventTarget.value, this.metronome.baseBeat);
      this.updateBeatUi(eventTarget, "against");
    });

    this.againstBeatSlider.addEventListener("input", (event) => {
      let eventTarget = event.target as HTMLInputElement;

      this.isPoly(eventTarget.value, this.metronome.baseBeat);

      this.metronome.againstBeat = eventTarget.value as unknown as number;
      this.againstBeatLabel.innerText = `${this.metronome.againstBeat}`;
      this.againstBeatInputNumber.value = eventTarget.value;
    });

    this.baseBeatInputNumber.addEventListener("change", (event) => {
      let eventTarget = event.target as HTMLInputElement;

      this.isPoly(eventTarget.value, this.metronome.againstBeat);
      this.updateBeatUi(eventTarget, "base");
    });

    this.baseBeatSlider.addEventListener("input", (event) => {
      let eventTarget = event.target as HTMLInputElement;

      this.isPoly(eventTarget.value, this.metronome.againstBeat);

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

    this.GUIselectionOptions.forEach((GUIOption: HTMLInputElement) => {
      GUIOption.addEventListener("change", () => {
        if (GUIOption.checked) this.GUIselected = GUIOption.value;
      });
    });
  }

  public setOnPlay(callback: () => void) {
    this.onPlay = callback;
  }

  public setOnPause(callback: () => void) {
    this.onPause = callback;
  }

  private isPoly(x: unknown, y: unknown): void {
    let xNum: number = Number(x);
    let yNum: number = Number(y);

    const maxNumber: number = Math.max(xNum, yNum);
    const minNumber: number = Math.min(xNum, yNum);

    maxNumber % minNumber === 0 ? this.showWarning() : this.hideWarning();
  }

  private showWarning(): void {
    this.warning.classList.add(SHOW);
  }

  private hideWarning(): void {
    this.warning.classList.remove(SHOW);
  }

  private updateBpmUi(event: HTMLInputElement): void {
    this.metronome.tempo = event.value as unknown as number;
    this.BPMlabel.innerText = `${this.metronome.tempo}`;
    this.BPMslider.value = event.value;

    if ((event.value as unknown as number) <= 30) {
      this.metronome.tempo = 30;
      this.BPMinputNumber.value = "30";
      this.BPMinputNumberStepFive.value = "30";
      this.BPMlabel.innerText = "30";
      this.BPMslider.value = "30";
    }

    if ((event.value as unknown as number) > 300) {
      this.metronome.tempo = 300;
      this.BPMinputNumber.value = "300";
      this.BPMinputNumberStepFive.value = "300";
      this.BPMlabel.innerText = "300";
      this.BPMslider.value = "300";
    }
  }

  private updateBeatUi(
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

    if ((event.value as unknown as number) <= 1) {
      if (type === "base") {
        this.metronome.baseBeat = 2;
        this.baseBeatInputNumber.value = "2";
        this.baseBeatLabel.innerText = "2";
        this.baseBeatSlider.value = "2";
      } else {
        this.metronome.againstBeat = 2;
        this.againstBeatInputNumber.value = "2";
        this.againstBeatLabel.innerText = "2";
        this.againstBeatSlider.value = "2";
      }
    }

    if ((event.value as unknown as number) > 9) {
      if (type === "base") {
        this.metronome.baseBeat = 9;
        this.baseBeatInputNumber.value = "9";
        this.baseBeatLabel.innerText = "9";
        this.baseBeatSlider.value = "9";
      }
    } else {
      this.metronome.againstBeat = 9;
      this.againstBeatInputNumber.value = "9";
      this.againstBeatLabel.innerText = "9";
      this.againstBeatSlider.value = "9";
    }
  }

  private tapTempo(): void {
    if (this.lastTap === 0) {
      this.newTap = new Date().getTime();
      this.counterTap = 0;
    }

    this.lastTap = new Date().getTime();
    this.elapsedTime = new Date().getTime() - this.previousTap;
    this.previousTap = this.lastTap;
    this.differenceBetweenTaps = this.lastTap - this.newTap;

    if (this.differenceBetweenTaps !== 0) {
      this.avgbpm = Math.round(
        (60000 * this.counterTap) / this.differenceBetweenTaps
      );
    } else {
      this.avgbpm = 30;
    }
    this.counterTap++;

    this.metronome.tempo = this.avgbpm;
    this.BPMlabel.innerText = `${this.metronome.tempo}`;
    this.BPMinputNumber.value = `${this.metronome.tempo}`;
    this.BPMinputNumberStepFive.value = `${this.metronome.tempo}`;
    this.BPMslider.value = `${this.metronome.tempo}`;

    if (this.elapsedTime > 3000) {
      this.lastTap = 0;
    }
  }
}

export default View;
