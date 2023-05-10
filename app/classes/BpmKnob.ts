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

class BpmKnob {
  el: HTMLDivElement;
  bpmKnobElement: HTMLDivElement;
  bpmKnobTrack: HTMLDivElement;
  bpmKnobBall: HTMLDivElement;
  bpmKnobRange: HTMLInputElement;
  bpmKnobText: HTMLDivElement;
  isDragging: boolean;
  startX: number;
  startY: number;
  startAngle: number;

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

    // Events
    this.el.addEventListener("touchstart", this.handleTouchStart.bind(this));
    this.el.addEventListener("touchmove", this.handleTouchMove.bind(this));
    this.el.addEventListener("touchend", this.handleTouchEnd.bind(this));
    this.el.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.el.addEventListener("keyup", this.handleKeyUp.bind(this));
    this.bpmKnobRange.addEventListener("change", this.handleChange.bind(this));

    // Initialize the component
    this.updateKnob();
  }

  private updateKnob() {
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

    // Update the knob text
    this.bpmKnobText.innerHTML = `${this.metronome.tempo} <span>BPM</span>`;
    // Update the knob value attribute
    this.bpmKnobRange.setAttribute("value", String(this.metronome.tempo));
  }

  private handleChange(event: Event) {
    let eventTarget = event.target as HTMLInputElement;
    this.metronome.tempo = Number(eventTarget.value);
    this.updateKnob();
  }

  private handleTouchStart(event: TouchEvent) {
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

  private handleTouchMove(event: TouchEvent) {
    let knobRect = this.bpmKnobElement.getBoundingClientRect();

    let dx = knobRect.left + knobRect.width / 2 - event.touches[0].clientX;
    let dy = knobRect.top + knobRect.height / 2 - event.touches[0].clientY;
    let currentAngle = Math.atan2(dy, dx);

    let deltaAngle = currentAngle - this.startAngle;
    let direction = deltaAngle > 0 ? "clockwise" : "anticlockwise";

    let knobRange = BPM_MAX + 1; // the range of values that the knob can take
    let deltaValue = (knobRange * deltaAngle) / (2 * Math.PI); // scale the change in angle to the knob range

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

  private handleTouchEnd() {
    this.endDrag();
  }

  private handleKeyDown() {
    this.startDrag();
  }

  private handleKeyUp() {
    this.endDrag();
  }

  private startDrag() {
    this.isDragging = true;
  }

  private endDrag() {
    this.isDragging = false;
    this.updateKnob();
  }
}

export default BpmKnob;
