const screen = document.querySelector('.screen');
let current = '';
let previous = '';
let operator = null;

// Atualiza a tela
function updateScreen(value) {
    screen.textContent = value || '0';
}

// Limpa tudo
function clearAll() {
    current = '';
    previous = '';
    operator = null;
    updateScreen('0');
}

// Apaga último número (backspace)
function backspace() {
    current = current.slice(0, -1);
    updateScreen(current || '0');
}

// Troca o sinal
function invertSignal() {
    if (!current) return;
    current = (parseFloat(current) * -1).toString();
    updateScreen(current);
}

// Calcula porcentagem
function percent() {
    if (!current) return;
    current = (parseFloat(current) / 100).toString();
    updateScreen(current);
}

// Quando clicar número
function handleNumber(num) {
    if (num === ',' || num === '.') {
        if (current.includes('.')) return;
        num = '.';
    }
    current += num;
    updateScreen(current);
}

// Quando clicar operador + - x ÷
function handleOperator(op) {
    if (current === '') return;

    if (previous !== '') {
        calculate();
    }

    operator = op;
    previous = current;
    current = '';
}

// Realiza o cálculo
function calculate() {
    if (!operator || current === '' || previous === '') return;

    const a = parseFloat(previous);
    const b = parseFloat(current);
    let result = 0;

    switch (operator) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case 'x': result = a * b; break;
        case '÷':
            if (b === 0) {
                updateScreen('Erro');
                current = '';
                previous = '';
                operator = null;
                return;
            }
            result = a / b;
            break;
    }

    current = result.toString();
    previous = '';
    operator = null;
    updateScreen(current);
}

// EVENTOS DOS BOTÕES
document.querySelectorAll('.calc-button').forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.textContent;

        if (!isNaN(value)) {
            handleNumber(value);
            return;
        }

        switch (value) {
            case 'C': clearAll(); break;
            case '←': backspace(); break;
            case '±': invertSignal(); break;
            case '%': percent(); break;
            case ',': handleNumber(','); break;
            case '+':
            case '-':
            case 'x':
            case '÷':
                handleOperator(value);
                break;
            case '=': calculate(); break;
        }
    });
});
