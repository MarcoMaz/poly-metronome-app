# Polyrhythmic Metronome PWA
[Get the PWA](https://marcomaz.github.io/poly-metronome-app)

## Description
Polyrhythmic Metronome PWA is a progressive web app that uses Object Oriented Programming with Typescript and the Web Audio API to provide a customizable, interactive metronome for practicing and performing polyrhythms[^1].

Inspired by [Chris Wilson's Metronome](https://github.com/cwilso/metronome).

[^1]: A rhythm which makes use of two or more different rhythms simultaneously.

## Features
- 4 different GUIs: Choose between a visual display of squares, pipelines, a grid, or dots to help you keep time.
- 3 different beat sounds: Practice playing along with the base beat, against the beat, or both together.
- Customizable beats: Set the number of beats per measure from 2 to 9.
- Customizable tempo: Set the tempo from 30 to 300 beats per minute (BPM).
- Tap functionality: Use the tap button to set the tempo manually.
- Sound on/off: Toggle the sound on or off to suit your practice needs.
- Play/pause: Pause the metronome at any time and resume when you're ready.
- Mobile, tablet, and desktop compatibility: Use the Polyrhythmic Metronome PWA on any device with a web browser.

## Technologies used
- Typescript
- Scss
- Webpack
- Canvas API
- Web Audio API
- PWA

## Tested with
- Jest (Unit Tests)
- Cypress (E2E Tests)

## Installation
1. Clone the repo
 `git clone https://github.com/MarcoMaz/poly-metronome-app.git`
2. Install the dependencies
`yarn`
3. Run the metronome
`yarn start`

## Testing

### Unit Tests
1. Run `yarn test:unit`

### E2E Tests
1. Run `yarn start`
2. In another shell run `yarn test:e2e`

## Screenshot
Tbd