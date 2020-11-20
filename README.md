# onday

![npm](https://img.shields.io/npm/v/onday)
![npm bundle size](https://img.shields.io/bundlephobia/min/onday)

Returns one line of information on a historical event that happened on the given date ( day and month)

## Install

```js
$ npm install onday
```

## Usage

```js
const onday = require("onday");

const day = 8;
const month = 10;

let randomDate = new onday(day, month);

randomDate
  .check()
  .then((info) => {
    console.log(`on ${day}/${month} this happened: ${info}`);
  })
  .catch((error) => {
    console.error(`Error ${error}`);
  });
```
