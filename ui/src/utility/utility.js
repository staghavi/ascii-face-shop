export function JSONStreamToArray (jsonStream) {
  	return jsonStream.split('\n')
          					 .filter(Boolean)
          					 .map(json => JSON.parse(json));
}

export function getInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function throttle (func, limit) {
    let inThrottle;
    let lastFunc;
    let lastRan;
    return () => {
        const context = this;
        const args = arguments;
        if (!inThrottle) {
            func.apply(context, args);
            lastRan = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
              if ((Date.now() - lastRan) >= limit) {
                func.apply(context, args);
                lastRan = Date.now();
              }
            }, limit - (Date.now() - lastRan))
        }
    }
}