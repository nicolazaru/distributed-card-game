<template>
    <div class="player">
        <div class="player-name"></div>
    </div>
</template>

<script>
    export default {
        name: "player"
    }
</script>

<style scoped>
    .player {
        width: 30px;
        height: 30px;
        border: 1px solid plum;
        border-radius: 50%;
        display: inline-block;
        margin: 10px;
        padding: 5px;
        /*background-image: url("../assets/img/avatar1.png");*/
        background-size: cover;
        color: white;
    }
    .player-name {
        margin-top: 40px;
        width: fit-content;
    }
    .card-back {
        background-image: url("../assets/img/avatar1.png");
        background-size: cover;
    }
    .card-shape {
        margin: auto;
        display: inline-block;
    }
</style>