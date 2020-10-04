// Variables 
const originalText = document.querySelector('#originalText').innerHTML;
const textWrapper = document.querySelector('#test-wrapper');
const textArea = document.querySelector('#textArea');
const theTimer = document.querySelector('#timer');
const resetBtn = document.querySelector('#reset');
const errorBtn = document.querySelector('#error');
var timer = [0,0,0,0];
var interval;
var errorText= 0;
var timeRunning = false;

// Leading Zero for Timer
function leadingZero(time){
    if (time < 10) {
        time = "0" + time;
    } 
    return time;
}

// Timer Function
function runTimer(){
    theTimer.innerHTML = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60); 
    timer[1] = Math.floor((timer[3]/100)-(timer[0])*60); 
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000)); 
}

// Start Function
function start(){
    let textEnteredLength = textArea.value.length;
    if (textEnteredLength == 0 && !timeRunning) {
        timeRunning = true;
        interval = setInterval(runTimer,10);
    }
}

// Spell Checker Function
function spellchecker(){
    let textEntered = textArea.value;
    let originalTextMatch = originalText.substring(0,textEntered.length);
    if (textEntered == originalText){
        textWrapper.style.borderColor = "green";
        clearInterval(interval);
    } else {
        if (textEntered == originalTextMatch){
            textWrapper.style.borderColor = "blue";       
        } else {
            textWrapper.style.borderColor = "red";
            errorText++
        }
    }  
}

// Reset Function
function reset(){
    clearInterval(interval);
    timer = [0,0,0,0];
    timeRunning = false;
    interval = null;
    errorText = 0;
    theTimer.innerHTML = "00:00:00";
    textWrapper.style.borderColor = "grey";
    textArea.value = "";
}

// Error Function
function error(){
    textWrapper.style.borderColor = "grey";
    textArea.value = `You got ${errorText} error(s)! Press Start Over to TRY AGAIN...`;
    clearInterval(interval);
    errorText = 0;
}
textArea.addEventListener('keypress',start,false);
textArea.addEventListener('keyup',spellchecker,false);
resetBtn.addEventListener('click',reset,false);
errorBtn.addEventListener('click',error,false);
