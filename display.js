import { numPlayers } from "./blackjack.js";
export function updateDisplayCards(){
    for(let i = 1; i < numPlayers+1; i++){
        const handDiv = document.getElementById("player-hand"+String(i));
        handDiv.innerHTML = "test";
    }
}