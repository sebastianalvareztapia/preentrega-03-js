const moviesObject = {
    "Tienen el álbum debut más vendido de la historia, con más de 30 millones de copias vendidas": "Guns N Roses",
    "Decían que en los conciertos olía mucho a orina por la sobreexcitación de las chicas": "The Beatles",
    "El nombre de la banda proviene de una cita de Aldous Huxley": "The Doors",
    "Su nombre proviene de una canción de la banda Talking Heads": "Radiohead",
    "Uno de sus miembros fue expulsado de los Boys Scouts con deshonor.": "The Rolling Stones",
    "La banda fue una de las primeras en hacerse conocida gracias a Internet.": "Arctic Monkeys",
    "Compraron una iglesia y la usaron como estudio": "Arcade Fire",
    "Su vocalista diseñó el logo de la banda": "queen",
    "Formaron un grupo llamado Pectoralz, que más tarde se convirtió en Starfish": "Coldplay",
    "Su vocalista arrancó la cabeza de un murciélago con su boca": "Black Sabbath",
    "Subió la tasa de natalidad en francia después de que una canción se convirtiera en hit ": "Scorpions",
    "El maquillaje de la banda está inspirado en el cine de terror": "Kiss",
    "El nombre a la banda es porque el padre de un miembro trabajaba en la CIA": "The Police",
    "La portada de uno de sus discos presenta a un perro llamado Sunshine": "Alice in chains",
};

const container = document.querySelector(".container");
const controls = document.querySelector(".controls-container");
const startButton = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInputSection = document.getElementById("userInputSection");
const resultText = document.getElementById("result");
const chanceCount = document.getElementById("chanceCount");
const hints = Object.keys(moviesObject);
let randomHint = "",
    randomWord = "";
let winCount = 0,
    lossCount = 5;

const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

const blocker = () => {
    let letterButtons = document.querySelectorAll(".letters");
    letterButtons.forEach((button) => {
        button.disabled = true;
    });
    stopGame();
};

startButton.addEventListener("click", () => {
    controls.classList.add("hide");
    init();
});

const stopGame = () => {
    controls.classList.remove("hide");
};

const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";
    randomHint = hints[generateRandomValue(hints)];
    randomWord = moviesObject[randomHint];
    container.innerHTML = `<div id="movieHint">${randomHint}</div>`;
    let displayItem = "";
    randomWord.split("").forEach((value) => {
        if (value == " ") {
            winCount += 1;
            displayItem += `<span class="inputSpace">&nbsp;</span>`;
        } else {
            displayItem += `<span class="inputSpace">_</span>`;
        }
    });
    userInputSection.innerHTML = displayItem;
};

const init = () => {
    winCount = 0;
    lossCount = 3;
    chanceCount.innerHTML = `<span>Intentos: </span>${lossCount}`;
    randomHint = null;
    randomWord = "";
    userInputSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    generateWord();
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");

        button.innerText = String.fromCharCode(i);

        button.addEventListener("click", () => {
            let charArray = randomWord.toUpperCase().split("");
            let inputSpace = document.getElementsByClassName("inputSpace");
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    if (char === button.innerText) {
                        button.classList.add("used");
                        inputSpace[index].innerText = char;
                        winCount += 1;
                        if (winCount == charArray.length) {
                            resultText.innerHTML = "Tienes el poder del rock 🤘🏻";
                            blocker();
                            localStorage.setItem("winCount", winCount);
                        }
                    }
                });
            } else {
                lossCount -= 1;
                chanceCount.innerHTML = `<span>Intentos:</span> ${lossCount}`;
                button.classList.add("used");
                if (lossCount == 0) {
                    resultText.innerHTML = "Perdiste, métele más rock";
                    blocker();
                }
            }
            button.disabled = true;
        });
        letterContainer.appendChild(button);
    }
};

window.onload = () => {
    winCount = localStorage.getItem("winCount") || 0;
    init();
};
