import { htmlPage } from "./setup";

const LOGO_SELECTOR = ".Logo";
const LOGO_CHILD_SPAN_SELECTOR = ".Logo > span";

describe("Logo", () => {
  it("should exists", () => {
    const logo = htmlPage.querySelector(LOGO_SELECTOR);
    expect(logo).toBeTruthy();
  });

  it("should have a child span", () => {
    const innerSpan = htmlPage.querySelector(LOGO_CHILD_SPAN_SELECTOR);
    expect(innerSpan).toBeTruthy();
  })

  it("should have a label", () => {
    const logo = htmlPage.querySelector(LOGO_SELECTOR);
    expect(logo.textContent.trim()).toBe("Poly Tock");
  });
});
