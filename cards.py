import random

class Hand():
    """models a hand for blackjack"""

    def __init__(self, name, initNumCards):
        self.cardsInHand = []
        self.value = self.getValue()
        self.isDealer = False
        i = 0
        while i < initNumCards:
            self.cardsInHand.append(deck.pop[0])
            i += 1

    def getValue(self):
        value = 0
        for card in self.cardsInHand:
            if card == "JK":
                continue
            elif "10" in card or "K" in card or "Q" in card or "J" in card:
                value += 10
            elif "A" in card:
                #check if A as 11 will cause a bust. assign A value of 1 if true
                if value + 11 > 21:
                    value += 1
                else:
                    value += 11
            else:
                value += int(card[0])
        if value > 21:
            return -1
        else: 
            return value
    
    def dealToHand(self, numCards):
        if numCards > len(deck):
            return False
        while numCards > 0:
            self.cardsInHand.append(deck.pop(len(deck)-1))
            numCards -= 1
        return True

deck = ["JK","JK",
"AS","2S","3S","4S","5S","6S","7S","8S","9S","10S","JS","QS","KS",
"AD","2D","3D","4D","5D","6D","7D","8D","9D","10D","JD","QD","KD",
"KC","QC","JC","10C","9C","8C","7C","6C","5C","4C","3C","2C","AC",
"KH","QH","JH","10H","9H","8H","7H","6H","5H","4H","3H","2H","AH"]

hands = []

#remove jokers from deck if present
#return true when jokers are no longer in deck
def removeJokers():
    while "JK" in deck:
        deck.remove("JK")
    return True

#shuffle deck, return true when done
def shuffle():
    random.shuffle(deck)
    return True

#create new instance of Hand, adds to array of Hands
numHands = 0
def createHand():
    global numHands
    numHands += 1
    hands.append(Hand("Player "+str(numHands), 0))
    return True

#pops off end of deck and into desired hand, repeat for number of cards desired
#false if not enough cards in deck
def dealToHand(numCards, numHand):
    if numCards > len(deck):
        return False
    while numCards > 0:
        hands[numHand].cardsInHand.append(deck.pop(len(deck)-1))
        numCards -= 1
    return True

#deals numCards to each hand, one card at a time
#false if not enough cards in deck
def dealToHands(numCards):
    cardsToDeal = numCards*len(hands)
    if cardsToDeal > len(deck):
        return False
    while cardsToDeal > 0:
        for Hand in hands:
            Hand.cardsInHand.append(deck.pop(len(deck)-1))
            cardsToDeal -= 1
    return True

#checks if desired card in outgoing hand
#executes transfer if true. returns true
#return false if card not in outgoing hand
def transferCard(toHand, fromHand, card):
    if card in hands[fromHand].cardsInHand:
        hands[fromHand].cardsInHand.remove(card)
        hands[toHand].cardsInHand.append(card)
        return True
    return False
