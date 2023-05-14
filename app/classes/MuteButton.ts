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
 * @param {HTMLButtonElement} muteButton  - The mute button.
 * @param {boolean} isSoundMuted          - Wether the sound is muted or not.
 * 
 */
class MuteButton {
  private muteButton: HTMLButtonElement;
  private isSoundMuted: boolean;

  /**
   * Define DOM Elements and Variables.
   */
  constructor(public engine: Engine) {
    this.muteButton = document.querySelector(MUTE_BUTTON_SELECTOR);
    this.isSoundMuted = true;

    // Set attributes
    this.muteButton.disabled = true;

    // Register events
    this.muteButton.addEventListener("click", this.toggleSound.bind(this));
  }

  /**
   * @name toggleSound
   * @description
   * Set the sound on or off.
   *
   */
  private toggleSound(): void {
    this.isSoundMuted ? this.soundOn() : this.soundOff();
  }

  /**
   * @name soundOn
   * @description
   * Set the sound on.
   *
   */
  public soundOn(): void {
    this.muteButton.innerText = MUTE_BUTTON_SOUND_ON_LABEL;
    this.muteButton.removeAttribute("disabled");
    this.unmuteSound();
  }

  /**
   * @name soundOff
   * @description
   * Set the sound off.
   *
   */
  private soundOff(): void {
    this.muteButton.innerText = MUTE_BUTTON_SOUND_OFF_LABEL;
    this.muteButton.removeAttribute("disabled");
    this.muteSound();
  }

  /**
   * @name resetSound
   * @description
   * Reset the sound.
   *
   */
  public resetSound(): void {
    this.muteButton.innerText = MUTE_BUTTON_SOUND_RESET_LABEL;
    this.muteButton.setAttribute("disabled", "true");
    this.muteSound();
  }

  /**
   * @name muteSound
   * @description
   * Mute the sound.
   *
   */
  private muteSound(): void {
    this.isSoundMuted = true;
    this.engine.gainNode.gain.value = 0;
  }

  /**
   * @name unmuteSound
   * @description
   * Unmute the sound.
   *
   */
  private unmuteSound(): void {
    this.isSoundMuted = false;
    this.engine.gainNode.gain.value = 1;
  }
}

export default MuteButton;
