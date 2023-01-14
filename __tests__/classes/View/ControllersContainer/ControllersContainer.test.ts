import { htmlPage } from "../../../setup";

describe("Controllers Container", () => {
  it("should exists", () => {
    const controllersContainer = htmlPage.querySelector(
      ".controllers-container"
    );
    expect(controllersContainer).toBeTruthy();
  });

  it("is a DIV element", () => {
    const controllersContainer = htmlPage.querySelector(
      ".controllers-container"
    );
    expect(controllersContainer.tagName).toBe("DIV");
  });

  it("contains 2 children", () => {
    const controllersContainer = htmlPage.querySelector(
      ".controllers-container"
    );
    expect(controllersContainer.children.length).toBe(2);
  });

  describe("Sound Button", () => {
    it("should exists", () => {
      const soundButton = htmlPage.querySelector(".controllers__sound");
      expect(soundButton).toBeTruthy();
    });

    it("is a BUTTON element", () => {
      const soundButton = htmlPage.querySelector(".controllers__sound");
      expect(soundButton.tagName).toBe("BUTTON");
    });

    it("should have the correct label", () => {
      const soundButton = htmlPage.querySelector(".controllers__sound");
      expect(soundButton.textContent.trim()).toBe("Sound:");
    });
  });
  describe("Play Button", () => {
    it("should exists", () => {
      const playButton = htmlPage.querySelector(".controllers__play");
      expect(playButton).toBeTruthy();
    });

    it("is a BUTTON element", () => {
      const playButton = htmlPage.querySelector(".controllers__play");
      expect(playButton.tagName).toBe("BUTTON");
    });

    it("should have the correct label", () => {
      const playButton = htmlPage.querySelector(".controllers__play");
      expect(playButton.textContent.trim()).toBe("Play");
    });
  });
});
