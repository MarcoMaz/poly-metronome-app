// CSS Fix because the Css Origins is different from the Trigonometry origin.
const CSS_ORIGIN_FIX = 90;

const BPM_KNOB_CONTAINER_SELECTOR = ".BpmKnob-container";
const BPM_KNOB_SELECTOR = ".BpmKnob";
const BPM_KNOB_INNER_TRACK_SELECTOR = ".BpmKnob__track";
const BPM_KNOB_BALL_SELECTOR = ".BpmKnob__ball";
const BPM_KNOB_RANGE_SELECTOR = ".BpmKnob__range";
const BPM_KNOB_TEXT_SELECTOR = ".BpmKnob__text";

const BPM_KNOB_INACTIVE_COLOR = "#d1d1d1";
const BPM_KNOB_ACTIVE_COLOR = "#151515";

class BpmKnob {
  bpmKnobContainer: HTMLDivElement;
  bpmKnobRange: HTMLDivElement;
  bpmKnobTrack: HTMLDivElement;
  bpmKnobBall: HTMLDivElement;
  bpmKnobElement: HTMLDivElement;
  bpmKnobText: HTMLDivElement;
  isDragging: boolean;
  xValue: number;
  startX: number;
  startY: number;
  startAngle: number;

  constructor() {
    this.bpmKnobContainer = document.querySelector(BPM_KNOB_CONTAINER_SELECTOR);
    this.bpmKnobElement =
      this.bpmKnobContainer.querySelector(BPM_KNOB_SELECTOR);
    this.bpmKnobTrack = this.bpmKnobContainer.querySelector(
      BPM_KNOB_INNER_TRACK_SELECTOR
    );
    this.bpmKnobBall = this.bpmKnobContainer.querySelector(
      BPM_KNOB_BALL_SELECTOR
    );
    this.bpmKnobRange = this.bpmKnobContainer.querySelector(
      BPM_KNOB_RANGE_SELECTOR
    );
    this.bpmKnobText = this.bpmKnobContainer.querySelector(
      BPM_KNOB_TEXT_SELECTOR
    );
    this.isDragging = false;
    this.xValue = 40;
    this.startX = null;
    this.startY = null;
    this.startAngle = null;

    // Events
    this.bpmKnobRange.addEventListener("change", this.handleChange.bind(this));
    this.bpmKnobContainer.addEventListener(
      "touchstart",
      this.handleTouchStart.bind(this)
    );
    this.bpmKnobContainer.addEventListener(
      "touchmove",
      this.handleTouchMove.bind(this)
    );
    this.bpmKnobContainer.addEventListener(
      "touchend",
      this.handleTouchEnd.bind(this)
    );
    this.bpmKnobContainer.addEventListener(
      "keydown",
      this.handleKeyDown.bind(this)
    );
    this.bpmKnobContainer.addEventListener(
      "keyup",
      this.handleKeyUp.bind(this)
    );

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

    const bpmValue = Math.round((this.xValue / 100) * 270) + 30;

    this.bpmKnobRange.setAttribute("value", String(this.xValue));
    this.bpmKnobTrack.style.backgroundImage = `conic-gradient(${
      !this.isDragging ? BPM_KNOB_INACTIVE_COLOR : BPM_KNOB_ACTIVE_COLOR
    } ${this.xValue}%, transparent ${this.xValue}%)`;
    const valueInDegrees = (this.xValue * 360) / 100 - CSS_ORIGIN_FIX;
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
    this.bpmKnobText.textContent = `${bpmValue} BPM`;
  }

  private handleChange(event: Event) {
    let eventTarget = event.target as HTMLInputElement;
    this.xValue = Number(eventTarget.value);
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

    let knobRange = 101; // the range of values that the knob can take
    let deltaValue = (knobRange * deltaAngle) / (2 * Math.PI); // scale the change in angle to the knob range

    let newValue =
      this.xValue +
      (direction === "clockwise"
        ? Math.ceil(deltaValue)
        : Math.floor(deltaValue));

    if (newValue < 0) {
      this.startAngle += 2 * Math.PI;
      newValue = 0;
    } else if (newValue >= knobRange) {
      this.startAngle =
        this.startAngle + (direction === "clockwise" ? -2 : 2) * Math.PI;
      newValue = 100;
    } else {
      this.xValue = newValue;
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
