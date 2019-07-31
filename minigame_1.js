const prediction_URL = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/742669c1-82f1-4e67-8811-2ec8cd9554ce/image?iterationId=a8c8b17a-5bcf-4dd4-8d61-c09bb353142b";
let mobilenet;
let classifier;
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

let lastFrameX;
let lastFrameY;
let thisFrameX;
let thisFrameY;
let ClasifiedImage;

function gotResults(err, results) {
  if (err) {
    console.error(err);
  }
  if (results && results[0]) {
    console.log(results[0].label);
    console.log(results[0].confidence);

  }
}

function setup() {
  video = createCapture(VIDEO);
  video.hide();
  mobilenet = ml5.featureExtractor('MobileNet', ()=>{
    console.log("MobileNet loaded");
    ClasifiedImage = new Image();
    ClasifiedImage.onload = ()=>{
      classifier = mobilenet.classification(video, ()=>{
        console.log("Classifier loaded");

let ind = 0;
let ind2 = 0;
        for(let i=1;i<30;i++){
          let img2 = new Image();
       img2.onload = ()=>{
           classifier.addImage(img2, 'A', ()=>{ind++;
            if(ind == 28){

for(let j=0;j<28;j++){
  let img3 = new Image();
  img3.src = "ImaginiTraining/LetterC/LetterA ("+i+").png";
  img3.onload = ()=>{
    ind2++;
    if(ind2 == 27){

      classifier.train(function(lossValue) {
        if (lossValue) {
          totalLoss = lossValue;
          console.log('Loss: ' + totalLoss);
        } else {
          console.log('Done Training! Final Loss: ' + totalLoss);
        }
      });
    }
  }

  
}
           }});
        }
        img2.src = "ImaginiTraining/LetterA/LetterA ("+i+").png";
        }


      });
    }
    ClasifiedImage.src = "ImaginiTraining/LetterA/LetterA (23).png";
  });

CameraOffSet = 100;
frameImage = loadImage("Images/background.jpg");
  cameraImage = loadImage("Images/camera.png");
  e1 = new Eye(-200, 16, 30);
  e2 = new Eye(-200, 16, 30);
  inProgress = false;
  effectColor.r = 0;
  effectColor.g = 0;
  effectColor.b = 0;
  effectColor.a = 0;
  isHand = false;
    effectX = -1;
    effectY = -1;
    createCanvas(innerWidth, innerHeight);
    n = innerWidth/widthVideo;
    m = innerHeight*heightRescale/heightVideo;
    poseNet = ml5.poseNet(video,modelReady);
    poseNet.on('pose',(results)=>{
        poses = results;    
        DrawEffect();
    });
    setInterval(()=>{
      if(isHand && !inProgress){
        DoPhoto();
      }
      console.log(isHand);
  },600);
  }
  function CalcDistance(){
    return Math.sqrt(
        (thisFrameX-lastFrameX)*(thisFrameX-lastFrameX) + (thisFrameY-lastFrameY) * (thisFrameY-lastFrameY)
    );
  }

  function DoPhoto(){
    if(CalcDistance() < 10){
      console.log("Miscare insuficienta");
      lastFrameX = thisFrameX;
      lastFrameY = thisFrameY;
        return;
    }
    lastFrameX = thisFrameX;
    lastFrameY = thisFrameY;
   let centralX = rightWristX - 50;
   let centralY = rightWristY - 60;

   classifier.classify(gotResults);
  
inProgress = false;

return;
c.save("Red","png");
// console.log("SD");
   c.canvas.toBlob(function(blob) {
    var http = new XMLHttpRequest();
    http.open('POST', prediction_URL, true);
    http.setRequestHeader("Prediction-Key","1c79154da29c4d1cbef321073d000c4c");
    http.setRequestHeader("Content-Type","application/octet-stream");
    http.onload = function() {
        if(http.readyState == 4 && http.status == 200) {
            let data = JSON.parse(http.response);
            console.clear();
            console.log(data.predictions[0].tagName);
            console.log(data.predictions[0].probability);
            inProgress = false;
            switch(data.predictions[0].tagName){
              case "GreenColor": effectColor.r = 0;
                                 effectColor.g = 255;
                                 effectColor.b = 0;
                                 effectColor.a = 255;
                                 break;
               case "RedColor": effectColor.r = 255;
                                 effectColor.g = 0;
                                 effectColor.b = 0;
                                 effectColor.a = 255;
                                 break;
               case "YellowColor": effectColor.r = 240;
                                 effectColor.g = 255;
                                 effectColor.b = 0;
                                 effectColor.a = 255;
                                 break;
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
    if(noseX_prime > 0 && noseY_prime >0 && noseX_prime <= width && noseY_prime < height){
      noStroke();
    fill(effectColor.r,effectColor.g,effectColor.b,effectColor.a);
    ellipse(noseX_prime, noseY_prime, 20);
    }

    e1.display();
    e2.display();
    image(frameImage,0,height*heightRescale,width,height*(1-heightRescale));
    fill(10, 200, 219);
    ellipse(width/2,(height*heightRescale)+height*(1-heightRescale)/2,width/(3/2),(height*(1-heightRescale)/(3/2)));
    fill(36, 228, 239);
    ellipse(width/2,(height*heightRescale)+height*(1-heightRescale)/2,width/(5/3),(height*(1-heightRescale)/(5/3)));
    image(cameraImage,CameraOffSet,height*heightRescale+2/3*CameraOffSet,width-2*CameraOffSet -3,height*(1-heightRescale)-4/3*CameraOffSet -3);
    fill(0,0,255);
  }
  function modelReady(){

    console.log("asdd");
    //textSize(80);
    // fill(255,255,255);
    // textAlign(CENTER, CENTER);
    // stroke(255);
    // text("sdddddd",width/2,height/2);
  }
  function keyPressed(){
    DoPhoto();
  }

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