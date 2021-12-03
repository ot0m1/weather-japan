# weather-japan
This is an application that displays a simple nationwide weather forecast for Japan.

![スクリーンショット 2021-12-03 21 25 10](https://user-images.githubusercontent.com/6190966/144602493-01456111-56c9-40fb-8b4d-a27a9aa6d74c.png)

# Getting Started

## Installation

The easiest way to install:

```bash
npm install -g weather-japan
```
If you don't want to do a global installation, Use [npx](https://www.npmjs.com/package/npx) or specify the path to `.node_modules/.bin/` in your installed directory.

## Usage

```bash
weather-japan
```

# Tips
Options is not yet implemented.If you want to check the weather for a specific region only, use the `grep` command.

```bash
-> % weather-japan | grep 東京
東京   │ 晴（−／−／−／０）          │ 晴（０／０／０／０）                  │ 晴時々曇（１０）
```

```bash
-> % weather-japan | head -2; weather-japan | grep 東京
       │１２／０３                    │１２／０４                            │１２／０５
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
東京   │ 晴（−／−／−／０）          │ 晴（０／０／０／０）                  │ 晴時々曇（１０）
```
