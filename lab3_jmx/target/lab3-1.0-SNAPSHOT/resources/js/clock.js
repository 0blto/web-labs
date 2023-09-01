const BGC = '#373737'

let size, def, radius, st_width

function setParams() {
    if (window.innerWidth < window.innerHeight) {
        size = window.innerWidth * 0.5
    } else {
        size = window.innerHeight * 0.5
    }
    radius = 2/6 * size
    def = 15/100 * radius
    st_width = 2/100 * size
}
document.addEventListener("DOMContentLoaded", () => {
    setParams()
    init('canvas', size, st_width)



    function clock() {
        window.requestAnimationFrame(clock)
        let date = new Date(),
            hours = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours(),
            minutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes(),
            seconds = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds(),
            millis = date.getMilliseconds()
        rect(BGC, 0, 0, size, size)
        clear()
        arc('orange', size / 2, size / 2, radius, 0, 2 * Math.PI, false)
        line('yellow', size / 2, size / 2, radius - def, st_width, Math.PI * seconds / 30 + Math.PI * millis / 500 / 60)
        line('yellow', size / 2, size / 2, radius - 2 * def, st_width, Math.PI * minutes / 30 + Math.PI * seconds / 30 / 60)
        line('yellow', size / 2, size / 2, radius - 3 * def, st_width, Math.PI * hours / 6 + Math.PI * minutes / 30 / 30)
        arc('orange', size / 2, size / 2, 5 / 100 * radius, 0, 2 * Math.PI, true)
        document.querySelector('#clock').innerHTML = hours + ':' + minutes + ':' + seconds
    }
    clock()

})

window.addEventListener('resize', () => {
    setParams()
    init('canvas', size, st_width)
})