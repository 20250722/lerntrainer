
const vocab = [
    { german: "Hund", english: "dog" },
    { german: "Katze", english: "cat" },
    { german: "Haus", english: "house" },
    { german: "Baum", english: "tree" },
    { german: "Auto", english: "car" }
];

let currentIndex = -1;

function speak(text) {
    const msg = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(msg);
}

function showQuestion() {
    currentIndex = (currentIndex + 1) % vocab.length;
    const q = vocab[currentIndex];
    document.getElementById("question").innerText = `What is the English word for "${q.german}"?`;
    speak(`What is the English word for ${q.german}?`);

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    // Shuffle options
    let options = [q.english];
    while (options.length < 3) {
        const random = vocab[Math.floor(Math.random() * vocab.length)].english;
        if (!options.includes(random)) options.push(random);
    }
    options.sort(() => Math.random() - 0.5);

    options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => {
            if (opt === q.english) {
                speak("Correct!");
                alert("✅ Richtig!");
            } else {
                speak("Try again!");
                alert("❌ Falsch. Versuch es nochmal!");
            }
        };
        optionsDiv.appendChild(btn);
    });
}

function nextQuestion() {
    showQuestion();
}

window.onload = showQuestion;
