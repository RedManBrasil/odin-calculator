const add = (a, b = 0) => a + b;
const subtract = (a, b = 0) => a - b;
const multiply = (a, b = 1) => a * b;
const divide = (a, b = 1) => a / b;

function operate(a, b, op){
    switch(op){
        case "+":
            return add(a, b);
            break;
        case "-":
            return subtract(a,b);
            break;
        case "*":
            return multiply(a,b);
            break;
        case "/":           
            return divide(a,b);
            break;
        default:
            break;
    }
};

function clearDisplay(){
    document.querySelector('.calculator-display').innerText = "⠀";
    calculator_display = "";
}
let numA, numB; //variables stored to be the operated numbers;
let calculator_display = "" //variable the accumulates the display values and operators

const numbers_btns = document.querySelectorAll('.calculator-numbers');
numbers_btns.forEach(function(event){
    event.addEventListener("click", (a) => {
        if (opsIsSelected) {
            calculator_display = a.target.innerText;
            document.querySelector('.calculator-display').innerText = calculator_display;
            opsIsSelected = false;
        }
        else{
            calculator_display += a.target.innerText;
            document.querySelector('.calculator-display').innerText = calculator_display;
        }
    });
});

dotIsSelected = false;
const dot_op = document.querySelector('#dot-operator'); 
dot_op.addEventListener("click", (a) => { //when the Dot Button is pressed
        if (calculator_display == ""){
            calculator_display = "0.";
            document.querySelector('.calculator-display').innerText = calculator_display;
            dotIsSelected = true;
            dot_op.style.cssText = "visibility: hidden;";
        } else{
            calculator_display += ".";
            document.querySelector('.calculator-display').innerText = calculator_display;
            dotIsSelected = true;
            dot_op.style.cssText = "visibility: hidden;";
        }
    });

let equalIsSelected = false; //this is used to guarantee that the resulted value will be stored when making multiple operations at the same time
const equal_op = document.querySelector('#equal-operator');
equal_op.addEventListener("click", (a) => { //when the Equal (=) Button is pressed
        numB = parseFloat(calculator_display);
        if (numB == 0 && operator_selected == "/"){
            alert("Congratulations, you broke Mathematics. Try again.");
            clearDisplay();
            opsIsSelected = false;
            equalIsSelected = false;
            dotIsSelected = false;
        } else{
            let temp_result = operate(numA, numB, operator_selected);
            temp_result = parseFloat(temp_result.toFixed(2)); 
            document.querySelector('.calculator-display').innerText = temp_result;
            calculator_display = "";
            opsIsSelected = true;
            numA = temp_result;
            equalIsSelected = true;
            if (dotIsSelected){
                dotIsSelected = false;
                dot_op.style.cssText = "visibility: visible;";
            }
        }
    });

let operator_selected = "";
let opsIsSelected = false;
const operators_btns = document.querySelectorAll('.calculator-operators');
operators_btns.forEach(function(event){ //when a Operator (+, -, *, /) is pressed
    event.addEventListener("click", (a) => {
        operator_selected = a.target.innerText;
        opsIsSelected = true;
        if (dotIsSelected){
            dotIsSelected = false;
            dot_op.style.cssText = "visibility: visible;";
        }
        if (equalIsSelected){
            equalIsSelected = false;
        } else{ //if equal sign was pressed, the numA will the be results of the previous equation
            numA = parseFloat(calculator_display);
        }
        
    });
});

const clear_op = document.querySelector('#clear-operator'); 
clear_op.addEventListener("click", (a) => { //when the Clear Button is pressed
        clearDisplay();
        opsIsSelected = false;
        equalIsSelected = false;
        dotIsSelected = false;
        dot_op.style.cssText = "visibility: visible;";
    });

const del_op = document.querySelector('#delete-operator'); 
del_op.addEventListener("click", (a) => { //when the Delete Button is pressed
        if (calculator_display.length > 1){
            if (calculator_display.substring(calculator_display.length - 1, calculator_display.length) == "."){
                dotIsSelected = false;
                dot_op.style.cssText = "visibility: visible;";
            }
            calculator_display = calculator_display.substring(0, calculator_display.length - 1);
            document.querySelector('.calculator-display').innerText = calculator_display;
        } else{
            calculator_display = ""; //when deleting the last number, the display comeback to blank
            document.querySelector('.calculator-display').innerText = "⠀";
        }
    });