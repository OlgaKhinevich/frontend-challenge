<template>
   <div class="nav-wrapper">
        <div class="container">
            <nav class="nav">
              <ul>
                  <li :class="{ active: isActive == 'all' }" @click="onItemClick('all', '/')" >
                    <span>Все котики</span>
                  </li>
                  <li :class="{ active: isActive == 'favourite' }" @click="onItemClick('favourite', '/favourite')">
                    <span>Любимые котики</span>
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
  },
  methods:{
    onItemClick(active_status, path){
      this.isActive = active_status;
      if(this.$route.path === path) return;
      this.$router.push(path);
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