# onday

![npm](https://img.shields.io/npm/v/onday)
![npm bundle size](https://img.shields.io/bundlephobia/min/onday)

Returns a random one-line information on a historical event that happened on the given date ( day and month ).

## Install

```shell
$ npm install --save onday
```

## Example Usage

```js
const onday = require("onday");

const day = 8;
const month = 10;

let randomDate = new onday(day, month);

randomDate1
  .check()
  .then((info) => {
    console.log(`on ${day}/${month} this happened: ${info}`);
  })
  .catch((error) => {
    console.error(`Error ${error}`);
  });
```

### Example Output

```shell
on 8/10 this happened: October 8th is the day in 1962 that Algeria joins the United Nations.
```
