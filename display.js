import { numPlayers, currentPlayer, numSplits } from "./blackjack.js";
import { hands } from "./cards.js";
export function updateDisplayCards(showDealer = false){
    for(let i = 0; i < numPlayers+numSplits+1; i++){
        let handDiv;
        if(i == 0){
            handDiv = document.getElementById("dealer-hand");
        }
        else{
            handDiv = document.getElementById("player-hand"+String(i));
        }

        while(handDiv.lastChild) handDiv.removeChild(handDiv.lastChild); //start drawing cards for a hand from scratch everytime, could be optimized

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
            if(i == currentPlayer){
                img.style.boxShadow = "2px 2px 2px yellow";
                img.style.border = "1px solid yellow";
            }
            if(i == 0 && j == 1 && !showDealer){
                img.src = "cardsvgs/BACK.svg";
            }
            
            let handSpan = document.createElement("span");
            handDiv.appendChild(handSpan);
            handSpan.appendChild(img);
        }
    }
}

export function updateDisplayText(winStr){
    document.getElementById("resultoutput").textContent = winStr;
}