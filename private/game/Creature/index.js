class Creature {
  constructor(startingCoordinate) {
    this.coordinate = startingCoordinate;
    this.status = 'alive';
    this.health = 3;
    this.energy = 2;
    this.range = 3;
  }

  move(toCoordinate, cost = 1) {
    if (!this.coordinate.isAdjacentTo(toCoordinate)
        || !toCoordinate.isValid()
        || this.energy === 0
    ) {
      return false;
    }

    this.loseEnergy(cost);
    this.coordinate = toCoordinate;
    return true;
  }

  attack(enemy) {
    if (enemy.coordinate.isInRange(this.coordinate, this.range)
            && this !== enemy) {
      this.loseEnergy(1);
      enemy.loseHealth();
      return true;
    }
    return false;
  }

  evolve(cost = 1) {
    if (this.loseEnergy(cost)) {
      this.range += 1;
      return true;
    }
    return false;
  }

  giveEnergy(thatCreature) {
    if (this.coordinate.isInRange(thatCreature.coordinate, this.range) && this.energy > 0) {
      this.loseEnergy();
      thatCreature.gainEnergy();
      return true;
    }
    return false;
  }

  equals(creature) {
    return (this.status === creature.status
      && this.health === creature.health
      && this.energy === creature.energy
      && this.range === creature.range
      && this.coordinate.equals(creature.coordinate));
  }

  gainEnergy(quantity = 1, cap = 5) {
    if (this.energy < cap) {
      this.energy += quantity;
    }

    this.energy = this.energy > cap ? cap : this.energy;
  }

  loseEnergy(quantity = 1) {
    if (this.energy >= quantity) {
      this.energy -= quantity;
      return true;
    }
    return false;
  }

  getHealth(quantity = 1) {
    this.health += quantity;
  }

  loseHealth(quantity = 1) {
    this.health -= quantity;
    if (this.health <= 0) {
      this.status = 'dead';
    }

    this.health = this.health < 0 ? 0 : this.health;
  }
}

module.exports = Creature;
