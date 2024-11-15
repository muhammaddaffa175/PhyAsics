
let unlockedLevels = JSON.parse(localStorage.getItem('unlockedLevels')) || [1];

window.onload = function() {
    updateLevelButtons();
};

// Fungsi untuk memperbarui status tombol level
function updateLevelButtons() {
    for (let i = 1; i <= 10; i++) {
        const levelButton = document.getElementById(`level${i}`);
        if (unlockedLevels.includes(i)) {
            levelButton.classList.add("unlocked");
            levelButton.classList.remove("locked");
            levelButton.disabled = false;
        } else {
            levelButton.classList.add("locked");
            levelButton.classList.remove("unlocked");
            levelButton.disabled = true;
        }
    }
}

// Fungsi navigasi ke halaman level dengan parameter
function goToLevel(level) {
    if (unlockedLevels.includes(level)) {
        // Mengarahkan ke level.html dengan parameter level
        window.location.href = `level.html?level=${level}`;
    } else {
        alert("Level ini belum terbuka!");
    }
}
