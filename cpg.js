// card generator function

function cardGen (hand) {
	//roll a die to determine which tier of item to drop.
	for (i=0;i<5;i++){

		var Roll = ThrowDie(1, 1000001);
		console.log(Roll);	

		// (Roll < modBaseCeil)
		if (Roll < ModifiedBase) {
			// 60%
			updateCards("one");

		} else if (Roll > ModifiedBase && Roll < Maxed.two) {
			// 25% -- 62.5% extrapolated
			updateCards("two");
		} else if (Roll > Maxed.two && Roll < Maxed.three) {
			// 10% -- 25% extrapolated
			updateCards("three");
		} else if (Roll > Maxed.three && Roll < Maxed.four) {
			// 3% -- 7.5% extrapolated
			updateCards("four");
		} else if (Roll > Maxed.four && Roll < Maxed.five) {
			// 1% -- 2.5% extrapolated
			updateCards("five");
		} else if (Roll > Maxed.five && Roll < Maxed.six) {
			// 0.75%  -- 1.875% extrapolated
			updateCards("six");
		} else if (Roll > Maxed.six && Roll < Maxed.seven) {
			// 0.15%  -- 0.375 % extrapolated
			updateCards("seven");
		} else if (Roll > Maxed.seven && Roll < Maxed.eight) {
			// 0.09% -- 0.225 % extrapolated
			updateCards("eight");

			// Roll (Roll > modBaseCeil.eight && Roll <= modBaseCeil.nine)
		} else if (Roll > Maxed.eight && Roll < Maxed.nine) {
			// 0.0099% -- 0.02475% extrapolated
			updateCards("nine");

			// (Roll > modBaseCeil.nine && Roll >= maxCeil)
		} else if (Roll > Maxed.nine) {
			// 0.0001% -- 0.00025% extrapolated
			updateCards("ten");
		}

	}

	costOfPacks.cost += 0.5;
	
	// update money spent on packs
	document.getElementById("money").innerHTML = "$ " + costOfPacks.cost;

	// update total cards owned
	document.getElementById("totalCards").innerHTML =  cards.total;

	
}

var costOfPacks = {
	cost: 0,

};

var moneyEarned = {
	money: 0,
}

var cards = {
	one: 0,
	two: 0,
	three: 0,
	four: 0,
	five: 0,
	six: 0,
	seven: 0,
	eight: 0,
	nine: 0,
	ten: 0,

	total: 0,
};


function updateCards (tier) {

	console.log("You Got a tier", tier, " Card!");

	cards[tier] += 1;

	var arrayIndex = getRandomInt(0,5);

	choice = Tiers[tier];

	var finalCard = choice[arrayIndex];

	// assign it to the deck

	console.log(finalCard);

	cards.total += 1;
	document.getElementById(tier).innerHTML = tier + " " +  cards[tier];
}

function ThrowDie (min, max) {
  toRound = Math.random() * (max - min) + min;
  return Math.round(toRound);
}

console.log(costOfPacks.cost);


// return cards for gold (aka $$$)

// once cards are uniquely named, they would be paired that way rather than by tier
function returnCards () {

	var tier = prompt("Which tier would you like to return...type one..two..etc...");

	var toTrade = Math.floor(cards[tier] / 3);

	if (toTrade <= 0) {
		alert("sorry that trade won't work...");
		return;
	}

	// Get Paid
	var monies = toTrade * TierValue(tier);

	var roundMoney = Math.round(monies *100) / 100;
	console.log(roundMoney, " moneixisizzzz");

	moneyEarned.money += roundMoney;
	cards[tier] -= toTrade * 3;

	document.getElementById("returnedMoney").innerHTML = moneyEarned.money;
	document.getElementById(tier.toString()).innerHTML = tier + " " +  cards[tier];

		// update total cards owned
	document.getElementById("totalCards").innerHTML =  cards.total - (toTrade * 3);


};


function TierValue (tier){

	var Tval = 0;

	switch(tier) {
		case 'one':
			Tval = 0.03;
			break;
		case 'two':
			Tval = 0.06;
			break;
		case 'three':
			Tval = 0.09;
			break;
		case 'four': 
			Tval = 0.15;
			break;
		case 'five': 
			Tval = 0.75;
			break;
		case 'six': 
			Tval = 3;
			break;
		case 'seven': 
			Tval = 15;
			break
		case 'eight':
			Tval = 50;
			break;
		case 'nine':
			Tval = 300;
			break;
		case 'ten':
			Tval = 3000;	
	}

	return Tval;
}

var Player = {
	MF: 1,
};

var Base = 600000;
var ModifiedBase = Math.floor(Base / Player.MF);
var Pie = Base - ModifiedBase;

function TierPercentage(tier) {

	var mod = 0;

	switch(tier) {
		case 2:
			mod = 0.625;
			break;
		case 3:
			mod = 0.25;
			break;
		case 4: 
			mod = 0.075;
			break;
		case 5: 
			mod = 0.025;
			break;
		case 6: 
			mod = 0.01875;
			break;
		case 7: 
			mod = 0.00375;
			break
		case 8:
			mod = 0.00225;
			break;
		case 9:
			mod = 0.0002475;
			break;
		case 10:
			mod = 0.0000025;	
	}

	return mod;
}

function BaseRange(tier) {
	var calcBase = 0;

	switch(tier) {
		case 2:
			calcBase = 250000;
			break;
		case 3:
			calcBase = 100000;
			break;
		case 4: 
			calcBase = 30000;
			break;
		case 5: 
			calcBase = 10000;
			break;
		case 6: 
			calcBase = 7500;
			break;
		case 7: 
			calcBase = 1500;
			break
		case 8:
			calcBase = 900;
			break;
		case 9:
			calcBase = 99;
			break;
		case 10:
			calcBase = 1;	
	}

	return calcBase;
}

function BonusRange(tier) {
	var br = Pie * TierPercentage(tier); 
	return br;
}

function TotalModRange(tier) {
	var tmr = BonusRange(tier) + BaseRange(tier);
	return tmr;
}

function MaxRange(tier) {
	var totalMR = 0;

	for(i=2;i<=tier;i++) {
		totalMR += TotalModRange(i);
	}

	return totalMR + ModifiedBase;
}

var Maxed = {
	two: MaxRange(2),
	three: MaxRange(3),
	four: MaxRange(4),
	five: MaxRange(5),
	six: MaxRange(6),
	seven: MaxRange(7),
	eight: MaxRange(8),
	nine: MaxRange(9),
	ten: MaxRange(10),
}

var hand = {
	one: "",
	two: "",
	three: "",
	four: "",
	five: "",
}

function changeCard() {
	// Select slot
	// Select substitute card from deck
	// make the exchange
}

var deck = {
	// list of retained cards
		// select card and show details of selected card
}

function Auction() {
	//open Auction house Buy / Sell tabs.
	var html = "<button onclick='OpenBuy()'>Buy</button>";
	    html += "<button onclick='OpenSell()'>Sell</button>";
	    html += "<button onclick='CloseAll()'>Close</button>";

	return document.getElementById("AuctionHouse").innerHTML = html;
}

function OpenBuy () {
	// toggle buy items tab
	document.getElementById("OpenAuctions").innerHTML = "<div class='openBuy'></div>";
	
	// fetch items from OpenAuctions Table
		// show details of selected item
		// choose items from window to buy
		// buy items
}

function OpenSell () {
	// toggle sell items menu
	var OpenS = "<div class='openSell'></div>";

	document.getElementById("OpenAuctions").innerHTML = OpenS;
		// choose items from deck to sell
		// show details of selected item
		// sell items
			// confirm sale
			// backend of sale
}


function ShowDeck() {
	// Close all other panels
	CloseAll();
		// open the Deck panel
		var html = "<div class='Deck'></div>";
			html += "<button onclick='CloseAll()'>Close</button>";

		document.getElementById("Deck").innerHTML = html;
}

function CloseAll () {
	// Close all panels
	document.getElementById("Deck").innerHTML = document.getElementById("OpenAuctions").innerHTML = document.getElementById("AuctionHouse").innerHTML = "";
}


var Tiers = {
	one: [0.05, 0.06, 0.05, 0.04, 0.08],
	two: [0.15, 0.16, 0.15, 0.14, 0.18],
	three: [0.25, 0.26, 0.25, 0.24, 0.28],
	four: [0.35, 0.46, 0.55, 0.64, 0.78],
	five: [0.85, 0.96, 1.05, 1.04, 1.08],
	six: [1.15, 1.16, 1.15, 1.14, 1.18],
	seven: [1.55, 1.56, 1.54, 1.54, 1.58],
	eight: [1.75, 1.76, 1.75, 1.74, 1.78],
	nine: [2.05, 2.06, 2.05, 2.04, 2.08],
	ten: [3.15, 3.16, 3.15, 3.14, 3.18],
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


