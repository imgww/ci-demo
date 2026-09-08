import { test } from 'node:test';
import assert from 'node:assert/strict';
import { add, multiply, isPositive } from '../src/math.js';

test('add: 1 + 2 equals 3', () => {
  assert.equal(add(1, 2), 3);
});

test('add: handles negative numbers', () => {
  assert.equal(add(-1, -5), -6);
});

test('multiply: 3 * 4 equals 12', () => {
  assert.equal(multiply(3, 4), 12);
});

test('isPositive: 5 is positive', () => {
  assert.equal(isPositive(5), true);
});

test('isPositive: 0 is NOT positive', () => {
  assert.equal(isPositive(0), false);
});