<template>
    <div class="popup">{{winnerName}}</div>
</template>

<script>
    export default {
        name: "popup",
        data: function () {
            return {
                winnerName: 'as'
            }
        },
        sockets: {
            updateWinnerName(name) {
                // eslint-disable-next-line no-console
                console.log(name);
                this.winnerName = name;
            }
        }
    }
</script>

<style scoped>
    .popup {
        text-align: center;
        margin: auto;
        font-size: 18px;
        height: 60px;
        border-radius: 6px;
        background-color: black;
        opacity: 60%;
        color: white;
        font-weight: bold;
    }
</style>