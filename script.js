/* Description: 
=================================
Author: Fahad Ahmed
Author URI: https://devfahad.com/
Version: 1.1
*/
'use strict';
// Get History
function getHistory() {
    
	return document.getElementById("history-value").innerText;
}

// Print History
function printHistory(num) {
	document.getElementById("history-value").innerText = num;
}

// Get Output
function getOutput() {
	return document.getElementById("output-value").innerText;
}

// Print Output
function printOutput(num) {
    // If Empty, Set output-value to null
	if (num === "") {
		document.getElementById("output-value").innerText  = num;
	} else {
		document.getElementById("output-value").innerText = getFormattedNumber(num);
	}
}

function getFormattedNumber(num) {
    // For negative values, n = Number(num) returns a NaN
	if (num === "-") {
		return "";
	}
    // Converting string(num) to number
	let n = Number(num);
    // Converting number(n) back to string using ,(comma)
	let value = n.toLocaleString("en");
	return value;
}

// Replacing comma with null and converting num string to number
function reverseNumberFormat(num) {
	return Number(num.replace(/,/g,''));
}

let operator = document.getElementsByClassName("operator");
// Add Click Event Listeners for operators
for(let i = 0; i < operator.length; i++) {
	operator[i].addEventListener('click',function() {
		if(this.id == "clear") {
			printHistory("");
			printOutput("");
		}
		else if(this.id == "backspace") {
            // Converting comma output-value string to a number using reverseNumberFormate and then to string
			let output = reverseNumberFormat(getOutput()).toString();
			if(output){// If output has a value
				output = output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else{
			let output = getOutput();
			let history = getHistory();
			if(output == "" && history != ""){ // If output empty and history not empty
				if(isNaN(history[history.length-1])){ // Changing Operator in the last index
					history = history.substr(0,history.length-1);
				}
			}
			if(output != "" || history != ""){ // If output not empty or history not empty
                // condition ? true : false
				output = output == "" ? output : reverseNumberFormat(output);
                // Concatanating each output-value(number) to history-value(string) resulting string
				history = history + output;
				if(this.id == "="){
					let result = eval(history); // eval(string)
					printOutput(result);
					printHistory("");
				}
				else{
					history = history + this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}
let number = document.getElementsByClassName("number");
// Add Click Event Listeners for numbers
for(let i = 0; i < number.length; i++){
	number[i].addEventListener('click',function(){
		let output = reverseNumberFormat(getOutput());
		if(output != NaN){ // If output is a number
            // Concatanating output(number) with this.id i.e. clicked output-value(string) resulting string
			output = output + this.id;
			printOutput(output); // Printing String
		}
	});
}
