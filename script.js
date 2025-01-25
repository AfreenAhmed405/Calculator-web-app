console.log('Welcome to Calculator!');

const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');
const keys = document.querySelector('.keypad');

keys.addEventListener('click', e => {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))

    if (!action) {

        if (displayedNum === '0' || previousKeyType === 'operator') {
            display.textContent = keyContent;
        } else {
            display.textContent = displayedNum + keyContent;
        }
        calculator.dataset.previousKeyType = 'number';
        
    } else {
        if (action === 'decimal') {
            const hasPoint = displayedNum.includes('.');
            if (!hasPoint) {
                display.textContent = displayedNum + '.';
            } 
            
            if (calculator.dataset.previousKeyType === 'operator') {
                display.textContent = '0.';
                calculator.dataset.previousKeyType = 'number';  
            }
        }

        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            key.classList.toggle('is-depressed');
            calculator.dataset.previousKeyType = 'operator';

            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
        }

        if (action === 'equals') {
            const firstValue = calculator.dataset.firstValue;
            const action = calculator.dataset.operator;
            const secondValue = displayedNum;

            display.textContent = calculate(firstValue, action, secondValue);
        }

        if (action === 'clear') {
            calculator.dataset.firstValue = '0';
            calculator.dataset.operator = 'add';
            calculator.dataset.secondValue = '0';

            display.textContent = '0';
        }
    }
});

function calculate(num1, action, num2) {
    let result = '';
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (action === 'add') {
        result = n1 + n2;
    } else if (action === 'subtract') {
        result = n1 - n2;
    } else if (action === 'multiply') {
        result = n1 * n2;
    } else if (action === 'divide') {
        result = n1 / n2;
    }
    return result
}
