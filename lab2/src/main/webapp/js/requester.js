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
            if (!text.startsWith('data')) {
                drawCanvas()
            } else {
                drawImage(text)
            }
        })

}