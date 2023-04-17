import { BEAT_MIN, BEAT_MAX } from "../classes/base/constants";

import Metronome from "./Metronome";
import Modal from "./Modal";

const AGAINST_BEAT_PICKER_SELECTOR = ".beatPicker.beatPicker--againstBeat";
const AGAINST_BEAT_PICKER_BEATS_SELECTOR = `${AGAINST_BEAT_PICKER_SELECTOR} > .beatPicker__beats`;
const BASE_BEAT_PICKER_SELECTOR = ".beatPicker.beatPicker--baseBeat";
const BASE_BEAT_PICKER_BEATS_SELECTOR = `${BASE_BEAT_PICKER_SELECTOR} > .beatPicker__beats`;

const BEAT_PICKER_ITEM_SELECTOR = ".beatPicker__item";
const BEAT_PICKER_AIM_CLASS = "beatPicker__aim";

const BEATS_PICKER_OPEN_CLASS = "-open";

class BeatsPicker {
  public againstBeatPicker: HTMLElement;
  public againstBeatPickerContainer: HTMLElement;
  public baseBeatPicker: HTMLElement;
  public baseBeatPickerContainer: HTMLElement;

  constructor(public modal: Modal, public metronome: Metronome) {
    this.againstBeatPicker = document.querySelector(
      AGAINST_BEAT_PICKER_SELECTOR
    );
    this.againstBeatPickerContainer = document.querySelector(
      AGAINST_BEAT_PICKER_BEATS_SELECTOR
    );
    this.baseBeatPicker = document.querySelector(BASE_BEAT_PICKER_SELECTOR);
    this.baseBeatPickerContainer = document.querySelector(
      BASE_BEAT_PICKER_BEATS_SELECTOR
    );

    this.createElements(BEAT_MIN, BEAT_MAX, AGAINST_BEAT_PICKER_BEATS_SELECTOR);
    this.createElements(BEAT_MIN, BEAT_MAX, BASE_BEAT_PICKER_BEATS_SELECTOR);
    this.centerBeatOnLoad(
      this.metronome.againstBeat,
      this.againstBeatPickerContainer
    );
    this.centerBeatOnLoad(
      this.metronome.baseBeat,
      this.baseBeatPickerContainer
    );

    this.addContainerEventListeners(
      this.againstBeatPickerContainer,
      this.againstBeatPicker,
      this.baseBeatPickerContainer,
      BEATS_PICKER_OPEN_CLASS
    );
    this.addContainerEventListeners(
      this.baseBeatPickerContainer,
      this.baseBeatPicker,
      this.againstBeatPickerContainer,
      BEATS_PICKER_OPEN_CLASS
    );
  }

  private addContainerEventListeners(
    container: HTMLElement,
    picker: HTMLElement,
    otherContainer: HTMLElement,
    classToAdd: string
  ) {
    container.addEventListener("scroll", () => {
      this.getCenterBeat(picker);
      container.classList.add(classToAdd);
      otherContainer.classList.remove(classToAdd);
      this.modal.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
    });

    container.addEventListener("click", () => {
      container.classList.add(classToAdd);
      otherContainer.classList.remove(classToAdd);
    });
  }

  private createBeatPickerItemSpan(beat: number): string {
    return `<span class="beatPicker__item">${beat}</span>`;
  }

  private createElements(
    firstNumber: number,
    secondNumber: number,
    parentSelector: string
  ): void {
    const missingNumbers: Array<number | null> = [
      ...Array.from(
        { length: secondNumber - firstNumber + 1 },
        (_, i) => i + firstNumber
      ),
    ];

    const spans = missingNumbers.map(this.createBeatPickerItemSpan).join("");

    const parentElement = document.querySelector(parentSelector);
    parentElement.innerHTML = spans;

    const beatPickerAimSpan = document.createElement("span");
    beatPickerAimSpan.classList.add(BEAT_PICKER_AIM_CLASS);
    parentElement.appendChild(beatPickerAimSpan);
  }

  public centerBeatOnLoad(num: number, pickerElement: HTMLElement): number {
    const centerItemSelector = `${BEAT_PICKER_ITEM_SELECTOR}:nth-of-type(${
      num - 1
    })`;
    const centerItem = pickerElement.querySelector(
      centerItemSelector
    ) as HTMLElement;

    if (!centerItem) {
      return 0;
    }

    const centerItemPositionY =
      centerItem.offsetTop -
      pickerElement.offsetHeight / 2 +
      centerItem.offsetHeight / 2;

    requestAnimationFrame(() => {
      pickerElement.scrollTop = centerItemPositionY;
    });

    return centerItemPositionY;
  }

  public getCenterItem(element: HTMLElement): Element | null {
    const pickerBounds = element.getBoundingClientRect();
    const centerLineY =
      window.pageYOffset + pickerBounds.top + pickerBounds.height / 2;

    return Array.from(element.querySelectorAll(BEAT_PICKER_ITEM_SELECTOR)).find(
      (item) => {
        const itemBounds = item.getBoundingClientRect();
        const itemTopY = window.pageYOffset + itemBounds.top;
        const itemBottomY = window.pageYOffset + itemBounds.bottom;
        return itemTopY <= centerLineY && itemBottomY >= centerLineY;
      }
    );
  }

  private getCenterBeat(picker: HTMLElement): void {
    const centerItem = this.getCenterItem(picker);
    if (picker === this.againstBeatPicker) {
      this.metronome.againstBeat = Number(centerItem?.textContent) ?? 0;
    } else if (picker === this.baseBeatPicker) {
      this.metronome.baseBeat = Number(centerItem?.textContent) ?? 0;
    }
  }
}

export default BeatsPicker;

// 4. Fix E2E Tests (write new tests?)

// Clean up (color, docs, SwitchBeatsChip, ect.)
