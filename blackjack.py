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
    for hand in cards.hands:
        print(cards.hands)
        print(handSums)
        if hand.index == 0:
            continue
        else:
            sum = 0
            for card in hand:
                sum += getValue(card)
            while sum < 21:
                playerChoice = str(input("Hit or Stand? [H/S]: "))
                if playerChoice == 'H':
                    cards.dealToHand(1,hand.index)
                    print(cards.hands)
                    sum += getValue(hand[-1]) #add value of new card
                    if sum > 21:
                        handSums[hand.index] = -1
                        break
                    if sum == 21:
                        handSums[hand.index] = sum
                        break
                if playerChoice == 'S':
                    handSums[hand.index] = sum
                    break


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