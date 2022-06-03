const pipe = document.querySelector(".game-pipe")
const btn_play = document.querySelector(".game-btn-play")
const player = document.querySelector(".game-player")
const clouds = document.querySelector(".game-clouds")
const playerJumpAudio = document.querySelector(".game-sound--jump")
const gameMusicAudio = document.querySelector(".game-sound--music")
const gameOverMusic = document.querySelector(".game-sound--gameover")
player.src = "./game/imgs/mario1.png"
player.style.height = "90px"
pipe.style.visibility = "hidden"
let loop = true

function startGame() {
    player.src = "./game/imgs/mario2.gif"
    player.style.height = "120px"

    gameMusicAudio.play()
    pipe.style.visibility = "visible"
    pipe.style.animation = "pipeMove 1.3s linear infinite"
    clouds.style.animation = "cloudsMove 2.5s linear infinite"
    setInterval(() => {
        const pipePos = pipe.offsetLeft
        const playerPos = +window.getComputedStyle(player).bottom.replace("px", "")

        if (sobreposicao(player, pipe)) {
            gameMusicAudio.pause()
            gameOver(pipePos, playerPos)
        }
    }, 10)

    document.addEventListener("keydown", (e) => {
        if (e.keyCode === 32) {
            jump()
        }
    })

    document.ontouchstart = () => {
        jump()
    }
}
function jump() {
    player.src = "./game/imgs/mario_flying.png"
    player.style.animation = "jump 600ms linear"
    player.style.height = "90px"
    playerJumpAudio.play()

    setTimeout(() => {
        player.style.animation = ""
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
    loop = false
    gameOverMusic.play()
    pipe.style.animation = "none"
    pipe.style.left = `${pipePos}px`
    player.style.animation = "none"
    player.style.bottom = `${playerPos}px`
    player.src = "../game/imgs/game-over.png"
    player.style.height = "100px"
    player.style.animation = "gameover 1s linear"
    clouds.style.animation = "none"
    setTimeout(() => {
        gameOverMusic.pause()
    }, 7000);
    setTimeout(() => {
        player.style.visibility = "hidden"
    }, 1000);
}
console.log(loop)
btn_play.addEventListener("click", () => { loop ? startGame() : location.reload() && startGame() })
