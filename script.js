document.addEventListener('DOMContentLoaded', function () {
  const gameBoard = document.querySelector('.game-board');
  const moveCounter = document.getElementById('move-counter');
  const pairsCounter = document.getElementById('pairs-counter');
  const timer = document.getElementById('timer-value');

  let flippedCards = [];
  let moves = 0;
  let remainingPairs = 0;
  let timeLeft = 60;
  let countdown;
  let difficulty = 'easy';

  let cards = [
    { id: 0, character: 'Goku', imageFormat: 'jpg' },
    { id: 1, character: 'Vegeta', imageFormat: 'jpg' },
    { id: 2, character: 'Piccolo', imageFormat: 'png' },
    { id: 3, character: 'Son-Gohan', imageFormat: 'png' },
    { id: 4, character: 'Bulma', imageFormat: 'png' },
    { id: 5, character: 'A17', imageFormat: 'jpg' },
    { id: 6, character: 'A18', imageFormat: 'png' },
    { id: 7, character: 'Bardock', imageFormat: 'png' },
    { id: 8, character: 'Broly', imageFormat: 'jpg' },
    { id: 9, character: 'Trunks', imageFormat: 'jpg' },
    { id: 10, character: 'Krilin', imageFormat: 'jpg' },
    { id: 11, character: 'Yamsha', imageFormat: 'jpg' },
    { id: 12, character: 'Chaos', imageFormat: 'jpg' },
    { id: 13, character: 'Nappa', imageFormat: 'png' },
    { id: 14, character: 'Raditz', imageFormat: 'jpg' },
    { id: 15, character: 'Chi-Chi', imageFormat: 'png' },
    { id: 16, character: 'Mr-Satán', imageFormat: 'jpg' },
    { id: 17, character: 'Ten-Shin-Han', imageFormat: 'png' },
    { id: 18, character: 'Launch', imageFormat: 'png' },
    { id: 19, character: 'Oolong', imageFormat: 'jpg' },
    { id: 20, character: 'Puar', imageFormat: 'png' },
    { id: 21, character: 'Videl', imageFormat: 'jpg' },
    { id: 22, character: 'Dr-Gero', imageFormat: 'jpg' },
    { id: 23, character: 'General-Blue', imageFormat: 'png' },
    { id: 24, character: 'Pilaf', imageFormat: 'png' },
    { id: 25, character: 'Upa', imageFormat: 'jpg' },
    { id: 26, character: 'Tao-Pai-Pai', imageFormat: 'jpg' },
    { id: 27, character: 'Mutenroshi', imageFormat: 'jpg' },
    { id: 28, character: 'Murasaki', imageFormat: 'png' },
    { id: 29, character: 'Karin', imageFormat: 'png' }
  ];

  const difficultyButtons = document.querySelectorAll('.difficulty-button');
  difficultyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      difficulty = button.getAttribute('data-difficulty');
      startGame();
    });
  });

  function startGame() {
    flippedCards = [];
    moves = 0;
    moveCounter.textContent = moves;
    generateCards();
    createCardElements();
    startCountdown();
    showInitialCards();
  }

  function generateCards() {
    characters = []; // Limpiamos las cartas previas
    remainingPairs = 0;

    let numberOfPairs = 4;

    if (difficulty === 'medium') {
      numberOfPairs = 6;
    } else if (difficulty === 'hard') {
      numberOfPairs = 8;
    }

    const selectedCards = cards.slice(0, numberOfPairs); // Seleccionamos solo las cartas necesarias
    const shuffledCards = [...selectedCards, ...selectedCards]; // Creamos las parejas
    shuffledCards.sort(() => Math.random() - 0.5); // Las mezclamos

    remainingPairs = numberOfPairs;
    pairsCounter.textContent = remainingPairs; // Mostramos el número de parejas

    characters = shuffledCards; // Asignamos a la variable global
  }

  function createCardElements() {
    gameBoard.innerHTML = ''; // Limpiamos el tablero

    characters.forEach((characterObj) => {
      const cardElement = document.createElement('div');
      cardElement.className = 'card';
      cardElement.dataset.character = characterObj.character;

      const cardImage = document.createElement('img');
      cardImage.src = `img/${characterObj.character}.${characterObj.imageFormat}`;
      cardImage.style.display = 'none'; // Ocultamos las imágenes inicialmente
      cardElement.appendChild(cardImage);

      cardElement.addEventListener('click', () => {
        flipCard(cardElement);
      });

      gameBoard.appendChild(cardElement);
    });
  }

  function flipCard(card) {
    if (flippedCards.length >= 2 || card.classList.contains('flipped')) return; // Evitamos voltear más de dos

    card.classList.add('flipped');
    card.querySelector('img').style.display = 'block'; // Mostramos la imagen
    flippedCards.push(card);
    moves++;
    moveCounter.textContent = moves;

    if (flippedCards.length === 2) {
      setTimeout(checkForMatch, 1000); // Comprobamos si hay match tras un breve retraso
    }
  }

  function checkForMatch() {
    const [card1, card2] = flippedCards;
    const character1 = card1.dataset.character;
    const character2 = card2.dataset.character;

    if (character1 === character2) {
      flippedCards = [];
      remainingPairs--;
      pairsCounter.textContent = remainingPairs;

      if (remainingPairs === 0) {
        clearInterval(countdown); // Detenemos el tiempo
        alert('¡Has ganado!');
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card1.querySelector('img').style.display = 'none';

        card2.classList.remove('flipped');
        card2.querySelector('img').style.display = 'none';

        flippedCards = [];
      }, 1000); // Ocultamos las cartas después de 1 segundo si no coinciden
    }
  }

  function startCountdown() {
    clearInterval(countdown);
    timeLeft = difficulty === 'easy' ? 60 : difficulty === 'medium' ? 45 : 30; // Ajustamos el tiempo según la dificultad

    countdown = setInterval(() => {
      timeLeft--;
      timer.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(countdown);
        alert('¡Se acabó el tiempo!');
      }
    }, 1000); // Restamos un segundo en cada intervalo
  }

  function showInitialCards() {
    const allCards = document.querySelectorAll('.card');

    allCards.forEach((card) => {
      card.classList.add('flipped');
      card.querySelector('img').style.display = 'block';
    });

    setTimeout(
      () => {
        allCards.forEach((card) => {
          card.classList.remove('flipped');
          card.querySelector('img').style.display = 'none';
        });
      },
      difficulty === 'easy' ? 2000 : 1000
    ); // Mostramos las cartas por un tiempo corto
  }
});
