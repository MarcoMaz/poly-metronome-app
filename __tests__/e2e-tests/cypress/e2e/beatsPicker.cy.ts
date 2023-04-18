import {
  PLAY_BUTTON_SELECTOR,
  URL,
} from "../../../../app/classes/base/constants";

describe("Against Beat Picker", () => {
  describe("on app loading", () => {
    it("should center the number 3", () => {
      cy.visit(URL);
      cy.get(
        ".beatPicker.beatPicker--againstBeat .beatPicker__beats .beatPicker__item.-center"
      ).should("have.text", "3");
    });

    it("should have no visible picker", () => {
      cy.visit(URL);
      cy.get(
        ".beatPicker.beatPicker--againstBeat .beatPicker__beats"
      ).should("not.have.class", "-open");
    });

    it(`should center "2" on scroll up`, () => {
      cy.visit(URL);
      cy.get(".beatPicker.beatPicker--againstBeat .beatPicker__beats").scrollTo(
        "top"
      );
      cy.wait(2000)
      cy.get(
        ".beatPicker.beatPicker--againstBeat .beatPicker__beats .beatPicker__item.-center"
      ).should("have.text", "2");
    });
    it(`should center the number "9" on scroll down`, () => {
      cy.visit(URL);
      cy.get(".beatPicker.beatPicker--againstBeat .beatPicker__beats").scrollTo(
        "bottom"
      );
      cy.wait(2000)
      cy.get(
        ".beatPicker.beatPicker--againstBeat .beatPicker__beats .beatPicker__item.-center"
      ).should("have.text", "9");
    });
  });

  describe("on app playing", () => {
    it(`should center the number "2" on scroll up`, () => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(".beatPicker.beatPicker--againstBeat .beatPicker__beats").scrollTo(
        "top"
      );
      cy.wait(2000)
      cy.get(
        ".beatPicker.beatPicker--againstBeat .beatPicker__beats .beatPicker__item.-center"
      ).should("have.text", "2");
    });
    it(`should center the number "9" on scroll down`, () => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(".beatPicker.beatPicker--againstBeat .beatPicker__beats").scrollTo(
        "bottom"
      );
      cy.wait(2000)
      cy.get(
        ".beatPicker.beatPicker--againstBeat .beatPicker__beats .beatPicker__item.-center"
      ).should("have.text", "9");
    });
  });

  describe("on app playing and stopping", () => {
    it(`should center the number "2" on scroll up`, () => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(".beatPicker.beatPicker--againstBeat .beatPicker__beats").scrollTo(
        "top"
      );
      cy.wait(2000)
      cy.get(
        ".beatPicker.beatPicker--againstBeat .beatPicker__beats .beatPicker__item.-center"
      ).should("have.text", "2");
    });
    it(`should center the number "9" on scroll down`, () => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(".beatPicker.beatPicker--againstBeat .beatPicker__beats").scrollTo(
        "bottom"
      );
      cy.wait(2000)
      cy.get(
        ".beatPicker.beatPicker--againstBeat .beatPicker__beats .beatPicker__item.-center"
      ).should("have.text", "9");
    });
  });
});

describe("Base Beat Picker", () => {
  describe("on app loading", () => {
    it("should center the number 4", () => {
      cy.visit(URL);
      cy.get(
        ".beatPicker.beatPicker--baseBeat .beatPicker__beats .beatPicker__item.-center"
      ).should("have.text", "4");
    });

    it("should have a visible picker", () => {
      cy.visit(URL);
      cy.get(
        ".beatPicker.beatPicker--baseBeat .beatPicker__beats"
      ).should("have.class", "-open");
    });

    it(`should center the number "2" on scroll up`, () => {
      cy.visit(URL);
      cy.get(".beatPicker.beatPicker--baseBeat .beatPicker__beats").scrollTo(
        "top"
      );
      cy.wait(2000)
      cy.get(
        ".beatPicker.beatPicker--baseBeat .beatPicker__beats .beatPicker__item.-center"
      ).should("have.text", "2");
    });
    it(`should center the number "9" on scroll down`, () => {
      cy.visit(URL);
      cy.get(".beatPicker.beatPicker--baseBeat .beatPicker__beats").scrollTo(
        "bottom"
      );
      cy.wait(2000)
      cy.get(
        ".beatPicker.beatPicker--baseBeat .beatPicker__beats .beatPicker__item.-center"
      ).should("have.text", "9");
    });
  });

  describe("on app playing", () => {
    it(`should center the number "2" on scroll up`, () => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(".beatPicker.beatPicker--baseBeat .beatPicker__beats").scrollTo(
        "top"
      );
      cy.wait(2000)
      cy.get(
        ".beatPicker.beatPicker--baseBeat .beatPicker__beats .beatPicker__item.-center"
      ).should("have.text", "2");
    });
    it(`should center the number "9" on scroll down`, () => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(".beatPicker.beatPicker--baseBeat .beatPicker__beats").scrollTo(
        "bottom"
      );
      cy.wait(2000)
      cy.get(
        ".beatPicker.beatPicker--baseBeat .beatPicker__beats .beatPicker__item.-center"
      ).should("have.text", "9");
    });
  });
  describe("on app playing and stopping", () => {
    it(`should center the number "2" on scroll up`, () => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(".beatPicker.beatPicker--baseBeat .beatPicker__beats").scrollTo(
        "top"
      );
      cy.wait(2000)
      cy.get(
        ".beatPicker.beatPicker--baseBeat .beatPicker__beats .beatPicker__item.-center"
      ).should("have.text", "2");
    });
    it(`should center the number "9" on scroll down`, () => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(".beatPicker.beatPicker--baseBeat .beatPicker__beats").scrollTo(
        "bottom"
      );
      cy.wait(2000)
      cy.get(
        ".beatPicker.beatPicker--baseBeat .beatPicker__beats .beatPicker__item.-center"
      ).should("have.text", "9");
    });
  });
});
