import * as payload from './index';

const obj: { [key: string]: any } = {
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
/**
 * @description (This is a function to intercept the data and modify it if necessary,
 * for example you can take a date and convert it to another format, you can take a text and leave it all capital)
 * @param data
 */
const callback = (data: any) => {
    console.log('Data->', data);
    return data;
}
console.log(payload.treatObjectToSend(obj, callback));
