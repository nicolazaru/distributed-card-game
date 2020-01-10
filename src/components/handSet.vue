<template>
    <div class="handSet">
        <card class="card" v-for="(card, index) in cards"
              v-bind:card="card"
              v-bind:index="index"
              v-bind:key="card.id"
        >
            <img class="card-shape" alt="star" width="12" src="../assets/img/star.png">
        </card>
    </div>
</template>

<script>
    import card from "@/components/card";
    export default {
        name: "handSet",
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
                    },
                    {
                        id: 1665,
                        shape: "circle",
                        color: "red",
                        count: "5"
                    },
                    {
                        id: 1342,
                        shape: "star",
                        color: "blue",
                        count: "3"
                    },
                    {
                        id: 3577,
                        shape: "square",
                        color: "yellow",
                        count: "4"
                    }
                ]
            }
        }
    }
</script>

<style scoped>
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
        bottom: 20px;
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
</style>