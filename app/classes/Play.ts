import { app } from "../index";
import Engine from "./Engine";
import Mute from "./Mute";

class Play {
  element: HTMLButtonElement;
  iconPlay: HTMLImageElement;
  iconStop: HTMLImageElement;

  constructor(public mute: Mute, public engine: Engine) {
    this.element = document.querySelector(".Play");
    this.iconPlay = document.querySelector(".Play__icon-play");
    this.iconStop = document.querySelector(".Play__icon-stop");
    this.mute = new Mute(this.engine);
    this.element.addEventListener("click", this.togglePlay.bind(this))
  }

  private togglePlay() {
    app.isPlaying = !app.isPlaying;    

    if (!app.isPlaying) {
      this.iconPlay.classList.add("-show");
      this.iconStop.classList.remove("-show");
      app.pause();
      this.mute.soundReset()
    } else {
      this.iconPlay.classList.remove("-show");
      this.iconStop.classList.add("-show");
      app.play();
      this.mute.soundOn()
    }
  }
}

export default Play