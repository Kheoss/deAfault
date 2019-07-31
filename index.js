let mobilenet;
let classifier;
let video;
let label = 'loading model';
let happyButton;
let sadButton;
let trainButton;
let posenet;
let poses;
let noseX = -200;
let noseY = -200;
let n,m;
let isHand;
let e1,e2;
let effectColor = {};
let isPossible = true;
let effectIndex = 0;

function mousePressed(){
  lastDraggedPosition.x = mouseX;
}

function getNewEffect(){

  console.log(effectIndex);
if(effectIndex == 0){
  e1 = new Eye(-200, 16, 30);
  e2 = new Eye(-200, 16, 30);
  setEffectColor(0,0,0,0);
}
else if(effectIndex == 1){
  setEffectColor(238,130,238,255);
  e1 = undefined;
  e2 = new PigNose(-200, 16, 60);
}
}
function modelReady() {
  console.log('Model is ready!!!');
   classifier.load('../Model/model.json', customModelReady);
}

function customModelReady() {
  console.log('Custom Model is ready!!!');
  label = 'model ready';
}

function videoReady() {
  console.log('Video is ready!!!');
} 
function setEffectColor(r,g,b,a){
  effectColor.r = r;
  effectColor.g = g;
  effectColor.b = b;
  effectColor.a = a;
}
let effectImageToLoad;
let effectImages = [];
function setup() {
  effectImageToLoad = loadImage("/Images/Others/clownFiesta.png");
  effectImages.push(effectImageToLoad);
  effectImageToLoad = loadImage("/Images/Others/pig.png");
  effectImages.push(effectImageToLoad);

  effectIndex = 0;
  var options = {
    preventDefault: true
  };

  var hammer = new Hammer(document.body, options);
  hammer.get('swipe').set({
    direction: Hammer.DIRECTION_ALL
  });

  hammer.on("swipe", swiped);

  createCanvas(innerWidth, innerHeight);
  
  e1 = new Eye(-200, 16, 30);
  e2 = new Eye(-200, 16, 30); 
  setEffectColor(0,0,0,0);
  n = innerWidth/640;
  m = (innerHeight)/480;
  video = createCapture(VIDEO);

  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);
  poseNet = ml5.poseNet(video,()=>{
    console.log("PoseNet ready");
  });
    poseNet.on('pose',(results)=>{
      poses = results;    
      try{
        isHand = (poses[0].pose.keypoints[10].score > 0.20)?true:false;
        if(isHand && isPossible){
          isPossible = false;
          classifier.classify(gotResults);
            setTimeout(()=>{
              isPossible = true;
            },1000);
        }
      }catch(er){}
        DrawEffect();
    });
    
}

function draw() {
  background(0);
  image(video, 0, 0, innerWidth, innerHeight);
image(effectImages[effectIndex],0,innerHeight*2/3,innerWidth,innerHeight/3);
  let noseX_prime = noseX * n;
  let noseY_prime = noseY * m;
  if(noseX_prime > 0 && noseY_prime >0 && noseX_prime <= width && noseY_prime < height && effectIndex == 0){
    noStroke();
  fill(effectColor.r,effectColor.g,effectColor.b,effectColor.a);
  ellipse(noseX_prime, noseY_prime, 20);
  }
  if(e1 != undefined)
  e1.display();
  e2.display(); 
}


function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}


function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    label = result;
    console.log(label);
    if(label == "Red"){
      effectColor.a = 255;
      effectColor.r = 255;
      effectColor.g = 0;
      effectColor.b = 0;
    }else if(label == "Yellow"){
        effectColor.a = 255;
        effectColor.r = 255;
        effectColor.g = 255;
        effectColor.b = 0;
      
    }

  }
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
if(!isHand){
 thisFrameX = -200;
 thisFrameY = -200;
}
else{
 thisFrameX = rightWristX;
 thisFrameY = rightWristY;
}
if(e1 != undefined)
e1.update(0.1,poses[0].pose.keypoints[1].position.x*n,poses[0].pose.keypoints[1].position.y*m);
if(effectIndex ==0)
e2.update(-0.1, poses[0].pose.keypoints[2].position.x*n,poses[0].pose.keypoints[2].position.y*m);
else{
  e2.update(-0.1, noseX*n,noseY*m);
}
}catch(err){}
}


function swiped(event) {
  if(event.direction == 2){
    effectIndex = effectIndex+1;
    if(effectIndex >= effectImages.length){
      effectIndex = 0;
    }
  getNewEffect();
  }else
  if(event.direction == 4){
    effectIndex =effectIndex-1;
    if(effectIndex < 0 ){
      effectIndex = effectImages.length-1;
    }
  getNewEffect();
  }

}