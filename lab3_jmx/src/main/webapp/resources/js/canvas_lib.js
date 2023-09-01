let default_line_width = 0

let canvas, ctx, sizeC, center, default_margin

function init(name, param, st_width) {
    canvas = document.querySelector(name)
    ctx = canvas.getContext('2d')
    canvas.width = param
    canvas.height = param
    sizeC = param
    default_line_width = st_width
    default_margin = 2/100 * size
    center = sizeC / 2
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.length)
}

function rect(color, fromX, fromY, lenX, lenY) {
    ctx.fillStyle = color
    ctx.fillRect(fromX, fromY, lenX, lenY)
}

function arc(color, centerX, centerY, radius, from, to, isFilled) {
    ctx.lineWidth = default_line_width
    ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, from, to)
    if (isFilled) {
        ctx.fill()
    } else {
        ctx.stroke()
    }
    ctx.closePath()
}

function line(color, fromX, fromY, length, width, angle) {
    ctx.lineWidth = width
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(fromX, fromY)
    ctx.lineTo(length * Math.sin(angle) + canvas.width / 2, -length * Math.cos(angle) + canvas.width / 2)
    ctx.stroke()
    ctx.closePath()
}

function graphic(def, current) {
    ctx.fillStyle = 'rgb(44, 44, 44)'
    ctx.fillRect(0, 0, sizeC, sizeC)
    line('yellow', 0, canvas.height / 2, canvas.width, default_line_width, Math.PI / 2)
    line('yellow', canvas.width / 2, 0, canvas.height, default_line_width, Math.PI)
    ctx.strokeStyle = 'yellow'
    ctx.beginPath()
    ctx.moveTo(canvas.width, canvas.height / 2)
    ctx.lineTo(canvas.width - def, canvas.height / 2 - def)
    ctx.moveTo(canvas.width, canvas.height / 2)
    ctx.lineTo(canvas.width - def, canvas.height / 2 + def)
    ctx.moveTo(canvas.width / 2, 0)
    ctx.lineTo(canvas.width / 2 - def, def)
    ctx.moveTo(canvas.width / 2, 0)
    ctx.lineTo(canvas.width / 2 + def, def)

    ctx.moveTo(sizeC / 2, 5 / 8 * sizeC)
    ctx.lineTo(5 / 8 * sizeC, sizeC / 2)
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.arc(sizeC / 2, sizeC / 2, sizeC / 8, - Math.PI / 2, 0)

    ctx.moveTo(sizeC / 4, sizeC / 2)
    ctx.lineTo(sizeC / 4, sizeC * 3 / 4)
    ctx.moveTo(sizeC / 4, sizeC * 3 / 4)
    ctx.lineTo(sizeC / 2, sizeC * 3 / 4)
    ctx.stroke()
    ctx.closePath()

    let radius = 'R'
    let halfRadius = 'R/2'
    if (current !== '') {
        radius = parseFloat(current)
        halfRadius = current / 2
    }
    ctx.font = `${canvas.width/25}px Arial`
    ctx.textAlign = 'right'
    ctx.fillStyle = 'white'
    ctx.textBaseline = 'top'

    ctx.fillText(`${halfRadius}`, sizeC / 2 - default_margin, 3 / 8 * sizeC)
    ctx.fillText(`${radius}`, sizeC / 2 - default_margin, 1 / 4 * sizeC)
    ctx.fillText(`-${radius}`, sizeC / 2 - default_margin, sizeC - 1 / 4 * sizeC)
    ctx.fillText(`-${halfRadius}`, sizeC / 2 - default_margin, sizeC - 3 / 8 * sizeC)
    ctx.fillText('Y', sizeC / 2 - default_margin, default_margin * 3)
    //ctx.textBaseline = 'bottom'
    ctx.fillText(`-${halfRadius}`, 3 / 8 * sizeC, sizeC / 2 + default_margin)
    ctx.fillText(`-${radius}`, 1 / 4 * sizeC, sizeC / 2 + default_margin)
    ctx.fillText(`${radius}`, 3/4 * sizeC, sizeC / 2 + default_margin)
    ctx.fillText(`${halfRadius}`, 5/8 * sizeC, sizeC / 2 + default_margin)
    ctx.fillText('X', sizeC - 2 * default_margin, sizeC / 2 + default_margin)
}

function dot(x, y) {
    let xVal = -(center - x)
    let yVal = center - y

    if (xVal <= 0 && yVal <= 0 && yVal >= -1/4 * sizeC && xVal >= -1/4 * sizeC) {
        ctx.fillStyle = 'green';
    } else if (xVal >= 0 && yVal <= 0 && yVal >= xVal - 1 / 8 * sizeC) {
        ctx.fillStyle = 'green';
    } else if (xVal >= 0 && yVal >= 0 && (xVal * xVal) + (yVal * yVal) <= (1/8/8 * sizeC * sizeC)) {
        ctx.fillStyle = 'green';
    } else {
        ctx.fillStyle = 'red';
    }
    ctx.beginPath()
    ctx.arc(x, y, default_margin / 2, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()

}

function form_dot() {
    const x = document.querySelectorAll('.x-value:checked')
    document.getElementById('point-form:x-msg').innerHTML = ''
    if (x.length === 0) {
        document.getElementById('point-form:x-msg').innerHTML = 'Выберите хотя бы один X'
        return
    }
    const y = parseFloat(document.getElementById('point-form:y-input').value)
    if (isNaN(y) || y > 3 || y < -3) {
        return
    }
    const r = parseFloat(PF('foo').getSelectedValue())

    x.forEach(el => {
        let val = parseFloat(el.id.replace('point-form:x_', ''))
        dot(val * 1/4 * sizeC / r + center, -(y * 1/4 * sizeC / r - center))
    })
}

function restoreCanvas(x, y, r) {
    dot(x * 1/4 * sizeC / r + center, -(y * 1/4 * sizeC / r - center))
}

function canvas_get_dot(event, radius) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    dot(x, y)
    return {
        x: (x - center) * radius / (1/4 * sizeC),
        y: (center - y) * radius / (1/4 * sizeC),
        r: radius
    }
}



