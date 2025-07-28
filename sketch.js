let tela = 0;
let caminhaoX = 400;
let trigos = [];
let entregando = false;
let tempoEntrega = 0;
let imgEstrada;

function preload() {
  imgEstrada = loadImage("estrada.jpg"); // Imagem da estrada
}

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  criarTrigos();
}

function draw() {
  if (tela === 0) {
    telaInicial();
  } else if (tela === 1) {
    telaJogo();
  } else if (tela === 2) {
    telaCidade();
  } else if (tela === 3) {
    telaEntrega();
  } else if (tela === 4) {
    telaFinal();
  }
}

function telaInicial() {
  background('orange');

  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(50, 60, 300, 180, 20);
  triangle(100, 240, 120, 220, 140, 240);

  fill(0);
  noStroke();
  textSize(16);
  text("Bem-vindo ao Jogo da Colheita!\nUse a tecla D para mover o caminhão.\nNos ajude a coletar os trigos!! \nPressione na tela e em \nqualquer tecla para começar!", width / 2, 150);

  textSize(100);
  fill(155, 255, 0);
  text("👩🏼‍🌾", width / 7, 360);
}

function telaJogo() {
  background(135, 206, 235); // Céu azul
  desenharNuvens();

  fill(34, 139, 34); // Grama
  rect(0, height / 2, width, height / 2);

  // Trigos
  textSize(32);
  for (let i = trigos.length - 1; i >= 0; i--) {
    let trigo = trigos[i];
    if (dist(caminhaoX - 30, 300, trigo.x, trigo.y) < 30) {
      trigos.splice(i, 1);
    } else {
      text("🌾", trigo.x, trigo.y);
    }
  }

  // Caminhão (emoji)
  textSize(80);
  text("🚛", caminhaoX, 280);

  if (trigos.length === 0 && !entregando) {
    entregando = true;
    tempoEntrega = millis();
  }

  if (entregando && millis() - tempoEntrega > 2000) {
    tela = 2;
  }
}

function telaCidade() {
  background('orange');

  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(50, 60, 300, 180, 20);
  triangle(100, 240, 120, 220, 140, 240);
  // 2 balão de fala

  fill(0);
  noStroke();
  textSize(16);
  text("Parabéns! Você colheu todo o trigo!\nAgora precisamos levar o trigo \naté a cidade. Clique na tela e \npressione qualquer tecla.\nUse a tecla D para mover o caminhão.", width / 2, 150);

  textSize(100);
  fill(155, 255, 0);
  text("👩🏼‍🌾", width / 7, 360);
}

function telaEntrega() {
  background(135, 206, 235); // Céu
  image(imgEstrada, 0, 0, 0); // estrada do campo a cidade

  textSize(80);
  text("🚛", caminhaoX, 355);

  if (keyIsDown(68)) { // tecla D
    caminhaoX -= 2;
  }

  if (caminhaoX < -40) {
    tela = 4; // Vai para tela final
  }
}

function telaFinal() {
  background('orange');

  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(50, 60, 300, 220, 20);
  triangle(100, 290, 120, 270, 140, 290);

  fill(0);
  noStroke();
  textSize(16);
  text("Parabéns pela missão concluída!\nA conexão entre o campo e a cidade\né essencial para a nossa alimentação\ne qualidade de vida.\nObrigado por jogar!", width / 2, 160);

  textSize(100);
  fill(155, 255, 0);
  text("👩🏼‍🌾", width / 7, 360);
}

function keyPressed() {
  if (tela === 0) {
    tela = 1;
    caminhaoX = 400;
    entregando = false;
    criarTrigos();
  } else if (tela === 1 && !entregando) {
    if (key === 'd' || key === 'D') {
      caminhaoX -= 10;
    }
  } else if (tela === 2) {
    tela = 3;
    caminhaoX = 400;
  }
  // final (tela 4)
}

function criarTrigos() {
  trigos = [];
  for (let i = 0; i < 8; i++) {
    let x = 320 - i * 40;
    let y = 300;
    trigos.push({ x, y });
  }
}

function desenharNuvens() {
  noStroke();
  fill(255);
  ellipse(80, 80, 60, 40);
  ellipse(110, 80, 60, 40);
  ellipse(95, 65, 60, 40);

  ellipse(280, 60, 60, 40);
  ellipse(310, 60, 60, 40);
  ellipse(295, 45, 60, 40);
}