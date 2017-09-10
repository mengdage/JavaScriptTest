function MyPromise(fn) {
  var value = null,
      status = 'pending',
      callbacks = []; // array for callback functions registered by .then()

  this.then = function(onFulfilled) {

    return new Promise(function(resolve) {
      handle({
        onFulfilled: onFulfilled || null,
        resolve: resolve
      });
    });
  };

  function handle(callback) {
    if(state === 'pending') {
      callbacks.push(callback);
      return;
    }

    if(!callback.onFulfilled) {
      callback.resolve(value);
      return;
    }

    var ret = callback.onFulfilled(value);
    callback.resolve(ret);
  }

  function resolve(newValue) {
    if(newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
      var then = newValue.then;
      if(typeof then === 'function') {
        then.call(newValue, resolve);
        return;
      }
    }
    value = newValue;
    state = 'fulfilled';
    setTimeout(function() {
      callbacks.forEach(function(callback) {
        callback(value);
      });
    }, 0);
  }

  fn(resolve);
}
