function GoItems(){
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
    </style>
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
    
        for(var i=0;i<data.items.length;i++){
                var id = i.toString();
                handler.innerHTML += ' <div class="card" style="border: 2px solid black;border-radius:35px;"><h2 style="text-align:center;margin:0px;background-color: '+data.items[i].color+';box-shadow:2px -2px 2px #F37335; border-top-right-radius: 50px; border-top-left-radius: 50px;font-size:'+innerWidth/15+'px;text-shadow:5px 5px 5px black;color:white;">'+data.items[i].name+'</h2><img src="'+ data.items[i].signImage +'" style="border-radius:10px;height:500spx;margin-bottom:20px;z-index:0;" class="card-img-top" data-toggle="collapse" data-target="#c'+id+'" aria-expanded="true" aria-controls="c'+id+'"></img><div id="c'+id+'" class="collapse" aria-labelledby="headingOne" data-parent="#accordion"><div class="card-body" style="margin:0px;background:rgba(243,243,243,0.4);border-radius:50px;"><p style="font-size:'+innerWidth/24+'px; text-align:center;text-shadow :0px 0px 0px black;color : "grey";><br>'+data.items[i].description+'<br/></p></div></div></div>';
        }
    
}
function Back(){
    GoMainPage();
}