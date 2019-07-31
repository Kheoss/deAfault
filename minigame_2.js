const prediction_URL = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/991b8921-9745-4c3e-b34d-b1420dcd682a/image?iterationId=c1b32711-fd77-4b10-862c-ac3c24b04a64";
const FutureExtractor = [
[0,1,0],
[1,-4,1],
[0,1,0]
];
var curWord = [{
  word: '_atapult',
  answer : 'C',
  cicles: 1
},
{
  word: '_lphabet',
  answer : 'A',
  cicles: 1
},
{
  word: '_icycle',
  answer : 'B',
  cicles: 1
},
{
  word: '_at',
  answer : 'C',
  cicles: 1
},
{
  word: '_quatic',
  answer : 'A',
  cicles: 1
},
{
  word: '_andage',
  answer : 'B',
  cicles: 1
},
{
  word: '_ar',
  answer : 'C',
  cicle:1
},
{
  word:'_attle',
  answer : 'B',
  cicle:1
},
{
  word: '_quila',
  answer: 'A',
  cicle:1
}];
let isParticles;
let isFail;
let score;
var curWordText = "";
var CameraOffSet;
var cameraImage;
var frameImage;
let poseNet;
let video;
let noseX = -200;
let noseY = -200;
let effectColor = {};
let isHand;
let inProgress;
let rightWristX = -200;
let rightWristY = -200; 
const heightRescale = 2/3;
const heightVideo = 480;
const widthVideo = 640;
let poses;
let counter = 0;
let n;
let m;
let e1;
let e2;
let curWordIndex;
let lastFrameX;
let lastFrameY;
let thisFrameX;
let thisFrameY;
let system;
function setup() {
  isParticles = false;
  system = new ParticleSystem(createVector(innerWidth/2,innerHeight/2 - 60));
  score = 0;
CameraOffSet = 100;
  frameImage = loadImage("Images/backgame2.jpg");
  cameraImage = loadImage("Images/camera.png");
  e1 = new Eye(-200, 16, 30);
  e2 = new Eye(-200, 16, 30);
  inProgress = false;
  isHand = false;
    effectX = -1;
    effectY = -1;
    createCanvas(innerWidth, innerHeight);
    n = innerWidth/widthVideo;
    m = innerHeight*heightRescale/heightVideo;
    video = createCapture(VIDEO);
    video.hide();
    askForWord();
    poseNet = ml5.poseNet(video,modelReady);
    poseNet.on('pose',(results)=>{
        poses = results;    
        DrawEffect();
    });
    setInterval(()=>{
      if(isHand && !inProgress && !isFail && !isParticles){
        DoPhoto();
      }
  },600);
  }
  function CalcDistance(){
    return Math.sqrt(
        (thisFrameX-lastFrameX)*(thisFrameX-lastFrameX) + (thisFrameY-lastFrameY) * (thisFrameY-lastFrameY)
    );
  }

  function DoPhoto(){
    if(CalcDistance() > 20){
      lastFrameX = thisFrameX;
      lastFrameY = thisFrameY;
        return;
    }
    lastFrameX = thisFrameX;
    lastFrameY = thisFrameY;
   let centralX = rightWristX - 50;
   let centralY = rightWristY - 60;
   let c = get(centralX-125,centralY-170,250,250);
   let curContext = c.canvas.getContext('2d');

   let newImage = createImage(247, 247);
   let newContext = newImage.canvas.getContext('2d');
   //filter
   let imgd = curContext.getImageData(0, 0, 250, 250);
   let pix = imgd.data;
   let imgNew = newContext.getImageData(0,0,247,247);
   let newPix = imgNew.data;
    for(let i=0;i<imgd.height;i++){
        for(let j=0;j<imgd.width;j++){
          let index = (j + i * imgd.width) * 4;
            let yLinear = 0.2126*pix[index]/255 + 
                          0.7152*pix[index+1]/255+
                          0.0722*pix[index+2]/255;
            let yGlobal;  
            if(yLinear <= 0.0031308){
                yGlobal = 12.92*yLinear;
            }else{
                  yGlobal = 1.055*Math.pow(yLinear,(1/2.4)) - 0.055;
            }
            pix[index] = pix[index+1] = pix[index+2] = yGlobal*255;
        }
}
curContext.putImageData(imgd, 0, 0);
//c.save("LetterA","png");
//return;
   c.canvas.toBlob(function(blob) {
    var http = new XMLHttpRequest();
    http.open('POST', prediction_URL, true);
    http.setRequestHeader("Prediction-Key","1c79154da29c4d1cbef321073d000c4c");
    http.setRequestHeader("Content-Type","application/octet-stream");
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            let data = JSON.parse(http.response);
             //console.clear();
             console.log(data.predictions[0].tagName);
             console.log(data.predictions[0].probability);
            inProgress = false;
            if(curWord[curWordIndex].answer == data.predictions[0].tagName){
              isParticles = true;  
              Correct();
            }
            else{
              score-=20;
              if(score < 0) score=0;
              isFail = true;
              Correct();
            }
        }
    }
    inProgress = true;
   http.send(blob);
}, "image/jpeg", 1);
}
  function draw() {
    image(video,0,0, width,height*heightRescale);
    let noseX_prime = noseX * n;
    let noseY_prime = noseY * m;
    textSize(80);
    fill(255,255,255);
    textAlign(CENTER, CENTER);
    text(curWordText,width/2,height/2);
    textSize(76);
    fill(255,140,0);
    textAlign(CENTER, CENTER);
    text(curWordText,width/2,height/2);
    image(frameImage,0,height*heightRescale,width,height*(1-heightRescale));
    if(isParticles)
    {system.addParticle();
    system.run();}

    textSize(80);
    fill(255,255,255);
    textAlign(CENTER, CENTER);
    text("Score : " + score ,width/2,height-100);
    textSize(76);
    fill(255,140,0);
    textAlign(CENTER, CENTER);
    text("Score : " + score ,width/2,height-100);

    if(isFail){
    textSize(90);
    fill(255,255,255);
    textAlign(CENTER, CENTER);
    text("X" ,width/2,height/2);
    textSize(86);
    fill(255,0,0);
    textAlign(CENTER, CENTER);
    text("X",width/2,height/2);
    }

  }
  function modelReady(){}
  function DrawEffect(){
       noseX = -200;
       noseY = -200;
       rightWristX = -200;
       rightWristY = -200;
      try{
    let newX = poses[0].pose.keypoints[0].position.x;
    let newY = poses[0].pose.keypoints[0].position.y;
    noseX = lerp(noseX,newX,1);
    noseY = lerp(noseY,newY,1);
    rightWristX = poses[0].pose.keypoints[10].position.x;
    rightWristY = poses[0].pose.keypoints[10].position.y;
    isHand = (poses[0].pose.keypoints[10].score > 0.2)?true:false;
    if(!isHand){
      thisFrameX = -200;
      thisFrameY = -200;
    }
    else{
      thisFrameX = rightWristX;
      thisFrameY = rightWristY;
    }

    e1.update(0.1,poses[0].pose.keypoints[1].position.x*n,poses[0].pose.keypoints[1].position.y*m);
    e2.update(-0.1, poses[0].pose.keypoints[2].position.x*n,poses[0].pose.keypoints[2].position.y*m);
}
catch(err){}
}
//Funny Eyes
function Eye(tx, ty, ts) {
  this.x = tx;
  this.y = ty;
  this.size = ts;
  this.angle = 0;

  this.update = function(mx, i,j) {
    this.x = i;
    this.y = j;
    this.angle += mx;
    //this.angle = atan2(my - this.y, mx - this.x);
  };

  this.display = function() {
    push();
    translate(this.x, this.y);
    fill(255);
    ellipse(0, 0, this.size, this.size);
    rotate(this.angle);
    if(effectColor.a == 0)
    fill(153, 204, 0);
    else fill(effectColor.r,effectColor.g,effectColor.b);
    ellipse(this.size / 4, 0, this.size / 2, this.size / 2);
    pop();
  };
}

function mouseClicked(){
  let startPointX = CameraOffSet/(3/2);
    let startPointY = height*heightRescale+7/4*CameraOffSet;
    let endPointX = startPointX + width/(6/4);
    let endPointY = startPointY - (height*(1-heightRescale)-4/3*CameraOffSet);
  if(mouseX > startPointX && mouseX < endPointX){
    if(mouseY > endPointY && mouseY < startPointY){
      SaveThePhoto();
    }

  }
}
function SaveThePhoto(){
  let savedPhoto = get(0,0,width,height*heightRescale);
  savedPhoto.save("SavedPhoto","png");
}
function Correct(){
  score += 10;
  changeWord();
}
function changeWord(){
  curWordText = curWord[curWordIndex].answer + curWord[curWordIndex].word.substr(1);
  setTimeout(askForWord,1500);
}
function askForWord(){
  isParticles = false;
  
  // let pool = [];
  // let maxFitness = 0.0;
  // let fitnesses = [];
  // for(let x=0;x<curWord.length;x++){
  //   fitnesses[x] = 1/curWord[x].cicles;
  //   maxFitness = Math.max(fitnesses[x],maxFitness);
  // }
  // for(let x=0;x<curWord.length;x++){
  //   let thisFittnes = fitnesses[x]/maxFitness;
  //   for(let y=0;y<Math.floor(Math.pow(2,200*fitnesses));y++)
  //       pool.push(x);
  // }

  //       shuffle(pool, true)
        //console.log(pool);
        curWordIndex = Math.floor(Math.random()*curWord.length);
      //console.log(curWordIndex);
      
  // curWord[curWordIndex].cicles += 1;
  curWordText = curWord[curWordIndex].word;
  isFail = false;
}

let Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 255;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(255,140,0, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};

Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
