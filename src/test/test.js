let e = {
    n1: {
        a: 1,
        b: 2
    },
    n2: {
        a: 3,
        b: 4
    },
    n3: {
        a: 5,
        b: 6
    }
};

function findWithAttr(array, attr, value) {
    for(let i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}
// eslint-disable-next-line no-console
console.log(findWithAttr(e,'b', 4))


function getNested(obj, ...args) {
    return args.reduce((obj, level) => obj && obj[level], obj)
}

// eslint-disable-next-line no-console
console.log(getNested(e,['n1.b']));

function size(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}



// eslint-disable-next-line no-console
console.log(size(e))
