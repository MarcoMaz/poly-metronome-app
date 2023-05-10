import { app } from "../index";
import Engine from "./Engine";
import MuteButton from "./MuteButton";

import {
  PLAY_BUTTON_SELECTOR,
  PLAY_ICON_PLAY_SELECTOR,
  PLAY_ICON_STOP_SELECTOR,
  SHOW_CLASS,
} from "./base/constants";

/**
 * This class represents the UI controlling the play button.
 *
 * @name PlayButton
 *
 * @param {HTMLButtonElement} playButton  - The play button.
 * @param {HTMLImageElement} iconPlay     - The icon play.
 * @param {HTMLImageElement} iconStop     - The icon stop.
 */

class PlayButton {
  private playButton: HTMLButtonElement;
  private iconPlay: HTMLImageElement;
  private iconStop: HTMLImageElement;

  /**
   * Define DOM Elements and Variables.
   */
  constructor(public mute: MuteButton, public engine: Engine) {
    this.playButton = document.querySelector(PLAY_BUTTON_SELECTOR);
    this.iconPlay = this.playButton.querySelector(PLAY_ICON_PLAY_SELECTOR);
    this.iconStop = this.playButton.querySelector(PLAY_ICON_STOP_SELECTOR);

    // Register events
    this.playButton.addEventListener("click", this.togglePlay.bind(this));
  }

  /**
   * @name togglePlay
   * @description
   * Play or pause the app.
   *
   */
  private togglePlay(): void {
    app.isPlaying = !app.isPlaying;

    if (app.isPlaying) {
      this.iconPlay.classList.remove(SHOW_CLASS);
      this.iconStop.classList.add(SHOW_CLASS);
      app.play();
      this.mute.soundOn();
    } else {
      this.iconPlay.classList.add(SHOW_CLASS);
      this.iconStop.classList.remove(SHOW_CLASS);
      app.pause();
      this.mute.resetSound();
    }
  }
}

export default PlayButton;
