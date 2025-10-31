const narrowBtn = document.querySelector(".width-adjust");
const reader = document.querySelector(".easy-reader");

narrowBtn.addEventListener("click", () => {
  const hasWider = reader.classList.contains("wider");
  const hasNarrower = reader.classList.contains("narrower");

  if (!hasWider && !hasNarrower) {
    reader.classList.add("narrower");
    narrowBtn.textContent = "Wider";
  } else if (hasWider) {
    reader.classList.replace("wider", "narrower");
    narrowBtn.textContent = "Wider";
  } else if (hasNarrower) {
    reader.classList.replace("narrower", "wider");
    narrowBtn.textContent = "Narrower";
  }
});

// SHUFFLE CARDS
const shuffleContainer = document.getElementById("shuffle-container");
const shuffleButton = document.getElementById("shuffle-btn");
const MAX_COUNT = 4;

const createCard = (n) => {
  const div = document.createElement("div");

  // Adding Class and Attributes
  div.classList.add("shuffle-card");
  div.setAttribute("data-order", n);
  div.id = `card-${n}`;
  div.style.setProperty("view-transition-name", div.id);

  // Append the child
  shuffleContainer.appendChild(div);
};

const shuffle = (array) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // CREATING 4 CARDS;
  for (let i = 1; i <= MAX_COUNT; i++) createCard(i);

  shuffleButton.addEventListener("click", (e) => {
    const $cards = Array.from(document.querySelectorAll(".shuffle-card"));

    shuffle($cards);
    document.startViewTransition(() => {
      $cards.forEach(($card, i) => {
        $card.style.setProperty("order", i);
      });
    });
  });
});
