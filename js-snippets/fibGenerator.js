function fibGen(n) {
    var fibArray = [];
    if (n === 1) {
        fibArray = [0];
    }   
    else if (n === 2) {
        fibArray = [0, 1];
    } 
    else {
        fibArray = [0, 1];
        for (var fibCalc = 2; fibCalc < n; fibCalc++) {
            fibArray.push(fibArray[fibArray.length - 2] + fibArray[fibArray.length - 1]);
        }
    }
    return fibArray
}

// function fibGen(n) {
//     var fibArray = [];
//     if (n > 0) {
//         fibArray.push(0);
//     }
//     if (n > 1) {
//         fibArray.push(1);
//     } 
//     for (var fibCalc = 2; fibCalc < n; fibCalc++) {
//         fibArray.push(fibArray[fibCalc-2] + fibArray[fibCalc-1]);     
//     }
//     return fibArray; 
// }

// function fibGen(n) {
//     var fibArray = [];
//     var fNum = -1;
//     var sNum = 1;
//     var sumNum = 0;

//     for (var fibCalc = 0; fibCalc < n; fibCalc++) {
//         sumNum = fNum + sNum;
//         fibArray.push(sumNum);
//         fNum = sNum;
//         sNum = sumNum;
//     }
//     return fibArray;
// }

// function fibGen(n) {
//     var fibArray = [];
//     var fNum = -1;
//     var sNum = 1;

//     for (var fibCalc = 0; fibCalc < n; fibCalc++) {
//         fibArray.push(fNum + sNum);
//         fNum = sNum;
//         sNum = fibArray[fibArray.length - 1];
//     }
//     return fibArray;
// }