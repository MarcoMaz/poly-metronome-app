import Engine from "../../Engine";

import {
  CONTROLLERS_CONTAINER_SELECTOR,
  PLAY_BUTTON_LABEL,
  PLAY_BUTTON_SELECTOR,
  SOUND_OFF_LABEL,
  SOUND_ON_LABEL,
  SOUND_BUTTON_SELECTOR,
  SOUND_RESET_LABEL,
  STOP_BUTTON_LABEL,
} from '../../base/constants'

/**
 * This class represents the UI controlling the app functionality.
 *
 * @name ControllersContainerUi
 *
 * @param {HTMLDivElement} element        - The parent element container.
 * @param {HTMLButtonElement} soundButton - The button controlling if the app is muted or not.
 * @param {HTMLButtonElement} playButton  - The button controlling if the app is playing or not.
 * @param {boolean} isSoundMuted          - Wheter or not the sound is muted.
 *
 */

class ControllersContainerUi {
  private element: HTMLDivElement;
  private soundButton: HTMLButtonElement;
  private playButton: HTMLButtonElement;
  private isSoundMuted: boolean;

  private onPlay?: () => void;
  private onPause?: () => void;

  /**
   * Define DOM Elements and Variables
   */
  constructor(public engine: Engine) {
    this.element = document.querySelector(CONTROLLERS_CONTAINER_SELECTOR);
    this.soundButton = this.element.querySelector(SOUND_BUTTON_SELECTOR);
    this.playButton = this.element.querySelector(PLAY_BUTTON_SELECTOR);
    this.isSoundMuted = true;    

    this.soundButton.setAttribute('disabled', 'true')

    // Register events
    this.playButton.addEventListener("click", () => {
      if (this.playButton.innerHTML === PLAY_BUTTON_LABEL) {
        this.playButton.innerHTML = STOP_BUTTON_LABEL;
        this.soundButton.innerHTML = SOUND_ON_LABEL;
        if (this.onPlay) this.onPlay();
        this.soundButton.removeAttribute('disabled')
        this.soundOn();
      } else {
        this.playButton.innerHTML = PLAY_BUTTON_LABEL;
        this.soundButton.innerHTML = SOUND_RESET_LABEL;
        if (this.onPause) this.onPause();
        this.soundButton.setAttribute('disabled', 'true')
        this.soundOff();
      }
    });

    this.soundButton.addEventListener("click", () => {
      if (this.playButton.innerHTML === STOP_BUTTON_LABEL) {
        if (this.isSoundMuted === false) {
          this.soundButton.innerHTML = SOUND_ON_LABEL;
          this.soundOn();
          this.isSoundMuted = true;
        } else {
          this.soundButton.innerHTML = SOUND_OFF_LABEL;
          this.soundOff();
          this.isSoundMuted = false;

        }
      }
      return;
    });
  }

  /**
   * @name setOnPlay
   * @description
   * Set a callback on play.
   */
  public setOnPlay(callback: () => void) {
    this.onPlay = callback;
  }

  /**
   * @name setOnPause
   * @description
   * Set a callback on pause.
   */
  public setOnPause(callback: () => void) {
    this.onPause = callback;
  }

  /**
   * @name soundOn
   * @description
   * Make the sound audible.
   */
  private soundOn(): void {
    this.engine.gainNode.gain.value = 1;
  }

  /**
   * @name soundOff
   * @description
   * Make the sound mute.
   */
  private soundOff(): void {
    this.engine.gainNode.gain.value = 0;
  }
}

export default ControllersContainerUi;
