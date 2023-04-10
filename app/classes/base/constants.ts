// CanvasUi
export const CANVAS_SELECTOR = ".gui-container__canvas";
export const CANVAS_PIXEL_WIDTH_PHONE = 350;
export const CANVAS_PIXEL_HEIGHT_PHONE = 100;
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
export const SHAPE_SIZE_MOBILE = 16;
export const SHAPE_SIZE_TABLET = 20;
export const SHAPE_SIZE_DESKTOP = 32;
export const SHAPE_DOT_START_ANGLE = 0;
export const SHAPE_DOT_END_ANGLE = 2 * Math.PI;

// TabSelectionUi
export const TAB_SELECTION_SELECTOR = ".gui-container__tab-selection";
export const TAB_SELECTOR = ".gui-container__tab";
export const TAB_SELECTED_CLASS = "-selected";
export const TAB_SELECTED_DEFAULT = "square";
export const TAB_SELECTION_SQUARE = '[data-gui-container-tab="square"]';
export const TAB_SELECTION_PIPELINES = '[data-gui-container-tab="pipelines"]';
export const TAB_SELECTION_GRID = '[data-gui-container-tab="grid"]';
export const TAB_SELECTION_DOTS = '[data-gui-container-tab="square"]';


// BeatsUi
export const BEATS_CONTAINER = ".gui-controllers__beats-container";
export const BEATS = ".gui-controllers__beats";
export const AGAINST_BEAT = ".gui-controllers__against-beat";
export const AGAINST_BEAT_PLUS_SELECTOR = `${AGAINST_BEAT}.gui-controllers__beat-plus`;
export const AGAINST_BEAT_VALUE_SELECTOR = `${AGAINST_BEAT}.gui-controllers__beat-value`;
export const AGAINST_BEAT_MINUS_SELECTOR = `${AGAINST_BEAT}.gui-controllers__beat-minus`;
export const DOTS = ".gui-controllers__dots";
export const BASE_BEAT = ".gui-controllers__base-beat";
export const BASE_BEAT_PLUS_SELECTOR = `${BASE_BEAT}.gui-controllers__beat-plus`;
export const BASE_BEAT_VALUE_SELECTOR = `${BASE_BEAT}.gui-controllers__beat-value`;
export const BASE_BEAT_MINUS_SELECTOR = `${BASE_BEAT}.gui-controllers__beat-minus`;
export const BEAT_MIN = 2;
export const BEAT_MAX = 9;

// BpmUi
export const BPM_SELECTOR = ".gui-controllers__bpm";
export const BPM_MINUS_1_SELECTOR = `${BPM_SELECTOR}.gui-controllers__bpm-minus--1`;
export const BPM_MINUS_5_SELECTOR = `${BPM_SELECTOR}.gui-controllers__bpm-minus--5`;
export const BPM_PLUS_1_SELECTOR = `${BPM_SELECTOR}.gui-controllers__bpm-plus--1`;
export const BPM_PLUS_5_SELECTOR = `${BPM_SELECTOR}.gui-controllers__bpm-plus--5`;
export const BPM_VALUE_SELECTOR = `${BPM_SELECTOR}.gui-controllers__bpm-value--number`;
export const BPM_VALUE_SELECTOR_LABEL = `${BPM_SELECTOR}.gui-controllers__bpm-value > label`;
export const BPM_MIN = 30;
export const BPM_MAX = 300;

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
export const MODAL_FIRST_MESSAGE_SELECTOR = ".Modal__supporting-text p:nth-child(1)";
export const MODAL_SECOND_MESSAGE_SELECTOR = ".Modal__supporting-text p:nth-child(2)";
export const MODAL_BUTTON_SELECTOR = ".Modal__button";

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
