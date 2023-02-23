import {
  AGAINST_BEAT_PLUS_SELECTOR,
  AGAINST_BEAT_VALUE_SELECTOR,
  AGAINST_BEAT_MINUS_SELECTOR,
  BASE_BEAT_PLUS_SELECTOR,
  BASE_BEAT_VALUE_SELECTOR,
  BASE_BEAT_MINUS_SELECTOR,
  PLAY_BUTTON_SELECTOR,
  SWITCH_BEATS_SELECTOR,
  URL,
} from "../../../../../app/classes/base/constants";

describe("Against Beat", () => {
  describe("on app loading", () => {
    describe("Button +", () => {
      it("should add 1 to input value on click", () => {
        cy.visit(URL);
        cy.get(AGAINST_BEAT_PLUS_SELECTOR).click();
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "4");
      });
    });
    describe("Input", () => {
      beforeEach(() => {
        cy.visit(URL);
      });
      it("Input should receive focus after click", () => {
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).click().should("have.focus");
      });
      it("should set value to 2 after inputting a number < 2", () => {
        cy.get(AGAINST_BEAT_VALUE_SELECTOR)
          .clear()
          .type("1{enter}")
          .should("have.value", "2");
      });
      it("should set value to 2 after inputting a number = 2", () => {
        cy.get(AGAINST_BEAT_VALUE_SELECTOR)
          .clear()
          .type("2{enter}")
          .should("have.value", "2");
      });
      it("should set value to the number entered after inputting a number > 2 and < 9", () => {
        cy.get(AGAINST_BEAT_VALUE_SELECTOR)
          .clear()
          .type("3{enter}")
          .should("have.value", "3");
      });
      it("should set value to 9 after inputting a number = 9", () => {
        cy.get(AGAINST_BEAT_VALUE_SELECTOR)
          .clear()
          .type("9{enter}")
          .should("have.value", "9");
      });
      it("should set value to 9 after inputting a number > 9", () => {
        cy.get(AGAINST_BEAT_VALUE_SELECTOR)
          .clear()
          .type("10{enter}")
          .should("have.value", "9");
      });
    });
    describe("Button -", () => {
      it("should subtract 1 to input value on click", () => {
        cy.visit(URL);
        cy.get(AGAINST_BEAT_MINUS_SELECTOR).click();
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "2");
      });
    });
  });

  describe("on app playing", () => {
    describe("Button +", () => {
      it("should add 1 to input value on click", () => {
        cy.visit(URL);
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(AGAINST_BEAT_PLUS_SELECTOR).click();
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "4");
      });
    });
    describe("Input", () => {
      beforeEach(() => {
        cy.visit(URL);
        cy.get(PLAY_BUTTON_SELECTOR).click();
      });

      it("Input should receive focus after click", () => {
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).click().should("have.focus");
      });
      it("should set value to 2 after inputting a number < 2", () => {
        cy.get(AGAINST_BEAT_VALUE_SELECTOR)
          .clear()
          .type("1{enter}")
          .should("have.value", "2");
      });
      it("should set value to 2 after inputting a number = 2", () => {
        cy.get(AGAINST_BEAT_VALUE_SELECTOR)
          .clear()
          .type("2{enter}")
          .should("have.value", "2");
      });
      it("should set value to the number entered after inputting a number > 2 and < 9", () => {
        cy.get(AGAINST_BEAT_VALUE_SELECTOR)
          .clear()
          .type("3{enter}")
          .should("have.value", "3");
      });
      it("should set value to 9 after inputting a number = 9", () => {
        cy.get(AGAINST_BEAT_VALUE_SELECTOR)
          .clear()
          .type("9{enter}")
          .should("have.value", "9");
      });
      it("should set value to 9 after inputting a number > 9", () => {
        cy.get(AGAINST_BEAT_VALUE_SELECTOR)
          .clear()
          .type("10{enter}")
          .should("have.value", "9");
      });
    });
    describe("Button -", () => {
      it("should subtract 1 to input value on click", () => {
        cy.visit(URL);
        cy.get(AGAINST_BEAT_MINUS_SELECTOR).click();
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "2");
      });
    });
  });

  describe("on app playing and stopping", () => {
    describe("Button +", () => {
      it("should add 1 to input value on click", () => {
        cy.visit(URL);
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(AGAINST_BEAT_PLUS_SELECTOR).click();
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "4");
      });
    });
    describe("Input", () => {
      beforeEach(() => {
        cy.visit(URL);
        cy.get(PLAY_BUTTON_SELECTOR).click();
      });

      it("Input should receive focus after click", () => {
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).click();
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("not.have.focus");
      });
      it("should set value to 2 after inputting a number < 2", () => {
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).clear().type("1{enter}");
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "2");
      });
      it("should set value to 2 after inputting a number = 2", () => {
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).clear().type("2{enter}");
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "2");
      });
      it("should set value to the number entered after inputting a number > 2 and < 9", () => {
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).clear().type("3{enter}");
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "3");
      });
      it("should set value to 9 after inputting a number = 9", () => {
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).clear().type("9{enter}");
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "9");
      });
      it("should set value to 9 after inputting a number > 9", () => {
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).clear().type("10{enter}");
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "9");
      });
    });
    describe("Button -", () => {
      it("should subtract 1 to input value on click", () => {
        cy.visit(URL);
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(AGAINST_BEAT_MINUS_SELECTOR).click();
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "2");
      });
    });
  });
});

describe("Base Beat", () => {
  describe("on app loading", () => {
    describe("Button +", () => {
      it("should add 1 to input value on click", () => {
        cy.visit(URL);
        cy.get(BASE_BEAT_PLUS_SELECTOR).click();
        cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "5");
      });
    });
    describe("Input", () => {
      beforeEach(() => {
        cy.visit(URL);
      });
      it("Input should receive focus after click", () => {
        cy.get(BASE_BEAT_VALUE_SELECTOR).click().should("have.focus");
      });
      it("should set value to 2 after inputting a number < 2", () => {
        cy.get(BASE_BEAT_VALUE_SELECTOR)
          .clear()
          .type("1{enter}")
          .should("have.value", "2");
      });
      it("should set value to 2 after inputting a number = 2", () => {
        cy.get(BASE_BEAT_VALUE_SELECTOR)
          .clear()
          .type("2{enter}")
          .should("have.value", "2");
      });
      it("should set value to the number entered after inputting a number > 2 and < 9", () => {
        cy.get(BASE_BEAT_VALUE_SELECTOR)
          .clear()
          .type("3{enter}")
          .should("have.value", "3");
      });
      it("should set value to 9 after inputting a number = 9", () => {
        cy.get(BASE_BEAT_VALUE_SELECTOR)
          .clear()
          .type("9{enter}")
          .should("have.value", "9");
      });
      it("should set value to 9 after inputting a number > 9", () => {
        cy.get(BASE_BEAT_VALUE_SELECTOR)
          .clear()
          .type("10{enter}")
          .should("have.value", "9");
      });
    });
    describe("Button -", () => {
      it("should subtract 1 to input value on click", () => {
        cy.visit(URL);
        cy.get(BASE_BEAT_MINUS_SELECTOR).click();
        cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "3");
      });
    });
  });

  describe("on app playing", () => {
    describe("Button +", () => {
      it("should add 1 to input value on click", () => {
        cy.visit(URL);
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(BASE_BEAT_PLUS_SELECTOR).click();
        cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "5");
      });
    });
    describe("Input", () => {
      beforeEach(() => {
        cy.visit(URL);
        cy.get(PLAY_BUTTON_SELECTOR).click();
      });

      it("Input should receive focus after click", () => {
        cy.get(BASE_BEAT_VALUE_SELECTOR).click().should("have.focus");
      });
      it("should set value to 2 after inputting a number < 2", () => {
        cy.get(BASE_BEAT_VALUE_SELECTOR)
          .clear()
          .type("1{enter}")
          .should("have.value", "2");
      });
      it("should set value to 2 after inputting a number = 2", () => {
        cy.get(BASE_BEAT_VALUE_SELECTOR)
          .clear()
          .type("2{enter}")
          .should("have.value", "2");
      });
      it("should set value to the number entered after inputting a number > 2 and < 9", () => {
        cy.get(BASE_BEAT_VALUE_SELECTOR)
          .clear()
          .type("3{enter}")
          .should("have.value", "3");
      });
      it("should set value to 9 after inputting a number = 9", () => {
        cy.get(BASE_BEAT_VALUE_SELECTOR)
          .clear()
          .type("9{enter}")
          .should("have.value", "9");
      });
      it("should set value to 9 after inputting a number > 9", () => {
        cy.get(BASE_BEAT_VALUE_SELECTOR)
          .clear()
          .type("10{enter}")
          .should("have.value", "9");
      });
    });
    describe("Button -", () => {
      it("should subtract 1 to input value on click", () => {
        cy.visit(URL);
        cy.get(BASE_BEAT_MINUS_SELECTOR).click();
        cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "3");
      });
    });
  });

  describe("on app playing and stopping", () => {
    describe("Button +", () => {
      it("should add 1 to input value on click", () => {
        cy.visit(URL);
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(BASE_BEAT_PLUS_SELECTOR).click();
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "5");
      });
    });
    describe("Input", () => {
      beforeEach(() => {
        cy.visit(URL);
        cy.get(PLAY_BUTTON_SELECTOR).click();
      });

      it("Input should receive focus after click", () => {
        cy.get(BASE_BEAT_VALUE_SELECTOR).click();
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(BASE_BEAT_VALUE_SELECTOR).should("not.have.focus");
      });
      it("should set value to 2 after inputting a number < 2", () => {
        cy.get(BASE_BEAT_VALUE_SELECTOR).clear().type("1{enter}");
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "2");
      });
      it("should set value to 2 after inputting a number = 2", () => {
        cy.get(BASE_BEAT_VALUE_SELECTOR).clear().type("2{enter}");
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "2");
      });
      it("should set value to the number entered after inputting a number > 2 and < 9", () => {
        cy.get(BASE_BEAT_VALUE_SELECTOR).clear().type("3{enter}");
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "3");
      });
      it("should set value to 9 after inputting a number = 9", () => {
        cy.get(BASE_BEAT_VALUE_SELECTOR).clear().type("9{enter}");
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "9");
      });
      it("should set value to 9 after inputting a number > 9", () => {
        cy.get(BASE_BEAT_VALUE_SELECTOR).clear().type("10{enter}");
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "9");
      });
    });
    describe("Button -", () => {
      it("should subtract 1 to input value on click", () => {
        cy.visit(URL);
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(BASE_BEAT_MINUS_SELECTOR).click();
        cy.get(PLAY_BUTTON_SELECTOR).click();
        cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "3");
      });
    });
  });
});

describe("Switch beats", () => {
  describe("On app loading", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(SWITCH_BEATS_SELECTOR).click();
    });
    it("should switch the beats on click", () => {
      cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "4");
      cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "3");
    });
    it("should switch the beats the switch them again on two clicks", () => {
      cy.get(SWITCH_BEATS_SELECTOR).click();
      cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "3");
      cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "4");
    });
  });

  describe("On app playing", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(SWITCH_BEATS_SELECTOR).click();
    });

    it("should switch the beats on click", () => {
      cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "4");
      cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "3");
    });
    it("should switch the beats the switch them again on two clicks", () => {
      cy.get(SWITCH_BEATS_SELECTOR).click();
      cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "3");
      cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "4");
    });
  });

  describe("On app playing and stopping", () => {
    beforeEach(() => {
      cy.visit(URL);
      cy.get(PLAY_BUTTON_SELECTOR).click();
    });

    it("should switch the beats on click", () => {
      cy.get(SWITCH_BEATS_SELECTOR).click();
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "4");
      cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "3");
    });
    it("should switch the beats the switch them again on two clicks", () => {
      cy.get(SWITCH_BEATS_SELECTOR).click().click();
      cy.get(PLAY_BUTTON_SELECTOR).click();
      cy.get(AGAINST_BEAT_VALUE_SELECTOR).should("have.value", "3");
      cy.get(BASE_BEAT_VALUE_SELECTOR).should("have.value", "4");
    });
  });
});
