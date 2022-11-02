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
const tool = document.querySelector('.tool');
const main_table = document.querySelector('.main-table');
const graph_block = document.querySelector('.graph-block');



const stat = {
    x: undefined,
    y: undefined,
    r: undefined
};

const SELECTED_COLOR = '#1a73a8';
const BLUR_COLOR = 'rgb(29, 29, 29)';
const HOVER_COLOR = '#2196f3';
const TEXT_COLOR = 'white';


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
        document.getElementById("canvas-label").innerHTML = '';
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


function windowChecker(exp) {
    function setBackground() {
        tool.style.backgroundColor = '#3989c9';
    }
    if (exp >= MAX_Y) {
        tool.innerHTML = `Значение должно быть меньше, чем ${MAX_Y}`;
        setBackground();
        return;
    }
    if (exp <= MIN_Y) {
        tool.innerHTML = `Значение должно быть больше, чем ${MIN_Y}`;
        setBackground();
        return;
    }
    if (isNaN(exp.replace(",", "."))) {
        tool.innerHTML = 'Значение должно являться числом';
        setBackground();
        return;
    }
    tool.style.backgroundColor = 'transparent';
    tool.innerHTML = '';
}
y.onfocus = function() {
    selectText(y_text);
    let exp = this.value;
    windowChecker(exp);
}

y.oninput = function() {
    let exp = this.value;
    windowChecker(exp);
}

y.onblur = function() {
    blurText(y_text);
    tool.style.backgroundColor = 'transparent';
    tool.innerHTML = '';
}




//main prog

const MAX_Y = 5;
const MIN_Y = -3;

clear_button.addEventListener("click", (event) => {
    event.preventDefault();

    requestData({clear: true})

    stat.x = undefined;
    stat.y = undefined;
    stat.r = undefined;
    table.innerHTML = ""
    x_buttons.forEach(button => {blurButton(button, x_text, stat.x)});
    r_buttons.forEach(button => {blurButton(button, r_text, stat.r)});
    y.value = '';
    document.getElementById('canvas-label').innerHTML = '';
    drawCanvas();
})


document.forms.form.onsubmit = function(event) {
    event.preventDefault();
    submit.blur();

    if (validateData(y.value)) {
        dot(stat.x * halfRTO / stat.r + xCenter, -(stat.y * halfRTO / stat.r - yCenter))
        requestData({
            byClick: false,
            x: stat.x,
            y: stat.y,
            r: stat.r,
            canvas: canvas.toDataURL()
        })
    } else {
        if (!(xChecker() && rChecker())) {
            error_text.innerHTML = 'Заполните форму';
            error_text.style.color = 'red';
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    requestDots();
})




