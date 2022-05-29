<template>
  <div class="container">
    <div class="favourite-grid" @scroll="handleScroll">
      <figure v-for="cat in favourite" :key="cat.id">
          <img class="favourite-img" :src="cat.url" />
          <img class="heart-img" :src="imagesSrc" @click="cat.isFavourite=!cat.isFavourite" />
      </figure>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      favourite: [],
      page: 1,
      isLoading: false,
      shouldLoad: true
    }
  },
  computed: {
    imagesSrc() {
      return require('@/assets/img/heart.svg');
    }
  },
  // mounted() {
  //   this.getFavouriteCats();
  // },
  methods: {
    handleScroll(e) {
      const container = e.target;
      const scrolled = container.scrollTop + container.clientHeight;
      console.log("scrolled", scrolled);
      const container_height = container.scrollHeight;
      console.log("container_height", container_height);
      const difference = container_height - scrolled;
      console.log("difference", difference);
      if(difference < 1) this.fetchCats();
    },
    async fetchCats() {
      if (this.isLoading || !this.shouldLoad) return;
      this.isLoading = true;
      this.page++;
      this.isLoading = false;
    },
    async getFavouriteCats() {
      try {
        //this.favourites = getFavourites();
        //(!this.favourites.length) this.empty = 'Nothing here';
        console.log(this.favourite, "favourite");
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style lang="scss">
  .container {
    padding: 0 62px;
    margin: auto;
    .cats-grid {
      column-width: 200px;
      column-gap: 30px;
      max-width: 1920px;
      margin-top: 70px;
      figure {
        position: relative;
        display: inline-block;
        column-break-inside: avoid;
        margin: 15px 0;
        padding: 0;
        &:hover { 
          transform: scale(1.1); 
          .heart-img { display: block; }
        }
        .heart-img {
          position: absolute;
          right: 15px;
          bottom: 15px;
          display: none;
        }
      }
    }
  }
</style>