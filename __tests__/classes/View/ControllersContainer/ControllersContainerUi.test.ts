import { htmlPage } from "../../../setup";

<<<<<<< HEAD:__tests__/classes/View/ControllersContainer/ControllersContainerUi.test.ts
import { controllersContainerUi } from "../../../../app/classes/View/ControllersContainer/controllersContainerUi";

const {
  CONTROLLERS_CONTAINER_SELECTOR,
  SOUND_BUTTON_SELECTOR,
  PLAY_BUTTON_SELECTOR,
} = controllersContainerUi.selectors;

const { SOUND_RESET_LABEL, PLAY_BUTTON_LABEL } = controllersContainerUi.labels;
=======
import {
  CONTROLLERS_CONTAINER_SELECTOR,
  SOUND_BUTTON_SELECTOR,
  PLAY_BUTTON_SELECTOR,
  SOUND_RESET_LABEL,
  PLAY_BUTTON_LABEL
} from "../../../../app/classes/View/ControllersContainer/ControllersContainerUi";
>>>>>>> b1ade173ef06f16f7b6ebac0e8e16df4b1a1d798:__tests__/classes/View/ControllersContainer/ControllersContainerUi.test.ts

describe("Controllers Container", () => {
  it("should exists", () => {
    const controllersContainer = htmlPage.querySelector(
      CONTROLLERS_CONTAINER_SELECTOR
    );
    expect(controllersContainer).toBeTruthy();
  });

  it("is a DIV element", () => {
    const controllersContainer = htmlPage.querySelector(
      CONTROLLERS_CONTAINER_SELECTOR
    );
    expect(controllersContainer.tagName).toBe("DIV");
  });

  it("contains 2 children", () => {
    const controllersContainer = htmlPage.querySelector(
      CONTROLLERS_CONTAINER_SELECTOR
    );
    expect(controllersContainer.children.length).toBe(2);
  });

  describe("Sound Button", () => {
    it("should exists", () => {
      const soundButton = htmlPage.querySelector(SOUND_BUTTON_SELECTOR);
      expect(soundButton).toBeTruthy();
    });

    it("is a BUTTON element", () => {
      const soundButton = htmlPage.querySelector(SOUND_BUTTON_SELECTOR);
      expect(soundButton.tagName).toBe("BUTTON");
    });

    it("should have the correct label", () => {
      const soundButton = htmlPage.querySelector(SOUND_BUTTON_SELECTOR);
      expect(soundButton.textContent.trim()).toBe(SOUND_RESET_LABEL);
    });
  });
  describe("Play Button", () => {
    it("should exists", () => {
      const playButton = htmlPage.querySelector(PLAY_BUTTON_SELECTOR);
      expect(playButton).toBeTruthy();
    });

    it("is a BUTTON element", () => {
      const playButton = htmlPage.querySelector(PLAY_BUTTON_SELECTOR);
      expect(playButton.tagName).toBe("BUTTON");
    });

    it("should have the correct label", () => {
      const playButton = htmlPage.querySelector(PLAY_BUTTON_SELECTOR);
      expect(playButton.textContent.trim()).toBe(PLAY_BUTTON_LABEL);
    });
  });
});
