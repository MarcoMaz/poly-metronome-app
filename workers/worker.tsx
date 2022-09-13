/* eslint-disable no-console */
onmessage = (e) => {
  console.log('Message received from main script');
  const workerResult = `message back ${e.data * 8}`;
  console.log(workerResult);
  postMessage(workerResult);
};
