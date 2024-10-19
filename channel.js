export const createChannel = () => {
  let queue = [];
  let resolve;
  let reject;
  const set = (resolve_, reject_) => {
    resolve = resolve_;
    reject = reject_;
  };
  let promise = Promise.resolve();
  const newPromise = () => {
    const p = new Promise(set);
    promise = promise.then(() => p);
    promise.then(newPromise);
  };
  newPromise();
  const receive = () => {
    if (queue.length > 0) {
      return Promise.resolve(queue.shift());
    } else {
      return promise.then(receive);
    }
  };
  return {
    receive,
    send(value) {
      queue.push(value);
      resolve();
    },
    reject(error) {
      queue.push = () => {
        throw error;
      };
      reject(error);
    },
  };
};
