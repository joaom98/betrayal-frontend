class Player {
  constructor(id, name, color, creature = null) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.creature = creature;
  }

  getCreature() {
    return this.creature;
  }

  flatten() {
    return {
      // Remove the ID after testing
      id: this.id,
      name: this.name,
      color: this.color,
      creatureStatus: this.creature.status,
      coordinates: {
        x: this.creature.coordinate.x,
        y: this.creature.coordinate.y,
      },
      health: this.creature.health,
      energy: this.creature.energy,
      range: this.creature.range,
    };
  }
}

module.exports = Player;
