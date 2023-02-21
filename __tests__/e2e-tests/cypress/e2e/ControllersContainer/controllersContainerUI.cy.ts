import {
  URL,
  PLAY_BUTTON_SELECTOR,
  SOUND_BUTTON_SELECTOR,
} from "../../constants";

describe("Sound Button", () => {
  describe("on app loading", () => {
    beforeEach(() => {
      cy.visit(URL);
    });
    it("should be disabled", () => {
      cy.get(SOUND_BUTTON_SELECTOR).should("be.disabled");
    });
    it("should have label 'Sound:'", () => {
      cy.get(SOUND_BUTTON_SELECTOR).should("have.text", "Sound:");
    });
  });
  describe("on app playing", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
    });
    it("should be enabled", () => {
      cy.get(SOUND_BUTTON_SELECTOR).should("be.enabled");
    });
    it("should have label 'Sound: ON'", () => {
      cy.get(SOUND_BUTTON_SELECTOR).should("have.text", "Sound: ON");
    });
    it("should have label 'Sound: OFF' if Sound Button was clicked", () => {
      cy.get(SOUND_BUTTON_SELECTOR).click().should("have.text", "Sound: OFF");
    });
    it("should have label 'Sound: ON' if Sound Button was clicked twice", () => {
      cy.get(SOUND_BUTTON_SELECTOR)
        .click()
        .click()
        .should("have.text", "Sound: ON");
    });
  });
  describe("on app playing and stopping", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(SOUND_BUTTON_SELECTOR);
      cy.get(PLAY_BUTTON_SELECTOR).click();
    });
    it("should be disabled", () => {
      cy.get(SOUND_BUTTON_SELECTOR).should("be.disabled");
    });
    it("should have label 'Sound:'", () => {
      cy.get(SOUND_BUTTON_SELECTOR).should("have.text", "Sound:");
    });
  });
});

describe("Play Button", () => {
  beforeEach(() => {
    cy.visit(URL);
  });
  describe("on app loading", () => {
    it("should have label 'Play'", () => {
      cy.get(PLAY_BUTTON_SELECTOR).should("have.text", "Play");
    });
  });
  describe("on app playing", () => {
    it("should have label 'Stop'", () => {
      cy.get(PLAY_BUTTON_SELECTOR).click().should("have.text", "Stop");
    });
  });
  describe("on app playing and stopping", () => {
    it("should have label 'Play'", () => {
      cy.get(PLAY_BUTTON_SELECTOR).click().click().should("have.text", "Play");
    });
  });
});
