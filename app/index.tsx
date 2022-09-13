/* eslint-disable no-console */
console.log('yayo');

const myWorker = new Worker(new URL('../workers/worker.tsx', import.meta.url));

myWorker.postMessage(2);

let result: any;

console.log('myWorker', myWorker);

myWorker.onmessage = (e) => {
  result = e.data;
  console.log('Message receives from worker');
};

console.log('result is ', result);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}
