import Engine from "../../Engine";

// Sound On / Off
const SOUND_BUTTON_SELECTOR = ".controllers__sound";
const SOUND_ON = "Sound: ON";
const SOUND_OFF = "Sound: OFF";
const SOUND_RESET = "Sound: ";

// Play / Stop
const PLAY_BUTTON_SELECTOR = ".controllers__play";
const PLAY = "Play";
const STOP = "Stop";

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
  private soundButton: HTMLButtonElement;
  private playButton: HTMLButtonElement;
  private isSoundMuted: boolean;

  private onPlay?: () => void;
  private onPause?: () => void;

  /**
   * Define DOM Elements and Variables
   */
  constructor(public engine: Engine) {
    this.soundButton = document.querySelector(SOUND_BUTTON_SELECTOR);
    this.playButton = document.querySelector(PLAY_BUTTON_SELECTOR);
    this.isSoundMuted = true;

    // Register events
    this.playButton.addEventListener("click", () => {
      if (this.playButton.innerHTML === PLAY) {
        this.playButton.innerHTML = STOP;
        this.soundButton.innerHTML = SOUND_ON;
        if (this.onPlay) this.onPlay();
        this.soundOn();
      } else {
        this.playButton.innerHTML = PLAY;
        this.soundButton.innerHTML = SOUND_RESET;
        if (this.onPause) this.onPause();
        this.soundOff();
      }
    });

    this.soundButton.addEventListener("click", () => {
      if (this.playButton.innerHTML === STOP) {
        if (this.isSoundMuted === false) {
          this.soundButton.innerHTML = SOUND_ON;
          this.soundOn();
          this.isSoundMuted = true;
        } else {
          this.soundButton.innerHTML = SOUND_OFF;
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
