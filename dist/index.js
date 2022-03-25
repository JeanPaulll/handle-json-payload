"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treatObjectToSend = void 0;
const treatObjectToSend = (obj, interceptAndHandleValuesCallback = (data) => {
    return data;
}) => {
    let finalObject = Object.assign({}, obj);
    let count = 1;
    const removePropertiesNull = (data = {}) => {
        const _data = {};
        Object.keys(data).forEach((r) => {
            if ((data[r] != null && Object.keys(data[r]).length) || (typeof data[r] === 'number' || typeof data[r] === 'boolean')) {
                _data[r] = data[r];
            }
        });
        return _data;
    };
    const removeEmptyArrays = (arr) => {
        const _arr = [];
        if (arr === null || !Array.isArray(arr)) {
            return;
        }
        arr.forEach((item, index) => {
            if (Array.isArray(item)) {
                _arr.push(removeEmptyArrays(item));
            }
            else {
                if (!Object.keys(arr[index]).length) {
                    return;
                }
                else {
                    const ps = removePropertiesNull((0, exports.treatObjectToSend)(arr[index]));
                    if (Object.keys(ps).length) {
                        _arr.push(ps);
                    }
                }
            }
        });
        return _arr;
    };
    const removeInvalidPropertie = (data = {}, key) => {
        if (data[key] === null) {
            delete data[key];
        }
        if ((data[key] != null && Object.keys(data[key]).length) ||
            typeof data[key] === 'number' ||
            typeof data[key] === 'boolean') {
            return;
        }
        delete data[key];
    };
    const treatObj = (_o) => {
        const o = Object.assign({}, _o);
        Object.keys(o).forEach((r) => {
            removeInvalidPropertie(o, r);
            if (Array.isArray(o[r])) {
                o[r] = o[r].map((i) => treatObj(i));
            }
            else if (typeof o[r] === 'object') {
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
};
exports.treatObjectToSend = treatObjectToSend;
