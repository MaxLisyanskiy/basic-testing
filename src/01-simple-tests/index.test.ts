// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const value = simpleCalculator({ a: 4, b: 2, action: Action.Add });
    expect(value).toBe(6);
  });

  test('should subtract two numbers', () => {
    const value = simpleCalculator({ a: 4, b: 2, action: Action.Subtract });
    expect(value).toBe(2);
  });

  test('should multiply two numbers', () => {
    const value = simpleCalculator({ a: 4, b: 2, action: Action.Multiply });
    expect(value).toBe(8);
  });

  test('should divide two numbers', () => {
    const value = simpleCalculator({ a: 4, b: 2, action: Action.Divide });
    expect(value).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const value = simpleCalculator({ a: 4, b: 2, action: Action.Exponentiate });
    expect(value).toBe(16);
  });

  test('should return null for invalid action', () => {
    const value = simpleCalculator({ a: 4, b: 2, action: Action });
    expect(value).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const value = simpleCalculator({ a: null, b: 2, action: Action.Add });
    expect(value).toBeNull();
  });
});
