import {
  PLAY_BUTTON_SELECTOR,
  MUTE_BUTTON_SELECTOR,
  URL,
} from "../../../../app/classes/base/constants";

describe("Mute button", () => {
  describe("on app loading", () => {
    beforeEach(() => {
      cy.visit(URL);
    });

    it("should be disabled", () => {
      cy.get(MUTE_BUTTON_SELECTOR).should("be.disabled");
    });
    it("should have label 'Sound:'", () => {
      cy.get(MUTE_BUTTON_SELECTOR)
        .invoke("text")
        .then((text) => {
          expect(text.trim()).to.equal("SOUND:");
        });
    });
  });
  describe("on app playing", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
    });

    it("should be enabled", () => {
      cy.get(MUTE_BUTTON_SELECTOR).should("be.enabled");
    });
    it("should have label 'Sound: ON'", () => {
      cy.get(MUTE_BUTTON_SELECTOR).should("have.text", "SOUND: ON");
    });
    it("should have label 'Sound: OFF' if muteButton was clicked", () => {
      cy.get(MUTE_BUTTON_SELECTOR).click().should("have.text", "SOUND: OFF");
    });
    it("should have label 'Sound: ON' if Sound Button was clicked twice", () => {
      cy.get(MUTE_BUTTON_SELECTOR)
        .click()
        .click()
        .should("have.text", "SOUND: ON");
    });
  });
  describe("on app playing and stopping", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(MUTE_BUTTON_SELECTOR);
      cy.get(PLAY_BUTTON_SELECTOR).click();
    });
    
    it("should be disabled", () => {
      cy.get(MUTE_BUTTON_SELECTOR).should("be.disabled");
    });
    it("should have label 'Sound:'", () => {
      cy.get(MUTE_BUTTON_SELECTOR).should("have.text", "SOUND:");
    });
  });
});