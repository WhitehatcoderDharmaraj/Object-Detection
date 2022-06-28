video="";
status_1="";
objects=[];
                                
function preload(){                                            
video=createVideo('video.mp4');                                            
video.hide();                                            
}                                            
function setup(){
canvas=createCanvas(320,320);
canvas.position(330,160);
}                                            
function draw(){                                            
    image(video, 0,0,320,320);

    if(status_1!=""){
        objectDetector.detect(video,gotResult);
    
        for (i=0; i<objects.length; i++) {
            document.getElementById("status").innerHTML="Status: Objects Detected";
            document.getElementById("no_of_obj").innerHTML="Number Of Objects Detected: "+objects.length;

            fill("red");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+10,objects[i].y+10);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            
        }
    }
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model has been loaded");
    status_1=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error,results){
    
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}