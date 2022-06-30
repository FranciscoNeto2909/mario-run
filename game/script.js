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
let point = 0
gameBackground.oncontextmenu = () => false

function startGame() {
    let pipeVel = "1.3s"
    if (point >= 50) {
        pipeVel = "1.1s"
    } else if (point >= 100) {
        pipeVel = "900ms"
    } else if (point >= 200) {
        pipeVel = "700ms"
    }
    gameMusicAudio.play()
    pipe.style.visibility = "visible"
    pipe.style.animation = `pipeMove ${pipeVel} linear infinite`
    clouds.style.animation = "cloudsMove 2.5s linear infinite"
    pointCounter()
    
    setInterval(() => {
        const pipePos = pipe.offsetLeft
        const playerPos = +window.getComputedStyle(player).bottom.replace("px", "")
        sobreposicao(player, pipe, pipePos, playerPos)
    }, 100)

    document.addEventListener("keydown", (e) => {
        if (e.keyCode === 32 && loop) {
            jump()
        }
    })

    document.ontouchstart = () => {
        loop && jump()
    }

    document.ontouchend = () => {
        loop ? setTimeout(() => {
            player.src = "./game/imgs/mario2.gif"
        }, 600) : ""
    }

}
function pointCounter() {
    setInterval(() => {
        loop ? point += 1 : ""
        document.querySelector(".game-points").innerHTML = point
    }, 500);
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

function sobreposicao(elemA, elemB, pipePos, playerPos) {
    const a = elemA.getBoundingClientRect()
    const b = elemB.getBoundingClientRect()

    const horizontal = a.left + a.width >= b.left
        && b.left + b.width >= a.left

    const vertical = a.top + a.height >= b.top
        && b.top + b.height >= a.top
    if (vertical && horizontal) {
        gameOver(pipePos, playerPos)
    }
}

function points(elemA, elemB) {
    const a = elemA.getBoundingClientRect()
    const b = elemB.getBoundingClientRect()

    const horizontal = a.left + a.width >= b.left
        && b.left + b.width >= a.left

    const vertical = a.top + a.height >= b.top
        && b.top + b.height <= a.top

    if (vertical && horizontal) {
        point += 1
        document.querySelector(".game-points").innerHTML = 5
        console.log(point)
    }
}
function gameOver(pipePos, playerPos) {
    loop = false
    gameMusicAudio.pause()
    playerJumpAudio.pause()
    gameOverMusic.play()
    setTimeout(() => {
        location.reload()
    }, 7000)

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

btn_play.addEventListener("click", () => {
    loop ? startGame() :
        location.reload() && startGame()
})

