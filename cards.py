import random

class Hand():
    """models a hand for blackjack"""

    def __init__(self, name, initNumCards):
        self.cardsInHand = []
        self.value = self.getValue(self.cardsInHand)
        i = 0
        while i < initNumCards:
            self.cardsInHand.append(deck.pop[0])
            i += 1

    def getValue(cardsInHand):
        for card in cardsInHand:
            if card == "JK":
                return 0
            elif "10" in card or "K" in card or "Q" in card or "J" in card:
                return 10
            elif "A" in card:
                return 11
            else:
                return int(card[0])
    
    def addCard():
        return True

deck = ["JK","JK",
"AS","2S","3S","4S","5S","6S","7S","8S","9S","10S","JS","QS","KS",
"AD","2D","3D","4D","5D","6D","7D","8D","9D","10D","JD","QD","KD",
"KC","QC","JC","10C","9C","8C","7C","6C","5C","4C","3C","2C","AC",
"KH","QH","JH","10H","9H","8H","7H","6H","5H","4H","3H","2H","AH"]

hands = []

def getDeck():
    return deck

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

#create new empty list for new hand in hands list
def createHand():
    hands.append([])
    return True

#pops off end of deck and into desired hand, repeat for number of cards desired
#false if not enough cards in deck
def dealToHand(numCards, numHand):
    if numCards > len(deck):
        return False
    while numCards > 0:
        hands[numHand].append(deck.pop(len(deck)-1))
        numCards -= 1
    return True

#deals numCards to each hand, one card at a time
#false if not enough cards in deck
def dealToHands(numCards):
    cardsToDeal = numCards*len(hands)
    if cardsToDeal > len(deck):
        return False
    while cardsToDeal > 0:
        for hand in hands:
            hand.append(deck.pop(len(deck)-1))
            cardsToDeal -= 1
    return True

#checks if desired card in outgoing hand
#executes transfer if true. returns true
#return false if card not in outgoing hand
def transferCard(toHand, fromHand, card):
    if card in hands[fromHand]:
        hands[fromHand].remove(card)
        hands[toHand].append(card)
        return True
    return False
