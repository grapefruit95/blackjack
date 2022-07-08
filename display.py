import os
import cards

def clearConsole():
    command = 'clear'
    if os.name in ('nt', 'dos'):  # If Machine is running on Windows, use cls
        command = 'cls'
    os.system(command)

def displayGame(showHoleCard, handSums):
    if showHoleCard:
        handStr = ""
        for card in cards.hands[0]:
            handStr += str(card)+" "
        if handSums[0] == -1:
            print("Dealer: "+handStr+"(Bust)"+"\n")
        else:
            print("Dealer: "+handStr+"("+str(handSums[0])+")"+"\n")
        for player in range(1, len(cards.hands)):
            handStr = ""
            for card in cards.hands[player]:
                handStr += str(card)+" "
            if handSums[player] == -1:
                print("Player "+str(player)+": "+handStr+"(Bust)")
            else:
                print("Player "+str(player)+": "+handStr+"("+str(handSums[player])+")")
    else:
        print("Dealer: "+str(cards.hands[0][0])+" XX\n")
        for player in range(1, len(cards.hands)):
            handStr = ""
            for card in cards.hands[player]:
                handStr += str(card)+" "
            print("Player "+str(player)+": "+handStr)
   