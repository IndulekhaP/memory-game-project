/*
 * List that holds all cards
 */
const cards = [
	{
		"cardElement": document.createElement('li'),
		"type": "diamond"
	},
	{
		"cardElement": document.createElement('li'),
		"type": "paper-plane-o"
	},
	{
		"cardElement": document.createElement('li'),
		"type": "anchor"
	},
	{
		"cardElement": document.createElement('li'),
		"type": "bolt"
	},
	{
		"cardElement": document.createElement('li'),
		"type": "cube"
	},
	{
		"cardElement": document.createElement('li'),
		"type": "leaf"
	},
	{
		"cardElement": document.createElement('li'),
		"type": "bicycle"
	},
	{
		"cardElement": document.createElement('li'),
		"type": "bomb"
	},
	{
		"cardElement": document.createElement('li'),
		"type": "diamond"
	},
	{
		"cardElement": document.createElement('li'),
		"type": "paper-plane-o"
	},
	{
		"cardElement": document.createElement('li'),
		"type": "anchor"
	},
	{
		"cardElement": document.createElement('li'),
		"type": "bolt"
	},
	{
		"cardElement": document.createElement('li'),
		"type": "cube"
	},
	{
		"cardElement": document.createElement('li'),
		"type": "leaf"
	},
	{
		"cardElement": document.createElement('li'),
		"type": "bicycle"
	},
	{
		"cardElement": document.createElement('li'),
		"type": "bomb"
	}
];


const deck = document.getElementsByClassName('deck')[0];
let openCards = [], moveCount = 0, totalSeconds = 0;

 //Start the game on page load
document.addEventListener('DOMContentLoaded', function(){
	startGame();
});

//Restart the game on button click
document.getElementsByClassName('restart')[0].addEventListener('click', resetGame);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function startGame(){
	populateDeck();
	timer = setInterval(function(){
		totalSeconds++;
		displayTimer(totalSeconds);
	}, 1000);
}

//Loads the card deck
function populateDeck() {
    shuffle(cards);
    const fragment = document.createDocumentFragment();
    cards.forEach(function(card){
    	//const cardElement = document.createElement('li');
    	card.cardElement.classList.add('card');
    	card.cardElement.innerHTML = `<i class="fa fa-` + card.type + `">`;
        fragment.appendChild(card.cardElement);
    });
    deck.appendChild(fragment);
}

function displayTimer(totalSeconds){
	let hours = Math.floor(totalSeconds / 3600);
	totalSeconds %= 3600;
	let minutes = Math.floor(totalSeconds / 60);
	let seconds = totalSeconds % 60;
	document.getElementsByClassName('time')[0].innerText = pad2(hours) + `:` + pad2(minutes) + `:` + pad2(seconds);
}

function pad2(number) {
     return (number < 10 ? '0' : '') + number
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
deck.addEventListener('click', function(event){
	if(event.target.nodeName === 'LI' && !event.target.classList.contains('match') && !event.target.classList.contains('open')){
		counterUpdate();
		adjustStars();
		showCard(event.target);
		if(openCards.length == 0)
			addOpenCard(event.target);
		else if(openCards[0].firstChild.className == event.target.firstChild.className){
				matchCard(event.target);
		}
		else{
			setTimeout(function(){
				cardsDoNotMatch(event.target, openCards[0])
			}, 300);
		}
	}	
});

function showCard(card){
	card.classList.add('show', 'open');
}

function addOpenCard(card){
	openCards.push(card);
}

function hideCard(card){
	card.classList.remove('show');
	card.classList.remove('open');
}

function matchCard(card){
	card.classList.add('match');
	openCards[0].classList.add('match');
	openCards.pop(card);
	if(document.getElementsByClassName('match').length == 16){
		win();
	}
}

function cardsDoNotMatch(card1, card2){
	hideCard(card1);
	hideCard(card2);
	openCards.pop();
}

function counterUpdate(){
	moveCount++;
	document.getElementsByClassName('moves')[0].innerText = moveCount;
}

/**
	Adjust star count. 
	Count of moves < 20, then 3 stars
	Count of moves >= 20, then 2 stars
	Count of moves >= 40, then 1 stars
*/
function adjustStars(){
	if(moveCount == 20){
		document.querySelectorAll(".stars .fa")[2].classList.toggle('fa-star-o')
		document.querySelectorAll(".stars .fa")[2].classList.toggle('fa-star')
	}
	if(moveCount == 40){
		document.querySelectorAll(".stars .fa")[1].classList.toggle('fa-star-o')
		document.querySelectorAll(".stars .fa")[1].classList.toggle('fa-star')
	}
}

function win(){
	clearInterval(timer);
	document.getElementsByClassName('game-details')[0].innerText = `With ` + moveCount + ` moves and ` + document.getElementsByClassName('fa-star').length + ` stars.
	Woooooo!`;
	$('#myModal').modal('show');
}

function resetGame(){
	clearInterval(timer);
	openCards = [];
	moveCount = 0;
	totalSeconds = 0;
	document.getElementsByClassName('time')[0].innerText = '00:00:00';
	document.getElementsByClassName('moves')[0].innerText = moveCount;
	document.querySelectorAll(".stars .fa")[1].classList.remove('fa-star-o')
	document.querySelectorAll(".stars .fa")[1].classList.add('fa-star')
	document.querySelectorAll(".stars .fa")[2].classList.remove('fa-star-o')
	document.querySelectorAll(".stars .fa")[2].classList.add('fa-star')
	cards.forEach(function(card){
		card.cardElement.classList.remove('open', 'show', 'match')
	});
	startGame();
}

document.getElementsByClassName('play-again-btn')[0].addEventListener('click', function(){
	resetGame();
});