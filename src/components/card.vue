<template>
    <div class="card">
    </div>
</template>

<script>
    export default {
        name: "card"
    }
</script>

<style scoped>
    .card {
        width: 31px;
        height: 44px;
        border: 1px solid plum;
        border-radius: 6px;
        display: inline-block;
        margin: 10px;
        padding: 5px;
        background-color: white;
        background-size: cover;
    }
    .card-back {
        background-image: url("../assets/img/back.png");
        background-size: cover;
    }
    .card-shape {
        margin: auto;
        display: inline-block;
    }
</style>