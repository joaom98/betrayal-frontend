function drawCell(x, y) {

    fill('#FFF')
    strokeWeight(5);
    stroke(51);
    rect(x, y, Constants.tileSize, Constants.tileSize, 5)
  }
  
  function drawMap (){
    for(let i = 0 ; i < Constants.mapSize.x ; i ++){
      for (let j = 0; j < Constants.mapSize.y ; j++){
        drawCell( i*Constants.tileSize+ Constants.margin, j*Constants.tileSize+Constants.margin, Constants.tileSize);
      }
    }
  }
  
  function coordinateToTile(x, y){
    return {
      x: Constants.margin + x * Constants.tileSize,
      y: Constants.margin + y * Constants.tileSize
    }
  }
  
  function drawCreature ( tile, colorRGB = '#2A1', name = "Guest") {
    
    let tileX = tile.x + Constants.halfMargin;
    let tileY = tile.y + Constants.halfMargin;
    
    fill(colorRGB)
    noStroke();
    rect (
      tileX,
      tileY,
      Constants.tileSize- Constants.margin,
      Constants.tileSize- Constants.margin,
      Constants.tileSize * 0.2 );
  
    textAlign(CENTER, CENTER);
    textSize(Constants.tileSize/3);
    fill('#000')
    text( name, tile.x + Constants.tileSize / 2, tile.y + Constants.tileSize / 2 )
  }
  