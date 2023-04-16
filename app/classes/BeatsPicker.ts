import { BEAT_MIN, BEAT_MAX } from "../classes/base/constants";

import Metronome from "./Metronome";

const BEAT_PICKER_SELECTOR = ".beatPicker";
const BEAT_PICKER_BEATS_SELECTOR = ".beatPicker__beats";
const BEAT_PICKER_ITEM = ".beatPicker__item";
const BEAT_PICKER_AIM_CLASS = "beatPicker__aim";

class BeatsPicker {
  private element: HTMLElement;
  private beatsContainer: HTMLElement;

  constructor(public metronome: Metronome) {
    this.element = document.querySelector(BEAT_PICKER_SELECTOR);
    this.beatsContainer = this.element.querySelector(
      BEAT_PICKER_BEATS_SELECTOR
    );

    this.createElements(BEAT_MIN, BEAT_MAX, BEAT_PICKER_BEATS_SELECTOR);
    this.centerBeatOnLoad(this.metronome.againstBeat);

    this.beatsContainer.addEventListener("scroll", () => {
      this.getCenterBeat();
    });
  }

  private createBeatPickerItemSpan(beat: number | null): string {
    const content = beat === null ? "" : beat;
    return `<span class="beatPicker__item">${content}</span>`;
  }

  private createElements(
    firstNumber: number,
    secondNumber: number,
    parentSelector: string
  ): void {
    const missingNumbers: Array<number | null> = [
      null,
      null,
      ...Array.from(
        { length: secondNumber - firstNumber + 1 },
        (_, i) => i + firstNumber
      ),
    ];
    missingNumbers.push(null, null);

    const spans = missingNumbers.map(this.createBeatPickerItemSpan).join("");

    const parentElement = document.querySelector(parentSelector);
    parentElement.innerHTML = spans;

    const beatPickerAimSpan = document.createElement("span");
    beatPickerAimSpan.classList.add(BEAT_PICKER_AIM_CLASS);
    parentElement.appendChild(beatPickerAimSpan);
  }

  private centerBeatOnLoad(num: number): number {
    const centeredBeatCorrectIndex = num + 1;
    const centerItemSelector = `${BEAT_PICKER_ITEM}:nth-of-type(${centeredBeatCorrectIndex})`;
    const centerItem = this.beatsContainer.querySelector(
      centerItemSelector
    ) as HTMLElement;

    if (!centerItem) {
      return 0;
    }

    const centerItemPositionY =
      centerItem.offsetTop -
      this.beatsContainer.offsetHeight / 2 +
      centerItem.offsetHeight / 2;

    requestAnimationFrame(() => {
      this.beatsContainer.scrollTop = centerItemPositionY;
    });

    return centerItemPositionY;
  }

  private getCenterItem(): Element | null {
    const pickerBounds = this.element.getBoundingClientRect();
    const centerLineY =
      window.pageYOffset + pickerBounds.top + pickerBounds.height / 2;
    return Array.from(this.element.querySelectorAll(BEAT_PICKER_ITEM)).find(
      (item) => {
        const itemBounds = item.getBoundingClientRect();
        const itemTopY = window.pageYOffset + itemBounds.top;
        const itemBottomY = window.pageYOffset + itemBounds.bottom;
        return itemTopY <= centerLineY && itemBottomY >= centerLineY;
      }
    );
  }

  private getCenterBeat(): void {
    const centerItem = this.getCenterItem();
    this.metronome.againstBeat = Number(centerItem?.textContent) ?? 0;
  }
}

export default BeatsPicker;

// ADESSO
// 5. Fix how the index is counted. We are starting at 2. --> centerBeatOnLoad ... trying maybe using padding and no extra spans?
// 6. Redundant code (Recurring positioning definitions // elements is redundant --> getCenterBeat)
// 7. Fix before and after
// 8. Make aim bigger??

// DOPO
//
// 1. Implement second picker
// 2. Implement modal
// 3. Switch beats is working
// 4. Fix Unit Tests (write new tests?)
// 5. Fix E2E Tests (write new tests?)
