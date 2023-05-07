let xValue = 40;
let startX: number;
let startY: number;
let startAngle: number;
let isDragging = false;

// CSS Fix because the Css Origins is different from the Trigonometry origin
const CSSOriginFix = 90;

class BpmKnob {
  knobContainer: any;
  knobElement: any;
  knobTrack: any;
  knobBall: any;
  knobRange: any;
  knobText: any;

  constructor() {
    this.knobContainer = document.querySelector(".BpmKnob-container");
    this.knobElement = document.querySelector(".BpmKnob");
    this.knobTrack = document.querySelector(".BpmKnob__track");
    this.knobBall = document.querySelector(".BpmKnob__ball");
    this.knobRange = document.querySelector(".BpmKnob__range");
    this.knobText = document.querySelector(".BpmKnob__text");

    // Events
    this.knobRange.addEventListener("change", (e: any) => {
      xValue = e.target.value;
      this.updateKnob();
    });

    this.knobContainer.addEventListener("touchstart", this.handleTouchStart);
    this.knobContainer.addEventListener("touchmove", this.handleTouchMove);
    this.knobContainer.addEventListener("touchend", this.handleTouchEnd);
    this.knobContainer.addEventListener("keydown", this.handleKeyDown);
    this.knobContainer.addEventListener("keyup", this.handleTouchEnd);

    // Initialize the knob
    this.updateKnob();
  }

  private updateKnob() {
    // Knob Element
    const knobElementRect = this.knobElement.getBoundingClientRect();
    const knobElementCenterX = knobElementRect.width / 2;
    const knobElementCenterY = knobElementRect.height / 2;
    const knobElementRadius = knobElementRect.width / 2;

    // Knob Ball
    const knobBallRect = this.knobBall.getBoundingClientRect();
    const knobBallWidth = knobBallRect.width;
    const knobBallHeight = knobBallRect.height;
    const knobBallCenterX = knobBallWidth / 2;
    const knobBallCenterY = knobBallHeight / 2;

    const inactiveColor = "lightseagreen";
    const activeColor = "blue";

    const bpmValue = Math.round((xValue / 100) * 270) + 30;

    this.knobRange.setAttribute("value", xValue);
    this.knobTrack.style.backgroundImage = `conic-gradient(${
      !isDragging ? inactiveColor : activeColor
    } ${xValue}%, transparent ${xValue}%)`;
    const valueInDegrees = (xValue * 360) / 100 - CSSOriginFix;
    const angleInRadians = (valueInDegrees * Math.PI) / 180;

    // Ball (x, y)
    let knobBallX =
      knobElementCenterX +
      knobElementRadius * Math.cos(angleInRadians) -
      knobBallCenterX;
    const knobBallY =
      knobElementCenterY +
      knobElementRadius * Math.sin(angleInRadians) -
      knobBallCenterY;

    // Position The Ball
    this.knobBall.style.left = `${knobBallX}px`;
    this.knobBall.style.top = `${knobBallY}px`;
    this.knobBall.style.background = !isDragging ? inactiveColor : activeColor;

    // Update the knob text
    this.knobText.textContent = `${bpmValue} BPM`;
  }

  private handleTouchStart(event: any) {
    // get the starting X and Y coordinates of the touch
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;

    // calculate the initial angle between the touch and the knob
    let dx =
      this.knobElement.offsetLeft + this.knobElement.offsetWidth / 2 - startX;
    let dy =
      this.knobElement.offsetTop + this.knobElement.offsetHeight / 2 - startY;
    startAngle = Math.atan2(dy, dx);

    isDragging = true;
  }

  private handleTouchMove(event: any) {
    let knobRect = this.knobElement.getBoundingClientRect();

    let dx = knobRect.left + knobRect.width / 2 - event.touches[0].clientX;
    let dy = knobRect.top + knobRect.height / 2 - event.touches[0].clientY;
    let currentAngle = Math.atan2(dy, dx);

    let deltaAngle = currentAngle - startAngle;
    let direction = deltaAngle > 0 ? "clockwise" : "anticlockwise";

    let knobRange = 101; // the range of values that the knob can take
    let deltaValue = (knobRange * deltaAngle) / (2 * Math.PI); // scale the change in angle to the knob range

    let newValue =
      Number(xValue) +
      (direction === "clockwise"
        ? Math.ceil(deltaValue)
        : Math.floor(deltaValue));

    if (newValue < 0) {
      startAngle += 2 * Math.PI;
      newValue = 0;
    } else if (newValue >= knobRange) {
      startAngle = startAngle + (direction === "clockwise" ? -2 : 2) * Math.PI;
      newValue = 100;
    } else {
      xValue = newValue;
    }

    this.updateKnob();

    // reset the starting X and Y coordinates and the initial angle for the next touch
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    startAngle = currentAngle;
  }

  private handleTouchEnd() {
    isDragging = false;
    this.updateKnob();
  }

  private handleKeyDown() {
    isDragging = true;
  }
}

export default BpmKnob;
