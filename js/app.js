/*
 * Create a list that holds all of your cards
 */
// var Card = function (shape) {
//     var obj = {shape: shape};
// }


var cardMoves = 0;

var cardRestart = function () {
    $(".deck").find("*").removeClass("open show match dismatch");
    // cardMoves = 0;
    // $('span').text(cardMoves);
};

var restart = function () {
    cardRestart();
    cardMoves = 0;
    cards = [];
    $('span').text(cardMoves);
};


$(".restart").on('click', restart);

$(".deck").on('click','li',function () {
    cardMoves++;
    console.log(cardMoves);
    console.log( 'You clicked a link!' );
    $('span').text(cardMoves);
});

var cardTurned = [];
var numCarTurned = 0;
var turnCard = function () {
    $(this).toggleClass("open show");
    cardTurned.push($(this));
    numCarTurned++;
    console.log($(this));
    console.log(cardTurned);
    console.log(numCarTurned);
};

// $(".deck").find('li').click(turnCard);

// $(".deck").find('li').addEventListener('click', turnCard);

// $(".deck").find('li').click();

var cards = [];
var cardTargets = [];

var cardMatch = function (array) {
    for(var i = 0; i < 2; i++){
        array[i].addClass("match");
    }
};

var cardDismatch = function (array) {
    for(var i = 0; i < 2; i++){
        array[i].addClass("dismatch");
    }
    array = [];

};

var judgeCard = function (array) {
    if (array[0].find('i').attr('class') === array[1].find('i').attr('class')){
        cardMatch(array);
        array = [];
    } else {
        cardDismatch(array);
        setTimeout(cardRestart,1000)
        array = [];
    }


};

$(".deck").find('li').click(function () {
    $(this).toggleClass("open show");
    cardTargets.push($(this));
    console.log(cardTargets);
    if (cardTargets[0].children().attr('class') === cardTargets[1].children().attr('class')){
        cardMatch(cardTargets);
        cards.push(cardTargets[0]);
        cards.push(cardTargets[1]);
        cardTargets = [];
        console.log(cards.length);
        congratulations();
    } else {
        cardDismatch(cardTargets);
        setTimeout(cardRestart,1000);
        cardTargets = [];
        cards = [];
    }
    console.log(cards);
});

var congratulations = function () {
    if(cards.length > 15){
        console.log("match");
        window.open('Congratulations.html');
    }
};

HTMLmoves = '<p class="col"> With %data1% Moves and %data2% Stars. </p>';
var formattedMoves = HTMLmoves.replace("%data1%", cardMoves);
var formattedResult = formattedMoves.replace("%data2%", 1);
$('#result').append(formattedResult);



// $(".deck").on('click','li',function (evt) {
//     $(evt.target).toggleClass("open show");
// });


// var cardClasses = [];
// var cardTargets = [];
// $(".deck").on('click','li',function (evt) {
//     $(evt.target).toggleClass("open show");
//     cardClasses.push($(evt.target).find('i').attr('class'));
//     cardTargets.push($(evt.target));
//     if(cardClasses.length > 1){
//         if(cardClasses[0] === cardClasses[1]){
//             cardTargets[0].toggleClass("match");
//             cardTargets[1].toggleClass("match");
//             cardClasses = [];
//             cardTargets = [];
//         } else {
//             cardTargets[0].toggleClass("open show");
//             cardTargets[1].removeClass("open show");
//             cardClasses = [];
//             cardTargets = [];
//         }
//     }
//     console.log(cardClasses);
// });
//
// $(".deck").on('click','li',function (evt) {
//     var x = $(evt.target).find('i').attr('class');
//     console.log(x);

// });

var removeClass = function () {

};


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


