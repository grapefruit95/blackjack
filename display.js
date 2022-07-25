import { numPlayers } from "./blackjack.js";
import { hands } from "./cards.js";
export function updateDisplayCards(){
    const handDivDealer = document.getElementById("dealer-hand");
    handDivDealer.innerHTML = String(hands[0].cardsInHand);
    for(let i = 1; i < numPlayers+1; i++){
        let handDiv = document.getElementById("player-hand"+String(i));
        while(handDiv.lastChild) handDiv.removeChild(handDiv.lastChild); //start drawing cards for a hand from scratch everytime, could be optimized
        for(let j = 0; j < hands[i].cardsInHand.length; j++){
            let img = new Image();
            img.src = "cardsvgs/"+hands[i].cardsInHand[j]+".svg";
            img.height = 88;
            img.width = 63;
            handDiv.appendChild(img);
        }
    }
}