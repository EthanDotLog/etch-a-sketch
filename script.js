const screenBoxEl = document.getElementById("screen-box");
const drawType = document.querySelectorAll('input[type="radio"]');
const colorType = document.getElementById("colors");
const gridInput = document.getElementById("grid-input")
const generateBtn = document.getElementById("generate-btn")
const clearBtn = document.getElementById("clear-btn")

//generates grid container
const screenEl = document.createElement("div")
screenEl.classList.add("screen");
screenEl.style = "display: flex; width: 100%; height: 100%; flex-wrap: wrap; justify-content: center; align-items: center;";

//returns all the user selected values
function returnDraw() {
  let userDrawStyle;
  drawType.forEach(radio => {
    if (radio.checked) {
      userDrawStyle = radio.value;
    }});
  
  return userDrawStyle
}

//returns color style choice
function returnColor() {

  const drawColor = colorType.value.trim();
  return drawColor;
}

//makes the grid and gives a uniq ID
function generateGrid() {
  screenEl.innerHTML = ``;
  const userGridSize = gridInput.value.trim();
  const divCount = userGridSize * userGridSize;
  const calcGridSize = (100 / userGridSize);
  const userColor = returnColor();

  for (let i = 0; i < divCount; i++) {
    const makeDiv = document.createElement("div");
    makeDiv.id = `screen-div-${i}`;
    makeDiv.style = `border: 1px solid #3f3b3b; width: ${calcGridSize}%; height: ${calcGridSize}%; background-color: #d3d3d3;`;
    screenEl.appendChild(makeDiv);

    const eventType = returnDraw();

    if (userColor === "blackStyle") {
      makeDiv.addEventListener(eventType, () => {
        makeDiv.style.backgroundColor = "black";
      });
    } else if (userColor === "shadeStyle") {
      makeDiv.style.backgroundColor = "black";
      makeDiv.style.opacity = 0;
      makeDiv.addEventListener(eventType, () => {
        makeDiv.style.opacity = Math.min(parseFloat(makeDiv.style.opacity) + 0.03, 1);
      });
    } else if (userColor === "rainbowStyle") {
      makeDiv.addEventListener(eventType, () => {
        const currentColor = getComputedStyle(makeDiv).backgroundColor;
        if (currentColor === 'rgb(211, 211, 211)') {
          const red = valueGen();
          const green = valueGen();
          const blue = valueGen();
          makeDiv.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
        }
      });
    }
  }

  screenBoxEl.appendChild(screenEl); 
}


//clears all as a function
function clearAll() {
  screenBoxEl.innerHTML = ``;
  screenEl.innerHTML = ``;
  gridInput.value = "";
}


//generates grid
generateBtn.addEventListener("click", () => {
  generateGrid()
})

//clears all
clearBtn.addEventListener("click", () => {
  clearAll()
})

//makes rand num
function valueGen() {
  const randomNumber = Math.floor(Math.random() * 256);
  return randomNumber;
}
