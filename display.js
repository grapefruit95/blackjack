import { numPlayers } from "./blackjack.js";
import { hands } from "./cards.js";
export function updateDisplayCards(){
    const handDivDealer = document.getElementById("dealer-hand");
    handDivDealer.innerHTML = String(hands[0].cardsInHand);
    for(let i = 1; i < numPlayers+1; i++){
        let handDiv = document.getElementById("player-hand"+String(i));
        while(handDiv.lastChild) handDiv.removeChild(handDiv.lastChild); //start drawing cards for a hand from scratch everytime, could be optimized
        let handSpan = document.createElement("span");
        handDiv.appendChild(handSpan);
        for(let j = 0; j < hands[i].cardsInHand.length; j++){
            let img = new Image();
            img.src = "cardsvgs/"+hands[i].cardsInHand[j]+".svg";
            img.style.zIndex = j;
            img.height = 88;
            img.width = 63;
            img.className = "card";
            if(j !== 0){
                img.style.position = "relative";
                img.style.top = String(-70*j)+"px";
                img.style.left = String(10*j)+"px";
            }
            
            handSpan.appendChild(img);
        }
    }
}