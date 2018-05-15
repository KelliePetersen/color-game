// GLOBAL VARIABLES
let squareCount = 6;
let colors = [];
let pickedColor;
const container = document.getElementById("container");
const squares = document.getElementsByClassName("square");
const message = document.getElementById("message");
const heading = document.getElementById("heading");
const resetButton = document.getElementById("reset");
const modeButtons = document.getElementsByClassName("mode");
let colorDisplay = document.getElementById("colorDisplay");

// IIFE Initialization. Sets up the game.
(function init() {
	setupResetButton();
	setupModeButtons();
	setupSquareListeners();
	reset();
})();

// INITIALIZED FUNCTIONS

function setupResetButton() {
	resetButton.addEventListener("click", function() {
		reset();
	});
}

function setupModeButtons() {
	for (let i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? squareCount = 3 : squareCount = 6;
			reset();
		});
	}
}

function setupSquareListeners() {
	container.addEventListener("click", function(event) {
		if (event.target.style.backgroundColor === pickedColor) {
			message.textContent = "Correct!";
			heading.style.backgroundColor = pickedColor;
			changeColors(pickedColor);
			resetButton.textContent = "Play Again?";
		} else {
			event.target.style.backgroundColor = "#232323";
			event.target.style.visibility = "hidden";
			message.textContent = "Wrong! Try again.";
		}			
	})
}

// FUNCTIONS

function changeColors(color) {
	for (let i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	let random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateColors(num) {
	let arr = [];
	for (let i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	return arr;
}

function randomColor() {
	let r = Math.ceil(Math.random() * 255);
	let g = Math.ceil(Math.random() * 255);
	let b = Math.ceil(Math.random() * 255);
	return `rgb(${r}, ${g}, ${b})`;
}

function reset() {
	message.textContent = "";
	resetButton.textContent = "New Colors";
	colors = generateColors(squareCount);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	heading.style.backgroundColor = "steelblue";
	for (let i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.visibility = "";
			squares[i].style.display = "";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	};
}
