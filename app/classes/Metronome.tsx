/**
 *  This class represents the metronome itself.
 * @constructor
 * @param {number} againstBeat  - The beat playing against the default beat.
 * @param {number} baseBeat     - The default beat.
 * @param {number} tempo        - The tempo (in BPM = Beats Per Minute).
 */

class Metronome {
  againstBeat: number;

  baseBeat: number;

  tempo: number;

  constructor() {
    this.againstBeat = 3;
    this.baseBeat = 4;
    this.tempo = 120.0;
  }
}

export default Metronome;
