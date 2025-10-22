#!/usr/bin/env python3
"""
簡単な計算器
四則演算（加算、減算、乗算、除算）をサポートします。
"""


def add(x, y):
    """加算"""
    return x + y


def subtract(x, y):
    """減算"""
    return x - y


def multiply(x, y):
    """乗算"""
    return x * y


def divide(x, y):
    """除算"""
    if y == 0:
        raise ValueError("0で割ることはできません")
    return x / y


def get_number(prompt):
    """ユーザーから数値を取得"""
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("エラー: 有効な数値を入力してください")


def main():
    """メイン関数"""
    print("=" * 40)
    print("簡単な計算器")
    print("=" * 40)

    while True:
        print("\n操作を選択してください:")
        print("1. 加算 (+)")
        print("2. 減算 (-)")
        print("3. 乗算 (*)")
        print("4. 除算 (/)")
        print("5. 終了")

        choice = input("\n選択 (1-5): ").strip()

        if choice == '5':
            print("計算器を終了します。")
            break

        if choice not in ['1', '2', '3', '4']:
            print("エラー: 無効な選択です。1-5の数字を入力してください。")
            continue

        # 数値を取得
        num1 = get_number("最初の数値を入力: ")
        num2 = get_number("2番目の数値を入力: ")

        try:
            if choice == '1':
                result = add(num1, num2)
                print(f"\n結果: {num1} + {num2} = {result}")
            elif choice == '2':
                result = subtract(num1, num2)
                print(f"\n結果: {num1} - {num2} = {result}")
            elif choice == '3':
                result = multiply(num1, num2)
                print(f"\n結果: {num1} * {num2} = {result}")
            elif choice == '4':
                result = divide(num1, num2)
                print(f"\n結果: {num1} / {num2} = {result}")
        except ValueError as e:
            print(f"\nエラー: {e}")


if __name__ == "__main__":
    main()
