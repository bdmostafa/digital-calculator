class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clearAll();
    }

    clearAll() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNum(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }

    compute() {
        let computeResult;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(previous) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computeResult = previous + current;
                break;
            case '-':
                computeResult = previous - current;
                break;
            case '*':
                computeResult = previous * current;
                break;
            case '/':
                computeResult = previous / current;
                break;
            default:
                return;
        }
        this.currentOperand = computeResult;
        this.operation = undefined;
        this.previousOperand = '';
    }


    displayUpdate() {
        this.currentOperandElement.innerText = this.currentOperand;
        this.previousOperandElement.innerText = this.previousOperand;
        if (this.operation != null) {
            this.previousOperandElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else this.previousOperandElement.innerText = '';


    }
}


const previousOperandElement = document.querySelector('[data-previous-operand]');
const currentOperandElement = document.querySelector('[data-current-operand]');
const clearAllBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const numBtn = document.querySelectorAll('[data-number]');
const operationsBtn = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');

const calculator = new Calculator(previousOperandElement, currentOperandElement);


numBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.displayUpdate();
    })
})

operationsBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.displayUpdate();
        console.log(button.innerText)
    })
})

equalsBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.displayUpdate();
})

clearAllBtn.addEventListener('click', () => {
    calculator.clearAll();
    calculator.displayUpdate();
})

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.displayUpdate();
})