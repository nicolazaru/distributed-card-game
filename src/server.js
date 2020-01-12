/* eslint-disable no-console */
const app = require('express')();
const server = require('http').createServer(app);
let port = 8070;
let ip = require('ip').address();
//let nextServer = nextIo('http://192.168.0.94:8070');
let generalServer = require('socket.io-client');
//let nextServer = require('socket.io-client')('http://192.168.0.94:8070');
let leaderServer = require('socket.io-client')('http://192.168.0.94:8070');
const websocket = require('socket.io');
let random_name = require('node-random-name');


// Variables for servers
let node = {
    address: 'http://' + ip + ':' + port.toString(),
    ip: '',
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
    serversDB: [],
    lastServer: '',
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

    socket.on('join-network', function(n, callback){
        // n = client trying to join network
        // Update previous node information
        if (leader.serversDB.length === 0) {
            // Send own information to previous node
            callback(null, {
                previous: node.address,
                next: node.address,
                leader: node.address
            });
            node.chain.next.address = n.address;
            node.chain.previous.address = n.address;
            node.chain.next.socket = generalServer(n.address);
            node.chain.previous.socket = generalServer(n.address);
        } else {
            callback(null, {
                previous: node.address,
                next: leader.lastServer,
                leader: node.address
            });
            node.chain.next.socket = generalServer(n.address);
            node.chain.next.address = n.address;
        }
        leader.serversDB.push(n);
        leader.lastServer = n.address;
        console.log('Updated next node: ', node.chain.next.address);
        // Send own information to previous node
        //socket.emit('ack', node.address);
    });

    socket.on('node-dropped', (info)=>{
        if (node.chain.previous.address === info.droppedNodeAddress) {
            node.chain.previous.address = info.previousNodeAddress;
            node.chain.previous.socket = generalServer(node.chain.previous.address);
            node.chain.next.socket.emit('topology-fix', {
                newNextNodeAddress: node.address,
                destinationTopologyFix: info.previousNodeAddress
            })
        } else {
            node.chain.previous.socket.emit('node-dropped', info);
        }
    });

    socket.on('topology-fix',(info)=>{
        if (node.address === info.destinationTopologyFix) {
            node.chain.next.address = info.newNextNodeAddress;
            node.chain.next.socket = generalServer(node.chain.next.address);
            console.log('new next node: ', node.chain.next.address);
        } else {
            node.chain.next.socket.emit('topology-fix', info)
        }

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
            node.viceLeaderSocket = generalServer(candidate.address);
            node.viceLeaderSocket.emit('vice-leader');
            console.log('Vice leader elected: ', candidate.address);
        } else {
            console.log('Voting..');
            node.chain.next.socket.emit('elections', vote(candidate))
        }
    });

    socket.on('vice-leader', ()=>{
        console.log('I\'ve been elected vice Leader!');
        node.isViceLeader = true;
    });

    socket.on('toLeader', (nodeInfo)=>{
       if (node.isLeader) {
           // If we are the leader and the ring topology is complete --> run vice leader elections
           console.log('Starting vice Leader elections');
           // Start elections (score: -1 to avoid leader being elected as vice leader)
           node.chain.next.socket.emit('elections', {
               address: node.address,
               score: -1
           })
       } else {
           // Forward welcome message to the leader through ring
           node.chain.next.socket.emit('toLeader', nodeInfo);

           node.chain.next.socket.on('disconnect', ()=>{
               node.chain.previous.socket.emit('node-dropped', {
                   droppedNodeAddress: node.chain.next.address,
                   previousNodeAddress: node.address
               });
           })
       }
    });

    socket.on('newPreviousNode', (address)=>{
        node.chain.previous.socket = socket;
        node.chain.previous.address = address;
        console.log('New previous node: ', address)
    });


    // Match
    socket.on('join-node',()=>{

        let clientIp = socket.handshake.headers['x-forwarded-for'] || socket.conn.remoteAddress;

        if (size(node.db) === 0) {
            node.db[socket.id] = {
                viceLeaderAddress: viceLeader.address.slice(0,-4) + '8080',
                id: socket.id,
                ip:clientIp,
                name: random_name({ first: true}),
                avatar: node.avatar[Math.floor(Math.random() * 5)],
                table: [],
                cards: [],
                deck: [],
                points: 0,
                sessionActive: false,
                renderPlayers: false,
                renderMatch: false,
                cardCovered: true,
                showPopup: false,
                popupText: ''
            };
            io.sockets.emit('newPlayer', node.db);
            console.log(`client connected: ${socket.id}, ip: ${clientIp}`);
        } else {
            let index = 0;
            for (let key in node.db) {
                if (node.db[key].ip === clientIp) {
                    socket.emit('sessionRestored', node.db[key]);
                    console.log('Restoring session of client: ', node.db[key].name);
                    break;
                }
                //console.log(index, size(node.db))
                index += 1;
                if (index === size(node.db)) {
                    index = 0;
                    // Add new client to database
                    node.db[socket.id] = {
                        viceLeaderAddress: viceLeader.address.slice(0,-4) + '8080',
                        id: socket.id,
                        ip:clientIp,
                        name: random_name({ first: true}),
                        avatar: node.avatar[Math.floor(Math.random() * 5)],
                        table: [],
                        cards: [],
                        deck: [],
                        points: 0,
                        sessionActive: false,
                        renderPlayers: false,
                        renderMatch: false,
                        cardCovered: true,
                        showPopup: false,
                        popupText: ''
                    };
                    io.sockets.emit('newPlayer', node.db);
                    console.log(`client connected: ${socket.id}, ip: ${clientIp}`);
                }

            }
        }


        if (node.isViceLeader) {
            console.log('Old leader died, I\'m the new leader');
            node.isViceLeader = false;
            node.isLeader = true;
            // If we are the leader and the previous leader died --> run vice leader elections
            console.log('Starting vice Leader elections');
            // Start elections (score: -1 to avoid leader being elected as vice leader)
            node.chain.next.socket.emit('elections', {
                address: node.address,
                score: -1
            })
        }
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

            console.log(`client gone: ${socket.id}, ip: ${node.db[socket.id].ip}, name: ${node.db[socket.id].name}`);

            removePlayer(node.db[socket.id]);

            io.sockets.emit('newPlayer', node.db);

        }
    });
});



// Next node
if (!node.isLeader) {
    leaderServer.emit('join-network', node, function(error, nodeInfo){
        // Response from leader
        //console.log("error: ", error);
        node.chain.next.address = nodeInfo.next;
        node.chain.previous.address = nodeInfo.previous;
        node.chain.next.socket = generalServer(nodeInfo.next);
        node.chain.previous.socket = generalServer(nodeInfo.previous);
        leader.address = nodeInfo.leader;
        console.log("Joined network: ", nodeInfo);

        // Send welcome message to the next node
        node.chain.next.socket.emit('newPreviousNode', node.address);

        // Send welcome message to the leader through ring
        node.chain.next.socket.emit('toLeader', node.address);
    });
}


// Next node
/*nextServer.emit('handshake', node, function(error, address){
    //console.log("error: ", error);
    console.log("connected to next node: ", address);
});*/





function isEmpty(obj) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function size(obj) {
    let size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
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
            console.log('Removing information of player: ', player.name);
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