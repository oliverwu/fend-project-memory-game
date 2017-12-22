/*
 * Create a list that holds all of your cards
 */
document.getElementById('congratulations').style.display = 'none';
document.getElementById('view').style.display = 'none';

//moves初始值
var cardMoves = 0;
//已匹配过的卡片
var cards = [];
//判断是否匹配时的数组
var cardTargets = [];
//用于随机卡片时，分配卡片类
var count = 0;
//星星数量初始值
var starNum = 3;
//response用于判断游戏的卡片是否需要对点击作出反应
var response = true;
//用于计时
var nInterID;
var seconds = 0;

//卡牌重置
var cardRestart = function () {
    $(".deck").find("*").removeClass("open show match dismatch");
    response = true;
};

//重置游戏
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
    response = true;
    seconds = -1
    //为什么我设置为"-1"以后，网页上重置之后才会从0开始
};
//重置按钮
$(".restart").on('click', restart);

//判断卡片是否已经被翻开
var judgeTurned = function (that) {
    if (that.attr('class') === "card") {
        return true;
    }
};
//计算步数
$(".deck").find('li').click(function () {
    if (response) {
        console.log($(this).attr('class'));
        var that = $(this);
        if (judgeTurned(that)){
            cardMoves++;
        }
        console.log(cardMoves);
        console.log( 'You clicked a link!' );
        $('span').text(Math.floor(cardMoves/2));
        countStar();
    }
});



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
    //我这里其实是想把array这个数组清空的，就是导入的array变量，但实际好像没作用
};


var openCard = function (that) {
    that.addClass("open show");
};

//判断卡片是否匹配

$(".deck").find('li').click(function () {
    if (response) {
        var that = $(this);
        console.log(that);
        if (judgeTurned(that)){
            cardTargets.push(that);
            openCard(that);
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
                response = false;
                setTimeout(cardRestart,1000);
                cardTargets = [];
                cards = [];
            }
            console.log(cards);
        }
    }

});


//游戏胜利后进入胜利界面
var congratulations = function () {
    if(cards.length >= 16) {
        finalResult();
        document.getElementById('congratulations').style.display = 'block';
        document.getElementById('view').style.display = 'block';
    }
};


var finalResult = function () {
    HTMLmoves = '<p class="col"> With %data1% Moves and %data2% Stars. </p>';
    HTMLclock = '<p class="col"> You finish the game in %data3%S. </p>';
    var formattedMoves = HTMLmoves.replace("%data1%", cardMoves);
    var formattedResult = formattedMoves.replace("%data2%", starNum);
    var formattedClock = HTMLclock.replace("%data3%", seconds);
    $('#result').append(formattedResult);
    $('#result').append(formattedClock);
};


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



//卡牌内容重置
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

//判断星星数
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




var addSeconds = function () {
    seconds++;
    $(".clock").text(seconds + "S")
};

var gameTime = function () {
    nInterID = setInterval(addSeconds,1000);
};



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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