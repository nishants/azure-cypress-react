const SCROLL_PROCESS_DELAY_MS = 10;

let listeners = [];

const processScrollEvent = event => listeners.forEach(l => l(event));

const createWindowListener = newListener => {
  listeners.push(newListener);
  return {
    destroy: () => {
      listeners = listeners.filter(l => l === newListener);
    }
  };
};

const ScrollListener = {
  $window: createWindowListener
};

const throttled = callback => {
  let nextCall;

  return event => {
    if (nextCall) clearTimeout(nextCall);
    nextCall = setTimeout(() => callback(event), SCROLL_PROCESS_DELAY_MS);
  };
};

window.addEventListener('scroll', throttled(processScrollEvent), false);

export default ScrollListener;
