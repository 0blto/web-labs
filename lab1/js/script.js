const x_text = document.querySelector(".x-text");
const x_buttons = document.querySelectorAll(".x-button");
const y_text = document.querySelector(".y-text");
const y = document.querySelector(".y-input");
const r_text = document.querySelector(".r-text");
const r_buttons = document.querySelectorAll(".r-button");
const table = document.querySelector("#result-table");
const submit = document.querySelector(".form-submit");
const error_text = document.getElementById('text-error');
const clear_button = document.querySelector('.clear');



const stat = {
    x: undefined,
    y: undefined,
    r: undefined
};

const SELECTED_COLOR = '#1a73a8';
const BLUR_COLOR = 'rgb(29, 29, 29)';
const HOVER_COLOR = '#2196f3';
const TEXT_COLOR = 'white';

//js styling
function hoverButton(button, text) {
    button.style.backgroundColor = HOVER_COLOR;
    selectText(text);
    
}

function focusButton(buttons, button) {
    for (i = 0; i < buttons.length; i++) {
        if (buttons[i] != button) {
            buttons[i].style.backgroundColor = BLUR_COLOR;
        }
        button.style.backgroundColor = SELECTED_COLOR;
    }
    return button.value;
}

function blurButton(button, text, val) {
    if (val != button.value) {
        button.style.backgroundColor = BLUR_COLOR;
    } else {
        button.style.backgroundColor = SELECTED_COLOR;
    }
    blurText(text);
}

function selectText(text) {
    text.style.color = HOVER_COLOR;
}

function blurText(text) {
    text.style.color = TEXT_COLOR;
}



r_buttons.forEach(button => { 
    button.onfocus = function() {
        hoverButton(button, r_text);
    }

    button.onblur = function() {
        blurButton(button, r_text, stat.r);
    }

    button.addEventListener("mouseover", function() {
        hoverButton(button, r_text);
    });

    button.addEventListener("mouseout", function() {
        blurButton(button, r_text, stat.r);
    });

    button.addEventListener("click", (event) => {
        event.preventDefault();
        stat.r = focusButton(r_buttons, button);
    })
});

x_buttons.forEach(button => { 
    button.onfocus = function() {
        hoverButton(button, x_text);
    }

    button.onblur = function() {
        blurButton(button, x_text, stat.x);
    }

    button.addEventListener("mouseover", function() {
        hoverButton(button, x_text);
    });

    button.addEventListener("mouseout", function() {
        blurButton(button, x_text, stat.x);
    });

    button.addEventListener("click", (event) => {
        event.preventDefault();
        stat.x = focusButton(x_buttons, button);
    })
});

y.onfocus = function() {
    selectText(y_text);
}

y.onblur = function() {
    blurText(y_text);
}

clear_button.addEventListener("click", (event) => {
    event.preventDefault();
    table.innerHTML = '';
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/clear.php');
    xhr.setRequestHeader('Content-Type',
        'application/x-www-form-urlencoded');

    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            table.innerHTML = xhr.responseText;
            console.log(xhr.responseText);
        }
    }
})

const MAX_Y = 3;
const MIN_Y = -5;
//main prog
function xChecker() {
    if (stat.x == undefined) {
        return false;
    }
    return true;
}

function yChecker(yval) {
    let numeric = yval.replace(',', '.');
    if (isNaN(numeric) || numeric === '') {
        error_text.innerHTML = 'Y должен быть числом';
        error_text.style.color = 'red';
        return false;
    } else if (numeric > MAX_Y || numeric < MIN_Y) {
        error_text.innerHTML = 'Y должен быть в пределах (-5 ... 3)';
        error_text.style.color = 'red';
        return false;
    }
    error_text.style.color = '#272727';
    stat.y = numeric;
    return true;
}

function rChecker() {
    if (stat.r == undefined) {
        return false;
    }
    return true;
}

function validateData(yval) {
    return xChecker() && yChecker(yval) && rChecker();
}

document.forms.form.onsubmit = function(event) {
    event.preventDefault();
    submit.blur();
    
    if (validateData(y.value)) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'php/php.php');
        xhr.setRequestHeader('Content-Type',
        'application/x-www-form-urlencoded');
        let request = 'x=' + encodeURIComponent(stat.x);;
        request += '&' + 'y=' + encodeURIComponent(stat.y);
        request += '&' + 'r=' + encodeURIComponent(stat.r);
        request += '&' + 'offset=' + encodeURIComponent(new Date().getTimezoneOffset());

        xhr.send(request);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
            
                table.innerHTML += xhr.responseText;
                
                drawCanvas(ctx, stat.x, stat.y, stat.r);
                
                                
            }
        }
    }
}


document.addEventListener("DOMContentLoaded", function() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/onload.php');
    xhr.setRequestHeader('Content-Type',
    'application/x-www-form-urlencoded');
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            table.innerHTML = xhr.responseText;
            console.log(xhr.responseText);
        }
    }
})






















//canvas
function arrow(ctx, fromX, fromY, toX, toY) {
    
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);

    if (fromX == toX) {
        ctx.moveTo(toX - 1.5 * defaultMargin, toY + 1.5 * defaultMargin);
        ctx.lineTo(toX, toY);
        ctx.moveTo(toX + 1.5 * defaultMargin, toY + 1.5 * defaultMargin);
        ctx.lineTo(toX, toY);
    } else {
        ctx.moveTo(toX - 1.5 * defaultMargin, toY - 1.5 * defaultMargin);
        ctx.lineTo(toX, toY);
        ctx.moveTo(toX - 1.5 * defaultMargin, toY + 1.5 * defaultMargin);
        ctx.lineTo(toX, toY);
    } 
  }

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
const xCenter = canvasWidth/2;
const yCenter = canvasHeight/2;
const rTo = 50;
const halfRTO = 100;
const defaultMargin = 5;

function drawCanvas(ctx, x, y, r) {
    ctx.strokeStyle = '#2196f3';
    ctx.clearRect(0, 0, canvasHeight, canvasWidth);
    ctx.beginPath();
    arrow(ctx, xCenter, canvasHeight, xCenter, 0);
    arrow(ctx, 0, yCenter, canvasWidth, yCenter);
    ctx.stroke();
    ctx.closePath();

    ctx.font = '14px Arial';
    ctx.textAlign = 'right';
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'bottom';
    let radius;
    if (r == undefined) {
        radius = 'R';
        halfRadius = 'R/2';
    } else {
        radius = stat.r;
        halfRadius = radius/2;
    }
    ctx.fillText(`${halfRadius}`, xCenter - defaultMargin, halfRTO);
    ctx.fillText(`${radius}`, xCenter - defaultMargin, rTo);
    ctx.fillText(`-${radius}`, xCenter - defaultMargin, canvasHeight-rTo);
    ctx.fillText(`-${halfRadius}`, xCenter - defaultMargin, canvasHeight-halfRTO);
    ctx.fillText('y', xCenter - 2* defaultMargin, defaultMargin * 3);
    ctx.textBaseline = 'top';
    ctx.fillText(`-${halfRadius}`, halfRTO, yCenter + defaultMargin);
    ctx.fillText(`-${radius}`, rTo, yCenter + defaultMargin);
    ctx.fillText(`${radius}`, canvasWidth-rTo, yCenter + defaultMargin);
    ctx.fillText(`${halfRadius}`, canvasWidth-halfRTO, yCenter + defaultMargin);
    ctx.fillText('x', canvasWidth - 2 * defaultMargin, yCenter + defaultMargin)

    ctx.beginPath();
    
    ctx.moveTo(rTo, yCenter);
    ctx.lineTo(xCenter, halfRTO);
    ctx.moveTo(xCenter, canvasHeight-rTo);
    ctx.lineTo(canvasWidth-rTo, canvasHeight-rTo);
    ctx.moveTo(canvasWidth-rTo, canvasHeight-rTo);
    ctx.lineTo(canvasWidth-rTo, yCenter);
    ctx.moveTo(xCenter, rTo);
    for (i = 0; i <= halfRTO; i++) {
        let curX = i;
        let curY = -Math.sqrt(halfRTO * halfRTO - curX * curX);
        ctx.lineTo(xCenter + curX, yCenter + curY);
        ctx.moveTo(xCenter + curX, yCenter + curY);
    }
    ctx.stroke();
    ctx.closePath();
    if (x != undefined && y != undefined) {
        if (xCenter + x/r*halfRTO >= canvasWidth - defaultMargin ||
            xCenter + x/r*halfRTO <= defaultMargin ||
            yCenter - y/r*halfRTO >= canvasHeight - defaultMargin ||
            yCenter - y/r*halfRTO <= defaultMargin) {
                
                document.getElementById("canvas-label").style.color = 'red';
        } else {
            ctx.fillStyle = 'red';
            ctx.fillRect(xCenter + x/r*halfRTO, yCenter - y/r*halfRTO, 3, 3);
            if (yCenter - y/r*halfRTO > yCenter) {
                ctx.textBaseline = 'bottom';
            } else {
                ctx.textBaseline = 'top';
            }
            if (xCenter + x/r*halfRTO > xCenter) {
                ctx.textAlign = 'right';
            } else {
                ctx.textAlign = 'left';
            }
            ctx.fillText(`(x: ${x}; y: ${y})`, xCenter + x/r*halfRTO, yCenter - y/r*halfRTO);
            document.getElementById("canvas-label").style.color = '#272727';
        }
        
    }

    
}


drawCanvas(ctx, stat.x, stat.y, stat.r);



