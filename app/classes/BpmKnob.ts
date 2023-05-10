import Metronome from "./Metronome";

import {
  BPM_KNOB_CSS_ORIGIN_FIX,
  BPM_KNOB_CONTAINER_SELECTOR,
  BPM_KNOB_SELECTOR,
  BPM_KNOB_INNER_TRACK_SELECTOR,
  BPM_KNOB_BALL_SELECTOR,
  BPM_KNOB_RANGE_SELECTOR,
  BPM_KNOB_TEXT_SELECTOR,
  BPM_KNOB_INACTIVE_COLOR,
  BPM_KNOB_ACTIVE_COLOR,
  BPM_MIN,
  BPM_MAX,
} from "../classes/base/constants";

/**
 * This class represents the UI controlling the BpmKnob.
 *
 * @name BpmKnob
 *
 * @param {HTMLDivElement} el             - The BpmKnob container.
 * @param {HTMLDivElement} bpmKnobElement - The BpmKnob itself.
 * @param {HTMLDivElement} bpmKnobTrack   - The outer track of the BpmKnob.
 * @param {HTMLDivElement} bpmKnobBall    - The ball of the BpmKnob.
 * @param {HTMLInputElement} bpmKnobRange - The native input element of the BpmKnob.
 * @param {HTMLDivElement} bpmKnobText    - The text representing the BPM of the BpmKnob.
 * @param {boolean} isDragging            - Whether the BpmKnob was dragged or not.
 * @param {number} startX                 - The starting x coordinate of the BpmKnob's ball.
 * @param {number} startY                 - The starting y coordinate of the BpmKnob's ball.
 * @param {number} startAngle             - The starting angle's coordinate of the BpmKnob's ball.
 */

class BpmKnob {
  private el: HTMLDivElement;
  private bpmKnobElement: HTMLDivElement;
  private bpmKnobTrack: HTMLDivElement;
  private bpmKnobBall: HTMLDivElement;
  private bpmKnobRange: HTMLInputElement;
  private bpmKnobText: HTMLDivElement;
  private isDragging: boolean;
  private startX: number;
  private startY: number;
  private startAngle: number;

  /**
   * Define DOM Elements and Variables.
   */
  constructor(public metronome: Metronome) {
    this.el = document.querySelector(BPM_KNOB_CONTAINER_SELECTOR);
    this.bpmKnobElement = this.el.querySelector(BPM_KNOB_SELECTOR);
    this.bpmKnobTrack = this.el.querySelector(BPM_KNOB_INNER_TRACK_SELECTOR);
    this.bpmKnobBall = this.el.querySelector(BPM_KNOB_BALL_SELECTOR);
    this.bpmKnobRange = this.el.querySelector(BPM_KNOB_RANGE_SELECTOR);
    this.bpmKnobText = this.el.querySelector(BPM_KNOB_TEXT_SELECTOR);
    this.isDragging = false;
    this.startX = null;
    this.startY = null;
    this.startAngle = null;

    // Register events
    this.el.addEventListener("touchstart", this.handleTouchStart.bind(this));
    this.el.addEventListener("touchmove", this.handleTouchMove.bind(this));
    this.el.addEventListener("touchend", this.handleTouchEnd.bind(this));
    this.el.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.el.addEventListener("keyup", this.handleKeyUp.bind(this));
    this.bpmKnobRange.addEventListener("change", this.handleChange.bind(this));

    // Initialize the component
    this.updateKnob();
  }

  /**
   * @name updateKnob
   * @description
   * Update the position and appearance of the knob based on the current tempo value.
   *
   */
  private updateKnob(): void {
    // Knob Ball
    const knobBallRect = this.bpmKnobBall.getBoundingClientRect();
    const knobBallWidth = knobBallRect.width;
    const knobBallHeight = knobBallRect.height;
    const knobBallCenterX = knobBallWidth / 2;
    const knobBallCenterY = knobBallHeight / 2;

    // Knob Element
    const knobElementRect = this.bpmKnobElement.getBoundingClientRect();
    const knobElementCenterX = knobElementRect.width / 2;
    const knobElementCenterY = knobElementRect.height / 2;
    const knobElementRadius = knobElementRect.width / 2;

    const knobPercentageFilled =
      (Number(this.metronome.tempo) - BPM_MIN) / ((BPM_MAX - BPM_MIN) / 100);

    this.bpmKnobTrack.style.backgroundImage = `conic-gradient(${
      !this.isDragging ? BPM_KNOB_INACTIVE_COLOR : BPM_KNOB_ACTIVE_COLOR
    } ${knobPercentageFilled}%, transparent ${knobPercentageFilled}%)`;
    // We need to align the Css Origin with the Trigonometry origin
    const valueInDegrees =
      (knobPercentageFilled * 360) / 100 - BPM_KNOB_CSS_ORIGIN_FIX;
    const angleInRadians = (valueInDegrees * Math.PI) / 180;

    // Ball (x, y)
    const knobBallX =
      knobElementCenterX +
      knobElementRadius * Math.cos(angleInRadians) -
      knobBallCenterX;
    const knobBallY =
      knobElementCenterY +
      knobElementRadius * Math.sin(angleInRadians) -
      knobBallCenterY;

    // Position The Ball
    this.bpmKnobBall.style.left = `${knobBallX}px`;
    this.bpmKnobBall.style.top = `${knobBallY}px`;
    this.bpmKnobBall.style.background = !this.isDragging
      ? BPM_KNOB_INACTIVE_COLOR
      : BPM_KNOB_ACTIVE_COLOR;

    this.bpmKnobText.innerHTML = `${this.metronome.tempo} <span>BPM</span>`;
    this.bpmKnobRange.setAttribute("value", String(this.metronome.tempo));
  }

  /**
   * @name handleChange
   * @description
   * Update the tempo value and the knob position on change.
   *
   */
  private handleChange(event: Event): void {
    let eventTarget = event.target as HTMLInputElement;
    this.metronome.tempo = Number(eventTarget.value);
    this.updateKnob();
  }

  /**
   * @name handleTouchStart
   * @description
   * Handle the start of a touch event, set the starting X and Y coordinates.
   * Calculate the initial angle between the touch and the knob.
   *
   */
  private handleTouchStart(event: TouchEvent): void {
    // get the starting X and Y coordinates of the touch
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;

    // calculate the initial angle between the touch and the knob
    let dx =
      this.bpmKnobElement.offsetLeft +
      this.bpmKnobElement.offsetWidth / 2 -
      this.startX;
    let dy =
      this.bpmKnobElement.offsetTop +
      this.bpmKnobElement.offsetHeight / 2 -
      this.startY;
    this.startAngle = Math.atan2(dy, dx);

    this.startDrag();
  }

  /**
   * @name handleTouchMove
   * @description
   * Update the position of the knob based on the user's touch movement and calculate the corresponding tempo value.
   *
   */
  private handleTouchMove(event: TouchEvent): void {
    let knobRect = this.bpmKnobElement.getBoundingClientRect();

    let dx = knobRect.left + knobRect.width / 2 - event.touches[0].clientX;
    let dy = knobRect.top + knobRect.height / 2 - event.touches[0].clientY;
    let currentAngle = Math.atan2(dy, dx);

    let deltaAngle = currentAngle - this.startAngle;
    let direction = deltaAngle > 0 ? "clockwise" : "anticlockwise";

    let knobRange = BPM_MAX + 1;
    // scale the change in angle to the knob range.
    let deltaValue = (knobRange * deltaAngle) / (2 * Math.PI);

    let newValue =
      this.metronome.tempo +
      (direction === "clockwise"
        ? Math.ceil(deltaValue)
        : Math.floor(deltaValue));

    if (newValue < BPM_MIN) {
      this.startAngle += 2 * Math.PI;
      newValue = BPM_MIN;
    } else if (newValue >= knobRange) {
      this.startAngle =
        this.startAngle + (direction === "clockwise" ? -2 : 2) * Math.PI;
      newValue = BPM_MAX;
    } else {
      this.metronome.tempo = newValue;
    }

    this.updateKnob();

    // reset the starting X and Y coordinates and the initial angle for the next touch
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
    this.startAngle = currentAngle;
  }

  /**
   * @name handleTouchEnd
   * @description
   * Handle the touch end event and stop the drag behavior.
   *
   */
  private handleTouchEnd(): void {
    this.endDrag();
  }

  /**
   * @name handleKeyDown
   * @description
   * Start dragging the knob when a key is pressed down.
   *
   */
  private handleKeyDown(): void {
    this.startDrag();
  }

  /**
   * @name handleKeyUp
   * @description
   * End dragging the knob when a key is released.
   *
   */
  private handleKeyUp(): void {
    this.endDrag();
  }

  /**
   * @name startDrag
   * @description
   * Start the dragging operation.
   *
   */
  private startDrag(): void {
    this.isDragging = true;
  }

  /**
   * @name endDrag
   * @description
   * End the dragging operation and update the knob position.
   *
   */
  private endDrag(): void {
    this.isDragging = false;
    this.updateKnob();
  }
}

export default BpmKnob;
