class Coordinate {
  constructor(x, y) {
    this.x = parseInt(x, 10);
    this.y = parseInt(y, 10);
  }

  isValid() {
    return (this.x > 0 && this.y > 0);
  }

  equals(thatCoordinate) {
    if (this.x === thatCoordinate.x
        && this.y === thatCoordinate.y) {
      return true;
    }
    return false;
  }

  isUpSameOrDown(thatCoordinate) {
    if (thatCoordinate.y === this.y + 1
        || thatCoordinate.y === this.y
        || thatCoordinate.y === this.y - 1) {
      return true;
    }
    return false;
  }

  isLeftMiddleOrRight(thatCoordinate) {
    if (thatCoordinate.x === this.x + 1
         || thatCoordinate.x === this.x
         || thatCoordinate.x === this.x - 1) {
      return true;
    }
    return false;
  }

  isAdjacentTo(thatCoordinate) {
    if ((this.isLeftMiddleOrRight(thatCoordinate))
        && (this.isUpSameOrDown(thatCoordinate))
     && !this.equals(thatCoordinate)) {
      return true;
    }
    return false;
  }

  isInRange(thatCoordinate, range) {
    if (this.x + range >= thatCoordinate.x && this.x - range <= thatCoordinate.x
            && this.y + range >= thatCoordinate.y && this.y - range <= thatCoordinate.y) {
      return true;
    }
    return false;
  }
}

module.exports = Coordinate;
