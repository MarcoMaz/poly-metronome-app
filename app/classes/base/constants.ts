// CanvasUi
export const CANVAS_SELECTOR = ".Canvas";
export const CANVAS_PIXEL_WIDTH_PHONE = 350;
export const CANVAS_PIXEL_HEIGHT_PHONE = 130;
export const CANVAS_PIXEL_WIDTH_TABLET = 450;
export const CANVAS_PIXEL_HEIGHT_TABLET = 100;
export const CANVAS_PIXEL_WIDTH_DESKTOP = 600;
export const CANVAS_PIXEL_HEIGHT_DESKTOP = 150;

// Viewports
export const MOBILE_VIEWPORT = 0;
export const TABLET_VIEWPORT = 700;
export const DESKTOP_VIEWPORT = 1000;

// Shape
export const SHAPE_ACTIVE_BEAT_COLOR_OTHER = "#d1d1d1";
export const SHAPE_ACTIVE_BEAT_COLOR_CURRENT = "#151515";
export const SHAPE_INACTIVE_BEAT_COLOR = "#EEEEEE";
export const SHAPE_GRID_BORDER_COLOR = "#151515";
export const SHAPE_SIZE_MOBILE = 25;
export const SHAPE_SIZE_TABLET = 20;
export const SHAPE_SIZE_DESKTOP = 32;
export const SHAPE_DOT_START_ANGLE = 0;
export const SHAPE_DOT_END_ANGLE = 2 * Math.PI;

// Engine
export const ENGINE_SMALL_DELAY = 0.25;
export const ENGINE_FREQUENCIES_BEAT_ONE = 880.0;
export const ENGINE_FREQUENCIES_BASE_BEAT = 440.0;
export const ENGINE_FREQUENCIES_AGAINST_BEAT = 220.0;

// App
export const APP_SOUND_DELAY = 0.01;
export const URL: string = "http://192.168.0.56:3000/";

// WORKER
export const WORKER_START_MESSAGE = "start";
export const WORKER_STOP_MESSAGE = "stop";

// Restyling
//
// Tap
export const TAP_CHIP_SELECTOR = ".Tap";

// Modal
export const MODAL_SELECTOR = ".Modal";
export const MODAL_OVERLAY_SELECTOR = ".Modal__overlay";
export const MODAL_CONTENT_SELECTOR = ".Modal__content";
export const MODAL_TITLE_SELECTOR = ".Modal__title";
export const MODAL_SUPPORTING_TEXT_SELECTOR = ".Modal__supporting-text";
export const MODAL_MESSAGES_SELECTOR = ".Modal__supporting-text > p";
export const MODAL_FIRST_MESSAGE_SELECTOR =
  ".Modal__supporting-text p:nth-child(1)";
export const MODAL_SECOND_MESSAGE_SELECTOR =
  ".Modal__supporting-text p:nth-child(2)";
export const MODAL_BUTTON_SELECTOR = ".Modal__button";

// ControllerPanel
export const CONTROLLER_PANEL_SELECTOR = ".ControllerPanel";
export const CONTROLLER_PANEL_BUTTONS_SELECTOR = ".ControllerPanel__buttons";
export const CONTROLLER_PANEL_BUTTON_SELECTOR = ".ControllerPanel__button";
export const CONTROLLER_PANEL_BUTTON_BPM_SELECTOR = ".ControllerPanel__button--bpm";
export const CONTROLLER_PANEL_BUTTON_BEATS_SELECTOR = ".ControllerPanel__button--beats";
export const CONTROLLER_PANEL_PANE_SELECTOR = ".ControllerPanel__pane";
export const CONTROLLER_PANEL_ACTIVE_SELECTOR = ".-active";
export const CONTROLLER_PANEL_ACTIVE_CLASS = "-active";
export const CONTROLLER_PANEL_SHOW_CLASS = "-show";

// BeatPicker
export const BEAT_MIN = 2;
export const BEAT_MAX = 9;
export const BEAT_PICKERS_CONTAINER_SELECTOR = ".BeatPickers";
export const AGAINST_BEAT_PICKER_SELECTOR = ".BeatPicker--againstBeat";
export const BASE_BEAT_PICKER_SELECTOR = ".BeatPicker--baseBeat";
export const BEAT_PICKER_BEATS_SELECTOR = ".BeatPicker__beats";
export const AGAINST_BEAT_PICKER_BEATS_SELECTOR =
  ".BeatPicker--againstBeat > .BeatPicker__beats";
export const BASE_BEAT_PICKER_BEATS_SELECTOR =
  ".BeatPicker--baseBeat > .BeatPicker__beats";
export const BEAT_PICKER_ITEM_SELECTOR = ".BeatPicker__item";
export const AGAINST_BEAT_PICKER_ITEM_CENTER_SELECTOR = `${AGAINST_BEAT_PICKER_BEATS_SELECTOR} ${BEAT_PICKER_ITEM_SELECTOR}.-center`;
export const BASE_BEAT_PICKER_ITEM_CENTER_SELECTOR = `${BASE_BEAT_PICKER_BEATS_SELECTOR} ${BEAT_PICKER_ITEM_SELECTOR}.-center`;
export const BEAT_PICKER_DOTS_SELECTOR = ".BeatPicker__dots";
export const BEAT_PICKER_ITEM_CLASS = "BeatPicker__item";
export const BEAT_PICKER_FOCUS_CLASS = "-focus";
export const BEATS_PICKER_CENTER_CLASS = "-center";
export const BEAT_PICKER_AIM_CLASS = "BeatPicker__aim";

// BpmKnob
export const BPM_MIN = 30;
export const BPM_MAX = 300;
export const BPM_KNOB_CSS_ORIGIN_FIX = 90; 
export const BPM_KNOB_CONTAINER_SELECTOR = ".BpmKnob-container";
export const BPM_KNOB_SELECTOR = ".BpmKnob";
export const BPM_KNOB_INNER_TRACK_SELECTOR = ".BpmKnob__track";
export const BPM_KNOB_BALL_SELECTOR = ".BpmKnob__ball";
export const BPM_KNOB_RANGE_SELECTOR = ".BpmKnob__range";
export const BPM_KNOB_LABEL_SELECTOR = ".BpmKnob__label";
export const BPM_KNOB_TEXT_SELECTOR = ".BpmKnob__text";
export const BPM_KNOB_INACTIVE_COLOR = "#d1d1d1";
export const BPM_KNOB_ACTIVE_COLOR = "#151515";

// CanvasPicker
export const CANVAS_PICKER_SELECTOR = ".CanvasPicker";
export const CANVAS_PICKER_BUTTON_SELECTOR = ".CanvasPicker__button";
export const CANVAS_PICKER_SELECTED_CLASS = "-selected";
export const CANVAS_PICKER_SELECTED_DEFAULT = "square";
export const CANVAS_SELECTION_SQUARE = '[data-canvas-picker-button="square"]';
export const CANVAS_SELECTION_LINE = '[data-canvas-picker-button="line"]';
export const CANVAS_SELECTION_GRID = '[data-canvas-picker-button="grid"]';
export const CANVAS_SELECTION_DOT = '[data-canvas-picker-button="dot"]';

// SwitchBeats
export const SWITCH_BEATS_CHIP_SELECTOR = ".SwitchBeats";

// PlayButton
export const PLAY_BUTTON_SELECTOR = ".Play";
export const PLAY_ICON_PLAY_SELECTOR = ".Play__icon-play";
export const PLAY_ICON_STOP_SELECTOR = ".Play__icon-stop";

// MuteButton
export const MUTE_BUTTON_SELECTOR = ".Mute";
export const MUTE_BUTTON_SOUND_ON_LABEL = "SOUND: ON";
export const MUTE_BUTTON_SOUND_OFF_LABEL = "SOUND: OFF";
export const MUTE_BUTTON_SOUND_RESET_LABEL = "SOUND:";

// KeyCodes
export const ESC_KEY_CODE = 27;

// Time constants
export const SIXTY_SECONDS = 60000;
export const ONE_MINUTE_IN_SECONDS = 60.0;

// Shared constants
export const SHOW_CLASS = "-show";
export const BORDER_RADIUS = 6;
