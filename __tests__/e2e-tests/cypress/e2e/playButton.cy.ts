import {
  PLAY_BUTTON_SELECTOR,
  MUTE_BUTTON_SELECTOR,
  PLAY_ICON_PLAY_SELECTOR,
  PLAY_ICON_STOP_SELECTOR,
  PLAY_SHOW_CLASS,
  URL,
} from "../../../../app/classes/base/constants";

describe("Play Button", () => {
  describe("on app loading", () => {
    beforeEach(() => {
      cy.visit(URL);
    });
    it("should have icon play visible", () => {
      cy.get(PLAY_ICON_PLAY_SELECTOR).should("have.class", "-show");
    });
    it("should not have icon stop visible", () => {
      cy.get(PLAY_ICON_STOP_SELECTOR).should("not.have.class", "-show");
    });
  });
  describe("on app playing", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
    });
    it("should have icon stop visible", () => {
      cy.get(PLAY_ICON_STOP_SELECTOR).should("have.class", "-show");
    });
    it("should not have icon play visible", () => {
      cy.get(PLAY_ICON_PLAY_SELECTOR).should("not.have.class", "-show");
    });
  });
  describe("on app playing and stopping", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(MUTE_BUTTON_SELECTOR);
      cy.get(PLAY_BUTTON_SELECTOR).click();
    });
    it("should have icon play visible", () => {
      cy.get(PLAY_ICON_PLAY_SELECTOR).should("have.class", "-show");
    });
    it("should not have icon stop visible", () => {
      cy.get(PLAY_ICON_STOP_SELECTOR).should("not.have.class", "-show");
    });
  });
});
