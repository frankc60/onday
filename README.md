# onday

![npm](https://img.shields.io/npm/v/onday)
![npm bundle size](https://img.shields.io/bundlephobia/min/onday)
![npm](https://img.shields.io/npm/dw/onday)

Returns a random one sentence about a historical event that happened on the given date ( day and month ).

## Install

```shell
$ npm install --save onday
```

## Usage

The Class Constructor accepts two numeric values: _day_ and _month_
For example:

```js
let findOnThisDate = new onday(25, 12); //Christmas Day
```

Calling the method _check()_ returns a Promise with the contents.

Each call to the _check()_ method will return different content for the given date.

You can also pass a date argument: (day,month) to the _check()_ method. For example: `findOnThisDate.check(1,1) //Change to 1st January`

## Methods

### check()

Use this method to retrieve information for a given date.

#### Syntax

```js
onday.check(15, 10); //15 October
```

#### Parameters

day value [numeric or string]

month value [number or string]

#### Returns

A Promise containing a sentence, about a historical event from the date parameters.

#### Example 1

Using then().catch()

```js
const onday = require("onday");

const day = 8;
const month = 10; //October

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

##### example Output

```shell
on 8/10 this happened: October 8th is the day in 1962 that Algeria joins the United Nations.
```

#### Example 2

Using an async / await function.

```js
const onday = require("onday");

const fn = async () => {
  let contents = await new onday(25, 12).check();
  console.log(`contents: ${contents}`);
};
fn();
fn(); //can be called multiple times!
```

##### Example Output

```shell
contents: December 25th is the day in 1974 that Cyclone Tracy devastates Darwin, Northern Territory Australia.
contents: December 25th is the day in 1826 that the Eggnog Riot at the United States Military Academy concludes after beginning the previous evening.
```
