const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')
canvas.style.cursor = "pointer"

const cur_pos = {
    x: 0,
    y: 0
}

let defaultMargin = 5
let canvasHeight = canvas.height
let canvasWidth = canvas.width
let xCenter = canvasWidth/2
let yCenter = canvasHeight/2
let rTo = canvasWidth/6
let halfRTO = canvasWidth/3

function line(color) {
    ctx.strokeStyle = color
    ctx.stroke()
}

function sLine(color, fromX, fromY, toX, toY) {
    ctx.beginPath()

    ctx.moveTo(fromX, fromY)
    ctx.lineTo(toX, toY)

    line(color)

    ctx.closePath()
}

function arrow(fromX, fromY, toX, toY) {
    ctx.beginPath()

    ctx.moveTo(fromX, fromY)
    ctx.lineTo(toX, toY)

    if (fromX === toX) {
        ctx.moveTo(toX - 1.5 * defaultMargin, toY + 1.5 * defaultMargin)
        ctx.lineTo(toX, toY)
        ctx.moveTo(toX + 1.5 * defaultMargin, toY + 1.5 * defaultMargin)
        ctx.lineTo(toX, toY)
    } else {
        ctx.moveTo(toX - 1.5 * defaultMargin, toY - 1.5 * defaultMargin)
        ctx.lineTo(toX, toY)
        ctx.moveTo(toX - 1.5 * defaultMargin, toY + 1.5 * defaultMargin)
        ctx.lineTo(toX, toY)
    }
    line('#2196f3')
    ctx.closePath()
}

function circle(color) {
    ctx.strokeStyle = color
    ctx.beginPath()
    for (let i = 0; i <= rTo; i++) {
        let curX = i;
        let curY = Math.sqrt(rTo * rTo - curX * curX);
        ctx.lineTo(xCenter + curX, yCenter + curY);
        ctx.moveTo(xCenter + curX, yCenter + curY);
    }
    ctx.stroke();
    ctx.closePath();
}

function mark() {
    let radius = 'R'
    let halfRadius = 'R/2'
    ctx.font = `${canvasWidth/25}px Arial`
    ctx.textAlign = 'right'
    ctx.fillStyle = 'white'
    ctx.textBaseline = 'bottom'

    ctx.fillText(`${halfRadius}`, xCenter - defaultMargin, halfRTO)
    ctx.fillText(`${radius}`, xCenter - defaultMargin, rTo)
    ctx.fillText(`-${radius}`, xCenter - defaultMargin, canvasHeight-rTo)
    ctx.fillText(`-${halfRadius}`, xCenter - defaultMargin, canvasHeight-halfRTO)
    ctx.fillText('Y', xCenter - 2* defaultMargin, defaultMargin * 3)
    ctx.textBaseline = 'top'
    ctx.fillText(`-${halfRadius}`, halfRTO, yCenter + defaultMargin)
    ctx.fillText(`-${radius}`, rTo, yCenter + defaultMargin)
    ctx.fillText(`${radius}`, canvasWidth-rTo, yCenter + defaultMargin)
    ctx.fillText(`${halfRadius}`, canvasWidth-halfRTO, yCenter + defaultMargin)
    ctx.fillText('X', canvasWidth - 2 * defaultMargin, yCenter + defaultMargin)
}

function drawCanvas() {
    //lines

    ctx.clearRect(0, 0, canvasHeight, canvasWidth)
    arrow(xCenter, canvasHeight, xCenter, 0)
    arrow(0, yCenter, canvasWidth, yCenter)
    mark()

    //triangle

    sLine('#2196f3', xCenter, halfRTO, canvasWidth - rTo, yCenter)

    //square

    sLine('#2196f3', rTo, yCenter, rTo, canvasHeight - rTo)
    sLine('#2196f3', rTo, canvasHeight - rTo, xCenter, canvasHeight - rTo)

    //circle

    circle('#2196f3')
}

drawCanvas()

function dot(x, y) {
    let xVal = -(xCenter - x)
    let yVal = yCenter - y

    if (xVal >= 0 && yVal >= 0 && yVal <= -xVal / 2 + halfRTO / 2) {
        ctx.fillStyle = 'green';
    } else if (xVal <= 0 && yVal <= 0 && xVal >= -halfRTO && yVal >= -halfRTO) {
        ctx.fillStyle = 'green';
    } else if (xVal >= 0 && yVal <= 0 && (xVal * xVal) + (yVal * yVal) <= (rTo * rTo)) {
        ctx.fillStyle = 'green';
    } else {
        ctx.fillStyle = 'red';
    }

    ctx.fillRect(x, y, 3, 3);

}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return {x: x - 3.5 * defaultMargin, y: y - 3.5 * defaultMargin}
}



canvas.addEventListener("click", (event) => {
    if (rChecker()) {
        document.getElementById("canvas-label").innerHTML = '';
        cur_pos.x = getCursorPosition(canvas, event).x
        cur_pos.y = getCursorPosition(canvas, event).y
        dot(cur_pos.x, cur_pos.y)
        requestData({
            byClick: true,
            x: (cur_pos.x - xCenter) * stat.r / halfRTO, // x * halfRTO / stat.r + xCenter
            y: (yCenter - cur_pos.y) * stat.r / halfRTO, // -(y * halfRTO / stat.r - yCenter)
            r: stat.r,
            realX: cur_pos.x,
            realY: cur_pos.y
        })
    } else {
        document.getElementById("canvas-label").innerHTML = 'Необходимо задать значение r';
        document.getElementById("canvas-label").style.color = "red"
    }
})
