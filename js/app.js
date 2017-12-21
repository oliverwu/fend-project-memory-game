/*
 * Create a list that holds all of your cards
 */
document.getElementById('congratulations').style.display = 'none';
document.getElementById('view').style.display = 'none';


var cardMoves = 0;
//卡牌重置
var cardRestart = function () {
    $(".deck").find("*").removeClass("open show match dismatch");
    bool = true;
};

var restart = function () {
    cardRestart();
    cardMoves = 0;
    cards = [];
    cardTargets = [];
    $('span').text(cardMoves);
    count = 0;
    var newCardTypes = shuffle(cardTypes);
    $('.shuffle').each(function(){
        var that = $(this);
        shuffleCard(that, newCardTypes);
    });
    bool = true;
};
//重置按钮
$(".restart").on('click', restart);

var judgeTurned = function (that) {
    if (that.attr('class') === "card") {
        return true;
    }
};
//计算步数
$(".deck").find('li').click(function () {
    if (bool) {
        console.log($(this).attr('class'));
        var that = $(this);
        if (judgeTurned(that)){
            cardMoves++;
        }
        console.log(cardMoves);
        console.log( 'You clicked a link!' );
        $('span').text(cardMoves);
        countStar();
    }
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

var judgeCard = function (arrayTargets,arrays) {
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


};

var openCard = function (that) {
    that.addClass("open show");
};

var addOpenCard = function (array,that) {
    array.push(that);
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

var bool = true;

$(".deck").find('li').click(function () {
    if (bool) {
        var that = $(this);
        console.log(that);
        if (judgeTurned(that)){
            cardTargets.push(that);
            openCard(that);
            // that.addClass("open show");
        }
        console.log(cardTargets);
        if (cardTargets.length === 2) {
            if (cardTargets[0].children().attr('class') === cardTargets[1].children().attr('class')){
                cardMatch(cardTargets);
                cards.push(cardTargets[0]);
                cards.push(cardTargets[1]);
                cardTargets = [];
                console.log(cards.length);
                congratulations();
            } else {
                cardDismatch(cardTargets);
                bool = false;
                setTimeout(cardRestart,1000);
                cardTargets = [];
                cards = [];
            }
            console.log(cards);
        }
    }

});





// $(".deck").find('li').click(function () {
//     console.log($(this));
//     cardTargets.push($(this));
//     $(this).addClass("open show");
//     console.log(cardTargets);
//     if (cardTargets[0].children().attr('class') === cardTargets[1].children().attr('class')){
//         cardMatch(cardTargets);
//         cards.push(cardTargets[0]);
//         cards.push(cardTargets[1]);
//         cardTargets = [];
//         console.log(cards.length);
//         congratulations();
//     } else {
//         cardDismatch(cardTargets);
//         setTimeout(cardRestart,1000);
//         cardTargets = [];
//         cards = [];
//     }
//     console.log(cards);
// });

// var congratulations = function () {
//     if(cards.length > 15){
//         console.log("match");
//         window.open('Congratulations.html');
//     }
// };

var congratulations = function () {
    if(cards.length >= 16) {
        finalMoves();
        document.getElementById('congratulations').style.display = 'block';
        document.getElementById('view').style.display = 'block';
    }
};



var finalMoves = function () {
    HTMLmoves = '<p class="col"> With %data1% Moves and %data2% Stars. </p>';
    var formattedMoves = HTMLmoves.replace("%data1%", cardMoves);
    var formattedResult = formattedMoves.replace("%data2%", starNum);
    $('#result').append(formattedResult);
};
// HTMLmoves = '<p class="col"> With %data1% Moves and %data2% Stars. </p>';
// //cardMoves无法传递过去
// var formattedMoves = HTMLmoves.replace("%data1%", cardMoves);
// var formattedResult = formattedMoves.replace("%data2%", 1);
// $('#result').append(formattedResult);


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


var cardTypes = [
    "fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt",
    "fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb",
    "fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt",
    "fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb"
];

var count = 0;

// var addCardClass = function () {
//     $(this).removeClass();
//     $(this).addClass(cardTypes[count])
//     count++
// };


// $("i").each(addCardClass());


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


var shuffleCard = function (that, newCardTypes) {
    that.removeClass();
    that.addClass(newCardTypes[count]);
    that.addClass("shuffle");
    console.log(count);
    count++
};
var newCardTypes = shuffle(cardTypes);
$('.shuffle').each(function(){
    var that = $(this);
    shuffleCard(that, newCardTypes);
});

var starNum = 3;
var countStar = function () {
    if (cardMoves > 30) {
        $('i').eq(1).css("display","none");
        starNum = 2;
    }
    if (cardMoves > 60) {
        $("i").eq(2).css("display","none");
        starNum = 1;
    }
};


