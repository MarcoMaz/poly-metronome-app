import { htmlPage } from "../../../setup";

const CONTROLLERS_CONTAINER_SELECTOR = ".controllers-container";
const SOUND_BUTTON_SELECTOR = ".controllers__sound";
const PLAY_BUTTON_SELECTOR = ".controllers__play";

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
      expect(soundButton.textContent.trim()).toBe("Sound:");
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
      expect(playButton.textContent.trim()).toBe("Play");
    });
  });
});
