let timerID = null;
let interval = 100;

self.onmessage = (e) => {
  if (e.data == "start") {
    console.log("---->//WORKER: starting");

    timerID = setInterval(() => {
      postMessage("tick");
    }, interval);
  } else if (e.data.interval) {
    console.log("----WORKER: on load ----");
    interval = e.data.interval;

    if (timerID) {
      clearInterval(timerID);
      timerID = setInterval(() => {
        postMessage("tick");
      }, interval);
    }
  } else if (e.data == "stop") {
    console.log("<----//WORKER: stopping");
    clearInterval(timerID);
    timerID = null;
  }
};
