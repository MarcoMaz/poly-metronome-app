const APP_TOGGLE = ".app__toggle";
const PLAY = "play";
const STOP = "stop";

class AppControllerUi {
  private toggle: HTMLButtonElement;

  private onPlay?: () => void;

  private onPause?: () => void;

  constructor() {
    this.toggle = document.querySelector(APP_TOGGLE);

    this.toggle.addEventListener("click", () => {
      if (this.toggle.innerHTML === PLAY) {
        this.toggle.innerHTML = STOP;
        if (this.onPlay) this.onPlay();
      } else {
        this.toggle.innerHTML = PLAY;
        if (this.onPause) this.onPause();
      }
    });
  }

  public setOnPlay(callback: () => void) {
    this.onPlay = callback;
  }

  public setOnPause(callback: () => void) {
    this.onPause = callback;
  }
}

export default AppControllerUi;
