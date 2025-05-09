let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);    
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;
        case '=':
            if(previousOperator === null) return;
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseFloat(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer;
    } else if(previousOperator === '-'){
        runningTotal -= intBuffer;
    } else if(previousOperator === '×'){
        runningTotal *= intBuffer;
    } else if(previousOperator === '÷'){
        if (intBuffer !== 0) {
            runningTotal /= intBuffer;
        } else {
            runningTotal = 'Error';
        }
    }
}

function handleNumber(numberString){
    if(buffer === "0"){
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init(){
    const buttons = document.querySelectorAll('.calc-button');
    buttons.forEach(function(button){
        button.addEventListener('click', function(event){
            buttonClick(event.target.innerText);
        });
    });
}

init();

document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (!isNaN(key)) {
        // Si c'est un chiffre
        buttonClick(key);
    } else if (key === 'Backspace') {
        buttonClick('←');
    } else if (key === 'Enter' || key === '=') {
        buttonClick('=');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        // Traduire les opérateurs
        let symbol = key;
        if (key === '*') symbol = '×';
        if (key === '/') symbol = '÷';
        buttonClick(symbol);
    } else if (key.toLowerCase() === 'c') {
        buttonClick('C');
    }
});
