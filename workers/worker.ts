let timerID: string | number | NodeJS.Timer = null;
let interval = 100;

self.onmessage = (e) => {
  if (e.data == "start") {
    console.log("---->//WORKER: starting");
    timerID = setInterval(function () {
      postMessage("tick");
    }, interval);
  } else if (e.data.interval) {
    interval = e.data.interval;
    console.log("----WORKER: on load ---- the interval is " + interval);

    if (timerID) {
      clearInterval(timerID);
      timerID = setInterval(function () {
        postMessage("tick");
      }, interval);
    }
  } else if (e.data == "stop") {
    console.log("<----//WORKER: stopping");
    clearInterval(timerID);
    timerID = null;
  }
};

postMessage("hi there");
