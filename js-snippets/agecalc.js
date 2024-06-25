function lifeInWeeks(age) {
    var age = prompt("How old are you?");
    console.log("You have " + Math.floor((90*365) - (age*365)) + " days, " + Math.floor((90*52) - (age*52)) + " weeks, and " + Math.floor((90*12) - (age*12)) + " months left.");
    }