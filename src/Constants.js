class Constants{
    static width = null;
    static height = null;
    static mapSize = {x: 15, y:10}
    static tileSize = null;
    static margin = 10;
    static halfMargin = this.margin / 2;
    
    static directionalControlCoordinates = [];
    static behaviorButtonCoordinates = {};
    
    static update(){
      let smallerDimension = this.height > this.width ? this.width : this.height;
      let smallestTileAmmount = this.mapSize.x < this.mapSize.y ? this.mapSize.x : this.mapSize.y;
      this.tileSize = (smallerDimension - 20) / smallestTileAmmount;
    }
}

const DIRECTIONS = {
    0: "E",
    1: "SE",
    2: "S",
    3: "SW",
    4: "W",
    5: "NW",
    6: "N",
    7: "NE"
  }