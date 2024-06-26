let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector('#msg');
const oSound = document.getElementById("o-sound");
const xSound = document.getElementById("x-sound");
const resetSound = document.getElementById("reset-sound");
const bgMusic = document.getElementById("bg-music");
const musicIcon = document.querySelector("#music-icon");
const winSound  = new Audio("music/win-sound.mp3");
let musicPlaying = true; // Initially, music is playing


//assinging the variabke if the player_O should play or player_X

let turn_o = true; //playerO,playerX

//if the both player has no move and completed all the boxes we need to dipsplay the match draw
let count = 0;

//and writing down the possible patterns to finish the game
//here we need to store the winning pattern in 2D array format!
const winPatterns =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const playWinSound = () =>{
    winSound.play();
};

// Function to toggle background music
const toggleMusic = () => {
    if (musicPlaying) {
        bgMusic.pause();
    } else {
        bgMusic.play();
    }
    musicPlaying = !musicPlaying;
    toggleMusicIcon();
};

// Start background music once the user interacts with the page
const startMusic = () => {
    if (bgMusic.paused) {
        bgMusic.play();
    }
};
startMusic();

// Event listener for clicking on the music icon
musicIcon.addEventListener("click", toggleMusic);

// Function to toggle music icon
const toggleMusicIcon = () => {
    if (musicPlaying) {
        musicIcon.src = "images/music-on-icon.png"; // Change to music on icon
    } else {
        musicIcon.src = "images/music-off-icon.png"; // Change to music off icon
    }
};

// Initial start music when the page loads
bgMusic.play();

// Event listener for clicking on the music icon
musicIcon.addEventListener("click", toggleMusic);

//Now,we need to gave the functionality to reset the total game
const resetGame = () => {
//It's mean intaially it start from turn_o    
    turn_o =true;
    enableBoxes();//we are calling the function
    //we need to hide the msg container when ever we reset the game
    msgContainer.classList.add("hide");
    count = 0;
    resetSound.play();
}
 

//here we are accesing the each box or we say each index in the array to get print the O and X in the box

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn_o){
            box.innerText = "O";
            turn_o = false;
            box.classList.add("o");
            box.classList.remove("x");
            oSound.play();

        }else{
            box.innerText = "X";
            turn_o = true;
            box.classList.add("x")
            box.classList.remove("o")
            xSound.play();
        }
        box.disabled = true;
        count ++ ;
        let isWinner = checkWinner();
        
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});
//we are calling the function to gamedraw function
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };

// And one more function we need to add that if wwe got first winner then we need to stop the game so we need to make another function to stop the boxes to print
const disableBoxes = () => {
    for (let box of boxes){
        box.disabled = true;
    }
}
//Here we are creating another funtion when ever we reset the game or newGame we need to anable the boxes
const enableBoxes = () => {
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}
//here we make funtion to show who is the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations , Winner is ${winner}`;
    //these classList we use to remove the hide class
    msgContainer.classList.remove('hide');
    //we call the function when ever the first winner is completed
    disableBoxes();
    playWinSound();
}
//here we creating a function to check the winner
const checkWinner = () => {
    for (let patterns of winPatterns) {
        //here we are getting the element indivaul to check the winPattern 
        let pos1 = boxes[patterns[0]].innerText;
        let pos2 = boxes[patterns[1]].innerText;
        let pos3 = boxes[patterns[2]].innerText;

        //the places sholud not be empty if we get the pattern[0, 4, 8] here we get 0 and 8 it is not a pattern that every postion will be not empty or not null
        if(pos1 != "" && pos2 != "" && pos3 !="") {
            if(pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true;
            }
        }
    }
    return false;
};

//Here we need to call the function when ever we click the button the event will perform action which we use eventListener to make change here the parameter acts as function of another function
newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click",resetGame);