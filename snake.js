//basic set up
const gameboard = document.querySelector(".grid")
let myMusic
let eatApple
let arr = []
for(let i=0;i<900;i++){
    let newEl =  document.createElement("div")
    newEl.setAttribute("id",i)
    arr.push(newEl)
}
for (let i=0;i<arr.length;i++){
    gameboard.appendChild(arr[i])
} 
//collect all the sqaures in the grid and store them into an array
let squares = document.querySelectorAll(".grid div")
//create the start button:
let start_btn = document.querySelector("#start")
//create the score score display
let display = document.querySelector("#score_content")
const width =30
let score =0
const speed = 0.95
let interval=0
currentSnake = [2,1,0]
appleIndex =0

// build the start/restart game function
function start(){
    console.log("restarting")
    myMusic = new sound("snake.mp3");
    eatApple = new sound("eat.mp3")
    myMusic.sound.setAttribute("loop","true")
    myMusic.play()
    currentSnake.forEach(index=>squares[index].classList.remove("snake"))
    squares[appleIndex].classList.remove("apple")
    clearInterval(interval)
    score=0
    direction =1
    currentSnake=[2,1,0]
    display.innerText = score
    intervalTime = 600
    currentSnake.forEach(index =>squares[index].classList.add("snake"))
    interval = setInterval(moveOutcome,intervalTime)
    randomApple()
}
function moveOutcome(){
    if(
        (currentSnake[0]+width>=(width*width)&&direction===width)||//hit bottom
        (currentSnake[0]%width===width-1&&direction===1)||//hit right wall
        (currentSnake[0]-width<0&&direction===-width)||//top
        (currentSnake[0]%width===0&&direction===-1)||
        squares[currentSnake[0]+direction].classList.contains("snake")

    ){
        myMusic.stop()
        alert("Game Over")
        return clearInterval(interval)
    }
    let tail = currentSnake.pop()
    console.log(tail+" is tail")
    squares[tail].classList.remove("snake")
    currentSnake.unshift(currentSnake[0]+direction)
    if(squares[currentSnake[0]].classList.contains("apple")){
        eatApple.play()
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        score++
        display.textContent=score
        intervalTime*=speed
        clearInterval(interval)
        interval = setInterval(moveOutcome,intervalTime)
        randomApple()
    }
    squares[currentSnake[0]].classList.add("snake")
    console.log(currentSnake)
    console.log(squares)
}
class sound {
    constructor(src) {
        this.sound = document.createElement("audio")
        this.sound.src = src
        this.sound.setAttribute("preload", "auto")
        this.sound.setAttribute("controls", "none")
        this.sound.style.display = "none"
        document.body.appendChild(this.sound)
        this.play = function () {
            this.sound.play()
        }
        this.stop = function () {
            this.sound.pause()
        }
        
    }
}

// handle the key press 
function control(e){
    
    
        if(e.keyCode===39){// go right when the user press the right button
            direction =1
        }
        if(e.keyCode===38){// go up when the user press up button
            direction =-width
        }
        if(e.keyCode===37){//left
            direction =-1
        }
        if(e.keyCode===40){//down
            direction =width
        }

        console.log(direction)
    
}

// generate random apples
function randomApple(){
    do{
        appleIndex = Math.floor(Math.random()*squares.length)
        
    }while(squares[appleIndex].classList.contains("snake"))
    squares[appleIndex].classList.add("apple")
}

document.addEventListener("keydown",control)

start_btn.addEventListener("click",start)