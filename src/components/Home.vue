<template>
        <!--<table></table>-->
        <!--<p>test2345</p>-->
        <div class="Home">
                <players v-if="player[0].renderPlayers"> </players>
                <div v-if="player[0].renderMatch">
                        <match
                                v-for="(node, index) in player"
                                v-bind:index="index"
                                v-bind:key="node.id"
                                v-bind:style="{ backgroundImage: 'url(./img/' + node.avatar + ')' }">
                        </match>
                        <div class="player-name" v-for="(node, index) in player"
                             v-bind:index="index"
                             v-bind:key="node.name"
                             v-text="node.name"
                        ></div>

                        <div class="points">Score: &nbsp;&nbsp;{{player[0].points}}</div>

                        <div v-if="player[0].showPopup" class="popup">{{player[0].popupText}}
                                <img v-if="player[0].popupText.slice(0,3)!=='You'" alt="looser logo" width="40" src="../assets/img/fail.png">
                                <img v-else alt="success logo" width="40" src="../assets/img/success.png">
                        </div>


                        <shared-table v-if="player[0].cardCovered"> </shared-table>

                        <!-- SHARED TABLE CARDS -->
                        <div v-else class="table-container">
                                <card class="" v-for="(card, index) in player[0].table"
                                      v-bind:cardId="card.cardId"
                                      v-bind:index="index"
                                      v-bind:key="card.id"
                                      v-bind:style="{ backgroundImage: 'url(./img/' + card.image + ')' }">
                                > </card>
                        </div>

                        <!-- HAND SET CARDS -->

                        <div class="handSet">
                                <card v-for="(card, index) in player[0].cards"
                                        v-bind:cardId="card.cardId"
                                        v-bind:color="card.color"
                                        v-bind:count="card.count"
                                        v-bind:shape="card.shape"

                                        v-bind:index="index"
                                        v-bind:key="card.id"
                                        v-bind:style="{ backgroundImage: 'url(./img/' + card.image + ')' }"
                                        v-on:click.native="matchCard">
                                >
                                </card>
                        </div>

                        <button  v-on:click="showCards" class="leader-buttons show-cards">Show</button>
                </div>


                <!--<hand-set></hand-set>-->
                <button v-if="player[0].renderPlayers" v-on:click="startMatch" class="play-game">Play</button>
        </div>


</template>

<script>
        /* eslint-disable no-console */

        //import card from "@/components/card";
        import sharedTable from "@/components/sharedTable";
        import players from "@/components/players";
        import match from "@/components/match";
        import card from "@/components/card";
        //import SocketIO from 'socket.io-client';
        /*import Vue from 'vue'
        import VueSocketio from "vue-socket.io";*/

        export default {
        name: "Home",
        data: function() {
                return {
                        player: [
                                {
                                        viceLeaderAddress: '',
                                        id: '',
                                        ip: '',
                                        name: '',
                                        avatar: '',
                                        table: [],
                                        cards: [],
                                        deck: [],
                                        points: 0,
                                        popupText: '',
                                        renderPlayers: true,
                                        renderMatch: false,
                                        cardCovered: true,
                                        showPopup: false
                                }
                        ]
                }
        },
        props: {
                server: {
                        type: String
                }
        },
        sockets: {
                loadGame(playerData) {
                        // eslint-disable-next-line no-console
                        console.log('Loading player dashboard');
                        this.player = [playerData];
                        this.player[0].renderPlayers = false;
                        this.player[0].renderMatch = true;
                        console.log(this.player[0].viceLeaderAddress)
                },
                updateDeck(deck) {
                        this.player[0].deck = deck;
                        console.log('Deck received');
                },
                updateTable(table) {
                        // Update shared table cards
                        this.player[0].table = table;
                        // Reveal cards
                        this.player[0].cardCovered = false;

                        console.log('Revealing cards..')
                },
                newCards(cards) {
                        this.player[0].cards = cards;
                },
                showPopup(popupText){
                        this.player[0].showPopup = true;
                        if (popupText === this.player[0].name) {
                                this.player[0].popupText = 'You Win !!   '
                        } else {
                                this.player[0].popupText = popupText + ' Wins !!   ';
                        }
                },
                sessionRestored(player) {
                        this.player[0].viceLeaderAddress= player.viceLeaderAddress;
                        this.player[0].id=  player.id;
                        this.player[0].ip=  player.ip;
                        this.player[0].name=  player.name;
                        this.player[0].avatar=  player.avatar;
                        this.player[0].table=  player.table;
                        this.player[0].cards=  player.cards;
                        this.player[0].deck=  player.deck;
                        this.player[0].points = player.points;
                        this.player[0].popupText = player.popupText;
                        this.player[0].renderPlayers = player.renderPlayers;
                        this.player[0].renderMatch = player.renderMatch;
                        this.player[0].cardCovered=  player.cardCovered;
                        this.player[0].showPopup=  player.showPopup;
                        console.log('Session restored');
                        console.log(this.player[0]);
                },
                disconnect(){
                        console.log('Server lost - connecting to backup server: ',this.player[0].viceLeaderAddress);
                        let that = this;
                        setTimeout(function () {
                                window.location.replace(that.player[0].viceLeaderAddress)
                        }, 2000);

                        //let socket = SocketIO(this.$props.server, { origins: this.player[0].viceLeaderAddress })
                        //console.log(socket)
                        //window.location = this.player[0].viceLeaderAddress;
                }
        },
        components: {
                players,
                match,
                sharedTable,
                card
                // handSet
            // eslint-disable-next-line vue/no-unused-components
            //table
        },
        methods: {
                startMatch: function () {
                        this.$socket.emit('start-match');
                },
                showCards(){
                        if (this.player[0].deck.length === 0) {
                                console.log('Deck finished');
                                this.$socket.emit('match-finished');
                        } else {
                                //console.log(this.player[0].deck[this.player[0].deck.length - 1])
                                this.player[0].table = [this.player[0].deck[this.player[0].deck.length - 1]];

                                this.player[0].deck.pop();
                                // Reveal cards
                                this.player[0].cardCovered = false;
                                // Reset previous match flag
                                //this.cardHasBeenMatched = false;

                                console.log('Revealing cards..')
                        }
                },
                matchCard(e){
                        if (!this.player[0].cardCovered) {
                                // get selected card (from hand set) attribute
                                let color = e.currentTarget.getAttribute('color');
                                let count = e.currentTarget.getAttribute('count');
                                let shape = e.currentTarget.getAttribute('shape');
                                let cardId = e.currentTarget.getAttribute('cardId');
                                //console.log("hand: ", color,count,shape);
                                let card = this.player[0].table[0];
                                if (card.shape === shape || card.color === color || card.count === count) {
                                        this.player[0].points += 1;
                                        console.log('Card matched');
                                        this.player[0].cardCovered = true;
                                        //this.$socket.emit('update-player', this.player[0]);
                                        for (let index in this.player[0].cards) {
                                                //console.log(this.player[0].cards[index].cardId)
                                                if (this.player[0].cards[index].cardId === cardId){
                                                        this.player[0].cards[index] = card;
                                                        this.$socket.emit('player-update', this.player[0]);
                                                        console.log('Updating player info')
                                                }
                                        }

                                        //console.log("table: ", card.color, card.count, card.shape);
                                }
                        }

                }
        },
        watch: {
                player: function () {
                    this.$socket.emit('player-update', this.player[0]);
                    console.log('Updating player info')
                },
        },
        computed: {

        }
        }
</script>

<style scoped>
        .Home {
                box-sizing: border-box;
                text-align: center;
        }

        .play-game {
                box-shadow:inset 0 1px 0 0 #a6827e;
                background:linear-gradient(to bottom, #7d5d3b 5%, #634b30 100%);
                background-color:#7d5d3b;
                border-radius:8px;
                border:1px solid #54381e;
                display:inline-block;
                cursor:pointer;
                color:#ffffff;
                font-family:Georgia;
                font-size:16px;
                font-weight:bold;
                padding:6px 24px;
                text-decoration:none;
                text-shadow:0 1px 0 #4d3534;
                box-sizing: border-box;
                position: fixed;
                bottom: 20px;
                transform: translate(-50%, -50%);
                margin: 0 auto;
        }

        .player-name {
                position: fixed;
                top: 32px;
                left: 70px;
                color: white;
        }

        .points {
                position: fixed;
                top: 32px;
                right: 60px;
                color: white;
        }

        .leader-buttons {
                box-shadow:inset 0 1px 0 0 #a6827e;
                background:linear-gradient(to bottom, #7d5d3b 5%, #634b30 100%);
                background-color:#7d5d3b;
                border-radius:8px;
                border:1px solid #54381e;
                display:inline-block;
                cursor:pointer;
                color:#ffffff;
                font-family:Georgia;
                font-size:16px;
                font-weight:bold;

                padding:6px 24px;
                text-decoration:none;
                text-shadow:0 1px 0 #4d3534;
                box-sizing: border-box;
                margin: 0 10px;
        }

        .show-cards{
                position: fixed;
                left: 20px;
                bottom:20px;
        }

        .give-cards{
                position: fixed;
                right: 20px;
                bottom:20px;
        }

        .play-game:hover {
                background:linear-gradient(to bottom, #634b30 5%, #7d5d3b 100%);
                background-color:#634b30;
        }


        /* SHARED TABLE CARDS   */
        .table-container {
                margin-top: 20px;
        }

        /* HAND SET */
        .handSet {
                /*background-image: url('../assets/wood4.png');
                background-size: cover;
                border-radius: 6px;
                --woodwidth: 100px;
                width: 100px;*/
                width: 100%;
                box-sizing: border-box;
                position: fixed;
                left: 50%;
                bottom: 40px;
                transform: translate(-50%, -50%);
                margin: 0 auto;
        }
        .card-shape {
                margin: auto;
                display: inline-block;
        }
        @media (min-width: 425px) {
                .handSet {
                        max-width: 425px;
                }
        }


        /* POPUP */
        .popup {
                text-align: center;
                margin: auto;
                font-size: 20px;
                height: 60px;
                padding: 10px;
                border-radius: 6px;
                background-color: black;
                opacity: 60%;
                color: white;
                font-weight: bold;
        }

</style>