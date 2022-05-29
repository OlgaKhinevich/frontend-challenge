<template>
  <cats-list :cats="favouriteCats" />
</template>

<script>
import CatsList from '@/components/CatsList.vue'
import {getFavourites} from '@/assets/lib/favourite.js';

export default {
  name: 'FavouriteView',
  data() {
    return {
      favouriteCats: [],
      start: 0,
      end: 19
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
          this.start += 20;
          this.end += 20;
          const data = getFavourites(this.start, this.end);
          data.forEach(n => this.favouriteCats.push(n));
        }
      };
    },
  }
}
</script>
