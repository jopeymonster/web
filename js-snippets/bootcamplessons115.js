// var text = prompt("What have you written today?");
// var userLength = prompt("What is the max length?");
// alert ("There are currently " + text.length + " characters in that text and you have " + (userLength-text.length) + " characters left to use.");
// alert ("This is what your text will look like: " + text.slice(0,userLength));

// alert(prompt("What have you written today?").slice(0,250));

// var userName = prompt("What is your name?");
// var userNameLetter = userName.slice(0,1);
// var userRestName = userName.slice(1,userName.length);
// var userNameFixed = userNameLetter.toUpperCase() + userRestName.toLowerCase();
// alert("Your name is " + userNameFixed + ".");

// var userName = prompt("What is your name?").toLowerCase();
// var userNameLetter = userName.slice(0,1);
// alert("Your name is: " + userNameLetter.toUpperCase() + userName.slice(1,userName.length) + ".");

// var name = prompt("What is your name?").toLowerCase();
// alert ("Your name is: " + name.slice(0,1).toUpperCase() + name.slice(1));

// var dogAge = prompt("How old is your dog?");
// var humanAge = alert("Your dog is " + (((dogAge-2) * 4) + 21) + " in human years.");

alert ("Your dog is " + (((prompt("What is your dog's age?") - 2) * 4 ) + 21) + " in human years.");