// 3 = current cost of milk bottle

function getMilk(money, milkCost) {
  goStore();
//  var milkBottles = Math.floor(money / 3);
  console.log("buy " + buyMilk(money, milkCost) + " bottles of milk");
  goHome();
  return milkChange(money, milkCost);
}

function goStore() {
  console.log("leaveHouse");
  console.log("moveRight");
  console.log("moveRight");
  console.log("moveUp");
  console.log("moveUp");
  console.log("moveUp");
  console.log("moveUp");
  console.log("moveRight");
  console.log("moveRight");    
}

function goHome() {
  console.log("moveLeft");
  console.log("moveLeft");
  console.log("moveDown");
  console.log("moveDown");
  console.log("moveDown");
  console.log("moveDown");
  console.log("moveLeft");
  console.log("moveLeft");
  console.log("enterHouse");    
}

function buyMilk(milkMoney,milkCost) {
   var milkBottles = Math.floor(milkMoney / milkCost);
   return milkBottles;
//   var milkMoney = prompt("How much money for milk?");
//   var milkCost = prompt("How much is a bottle of milk?")
//   console.log("buy " + Math.floor(milkMoney / milkCost) + " bottles of milk"); 
}

function milkChange(moneyChange, milkCost) {
  var change = Math.floor(moneyChange % milkCost);
  return change
}

console.log("Hello sir.  Here is your $" + getMilk(43, 4.99) + " change.");