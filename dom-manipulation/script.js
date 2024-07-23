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

let newQuoteText = document.getElementById("newQuoteText"),
  newQuoteCategory = document.getElementById("newQuoteCategory");

function showRandomQuote() {
  let randomNumber = Math.floor(quotes.length * Math.random());
  quoteDisplay.innerHTML = quotes[randomNumber].text;
}
showRandomQuote();

function addQuote() {
  let text = newQuoteText.value.trim(),
    category = newQuoteCategory.value.trim();
  if (text !== "" && category !== "") {
    quotes.push({ text, category });
  }
  newQuoteText.value = "";
  newQuoteCategory.value = "";
  console.log(quotes);
}
