import { createHand, hands, deck, removeJokers, shuffle, dealToHands } from "./cards.js";
import { updateDisplayCards } from "./display.js";

export let currentPlayer = 1;
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


    document.addEventListener("keydown", hitOrStand);


}

export let numPlayers = 0;
function setUpHands(){
    while(numPlayers < 1 || numPlayers > 10){
        numPlayers = parseInt(prompt("Number of players (1-10): "));
    }
    for(let i = 0; i < numPlayers+1; i++){
        createHand();
    }
    hands[0].isDealer = true;
    console.log(hands);
}



function hitOrStand(){
    if(!gameOver){
        if(event.key == "S"){
            playerChoice = "Stand";
            updateDisplayCards();
            currentPlayer++;
            if(currentPlayer == hands.length){
                finishGame(hitOnSoftSeventeen)
            }
        }
        else if(event.key == "H"){
            playerChoice = "Hit";
            hands[currentPlayer].dealToHand(1);
            updateDisplayCards();
            if(hands[currentPlayer].getValue() == -1) currentPlayer++;
            if(currentPlayer == hands.length){
                finishGame(hitOnSoftSeventeen)
            }
        }
    }
}

function finishGame(hitOnSoftSeventeen){
    runDealerTurn(hitOnSoftSeventeen);
    updateDisplayCards();
    checkWin();
    gameOver = true;
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
    let winStr = "";
    let dealerSum = hands[0].getValue();
    for(let i = 1; i < hands.length; i++){
        if(hands[i].getValue() > dealerSum && dealerSum !== -1){
            winStr += "Player "+String(i)+" wins ";
        }
    }
    if(winStr == ""){
        winStr = "Dealer Wins";
    }
    console.log(winStr)
}

main();