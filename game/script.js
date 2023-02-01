const gameContainer = document.querySelector(".game-container")
const tryAgain = document.querySelector(".try-again-container")
const pipe = document.querySelector(".game-pipe")
const player = document.querySelector(".game-player")
const clouds = document.querySelector(".game-clouds")
const playerJumpAudio = document.querySelector(".game-sound--jump")
const gameMusicAudio = document.querySelector(".game-sound--music")
const gameOverMusic = document.querySelector(".game-sound--gameover")
const gameBackground = document.querySelector(".game-background")
const btn_try_again = document.querySelector(".btn_try_again")

player.src = "../game/imgs/mario2.gif"
pipe.style.visibility = "hidden"
let loop = true
let started = false
let point = 0
let isPlayed = false
gameBackground.oncontextmenu = () => false

function startGame() {
    started = true
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
        if (e.code == "Space" && loop) {
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
    loop && setTimeout(() => {
        point += 1
        document.querySelector(".game-points").innerHTML = point
    }, 500);
}

function jump() {
    player.style.animation = "jump 600ms linear"
    player.src = "./game/imgs/mario_flying.png"
    playerJumpAudio.play()

    player.addEventListener("animationend", () => {
        player.src = "./game/imgs/mario2.gif";
        player.style.animation = "";
    });
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
    }
}
async function gameOver(pipePos, playerPos) {
    tryAgain.style.display = "flex"

    loop = false
    gameMusicAudio.pause()
    playerJumpAudio.pause()
    !isPlayed && gameOverMusic.play()
    

    pipe.style.animation = "none"
    pipe.style.left = `${pipePos}px`
    player.style.animation = "none"
    player.style.bottom = `${playerPos}px`
    player.src = "../game/imgs/game-over.png"
    player.classList.add("game-player--small")
    player.style.animation = "gameover 3s ease-out"
    clouds.style.animation = "none"
    setTimeout(() => {
        player.style.display = "none"
        isPlayed = true
    }, 2950);

}

window.addEventListener("keydown", (e) => {
    e.code == "Space" && !started &&
        startGame()
})

window.ontouchend = () => {
    !started && startGame()
}

btn_try_again.addEventListener("click", () => {
    loop ? startGame() :
        location.reload() && startGame()
})