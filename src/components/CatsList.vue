<template>
  <div class="container" @scroll="handleScroll">
    <div class="cats-grid">
      <figure v-for="cat in cats" :key="cat.id">
          <img class="cat-img" :src="cat.url" />
          <img class="heart-img" :src="imagesSrc" @click="addToFavourite(cat)" />
      </figure>
      <div v-if="!cats">Нет фото котиков :(</div>
    </div>
  </div>
</template>

<script>
import env from '@/assets/env';
import {getFavourites, wrapWithFavourites} from '../../static/favourites.js';

export default {
  data() {
    return {
      cats: [],
      page: 1,
      isLoading: false,
      shouldLoad: true
    }
  },
  computed: {
    imagesSrc() {
      return this.isFavourite ? require('@/assets/img/heart_active.svg') : require('@/assets/img/heart.svg')
    }
  },
  mounted() {
    this.getAllCats();
  },
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
      await this.getAllCats();
      this.isLoading = false;
    },
    async getAllCats() {
      try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?page=${this.page}&limit=20`, {
          method: 'GET',
          headers: {
            'X-API-KEY': env.apikey,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        this.cats = data;
        console.log(this.cats);
      } catch (err) {
        console.log(err);
      }
    },
    addToFavourites(favouriteItem) {
      const favourites = getFavourites();
      if(!favourites.some(item => item.id === favouriteItem.id)) {
        favourites.push(favouriteItem);
        localStorage["favourites"] = JSON.stringify(favourites);
        //this.$store.commit('results/setResults', wrapWithFavourites(this.results));
      } 
    }
  }
}
</script>

<style lang="scss">
 .container {
    padding: 0 62px;
    margin: auto;
    overflow-y: scroll;
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