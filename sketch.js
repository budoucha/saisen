function preload() {
  pixelDensity(1);
  coinImg = loadImage("data/money_5a.png");
  boxImg = loadImage("data/saisenbako.png");
  tutoImg = loadImage("data/tuto.png");
  s1 = loadSound('data/money-drop2.mp3');
}

function setup() {
  touch = false;
  n = allSprites.length;
  for (i = 0; i < n; i++) {
    allSprites[0].remove();
  }
  var myCanvas = createCanvas(windowWidth * 0.96, windowHeight * 0.75);
  myCanvas.parent('sketch-holder');

  coinImg.resize(height / 12, height / 12);
  boxImg.resize(boxImg.width * height / 4 / boxImg.height, height / 4);
  if (tutoImg.width > width * 0.8) {
    tutoImg.resize(width * 0.8, tutoImg.height * width * 0.8 / tutoImg.width)
  }
  saisens = new Group();
  saisenbako = createSprite(width / 2, height / 4, 1, 1);
  saisenbako.addImage(boxImg);
  tonyuguchi=saisenbako.height*0.4;
  saisenbakoOffset= -(saisenbako.height-tonyuguchi*1.2)/2
  saisenbako.setCollider("rectangle", 0, saisenbakoOffset, saisenbako.width-coinImg.width*2,tonyuguchi);

  useQuadTree(false);

  s1.setVolume(0.1);
  s1.playMode('sustain');

  imageMode(CENTER);

  kingaku = 0;
  bg = 255;
}

function draw() {
  background(bg);
  if (kingaku === 0) {
    image(tutoImg, width / 2, height / 2);
  }

  if (touch || keyDown("SPACE")) {
    throwSaisen();
  }

  drawSprites();
  saisenbako.overlap(saisens, charin);

  fill(0);
  textSize(24);
  textAlign(CENTER);
  text('￥' + kingaku, width / 2, height * 0.8);
}

function throwSaisen() {
  saisen = createSprite(mouseX + randomGaussian(0, 5), mouseY + randomGaussian(0, 5), 1, 1);
  saisen.addImage(coinImg);
  saisen.life = 64;
  speed=tonyuguchi*0.6
  angle = HALF_PI - atan2(saisenbako.position.x - mouseX, saisenbako.position.y + saisenbakoOffset - mouseY);
  saisen.velocity.x = speed * cos(angle);
  saisen.velocity.y = speed * sin(angle);
  saisen.setCollider("circle", 0, 0, saisen.width / 2.1);
  saisens.add(saisen);
}

function charin(saisenbako, saisen) {
  s1.play();
  saisen.remove();
  kingaku += 5;
}


function touchStarted() {
  touch = true;
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    return false;
  }
}

function touchEnded() {
  touch = false;
}