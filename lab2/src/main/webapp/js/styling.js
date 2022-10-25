function hoverButton(button, text) {
    button.style.backgroundColor = HOVER_COLOR;
    selectText(text);

}

function focusButton(buttons, button) {
    for (i = 0; i < buttons.length; i++) {
        if (buttons[i] !== button) {
            buttons[i].style.backgroundColor = BLUR_COLOR;
        }
        button.style.backgroundColor = SELECTED_COLOR;
    }
    return button.value;
}

function blurButton(button, text, val) {
    if (val !== button.value) {
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