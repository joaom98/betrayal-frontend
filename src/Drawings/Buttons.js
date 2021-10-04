function drawBehaviorControls(){
    
    let buttonPositionY = Constants.height - Constants.tileSize * 2;
    /*
    Constants.behaviorButtonCoordinates = {
        ATTACK: {
            x1: Constants.tileSize * Constants.mapSize.x * 1.05,
            y1: buttonPositionY,
            x2: ,
            y2: ,
        },
        GIVE_ENERGY: {
            x1: Constants.tileSize * (Constants.mapSize.x + 2) * 1.05,
            y1: buttonPositionY,
            x2: ,
            y2: ,
        }
    }
    */

    strokeWeight(3);
    stroke("black")
    fill("red")
    let x = Constants.tileSize * Constants.mapSize.x * 1.05;
    let y = buttonPositionY;
    let w = Constants.tileSize * 2;
    let h = Constants.tileSize;
    Constants.behaviorButtonCoordinates.ATTACK = {
        x1: x,
        y1: y,
        x2: x + w,
        y2: y + h
    }
    rect(x, y, w, h)
    textSize(Constants.tileSize / 3);
    textAlign(CENTER, CENTER);
    fill("black")
    noStroke();
    text("ATTACK",Constants.tileSize * (Constants.mapSize.x + 1) * 1.05, buttonPositionY + Constants.tileSize/2)
  
    strokeWeight(3);
    stroke("black")
    fill("green")
    x = Constants.tileSize * (Constants.mapSize.x + 2) * 1.05;
    y = buttonPositionY;
    w = Constants.tileSize * 2;
    h = Constants.tileSize;
    Constants.behaviorButtonCoordinates.GIVE_ENERGY = {
        x1: x,
        y1: y,
        x2: x + w,
        y2: y + h
    }
    rect(x, y, w , h);
    textSize(Constants.tileSize / 3);
    textAlign(CENTER, CENTER);
    fill("black")
    noStroke();
    text("GIVE\nENERGY",Constants.tileSize * (Constants.mapSize.x + 3) * 1.05, buttonPositionY + Constants.tileSize/2)
  
  }
  