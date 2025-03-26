
/**
 * Get the value of an object at a path, or return default value if not found.
 * Replace Lodash get().
 * 
 * @param {*} obj Haystack
 * @param {*} path Needle Path
 * @param {*} def Default if not found.
 * @returns 
 */
export function getObjPath (obj, path, def) {
    if (typeof obj !== 'object') {
        return def;
    }
    else if (["string", "number"].indexOf(typeof path) == -1) {
        return def;
    }
    // Convert number paths to a string, so we have the functions on their prototype. 
    // Object numeric keys are really strings, but that doesn't matter if we need the prototype chain.
    if (typeof path == "number") {
        path = String(path);
    }

    // Split on dotnotation, reassemble with optional chaining ".?",
    // then essentially evaluate the path on the original object.
    const result = path.split(".")
        .reduce((r, k) => r?.[k], obj);

    return (result) ? result : def;
}

/**
 * Replace lodash union(). combine unique values of two arrays, preserving order from first.
 * 
 * @param {*} arr1 
 * @param {*} arr2 
 * @returns 
 */
export function unionArrays(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        if (Array.isArray(arr1)) {
            return arr1;
        }
        if (Array.isArray(arr2)) {
            return arr2;
        }
        return undefined;
    }
    return [...arr1, ...arr2.filter(item => !arr1.includes(item))];
  }

  export function uniqArray(arr) {
    if (!Array.isArray(arr)) {
        console.warn(' <!> <uniqArray> ', 'Expected array, but got ', typeof arr);
        return undefined;
    }
    return arr.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });
}

/**
 * Replace lodash first().
 * 
 * @param {*} arr 
 * @returns 
 */
export function firstArray(arr) {
    if (!Array.isArray(arr)) {
        console.warn(' <!> <firstArray> ', 'Expected array, but got ', typeof arr);
        return undefined;
    }
    else if (arr.length === 0) {
        return undefined;
    }

    return arr[0];
}

/**
 * Drop the first n elements from an array.
 * Replaces lodash drop().
 * @param {} arr 
 * @param {*} numElements 
 * @returns 
 */
export function dropArray(arr, numElements) {
    if (!Array.isArray(arr)) {
        console.warn(' <!> <dropArray> ', 'Expected array, but got ', typeof arr);
        return undefined;
    }
    else if (arr.length === 0) {
        return [];
    }

    return arr.slice(numElements);
};

