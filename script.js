let currentValue = '0';
let previousValue = null;
let operation = null;
let history = [];

const display = document.getElementById('display');
const historyList = document.getElementById('history-list');

function updateDisplay() {
    display.value = currentValue;
}

function appendNumber(num) {
    if (currentValue === '0' || currentValue === 'Error') {
        currentValue = num;
    } else {
        currentValue += num;
    }
    updateDisplay();
}

function setOperation(op) {
    if (previousValue !== null && operation !== null) {
        calculate();
    }
    previousValue = currentValue;
    operation = op;
    currentValue = '0';
}

function calculate() {
    if (previousValue === null || operation === null) {
        return;
    }

    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    let result;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                currentValue = 'Error';
                updateDisplay();
                addToHistory(`${previousValue} ${operation} ${currentValue} = エラー（0で除算）`);
                previousValue = null;
                operation = null;
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    // 小数点以下の桁数を制限
    result = Math.round(result * 100000000) / 100000000;

    addToHistory(`${previousValue} ${operation} ${currentValue} = ${result}`);

    currentValue = result.toString();
    previousValue = null;
    operation = null;
    updateDisplay();
}

function clearDisplay() {
    currentValue = '0';
    previousValue = null;
    operation = null;
    updateDisplay();
}

function deleteLast() {
    if (currentValue === 'Error') {
        currentValue = '0';
    } else if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    updateDisplay();
}

function addToHistory(calculation) {
    history.unshift(calculation);

    // 履歴を最大10件に制限
    if (history.length > 10) {
        history.pop();
    }

    updateHistory();
}

function updateHistory() {
    historyList.innerHTML = '';

    if (history.length === 0) {
        historyList.innerHTML = '<div style="color: #999; padding: 10px; text-align: center;">履歴がありません</div>';
        return;
    }

    history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.textContent = item;
        historyList.appendChild(historyItem);
    });
}

// キーボード入力のサポート
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') {
        appendNumber(e.key);
    } else if (e.key === '+' || e.key === '-') {
        setOperation(e.key);
    } else if (e.key === '*') {
        setOperation('×');
    } else if (e.key === '/') {
        e.preventDefault();
        setOperation('÷');
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        clearDisplay();
    } else if (e.key === 'Backspace') {
        deleteLast();
    }
});

// 初期化
updateHistory();
