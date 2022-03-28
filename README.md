# handle-json-payload

Library to handle the object that will be sent to an API service

[![GitHub top language](https://img.shields.io/github/languages/top/JeanPaulll/handle-json-payload#readme.svg)]()
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/JeanPaulll/handle-json-payload.svg)]()
[![GitHub issues](https://img.shields.io/github/issues/JeanPaulll/handle-json-payload.svg)]()
[![GitHub closed issues](https://img.shields.io/github/issues-closed/JeanPaulll/handle-json-payload.svg)]()
[![GitHub contributors](https://img.shields.io/github/contributors/JeanPaulll/handle-json-payload.svg)]()
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/JeanPaulll/handle-json-payload)
[![npm](https://img.shields.io/npm/v/handle-json-payload.svg)]()
[![Website](https://img.shields.io/website-up-down-green-red/http/shields.io.svg?label=agenciacriamais)](http://www.agenciacriamais.com.br)

> `handle-json-payload` I'm making this library to solve a problem with payload objects, the purpose of this library is to intercept the final object, clean, fix, remove null properties, empty arrays, undefined. I hope to be able to contribute to the community!
Welcome to add more features. Thanks :)

## Characteristics

* Treat an object with empty, null, array, empty and etc properties

## How to use

![](https://raw.githubusercontent.com/JeanPaulll/handle-json-payload/main/doc/1.png)

### Installation

NPM:

````
npm i handle-json-payload --save
````


### 1 - Simple mode, using object handling

` How to use without intercepting the data`

`````sh
const payload = require('handle-json-payload');

const yourObject = {
    "teste1": null,
    "teste2": "Some text to represent string",
    "teste3": [],
    "teste4": [
        {
            "teste5": null
        },
        {
            "teste6": "Teste 6"
        },
        {
            "teste7": [],
            "teste8": "Teste 8",
            "teste9": [
                {
                    "teste10": null,
                    "teste11": []
                }
            ]
        }
    ],
    "teste12": {
        "teste13": null,
        "teste14": {},
        "teste15": false
    },
    "teste16": {},
    "teste17": false,
    "teste18": 18,
    "teste19": [
        {},
        {
            "teste20": []
        }
    ]
}

const cleanObject = payload.treatObjectToSend(yourObject);
console.log(cleanObject);


`````

### 2 - Now how to intercept and handle the traversed values

` If you want to intercept the values ​​and treat you can follow this second example`

`````sh
const payload = require('handle-json-payload');

const yourObject = {
    "teste1": null,
    "teste2": "Some text to represent string",
    "teste3": [],
    "teste4": [
        {
            "teste5": null
        },
        {
            "teste6": "Teste 6"
        },
        {
            "teste7": [],
            "teste8": "Teste 8",
            "teste9": [
                {
                    "teste10": null,
                    "teste11": []
                }
            ]
        }
    ],
    "teste12": {
        "teste13": null,
        "teste14": {},
        "teste15": false
    },
    "teste16": {},
    "teste17": false,
    "teste18": 18,
    "teste19": [
        {},
        {
            "teste20": []
        }
    ]
}
`````

This function (callback) will be called on all values

`````sh
const callback = (data) => {
    console.log('Data->', data);
    return data;
}

const cleanObject = payload.treatObjectToSend(yourObject, callback);
console.log(cleanObject);


`````

## FINAL RESULT


`````sh


  {
    teste2: "Some text to represent string",
    teste4: [
        {
            teste6: "Teste 6"
        },
        {
            teste8: "Teste 8"
        }
    ],
    teste12: {
        teste15: false
    },
    teste17: false,
    teste18: 18
  }


`````
## Solutions and Errors

1 - [For those with TypeScript getting error TS2304: can't find the name 'requires'](https://github.com/JeanPaulll/handle-json-payload/issues/1)

2 - [TypeScript getting error, cannot find name 'require' - TypeScript 1.x](https://github.com/JeanPaulll/handle-json-payload/issues/2)

## Help improve

Found a bug or a problem? [Open a new issue](https://github.com/JeanPaulll/handle-json-payload/issues)  GitHub.

## Contributing to this project

[GitHub](https://github.com/JeanPaulll/handle-json-payload)

## Autor

[@JeanPaul](https://twitter.com/jeanpaullx) – jeanpaulwebb@gmail.com.br

[![GitHub contributors](https://img.shields.io/github/contributors/JeanPaulll/handle-json-payload.svg)]()
