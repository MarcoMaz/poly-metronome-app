import Metronome from "./Metronome";
import Modal from "./Modal";

import {
  AGAINST_BEAT_PICKER_SELECTOR,
  BASE_BEAT_PICKER_SELECTOR,
  AGAINST_BEAT_PICKER_BEATS_SELECTOR,
  BASE_BEAT_PICKER_BEATS_SELECTOR,
  BEAT_PICKER_ITEM_SELECTOR,
  BEATS_PICKER_CENTER_CLASS,
  BEAT_PICKER_AIM_CLASS,
  BEAT_PICKER_ITEM_CLASS
} from "./base/constants";

class BeatPickers {
  public picker: HTMLElement;
  public pickerBeats: HTMLElement;

  constructor(
    public el: string,
    public min: number,
    public max: number,
    public centerNumber: number,
    public metronome: Metronome,
    public modal: Modal
  ) {
    const PICKER_BEATS_SELECTOR =
      el === "against"
        ? AGAINST_BEAT_PICKER_BEATS_SELECTOR
        : BASE_BEAT_PICKER_BEATS_SELECTOR;

    if (el === "against") {
      this.picker = document.querySelector(AGAINST_BEAT_PICKER_SELECTOR);
      this.pickerBeats = document.querySelector(PICKER_BEATS_SELECTOR);
    } else {
      this.picker = document.querySelector(BASE_BEAT_PICKER_SELECTOR);
      this.pickerBeats = document.querySelector(PICKER_BEATS_SELECTOR);
    }

    this.createElements();
    this.centerBeatOnLoad();

    // SCROLL
    this.pickerBeats.addEventListener("scroll", this.handleScroll.bind(this));
  }

  private createElements(): void {
    const missingNumbers: Array<number | null> = [
      ...Array.from(
        { length: this.max - this.min + 1 },
        (_, i) => i + this.min
      ),
    ];

    const spans = missingNumbers
      .map(
        (beat) => `<span class="${BEAT_PICKER_ITEM_CLASS}">${beat}</span>`
      )
      .join("");

    this.pickerBeats.innerHTML = spans;

    const beatPickerAimElement = document.createElement("span");
    beatPickerAimElement.classList.add(BEAT_PICKER_AIM_CLASS);
    this.pickerBeats.appendChild(beatPickerAimElement);
  }

  public handleScroll(): void {
    let timeoutId: NodeJS.Timeout;
    const DELAY_IN_MS = 200;

    clearTimeout(timeoutId);
    this.updateBeatBasedOnCenter();
    timeoutId = setTimeout(() => {
      this.modal.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
    }, DELAY_IN_MS);
  }

  public centerBeatOnLoad(): number {
    const verticalCenterItem = this.pickerBeats.querySelector(
      `${BEAT_PICKER_ITEM_SELECTOR}:nth-of-type(${this.centerNumber - 1})`
    ) as HTMLElement;

    if (!verticalCenterItem) return 0;

    const centerItemPositionY =
      verticalCenterItem.offsetTop -
      this.pickerBeats.offsetHeight / 2 +
      verticalCenterItem.offsetHeight / 2;

    requestAnimationFrame(() => {
      this.pickerBeats.scrollTop = centerItemPositionY;
      this.highlightCenterItem(this.pickerBeats);
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

  public updateBeatBasedOnCenter(): void {
    const centerItem = this.highlightCenterItem(this.picker);
    if (this.picker === document.querySelector(AGAINST_BEAT_PICKER_SELECTOR)) {
      this.metronome.againstBeat = Number(centerItem?.textContent) ?? 0;
    } else {
      this.metronome.baseBeat = Number(centerItem?.textContent) ?? 0;
    }
  }
}

export default BeatPickers;
