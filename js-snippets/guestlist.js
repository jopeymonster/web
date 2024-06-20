var yourName = prompt("What is your name?");
var guestList = ["Joe", "Jack", "John", "Angela", "Pam", "Lara", "Jason","Lacey"];
if (guestList.includes(yourName)) {
    console.log(yourName + ", you are on the list!");
}   else {
    console.log(yourName + ", you are NOT on the list.");
}