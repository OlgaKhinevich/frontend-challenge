<template>
   <div class="nav-wrapper">
        <div class="container">
            <nav class="nav">
              <ul>
                  <li :class="{ active: isActive == 'all' }" @click="isActive='all'">
                    <router-link to="/" >Все котики</router-link>
                  </li>
                  <li :class="{ active: isActive == 'favourite' }" @click="isActive='favourite'">
                    <router-link to="/favourite" >Любимые котики</router-link>
                  </li>
              </ul>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: "all"
    }
  }
}
</script>

<style lang="scss">
  .nav-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: $nav-bg;
    z-index: 10;
    .container {
      max-width: 1920px;
      padding: 0 62px;
      margin: auto;
      .nav ul {
        display: flex;
        color: $nav-text-clr;
        list-style-type: none;
        height: 64px; 
        li { 
          padding: 0 22px;
          height: 100%;
          line-height: 64px;
        }
        .active {
          color: $nav-text-active;
          background-color: $nav-bg-active;
        }
      }
    }
  }
</style>