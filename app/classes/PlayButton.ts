import { app } from "../index";
import Engine from "./Engine";
import MuteButton from "./MuteButton";

import {
  PLAY_BUTTON_SELECTOR,
  PLAY_ICON_PLAY_SELECTOR,
  PLAY_ICON_STOP_SELECTOR,
  PLAY_SHOW_CLASS,
} from "./base/constants";

/**
 * This class represents the UI controlling the play button.
 *
 * @name PlayButton
 *
 * @param {HTMLButtonElement} element - The play button.
 * @param {HTMLImageElement} iconPlay - The icon play.
 * @param {HTMLImageElement} iconStop - The icon stop.
 */

class PlayButton {
  element: HTMLButtonElement;
  iconPlay: HTMLImageElement;
  iconStop: HTMLImageElement;

  /**
   * Define DOM Elements
   */
  constructor(public mute: MuteButton, public engine: Engine) {
    this.element = document.querySelector(PLAY_BUTTON_SELECTOR);
    this.iconPlay = this.element.querySelector(PLAY_ICON_PLAY_SELECTOR);
    this.iconStop = this.element.querySelector(PLAY_ICON_STOP_SELECTOR);
    this.mute = new MuteButton(this.engine);
    this.element.addEventListener("click", this.togglePlay.bind(this));
  }

  /**
   * @name togglePlay
   * @description
   * Play or pause the app.
   *
   */
  private togglePlay() {
    app.isPlaying = !app.isPlaying;

    if (app.isPlaying) {
      this.iconPlay.classList.remove(PLAY_SHOW_CLASS);
      this.iconStop.classList.add(PLAY_SHOW_CLASS);
      app.play();
      this.mute.soundOn();
    } else {
      this.iconPlay.classList.add(PLAY_SHOW_CLASS);
      this.iconStop.classList.remove(PLAY_SHOW_CLASS);
      app.pause();
      this.mute.soundReset();
    }
  }
}

export default PlayButton;
