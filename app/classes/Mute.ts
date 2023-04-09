import Engine from "./Engine";

class Mute {
  muteButton: HTMLButtonElement;
  isMuted: boolean;

  constructor(public engine: Engine) {
    this.muteButton = document.querySelector('.Mute');
    this.muteButton.disabled = true;
    this.isMuted = true;
    this.muteButton.addEventListener('click', this.toggleMute.bind(this));
  }

  private toggleMute(): void {
    this.isMuted ? this.soundOn() : this.soundOff();
  }

  public soundOn(): void {
    this.engine.gainNode.gain.value = 1;
    this.muteButton.innerText = 'Sound: ON';
    this.muteButton.removeAttribute('disabled');
    this.isMuted = false
  }

  public soundOff(): void {
    this.engine.gainNode.gain.value = 0;
    this.muteButton.innerText = 'Sound: OFF';
    this.muteButton.removeAttribute('disabled');
    this.isMuted = true
  }

  public soundReset(): void {
    this.engine.gainNode.gain.value = 0;
    this.muteButton.innerText = "Sound:"
    this.muteButton.setAttribute('disabled', 'true')
    this.isMuted = true
  }
}

export default Mute