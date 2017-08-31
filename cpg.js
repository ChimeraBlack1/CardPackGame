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
	var teer = prompt("I'm lazy...gimme the tier number manually... (1,2,3 etc...)")

	var toTrade = Math.floor(cards[tier] / 3);

	if (toTrade <= 0) {
		alert("sorry that trade won't work...");
		return;
	}

	var monies = toTrade * 0.03;	
	var roundMoney = Math.round(monies *100) / 100;
	console.log(roundMoney, " moneixisizzzz");

	moneyEarned.money += roundMoney;
	cards[tier] -= toTrade * 3;

	document.getElementById("returnedMoney").innerHTML = moneyEarned.money;
	document.getElementById(tier.toString()).innerHTML = tier + " " +  cards[tier];

		// update total cards owned
	document.getElementById("totalCards").innerHTML =  cards.total - (toTrade * 3);


};

var Player = {
	MF: 100000.5,
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