import { htmlPage } from "./setup";

describe("App", () => {
  it("should exists", () => {
    const app = htmlPage.querySelector(".app");
    expect(app).toBeTruthy();
  });

  it("should have a title", () => {
    const title = htmlPage.querySelector("title");
    expect(title.textContent).toBe("Polyrhythmic Metronome PWA");
  });
});
