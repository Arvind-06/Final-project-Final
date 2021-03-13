var sky,skyImg;
var boy,boyIMG;
var book,bookIMG,bookGroup;
var gull,gullIMG,gullGroup;
var score=0;
var position;
var restart,restartIMG;

var gameState= "play" ;

function preload(){
skyImg = loadImage("sprites/sky-271.jpg");
boyIMG = loadImage("sprites/boy running.png");
bookIMG = loadImage("sprites/book.png");
gullIMG = loadImage("sprites/seagull.png");
restartIMG = loadImage("sprites/restart.png");



}


function setup(){
createCanvas(windowWidth,windowHeight);

sky = createSprite(windowWidth/2,windowHeight/2, windowWidth,windowHeight);
sky.addImage(skyImg);

boy = createSprite(200,100);
boy.addImage(boyIMG);
boy.scale=0.3;

restart = createSprite(windowWidth/2 - 10 ,windowHeight/2 + 50);
    restart.addImage(restartIMG); 
    restart.scale = 0.2;


bookGroup= new Group();
gullGroup= new Group();

}

function draw(){
background(82,134,192);

if (gameState === "play") {
    
 restart.visible=false;
    
    boy.x=mouseX;
    boy.y=mouseY;
    
if(bookGroup.isTouching(boy)){
     score=score+1;
     bookGroup.destroyEach();
     
 }
if(gullGroup.isTouching(boy)){
    score=score-1;
    gullGroup.destroyEach();
}

 if(score < 0){
    gameState="end";
}
drawSprites();
fill("red")
stroke ("black");
textSize(30);
text("NUMBER OF BOOKS COLLECTED : "+ score,10,50);

BOOK();
seagull();
}
 
if(gameState === "end"){
    bookGroup.setVelocityXEach(0);
    gullGroup.setVelocityXEach(0);

    restart.visible=true;

    drawSprites();

    if(mousePressedOver(restart)){
        gameState="play";
        score=0;
       // restart.destroy();
        gullGroup.destroyEach();
        bookGroup.destroyEach();
    }
    
   push ();
    fill("yellow")
    strokeWeight(10);
    stroke ("red");
    textSize(80);
    text("GAME OVER ",windowWidth/2-200 ,windowHeight/2 -40);
    pop ();

    rectMode(CENTER);
    rect (windowWidth/2-300 ,windowHeight/2 -300 , 370, 100);
    fill("red");
    textSize(20)
    text ("TRY WITHOUT HITTING THE BIRDS.." + "\n" +"CLICK THE RESTART TO RESTART!!", windowWidth/2-480 ,windowHeight/2 -300);
    
    
}


}

function BOOK(){
if(frameCount % 137 === 0){
book = createSprite(windowWidth,400);
book.addImage(bookIMG);
book.scale=0.35;

book.y = Math.round(random(10,windowHeight-20));
book.x = Math.round(random(-10,0));
book.x = Math.round(random(windowWidth,windowWidth+10));

position = Math.round(random(1,2));
 if(position==1) {
     book.x=windowWidth; 
     book.velocityX = -10;
     book.velocityX=-(10+(score/2)); 
 } 
 
 else { 
     if(position==2){ 
     book.x=0;
     book.velocityX = 10;
     book.velocityX=+(10+(score/2)); 
 }
 
}

  bookGroup.add(book);
}

}

function seagull(){
    if(frameCount % 173 === 0){
        gull = createSprite(windowWidth+20,400);
        gull.addImage(gullIMG);
        gull.scale=0.7;
        gull.velocityX = -10; 
        gull.y = Math.round(random(20,windowHeight-20));
        gull.velocityX =-(10+(score/2)); 
        gullGroup.add(gull);
}

}
