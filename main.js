let score = 0;
let time = 45;
let num1, num2, operator, correctAnswer;
let timer;

function getRange() {
    if (score < 5) return [1, 10];     // Mudah
    if (score < 10) return [10, 20];   // Menengah
    return [20, 50];                   // Sulit
}

function generateQuestion() {
    let [min, max] = getRange();
    num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    let operators = ["+", "-", "*", "/"];
    operator = operators[Math.floor(Math.random() * operators.length)];

    if (operator === "-") {
        // Pastikan hasil pengurangan tidak negatif
        if (num1 < num2) [num1, num2] = [num2, num1]; 
    } else if (operator === "/") {
        // Pastikan hasil pembagian adalah bilangan bulat
        num1 = num2 * (Math.floor(Math.random() * 10) + 1); 
    }

    correctAnswer = eval(`${num1} ${operator} ${num2}`);

    let displayOperator = operator === "*" ? "x" : operator;
    document.getElementById("question").innerText = `Berapa hasil dari ${num1} ${displayOperator} ${num2}?`;
}

function checkAnswer() {
    let userAnswer = parseFloat(document.getElementById("answer").value);
    if (userAnswer === correctAnswer) {
        score++;
        let extraTime = Math.ceil(time * 0.02);
        time += extraTime;
        document.getElementById("result").innerText = `Benar! (+${extraTime} detik)`;
    } else {
        score = 0; 
        document.getElementById("result").innerText = "Salah! Skor kembali 0.";
    }
    document.getElementById("score").innerText = score;
    document.getElementById("time").innerText = time;
    document.getElementById("answer").value = "";
    generateQuestion();
}

function countdown() {
    if (time > 0) {
        time--;
        document.getElementById("time").innerText = time;
    } else {
        clearInterval(timer);
        alert("Waktu habis! Skor akhir: " + score);
        location.reload();
    }
}

window.onload = function() {
    generateQuestion();
    timer = setInterval(countdown, 1000);
};