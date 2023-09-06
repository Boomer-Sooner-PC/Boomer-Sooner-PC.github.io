const CARDS = [
    "10_of_clubs.png",
    "10_of_diamonds.png",
    "10_of_hearts.png",
    "10_of_spades.png",
    "2_of_clubs.png",
    "2_of_diamonds.png",
    "2_of_hearts.png",
    "2_of_spades.png",
    "3_of_clubs.png",
    "3_of_diamonds.png",
    "3_of_hearts.png",
    "3_of_spades.png",
    "4_of_clubs.png",
    "4_of_diamonds.png",
    "4_of_hearts.png",
    "4_of_spades.png",
    "5_of_clubs.png",
    "5_of_diamonds.png",
    "5_of_hearts.png",
    "5_of_spades.png",
    "6_of_clubs.png",
    "6_of_diamonds.png",
    "6_of_hearts.png",
    "6_of_spades.png",
    "7_of_clubs.png",
    "7_of_diamonds.png",
    "7_of_hearts.png",
    "7_of_spades.png",
    "8_of_clubs.png",
    "8_of_diamonds.png",
    "8_of_hearts.png",
    "8_of_spades.png",
    "9_of_clubs.png",
    "9_of_diamonds.png",
    "9_of_hearts.png",
    "9_of_spades.png",
    "ace_of_clubs.png",
    "ace_of_diamonds.png",
    "ace_of_hearts.png",
    "ace_of_spades.png",
    "jack_of_clubs.png",
    "jack_of_diamonds.png",
    "jack_of_hearts.png",
    "jack_of_spades.png",
    "king_of_clubs.png",
    "king_of_diamonds.png",
    "king_of_hearts.png",
    "king_of_spades.png",
    "queen_of_clubs.png",
    "queen_of_diamonds.png",
    "queen_of_hearts.png",
    "queen_of_spades.png",
];

const DEALERCARDS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A"];
const HAND = [
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    "A,2",
    "A,3",
    "A,4",
    "A,5",
    "A,6",
    "A,7",
    "A,8",
    "A,9",
    "2,2",
    "3,3",
    "4,4",
    "5,5",
    "6,6",
    "7,7",
    "8,8",
    "9,9",
    "10,10",
    "A,A",
];

OPTIMAL_PLAYS = [
    ["H", "H", "H", "H", "H", "H", "H", "H", "H", "H"],
    ["H", "H", "H", "H", "H", "H", "H", "H", "H", "H"],
    ["H", "H", "H", "H", "H", "H", "H", "H", "H", "H"],
    ["H", "H", "H", "H", "H", "H", "H", "H", "H", "H"],
    ["H", "H", "H", "H", "H", "H", "H", "H", "H", "H"],
    ["H", "H", "H", "H", "H", "H", "H", "H", "H", "H"],
    ["H", "H", "H", "H", "H", "H", "H", "H", "H", "H"],
    ["H", "D", "D", "D", "D", "H", "H", "H", "H", "H"],
    ["D", "D", "D", "D", "D", "D", "D", "D", "H", "H"],
    ["D", "D", "D", "D", "D", "D", "D", "D", "D", "D"],
    ["H", "H", "S", "S", "S", "H", "H", "H", "H", "H"],
    ["S", "S", "S", "S", "S", "H", "H", "H", "H", "H"],
    ["S", "S", "S", "S", "S", "H", "H", "H", "H", "H"],
    ["S", "S", "S", "S", "S", "H", "H", "H", "H", "H"],
    ["S", "S", "S", "S", "S", "H", "H", "H", "H", "H"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["H", "H", "D", "D", "D", "H", "H", "H", "H", "H"],
    ["H", "H", "D", "D", "D", "H", "H", "H", "H", "H"],
    ["H", "H", "D", "D", "D", "H", "H", "H", "H", "H"],
    ["H", "H", "D", "D", "D", "H", "H", "H", "H", "H"],
    ["H", "H", "D", "D", "D", "H", "H", "H", "H", "H"],
    ["S", "D", "D", "D", "D", "S", "S", "H", "H", "H"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["H", "H", "SP", "SP", "SP", "SP", "H", "H", "H", "H"],
    ["H", "H", "SP", "SP", "SP", "SP", "H", "H", "H", "H"],
    ["H", "H", "H", "H", "H", "H", "H", "H", "H", "H"],
    ["D", "D", "D", "D", "D", "H", "H", "H", "H", "H"],
    ["SP", "SP", "SP", "SP", "SP", "H", "H", "H", "H", "H"],
    ["SP", "SP", "SP", "SP", "SP", "SP", "H", "H", "H", "H"],
    ["SP", "SP", "SP", "SP", "SP", "SP", "SP", "SP", "SP", "SP"],
    ["SP", "SP", "SP", "SP", "SP", "S", "SP", "SP", "S", "S"],
    ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ["SP", "SP", "SP", "SP", "SP", "SP", "SP", "SP", "SP", "SP"],
];

class Hand {
    constructor() {
        this.cards = [...CARDS];
        this.shuffle();

        this.hand = [];
        this.deal();

        this.dealerHand = [];
        this.dealerDeal();
    }

    shuffle() {
        this.cards = this.shuffleinst(this.cards);
    }

    deal() {
        this.hand.push(this.cards.pop());
        this.hand.push(this.cards.pop());
    }

    dealerDeal() {
        this.dealerHand.push(this.cards.pop());
        this.dealerHand.push(this.cards.pop());
    }

    calculateOptimalPlay() {
        let card1 = this.hand[0].split("_")[0];
        let card2 = this.hand[1].split("_")[0];

        let dealerCard = this.dealerHand[0].split("_")[0];

        // replace face cards with 10
        if (card1 == "jack" || card1 == "queen" || card1 == "king") {
            card1 = "10";
        }
        if (card2 == "jack" || card2 == "queen" || card2 == "king") {
            card2 = "10";
        }

        if (
            dealerCard == "jack" ||
            dealerCard == "queen" ||
            dealerCard == "king"
        ) {
            dealerCard = "10";
        }

        // replace ace with A
        if (card1 == "ace") {
            card1 = "A";
        }
        if (card2 == "ace") {
            card2 = "A";
        }

        if (dealerCard == "ace") {
            dealerCard = "A";
        }

        let index = HAND.indexOf(card1 + "," + card2);
        if (index == -1) {
            index = HAND.indexOf(card2 + "," + card1);
        }
        if (index == -1) {
            let sum = parseInt(card1) + parseInt(card2);
            index = HAND.indexOf(sum);
        }

        if (index == -1) {
            if (card1 == "A") {
                index = HAND.indexOf(parseInt(card2) + 11);
            } else if (card2 == "A") {
                index = HAND.indexOf(parseInt(card1) + 11);
            }
        }

        let optimalPlay = OPTIMAL_PLAYS[index][DEALERCARDS.indexOf(dealerCard)];
        return optimalPlay;
    }

    shuffleinst(array) {
        let currentIndex = array.length,
            randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }

        return array;
    }

    toString() {
        return `Hand: ${this.hand}\nDealer Hand: ${
            this.dealerHand[0]
        }\nOptimal Play: ${this.calculateOptimalPlay()}`;
    }

    getHand() {
        return this.hand;
    }

    getDealerHand() {
        return this.dealerHand;
    }

    calculateHandTotal() {
        let total = 0;
        for (let i = 0; i < this.hand.length; i++) {
            let card = this.hand[i].split("_")[0];
            if (card == "jack" || card == "queen" || card == "king") {
                total += 10;
            } else if (card == "ace") {
                total += 11;
            } else {
                total += parseInt(card);
            }
        }

        return total;
    }

    calculateVisibleDealerHandTotal() {
        let total = 0;
        let card = this.dealerHand[0].split("_")[0];
        if (card == "jack" || card == "queen" || card == "king") {
            total += 10;
        } else if (card == "ace") {
            total += 11;
        } else {
            total += parseInt(card);
        }

        return total;
    }
}

function newHand() {
    hand = new Hand();
    let playerCards = hand.getHand();
    let dealerCard = hand.getDealerHand()[0];

    // check for blackjack
    if (hand.calculateHandTotal() == 21) {
        newHand();
        return;
    }

    let playerHandContainer = document.querySelector("#hands>#player");
    let dealerHandContainer = document.querySelector("#hands>#dealer");

    playerHandContainer.innerHTML = "";
    dealerHandContainer.innerHTML = "";

    for (let card of playerCards) {
        let cardImage = document.createElement("img");
        cardImage.src = `./webimages/cards/${card}`;
        cardImage.classList.add("card");
        playerHandContainer.appendChild(cardImage);
    }

    let cardImage = document.createElement("img");
    cardImage.src = `./webimages/cards/${dealerCard}`;
    cardImage.classList.add("card");
    dealerHandContainer.appendChild(cardImage);

    let cardBack = document.createElement("img");
    cardBack.src = `./webimages/card_back.png`;
    cardBack.classList.add("card");
    dealerHandContainer.appendChild(cardBack);
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";";
}

function select(option) {
    let map = {
        1: "H",
        2: "S",
        3: "D",
        4: "SP",
    };

    let correct = hand.calculateOptimalPlay() == map[option];

    if (correct) {
        onCorrect();
    } else {
        onIncorrect();
    }

    stats = {};

    // add to stats in cookie
    try {
        stats = JSON.parse(getCookie("stats"));

        if (stats["total"] === null) {
            stats = {
                total: 0,
                totalCorrect: 0,
                percentCorrect: 0,
                streak: 0,
            };
        }
    } catch (e) {
        stats = {
            total: 0,
            totalCorrect: 0,
            percentCorrect: 0,
            streak: 0,
        };
    }

    if (
        stats["total"] === null ||
        stats["total"] === undefined ||
        stats["total"] === "" ||
        stats["total"] === NaN
    ) {
        console.log("here");
        stats = {
            total: 0,
            totalCorrect: 0,
            percentCorrect: 0,
            streak: 0,
        };
    }

    stats.total += 1;
    if (correct) {
        stats.totalCorrect += 1;
        stats.streak += 1;
    } else {
        stats.streak = 0;
    }

    stats.percentCorrect = stats.totalCorrect / stats.total;

    setCookie("stats", JSON.stringify(stats), 9999);

    updateStats();
}

function showMistake() {
    mistake = true;
    document.getElementById("mistake").style.display = "block";
    document.getElementById(
        "correct"
    ).innerText = `Correct play: ${hand.calculateOptimalPlay()}`;
}

function hideMistake() {
    mistake = false;
    document.getElementById("mistake").style.display = "none";
    newHand();
}

function onCorrect() {
    console.log("correct");
    newHand();
}

function onIncorrect() {
    console.log("incorrect");
    showMistake();
}

function updateStats() {
    let totalCorrectElm = document.querySelector("#stats>#totalCorrect>.value");
    let totalElm = document.querySelector("#stats>#total>.value");
    let percentCorrectElm = document.querySelector(
        "#stats>#percentCorrect>.value"
    );
    let streakElm = document.querySelector("#stats>#streak>.value");

    let stats = JSON.parse(getCookie("stats"));

    totalCorrectElm.innerText = stats.totalCorrect;
    totalElm.innerText = stats.total;
    percentCorrectElm.innerText = `${(stats.percentCorrect * 100).toFixed(2)}%`;
    streakElm.innerText = stats.streak;
}

function resetStats() {
    stats = {
        total: 0,
        totalCorrect: 0,
        percentCorrect: 0,
        streak: 0,
    };

    setCookie("stats", JSON.stringify(stats), 9999);
    updateStats();
}

// globals
let hand = new Hand();
let mistake = false;

// event listeners

// listen for key presses
document.addEventListener("keydown", (event) => {
    if (mistake) {
        hideMistake();
        return;
    }

    if (event.key == "1") {
        select(1);
    } else if (event.key == "2") {
        select(2);
    } else if (event.key == "3") {
        select(3);
    } else if (event.key == "4") {
        select(4);
    }
});
