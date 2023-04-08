import { app } from "../index";

class Play {
  element: HTMLButtonElement;
  iconPlay: HTMLImageElement;
  iconStop: HTMLImageElement;

  constructor() {
    this.element = document.querySelector(".Play");
    this.iconPlay = document.querySelector(".Play__icon-play");
    this.iconStop = document.querySelector(".Play__icon-stop");

    this.element.addEventListener("click", this.togglePlay.bind(this))
  }

  private togglePlay() {
    app.isPlaying = !app.isPlaying;

    if (!app.isPlaying) {
      this.iconPlay.classList.remove("-show");
      this.iconStop.classList.add("-show");
      app.pause();
    } else {
      this.iconPlay.classList.add("-show");
      this.iconStop.classList.remove("-show");
      app.play();
    }
  }
}

export default Play