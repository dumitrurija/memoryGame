const container = document.querySelector(".container")
const startMenu = document.querySelector(".start-menu")
const endMenu = document.querySelector(".end-menu")
const startMenuBtn = document.querySelector(".start-menu button")
const containerBtn = document.querySelector(".container button")
const scoreEl = document.querySelector(".container h1")

container.classList.add("display-none")
endMenu.classList.add("display-none")

setInterval(() => {
    const title = document.querySelector(".start-menu h1")
    title.style.animation = "rotateBackAndForth 0.5s ease-in-out";
    
    setTimeout(() => {
        title.style.animation = "none";
    }, 500);
}, 3000);

startMenuBtn.addEventListener("click", () => {
    toggleDisplayNone()
    playGame()
})

containerBtn.addEventListener("click", () => {
    toggleDisplayNone()
    location.reload()
})

function playGame() {
    let score = 0
    let currentRound = 0
    let totalRounds = 1

    let correctMoves = []
    let playerMoves = []
    const colors = ["blue", "red", "green", "purple"]

    function gameLogic() {
        if (currentRound < totalRounds) {
            currentRound++
            let computerMove = Math.floor(Math.random() * colors.length)
            let randomCircle = colors[computerMove]
            let targetDiv = document.querySelector(`.${randomCircle}`)

            correctMoves.push(randomCircle)
            
            scoreEl.textContent = `Score: ${score}`

            document.querySelectorAll(`.container div`).forEach(el => {
                el.classList.remove("active")
            })

            setTimeout(() => {
                targetDiv.classList.add("active")
            }, 100)

            setTimeout(() => {
                targetDiv.classList.remove('active');
                if (currentRound === totalRounds) {
                    playerChoice()
                }
            }, 1000);
        }
    }

    gameLogic()

    function playerChoice() {
        const allCirclesEls = document.querySelectorAll(".container div")

        allCirclesEls.forEach((circle, idx) => {
            circle.addEventListener("click", () => {
                if (playerMoves.length < correctMoves.length) {
                    playerMoves.push(colors[idx])

                    circle.classList.add("active-player")
                    setTimeout(() => {
                        circle.classList.remove('active-player');
                    }, 200);

                    if (!compareResult(playerMoves, correctMoves)) {
                        nextRound(false);
                    } else if (playerMoves.length === correctMoves.length) {
                        nextRound(true);
                    }
                    
                    
                }
            })
        })
    }

    function nextRound(guessed) {
        if (guessed) {
            console.log("Congrats. On to the next one!");
            playerMoves = []
            currentRound = 0
            totalRounds++
            score++
            scoreEl.textContent = `Score: ${score}`
            setTimeout(gameLogic, 1000)
        } else {
            
            
            document.body.style.backgroundColor = "darkred"
            setTimeout(() => {
                wrongSound.play()
                wrongSound.volume = 0.05
                document.body.style.backgroundColor = "#303030"
            }, 1000)

            container.classList.add("display-none")
            endMenu.classList.remove("display-none")

            setInterval(() => {
                const endMenuEl = document.querySelector(".end-menu div")
                endMenuEl.style.animation = "rotateBackAndForth 0.5s ease-in-out";
                
                setTimeout(() => {
                    endMenuEl.style.animation = "none";
                }, 500);
            }, 3000);

            document.querySelector(".end-menu h1").innerHTML = `Final Score: ${score}<section> <p> Correct Order: ${correctMoves.join(" ")}</p> <p> Your Order: ${playerMoves.join(" ")}</p></section>`
        }
    }

    function compareResult(arr1, arr2) {
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }

        return true;
    }
}

function toggleDisplayNone() {
    startMenu.classList.toggle("display-none")
    container.classList.toggle("display-none")
}


const closeEndMenuEl = document.querySelector(".fa-xmark")
closeEndMenuEl.addEventListener("click", () => {
    document.querySelector(".end-menu div").style.display = "none"
})

const startBtn = document.querySelector(".end-menu button") 
startBtn.addEventListener("click", () => {
    endMenu.classList.add("display-none")
    container.classList.remove("display-none")
    location.reload()
})


let wrongSound = new Audio('soundeffects/wrong.wav')

function bass1() {
    let bass1 = new Audio("soundeffects/bass1.mp3")
    bass1.play()
    bass1.volume = 0.05
}

function bass2() {
    let bass2 = new Audio("soundeffects/bass2.mp3")
    bass2.play()
    bass2.volume = 0.05
}

function bass3() {
    let bass3 = new Audio("soundeffects/bass3.mp3")
    bass3.play()
    bass3.volume = 0.05
}

function bass4() {
    let bass4 = new Audio("soundeffects/bass4.mp3")
    bass4.play()
    bass4.volume = 0.05
}