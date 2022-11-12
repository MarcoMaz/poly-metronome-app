class Observable {
  public observers: any[];

  constructor() {
    this.observers = [];
  }

  public registerObserver(observer: any): void {
    this.observers.push(observer);
  }

  public unRegisterObserver(observer: any): void {
    this.observers = this.observers.filter((item) => item !== observer);
  }

  public notify(data: any): void {
    this.observers.forEach((observer) => observer(data));
  }
}

export default Observable;
