let bar = document.querySelector(".bar");
let ball = document.querySelector(".ball");
let boxes = document.querySelectorAll(".box");

let count=0, blockX=0, blockY=10;


boxes.forEach((box)=>{
    if(count%17==0){
        blockX=0;
        blockY += 34;
    }
    box.style.position="absolute";
    box.style.left = `${blockX}px`;
    box.style.top = `${blockY}px`;
    blockX += 80;
    count++;

})




let barPosition = bar.getBoundingClientRect().left;
let gameStarted = false;

let h2Begin = document.createElement("h2");
let h2End = document.createElement("h2");
let para = document.createElement("p");

h2Begin.innerText = "Press 'Enter' or 'Click' anywhere to start";

let body = document.querySelector("body");

h2End.innerText = "";
body.appendChild(h2End);
h2End.style.zIndex = "100";
h2End.style.fontWeight = "400";
h2End.style.position = "absolute";
h2End.style.top = "50%";
h2End.style.left = "41.5%";
h2End.style.color = "#fff";


body.appendChild(h2Begin);
h2Begin.style.zIndex = "100";
h2Begin.style.fontWeight = "400";
h2Begin.style.position = "absolute";
h2Begin.style.top = "40%";
h2Begin.style.left = "31.5%";
h2Begin.style.color = "#fff";


para.innerHTML = "<p><b>Instructions:</b></br> 1. Hold The Bar And Move The Mouse To Move </br> 2. Refresh To Play Again   </br>  3. Do Not Play This On A Phone  </p>";
body.appendChild(para);
para.style.zIndex = "100";
para.style.textAlign = "start";
para.style.fontWeight = "400";
para.style.position = "absolute";
para.style.top = "50%";
para.style.left = "31.5%";
para.style.color = "#fff";


let ballAnim0X=0;
let ballAnim0Y=0;
let offsetX, offsetY;
let intervalId;

document.addEventListener("keyup", (event)=>{
    if(event.key==="Enter" && !gameStarted) {
        gameStarted=true;
        h2Begin.innerText="";
        para.innerText="";
        gamePlay();

    };  
})
document.addEventListener("click", (event)=>{

        if(!gameStarted) { gameStarted=true;
        h2Begin.innerText="";
        para.innerText="";
        gamePlay();
        }

})

document.addEventListener("keyup", (event) => {
    if (gameStarted) {
        if (event.key === "ArrowRight") {
            barPosition += 45;
            bar.style.left = `${barPosition}px`;
        }
        if (event.key === "ArrowLeft") {

            barPosition -= 45;
            bar.style.left = `${barPosition}px`;
        }
    }
})



bar.addEventListener("mousedown", mouseDownHandler);

function mouseDownHandler(e) {
    offsetX = e.clientX - bar.getBoundingClientRect().left;
    offsetY = e.clientY - bar.getBoundingClientRect().top;

    
    window.addEventListener("mouseup", mouseUpHandler);
    window.addEventListener("mousemove", mouseMoveHandler);
}
function mouseUpHandler(e) {
    window.removeEventListener("mouseup", mouseUpHandler);
    window.removeEventListener("mousemove", mouseMoveHandler);
}

function mouseMoveHandler(e) {
    if(e.clientX-offsetX > "1200" || e.clientX-offsetX < "6") return;
    bar.style.left = `${e.clientX - offsetX}px`;
}




const pos45 = (ballAnim1X,ballAnim1Y) => {

    clearInterval(intervalId);

    intervalId = setInterval(()=>{
    ball.style.transform = `translate(${ballAnim1X}px,${ballAnim1Y}px)`;
    ballAnim1X++;
    ballAnim1Y--;

    let ballRect = ball.getBoundingClientRect();
    let barRect = bar.getBoundingClientRect();

    if(ballRect.right >= 1360) { 
        pos135(ballAnim1X,ballAnim1Y)
    }
    if(ballRect.bottom > 590) {
        neg45(ballAnim1X,ballAnim1Y)
    }
    if(ballRect.top < 5) {
        neg45(ballAnim1X,ballAnim1Y)
    }


    if((Math.floor(ballRect.bottom) == Math.floor(barRect.top)) && (ballRect.right > barRect.left) && (ballRect.left < barRect.right)) {
        pos45(ballAnim1X,ballAnim1Y);
    }

    
    boxes.forEach((box)=>{
        let boxRect = box.getBoundingClientRect();
            if (
                ballRect.right >= boxRect.left &&
                ballRect.left <= boxRect.right &&
                ballRect.bottom >= boxRect.top &&
                ballRect.top <= boxRect.bottom
                
            ) {
                box.remove();
                if (boxRect.top < ballRect.top) {neg45(ballAnim1X,ballAnim1Y)}
                
                else {pos135(ballAnim1X,ballAnim1Y)}

            }
        })
    },1)
    
}




const neg45 = (ballAnim2X,ballAnim2Y) => {
    clearInterval(intervalId);

    intervalId = setInterval(()=>{
    ball.style.transform = `translate(${ballAnim2X}px,${ballAnim2Y}px)`;
    ballAnim2X++;
    ballAnim2Y++;

    let ballRect = ball.getBoundingClientRect();
    let barRect = bar.getBoundingClientRect();


    if(ballRect.right >= 1360) {
        neg135(ballAnim2X,ballAnim2Y);
    }
    if(ballRect.bottom >= 598) {
        clearInterval(intervalId);
        h2End.innerText="Game Over!";
    }
    
    if((Math.floor(ballRect.bottom) == Math.floor(barRect.top)) && (ballRect.right > barRect.left) && (ballRect.left < barRect.right)) {
        pos45(ballAnim2X,ballAnim2Y);
    }


    boxes.forEach((box)=>{
        let boxRect = box.getBoundingClientRect();            
            if(
                ballRect.right > boxRect.left &&
                ballRect.left < boxRect.right &&
                ballRect.bottom >= boxRect.top &&
                ballRect.top <= boxRect.bottom
        ) {
            box.remove();
            if ((boxRect.top > ballRect.top)) {pos45(ballAnim2X,ballAnim2Y)}
                
            else  {neg135(ballAnim2X,ballAnim2Y)}
        }
    })
},1)
}








const neg135 = (ballAnim3X,ballAnim3Y) => {
    clearInterval(intervalId);


    intervalId = setInterval(()=>{
    ball.style.transform = `translate(${ballAnim3X}px,${ballAnim3Y}px)`;
    ballAnim3X--;
    ballAnim3Y++;

    let ballRect = ball.getBoundingClientRect();
    let barRect = bar.getBoundingClientRect();

    if(ballRect.bottom >= 598) {
        clearInterval(intervalId);
        h2End.innerText="Game Over!"
        // h2Begin.style.left = "44%";
    }
    if(ballRect.left < 10) {
        neg45(ballAnim3X,ballAnim3Y)
    }
    if((Math.floor(ballRect.bottom) == Math.floor(barRect.top)) && (ballRect.right > barRect.left) && (ballRect.left < barRect.right)) {
        pos135(ballAnim3X,ballAnim3Y);
    }



    boxes.forEach((box)=>{
        let boxRect = box.getBoundingClientRect();
        if (
            ballRect.right >= boxRect.left &&
            ballRect.left <= boxRect.right &&
            ballRect.bottom >= boxRect.top &&
            ballRect.top <= boxRect.bottom
            
        ) {
            box.remove();
            if ((boxRect.right < ballRect.right)) {neg45(ballAnim3X,ballAnim3Y)}
                
            else  {pos135(ballAnim3X,ballAnim3Y)}

        }
    })
},1)
}









const pos135 = (ballAnim4X,ballAnim4Y) => {
    clearInterval(intervalId);

    intervalId = setInterval(()=>{
    ball.style.transform = `translate(${ballAnim4X}px,${ballAnim4Y}px)`;
    ballAnim4X--;
    ballAnim4Y--;

    let ballRect = ball.getBoundingClientRect();
    let barRect = bar.getBoundingClientRect();

    if(ballRect.left <= 10) {
        pos45(ballAnim4X,ballAnim4Y)
    }
    if(ballRect.top < 10) {
        neg135(ballAnim4X,ballAnim4Y)
    }
    if(ballRect.top < 5) {
        neg135(ballAnim4X,ballAnim4Y)
    }



    boxes.forEach((box)=>{
        let boxRect = box.getBoundingClientRect();
        if (
            ballRect.right >= boxRect.left &&
            ballRect.left <= boxRect.right &&
            ballRect.bottom >= boxRect.top &&
            ballRect.top <= boxRect.bottom
        ) {
            box.remove();
            if ((boxRect.right < ballRect.right)) {pos45(ballAnim4X,ballAnim4Y)}
                
            else {neg135(ballAnim4X,ballAnim4Y)}
        }
    })
},1)
}

function gamePlay(){
    // gameStarted=false;
    if (Math.floor(Math.random()*2) + 1 === 1) {
        ballAnim0X=0;
        ballAnim0Y=0;
        pos45(ballAnim0X,ballAnim0Y);
    } 
    else {
        ballAnim0X=0;
        ballAnim0Y=0;
        pos135(ballAnim0X,ballAnim0Y);
    }
}







// ---------------------------------------------------------------------------------------------------------------------------//
                                            //extreme right of UI window - 1112px                                           
                                            //extreme bottom of UI window - 599px
// ---------------------------------------------------------------------------------------------------------------------------//







