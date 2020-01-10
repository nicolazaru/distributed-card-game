<template>
    <div class="playerContainer">
        <div class="players">Players</div>
        <player class="" v-for="(player, index) in players"
            v-bind:index="index"
            v-bind:key="player.id"
            v-bind:style="{ backgroundImage: 'url(./img/' + player.avatar + ')' }"
        >
        </player>
    </div>
</template>
<!--v-bind:style="{ backgroundImage: 'url(../assets/img/' + player.avatar + ')' }"-->
<script>
    /* eslint-disable no-console */

    import player from "@/components/player";
    // Join match and get players information from server

    export default {
        name: "players",
        components: {
            player
        },
        data: function () {
            return {
                players: [],
                node: {}
            }
        },
        sockets: {
            newPlayer(playerList) {
                let that = this;
                //console.log(playerList)
                this.players = [];
                Object.keys(playerList).forEach(function(key) {
                    // key: the name of the object key
                    // index: the ordinal position of the key within the object
                    that.players.push(playerList[key])
                    //console.log(that.players)
                });
            },
        },
        methods: {
        },
        mounted: function () {
            this.$nextTick(function () {
                // Will be executed when the DOM is ready
                this.$socket.emit('join-node');
            })
        }
    }
</script>

<style scoped>
    .playerSet {
        /*background-image: url('../assets/wood4.png');
        background-size: cover;
        border-radius: 6px;
        --woodwidth: 100px;
        width: 100px;*/
        box-sizing: border-box;
        position: fixed;
        left: 50%;
        bottom: 20px;
        transform: translate(-50%, -50%);
        margin: 0 auto;
    }

    .players {
        color: gold;
        text-shadow: greenyellow;
        font-family: Georgia, Serif;
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 20px;
    }
    /*.player-name{
        display: inline-block;
        margin: 0;
    }*/

    .playerContainer {
        margin: auto;
        /*border: 1px solid orange;*/
        border-radius: 6px;
        background-color: transparent;
        width: fit-content;
        padding: 10px;
    }
    .card-shape {
        margin: auto;
        display: inline-block;
    }
    @media (min-width: 425px) {
        .playerSet {
            max-width: 425px;
        }
    }
</style>