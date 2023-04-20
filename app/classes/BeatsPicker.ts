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
const BEATS_PICKER_CENTER_CLASS = "-center";

class BeatsPicker {
  public againstBeatPicker: HTMLElement;
  public againstBeatPickerBeats: HTMLElement;
  public baseBeatPicker: HTMLElement;
  public baseBeatPickerBeats: HTMLElement;

  constructor(public modal: Modal, public metronome: Metronome) {
    this.againstBeatPicker = document.querySelector(
      AGAINST_BEAT_PICKER_SELECTOR
    );
    this.againstBeatPickerBeats = document.querySelector(
      AGAINST_BEAT_PICKER_BEATS_SELECTOR
    );
    this.baseBeatPicker = document.querySelector(BASE_BEAT_PICKER_SELECTOR);
    this.baseBeatPickerBeats = document.querySelector(
      BASE_BEAT_PICKER_BEATS_SELECTOR
    );

    this.createElements(BEAT_MIN, BEAT_MAX, AGAINST_BEAT_PICKER_BEATS_SELECTOR);
    this.createElements(BEAT_MIN, BEAT_MAX, BASE_BEAT_PICKER_BEATS_SELECTOR);
    this.centerBeatOnLoad(
      this.metronome.againstBeat,
      this.againstBeatPickerBeats
    );
    this.centerBeatOnLoad(this.metronome.baseBeat, this.baseBeatPickerBeats);

    this.addContainerEventListeners(
      this.againstBeatPicker,
      this.againstBeatPickerBeats,
      this.baseBeatPickerBeats,
      BEATS_PICKER_OPEN_CLASS
    );
    this.addContainerEventListeners(
      this.baseBeatPicker,
      this.baseBeatPickerBeats,
      this.againstBeatPickerBeats,
      BEATS_PICKER_OPEN_CLASS
    );
  }

  private addContainerEventListeners(
    picker: HTMLElement,
    container: HTMLElement,
    otherContainer: HTMLElement,
    classToAdd: string
  ) {
    let timeoutId: NodeJS.Timeout;
    const DELAY_IN_MS = 200;

    function handleScroll() {
      clearTimeout(timeoutId);
      this.updateBeatBasedOnCenter(picker);
      swapClass();
      timeoutId = setTimeout(() => {
        this.modal.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      }, DELAY_IN_MS);
    }

    function swapClass() {
      container.classList.add(classToAdd);
      otherContainer.classList.remove(classToAdd);
    }

    container.addEventListener("scroll", handleScroll.bind(this));
    container.addEventListener("click", swapClass.bind(this));
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

    const spans = missingNumbers
      .map((beat) => `<span class="beatPicker__item">${beat}</span>`)
      .join("");

    const parentElement = document.querySelector(parentSelector);
    parentElement.innerHTML = spans;

    const beatPickerAimSpan = document.createElement("span");
    beatPickerAimSpan.classList.add(BEAT_PICKER_AIM_CLASS);
    parentElement.appendChild(beatPickerAimSpan);
  }

  public centerBeatOnLoad(
    num: number,
    pickerBeatsElement: HTMLElement
  ): number {
    const verticalCenterItem = pickerBeatsElement.querySelector(
      `${BEAT_PICKER_ITEM_SELECTOR}:nth-of-type(${num - 1})`
    ) as HTMLElement;

    if (!verticalCenterItem) return 0;

    const centerItemPositionY =
      verticalCenterItem.offsetTop -
      pickerBeatsElement.offsetHeight / 2 +
      verticalCenterItem.offsetHeight / 2;

    requestAnimationFrame(() => {
      pickerBeatsElement.scrollTop = centerItemPositionY;
      this.highlightCenterItem(pickerBeatsElement);
    });

    return centerItemPositionY;
  }

  public highlightCenterItem(element: HTMLElement): HTMLElement | null {
    const pickerBounds = element.getBoundingClientRect();
    const centerLineY =
      window.pageYOffset + pickerBounds.top + pickerBounds.height / 2;

    const centerItem = Array.from(
      element.querySelectorAll(BEAT_PICKER_ITEM_SELECTOR)
    ).find((item) => {
      const itemBounds = item.getBoundingClientRect();
      const itemTopY = window.pageYOffset + itemBounds.top;
      const itemBottomY = window.pageYOffset + itemBounds.bottom;
      return itemTopY <= centerLineY && itemBottomY >= centerLineY;
    }) as HTMLElement | undefined;

    element
      .querySelectorAll(BEAT_PICKER_ITEM_SELECTOR)
      .forEach((item) => item.classList.remove(BEATS_PICKER_CENTER_CLASS));

    if (centerItem) centerItem.classList.add(BEATS_PICKER_CENTER_CLASS);

    return centerItem || null;
  }

  private updateBeatBasedOnCenter(picker: HTMLElement): void {
    const centerItem = this.highlightCenterItem(picker);
    if (picker === this.againstBeatPicker) {
      this.metronome.againstBeat = Number(centerItem?.textContent) ?? 0;
    } else {
      this.metronome.baseBeat = Number(centerItem?.textContent) ?? 0;
    }
  }
}

export default BeatsPicker;
