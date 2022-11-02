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
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'If-Modified-Since': 'Sat, 21 Oct 2023 07:28:00 GMT', // Date should be less, then last request date
            'dots': true
        },

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