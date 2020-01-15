function findDeadNode(sockeId, db) {
    for (let n in db) {
        if (db[n].socketId === sockeId) {
            return db[n];
        }
        if (Number(n) === db.length - 1) {
            return null;
        }
    }
}

let node = {
    socketId: 1,
    chain: {
        next: {
            address: '1234'
        },
        previous: {
            address: '5678'
        }
    }

};
let node2= {
    socketId: 2,
    chain: {
        next: {
            address: '1234'
        },
        previous: {
            address: '5678'
        }
    }

};

let db = [node, node2];

// eslint-disable-next-line no-console
console.log(findDeadNode(3, db))