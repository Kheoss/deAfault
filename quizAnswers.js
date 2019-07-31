function GoQuizWithAnswers(){
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
      
      .checkmarkGood {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background : rgba(50,250,50,0.9);
        border-radius: 50%;
      }
      .checkmarkBad {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background : rgba(250,50,50,0.9);
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
        for(var i=0;i<curTest.length;i++){
                var id = i.toString();
                let vars = [];
                for(let ind = 1;ind<=3;ind++){
                   vars.push(`checkmarkBad`);
                }
                let highlights = [];
                for(let ind = 1;ind<=3;ind++){
                  highlights.push(`none`);
               }
               highlights[curQuizAns[i]-1] = `underline`;
                    vars[curTest[i].varCorecta-1] = `checkmarkGood`;
                    handler.innerHTML += `<div class="card" style="border: 2px solid black;border-radius:35px;"><h2 style="text-align:center;margin:0px;background-color:black;box-shadow:2px -2px 2px #F37335; border-top-right-radius: 50px; border-top-left-radius: 50px;font-size:`+innerWidth/15+`px;text-shadow:5px 5px 5px black;color:white;">`+curTest[i].categorie+`</h2><img src="`+ curTest[i].urlImagine +`" style="border-radius:10px;height:500spx;margin-bottom:20px;z-index:0;" class="card-img-top" data-toggle="collapse" data-target="#c`+id+`" aria-expanded="true" aria-controls="c`+id+`"></img><div id="c`+id+`" class="collapse" aria-labelledby="headingOne" data-parent="#accordion"><div class="card-body" style="margin:0px;background:rgba(243,243,243,0.4);border-radius:50px;"><p style="font-size:'+innerWidth/24+'px; text-align:center;text-shadow :0px 0px 0px black;color : "grey";><br>
                    <label class="container" style="text-decoration: `+highlights[0]+`;">`+curTest[i].var1+`
                    <span class="`+vars[0]+`"></span>
                    </label>
                    <label class="container" style="text-decoration: `+highlights[1]+`;">`+curTest[i].var2+`
                    <span class="`+vars[1]+`"></span>
                    </label>
                    <label class="container" style="text-decoration: `+highlights[2]+`;">`+curTest[i].var3+`
                    <span class="`+vars[2]+`"></span>
                    </label>
                    <br/></p></div></div></div>`;
        }
}