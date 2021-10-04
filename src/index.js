function setup(){
  Constants.width = Math.floor(windowWidth * 0.9);
  Constants.height = Math.floor(windowHeight * 0.9);
  createCanvas(Constants.width,Constants.height);
  Constants.update();
  background(200);
  drawDirectionalControls();
  drawBehaviorControls();
}

function draw(){
  drawMap(15,15);
  drawCreature( coordinateToTile(2,3), "#3AA" ,"Test" ) 
}