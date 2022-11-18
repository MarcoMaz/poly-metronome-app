import Metronome from "./Metronome";

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
const BPM_LABEL = ".bpm__label";
const BPM_SLIDER = ".bpm__slider";
const AGAINST_BEAT_LABEL = ".against-beat__label";
const AGAINST_BEAT_SLIDER = ".against-beat__slider";
const BASE_BEAT_LABEL = ".base-beat__label";
const BASE_BEAT_SLIDER = ".base-beat__slider";
const TOGGLE_BEATS = ".toggle-beats";
const GUI_SELECTION_OPTIONS = 'input[name="view-radio-btn"]';
const WARNING = ".-warning";
const SHOW = "-show";

class View {
  private appToggle: HTMLButtonElement;

  private BPMlabel: HTMLElement;

  private BPMslider: HTMLElement;

  private baseBeatLabel: HTMLElement;

  private baseBeatSlider: HTMLElement;

  private againstBeatLabel: HTMLElement;

  private againstBeatSlider: HTMLElement;

  private toggleBeats: HTMLElement;

  private GUIselectionOptions: NodeListOf<HTMLInputElement>;

  public GUIselected: string;

  public warning: HTMLElement;

  private onPlay?: () => void;

  private onPause?: () => void;

  constructor(public metronome: Metronome) {
    this.appToggle = document.querySelector(APP_TOGGLE);

    this.BPMlabel = document.querySelector(BPM_LABEL);

    this.BPMslider = document.querySelector(BPM_SLIDER);

    this.againstBeatLabel = document.querySelector(AGAINST_BEAT_LABEL);

    this.againstBeatSlider = document.querySelector(AGAINST_BEAT_SLIDER);

    this.baseBeatLabel = document.querySelector(BASE_BEAT_LABEL);

    this.baseBeatSlider = document.querySelector(BASE_BEAT_SLIDER);

    this.toggleBeats = document.querySelector(TOGGLE_BEATS);

    this.GUIselectionOptions = document.querySelectorAll(GUI_SELECTION_OPTIONS);

    this.warning = document.querySelector(WARNING);

    this.GUIselected = "view-square";

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
      this.metronome.tempo = (event.target as HTMLInputElement)
        .value as unknown as number;
      this.BPMlabel.innerText = `${this.metronome.tempo}`;
    });

    this.againstBeatSlider.addEventListener("input", (event) => {
      let input = event.target as HTMLInputElement;

      this.isPoly(input.value, this.metronome.baseBeat);

      this.metronome.againstBeat = (event.target as HTMLInputElement)
        .value as unknown as number;

      this.againstBeatLabel.innerText = `${this.metronome.againstBeat}`;
    });

    this.baseBeatSlider.addEventListener("input", (event) => {
      let input = event.target as HTMLInputElement;

      this.isPoly(input.value, this.metronome.againstBeat);

      this.metronome.baseBeat = (event.target as HTMLInputElement)
        .value as unknown as number;
      this.baseBeatLabel.innerText = `${this.metronome.baseBeat}`;
    });

    this.toggleBeats.addEventListener("click", () => {
      [this.metronome.againstBeat, this.metronome.baseBeat] = [
        this.metronome.baseBeat,
        this.metronome.againstBeat,
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
}

export default View;
