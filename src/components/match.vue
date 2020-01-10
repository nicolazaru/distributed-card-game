<template>
    <div class="player">

    </div>
</template>

<script>
    export default {
        name: "match"
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
        position: absolute;
        top: 10px;
        left: 10px;
        /*background-image: url("../assets/img/avatar1.png");*/
        background-size: cover;
        color: white;
    }
</style>