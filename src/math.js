// ci-demo 业务模块：一组纯函数，便于单元测试

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

export function isPositive(n) {
  return n > 0;
}