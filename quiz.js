let data;
$("form").submit(function(e) {
    e.preventDefault(); 
});
window.onload = function(){    
    document.getElementById('backgroundVideo').style="position:fixed;right: 0;bottom: 0;min-width: 100%; min-height: 100%;opacity:1;";
    const data = JSON.parse(localStorage.getItem("LearningCategory"));
    const handler = document.getElementById('accordion');
    let holder2 = document.getElementById('holder2');
    holder2.innerHTML += '<div id="intr" class="fixed-bottom" style="width:'+innerWidth/6+'px;height:'+innerWidth/6+'px;margin:5px;border-radius:120px;opacity:0.7;" onclick="Back()"></div>';
    for(var i=0;i<data.items.length;i++){
            var id = i.toString();
            handler.innerHTML += ' <div class="card" style="border: 2px solid black;border-radius:35px;"><h2 style="text-align:center;margin:0px;background-color: '+data.items[i].color+';box-shadow:2px -2px 2px #F37335; border-top-right-radius: 50px; border-top-left-radius: 50px;font-size:'+innerWidth/15+'px;text-shadow:5px 5px 5px black;color:white;">'+data.items[i].name+'</h2><img src="'+ data.items[i].signImage +'" style="border-radius:10px;height:500spx;margin-bottom:20px;z-index:0;" class="card-img-top" data-toggle="collapse" data-target="#c'+id+'" aria-expanded="true" aria-controls="c'+id+'"></img><div id="c'+id+'" class="collapse" aria-labelledby="headingOne" data-parent="#accordion"><div class="card-body" style="margin:0px;background:rgba(243,243,243,0.4);border-radius:50px;"><p style="font-size:'+innerWidth/24+'px; text-align:center;"><br>'+data.items[i].description+'<br/></p></div></div></div>';
    }
}

function Back(){
    window.location.href = "main.html";
    document.querySelector('body').classList = [];
}