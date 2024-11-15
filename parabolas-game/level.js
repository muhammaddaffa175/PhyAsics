

// Ambil elemen canvas dan context
const canvas = document.getElementById("basketCanvas");
const ctx = canvas.getContext("2d");

// Ambil parameter level dari URL
const urlParams = new URLSearchParams(window.location.search);
const level = parseInt(urlParams.get('level'), 10) || 1;

// Deklarasikan variabel velocity, angle, dan time di awal
let velocity = 0;
let angle = 0;
let time = 0;
let isThrowing = false;
let isFalling = false;
let isCorrectAnswer = false;

// Update judul level dan tampilkan soal sesuai level
document.getElementById('level-title').textContent = `Level ${level}`;
document.getElementById('question').textContent = getQuestionForLevel(level);

let ballX = 50;
let ballY = canvas.height - 50;
let ringPositions = [
    { x: 500, y: canvas.height - 150 },
    { x: 450, y: canvas.height - 200 },
    { x: 400, y: canvas.height - 130 },
    { x: 350, y: canvas.height - 160 },
    { x: 300, y: canvas.height - 190 },
    { x: 250, y: canvas.height - 140 },
    { x: 200, y: canvas.height - 180 },
    { x: 150, y: canvas.height - 150 },
];
let ringX = ringPositions[level - 1].x;
let ringY = ringPositions[level - 1].y;

const ballImage = new Image();
ballImage.src = "image/bola.svg";

const ringImage = new Image();
ringImage.src = "image/ring.svg";

const gravity = 10;

// Fungsi untuk menampilkan soal berdasarkan level
function getQuestionForLevel(level) {
    switch (level) {
        case 1: velocity = 20; angle = 0; return "Hitung jarak horizontal yang ditempuh bola dengan kecepatan 20 m/s pada sudut 0°.";
        case 2: velocity = 25; angle = 30; return "Hitung jarak horizontal yang ditempuh bola dengan kecepatan 25 m/s pada sudut 30°.";
        case 3: velocity = 20; angle = 45; return "Hitung waktu yang dibutuhkan agar bola mencapai jarak maksimum dengan kecepatan 20 m/s pada sudut 45°.";
        case 4: velocity = 30; angle = 60; return "Hitung ketinggian maksimum yang dicapai bola dengan kecepatan awal 30 m/s pada sudut 60°.";
        case 5: velocity = 10; angle = 45; return "Hitung waktu total agar bola kembali ke tanah dengan kecepatan awal 10 m/s pada sudut 45°.";
        case 6: velocity = 15; angle = 45; return "Hitung ketinggian maksimum yang dicapai bola dengan kecepatan awal 15 m/s pada sudut 45°.";
        case 7: velocity = 20; angle = 60; return "Hitung waktu untuk mencapai ketinggian maksimum dengan kecepatan awal 20 m/s pada sudut 60°.";
        case 8: velocity = 25; angle = 45; return "Hitung jarak horizontal total yang ditempuh bola dengan kecepatan 25 m/s pada sudut 45°.";
        case 9: velocity = 20; angle = 75; return "Hitung ketinggian maksimum yang dicapai bola dengan kecepatan awal 20 m/s pada sudut 75°.";
        case 10: velocity = 35; angle = 45; return "Hitung jarak horizontal total yang ditempuh bola dengan kecepatan 35 m/s pada sudut 45°.";
        default: return "Soal tidak ditemukan untuk level ini.";
    }
}

function drawRing() {
    ctx.drawImage(ringImage, ringX - 20, ringY - 20, 50, 50);
}

function drawBall() {
    ctx.drawImage(ballImage, ballX, ballY, 30, 30);
}

function resetBall() {
    ballX = 50;
    ballY = canvas.height - 50;
    time = 0;
    isThrowing = false;
    isFalling = false;
    isCorrectAnswer = false;
    draw();
}

// Fungsi untuk animasi bola masuk ring jika jawaban benar
function moveBallToRing() {
    const animationInterval = setInterval(() => {
        if (ballX < ringX - 10) ballX += 5;
        if (ballY > ringY - 10) ballY -= 5;

        if (ballX >= ringX - 10 && ballY <= ringY + 10) {
            clearInterval(animationInterval);
            isFalling = true;
            fallAfterRing("Selamat! Jawaban Anda benar.");
        }
        draw();
    }, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRing();
    drawBall();
}

let incorrectAttempts = 0;

function submitAnswer() {
    const userAnswer = document.getElementById("answer").value.trim();
    if (userAnswer === "") {
        showPopup("Silahkan jawab terlebih dahulu!");
        return;
    }

    const correctAnswer = checkAnswer(level);

    if (parseFloat(userAnswer) === parseFloat(correctAnswer)) {
        isCorrectAnswer = true;
        moveBallToRing();
    } else {
        isCorrectAnswer = false;
        incorrectAttempts++;
        if (incorrectAttempts >= 2) {
            document.getElementById("hintButton").style.display = "inline";
        }
        moveBallNearRing(parseFloat(userAnswer), parseFloat(correctAnswer));
    }
}

function moveBallNearRing(userAnswer, correctAnswer) {
    const maxAnimationTime = 100;
    let animationCount = 0;

    const animationInterval = setInterval(() => {
        animationCount++;

        if (ballX < ringX - 30) ballX += 5;
        if (userAnswer < correctAnswer) {
            if (ballY < ringY + 30) ballY += 5;
        } else if (userAnswer > correctAnswer) {
            if (ballY > ringY - 30) ballY -= 5;
        }

        if ((Math.abs(ballX - (ringX - 30)) < 5 && Math.abs(ballY - (userAnswer < correctAnswer ? ringY + 30 : ringY - 30)) < 5) || animationCount > maxAnimationTime) {
            clearInterval(animationInterval);
            isFalling = true;
            fallAfterRing("Jawaban salah! Coba lagi.");
        }
        draw();
    }, 20);
}

function fallAfterRing(popupMessage) {
    const fallInterval = setInterval(() => {
        if (isFalling && ballY < canvas.height - 30) {
            ballY += 5;
        } else {
            clearInterval(fallInterval);
            showPopup(popupMessage);
        }
        draw();
    }, 20);
}

// Fungsi sederhana untuk mengecek jawaban
function checkAnswer(level) {
    const correctAnswers = {
        1: "20", 2: "55.23", 3: "2.89", 4: "34.44", 5: "1.44",
        6: "5.74", 7: "1.77", 8: "63.78", 9: "19.04", 10: "125"
    };
    return correctAnswers[level];
}

function nextLevel() {
    if (level < 10) {
        window.location.href = `level.html?level=${level + 1}`;
    } else {
        alert("Selamat! Anda telah menyelesaikan semua level.");
    }
}

function goBack() {
    window.location.href = "index.html";
}

// Mulai dengan menggambar elemen di canvas
ringImage.onload = () => {
    ballImage.onload = () => {
        draw();
    };
};

function showPopup(message) {
    document.getElementById("popupMessage").innerText = message;
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
    if (isCorrectAnswer) {
        document.getElementById("nextLevel").style.display = "inline";
    }
    resetBall(); // Tambahkan pemanggilan resetBall di sini
}
