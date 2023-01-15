import Engine from "../../Engine";

export const controllersContainerUi = {
  selectors: {
    CONTROLLERS_CONTAINER_SELECTOR: ".controllers-container",
    SOUND_BUTTON_SELECTOR: ".controllers__sound",
    PLAY_BUTTON_SELECTOR: ".controllers__play",
  },
  labels: {
    SOUND_ON_LABEL: "Sound: ON",
    SOUND_OFF_LABEL: "Sound: OFF",
    SOUND_RESET_LABEL: "Sound:",
    PLAY_BUTTON_LABEL: "Play",
    STOP_BUTTON_LABEL: "Stop",
  },
};

/**
 * This class represents the UI controlling the app functionality.
 *
 * @name ControllersContainerUi
 *
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
    const {
      CONTROLLERS_CONTAINER_SELECTOR,
      SOUND_BUTTON_SELECTOR,
      PLAY_BUTTON_SELECTOR,
    } = controllersContainerUi.selectors;

    const {
      SOUND_ON_LABEL,
      SOUND_OFF_LABEL,
      SOUND_RESET_LABEL,
      PLAY_BUTTON_LABEL,
      STOP_BUTTON_LABEL,
    } = controllersContainerUi.labels;

    this.element = document.querySelector(CONTROLLERS_CONTAINER_SELECTOR);
    this.soundButton = this.element.querySelector(SOUND_BUTTON_SELECTOR);
    this.playButton = this.element.querySelector(PLAY_BUTTON_SELECTOR);
    this.isSoundMuted = true;

    // Register events
    this.playButton.addEventListener("click", () => {
      if (this.playButton.innerHTML === PLAY_BUTTON_LABEL) {
        this.playButton.innerHTML = STOP_BUTTON_LABEL;
        this.soundButton.innerHTML = SOUND_ON_LABEL;
        if (this.onPlay) this.onPlay();
        this.soundOn();
      } else {
        this.playButton.innerHTML = PLAY_BUTTON_LABEL;
        this.soundButton.innerHTML = SOUND_RESET_LABEL;
        if (this.onPause) this.onPause();
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