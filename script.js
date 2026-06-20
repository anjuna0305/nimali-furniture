let count = 0;
let button1 = document.getElementById("test-button-1");
let button2 = document.getElementById("test-button-2");
let button3 = document.getElementById("test-button-3");
let errorTag = document.getElementById("error-tag")

if (!errorTag) {
	console.log("error tag is null")
}

let countSpan = document.getElementById("count");
let temp = document.getElementById("temp");

if (!temp) {
	console.log("temp is null")
}

function updateCount(newCount) {
	countSpan.innerText = newCount;
}

button1.addEventListener("click", () => {
	count++;
	updateCount(count);
	console.log("count is increased");
});

button2.addEventListener("click", () => {
	count--;
	updateCount(count);
	console.log("count is decreased");
});

button3.addEventListener("click", () => {
	count /= 2
	updateCount(count)
	console.log("count devided by 2")
})

function displayError(error) {
	errorTag.innerHTML(error)
}

function clearError() {
	errorTag.innerHTML("")
}

function init() {
	displayError("thi is the error")
	updateCount(count);
}

init();
