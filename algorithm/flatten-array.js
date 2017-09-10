const nested = [
  [1,2,3],
  4,
  [5,6,7],
  {a:1, b:2},
  8
];
var list = [1, 2, 3, [[4]], [[[5]]], [6], [[7]]];

function flatten(arr) {
  const result = [];
  flattenHelper(arr);

  function flattenHelper(entity) {
    if(Array.isArray(entity)) {
      for(let item of entity) {
        flattenHelper(item);
      }
    } else {
      result.push(entity);
    }
  }
  return result;
}

//
function flatten2(arr) {
  let result = [];
  for(let item of arr) {
    if(Array.isArray(item)) {
      result = result.concat(flatten2(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

console.log(flatten(nested));
console.log(flatten(list));
console.log(flatten2(nested));
console.log(flatten2(list));
