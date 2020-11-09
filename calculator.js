const {GPU} = require('gpu.js');
const gpu = new GPU();

let kernel = gpu.createKernel(function (){
  let result = 0;
  for (let i = this.thread.y; i < this.constants.size; i = i + 614400) {
    result = result + (((10 ** 10 - i) / (10 ** 10)) ** 2);
  }
  return result;
}, {constants: {size: 10 ** 10}, output: [10 ** 10 / 614400, 614400]});
kernel();

let constant = (2 / (10 ** 10 + 1));