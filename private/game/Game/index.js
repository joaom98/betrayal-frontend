const Player = require('../Player');
const Coordinate = require('../Coordinate');
const Creature = require('../Creature');

class Game {
  constructor() {
    this.mapSizeX = 10;
    this.mapSizeY = 10;
    this.players = [];
  }

  addPlayer(id, name, color) {
    let startingCoordinate = null;
    do {
      startingCoordinate = new Coordinate(
        Math.floor(Math.random() * this.mapSizeX),
        Math.floor(Math.random() * this.mapSizeY),
      );
    } while (this.coordinateIsUsed(startingCoordinate));

    const creature = new Creature(startingCoordinate);
    const player = new Player(id, name, color, creature);
    this.players.push(player);
  }

  getPlayer(id) {
    return this.players.find((player) => player.id === id);
  }

  getPlayerUsingCoordinates(coordinate) {
    return this.players.find((player) => player.getCreature().coordinate.equals(coordinate));
  }

  action(id, coordinate, action) {
    const player = this.getPlayer(id);

    if (!player) {
      return false;
    }

    const creature = player.getCreature();
    const target = this.getPlayerUsingCoordinates(coordinate)?.getCreature();

    if (!creature) {
      return false;
    }

    if (action === 'primary') {
      if (target) {
        return creature.attack(target);
      }

      return creature.move(coordinate);
    }
    if (action === 'secondary') {
      if (target) {
        if (target.equals(creature)) {
          return creature.evolve();
        }
        return creature.giveEnergy(target);
      }
    }
    return false;
  }

  getGameState() {
    const flat = [];
    this.players.forEach((player) => {
      flat.push(player.flatten());
    });
    return flat;
  }

  coordinateIsUsed(coordinate) { // optimize later
    let result = false;

    this.players.forEach((player) => {
      if (player.creature.coordinate.equals(coordinate)) {
        result = true;
      }
    });

    return result;
  }

  removePlayer(id) {
    const player = this.getPlayer(id);
    if (player) {
      const index = this.players.indexOf(player);
      this.players.splice(index, 1);
      return true;
    }
    return false;
  }

  giveEnergyToPlayers() {
    this.players.forEach((player) => {
      player.getCreature().gainEnergy();
    });
  }

  log() {
    this.players.forEach((player) => {
      console.log(player);
    });
  }
}

module.exports = Game;
