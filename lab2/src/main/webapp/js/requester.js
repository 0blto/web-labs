function requestData(params) {

    fetch('control', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(params)
    })
        .then(response => response.text())
        .then(text => {
            table.innerHTML = text
        })

}

function requestDots() {

    fetch('control', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({dots: true})
    })
        .then(response => response.text())
        .then(text => {
            let dots = text.split(", ")
            if (dots.length !== 0) {
                for (let i = -2; i < dots.length; i += 2) {
                    dot(dots[i], dots[i + 1])
                }
            }
        })

}