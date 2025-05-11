import { generateLinkedList } from './index';

const elements = [2, 4, 6];

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList(elements);
    const validLinkedList = {
      value: 2,
      next: {
        value: 4,
        next: {
          value: 6,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };
    expect(result).toStrictEqual(validLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(elements);
    expect(result).toMatchSnapshot();
  });
});
