let bar = document.querySelector(".bar");
let ball = document.querySelector(".ball");
let boxes = document.querySelectorAll(".box");

let barPosition = 0;
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


let offsetX, offsetY;


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

    
    body.addEventListener("mouseup", mouseUpHandler);
}
body.addEventListener("mousemove", mouseMoveHandler);
function mouseUpHandler(e) {
    body.removeEventListener("mouseup", mouseUpHandler);
    body.removeEventListener("mousemove", mouseMoveHandler);
}

function mouseMoveHandler(e) {
    if(e.clientX-offsetX > "1120" || e.clientX-offsetX < "10") return;
    bar.style.left = `${e.clientX - offsetX}px`;


}

const pos45 = () => {
    ball.style.transform = `translate(${ballAnim1X}px,${ballAnim1Y}px)`;
    ballAnim1X++;
    ballAnim1Y--;


    boxes.forEach((box)=>{
        let ballRect = ball.getBoundingClientRect();
        let boxRect = box.getBoundingClientRect();
        if (
            ballRect.right >= boxRect.left &&
            ballRect.left <= boxRect.right &&
            ballRect.bottom >= boxRect.top &&
            ballRect.top <= boxRect.bottom
            
        ) {
            box.remove();
        }
    })
    
}
const pos135 = () => {
    ball.style.transform = `translate(${ballAnim1X}px,${ballAnim1Y}px)`;
    ballAnim1X--;
    ballAnim1Y--;


    boxes.forEach((box)=>{
        let ballRect = ball.getBoundingClientRect();
        let boxRect = box.getBoundingClientRect();
        if (
            ballRect.right >= boxRect.left &&
            ballRect.left <= boxRect.right &&
            ballRect.bottom >= boxRect.top &&
            ballRect.top <= boxRect.bottom
        ) {
            box.remove();
        }
    })
    
}

function gamePlay(){

    if (Math.floor(Math.random()*2) + 1 === 1) {
        ballAnim1X = 0;
        ballAnim1Y = 0;

        setInterval(pos45, 7);

    } 
    else {
        ballAnim1X = 0;
        ballAnim1Y = 0;

        setInterval(pos135, 7);
    }
}









// ---------------------------------------------------------------------------------------------------------------------------//
                                            //extreme right of UI window - 1098px                                           
                                            //extreme bottom of UI window - 582px
// ---------------------------------------------------------------------------------------------------------------------------//








