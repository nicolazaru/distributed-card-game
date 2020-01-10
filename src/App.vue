<template>
  <div id="app">
    <img alt="Blink logo" width="50" src="./assets/img/blink.png">
    <Home></Home>
  </div>
</template>



<script>
//import HelloWorld from './components/HelloWorld.vue'
import Home from "@/components/Home";
//import sharedTable from "@/components/sharedTable";

export default {
  name: 'app',
  components: {
    //sharedTable
    Home
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  box-sizing: border-box;
  background-color: #00622F;
  box-shadow:inset 0 0 90px 30px #08311E;
  color: #2c3e50;
  padding: 15px;
}
</style>
