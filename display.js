import { numPlayers } from "./blackjack.js";
import { hands } from "./cards.js";
export function updateDisplayCards(){
    const handDivDealer = document.getElementById("dealer-hand");
    handDivDealer.innerHTML = String(hands[0].cardsInHand);
    for(let i = 1; i < numPlayers+1; i++){
        const handDiv = document.getElementById("player-hand"+String(i));
        handDiv.innerHTML = String(hands[i].cardsInHand);
    }
}