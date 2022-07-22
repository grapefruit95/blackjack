import cards
import display
    
def main():

    setUpHands()

    shoeSize = int(input("Shoe Size: "))
    setShoeSize(shoeSize)

    hitOnSoftSeventeen = getSoftSeventeenBool()

    cards.removeJokers()
    cards.shuffle()
    cards.dealToHands(2)

    handSums = []
    handSums.append(cards.hands[0].getValue()) #set dealer value

    display.clearConsole()
    display.displayGame(False, handSums)

    #sum up current dealer value, go through player turns

    for hand in cards.hands:
        if hand.isDealer:
            continue
        playerChoice = ''
        while playerChoice != 'S':
            playerChoice = str(input("Hit or Stand? [H/S]: "))
            if playerChoice == 'H':
                hand.dealToHand(1)
                display.clearConsole()
                display.displayGame(False, handSums)

                #old sum. should now be calculated in Hand class
                if hand.getValue() == -1:
                    handSums.append(hand.getValue())
                    break
                if hand.getValue() == 21:
                    handSums.append(hand.getValue())
                    break
        if playerChoice == 'S':
            display.clearConsole()
            display.displayGame(False, handSums)
            handSums.append(hand.getValue())

    #dealers turn
    runDealerTurn(handSums, hitOnSoftSeventeen)

    display.clearConsole()
    display.displayGame(True, handSums)

    checkWin(handSums)

def getCardValue(card):
    if card == "JK":
        return 0
    elif "10" in card or "K" in card or "Q" in card or "J" in card:
        return 10
    elif "A" in card:
        return 11
    else:
        return int(card[0])


def setShoeSize(size):
    cards.deck = cards.deck*size
    return True

def checkWin(handSums):
    dealerSum = handSums[0]
    winStr = ""
    for player in range(1, len(handSums)):
        if handSums[player] > dealerSum:
            winStr += "Player "+str(player)+" wins "
    if winStr == "":
        print("Dealer wins")
        return True
    print(winStr)

def getSoftSeventeenBool():
    hit = input("Must the dealer hit on a soft 17? [Y/N]: ")
    if hit == "Y":
        hit = True
    elif hit == "N":
        hit = False
    return hit

def setUpHands():
    numPlayers = int(input("Number of Players: "))
    for x in range(0, numPlayers+1): #+1 for dealer. dealer is hand 0
        cards.createHand()        
    cards.hands[0].isDealer = True    

def runDealerTurn(handSums, hitOnSoftSeventeen):
    dealer = cards.hands[0]
    while dealer.getValue() < 17 and dealer.getValue() != -1:
        dealer.dealToHand(1)
    if dealer.getValue() == 17 and hitOnSoftSeventeen and ("A" in dealer.cardsInHand):
        dealer.dealToHand(1)
    handSums[0] = dealer.getValue()

if __name__=="__main__":
    main()