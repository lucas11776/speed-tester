/**
 * Speed Tester
 * 
 * @description
 * check how fast are you with your mouse or touch screen click
 * 
 * Developer : Themba Lucas Ngubeni
 * 
 * @version 1.0
 * @copyright OpenSource
*/


/**
 * shape #id
 * 
 * @var {string}
*/
const ELEMENT = 'shape';

/**
 * best score #id
 * 
 * @var {string}
*/
const BEST_SCORE = 'best-time';

/**
 * lowest score #id
 * 
 * @var {string}
 */
const LOWEST_SCORE = 'low-time';

/**
 * last click time score
 * 
 * @var {string}
*/
const LAST_SCORE = 'last-time';

/**
 * min time in seconds
 * 
 * @var {number} 
*/
const MAX_TIME = 5;

/**
 * mix width of shape
 * 
 * @var {number}
*/
const MIX_WIDTH = 200;

/**
 * min width of shape
 * 
 * @var {number} 
*/
const MIN_WIDTH = 50;

/**
 * user best time
 * 
 * @var {number}
*/
var bestTime = 0;

/**
 * user lowest time
 * 
 * @var {number}
*/
var lowestTime = 0;

/**
 * prev click
*/
var lastTime = 0;

/**
 * time when element is display
 * 
 * @var {number} 
*/
var startTime = 0;

/**
 * time when element is clicked
 * 
 * @var {number}
*/
var endTime = 0;


/**
 * time interval 
*/
var deleyStart; 

// start game
init();

// initialize game
function init(){
    document.getElementById(ELEMENT).style.position = 'relative';
    deleyStart = setTimeout(function(){
        displayShape();
        clearTimeout(deleyStart);
    }, Math.random() * 5000);
}

// set display timer
function startTimer(){
    deleyStart = setTimeout(function(){
        displayShape();
        clearTimeout(deleyStart);
    }, Math.random() * (MAX_TIME*1000));
}

// add click event to element
document.getElementById(ELEMENT).addEventListener("click", function(){

    // time clicked
    endTime = new Date().getTime();

    // hide element
    document.getElementById(ELEMENT).style.display = "none";

    // upadate score board
    updateTimer();

    // repeate game
    startTimer();

});

function updateTimer(){
    // time take by user to click element in seconds
    var time = (endTime-startTime) / 1000;

    // check if first start
    if(bestTime == 0 && lowestTime == 0){
        bestTime   = time;
        lastTime   = time;
        lowestTime = time;
    }else{
        // check if best time
        if(time < bestTime){
            bestTime = time;
        }
        // check is lowest time
        if(time > lowestTime){
            lowestTime = time;
        }
        lastTime = time;
    }

    document.getElementById(BEST_SCORE).innerText   = bestTime+'s';
    document.getElementById(LOWEST_SCORE).innerText = lowestTime+'s';
    document.getElementById(LAST_SCORE).innerText   = lastTime+'s';
}

/**
 * display shape in screen
 * 
 * @return {void}
*/
function displayShape(){
    
    // screen size
    var screenWidth  = document.getElementsByTagName("body")[0].clientWidth;
    var screenHeight = document.getElementsByTagName("body")[0].clientHeight;

    // position
    var yShift   = Math.random() * screenHeight;
    var xShift  = Math.random() * screenWidth;

    // element size
    var width = Math.random() * MIX_WIDTH;

    // check if width is not less that min width shape
    if(width < MIN_WIDTH){
        width = MIN_WIDTH;
    }

    // element color
    var color = randomColor();

    /*** Prevent OverFlow From Screen ***/
    var yWidth  = width+yShift;
    var xHeight = width+xShift;

    // check width
    if(yWidth > screenWidth){
        yShift = yShift-(yWidth-screenWidth);
    }

    // check hieght
    if(xHeight > screenHeight){
        xShift = xShift-(xHeight-screenHeight);
    }

    document.getElementById(ELEMENT).style.backgroundColor = color;
    document.getElementById(ELEMENT).style.top             = xShift + "px";
    document.getElementById(ELEMENT).style.left            = yShift + "px";
    document.getElementById(ELEMENT).style.width           = width + "px";
    document.getElementById(ELEMENT).style.height          = width + "px";
    document.getElementById(ELEMENT).style.display         = "block";

    // element is shown
    startTime = new Date().getTime();
}

/**
 * generate random color
 * 
 * @return {string}
*/
function randomColor(){
    var letters = "0123456789ABCDEF".split("");
    var color   = "#";
    
    for(var i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
        
    return color;
}