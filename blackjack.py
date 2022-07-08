import cards

shoeSize = 6

def main():
    numPlayers = int(input("Number of Players: "))
    for x in range(0, numPlayers+1): #+1 for dealer. dealer is hand 0

        cards.createHand()

    shoeSize = int(input("Shoe Size: "))
    setShoeSize(shoeSize)

    cards.shuffle
    cards.dealToHands(2)

    handSums = []

    #sum up current dealer value, go through player turns
    i = 0
    for hand in cards.hands:
        print(cards.hands)
        sum = 0
        if i == 0:
            for card in hand:
                sum += getValue(card)
            handSums.append(sum)
        else:
            for card in hand:
                sum += getValue(card)
            standFlag = False
            while sum < 21 and standFlag == False:
                playerChoice = str(input("Hit or Stand? [H/S]: "))
                print(handSums)
                if playerChoice == 'H':
                    cards.dealToHand(1,i)
                    print(cards.hands)
                    sum += getValue(hand[-1]) #add value of new card
                    if sum > 21:
                        handSums.append(-1)
                    if sum == 21:
                        handSums.append(sum)
                if playerChoice == 'S':
                    handSums.append(sum)
                    standFlag = True
        i += 1
    while handSums[0] < 17:
        cards.dealToHand(1,0)
        handSums[0] += getValue(cards.hands[0][-1])
    if handSums[0] > 21:
        handSums[0] = -1
    print(handSums)


def getValue(card):
    if card == "JK":
        return 0
    elif "10" in card or "K" in card or "Q" in card or "J" in card:
        return 10
    elif "A" in card:
        return 1
    else:
        return int(card[0])


def setShoeSize(size):
    cards.deck = cards.deck*size
    return True

if __name__=="__main__":
    main()