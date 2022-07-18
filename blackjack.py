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

    display.clearConsole()
    display.displayGame(False, handSums)

    #sum up current dealer value, go through player turns
    i = 0
    for hand in cards.hands:
        sum = 0
        if i == 0:
            for card in hand.cardsInHand:
                sum += getCardValue(card)
            handSums.append(sum)
        else:
            for card in hand.cardsInHand:
                sum += getCardValue(card)
            standFlag = False
            while sum <= 21 and standFlag == False:
                if sum == 21:
                    handSums.append(sum)
                    standFlag = True
                    continue
                playerChoice = str(input("Hit or Stand? [H/S]: "))
                if playerChoice == 'H':
                    cards.dealToHand(1,i)
                    display.clearConsole()
                    display.displayGame(False, handSums)
                    sum += getCardValue(hand.cardsInHand[-1]) #add value of new card
                    if sum > 21:
                        handSums.append(-1)
                        standFlag = True
                    if sum == 21:
                        handSums.append(sum)
                        standFlag = True
                if playerChoice == 'S':
                    handSums.append(sum)
                    standFlag = True
                
        i += 1

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

def runDealerTurn(handSums, hitOnSoftSeventeen):
    while handSums[0] < 17:
        cards.dealToHand(1,0)
        handSums[0] += getCardValue(cards.hands[0].cardsInHand[-1])
        if handSums[0] == 17 and hitOnSoftSeventeen and ("A" in cards.hands[0].cardsInHand[0] or "A" in cards.hands[0].cardsInHand[1]):
           cards.dealToHand(1,0)
           handSums[0] += getCardValue(cards.hands[0].cardsInHand[-1]) 
    if handSums[0] > 21:
        handSums[0] = -1

if __name__=="__main__":
    main()