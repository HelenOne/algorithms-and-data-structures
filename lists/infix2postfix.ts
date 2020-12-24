import {Stack} from "./Stack";

type Operators = {
    [key: string]: {
        position: 'pre' | 'in' | 'post';
        priority: number;
        pair?: string; // e.g. brackets
    };
};

const operators: Operators = {
    '!': {
        position: 'post',
        priority: 3
    },
    sin: {
        position: 'pre',
        priority: 3
    },
    cos: {
        position: 'pre',
        priority: 3
    },
    '^': {
        position: 'in',
        priority: 3
    },
    '(': {
        position: 'pre',
        pair: ')',
        priority: -1
    },
    ')': {
        position: 'post',
        pair: '(',
        priority: -1
    },
    '[': {
        position: 'pre',
        pair: ']',
        priority: -1
    },
    ']': {
        position: 'post',
        pair: '[',
        priority: -1
    },
    '+': {
        position: 'in',
        priority: 0
    },
    '-': {
        position: 'in',
        priority: 0
    },
    '*': {
        position: 'in',
        priority: 1
    },
    '/': {
        position: 'in',
        priority: 1
    }
};



export const infix2postfix = (infix: string): string => {

    const symbols: string[] = infix.split(' ');
    let result = new Stack<string>();
    const stack = new Stack<string>();
    for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i];
        if (operators[symbol] !== undefined) {
            const operator = operators[symbol];
            if (operator.position === 'post') {
                if (operator.pair === undefined) {
                    result.push(symbol);
                } else {
                    if (stack.isEmpty()) {
                        throw new Error(`Invalid pair operators "${symbol}" and "${operator.pair}" order`);
                    }
                    let stackTopItem = stack.pop();
                    while (operator.pair !== stackTopItem) {
                        result.push(stackTopItem);
                        if (stack.isEmpty()) {
                            throw new Error(`Invalid pair operators "${symbol}" and "${operator.pair}" order`);
                        }
                        stackTopItem = stack.pop();
                    }
                }
            }
            if (operator.position === 'pre') {
                stack.push(symbol);
            }
            if (operator.position === 'in') {
                if (!stack.isEmpty()) {
                    while (!stack.isEmpty()) {
                        const stackTopItem = stack.getLast();
                        const stackTopOperator = operators[stackTopItem];
                        if (
                            (stackTopOperator.position === 'pre' || stackTopOperator.priority >= operator.priority) &&
                            stackTopOperator.pair === undefined
                        ) {
                            result.push(stack.pop());
                        } else {
                            break;
                        }
                    }
                }
                stack.push(symbol);
            }
        } else {
            result.push(symbol);
        }
    }

    while (!stack.isEmpty()) {
        const symbol = stack.pop();
        const operator = operators[symbol];
        if (operator.pair !== undefined) {
            throw new Error(`Invalid pair operators "${operator}" and "${operator.pair}" order`);
        }
        result.push(symbol);
    }

    let resultString = '';

    while (!result.isEmpty()) {
        if (resultString !== '') {
            resultString = ' ' + resultString;
        }
        resultString = result.pop() + resultString;
    }
    return resultString;
}