function xChecker() {
    return stat.x !== undefined;
}

function yChecker(yval) {
    let numeric = parseFloat(yval.replace(",", "."))

    if (numeric.length > 10) {
        error_text.innerHTML = 'Y должен быть не длиннее 10 символов';
        error_text.style.color = 'red';
        return false;
    }

    if (isNaN(numeric) || numeric === '') {
        error_text.innerHTML = 'Y должен быть числом';
        error_text.style.color = 'red';
        return false;
    } else if (numeric > MAX_Y || numeric < MIN_Y) {
        error_text.innerHTML = `Y должен быть в пределах (${MIN_Y} ... ${MAX_Y})`;
        error_text.style.color = 'red';
        return false;
    }

    error_text.style.color = '#272727';
    error_text.innerHTML = '';
    stat.y = numeric;
    return true;
}

function rChecker() {
    return stat.r !== undefined;
}

function validateData(yval) {
    return xChecker() && yChecker(yval) && rChecker();
}