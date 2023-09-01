let size, def

function setParams() {
    if (window.innerWidth < window.innerHeight) {
        size = window.innerWidth * 0.4
    } else {
        size = window.innerHeight * 0.4
    }
    def = 2/100 * size
}

document.addEventListener("DOMContentLoaded", () => {
    setParams()
    init('canvas', size, def * 1 / 5)
    document.querySelector('canvas').addEventListener('click', (event) => {
        if (PF('foo').getSelectedValue() !== '') {
            let data = canvas_get_dot(event, parseFloat(PF('foo').getSelectedValue()))
            canvasResult([
                {name: 'x', value: parseFloat(data.x).toFixed(2)},
                {name: 'y', value: parseFloat(data.y).toFixed(2)},
                {name: 'r', value: parseFloat(data.r).toFixed(2)}
            ])
        }
    })


})

function update_radius(current, data) {
    graphic(def, current)
    data.forEach((elem) => restoreCanvas(elem.x, elem.y, current))
}



