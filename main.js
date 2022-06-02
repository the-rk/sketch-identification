function setup(){
    canvas = createCanvas(250,250);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}
function clear(){
    background("white");
}
function preload(){
classifier = ml5.imageClassifier('DoodleNet');
}
function draw(){
    strokeWeight(13);
    stroke("red");
    if (mouseIsPressed){
    line(pmouseX,pmouseY,mouseX,mouseY);
    }
}
function classifyCanvas(){
    classifier.classify(canvas,gotresult);
}
function gotresult(error,results){
if (error){
    console.error(error);
}
else{
  console.log(results);
  document.getElementById("label").innerHTML = "label: "+ results[0].label;
  document.getElementById("confidence").innerHTML = "confidence: "+ Math.round(results[0].confidence *100)+"%";
  utterThis = new speachSynthesisUtterance(results[0].label);
  synth.speak(utterThis);
}
}