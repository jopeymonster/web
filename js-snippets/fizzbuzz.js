var output = [];

function fizzBuzz() {
    for(var count = 1; count <= 100; count++) {
    if (count % 3 === 0 && count % 15 === 0) {
        output.push("FizzBuzz");
    }
    else if (count % 3 === 0) {
        output.push("Fizz");
    }
    else if (count % 5 === 0) {
        output.push("Buzz");
    } 
    else {
        output.push(count);
    }
    } console.log(output);
}

// while loop
// var output = [];
// var count = 1;
// function fizzBuzz() {
//     while(count <= 100) {
//     if (count % 3 === 0 && count % 15 === 0) {
//         output.push("FizzBuzz");
//     }
//     else if (count % 3 === 0) {
//         output.push("Fizz");
//     }
//     else if (count % 5 === 0) {
//         output.push("Buzz");
//     } 
//     else {
//         output.push(count);
//     }
//     count++;
//     } console.log(output);
// }