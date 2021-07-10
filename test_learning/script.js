//challenge 1: Age in Days
function ageInDays() {
    var birthYear = prompt('What is your year of birth?');
    var ageInDaysFor = (2021 - birthYear) * 365;
    var h1 = document.createElement ('h1');
    var TextResult = document.createTextNode ('you are ' + ageInDaysFor + ' days old');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(TextResult);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    document.getElementById('ageInDays').remove();
}

//challenge 2: Generate Cats

function generateCat() {
    var image = document.createElement('img');
    var div = document.getElementById('generate-cat-result');
    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size-small";
    div.appendChild(image);
}

//challenge 3: Rock, Paper, Scissors

function rpsGame (yourChoice) {
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;

    botChoice = ChoiceOfNum(randomToRpsInt());
    console.log('Computer choice:', botChoice);

    result = DecideWinner(humanChoice, botChoice);
    console.log(result);

    message = finalMessage(result);
    console.log(message);
    
    rpsFrontEnd(yourChoice.id,  botChoice, message);

}

function randomToRpsInt() {
   return Math.floor(Math.random() * 3);
}

function ChoiceOfNum(number) {
    return ['rock', 'paper', 'scissors'] [number];
}


function DecideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'paper': {'scissors': 0, 'paper': 0.5, 'rock': 1},
        'rock': {'paper': 0, 'rock': 0.5, 'scissors': 1},
        'scissors': {'rock': 0, 'scissors': 0.5, 'paper': 1}
    }


var yourScore = rpsDatabase[yourChoice] [computerChoice];
var computerScore = rpsDatabase[computerChoice] [yourChoice];

return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return {'message': 'You Lost!', 'color': 'red'};
    } else if (yourScore === 0.5) {
        return {'message': 'You Tied!', 'color': 'yellow'};
    } else {
        return {'message': 'You Won!', 'color': 'green'};
    }
        
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src

    }

    //remove all images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
    messageDiv.innerHTML = "<h1 style='color:" + finalMessage['color'] + "; font-size: 60px; padding:30px; '>" + finalMessage['message'] + "</h1>";
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
    
}

//challenge 4: Change the color of all buttons

var allButtons = document.getElementsByTagName('button');


var copyAllButons = [];
for (let i=0; i < allButtons.length; i++) {
copyAllButons.push(allButtons[i].classList[1]);
}

console.log(copyAllButons);

function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'red') {
        buttonRed();
    } else if (buttonThingy.value === 'green') {
        buttonGreen();
    } else if (buttonThingy.value === 'reset') {
        buttonColorReset();
    } else if (buttonThingy.value === 'random') {
        randomColors();
    }
}

function buttonRed() {
    for (let i=0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}

function buttonGreen() {
        for (let i=0; i < allButtons.length; i++) {
            allButtons[i].classList.remove(allButtons[i].classList[1]);
            allButtons[i].classList.add('btn-success');
        }

}

function buttonColorReset() {
    for (let i=0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButons[i]);
    }
}

function randomColors() {
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']
    
    for (let i=0; i < allButtons.length; i++) {
        let randomNumber = Math.floor(Math.random() * 4);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[randomNumber]);
    }
    }

//Challenge 5: Blackjack
let blackjackGame = {
    'you' : {'scoreSpan' : '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer' : {'scoreSpan' : '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards' : ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap' : {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 
    'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11]},
    'wins' : 0,
    'losses' : 0,
    'draws' : 0,
    'isStand' : false,
    'turnsOver' : false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('sound/swish.wav');
const winSound = new Audio('sound/coins.mp3');
const lostSound = new Audio('sound/loses.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);


function blackjackHit() {
   
    if (blackjackGame['isStand'] === false) {

        let card = randomCard();
        showCard(card, YOU);   
        updateScore(card, YOU);
        showScore(YOU); 
    }
  

}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <=21) {
        let cardImage = document.createElement('img');
        cardImage.src = `images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal() {
    
    if (blackjackGame['turnsOver'] === true) {

        blackjackGame['isStand'] = false;
    
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for (i=0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }

        for (i=0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;
    
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = 'white';

        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').style.color = 'white';

        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnsOver'] = true;
    }
    

}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        //if adding 11 keeps me below 21, add 11. Otherwise, add 1
        if (activePlayer['score'] = blackjackGame['cardsMap'][card][1] <=21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
    
}

function showScore(activePlayer) {
    if(activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    
    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}


//compute winner and return who the winner
//update the wins, draws, losses function
function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        //condition: higher score than dealer or when the dealer bust but you're 21 or under
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackjackGame['wins']++;
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;
        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        } 

        // condition user bust but the dealer doesn't
        else if (YOU['score'] > 21 && DEALER['score'] <=21) {
            blackjackGame['losses']++;
            winner = DEALER;

        //condition when you and the dealer both bust
        } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
            blackjackGame['draws']++;
        }

        console.log(blackjackGame);
        return winner;
    }
}

function showResult(winner) {
    let message, messageColor;

        if(blackjackGame['turnsOver'] === true) {

        

        if (winner === YOU) {
            message = 'You won!';
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            messageColor = 'green';
            winSound.play();
        } else if (winner === DEALER) {
            message = 'You lost!';
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            messageColor = 'red';
            lostSound.play();
        } else {
            message = 'You drew!';
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            messageColor = 'black';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
}
}
