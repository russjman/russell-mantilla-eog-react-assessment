import { useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();
  let id = null;

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function initiateInterval() {
      clearInterval(id);
      if (delay !== null) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        id = setInterval(tick, delay);
      }
    }

    function tick() {
      clearInterval(id);
      savedCallback.current();
      initiateInterval();
    }

    if (delay !== null) {
      initiateInterval();
      return () => clearInterval(id);
    }
    return () => {
      clearInterval(id);
    };
  }, [delay]);
}

export default useInterval;
