let count = 0;
let button1 = document.getElementById("test-button-1");
let button2 = document.getElementById("test-button-2");
let countSpan = document.getElementById("count");

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

function init() {
  updateCount(count);
}

init();
