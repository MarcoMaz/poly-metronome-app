import Engine from "../Engine";

const VOLUME_SLIDER = ".volume";

class VolumeUi {
  private slider: HTMLInputElement;

  constructor(public engine: Engine) {
    this.slider = document.querySelector(VOLUME_SLIDER);

    this.slider.addEventListener("input", (event) => {
      let eventTarget = event.target as HTMLInputElement;

      this.engine.gainNode.gain.value = eventTarget.value as unknown as number;
    });
  }
}

export default VolumeUi