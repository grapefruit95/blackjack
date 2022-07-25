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

    dealToHand(numCards){
        if(numCards > deck.length){
            return false;
        }
        while(numCards > 0){
            this.cardsInHand.push(deck.pop());
            numCards--;
        }
        return true;
    }
}
//GLOBALS
//deck organized how a real deck is organized new in box
export let deck = [];
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

export function removeJokers(){
    for(let i = deck.length-1; i >= 0; i--){
        if(deck[i] == "JK"){
            deck.splice(i, 1);
        }
    }
}

/**
 * Shuffles array in place.
 * @param {Array} array items An array containing the items.
 * Fisher-Yates shuffle. NOT MY CODE!
 */
 export function shuffle(array) {
    let j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
}

export function dealToHands(numCards){
    let cardsToDeal = numCards*hands.length;
    if(cardsToDeal > deck.length){
        return false;
    }
    while(cardsToDeal > 0){
        for(let i = 0; i < hands.length; i++){
            hands[i].dealToHand(1);
            cardsToDeal--;
        }
    }
}