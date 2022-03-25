/**
 * @author Jean Paul <jeanpaulwebb@gmail.com>
 * @description Library to handle the object that will be sent to an API service
 * @date 26/04/2022
 * @param obj <any>
 * @param interceptAndHandleValuesCallback - (This is a function to intercept the data and modify it if necessary,
 * for example you can take a date and convert it to another format, you can take a text and leave it all capital);
 *
 * If use, Always remember to return the data.
 *
 * #### Example ###
 *
 * import * as payload from './index';
 * const callback = (data: any) => {
 *     console.log('Data->', data);
 *     return data;
 * }
 * console.log(payload.treatObjectToSend(obj, callback));
 *
 */
export const treatObjectToSend = (obj: { [key: string]: any }, interceptAndHandleValuesCallback: Function = (data: { [key: string]: any }) => {
    return data
}): { [key: string]: any } | undefined => {
    let finalObject = Object.assign({}, obj);
    let count = 1;
    const removePropertiesNull = (data: { [key: string]: any } = {}): { [key: string]: any } => {
        const _data: any = {};
        Object.keys(data).forEach((r) => {
            if ((data[r] != null && Object.keys(data[r]).length) || (typeof data[r] === 'number' || typeof data[r] === 'boolean')) {
                _data[r] = data[r];
            }
        });
        return _data;
    };
    const removeEmptyArrays = (arr: any[]): any[] | undefined => {
        const _arr: any = [];
        if (arr === null || !Array.isArray(arr)) {
            return;
        }
        arr.forEach((item, index: number) => {
            if (Array.isArray(item)) {
                _arr.push(removeEmptyArrays(item));
            } else {
                if (!Object.keys(arr[index]).length) {
                    return;
                } else {
                    const ps = removePropertiesNull(treatObjectToSend(arr[index]));
                    if (Object.keys(ps).length) {
                        _arr.push(ps);
                    }
                }
            }
        });
        return _arr;
    };
    const removeInvalidPropertie = (data: { [key: string]: any } = {}, key: string): { [key: string]: any; } | undefined => {
        if (data[key] === null) {
            delete data[key];
        }
        if (
            (data[key] != null && Object.keys(data[key]).length) ||
            typeof data[key] === 'number' ||
            typeof data[key] === 'boolean'
        ) {
            return;
        }
        delete data[key];
    };
    const treatObj = (_o: { [key: string]: any }): { [key: string]: any } => {
        const o = Object.assign({}, _o);
        Object.keys(o).forEach((r) => {
            removeInvalidPropertie(o, r);
            if (Array.isArray(o[r])) {
                o[r] = o[r].map((i: { [key: string]: any }) => treatObj(i));
            } else if (typeof o[r] === 'object') {
                o[r] = treatObj(o[r]);
            }
            if (typeof o[r] === 'string' && o[r]) {
                o[r] = interceptAndHandleValuesCallback(o[r]);
            }
        });
        return o;
    };
    if (Object.keys(finalObject).length) {
        finalObject = removePropertiesNull(finalObject);
        Object.keys(finalObject).forEach((r) => {
            if (Array.isArray(finalObject[r]) && finalObject[r].length && typeof finalObject[r] === 'object') {
                if (Array.isArray(finalObject[r]) && finalObject[r].length) {
                    if (Object.keys(finalObject[r]).length > 0) {
                        finalObject[r] = removeEmptyArrays(finalObject[r]);
                    }
                }
            }
            count++;
        });
        if (typeof finalObject === 'object' && Object.keys(finalObject).length > 0) {
            for (let i = 0; i <= count; i++) {
                finalObject = treatObj(finalObject);
            }
        }
        return finalObject;
    }
}
