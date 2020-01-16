/* eslint-disable no-console */
const app = require('express')();
const server = require('http').createServer(app);
let ip = require('ip').address();
let leaderIp = '10.20.5.120';
let port = 8070;
const websocket = require('socket.io');
let generalServer = require('socket.io-client');
let leaderServer = generalServer('http://' + leaderIp + ':' + port.toString());
let random_name = require('node-random-name');


// Variables for servers
let node = {
    address: 'http://' + ip + ':' + port.toString(),
    ip: '',
    socketId: '',
    isLeader: ip === leaderIp,
    isViceLeader: false,
    viceLeaderElected: false,
    minimumServerNumber: 4,
    viceLeaderAddress: '',
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
    serversDB: [{...node}],
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


        n.socketId = socket.id;

        let nodeInfo = {
            socketId: socket.id,
            previous: node.address,
            next: node.address,
            leader: node.address
        };

        // Insert chain info
        n.chain.next.address = node.address;

        if (!databaseEmpty(leader.serversDB)) {
            nodeInfo.next = node.chain.next.address;
            n.chain.next.address = node.chain.next.address
        }


        n.chain.previous.address = node.address;
        // Update this node (leader) info
        node.chain.next.address = n.address;
        //node.chain.previous.address = n.address;


        callback(null, nodeInfo);

        // Update previous previous node info
        for (let i in leader.serversDB) {
            if (leader.serversDB[i].address === n.chain.next.address) {
                leader.serversDB[i].chain.previous.address = n.address;
            }
        }

        leader.serversDB.push(n);

        console.log('Updated next node: ', node.chain.next.address);

        // Run elections
        if (!node.viceLeaderElected && leader.serversDB.length >= node.minimumServerNumber) {
            console.log('Starting vice leader elections');

            // Start elections (score: -1 to avoid leader being elected as vice leader)
            generalServer(node.chain.next.address).emit('elections', {
                address: node.address,
                score: -1
            })
        }
    });

    socket.on('update-node', (nodeInfo)=>{
        if (node === nodeInfo) {
            console.log('I\'m up to date');
        } else {
            if (node.chain.next.address !== nodeInfo.chain.next.address) {
                console.log('new next node: ', nodeInfo.chain.next.address);
            }
            if (node.chain.previous.address !== nodeInfo.chain.previous.address) {
                console.log('new previous node: ', nodeInfo.chain.previous.address);
            }
            node = nodeInfo;
        }

        //console.log('chain: ', node.chain);
    });

    socket.on('topology-fix',(info, callback)=>{
        if (info.newPreviousNode) {
            node.chain.previous.address = info.newPreviousNode;
            //node.chain.previous.socket = generalServer(info.newPreviousNode);
            console.log('Updated previous node: ', node.chain.previous.address)
        }
        if (info.newNextNode) {
            node.chain.next.address = info.newNextNode;
            //node.chain.next.socket = generalServer(info.newNextNode);
            console.log('Updated next node: ', node.chain.next.address)
        }

        // Send ack message to the leader
        callback(null, {
            nextNode: node.chain.next.address,
            previousNode: node.chain.previous.address
        })


        // Send welcome message to the leader through ring
        /*node.chain.next.socket.emit('toLeader', [node]);*/
    });

    // Topology

    socket.on('elections', (candidate)=>{
        if (node.isLeader) {
            viceLeader.address = candidate.address;
            node.viceLeaderElected = true;

            console.log('Vice leader elected: ', candidate.address);
            // Synchronize vice leader
            generalServer(viceLeader.address).emit('vice-leader', leader.serversDB);

        } else {
            console.log('Voting..');
            generalServer(node.chain.next.address).emit('elections', vote(candidate))
        }
    });

    socket.on('new-leader', (address)=>{
        leaderServer = generalServer(address);
        leader.address = address;
        console.log('new leader recognized: ', address);
        console.log('waiting for network updates..');
        /*//console.log(node)
        leaderServer.emit('join-network', node, function(error, nodeInfo){
            // Response from leader
            //console.log("error: ", error);
            node.chain.next.address = nodeInfo.next;
            node.socketId = nodeInfo.socketId;
            node.chain.previous.address = nodeInfo.previous;
            //node.chain.next.socket = generalServer(nodeInfo.next);
            //node.chain.previous.socket = generalServer(nodeInfo.previous);
            leader.address = nodeInfo.leader;

            console.log("new previous node: ", nodeInfo.previous);
            console.log("new next node: ", nodeInfo.next);

            // Send welcome message to the next node
            // eslint-disable-next-line no-unused-vars
            generalServer(node.chain.next.address).emit('newPreviousNode', node.address, function (err, msg) {
                if (err) {
                    console.log(err);
                } else {
                    //console.log(msg)
                }
            });
        });*/
    });

    socket.on('vice-leader', (db)=>{
        console.log('I\'ve been elected vice Leader!');
        leader.serversDB = db;
        console.log('Server database backed up');
        leaderServer = generalServer(leaderIp);
        leaderServer.on('disconnect', ()=>{
            console.log('Leader died, I\'m the new leader');
            node.isViceLeader = false;
            node.isLeader = true;

            // Update myself in database
            for (let s in leader.serversDB) {
                //console.log(`Scanning database:\nAddress: ${s}: ${leader.serversDB[s].address}`);
                if (leader.serversDB[s].address === node.address) {
                    leader.serversDB[s] = node;
                }
            }

            // Find dead leader node
            let dN = findDeadNodeByAddress(leader.address, leader.serversDB);

            if (dN) {

                // Update db and remove dead node
                let updatedDatabase = updateDB(leader.serversDB, dN);

                // Notify the change to the other node involved
                /*for (let s in updatedDatabase) {
                    console.log(updatedDatabase[s].address, updatedDatabase[s].chain);
                }*/
                updateNodes(updatedDatabase);

                // Notify change of leader
                console.log('Broadcasting new leader information..');
                broadcastNewLeader(leader.serversDB, node.address);

                // Run elections
                console.log('Starting vice leader elections');

                setTimeout(function () {
                    // Start elections (score: -1 to avoid leader being elected as vice leader)
                    generalServer(node.chain.next.address).emit('elections', {
                        address: node.address,
                        score: -1
                    })
                }, 500);
            } else {
                console.log('Cannot find old leader in DB')
            }
        });
        node.isViceLeader = true;
    });

    // Just vice leader receives on this topic
    socket.on('vice-leader-db-update', (db)=>{
        leader.serversDB = db;
        console.log('Server database backed up')
    });

    socket.on('newPreviousNode', (address, callback)=>{
        node.chain.previous.address = address;

        //leaderServer.emit('update-server', node);

        console.log('New previous node: ', address);
        //console.log('Sending my updated information to the leader via ring');

        callback(null, 'next node updated with my info')
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


        /*if (node.isViceLeader) {
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
        }*/
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
                generalServer(viceLeader.address).emit('player-update', player);
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
        // Find dead node in db
        let dN = findDeadNode(socket.id, leader.serversDB);

        if (dN) {
            //console.log('Node died: ', dN.address, 'Informing neighbouring nodes');

            // Update db and remove dead node
            let updatedDatabase = updateDB(leader.serversDB, dN);

            // Notify the change to the other node involved
            updateNodes(updatedDatabase);

            if (dN.address === viceLeader.address) {
                // Run elections
                console.log('Vice leader died. Starting new vice leader elections');
                // Start elections (score: -1 to avoid leader being elected as vice leader)
                generalServer(node.chain.next.address).emit('elections', {
                    address: node.address,
                    score: -1
                })
            } else {
                // Synchronize vice leader
                synchViceLeader(updatedDatabase, viceLeader.address);
            }
        }

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
        node.socketId = nodeInfo.socketId;
        node.chain.previous.address = nodeInfo.previous;
        //node.chain.next.socket = generalServer(nodeInfo.next);
        //node.chain.previous.socket = generalServer(nodeInfo.previous);
        leader.address = nodeInfo.leader;

        console.log("previous node: ", nodeInfo.previous);
        console.log("next node: ", nodeInfo.next);

        // Send welcome message to the next node
        // eslint-disable-next-line no-unused-vars
        generalServer(node.chain.next.address).emit('newPreviousNode', node.address, function (err, msg) {
            if (err) {
                console.log(err);
            } else {
                //console.log(msg)
            }
        });
    });
}


// Next node
/*nextServer.emit('handshake', node, function(error, address){
    //console.log("error: ", error);
    console.log("connected to next node: ", address);
});*/

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

function findDeadNodeByAddress(address, db) {
    for (let n in db) {
        if (db[n].address === address) {
            return db[n];
        }
        if (Number(n) === db.length - 1) {
            return null;
        }
    }
}

function updateChain(n, chain) {
    if (chain.next.address) {
        n.chain.next.address = chain.next.address;
    }
    if (chain.previous.address) {
        n.chain.previous.address = chain.previous.address;
    }
    return n;
}

function updateDB(db, deadNode) {
    // Neighbours of dead node
    let previousNodeAddress = deadNode.chain.previous.address;
    let nextNodeAddress = deadNode.chain.next.address;

    // remove dead node
    for (let d in db) {
        if (db[d].address === deadNode.address) {
            // Remove dead node from db
            db.splice(d, 1)
        }
    }

    // Update neighbouring nodes
    for (let node in db) {
        if (db[node].address === previousNodeAddress) {
            // Update node before dead one
            db[node] = updateChain(db[node], {
                next:{
                    address: nextNodeAddress,
                },
                previous: {
                    address: null
                }
            })
            //console.log(db[node].address, "updating previous node to: ", nextNodeAddress)
        }
        if (db[node].address === nextNodeAddress) {
            // Update node after dead one
            db[node] = updateChain(db[node], {
                next:{
                    address: null,
                },
                previous: {
                    address: previousNodeAddress
                }
            });
            //console.log(db[node].address, "updating next node to: ", previousNodeAddress)
        }
    }
    return db;
}

function updateNodes(db) {
    for (let node in db) {
        //console.log(`emitting node update to ${db[node].address}`);
        generalServer(db[node].address).emit('update-node', db[node]);
    }
}

function broadcastNewLeader(db, address) {
    for (let node in db) {
        if (!db[node].isLeader) {
            // If node is not leader
            generalServer(db[node].address).emit('new-leader', address);
        }
    }
}

function synchViceLeader(db, address) {
    try {
        generalServer(address).emit('vice-leader-db-update', db);
    } catch (e) {
        console.log('Failed to synchronize vice leader db. ERR:', e)
    }
}

function isEmpty(obj) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function databaseEmpty(db) {
    // If just leader is in DB
    return db.length === 1 && db[0].isLeader;
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
            generalServer(viceLeader.address).emit('remove-player', player);
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