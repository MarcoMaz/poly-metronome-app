import Metronome from '../../Metronome';
import Modal from '../../Modal';

import {
  BEATS_CONTAINER,
  AGAINST_BEAT_PLUS_SELECTOR,
  AGAINST_BEAT_VALUE_SELECTOR,
  AGAINST_BEAT_MINUS_SELECTOR,
  BASE_BEAT_PLUS_SELECTOR,
  BASE_BEAT_VALUE_SELECTOR,
  BASE_BEAT_MINUS_SELECTOR,
  BEAT_MIN,
  BEAT_MAX,
} from '../../base/constants';

/**
 * This class represents the UI controlling the beats.
 *
 * @name BeatsUi
 *
 * @param {HTMLDivElement} element              - The parent element container.
 * @param {HTMLButtonElement} againstBeatPlus   - The plus button controlling the against beat.
 * @param {HTMLInputElement} againstBeatValue   - The input value of the against beat.
 * @param {HTMLButtonElement} againstBeatMinus  - The minus button controlling the against beat.
 * @param {HTMLButtonElement} baseBeatPlus      - The plus button controlling the base beat.
 * @param {HTMLInputElement} baseBeatValue      - The input value of the base beat.
 * @param {HTMLButtonElement} baseBeatMinus     - The minus button controlling the base beat.
 */

class BeatsUi {
  private element: HTMLDivElement;
  public againstBeatPlus: HTMLButtonElement;
  public againstBeatValue: HTMLInputElement;
  private againstBeatMinus: HTMLButtonElement;
  private baseBeatPlus: HTMLButtonElement;
  public baseBeatValue: HTMLInputElement;
  private baseBeatMinus: HTMLButtonElement;

  /**
   * Define DOM Elements and Variables.
   */
  constructor(public modal: Modal, public metronome: Metronome) {
    this.element = document.querySelector(BEATS_CONTAINER);
    this.againstBeatPlus = this.element.querySelector(
      AGAINST_BEAT_PLUS_SELECTOR
    );
    this.againstBeatValue = this.element.querySelector(
      AGAINST_BEAT_VALUE_SELECTOR
    );
    this.againstBeatMinus = this.element.querySelector(
      AGAINST_BEAT_MINUS_SELECTOR
    );
    this.baseBeatPlus = this.element.querySelector(BASE_BEAT_PLUS_SELECTOR);
    this.baseBeatValue = this.element.querySelector(BASE_BEAT_VALUE_SELECTOR);
    this.baseBeatMinus = this.element.querySelector(BASE_BEAT_MINUS_SELECTOR);

    // Register events
    this.againstBeatPlus.addEventListener('click', () => {
      this.metronome.againstBeat += 1;
      this.againstBeatValue.value = this.metronome.againstBeat.toString();
      this.againstBeatValue.setAttribute(
        'value',
        this.metronome.againstBeat.toString()
      );

      this.modal.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkBeatsLimits(this.metronome.againstBeat, 'against');
    });

    this.againstBeatMinus.addEventListener('click', () => {
      this.metronome.againstBeat -= 1;
      this.againstBeatValue.value = this.metronome.againstBeat.toString();
      this.againstBeatValue.setAttribute(
        'value',
        this.metronome.againstBeat.toString()
      );

      this.modal.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkBeatsLimits(this.metronome.againstBeat, 'against');
    });

    this.againstBeatValue.addEventListener('change', (event) => {
      let eventTarget = event.target as HTMLInputElement;
      this.metronome.againstBeat = Number(eventTarget.value);
      this.againstBeatValue.setAttribute('value', eventTarget.value);

      this.modal.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkBeatsLimits(this.metronome.againstBeat, 'against');
    });

    this.baseBeatPlus.addEventListener('click', () => {
      this.metronome.baseBeat += 1;
      this.baseBeatValue.value = this.metronome.baseBeat.toString();
      this.baseBeatValue.setAttribute(
        'value',
        this.metronome.baseBeat.toString()
      );

      this.modal.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkBeatsLimits(this.metronome.baseBeat, 'base');
    });

    this.baseBeatMinus.addEventListener('click', () => {
      this.metronome.baseBeat -= 1;
      this.baseBeatValue.value = this.metronome.baseBeat.toString();
      this.baseBeatValue.setAttribute(
        'value',
        this.metronome.baseBeat.toString()
      );

      this.modal.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkBeatsLimits(this.metronome.baseBeat, 'base');
    });

    this.baseBeatValue.addEventListener('change', (event) => {
      let eventTarget = event.target as HTMLInputElement;
      this.metronome.baseBeat = Number(eventTarget.value);
      this.baseBeatValue.setAttribute('value', eventTarget.value);

      this.modal.isPoly(this.metronome.againstBeat, this.metronome.baseBeat);
      this.checkBeatsLimits(this.metronome.baseBeat, 'base');
    });
  }

  /**
   * @name checkBeatsLimits
   * @description
   * Check the beats' limits. If the number is too big or too low, resets to minimum and maximum.
   *
   */
  private checkBeatsLimits(element: number, type: 'against' | 'base'): void {
    if (element > BEAT_MAX) {
      if (type === 'against') {
        this.metronome.againstBeat = BEAT_MAX;
        this.againstBeatValue.value = BEAT_MAX.toString();
        this.againstBeatValue.setAttribute('value', BEAT_MAX.toString());
      } else {
        this.metronome.baseBeat = BEAT_MAX;
        this.baseBeatValue.value = BEAT_MAX.toString();
        this.baseBeatValue.setAttribute('value', BEAT_MAX.toString());
      }
    }
    if (element <= BEAT_MIN - 1) {
      if (type === 'against') {
        this.metronome.againstBeat = BEAT_MIN;
        this.againstBeatValue.value = BEAT_MIN.toString();
        this.againstBeatValue.setAttribute('value', BEAT_MIN.toString());
      } else {
        this.metronome.baseBeat = BEAT_MIN;
        this.baseBeatValue.value = BEAT_MIN.toString();
        this.baseBeatValue.setAttribute('value', BEAT_MIN.toString());
      }
    }
  }
}

export default BeatsUi;
