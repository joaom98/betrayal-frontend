function mousePressed() {
  console.log(mouseX, mouseY)

  moveCreature(directionalControlPressed())
  buttonClicked();
}

function moveCreature(direction) {
  if (direction === -1) {
    return;
  }
  return DIRECTIONS[direction];
}

function area(x1, y1, x2, y2, x3, y3) {
  return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
}

function isInsideRectangle(x1,y1, x2, y2, x, y){
  if( (x > x1 && x < x2) && (y > y1 && y < y2) ){
    return true;
  }
  return false;
}

function isInsideTriangle(x1, y1, x2, y2, x3, y3, x, y) {
  /* Calculate area of triangle ABC */
  let A = area(x1, y1, x2, y2, x3, y3);

  /* Calculate area of triangle PBC */
  let A1 = area(x, y, x2, y2, x3, y3);

  /* Calculate area of triangle PAC */
  let A2 = area(x1, y1, x, y, x3, y3);

  /* Calculate area of triangle PAB */
  let A3 = area(x1, y1, x2, y2, x, y);

  /* Check if sum of A1, A2 and A3 is same as A */
  return (A >= A1 + A2 + A3 - 0.1 && A <= A1 + A2 + A3 + 0.1);
}

function directionalControlPressed() {
  for (let i = 0; i < Constants.directionalControlCoordinates.length; i++) {

    let coords = Constants.directionalControlCoordinates[i];
    if (isInsideTriangle
    (
      coords.p1.x,
      coords.p1.y,
      coords.p2.x,
      coords.p2.y,
      coords.p3.x,
      coords.p3.y,
      mouseX,
      mouseY)) {
      return i;
    }
  }

  return -1;
}


function buttonClicked() {

  const AttackButton = Constants.behaviorButtonCoordinates.ATTACK;
  const GiveEnergyButton = Constants.behaviorButtonCoordinates.GIVE_ENERGY;


  if ( isInsideRectangle(
    AttackButton.x1,
    AttackButton.y1,
    AttackButton.x2,
    AttackButton.y2,
    mouseX,
    mouseY)){
    console.log("attack button pressed")
  }

  if ( isInsideRectangle(
    GiveEnergyButton.x1,
    GiveEnergyButton.y1,
    GiveEnergyButton.x2,
    GiveEnergyButton.y2,
    mouseX,
    mouseY)){
    console.log("give energy button pressed")
  }

}