var x = [];

for(let i = 0; i <10; i++){
  x.push(Math.ceil(Math.random()*10));
}

console.log('min: ' + Math.min(...x));
console.log('max: ' + Math.max(...x));
