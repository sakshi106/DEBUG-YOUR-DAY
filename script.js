// 🧠 Array of Dev Quotes
const quotes = [
  "Code is like humor. When you have to explain it, it’s bad. – Cory House",
  "Experience is the name everyone gives to their mistakes. – Oscar Wilde",
  "Java is to JavaScript what car is to Carpet. – Chris Heilmann",
  "First, solve the problem. Then, write the code. – John Johnson",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. – Martin Fowler",
  "Fix the cause, not the symptom. – Steve Maguire",
  "Before software can be reusable it first has to be usable. – Ralph Johnson",
  "Simplicity is the soul of efficiency. – Austin Freeman",
  "Talk is cheap. Show me the code. – Linus Torvalds",
  "The best error message is the one that never shows up. – Thomas Fuchs"
];

// 📌 DOM elements
const quoteText = document.getElementById("quote");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const saveBtn = document.getElementById("saveBtn");
const shareBtn = document.getElementById("shareBtn");
const favoritesList = document.getElementById("favorites");
const shareWrapper = document.querySelector(".share-wrapper");
const customQuoteInput = document.getElementById("customQuoteInput");
const addQuoteBtn = document.getElementById("addQuoteBtn");

// 📅 Footer Date
const today = new Date();
document.getElementById('footerDate').textContent = today.toLocaleDateString('en-IN', {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric'
});

// 🔁 Daily Quote (from localStorage)
const todayKey = new Date().toDateString();
let dailyQuote = localStorage.getItem('dailyQuote');
let quoteDate = localStorage.getItem('quoteDate');

if (quoteDate !== todayKey) {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  localStorage.setItem('dailyQuote', randomQuote);
  localStorage.setItem('quoteDate', todayKey);
  dailyQuote = randomQuote;
}
document.getElementById('dailyQuote').textContent = dailyQuote;

// ✨ Typewriter effect
function typeWriter(text, i = 0) {
  if (i < text.length) {
    quoteText.textContent += text.charAt(i);
    setTimeout(() => typeWriter(text, i + 1), 40);
  }
}

// 🧠 Generate New Quote Function
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];

  quoteText.textContent = "";
  typeWriter(selectedQuote);

  const utterance = new SpeechSynthesisUtterance(selectedQuote);
  speechSynthesis.speak(utterance);
}

// 🔘 Generate Button
generateBtn.addEventListener("click", getRandomQuote);

// 📋 Copy
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.textContent);
  copyBtn.textContent = "✅ Copied!";
  setTimeout(() => {
    copyBtn.textContent = "Copy";
  }, 1500);
});

// 💾 Save
saveBtn.addEventListener("click", () => {
  const quote = quoteText.textContent;
  if (quote && !Array.from(favoritesList.children).some(li => li.textContent === quote)) {
    const li = document.createElement("li");
    li.textContent = quote;
    favoritesList.appendChild(li);
  }
});

// 📤 Share
shareBtn.addEventListener("click", () => {
  const quote = quoteText.textContent;
  if (navigator.share) {
    navigator.share({
      title: "Dev Quote",
      text: quote,
      url: window.location.href
    }).catch(err => console.log("error sharing", err));
  } else {
    alert("Sharing not supported on this device.");
  }

  // Toggle optional wrapper
  if (shareWrapper) {
    shareWrapper.classList.toggle("active");
  }
});

const storedQuotes = JSON.parse(localStorage.getItem("userQuotes") || "[]");
quotes.push(...storedQuotes);

addQuoteBtn.addEventListener("click", () => {
  const newQuote = customQuoteInput.value.trim();

  if (newQuote) {
    quotes.push(newQuote); // Add to quotes array
    customQuoteInput.value = ""; // Clear input

     storedQuotes.push(newQuote);
    localStorage.setItem("userQuotes", JSON.stringify(storedQuotes));

    customQuoteInput.value = "";
    typeWriter(newQuote);


    alert("✅ Quote added successfully!");
  } else {
    alert("⚠️ Please write a quote before adding.");
  }
});

// ✅ Auto-run on load
window.onload = () => {
  quoteText.textContent = "Click below to get inspired!";
};
