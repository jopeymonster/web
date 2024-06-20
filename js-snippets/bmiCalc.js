// // function input=kg,m
// function bmiCalculator(weight, height) {
//     var bmi = (weight) / Math.pow((height), 2);
//     return Math.round(bmi);        
//     }

// function input=kg,m .toFixed
// function bmiCalculator (weight, height) {
//     var bmi = ((weight) / Math.pow((height), 2)).toFixed(1);
//     if (bmi < 18.5) {
//         return "Your BMI is "+ bmi +", so you are underweight.";
//     }
//     if (bmi >= 18.5 && bmi <= 24.9) {
//         return "Your BMI is "+ bmi +", so you have normal weight.";
//     }
//     else {
//         return "Your BMI is "+ bmi +", so you are overweight.";
//     }
// }

// function input=kg,m Math.round
function bmiCalculator (weight, height) {
    var bmi = Math.round((weight) / Math.pow((height), 2));
    if (bmi < 18.5) {
        return "Your BMI is "+ bmi +", so you are underweight.";
    }
    if (bmi >= 18.5 && bmi <= 24.9) {
        return "Your BMI is "+ bmi +", so you have a normal weight.";
    }
    else {
        return "Your BMI is "+ bmi +", so you are overweight.";
    }
}

// function input=lbs, feet / fixedrounded
// function bmiCalculator(weight, height) {
//     var bmi = (weight/2.205) / Math.pow((height/3.301), 2);
//     return bmi.toFixed(2);        
//     }
// console.log(bmi);

// function input=lbs, feet / rounded
// function bmiCalculator(weight, height) {
//     var bmi = (weight/2.205) / Math.pow((height/3.301), 2);
//     return Math.round(bmi);        
//     }
