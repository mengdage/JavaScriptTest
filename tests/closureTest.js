var Quo = function(s) {
  this.status = s
};

Quo.prototype.getStatus = function() {
  return this.status;
}

var myQuo = new Quo('hello');
console.log(myQuo.getStatus());
console.log(myQuo.status);

console.log('------------------------------------');

var quo = function(s) {
  var status = s;
  return {
    getStatus: function() {
      return status;
    }
  };
}

var myQuo2 = quo('world');
var myQuo5 = quo('world2');

console.log(myQuo2.getStatus());
console.log(myQuo5.getStatus());
console.log(myQuo2.status);

console.log('------------------------------------');


var Quo2 = function(s) {
  var status = s
  this.getStatus = function() {
    return status;
  }
};

var myQuo3 = new Quo2('hello');
var myQuo4 = new Quo2('hello2');
console.log(myQuo3.getStatus());
console.log(myQuo4.getStatus());
console.log(myQuo3.status);
console.log(myQuo4.status);
