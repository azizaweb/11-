  const icons = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🥝', '🍍'];
  let cards = [...icons, ...icons].sort(() => Math.random() - 0.5);
  const gameBoard = document.getElementById('gameBoard');

  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;

  cards.forEach(icon => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <div class="front">${icon}</div>
      <div class="back">?</div>
    `;

    card.addEventListener('click', function () {
      if (lockBoard || this === firstCard) return;

      this.classList.add('flip');

      if (!firstCard) {
        firstCard = this;
        return;
      }

      secondCard = this;
      lockBoard = true;

      const isMatch = firstCard.querySelector('.front').textContent === secondCard.querySelector('.front').textContent;

      if (isMatch) {
        // Оставить открытыми
        firstCard.removeEventListener('click', arguments.callee);
        secondCard.removeEventListener('click', arguments.callee);
        resetBoard();
      } else {
        // Закрыть карты обратно
        setTimeout(() => {
          firstCard.classList.remove('flip');
          secondCard.classList.remove('flip');
          resetBoard();
        }, 1000);
      }
    });

    gameBoard.appendChild(card);
  });

  function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
  }

