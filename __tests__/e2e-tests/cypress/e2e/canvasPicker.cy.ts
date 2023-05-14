import {
  CANVAS_SELECTION_DOT,
  CANVAS_SELECTION_GRID,
  CANVAS_SELECTION_LINE,
  CANVAS_SELECTION_SQUARE,
  PLAY_BUTTON_SELECTOR,
  URL,
} from "../../../../app/classes/base/constants";

describe("Canvas picker", () => {
  describe("on app loading", () => {
    beforeEach(() => {
      cy.visit(URL);
    });

    it("should select only the Square button, if clicked", () => {
      cy.get(CANVAS_SELECTION_SQUARE).click().should("have.class", "-selected");
      cy.get(CANVAS_SELECTION_LINE).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_GRID).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_DOT).should("not.have.class", "-selected");
    });
    it("should select only the Line button if clicked", () => {
      cy.get(CANVAS_SELECTION_LINE).click().should("have.class", "-selected");
      cy.get(CANVAS_SELECTION_SQUARE).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_GRID).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_DOT).should("not.have.class", "-selected");
    });
    it("should select only the Grid button if clicked", () => {
      cy.get(CANVAS_SELECTION_GRID).click().should("have.class", "-selected");
      cy.get(CANVAS_SELECTION_LINE).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_SQUARE).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_DOT).should("not.have.class", "-selected");
    });
    it("should select only the Dot button if clicked", () => {
      cy.get(CANVAS_SELECTION_DOT).click().should("have.class", "-selected");
      cy.get(CANVAS_SELECTION_LINE).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_GRID).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_SQUARE).should("not.have.class", "-selected");
    });
  });

  describe("on app playing", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
    });
    it("should select only the Square button, if clicked", () => {
      cy.get(CANVAS_SELECTION_SQUARE).click().should("have.class", "-selected");
      cy.get(CANVAS_SELECTION_LINE).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_GRID).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_DOT).should("not.have.class", "-selected");
    });
    it("should select only the Line button if clicked", () => {
      cy.get(CANVAS_SELECTION_LINE).click().should("have.class", "-selected");
      cy.get(CANVAS_SELECTION_SQUARE).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_GRID).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_DOT).should("not.have.class", "-selected");
    });
    it("should select only the Grid button if clicked", () => {
      cy.get(CANVAS_SELECTION_GRID).click().should("have.class", "-selected");
      cy.get(CANVAS_SELECTION_LINE).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_SQUARE).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_DOT).should("not.have.class", "-selected");
    });
    it("should select only the Dot button if clicked", () => {
      cy.get(CANVAS_SELECTION_DOT).click().should("have.class", "-selected");
      cy.get(CANVAS_SELECTION_LINE).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_GRID).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_SQUARE).should("not.have.class", "-selected");
    });
  });

  describe("on app playing and stopping", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
    });
    it("should select only the Square button, if clicked", () => {
      cy.get(CANVAS_SELECTION_SQUARE).click().should("have.class", "-selected");
      cy.get(CANVAS_SELECTION_LINE).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_GRID).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_DOT).should("not.have.class", "-selected");
    });
    it("should select only the Line button if clicked", () => {
      cy.get(CANVAS_SELECTION_LINE).click().should("have.class", "-selected");
      cy.get(CANVAS_SELECTION_SQUARE).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_GRID).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_DOT).should("not.have.class", "-selected");
    });
    it("should select only the Grid button if clicked", () => {
      cy.get(CANVAS_SELECTION_GRID).click().should("have.class", "-selected");
      cy.get(CANVAS_SELECTION_LINE).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_SQUARE).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_DOT).should("not.have.class", "-selected");
    });
    it("should select only the Dot button if clicked", () => {
      cy.get(CANVAS_SELECTION_DOT).click().should("have.class", "-selected");
      cy.get(CANVAS_SELECTION_LINE).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_GRID).should("not.have.class", "-selected");
      cy.get(CANVAS_SELECTION_SQUARE).should("not.have.class", "-selected");
    });
  });
});
