// console.log("You have " + ((Math.floor(Math.random() * 100)) + 1) + "% compatibility!")
// console.log("You have " + (Math.floor(((Math.random()).toFixed(3)) * 100)) + "% compatibility!")

// prompts ++
// var name1 = prompt("Please provide the first name:");
// var name2 = prompt("Please provide the second name:");

// mini, -var +alert
// alert("You have " + ((Math.floor(Math.random() * 100)) + 1) + "% compatibility!")

// mini, +var
// var loveScore = (Math.floor(Math.random() * 100)) + 1;

// all vars
// var loveScoreRaw = Math.random();
// var loveScoreFixed = loveScoreRaw*100;
// var loveScore = Math.floor(loveScoreFixed) + 1;

// function --
// function loveCalc() {
//     var loveScore = Math.floor(Math.random() * 100);
//     console.log(loveScore + "%");
// }

// alt math --
//  mini - var +alert
//     alert("You have " + (Math.floor(((Math.random()).toFixed(3)) * 100)) + "% compatibility!")
//  mini var
//     var loveScore = (Math.floor(((Math.random()).toFixed(3)) * 100));
//  all vars
//     var loveScoreRaw = Math.random();
//     var loveScoreFixed = loveScoreRaw.toFixed(3);
//     var loveScore = Math.floor(loveScoreFixed*100);

// console var testing --
// console.log(loveScoreRaw);
// console.log(loveScoreFixed);
// console.log(loveScore);
// console.log(loveScore + "%")

// output ++
// alert("You have " + loveScore + "% compatibility!");

// +conds
var loveScore = (Math.floor(((Math.random()).toFixed(3)) * 100));

// opt:change console.log to alert
if (loveScore > 80) {
    console.log("Your love score is " + loveScore + "%!  You love each other like Kanye loves Kanye.");
} 

if (loveScore > 30 && loveScore <= 80) {
    console.log("Your love score is " + loveScore + "%!");
}

if (loveScore <= 30 ) {
    console.log("Your love score is " + loveScore + "%! You go together like oil and water.");
}