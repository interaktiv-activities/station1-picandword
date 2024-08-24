// The following variables below are all the sound variables and mute/unmute fucntions 
let backgroundMusic = new Audio();
backgroundMusic.src = "sounds/bg-music.mp3";
let backgroundMusicStatus = 0;
let backgroundMusicInterval;

function playBackgroundMusic() {
    backgroundMusic.play();
    if (backgroundMusicStatus == 1) {
        backgroundMusic.volume = 0;
    } else {
        backgroundMusic.volume = 0.5;
    }
}

function muteBackgroundMusic() {
    const muteBtnImg = document.getElementById("mute-btn-img");
    if (backgroundMusicStatus == 0) {
        muteBtnImg.setAttribute("src", "assets/header/mute.png");
        backgroundMusic.volume = 0;
        backgroundMusicStatus++;
    } else {
        muteBtnImg.setAttribute("src", "assets/header/unmute.png");
        backgroundMusic.volume = 0.5;
        backgroundMusicStatus--;
    }
}

document.getElementById("mute-header-btn").addEventListener("click", muteBackgroundMusic)
//END HERE

// Card Slot and Swipe Handling
const cardSlot = document.querySelector('.card-slot');
const swipeCard = document.getElementById('swipe-card');
let startX = 0;
let currentX = 0;
let isSwiping = false;
let cardSlotWidth = cardSlot.offsetWidth; 

// Event Listeners for Swipe Actions
swipeCard.addEventListener('mousedown', startSwipe);
swipeCard.addEventListener('touchstart', startSwipe);
swipeCard.addEventListener('mousemove', swipeMove);
window.addEventListener('touchmove', swipeMove);
window.addEventListener('mouseup', endSwipe);
swipeCard.addEventListener('touchend', endSwipe);
window.addEventListener('resize', updateCardSlotWidth);

// Swipe Functions
function updateCardSlotWidth() {
    cardSlotWidth = cardSlot.offsetWidth;
}

function startSwipe(event) {
    isSwiping = true;
    startX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
}

function swipeMove(event) {
    if (!isSwiping) 
        {
            return
        } else if (isSwiping) {
            currentX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
            const deltaX = currentX - startX;
        
            // Check if swipe reached the threshold
            if (Math.abs(deltaX) > (cardSlotWidth/1.8) && isSwiping == true) {
                isSwiping = false;
                swipeCard.style.transitionDuration = `.5s`
                swipeCard.style.transform = `translateX(${cardSlotWidth}px)`;
                swipeCard.style.opacity = `0`
                startCardInterval();
            }
            else if (deltaX > 1)
            {
                swipeCard.style.transitionDuration = `0s`;
                swipeCard.style.transform = `translateX(${deltaX}px)`;
            }
        }


}

function endSwipe() {
    if (isSwiping) {
        isSwiping = false;
        swipeCard.style.transform = 'translateX(0)';
    }
}


// The following lines of codes include all of the functions and variables needed for you to transition from the start screen to the game board
let startScreenTimer

function startCardInterval() {
    startScreenTimer = setInterval(startGame, 500);
}
// Add the function below to your start game function
function hideStartScreen() {
    document.getElementById("start-screen").style.display = "none";
    playBackgroundMusic();
    backgroundMusicInterval = setInterval(playBackgroundMusic, 120000);
    clearInterval(startScreenTimer);
}

function endGame(){
    scoreCounter
    document.getElementById("game-board").style.display = "none"
    document.getElementById("header").style.display = "none"
    clearInterval(backgroundMusicInterval)
    backgroundMusic.volume = 0
    backgroundMusicStatus = 1
    if (scoreCounter >= 1){
        document.getElementById("pass-end-screen").style.display = "flex"
    } else {
        document.getElementById("fail-end-screen").style.display = "flex"
    }
}
//END HERE

//SOUNDS
var correctSound = new Audio()
correctSound.src = "sounds/match.wav"

var winSound = new Audio()
winSound.src = "sounds/victory.wav"

var wrongSound = new Audio
wrongSound.src = "sounds/wrong.mp3"

//PASS MESSAGE
const passMessage = document.getElementById('pass-msg')
const menuButton = document.getElementById('menu-btn')
//LEVEL CONTENT
const title = document.getElementById('title-img-game')
const levelquestion = document.getElementById('level-question')
const levelText = document.getElementById('level-text')
const questionText = document.getElementById('question-text')
const hintText = document.getElementById('hint-text')
const answerBox = document.getElementById('answer-box')
const submitButton = document.getElementById('submit-btn')
const hintButton = document.getElementById('hint-btn')
const passEnd = document.getElementById('pass-end-screen')

//IMAGE GRIDS
const level1Images = document.getElementById('level1-images')
const level2Images = document.getElementById('level2-images')
const level3Images = document.getElementById('level3-images')
const level4Images = document.getElementById('level4-images')
const level5Images = document.getElementById('level5-images')
const level6Images = document.getElementById('level6-images')
const level7Images = document.getElementById('level7-images')
const level8Images = document.getElementById('level8-images')
const level9Images = document.getElementById('level9-images')
const level10Images = document.getElementById('level10-images')

//COUNTER
let questionIndex = 0;
let scoreCounter = 0;

function startGame(){
    hideStartScreen()
    questionIndex++
    document.getElementById("start-screen").style.display = "none"
    title.classList.remove('hide')
    levelText.classList.remove('hide')
    questionText.classList.remove('hide')
    answerBox.classList.remove('hide')
    submitButton.classList.remove('hide')
    hintButton.classList.remove('hide')
    level1Images.classList.remove('hide')
    levelquestion.classList.remove('hide')

}

addEventListener('keypress', function (e){
    if (e.key === 'Enter') {
        submitAnswer()
    }
})

function submitAnswer(){
    var answerValue =  answerBox.value
    switch (questionIndex){
        case 1:
            if (answerValue == "INCLUSIVE"){
                questionIndex++
                answerBox.value = ""
                level1Images.classList.add('hide')
                hintText.classList.add('hide')
                level2Images.classList.remove('hide')
                levelText.innerHTML = "LEVEL " + questionIndex
                levelquestion.innerHTML = "HAVING A MEANINGFUL BELIEF AND RELATIONSHIP WITH GOD"
                questionText.innerHTML = "_ _ _- _ _ _ _ _ _ _ _"
                hintText.innerHTML = "HINT: G _ _- C _ N _ _ R _ _"
                correctSound.play()
                scoreCounter++
            } else {
                wrongSound.play()
                document.getElementById('alert').style.display = 'block'
            }
            break
        case 2:
            if (answerValue == "GOD-CENTERED"){
                questionIndex++
                answerBox.value = ""
                level2Images.classList.add('hide')
                hintText.classList.add('hide')
                level3Images.classList.remove('hide')
                levelText.innerHTML = "LEVEL " + questionIndex
                levelquestion.innerHTML = "PHRASE THAT IS SAID BEFORE COLLECTIVELY SAYING '...FOREVER!'"               
                questionText.innerHTML = "_ _ _ _ | _ _ _ _ _ | _ _ | _ _ _ | _ _ _ _ _ _"
                hintText.innerHTML = "HINT: _ _ V E | J _ S _ _|  _ N | _ _ R  |_ _ _ _ T _"
                correctSound.play()
                scoreCounter++
            } else {
                wrongSound.play()
                document.getElementById('alert').style.display = 'block'
            }
            break
        case 3:
            if (answerValue == "LIVE JESUS IN OUR HEARTS"){
                questionIndex++
                answerBox.value = ""
                level3Images.classList.add('hide')
                hintText.classList.add('hide')
                level4Images.classList.remove('hide')
                levelquestion.innerHTML = "" 
                levelText.innerHTML = "LEVEL " + questionIndex
                levelquestion.innerHTML = "THE PATRON SAINT OF OUR DE LA SALLE-COLLEGE OF SAINT BENILDE" 
                questionText.innerHTML = "_ _ . _ _ _ _ _ _ _ | _ _ _ _ _ _ _ _"
                hintText.innerHTML = "HINT: S _ . _ _ N _ L _ _ | R _ _ _ _ C _ _"
                correctSound.play()
                scoreCounter++
            } else {
                wrongSound.play()
                document.getElementById('alert').style.display = 'block'
            }
            break
        case 4:
            if (answerValue == "ST. BENILDE ROMANCON"){
                questionIndex++
                answerBox.value = ""
                level4Images.classList.add('hide')
                hintText.classList.add('hide')
                level5Images.classList.remove('hide')
                levelText.innerHTML = "LEVEL " + questionIndex
                levelquestion.innerHTML = "FREEDOM TO EXPRESS ONESELF THROUGH EXTRAORDINARY WORK TO PROVIDE MEANINGFUL SOLUTIONS TO SOCIAL PROBLEMS" 
                questionText.innerHTML = "_ _ _ _ _ _ _ _ & _ _ _ _ _ _ _ _ _ _"
                hintText.innerHTML = "HINT: _ R _ A _ _ V _ & _ N N _ _ _ T _ _ _"
                correctSound.play()
                scoreCounter++
            } else {
                wrongSound.play()
                document.getElementById('alert').style.display = 'block'
            }
            break
        case 5:
            if (answerValue == "CREATIVE & INNOVATIVE"){
                questionIndex++
                answerBox.value = ""
                level5Images.classList.add('hide')
                hintText.classList.add('hide')
                level6Images.classList.remove('hide')
                levelText.innerHTML = "LEVEL " + questionIndex
                levelquestion.innerHTML = "WHO WE ARE!"
                questionText.innerHTML = "_ _ _ _ _ _ _ _ _"
                hintText.innerHTML = "HINT: _ _ N _ _ D E _ _"
                correctSound.play()
                scoreCounter++
            } else {
                wrongSound.play()
                document.getElementById('alert').style.display = 'block'
            }
            break
        case 6:
            if (answerValue == "BENILDEAN"){
                questionIndex++
                answerBox.value = ""
                level6Images.classList.add('hide')
                hintText.classList.add('hide')
                level7Images.classList.remove('hide')
                levelText.innerHTML = "LEVEL " + questionIndex
                levelquestion.innerHTML = "A COLLEGE THAT IS KNOWN TO DO ORDINARY THINGS, EXTRAORDINARILY WELL!" 
                questionText.innerHTML = "_ _|  _ _|  _ _ _ _ _ - _ _ _ _ _ _ _  |_ _|  _ _ _ _ _ | _ _ _ _ _ _ "
                hintText.innerHTML = "HINT: D _ | _ A | _ A _ _ E - _ O _ _ _ G _ | _ _ | S _ _ _ _ | _ E _ _ _ E "
                correctSound.play()
                scoreCounter++
            } else {
                wrongSound.play()
                document.getElementById('alert').style.display = 'block'
            }
            break 
        case 7:
            if (answerValue == "DE LA SALLE-COLLEGE OF SAINT BENILDE"){
                questionIndex++
                answerBox.value = ""
                level7Images.classList.add('hide')
                hintText.classList.add('hide')
                level8Images.classList.remove('hide')
                levelText.innerHTML = "LEVEL " + questionIndex
                levelquestion.innerHTML = "IT MEANS GOING BEYOND THE ORDINARY, EXCELLENCE, AND THE SPIRIT OF CREATIVITY, FAITH, AND SERVICE" 
                questionText.innerHTML = "_ _ _ _ _ _ _ _ _ _ _ _ _"
                hintText.innerHTML = "HINT: _ X _ R _ _ _ D _ _ _ _ Y"
                correctSound.play()
                scoreCounter++
            } else {
                wrongSound.play()
                document.getElementById('alert').style.display = 'block'
            }
            break 
        case 8:
            if (answerValue == "EXTRAORDINARY"){
                questionIndex++
                answerBox.value = ""
                level8Images.classList.add('hide')
                hintText.classList.add('hide')
                level9Images.classList.remove('hide')
                levelText.innerHTML = "LEVEL " + questionIndex
                levelquestion.innerHTML = "THIS LASALLIAN VALUE MEANS UNITY AND COLLABORATION TOWARDS A COMMON GOAL, REFLECTING DLS-CSB'S VALUES OF COMMUNITY, SERVICE, AND SHARED PURPOSE" 
                questionText.innerHTML = "_ _ _ _ _ _ _ _ _ | _ _ | _ _ _ _ _ _ _"
                hintText.innerHTML = "HINT: C _ M _ _ _ I _ _ | _ N|  M _ S _ _ _ _"
                correctSound.play()
                scoreCounter++
            } else {
                wrongSound.play()
                document.getElementById('alert').style.display = 'block'
            }
            break 
        case 9:
            if (answerValue == "COMMUNION IN MISSION"){
                questionIndex++
                answerBox.value = ""
                level9Images.classList.add('hide')
                hintText.classList.add('hide')
                level10Images.classList.remove('hide')
                levelText.innerHTML = "LEVEL " + questionIndex
                levelquestion.innerHTML = "THE PATRON SAINT OF EDUCATION AND OUR FOUNDER." 
                questionText.innerHTML = "_ _ . _ _ _ _|  _ _ _ _ _ _ _ | _ _| _ _ | _ _ _ _ _"
                hintText.innerHTML = "HINT: S _ . J _ _ _|  _ _ P T _ _ T | _ _| L _ | _ _ L L _"
                correctSound.play()
                scoreCounter++
            } else {
                wrongSound.play()
                document.getElementById('alert').style.display = 'block'
            }
            break 
            case 10:
                if (answerValue == "ST. JOHN BAPTIST DE LA SALLE"){
                    questionIndex++; // Increment to reflect that the last question was answered
                    answerBox.value = "";
                    level10Images.classList.add('hide');
                    hintText.classList.add('hide');
                    title.classList.add('hide');
                    answerBox.classList.add('hide');
                    submitButton.classList.add('hide');
                    hintButton.classList.add('hide');
                    levelText.classList.add('hide');
                    questionText.classList.add('hide');
                    passMessage.classList.remove('hide');
                    menuButton.classList.remove('hide');
                    levelquestion.classList.remove('remove');
                    passEnd.classList.remove('hide');
                    winSound.play();
                    scoreCounter++;
                    endGame(); // End the game after the last level
                } else {
                    wrongSound.play();
                    document.getElementById('alert').style.display = 'block';
                }
                break;
            
    }
}

function showHint(){
    hintText.classList.remove("hide")
}