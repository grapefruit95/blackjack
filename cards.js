class Hand{
    constructor(name, initNumCards){
        this.cardsInHand = [];
        this.value = this.getValue();
        this.isDealer = false;
        let i = 0
        while(i < initNumCards){
            this.cardsInHand.push(deck.pop());
            console.log(this.cardsInHand);
            i++;
        }
    }

    getValue(){
        return 1;
    }
}

export let hands = [];
let numHands = 0;

export function createHand(){
    numHands++;
    hands.push(new Hand("Player "+String(numHands), 0))
    if(numHands >= 3){
        //clones divs to to insert players into HTML
        const playerHandDiv = document.getElementById('player-hand'+String(numHands-2));
        const clonedPlayerDiv = playerHandDiv.cloneNode(true);
        clonedPlayerDiv.id = "player-hand"+String(numHands-1);
        playerHandDiv.after(clonedPlayerDiv);
    }
}

export function getHands(){
    return hands;
}

//deck organized how a real deck is organized new in box
export let deck = ["JK","JK",
"AS","2S","3S","4S","5S","6S","7S","8S","9S","10S","JS","QS","KS",
"AD","2D","3D","4D","5D","6D","7D","8D","9D","10D","JD","QD","KD",
"KC","QC","JC","10C","9C","8C","7C","6C","5C","4C","3C","2C","AC",
"KH","QH","JH","10H","9H","8H","7H","6H","5H","4H","3H","2H","AH"];