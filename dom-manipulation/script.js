let quoteDisplay = document.getElementById("quoteDisplay");
let btn = document.getElementById("newQuote");
let quotes = [
  {
    text: "It always seems impossible until it's done.",
    category: "motivation",
  },
  {
    text: "Too many cooks spoil the soup",
    category: "cooking",
  },
  {
    text: "Fail is not when you try, is when you don't try",
    category: "motivation",
  },
];

function showRandomQuote() {
  let randomNumber = Math.floor(quotes.length * Math.random());
  quoteDisplay.innerHTML = quotes[randomNumber].text;
}
showRandomQuote();

function addQuote() {
  let text = inputNewQuote.value.trim(),
    category = inputQuoteCate.value.trim();
  if (text !== "" && category !== "") {
    quotes.push({ text, category });
  }
  newQuoteText.value = "";
  newQuoteCategory.value = "";
  console.log(quotes);
}

let div = document.createElement("div");
let inputNewQuote = document.createElement("input");
inputNewQuote.id = "newQuoteText";
inputNewQuote.type = "text";
inputNewQuote.placeholder = "Enter a new quote";
let inputQuoteCate = document.createElement("input");
inputQuoteCate.id = "newQuoteCategory";
inputQuoteCate.type = "text";
inputQuoteCate.placeholder = "Enter quote category";
let quotebtn = document.createElement("button");
quotebtn.textContent = "Add Quote";
div.appendChild(inputNewQuote);
div.appendChild(inputQuoteCate);
div.appendChild(quotebtn);
document.body.appendChild(div);
quotebtn.addEventListener("click", () => addQuote());
