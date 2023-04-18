import {
  PLAY_BUTTON_SELECTOR,
  URL,
} from "../../../../app/classes/base/constants";

const AGAINST_BEAT_PICKER_ITEM_CENTER_SELECTOR =
  ".beatPicker.beatPicker--againstBeat .beatPicker__beats .beatPicker__item.-center";
const BASE_BEAT_PICKER_ITEM_CENTER_SELECTOR =
  ".beatPicker.beatPicker--baseBeat .beatPicker__beats .beatPicker__item.-center";

const AGAINST_BEAT_PICKER_BEATS_SELECTOR =
  ".beatPicker.beatPicker--againstBeat .beatPicker__beats";
const BASE_BEAT_PICKER_BEATS_SELECTOR =
  ".beatPicker.beatPicker--baseBeat .beatPicker__beats";

describe("Against Beat Picker", () => {
  describe("on app loading", () => {
    beforeEach(() => {
      cy.visit(URL);
    });

    it("should center the number 3", () => {
      cy.get(AGAINST_BEAT_PICKER_ITEM_CENTER_SELECTOR).should("have.text", "3");
    });
    it("should have no visible picker", () => {
      cy.get(AGAINST_BEAT_PICKER_BEATS_SELECTOR).should(
        "not.have.class",
        "-open"
      );
    });
    it(`should center "2" on scroll up`, () => {
      cy.get(AGAINST_BEAT_PICKER_BEATS_SELECTOR).scrollTo("top");
      cy.wait(2000);
      cy.get(AGAINST_BEAT_PICKER_ITEM_CENTER_SELECTOR).should("have.text", "2");
    });
    it(`should center the number "9" on scroll down`, () => {
      cy.get(AGAINST_BEAT_PICKER_BEATS_SELECTOR).scrollTo("bottom");
      cy.wait(2000);
      cy.get(AGAINST_BEAT_PICKER_ITEM_CENTER_SELECTOR).should("have.text", "9");
    });
  });

  describe("on app playing", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
    });

    it(`should center the number "2" on scroll up`, () => {
      cy.get(AGAINST_BEAT_PICKER_BEATS_SELECTOR).scrollTo("top");
      cy.wait(2000);
      cy.get(AGAINST_BEAT_PICKER_ITEM_CENTER_SELECTOR).should("have.text", "2");
    });
    it(`should center the number "9" on scroll down`, () => {
      cy.get(AGAINST_BEAT_PICKER_BEATS_SELECTOR).scrollTo("bottom");
      cy.wait(2000);
      cy.get(AGAINST_BEAT_PICKER_ITEM_CENTER_SELECTOR).should("have.text", "9");
    });
  });

  describe("on app playing and stopping", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click().click();
    });

    it(`should center the number "2" on scroll up`, () => {
      cy.get(AGAINST_BEAT_PICKER_BEATS_SELECTOR).scrollTo("top");
      cy.wait(2000);
      cy.get(AGAINST_BEAT_PICKER_ITEM_CENTER_SELECTOR).should("have.text", "2");
    });
    it(`should center the number "9" on scroll down`, () => {
      cy.get(AGAINST_BEAT_PICKER_BEATS_SELECTOR).scrollTo("bottom");
      cy.wait(2000);
      cy.get(AGAINST_BEAT_PICKER_ITEM_CENTER_SELECTOR).should("have.text", "9");
    });
  });
});

describe("Base Beat Picker", () => {
  describe("on app loading", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR);
    });

    it("should center the number 4", () => {
      cy.get(BASE_BEAT_PICKER_ITEM_CENTER_SELECTOR).should("have.text", "4");
    });
    it("should have a visible picker", () => {
      cy.get(BASE_BEAT_PICKER_BEATS_SELECTOR).should("have.class", "-open");
    });
    it(`should center the number "2" on scroll up`, () => {
      cy.get(BASE_BEAT_PICKER_BEATS_SELECTOR).scrollTo("top");
      cy.wait(2000);
      cy.get(BASE_BEAT_PICKER_ITEM_CENTER_SELECTOR).should("have.text", "2");
    });
    it(`should center the number "9" on scroll down`, () => {
      cy.get(BASE_BEAT_PICKER_BEATS_SELECTOR).scrollTo("bottom");
      cy.wait(2000);
      cy.get(BASE_BEAT_PICKER_ITEM_CENTER_SELECTOR).should("have.text", "9");
    });
  });

  describe("on app playing", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
    });

    it(`should center the number "2" on scroll up`, () => {
      cy.get(BASE_BEAT_PICKER_BEATS_SELECTOR).scrollTo("top");
      cy.wait(2000);
      cy.get(BASE_BEAT_PICKER_ITEM_CENTER_SELECTOR).should("have.text", "2");
    });
    it(`should center the number "9" on scroll down`, () => {
      cy.get(BASE_BEAT_PICKER_BEATS_SELECTOR).scrollTo("bottom");
      cy.wait(2000);
      cy.get(BASE_BEAT_PICKER_ITEM_CENTER_SELECTOR).should("have.text", "9");
    });
  });

  describe("on app playing and stopping", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click().click();
    });

    it(`should center the number "2" on scroll up`, () => {
      cy.get(BASE_BEAT_PICKER_BEATS_SELECTOR).scrollTo("top");
      cy.wait(2000);
      cy.get(BASE_BEAT_PICKER_ITEM_CENTER_SELECTOR).should("have.text", "2");
    });
    it(`should center the number "9" on scroll down`, () => {
      cy.get(BASE_BEAT_PICKER_BEATS_SELECTOR).scrollTo("bottom");
      cy.wait(2000);
      cy.get(BASE_BEAT_PICKER_ITEM_CENTER_SELECTOR).should("have.text", "9");
    });
  });
});
