const pipe = document.querySelector(".game-pipe")
const btn_play = document.querySelector(".game-btn-play")
const player = document.querySelector(".game-player")
const clouds = document.querySelector(".game-clouds")
pipe.style.visibility = "hidden"

let loop = true

function startGame() {
    pipe.style.visibility = "visible"
    pipe.style.animation = "pipeMove 1.3s linear infinite"
    clouds.style.animation = "cloudsMove 2.5s linear infinite"
     setInterval(() => {
        const pipePos = pipe.offsetLeft
        const playerPos = +window.getComputedStyle(player).bottom.replace("px", "")
        if (pipePos <= 95 && pipePos > 0 && playerPos < 60) {
            gameOver(pipePos, playerPos)
        }
    }, 10)

    document.addEventListener("keydown", (e) => {
        if (e.keyCode === 32) {
            jump()
        }
    }) 

    document.ontouchstart = ()=>{
        jump()
    }
}
function jump() {
    player.style.animation = "jump 600ms linear"
    setTimeout(() => {
        player.style.animation = ""
    }, 500);
}
function gameOver(pipePos, playerPos) {
    loop = false
    pipe.style.animation = "none"
    pipe.style.left = `${pipePos}px`
    player.style.animation = "none"
    player.style.bottom = `${playerPos}px`
    player.src = "../src/imgs/game-over.png"
    player.style.height = "100px"
    clouds.style.animation= "none"
}
console.log(loop)
btn_play.addEventListener("click",()=>{loop ? startGame() : location.reload() &&startGame()})
   