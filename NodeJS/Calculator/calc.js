var rs = require('readline-sync');

var term1 = parseFloat(rs.question("Please enter a number "));
var operator = rs.question("Please enter an operator(+,-,/,*) ");
var term2 = parseFloat(rs.question("Please enter another number "));


switch (operator) {
  case "+":
    console.log("Result: " + (term1 + term2));
    break;

  case "-":
    console.log("Result: " + (term1 - term2));
    break;

  case "/":
    console.log("Result: " + (term1 / term2));
    break;

  case "*":
    console.log("Result: " + (term1 * term2));
    break;
  default:

}
