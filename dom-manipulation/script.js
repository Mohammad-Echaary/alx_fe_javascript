let quoteDisplay = document.getElementById("quoteDisplay");
let btn = document.getElementById("newQuote"),
  isForm = true;
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
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

function addQuote(one, two) {
  let text = one.value.trim(),
    category = two.value.trim();
  if (text !== "" && category !== "") {
    quotes.push({ text, category });
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  newQuoteText.value = "";
  newQuoteCategory.value = "";
}

function createAddQuoteForm() {
  if (isForm) {
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
    quotebtn.addEventListener("click", () =>
      addQuote(inputNewQuote, inputQuoteCate)
    );
    isForm = false;
  }
}
btn.addEventListener("click", () => createAddQuoteForm());

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}
let fileInput = document.getElementById("file");
fileInput.addEventListener("change", () => importFromJsonFile(event));

let exportBtn = document.getElementById("export-quotes");
exportBtn.textContent = "Export Quotes to JSON";
exportBtn.addEventListener("click", () => exportQuotes());

function exportQuotes() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

let categoryFilter = document.getElementById("categoryFilter");

function populateCategories() {
  quotes.map((quote) => {
    let option = document.createElement("option");
    option.setAttribute("value", quote.category);
    option.textContent = quote.category;
    categoryFilter.appendChild(option);
  });
}
populateCategories();
categoryFilter.value =
  localStorage.getItem("selectedCategory") || "All Categories";
function filterQuotes() {
  let selectedCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", selectedCategory);
  quoteDisplay.innerHTML = "";
  quotes.forEach((quote) => {
    if (quote.category == selectedCategory) {
      quoteDisplay.innerHTML += `${quote.text} <br/>`;
    }
  });
}

// Fetch quotes from server on page load
window.onload = async function () {
  const serverQuotes = await fetchQuotesFromServer();
  quotes = quotes.concat(serverQuotes);
  localStorage.setItem("quotes", JSON.stringify(quotes));
  populateCategories();
  showRandomQuote();
};
async function fetchQuotesFromServer() {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "foo",
      body: "bar",
      userId: 1,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}
async function syncQuotes() {
  // Implementation of syncQuotes
}
