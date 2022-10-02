import { app, metronome } from '../index';

export class View {
  playButton: HTMLButtonElement;

  BPMlabel: HTMLElement;

  BPMslider: HTMLElement;

  baseBeatLabel: HTMLElement;

  baseBeatSlider: HTMLElement;

  againstBeatLabel: HTMLElement;

  againstBeatSlider: HTMLElement;

  switchBeatsButton: HTMLElement;

  radioButtons: any;

  selectedGUI: string;

  constructor() {
    this.playButton = document.querySelector('.play');
    this.BPMlabel = document.getElementById('showTempo');
    this.BPMslider = document.getElementById('tempo');
    this.againstBeatLabel = document.getElementById('againstBeatLabel');
    this.againstBeatSlider = document.getElementById('againstBeatSlider');
    this.baseBeatLabel = document.getElementById('baseBeatLabel');
    this.baseBeatSlider = document.getElementById('baseBeatSlider');
    this.switchBeatsButton = document.getElementById('switchBeatsButton');
    this.radioButtons = document.querySelectorAll(
      'input[name="view-radio-btn"]',
    );
    this.selectedGUI = 'view-square';

    this.playButton.addEventListener('click', () => {
      app.play();
    });

    this.BPMslider.addEventListener('input', (event) => {
      metronome.tempo = (event.target as HTMLInputElement)
        .value as unknown as number;
      this.BPMlabel.innerText = `${metronome.tempo}`;
    });

    this.againstBeatSlider.addEventListener('input', (event) => {
      metronome.againstBeat = (event.target as HTMLInputElement)
        .value as unknown as number;
      this.againstBeatLabel.innerText = `${metronome.againstBeat}`;
    });

    this.baseBeatSlider.addEventListener('input', (event) => {
      metronome.baseBeat = (event.target as HTMLInputElement)
        .value as unknown as number;
      this.baseBeatLabel.innerText = `${metronome.baseBeat}`;
    });

    this.switchBeatsButton.addEventListener('click', () => {
      [metronome.againstBeat, metronome.baseBeat] = [
        metronome.baseBeat,
        metronome.againstBeat,
      ];
      this.baseBeatLabel.innerText = `${metronome.baseBeat}`;
      this.againstBeatLabel.innerText = `${metronome.againstBeat}`;
    });

    for (const radioButton of this.radioButtons) {
      radioButton.addEventListener('change', () => {
        if (radioButton.checked) this.selectedGUI = radioButton.value;
      });
    }
  }
}
