<template>
  <div id="app">
    <nav-bar />
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'HomeView',
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html { font-size: 14px; }
  body {
    font-family: 'Roboto', sans-serif;;
    background-color: $body-bg;
    padding-top: 23px;
    a { 
      text-decoration: none;
      color: unset; 
    }
    img { max-width: 100%; }
  }
</style>
