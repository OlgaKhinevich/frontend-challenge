<template>
  <cats-list :cats="cats" :isLoading="isLoading" />
</template>

<script>
import CatsList from '@/components/CatsList.vue'
import env from '@/assets/env'

export default {
  name: 'HomeView',
  data() {
    return {
      cats: [],
      page: 1,
      isLoading: false,
      shouldLoad: true
    }
  },
  components: {
    CatsList
  },
  mounted() {
    this.scroll();
    this.getAllCats();
  },
  methods: {
    scroll () {
      window.onscroll = () => {
        const scrolled = document.documentElement.scrollTop + document.documentElement.clientHeight;
        const container_height = document.documentElement.scrollHeight;
        const difference = container_height - scrolled;
        if(difference < 1) {
          this.fetchCats();
        }
      };
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
        if (!Object.keys(data).length) this.shouldLoad = false;
        data.forEach(n => this.cats.push(n))
        console.log(this.cats);
      } catch (err) {
        console.log(err);
      }
    },
  }
}
</script>
