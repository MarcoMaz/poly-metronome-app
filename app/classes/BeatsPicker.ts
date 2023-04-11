const BEAT_PICKER_SELECTOR = ".beatPicker";
const BEAT_PICKER_BEATS_SELECTOR = ".beatPicker__beats";
const BEAT_PICKER_CENTER_ELEMENT_SELECTOR = ".beatPicker__center";

class BeatsPicker {
  private element: HTMLElement;
  private beatsContainer: HTMLElement;
  private centerElement: HTMLElement;

  constructor() {
    this.element = document.querySelector(BEAT_PICKER_SELECTOR);
    this.beatsContainer = this.element.querySelector(
      BEAT_PICKER_BEATS_SELECTOR
    );
    this.centerElement = this.element.querySelector(
      BEAT_PICKER_CENTER_ELEMENT_SELECTOR
    );

    this.createElements(2, 9, BEAT_PICKER_BEATS_SELECTOR, 7);
    this.setCenterElement();
  }

  public createElements(
    num1: number,
    num2: number,
    parentID: string,
    startingNumber: number
  ): void {
    // Determine the minimum and maximum values of the range
    const min = Math.min(num1, num2);
    const max = Math.max(num1, num2);

    // Initialize an empty array to store the missing numbers
    const missingNumbers: number[] = [];

    // Loop through the range and add any missing numbers to the array
    for (let i = min; i <= max; i++) {
      if (!missingNumbers.includes(i)) missingNumbers.push(i);
    }

    // Generate a string of div elements for each number in the missing numbers array
    const divs = missingNumbers
      .map((num) => {
        // Check if the current number matches the starting number
        if (num === startingNumber) {
          return `<div class="beatPicker__item beatPicker__center">${num}</div>`;
        } else {
          return `<div class="beatPicker__item">${num}</div>`;
        }
      })
      .join("");

    // Get the parent element by its ID
    const parent = document.querySelector(parentID);

    // Append the string of div elements to the parent element
    parent.innerHTML = divs;
  }

  public setCenterElement(): void {
    this.element.scrollTop = 400;
  }
}

export default BeatsPicker;
