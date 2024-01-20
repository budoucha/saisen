function preload() {
  pixelDensity(1);
  moneyImg = loadImage("data/5000chou.png");
  boxImg = loadImage("data/saisenbako.png");
  tutoImg = loadImage("data/tuto.png");
  s1 = loadSound('data/money-drop2.mp3');
}

function setup() {
  n = allSprites.length;
  for (i = 0; i < n; i++) {
    allSprites[0].remove();
  }
  var myCanvas = createCanvas(windowWidth * 0.96, windowHeight * 0.75);
  myCanvas.parent('sketch-holder');

  moneyImg.resize(height / 6, height / 6);
  boxImg.resize(boxImg.width * height / 4 / boxImg.height, height / 4);
  if (tutoImg.width > width * 0.8) {
    tutoImg.resize(width * 0.8, tutoImg.height * width * 0.8 / tutoImg.width)
  }
  saisens = new Group();
  saisenbako = createSprite(width / 2, height / 4, 1, 1);
  saisenbako.addImage(boxImg);
  tonyuguchi = saisenbako.height * 0.4;
  saisenbakoOffset = -(saisenbako.height - tonyuguchi * 1.2) / 2
  saisenbako.setCollider("rectangle", 0, saisenbakoOffset, saisenbako.width - moneyImg.width * 2, tonyuguchi);

  useQuadTree(false);

  s1.setVolume(0.1);
  s1.playMode('sustain');

  imageMode(CENTER);

  kingaku = 0;

  colorMode(HSB);
  background(180, 100, 100);
  long = max(width, height);
}

function draw() {
  if (kingaku === 0) {
    background(255);
    image(tutoImg, width / 2, height / 2);
  }
  else { drawBg(); }

  touch = (mouseIsPressed && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height);
  if (touch || keyDown("SPACE")) {
    throwSaisen();
  }

  drawSprites();
  saisenbako.overlap(saisens, charin);

  fill(0);
  textSize(24);
  textAlign(CENTER);
  strokeWeight(2);
  stroke(255);
  var chou = kingaku > 0 ? "兆" : "";
  text(kingaku + chou + "円", width / 2, height * 0.8);
}

function throwSaisen() {
  saisen = createSprite(mouseX + randomGaussian(0, 5), mouseY + randomGaussian(0, 5), 1, 1);
  saisen.addImage(moneyImg);
  saisen.life = 48;
  speed = tonyuguchi * 0.6
  angle = HALF_PI - atan2(saisenbako.position.x - mouseX, saisenbako.position.y + saisenbakoOffset - mouseY);
  saisen.velocity.x = speed * cos(angle);
  saisen.velocity.y = speed * sin(angle);
  saisen.setCollider("circle", 0, 0, saisen.width / 2.1);
  saisens.add(saisen);
}

function charin(saisenbako, saisen) {
  s1.play();
  saisen.remove();
  kingaku += 5000;
}

function drawBg() {
  push();
  steps = 36;
  weight = long / steps;
  strokeWeight(weight);
  for (i = 0; i < steps; i++) {
    stroke(360 - (-i + frameCount * 5) % 360, 100, 100);
    line(0, i * weight, long, i * weight);
  }
  pop();
}