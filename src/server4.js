/* eslint-disable no-console */
const app = require('express')();
const server = require('http').createServer(app);
let port = 8040;
let ip = require('ip').address();
let nextIo = require('socket.io-client');
const websocket = require('socket.io');
let random_name = require('node-random-name');


// Variables for servers
let node = {
    address: 'http://' + ip + ':' + port.toString(),
    isLeader: false,
    isViceLeader: false,
    viceLeaderElected: false,
    viceLeaderSocket: {},
    db: {},
    table: {},
    cards: [
        // Stars
        {
            cardId: 'star1yellow',
            shape: "star",
            color: "yellow",
            count: "1",
            image: "star1yellow.png"
        },
        {
            cardId: 'star2yellow',
            shape: "star",
            color: "yellow",
            count: "2",
            image: "star2yellow.png"
        },
        {
            cardId: 'star3yellow',
            shape: "star",
            color: "yellow",
            count: "3",
            image: "star3yellow.png"
        },
        {
            cardId: 'star4yellow',
            shape: "star",
            color: "yellow",
            count: "4",
            image: "star4yellow.png"
        },
        {
            cardId: 'star5yellow',
            shape: "star",
            color: "yellow",
            count: "5",
            image: "star5yellow.png"
        },

        // Rhombus
        {
            cardId: 'romb1red',
            shape: "romb",
            color: "red",
            count: "1",
            image: "romb1red.png"
        },
        {
            cardId: 'romb2red',
            shape: "romb",
            color: "red",
            count: "2",
            image: "romb2red.png"
        },
        {
            cardId: 'romb3red',
            shape: "romb",
            color: "red",
            count: "3",
            image: "romb3red.png"
        },
        {
            cardId: 'romb4red',
            shape: "romb",
            color: "red",
            count: "4",
            image: "romb4red.png"
        },
        {
            cardId: 'romb5red',
            shape: "romb",
            color: "red",
            count: "5",
            image: "romb5red.png"
        },

        // Circles
        {
            cardId: 'circle1purple',
            shape: "circle",
            color: "purple",
            count: "1",
            image: "circle1purple.png"
        },
        {
            cardId: 'circle2purple',
            shape: "circle",
            color: "purple",
            count: "2",
            image: "circle2purple.png"
        },
        {
            cardId: 'circle3purple',
            shape: "circle",
            color: "purple",
            count: "3",
            image: "circle3purple.png"
        },
        {
            cardId: 'circle4purple',
            shape: "circle",
            color: "purple",
            count: "4",
            image: "circle4purple.png"
        },
        {
            cardId: 'circle5purple',
            shape: "circle",
            color: "purple",
            count: "5",
            image: "circle5purple.png"
        },

        // Lights
        {
            cardId: 'light1blue',
            shape: "light",
            color: "blue",
            count: "1",
            image: "light1blue.png"
        },
        {
            cardId: 'light2blue',
            shape: "light",
            color: "blue",
            count: "2",
            image: "light2blue.png"
        },
        {
            cardId: 'light3blue',
            shape: "light",
            color: "blue",
            count: "3",
            image: "light3blue.png"
        },
        {
            cardId: 'light4blue',
            shape: "light",
            color: "blue",
            count: "4",
            image: "light4blue.png"
        },
        {
            cardId: 'light5blue',
            shape: "light",
            color: "blue",
            count: "5",
            image: "light5blue.png"
        },
    ],
    avatar: [
        'avatar1.png',
        'avatar2.png',
        'avatar3.png',
        'avatar4.png',
        'avatar5.png',
        'avatar6.png'
    ],
    chain: {
        previous: {
            address: '',
            socket: ''
        },
        next: {
            address: '',
            socket: ''
        }
    }
};
let winner = {};
let leader = {
    address: '',
    isLeader: true,
    viceLeaderElected: false,
    db: {},
    table: {},
    cards: [
        // Stars
        {
            cardId: 'star1yellow',
            shape: "star",
            color: "yellow",
            count: "1",
            image: "star1yellow.png"
        },
        {
            cardId: 'star2yellow',
            shape: "star",
            color: "yellow",
            count: "2",
            image: "star2yellow.png"
        },
        {
            cardId: 'star3yellow',
            shape: "star",
            color: "yellow",
            count: "3",
            image: "star3yellow.png"
        },
        {
            cardId: 'star4yellow',
            shape: "star",
            color: "yellow",
            count: "4",
            image: "star4yellow.png"
        },
        {
            cardId: 'star5yellow',
            shape: "star",
            color: "yellow",
            count: "5",
            image: "star5yellow.png"
        },

        // Rhombus
        {
            cardId: 'romb1red',
            shape: "romb",
            color: "red",
            count: "1",
            image: "romb1red.png"
        },
        {
            cardId: 'romb2red',
            shape: "romb",
            color: "red",
            count: "2",
            image: "romb2red.png"
        },
        {
            cardId: 'romb3red',
            shape: "romb",
            color: "red",
            count: "3",
            image: "romb3red.png"
        },
        {
            cardId: 'romb4red',
            shape: "romb",
            color: "red",
            count: "4",
            image: "romb4red.png"
        },
        {
            cardId: 'romb5red',
            shape: "romb",
            color: "red",
            count: "5",
            image: "romb5red.png"
        },

        // Circles
        {
            cardId: 'circle1purple',
            shape: "circle",
            color: "purple",
            count: "1",
            image: "circle1purple.png"
        },
        {
            cardId: 'circle2purple',
            shape: "circle",
            color: "purple",
            count: "2",
            image: "circle2purple.png"
        },
        {
            cardId: 'circle3purple',
            shape: "circle",
            color: "purple",
            count: "3",
            image: "circle3purple.png"
        },
        {
            cardId: 'circle4purple',
            shape: "circle",
            color: "purple",
            count: "4",
            image: "circle4purple.png"
        },
        {
            cardId: 'circle5purple',
            shape: "circle",
            color: "purple",
            count: "5",
            image: "circle5purple.png"
        },

        // Lights
        {
            cardId: 'light1blue',
            shape: "light",
            color: "blue",
            count: "1",
            image: "light1blue.png"
        },
        {
            cardId: 'light2blue',
            shape: "light",
            color: "blue",
            count: "2",
            image: "light2blue.png"
        },
        {
            cardId: 'light3blue',
            shape: "light",
            color: "blue",
            count: "3",
            image: "light3blue.png"
        },
        {
            cardId: 'light4blue',
            shape: "light",
            color: "blue",
            count: "4",
            image: "light4blue.png"
        },
        {
            cardId: 'light5blue',
            shape: "light",
            color: "blue",
            count: "5",
            image: "light5blue.png"
        },
    ],
    avatar: [
        'avatar1.png',
        'avatar2.png',
        'avatar3.png',
        'avatar4.png',
        'avatar5.png',
        'avatar6.png'
    ],
    chain: {
        previous: {
            address: '',
            socket: ''
        },
        next: {
            address: '',
            socket: ''
        }
    }
};
let viceLeader = {
    address: '',
    isLeader: false,
    db: {},
    table: {},
    cards: [
        // Stars
        {
            cardId: 'star1yellow',
            shape: "star",
            color: "yellow",
            count: "1",
            image: "star1yellow.png"
        },
        {
            cardId: 'star2yellow',
            shape: "star",
            color: "yellow",
            count: "2",
            image: "star2yellow.png"
        },
        {
            cardId: 'star3yellow',
            shape: "star",
            color: "yellow",
            count: "3",
            image: "star3yellow.png"
        },
        {
            cardId: 'star4yellow',
            shape: "star",
            color: "yellow",
            count: "4",
            image: "star4yellow.png"
        },
        {
            cardId: 'star5yellow',
            shape: "star",
            color: "yellow",
            count: "5",
            image: "star5yellow.png"
        },

        // Rhombus
        {
            cardId: 'romb1red',
            shape: "romb",
            color: "red",
            count: "1",
            image: "romb1red.png"
        },
        {
            cardId: 'romb2red',
            shape: "romb",
            color: "red",
            count: "2",
            image: "romb2red.png"
        },
        {
            cardId: 'romb3red',
            shape: "romb",
            color: "red",
            count: "3",
            image: "romb3red.png"
        },
        {
            cardId: 'romb4red',
            shape: "romb",
            color: "red",
            count: "4",
            image: "romb4red.png"
        },
        {
            cardId: 'romb5red',
            shape: "romb",
            color: "red",
            count: "5",
            image: "romb5red.png"
        },

        // Circles
        {
            cardId: 'circle1purple',
            shape: "circle",
            color: "purple",
            count: "1",
            image: "circle1purple.png"
        },
        {
            cardId: 'circle2purple',
            shape: "circle",
            color: "purple",
            count: "2",
            image: "circle2purple.png"
        },
        {
            cardId: 'circle3purple',
            shape: "circle",
            color: "purple",
            count: "3",
            image: "circle3purple.png"
        },
        {
            cardId: 'circle4purple',
            shape: "circle",
            color: "purple",
            count: "4",
            image: "circle4purple.png"
        },
        {
            cardId: 'circle5purple',
            shape: "circle",
            color: "purple",
            count: "5",
            image: "circle5purple.png"
        },

        // Lights
        {
            cardId: 'light1blue',
            shape: "light",
            color: "blue",
            count: "1",
            image: "light1blue.png"
        },
        {
            cardId: 'light2blue',
            shape: "light",
            color: "blue",
            count: "2",
            image: "light2blue.png"
        },
        {
            cardId: 'light3blue',
            shape: "light",
            color: "blue",
            count: "3",
            image: "light3blue.png"
        },
        {
            cardId: 'light4blue',
            shape: "light",
            color: "blue",
            count: "4",
            image: "light4blue.png"
        },
        {
            cardId: 'light5blue',
            shape: "light",
            color: "blue",
            count: "5",
            image: "light5blue.png"
        },
    ],
    avatar: [
        'avatar1.png',
        'avatar2.png',
        'avatar3.png',
        'avatar4.png',
        'avatar5.png',
        'avatar6.png'
    ],
    chain: {
        previous: {
            address: '',
            socketId: ''
        },
        next: {
            address: '',
            socketId: ''
        }
    }
};

// Variables for clients
let cards = [
    // Stars
    {
        cardId: 'star1yellow',
        shape: "star",
        color: "yellow",
        count: "1",
        image: "star1yellow.png"
    },
    {
        cardId: 'star2yellow',
        shape: "star",
        color: "yellow",
        count: "2",
        image: "star2yellow.png"
    },
    {
        cardId: 'star3yellow',
        shape: "star",
        color: "yellow",
        count: "3",
        image: "star3yellow.png"
    },
    {
        cardId: 'star4yellow',
        shape: "star",
        color: "yellow",
        count: "4",
        image: "star4yellow.png"
    },
    {
        cardId: 'star5yellow',
        shape: "star",
        color: "yellow",
        count: "5",
        image: "star5yellow.png"
    },

    // Rhombus
    {
        cardId: 'romb1red',
        shape: "romb",
        color: "red",
        count: "1",
        image: "romb1red.png"
    },
    {
        cardId: 'romb2red',
        shape: "romb",
        color: "red",
        count: "2",
        image: "romb2red.png"
    },
    {
        cardId: 'romb3red',
        shape: "romb",
        color: "red",
        count: "3",
        image: "romb3red.png"
    },
    {
        cardId: 'romb4red',
        shape: "romb",
        color: "red",
        count: "4",
        image: "romb4red.png"
    },
    {
        cardId: 'romb5red',
        shape: "romb",
        color: "red",
        count: "5",
        image: "romb5red.png"
    },

    // Circles
    {
        cardId: 'circle1purple',
        shape: "circle",
        color: "purple",
        count: "1",
        image: "circle1purple.png"
    },
    {
        cardId: 'circle2purple',
        shape: "circle",
        color: "purple",
        count: "2",
        image: "circle2purple.png"
    },
    {
        cardId: 'circle3purple',
        shape: "circle",
        color: "purple",
        count: "3",
        image: "circle3purple.png"
    },
    {
        cardId: 'circle4purple',
        shape: "circle",
        color: "purple",
        count: "4",
        image: "circle4purple.png"
    },
    {
        cardId: 'circle5purple',
        shape: "circle",
        color: "purple",
        count: "5",
        image: "circle5purple.png"
    },

    // Lights
    {
        cardId: 'light1blue',
        shape: "light",
        color: "blue",
        count: "1",
        image: "light1blue.png"
    },
    {
        cardId: 'light2blue',
        shape: "light",
        color: "blue",
        count: "2",
        image: "light2blue.png"
    },
    {
        cardId: 'light3blue',
        shape: "light",
        color: "blue",
        count: "3",
        image: "light3blue.png"
    },
    {
        cardId: 'light4blue',
        shape: "light",
        color: "blue",
        count: "4",
        image: "light4blue.png"
    },
    {
        cardId: 'light5blue',
        shape: "light",
        color: "blue",
        count: "5",
        image: "light5blue.png"
    },
];

let nextServer = nextIo('http://192.168.0.193:8020');

// Next node
nextServer.emit('handshake', node, function(error, address){
    //console.log("error: ", error);
    console.log("connected to next node: ", address);
});

nextServer.on('error', (err)=>{
    console.log('ns: ', err)
});
/*nextServer.emit('handshake', node.address, function(error, message){
    console.log("error: ", error);
    console.log("connected to next node: ", message);
});*/

/*nextServer.on('ack', (address)=> {
    node.chain.next.address = address;
    node.chain.next.socket = nextServer;
    //node.chain.next.socketId = nextServer.id;
    console.log('Connected to next node: ', node.chain.next.address);
});*/


// This node
server.listen(port, "0.0.0.0");

const io = websocket.listen(server);

io.on('connection',(socket)=>{

    socket.on('error', (err)=>{
        console.log(err)
    });
    socket.on('handshake', function(n, callback){
        if (n.isLeader) {
            leader = n;
            console.log('Leader is: ', leader.address);
        }
        // Update previous node information
        node.chain.previous.address = n.address;
        node.chain.previous.socket = socket;
        console.log('Connected to previous node: ', node.chain.previous.address);
        // Send own information to previous node
        //socket.emit('ack', node.address);

        // If we are the leader and the ring topology is complete --> run vice leader elections
        if (!node.viceLeaderElected && node.isLeader && node.chain.next.socket !== '') {
            console.log('Starting vice Leader elections');
            // Start elections (score: -1 to avoid leader being elected as vice leader)
            node.chain.next.socket.emit('elections', {
                address: node.address,
                score: -1
            })
        }

        // Send own information to previous node
        callback('error', node.address);
    });

    // Topology
    /*socket.on('handshake', (n)=>{
        // Update leader information
        if (n.isLeader) {
            leader = n;
            console.log('Leader is: ', leader.address);
        }
        // Update previous node information
        node.chain.previous.address = n.address;
        node.chain.previous.socket = socket;
        console.log('Connected to previous node: ', node.chain.previous.address);
        // Send own information to previous node
        socket.emit('ack', node.address);

        // If we are the leader and the ring topology is complete --> run vice leader elections
        if (!node.viceLeaderElected && node.isLeader && node.chain.next.socket !== '') {
            console.log('Starting vice Leader elections');
            // Start elections (score: -1 to avoid leader being elected as vice leader)
            node.chain.next.socket.emit('elections', {
                address: node.address,
                score: -1
            })
        }
    });*/

    socket.on('elections', (candidate)=>{
        if (node.isLeader) {
            viceLeader.address = candidate.address;
            node.viceLeaderElected = true;
            node.viceLeaderSocket = nextIo(candidate.address);
            node.viceLeaderSocket.emit('vice-leader');
            console.log('Vice leader elected: ', candidate.address);
        } else {
            console.log('Voting..');
            nextServer.emit('elections', vote(candidate))
        }
    });

    socket.on('vice-leader', ()=>{
        console.log('I\'ve been elected vice Leader!');
        node.isViceLeader = true;
    });


    // Match
    socket.on('join-node',()=>{

        if (node.isViceLeader) {
            node.isViceLeader = false;
            node.isLeader = true;
            node.db[socket.id] = {
                viceLeaderAddress: viceLeader.address,
                id: socket.id,
                name: random_name({ first: true}),
                avatar: node.avatar[Math.floor(Math.random() * 5)],
                table: [],
                cards: [],
                deck: [],
                points: 0,
                renderPlayers: false,
                renderMatch: false,
                cardCovered: true,
                showPopup: false,
                popupText: ''
            };
        } else {
            // Add new client to database
            node.db[socket.id] = {
                viceLeaderAddress: viceLeader.address,
                id: socket.id,
                name: random_name({ first: true}),
                avatar: node.avatar[Math.floor(Math.random() * 5)],
                table: [],
                cards: [],
                deck: [],
                points: 0,
                renderPlayers: false,
                renderMatch: false,
                cardCovered: true,
                showPopup: false,
                popupText: ''
            };
            console.log(`client connected: ${socket.id}`);
        }

        io.sockets.emit('newPlayer', node.db);

    });

    socket.on('start-match',()=>{
        winner = {};
        for(let key in node.db) {
            if(node.db.hasOwnProperty(key)){
                // Log whos player is starting the match
                console.log(`${node.db[key].name} joined the match`);
                // Load match screen for players who click on play
                io.to(node.db[key].id).emit('loadGame', node.db[key]);
                // Give each one ot=f them a deck
                io.to(node.db[key].id).emit('updateDeck', pickNewCards(10,cards));
                // Give them cards
                io.to(node.db[key].id).emit('newCards', pickNewCards(3,cards));
            }
        }
    });

    socket.on('show-cards',()=>{
        // Broadcast new cards on table
        socket.emit('updateTable', pickNewCards(1,cards));

    });

    socket.on('match-finished', ()=>{
        if (isEmpty(winner)) {
            winner = node.db[socket.id];
        }
        io.sockets.emit('showPopup', winner.name);
    });

    socket.on('player-update', (player)=>{
        // Update player information
        node.db[player.id] = player;

        // Forward information to vice Leader
        if (node.isLeader) {
            try {
                node.viceLeaderSocket.emit('player-update', player);
            } catch (e) {
                console.log("Failed to forward information to vice leader. Err: ", e)
            }
        }

        if (node.isViceLeader) {
            console.log('Updating information of player: ', player.name);
        }

    });

    socket.on('remove-player', (player)=>{
        removePlayer(player);
    });

    socket.on('disconnect',()=>{

        if (node.db.hasOwnProperty(socket.id)){

            removePlayer(node.db[socket.id]);

            io.sockets.emit('newPlayer', node.db);
        }
        console.log(`client gone: ${socket.id}`)
    });
});





function isEmpty(obj) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function vote(candidate) {
    let myScore = Math.floor(Math.random() * 1000000);
    if (myScore >= candidate.score) {
        return {
            address: node.address,
            score: myScore
        }
    } else {
        return candidate;
    }
}

function removePlayer(player) {
    if (node.isLeader) {
        try {
            delete node.db[player.id];
            node.viceLeaderSocket.emit('remove-player', player);
        } catch (e) {
            console.log("Failed to forward information to vice leader. Err: ", e)
        }
    }

    if (node.isViceLeader) {
        delete node.db[player.id];
        console.log('Removing information of player: ', player.name);
    }
}

function pickNewCards(n,cardArray) {
    // n = number of cards to pick
    // cardArray = cards array
    let tableCards = cardArray.slice(0);
    let handSet = [];
    //let removedCards = [];
    for (let i = 0; i<n; i++) {
        let cardIndex = Math.floor(Math.random() * (tableCards.length - 1));
        handSet.push(tableCards[cardIndex]);
        tableCards.splice(cardIndex, 1);
        //removedCards.push(tableCards.splice(cardIndex, 1));
        if (i === (n-1)) {
            //console.log(removedCards);
            return handSet;
        }
    }
}