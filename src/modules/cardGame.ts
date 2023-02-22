import util from "util"

export const SUITS = ["Club", "Diamond", "Spade", "Heart"] as const
export const RANKS = ["Two", "Three", "Four", "Five", "Six", "Seven", "Eight" , "Nine", "Ten", "Jack", "Queen", "King", "Ace"] as const
export type Rank = TupleItem<typeof RANKS>;
export type Suit = TupleItem<typeof SUITS>

type TupleItem<T extends readonly any[]> = T[number]
type Maybe<T> = T | undefined | null

function is<T>(item: T): item is NonNullable<T> {
    return item != null;
}

const shuffle = <T extends any[]>(arr: T) => {
    const arrCopy = [...arr]
    let counter = arrCopy.length;

    // While there are elements in the arrCopy
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = arrCopy[counter];
        arrCopy[counter] = arrCopy[index];
        arrCopy[index] = temp;
    }

    return arrCopy;
}

const forN = (n: number) => (fn: (i: number) => void) => {
    for(let i = 0; i < n; i++) {
        fn(i)
    }
}

const log: typeof console.log = (...data) => console.log(util.inspect(data, false, null, true))

class Card {
    constructor(public rank: Rank, public suit: Suit) {}
}

class CardGroup {
    public cards: Card[];
    constructor(cards?: Card[]) {
        this.cards = cards ?? [];
    }
}

class DeckFactory {
    constructor() {}

    private createStandardCardSet(): Card[] {
        const cards: Card[] = [];
        SUITS.forEach(suit => RANKS.forEach(rank => cards.push(new Card(rank, suit))))
        return cards;
    }

    public createStandardDeck(): CardGroup {
        return new CardGroup(this.createStandardCardSet());
    }

    public createMultipleStandardDecks(nDecks: number) {
        const cards: Card[] = [];
        forN(nDecks)(i => cards.push(...this.createStandardCardSet()))
        return new CardGroup(cards);
    }
}

type CardLocation = {
    cardGroup: CardGroup,
    index: number
}

class CardGroupManager {
    constructor() {}
    private removeCard(cardLocation: CardLocation): Maybe<Card> {
        const deletedCards = cardLocation.cardGroup.cards.splice(cardLocation.index, 1)
        const deletedCard = deletedCards?.[0]
        return deletedCard;
    }

    private insertCard(card: Card, cardLocation: CardLocation) {
        cardLocation.cardGroup.cards.splice(cardLocation.index, 0, card)
    }

    public shuffle(cardGroup: CardGroup): void {
        cardGroup.cards = shuffle(cardGroup.cards);
    }

    public dealFromTop(from: CardGroup, to: CardGroup): void {
        const maybeCard = from.cards.pop();
        if(is(maybeCard)) to.cards.push(maybeCard);
    }

    public exchange(from: CardLocation, to: CardLocation): void {
        const maybeCard = this.removeCard(from)
        if(is(maybeCard)) this.insertCard(maybeCard, to)
    }
}

class CardGame {
    private deckFactory: DeckFactory = new DeckFactory();;
    public dealer = new CardGroupManager()
    public deck: CardGroup;
    public players: CardGroup[];

    constructor(playerCount: number, deckCount: number = 1) {
        const deck = this.deckFactory.createMultipleStandardDecks(deckCount)
        this.dealer.shuffle(deck)
        this.deck = deck;

        const players: CardGroup[] = [];
        forN(playerCount)((i) => players.push(new CardGroup()))
        this.players = players;
    }

    public deal(players: CardGroup[], amount: number): void {
        forN(amount)((i) => {
            players.forEach((player) => {
                this.dealer.dealFromTop(this.deck, player)
            })
        })
    }
}

export default CardGame