const pipe = document.querySelector(".game-pipe")
const btn_play = document.querySelector(".game-btn-play")
const player = document.querySelector(".game-player")
const clouds = document.querySelector(".game-clouds")
const playerJumpAudio = document.querySelector(".game-sound--jump")
const gameMusicAudio = document.querySelector(".game-sound--music")
const gameOverMusic = document.querySelector(".game-sound--gameover")
const gameBackground = document.querySelector(".game-background")
pipe.style.visibility = "hidden"

let loop = true
gameBackground.oncontextmenu = () => false

function startGame() {
    gameMusicAudio.play()
    pipe.style.visibility = "visible"
    pipe.style.animation = "pipeMove 1.3s linear infinite"
    clouds.style.animation = "cloudsMove 2.5s linear infinite"
    setInterval(() => {
        const pipePos = pipe.offsetLeft
        const playerPos = +window.getComputedStyle(player).bottom.replace("px", "")

        if (sobreposicao(player, pipe)) {
            loop = false
            gameMusicAudio.pause()
            playerJumpAudio.pause()
            gameOverMusic.play()
            setTimeout(() => {
                gameOverMusic.src = ""
            }, 7000)
            gameOver(pipePos, playerPos)
        }
    }, 10)

    document.addEventListener("keydown", (e) => {
        if (e.keyCode === 32 && loop === true) {
            jump()
        }
    })
    document.ontouchstart = () => {
        loop && jump()
    }
    document.ontouchend = () => {
        loop ? player.src = "./game/imgs/mario2.gif" : ""
    }

}
function jump() {
    player.style.animation = "jump 600ms linear"
    player.src = "./game/imgs/mario_flying.png"
    playerJumpAudio.play()

    setTimeout(() => {
        player.style.animation = ""
        player.src = "./game/imgs/mario2.gif"
    }, 500);
}

function sobreposicao(elemA, elemB) {
    const a = elemA.getBoundingClientRect()
    const b = elemB.getBoundingClientRect()

    const horizontal = a.left + a.width >= b.left
        && b.left + b.width >= a.left

    const vertical = a.top + a.height >= b.top
        && b.top + b.height >= a.top

    return vertical && horizontal
}

function gameOver(pipePos, playerPos) {
    pipe.style.animation = "none"
    pipe.style.left = `${pipePos}px`
    player.style.animation = "none"
    player.style.bottom = `${playerPos}px`
    player.src = "../game/imgs/game-over.png"
    player.classList.add("game-player--small")
    player.style.animation = "gameover 1s ease-out"
    clouds.style.animation = "none"
    
    setTimeout(() => {
        player.style.visibility = "hidden"
    }, 1000);
}
console.log(loop)
btn_play.addEventListener("click", () => {
    loop ? startGame() :
    location.reload() && startGame()
})