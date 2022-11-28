const INSPECTOR = "canvas-inspector";
const INSPECTOR_TOGGLE_BUTTON = "canvas-inspector__toggle-button";
const INSPECTOR_TOGGLE_BUTTON_TEXT_SHOW = "Show grid";
const INSPECTOR_TOGGLE_BUTTON_TEXT_HIDE = "Hide grid";
const CANVAS = ".gui-container__canvas";
const SELECT = "grid-select";
const OPTION_0 = "--select a value";
const OPTION_1 = "10";
const OPTION_2 = "20";
const OPTION_3 = "50";
const OPTION_4 = "100";
const DIV_X = "divX";
const DIV_Y = "divY";
const SHOW = "-show";

class CanvasInspector {
  canvasInspector: HTMLDivElement;

  originalCanvas: HTMLCanvasElement;
  originalCanvasWidth: number;
  originalCanvasHeight: number;

  grid: HTMLCanvasElement;
  gridContext: any;
  gridTop: number;
  gridCellSize: number;

  toggleButton: HTMLButtonElement;
  isToggleButtonClicked: boolean;
  select: HTMLSelectElement;
  option1: HTMLOptionElement;
  option2: HTMLOptionElement;
  option3: HTMLOptionElement;
  option4: HTMLOptionElement;
  option0: HTMLOptionElement;
  divX: HTMLDivElement;
  divY: HTMLDivElement;
  cursorX: number;
  cursorY: number;
  gridLeft: number;

  constructor() {
    this.canvasInspector = document.createElement("div");
    this.canvasInspector.classList.add(INSPECTOR);
    document.body.appendChild(this.canvasInspector);

    this.isToggleButtonClicked = false;

    this.toggleButton = document.createElement("button");
    this.toggleButton.setAttribute("type", "button");
    this.toggleButton.classList.add(INSPECTOR_TOGGLE_BUTTON);
    this.toggleButton.innerText = INSPECTOR_TOGGLE_BUTTON_TEXT_SHOW;
    this.toggleButton.addEventListener("click", () => {
      if (this.isToggleButtonClicked === false) {
        this.isToggleButtonClicked = true;
        this.showInspector();
      } else {
        this.isToggleButtonClicked = false;
        this.hideInspector();
      }
    });
    this.canvasInspector.appendChild(this.toggleButton);

    this.select = document.createElement("select");
    this.select.classList.add(SELECT);

    this.option0 = document.createElement("option");
    this.option0.value = "";
    this.option0.label = OPTION_0;
    this.option1 = document.createElement("option");
    this.option1.value = OPTION_1;
    this.option1.label = OPTION_1;
    this.option2 = document.createElement("option");
    this.option2.value = OPTION_2;
    this.option2.label = OPTION_2;
    this.option3 = document.createElement("option");
    this.option3.value = OPTION_3;
    this.option3.label = OPTION_3;
    this.option4 = document.createElement("option");
    this.option4.value = OPTION_4;
    this.option4.label = OPTION_4;

    this.select.appendChild(this.option0);
    this.select.appendChild(this.option1);
    this.select.appendChild(this.option2);
    this.select.appendChild(this.option3);
    this.select.appendChild(this.option4);

    this.canvasInspector.appendChild(this.select);

    this.originalCanvas = document.querySelector(CANVAS);
    this.originalCanvasWidth = this.originalCanvas.width;
    this.originalCanvasHeight = this.originalCanvas.height;

    this.grid = document.createElement("canvas");
    this.gridContext = this.grid.getContext("2d");
    document.body.appendChild(this.grid);

    this.grid.style.position = "absolute";
    this.gridTop = this.originalCanvas.getBoundingClientRect().top;
    this.grid.style.top = `${this.gridTop}px`;
    this.gridLeft = this.originalCanvas.getBoundingClientRect().left;
    this.grid.style.left = `${this.gridLeft}px`;

    this.grid.height = this.originalCanvasHeight;
    this.grid.width = this.originalCanvasWidth;

    this.select.addEventListener("change", (event) => {
      let eventTarget = event.target as HTMLInputElement;
      this.gridCellSize = Number(eventTarget.value);
      this.makeGrid();
    });

    this.divX = document.createElement("div");
    this.divX.classList.add(DIV_X);
    this.canvasInspector.appendChild(this.divX);

    this.divY = document.createElement("div");
    this.divY.classList.add(DIV_Y);
    this.canvasInspector.appendChild(this.divY);

    window.addEventListener("mousemove", (event) => {
      let rect = this.grid.getBoundingClientRect();
      this.cursorX = event.clientX - rect.left;
      this.cursorY = event.clientY - rect.top;

      if (this.cursorY >= 0) {
        this.divX.innerHTML = `X: ${this.cursorX}`;
        this.divY.innerText = `Y: ${this.cursorY}`;
      } else {
        this.divX.innerHTML = "X: ";
        this.divY.innerText = "Y: ";
      }
    });

    window.addEventListener("resize", () => this.resize());
  }
  private showInspector(): void {
    this.toggleButton.innerText = INSPECTOR_TOGGLE_BUTTON_TEXT_HIDE;
    this.makeGrid();
    this.canvasInspector.classList.add(SHOW);
    this.select.classList.add(SHOW);
    this.divX.classList.add(SHOW);
    this.divY.classList.add(SHOW);
  }

  private hideInspector(): void {
    this.gridContext.reset(); // Clear the context!
    this.toggleButton.innerText = INSPECTOR_TOGGLE_BUTTON_TEXT_SHOW;
    this.canvasInspector.classList.remove(SHOW);
    this.select.classList.remove(SHOW);
    this.divX.classList.remove(SHOW);
    this.divY.classList.remove(SHOW);
  }

  private makeGrid(): void {
    this.gridContext.reset(); // Clear the context!
    for (var x = 0; x <= this.grid.width; x += this.gridCellSize) {
      this.gridContext.moveTo(0.5 + x, 0);
      this.gridContext.lineTo(0.5 + x, this.grid.height);
    }
    for (var j = 0; j <= this.grid.height; j += this.gridCellSize) {
      this.gridContext.moveTo(0, this.gridCellSize + j);
      this.gridContext.lineTo(this.grid.width, this.gridCellSize + j);
    }
    this.gridContext.stroke();
    this.gridContext.strokeStyle = "black";
  } 

  private resize(): void {
    this.gridTop = this.originalCanvas.getBoundingClientRect().top;
    this.grid.style.top = `${this.gridTop}px`;
    this.gridLeft = this.originalCanvas.getBoundingClientRect().left;
    this.grid.style.left = `${this.gridLeft}px`;
    
    if (this.isToggleButtonClicked === false) {
      this.isToggleButtonClicked = false;
      this.hideInspector();
    } else {
      this.isToggleButtonClicked = true;
      this.showInspector();
    }
  }
}

export default CanvasInspector;
