# onday

![npm](https://img.shields.io/npm/v/onday)
![npm bundle size](https://img.shields.io/bundlephobia/min/onday)

Returns a random one sentence about a historical event that happened on the given date ( day and month ).

## Install

```shell
$ npm install --save onday
```

## Usage

The Class Constructor accepts two numeric values: _day_ and _month_
for example:

```js
let findOnThisDate = new onday(25, 12); //Christmas Day
```

Calling the method check() returns a Promise with the contents.
for example (using an async / await function):

```js
const fn = async () => {
  let contents = await new onday(day, month).check();
  console.log(`contents: ${contents}`);
};
fn();
```

## Example Usage

Using then().catch() on the returned Promise:

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
