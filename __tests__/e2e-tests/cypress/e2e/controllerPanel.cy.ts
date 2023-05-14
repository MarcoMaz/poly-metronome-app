import {
  CONTROLLER_PANEL_BUTTON_BEATS_SELECTOR,
  CONTROLLER_PANEL_BUTTON_BPM_SELECTOR,
  CONTROLLER_PANEL_PANEL_SELECTOR,
  PLAY_BUTTON_SELECTOR,
  URL,
} from "../../../../app/classes/base/constants";

describe("Controller panel", () => {
  describe("on app loading", () => {
    beforeEach(() => {
      cy.visit(URL);
    });

    it("should only highlight Controller Button Beats, if beats selector is clicked", () => {
      cy.get(CONTROLLER_PANEL_BUTTON_BEATS_SELECTOR)
        .click()
        .should("have.class", "-active");
      cy.get(CONTROLLER_PANEL_BUTTON_BPM_SELECTOR).should(
        "not.have.class",
        "-active"
      );
    });
    it("should only show Controller Pane Beats, if beats selector is clicked", () => {
      cy.get(CONTROLLER_PANEL_BUTTON_BEATS_SELECTOR).click();
      cy.get(CONTROLLER_PANEL_PANEL_SELECTOR)
        .first()
        .should("have.class", "-show");
      cy.get(CONTROLLER_PANEL_PANEL_SELECTOR)
        .eq(1)
        .should("not.have.class", "-show");
    });
    it("should only highlight Controller Button Bpm, if bpm selector is clicked", () => {
      cy.get(CONTROLLER_PANEL_BUTTON_BPM_SELECTOR)
        .click()
        .should("have.class", "-active");
      cy.get(CONTROLLER_PANEL_BUTTON_BEATS_SELECTOR).should(
        "not.have.class",
        "-active"
      );
    });
    it("should only show Controller Pane Bpm, if bpm selector is clicked", () => {
      cy.get(CONTROLLER_PANEL_BUTTON_BPM_SELECTOR).click();
      cy.get(CONTROLLER_PANEL_PANEL_SELECTOR)
        .first()
        .should("not.have.class", "-show");
      cy.get(CONTROLLER_PANEL_PANEL_SELECTOR)
        .eq(1)
        .should("have.class", "-show");
    });
  });
  describe("on app playing", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
    });

    it("should only highlight Controller Button Beats, if beats selector is clicked", () => {
      cy.get(CONTROLLER_PANEL_BUTTON_BEATS_SELECTOR)
        .click()
        .should("have.class", "-active");
      cy.get(CONTROLLER_PANEL_BUTTON_BPM_SELECTOR).should(
        "not.have.class",
        "-active"
      );
    });
    it("should only show Controller Pane Beats, if beats selector is clicked", () => {
      cy.get(CONTROLLER_PANEL_BUTTON_BEATS_SELECTOR).click();
      cy.get(CONTROLLER_PANEL_PANEL_SELECTOR)
        .first()
        .should("have.class", "-show");
      cy.get(CONTROLLER_PANEL_PANEL_SELECTOR)
        .eq(1)
        .should("not.have.class", "-show");
    });
    it("should only highlight Controller Button Bpm, if bpm selector is clicked", () => {
      cy.get(CONTROLLER_PANEL_BUTTON_BPM_SELECTOR)
        .click()
        .should("have.class", "-active");
      cy.get(CONTROLLER_PANEL_BUTTON_BEATS_SELECTOR).should(
        "not.have.class",
        "-active"
      );
    });
    it("should only show Controller Pane Bpm, if bpm selector is clicked", () => {
      cy.get(CONTROLLER_PANEL_BUTTON_BPM_SELECTOR).click();
      cy.get(CONTROLLER_PANEL_PANEL_SELECTOR)
        .first()
        .should("not.have.class", "-show");
      cy.get(CONTROLLER_PANEL_PANEL_SELECTOR)
        .eq(1)
        .should("have.class", "-show");
    });
  });
  describe("on app playing and stopping", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(PLAY_BUTTON_SELECTOR).click();
    });
    
    it("should only highlight Controller Button Beats, if beats selector is clicked", () => {
      cy.get(CONTROLLER_PANEL_BUTTON_BEATS_SELECTOR)
        .click()
        .should("have.class", "-active");
      cy.get(CONTROLLER_PANEL_BUTTON_BPM_SELECTOR).should(
        "not.have.class",
        "-active"
      );
    });
    it("should only show Controller Pane Beats, if beats selector is clicked", () => {
      cy.get(CONTROLLER_PANEL_BUTTON_BEATS_SELECTOR).click();
      cy.get(CONTROLLER_PANEL_PANEL_SELECTOR)
        .first()
        .should("have.class", "-show");
      cy.get(CONTROLLER_PANEL_PANEL_SELECTOR)
        .eq(1)
        .should("not.have.class", "-show");
    });
    it("should only highlight Controller Button Bpm, if bpm selector is clicked", () => {
      cy.get(CONTROLLER_PANEL_BUTTON_BPM_SELECTOR)
        .click()
        .should("have.class", "-active");
      cy.get(CONTROLLER_PANEL_BUTTON_BEATS_SELECTOR).should(
        "not.have.class",
        "-active"
      );
    });
    it("should only show Controller Pane Bpm, if bpm selector is clicked", () => {
      cy.get(CONTROLLER_PANEL_BUTTON_BPM_SELECTOR).click();
      cy.get(CONTROLLER_PANEL_PANEL_SELECTOR)
        .first()
        .should("not.have.class", "-show");
      cy.get(CONTROLLER_PANEL_PANEL_SELECTOR)
        .eq(1)
        .should("have.class", "-show");
    });
  });
});
