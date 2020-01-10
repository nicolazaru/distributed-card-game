
let cards = [
    // Stars
    {
        cardId: 'star1yellow',
        shape: "star",
        color: "yellow",
        count: "1",
        image: "star1yellow.png"
    },
    {
        cardId: 'star2yellow',
        shape: "star",
        color: "yellow",
        count: "2",
        image: "star2yellow.png"
    },
    {
        cardId: 'star3yellow',
        shape: "star",
        color: "yellow",
        count: "3",
        image: "star3yellow.png"
    }

];


// eslint-disable-next-line no-console
console.log(pickNewCards(2,cards));

function pickNewCards(n,cardArray) {
    // n = number of cards to pick
    // cardArray = cards array
    let tableCards = cardArray;
    let handSet = [];
    for (let i = 0; i<n; i++) {
        let cardIndex = Math.floor(Math.random() * (cardArray.length - 1));
        handSet.push(cardArray[cardIndex]);
        tableCards.splice(cardIndex, 1);
        if (i === (n-1)) {
            return handSet;
        }
    }
}