<template>
  <cats-list :cats="favouriteCats" :isLoading="isLoading" />
</template>

<script>
import CatsList from '@/components/CatsList.vue'
import { getFavourites } from '@/assets/lib/favourite.js';

export default {
  name: 'FavouriteView',
  data() {
    return {
      favouriteCats: [],
      start: 0,
      end: 19,
      isLoading: false,
      shouldLoad: true
    }
  },
  components: {
    CatsList
  },
  mounted() {
    this.favouriteCats = getFavourites(this.start, this.end);
    this.scroll();
  },
  methods: {
    scroll () {
      window.onscroll = () => {
        const scrolled = document.documentElement.scrollTop + document.documentElement.clientHeight;
        const container_height = document.documentElement.scrollHeight;
        const difference = container_height - scrolled;
        if(difference < 1) {
          this.fetchFavourite();
        }
      };
    },
    async fetchFavourite() {
      if (this.isLoading || !this.shouldLoad) return;
      this.isLoading = true;
      this.start += 20;
      this.end += 20;
      await this.getFavouriteCats();
      this.isLoading = false;
    },
    async getFavouriteCats() {
      const data = await getFavourites(this.start, this.end);
      if (Object.keys(data).length < (this.end-this.start) || !Object.keys(data).length) this.shouldLoad = false;
      data.forEach(n => this.favouriteCats.push(n));
    }
  }
}
</script>
