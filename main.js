const cards = Array.from(document.querySelectorAll(".card"));
const cardImages = Array.from(document.querySelectorAll(".card-image"));

let selectedCard = null;
let selectedCardImage = null;
let lastMouseX = 0;
let lastMouseY = 0;
let mouseDown = false;
let rotateX = 0;
let rotateY = 0;
let zIndexCounter = 0;

const setCardCenterToMouse = () => {
  const xAxis = lastMouseX - selectedCard.offsetWidth / 2;
  const yAxis = lastMouseY - selectedCard.offsetHeight / 2;
  selectedCard.style.left = `${xAxis}px`;
  selectedCard.style.top = `${yAxis}px`;
};

const highLightSelectedCard = () => {
  selectedCard.style.zIndex = zIndexCounter++;
  selectedCard.style["filter"] = "drop-shadow(0px 5px 10px #00ffbb)";
};
const resetSelectedCardStyles = () => {
  selectedCardImage.style.transform = "rotateX(0deg) rotateY(0deg)";
  selectedCard.style["filter"] = "none";
  mouseDown = false;
  rotateX = 0;
  rotateY = 0;
  selectedCard = null;
  selectedCardImage = null;
};

const handleMouseMove = (e) => {
  currentMouseY = e.pageY;
  currentMouseX = e.pageX;
  if (mouseDown && selectedCard && selectedCardImage) {
    setCardCenterToMouse();

    if (currentMouseY > lastMouseY) {
      rotateX = Math.max(rotateX - 1, -20);
    } else if (currentMouseY < lastMouseY) {
      rotateX = Math.min(rotateX + 1, 20);
    }

    if (currentMouseX > lastMouseX) {
      rotateY = Math.min(rotateY + 1, 20);
    } else if (currentMouseX < lastMouseX) {
      rotateY = Math.max(rotateY - 1, -20);
    }
  }

  lastMouseX = currentMouseX;
  lastMouseY = currentMouseY;
};

const handleMouseDown = (e) => {
  e.preventDefault();
  const card = e.currentTarget;
  const cardIndex = card.getAttribute("data-index");
  selectedCard = cards[cardIndex];
  selectedCardImage = cardImages[cardIndex];

  if (selectedCard && selectedCardImage) {
    mouseDown = true;
    setCardCenterToMouse();
    highLightSelectedCard();
  }
};

const handleMouseUp = (e) => {
  e.preventDefault();
  if (mouseDown && selectedCardImage && selectedCard) {
    resetSelectedCardStyles();
  }
};

const animateCard = () => {
  if (mouseDown && selectedCardImage) {
    selectedCardImage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.2)`;
  }
  requestAnimationFrame(animateCard);
};

cards.forEach((card, index) => {
  card.setAttribute("data-index", index);
  card.addEventListener("mousedown", handleMouseDown);
  card.addEventListener("mouseup", handleMouseUp);
});

window.addEventListener("mousemove", handleMouseMove);

animateCard();
