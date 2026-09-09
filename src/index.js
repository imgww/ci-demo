// 程序入口：用于演示 start / build 之后的运行效果
import { add, multiply, isPositive } from './math.js';

const lines = [
  '2 + 3 = ' + add(2, 3),
  '2 x 3 = ' + multiply(2, 3),
  'isPositive(5) = ' + isPositive(5),
];

console.log(lines.join('\n'));

// 浏览器环境：把计算结果渲染到页面
if (typeof document !== 'undefined') {
  const output = document.getElementById('output');
  if (output) output.textContent = lines.join('\n');
}