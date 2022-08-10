import { createHand, hands, deck, removeJokers, shuffle, dealToHands, removeHand } from "./cards.js";
import { updateDisplayCards, updateDisplayText } from "./display.js";

export let currentPlayer = 1;
export let numSplits = 0;
let playerChoice = "";
let hitOnSoftSeventeen = false;
let gameOver = false;

function main(){
    setUpHands();

    let shoeSize = parseInt(prompt("Shoe Size: "));
    setUpShoe(shoeSize);

    hitOnSoftSeventeen = getSoftSeventeenBool();
    console.log(hitOnSoftSeventeen);

    removeJokers();
    console.log(deck);

    shuffle(deck);
    console.log(deck);

    dealToHands(2);
    console.log(hands);

    updateDisplayCards();
    console.log(numPlayers);


    document.addEventListener("keydown", detectInput);
    document.getElementById("hit-btn").addEventListener("click", detectHitBtn);
    document.getElementById("stand-btn").addEventListener("click", detectStandBtn);
    document.getElementById("split-btn").addEventListener("click", detectSplitBtn);
    document.getElementById("nexthand-btn").addEventListener("click", detectNextHandBtn);

}

export let numPlayers = 0;
function setUpHands(){
    if(!gameOver){
        while(numPlayers < 1 || numPlayers > 10){
            numPlayers = parseInt(prompt("Number of players (1-10): "));
        }
    }
    for(let i = 0; i < numPlayers+1; i++){
        createHand();
    }
    hands[0].isDealer = true;
    console.log(hands);
    gameOver = false;
}

let inputCode = "";
function detectHitBtn(){
    if(!gameOver){
        inputCode = "H";
        detectInput();
    }
}
function detectStandBtn(){
    if(!gameOver){
        inputCode = "S";
        detectInput();
    }
}
function detectSplitBtn(){
    if(!gameOver){
        inputCode = "P";
        detectInput();
    }
}
function detectNextHandBtn(){
    if(gameOver){
        inputCode = "N";
        detectInput();
    }
}

function detectInput(){
    if(!gameOver){
        if(event.key == "S" || inputCode == "S"){
            inputCode = "";
            playerChoice = "Stand";
            currentPlayer++;
            updateDisplayCards();
            if(currentPlayer == hands.length){
                finishGame(hitOnSoftSeventeen, hands)
            }
        }
        else if(event.key == "H" || inputCode == "H"){
            inputCode = "";
            playerChoice = "Hit";
            hands[currentPlayer].dealToHand(1);
            if(hands[currentPlayer].getValue() == -1) currentPlayer++;
            updateDisplayCards();
            if(currentPlayer == hands.length){
                finishGame(hitOnSoftSeventeen, hands)
            }
        }
        else if(event.key == "P" || inputCode == "P"){
            inputCode = "";
            numSplits++;
            createHand();
            hands[hands.length-1].cardsInHand.push(hands[currentPlayer].cardsInHand.pop());
            console.log(hands);
            updateDisplayCards();
        }
    }
    if(gameOver){
        if(event.key == "N" || inputCode == "N"){
            inputCode = "";
            currentPlayer = 1;
            while(numSplits){
                removeHand();
                numSplits--;
            }
            console.log(hands);
            clearHands(hands);
            dealToHands(2);
            updateDisplayCards();
            gameOver = false;
            document.getElementById("resultoutput").textContent = "";
        }
    }
}

function finishGame(hitOnSoftSeventeen){
    inputCode = "";
    runDealerTurn(hitOnSoftSeventeen);
    updateDisplayCards(true);
    checkWin();
    gameOver = true;
}

function clearHands(hands){
    for(let i = 0; i < hands.length; i++){
        hands[i].cardsInHand = [];
    }
}

function setUpShoe(size){
    for(let i = 0; i < size; i++){
        deck.push("JK","JK",
        "AS","2S","3S","4S","5S","6S","7S","8S","9S","10S","JS","QS","KS",
        "AD","2D","3D","4D","5D","6D","7D","8D","9D","10D","JD","QD","KD",
        "KC","QC","JC","10C","9C","8C","7C","6C","5C","4C","3C","2C","AC",
        "KH","QH","JH","10H","9H","8H","7H","6H","5H","4H","3H","2H","AH");
    }
    console.log(deck);
    return true;
}

function getSoftSeventeenBool(){
    let hit = prompt("Must the dealer hit on a soft 17? (Y/N): ");
    if(hit == "Y") return true;
    if(hit == "N") return false;
    return true;
}

function runDealerTurn(hitOnSoftSeventeen){
    let dealer = hands[0];
    while(dealer.getValue() < 17 && dealer.getValue() !== -1){
        dealer.dealToHand(1);
    }
    if(dealer.getValue() == 17 && hitOnSoftSeventeen && (String(dealer.cardsInHand).indexOf("A") !== -1) ){
        dealer.dealToHand(1);
    }
}

function checkWin(){
    console.log(hands);
    let winStr = "";
    let dealerSum = hands[0].getValue();
    for(let i = 1; i < hands.length; i++){
        if(hands[i].getValue() > dealerSum){
            winStr += "Player "+String(i)+" wins ";
        }
    }
    if(winStr == ""){
        winStr = "Dealer Wins";
    }
    updateDisplayText(winStr);
    console.log(winStr)
}

main();