#!/usr/bin/env node

// 計算器のロジックをテスト
let currentValue = '0';
let previousValue = null;
let operation = null;

function resetCalculator() {
    currentValue = '0';
    previousValue = null;
    operation = null;
}

function appendNumber(num) {
    if (currentValue === '0' || currentValue === 'Error') {
        currentValue = num;
    } else {
        currentValue += num;
    }
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
        return null;
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
                previousValue = null;
                operation = null;
                return 'Error';
            }
            result = prev / current;
            break;
        default:
            return null;
    }

    result = Math.round(result * 100000000) / 100000000;
    currentValue = result.toString();
    previousValue = null;
    operation = null;
    return result;
}

// テストフレームワーク
let passed = 0;
let failed = 0;

function test(description, fn) {
    resetCalculator();
    try {
        fn();
        console.log(`✓ ${description}`);
        passed++;
    } catch (error) {
        console.log(`✗ ${description}: ${error.message}`);
        failed++;
    }
}

function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(message || `Expected ${expected}, but got ${actual}`);
    }
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}

// テストケース実行
console.log('='.repeat(60));
console.log('計算器ロジック テスト');
console.log('='.repeat(60));
console.log('');

test('加算: 5 + 3 = 8', () => {
    appendNumber('5');
    setOperation('+');
    appendNumber('3');
    const result = calculate();
    assertEqual(result, 8);
});

test('減算: 10 - 4 = 6', () => {
    appendNumber('10');
    setOperation('-');
    appendNumber('4');
    const result = calculate();
    assertEqual(result, 6);
});

test('乗算: 6 × 7 = 42', () => {
    appendNumber('6');
    setOperation('×');
    appendNumber('7');
    const result = calculate();
    assertEqual(result, 42);
});

test('除算: 20 ÷ 4 = 5', () => {
    appendNumber('20');
    setOperation('÷');
    appendNumber('4');
    const result = calculate();
    assertEqual(result, 5);
});

test('除算: 15 ÷ 2 = 7.5', () => {
    appendNumber('15');
    setOperation('÷');
    appendNumber('2');
    const result = calculate();
    assertEqual(result, 7.5);
});

test('0による除算エラー', () => {
    appendNumber('10');
    setOperation('÷');
    appendNumber('0');
    const result = calculate();
    assertEqual(result, 'Error');
});

test('小数点の加算: 0.1 + 0.2 ≈ 0.3', () => {
    appendNumber('0');
    appendNumber('.');
    appendNumber('1');
    setOperation('+');
    appendNumber('0');
    appendNumber('.');
    appendNumber('2');
    const result = calculate();
    assert(Math.abs(result - 0.3) < 0.0001, `Expected approximately 0.3, but got ${result}`);
});

test('負の数: 5 - 10 = -5', () => {
    appendNumber('5');
    setOperation('-');
    appendNumber('10');
    const result = calculate();
    assertEqual(result, -5);
});

test('大きな数の乗算: 999 × 999 = 998001', () => {
    appendNumber('999');
    setOperation('×');
    appendNumber('999');
    const result = calculate();
    assertEqual(result, 998001);
});

test('連続計算: 10 + 5 + 3 = 18', () => {
    appendNumber('10');
    setOperation('+');
    appendNumber('5');
    setOperation('+');
    appendNumber('3');
    const result = calculate();
    assertEqual(result, 18);
});

test('複数桁の数値入力: 123 + 456 = 579', () => {
    appendNumber('1');
    appendNumber('2');
    appendNumber('3');
    setOperation('+');
    appendNumber('4');
    appendNumber('5');
    appendNumber('6');
    const result = calculate();
    assertEqual(result, 579);
});

test('ゼロとの加算: 0 + 42 = 42', () => {
    appendNumber('0');
    setOperation('+');
    appendNumber('42');
    const result = calculate();
    assertEqual(result, 42);
});

test('ゼロとの乗算: 100 × 0 = 0', () => {
    appendNumber('100');
    setOperation('×');
    appendNumber('0');
    const result = calculate();
    assertEqual(result, 0);
});

test('小数点の除算: 5 ÷ 2 = 2.5', () => {
    appendNumber('5');
    setOperation('÷');
    appendNumber('2');
    const result = calculate();
    assertEqual(result, 2.5);
});

test('複雑な連続計算: 100 - 50 × 2 (最終結果 100)', () => {
    appendNumber('100');
    setOperation('-');
    appendNumber('50');
    setOperation('×');
    // これは (100-50)×2 = 100 として計算される
    appendNumber('2');
    const result = calculate();
    assertEqual(result, 100);
});

console.log('');
console.log('='.repeat(60));
console.log(`テスト結果: ${passed} 成功 / ${failed} 失敗 / ${passed + failed} 合計`);
console.log('='.repeat(60));

if (failed > 0) {
    process.exit(1);
} else {
    console.log('\nすべてのテストが成功しました！✓');
    process.exit(0);
}
