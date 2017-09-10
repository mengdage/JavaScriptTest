function solution(arr) {
  const bak = Array.from(arr);
  bak.sort();
  let dif = 0;
  for(let i = 0, len = arr.length; i < len ; i++) {
    if(arr[i] !== bak[i]) {
      dif++;
    }
  }

  return dif <=2;
}

function solution2(arr) {
  const bak = Array.from(arr);

  let left, right;

  for(right = arr.length; right > 0; right --) {
    if(bak[right] < bak[right-1]) {
      left = right -1;
      while(left >= 0 && bak[left] > bak[right]) {
        left --;
      }
      left++;
      let tmp = bak[left];
      bak[left] = bak[right];
      bak[right] = tmp;
      break;
    }
  }
  return bak;
}

function solution3(arr) {
  let flag = false;
  for(let i = 0, len = arr.length; i < len-1; i++) {
    if(arr[i] > arr[i+1]) {
      if(flag) {
        console.log(arr, i);
        return false
      };
      let first = i;
      let minValue = arr[i+1];
      let second = i+1;
      let j = i+1;
      while(j < len && arr[j] >=minValue) j++;

      if(j < len) {
        second = j;
      }

      console.log(arr);
      let temp = arr[first];
      arr[first] = arr[second];
      arr[second] = temp;
      console.log(arr);
      flag = true;
    }
  }
  return true;
}

const arr1 = [1,6,6,6,5,7,8];
console.log(solution(arr1));
console.log(solution3(arr1));
