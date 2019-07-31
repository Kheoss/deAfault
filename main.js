var learningCategories  = [];
var learningVideos = []; 
var quizQuestions = [];
let curQuizAns = [];
var categoryList;
function LoadData(){
    let req = new XMLHttpRequest();
    req.open("GET","http://localhost:8989/getInfo",false);
    req.send();

    let response = JSON.parse(req.response);

    learningCategories = response.x;
    for(let i=0;i<learningCategories.length;i++){
      learningCategories[i].items = JSON.parse(learningCategories[i].items);
    }
    learningVideos = response.y;
    quizQuestions = response.z;
}
window.onload = function(){
    LoadData();
    GoMainPage();
 }
 function SelectQuizType(){

  let inpOpt = [];
  curQuizAns = [];
  for(let i=0;i<quizQuestions.length;i++){ 
    if(inpOpt.find(x=>x === quizQuestions[i].categorie) === undefined){
      inpOpt.push(quizQuestions[i].categorie)
    }
  }
  let obj = Object.assign({},inpOpt);
   Swal.fire({
    title: 'Selecteaza o categorie',
    input: 'select',
    inputOptions: obj,
    inputPlaceholder: 'Categoria',
    showCancelButton: true,
  }).then((cat)=>{
    GoQuiz(inpOpt[cat.value]);
  });
  
 }
 var curTest;
function GoQuiz(categorie){
  document.querySelector('body').classList = [];
  quizQuestions = shuffle(quizQuestions);
curTest = [];
  for(let i=0;i<quizQuestions.length;i++){
    console.log(quizQuestions[i].categorie);
    console.log(categorie);
    if(quizQuestions[i].categorie == categorie){
      curTest.push(quizQuestions[i]);
    }
  }

    document.querySelector('head').innerHTML = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>  
  	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    <style>
      *{
        opacity: 0.96;
      }
      #intr{
        background-color:rgba(250,250,250,0.8);
        background-image: url("/Images/back.png");
        background-repeat: no-repeat;
        background-size: 90%;
        background-origin: border-box;
        background-position: center;
        box-shadow: -2px -2px 2px orange;
      }
      #intr22{
        background-color:rgba(250,250,250,0.8);
        background-image: url("/Images/checked.png");
        background-repeat: no-repeat;
        background-size: 90%;
        background-origin: border-box;
        background-position: center;
        box-shadow: -2px -2px 2px orange;
      }
      .container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        margin-left:25px;
      }
      
      .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }
      
      .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background : rgba(50,50,50,0.9);
        border-radius: 50%;
      }
      
      .container input:checked ~ .checkmark {
        background-color: #2196F3;
      }
      
      .checkmark:after {
        content: "";
        position: absolute;
        display: none;
      }
      
      .container input:checked ~ .checkmark:after {
        display: block;
      }
      
      .container .checkmark:after {
        top: 9px;
        left: 9px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background : rgba(50,50,50,0.9);
      }
    </style>
    <link rel="stylesheet" href="sweetalert2.min.css">
    `;
    document.querySelector('body').innerHTML = ` <video id="backgroundVideo" autoplay muted loop>
    <source src="/Images/background.mp4" type="video/mp4">                               
</video> 
<div id="accordion">
</div>
<div id="holder2">
</div>`;

    document.getElementById('backgroundVideo').style="position:fixed;right: 0;bottom: 0;min-width: 100%; min-height: 100%;opacity:1;";
        const data = JSON.parse(localStorage.getItem("LearningCategory"));
        const handler = document.getElementById('accordion');
        let holder2 = document.getElementById('holder2');
        holder2.innerHTML += '<div id="intr" class="fixed-bottom" style="width:'+innerWidth/6+'px;height:'+innerWidth/6+'px;margin:5px;border-radius:120px;opacity:0.7;" onclick="Back()"></div>'
    
        for(var i=0;i<Math.min(curTest.length,10);i++){
            curQuizAns.push(0);
                var id = i.toString();
                handler.innerHTML += `<div class="card" style="border: 2px solid black;border-radius:35px;"><h2 style="text-align:center;margin:0px;background-color:black;box-shadow:2px -2px 2px #F37335; border-top-right-radius: 50px; border-top-left-radius: 50px;font-size:`+innerWidth/15+`px;text-shadow:5px 5px 5px black;color:white;">`+curTest[i].categorie+`</h2><img src="`+ curTest[i].urlImagine +`" style="border-radius:10px;height:500spx;margin-bottom:20px;z-index:0;" class="card-img-top" data-toggle="collapse" data-target="#c`+id+`" aria-expanded="true" aria-controls="c`+id+`"></img><div id="c`+id+`" class="collapse" aria-labelledby="headingOne" data-parent="#accordion"><div class="card-body" style="margin:0px;background:rgba(243,243,243,0.4);border-radius:50px;"><p style="font-size:'+innerWidth/24+'px; text-align:center;text-shadow :0px 0px 0px black;color : "grey";><br>
                <label class="container">`+curTest[i].var1+`
  <input type="checkbox" id="check`+i+`v1" onclick="DeselectCheck(`+i+`,`+1+`)">
  <span class="checkmark"></span>
</label>

<label class="container">`+curTest[i].var2+`
  <input type="checkbox" id="check`+i+`v2" onclick="DeselectCheck(`+i+`,`+2+`)">
  <span class="checkmark"></span>
</label>

<label class="container">`+curTest[i].var3+`
  <input type="checkbox" id="check`+i+`v3" onclick="DeselectCheck(`+i+`,`+3+`)">
  <span class="checkmark"></span>
</label>
                <br/></p></div></div></div>`;
        }
        holder2.innerHTML += '<div id="intr22" class="fixed-bottom" style="width:'+innerWidth/6+'px;height:'+innerWidth/6+'px;margin:5px;margin-left:'+innerWidth*5/6+'px;border-radius:120px;opacity:0.7;" onclick="CheckQuiz()"></div>';        
}
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function QuizCheckAnswers(){
    for(let i=0;i<curQuizAns.length;i++){
        if(curQuizAns[i] == 0) return false;
    }
    return true;
}
function GetScore(){
    let score = 0;
    for(let i=0;i<curQuizAns.length;i++){
        if(curQuizAns[i] == curTest[i].varCorecta){score++};
    }
    return score * 10;
}
function CheckQuiz(){
    if(QuizCheckAnswers()){

        const alertaVeziRez = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false,
          })
          
          alertaVeziRez.fire({
            title: 'Chestionar terminat!',
            text: "Scor : "+GetScore()+"/"+curTest.length * 10,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Vezi greseli!',
            cancelButtonText: 'Inapoi',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
                //Am de facut asta
                document.querySelector('body').className = "";
                GoQuizWithAnswers();
                //!Am de facut asta

            } else if (result.dismiss === Swal.DismissReason.cancel
              ){
                document.querySelector('body').className = "";
                GoMainPage();
            }
          })
    }
    else{
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Nu ai raspuns la toate intrebarile!'
          })
    }
}

function DeselectCheck(intrebareIndex, variantaIndex){
    curQuizAns[intrebareIndex] = variantaIndex;
    if(!document.getElementById(`check`+intrebareIndex+`v` + variantaIndex).checked){
      curQuizAns[intrebareIndex] = 0;
    }
        for(let ax=1;ax<=3;ax++){
            if(ax != variantaIndex){
                document.getElementById(`check`+intrebareIndex+`v`+ax).checked = false;
            }
        }
}
function GoMainPage(){
    document.querySelector('head').innerHTML = `<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title></title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    <link rel="stylesheet" href="main.css">
    <link rel="stylesheet" href="sweetalert2.min.css">
    <link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Indie+Flower" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">`;
    document.querySelector('body').innerHTML = `<div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="false">\
    <ol id="visualHolder"class="carousel-indicators">\
            <li data-target="#myCarousel" data-slide-to="Slide1"></li>\
            <li data-target="#myCarousel" data-slide-to="Slide2"></li>\
            <li data-target="#myCarousel" data-slide-to="Slide3"></li>\
            <li data-target="#myCarousel" data-slide-to="Slide4"></li>\
            <li data-target="#myCarousel" data-slide-to="Slide5"></li>\
            <li data-target="#myCarousel" data-slide-to="Slide6"></li>\
    </ol>\
    <div id="carContent" class="carousel-inner">\
            <div id="Slide1" class="carousel-item item bg bg1 active" style="background-image:url(http://lindahourihan.files.wordpress.com/2012/06/hands-around-the-world1.jpg);">\
                    <div class="container"><div class="carousel-caption">\
                        <h1 style="font-family: 'Playfair Display', serif;"><i><b>de</b><i style="font-size:60px;font-family: 'Indie Flower', cursive;">A</i><b>fault</b></i></h1>\
                        <p style="font-size: 20px;">by Vlad Constantinescu</p>\
                   </div>\
            </div> \
            </div> \
            <div id="Slide2" class="carousel-item item bg bg1" style="background-image:url(Images/learning.jpg);"> \
                    <div class="container"><div class="carousel-caption">\
                            <form id="searchForm">\
                             <input id="searchInput" type="text" name="search" placeholder="Search...">\
                            </form>\
                            <div id="TutorialsHolder" class="container">\
                                    <div id="holderForHolder">\
                                    </div>\
                                     <div id="holderForHolder">\
                                    </div>   \
                            </div>\
                   </div>\
                </div>   \
            </div> \
            <div id="Slide3" class="carousel-item item bg bg1" style="background-image:url(Images/background3.jpg);">\
                    <div class="container"><div class="carousel-caption">\
                                    <form id="searchForm2">\
                                     <input id="searchInput2" type="text" name="search" placeholder="Search...">\
                                    </form>\
                                    <div id="TutorialsHolder" class="container">\
                                            <div id="holderForHolder2">\
                                            </div>\
                                             <div id="holderForHolder">\
                                            </div>   \
                                    </div>\
                           </div>\
                        </div>   \
        </div>\
        <div id="Slide4" class="carousel-item item bg bg1" style="background-image:url(Images/back4.jpg);">\
            <div class="container"><div class="carousel-caption">\
                <h1 style="font-family: 'Playfair Display', serif;"><i>Take a quiz!</i></h1>\
                <p style="font-size: 20px;">A simple quiz to test your knowledge!</p>\
                <button onclick="SelectQuizType()" type="button" class="btn btn-success" style="width:75%;">Play!</button>\
           </div>\
    </div>   \
</div> \
        <div id="Slide5" class="carousel-item item bg bg1" style="background-image:url(Images/back4.jpg);">\
                    <div class="container"><div class="carousel-caption">\
                        <h1 style="font-family: 'Playfair Display', serif;"><i>Color Game</i></h1>\
                        <p style="font-size: 20px;">Practice colors with this funny game!</p>\
                        <button onclick="playFirstGame()" type="button" class="btn btn-success" style="width:75%;">Play!</button>\
                   </div>\
            </div>   \
        </div> \
        <div id="Slide6" class="carousel-item item bg bg1" style="background-image:url(Images/fifthSlide.jpg);">\
                    <div class="container"><div class="carousel-caption">\
                        <h1 style="font-family: 'Playfair Display', serif;font-size:41px;"><i>Guess the letter</i></h1>\
                        <p style="font-size: 20px;">Practice the alphabet with this game!</p>\
                        <button onclick="playSecondGame()" type="button" class="btn btn-success" style="width:75%;">Play!</button>\
                   </div>\
                </div>\
            </div> \
        <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev" style="z-index: 100;">\
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>\
                <span class="sr-only">Previous</span>\
              </a>\
              <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next" style="z-index: 100;">\
                <span class="carousel-control-next-icon" aria-hidden="true"></span>\
                <span class="sr-only">Next</span>\
              </a>\
</div>\
<video id="backgroundVideo" autoplay muted loop>\
            <source src="Images/background.mp4" type="video/mp4">\
    </video>`;
    const firstSlideVideo = document.getElementById('backgroundVideo');

    firstSlideVideo.style="position:fixed;right: 0;bottom: 0;min-width: 100%; min-height: 100%;opacity:0.4;";

    categoryList = document.getElementById('holderForHolder');
    redo("");
    const input = document.getElementById('searchInput');

    $("#searchForm").submit(function(e) {
        e.preventDefault();
    });
    $("#searchForm :input").change(function() {
       redo(input.value);
    });

    categoryList2 = document.getElementById('holderForHolder2');
    redo("");
    const input2 = document.getElementById('searchInput2');

    $("#searchForm2").submit(function(e) {
        e.preventDefault();
    });
    $("#searchForm2 :input").change(function() {
       redoVideo(input2.value);
    });
    redoVideo("");
 }
function StartLearning(index){
    localStorage.setItem("LearningCategory",JSON.stringify(learningCategories[index]));
    GoItems();
}

function redo(str){
    categoryList.innerHTML = "";
    let count = 0;
    str = str.toLowerCase();
    for(let i=0;i<learningCategories.length;i++){
        if(str.length == 0 || learningCategories[i].name.toLowerCase().includes(str)){
         categoryList.innerHTML += '<div class="card" style="width: 21rem;margin-left: 40px;"><img class="card-img-top" src="Images/' + learningCategories[i].picture +'" alt="Card image cap"><div class="card-body"><h5 style="color:black;" class="card-title">'+ learningCategories[i].name +'</h5 ><a href="#" onclick="StartLearning('+i+')" class="btn btn-primary">Start learning</a></div></div>';    
         count++;
        }
    }
    categoryList.style="height:"+ count*315 +"px;margin-top:"+ 200*count +"px;";
}

function redoVideo(str){
    categoryList2.innerHTML = "";
    let count = 0;
    str = str.toLowerCase(); 
    for(let i=0;i<learningVideos.length;i++){  
        if(str.length == 0 || learningVideos[i].name.toLowerCase().includes(str)){
         categoryList2.innerHTML += '<div class="card" style="width: 21rem;margin-left: 40px;"><img class="card-img-top" src="Images/' + learningVideos[i].picture +'" alt="Card image cap"><div class="card-body"><h5 style="color:black;" class="card-title">'+ learningVideos[i].name +'</h5 ><a href="#" onclick="StartWatching('+i+')" class="btn btn-primary">Watch the video</a></div></div>';    
         count++;
        }
    }
    categoryList2.style="height:"+ count*315 +"px;margin-top:"+ 200*count +"px;";
}
function StartWatching(index){
        window.open(learningVideos[index].videoURL);
}
function playFirstGame(){
    //window.open("index.html");
    location.href = "index.html";
}
function playSecondGame(){
    location.href = "game2.html";
}