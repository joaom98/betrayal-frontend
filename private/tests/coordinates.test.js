/* eslint-disable no-undef */
const Coordinate = require('../game/Coordinate');

describe('Coordinate tests', () => {
  test('Coordinate contains (2,1) values', () => {
    const coordinate = new Coordinate(2, 1);
    expect(coordinate.x).toBe(2);
    expect(coordinate.y).toBe(1);
  });

  // set invalid coordinates and get error

  test('See if coordinates are adjacent', () => {
    const coordinate1 = new Coordinate(2, 1);
    const coordinate2 = new Coordinate(2, 2);
    const coordinate3 = new Coordinate(4, 5);

    expect(coordinate1.isAdjacentTo(coordinate2)).toBe(true);
    expect(coordinate2.isAdjacentTo(coordinate1)).toBe(true);
    expect(coordinate1.isAdjacentTo(coordinate3)).toBe(false);
    expect(coordinate2.isAdjacentTo(coordinate3)).toBe(false);
    expect(coordinate3.isAdjacentTo(coordinate1)).toBe(false);
    expect(coordinate3.isAdjacentTo(coordinate2)).toBe(false);
  });

  test('Coordinate is in range', () => {
    const coordinate1 = new Coordinate(2, 1);
    const coordinate2 = new Coordinate(2, 2);
    const coordinate3 = new Coordinate(4, 5);

    expect(coordinate1.isInRange(coordinate2, 1)).toBe(true);
    expect(coordinate1.isInRange(coordinate2, 2)).toBe(true);
    expect(coordinate1.isInRange(coordinate2, 3)).toBe(true);
    expect(coordinate3.isInRange(coordinate1, 4)).toBe(true);
  });

  test('Coordinate is not in range', () => {
    const coordinate1 = new Coordinate(2, 1);
    const coordinate3 = new Coordinate(4, 5);

    expect(coordinate3.isInRange(coordinate1, 1)).toBe(false);
    expect(coordinate1.isInRange(coordinate3, 3)).toBe(false);
  });
});
