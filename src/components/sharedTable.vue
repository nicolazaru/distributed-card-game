<template>
    <div class="table-container">
        <card class="card-back" v-for="(card, index) in cards"
            v-bind:card="card"
            v-bind:index="index"
            v-bind:key="card.id"
        ></card>
    </div>
</template>

<script>
    import card from "@/components/card";
    export default {
        name: "sharedTable",
        components: {
            card
        },
        data: function () {
            return {
                cards: [
                    {
                        id: 2089,
                        shape: "triangle",
                        color: "yellow",
                        count: "2"
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .sharedTable {
        margin: auto;
        /*border: 1px solid orange;*/
        border-radius: 6px;
        background-color: transparent;
        width: fit-content;
        padding: 10px;
    }
    .table-container {
        margin-top: 20px;
    }
    .card-back {
        background-image: url("../assets/img/back.png");
        background-size: cover;
    }
    /*@media (min-width: 425px) {
        .sharedTable {
            max-width: 420px;
        }
    }*/
</style>