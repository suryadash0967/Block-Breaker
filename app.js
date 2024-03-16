let bar = document.querySelector(".bar");
let ball = document.querySelector(".ball");
let boxes = document.querySelectorAll(".box");

let barPosition = bar.getBoundingClientRect().left;
let gameStarted = false;

let h2Begin = document.createElement("h2");
h2Begin.innerText = "Press 'Enter' to start";

let body = document.querySelector("body");
body.appendChild(h2Begin);
h2Begin.style.zIndex = "100";
h2Begin.style.position = "absolute";
h2Begin.style.top = "50%";
h2Begin.style.left = "40.5%";
h2Begin.style.color = "#fff";

let ballAnim0X=0;
let ballAnim0Y=0;
let offsetX, offsetY;
let intervalId;

document.addEventListener("keyup", (event)=>{
    if(event.key==="Enter" && !gameStarted) {
        gameStarted=true;
        h2Begin.innerText="";
        gamePlay();

    };  
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

if (gameStarted) {

}



bar.addEventListener("mousedown", mouseDownHandler);


function mouseDownHandler(e) {
    offsetX = e.clientX - bar.getBoundingClientRect().left;
    offsetY = e.clientY - bar.getBoundingClientRect().top;

    
    window.addEventListener("mouseup", mouseUpHandler);
}
window.addEventListener("mousemove", mouseMoveHandler);
function mouseUpHandler(e) {
    window.removeEventListener("mouseup", mouseUpHandler);
    window.removeEventListener("mousemove", mouseMoveHandler);
}

function mouseMoveHandler(e) {
    if(e.clientX-offsetX > "1120" || e.clientX-offsetX < "10") return;
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

    if(ballRect.right >= 1340) { 
        pos135(ballAnim1X,ballAnim1Y)
    }
    if(ballRect.bottom > 565) {
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
            neg45(ballAnim1X,ballAnim1Y)
        }
    })
},7)
    
}


let p=0;



const neg45 = (ballAnim2X,ballAnim2Y) => {
    clearInterval(intervalId);

    intervalId = setInterval(()=>{
    ball.style.transform = `translate(${ballAnim2X}px,${ballAnim2Y}px)`;
    ballAnim2X++;
    ballAnim2Y++;

    let ballRect = ball.getBoundingClientRect();
    let barRect = bar.getBoundingClientRect();


    if(ballRect.right >= 1330) {
        neg135(ballAnim2X,ballAnim2Y);
    }
    if(ballRect.bottom >= 585) {
        clearInterval(intervalId);
        h2Begin.innerText="Game Over";
    }
    
    if((Math.floor(ballRect.bottom) == Math.floor(barRect.top)) && (ballRect.right > barRect.left) && (ballRect.left < barRect.right)) {
        pos45(ballAnim2X,ballAnim2Y);
    }


    boxes.forEach((box)=>{
        let boxRect = box.getBoundingClientRect();            
            if(
                ballRect.right >= boxRect.left &&
                ballRect.left <= boxRect.right &&
                ballRect.bottom >= boxRect.top &&
                ballRect.top <= boxRect.bottom
            
        ) {
            box.remove();
            neg135(ballAnim2X,ballAnim2Y)
        }
    })
},7)
}








const neg135 = (ballAnim3X,ballAnim3Y) => {
    clearInterval(intervalId);


    intervalId = setInterval(()=>{
    ball.style.transform = `translate(${ballAnim3X}px,${ballAnim3Y}px)`;
    ballAnim3X--;
    ballAnim3Y++;

    let ballRect = ball.getBoundingClientRect();
    let barRect = bar.getBoundingClientRect();

    if(ballRect.bottom >= 585) {
        clearInterval(intervalId);
        h2Begin.innerText="Game Over"
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
            pos135(ballAnim3X,ballAnim3Y)

        }
    })
},7)
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



    boxes.forEach((box)=>{
        let boxRect = box.getBoundingClientRect();
        if (
            ballRect.right >= boxRect.left &&
            ballRect.left <= boxRect.right &&
            ballRect.bottom >= boxRect.top &&
            ballRect.top <= boxRect.bottom
        ) {
            box.remove();
            neg135(ballAnim4X,ballAnim4Y)
        }
    })
},7)
}

function gamePlay(){

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








