import {
  URL,
  BPM_MINUS_1_SELECTOR,
  BPM_MINUS_5_SELECTOR,
  BPM_VALUE_SELECTOR,
  BPM_PLUS_1_SELECTOR,
  BPM_PLUS_5_SELECTOR,
  PLAY_BUTTON_SELECTOR
} from "../../constants";

describe("Bpm", () => {
  describe("on app loading", () => {
    describe("Button -1", () => {
      it("should subtract 1 to input value on click", () => {
        cy.visit(URL);
        cy.get(BPM_MINUS_1_SELECTOR).click();
        cy.get(BPM_VALUE_SELECTOR).should("have.value", "119");
      });
    });
    describe("Button -5", () => {
      it("should subtract 5 to input value on click", () => {
        cy.visit(URL);
        cy.get(BPM_MINUS_5_SELECTOR).click();
        cy.get(BPM_VALUE_SELECTOR).should("have.value", "115");
      });
    });
    describe("Input", () => {
      beforeEach(() => {
        cy.visit(URL);
      });
      it("Input should receive focus after click", () => {
        cy.get(BPM_VALUE_SELECTOR).click().should("have.focus");
      });
      it("should set value to 30 after inputting a number < 30", () => {
        cy.get(BPM_VALUE_SELECTOR)
          .clear()
          .type("29{enter}")
          .should("have.value", "30");
      });
      it("should set value to 30 after inputting a number = 30", () => {
        cy.get(BPM_VALUE_SELECTOR)
          .clear()
          .type("30{enter}")
          .should("have.value", "30");
      });
      it("should set value to the number entered after inputting a number > 30 and < 300", () => {
        cy.get(BPM_VALUE_SELECTOR)
          .clear()
          .type("31{enter}")
          .should("have.value", "31");
      });
      it("should set value to 300 after inputting a number = 300", () => {
        cy.get(BPM_VALUE_SELECTOR)
          .clear()
          .type("300{enter}")
          .should("have.value", "300");
      });
      it("should set value to 300 after inputting a number > 300", () => {
        cy.get(BPM_VALUE_SELECTOR)
          .clear()
          .type("301{enter}")
          .should("have.value", "300");
      });
    });
    describe("Button +1", () => {
      it("should subtract 1 to input value on click", () => {
        cy.visit(URL);
        cy.get(BPM_PLUS_1_SELECTOR).click();
        cy.get(BPM_VALUE_SELECTOR).should("have.value", "121");
      });
    });
    describe("Button +5", () => {
      it("should subtract 5 to input value on click", () => {
        cy.visit(URL);
        cy.get(BPM_PLUS_5_SELECTOR).click();
        cy.get(BPM_VALUE_SELECTOR).should("have.value", "125");
      });
    });
  });
  describe("on app playing", () => {
    describe("Button -1", () => {
      it("should subtract 1 to input value on click", () => {
        cy.visit(URL);
        cy.get(PLAY_BUTTON_SELECTOR).click();    
        cy.get(BPM_MINUS_1_SELECTOR).click();
        cy.get(BPM_VALUE_SELECTOR).should("have.value", "119");
      });
    });
    describe("Button -5", () => {
      it("should subtract 5 to input value on click", () => {
        cy.visit(URL);
        cy.get(PLAY_BUTTON_SELECTOR).click();    
        cy.get(BPM_MINUS_5_SELECTOR).click();
        cy.get(BPM_VALUE_SELECTOR).should("have.value", "115");
      });
    });
    describe("Input", () => {
      beforeEach(() => {
        cy.visit(URL);
        cy.get(PLAY_BUTTON_SELECTOR).click();    
      });
      it("Input should receive focus after click", () => {
        cy.get(BPM_VALUE_SELECTOR).click().should("have.focus");
      });
      it("should set value to 30 after inputting a number < 30", () => {
        cy.get(BPM_VALUE_SELECTOR)
          .clear()
          .type("29{enter}")
          .should("have.value", "30");
      });
      it("should set value to 30 after inputting a number = 30", () => {
        cy.get(BPM_VALUE_SELECTOR)
          .clear()
          .type("30{enter}")
          .should("have.value", "30");
      });
      it("should set value to the number entered after inputting a number > 30 and < 300", () => {
        cy.get(BPM_VALUE_SELECTOR)
          .clear()
          .type("31{enter}")
          .should("have.value", "31");
      });
      it("should set value to 300 after inputting a number = 300", () => {
        cy.get(BPM_VALUE_SELECTOR)
          .clear()
          .type("300{enter}")
          .should("have.value", "300");
      });
      it("should set value to 300 after inputting a number > 300", () => {
        cy.get(BPM_VALUE_SELECTOR)
          .clear()
          .type("301{enter}")
          .should("have.value", "300");
      });
    });
    describe("Button +1", () => {
      it("should subtract 1 to input value on click", () => {
        cy.visit(URL);
        cy.get(PLAY_BUTTON_SELECTOR).click();    
        cy.get(BPM_PLUS_1_SELECTOR).click();
        cy.get(BPM_VALUE_SELECTOR).should("have.value", "121");
      });
    });
    describe("Button +5", () => {
      it("should subtract 5 to input value on click", () => {
        cy.visit(URL);
        cy.get(PLAY_BUTTON_SELECTOR).click();    
        cy.get(BPM_PLUS_5_SELECTOR).click();
        cy.get(BPM_VALUE_SELECTOR).should("have.value", "125");
      });
    });
  });
  describe("on app playing and stopping", () => {
    describe("Button -1", () => {
      it("should subtract 1 to input value on click", () => {
        cy.visit(URL);
        cy.get(PLAY_BUTTON_SELECTOR).click();    
        cy.get(BPM_MINUS_1_SELECTOR).click();
        cy.get(PLAY_BUTTON_SELECTOR).click();    
        cy.get(BPM_VALUE_SELECTOR).should("have.value", "119");
      });
    });
    describe("Button -5", () => {
      it("should subtract 5 to input value on click", () => {
        cy.visit(URL);
        cy.get(PLAY_BUTTON_SELECTOR).click();    
        cy.get(BPM_MINUS_5_SELECTOR).click();
        cy.get(PLAY_BUTTON_SELECTOR).click();    
        cy.get(BPM_VALUE_SELECTOR).should("have.value", "115");
      });
    });
    describe("Input", () => {
      beforeEach(() => {
        cy.visit(URL);
        cy.get(PLAY_BUTTON_SELECTOR).click();    
      });
      it("Input should receive focus after click", () => {
        cy.get(BPM_VALUE_SELECTOR).click();
        cy.get(PLAY_BUTTON_SELECTOR).click();    
        cy.get(BPM_VALUE_SELECTOR).should("not.have.focus");
      });
      it("should set value to 30 after inputting a number < 30", () => {
        cy.get(BPM_VALUE_SELECTOR)
        .clear()
        .type("29{enter}")
        cy.get(PLAY_BUTTON_SELECTOR).click();    
        cy.get(BPM_VALUE_SELECTOR)
          .should("have.value", "30");
      });
      it("should set value to 30 after inputting a number = 30", () => {
        cy.get(BPM_VALUE_SELECTOR)
          .clear()
          .type("30{enter}")
        cy.get(PLAY_BUTTON_SELECTOR).click();    
        cy.get(BPM_VALUE_SELECTOR)
          .should("have.value", "30");
      });
      it("should set value to the number entered after inputting a number > 30 and < 300", () => {
        cy.get(BPM_VALUE_SELECTOR)
          .clear()
          .type("31{enter}")
        cy.get(PLAY_BUTTON_SELECTOR).click();    
        cy.get(BPM_VALUE_SELECTOR)
            .should("have.value", "31");
      });
      it("should set value to 300 after inputting a number = 300", () => {
        cy.get(BPM_VALUE_SELECTOR)
          .clear()
          .type("300{enter}")
        cy.get(PLAY_BUTTON_SELECTOR).click();    
        cy.get(BPM_VALUE_SELECTOR)
          .should("have.value", "300");
      });
      it("should set value to 300 after inputting a number > 300", () => {
        cy.get(BPM_VALUE_SELECTOR)
          .clear()
          .type("301{enter}")
        cy.get(PLAY_BUTTON_SELECTOR).click();    
        cy.get(BPM_VALUE_SELECTOR)
          .should("have.value", "300");
      });
    });
    describe("Button +1", () => {
      it("should subtract 1 to input value on click", () => {
        cy.visit(URL);
        cy.get(PLAY_BUTTON_SELECTOR).click();    
        cy.get(BPM_PLUS_1_SELECTOR).click();
        cy.get(PLAY_BUTTON_SELECTOR).click();    
        cy.get(BPM_VALUE_SELECTOR).should("have.value", "121");
      });
    });
    describe("Button +5", () => {
      it("should subtract 5 to input value on click", () => {
        cy.visit(URL);
        cy.get(PLAY_BUTTON_SELECTOR).click();    
        cy.get(BPM_PLUS_5_SELECTOR).click();
        cy.get(PLAY_BUTTON_SELECTOR).click();    
        cy.get(BPM_VALUE_SELECTOR).should("have.value", "125");
      });
    });
  });
});
