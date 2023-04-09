import Engine from "./Engine";

import {
  MUTE_BUTTON_SELECTOR,
  MUTE_BUTTON_SOUND_ON_LABEL,
  MUTE_BUTTON_SOUND_OFF_LABEL,
  MUTE_BUTTON_SOUND_RESET_LABEL,
} from "./base/constants";

/**
 * This class represents the UI controlling the mute button.
 *
 * @name MuteButton
 *
 * @param {HTMLButtonElement} element - The mute button.
 * @param {boolean} isMuted           - Wether the sound is muted or not.
 */

class MuteButton {
  element: HTMLButtonElement;
  isMuted: boolean;

  /**
   * Define DOM Elements
   */
  constructor(public engine: Engine) {
    this.element = document.querySelector(MUTE_BUTTON_SELECTOR);
    this.element.disabled = true;
    this.isMuted = true;
    this.element.addEventListener("click", this.toggleSound.bind(this));
  }

  /**
   * @name toggleSound
   * @description
   * Set the sound on or off.
   *
   */
  private toggleSound(): void {
    this.isMuted ? this.soundOn() : this.soundOff();
  }

  /**
   * @name soundOn
   * @description
   * Set the sound on.
   *
   */
  public soundOn(): void {
    this.element.innerText = MUTE_BUTTON_SOUND_ON_LABEL;
    this.element.removeAttribute("disabled");
    this.soundUnmuted();
  }

  /**
   * @name soundOff
   * @description
   * Set the sound off.
   *
   */
  private soundOff(): void {
    this.element.innerText = MUTE_BUTTON_SOUND_OFF_LABEL;
    this.element.removeAttribute("disabled");
    this.soundMuted();
  }

  /**
   * @name soundReset
   * @description
   * Reset the sound.
   *
   */
  public soundReset(): void {
    this.element.innerText = MUTE_BUTTON_SOUND_RESET_LABEL;
    this.element.setAttribute("disabled", "true");
    this.soundMuted();
  }

  /**
   * @name soundMuted
   * @description
   * Mute the sound.
   *
   */
  private soundMuted(): void {
    this.isMuted = true;
    this.engine.gainNode.gain.value = 0;
  }

  /**
   * @name soundUnmuted
   * @description
   * Unmute the sound.
   *
   */
  private soundUnmuted(): void {
    this.isMuted = false;
    this.engine.gainNode.gain.value = 1;
  }
}

export default MuteButton;
