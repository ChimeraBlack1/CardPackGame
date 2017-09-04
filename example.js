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



function cardGen (hand) {
	//roll a die to determine which tier of item to drop.
	for (i=0;i<5;i++){

		var Roll = ThrowDie(1, 1000001);

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


function ThrowDie (min, max) {
  toRound = Math.random() * (max - min) + min;
  return Math.round(toRound);
}


function updateCards (tier) {

	console.log("You Got a tier", tier, " Card!");

	cards[tier] += 1;

	var arrayIndex = getRandomInt(0,5);


	// assign it to the deck

	cards.total += 1;
	document.getElementById(tier).innerHTML = tier + " " +  cards[tier];
}


