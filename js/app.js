/*
 * Create a list that holds all of your cards
 */

var cardMoves = 0;

var cardRestart = function () {
    $(".deck").find("*").removeClass("open show match dismatch");
};

var restart = function () {
    cardRestart();
    cardMoves = 0;
    cards = [];
    cardTargets = [];
    $('span').text(cardMoves);
};
//重置按钮
$(".restart").on('click', restart);

var judgeTurned = function () {
    if ($(this).attr('class') === "card open show") {
        return false;
    } else if ($(this).attr('class') === "card open show match") {
        return false;
    } else {
        return true;
    }

};
//为什么这个判断卡片是否被重复点击的function不起作用
$(".deck").find('li').click(function () {
    console.log($(this).attr('class'));

    if ($(this).attr('class') === "card open show") {
        cardMoves
    } else if ($(this).attr('class') === "card open show match") {
        cardMoves
    } else {
        cardMoves++;
    }

    //为什么用函数导入的话为什么实现功能
    // if (judgeTurned()){
    //     cardMoves++;
    // }
    console.log(cardMoves);
    console.log( 'You clicked a link!' );
    $('span').text(cardMoves);
});




// $(".deck").find('li').addEventListener('click', turnCard);

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
    //为什么无法调用array
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

var openCard = function () {
    $(this).addClass("open show");
};

var addOpenCard = function (array) {
    array.push($(this));
};

// $(".deck").find('li').click(function () {
//     $(this).addClass("open show");
//     addOpenCard(cardTargets);
//     //为什么写在函数里面就起不了作用
//     if (cardTargets[0].children().attr('class') === cardTargets[1].children().attr('class')){
//         cardMatch(cardTargets);
//         cards.push(cardTargets[0]);
//         cards.push(cardTargets[1]);
//         cardTargets = [];
//         congratulations();
//     } else {
//         cardDismatch(cardTargets);
//         setTimeout(cardRestart,1000);
//         cardTargets = [];
//         cards = [];
//     }
// });


$(".deck").find('li').click(function () {
    console.log($(this));
    cardTargets.push($(this));
    $(this).addClass("open show");
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
//cardMoves无法传递过去
var formattedMoves = HTMLmoves.replace("%data1%", cardMoves);
var formattedResult = formattedMoves.replace("%data2%", 1);
$('#result').append(formattedResult);


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


