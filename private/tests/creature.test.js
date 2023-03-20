/* eslint-disable no-undef */
const Creature = require('../game/Creature');
const Coordinate = require('../game/Coordinate');

describe('Creature criation', () => {
  test('Creature has the right starting parameters', () => {
    const coordinate = new Coordinate(2, 1);
    const creature = new Creature(coordinate);
    expect(creature.coordinate.x).toBe(2);
    expect(creature.coordinate.y).toBe(1);
    expect(creature.life).toBe(3);
    expect(creature.energy).toBe(0);
    expect(creature.range).toBe(3);
  });

  test('Creature moves to adjacent tile', () => {
    const coordinate1 = new Coordinate(2, 1);
    const coordinate2 = new Coordinate(2, 2);
    const coordinate3 = new Coordinate(4, 5);

    const creature = new Creature(coordinate1);

    expect(creature.move(coordinate2)).toBe(true);
    expect(creature.coordinate).toEqual(coordinate2);
    expect(creature.move(coordinate3)).toBe(false);
    expect(creature.coordinate).toEqual(coordinate2);
  });

  test('Move creature to out of bounds', () => {
    const coordinate1 = new Coordinate(0, 0);
    const coordinate2 = new Coordinate(-1, 0);

    const creature = new Creature(coordinate1);

    expect(creature.move(coordinate2)).toBe(false);
    expect(creature.coordinate).toEqual(coordinate1);
  });
});

describe('Creature ranging and attacking', () => {
  test('Creature is in range', () => {
    const coordinate = new Coordinate(2, 1);
    const creature = new Creature(coordinate);
    creature.gainEnergy();

    const coordinate2 = new Coordinate(2, 3);
    const creature2 = new Creature(coordinate2);

    expect(creature.attack(creature2)).toBe(true);
    expect(creature.life).toBe(3);
    expect(creature2.life).toBe(2);
    expect(creature.energy).toBe(0);
    expect(creature.range).toBe(3);
  });

  test('Creature is out of range', () => {
    const coordinate = new Coordinate(2, 1);
    const creature = new Creature(coordinate);
    creature.gainEnergy();

    const coordinate2 = new Coordinate(6, 7);
    const creature2 = new Creature(coordinate2);

    expect(creature.attack(creature2)).toBe(false);
    expect(creature.life).toBe(3);
    expect(creature2.life).toBe(3);
    expect(creature.energy).toBe(1);
    expect(creature.range).toBe(3);
  });

  test('Creature is attacking itself', () => {
    const coordinate = new Coordinate(2, 1);
    const creature = new Creature(coordinate);
    creature.gainEnergy();

    expect(creature.attack(creature)).toBe(false);
    expect(creature.life).toBe(3);
    expect(creature.energy).toBe(1);
    expect(creature.range).toBe(3);
  });
});

describe('Creature evolving and managing energy', () => {
  test('Creature is evolving without energy', () => {
    const coordinate = new Coordinate(2, 1);
    const creature = new Creature(coordinate);

    expect(creature.evolve()).toBe(false);
    expect(creature.life).toBe(3);
    expect(creature.energy).toBe(0);
    expect(creature.range).toBe(3);
  });

  test('Creature is evolving with enough energy', () => {
    const coordinate = new Coordinate(2, 1);
    const creature = new Creature(coordinate);
    creature.gainEnergy();

    expect(creature.evolve()).toBe(true);
    expect(creature.life).toBe(3);
    expect(creature.energy).toBe(0);
    expect(creature.range).toBe(4);
  });

  test('Creature is giving energy while having energy and in range', () => {
    const coordinate = new Coordinate(2, 1);
    const creature = new Creature(coordinate);
    creature.gainEnergy();

    const coordinate2 = new Coordinate(2, 3);
    const creature2 = new Creature(coordinate2);

    expect(creature.giveEnergy(creature2)).toBe(true);
    expect(creature.life).toBe(3);
    expect(creature2.life).toBe(3);
    expect(creature.energy).toBe(0);
    expect(creature2.energy).toBe(1);
  });

  test('Creature is giving energy while having energy but out of range', () => {
    const coordinate = new Coordinate(2, 1);
    const creature = new Creature(coordinate);
    creature.gainEnergy();

    const coordinate2 = new Coordinate(6, 7);
    const creature2 = new Creature(coordinate2);

    expect(creature.giveEnergy(creature2)).toBe(false);
    expect(creature.life).toBe(3);
    expect(creature2.life).toBe(3);
    expect(creature.energy).toBe(1);
    expect(creature2.energy).toBe(0);
  });

  test('Creature is trying to give energy without having it', () => {
    const coordinate = new Coordinate(2, 1);
    const creature = new Creature(coordinate);

    const coordinate2 = new Coordinate(2, 3);
    const creature2 = new Creature(coordinate2);

    expect(creature.giveEnergy(creature2)).toBe(false);
    expect(creature.life).toBe(3);
    expect(creature2.life).toBe(3);
    expect(creature.energy).toBe(0);
    expect(creature2.energy).toBe(0);
  });

  test('Creature is trying to give energy to itself', () => {
    const coordinate = new Coordinate(2, 1);
    const creature = new Creature(coordinate);

    expect(creature.giveEnergy(creature)).toBe(false);
    expect(creature.life).toBe(3);
    expect(creature.energy).toBe(0);
  });
});
