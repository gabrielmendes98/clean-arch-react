import { checkEquals, sum } from './sum';

test('sum method', () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(5, 2)).toEqual(7);
});

test('check equals method', () => {
  expect(checkEquals(1, 1)).toBeTruthy();
  expect(checkEquals(1, 2)).toBeFalsy();
});
