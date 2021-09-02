const flock = [];
let boundary;

function setup() {
  createCanvas(windowWidth, windowHeight);

  boundary = new Rectangle(
    windowWidth / 2,
    windowHeight / 2,
    windowWidth,
    windowHeight
  );

  for (let i = 0; i < 300; i++) {
    flock.push(new Boid());
  }
}

function draw() {
  background(100);

  let qtree = new QuadTree(boundary, 3);

  for (let boid of flock) {
    qtree.insert(boid);

    let range = new Rectangle(
      boid.position.x,
      boid.position.y,
      boid.perceptionRadius,
      boid.perceptionRadius
    );
    let points = [];
    qtree.query(range, points);

    boid.edges();
    boid.flock(points);
    boid.update();
    boid.showPOV();
  }
  qtree.show();
  for (let boid of flock) {
    boid.show("white");
  }

  if (mouseIsPressed) {
    console.log(qtree);
    // console.log(points);
  }

  // console.log(points);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
