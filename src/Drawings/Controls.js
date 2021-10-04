function drawDirectionalControls() {
    const radius = Constants.tileSize;
    const centerX = Constants.margin * 3 + Constants.mapSize.x * Constants.tileSize + 2 * radius;
    const centerY = Constants.height - Constants.tileSize * 5;

    strokeWeight(3);
    stroke("yellow")
    fill("black")
    for (let i = 0; i < 8; i++) {
        let p1X = centerX + radius * cos(i * (PI / 4)) * 2;
        let p1Y = centerY + radius * sin(i * (PI / 4)) * 2;
        let p2X = centerX + radius * cos(i * (PI / 4) + PI / 8);
        let p2Y = centerY + radius * sin(i * (PI / 4) + PI / 8);
        let p3X = centerX + radius * cos(i * (PI / 4) - PI / 8);
        let p3Y = centerY + radius * sin(i * (PI / 4) - PI / 8);
        Constants.directionalControlCoordinates.push({
            p1: {
                x: p1X,
                y: p1Y
            },
            p2: {
                x: p2X,
                y: p2Y
            },
            p3: {
                x: p3X,
                y: p3Y
            }
        })

        triangle(p1X, p1Y, p2X, p2Y, p3X, p3Y);
    }

    textSize(Constants.tileSize / 3);
    textAlign(CENTER, CENTER);
    text("MOVE", centerX, centerY);
}



