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

    this.beatsContainer.addEventListener("scroll", this.getCenterBeat.bind(this));
  }

  private createElements(
    firstNumber: number,
    secondNumber: number,
    parentSelector: string
  ): void {
    // Determine the minimum and maximum values of the range
    const minNumber = Math.min(firstNumber, secondNumber);
    const maxNumber = Math.max(firstNumber, secondNumber);

    // Initialize an empty array to store the missing numbers
    const missingNumbers: number[] = [];

    // Loop through the range and add any missing numbers to the array
    for (let i = minNumber; i <= maxNumber; i++) {
      if (!missingNumbers.includes(i)) missingNumbers.push(i);
    }

    // Add two empty spans to the beginning and end of the missingNumbers array
    missingNumbers.unshift(null);
    missingNumbers.unshift(null);
    missingNumbers.push(null);
    missingNumbers.push(null);

    // Generate a string of span elements for each number in the missing numbers array
    const spans = missingNumbers
      .map((beat) => {
        if (beat === null) {
          return `<span class="beatPicker__item"></span>`; // empty span
        } else {
          return `<span class="beatPicker__item">${beat}</span>`;
        }
      })
      .join("");

    // Get the parent element by its selector
    const parentElement = document.querySelector(parentSelector);

    // Append the string of span elements to the parent element
    parentElement.innerHTML = spans;

    // Add the aim span to the end of the parent element
    const beatPickerAimSpan = document.createElement("span");
    beatPickerAimSpan.classList.add(BEAT_PICKER_AIM_CLASS);
    parentElement.appendChild(beatPickerAimSpan);
  }

  private centerBeatOnLoad(num: number): number {
    const centeredBeatCorrectIndex = num + 1;
    const centerItem = this.element.querySelector(
      `.beatPicker__item:nth-of-type(${centeredBeatCorrectIndex})`
    ) as HTMLElement;
    const centerItemTopPosition = centerItem.offsetTop;
    const centerItemHeight = centerItem.offsetHeight;
    const beatsConatinerHeight = this.beatsContainer.offsetHeight;
    const centerItemPositionY =
      centerItemTopPosition - beatsConatinerHeight / 2 + centerItemHeight / 2;

    return (this.beatsContainer.scrollTop = centerItemPositionY);
  }

  private getCenterBeat(): void {
    // Get the height of the visible portion of the picker.
    const beatsPickerHeight = this.element.clientHeight;
    // Get the position of the top of the picker relative to the document.
    const beatsPickerTopPosition =
      this.element.getBoundingClientRect().top + window.scrollY;
    // Get an array of all the date elements in the beatPicker.
    const beatPickerItems = Array.from(
      this.element.querySelectorAll(BEAT_PICKER_ITEM)
    );

    // Find the item element that is in the center of the visible portion of the beatPicker
    const centerItem = beatPickerItems.find((item) => {
      const itemTopPosition = item.getBoundingClientRect().top + window.scrollY;
      const itemBottomPosition =
        item.getBoundingClientRect().bottom + window.scrollY;
      const isCenter =
        itemTopPosition <= beatsPickerTopPosition + beatsPickerHeight / 2 &&
        itemBottomPosition >= beatsPickerTopPosition + beatsPickerHeight / 2;
      return isCenter;
    });

    this.metronome.againstBeat = Number(centerItem.textContent);
  }
}

export default BeatsPicker;

// ADESSO
// 3. Clean it up.
// 4. Fix the selector and type. --> centerBeatOnLoad
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
