const heightEl = document.querySelector('#height-input')
const widthEl = document.querySelector('#width-input')
const submitBtn = document.querySelector('#submit-btn')

const gridContainer = document.createElement('div')
gridContainer.setAttribute('id', 'grid-container')
const gridSquare = document.querySelector('[id^=square]')

submitBtn.addEventListener('click', function() {
    clearGrid()
    getSize()
    printGrid()
})



let userHeight;
let userWidth;
let gridHeight;
let gridWidth;

function getSize() {
    userHeight = Number(heightEl.value)
    userWidth = Number(widthEl.value)
    gridHeight = userHeight * 15 
    gridWidth =  userWidth * 15
    totalSize = userHeight * userWidth
}

function printGrid() {
    gridContainer.setAttribute('style', `display: flex; flex-wrap: wrap; width: ${(gridWidth + userWidth +2)}px; height: ${(gridHeight + userHeight +2)}px; background: black;`)
    
    for (let i = 0; i < totalSize; i++) {
        const gridSquare = document.createElement('div')
        gridSquare.setAttribute('style', 'background: rgb(255, 255, 255); width: 15px; height: 15px; opacity: 1; margin: .5px;')
        gridSquare.setAttribute('id', `square${i}`)
        gridContainer.append(gridSquare)
        document.body.append(gridContainer)
        gridSquare.addEventListener('mouseover', function(e) {
            let divId = e.target.id
            let target = document.querySelector(`#${divId}`)
            let style = window.getComputedStyle(document.querySelector(`#${divId}`)).opacity
            let styleNum = Number(style)
            let newNum = styleNum - .1
            let newStyle = String(newNum)
            target.style.opacity = newNum
            console.log(typeof style)
            console.log(newNum)


        })
    }
    
}

function clearGrid() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
}